/* =====================================================================
   APP LOGIC — 交互逻辑（一般无需修改）
   Cube engine, pages, language switch, feeds, publications hub.
   Content lives in data.js · 内容在 data.js
   ===================================================================== */
(function(){
  /* ---- asset helper: relative first, remote fallback for local preview ---- */
  const AB = SITE.assetBase || '';
  /* optional pictures from data.js */
  (function applyPictures(){
    const AB0 = SITE.assetBase || '';
    if(SITE.bgImage){
      document.body.style.backgroundImage =
        'radial-gradient(1100px 700px at 46% 46%, rgba(11,17,30,.92) 0%, rgba(6,8,13,.96) 65%), url("'+AB0+SITE.bgImage+'")';
      document.body.style.backgroundSize = 'auto, cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    }
    if(SITE.heroImage){
      const hero = document.querySelector('#labSite .hero');
      const v = hero && hero.querySelector('video');
      if(v){
        const img = document.createElement('img');
        img.src = AB0 + SITE.heroImage;
        img.alt = '';
        img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.4;filter:saturate(.75) brightness(.75)';
        v.replaceWith(img);
      }
    }
  })();

  (function wireHeroVideo(){
    const v = document.querySelector('#labSite video');
    if(!v) return;
    const src = v.querySelector('source');
    /* apply data.js hero settings */
    if(SITE.heroPoster) v.poster = AB + SITE.heroPoster;
    if(SITE.heroVideo === ''){ v.removeAttribute('autoplay'); if(src) src.removeAttribute('src'); v.load(); return; }
    /* only (re)load when we actually change the source — preload="auto"
       already started the first load; a second load() aborts it and fires
       a phantom <source> error in Firefox (the "double call") */
    if(SITE.heroVideo && src && src.getAttribute('src') !== SITE.heroVideo){ src.src = AB + SITE.heroVideo; v.load(); }
    function vfb(){
      if(!v.error && v.networkState !== 3) return;   /* aborted attempt, not a real failure */
      console.warn('[hero video] failed to load:', (src&&src.src)||v.src,
        '→ check the heroVideo path in data.js and that the file exists');
    }
    v.addEventListener('error', vfb, true);
    if(src) src.addEventListener('error', vfb, true);
    v.addEventListener('canplay', ()=>{ v.play().catch(()=>{}); }, {once:true});
    if(v.networkState === 3) vfb();   /* source already failed before wiring */
  })();

  window.__imgfb = function(img){
    if(!img.dataset.fb && SITE.remoteFallback){
      img.dataset.fb = '1';
      img.src = SITE.remoteFallback + img.dataset.rel;
    }else if(img.closest('.pcard')){
      /* news/event card: show a branded placeholder, never a blank */
      const ph = document.createElement('div');
      ph.className = 'imgph';
      ph.innerHTML = '<span>FUSION</span>';
      img.replaceWith(ph);
    }else{
      img.style.visibility = 'hidden';
    }
  };
  const cube   = document.getElementById('cube');
  const zone   = document.getElementById('zone');
  const anchor = document.getElementById('anchor');
  const scene  = document.getElementById('scene');
  const panel  = document.getElementById('panel');
  const pTag   = document.getElementById('pTag');
  const pTitle = document.getElementById('pTitle');
  const pText  = document.getElementById('pText');
  const pGo    = document.getElementById('pGo');
  const labSite= document.getElementById('labSite');
  const extSite= document.getElementById('extSite');
  const shName = document.getElementById('shName');

  let lang = 'zh';   /* 'zh' | 'en' — the two versions are switchable */

  const gapRatio = 0.1;
  const CS = SITE.cubeScale || 1;   /* tune in data.js · 在 data.js 里调整 cubeScale */
  let size = Math.floor(Math.min(innerHeight * 0.5, innerWidth * 0.34) * CS / (3 + 2*gapRatio));
  size = Math.max(size, 46);
  const gap = Math.max(6, Math.round(size * gapRatio));
  document.documentElement.style.setProperty('--cubie', size+'px');
  document.documentElement.style.setProperty('--gap', gap+'px');
  const step = size + gap;
  const cubeW = size*3 + gap*2;

  const portals = SITE.portals;
  const byKey = Object.fromEntries(portals.map(p=>[p.key,p]));   /* first portal per key (panel lookups) */
  const portalsAt = k => portals.filter(q=>q.key===k);
  const cubieEls = {};

  /* the cube's faces as pages: front HOME, right PEOPLE, back RESEARCH, left CONTACT */
  const pages = ['home','people','research','contact'];
  /* each page's face carries its own section cells; only the active
     page's face is filled — every other face stays completely bare */
  const siteCells = [
    /* HOME — front face (z=1) */
    {page:'home', key:'-1,-1,1', face:'f', label:'顶部', en:'TOP',   act:()=>goSection('top')},
    {page:'home', key:'1,-1,1', face:'f', label:'技术', en:'TECH',   act:()=>goSection('core')},
    {page:'home', key:'0,0,1',  face:'f', label:'新闻', en:'NEWS',   act:()=>{goSection('news');   setTimeline('newsWrap','newsStrip',true);},   center:true},
    {page:'home', key:'1,1,1',  face:'f', label:'事件', en:'EVENTS',   act:()=>{goSection('events'); setTimeline('eventsWrap','eventsStrip',true);}},
    {page:'home', key:'-1,1,1', face:'f', label:'合作', en:'PARTNERS', act:()=>goSection('partners')},
    /* PEOPLE — right face (x=1): the four categories on the four corners */
    {page:'people', key:'1,-1,1',  face:'r', label:'教授', en:'PROF',    act:()=>flashCard('pe-prof')},
    {page:'people', key:'1,-1,-1', face:'r', label:'合作', en:'COLLAB', act:()=>flashCard('pe-collab')},
    {page:'people', key:'1,1,1',   face:'r', label:'学生', en:'STUDENT', act:()=>flashCard('pe-stud')},
    {page:'people', key:'1,1,-1',  face:'r', label:'校友', en:'ALUMNI',  act:()=>flashCard('pe-alum')},
    /* RESEARCH — back face (z=-1): the cells ARE the publication filters */
    {page:'research', key:'1,-1,-1',  face:'b', label:'全部', en:'ALL', act:()=>setPubType('全部')},
    {page:'research', key:'-1,-1,-1', face:'b', label:'期刊', en:'JOURNAL', act:()=>setPubType('期刊')},
    {page:'research', key:'1,1,-1',   face:'b', label:'会议', en:'CONF', act:()=>setPubType('会议')},
    {page:'research', key:'-1,1,-1',  face:'b', label:'专著', en:'BOOK', act:()=>setPubType('专著')},
    /* CONTACT — left face (x=-1) */
    {page:'contact', key:'-1,-1,-1', face:'l', label:'邮箱', en:'EMAIL', act:()=>{location.href='mailto:fusion@sjtu.edu.cn';}},
    {page:'contact', key:'-1,0,0',   face:'l', label:'信息', en:'INFO',  act:()=>goSection('page-contact'), center:true},
    {page:'contact', key:'-1,1,1',   face:'l', label:'加入', en:'JOIN',  act:()=>{showPage('people'); goSection('pp-join');}},
  ];
  const siteByKey = {};
  siteCells.forEach(c=>{ (siteByKey[c.key] = siteByKey[c.key] || []).push(c); });
  let currentPage = 'home';

  /* ---- hover state machine ---- */
  let closeTimer = null;
  let leaving = false;
  let lastPortal = null;
  const presentedFace = () =>
    document.body.classList.contains('flip-u') ? 'u' :
    document.body.classList.contains('flip-d') ? 'd' :
    document.body.classList.contains('flip-r') ? 'r' : 'f';
  function showDetail(p){
    clearTimeout(closeTimer);
    lastPortal = p;
    pTag.textContent = lang==='en' ? p.tagEn : p.tag;
    pTitle.textContent = p.title;
    pText.textContent = lang==='en' ? p.descEn : p.desc;
    pGo.href = p.url || '#';
    pGo.style.display = p.url ? '' : 'none';
    applyAccent(p);
    document.body.classList.add('open');
    portals.forEach(q=>cubieEls[q.key].classList.toggle('hot', q===p));
  }
  function close(){
    if(leaving) return;
    document.body.classList.remove('open');
    portals.forEach(q=>cubieEls[q.key].classList.remove('hot'));
  }
  function scheduleClose(){
    if(leaving) return;
    clearTimeout(closeTimer);
    closeTimer = setTimeout(close, 350);
  }
  zone.addEventListener('mouseleave', scheduleClose);
  zone.addEventListener('mouseenter', ()=>clearTimeout(closeTimer));
  panel.addEventListener('mouseenter', ()=>clearTimeout(closeTimer));
  panel.addEventListener('mouseleave', scheduleClose);

  /* ---- build the cube ---- */
  const faces = ['f','b','r','l','u','d'];
  let dragMoved = false;
  for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){
    const key = x+','+y+','+z;
    const el = document.createElement('div');
    el.className = 'cubie';
    el.style.transform =
      `translate(-50%,-50%) translate3d(${x*step}px, ${y*step}px, ${z*step}px)`;
    const plist = portalsAt(key);
    const p = plist[0];
    const sc = siteByKey[key] || [];
    faces.forEach(f=>{
      const fe = document.createElement('div');
      fe.className = 'face '+f;
      const pf = plist.find(q=>(q.face||'f')===f);
      if(pf){
        fe.innerHTML += '<span class="lp'+(pf.label.length>5?' small':'')+'">'+pf.label+'</span>';
        fe.classList.add('pcell');            /* only labeled faces carry color */
        fe.dataset.pface = f;                 /* face-level interactivity gate */
        fe.style.setProperty('--accent', pf.hex);
      }
      const cell = sc.find(c=>c.face===f);
      if(cell){
        fe.classList.add('scell');
        fe.innerHTML += '<span class="sp">'+cell.label+'</span>';
        cell.el = fe;
        cell.spanEl = fe.querySelector('.sp');
      }
      el.appendChild(fe);
    });
    if(sc.length) el.classList.add('scube');
    if(p){
      cubieEls[key] = el;
      if(plist.some(q=>(q.face||'f')==='f')) el.classList.add('active');
      if(plist.some(q=>(q.face||'f')!=='f')) el.classList.add('pscoped');
      el.style.setProperty('--accent', p.hex);
      el.setAttribute('role','link');
      el.setAttribute('tabindex','0');
      el.setAttribute('aria-label', plist.map(q=>q.title).join(' / '));
      /* the portal whose face is currently presented (shared-cubie safe) */
      const presented = () => plist.find(q=>(q.face||'f')===presentedFace());
      el.addEventListener('mouseenter', ()=>{
        const q = presented();
        if(q && !sitemode() && !dragging){ el.style.setProperty('--accent', q.hex); showDetail(q); }
      });
      el.addEventListener('focus', ()=>{ const q=presented(); if(q && !sitemode()) showDetail(q); });
      el.addEventListener('blur', ()=>{ if(!sitemode()) scheduleClose(); });
      el.addEventListener('keydown', e=>{
        const q = presented();
        if(q && (e.key==='Enter'||e.key===' ') && !sitemode()){
          e.preventDefault();
          if(q.url) enterPortal(q); else showDetail(q);
        }
      });
    }
    el.addEventListener('click', ()=>{
      if(dragMoved) return;
      if(sitemode()){
        const live = sc.find(c=>c.page===currentPage);
        if(live) live.act();
      }else if(p){
        const q = plist.find(x=>(x.face||'f')===presentedFace());
        if(q){ if(q.url) enterPortal(q); else showDetail(q); }
      }
    });
    cube.appendChild(el);
  }
  const sitemode = ()=> document.body.classList.contains('sitemode');

  /* ---- plumbob-style page icon floating above the cube ---- */
  const pageIcon = document.createElement('div');
  pageIcon.className = 'pageicon';
  pageIcon.innerHTML = `
   <div class="pi-bob">
    <svg data-p="home" viewBox="0 0 24 24"><path d="M3.5 11 12 3.8 20.5 11"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5h4v5"/></svg>
    <svg data-p="people" viewBox="0 0 24 24"><circle cx="12" cy="7.2" r="3.4"/><path d="M4.8 20.2c0-4 3.2-6.4 7.2-6.4s7.2 2.4 7.2 6.4"/></svg>
    <svg data-p="research" viewBox="0 0 24 24"><path d="M12 4 22 9l-10 5L2 9Z"/><path d="M6.5 11.4V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.6"/><path d="M22 9v4.4"/></svg>
    <svg data-p="contact" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
   </div>`;
  scene.appendChild(pageIcon);
  function setPageIcon(page){
    pageIcon.querySelectorAll('svg').forEach(sv=>sv.classList.toggle('on', sv.dataset.p===page));
  }
  setPageIcon('home');

  /* ================= cube motion engine =================
     One rAF loop eases everything — page turns, drag, and the
     scroll-driven spin-and-slide — so all motion stays smooth. */
  const YAW0 = -27, PITCH0 = -15;
  let yaw = YAW0, targetYaw = YAW0, yawVel = 0;
  let pitch = PITCH0, targetPitch = PITCH0, pitchVel = 0;
  let slide = 0, targetSlide = 0;   /* 0 = in place, 1 = fully hidden left */
  let dragging = false;
  let lastFlip = '';
  const shadowEl = document.querySelector('.shadow');
  (function tick(){
    /* which face is presented right now → material class (see style.css) */
    const flip = targetPitch <= PITCH0 - 45 ? 'u' : targetPitch >= PITCH0 + 45 ? 'd'
               : targetYaw   <= YAW0   - 45 ? 'r' : '';
    if(flip !== lastFlip){
      document.body.classList.toggle('flip-u', flip === 'u');
      document.body.classList.toggle('flip-d', flip === 'd');
      document.body.classList.toggle('flip-r', flip === 'r');
      lastFlip = flip;
    }
    if(!dragging){
      /* light spring: eases with a small physical settle on snap */
      yawVel += (targetYaw - yaw) * 0.018;
      yawVel *= 0.85;
      yaw += yawVel;
      if(sitemode()) targetPitch = PITCH0;   /* site nav lives on the side faces */
      /* NOTE: yaw stays at YAW0 on the landing — the flipped views keep the
         same isometric pose as the front (see rest-pitch maths in dEnd) */
      pitchVel += (targetPitch - pitch) * 0.018;
      pitchVel *= 0.85;
      pitch += pitchVel;
    }else{
      yawVel = 0; pitchVel = 0;
    }
    slide += (targetSlide - slide) * 0.16;           /* brisk exit */
    const spin = slide * -200;
    const px = slide * (innerWidth*0.22 + cubeW + 120);
    /* on People/Research/Contact the cube keeps its original placing in the
       page: it moves up with the content when you scroll, like any element */
    const off = (document.body.classList.contains('sitemode') && currentPage !== 'home')
      ? -panel.scrollTop : 0;
    /* frame tilt OUTSIDE (level horizon at rest, like the original pose),
       tumble offset INSIDE next to the faces — the trailing rotateX still
       cancels against .face.u / .face.d, so the flip algebra is unchanged */
    cube.style.transform = `rotateX(${PITCH0}deg) rotateY(${yaw + spin}deg) rotateX(${pitch - PITCH0}deg)`;
    if(shadowEl){
      /* fade the shadow while mid-turn, bring it back at every resting pose */
      const q = (pitch - PITCH0) / 90, turn = Math.abs(q - Math.round(q));
      shadowEl.style.opacity = Math.max(0, 1 - turn * 1.8);
    }
    anchor.style.transform = `translate(calc(-50% - ${px}px), calc(-50% + ${off}px))`;
    requestAnimationFrame(tick);
  })();

  /* scroll: on HOME the cube spins away; on the other pages it stays in place */
  const heroGhost = document.getElementById('heroGhost');
  panel.addEventListener('scroll', ()=>{
    if(!document.body.classList.contains('expand')) return;
    if(currentPage !== 'home'){ targetSlide = 0; return; }
    targetSlide = Math.min(1, panel.scrollTop / (innerHeight * .42));
    if(heroGhost) heroGhost.style.transform = 'translateY('+(panel.scrollTop * -0.18)+'px)';
  });

  /* drag to turn the cube — each quarter turn opens the matching page */
  function dStart(e){
    if(slide > .3) return;
    const landing = !document.body.classList.contains('expand');
    if(!landing && !sitemode()) return;
    dragging = true; dragMoved = false;
    dStart.mode = landing ? 'free' : 'yaw';
    if(landing) close();   /* hover panel shifts the cube — release it while exploring */
    scene.classList.add('grabbing');
    const pt = e.touches?e.touches[0]:e;
    dStart.x = pt.clientX;
    dStart.y = pt.clientY;
    dStart.y0 = yaw;
    dStart.p0 = pitch;
    dStart.axis = null;                 /* decided by the first clear movement */
    dStart.restY = targetYaw;           /* the yaw pose this drag starts from */
    /* the resting pose this drag starts from — the 50% turning aid in
       dEnd measures the turn relative to it */
    dStart.rest = PITCH0 + 90 * Math.round((pitch - PITCH0) / 90);
  }
  function dMove(e){
    if(!dragging) return;
    const pt = e.touches?e.touches[0]:e;
    const dx = pt.clientX - dStart.x;
    const dy = pt.clientY - dStart.y;
    if(!e.touches && e.buttons === 0){ dEnd(); return; }   /* button released outside the window — never strand a half-turn */
    if(Math.abs(dx) > 5 || Math.abs(dy) > 5) dragMoved = true;
    if(dStart.mode === 'free'){
      /* landing: axis-locked — the FIRST clear movement picks the axis
         (vertical = tumble, horizontal = turn right); never both at once */
      if(!dStart.axis && (Math.abs(dx) > 6 || Math.abs(dy) > 6))
        dStart.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if(dStart.axis === 'y' && dStart.restY === YAW0){
        pitch = Math.max(PITCH0 - 102, Math.min(PITCH0 + 102, dStart.p0 - dy * 0.35));
      }else if(dStart.axis === 'x' && dStart.rest === PITCH0){
        yaw = Math.max(YAW0 - 102, Math.min(YAW0 + 12, dStart.y0 + dx * 0.35));
      }
    }else{
      yaw = dStart.y0 + dx * 0.35;
    }
    if(e.touches) e.preventDefault();
  }
  function dEnd(){
    if(!dragging) return;
    dragging = false;
    scene.classList.remove('grabbing');
    if(dStart.mode === 'free'){
      /* turning aid per locked axis — the cube never rests mid-turn */
      if(dStart.axis === 'x'){
        const q = Math.round((yaw - dStart.restY) / 90);
        targetYaw = Math.max(YAW0 - 90, Math.min(YAW0, dStart.restY + 90 * q));
      }else if(dStart.axis === 'y'){
        const quarters = Math.round((pitch - dStart.rest) / 90);
        targetPitch = Math.max(PITCH0 - 90, Math.min(PITCH0 + 90, dStart.rest + 90 * quarters));
      }
    }else{
      const idx = Math.round((YAW0 - yaw) / 90);
      showPage(pages[((idx % 4) + 4) % 4], idx);
    }
    setTimeout(()=>{ dragMoved = false; }, 50);
  }
  scene.addEventListener('mousedown', dStart);
  addEventListener('mousemove', dMove);
  addEventListener('mouseup', dEnd);
  scene.addEventListener('touchstart', dStart, {passive:true});
  scene.addEventListener('touchmove', dMove, {passive:false});
  addEventListener('touchend', dEnd);
  /* interrupted gestures (incoming call, tab switch, alt-tab…) also snap
     to a rest pose instead of stranding the cube mid-turn */
  addEventListener('touchcancel', dEnd);
  addEventListener('blur', dEnd);

  /* ---- pages ---- */
  const shNav = document.getElementById('shNav');
  function showPage(name, rawIdx){
    setPageIcon(name);
    currentPage = name;
    const pIdx = pages.indexOf(name);
    if(rawIdx !== undefined){
      targetYaw = YAW0 - 90 * rawIdx;
    }else{
      const cur = (YAW0 - yaw) / 90;
      let k = Math.round((cur - pIdx) / 4);
      targetYaw = YAW0 - 90 * (pIdx + 4*k);
    }
    document.querySelectorAll('.page').forEach(pg=>
      pg.classList.toggle('on', pg.id === 'page-'+name));
    shNav.querySelectorAll('a[data-page]').forEach(a=>
      a.classList.toggle('on', a.dataset.page === name));
    /* fill the active face's cells — every other face stays bare */
    siteCells.forEach(c=> c.el.classList.toggle('live', c.page === name));
    panel.scrollTop = 0;
    targetSlide = 0;
  }
  shNav.addEventListener('click', e=>{
    const a = e.target.closest('a[data-page]');
    if(a) showPage(a.dataset.page);
  });
  document.getElementById('shBrand').addEventListener('click', e=>{
    e.preventDefault(); showPage('home');
  });
  function goSection(id){
    requestAnimationFrame(()=>{
      if(id==='top'){ panel.scrollTo({top:0, behavior:'smooth'}); return; }
      const el = document.getElementById(id);
      if(el) panel.scrollTo({top: Math.max(0, el.offsetTop - 70), behavior:'smooth'});
    });
  }
  /* scroll to a bento block and flash it so the eye lands on the right category */
  function flashCard(id){
    goSection(id);
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.add('flash');
    setTimeout(()=>el.classList.remove('flash'), 1500);
  }
  document.getElementById('joinContact').addEventListener('click', ()=>showPage('contact'));

  /* ============ publications: data-driven, searchable, filterable ============
     To add a paper later: append one object here. Fields:
     y=year, type=期刊|会议|专著, venue, title, authors, link (paper page), pdf */
  const pubs = SITE.pubs;

  const pubList  = document.getElementById('pubList');
  const pubCount = document.getElementById('pubCount');
  const pubChips = document.getElementById('pubChips');
  const pubSearch= document.getElementById('pubSearch');
  let pubType = '全部';

  function renderPubs(){
    const q = pubSearch.value.trim().toLowerCase();
    const rows = pubs
      .filter(p => pubType==='全部' || p.type===pubType)
      .filter(p => !q || (p.title+' '+p.authors+' '+p.venue+' '+p.y).toLowerCase().includes(q))
      .sort((a,b)=> b.y - a.y);
    pubCount.textContent = rows.length + (lang==='en' ? (rows.length===1?' paper':' papers') : ' 篇');
    pubList.innerHTML = rows.length ? rows.map(p=>`
      <li>
        <div class="pmeta">${p.y} · ${lang==='en' ? ({'期刊':'JOURNAL','会议':'CONFERENCE','专著':'BOOK'})[p.type] : p.type} · ${p.venue}</div>
        <a class="pt" href="${p.link || p.pdf}" target="_blank" rel="noopener">${p.title}</a>
        <div class="pa">${p.authors}</div>
        <div class="pl">
          ${p.link ? '<a href="'+p.link+'" target="_blank" rel="noopener">'+(lang==='en'?'PAPER ↗':'论文 ↗')+'</a>' : ''}
          ${p.pdf  ? '<a href="'+p.pdf +'" target="_blank" rel="noopener">PDF ↓</a>'  : ''}
        </div>
      </li>`).join('')
      : '<li class="pubempty">'+(lang==='en'?'No matching publications.':'未找到匹配的成果。')+'</li>';
  }
  function setPubType(t){
    pubType = t;
    pubChips.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.t===t));
    renderPubs();
  }
  pubChips.addEventListener('click', e=>{
    const b = e.target.closest('button[data-t]');
    if(b) setPubType(b.dataset.t);
  });
  pubSearch.addEventListener('input', renderPubs);
  renderPubs();

  /* ============ language switch: 中 ⇄ EN ============ */
  function setLang(l){
    lang = l;
    document.documentElement.lang = l==='en' ? 'en' : 'zh-CN';
    /* static text: swap between stored Chinese and data-en */
    document.querySelectorAll('[data-en]').forEach(el=>{
      if(!('zh' in el.dataset)) el.dataset.zh = el.textContent;
      el.textContent = l==='en' ? el.dataset.en : el.dataset.zh;
    });
    /* search placeholder */
    if(!pubSearch.dataset.zhPh) pubSearch.dataset.zhPh = pubSearch.getAttribute('placeholder');
    pubSearch.setAttribute('placeholder',
      l==='en' ? pubSearch.dataset.enPh : pubSearch.dataset.zhPh);
    /* toggle buttons show the OTHER language */
    document.querySelectorAll('.langbtn:not(.themebtn)').forEach(b=> b.textContent = l==='en' ? '中' : 'EN');
    /* cube cell labels */
    siteCells.forEach(c=>{ if(c.spanEl) c.spanEl.textContent = l==='en' ? c.en : c.label; });
    /* dynamic content re-renders */
    renderFeeds();
    renderTeam();
    renderPubs();
    if(!reader.hidden && rdCurrent >= 0) openReader(rdCurrent);   /* retranslate open article */
    renderAcadMap();
    renderProjects();
    /* MORE/LESS buttons keep their open-state, in the new language */
    document.querySelectorAll('.more').forEach(b=>{
      const open = document.getElementById(b.dataset.wrap).classList.contains('openned');
      b.textContent = open ? (l==='en'?'LESS ↑':'收起 ↑') : (l==='en'?'MORE ↓':'更多 ↓');
    });
    /* hover panel, if visible */
    if(lastPortal){
      pTag.textContent = l==='en' ? lastPortal.tagEn : lastPortal.tag;
      pText.textContent = l==='en' ? lastPortal.descEn : lastPortal.desc;
    }
  }
  pubSearch.dataset.enPh = pubSearch.getAttribute('data-en-ph');
  /* ---- dark / light theme ---- */
  /* accent for site text: softened per theme (raw hex stays for glows) */
  function applyAccent(p){
    if(!p) return;
    const mode = document.body.classList.contains('light') ? 'light' : 'dark';
    const a = (p.hexText && p.hexText[mode]) || p.hex;
    panel.style.setProperty('--p-accent', a);
    document.body.style.setProperty('--p-accent', a);
  }
  function setTheme(t){
    document.body.classList.toggle('light', t==='light');
    document.querySelectorAll('.themebtn').forEach(b=> b.textContent = t==='light' ? '◐' : '◑');
    applyAccent(lastPortal);
    document.querySelectorAll('.hlogo img, .logorow img').forEach(img=>{
      const src = t==='light' ? img.dataset.light : img.dataset.dark;
      if(src) img.src = (SITE.assetBase||'') + src;
    });
    try{ localStorage.setItem('fusion-theme', t); }catch(e){}
  }
  const toggleTheme = ()=> setTheme(document.body.classList.contains('light') ? 'dark' : 'light');
  document.querySelectorAll('.themebtn').forEach(b=> b.addEventListener('click', toggleTheme));
  try{ if(localStorage.getItem('fusion-theme')==='light') setTheme('light'); }catch(e){}

  const toggleLang = ()=> setLang(lang==='zh' ? 'en' : 'zh');
  document.getElementById('langT1').addEventListener('click', toggleLang);
  document.getElementById('langT2').addEventListener('click', toggleLang);

  /* ---- team data (from fusion.sjtu.edu.cn/people) — original names, Chinese titles ---- */
  const team = SITE.team;

  function renderTeam(){
    Object.entries(team).forEach(([sid, members])=>{
      const grid = document.querySelector('#'+sid+' .pgrid');
      grid.innerHTML = members.map(m=>{
        const t = lang==='en' ? m.tEn : m.t;
        const l = lang==='en' ? (m.lEn ?? m.l) : m.l;
        const inner = `
          <img src="${AB+m.img}" data-rel="${m.img}" alt="" loading="lazy" onerror="__imgfb(this)">
          <div>
            <div class="nm">${m.n}</div>
            <div class="tt">${t}${l? ' · '+l : ''}</div>
            ${m.e? '<div class="em">'+m.e+'</div>' : ''}
          </div>`;
        return m.u
          ? `<a class="person" href="${m.u}" target="_blank" rel="noopener">${inner}</a>`
          : `<div class="person">${inner}</div>`;
      }).join('');
    });
  }
  renderTeam();

  /* ---- news / events data ---- */
  const labNews = SITE.news;
  labNews.forEach((n,i)=>{ n._i = i; });
  const NT = n => lang==='en' ? n.tEn : n.t;
  const NS = n => lang==='en' ? n.sEn : n.s;

  const cardTpl = n => `
    <div class="pcard rd-open" data-ni="${n._i}">
      <img src="${AB+n.img}" data-rel="${n.img}" alt="" loading="lazy" onerror="__imgfb(this)">
      <div class="pb">
        <div class="d">${n.d}</div>
        <div class="t">${NT(n)}</div>
        <div class="s">${NS(n)}</div>
      </div>
    </div>`;
  const tlItem = n => `
    <div class="tl-item">
      <div class="tl-head"><span>${n.d}</span></div>
      <div class="pcard rd-open" data-ni="${n._i}">
        <img src="${AB+n.img}" data-rel="${n.img}" alt="" loading="lazy" onerror="__imgfb(this)">
        <div class="pb">
          <div class="t">${NT(n)}</div>
          <div class="s">${NS(n)}</div>
        </div>
      </div>
    </div>`;

  const news   = labNews.filter(n=>n.cat==='n');
  const events = labNews.filter(n=>n.cat==='e');
  const chrono = a => a.slice().sort((x,y)=>x.d.localeCompare(y.d));
  function renderFeeds(){
    document.getElementById('newsHi').innerHTML   = news.filter(n=>n.hi).map(cardTpl).join('');
    document.getElementById('eventsHi').innerHTML = events.filter(n=>n.hi).map(cardTpl).join('');
    document.getElementById('newsStrip').innerHTML   = chrono(news).map(tlItem).join('');
    document.getElementById('eventsStrip').innerHTML = chrono(events).map(tlItem).join('');
  }
  renderFeeds();

  /* open/close a chronological strip — used by MORE buttons and the cube cells */
  function setTimeline(wrapId, stripId, open){
    const wrap = document.getElementById(wrapId);
    const btn  = document.querySelector('.more[data-wrap="'+wrapId+'"]');
    wrap.classList.toggle('openned', open);
    if(btn) btn.textContent = open ? (lang==='en'?'LESS ↑':'收起 ↑') : (lang==='en'?'MORE ↓':'更多 ↓');
    if(open){
      const strip = document.getElementById(stripId);
      requestAnimationFrame(()=>{ strip.scrollLeft = strip.scrollWidth; });
    }
  }
  document.querySelectorAll('.more').forEach(b=>{
    b.addEventListener('click', ()=>{
      const isOpen = document.getElementById(b.dataset.wrap).classList.contains('openned');
      setTimeline(b.dataset.wrap, b.dataset.strip, !isOpen);
    });
  });
  document.querySelectorAll('.tl-strip').forEach(s=>{
    s.addEventListener('wheel', e=>{
      if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
        s.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, {passive:false});
  });
  document.querySelectorAll('.tl-tools button').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.getElementById(b.dataset.strip)
        .scrollBy({left: 320 * (+b.dataset.dir), behavior:'smooth'});
    });
  });

  /* ---- click: LAB slides into its site; the others open external sites ---- */
  let extTimer = null;
  function enterPortal(p){
    targetPitch = PITCH0;
    targetYaw = YAW0;
    if(leaving) return;
    leaving = true;
    clearTimeout(closeTimer);
    showDetail(p);
    shName.textContent = p.title;
    /* lights out first — the portal colors fade before anything else lights up */
    document.body.classList.add('dimlights');
    portals.forEach(q=>cubieEls[q.key].classList.remove('hot'));
    if(!p.ext){
      labSite.classList.add('show');
      extSite.classList.remove('show');
      panel.scrollTop = 0;
      requestAnimationFrame(()=>{
        document.body.classList.add('expand');
        setTimeout(()=>{
          document.body.classList.add('sitemode');
          showPage('home');
        }, 550);
      });
      const v = labSite.querySelector('video');
      if(v) v.play().catch(()=>{});
    }else{
      document.getElementById('extName').textContent = p.title;
      extSite.classList.add('show');
      labSite.classList.remove('show');
      requestAnimationFrame(()=>document.body.classList.add('expand'));
      extTimer = setTimeout(()=>{ window.location.href = p.url; }, 1100);
    }
  }
  function backToCube(){
    clearTimeout(extTimer);          /* cancels a pending SDC/FOOD redirect too */
    document.body.classList.remove('expand','sitemode','dimlights');
    panel.scrollTop = 0;
    targetSlide = 0; targetYaw = YAW0;
    labSite.classList.remove('show');
    extSite.classList.remove('show');
    showPage('home');
    leaving = false;
    close();
  }
  document.getElementById('siteBack').addEventListener('click', backToCube);
  document.getElementById('cubeBack').addEventListener('click', backToCube);

  pGo.addEventListener('click', e=>{
    e.preventDefault();
    const p = portals.find(q => q.url === pGo.getAttribute('href'));
    if(p) enterPortal(p);
  });

  addEventListener('keydown', e=>{
    if(e.key!=='Escape') return;
    if(!document.getElementById('reader').hidden) return;   /* reader owns ESC while open */
    if(document.body.classList.contains('expand')){ backToCube(); return; }
    close();
  });

  const logoSrc = (l, mode) => (typeof l === 'string') ? l : (l[mode] || l.dark || l.light);
  const themeMode = () => document.body.classList.contains('light') ? 'light' : 'dark';
  /* ---- brand logos: inserted ONCE at startup (never re-run on language/theme) ---- */
  /* brand logos in both headers */
  if(Array.isArray(SITE.logos) && SITE.logos.length){
    document.querySelectorAll('.topbar .brand, .siteheader .brand').forEach(br=>{
      if(br.querySelector('.hlogo')) return;
      SITE.logos.slice().reverse().forEach(l=>{
        const sp = document.createElement('span');
        sp.className = 'hlogo';
        const img = document.createElement('img');
        img.alt = '';
        if(typeof l === 'object'){ img.dataset.dark = l.dark||''; img.dataset.light = l.light||''; }
        img.src = (SITE.assetBase||'') + logoSrc(l, themeMode());
        img.onerror = ()=> sp.remove();
        sp.appendChild(img);
        br.insertBefore(sp, br.firstChild);
      });
    });
  }

  /* brand logos in the site footer (white rounded cards per design guide) */
  if(Array.isArray(SITE.logos) && SITE.logos.length){
    const sf = document.querySelector('.sitefooter');
    if(sf && !sf.querySelector('.logorow')){
      const row = document.createElement('div');
      row.className = 'logorow';
      SITE.logos.forEach(l=>{
        const sp = document.createElement('span');
        const img = document.createElement('img');
        img.alt = '';
        if(typeof l === 'object'){ img.dataset.dark = l.dark||''; img.dataset.light = l.light||''; }
        img.src = (SITE.assetBase||'') + logoSrc(l, themeMode());
        img.onerror = ()=> sp.remove();
        sp.appendChild(img);
        row.appendChild(sp);
      });
      sf.appendChild(row);
    }
  }


  /* ---- ongoing projects (placeholder until content arrives) ---- */
  function renderProjects(){
    const g = document.getElementById('projGrid');
    if(!g) return;
    const P = SITE.projects || [];
    if(!P.length){
      g.innerHTML = '<div class="cell2 ph"><b>'+(lang==='en'?'Project descriptions coming soon':'项目介绍 · 筹备中')+'</b>'+
        '<span>'+(lang==='en'?'Ongoing research projects will be presented here.':'当前进行中的研究项目将在此展示。')+'</span></div>';
      return;
    }
    g.innerHTML = P.map(pr=>'<div class="cell2"><b>'+(lang==='en'?pr.tEn:pr.t)+'</b><span>'+(lang==='en'?pr.sEn:pr.s)+'</span></div>').join('');
  }
  renderProjects();

  /* ---- article reader: click a news/event card to read it ---- */
  const reader  = document.getElementById('reader');
  const rdImg   = document.getElementById('rdImg');
  const rdMeta  = document.getElementById('rdMeta');
  const rdTitle = document.getElementById('rdTitle');
  const rdBody  = document.getElementById('rdBody');
  const rdLink  = document.getElementById('rdLink');
  let rdCurrent = -1;
  function openReader(i){
    const n = labNews[i]; if(!n) return;
    rdCurrent = i;
    rdImg.style.display='';
    rdImg.onerror = ()=>{ rdImg.style.display='none'; };
    rdImg.src = (SITE.assetBase||'') + n.img;
    rdMeta.textContent = n.d + ' · ' + (n.cat==='n' ? (lang==='en'?'NEWS':'新闻') : (lang==='en'?'EVENT':'事件'));
    rdTitle.textContent = lang==='en' ? n.tEn : n.t;
    const raw = lang==='en' ? (n.bodyEn || n.sEn) : (n.body || n.s);
    const esc = t => t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    rdBody.innerHTML = String(raw||'').split(/\n{2,}/)
      .map(par => '<p>'+esc(par.trim()).replace(/\n/g,'<br>')+'</p>').join('');
    if(n.u){ rdLink.style.display=''; rdLink.href = n.u; } else { rdLink.style.display='none'; }
    reader.hidden = false;
    document.body.classList.add('rd-lock');
  }
  function closeReader(){
    reader.hidden = true;
    document.body.classList.remove('rd-lock');
  }
  document.addEventListener('click', e=>{
    const card = e.target.closest('.rd-open');
    if(card){ openReader(+card.dataset.ni); return; }
    if(e.target.id==='rdClose' || e.target===reader) closeReader();
  });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && !reader.hidden){
      e.stopImmediatePropagation();
      e.preventDefault();
      closeReader();
    }
  }, true);


  /* ============ academic collaboration map ============ */
  function renderAcadMap(){
    const M = SITE.acadMap, host = document.getElementById('acadMap');
    if(!M || !host) return;
    const pts = M.points, home = pts.find(q=>q.home) || pts[0];
    const arc = (a,b)=>{
      const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
      const dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy)||1;
      const k=Math.min(60, L*0.18);
      const cx=mx - dy/L*k, cy=my + dx/L*k - k*0.6;
      return `M${a.x} ${a.y}Q${cx} ${cy} ${b.x} ${b.y}`;
    };
    host.classList.add('mapon');
    host.innerHTML = `
      <div class="maptitle">${lang==='en' ? (M.titleEn||'') : (M.title||'')}</div>
      <div class="mzoom">
        <button type="button" data-z="in" title="Zoom in">＋</button>
        <button type="button" data-z="out" title="Zoom out">－</button>
        <button type="button" data-z="reset" title="Reset">⟲</button>
      </div>
      <svg viewBox="0 0 1000 470" preserveAspectRatio="xMidYMid meet" aria-label="collaboration map">
        <g class="mview">
          <path class="mw" d="${M.worldPath}"/>
          ${pts.filter(q=>!q.home).map(q=>`<path class="mroute" d="${arc(home,q)}"/>`).join('')}
          ${pts.map(q=>`
            <g class="mpin${q.home?' mhome':''}" data-id="${q.id}" transform="translate(${q.x},${q.y})" tabindex="0" role="button" aria-label="${q.en}">
              <circle class="mhit" r="14"/>
              <circle class="mdot" r="${q.home?6:4.5}"/>
              <circle class="mring" r="${q.home?11:9}"/>
            </g>`).join('')}
        </g>
      </svg>
      <div class="mpop" id="mpop" hidden>
        <button class="mpop-x" type="button">✕</button>
        <i id="mpopK"></i><b id="mpopT"></b><div class="mrows" id="mpopS"></div>
        <div class="mcontact" id="mpopC" hidden><i></i><span></span></div>
      </div>`;

    const svg  = host.querySelector('svg');
    const view = host.querySelector('.mview');
    const pop  = host.querySelector('#mpop');

    /* ---- zoom & pan state (viewBox units) ---- */
    let z = 1, tx = 0, ty = 0, panned = false;
    const apply = ()=>{ view.setAttribute('transform', `translate(${tx} ${ty}) scale(${z})`); };
    const clampView = ()=>{
      z = Math.min(6, Math.max(1, z));
      if(z === 1){ tx = 0; ty = 0; return; }
      tx = Math.min(0, Math.max(1000 - 1000*z, tx));
      ty = Math.min(0, Math.max(470  -  470*z, ty));
    };
    const toBox = e => {              /* pointer → viewBox coords */
      const r = svg.getBoundingClientRect();
      return { x:(e.clientX - r.left)/r.width*1000, y:(e.clientY - r.top)/r.height*470 };
    };
    const zoomAt = (f, cx, cy)=>{
      const nz = Math.min(6, Math.max(1, z*f));
      tx = cx - (cx - tx) * (nz/z);
      ty = cy - (cy - ty) * (nz/z);
      z = nz; clampView(); apply();
    };
    svg.addEventListener('wheel', e=>{
      e.preventDefault();
      const c = toBox(e);
      zoomAt(e.deltaY < 0 ? 1.25 : 0.8, c.x, c.y);
    }, {passive:false});
    host.querySelectorAll('.mzoom button').forEach(b=>{
      b.addEventListener('click', ()=>{
        if(b.dataset.z==='reset'){ z=1; tx=0; ty=0; apply(); return; }
        zoomAt(b.dataset.z==='in' ? 1.4 : 0.72, (500 - tx)/z, (235 - ty)/z);
      });
    });
    /* drag to pan when zoomed */
    let pd = null;
    svg.addEventListener('pointerdown', e=>{ if(z>1){ pd={x:e.clientX,y:e.clientY,tx,ty}; panned=false; svg.setPointerCapture(e.pointerId);} });
    svg.addEventListener('pointermove', e=>{
      if(!pd) return;
      const r = svg.getBoundingClientRect();
      const dx=(e.clientX-pd.x)/r.width*1000, dy=(e.clientY-pd.y)/r.height*470;
      if(Math.abs(dx)>3 || Math.abs(dy)>3) panned = true;
      tx = pd.tx + dx; ty = pd.ty + dy; clampView(); apply();
    });
    svg.addEventListener('pointerup', ()=>{ pd=null; setTimeout(()=>panned=false, 40); });

    /* ---- popup ---- */
    const show = q => {
      host.querySelector('#mpopK').textContent = lang==='en' ? q.zh : q.en;   /* the other language as kicker */
      host.querySelector('#mpopT').textContent = lang==='en' ? q.tEn : q.t;
      const rows = String(lang==='en' ? q.sEn : q.s).split('·').map(x=>x.trim()).filter(Boolean);
      host.querySelector('#mpopS').innerHTML = rows.map(r=>`<span>${r.replace(/</g,'&lt;')}</span>`).join('');
      const mc = host.querySelector('#mpopC');
      const person = lang==='en' ? q.cEn : q.c;
      mc.hidden = !person;
      if(person){
        mc.querySelector('i').textContent = lang==='en' ? 'COLLABORATOR' : '合 作 人';
        mc.querySelector('span').textContent = person;
      }
      pop.hidden = false;
      const r = host.getBoundingClientRect();
      const px = (q.x*z+tx)/1000*r.width, py = (q.y*z+ty)/470*(r.width*0.47);
      pop.style.left = Math.min(Math.max(px+16, 8), r.width-286) + 'px';
      pop.style.top  = Math.min(Math.max(py-8, 46), r.height-140) + 'px';
    };
    host.querySelectorAll('.mpin').forEach(g=>{
      const q = pts.find(x=>x.id===g.dataset.id);
      g.addEventListener('click', e=>{ e.stopPropagation(); if(!panned) show(q); });
      g.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(q); } });
    });
    pop.querySelector('.mpop-x').addEventListener('click', ()=> pop.hidden = true);
    host.addEventListener('click', e=>{ if(!e.target.closest('.mpin') && !e.target.closest('.mpop')) pop.hidden = true; });
  }
  renderAcadMap();

  /* build identifier — settle "which version am I running" instantly */
  console.log('%c[fusion-site] build ' + (SITE.build||'?'), 'color:#39d6e9');
  const lf = document.querySelector('footer .right') || document.querySelector('footer');
  if(lf){
    const lb = document.createElement('span');
    lb.style.cssText='margin-left:14px;font-family:var(--mono);font-size:10px;letter-spacing:.14em;opacity:.4';
    lb.textContent = 'build ' + (SITE.build||'?');
    lf.appendChild(lb);
  }
  const sfEl = document.querySelector('.sitefooter');
  if(sfEl){
    const b = document.createElement('div');
    b.style.cssText='margin-top:14px;font-family:var(--mono);font-size:10px;letter-spacing:.14em;opacity:.35';
    b.textContent = 'build ' + (SITE.build||'?');
    sfEl.appendChild(b);
  }
})();
