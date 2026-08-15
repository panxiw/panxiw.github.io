/* 首页识别 + 背景模式开关 + 魔法阵觉醒系统 */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  // 首页识别
  if ((location.pathname || '/') === '/') document.body.classList.add('home');

  // ---- 背景模式开关 ----
  const KEY = 'bg-mode';
  const btn = document.createElement('button');
  btn.id = 'bg-toggle';
  btn.type = 'button';
  btn.title = '背景模式：隐藏文章看壁纸';
  btn.innerHTML = '<i class="fas fa-image"></i>';
  btn.setAttribute('aria-label', '背景模式开关');
  document.body.appendChild(btn);
  const apply = () => {
    const on = document.body.classList.contains('bg-mode');
    btn.innerHTML = on ? '<i class="fas fa-times"></i>' : '<i class="fas fa-image"></i>';
    btn.title = on ? '退出背景模式' : '背景模式：隐藏文章看壁纸';
    btn.classList.toggle('active', on);
  };
  btn.addEventListener('click', () => {
    document.body.classList.toggle('bg-mode');
    try { localStorage.setItem(KEY, document.body.classList.contains('bg-mode') ? '1' : '0'); } catch (e) {}
    apply();
  });
  let on = false;
  try { on = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (!on && new URLSearchParams(location.search).get('bg') === '1') on = true;
  if (on) document.body.classList.add('bg-mode');
  apply();

  // ---- 魔法阵觉醒：四层同心(核心/符文/星纹/外圈) + 金色氛围 + 流光层 ----
  // 先放金色氛围层（DOM 顺序在圆环之前 → 绘制在下层）
  const vignette = document.createElement('div');
  vignette.id = 'magic-vignette';
  document.body.appendChild(vignette);
  // 四层内联 SVG：拉取源文件，渐变 id 唯一化后注入，颜色由 CSS 变量 --g1/--g2 驱动
  const bands = [
    { id: 'magic-a', file: 'magic-circle-band-a.svg' },
    { id: 'magic-b', file: 'magic-circle-band-b.svg' },
    { id: 'magic-c', file: 'magic-circle-band-c.svg' },
    { id: 'magic-d', file: 'magic-circle-band-d.svg' },
  ];
  bands.forEach(b => {
    const el = document.createElement('div');
    el.id = b.id;
    document.body.appendChild(el);
    fetch('/img/' + b.file)
      .then(r => r.text())
      .then(svg => {
        const uid = 'gold-' + b.id.slice(-1);
        svg = svg.replace(/id="gold"/g, 'id="' + uid + '"').replace(/url\(#gold\)/g, 'url(#' + uid + ')');
        el.innerHTML = svg;
      })
      .catch(() => { /* 拉取失败则此层不显示，不影响其余 */ });
  });

  // ---- 魔法阵激活开关（暗金沉睡 / 亮金流动） ----
  const MAGIC_KEY = 'magic-on';
  const mbtn = document.createElement('button');
  mbtn.id = 'magic-toggle';
  mbtn.type = 'button';
  mbtn.title = '激活魔法阵';
  mbtn.innerHTML = '<i class="fas fa-circle-notch"></i>';
  mbtn.setAttribute('aria-label', '魔法阵激活开关');
  document.body.appendChild(mbtn);
  const mapply = () => {
    const on = document.body.classList.contains('magic-on');
    mbtn.title = on ? '让魔法阵沉睡' : '激活魔法阵';
    mbtn.classList.toggle('active', on);
  };
  mbtn.addEventListener('click', () => {
    document.body.classList.toggle('magic-on');
    try { localStorage.setItem(MAGIC_KEY, document.body.classList.contains('magic-on') ? '1' : '0'); } catch (e) {}
    mapply();
  });
  let mon = false;
  try { mon = localStorage.getItem(MAGIC_KEY) === '1'; } catch (e) {}
  if (mon) document.body.classList.add('magic-on');
  mapply();

  const glow = document.createElement('div');
  glow.id = 'magic-glow';
  const spin = document.createElement('div');
  spin.className = 'magic-glow-spin';
  glow.appendChild(spin);
  document.body.appendChild(glow);

  const setProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    const goUp = document.getElementById('go-up');
    if (goUp) goUp.style.setProperty('--scroll-pct', p.toFixed(1));
    document.body.style.setProperty('--circle-glow', Math.min(1, (p / 100) * 1.5).toFixed(2));
  };
  window.addEventListener('scroll', setProgress, { passive: true });
  setProgress();

  // ---- 滚动渐入：进入视野即唤醒 ----
  const targets = document.querySelectorAll('.recent-post-item, .card-widget, .layout_post > article, #page .page, .article-sort-item');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('awaken'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('awaken'));
  }
})();
