/* =====================================================================
   ✏️  首页三个入口 · LANDING PORTALS
   ---------------------------------------------------------------------
   一般不需要修改 · rarely needs editing.
   label 是名称（不翻译）· label is a NAME (never translated).
   ---------------------------------------------------------------------
   face 字段 · the face field:
     'f' (默认 default) = 正面 front · 'u' = 顶面 top · 'd' = 底面 bottom · 'r' = 右面 right
   顶/底面的应用：首页上下拖动魔方即可翻到 — drag the landing cube
   up / down to flip to the top and bottom faces.
   ===================================================================== */
window.SITE = window.SITE || {};
window.SITE.portals = [
  {
    "key": "-1,-1,1",
    "label": "LAB",
    "tag": "实验室主页",
    "tagEn": "LABORATORY HOME",
    "hex": "#39d6e9",
    "hexText": {"dark": "#8fd0de", "light": "#0369a1"},
    "url": "#lab",
    "title": "Smart Sensor Fusion Laboratory",
    "desc": "实验室主页：团队介绍、核心研究方向与最新动态。",
    "descEn": "Main page of the laboratory — the team, core research directions and latest news."
  },
  {
    "key": "0,0,1",
    "label": "SDC",
    "ext": true,
    "tag": "智慧数据中心",
    "tagEn": "DATA CENTER",
    "hex": "#b829dd",
    "hexText": {"dark": "#c58fe8", "light": "#7e22ce"},
    "url": "https://sdc.sjtu.edu.cn/",
    "title": "Smart Data Center",
    "desc": "ISIF/CSIF FOOD 的运行核心：为平台提供算力与数据服务。",
    "descEn": "The operational core of ISIF/CSIF FOOD — computing and data services powering the platform."
  },
  {
    "key": "1,1,1",
    "label": "FOOD",
    "ext": true,
    "tag": "开放数据平台",
    "tagEn": "OPEN DATA PLATFORM",
    "hex": "#ff7b00",
    "hexText": {"dark": "#f0a35c", "light": "#b45309"},
    "url": "https://food.sjtu.edu.cn",
    "title": "ISIF/CSIF FOOD",
    "desc": "面向融合的新一代开放数据平台。",
    "descEn": "A next-generation fusion-oriented open-access data platform."
  },
  {
    "key": "-1,-1,-1", "face": "u", "ext": true,
    "label": "TAES",
    "tag": "学术期刊", "tagEn": "ACADEMIC JOURNAL",
    "hex": "#5b8cff",
    "hexText": {"dark": "#9db9f5", "light": "#2f56b8"},
    "url": "https://ieee-aess.org/committee/taes-technical-areas-and-editors",
    "title": "IEEE TAES",
    "desc": "IEEE 航空航天与电子系统汇刊 — 技术领域与编辑委员会。",
    "descEn": "IEEE Transactions on Aerospace and Electronic Systems — technical areas and editors."
  },
  {
    "key": "0,-1,0", "face": "u", "ext": true,
    "label": "CJIF",
    "tag": "学术期刊", "tagEn": "ACADEMIC JOURNAL",
    "hex": "#ff2d7b",
    "hexText": {"dark": "#f08bb4", "light": "#be1861"},
    "url": "https://www.icck.org/cjif/topic/8e52021d1bdc",
    "title": "CSIF · CJIF",
    "desc": "中国信息融合学会《信息融合学报》（ICCK）。",
    "descEn": "The Chinese Journal of Information Fusion (ICCK), by CSIF."
  },
  {
    "key": "1,-1,1", "face": "u", "ext": true,
    "label": "JAIF",
    "tag": "学术期刊", "tagEn": "ACADEMIC JOURNAL",
    "hex": "#00ff88",
    "hexText": {"dark": "#7fe8b8", "light": "#0b8f57"},
    "url": "https://isif.org/publications/jaif-editorial-board",
    "title": "ISIF · JAIF",
    "desc": "国际信息融合学会《信息融合进展学报》编委会。",
    "descEn": "ISIF's Journal of Advances in Information Fusion — editorial board."
  },
  {
    "key": "-1,1,1", "face": "d", "ext": true,
    "label": "GITLAB",
    "tag": "公司平台", "tagEn": "COMPANY PLATFORM",
    "hex": "#fc6d26",
    "hexText": {"dark": "#f5a878", "light": "#c2500f"},
    "url": "https://universee.ddns.net:10443/",
    "title": "GitLab",
    "desc": "代码托管平台（内部访问）。",
    "descEn": "Code hosting platform (internal access)."
  },
  {
    "key": "0,1,0", "face": "d", "ext": true,
    "label": "UNIVERSEE",
    "tag": "公司平台", "tagEn": "COMPANY PLATFORM",
    "hex": "#14b8a6",
    "hexText": {"dark": "#7fd8cd", "light": "#0f766e"},
    "url": "https://universee.ai",
    "title": "UniverSee",
    "desc": "UniverSee 公司官网。",
    "descEn": "UniverSee — company website."
  },
  {
    "key": "1,1,-1", "face": "d", "ext": true,
    "label": "TCB",
    "tag": "公司平台", "tagEn": "COMPANY PLATFORM",
    "hex": "#2d7bff",
    "hexText": {"dark": "#93b8f0", "light": "#1d4fd8"},
    "url": "http://10.119.14.111/",
    "title": "TCB",
    "desc": "TCB 内部平台（仅校园网可访问）。",
    "descEn": "TCB internal platform (campus network only)."
  },
  {
    "key": "1,-1,1", "face": "r",
    "label": "APP",
    "tag": "应用平台", "tagEn": "APPLICATIONS",
    "hex": "#6c8cff",
    "hexText": {"dark": "#a8bcf5", "light": "#3b5bd6"},
    "url": null,
    "title": "APP",
    "desc": "链接即将开通。",
    "descEn": "Link coming soon."
  },
  {
    "key": "1,0,0", "face": "r",
    "label": "TOOL",
    "tag": "工具平台", "tagEn": "TOOLS",
    "hex": "#2dd4bf",
    "hexText": {"dark": "#8fe3d6", "light": "#0f766e"},
    "url": null,
    "title": "TOOL",
    "desc": "链接即将开通。",
    "descEn": "Link coming soon."
  },
  {
    "key": "1,1,-1", "face": "r",
    "label": "MISC",
    "tag": "扩展平台", "tagEn": "MISCELLANEOUS",
    "hex": "#f472b6",
    "hexText": {"dark": "#f5aed0", "light": "#be2f77"},
    "url": null,
    "title": "MISC",
    "desc": "链接即将开通。",
    "descEn": "Link coming soon."
  }
];
