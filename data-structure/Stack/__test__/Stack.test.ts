import {describe, expect, test} from '@jest/globals'
import Stack from "../Stack";

describe('Stack', () => {

  test('get stack size', () => {

    const stack = new Stack<Number>();
    for(let i = 0; i < 2; i++){
      stack.push(i);
    }

    expect(stack.size()).toBe(2);

  });

  test('isEmpty()', () => {

    const stack = new Stack<Number>();
    for(let i = 0; i < 2; i++){
      stack.push(i);
    }

    expect(stack.isEmpty()).toBe(false);

    const stack2 = new Stack<Number>();
    expect(stack2.isEmpty()).toBe(true);

  });

  test('push 10 element to stack', () => {

    const stack = new Stack<Number>();
    for(let i = 0; i < 10; i++){
      stack.push(i);
    }

    let result = 0;
    while(!stack.isEmpty()) {
      result++;
      stack.pop();
    }

    expect(result).toBe(10);

  })

  test('pop element from stack', () => {

    const stack = new Stack<Number>();
    for(let i = 0; i < 10; i++){
      stack.push(i);
    }

    let result = 9;
    while(!stack.isEmpty()) {
      expect(stack.pop()).toBe(result);
      result--;
    }

    expect(result).toBe(-1);

  })

  test('peek element from stack', () => {
    const stack = new Stack<Number>();
    for(let i = 0; i < 10; i++){
      stack.push(i);
    }

    expect(stack.peek()).toBe(9);
    expect(stack.size()).toBe(10);
    
  })

});
