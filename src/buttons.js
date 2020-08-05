//🤢constant是常量存储
import { ICONS } from "./constants";

const toggleHighlighted = (icon, isShow) => {
  //🤢ICONS[icon]
  document
    .querySelector(`.${ICONS[icon]}-icon`)
    .classList.toggle("highlighted", isShow);
};

//按钮的点击逻辑
//😡userActionHandler将调用业务逻辑gameState.js
export default function initButtons(userActionHandler) {
  let selectedIcon = 0;
  function buttonClick({ target }) {
    if (target.classList.contains("left-btn")) {
      //先熄灭当前的按钮
      toggleHighlighted(selectedIcon, false);
      //左边移动位置2,并除余循环起来
      selectedIcon = (selectedIcon + 2) % ICONS.length;
      //选中更新的位置
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      toggleHighlighted(selectedIcon, false);
      //右边移动位置+1,并除余循环起来
      selectedIcon = (selectedIcon + 1) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      //选中,执行userActionHandler
      //传入的selectedIcon，是状态码
      userActionHandler(ICONS[selectedIcon]);
    }
  }

  //执行点击逻辑
  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
