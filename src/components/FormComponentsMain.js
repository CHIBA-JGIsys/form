import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import universitiesJson from '@/data/universities.json'
import items from '@/data/itemsService'
import { submitHubspotFormIvent1 } from '../utils/submitHubspotFormIvent1'

import styles from '@/styles/Form/IventForm.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '@/utils/config'
import 'select2'
import $ from 'jquery'

export default function FormComponentsMain({ initialStep, initialOsdate }) {
  const router = useRouter()
  const [step, setStep] = useState(initialStep)
  const [formData, setFormData] = useState({
    entry_memo: 'irodasSALON',
    year__c: '2024年卒',
  })
  const [backClicked, setBackClicked] = useState(false)
  const [selectedSchoolType, setSelectedSchoolType] = useState('大学')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [id2Options, setId2Options] = useState([])
  const [id3Options, setId3Options] = useState([])
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [windowWidth, setWindowWidth] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
    }
  }, [])
  const validateStep = (step) => {
    const stepErrors = {}
    const requiredFields = items
      .filter((item) => {
        if (step === 1) {
          return item.id === 13
        } else if (step === 2) {
          return item.id === 4
        } else if (step == 3) {
          return item.id > 4 && item.id <= 8
        } else if (step == 4) {
          return item.id > 9 && item.id <= 11
        } else {
          return item.id === 12
        }
      })
      .filter((item) => {
        if (item.id === 2 || item.id === 3) {
          return (
            formData.gakkougun === '大学' || formData.gakkougun === '大学院'
          )
        }
        return true
      })
      .map((item) => item.properties)

    requiredFields.forEach((field) => {
      if (field !== 'entry_memo') {
        if (!formData[field]) {
          stepErrors[field] = '※入力してください'
        }
      }
      if (field === 'entry_memo') {
        formData[field] = formData[field] === undefined ? '-' : formData[field]
      }
    })

    setErrors(stepErrors)
    console.log(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  useEffect(() => {
    if (selectedSchoolType && universitiesJson[0][selectedSchoolType]) {
      const schools = Object.keys(universitiesJson[0][selectedSchoolType])
      setId2Options(schools)
    }
  }, [selectedSchoolType])

  useEffect(() => {
    if (
      selectedSchoolType &&
      selectedSchool &&
      universitiesJson[0][selectedSchoolType][selectedSchool]
    ) {
      const departments = Object.keys(
        universitiesJson[0][selectedSchoolType][selectedSchool]
      )
      setId3Options(departments)
    }
  }, [selectedSchoolType, selectedSchool])

  useEffect(() => {
    updateRadioContentsBackground()
  }, [formData, step])

  useEffect(() => {
    const $select2Inputs = $('.custom-select')
    $select2Inputs.each(function () {
      const itemId = $(this).attr('id')
      $(this).select2({
        minimumInputLength: itemId === 'undergraduate__c' ? 0 : 2,
        placeholder:
          itemId === 'undergraduate__c'
            ? '選択してください'
            : '正式名称を入力して選択',
        language: {
          inputTooShort: () => '最初の2文字を入力してください',
        },
      })

      $(this).on('select2:select', (event) => {
        handleInputChange({
          target: {
            id: event.currentTarget.id,
            value: event.target.value,
          },
        })
      })
    })

    return () => {
      $select2Inputs.off('select2:select')
      $select2Inputs.select2('destroy')
    }
  }, [id2Options, id3Options, step]) // ここにstepを追加

  const updateRadioContentsBackground = () => {
    const radioButtons = document.querySelectorAll(`.${styles.radio}`)
    if (radioButtons.length > 0) {
      // 追加: radioButtons が存在する場合のみ実行
      radioButtons.forEach((radio) => {
        const radioContents = radio.closest(`.${styles.radio__contents}`)
        if (radio.checked) {
          radioContents.classList.add(`${styles.checked}`)
        } else {
          radioContents.classList.remove(`${styles.checked}`)
        }
      })
    }
  }
  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 2 && formData['year__c'] === '既に就業中') {
        sessionStorage.setItem('formData', JSON.stringify(formData))
        const redirectTo = `/member/input/career` // ここにHubSpotでコピーしたリダイレクトURLを使用しても構いません
        // 必要に応じて、URLパラメーターやCookieを設定してリダイレクトを行う
        window.location.href = redirectTo
      } else {
        setStep(step + 1)
      }
    }
  }
  const handleBack = () => {
    setBackClicked(true)
    setStep(step - 1)
  }
  const handleSubmit = async (event) => {
    if (validateStep(step)) {
      event.preventDefault()
      // ここでフォームデータを送信する処理を行います
      console.log(formData)
      await submitHubspotFormIvent1(formData, router)

      // await submitHubspotFormIvent1(formData, router)
    }
  }
  const renderError = (property) => {
    if (errors[property]) {
      return <p className={styles.error}>{errors[property]}</p>
    }

    return null
  }

  const handleInputChange = (event) => {
    console.log(event)
    const { name, value, id } = event.target
    setFormData({ ...formData, [id]: value })
    setTouchedFields({ ...touchedFields, [id]: true })

    if (id === 'gakkougun') {
      setSelectedSchoolType(value)
      setSelectedSchool('')
      setFormData({
        ...formData,
        [id]: value,
        company: '',
        undergraduate__c: '',
      })
    }
    if (id === 'company') {
      setSelectedSchool(value)
    }
  }

  const renderFormElement = (item) => {
    const applyFontStyle = (text) => {
      const irodasRegex = /(irodas\b)/gi

      // 指定された文字列のみをマッチさせるためのリスト
      const validIrodasStrings = [
        'irodas 新卒エージェント',
        'irodas キャリアチェンジ',
      ]

      const isIrodasValidString = validIrodasStrings.includes(text)

      if (windowWidth !== null && windowWidth <= 767) {
        if (!text.includes('Tech')) {
          text = text.replace(/ /g, '<br>') // すべてのスペースを改行に置き換える
        }
      }

      const styledText = text.replace(
        irodasRegex,
        '<span style="font-family: Poppins, font-weight: bold;">$1</span>'
      )

      return isIrodasValidString
        ? `<span class="${styles.irodasSelectService}">${styledText}</span>`
        : styledText
    }
    const NewlineText = ({ text }) => {
      const newText = text.split('\n').map((str, index, array) =>
        index === array.length - 1 ? (
          str
        ) : (
          <>
            {str}
            <br />
          </>
        )
      )
      const containsTargetText = text.includes('既に就業中の方対象') // ここを修正

      return (
        <div
          className={`${styles.irodasServiceDesc} ${
            containsTargetText ? styles.bluetext : ''
          }`}
        >
          <span
            className={`${styles.lefttoggle} ${
              containsTargetText ? styles.bluetext : ''
            }`}
          ></span>
          {newText}
        </div>
      )
    }
    const NewlineTextSP = ({ text }) => {
      const newText = text.split('\n').map((str, index, array) =>
        index === array.length - 1 ? (
          str
        ) : (
          <>
            {str}
            <br />
          </>
        )
      )
      const containsTargetText = text.includes('既に就業中の方対象') // ここを修正

      return (
        <div
          className={`${styles.irodasServiceDescSP} ${
            containsTargetText ? styles.bluetext : ''
          }`}
        >
          <span
            className={`${styles.lefttoggle} ${
              containsTargetText ? styles.bluetext : ''
            }`}
          ></span>
          {newText}
        </div>
      )
    }
    // 追加: irodasの値に対応するテキストを取得する関数
    const getIrodasDescription = (value) => {
      switch (value) {
        case 'irodasSALON':
          return '大学3年生対象\n理想のキャリア・働き方を見つけていきたい方向け'
        case 'irodas 新卒エージェント':
          return '大学3・4年生対象\n納得できる内定獲得を目指したい方向け'
        case 'irodas Tech':
          return '大学3・4年生対象\nITエンジニア就活をされている方向け'
        case 'irodas キャリアチェンジ':
          return '既に就業中の方対象\nキャリアアップ転職を目指したい方向け'
        default:
          return null
      }
    }
    const getIrodasDescriptionSP = (value) => {
      switch (value) {
        case 'irodasSALON':
          return '大学3年生対象\n理想のキャリア・働き方を\n見つけていきたい方向け'
        case 'irodas 新卒エージェント':
          return '大学3・4年生対象\n納得できる内定獲得を\n目指したい方向け'
        case 'irodas Tech':
          return '大学3・4年生対象\nITエンジニア就活を\nされている方向け'
        case 'irodas キャリアチェンジ':
          return '既に就業中の方対象\nキャリアアップ転職を\n目指したい方向け'
        default:
          return null
      }
    }
    switch (item.type) {
      case 'radio':
        return (
          <div className={styles.list}>
            <div>
              <div className={styles.contents__area}>
                {item.values.map((value, index) => (
                  <div className={styles.radio__contents}>
                    <label key={index}>
                      <input
                        id={item.properties}
                        type='radio'
                        name={item.properties}
                        value={value}
                        checked={formData[item.properties] === value}
                        onChange={handleInputChange}
                        className={styles.radio}
                      />
                      <span
                        className={
                          value.includes('irodas')
                            ? styles.irodasSelect
                            : ''
                        }
                        dangerouslySetInnerHTML={{
                          __html: applyFontStyle(value),
                        }}
                      />
                      {value.includes('irodas') && (
                        <NewlineTextSP text={getIrodasDescriptionSP(value)} />
                      )}
                    </label>
                    {/* 追加: irodasを含む値の場合、対応するテキストを表示 */}
                    {value.includes('irodas') && (
                      <NewlineText text={getIrodasDescription(value)} />
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.errorMsg}>
                {renderError(item.properties)}
                {item.id === 1 && (
                  <p className={styles.message_note}>
                    ※海外の学校に通われている方は「 その他 」を選択してください
                  </p>
                )}
              </div>
            </div>
          </div>
        )

      case 'text':
        if (item.id === 2) {
          if (
            selectedSchoolType === '大学' ||
            selectedSchoolType === '大学院'
          ) {
            return (
              <div className={styles.list}>
                <div className={styles.label__area}>
                  <label className={styles.label__Name}>{item.itemName}</label>
                  <div className={styles.errorMsg}>
                    {renderError(item.properties)}
                  </div>
                </div>
                <div>
                  <div className={styles.contents__area}>
                    <div className={styles.select__area}>
                      <select
                        className={`custom-select ${styles.select}`}
                        id={item.properties}
                        value={selectedSchool}
                        onChange={handleInputChange}
                        style={{ width: '100%' }}
                      >
                        <option value=''>最初の2文字を入力してください</option>
                        {id2Options.map((school, index) => (
                          <option key={index} value={school}>
                            {school}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return null
          }
        } else if (item.id === 3) {
          if (
            selectedSchoolType === '大学' ||
            selectedSchoolType === '大学院'
          ) {
            return (
              <div className={styles.list}>
                <div className={styles.label__area}>
                  <label className={styles.label__Name}>{item.itemName}</label>
                  <div className={styles.errorMsg}>
                    {renderError(item.properties)}
                  </div>
                </div>
                <div>
                  <div className={styles.contents__area}>
                    <div className={styles.select__area}>
                      <select
                        className={`custom-select ${styles.select}`}
                        id={item.properties}
                        value={formData[item.properties]}
                        onChange={handleInputChange}
                        style={{ width: '100%' }}
                      >
                        <option value=''>選択してください</option>
                        {id3Options.map((department, index) => (
                          <option key={index} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return null
          }
        } else if (
          item.id === 5 ||
          item.id === 6 ||
          item.id === 7 ||
          item.id === 8
        ) {
          return (
            <div className={`${styles.text__area} ${styles.name__area}`}>
              <input
                id={item.properties}
                type='text'
                name={item.itemName}
                value={formData[item.properties] || ''}
                onChange={handleInputChange}
                placeholder={item.placeholder}
              />
              {renderError(item.properties)}
            </div>
          )
        } else {
          return (
            <div className={styles.list}>
              <div className={styles.label__area}>
                <label className={styles.label__Name}>{item.itemName}</label>
                <div className={styles.errorMsg}>
                  {renderError(item.properties)}
                </div>
              </div>
              <div>
                <div className={styles.contents__area}>
                  <div className={styles.text__area}>
                    <input
                      id={item.properties}
                      type='text'
                      name={item.itemName}
                      value={formData[item.properties] || ''}
                      onChange={handleInputChange}
                      placeholder={item.placeholder}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      case 'textarea':
        return (
          <div className={styles.list}>
            <div className={styles.label__area}>
              <p className={styles.label__notReq}>任意</p>
            </div>
            <div>
              <div className={styles.contents__area}>
                <div className={styles.text__arealong}>
                  <textarea
                    id={item.properties}
                    name={item.itemName}
                    value={formData[item.properties] || ''}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                    placeholder={item.placeholder}
                  />
                </div>
              </div>
              <div className={styles.errorMsg}></div>
            </div>
          </div>
        )
      case 'tel':
        return (
          <div className={styles.list}>
            <div className={styles.label__area}>
              <label className={styles.label__Name}>{item.itemName}</label>
              <div className={styles.errorMsg}>
                {renderError(item.properties)}
              </div>
            </div>
            <div>
              <div className={styles.contents__area}>
                <div className={styles.text__area}>
                  <input
                    id={item.properties}
                    type='tel'
                    name={item.itemName}
                    value={formData[item.properties] || ''}
                    onChange={handleInputChange}
                    placeholder={item.placeholder}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderFormStep = () => {
    const showStep4 =
      formData['gakkougun'] === '大学' || formData['gakkougun'] === '大学院'

    return (
      <TransitionGroup>
        <CSSTransition
          key={step}
          timeout={1000}
          classNames={{
            enter: backClicked ? styles.slideEnterBack : styles.slideEnter,
            enterActive: backClicked
              ? styles.slideEnterActiveBack
              : styles.slideEnterActive,
            exit: backClicked ? styles.slideExitBack : styles.slideExit,
            exitActive: backClicked
              ? styles.slideExitActiveBack
              : styles.slideExitActive,
          }}
          onExited={() => setBackClicked(false)}
        >
          <div>
            {step === 1 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div className={styles.label__area_stepTtl_1}>
                  <label className={styles.label__Name_stepTtl_1}>
                    ※個人情報は第三者に提供されません
                  </label>
                </div>

                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>ご利用希望のサービス</span>を教えてください
                  </label>
                </div>

                {renderFormElement(items.find((item) => item.id === 13))}
                <div className={styles.button__area}>
                  <button
                    className={`${styles.buttonNext} ${styles.firstbutton}`}
                    onClick={handleNext}
                  >
                    OK
                  </button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div className={styles.label__area_stepTtl_1}>
                  <label className={styles.label__Name_stepTtl_1}>
                    ※個人情報は第三者に提供されません
                  </label>
                </div>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>卒業年度</span>を教えてください
                  </label>
                </div>

                {renderFormElement(items.find((item) => item.id === 4))}

                <div className={styles.button__area}>
                <button
                    className={`${styles.buttonNext} ${styles.firstbutton}`}
                    onClick={handleNext}
                  >
                    OK
                  </button>
                  {/* <button className={styles.buttonBack} onClick={handleBack}>
                    ←戻る
                  </button>
                  <button className={styles.buttonNext} onClick={handleNext}>
                    OK
                  </button> */}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div className={styles.label__area_stepTtl_1}>
                  <label className={styles.label__Name_stepTtl_1}>
                    ※個人情報は第三者に提供されません
                  </label>
                </div>
                <div
                  className={`${styles.label__area_stepTtl} ${styles.mgBtm34}`}
                >
                  <label className={`${styles.label__Name_stepTtl}`}>
                    <span>お名前を入力</span>
                  </label>
                </div>
                <div className={styles.list}>
                  <div className={styles.label__area}>
                    <label className={styles.label__Name}>氏名</label>
                  </div>
                  <div>
                    <div
                      className={`${styles.contents__area} ${styles.name__contentsarea}`}
                    >
                      {renderFormElement(items.find((item) => item.id === 5))}

                      {renderFormElement(items.find((item) => item.id === 6))}
                    </div>
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label__area}>
                    <label className={styles.label__Name}>ふりがな</label>
                  </div>
                  <div>
                    <div
                      className={`${styles.contents__area} ${styles.name__contentsarea}`}
                    >
                      {renderFormElement(items.find((item) => item.id === 7))}
                      {renderFormElement(items.find((item) => item.id === 8))}
                    </div>
                  </div>
                </div>
                <div className={styles.button__area}>
                  <button className={styles.buttonBack} onClick={handleBack}>
                    ←戻る
                  </button>
                  <button className={styles.buttonNext} onClick={handleNext}>
                    OK
                  </button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div className={styles.label__area_stepTtl_1}>
                  <label className={styles.label__Name_stepTtl_1}>
                    ※個人情報は第三者に提供されません
                  </label>
                </div>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>連絡先を入力</span>
                  </label>
                </div>
                {renderFormElement(items.find((item) => item.id === 10))}
                {renderFormElement(items.find((item) => item.id === 11))}
                <div className={styles.button__area}>
                  <button className={styles.buttonBack} onClick={handleBack}>
                    ←戻る
                  </button>
                  <button className={styles.buttonNext} onClick={handleNext}>
                    OK
                  </button>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>内容確認</span>
                  </label>
                </div>

                <div className={styles.checkArea}>
                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.ttl}>ご利用希望のサービス</td>
                        <td className={styles.txt}>{formData['entry_memo']}</td>
                      </tr>
                      <tr>
                        <td className={styles.ttl}> 卒業年度</td>
                        <td className={styles.txt}>{formData['year__c']}</td>
                      </tr>
                      <tr>
                        <td className={styles.ttl}>氏名</td>
                        <td className={styles.txt}>
                          {formData['lastname']} {formData['firstname']}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.ttl}>氏名かな</td>
                        <td className={styles.txt}>
                          {formData['furigana_sei__c']}{' '}
                          {formData['furigana_mei__c']}
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.ttl}>電話番号</td>
                        <td className={styles.txt}>{formData['phone']}</td>
                      </tr>
                      <tr>
                        <td className={styles.ttl}>メールアドレス</td>
                        <td className={styles.txt}>{formData['email']}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.privacyArea}>
                  <p className={styles.privacytext}>
                    <a
                      href='https://irodas.com/privacyHQ/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      「個人情報の取り扱い
                    </a>
                    」 と
                    <a
                      href='https://irodas.com/privacyHQ/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      「利用規約」
                    </a>
                    に同意の上、
                    <br />
                    「同意して登録する」ボタンを押してください。
                  </p>
                </div>
                <div className={styles.button__area}>
                  <button className={styles.buttonBack} onClick={handleBack}>
                    ←戻る
                  </button>
                  <button className={styles.buttonNext} onClick={handleSubmit}>
                    同意して登録する
                  </button>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }

  const renderGageArea = () => {
    return (
      <div className={styles.gageArea}>
        <div
          className={`${styles.progressCircle} ${
            step >= 1 ? styles.active2 : ''
          }`}
        >
          <p className={styles.gagetext}>あと4問</p>
        </div>

        <div
          className={`${styles.progressCircle} ${
            step >= 2 ? styles.active4 : ''
          }`}
        >
          <p className={styles.gagetext}>あと3問</p>
        </div>

        <div
          className={`${styles.progressCircle} ${
            step === 3 ? styles.active6 : ''
          }`}
        >
          <p className={styles.gagetext}>あと2問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${
            step === 4 ? styles.active8 : ''
          }`}
        >
          <p className={styles.gagetext}>あと1問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${
            step === 5 ? styles.active5 : ''
          }`}
        >
          <p className={styles.gagetext}>あと4問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${
            step === 6 ? styles.active6 : ''
          }`}
        >
          <p className={styles.gagetext}>あと3問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${
            step === 7 ? styles.active7 : ''
          }`}
        >
          <p className={styles.gagetext}>あと2問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${
            step === 8 ? styles.active8 : ''
          }`}
        >
          <p className={styles.gagetext}>あと1問</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.formArea}>{renderFormStep()}</div>
    </div>
  )
}
