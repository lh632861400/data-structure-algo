import {describe, expect, test} from '@jest/globals'
import AVLTree from "../AVLTree";

describe('AVLTree', () => {

  test('size equal 5', () => {

    const avl = new AVLTree<number>();

    //            6
    //         5       11
    //       3       8    13
    //             7   9    16


    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6, 3, 11, 13, 16]
    for(let i = 0; i < data.length; i++) {
      avl.add(data[i])
    }

    expect(avl.size()).toBe(data.length)

  })

  test('toString', () => {

    const avl = new AVLTree<number>();

    //            6
    //         5       11
    //       3       8    13
    //             7   9    16


    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6, 3, 11, 13, 16]
    for(let i = 0; i < data.length; i++) {
      avl.add(data[i])
    }

    console.log(avl.toString())

  })

  test('add', () => {

    const avl = new AVLTree<number>();

    //            6
    //         5       11
    //       3       8    13
    //             7   9    16


    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6]
    for(let i = 0; i < data.length; i++) {
      avl.add(data[i])
    }

    expect(avl.height()).toBe(3)

    avl.add(3)

    expect(avl.height()).toBe(3)

    avl.add(11)

    expect(avl.height()).toBe(4)

    avl.add(13)

    expect(avl.height()).toBe(4)

    avl.add(16)

    expect(avl.height()).toBe(4)

  })

  test('remove', () => {

    const avl = new AVLTree<number>();

    //            6
    //         5       11
    //       3       8    13
    //             7   9    16


    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6, 3, 11, 13, 16]
    for(let i = 0; i < data.length; i++) {
      avl.add(data[i])
    }

    //            6
    //         5       11
    //       3       8    13
    //             7   9
    avl.remove(16)

    //            6
    //         5       8
    //       3      7     11
    //                   9

    // 11会失衡
    avl.remove(13)

    //            6
    //         5       9
    //       3       8    11

    avl.remove(7)
    expect(avl.height()).toBe(3)

    avl.remove(8)
    avl.remove(11)

    //            5
    //         3     6
    avl.remove(9)
    expect(avl.height()).toBe(2)

  })

  test('clear', () => {

    const avl = new AVLTree<number>();

    //            6
    //         5       11
    //       3       8    13
    //             7   9    16


    // 9 8 7 5 6 3 11 13 16
    const data = [9, 8, 7, 5, 6, 3, 11, 13, 16]
    for(let i = 0; i < data.length; i++) {
      avl.add(data[i])
    }

   avl.clear()

    expect(avl.height()).toBe(0)

  })

});
