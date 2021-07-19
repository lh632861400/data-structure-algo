/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 *
 * thoughts;
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/xiang-jiao-lian-biao-by-leetcode-solutio-a8jn/
 *
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {


  if(!headA || !headB) {
    return null;
  }

  let i = headA;
  let j = headB;

  let counti = 0;
  let countj = 0;

  while(i && j) {

    if(i === j) {
      return i;
    }

    i = i.next;
    j = j.next;

    if(!i && !counti) {
      counti++;
      i = headB;
    }

    if(!j && !countj) {
      countj++;
      j = headA;
    }

  }

  return null;

};
