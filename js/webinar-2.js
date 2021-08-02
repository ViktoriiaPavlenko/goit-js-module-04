//  Функция это объект -> ССЫЛОЧНЫЙ ТИП

console.log('[] === []: ', [] === []);   //false
console.log('{} === {}: ', {} === {});   //false
console.log(
    'function() {} === function() {}: ',
    function () {} === function () {},   //false
);


const fnA = function () {
    console.log('hello');
};

const fnB = fnA;
console.log('fnB === fnA: ', fnB === fnA);   //true


// -------THIS

// -------1) Как метод объекта. В контексте объекта.

// const user = {
//     tag: 'Mango',
//     showTag() {
//         console.log('showTag -> this', this);
//     },
// };

// user.showTag();


// -------2) Вызов без контекста
// - В строгом режиме = undefined
// - Не в строгом режиме = window

// const foo = function () {
//     console.log('foo -> this', this);
// };

// foo();


// -------3) Как метод объекта, но объявлена как внешняя функция.
// В контексте объекта.

// const showTag = function () {
//     console.log('showTag -> this', this);   //undefined
//     console.log('showTag -> this.tag', this.tag);   //ошибка
// };

// showTag();     // значение this - undefined


// 
// const showTag = function () {
//     console.log('showTag -> this', this);  //this - это user
//     console.log('showTag -> this.tag', this.tag);
// };

// const user = {
//     tag: 'Mango',
// };

// user.showUserTag = showTag;
// console.log('user', user);

// user.showUserTag();                       //user - это this



// -------4) Вызов без контекста, но объявлена как метод объекта.


// const user = {
//     tag: 'Mango',
//     showTag() {
//         console.log('showTag -> this', this);
//         console.log('showTag -> this.tag', this.tag);
//     },
// };

// user.showTag();      //this - user

// const outerShowTag = user.showTag;

// outerShowTag();      //this - undefined



// -------5) Контекст в callback - функциях

// const user = {
//     tag: 'Mango',
//     showTag() {
//         console.log('showTag -> this', this);
//         console.log('showTag -> this.tag', this.tag);
//     },
// };

// const invokeAction = function (action) {
//     console.log(action);

//     action();
// };

// invokeAction(user.showTag);   //this - undefined


// ------- PRACTICE

// 1
// const fn = function () {
//     console.log('fn -> this', this);
// };

// fn(); //this - undefined




// 2
// const book = {
//     title: 'React for beginners',
//     showThis() {
//         console.log('showThis -> this', this);
//     },
//     showTitle() {
//         console.log('showTitle -> this.title', this.title);
//     },
// };

// book.showThis(); // this - book

// const outerShowThis = book.showThis;
// outerShowThis(); // this - undefined

// const outerShowTitle = book.showTitle;
// outerShowTitle(); // this - undefined и ошибка в консоли


// 3

// const makeChangeColor = function () {
//     const changeColor = function (color) {
//         console.log('changeColor -> this', this);
//         this.color = color;
//     };

//     // changeColor(); // this - undefined

//     const sweater = {
//         color: 'teal',
//     };

//     sweater.updateColor = changeColor;

//     // sweater.updateColor('red'); // this - sweater

//     return sweater.updateColor;
// };

// // makeChangeColor();

// const swapColor = makeChangeColor();
// swapColor('blue'); // this - undefined


// 4

// const makeChangeColor = function () {
//     const changeColor = function (color) {
//         console.log('changeColor -> this', this);
//     };

//     return changeColor;
// };

// const updateColor = makeChangeColor();
// updateColor('yellow'); // this - undefined

// const hat = {
//     color: 'blue',
//     updateColor: updateColor,
// };

// hat.updateColor('orange'); // this - hat


// 5

// const counter = {
//     value: 0,
//     increment(value) {
//         console.log('increment -> this', this);
//         this.value += value;
//     },
//     decrement(value) {
//         console.log('decrement -> this', this);
//         this.value -= value;
//     },
// };

// const updateCounter = function (value, operation) {
//     operation(value);
// };

// updateCounter(10, counter.increment);  // this - undefined
// updateCounter(5, counter.decrement);   // this - undefined




// ------------ CALL и APPLY
 
// const showThis = function (a, b, arr) {
//     console.log(a, b, arr);
//     console.log('showThis -> this', this);
// };

// showThis();

// const objA = {
//     a: 5,
//     b: 10,
// };

// showThis.call(objA, 5, 1, [100, 200, 300]);
// showThis.apply(objA, [5, 1, [100, 200, 300]]);

// const objB = {
//     x: 788,
//     y: 25,
// };

// showThis.call(objB, 1, 1, 2);
// showThis.apply(objB, [1, 1, 2]);

// showThis();

const changeColor = function (color) {
    console.log('changeColor -> this', this);
    this.color = color;
};

const hat = {
    color: 'black',
};

changeColor.call(hat, 'orange');
console.log(hat);

const sweater = {
    color: 'green',
};

changeColor.call(sweater, 'blue');
console.log(sweater);


// --------------- BIND

const changeHatColor = changeColor.bind(hat);
const changeSweaterColor = changeColor.bind(sweater);

changeHatColor('yellow');
console.log(hat);

changeSweaterColor('red');
console.log(sweater);


// --------------- COUNTER

const counter = {
    value: 0,
    increment(value) {
        console.log('increment -> this', this);
        this.value += value;
    },
    decrement(value) {
        console.log('decrement -> this', this);
        this.value -= value;
    },
};

const updateCounter = function (value, operation) {
    operation(value);
};

updateCounter(10, counter.increment.bind(counter));  //this - counter
updateCounter(5, counter.decrement.bind(counter));   //this - counter

console.log(counter);