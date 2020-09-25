import {describe, expect, test} from '@jest/globals'
import DuplxNoCircleLinkedList from "../DuplxNoCircleLinkedList";

describe('DuplxNoCircleLinkedList', () => {
  test('size equal 5', () => {

    const linkedList = new DuplxNoCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    expect(linkedList.getSize()).toBe(5)

  });

  test('get element from index', () => {

    const linkedList = new DuplxNoCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    expect(linkedList.getElement(0)).toBe(1)
    expect(linkedList.getElement(2)).toBe(22)
    expect(linkedList.getElement(3)).toBe(33)
    expect(() => { linkedList.getElement(-1) }).toThrow();
    expect(() => { linkedList.getElement(linkedList.getSize()) }).toThrow();

  });

  test.only('set element from index', () => {

    const linkedList = new DuplxNoCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    linkedList.setElement(0, 123);

    linkedList.setElement(2, 1);

    expect(linkedList.getElement(0)).toBe(123)
    expect(linkedList.getElement(2)).toBe(1)
    expect(() => { linkedList.getElement(-1) }).toThrow();
    expect(() => { linkedList.getElement(linkedList.getSize()) }).toThrow();

  });

  test('remove element', () => {

    const linkedList = new DuplxNoCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    linkedList.remove();

    linkedList.remove(0);

    expect(linkedList.getElement(0)).toBe(11)
    expect(() => { linkedList.remove(-1) }).toThrow();
    expect(() => { linkedList.remove(linkedList.getSize()) }).toThrow();

  });

  test.only('clear', () => {

    const linkedList = new DuplxNoCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    linkedList.clear();

    expect(linkedList.getSize()).toBe(0)

  });
});
