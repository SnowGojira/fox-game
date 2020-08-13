import { modFox, modScene, togglePoopBag, writeModal } from "./ui";
import {
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime,
  getNextPoopTime,
} from "./constants";
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
  scene: -1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  deadTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  tick() {
    this.clock += 1;
    console.log(this.clock);
    //在钟表下唤醒一下
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.hungry();
    } else if (this.clock === this.poopTime) {
      this.poop();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrate();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrate();
    } else if (this.clock === this.deadTime) {
      this.dead();
    }

    return this.clock;
  },
  start() {
    console.log("Hatching");
    this.current = "HATCHING";
    modFox("egg");
    modScene("day");

    //等待3秒后醒来
    this.wakeTime = this.clock + 3;
  },
  wake() {
    console.log("waked");
    this.current = "IDLING";
    modFox("idling");

    //降水概率的计算
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();

    //开始睡觉时间在一天结束时设置
    this.sleepTime = this.clock + DAY_LENGTH;

    //进入饥饿状态
    this.hungryTime = getNextHungerTime(this.clock);
  },
  sleep() {
    console.log("sleeping");
    this.current = "SLEEPING";
    modFox("sleep");
    modScene("night");

    //每天结束重置所有的时间线
    this.clearTimes();
    //睡醒的时间在黑夜结束时设置
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  hungry() {
    this.current = "HUNGRY";
    modFox("hungry");

    //过一段时间后没有被喂食会死亡
    this.deadTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
  },
  feed() {
    //如果不是饥饿，就直接退出
    if (this.current !== "HUNGRY") {
      return;
    }
    console.log("feed fish!");
    this.current = "EATING";
    modFox("eating");
    //喂过之后不需要死了，死亡时间重置
    this.deadTime = -1;
    //过一阵要便便
    this.poopTime = getNextPoopTime(this.clock);
    //设置开始庆祝时间的标记
    this.timeToStartCelebrating = this.clock + 2;
    // this.startCelebrate();
  },
  poop() {
    this.current = "POOPING";
    modFox("pooping");
    //重置便便时间
    this.poopTime = -1;
    //拉完屎不收拾会“屎”
    this.deadTime = getNextDieTime(this.clock);
  },
  startCelebrate() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    //设置结束标记
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrate() {
    //便便袋子隐藏掉
    togglePoopBag(false);
    //重置状态
    this.current = "IDLING";
    this.determineFoxState();
    //重置结束标记
    this.timeToEndCelebrating = -1;
  },
  dead() {
    this.current = "DEAD";
    modFox("dead");
    modScene("dead");
    this.clearTimes();
    writeModal("press the button restart");
  },
  changeWeather() {
    this.scene = (1 + this.scene) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },
  cleanUp() {
    if (this.current === "POOPING") {
      console.log("clean poops!");
      this.deadTime = -1;
      togglePoopBag(true);
      this.startCelebrate();
      //重置hungryTime
      this.hungryTime = -1;
    }
  },
  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },

  userActionHandler(icon) {
    //有些状态下，按钮不做任何事情
    if (
      ["HATCHING", "SLEEPING", "CELEBRATING", "EATING", "POOPING"].includes(
        this.current
      )
    ) {
      //do nothing
      return;
    }

    //点击中间按钮的开始逻辑
    if (this.current === "INIT" || this.current === "DEAD") {
      this.start();
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
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToEndCelebrating = -1;
    this.timeToStartCelebrating = -1;
  },
};

export const userActionHandler = gameState.userActionHandler.bind(gameState);
export default gameState;
