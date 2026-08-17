/* =====================================================================
   ✏️  论文成果 · PUBLICATIONS
   ---------------------------------------------------------------------
   新增论文 = 复制一个 { } 块 · add a paper = copy one { } block.
   自动按年份排序、可搜索、可按类型过滤（魔方研究面的格子就是过滤器）
   Sorted by year, searchable, filterable (the cube's research cells ARE the filters).
   y: 年份 year   type: '期刊' | '会议' | '专著'   venue: 期刊/会议名
   title / authors                       link: 论文页(可省) paper page (optional)
   pdf: PDF 相对路径(可省，多放在 media/papers/) local PDF path (optional)
   ===================================================================== */
window.SITE = window.SITE || {};
window.SITE.pubs = [
  {
    "y": 2024,
    "type": "期刊",
    "venue": "IEEE",
    "title": "Probabilistic GOSPA: A metric for performance evaluation of multi-object filters with uncertainties",
    "authors": "Yuxuan Xia, Ángel F. García-Fernández, Johan Karlsson, Kuo-Chu Chang, Ting Yuan, Lennart Svensson",
    "pdf": "media/papers/Probabilistic_GOSPA.pdf"
  },
  {
    "y": 2024,
    "type": "会议",
    "venue": "FUSION",
    "title": "An Entropy-Based Targetless Real-Time Radar-Lidar Point Cloud Alignment System for Smart Sensor Fusion",
    "authors": "Xiaojun Chen, KC Chang, Ting Yuan",
    "pdf": "media/papers/An_Entropy-Based_Targetless_Real-Time_Radar-Lidar_Point_Cloud_Alignment_System_for_Smart_Sensor_Fusion.pdf"
  },
  {
    "y": 2023,
    "type": "会议",
    "venue": "IEEE SENSORS",
    "title": "Lane Detection and Estimation from Surround View Camera Sensing Systems",
    "authors": "Ting Yuan, Wenqi Cao, Shuqi Zhang 等",
    "pdf": "media/papers/Lane_detection_and_estimation_from_Surround_View_Camera_Sensing_Systems.pdf"
  },
  {
    "y": 2023,
    "type": "期刊",
    "venue": "Automatica",
    "title": "Identification of low rank vector processes",
    "authors": "Wenqi Cao, Giorgio Picci, Anders Lindquist",
    "link": "https://www.sciencedirect.com/science/article/pii/S0005109823000882",
    "pdf": "media/papers/Identification_of_low_rank_vector_processes.pdf"
  },
  {
    "y": 2017,
    "type": "期刊",
    "venue": "IEEE Control Systems Magazine",
    "title": "Kalman's Influence on My Scientific Work: Some Recollections and Reflections",
    "authors": "Anders Lindquist",
    "link": "https://ieeexplore.ieee.org/document/7879951",
    "pdf": "media/papers/Kalmans_Influence_on_My_Scientific_Work_Some_Recollections_and_Reflections_Historical_Perspectives.pdf"
  },
  {
    "y": 2011,
    "type": "期刊",
    "venue": "IEEE",
    "title": "Heterogeneous Track-to-Track Fusion",
    "authors": "Ting Yuan, Yaakov Bar-Shalom, Xin Tian",
    "link": "https://ieeexplore.ieee.org/abstract/document/5977520/",
    "pdf": "media/papers/Heterogeneous_track-to-track_fusion.pdf"
  },
  {
    "y": 2015,
    "type": "专著",
    "venue": "SIAM",
    "title": "Linear Stochastic Systems",
    "authors": "Anders Lindquist, Giorgio Picci",
    "link": "https://epubs.siam.org/doi/book/10.1137/1.9781611974713"
  }
];
