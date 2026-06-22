const gradeOptions = {
  elementary: [
    ["e3", "國小三年級"],
    ["e4", "國小四年級"],
    ["e5", "國小五年級"],
    ["e6", "國小六年級"]
  ],
  junior: [
    ["j1", "國中一年級"],
    ["j2", "國中二年級"],
    ["j3", "國中三年級"]
  ]
};

const subjectLabels = {
  all: "全科混合",
  math: "數學",
  chinese: "國文",
  english: "英語",
  science: "自然",
  social: "社會",
  social_geography: "社會：地理",
  social_history: "社會：歷史",
  social_civics: "社會：公民",
  science_biology: "自然：生物",
  science_physics: "自然：物理",
  science_chemistry: "自然：化學"
};

const subjectOptionsByStage = {
  elementary: [
    { value: "all", label: "全科混合" },
    { value: "chinese", label: "國文" },
    { value: "math", label: "數學" },
    { value: "english", label: "英語" },
    { value: "social", label: "社會" },
    { value: "science", label: "自然" }
  ],
  junior: [
    { value: "all", label: "全科混合" },
    { value: "chinese", label: "國文" },
    { value: "math", label: "數學" },
    { value: "english", label: "英語" },
    { group: "社會", options: [
      { value: "social_geography", label: "地理" },
      { value: "social_history", label: "歷史" },
      { value: "social_civics", label: "公民" }
    ] },
    { group: "自然", options: [
      { value: "science_biology", label: "生物" },
      { value: "science_physics", label: "物理" },
      { value: "science_chemistry", label: "化學" }
    ] }
  ]
};

const subjectOrderByStage = {
  elementary: ["math", "chinese", "english", "science", "social"],
  junior: [
    "math",
    "chinese",
    "english",
    "social_geography",
    "social_history",
    "social_civics",
    "science_biology",
    "science_physics",
    "science_chemistry"
  ]
};

const subjectFallbacks = {
  social_geography: ["social_geography", "social_history", "social_civics"],
  social_history: ["social_history", "social_geography", "social_civics"],
  social_civics: ["social_civics", "social_history", "social_geography"],
  science_biology: ["science_biology", "science_chemistry", "science_physics"],
  science_physics: ["science_physics", "science_chemistry", "science_biology"],
  science_chemistry: ["science_chemistry", "science_physics", "science_biology"]
};

const gradeProfiles = {
  e3: {
    stage: "elementary",
    label: "國小三年級",
    levels: ["foundation"],
    focus: "先確認基本讀題、整數四則、常用詞語、基礎英文單字，以及生活中的自然與社會觀念。"
  },
  e4: {
    stage: "elementary",
    label: "國小四年級",
    levels: ["foundation", "core"],
    focus: "觀察四則應用、分數初步、段落理解、be 動詞與生活科學概念是否穩定。"
  },
  e5: {
    stage: "elementary",
    label: "國小五年級",
    levels: ["core"],
    focus: "加強小數、面積、主旨判斷、句型理解與跨題目線索整理能力。"
  },
  e6: {
    stage: "elementary",
    label: "國小六年級",
    levels: ["core", "advanced"],
    focus: "確認升國中前的整合能力，包含多步驟計算、閱讀推論、英文句構與自然社會概念連結。"
  },
  j1: {
    stage: "junior",
    label: "國中一年級",
    levels: ["foundation"],
    focus: "先檢查國中銜接能力，例如方程式入門、文言詞義、英文基礎文法、細胞與公民基本概念。"
  },
  j2: {
    stage: "junior",
    label: "國中二年級",
    levels: ["foundation", "core"],
    focus: "觀察比例、幾何、閱讀推論、時態、力與運動，以及歷史地理因果判讀。"
  },
  j3: {
    stage: "junior",
    label: "國中三年級",
    levels: ["core", "advanced"],
    focus: "以會考前診斷為方向，檢查跨單元應用、推論、比較級與連接詞、密度生態及史地整合。"
  }
};

