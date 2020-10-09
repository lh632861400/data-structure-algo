import {describe, expect, test} from '@jest/globals'
import Stack from "../Stack";

describe('Stack', () => {

  test('get stack size', () => {

    const stack = new Stack<Number>();
    for(let i = 0; i < 2; i++){
      stack.push(i);
    }

    expect(stack.size()).toBe(2);

  })

});
