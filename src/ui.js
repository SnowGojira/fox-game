//切换狐狸的状态
export function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
}
//切换场景
export function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
}
//切换poopBag
export function togglePoopBag(isShow) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !isShow);
}

//更换
export const writeModal = function writeModal(text = "") {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
