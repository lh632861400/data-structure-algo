import {describe, expect, test} from '@jest/globals'
import Queue from "../Queue";

describe('Queue', () => {
  test("enqueue element", () => {
    const queue = new Queue<Number>();

    queue.enqueue(11);
    queue.enqueue(22);
    queue.enqueue(33);
    queue.enqueue(44);

    let i = 1;
    while(!queue.isEmpty()) {
      expect(queue.dequeue()).toBe(i * 11)
      i++
    }

  });
});