const questionBank = [
  {
    id: "m-e-01",
    stages: ["elementary"],
    subjects: ["math"],
    skill: "整數與四則運算",
    level: "foundation",
    prompt: "一盒鉛筆有 12 枝，買 4 盒後又送 6 枝，共有幾枝鉛筆？",
    options: ["42", "48", "54", "60"],
    answer: "54",
    explanation: "12 × 4 + 6 = 54。"
  },
  {
    id: "m-e-02",
    stages: ["elementary"],
    subjects: ["math"],
    skill: "分數概念",
    level: "core",
    prompt: "下列哪一個分數和 1/2 一樣大？",
    options: ["2/3", "2/4", "3/5", "4/6"],
    answer: "2/4",
    explanation: "1/2 的分子分母同乘 2，可得到 2/4。"
  },
  {
    id: "m-e-03",
    stages: ["elementary"],
    subjects: ["math"],
    skill: "面積與單位",
    level: "core",
    prompt: "長方形長 8 公分、寬 5 公分，面積是多少平方公分？",
    options: ["13", "26", "40", "80"],
    answer: "40",
    explanation: "長方形面積 = 長 × 寬。"
  },
  {
    id: "m-j-01",
    stages: ["junior"],
    subjects: ["math"],
    skill: "一元一次方程式",
    level: "foundation",
    prompt: "若 3x + 5 = 20，x 等於多少？",
    options: ["3", "5", "8", "15"],
    answer: "5",
    explanation: "3x = 15，所以 x = 5。"
  },
  {
    id: "m-j-02",
    stages: ["junior"],
    subjects: ["math"],
    skill: "比例與百分率",
    level: "core",
    prompt: "一件商品原價 800 元，打八折後是多少元？",
    options: ["560", "600", "640", "720"],
    answer: "640",
    explanation: "八折是 80%，800 × 0.8 = 640。"
  },
  {
    id: "c-e-01",
    stages: ["elementary"],
    subjects: ["chinese"],
    skill: "詞語理解",
    level: "foundation",
    prompt: "「專心致志」最接近下列哪個意思？",
    options: ["十分用心", "非常生氣", "動作很快", "聲音很大"],
    answer: "十分用心",
    explanation: "專心致志表示精神集中、很用心。"
  },
  {
    id: "c-e-02",
    stages: ["elementary"],
    subjects: ["chinese"],
    skill: "句意判讀",
    level: "core",
    prompt: "「天色漸暗，媽媽催我趕快回家。」這句話主要表達什麼？",
    options: ["媽媽要出門", "天快黑了要回家", "我想去上學", "天氣變熱了"],
    answer: "天快黑了要回家",
    explanation: "關鍵線索是天色漸暗與趕快回家。"
  },
  {
    id: "c-j-01",
    stages: ["junior"],
    subjects: ["chinese"],
    skill: "文意推論",
    level: "core",
    prompt: "文章若先描述問題，再提出解決方法，最可能使用哪種寫法？",
    options: ["因果說明", "問題解決", "時間順序", "人物描寫"],
    answer: "問題解決",
    explanation: "先提出問題再給方法，是典型的問題解決結構。"
  },
  {
    id: "c-j-02",
    stages: ["junior"],
    subjects: ["chinese"],
    skill: "修辭判斷",
    level: "advanced",
    prompt: "「時間像河流一樣不停向前。」使用了哪種修辭？",
    options: ["排比", "譬喻", "設問", "誇飾"],
    answer: "譬喻",
    explanation: "把時間比作河流，是譬喻。"
  },
  {
    id: "e-e-01",
    stages: ["elementary"],
    subjects: ["english"],
    skill: "基礎單字",
    level: "foundation",
    prompt: "Which word means 「星期一」?",
    options: ["Sunday", "Monday", "Friday", "Month"],
    answer: "Monday",
    explanation: "Monday 是星期一。"
  },
  {
    id: "e-e-02",
    stages: ["elementary"],
    subjects: ["english"],
    skill: "be 動詞",
    level: "foundation",
    prompt: "She ___ my sister.",
    options: ["am", "are", "is", "be"],
    answer: "is",
    explanation: "主詞 She 搭配 be 動詞 is。"
  },
  {
    id: "e-j-01",
    stages: ["junior"],
    subjects: ["english"],
    skill: "時態判斷",
    level: "core",
    prompt: "I ___ basketball yesterday.",
    options: ["play", "plays", "played", "playing"],
    answer: "played",
    explanation: "yesterday 表示過去時間，要用過去式。"
  },
  {
    id: "e-j-02",
    stages: ["junior"],
    subjects: ["english"],
    skill: "閱讀理解",
    level: "core",
    prompt: "Tom missed the bus, so he was late for school. Why was Tom late?",
    options: ["He was sick.", "He missed the bus.", "He forgot school.", "He played games."],
    answer: "He missed the bus.",
    explanation: "句中明確說 Tom missed the bus。"
  },
  {
    id: "s-e-01",
    stages: ["elementary"],
    subjects: ["science"],
    skill: "植物構造",
    level: "foundation",
    prompt: "植物主要靠哪個部位吸收水分？",
    options: ["花", "葉", "根", "果實"],
    answer: "根",
    explanation: "根的主要功能之一是吸收水分與養分。"
  },
  {
    id: "s-e-02",
    stages: ["elementary"],
    subjects: ["science"],
    skill: "物質狀態",
    level: "core",
    prompt: "冰塊融化成水，屬於哪一種變化？",
    options: ["固體變液體", "液體變氣體", "氣體變液體", "液體變固體"],
    answer: "固體變液體",
    explanation: "冰是固體，融化後成為液體。"
  },
  {
    id: "s-j-01",
    stages: ["junior"],
    subjects: ["science_physics", "science"],
    skill: "力與運動",
    level: "core",
    prompt: "物體速度改變，通常代表受到了什麼影響？",
    options: ["力", "顏色", "溫度一定降低", "體積一定變大"],
    answer: "力",
    explanation: "力會改變物體的運動狀態。"
  },
  {
    id: "s-j-02",
    stages: ["junior"],
    subjects: ["science_biology", "science"],
    skill: "細胞概念",
    level: "foundation",
    prompt: "生物體構造與功能的基本單位是什麼？",
    options: ["細胞", "器官", "系統", "組織"],
    answer: "細胞",
    explanation: "細胞是生物體構造與功能的基本單位。"
  },
  {
    id: "so-e-01",
    stages: ["elementary"],
    subjects: ["social"],
    skill: "地圖閱讀",
    level: "foundation",
    prompt: "地圖上的比例尺主要用來表示什麼？",
    options: ["方向", "距離換算", "天氣", "人口"],
    answer: "距離換算",
    explanation: "比例尺可換算地圖距離與實際距離。"
  },
  {
    id: "so-e-02",
    stages: ["elementary"],
    subjects: ["social"],
    skill: "生活公民",
    level: "core",
    prompt: "排隊買票時遵守先來後到，主要展現哪種態度？",
    options: ["公平與秩序", "競爭速度", "節約用水", "環境保護"],
    answer: "公平與秩序",
    explanation: "排隊是一種維持公平與公共秩序的行為。"
  },
  {
    id: "so-j-01",
    stages: ["junior"],
    subjects: ["social_history", "social"],
    skill: "歷史因果",
    level: "core",
    prompt: "研究歷史事件時，為什麼要比較不同資料？",
    options: ["增加判斷可信度", "讓字數變多", "避免看地圖", "只記年代"],
    answer: "增加判斷可信度",
    explanation: "比較不同史料有助於檢驗事件的可信度與脈絡。"
  },
  {
    id: "so-j-02",
    stages: ["junior"],
    subjects: ["social_geography", "social"],
    skill: "地理判讀",
    level: "core",
    prompt: "若一地降雨少、蒸發旺盛，較可能形成哪種環境？",
    options: ["沙漠", "雨林", "沼澤", "冰河"],
    answer: "沙漠",
    explanation: "乾燥少雨且蒸發強，容易形成沙漠環境。"
  },
  {
    id: "m-e-04",
    stages: ["elementary"],
    subjects: ["math"],
    skill: "小數計算",
    level: "core",
    prompt: "3.5 + 2.25 的結果是多少？",
    options: ["5.25", "5.75", "6.25", "6.75"],
    answer: "5.75",
    explanation: "小數點對齊後相加，3.50 + 2.25 = 5.75。"
  },
  {
    id: "m-e-05",
    stages: ["elementary"],
    subjects: ["math"],
    skill: "時間計算",
    level: "core",
    prompt: "電影下午 2:20 開始，播放 1 小時 35 分，幾點結束？",
    options: ["3:35", "3:45", "3:55", "4:05"],
    answer: "3:55",
    explanation: "2:20 加 1 小時 35 分是 3:55。"
  },
  {
    id: "m-j-03",
    stages: ["junior"],
    subjects: ["math"],
    skill: "幾何角度",
    level: "core",
    prompt: "三角形兩個內角分別是 50 度和 60 度，第三個內角是多少？",
    options: ["60 度", "70 度", "80 度", "90 度"],
    answer: "70 度",
    explanation: "三角形內角和是 180 度，180 - 50 - 60 = 70。"
  },
  {
    id: "m-j-04",
    stages: ["junior"],
    subjects: ["math"],
    skill: "函數概念",
    level: "advanced",
    prompt: "若 y = 2x + 1，當 x = 3 時，y 等於多少？",
    options: ["5", "6", "7", "8"],
    answer: "7",
    explanation: "代入 x = 3，y = 2 × 3 + 1 = 7。"
  },
  {
    id: "m-j-05",
    stages: ["junior"],
    subjects: ["math"],
    skill: "統計平均",
    level: "foundation",
    prompt: "四次小考分數為 70、80、90、100，平均是多少？",
    options: ["80", "85", "90", "95"],
    answer: "85",
    explanation: "總分 340 除以 4，平均為 85。"
  },
  {
    id: "c-e-03",
    stages: ["elementary"],
    subjects: ["chinese"],
    skill: "標點符號",
    level: "foundation",
    prompt: "「你明天要去哪裡」句末最適合加哪個標點？",
    options: ["。", "？", "！", "、"],
    answer: "？",
    explanation: "這是問句，句末應使用問號。"
  },
  {
    id: "c-e-04",
    stages: ["elementary"],
    subjects: ["chinese"],
    skill: "段落大意",
    level: "core",
    prompt: "若一段文字反覆提到節約用水，最可能的主旨是什麼？",
    options: ["介紹玩具", "提醒省水", "描寫夜晚", "說明交通"],
    answer: "提醒省水",
    explanation: "反覆出現的關鍵內容通常和主旨有關。"
  },
  {
    id: "c-e-05",
    stages: ["elementary"],
    subjects: ["chinese"],
    skill: "成語運用",
    level: "core",
    prompt: "下列哪句最適合使用「井井有條」？",
    options: ["房間整理得很整齊", "天空下起大雨", "他跑得很快", "音樂很大聲"],
    answer: "房間整理得很整齊",
    explanation: "井井有條形容條理分明、整齊有序。"
  },
  {
    id: "c-j-03",
    stages: ["junior"],
    subjects: ["chinese"],
    skill: "文言詞義",
    level: "foundation",
    prompt: "文言文中的「吾」通常指的是誰？",
    options: ["你", "我", "他", "大家"],
    answer: "我",
    explanation: "吾常用來表示第一人稱，也就是我。"
  },
  {
    id: "c-j-04",
    stages: ["junior"],
    subjects: ["chinese"],
    skill: "論點辨識",
    level: "core",
    prompt: "議論文中作者最想說服讀者接受的看法稱為什麼？",
    options: ["論點", "例子", "標題", "註解"],
    answer: "論點",
    explanation: "論點是文章要主張或證明的核心看法。"
  },
  {
    id: "c-j-05",
    stages: ["junior"],
    subjects: ["chinese"],
    skill: "語病判斷",
    level: "advanced",
    prompt: "「因為下雨，所以比賽取消了。」這句話的關係是什麼？",
    options: ["因果", "轉折", "並列", "遞進"],
    answer: "因果",
    explanation: "因為表示原因，所以表示結果。"
  },
  {
    id: "e-e-03",
    stages: ["elementary"],
    subjects: ["english"],
    skill: "名詞複數",
    level: "foundation",
    prompt: "One book, two ___.",
    options: ["book", "books", "bookes", "booking"],
    answer: "books",
    explanation: "一般名詞複數常在字尾加 s。"
  },
  {
    id: "e-e-04",
    stages: ["elementary"],
    subjects: ["english"],
    skill: "現在簡單式",
    level: "core",
    prompt: "He ___ to school every day.",
    options: ["go", "goes", "went", "going"],
    answer: "goes",
    explanation: "主詞 He 是第三人稱單數，動詞加 es。"
  },
  {
    id: "e-e-05",
    stages: ["elementary"],
    subjects: ["english"],
    skill: "句子理解",
    level: "core",
    prompt: "What does \"I am hungry\" mean?",
    options: ["我很餓", "我很冷", "我很累", "我很忙"],
    answer: "我很餓",
    explanation: "hungry 的意思是餓。"
  },
  {
    id: "e-j-03",
    stages: ["junior"],
    subjects: ["english"],
    skill: "助動詞",
    level: "foundation",
    prompt: "You ___ finish your homework before watching TV.",
    options: ["should", "is", "was", "has"],
    answer: "should",
    explanation: "should 表示應該，後面接原形動詞。"
  },
  {
    id: "e-j-04",
    stages: ["junior"],
    subjects: ["english"],
    skill: "比較級",
    level: "core",
    prompt: "This bag is ___ than that one.",
    options: ["heavy", "heavier", "heaviest", "more heavy"],
    answer: "heavier",
    explanation: "than 前常用比較級，heavy 的比較級是 heavier。"
  },
  {
    id: "e-j-05",
    stages: ["junior"],
    subjects: ["english"],
    skill: "連接詞",
    level: "core",
    prompt: "I was tired, ___ I kept studying.",
    options: ["but", "because", "if", "when"],
    answer: "but",
    explanation: "前後語意轉折，適合用 but。"
  },
  {
    id: "s-e-03",
    stages: ["elementary"],
    subjects: ["science"],
    skill: "磁鐵性質",
    level: "foundation",
    prompt: "磁鐵最容易吸引下列哪一種物品？",
    options: ["鐵釘", "紙張", "塑膠尺", "木棒"],
    answer: "鐵釘",
    explanation: "磁鐵會吸引鐵、鈷、鎳等材料。"
  },
  {
    id: "s-e-04",
    stages: ["elementary"],
    subjects: ["science"],
    skill: "天氣觀察",
    level: "core",
    prompt: "用來測量氣溫的工具是什麼？",
    options: ["溫度計", "量筒", "指南針", "天平"],
    answer: "溫度計",
    explanation: "溫度計可測量溫度。"
  },
  {
    id: "s-e-05",
    stages: ["elementary"],
    subjects: ["science"],
    skill: "聲音傳播",
    level: "core",
    prompt: "聲音的產生通常和什麼有關？",
    options: ["振動", "顏色", "影子", "重量"],
    answer: "振動",
    explanation: "聲音通常由物體振動產生。"
  },
  {
    id: "s-j-03",
    stages: ["junior"],
    subjects: ["science_physics", "science"],
    skill: "密度概念",
    level: "core",
    prompt: "密度的計算方式是什麼？",
    options: ["質量 ÷ 體積", "體積 ÷ 質量", "質量 + 體積", "質量 × 溫度"],
    answer: "質量 ÷ 體積",
    explanation: "密度 = 質量 / 體積。"
  },
  {
    id: "s-j-04",
    stages: ["junior"],
    subjects: ["science_chemistry", "science"],
    skill: "酸鹼判斷",
    level: "foundation",
    prompt: "石蕊試紙常用來判斷溶液的什麼性質？",
    options: ["酸鹼性", "重量", "體積", "透明度"],
    answer: "酸鹼性",
    explanation: "石蕊試紙可協助判斷酸性或鹼性。"
  },
  {
    id: "s-j-05",
    stages: ["junior"],
    subjects: ["science_biology", "science"],
    skill: "生態系",
    level: "core",
    prompt: "生態系中，植物通常扮演什麼角色？",
    options: ["生產者", "消費者", "分解者", "寄生者"],
    answer: "生產者",
    explanation: "植物可行光合作用，通常是生產者。"
  },
  {
    id: "so-e-03",
    stages: ["elementary"],
    subjects: ["social"],
    skill: "社區生活",
    level: "foundation",
    prompt: "社區居民共同維護公園環境，最能表現哪種精神？",
    options: ["公共參與", "個人競爭", "商品買賣", "交通運輸"],
    answer: "公共參與",
    explanation: "共同維護公共空間是公共參與的一種表現。"
  },
  {
    id: "so-e-04",
    stages: ["elementary"],
    subjects: ["social"],
    skill: "方位判讀",
    level: "foundation",
    prompt: "地圖上通常上方代表哪個方向？",
    options: ["北方", "南方", "東方", "西方"],
    answer: "北方",
    explanation: "一般地圖若無特別標示，上方多代表北方。"
  },
  {
    id: "so-e-05",
    stages: ["elementary"],
    subjects: ["social"],
    skill: "經濟生活",
    level: "core",
    prompt: "用錢購買需要的物品，屬於哪一種活動？",
    options: ["消費", "選舉", "遷移", "降雨"],
    answer: "消費",
    explanation: "購買商品或服務是消費活動。"
  },
  {
    id: "so-j-03",
    stages: ["junior"],
    subjects: ["social_civics", "social"],
    skill: "公民權利",
    level: "foundation",
    prompt: "人民透過投票選出代表，主要行使哪種權利？",
    options: ["參政權", "受教權", "工作權", "財產權"],
    answer: "參政權",
    explanation: "投票是參與政治的重要方式。"
  },
  {
    id: "so-j-04",
    stages: ["junior"],
    subjects: ["social_geography", "social"],
    skill: "氣候判讀",
    level: "core",
    prompt: "一年四季氣溫與雨量的長期平均狀況稱為什麼？",
    options: ["氣候", "天氣", "潮汐", "地震"],
    answer: "氣候",
    explanation: "氣候是長時間統計出的天氣特徵。"
  },
  {
    id: "so-j-05",
    stages: ["junior"],
    subjects: ["social_history", "social"],
    skill: "歷史時間序",
    level: "core",
    prompt: "整理歷史事件先後順序，最適合使用哪種工具？",
    options: ["時間軸", "圓餅圖", "等高線圖", "天氣圖"],
    answer: "時間軸",
    explanation: "時間軸可清楚呈現事件發生的先後。"
  },
  {
    id: "geo-j-01",
    stages: ["junior"],
    subjects: ["social_geography", "social"],
    skill: "經緯度判讀",
    level: "foundation",
    prompt: "地球上用來表示南北位置的線稱為什麼？",
    options: ["緯線", "經線", "等高線", "海岸線"],
    answer: "緯線",
    explanation: "緯線可表示南北位置，經線可表示東西位置。"
  },
  {
    id: "geo-j-02",
    stages: ["junior"],
    subjects: ["social_geography", "social"],
    skill: "地形判讀",
    level: "core",
    prompt: "等高線越密集，通常代表地形坡度如何？",
    options: ["越陡", "越平坦", "一定是海洋", "一定是沙漠"],
    answer: "越陡",
    explanation: "等高線密集表示短距離內高度變化大，坡度較陡。"
  },
  {
    id: "geo-j-03",
    stages: ["junior"],
    subjects: ["social_geography", "social"],
    skill: "人口分布",
    level: "core",
    prompt: "交通便利、工作機會多的地區，人口通常會如何分布？",
    options: ["較集中", "完全沒有居民", "一定平均分布", "只在山頂聚集"],
    answer: "較集中",
    explanation: "交通與就業機會會影響人口聚集。"
  },
  {
    id: "his-j-01",
    stages: ["junior"],
    subjects: ["social_history", "social"],
    skill: "史料判讀",
    level: "foundation",
    prompt: "研究歷史時，日記、書信、照片通常可作為什麼？",
    options: ["史料", "天氣預報", "地形圖", "化學式"],
    answer: "史料",
    explanation: "日記、書信、照片都可能保存過去的資訊，可作為史料。"
  },
  {
    id: "his-j-02",
    stages: ["junior"],
    subjects: ["social_history", "social"],
    skill: "歷史因果",
    level: "core",
    prompt: "分析事件發生的原因與結果，主要是在理解什麼？",
    options: ["歷史因果", "地圖比例", "酸鹼反應", "英文時態"],
    answer: "歷史因果",
    explanation: "歷史學習常需要理解事件的原因、經過與影響。"
  },
  {
    id: "his-j-03",
    stages: ["junior"],
    subjects: ["social_history", "social"],
    skill: "時代特色",
    level: "core",
    prompt: "若某時期商業活絡、城市興起，最可能反映哪種變化？",
    options: ["經濟與社會變遷", "氣溫下降", "地震頻繁", "細胞分裂"],
    answer: "經濟與社會變遷",
    explanation: "商業與城市發展通常和經濟、社會結構變化有關。"
  },
  {
    id: "civ-j-01",
    stages: ["junior"],
    subjects: ["social_civics", "social"],
    skill: "法律規範",
    level: "foundation",
    prompt: "法律在社會中最主要的功能之一是什麼？",
    options: ["維持秩序", "改變天氣", "增加重力", "測量溫度"],
    answer: "維持秩序",
    explanation: "法律能規範行為並維持社會秩序。"
  },
  {
    id: "civ-j-02",
    stages: ["junior"],
    subjects: ["social_civics", "social"],
    skill: "權利與義務",
    level: "core",
    prompt: "接受國民教育通常同時涉及人民的什麼？",
    options: ["權利與義務", "緯度與經度", "酸與鹼", "力與速度"],
    answer: "權利與義務",
    explanation: "受教育既是人民權利，也和國民義務有關。"
  },
  {
    id: "civ-j-03",
    stages: ["junior"],
    subjects: ["social_civics", "social"],
    skill: "民主參與",
    level: "core",
    prompt: "學生會選舉讓學生投票選代表，主要是在練習哪種概念？",
    options: ["民主參與", "物質三態", "語音變化", "生態演替"],
    answer: "民主參與",
    explanation: "投票選代表是民主參與的一種練習。"
  },
  {
    id: "bio-j-01",
    stages: ["junior"],
    subjects: ["science_biology", "science"],
    skill: "光合作用",
    level: "foundation",
    prompt: "植物行光合作用時，主要會利用哪一種能量？",
    options: ["光能", "聲能", "磁力", "摩擦力"],
    answer: "光能",
    explanation: "植物利用光能進行光合作用，製造養分。"
  },
  {
    id: "bio-j-02",
    stages: ["junior"],
    subjects: ["science_biology", "science"],
    skill: "消化系統",
    level: "core",
    prompt: "人體消化系統的主要功能是什麼？",
    options: ["分解食物並吸收養分", "產生地震", "測量氣壓", "改變磁極"],
    answer: "分解食物並吸收養分",
    explanation: "消化系統負責分解食物，使養分能被吸收利用。"
  },
  {
    id: "bio-j-03",
    stages: ["junior"],
    subjects: ["science_biology", "science"],
    skill: "遺傳概念",
    level: "advanced",
    prompt: "親代特徵傳給子代，主要和下列哪個概念有關？",
    options: ["遺傳", "摩擦", "蒸發", "經緯度"],
    answer: "遺傳",
    explanation: "生物特徵由親代傳給子代，屬於遺傳概念。"
  },
  {
    id: "phy-j-01",
    stages: ["junior"],
    subjects: ["science_physics", "science"],
    skill: "速度概念",
    level: "foundation",
    prompt: "速度通常可用哪個方式計算？",
    options: ["距離 ÷ 時間", "時間 ÷ 距離", "質量 ÷ 體積", "溫度 × 面積"],
    answer: "距離 ÷ 時間",
    explanation: "速度是單位時間內移動的距離。"
  },
  {
    id: "phy-j-02",
    stages: ["junior"],
    subjects: ["science_physics", "science"],
    skill: "電路概念",
    level: "core",
    prompt: "要讓燈泡發亮，電路通常必須是什麼狀態？",
    options: ["通路", "斷路", "短缺水分", "沒有導線"],
    answer: "通路",
    explanation: "形成完整通路時，電流才能通過燈泡。"
  },
  {
    id: "phy-j-03",
    stages: ["junior"],
    subjects: ["science_physics", "science"],
    skill: "熱傳播",
    level: "core",
    prompt: "金屬湯匙放入熱湯後手把變熱，主要是哪種熱傳播？",
    options: ["傳導", "對流", "輻射", "折射"],
    answer: "傳導",
    explanation: "熱由金屬一端傳到另一端，屬於傳導。"
  },
  {
    id: "chem-j-01",
    stages: ["junior"],
    subjects: ["science_chemistry", "science"],
    skill: "物質分類",
    level: "foundation",
    prompt: "水的化學式是什麼？",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O",
    explanation: "水分子由兩個氫原子與一個氧原子組成，化學式是 H2O。"
  },
  {
    id: "chem-j-02",
    stages: ["junior"],
    subjects: ["science_chemistry", "science"],
    skill: "化學反應",
    level: "core",
    prompt: "鐵生鏽通常屬於哪一類變化？",
    options: ["化學變化", "單純形狀改變", "位置改變", "音量改變"],
    answer: "化學變化",
    explanation: "鐵生鏽會產生新物質，屬於化學變化。"
  },
  {
    id: "chem-j-03",
    stages: ["junior"],
    subjects: ["science_chemistry", "science"],
    skill: "溶液概念",
    level: "core",
    prompt: "食鹽完全溶於水後，形成的混合物稱為什麼？",
    options: ["溶液", "沉澱", "純金屬", "細胞"],
    answer: "溶液",
    explanation: "溶質均勻分散在溶劑中形成溶液。"
  }
];

