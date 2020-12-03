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

    expect(map.size()).toBe(8);
  })

});
