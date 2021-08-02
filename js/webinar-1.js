// --------- Функция обратного вызова (callback)
// - Функция может принимать другие функции как параметры
// - Функция которая передаётся другой функции как аргумент называется
// «функцией обратного (отложенного) вызова» (callback-функция)
// - Функция которая принимает другую функцию как параметр
// или возвращает функцию как результат своей работы называется 
// «функцией высшего порядка»
 
// const fnA = function (message, callback) {   //функция высшего порядка
    // console.log(message);

    // console.log(callback);
    // callback(100);
// };

// const fnB = function (number) {    //callback-функция
    // console.log('Это лог при вызове fnB', number);
// }

// fnA('Hello', fnB)


// ------- функция doMath(a, b, callback)
const doMath = function (a, b, callback) {
    const result = callback(a, b)

    // console.log(result);
}

// const add = function (x, y) {
//     return x + y;
// }

// const sub = function (x, y) {
//     return x - y;
// }

// doMath(2, 3, add)
// doMath(6, 3, sub)


// то же самое  - inline функция
doMath(2, 3, function (x, y) {      //function (x, y) {return x + y;}  это литерал функции
    return x + y;
});

doMath(6, 3, function (x, y) {
    return x - y;
});


// -------- Отложенный вызов: регистрация событий

const buttonRef = document.querySelector('.js-button');

const handleBtnClick = function () {
    console.log('Клик по кнопке');
}

buttonRef.addEventListener('click', handleBtnClick)


// ------- Отложенный вызов: геолокация

const onGetPositionSuccess = function (position) {
    // console.log('Это вызов onGetPositionSuccess');
    // console.log(position);
};

const onGetPositionError = function (error) {
    console.log('Это вызов onGetPositionError');
    console.log(error);
};

window.navigator.geolocation.getCurrentPosition(
    onGetPositionSuccess,
    onGetPositionError,
);

// -------- Отложенный вызов: интервалы

const callback = function () {
    // console.log('Через 2 секунды внутри колбека в таймауте');
};

// console.log('В коде перед таймаутом');
// setTimeout(callback, 2000);
// console.log('В коде после таймаута');


// ------- Отложенный вызов: http-запрос
// - API URL: https://pokeapi.co/api/v2/pokemon

const onRequestSuccess = function (response) {
    console.log(
        'Вызов функции onRequestSuccess после успешного ответа бекенда',
    );
    console.log(response);
};

// fetch('https://pokeapi.co/api/v2/pokemon')
//     .then(res => res.json())
//     .then(onRequestSuccess);


// ------- Фильтр

const filter = function (array, test) {
    const filteredArray = [];

    for (const el of array) {
        console.log(el);
        const passed = test(el);

        if (passed) {
            filteredArray.push(el);
        }
    }

    return filteredArray;
};

// 1. надо передать функцию
// 2. функция получает элемент массива
// 3. если элемент массива удовлетворяет условию то функция вернет true
// 3. если элемент массива НЕ удовлетворяет условию то функция вернет false

// const callback1 = function (value) {
//     return value >= 3;
// };
// const r1 = filter([1, 2, 3, 4, 5], callback1);
// console.log(r1);


const callback2 = function (value) {
    return value <= 4;
};
const r2 = filter([1, 2, 3, 4, 5, 6, 7, 8], callback2);
console.log(r2);



const fruits = [
    { name: 'apples', quantity: 200, isFresh: true },
    { name: 'grapes', quantity: 150, isFresh: false },
    { name: 'bananas', quantity: 100, isFresh: true },
];

const getFruitsWithQuantity = function (fruit) {
    return fruit.quantity >= 120;
};

const r3 = filter(fruits, getFruitsWithQuantity);
console.log(r3);



// ------- CLOSURE
// --------- Функция результатом своей работы может возвращать другую функцию.

// Возвращаемая функция во время вызова будет иметь доступ
// ко всем локальным переменным(области видимости)
// родительской функции(той из которой её вернули),
// это называется ------«ЗАМЫКАНИЕ»-----