const state = {
  config: null,
  questions: [],
  answers: {},
  report: null,
  records: loadStudentRecords(),
  selectedRecordId: null,
  currentHistoryId: null,
  mode: "teacher",
  studentSubmitted: false
};

const teacherApp = document.querySelector("#teacherApp");
const studentApp = document.querySelector("#studentApp");
const teacherModeBtn = document.querySelector("#teacherModeBtn");
const studentModeBtn = document.querySelector("#studentModeBtn");
const pageTitle = document.querySelector("#pageTitle");
const statusTitle = document.querySelector("#statusTitle");
const statusCopy = document.querySelector("#statusCopy");
const summaryStudent = document.querySelector("#summaryStudent");
const summaryScope = document.querySelector("#summaryScope");
const summaryCount = document.querySelector("#summaryCount");
const stageInput = document.querySelector("#schoolStage");
const gradeInput = document.querySelector("#grade");
const subjectInput = document.querySelector("#subject");
const quizList = document.querySelector("#quizList");
const emptyQuiz = document.querySelector("#emptyQuiz");
const emptyReport = document.querySelector("#emptyReport");
const reportContent = document.querySelector("#reportContent");
const gradeFocus = document.querySelector("#gradeFocus");
const sessionNote = document.querySelector("#sessionNote");
const emptyRecords = document.querySelector("#emptyRecords");
const recordsContent = document.querySelector("#recordsContent");
const studentList = document.querySelector("#studentList");
const recordStudentName = document.querySelector("#recordStudentName");
const recordMeta = document.querySelector("#recordMeta");
const recordScore = document.querySelector("#recordScore");
const recordPriorities = document.querySelector("#recordPriorities");
const reportTeachingContent = document.querySelector("#reportTeachingContent");
const teachingContent = document.querySelector("#teachingContent");
const longTermNote = document.querySelector("#longTermNote");
const historyList = document.querySelector("#historyList");
const studentPortalName = document.querySelector("#studentPortalName");
const studentPortalScope = document.querySelector("#studentPortalScope");
const studentPortalCount = document.querySelector("#studentPortalCount");
const studentEmptyQuiz = document.querySelector("#studentEmptyQuiz");
const studentDone = document.querySelector("#studentDone");
const studentQuizList = document.querySelector("#studentQuizList");
const studentSubmitBtn = document.querySelector("#studentSubmitBtn");
const teacherReportBtn = document.querySelector("#teacherReportBtn");

