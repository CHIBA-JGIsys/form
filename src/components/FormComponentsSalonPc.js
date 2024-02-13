
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import universitiesJson from '@/data/universities.json'
import items from '@/data/itemsSalonPc'
import styles from '@/styles/Form/Form.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { url } from '../utils/config'
import 'select2'
import $ from 'jquery'
import { submitHubspotFormIventSalon } from '@//utils/submitHubspotFormIventSalon'

export default function FormComponentsSalonPc({ uniqueId }) {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        gakkougun: '大学',
        year__c: '2025年卒',
        liberalartsscience__c: '文系',
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
    const validateStep = (step) => {
        const stepErrors = {}
        const requiredFields = items
            .filter((item) => {
                if (step === 1) {
                    return item.id <= 4
                } else if (step === 2) {
                    return item.id > 4 && item.id <= 9
                } else {
                    return item.id > 9 && item.id <= 12
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

    // ✅ここまで{
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
            if ($.fn.select2 && $select2Inputs.data('select2')) {
                $select2Inputs.select2('destroy');
            }
        }
    }, [id2Options, id3Options, step, uniqueId])

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1)
        }
    }
    const handleBack = () => {
        setBackClicked(true)
        setStep(step - 1)
    }

    const handleSubmit = async (event) => {
        if (validateStep(step)) {
            event.preventDefault()
            console.log(formData.gakkougun)
            await submitHubspotFormIventSalon(formData, router)
        }
    }

    const renderError = (property) => {
        if (errors[property] || (touchedFields[property] && !formData[property])) {
            return (
                <p className={styles.error}>
                    {errors[property] || '※入力してください'}
                </p>
            )
        }
        if (touchedFields[property]) {
            return (
                <div className={styles.errorOK}>
                    <img src={url('/img/check.png')} alt='' /> OK
                </div>
            )
        }
        return null
    }

    const handleInputChange = (event) => {
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
        switch (item.type) {
            case 'radio':
                return (
                    <div className={styles.list}>
                        <div className={styles.label__area}>
                            <label className={styles.label__Name}>{item.itemName}</label>
                            <p className={styles.label__Req}>必須</p>
                        </div>
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
                                    <p className={styles.label__Req}>必須</p>
                                </div>
                                <div>
                                    <div className={styles.contents__area}>
                                        <div className={styles.select__area}>
                                            <select
                                                className={`custom-select ${styles.select} ${styles.select_placeholder}`}
                                                id={item.properties}
                                                value={selectedSchool}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', height: '100%' }}
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
                                    <div className={styles.errorMsg}>
                                        {renderError(item.properties)}
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
                                    <p className={styles.label__Req}>必須</p>
                                </div>
                                <div>
                                    <div className={styles.contents__area}>
                                        <div className={styles.select__area}>
                                            <select
                                                className={`custom-select ${styles.select}`}
                                                id={item.properties}
                                                value={formData[item.properties]}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', height: '100%' }}
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
                                    <div className={styles.errorMsg}>
                                        {renderError(item.properties)}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                } else if (
                    item.id === 6 ||
                    item.id === 7 ||
                    item.id === 8 ||
                    item.id === 9
                ) {
                    return (
                        <div className={`${styles.text__area} ${styles.name__area} ${styles.name__areaPC}`}>
                            <input
                                id={item.properties}
                                type='text'
                                name={item.itemName}
                                value={formData[item.properties] || ''}
                                onChange={handleInputChange}
                                placeholder={item.placeholder}
                            />
                        </div>
                    )
                }
                else if (
                    item.id === 14
                ) {
                    return (
                        <div className={`${styles.text__area}`}>
                            <input
                                id={item.properties}
                                type='text'
                                name={item.itemName}
                                value={formData[item.properties] || ''}
                                onChange={handleInputChange}
                                placeholder={item.placeholder}
                            />
                        </div>
                    )
                }
                else {
                    return (
                        <div className={styles.list}>
                            <div className={styles.label__area}>
                                <label className={styles.label__Name}>{item.itemName}</label>
                                <p className={styles.label__Req}>必須</p>
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
                                            onInput={handleInputChange}
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
                )
            case 'tel':
                return (
                    <div>
                        <div className={styles.contents__area}>
                            <div className={styles.text__area}>
                                <input
                                    id={item.properties}
                                    type='tel'
                                    name={item.itemName}
                                    value={formData[item.properties] || ''}
                                    onChange={handleInputChange}
                                    onInput={handleInputChange}
                                    placeholder={item.placeholder}
                                />
                            </div>
                        </div>

                    </div>
                )
            case 'select':
                if (item.id === 10) {
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
                if (item.id === 11) {
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
                if (item.id === 12) {
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
        const isErrorsEmpty = Object.keys(errors).length === 0
        console.log(isErrorsEmpty)

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
                                {items.slice(0, 5).map((item) => (
                                    <div key={item.id}>{renderFormElement(item)}</div>
                                ))}
                                <div className={styles.button__area}>
                                    <button className={styles.buttonNext} onClick={handleNext}>
                                        <img src={url('/img/checkButton.png')} alt='' />
                                        OK
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                {/* {items.slice(5, 15).map((item) => (
                                    <div key={item.id}>{renderFormElement(item)}</div>
                                ))} */}
                                <div className={styles.list}>
                                    <div className={styles.label__area}>
                                        <label className={styles.label__Name}>
                                            氏名

                                        </label>
                                        <p className={styles.label__Req}>必須</p>

                                    </div>
                                    <div>
                                        <div
                                            className={`${styles.contents__area} ${styles.name__contentsarea}`}
                                        >
                                            {renderFormElement(items.find((item) => item.id === 6))}
                                            {renderFormElement(items.find((item) => item.id === 7))}
                                        </div>
                                    </div>
                                    {formData['lastname'] && formData['firstname'] && (
                                        <span className={styles.cleartag}>
                                            <img src={url('/img/okclearsalon.png')} alt='' />
                                        </span>
                                    )}
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.label__area}>
                                        <label className={styles.label__Name}>
                                            ふりがな

                                        </label>
                                        <p className={styles.label__Req}>必須</p>

                                    </div>
                                    <div>
                                        <div
                                            className={`${styles.contents__area} ${styles.name__contentsarea}`}
                                        >
                                            {renderFormElement(items.find((item) => item.id === 8))}
                                            {renderFormElement(items.find((item) => item.id === 9))}
                                        </div>
                                    </div>
                                    {formData['furigana_mei__c'] && formData['furigana_sei__c'] && (
                                        <span className={styles.cleartag}>
                                            <img src={url('/img/okclearsalon.png')} alt='' />
                                        </span>
                                    )}
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.label__area}>
                                        <label className={styles.label__Name}>
                                            生年月日

                                        </label>
                                        <p className={styles.label__Req}>必須</p>

                                    </div>
                                    <div>
                                        <div
                                            className={`${styles.contents__area} ${styles.name__contentsarea}`}
                                        >
                                            {renderFormElement(items.find((item) => item.id === 10))}
                                            {renderFormElement(items.find((item) => item.id === 11))}
                                            {renderFormElement(items.find((item) => item.id === 12))}

                                        </div>
                                    </div>
                                    {formData['birth_year'] && formData['birth_month'] && formData['birth_day'] && (
                                        <span className={styles.cleartag}>
                                            <img src={url('/img/okclearsalon.png')} alt='' />
                                        </span>
                                    )}
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.label__area}>
                                        <label className={styles.label__Name}>
                                            電話番号

                                        </label>
                                        <p className={styles.label__Req}>必須</p>

                                    </div>
                                    <div>
                                        <div
                                            className={`${styles.contents__area} ${styles.name__contentsarea}`}
                                        >
                                            {renderFormElement(items.find((item) => item.id === 13))}

                                        </div>
                                    </div>
                                    {formData['phone'] && (
                                        <span className={styles.cleartag}>
                                            <img src={url('/img/okclearsalon.png')} alt='' />
                                        </span>
                                    )}
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.label__area}>
                                        <label className={styles.label__Name}>
                                            メールアドレス

                                        </label>
                                        <p className={styles.label__Req}>必須</p>

                                    </div>
                                    <div>
                                        <div
                                            className={`${styles.contents__area} ${styles.name__contentsarea}`}
                                        >
                                            {renderFormElement(items.find((item) => item.id === 14))}

                                        </div>

                                    </div>
                                    {formData['email'] && (
                                        <span className={styles.cleartag}>
                                            <img src={url('/img/okclearsalon.png')} alt='' />
                                        </span>
                                    )}
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.label__area}>
                                        <label className={styles.label__Name}>ご要望欄</label>
                                        <p className={styles.label__notReq}>任意</p>
                                    </div>
                                    <div>
                                        {renderFormElement(items.find((item) => item.id === 15))}

                                    </div>
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
                                        <a href='https://irodas.com/privacyHQ/' target="_blank" rel="noopener noreferrer">「利用規約」</a>
                                        に同意の上、
                                        <br />
                                        「同意して登録する」ボタンを押してください。
                                    </p>
                                </div>
                                <div className={styles.button__area}>
                                    <button className={styles.buttonBack} onClick={handleBack}>
                                        戻る
                                    </button>
                                    <button className={styles.buttonNext} onClick={handleSubmit}>
                                        <img src={url('/img/checkButton.png')} alt='' />
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
                    className={`${styles.progressCircle} ${step >= 1 ? styles.active : ''
                        }`}
                >
                    1<span className={step >= 1 ? styles.barmiddle : ''}></span>
                </div>

                <div
                    className={`${styles.progressLine} ${step >= 2 ? styles.active : ''}`}
                ></div>
                <div
                    className={`${styles.progressCircle} ${step >= 2 ? styles.active : ''
                        } `}
                >
                    2
                </div>

            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>

                <div className={styles.titleArea}><img src={url('/img/pchead.png')} alt='' /></div>
                <div className={styles.barArea}>{renderGageArea()}</div>
            </div>
            <div className={styles.formArea}>
                <div className={styles.form__content}>{renderFormStep()}</div>
            </div>

        </div>
    )
}
