import {describe, expect, test} from '@jest/globals'
import Integer from "../Tools";
import BubbleSort1 from "../BubbleSort1";

describe('BubbleSort1', () => {
  test('sort', () => {

    const array = Integer.random(1, 100, 10);
    const sort = new BubbleSort1()
    console.log(array);
    sort.sort(array)
    console.log(array)

  })
});