function loadStudentRecords() {
  try {
    return JSON.parse(localStorage.getItem("tutorStudentRecords") || "[]");
  } catch (error) {
    return [];
  }
}

function persistStudentRecords() {
  localStorage.setItem("tutorStudentRecords", JSON.stringify(state.records));
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setGrades() {
  const options = gradeOptions[stageInput.value];
  gradeInput.innerHTML = options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  renderSubjectOptions();
  renderGradeFocus();
}

function renderSubjectOptions() {
  const options = subjectOptionsByStage[stageInput.value];
  subjectInput.innerHTML = options.map((item) => {
    if (item.group) {
      const innerOptions = item.options
        .map((option) => `<option value="${option.value}">${option.label}</option>`)
        .join("");
      return `<optgroup label="${item.group}">${innerOptions}</optgroup>`;
    }

    return `<option value="${item.value}">${item.label}</option>`;
  }).join("");
}

function renderGradeFocus() {
  const profile = gradeProfiles[gradeInput.value];
  if (!profile) return;

  gradeFocus.innerHTML = `
    <div>
      <span>年級診斷重點</span>
      <strong>${profile.label}</strong>
    </div>
    <p>${profile.focus}</p>
  `;
}

function getConfig() {
  const studentName = document.querySelector("#studentName").value.trim() || "未命名學生";
  const stage = stageInput.value;
  const grade = gradeInput.value;
  const gradeLabel = gradeInput.options[gradeInput.selectedIndex].textContent;
  const subject = subjectInput.value;
  const count = Number(document.querySelector("#questionCount").value);
  const learningGoal = document.querySelector("#learningGoal").value;
  const teacherNote = document.querySelector("#teacherNote").value.trim();

  return {
    studentName,
    stage,
    stageLabel: stage === "elementary" ? "國小" : "國中",
    grade,
    gradeLabel,
    subject,
    subjectLabel: subjectLabels[subject],
    count,
    learningGoal,
    teacherNote
  };
}

function pickQuestions(config) {
  const selectedSubjects = subjectFallbacks[config.subject] || [config.subject];
  const subjectPool = config.subject === "all"
    ? questionBank
    : questionBank.filter((question) => selectedSubjects.some((subject) => question.subjects.includes(subject)));

  const profile = gradeProfiles[config.grade];
  const stagePool = subjectPool.filter((question) => question.stages.includes(config.stage));
  const gradePool = stagePool.filter((question) => profile.levels.includes(question.level));
  const fallbackPool = stagePool.filter((question) => !gradePool.includes(question));
  const balanced = [];
  const subjectOrder = config.subject === "all"
    ? subjectOrderByStage[config.stage]
    : selectedSubjects;

  subjectOrder.forEach((subject) => {
    gradePool
      .filter((question) => question.subjects.includes(subject))
      .forEach((question) => balanced.push(question));
  });

  subjectOrder.forEach((subject) => {
    fallbackPool
      .filter((question) => question.subjects.includes(subject))
      .forEach((question) => balanced.push(question));
  });

  const merged = balanced.filter((question, index, arr) => {
    return arr.findIndex((item) => item.id === question.id) === index;
  });

  return merged.slice(0, config.count);
}

function updateHeader() {
  const config = state.config;
  summaryStudent.textContent = config?.studentName || "未設定";
  summaryScope.textContent = config ? `${config.gradeLabel}・${config.subjectLabel}` : "未設定";
  summaryCount.textContent = String(state.questions.length);

  if (!config) {
    statusTitle.textContent = "尚未建立測驗";
    statusCopy.textContent = "選擇年級、科目與題數後開始。";
    return;
  }

  if (state.report) {
    statusTitle.textContent = "已完成診斷";
    statusCopy.textContent = `${config.studentName} 的報告已產生。`;
    return;
  }

  statusTitle.textContent = "測驗已建立";
  statusCopy.textContent = `目前有 ${state.questions.length} 題等待作答。`;
}

function switchView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `${viewName}View`);
  });

  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === viewName);
  });

  const titles = {
    setup: "建立學生診斷測驗",
    quiz: "學生作答",
    report: "程度分析與補強方向",
    records: "學生檔案與教學內容"
  };
  pageTitle.textContent = titles[viewName];
}