const fnA = function (parameter) {
    const innerVariable = 'значение внутренней переменной функции fnA';

    const innerFunction = function () {
        console.log(parameter);
        console.log(innerVariable);
        console.log('Это вызов innerFunction');
    };

    return innerFunction;
};

// const fnB = fnA(555);

// fnB()

// console.log(fnB);


// ------- Поварёнок

// const makeDish = function (sheffName, dish) {
//     console.log(`${sheffName} готовит ${dish}`);
// };

// makeDish('Mango', 'пирожок');
// makeDish('Mango', 'омлет');
// makeDish('Mango', 'чай');

// makeDish('Poly', 'котлеты');
// makeDish('Poly', 'супик');
// makeDish('Poly', 'кофе');

const makeSheff = function (name) {
    const makeDish = function (dish) {
        console.log(`${name} готовит ${dish}`);
    }
    return makeDish
}

const mango = makeSheff('Mango')

console.dir(mango);

mango('котлеты')
mango('пирожок')

const poly = makeSheff('Poly')

console.dir(poly);

poly('супик')
poly('омлет')


// ------- Округлятор

// const floatingPoint = 3.456789;
// const someInt = Math.round(floatingPoint); // 3
// const withDecimals = Number(floatingPoint.toFixed(2)); // 3.46

// const rounder = function  (number, places) {
//     return Number(number.toFixed(places));
// };

// console.log(rounder(3.567, 2));
// console.log(rounder(1.597, 1));

const rounder = function (places) {
    return function (number) {
       return Number(number.toFixed(places)); 
    }
}

const rounder2 = rounder(2);
const rounder3 = rounder(1);

console.dir(rounder2);
console.dir(rounder3);

console.log(rounder2(3.567));
console.log(rounder3(1.597));



// ------- Приватные данные и функции - 
// скрытие реализации, интерфейс



// const myLib = {
//     value123: 0,
//     add(num) {
//         this.value123 += num;
//     },
//     getValue() {
//         return this.value123;
//     },
// }

// myLib.add(5)

// console.log(myLib.getValue());

// console.log(myLib.value123);



// 
// const myLibFactory = function () {
//     let value = 0;

//     const add = function (num) {
//         value += num;
//     }

//     return {
//         add: add,
//         getValue() {
//             return value
//         }
//     }
// }

// const myLib = myLibFactory();
// console.dir(myLib.getValue);
// console.log(myLib);

// console.log(myLib.getValue());
// myLib.add(10)
// console.log(myLib.getValue());



// 


const salaryManagerFactory = function (employeeName, baseSalary = 0) {
    let salary = baseSalary;

    return {
        raise(amount) {
            salary += amount
        },
        lower(amount) {
            salary -= amount
        },
        current() {
            return `Текущая зарпалата ${employeeName} - ${salary}`;
        },
    };
};

const salaryManager = salaryManagerFactory("Mango", 5000)
console.log(salaryManager.current());


// --------- Стрелочные функции

// // 
// const add = function (a, b, c) {
//     return a + b + c
// }

// // 
// const addArrow = (a, b, c) => {    // если параметр один, можно без скобок   
//     return a + b + c
// }

// // 
// const addArrow = (a, b, c) => a + b + c  // неявный возврат

// console.log(add(5, 10, 15));
// console.log(addArrow(5, 10, 15));


// // 
// const fnA = function () {
//     return {
//         a: 5
//     }
// }

// console.log(fnA());

// // 
// const arrowFnA = () => ({ arrowA: 5 })  //та же функция

// console.log(arrowFnA());


//
const r1 = filter([1, 2, 3, 4, 5], value => value >= 3);
console.log(r1);


const fruits1 = [
    { name: 'apples', quantity: 200, isFresh: true },
    { name: 'grapes', quantity: 150, isFresh: false },
    { name: 'bananas', quantity: 100, isFresh: true },
];
const r4 = filter(fruits1, fruit => fruit.quantity >= 120);
console.log(r4);