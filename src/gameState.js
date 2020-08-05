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
  tick() {
    this.clock += 1;
    console.log(this.clock);
    return this.clock;
  },
  userActionHandler(icon) {
    console.log(icon);
  },
};

export default gameState;
