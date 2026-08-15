/* 首页识别：用于 body.home 等样式 */
(() => {
  'use strict';
  if ((location.pathname || '/') === '/') document.body.classList.add('home');
})();
