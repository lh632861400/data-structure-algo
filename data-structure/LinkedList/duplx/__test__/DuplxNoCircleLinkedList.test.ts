import {describe, expect, test} from '@jest/globals'
import DuplxNoCircleLinkedList from "../DuplxNoCircleLinkedList";

describe('DuplxNoCircleLinkedList', () => {
  test.only('size equal 5', () => {

    const linkedList = new DuplxNoCircleLinkedList();
    linkedList.add(11);
    linkedList.add(22);
    linkedList.add(33);
    linkedList.add(44);
    linkedList.add(0, 1);

    expect(linkedList.getSize()).toBe(5)

  })
});
