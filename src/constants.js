//init.js时间框架下需要的间歇常量
export const TIME_INTERVAL = 3000;

//buttons.js需要的ICONS标签常量
export const ICONS = ["fish", "poop", "weather"];
//下雨概率
export const SCENES = ["day", "rain"];
export const RAIN_CHANCE = 0.8;
//白天黑夜的转换
export const DAY_LENGTH = 30;
export const NIGHT_LENGTH = 3;
//饥饿时间
export const getNextHungerTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;
//死亡时间
export const getNextDieTime = (clock) =>
  Math.floor(Math.random() * 2) + 3 + clock;
//便便时间
export const getNextPoopTime = (clock) =>
  Math.floor(Math.random() * 3) + 4 + clock;
