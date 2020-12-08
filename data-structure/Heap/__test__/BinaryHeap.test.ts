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

  test('isEmpty', () => {

    const heap = new BinaryHeap<number>({
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    expect(heap.isEmpty()).toBe(true);

    heap.add(15);
    heap.add(11);
    heap.add(30);
    heap.add(20);
    heap.add(23);
    heap.add(25);
    heap.add(8);
    heap.add(2);

    expect(heap.size()).toBe(8);
    expect(heap.isEmpty()).toBe(false);
  })

  test('clear', () => {

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
    expect(heap.isEmpty()).toBe(false);

    heap.clear();

    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);
  })

  test('get', () => {

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

    expect(heap.get()).toBe(30);

  })

  test('remove', () => {

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

    expect(heap.get()).toBe(30);
    expect(heap.remove()).toBe(30);
    expect(heap.get()).toBe(25);

  })

  test('replace', () => {

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
    expect(heap.get()).toBe(30);
    expect(heap.replace(1)).toBe(30);
    expect(heap.get()).toBe(25);
    expect(heap.replace(30)).toBe(25);
    expect(heap.get()).toBe(30);
    expect(heap.replace(23)).toBe(30);
    expect(heap.get()).toBe(23);
  })

  test('heapify', () => {

    const heap = new BinaryHeap<number>([15, 11, 30, 20, 23, 25, 8, 2],{
      compare(e1: number, e2: number): number {
        return e1 - e2;
      }
    });

    expect(heap.size()).toBe(8);
  })

});

