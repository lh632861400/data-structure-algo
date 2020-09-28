import {describe, expect, test} from '@jest/globals'
import SingleCircleLinkedList from "../SingleCircleLinkedList";

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

});
