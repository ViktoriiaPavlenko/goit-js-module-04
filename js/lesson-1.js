// -------- High-order function

function highOrder(value, callback) {
    console.log(`Hello, I am high Order function`)
  callback(value)
}
highOrder(`Hello, I am callback`, setMessage)

// Callback function
function setMessage(message) {
  console.log(message)
}

// setMessage(`Hello, I am callback`)



// -------- EXAMPLE 1 
function toDoMeal(prods, callback) {
//   console.log(prods)
  let result = callback(prods)
  console.log(result)
//   console.log(`Your dish -`)
}
toDoMeal(['bread', 'meat'], toDoSandwich)
toDoMeal(['banana', 'orange'], toDoSandwich)
// Callback
function toDoSandwich(arr) {
//   console.log(arr)
  let bread = arr.includes('bread')
//   console.log(bread)
  return bread ? 'sandwich is done!' : `no bread`
}



// ------- EXAMPLE 2 
const results = [{ mail: '', scores: 10 }]
function getResultsByTests(getMax, getMin, mail, ...scores) {
  // console.log(mail)
  // console.log(scores)
  // 1 добавляем в базу данные о тесте
  let total = 0
  for (let i of scores) {
    total += i
  }
  // console.log(total)
  const obj = { mail, scores: total }
  results.push(obj)
  // console.log(results)
  // 2 теперь проверяем обновленные с помощью колбеков
  const scoresArr = []
  for (let obj of results) {
    // console.log(obj.scores)
    scoresArr.push(obj.scores)
  }
  // console.log(scoresArr)
  let max = getMax(scoresArr)
  let min = getMin(scoresArr)
  console.log('max:', max, 'min:', min)
}
getResultsByTests(
  getMaxValue,
  getMinValue,
    'a@gmail.com', 1, 1, 1, 1, 1, 1, 1, 1, 1,
)

getResultsByTests(
  getMaxValue,
  getMinValue,
    'a@gmail.com', 1, 1, 0, 1, 1, 0, 1, 1, 1,
)

// Callbacks
function getMaxValue(arr) {
  return Math.max(...arr)
}
function getMinValue(arr) {
  return Math.min(...arr)
}


// ------- Последовательность Фибоначчи

const getF = (count, callback) => {
  // local variable
  let firstNum = 0
  let secondNum = 1
  const arrWithValues = [firstNum, secondNum]
  // хочу получить массив с числами такой последовательности
  console.log(arrWithValues)
  for (let i = 3; i <= count; i++) {
    let newNumber = firstNum + secondNum
    arrWithValues.push(newNumber)
    console.log('newNumber', newNumber)
    firstNum = secondNum
    secondNum = newNumber
  }
  console.log(arrWithValues)

  let result = callback(arrWithValues)
  return result
}
console.log('Только четные', getF(18, getEvenValue))
console.log('Сумма всех', getF(7, getSum))

// Callback
function getEvenValue(arr) {
  const arrValues = []
  for (let num of arr) {
    if (num % 2 === 0) {
      arrValues.push(num)
    }
  }
  return arrValues
}
function getSum(arr) {
  let total = 0
  for (let i of arr) {
    total += i
  }
  return total
}


// ------- Call Stack (стек вызовов)
// LIFO - last in first out


// ------- Замыкание (closure)

// CLOSURE - способность функции использовать переменные из области,
// где она была объявлена


function changeColor() {
  let color = 'green'

  function getNewColor(value) {
    console.log(color)

    return (color = value)
  }
  function resetColor() {
    return (color = 'green')
  }
  return { getNewColor, resetColor }
}

const x = changeColor()
// let color = x('red')
// console.log(color)
let color = x.getNewColor('black')
color = x.getNewColor('blue')

color = x.resetColor()
// console.log(color)