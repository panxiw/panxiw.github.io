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

  // ---- 魔法阵觉醒：金色流光层 + 滚动进度 ----
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
