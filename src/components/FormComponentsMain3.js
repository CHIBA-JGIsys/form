import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import universitiesJson from '@/data/universities.json'
import items from '@/data/itemsServiceCareer'
import { submitHubspotFormIvent3 } from '../utils/submitHubspotFormIvent3'

import styles from '@/styles/Form/IventForm.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '@/utils/config'
import 'select2'
import $ from 'jquery'

export default function FormComponentsMain3({
  initialStep,
  initialOsdate,
  storedFormData,
}) {
  const router = useRouter()
  const [step, setStep] = useState(initialStep)
  const [formData, setFormData] = useState({
    entry_memo: storedFormData?.entry_memo,
  })
  const [backClicked, setBackClicked] = useState(false)
  const [selectedSchoolType, setSelectedSchoolType] = useState('大学')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [id2Options, setId2Options] = useState([])
  const [id3Options, setId3Options] = useState([])
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [selectyear, setSelectedYear] = useState('')
  const [selectmonth, setSelectedMonth] = useState('')
  const [selectday, setSelectedDay] = useState('')

  const [selectgyokai, setSelectedGyokai] = useState('')
  const [selectsyokusyu, setSelectedSyokusyu] = useState('')
  const [selectkyojyuuchi, setSelectedKyojyuuchi] = useState('')
  const [selectjiki, setSelectedJiki] = useState('')

  const validateStep = (step) => {
    const stepErrors = {}
    const requiredFields = items
      .filter((item) => {
        if (step === 1) {
          return item.id === 13
        } else if (step === 2) {
          return item.id > 4 && item.id <= 8
        } else if (step == 3) {
          return item.id > 9 && item.id <= 11
        } else if (step == 4) {
          return item.id === 14
        } else if (step == 5) {
          return item.id === 12
        } else {
          return item.id > 1 && item.id <= 3
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
    if (storedFormData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        entry_memo: storedFormData.entry_memo,
      }))
    }
  }, [storedFormData])

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
      console.log(formData)
      setStep(step + 1)
    }
  }
  const handleBack = () => {
    setBackClicked(true)
    setStep(step - 1)
  }

  const handleSubmit = async (event) => {
    if (validateStep(step)) {
      event && event.preventDefault()
      // ここでフォームデータを送信する処理を行います
      await submitHubspotFormIvent3(formData, router)
    }
  }

  const renderError = (property) => {
    if (errors[property]) {
      return <p className={styles.error}>{errors[property]}</p>
    }

    return null
  }

  const handleInputChange = (event) => {
    const { name, value, id } = event.target
    console.log(value, id)

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
    if (id === 'gyoukai') {
      setSelectedGyokai(value)
    }
    if (id === 'syokusyu') {
      setSelectedSyokusyu(value)
    }
    if (id === 'kyojyuuchi') {
      setSelectedKyojyuuchi(value)
    }
    if (id === 'jiki') {
      setSelectedJiki(value)
    }
  }

  const renderFormElement = (item) => {
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
                      <span>{value}</span>
                    </label>
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
        if (item.id === 5 || item.id === 6 || item.id === 7 || item.id === 8) {
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
        } else if (
          item.id === 21
        ) {
          return (
            <div className={styles.nensyu_list}>
              <div className={styles.label__area}>
                <label className={styles.label__Name}>{item.itemName}</label>
                <div className={styles.errorMsg}>
                  {renderError(item.properties)}
                </div>
              </div>
              <div>
                <div className={`${styles.nensyu__area_container}`}>
                  <div
                    className={`${styles.text__area} ${styles.nensyu__area}`}
                  >
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
      case 'select':
        if (item.id === 14) {
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
        if (item.id === 15) {
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
        if (item.id === 16) {
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
        if (item.id === 17) {
          return (
            <div className={styles.other_select_container}>
            <select
              id={`${item.properties}`}
              onChange={handleInputChange}
              value={selectgyokai}
              className={styles.other_select}
            >
              {item.values.map((index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            </div>
          )
        }
        if (item.id === 18) {
          return (
            <div className={styles.other_select_container}>
              <select
                id={`${item.properties}`}
                onChange={handleInputChange}
                value={selectsyokusyu}
                className={styles.other_select}
              >
                {item.values.map((index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
          )
        }
        if (item.id === 19) {
          return (
            <div className={styles.other_select_container}>
              <select
                id={`${item.properties}`}
                onChange={handleInputChange}
                value={selectkyojyuuchi}
                className={styles.other_select}
              >
                {item.values.map((index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
          )
        }
        if (item.id === 20) {
          return (
            <div className={styles.other_select_container}>
              <select
                id={`${item.properties}`}
                onChange={handleInputChange}
                value={selectjiki}
                className={styles.other_select}
              >
                {item.values.map((index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
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
                <div className={styles.firstview}>
                  <p className={styles.firstview__text}>簡単60秒で無料登録</p>
                  <h3 className={styles.firstview__Title}>
                    <span>セミナー予約</span>は<br />
                    こちらから
                  </h3>
                  <div className={styles.label__area_stepTtl}>
                    <label className={styles.label__Name_stepTtl}>
                      まずは卒業年度を教えてください
                    </label>
                  </div>

                  {renderFormElement(items.find((item) => item.id === 4))}
                  <div className={styles.button__area}>
                    <button className={styles.buttonNext} onClick={handleNext}>
                      OK
                    </button>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl_2}>
                    ご登録ありがとうございます。
                    <br />
                    続けて、現在のご状況の記入をお願いします。
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
                  <button className={styles.buttonNext} onClick={handleNext}>
                    OK
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.label__area_stepTtl}>
                  <label className={`${styles.label__Name_stepTtl}`}>
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

            {step === 4 && (
              <>
                <div
                  className={`${styles.label__area_stepTtl} ${styles.mgBtm34}`}
                >
                  <label className={styles.label__Name_stepTtl}>
                    <span>生年月日</span>を教えてください
                  </label>
                </div>
                <div className={styles.list_select}>
                  <div className={styles.list_select_inner}>
                    <div className={styles.select}>
                      <div className={styles.select__area_birth}>
                        {renderFormElement(
                          items.find((item) => item.id === 14)
                        )}
                        {renderFormElement(
                          items.find((item) => item.id === 15)
                        )}
                        {renderFormElement(
                          items.find((item) => item.id === 16)
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
            {step === 5 && (
              <>
                <div className={styles.label__area_stepTtl}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>直近のご状況</span>について教えてください
                  </label>
                </div>
                {renderFormElement(items.find((item) => item.id === 17))}
                {renderFormElement(items.find((item) => item.id === 18))}
                {renderFormElement(items.find((item) => item.id === 19))}
                {renderFormElement(items.find((item) => item.id === 20))}
                {renderFormElement(items.find((item) => item.id === 21))}

                <div className={styles.button__area}>
                  <button className={styles.buttonBack} onClick={handleBack}>
                    戻る
                  </button>
                  <button className={styles.buttonNext} onClick={handleSubmit}>
                    OK
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
            step >= 1 ? styles.active & { step } : ''
          }`}
        >
          1
        </div>

        <div
          className={`${styles.progressCircle} ${
            step >= 2 ? styles.active2 : ''
          }`}
        >
          <p className={styles.gagetext}>あと7問</p>
        </div>

        <div
          className={`${styles.progressCircle} ${
            step === 3 ? styles.active3 : ''
          }`}
        >
          <p className={styles.gagetext}>あと6問</p>
        </div>
        <div
          className={`${styles.progressCircle} ${
            step === 4 ? styles.active4 : ''
          }`}
        >
          <p className={styles.gagetext}>あと5問</p>
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
