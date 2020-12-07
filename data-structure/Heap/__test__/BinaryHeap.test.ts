import {describe, expect, test} from '@jest/globals'
import BinaryHeap from "../BinaryHeap";

describe('BinaryHeap', () => {

  test('size equal 5', () => {

    const heap = new BinaryHeap<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    heap.add(15);
    heap.add(11);
    heap.add(30);
    heap.add(20);
    heap.add(23);
    heap.add(25);
    heap.add(8);
    heap.add(2);

    expect(heap.size()).toBe(8);
  })

})

