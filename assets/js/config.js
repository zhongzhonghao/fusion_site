/* =====================================================================
   ⚙️  网站设置 · SITE SETTINGS  —  开关都在这里 · every switch lives here
   ===================================================================== */
window.SITE = {

  build: 'v43',   /* shown in footer + console — confirms which build is running */

  /* 素材路径前缀（部署后保持 ''）· asset path prefix (keep '' in production) */
  assetBase: '',

  /* 旧服务器回退（已停用）· legacy-server fallback (disabled) */
  remoteFallback: '',

  /* 魔方大小 0.7–1.1 · cube size */
  cubeScale: 0.82,

  /* 首屏背景视频 · hero background video (set '' for no video) */
  heroVideo: 'media/Background_viz.mp4',
  /* 视频加载前/替代显示的图片 · poster image before/instead of the video */
  heroPoster: '',

  /* 首屏背景图（代替视频）· hero image instead of the video ('' = use video) */
  heroImage: '',
  /* 整站深色底图 · faint whole-site background image ('' = none) */
  bgImage: '',

  /* 品牌标识（页眉+页脚白色圆角卡片）· brand logos (header + footer white chips)
     把图片放进 media/ 再写文件名 · put the files in media/ first */
  logos: [
    /* 每个 logo 一对：dark 主题用白色版，light 主题用深色版
       each logo is a PAIR: white set shown in the dark theme,
       dark-navy set shown in the light theme */
    { dark: 'media/logo-sjtu-white.png', light: 'media/logo-sjtu-dark.png' },
    { dark: 'media/logo-lab-white.png',  light: 'media/logo-lab-dark.png'  }
  ]
};
