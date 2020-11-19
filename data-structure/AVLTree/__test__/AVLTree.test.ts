import {describe, expect, test} from '@jest/globals'
import AVLTree from "../AVLTree";

describe('AVLTree', () => {

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

});
