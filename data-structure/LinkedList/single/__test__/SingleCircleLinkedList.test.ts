import {describe, expect, test} from '@jest/globals'
import SingleCircleLinkedList from "../SingleCircleLinkedList";
import SingleNoCircleLinkedList from "../SingleNoCircleLinkedList";

describe('SingleCircleLinkedList', () => {

  test("size equal 5", () => {
    const linkedList = new SingleCircleLinkedList<Number>();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);
    linkedList.add(5, 123213);

    expect(linkedList.getSize()).toBe(6)
  });

  test("contains 11", () => {
    const linkedList = new SingleNoCircleLinkedList<Number>();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(1);

    expect(linkedList.contains(11)).toBe(true);
    expect(linkedList.contains(2)).toBe(false);
  })

  test("contains getElement From index equals 2 return 33", () => {
    const linkedList = new SingleNoCircleLinkedList<Number>();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(1);

    expect(() => { linkedList.getElement(11) }).toThrow();
    expect(linkedList.getElement(2)).toBe(33)
  })

});
