This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

//省略


const customFilter = (option, inputValue) => {
  if (inputValue.length >= 2) {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  } else {
    return false
  }
}
const items = [
  {
    id: 1,
    itemName: '学校区分',
    type: 'radio',
    values: ['大学院', '大学', '短期大学', '専門学校', 'その他'],
    properties: 'gakkougun',
  },
  {
    id: 2,
    itemName: '学校名',
    type: 'text',
    properties: 'company',
  },
  {
    id: 3,
    itemName: '学部名',
    type: 'text',
    properties: 'undergraduate__c',
  },
//省略
]

export default function FormComponent() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    gakkougun: '大学',
    year__c: '2024年',
    liberalartsscience__c: '文系',
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
          return item.id <= 4
        } else if (step === 2) {
          return item.id > 4 && item.id <= 9
        } else {
          return item.id > 9 && item.id <= 11
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
      if (!formData[field]) {
        stepErrors[field] = '※入力してください'
      }
    })

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }
const validateField = (field) => {
  let error = ''
  if (!formData[field]) {
    error = '※入力してください'
  }
  return error
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
      await submitHubspotForm(formData)
    }
  }

const renderError = (property) => {
  if (errors[property] || (touchedFields[property] && !formData[property])) {
    return (
      <p className={styles.error}>{errors[property] || '※入力してください'}</p>
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

  const submitHubspotForm = async (formData) => {
    const portalId = '20776466'
    const formGuid = 'af5d70ea-f400-4be2-a5f1-f853522391c5'
    const config = {
      headers: {
        'Message-Type': 'application/json',
      },
    }

    return await axios
      .post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
//省略


        config
      )
      .then(() => {
        console.log(formData.gakkougun)
        router.push('/thanks')
      })
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
                      <Select
                        styles={{}}
                        className={styles.select}
                        id={item.properties}
                        options={id2Options.map((school) => ({
                          value: school,
                          label: school,
                        }))}
                        value={
                          selectedSchool
                            ? { value: selectedSchool, label: selectedSchool }
                            : null
                        }
                        onChange={(option) =>
                          handleInputChange({
                            target: {
                              id: item.properties,
                              value: option ? option.value : '',
                            },
                          })
                        }
                        filterOption={customFilter}
                        isSearchable
                        placeholder='最初の2文字を入力してください'
                      />
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
                      <Select
                        className={styles.select}
                        id={item.properties}
                        options={id3Options.map((department) => ({
                          value: department,
                          label: department,
                        }))}
                        value={
                          formData[item.properties]
                            ? {
                                value: formData[item.properties],
                                label: formData[item.properties],
                              }
                            : null
                        }
                        onChange={(option) =>
                          handleInputChange({
                            target: {
                              id: item.properties,
                              value: option ? option.value : '',
                            },
                          })
                        }
                        filterOption={customFilter}
                        isSearchable
                        placeholder='選択してください'
                      />
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
        } else {
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
                <div className={styles.errorMsg}>
                  {renderError(item.properties)}
                </div>
              </div>
            </div>
          )
        }

      case 'tel':
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
                    type='tel'
                    name={item.itemName}
                    value={formData[item.properties] || ''}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                    placeholder={item.placeholder}
                  />
                </div>
              </div>
              <div className={styles.errorMsg}>
                {renderError(item.properties)}
              </div>
            </div>
          </div>
        )
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
//省略
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
            step >= 1 ? styles.active : ''
          }`}
        >
          1<span className={step >= 1 ? styles.barmiddle : ''}></span>
        </div>

        <div
          className={`${styles.progressLine} ${step >= 2 ? styles.active : ''}`}
        ></div>
        <div
          className={`${styles.progressCircle} ${
            step >= 2 ? styles.active : ''
          } `}
        >
          2<span className={step >= 2 ? styles.barmiddle : ''}></span>
        </div>
        <div
          className={`${styles.progressLine} ${step >= 3 ? styles.active : ''}`}
        ></div>
        <div
          className={`${styles.progressCircle} ${
            step === 3 ? styles.active : ''
          }`}
        >
          3
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleArea}>登録フォーム（無料）</div>
      <div className={styles.barArea}>{renderGageArea()}</div>
      <div className={styles.formArea}>
        <div className={styles.form__content}>{renderFormStep()}</div>
      </div>
    </div>
  )
}
