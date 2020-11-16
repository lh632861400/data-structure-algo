import {describe, expect, test} from '@jest/globals'
import BinarySearchTree from "../BinarySearchTree";

describe('BinarySearchTree', () => {

  test('size equal 5', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6

    // 9 5 11 4 6
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6 ]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    expect(bst.size()).toBe(5)

  })

  test('isEmpty()', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6

    // 9 5 11 4 6
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6 ]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    expect(bst.isEmpty()).toBe(false)

  })

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

    console.log("toString", bst.toString())

  })

  test('comparator', () => {

    class Person {
      age: number;
      constructor(age: number) {
        this.age = age;
      }

      toString() {
        return this.age + '';
      }
    }

    const bst = new BinarySearchTree<Person>({
      compare(e1: Person, e2: Person): number {
        return e1.age - e2.age;
      }
    });

    //             9
    //           5      11
    //          4  6  10  14

    // 9 5 11 4 6 8 14
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6, 10, 14]
    for(let i = 0; i < data.length; i++) {
      bst.add(new Person(data[i]))
    }

    console.log(bst.toString())

    const bst2 = new BinarySearchTree<Person>({
      compare(e1: Person, e2: Person): number {
        return e2.age - e1.age;
      }
    });


    //             9
    //           11     5
    //          14 10 6   4

    // 9 5 11 4 6 8 14
    for(let i = 0; i < data.length; i++) {
      bst2.add(new Person(data[i]))
    }

    console.log(bst2.toString())

  })

  test('no comparator', () => {

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

  test('preorder', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6  10  14

    //  9 5 4 6 11 10 14
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6, 10, 14]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    let count = 0;
    let result = [9, 5, 4, 6, 11, 10, 14]
    bst.preorder({
      stop: false,
      visit(element: number): void {
        expect(element).toBe(result[count]);
        count++;
      }
    })

  })

  test('inorder', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6  10  14

    //  4 5 6 9 10 11 14
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6, 10, 14]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    let count = 0;
    let result = [4, 5, 6, 9, 10, 11, 14]
    bst.inorder({
      stop: false,
      visit(element: number): void {
        expect(element).toBe(result[count]);
        count++;
      }
    })

  })

  test('postorder', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6  10  14

    //  4 6 5 10 14 11 9
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6, 10, 14]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    let count = 0;
    let result = [4, 6, 5, 10, 14, 11, 9]
    bst.postorder({
      stop: false,
      visit(element: number): void {
        expect(element).toBe(result[count]);
        count++;
      }
    })

  })

  test('levelOrder', () => {

    const bst = new BinarySearchTree<number>();

    //             9
    //           5      11
    //          4  6  10  14

    //  9 5 11 4 6 8 14
    // 采用层序遍历的方式添加元素
    const data = [9, 5, 11, 4, 6, 10, 14]
    for(let i = 0; i < data.length; i++) {
      bst.add(data[i])
    }

    let count = 0;
    let result = [9, 5, 11, 4, 6, 10, 14]
    bst.levelOrder({
      stop: false,
      visit(element: number): void {
        console.log(element)
        expect(element).toBe(result[count]);
        count++;
      }
    })

  })
});
