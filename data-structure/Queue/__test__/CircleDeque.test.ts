import {describe, expect, test} from '@jest/globals'
import CircleDeque from "../CircleDeque";

describe('CircleDeque', () => {
  test('enqueueFront', () => {
    const circledeque = new CircleDeque<number>()

    // 9 8 7 6 5 4 3 2 1 0
    for(let i = 0; i < 10; i++) {
      circledeque.enqueueFront(i)
    }

    for(let i = 0; i < 5; i++) {
      circledeque.dequeueFront()
    }

    circledeque.enqueueFront(11)
    circledeque.enqueueFront(22)
    circledeque.enqueueFront(33)
    circledeque.enqueueFront(44)

    for(let i = 1; i < 5; i++) {
      expect(circledeque.dequeueFront()).toBe((5 - i) * 11);
    }
  })

  test('enqueueRear', () => {
    const circledeque = new CircleDeque<number>()

    // 0 1 2 3 4 5 6 7 8 9
    for(let i = 0; i < 10; i++) {
      circledeque.enqueueRear(i)
    }

    for(let i = 0; i < 5; i++) {
      circledeque.dequeueFront()
    }

    circledeque.enqueueFront(11)
    circledeque.enqueueFront(22)
    circledeque.enqueueFront(33)
    circledeque.enqueueFront(44)

    for(let i = 0; i < 5; i++) {
      expect(circledeque.dequeueRear()).toBe(9 - i);
    }
  })

  test('peekFront', () => {
    const circledeque = new CircleDeque<number>()

    // 0 1 2 3 4 5 6 7 8 9
    for(let i = 0; i < 10; i++) {
      circledeque.enqueueRear(i)
    }

    for(let i = 0; i < 5; i++) {
      circledeque.dequeueFront()
    }

    circledeque.enqueueFront(11)
    circledeque.enqueueFront(22)
    circledeque.enqueueFront(33)
    circledeque.enqueueFront(44)

    expect(circledeque.peekFront()).toBe(44)
  })

  test('peekRear', () => {
    const circledeque = new CircleDeque<number>()

    // 0 1 2 3 4 5 6 7 8 9
    for(let i = 0; i < 10; i++) {
      circledeque.enqueueRear(i)
    }

    for(let i = 0; i < 5; i++) {
      circledeque.dequeueFront()
    }

    circledeque.enqueueFront(11)
    circledeque.enqueueFront(22)
    circledeque.enqueueFront(33)
    circledeque.enqueueFront(44)

    expect(circledeque.peekRear()).toBe(9)
  })

  test('clear', () => {
    const circledeque = new CircleDeque<number>()

    // 0 1 2 3 4 5 6 7 8 9
    for(let i = 0; i < 10; i++) {
      circledeque.enqueueRear(i)
    }

    for(let i = 0; i < 5; i++) {
      circledeque.dequeueFront()
    }

    circledeque.enqueueFront(11)
    circledeque.enqueueFront(22)
    circledeque.enqueueFront(33)
    circledeque.enqueueFront(44)


    expect(circledeque.isEmpty()).toBe(false)

    circledeque.clear();

    expect(circledeque.isEmpty()).toBe(true)
  })
})
