'use strict'

let mas = ["Bill", "Lucy", "Poll", "Ken", "Jen"];
/////////////////Промисы последовательно выполняются////////////////
const Kill = mas => Promise.resolve(mas.shift());
async function threaten2(mas) {
  for (let i = 0; i < 1; i++) {
    try {
      let dead = await Kill(mas);
      if (!dead) throw new Error("All died");
      console.log("Dead " + dead);
    } catch (err) {
      throw err.message;
    }
  }
  return mas;
};
threaten2(mas).then(
  (resolve) => { 
    console.log("They are next -> " + resolve.join(' -> '));
  });

//////////// через 2 дня не выплатят выкуп////////////
const noPay = mas => new Promise((resolve, reject) => {
  if (!mas.length) reject('All died');
  setTimeout(resolve, 100, mas.shift());
});

//промисы выполняются последовательно
async function threaten(mas, murderMap) {
  const killLucy = await noPay(mas);
  const killPoll = await noPay(mas);
  const killKen = await noPay(mas);
  return mas;
}
threaten(mas);

/////////////////// Without await//////////////////////
// let killBill;
// async function threatened (mas){
//   return new Promise((resolve, reject) => {
//     if(!mas.length) reject('All died');
//     setTimeout(() => {
//       resolve(mas.shift());
//     }, 1000);
//     }).then((result) => { killBill = resolve;});
// }

//2 промиса разрешаются паралельно
const first = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "Dan");
});

const second = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "Rom");
});

const third = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "Tan");
});

Promise.all([first, second, third]).then(console.log).catch(console.log);

const Kidnapping = human => Promise.resolve(human);

const threaten1 = () => Kidnapping("Julia");

threaten1()
  .then(resolve => {
    console.log(resolve + " died " );
  })
  .catch(err => {
    console.log(err.message);
  });
