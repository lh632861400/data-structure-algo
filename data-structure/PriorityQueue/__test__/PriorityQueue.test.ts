import {describe, expect, test} from '@jest/globals'
import PriorityQueue from "../PriorityQueue";

describe('PriorityQueue', () => {

  test('size equal 5', () => {

    const heap = new PriorityQueue<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    heap.enqueue(15);
    heap.enqueue(11);
    heap.enqueue(30);
    heap.enqueue(20);
    heap.enqueue(23);
    heap.enqueue(25);
    heap.enqueue(8);
    heap.enqueue(2);

    expect(heap.size()).toBe(8);
  })

  test('isEmpty', () => {

    const heap = new PriorityQueue<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    expect(heap.isEmpty()).toBe(true);

    heap.enqueue(15);
    heap.enqueue(11);
    heap.enqueue(30);
    heap.enqueue(20);
    heap.enqueue(23);
    heap.enqueue(25);
    heap.enqueue(8);
    heap.enqueue(2);

    expect(heap.size()).toBe(8);
    expect(heap.isEmpty()).toBe(false);
  })

  test('clear', () => {

    const heap = new PriorityQueue<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    heap.enqueue(15);
    heap.enqueue(11);
    heap.enqueue(30);
    heap.enqueue(20);
    heap.enqueue(23);
    heap.enqueue(25);
    heap.enqueue(8);
    heap.enqueue(2);

    expect(heap.size()).toBe(8);
    expect(heap.isEmpty()).toBe(false);

    heap.clear();

    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);
  })

  test('front', () => {

    const heap = new PriorityQueue<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    heap.enqueue(15);
    heap.enqueue(11);
    heap.enqueue(30);
    heap.enqueue(20);
    heap.enqueue(23);
    heap.enqueue(25);
    heap.enqueue(8);
    heap.enqueue(2);

    expect(heap.front()).toBe(30);

  })

  test('dequeue', () => {

    const heap = new PriorityQueue<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    heap.enqueue(15);
    heap.enqueue(11);
    heap.enqueue(30);
    heap.enqueue(20);
    heap.enqueue(23);
    heap.enqueue(25);
    heap.enqueue(8);
    heap.enqueue(2);

    expect(heap.front()).toBe(30);
    expect(heap.dequeue()).toBe(30);
    expect(heap.front()).toBe(25);

  })

});

