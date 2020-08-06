//狐狸有的状态码
// [
//   "INIT",
//   "HATCHING",
//   "IDLING",
//   "SLEEPING",
//   "EATING",
//   "POOPING",
//   "HUNGRY",
//   "CELEBRATING",
//   "DEAD"
// ]
const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  tick() {
    this.clock += 1;
    console.log(this.clock);
    //在钟表下唤醒一下
    if (this.clock === this.wakeTime) {
      this.wake();
    }

    return this.clock;
  },
  startGame() {
    console.log("Hatching");
    this.current = "HATCHING";
    //等待3秒后醒来
    this.wakeTime = this.clock + 3;
  },
  wake() {
    console.log("waked");
    this.current = "IDLING";
    //此时重置一下醒来时间，等待下一轮
    this.wakeTime = -1;
  },
  changeWeather() {
    console.log("weather changed!");
  },
  cleanUp() {
    console.log("clean up poops!");
  },
  feed() {
    console.log("feed fish!");
  },
  userActionHandler(icon) {
    //有些状态下，按钮不做任何事情
    if (
      ["HATCHING", "SLEEPING", "CELEBRATING", "EATING"].includes(this.current)
    ) {
      //do nothing
      return;
    }

    //点击中间按钮的开始逻辑
    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    //三个按钮不断切换时候的逻辑
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUp();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
};

export const userActionHandler = gameState.userActionHandler.bind(gameState);
export default gameState;
