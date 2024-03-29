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
  {
    id: 4,
    itemName: '卒業年度',
    type: 'radio',
    values: ['2024年卒', '2025年卒', '2026年卒', '既に就業中'],
    properties: 'year__c',
  },
  {
    id: 5,
    itemName: 'お名前（姓）',
    type: 'text',
    properties: 'lastname',
    placeholder: '例）色出す',
  },
  {
    id: 6,
    itemName: 'お名前（名）',
    type: 'text',
    properties: 'firstname',
    placeholder: '例）太郎',
  },
  {
    id: 7,
    itemName: 'フリガナ（セイ）',
    type: 'text',
    properties: 'furigana_sei__c',
    placeholder: '例）イロダス',
  },
  {
    id: 8,
    itemName: 'フリガナ（メイ）',
    type: 'text',
    properties: 'furigana_mei__c',
    placeholder: '例）タロウ',
  },
  {
    id: 9,
    itemName: '文理区分',
    type: 'radio',
    values: ['文系', '理系'],
    properties: 'liberalartsscience__c',
  },
  {
    id: 10,
    itemName: '電話番号',
    type: 'tel',
    properties: 'phone',
    placeholder: '例）090-1234-5678',
  },
  {
    id: 11,
    itemName: 'Mail',
    type: 'text',
    properties: 'email',
    placeholder: '例） irodastaro@irodas.com',
  },
  {
    id: 12,
    itemName: 'ご要望欄',
    type: 'textarea',
    properties: 'entry_memo',
    placeholder: '例）必要なものはありますか',
  },
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
    properties: 'entry_memo',
  },
]

export default items
