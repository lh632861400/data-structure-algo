import {describe, expect, test} from '@jest/globals'
import RBTree from "../RBTree";

describe('RBTree', () => {

  test('size equal 5', () => {

    const rbt = new RBTree<number>();

    //               8
    //     R_6            R_11
    //   5   7         9       13
    // R_3                        R_16


    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6, 3, 11, 13, 16]
    for(let i = 0; i < data.length; i++) {
      rbt.add(data[i])
    }

    expect(rbt.size()).toBe(data.length)

  })

  test('toString', () => {

    const rbt = new RBTree<number>();

    //               8
    //     R_6            R_11
    //   5   7         9       13
    // R_3                        R_16

    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6, 3, 11, 13, 16]
    for(let i = 0; i < data.length; i++) {
      rbt.add(data[i])
    }

    console.log(rbt.toString())

  })

})
