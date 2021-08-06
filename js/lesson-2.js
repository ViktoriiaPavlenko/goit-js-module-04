// ------- this - local variable

// arrow this ссылается на контекст объекта, в котором
// эта функция была объявлена

const newUser = {
  name: 'Vova',
  age: 22,
}

const bestUser = {
  name: 'Sara',
  age: 18,
}

function toSayHello(manager, group) {
  console.log(
    `${this.name}, we are glad to see you! I am ${manager}, 
    your manager. Your group is ${group}`,
  )
}
let manager = 'Petro'
let group = 37
toSayHello.call(bestUser, manager, group)

const data = [manager, group]
toSayHello.apply(newUser, data)


// ------ bind
const product = {
  name: 'Banana',
  price: 25,
  changePrice(value) {
    return (this.price = value)
  },
}
const fruit1 = {
  name: 'Ananas',
  price: 50,
}

function showProduct(product, callback) {
  let price = callback()
  console.log(price)
  console.log(`${product} cost ${price} now`)
}
// showProduct('fruit', product.changePrice.bind(product, 20))
// showProduct('fruit1', product.changePrice.bind(fruit1, 99))


// 1) Написати метод every який приймає масив і ф-ю
// callback (в якій ми будемо робити різні перевірки) Цей метод
// повертає true якщо кожен елемент масиву пройшов перевірку з
// callback. Якщо хоча б один елемент не проходить перевірку то
// повертає false, callback приймає елемент масиву
// every([1,2,3,4,5], callback) // true (перевіряємо чи елементи < 10)
// every([2,45,67,34], callback) // false (перевіряємо чи елементи > 10)
// 
// 2) Написати метод some який приймає масив і ф-ю
// callback. Цей метод поверне true якщо хоча б один елемент масиву
// пройже перевірку з callback callback приймає елемент масиву
// some([1,2,3,23,5], callback) // true (перевіряємо чи елементи > 10)
// some([12,45,67,34], callback) // false (перевіряємо чи елементи < 10)

function every(array, callback) {
  const results = []
  for (let elem of array) {
    let condition = callback(elem)
    // console.log(condition)
    results.push(condition)
  }
  console.log(results)
  // if (results.includes(false)) {
  //   return false
  // } else {
  //   return true
  // }
  return results.includes(false) ? false : true
}
let result = every([1, 11, 111, 2, 22, 33], getLessThenTen)
console.log(result)

result = every([1, 2, 3, 4, 5], getLessThenTen)
console.log(result)

function getLessThenTen(number) {
  // if (number < 10) {
  //   return true
  // } else {
  //   return false
  // }
  return number < 10 ? true : false
}
function getMoreThenTen(number) {
  return number > 10 ? true : false
}
result = every([1, 2, 3, 23, 5], getMoreThenTen)
console.log(result)

result = every([11, 21, 31, 23, 51], getMoreThenTen)
console.log(result)


// 3) 
// Створити метод compact який приймає масив і
// вертає новий де відсутні будь-які значення що при переведені в
//  bool дають false
// compact([1,0,'', null, 'Hello']) // [1,'Hello'] 


function compact(array, callback) {
  const newArray = []
  for (let value of array) {
    console.log(Boolean(value))
    // if (Boolean(value)) newArray.push(value)
    callback(value, newArray)
  }
  return newArray
}

function getFalsyValues(element, falsyValues) {
  if (!Boolean(element)) falsyValues.push(element)
}
function getNotFalsyValues(element, notFalsyValues) {
  if (Boolean(element)) notFalsyValues.push(element)
}

// console.log(compact([1, 0, '', null, 'Hello']))
// console.log(compact([Infinity, ' ', {}, []]))
console.log(compact([1, 0, '', null, 'Hello'], getFalsyValues))
console.log(compact([Infinity, ' ', {}, []], getNotFalsyValues))


// 4) Написати ф-ю showDeliveryStatus яка приймає
// масив і виводить на екран інформацію про доставку товара всіх типів.
// Якщо прогрес доставки 100 показувати строку "Done"
// Якщо прогрес доставки < 100 показувати строку "In progress"
// Якщо прогрес доставки null показувати строку "Ready for delivery"
// showDeliveryStatus(ordersA) // "In Progress", "Done", "Ready for delivery"
// showDeliveryStatus(ordersB) // "In progress", "Ready for delivery"


const ordersA = [
    { name: 'Phone', price: 12300, deliveryProgress: 50, type: 0 },
    { name: 'Computer', price: 230000, deliveryProgress: 100, type: 1 },
    { name: 'Tablet', price: 5000, deliveryProgress: null, type: 2 },
]
const ordersB = [
    { name: 'Phone', price: 12300, deliveryProgress: 50, type: 0 },
    { name: 'Tablet', price: 5000, deliveryProgress: null, type: 2 },
]


function showDeliveryStatus(array) {
  let message
  let progress
  const results = []
  for (let order of array) {
    // console.log(order)
    // let { deliveryProgress: progress } = order
    progress = String(order.deliveryProgress)
    console.log(progress)
    if (progress == 100) {
      message = `Done`
      results.push(message)
    } else if (progress < 100 && progress >= 1) {
      message = `In progress`
      results.push(message)
    } else if (progress === 'null') {
      message = `Ready to delivery`
      results.push(message)
    } else {
      message = 'Not Ordered'
      results.push(message)
    }
    // =========
    // switch (progress) {
    //   case "100":
    //     message = `Done`
    //     results.push(message)
    //     break
    //   case progress < 100 ? progress : null:
    //     message = `In progress`
    //     results.push(message)
    //     break
    //   case 'null':
    //     message = `Ready to delivery`
    //     results.push(message)
    //     break
    //   default:
    //     message = 'Not Ordered'
    //     results.push(message)
    // }
  }
  return results.join(', ')
}
console.log(showDeliveryStatus(ordersA))
console.log(showDeliveryStatus(ordersB))