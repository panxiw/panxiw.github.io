/* 芙莉莲看板娘 + 语录气泡 */
OML2D.loadOml2d({
  initialStatus: 'active',
  mobileDisplay: true,
  primaryColor: '#6366f1',
  dockedPosition: 'left',
  models: [{
    path: '/live2d/frieren/Frieren.model3.json',
    scale: 0.055,
    position: [60, 40],
    stageStyle: { width: 360, height: 520, bottom: '76px' },
    mobileScale: 0.03,
    mobilePosition: [60, 40],
    mobileStageStyle: { width: 220, height: 300, bottom: '56px' }
  }],
  menus: {
    items: (defaultItems) => defaultItems.filter(item => item.id !== 'About'),
    style: { left: '10px', right: 'auto', bottom: '170px' },
    mobileStyle: { left: '10px', right: 'auto', bottom: '55%' }
  },
  tips: {
    messageLine: 3,
    style: {
      background: 'rgba(255,255,255,.88)',
      color: '#333',
      borderRadius: '10px',
      border: '1px solid rgba(99,102,241,.35)',
      boxShadow: '0 8px 32px rgba(31,38,135,.15)',
      backdropFilter: 'blur(8px)',
      fontSize: '14px'
    },
    welcomeTips: {
      message: {
        daybreak: '清晨好～欢迎来到云苏葛的小站！',
        morning: '上午好～我是芙莉莲，请多指教。',
        noon: '中午好～该吃午饭啦，记得好好吃饭哦。',
        afternoon: '午后好～泡杯茶，歇一歇吧。',
        dusk: '傍晚好～今天也辛苦啦。',
        night: '晚上好～芙莉莲陪你聊聊天吧。',
        lateNight: '夜深了，早点休息哦。',
        weeHours: '这么晚还不睡，当心熬夜秃头！'
      },
      duration: 6000
    },
    idleTips: {
      message: [
  "「人死了之后，才会真正被人了解。」——芙莉莲",
  "「勇者辛美尔，是个温柔的人啊。」——芙莉莲",
  "「魔族不会说谎，但会欺骗。」——芙莉莲",
  "「我想多了解人类一些，所以踏上了旅途。」——芙莉莲",
  "「走得慢也没关系，因为想记住旅途中的风景。」——芙莉莲",
  "「明明是大魔法使，生活却一塌糊涂呢。」——菲伦",
  "「今天再乱放东西的话，晚饭就没有了哦。」——菲伦",
  "「师父的话，由我来照顾。」——菲伦",
  "「总有一天，要把芙莉莲大人的传说讲给孩子们听。」——修塔尔克",
  "「旅途的终点，是学会理解人心。」——云苏葛的小站"
],
      interval: 9000,
      duration: 5000
    }
  }
});
