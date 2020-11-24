import {describe, expect, test} from '@jest/globals'
import ListSet from "../ListSet";

describe('ListSet', () => {

  test('size equal 5', () => {

    const set = new ListSet<number>();


    set.add(10);
    set.add(11);
    set.add(12);
    set.add(4);
    set.add(5);
    set.add(11);
    set.add(12);

    expect(set.size()).toBe(5)
  })

  test('isEmpty', () => {

    const set = new ListSet<number>();

    expect(set.isEmpty()).toBe(true)


    set.add(10);
    set.add(11);
    set.add(12);
    set.add(4);
    set.add(5);
    set.add(11);
    set.add(12);

    expect(set.isEmpty()).toBe(false)

  });

  test('contains', () => {

    const set = new ListSet<number>();


    set.add(10);
    set.add(11);
    set.add(12);
    set.add(4);
    set.add(5);
    set.add(11);
    set.add(12);

    expect(set.contains(1)).toBe(false)

    set.add(undefined);
    expect(set.contains(undefined)).toBe(true)

  })

  test('add', () => {

    const set = new ListSet<number>();


    set.add(10);
    set.add(11);
    set.add(12);
    set.add(4);
    set.add(5);
    set.add(11);
    set.add(12);

    expect(set.size()).toBe(5)

    set.add(undefined);
    expect(set.size()).toBe(6)

  })

  test('remove', () => {

    const set = new ListSet<number>();


    set.add(10);
    set.add(11);
    set.add(12);
    set.add(4);
    set.add(5);
    set.add(11);
    set.add(12);

    expect(set.size()).toBe(5)

    set.remove(10);
    expect(set.size()).toBe(4)
    expect(set.contains(10)).toBe(false)

  })

  test('clear', () => {

    const set = new ListSet<number>();


    set.add(10);
    set.add(11);
    set.add(12);
    set.add(4);
    set.add(5);
    set.add(11);
    set.add(12);

    expect(set.size()).toBe(5)

    set.clear();
    expect(set.size()).toBe(0)
    expect(set.contains(10)).toBe(false)

  })

});
