/* 炫酷交互：极光背景层 + 鼠标光晕跟随 */
(() => {
  'use strict';
  // 极光背景层（放最底层）
  const aurora = document.createElement('div');
  aurora.id = 'aurora-bg';
  document.body.insertBefore(aurora, document.body.firstChild);

  // 鼠标光晕跟随（平滑缓动）
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let tx = -1000, ty = -1000, x = -1000, y = -1000;
  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  }, { passive: true });
  (function loop() {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    glow.style.transform = 'translate(' + (x - 160) + 'px, ' + (y - 160) + 'px)';
    requestAnimationFrame(loop);
  })();
})();
