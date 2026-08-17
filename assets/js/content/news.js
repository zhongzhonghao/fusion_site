/* =====================================================================
   ✏️  新闻与事件 · NEWS & EVENTS
   ---------------------------------------------------------------------
   新增一条 = 复制一个 { } 块改内容 · add one item = copy a { } block.
   img : 图片相对路径 image path        d  : 'YYYY/MM'（时间线排序 sorts the timeline）
   cat : 'n'=新闻 news  'e'=事件 event   hi : 1 = 首页精选 homepage highlight
   t/s : 中文标题/摘要                   tEn/sEn : English title/summary
   u   : 外部链接或 null · external link or null
   ---------------------------------------------------------------------
   FULL ARTICLE TEXT · 文章全文（点击卡片弹出的阅读页）
   给条目加 body / bodyEn 字段即为全文；空一行 = 分段。
   Add body / bodyEn for the full article; a BLANK LINE starts a new
   paragraph. Without body, the short summary (s / sEn) is shown.
     "body": "第一段……\n\n第二段……",
     "bodyEn": "First paragraph…\n\nSecond paragraph…"
   ===================================================================== */
window.SITE = window.SITE || {};
window.SITE.news = [
  {
    "img": "upload/2024/news/LectureLFCover.jpg",
    "d": "2024/11",
    "cat": "e",
    "hi": 1,
    "t": "凌锋教授团队受邀来我校讲座",
    "u": null,
    "s": "应实验室主任袁汀邀请，宣武医院神经外科首席专家凌锋教授及其团队来校，作题为“AI时代的神经外科需要什么”的学术讲座。",
    "tEn": "Prof. Ling Feng's Team Lecture at SJTU",
    "sEn": "Invited by Director Ting Yuan, Prof. Ling Feng of Xuanwu Hospital lectured on what neurosurgery needs in the AI era."
  },
  {
    "img": "upload/2024/news/kunyi-cover.jpg",
    "d": "2024/10",
    "cat": "e",
    "hi": 1,
    "t": "实验室智慧数据采集平台亮相昆易电子2024用户大会",
    "u": null,
    "s": "昆易电子2024用户大会在上海奉贤举办，实验室智慧数据采集平台应邀参展。",
    "tEn": "Smart Data Acquisition Platform at KunYi 2024",
    "sEn": "The lab's smart data acquisition platform was exhibited at the KunYi Electronics 2024 User Conference in Shanghai."
  },
  {
    "img": "upload/2024/news/Fusion2024Logo.png",
    "d": "2024/07",
    "cat": "e",
    "hi": 1,
    "t": "2024 信息融合青年学者论坛",
    "u": null,
    "s": "信息融合青年学者论坛在威尼斯成功举办，实验室主任袁汀主导了本次论坛的筹备组织工作。",
    "tEn": "2024 ISIF Young Scholars Forum",
    "sEn": "The Information Fusion Young Scholars Forum was held in Venice; Director Ting Yuan led its organization."
  },
  {
    "img": "upload/new/kth-signing.png",
    "d": "2024/07",
    "cat": "n",
    "hi": 1,
    "t": "荣获上海交通大学-瑞典皇家理工学院国际合作种子基金",
    "u": null,
    "s": "基于国际合作种子基金，将展开针对多传感器的全面国际合作。",
    "tEn": "SJTU–KTH International Cooperation Seed Fund",
    "sEn": "The seed fund enables comprehensive international cooperation on multi-sensor research."
  },
  {
    "img": "upload/new/comac-signing.jpg",
    "d": "2024/06",
    "cat": "n",
    "hi": 1,
    "t": "与商飞公司完成签约",
    "u": null,
    "s": "与商飞系统工程科创中心签订信息融合技术研究联合基金项目。",
    "tEn": "Agreement Signed with COMAC",
    "sEn": "Joint research fund on information fusion signed with COMAC's System Engineering Innovation Center."
  },
  {
    "img": "upload/new/LindRadarHeng.png",
    "d": "2024/03",
    "cat": "n",
    "t": "实验室一行访问深圳大学",
    "u": null,
    "s": "与深圳大学校长毛军发院士、副校长张学记及机电与控制工程学院院长马将讨论潜在科研合作事宜。",
    "tEn": "Lab Delegation Visits Shenzhen University",
    "sEn": "Research-cooperation discussions with President Mao Junfa and colleagues at Shenzhen University."
  },
  {
    "img": "upload/new/LindRadar.png",
    "d": "2024/03",
    "cat": "e",
    "t": "实验室一行参加低空经济会议",
    "u": "https://epaper.southcn.com/nfdaily/html/202403/12/content_10092863.html",
    "s": "Prof. Lindquist 在会上就新一代雷达系统的前景和应用发表看法。",
    "tEn": "At the Low-Altitude Economy Conference",
    "sEn": "Prof. Lindquist shared views on next-generation radar systems and their applications."
  },
  {
    "img": "upload/new/sjtujurnal.png",
    "d": "2023/10",
    "cat": "n",
    "t": "蔡云泽教授主编寄语 — 上海交通大学学报（英文版）",
    "u": "https://mp.weixin.qq.com/s/M1Uh2wo71YyJbkmMifPtww",
    "s": "上海交通大学学报（英文版）致力于发表交叉学科的丰富研究成果。",
    "tEn": "Editor-in-Chief's Message — J. of SJTU (Science)",
    "sEn": "The Journal of Shanghai Jiao Tong University (Science) publishes rich interdisciplinary research."
  },
  {
    "img": "upload/new/jointlab.png",
    "d": "2023/08",
    "cat": "n",
    "t": "深圳机场空港智慧物联联合实验室合作共建",
    "u": "https://www.seiee.sjtu.edu.cn/index_news/8899.html",
    "s": "实验室主任袁汀牵头合作建立深圳机场空港智慧物联联合实验室。",
    "tEn": "Shenzhen Airport Smart IoT Joint Laboratory",
    "sEn": "Director Ting Yuan led the co-founding of the Shenzhen Airport smart IoT joint laboratory."
  },
  {
    "img": "upload/new/ai.jpg",
    "d": "2023/07",
    "cat": "e",
    "t": "[智融科普] 上海交通大学第二届AI展",
    "u": null,
    "s": "实验室组织的科普活动，邀请建平中学西校的学生参加第二届上海交通大学人工智能展。",
    "tEn": "[Outreach] 2nd SJTU AI Exhibition",
    "sEn": "Outreach event inviting Jianping West Middle School students to the 2nd SJTU AI Exhibition."
  },
  {
    "img": "upload/new/eebc.jpg",
    "d": "2023/06",
    "cat": "e",
    "t": "2023世界动力电池大会：绿色新动力 · 世界新动能",
    "u": "https://mp.weixin.qq.com/s/FX-TTbcNLBpNyyKZd1U9Og",
    "s": "实验室在2023世界动力电池大会领衔展示移动充电交互系统。",
    "tEn": "2023 World Power Battery Conference",
    "sEn": "The lab led the demonstration of its mobile charging interaction system at the conference."
  },
  {
    "img": "upload/new/eebc_price.jpg",
    "d": "2023/06",
    "cat": "n",
    "hi": 1,
    "t": "实验室获“最佳动态技术展示奖”",
    "u": "https://mp.weixin.qq.com/s/FX-TTbcNLBpNyyKZd1U9Og",
    "s": "与中科源码合作研发的移动充电系统获世界动力电池大会“最佳动态技术展示奖”。",
    "tEn": "Best Dynamic Technology Demonstration Award",
    "sEn": "The mobile charging system co-developed with Zhongke Yuanma won the award at the World Power Battery Conference."
  },
  {
    "img": "upload/new/cast-seminar.jpg",
    "d": "2023/04",
    "cat": "e",
    "t": "受邀参加中国民航技术装备有限责任公司研讨会",
    "u": null,
    "s": "受邀参加智慧机场无人化技术研讨会，进一步推动中航材数字化转型。",
    "tEn": "CAST Smart Airport Seminar",
    "sEn": "Invited to the smart-airport unmanned-technology seminar, advancing CAST's digital transformation."
  },
  {
    "img": "upload/new/event3.png",
    "d": "2023/01",
    "cat": "e",
    "t": "大型设备无人化：重型机械和物流设备",
    "u": null,
    "s": "实验室主任袁汀受信达证券邀请参与行业分享会，交流大型设备无人化的行业前景。",
    "tEn": "Unmanned Heavy Machinery & Logistics",
    "sEn": "Director Ting Yuan joined a Cinda Securities industry session on the prospects of unmanned heavy equipment."
  },
  {
    "img": "upload/new/event2.jpg",
    "d": "2022/07",
    "cat": "e",
    "t": "国际信息融合协会（ISIF）信息融合会议特邀讲座",
    "u": "https://www.trippus.se/eventus/userfiles/178740.pdf",
    "s": "Tutorial: Multi Sensor and Data Fusion Approaches for Vehicular Automation.",
    "tEn": "ISIF FUSION Invited Tutorial",
    "sEn": "Tutorial: Multi Sensor and Data Fusion Approaches for Vehicular Automation."
  },
  {
    "img": "media/news/2022-06_1.png",
    "d": "2022/06",
    "cat": "e",
    "t": "自动驾驶工业人工智能峰会",
    "u": null,
    "s": "实验室主任袁汀受邀参加峰会，并与姚期智院士讨论无人驾驶人工智能领域的行业发展。",
    "tEn": "Industrial AI Summit for Autonomous Driving",
    "sEn": "Director Ting Yuan discussed autonomous-driving AI development with Academician Andrew Yao."
  }
];