function setMode(mode, teacherView = null) {
  state.mode = mode;
  teacherApp.hidden = mode !== "teacher";
  studentApp.hidden = mode !== "student";
  teacherModeBtn.classList.toggle("active", mode === "teacher");
  studentModeBtn.classList.toggle("active", mode === "student");

  if (teacherView) {
    switchView(teacherView);
  }

  renderStudentPortal();
}

function renderStudentPortal() {
  studentPortalName.textContent = state.config?.studentName || "尚未建立測驗";
  studentPortalScope.textContent = state.config ? `${state.config.gradeLabel}・${state.config.subjectLabel}` : "請老師先建立測驗";
  studentPortalCount.textContent = String(state.questions.length);

  const hasQuiz = state.questions.length > 0;
  studentEmptyQuiz.hidden = hasQuiz;
  studentDone.hidden = !state.studentSubmitted;
  studentQuizList.hidden = !hasQuiz || state.studentSubmitted;
  studentSubmitBtn.hidden = !hasQuiz || state.studentSubmitted;

  renderStudentQuiz();
}

function renderStudentQuiz() {
  if (state.questions.length === 0 || state.studentSubmitted) {
    studentQuizList.innerHTML = "";
    return;
  }

  studentQuizList.innerHTML = state.questions.map((question, index) => {
    const options = question.options.map((option) => {
      const checked = state.answers[question.id] === option ? "checked" : "";
      return `
        <label class="option-row">
          <input type="radio" name="student-${question.id}" data-question-id="${question.id}" value="${option}" ${checked}>
          <span>${option}</span>
        </label>
      `;
    }).join("");

    return `
      <article class="question-card student-question-card">
        <div class="question-meta">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${subjectLabels[question.subjects[0]]}</strong>
        </div>
        <p class="question-prompt">${question.prompt}</p>
        <div class="option-grid">${options}</div>
      </article>
    `;
  }).join("");

  studentQuizList.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.answers[event.target.dataset.questionId] = event.target.value;
      renderQuiz();
      updateHeader();
    });
  });
}

