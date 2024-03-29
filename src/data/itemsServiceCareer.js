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
    placeholder: '例）色出',
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
  {
    id: 14,
    itemName: '生年月日',
    type: 'select',
    properties: 'birth_year',
  },
  {
    id: 15,
    itemName: '生年月日',
    type: 'select',
    properties: 'birth_month',
  },
  {
    id: 16,
    itemName: '生年月日',
    type: 'select',
    properties: 'birth_day',
  },
  {
    id: 17,
    itemName: '直近経験した業界',
    type: 'select',
    properties: 'gyoukai',
    values: [
      '直近経験した業界',
      'IT・通信系',
      'サービス系',
      'メーカー系（電気・電子・機械系）',
      '専門コンサル系',
      'メーカー系（素材・医薬品他）',
      'マスコミ系',
      '商社系（電気・電子・機械系）',
      '金融・保険系',
      '商社系（総合商社・素材・医薬品他）',
      '不動産・建築系',
      '流通・小売系',
      'その他',
    ],
  },
  {
    id: 18,
    itemName: '直近経験した職種',
    type: 'select',
    properties: 'syokusyu',
    values: [
      '直近経験した職種',
      '事務、企画',
      '営業、販売、サービス',
      '電気・電子・機械・組み込みエンジニア、技能工',
      'ITエンジニア（システム、インフラ開発など）',
      'インターネット専門職',
      '建築・土木技術者、不動産',
      '素材・食品・医薬品技術者',
      'コンサルタント、金融',
      'クリエイティブ（広告、ゲーム、ファッションなど）',
      '講師、公務員、福祉、運輸、その他',
    ],
  },
  {
    id: 19,
    itemName: '現在の居住地',
    type: 'select',
    properties: 'kyojyuuchi',
    values: [
      '現在の居住地',
      '東京都',
      '大阪府',
      '北海道',
      '青森県',
      '岩手県',
      '宮城県',
      '秋田県',
      '山形県',
      '福島県',
      '茨城県',
      '栃木県',
      '群馬県',
      '埼玉県',
      '千葉県',
      '神奈川県',
      '新潟県',
      '富山県',
      '石川県',
      '福井県',
      '山梨県',
      '長野県',
      '岐阜県',
      '静岡県',
      '愛知県',
      '三重県',
      '滋賀県',
      '京都府',
      '兵庫県',
      '奈良県',
      '和歌山県',
      '鳥取県',
      '島根県',
      '岡山県',
      '広島県',
      '山口県',
      '徳島県',
      '香川県',
      '愛媛県',
      '高知県',
      '福岡県',
      '佐賀県',
      '長崎県',
      '熊本県',
      '大分県',
      '宮崎県',
      '鹿児島県',
      '沖縄県',
      'その他（海外）',
    ],
  },
  {
    id: 20,
    itemName: '転職希望時期',
    type: 'select',
    properties: 'jiki',
    values: [
      '転職希望時期',
      '今すぐにでも',
      '3ヶ月以内',
      '6ヶ月以内',
      '1年以内',
      '未定',
    ],
  },
  {
    id: 21,
    itemName: '直近の年収',
    type: 'text',
    properties: 'nensyu',
    placeholder: '例）300',
  },
  {
    id: 22,
    itemName: '直近経験した企業名',
    type: 'text',
    properties: 'companyname',
    placeholder: '例） 株式会社irodas',
  },
]

export default items





