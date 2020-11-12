import {describe, expect, test} from '@jest/globals'
import Deque from "../Deque";

describe('Deque', () => {
  test('enqueueFront dequeueFront', () => {

    const deque = new Deque<number>()

    // 尾 0 1 2 3 4 5 6 7 8 9 头
    for(let i = 0; i < 10; i++) {
      deque.enqueueFront(i);
    }

    let i = 0;
    while(!deque.isEmpty()) {
      expect(deque.dequeueFront()).toBe(i);
      i++
    }

  })

  test('enqueueRear dequeueRear', () => {

    const deque = new Deque<number>()

    // 尾 9 8 7 6 5 4 3 2 1 头
    for(let i = 0; i < 10; i++) {
      deque.enqueueRear(i);
    }

    let i = 9;
    while(!deque.isEmpty()) {
      expect(deque.dequeueRear()).toBe(i);
      i--
    }

  })

  test('throw error when deque is empty', () => {

    const deque = new Deque<number>()

    expect(() => {
      deque.dequeueRear()
    }).toThrow(Error)

  })

  test('front element is 11', () => {

    const deque = new Deque<number>()

    // 尾 44 33 22 11 头
    deque.enqueueRear(11);
    deque.enqueueRear(22);
    deque.enqueueRear(33);
    deque.enqueueRear(44);

    expect(deque.front()).toBe(11)

  })

  test('rear element is 44', () => {

    const deque = new Deque<number>()

    // 尾 44 33 22 11 头
    deque.enqueueRear(11);
    deque.enqueueRear(22);
    deque.enqueueRear(33);
    deque.enqueueRear(44);

    expect(deque.front()).toBe(11)

  })
});
