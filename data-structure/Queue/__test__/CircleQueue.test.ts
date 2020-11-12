import {describe, expect, test} from '@jest/globals'
import CircleQueue from "../CircleQueue";

describe('CircleQueue', () => {
  test('enqueue', () => {

    const circlequeue = new CircleQueue<number>()

    // 尾 9 8 7 6 5 4 3 2 1 0头
    for(let i = 0; i< 10; i++) {
      circlequeue.enqueue(i);
    }

    // null null null null null 5 6 7 8 9
    for(let i = 0; i < 5; i++){
      circlequeue.dequeue()
    }

    // 11 22 33 44 null 5 6 7 8 9
    circlequeue.enqueue(11);
    circlequeue.enqueue(22);
    circlequeue.enqueue(33);
    circlequeue.enqueue(44);

    let i = 1;
    let j = 1;
    while(!circlequeue.isEmpty()) {
      if(i <= 5) {
        expect(circlequeue.dequeue()).toBe(i + 5 -1);
        i++;
        continue;
      }else {
        expect(circlequeue.dequeue()).toBe(j * 11);
        j++;
      }
    }

  })

  test('dequeue', () => {

    const circlequeue = new CircleQueue<number>()

    // 尾 9 8 7 6 5 4 3 2 1 0头
    for(let i = 0; i< 10; i++) {
      circlequeue.enqueue(i);
    }

    // null null null null null 5 6 7 8 9
    for(let i = 0; i < 5; i++){
      circlequeue.dequeue()
    }

    // 11 22 33 44 null 5 6 7 8 9
    circlequeue.enqueue(11);
    circlequeue.enqueue(22);
    circlequeue.enqueue(33);
    circlequeue.enqueue(44);

    let i = 1;
    let j = 1;
    while(!circlequeue.isEmpty()) {
      if(i <= 5) {
        expect(circlequeue.dequeue()).toBe(i + 5 -1);
        i++;
        continue;
      }else {
        expect(circlequeue.dequeue()).toBe(j * 11);
        j++;
      }
    }

  })

  test('clear', () => {

    const circlequeue = new CircleQueue<number>()

    // 尾 9 8 7 6 5 4 3 2 1 0头
    for(let i = 0; i< 10; i++) {
      circlequeue.enqueue(i);
    }

    // null null null null null 5 6 7 8 9
    for(let i = 0; i < 5; i++){
      circlequeue.dequeue()
    }

    // 11 22 33 44 null 5 6 7 8 9
    circlequeue.enqueue(11);
    circlequeue.enqueue(22);
    circlequeue.enqueue(33);
    circlequeue.enqueue(44);

    circlequeue.clear();

    expect(circlequeue.isEmpty()).toBe(true)

  })

  test('peekFront', () => {

    const circlequeue = new CircleQueue<number>()

    // 尾 9 8 7 6 5 4 3 2 1 0头
    for(let i = 0; i< 10; i++) {
      circlequeue.enqueue(i);
    }

    // null null null null null 5 6 7 8 9
    for(let i = 0; i < 5; i++){
      circlequeue.dequeue()
    }

    // 11 22 33 44 null 5 6 7 8 9
    circlequeue.enqueue(11);
    circlequeue.enqueue(22);
    circlequeue.enqueue(33);
    circlequeue.enqueue(44);

    expect(circlequeue.peekFront()).toBe(5)

  })
})