function renderQuiz() {
  emptyQuiz.hidden = state.questions.length > 0;
  quizList.innerHTML = state.questions.map((question, index) => {
    const options = question.options.map((option) => {
      const checked = state.answers[question.id] === option ? "checked" : "";
      return `
        <label class="option-row">
          <input type="radio" name="${question.id}" value="${option}" ${checked}>
          <span>${option}</span>
        </label>
      `;
    }).join("");

    return `
      <article class="question-card">
        <div class="question-meta">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${subjectLabels[question.subjects[0]]}</strong>
          <em>${question.skill}</em>
        </div>
        <p class="question-prompt">${question.prompt}</p>
        <div class="option-grid">${options}</div>
      </article>
    `;
  }).join("");

  quizList.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.answers[event.target.name] = event.target.value;
      updateHeader();
    });
  });
}

function subjectStats() {
  const stats = {};

  state.questions.forEach((question) => {
    const subject = question.subjects[0];
    if (!stats[subject]) {
      stats[subject] = { subject, total: 0, correct: 0, weakSkills: {} };
    }

    stats[subject].total += 1;
    const isCorrect = state.answers[question.id] === question.answer;
    if (isCorrect) {
      stats[subject].correct += 1;
    } else {
      stats[subject].weakSkills[question.skill] = (stats[subject].weakSkills[question.skill] || 0) + 1;
    }
  });

  return Object.values(stats);
}

function buildReport() {
  const total = state.questions.length;
  const correct = state.questions.filter((question) => state.answers[question.id] === question.answer).length;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  const stats = subjectStats();
  const weakItems = [];

  stats.forEach((item) => {
    Object.entries(item.weakSkills).forEach(([skill, misses]) => {
      weakItems.push({
        subject: item.subject,
        label: subjectLabels[item.subject],
        skill,
        misses
      });
    });
  });

  weakItems.sort((a, b) => b.misses - a.misses);

  let level = "需要先補基礎";
  if (accuracy >= 85) level = "程度穩定，可進入進階";
  else if (accuracy >= 70) level = "基礎尚可，需加強應用";
  else if (accuracy >= 50) level = "部分觀念不穩，需系統補強";

  const priority = weakItems.slice(0, 4);
  const config = state.config;
  const subjectSummary = stats.map((item) => {
    const rate = Math.round((item.correct / item.total) * 100);
    return `${subjectLabels[item.subject]} ${rate}%`;
  }).join("、");

  let diagnosis = `${config.studentName} 目前在 ${config.gradeLabel} 的 ${config.subjectLabel} 診斷中，整體正確率為 ${accuracy}%。`;
  diagnosis += ` 科目表現為 ${subjectSummary || "尚無資料"}。`;
  diagnosis += ` 此年級建議觀察重點：${gradeProfiles[config.grade].focus}`;

  if (config.teacherNote) {
    diagnosis += ` 老師觀察提到「${config.teacherNote}」，建議和本次錯題一起比對，確認是觀念、速度或閱讀理解造成。`;
  }

  const plan = makeLessonPlan(accuracy, priority, config);
  const draftReport = {
    accuracy,
    correct,
    total,
    level,
    stats,
    priority,
    diagnosis,
    plan
  };

  state.report = {
    ...draftReport,
    teachingContent: makeTeachingContent(draftReport, config)
  };
}

