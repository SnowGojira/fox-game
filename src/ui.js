//切换狐狸的状态
export function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
}
//切换场景
export function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
}
//切换poopBag
