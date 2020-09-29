import {describe, expect, test} from '@jest/globals'
import DuplxCircleLinkedList from "../DuplxCircleLinkedList";
import DuplxNoCircleLinkedList from "../DuplxNoCircleLinkedList";
import SingleCircleLinkedList from "../../single/SingleCircleLinkedList";

describe('DuplxCircleLinkedList', () => {

  test('size equal 5', () => {

    const linkedList = new DuplxCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    expect(linkedList.getSize()).toBe(5)

  });

  test('get element from index', () => {

    const linkedList = new DuplxCircleLinkedList();
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

  test('set element from index', () => {

    const linkedList = new DuplxCircleLinkedList();
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

  test('clear', () => {

    const linkedList = new DuplxCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    linkedList.clear();

    expect(linkedList.getSize()).toBe(0)

  });

  test("has a circle", () => {
    const linkedList = new SingleCircleLinkedList<Number>();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(1);

    for(let i = 0; i <= linkedList.getSize(); i++) {
      if(i < linkedList.getSize()) {
        expect(linkedList.next()).toBe(linkedList.getElement(i));
      }else {
        expect(linkedList.next()).toBe(linkedList.getElement(0));
      }
    }
  })
})