function makeLessonPlan(accuracy, priority, config) {
  const firstWeak = priority[0];
  const secondWeak = priority[1];

  if (accuracy >= 85) {
    return [
      "用 10 分鐘回顧錯題原因，確認是否為粗心或閱讀漏看。",
      "安排跨單元應用題，觀察學生能否自行選擇解題策略。",
      "建立每週挑戰題，維持熟練度並往進階題型推進。"
    ];
  }

  if (accuracy >= 70) {
    return [
      `先補 ${firstWeak ? `${firstWeak.label}「${firstWeak.skill}」` : config.subjectLabel} 的關鍵觀念。`,
      "用 3 題示範題建立方法，再讓學生做 5 題同型練習。",
      "下課前做一題混合應用題，確認能否遷移到新題目。"
    ];
  }

  return [
    `第一堂先回到 ${firstWeak ? `${firstWeak.label}「${firstWeak.skill}」` : "基礎單元"}，不要急著推進學校進度。`,
    secondWeak ? `第二順位補強 ${secondWeak.label}「${secondWeak.skill}」，避免同時塞太多新概念。` : "第二順位用短題檢查前置能力是否足夠。",
    "每次課後保留 5 分鐘做小測，連續兩次達 80% 再提高難度。"
  ];
}

function makeTeachingContent(report, config) {
  const mainWeak = report.priority[0];
  const supportWeak = report.priority[1];
  const mainTarget = mainWeak ? `${mainWeak.label}「${mainWeak.skill}」` : config.subjectLabel;
  const supportTarget = supportWeak ? `${supportWeak.label}「${supportWeak.skill}」` : "前置基礎能力";
  const pace = report.accuracy >= 70 ? "中等速度，保留時間做延伸題" : "放慢速度，以確認觀念和步驟為主";

  return {
    title: `${config.gradeLabel} ${config.subjectLabel} 補強課程`,
    objective: `本次課程目標是補強 ${mainTarget}，並檢查 ${supportTarget} 是否影響作答。`,
    warmup: `用 3 題短題暖身，讓學生先說出解題線索。若學生無法說明，老師先回到關鍵字、公式或基本概念。`,
    teachingSteps: [
      `概念整理：用學生本次錯題說明 ${mainTarget} 的核心觀念，避免直接背答案。`,
      `老師示範：示範 1 題標準題，邊做邊標出題目線索、使用方法與檢查步驟。`,
      `共同練習：老師帶學生完成 2 題同型題，每一步都要求學生說明原因。`,
      `獨立練習：學生獨立完成 3 到 5 題，老師只記錄卡住的位置，不急著提示。`
    ],
    practice: [
      `基礎題：${mainTarget} 3 題，目標是正確率 80%。`,
      `混合題：加入 ${supportTarget} 2 題，確認是否能遷移。`,
      `口頭說明：請學生用自己的話講一次解題流程。`
    ],
    homework: `回家練習以 ${mainTarget} 為主，題量控制在 8 到 12 題；下次課前用 5 分鐘小測確認是否保留。`,
    teacherReminder: `教學節奏建議：${pace}。若連續兩題同類錯誤，先暫停新題，改用圖像、表格或生活例子重建概念。`
  };
}

function renderReport() {
  if (!state.report) {
    emptyReport.hidden = false;
    reportContent.hidden = true;
    return;
  }

  emptyReport.hidden = true;
  reportContent.hidden = false;

  document.querySelector("#scoreValue").textContent = `${state.report.accuracy}%`;
  document.querySelector("#levelLabel").textContent = state.report.level;
  document.querySelector("#diagnosisText").textContent = state.report.diagnosis;

  const priorityList = document.querySelector("#priorityList");
  priorityList.innerHTML = state.report.priority.length
    ? state.report.priority.map((item) => `
        <div class="priority-item">
          <span>${item.label}</span>
          <strong>${item.skill}</strong>
          <em>錯 ${item.misses} 題</em>
        </div>
      `).join("")
    : `<div class="priority-item"><span>整體</span><strong>目前無明顯弱點</strong><em>可提高難度</em></div>`;

  const breakdown = document.querySelector("#subjectBreakdown");
  breakdown.innerHTML = state.report.stats.map((item) => {
    const rate = Math.round((item.correct / item.total) * 100);
    return `
      <div class="breakdown-item">
        <div>
          <strong>${subjectLabels[item.subject]}</strong>
          <span>${item.correct}/${item.total} 題</span>
        </div>
        <meter min="0" max="100" value="${rate}">${rate}%</meter>
        <em>${rate}%</em>
      </div>
    `;
  }).join("");

  const lessonPlan = document.querySelector("#lessonPlan");
  lessonPlan.innerHTML = state.report.plan.map((item) => `<li>${item}</li>`).join("");
  reportTeachingContent.innerHTML = renderTeachingContent(state.report.teachingContent);
}

function renderTeachingContent(content) {
  if (!content) return "";

  return `
    <div class="teaching-title">${escapeHtml(content.title)}</div>
    <dl>
      <dt>課程目標</dt>
      <dd>${escapeHtml(content.objective)}</dd>
      <dt>暖身導入</dt>
      <dd>${escapeHtml(content.warmup)}</dd>
      <dt>教學流程</dt>
      <dd>
        <ol>${content.teachingSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      </dd>
      <dt>課堂練習</dt>
      <dd>
        <ul>${content.practice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </dd>
      <dt>回家作業</dt>
      <dd>${escapeHtml(content.homework)}</dd>
      <dt>老師提醒</dt>
      <dd>${escapeHtml(content.teacherReminder)}</dd>
    </dl>
  `;
}

