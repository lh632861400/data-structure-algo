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

  test('add', () => {

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

    console.log(rbt.toString())

  })

  test('remove', () => {

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

    console.log(rbt.toString())

    for(let i = 0; i < data.length; i++) {
      rbt.remove(data[i])
      console.log(rbt.toString())
    }

    // [9]
    //               8
    //     R_6            R_13
    //   5   7         11      16
    // R_3

    // [8]
    //               7
    //      R_5           R_13
    //   3       6       11      16

    // [7]
    //               6
    //      5          R_13
    //   R_3         11      16

    // [5]
    //               6
    //      3          R_13
    //             11      16

    // [6]
    //               13
    //         3         16
    //            R_11

    // [3]
    //               13
    //         11         16

    // [11]
    //               13
    //                   R_16

    // [13]
    //                 16

    // [16]

  })

})
