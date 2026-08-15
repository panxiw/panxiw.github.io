/* 首页识别 + 背景模式开关（隐藏文章看壁纸） */
(() => {
  'use strict';
  // 首页识别
  if ((location.pathname || '/') === '/') document.body.classList.add('home');

  // 背景模式开关按钮
  const KEY = 'bg-mode';
  const btn = document.createElement('button');
  btn.id = 'bg-toggle';
  btn.type = 'button';
  btn.title = '背景模式：隐藏文章看壁纸';
  btn.textContent = '🖼️';
  btn.setAttribute('aria-label', '背景模式开关');
  document.body.appendChild(btn);

  const apply = () => {
    const on = document.body.classList.contains('bg-mode');
    btn.textContent = on ? '✖' : '🖼️';
    btn.title = on ? '退出背景模式' : '背景模式：隐藏文章看壁纸';
    btn.classList.toggle('active', on);
  };
  btn.addEventListener('click', () => {
    document.body.classList.toggle('bg-mode');
    try { localStorage.setItem(KEY, document.body.classList.contains('bg-mode') ? '1' : '0'); } catch (e) {}
    apply();
  });

  // 恢复上次状态；?bg=1 可直接进入背景模式
  let on = false;
  try { on = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (!on && new URLSearchParams(location.search).get('bg') === '1') on = true;
  if (on) document.body.classList.add('bg-mode');
  apply();
})();
