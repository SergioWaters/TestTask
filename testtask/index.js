/**
 * Условие задачи:

На сайте UniPage есть подборка интересных языковых курсов. У каждого курса есть цена, которая является диапазоном.
Например:

от 100 до 200 рублей;
от 500 рублей;
до 400 рублей.
Пользователю сайта нужно найти подходящие ему курсы. Для этого есть фильтр, где пользователь может задать подходящий ему диапазон цен.

Требование:

Опишите, как можно отфильтровать список курсов, чтобы выдались только подходящие по цене? Реализуйте на JavaScript (или TypeScript) функцию, проводящую такую фильтрацию.

Входные данные:

    // Список курсов
    let courses = [
        { name: "Courses in England", prices: [0, 100] }, 
        { name: "Courses in Germany", prices: [500, null] }, 
        { name: "Courses in Italy", prices: [100, 200] }, 
        { name: "Courses in Russia", prices: [null, 400] },
        { name: "Courses in China", prices: [50, 250] },
        { name: "Courses in USA", prices: [200, null] },
        { name: "Courses in Kazakhstan", prices: [56, 324] },
        { name: "Courses in France", prices: [null, null] },
    ];

    // Варианты цен (фильтры), которые ищет пользователь
    let requiredRange1 = [null, 200];
    let requiredRange2 = [100, 350];
    let requiredRange3 = [200, null];
Вывод:

   // [подходящие курсы для каждого варианта фильтра]
Дополнительно, вы также можете реализовать алгоритм сортировки курсов по цене.
 */

'use strict'
let courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

/**
 * Функция принимает массив объектов и ключ для сортировки в виде строки.
 * С помощью spread-оператора создаем новый массив на основе исходного. 
 * Это нужно для того, чтобы не мутировать исходный массив методом Array.sort.
 * Далее внутри метода sort, создаем callback функцию, которая последовательно сравнивает
 * элементы внутри массива, и сортирует их, в зависимости от условия.
 * 
 * 
 * This function takes an Array and a key to sort by 
 * @param {*Array} array should be an Array of Objects
 * @param {*String} key should be a key of Object to sort by
 * @returns source Array sorted ascending
 */
const getSortedArray = function (array, key) {
  return [...array].sort((a, b) => a[key][0] > b[key][0] ? 1 : -1);
}

/**
 * Для того, чтобы понять пересекаются ли диапазоны чисел, нужно сравнить начальное и конечное значения каждого из диапазонов.
 * Создадим функцию-обертку, которая принимает исходный массив объектов и массив из двух чисел.
 * Для удобства и наглядности, объявим переменные начала и конца искомого диапазона и присвоим им соответствующие значения (rangeMin и rangeMax). Либо -Infinity и +Infinity соответственно.
 * Так как это значения остаются неизменными на протяжении всего цикла, объявим их на высоком уровне.
 * Затем создадим переменную resultArr, в которую запишем результат метода Array.filter.
 * Для удобства внутри цикла, на каждой итерации, будут создаваться две переменные со значениями начала и конца диапазона цен из объектов массива. Либо -Infinity и +Infinity соответственно.
 * Далее идут блоки условий: 
 * 1. Если начало или конец диапазона цен в объекте заданы как null, подразумеваем, что таких курсов нет. Возвращаем false.
 * 2. Если начало или конец искомого диапазона цен заданы как null, подразумеваем, что надо поисковый запрос пуст и надо выдать все курсы. Возвращаем true.
 * 3. Проверяем, пересекаются ли диапазоны, если да - возвращаем true. 
 * Используем ранее созданную функцию getSortedArray, чтобы отсортировать полученный
 * массив по первому значению диапазона цен в ключе prices.
 *
 *
 * This function takes two Arrays to create a new filtered-by-price one 
 * @param {*Array} coursesArr should be an Array of Objects containing key "price"
 * @param {*Array} requiredRangeArr should be an Array of two Numbers - prices range
 * @returns new Array filtered by price match 
 */
const getMatchCourses = (coursesArr, requiredRangeArr) => {
  const rangeMin = requiredRangeArr[0] || -Infinity;
  const rangeMax = requiredRangeArr[1] || Infinity;

  let resultArr = coursesArr.filter((course) => {
    const priceMin = course.prices[0] || -Infinity;
    const priceMax = course.prices[1] || Infinity;

    if (priceMin === -Infinity && priceMax === Infinity) return
    if (rangeMin === -Infinity && rangeMax === Infinity) return true
    if (rangeMin < priceMax && rangeMax > priceMin) return true
    return
  })
  return getSortedArray(resultArr, 'prices')
}

console.log(getMatchCourses(courses, requiredRange1));
console.log(getMatchCourses(courses, requiredRange2));
console.log(getMatchCourses(courses, requiredRange3));
console.log(getMatchCourses(courses, [401, null]));
console.log(getMatchCourses(courses, [null, 100]));