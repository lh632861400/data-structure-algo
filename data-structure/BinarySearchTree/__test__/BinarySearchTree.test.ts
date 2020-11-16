import {describe, expect, test} from '@jest/globals'
import BinarySearchTree from "../BinarySearchTree";

describe('BinarySearchTree', () => {
  test('toString', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6  10  14

    // 9 5 11 4 6 8 14
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6, 10, 14]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    console.log(bst.toString())

  })
})
