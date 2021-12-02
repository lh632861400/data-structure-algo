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
 * 双指针
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {

  if(!head || !head.next) {
    return true;
  }

  if(!head.next.next) {
    return head.val === head.next.val
  }

  const res = [];

  while(head) {
    res.push(head.val)

    head = head.next;
  }

  let i = 0; let j = res.length - 1;

  while(i < j) {
    if(res[i] !== res[j]) {
      return false;
    }

    i++;
    j--;
  }

  return true;

};
