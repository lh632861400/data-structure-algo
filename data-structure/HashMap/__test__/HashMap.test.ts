import {describe, expect, test} from '@jest/globals'
import HashMap from "../HashMap";

describe('HashMap', () => {

  test('size equal 5', () => {

    const map = new HashMap<Object, number>();

    expect(map.put(undefined, 5)).toBe(undefined);
    expect(map.put(null, 6)).toBe(undefined);
    expect(map.put(true, 10)).toBe(undefined);
    expect(map.put(false, 11)).toBe(undefined);
    expect(map.put('aa', 13)).toBe(undefined);
    expect(map.put(11, 22)).toBe(undefined);
    expect(map.put(1.01, 101)).toBe(undefined);
    expect(map.put({ hashCode: () => 1 }, 15)).toBe(undefined);
    expect(map.put('aa', 10)).toBe(13);

    expect(map.size()).toBe(8);
  })

  test('put', () => {

    const map = new HashMap<Object, number>();

    for(let i = 0; i < 5; i++) {
      map.put(new Key(i), i);
    }

    expect(map.put(new Key(1), 11)).toBe(1);

    expect(map.size()).toBe(5);
  })

  test('containsKey', () => {

    const map = new HashMap<Object, number>();

    expect(map.put(undefined, 5)).toBe(undefined);
    expect(map.put(null, 6)).toBe(undefined);
    expect(map.put(true, 10)).toBe(undefined);
    expect(map.put(false, 11)).toBe(undefined);
    expect(map.put('aa', 13)).toBe(undefined);
    expect(map.put(11, 22)).toBe(undefined);
    expect(map.put(1.01, 101)).toBe(undefined);
    expect(map.put({ equals: () => 1, hashCode: () => 1 }, 15)).toBe(undefined);
    expect(map.put('aa', 10)).toBe(13);

    for(let i = 0; i < 5; i++) {
      map.put(new Key(i), i);
    }

    expect(map.containsKey(new Key(1))).toBe(true);
    expect(map.containsKey(undefined)).toBe(true);
    expect(map.containsKey({ equals: () => 1, hashCode: () => 1 })).toBe(false);

  })

});

class Key {
  value: number;

  constructor(value) {
    this.value = value
  }

  equals(key) {

    if(this === key) return true;
    if(key === undefined || key === null) return false;
    if(key.__proto__.constructor === Key) return this.value === key.value;

  }

  hashCode() {

    return this.value / 20;

  }
}