function saveStudentFile(sessionText = "", updateCurrent = false) {
  if (!state.config || !state.report) return null;

  const now = new Date().toISOString();
  let record = state.records.find((item) => {
    return item.studentName === state.config.studentName && item.gradeLabel === state.config.gradeLabel;
  });

  if (!record) {
    record = {
      id: makeId("student"),
      studentName: state.config.studentName,
      stageLabel: state.config.stageLabel,
      gradeLabel: state.config.gradeLabel,
      createdAt: now,
      updatedAt: now,
      longTermNote: "",
      histories: []
    };
    state.records.unshift(record);
  }

  const historyPayload = {
    config: { ...state.config },
    accuracy: state.report.accuracy,
    correct: state.report.correct,
    total: state.report.total,
    level: state.report.level,
    diagnosis: state.report.diagnosis,
    priorities: state.report.priority,
    lessonPlan: state.report.plan,
    teachingContent: state.report.teachingContent,
    subjectStats: state.report.stats,
    sessionNote: sessionText.trim(),
    answers: { ...state.answers },
    questions: state.questions.map((question) => ({
      id: question.id,
      subject: question.subjects[0],
      skill: question.skill,
      prompt: question.prompt,
      answer: question.answer,
      studentAnswer: state.answers[question.id] || "",
      isCorrect: state.answers[question.id] === question.answer
    }))
  };

  let history = null;
  if (updateCurrent && state.currentHistoryId) {
    history = record.histories.find((item) => item.id === state.currentHistoryId);
  }

  if (history) {
    Object.assign(history, historyPayload, { updatedAt: now });
  } else {
    history = {
      id: makeId("history"),
      createdAt: now,
      updatedAt: now,
      ...historyPayload
    };
    record.histories.unshift(history);
    state.currentHistoryId = history.id;
  }

  record.updatedAt = now;
  state.selectedRecordId = record.id;
  persistStudentRecords();
  renderRecords();
  return record;
}

function selectedRecord() {
  return state.records.find((record) => record.id === state.selectedRecordId) || state.records[0] || null;
}

function renderRecords() {
  const hasRecords = state.records.length > 0;
  emptyRecords.hidden = hasRecords;
  recordsContent.hidden = !hasRecords;

  if (!hasRecords) return;

  if (!state.selectedRecordId || !state.records.some((record) => record.id === state.selectedRecordId)) {
    state.selectedRecordId = state.records[0].id;
  }

  const current = selectedRecord();
  const latest = current.histories[0];

  studentList.innerHTML = state.records.map((record) => {
    const recent = record.histories[0];
    const active = record.id === current.id ? "active" : "";
    return `
      <button class="student-card ${active}" type="button" data-record-id="${record.id}">
        <strong>${escapeHtml(record.studentName)}</strong>
        <span>${escapeHtml(record.gradeLabel)}・${recent ? escapeHtml(recent.config.subjectLabel) : "尚無科目"}</span>
        <em>${recent ? `${recent.accuracy}%` : "0%"}</em>
      </button>
    `;
  }).join("");

  studentList.querySelectorAll(".student-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedRecordId = button.dataset.recordId;
      renderRecords();
    });
  });

  recordStudentName.textContent = current.studentName;
  recordMeta.textContent = `${current.gradeLabel}・建立於 ${formatDateTime(current.createdAt)}・共 ${current.histories.length} 次診斷`;
  recordScore.textContent = latest ? `${latest.accuracy}%` : "0%";
  longTermNote.value = current.longTermNote || "";

  recordPriorities.innerHTML = latest && latest.priorities.length
    ? latest.priorities.map((item) => `
        <div class="priority-item">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.skill)}</strong>
          <em>錯 ${item.misses} 題</em>
        </div>
      `).join("")
    : `<div class="priority-item"><span>整體</span><strong>尚無明顯弱點</strong><em>可追蹤</em></div>`;

  teachingContent.innerHTML = latest ? renderTeachingContent(latest.teachingContent) : "";

  historyList.innerHTML = current.histories.map((history) => `
    <div class="history-item">
      <div>
        <strong>${formatDateTime(history.createdAt)}</strong>
        <span>${escapeHtml(history.config.subjectLabel)}・${history.level}・${history.correct}/${history.total} 題</span>
      </div>
      <p>${escapeHtml(history.sessionNote || "尚未填寫本次紀錄。")}</p>
    </div>
  `).join("");
}

function generateQuiz() {
  const config = getConfig();
  const questions = pickQuestions(config);
  if (questions.length === 0) return;

  state.config = config;
  state.questions = questions;
  state.answers = {};
  state.report = null;
  state.currentHistoryId = null;
  state.studentSubmitted = false;
  sessionNote.value = "";

  renderQuiz();
  renderStudentPortal();
  renderReport();
  updateHeader();
  setMode("student");
}

function resetAnswers() {
  state.answers = {};
  state.report = null;
  state.currentHistoryId = null;
  state.studentSubmitted = false;
  sessionNote.value = "";
  renderQuiz();
  renderStudentPortal();
  renderReport();
  updateHeader();
}

function submitQuiz() {
  if (state.questions.length === 0) {
    switchView("setup");
    return;
  }

  buildReport();
  saveStudentFile("", false);
  renderReport();
  renderStudentPortal();
  updateHeader();
  switchView("report");
}

function submitStudentQuiz() {
  if (state.questions.length === 0) {
    renderStudentPortal();
    return;
  }

  buildReport();
  saveStudentFile("", false);
  state.studentSubmitted = true;
  renderQuiz();
  renderReport();
  renderStudentPortal();
  updateHeader();
}

function saveSessionNote() {
  if (!state.report) return;
  saveStudentFile(sessionNote.value, true);
  switchView("records");
}

function saveLongTermNote() {
  const record = selectedRecord();
  if (!record) return;

  record.longTermNote = longTermNote.value.trim();
  record.updatedAt = new Date().toISOString();
  persistStudentRecords();
  renderRecords();
}

function exportSelectedRecord() {
  const record = selectedRecord();
  if (!record) return;

  const payload = {
    exportedAt: new Date().toISOString(),
    type: "家教學生檔案",
    record
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = record.studentName.replace(/[\\/:*?"<>|]/g, "_");
  link.href = url;
  link.download = `${safeName}_${record.gradeLabel}_學生檔案.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

stageInput.addEventListener("change", setGrades);
gradeInput.addEventListener("change", renderGradeFocus);
document.querySelector("#generateBtn").addEventListener("click", generateQuiz);
document.querySelector("#resetAnswersBtn").addEventListener("click", resetAnswers);
document.querySelector("#submitBtn").addEventListener("click", submitQuiz);
document.querySelector("#printBtn").addEventListener("click", () => window.print());
document.querySelector("#saveSessionBtn").addEventListener("click", saveSessionNote);
document.querySelector("#saveLongTermBtn").addEventListener("click", saveLongTermNote);
document.querySelector("#exportRecordBtn").addEventListener("click", exportSelectedRecord);
teacherModeBtn.addEventListener("click", () => setMode("teacher"));
studentModeBtn.addEventListener("click", () => setMode("student"));
studentSubmitBtn.addEventListener("click", submitStudentQuiz);
teacherReportBtn.addEventListener("click", () => setMode("teacher", "report"));
document.querySelectorAll(".nav-tab").forEach((tab) => {
  tab.addEventListener("click", () => switchView(tab.dataset.view));
});

setGrades();
updateHeader();
renderQuiz();
renderStudentPortal();
renderReport();
renderRecords();
