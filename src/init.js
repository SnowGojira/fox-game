//设计一个动画计时器，
//每3秒中更新一次
//使用requestAnimationFrame来完成
//不要使用setTimeout或者setInterval会影响性能

//3s 间隔
const TIME_INTERVAL = 3000;

//每3s中执行一次的函数
function tick() {
  console.log("call me", Date.now());
}

//主要完成3秒中计时功能
async function init() {
  console.log("starting game");

  let start_timer = Date.now();

  function nextAnimationFrame() {
    let end_timer = Date.now();
    if (start_timer <= end_timer) {
      //将startTimer修正
      //实际上还是start_timer+Time_interval < end_timer
      //这样写保证第一次可以tick
      //开始下一段循环
      start_timer = Date.now() + TIME_INTERVAL;
      tick();
    }
    //让requestAnimation来刷新函数
    //直到刷新的秒数符合条件，退出函数
    requestAnimationFrame(nextAnimationFrame);
  }

  //进入下一个大循环
  nextAnimationFrame();
}

init();
