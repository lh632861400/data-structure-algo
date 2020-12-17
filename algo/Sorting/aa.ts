import Integer from "./Tools";
import InsertionSort1 from "./InsertionSort1";
import InsertionSort2 from "./InsertionSort2";
import InsertionSort3 from "./InsertionSort3";
import Sort from "./Sort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";

const array1 = Integer.random(1, 10000, 2000);

function test(array: number[]) {

  const array1 = Integer.copy(array);
  const array2 = Integer.copy(array);
  const array3 = Integer.copy(array);
  const array4 = Integer.copy(array);
  const array5 = Integer.copy(array);
  const insertionSort1 = new InsertionSort1();
  const insertionSort2 = new InsertionSort2();
  const insertionSort3 = new InsertionSort3();
  const mergeSort = new MergeSort();
  const quickSort = new QuickSort();

  insertionSort1.sort(array1);
  insertionSort2.sort(array2);
  insertionSort3.sort(array3);
  mergeSort.sort(array4);
  quickSort.sort(array5);

  console.log(insertionSort1.toString('InsertionSort1'))
  console.log(insertionSort2.toString('InsertionSort2'))
  console.log(insertionSort3.toString('InsertionSort3'))
  console.log(mergeSort.toString('MergeSort'))
  console.log(quickSort.toString('QuickSort'))

}
