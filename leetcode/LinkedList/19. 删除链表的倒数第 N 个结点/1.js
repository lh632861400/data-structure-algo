/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 *
 * thoughts:
 * 翻转链表 + 虚拟头
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {

  let reverseHead = reverse(head);

  let count = 1;
  let cur = reverseHead;
  let virtualHead = new ListNode();
  let prev = virtualHead;
  while(cur && count !== n) {
    prev = cur;
    cur = cur.next;
    count++;
  }

  prev.next = cur.next;

  if(prev === virtualHead) {
    reverseHead = virtualHead.next;
    virtualHead.next = null;
  }

  return reverse(reverseHead)

};

function reverse(head) {

  let cur = head;
  let prev = null;
  let next;
  while(cur) {
    next = cur.next;

    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;

}
