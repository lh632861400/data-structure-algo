import {describe, expect, test} from '@jest/globals'
import TreeMap from "../TreeMap";

describe('TreeMap', () => {

  test('size equal 5', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.put("c", 5)).toBe(111);

    expect(map.size()).toBe(3);
  })

  test('add', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.put("c", 5)).toBe(111);

    expect(map.size()).toBe(3);
  })

  test('clear', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.put("c", 5)).toBe(111);

    expect(map.size()).toBe(3);

    map.clear();

    expect(map.isEmpty()).toBe(true);
  })

  test('isEmpty', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.put("c", 5)).toBe(111);

    expect(map.size()).toBe(3);

    map.clear();

    expect(map.isEmpty()).toBe(true);
  })

  test('remove', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.put("c", 5)).toBe(111);

    expect(map.size()).toBe(3);

    map.clear();

    expect(map.isEmpty()).toBe(true);
  })

  test('containsKey', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.containsKey("c")).toBe(true);

    expect(map.containsKey("aa")).toBe(false);

    expect(map.containsKey("b")).toBe(true);
  })

  test('containsValue', () => {

    const map = new TreeMap<string, number>();

    expect(map.put("a", 10)).toBe(undefined);

    expect(map.put("c", 111)).toBe(undefined);

    expect(map.put("b", 10)).toBe(undefined);

    expect(map.put("aa", null)).toBe(undefined);

    expect(map.put("asdasd", undefined)).toBe(undefined);

    expect(map.containsValue(null)).toBe(true);

    expect(map.containsValue(undefined)).toBe(true);

    expect(map.size()).toBe(5);

    map.clear();

    expect(map.isEmpty()).toBe(true);
  })

  test('traversal', () => {

    const map = new TreeMap<number, number>();

    for(let i = 0; i < 10; i++) {
      expect(map.put(i, i)).toBe(undefined);
    }

    let count = 0;
    map.traversal({
      stop: false,
      visit(key: number, value: number): void {
        expect(key).toBe(count);

        expect(value).toBe(count);

        count++;
      }
    })
  })

})
