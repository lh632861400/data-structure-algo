/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 *
 *
 * thoughts:
 * 暴力求解
 *
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function(head) {

  const result = [];

  let cur = head;

  let i = 0;

  let prevVal = 0;
  let prevIndex = -1;

  let prevTargetVal = 0;
  let prevTargetIndex = -1;

  while(cur) {

    // 记忆化上一次比较的状态作为区间
    if(cur.val >= prevVal && i < prevTargetIndex && cur.val < prevTargetVal) {
      result[i] = prevTargetVal;

      cur = cur.next;

      i++

      continue;
    }

    const [val, targetIndex] = nextLargerNodesHelper(cur, i)

    result[i] = val;

    // 更新区间状态
    if(targetIndex !== -1) {
      prevVal = cur.val;

      prevIndex = i;

      prevTargetVal = val;

      prevTargetIndex = targetIndex
    }

    cur = cur.next;

    i++

  }

  return result

};

function nextLargerNodesHelper(node, startIndex) {

  let val = node.val;

  let result = 0;

  let i = startIndex;

  node = node.next;

  while(node) {

    if(node.val > val) {
      result = node.val;
      return [result, i];
    }

    node = node.next

    i++;

  }

  return [result, -1]

}
