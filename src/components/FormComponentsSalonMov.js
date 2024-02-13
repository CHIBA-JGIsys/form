import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import universitiesJson from '@/data/universities.json'
import items from '@/data/itemsSalon'
import { submitHubspotFormIventSalon } from '../utils/submitHubspotFormIventSalon'
import styles from '@/styles/Form/IventSalonForm.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '@/utils/config'
import 'select2'
import $ from 'jquery'

export default function FormComponentsSalonMov({ initialStep, initialOsdate }) {
  const router = useRouter()
  const [step, setStep] = useState(initialStep)
  const [formData, setFormData] = useState({
    gakkougun: '大学',
    year__c: '2025年卒',
    liberalartsscience__c: '文系',
  })

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      year__c: '2025年卒',
    }))
  }, [initialOsdate])
  const [backClicked, setBackClicked] = useState(false)
  const [selectedSchoolType, setSelectedSchoolType] = useState('大学')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [id2Options, setId2Options] = useState([])
  const [id3Options, setId3Options] = useState([])
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [windowWidth, setWindowWidth] = useState(null)
  const [selectyear, setSelectedYear] = useState('')
  const [selectmonth, setSelectedMonth] = useState('')
  const [selectday, setSelectedDay] = useState('')
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
          return item.id === 1
        } else if (step == 5) {
          return item.id === 9
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
        if (field === 'birth') {
          formData[field] =
            formData[field] === undefined ? '-' : formData[field]
        }
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
    console.log(formData)
    if (validateStep(step)) {
      if (
        step === 3 &&
        formData['gakkougun'] !== '大学' &&
        formData['gakkougun'] !== '大学院'
      ) {
        setStep(step + 2)
      } else {
        setStep(step + 1)
      }
    }
  }
  const handleBack = () => {
    setBackClicked(true)
    if (
      step === 5 &&
      formData['gakkougun'] !== '大学' &&
      formData['gakkougun'] !== '大学院'
    ) {
      setStep(step - 2)
    } else {
      setStep(step - 1)
    }
  }
  const handleSubmit = async (event) => {
    if (validateStep(step)) {
      event.preventDefault()
      // ここでフォームデータを送信する処理を行います
      console.log(formData)
      await submitHubspotFormIventSalon(formData, router)

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
    if (id === 'birth_year') {
      setSelectedYear(value)
    }
    if (id === 'birth_month') {
      setSelectedMonth(value)
    }
    if (id === 'birth_day') {
      setSelectedDay(value)
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
          className={`${styles.irodasServiceDesc} ${containsTargetText ? styles.bluetext : ''
            }`}
        >
          <span
            className={`${styles.lefttoggle} ${containsTargetText ? styles.bluetext : ''
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
          className={`${styles.irodasServiceDescSP} ${containsTargetText ? styles.bluetext : ''
            }`}
        >
          <span
            className={`${styles.lefttoggle} ${containsTargetText ? styles.bluetext : ''
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
                          value.includes('irodas') ? styles.irodasSelect : ''
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
                  <label className={styles.label__Name}>
                    {item.itemName}
                    {formData[item.properties] && (
                      <span className={styles.cleartag}>
                        <img src={url('/img/okclearsalon.png')} alt='' />
                      </span>
                    )}
                  </label>
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
                  <label className={styles.label__Name}>
                    {item.itemName}
                    {formData[item.properties] && (
                      <span className={styles.cleartag}>
                        <img src={url('/img/okclearsalon.png')} alt='' />
                      </span>
                    )}
                  </label>
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
                <label className={styles.label__Name}>
                  {item.itemName}
                  <span className={styles.tellabel}>※gmailを推奨</span>
                  {formData[item.properties] &&
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      formData[item.properties]
                    ) && (
                      <span className={styles.cleartag}>
                        <img src={url('/img/okclearsalon.png')} alt='' />
                      </span>
                    )}
                </label>
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
              <label className={styles.label__Name}>
                {item.itemName}
                <span className={styles.tellabel}>
                  ※ハイフンなし、携帯電話番号を推奨
                </span>
                {formData[item.properties] &&
                  formData[item.properties].length > 10 && (
                    <span className={styles.cleartag}>
                      <img src={url('/img/okclearsalon.png')} alt='' />
                    </span>
                  )}
              </label>
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
      case 'select':
        if (item.id === 16) {
          return (
            <select
              id={`${item.properties}`}
              onChange={handleInputChange}
              value={selectyear}
              className={styles.birth_select}
            >
              {[...Array(61).keys()].map((i) => {
                const year = new Date().getFullYear() - 60 + i
                if (i === 0) {
                  return <option>年</option>
                } else {
                  return (
                    <option value={year} key={year}>
                      {year}年
                    </option>
                  )
                }
              })}
            </select>
          )
        }
        if (item.id === 17) {
          return (
            <select
              id={`${item.properties}`}
              onChange={handleInputChange}
              value={selectmonth}
              className={styles.birth_select}
            >
              {[...Array(13).keys()].map((i) => {
                if (i === 0) {
                  return <option>月</option>
                } else {
                  return (
                    <option value={i} key={i}>
                      {i}月
                    </option>
                  )
                }
              })}
            </select>
          )
        }
        if (item.id === 18) {
          return (
            <select
              id={`${item.properties}`}
              onChange={handleInputChange}
              value={selectday}
              className={styles.birth_select}
            >
              {[...Array(32).keys()].map((i) => {
                if (i === 0) {
                  return <option>日</option>
                } else {
                  return (
                    <option value={i} key={i}>
                      {i}日
                    </option>
                  )
                }
              })}
            </select>
          )
        }
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

                <div
                  className={`${styles.label__area_stepTtl} ${styles.gakko_label}`}
                >
                  <label className={styles.label__Name_stepTtl}>
                    <span>学校区分</span>を教えてください
                  </label>
                </div>

                {renderFormElement(items.find((item) => item.id === 1))}
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
            {step === 4 && showStep4 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>

                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>学校名</span>を教えてください
                  </label>
                </div>
                {renderFormElement(items.find((item) => item.id === 2))}
                {renderFormElement(items.find((item) => item.id === 3))}
                <div className={styles.button__area}>
                  <button className={styles.buttonBack} onClick={handleBack}>
                    戻る
                  </button>
                  <button className={styles.buttonNext} onClick={handleNext}>
                    OK
                  </button>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>文理</span>を教えてください
                  </label>
                </div>

                {renderFormElement(items.find((item) => item.id === 9))}

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
            {step === 6 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div
                  className={`${styles.label__area_stepTtl} ${styles.mgBtm34}`}
                >
                  <label className={`${styles.label__Name_stepTtl}`}>
                    <span>お名前・生年月日</span>を入力
                  </label>
                </div>
                <div className={styles.list}>
                  <div className={styles.label__area}>
                    <label className={styles.label__Name}>
                      氏名
                      {formData['lastname'] && formData['firstname'] && (
                        <span className={styles.cleartag}>
                          <img src={url('/img/okclearsalon.png')} alt='' />
                        </span>
                      )}
                    </label>
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
                    <label className={styles.label__Name}>
                      ふりがな
                      {formData['furigana_mei__c'] &&
                        formData['furigana_sei__c'] && (
                          <span className={styles.cleartag}>
                            <img src={url('/img/okclearsalon.png')} alt='' />
                          </span>
                        )}
                    </label>
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

                <div className={styles.list_select}>
                  <div className={styles.list_select_inner}>
                    <div className={styles.label__area}>
                      <label
                        className={`${styles.label__Name} ${styles.birthtext}`}
                      >
                        生年月日
                        {formData['birth_year'] &&
                          formData['birth_month'] &&
                          formData['birth_day'] && (
                            <span className={styles.cleartag}>
                              <img src={url('/img/okclearsalon.png')} alt='' />
                            </span>
                          )}
                      </label>
                    </div>
                    <div className={styles.select}>
                      <div className={styles.select__area_birth}>
                        {renderFormElement(
                          items.find((item) => item.id === 16)
                        )}
                        {renderFormElement(
                          items.find((item) => item.id === 17)
                        )}
                        {renderFormElement(
                          items.find((item) => item.id === 18)
                        )}
                      </div>
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
            {step === 7 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
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
            {step === 8 && (
              <>
                <div className={styles.barArea}>{renderGageArea()}</div>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>ご要望</span>を入力 ※任意です
                  </label>
                  <p> 他にご要望がございましたら、ご記入をお願いします。<br />
                  空白のままお進みいただいても問題ございません。
                  </p>
                </div>
                {renderFormElement(items.find((item) => item.id === 12))}
                <div className={styles.privacyarea}>
                  <div className={styles.pmark}>
                    <a href='https://privacymark.jp/' target='_blank'>
                      <img src={url('/img/pmark.png')} alt='' />
                    </a>
                  </div>
                  <div className={styles.privacytext}>
                    「
                    <a href='https://irodas.com/privacyHQ/' target='_blank'>
                      個人情報の取り扱い
                    </a>
                    」 と「
                    <a href='https://irodas.com/privacyHQ/' target='_blank'>
                      利用規約
                    </a>
                    」 に同意の上、 「同意して登録する」ボタンを押してください。
                  </div>
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

            {/* {step === 5 && (
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
            )} */}
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }

  const renderGageArea = () => {
    return (
      <div className={styles.gageArea}>
        <div
          className={`${styles.progressCircle} ${step >= 1 ? styles.active2 : ''
            }`}
        >
          <p className={styles.gagetext}>あと8問</p>
        </div>

        <div
          className={`${styles.progressCircle} ${step >= 2 ? styles.active2 : ''
            }`}
        >
          <p className={styles.gagetext}>あと7問</p>
        </div>

        <div
          className={`${styles.progressCircle} ${step === 3 ? styles.active3 : ''
            }`}
        >
          <p className={styles.gagetext}>あと6問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${step === 4 ? styles.active4 : ''
            }`}
        >
          <p className={styles.gagetext}>あと5問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${step === 5 ? styles.active5 : ''
            }`}
        >
          <p className={styles.gagetext}>あと4問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${step === 6 ? styles.active6 : ''
            }`}
        >
          <p className={styles.gagetext}>あと3問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${step === 7 ? styles.active7 : ''
            }`}
        >
          <p className={styles.gagetext}>あと2問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${step === 8 ? styles.active8 : ''
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
