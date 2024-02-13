import { useState, useEffect } from 'react'
import styles from '@/styles/Form/IventFormTop.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '../utils/config'
import 'select2'
import { useRouter } from 'next/router'

const items = [
  {
    id: 13,
    itemName: '参加できる日程を選択してください',
    type: 'radio',
    values: [
      'irodasSALON',
      'irodas 新卒エージェント',
      'irodas Tech',
      'irodas キャリアチェンジ',
    ],
    properties: 'os_date_24',
  },
]

export default function Iventform() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    os_date_24: 'irodasSALON',
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
  const os_date_24 = formData.os_date_24
  const queryParameters = new URLSearchParams(router.query)
  queryParameters.set('os_date_24', os_date_24) // これを追加
  const queryParamsString = queryParameters.toString()
    ? `?${queryParameters.toString()}`
    : ''

  if (os_date_24 === 'irodas キャリアチェンジ') {
    router.push(`/input/career${queryParamsString}`) // irodas キャリアチェンジの場合
  } else {
    router.push(`/input${queryParamsString}`) // それ以外の場合
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
                      まずは参加日程を教えてください
                    </label>
                  </div>

                  {renderFormElement(items.find((item) => item.id === 13))}
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
