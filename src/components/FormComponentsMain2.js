import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import universitiesJson from '@/data/universities.json'
import items from '@/data/itemsService'
import { submitHubspotFormIvent2 } from '../utils/submitHubspotFormIvent2'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '@/utils/config'
import 'select2'
import $ from 'jquery'
import styles from '@/styles/Form/IventForm.module.css'


export default function FormComponentsMain2({
  initialStep,
  initialOsdate,
  storedFormData,
}) {
  const router = useRouter()
  const [step, setStep] = useState(initialStep)
  const [formData, setFormData] = useState({
    os_date_24: initialOsdate,
    liberalartsscience__c: '文系',
    gakkougun: '大学',
    year__c: storedFormData?.year__c,
    email: storedFormData?.email,
    lastname: storedFormData?.lastname,
    firstname: storedFormData?.firstname,
    furigana_mei__c: storedFormData?.furigana_mei__c,
    furigana_sei__c: storedFormData?.furigana_sei__c,
    phone: storedFormData?.phone,
  })
  const [backClicked, setBackClicked] = useState(false)
  const [selectedSchoolType, setSelectedSchoolType] = useState('大学')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [id2Options, setId2Options] = useState([])
  const [id3Options, setId3Options] = useState([])
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})

  const validateStep = (step) => {
    const stepErrors = {}
    const requiredFields = items
      .filter((item) => {
        if (step === 1) {
          return item.id === 13
        } else if (step === 2) {
          return item.id === 1
        } else if (step == 3) {
          return item.id === 9
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
        year__c: storedFormData.year__c,
        email: storedFormData.email,
        lastname: storedFormData.lastname,
        firstname: storedFormData.firstname,
        furigana_mei__c: storedFormData.furigana_mei__c,
        furigana_sei__c: storedFormData.furigana_sei__c,
        phone: storedFormData.phone,
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
      if (
        step === 2 &&
        formData['gakkougun'] !== '大学' &&
        formData['gakkougun'] !== '大学院'
      ) {
        handleSubmit()
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
      event && event.preventDefault()
      // ここでフォームデータを送信する処理を行います
      console.log(formData.gakkougun)
      await submitHubspotFormIvent2(formData, router)
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
                    <button
                      className={`${styles.buttonNext} ${styles.firstbutton}`}
                      onClick={handleNext}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className={`${styles.label__area_stepTtl} ${styles.gakko_label}`}>
                  <label className={styles.label__Name_stepTtl_2}>
                    ご登録ありがとうございます。<br />
                    続けて、現在のご状況の記入をお願いします。
                  </label>
                </div>
                <div className={`${styles.label__area_stepTtl} ${styles.gakko_label}`}>
                  <label className={styles.label__Name_stepTtl}>
                    <span>学校区分</span>を教えてください
                  </label>
                </div>

                {renderFormElement(items.find((item) => item.id === 1))}
                <div className={`${styles.button__area} ${styles.gakko_label} `}>
                  <button
                    className={`${styles.buttonNext} ${styles.firstbutton} `}
                    onClick={handleNext}
                  >
                    OK
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
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
            {step === 4 && showStep4 && (
              <>
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
