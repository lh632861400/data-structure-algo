
function compare(num1: number, num2: number) {

  return num1 - num2

}

function swap(array: any[], i: number, j: number) {

  const temp = array[i];

  array[i] = array[j];

  array[j] = temp

}

// 基础排序 冒泡排序 选择排序 插入排序
// 冒泡排序
// 复杂度 最好 最坏 平均
// O(n ^ 2) O(n ^ 2) O(n ^ 2)
// O(1)
// 稳定性：稳定
function bubbleSort(array: any[]) {

  const len = array.length;

  for(let i = len - 1; i > 0; i--) {

    for(let j = 0; j < i; j++) {

      if(compare(j, j + 1) > 0) {
        swap(array, j, j + 1)
      }

    }

  }

}

// 选择排序在冒泡排序的基础之上优化不要每次交换位置找到最值在交换位置
// 复杂度 最好 最坏 平均
// O(n ^ 2) O(n ^ 2) O(n ^ 2)
// O(1)
// 稳定性：不稳定
function selectionSort(array: any[]) {

  const len = array.length;

  for(let i = 0; i < len; i++) {

    let minIndex = i;

    for(let j = i + 1; j < len; j++ ) {

      if(compare(array[j], array[minIndex]) < 0) {
        minIndex = j;
      }

    }

    swap(array, i, minIndex)

  }

}

// 插入排序 就像打牌一样，每次一样牌，插入到之前已经存在牌的合适的位置 数据量较少或者相对有序效
// 复杂度 最好 最坏 平均
// O(n ^ 2) O(n ^ 2) O(n ^ 2)
// O(1)
// 稳定性：稳定
function insertSort(array: any[]) {

  const len  = array.length;

  for(let i = 1; i < len; i++) {

    const temp = array[i];

    for(let j = i - 1; j >= 0; j--) {

      const result = compare(temp, array[j]);

      if(result < 0) {
        swap(array, j , j + 1)
      }else if(result > 0) {
        break;
      }

    }

  }

}

// 希尔排序 在插入排序之上优化
// 复杂度 最好 最坏 平均
// O(n ^ 2) O(n ^ 2) O(n ^ 2)
// O(1)
// 稳定性：稳定
function shellStepSquence(count: number) {

  const steps = [1];

  let step = 1;

  while(true) {
    step = step << 1;

    if(step > count) break;

    steps.push(step);
  }

  steps.reverse();

  return steps;

}

function shellSort(array: any[]) {

  const len = array.length;

  const n = 32;

  const steps = shellStepSquence(n)

  // 进行k-1次插入排序
  for(let k = n; k >= 1; k--) {

    // 待排序的元素
    for(let i = steps[k]; i < len; i++) {

      const temp = array[i]

      // 之前已经排好序的元素的索引
      let j = i - steps[k]
      for(; j >= 0 && temp < array[j]; j = j - steps[k]) {

        swap(array, j, j + 1)

      }

      array[j + steps[k]] = temp

    }

  }

}

// 堆排序 按照大顶堆
// 数组元素下标从0开始
function siftDown(array: number[],n: number, root: number) {

  while(2 * root + 1 < n) {

    let left = 2 * root + 1;

    let maxChild = compare(array[root], array[left]) < 0 ? left : root;

    const right = 2 * root + 2

    if(right < n) {

      maxChild = compare(array[maxChild], array[right]) < 0 ? right : maxChild;

    }

    if(maxChild === root) {
      break
    }

    swap(array, root, maxChild)

  }

}

function buildTree(array: number[], n: number) {

  let root = Math.ceil(n / 2)

  for(; root >= 0; root--) {
    siftDown(array, n, root)
  }

}


function heapSort(array: any[]) {

  buildTree(array, array.length)

  for(let i = array.length - 1; i >= 0; i--) {

    if(compare(array[0], array[i]) > 0) {

      swap(array, 0, i)

      siftDown(array, i, 0)

    }

  }

}

// 快速排序 分支思想排序时利用空位来将元素交换位置
function quickSort(array: number[]) {

  const len = array.length

  quikSortCore(array, 0, len - 1)

}

/**
 *
 *
 * 对array数组left 到right之间进行快排
 *
 * */
function quikSortCore(array: number[], left: number, right: number) {

  if(left >= right) {
    return
  }

  // 设置轴点
  const mid = left + ((right - left) >> 1);

  if(compare(array[left], array[mid]) > 0) {
    swap(array, left, mid)
  }

  if(compare(array[left], array[right]) > 0) {
    swap(array, left, right)
  }

  if(compare(array[mid], array[right]) > 0) {
    swap(array, mid, right)
  }

  if(right - left + 1 <= 3) {
    return
  }

  const temp = array[mid]

  // 由于前面已经对三个数只要下一个数
  let low = left + 1;
  let high = right - 1;

  // 设置空格
  array[mid] = array[left + 1]

  while(low < high) {

    while(compare(temp, array[high]) < 0) {
      high--;
    }

    // 有空格的地方设置value这时哟空格的地方就是high
    array[low] = array[high]

    while(low < high && compare(array[low], temp) < 0) {
      low++
    }

    array[high] = array[low]
  }

  array[low] = temp

  quikSortCore(array, left, low - 1)
  quikSortCore(array, low + 1, right)

}

function mergeSort() {

}

