//本文档是程序的入口，所有逻辑的汇总
//😡gameState是业务逻辑
import gameState from "./gameState";
//🤢constant是常量存储
import { TIME_INTERVAL } from "./constants";
//😂button.js是UI逻辑
import initButtons from "./buttons.js";

//😂调用UI逻辑button.js的点击逻辑
initButtons(gameState.userActionHandler);
//主要完成3秒中计时主框架
async function init() {
  let start_timer = Date.now();

  function nextAnimationFrame() {
    let end_timer = Date.now();
    if (start_timer <= end_timer) {
      //入口
      //😡
      gameState.tick();
      //将startTimer修正
      //实际上还是start_timer+Time_interval < end_timer
      //这样写保证第一次可以tick
      //开始下一段循环
      start_timer = Date.now() + TIME_INTERVAL;
    }
    //让requestAnimation来刷新函数
    //直到刷新的秒数符合条件，退出函数
    requestAnimationFrame(nextAnimationFrame);
  }

  //进入下一个大循环
  nextAnimationFrame();
}

init();
