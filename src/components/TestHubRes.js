import { useState, useEffect } from 'react'
import styles from '@/styles/Form/Form.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '../utils/config'
import 'select2'
import { useRouter } from 'next/router'


const items = [

  {
    id: 4,
    itemName: '卒業年度',
    type: 'radio',
    values: ['2024年', '2025年', '2026年'],
    properties: 'year__c',
  },
]

export default function TestHubRes() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    year__c: '2024年',
  })
  const [backClicked, setBackClicked] = useState(false)
  const [touchedFields, setTouchedFields] = useState({})
    const router = useRouter()





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
  }

  const handleOKButtonClick = () => {
    const selectedYear = formData.year__c
    const queryParameters = new URLSearchParams(router.query).toString() // これを追加
    const queryParamsString = queryParameters ? `?${queryParameters}` : '' // これを追加
    switch (selectedYear) {
      case '2024年':
        router.push(`/2024form${queryParamsString}`) // ここを変更
        break
      case '2025年':
        router.push(`/2025form${queryParamsString}`) // ここを変更
        break
      case '2026年':
        router.push(`/2026form${queryParamsString}`) // ここを変更
        break
      default:
        console.error('Invalid year selected')
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
                    <span>カウンセリング予約</span>は<br />
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
                      className={styles.buttonNext}
                      onClick={handleOKButtonClick}
                    >
                      <img src={url('/img/checkButton.png')} alt='' />
                      OK
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }


  return (
    <div className={styles.container}>
      <div className={styles.formArea}>{renderFormStep()}</div>
    </div>
  )
}
