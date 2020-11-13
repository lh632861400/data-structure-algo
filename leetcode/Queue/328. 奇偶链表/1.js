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
 * 采用双指针
 * odd 指向奇数节点链表的最后一个节点
 * even 指向偶数节点的最后一个节点
 * 最后组合两个节点
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if(!head) {
    return head;
  }
  let oddLast = head;
  let evenLast = head.next;
  const oddStart = head;
  const evenStart = head.next;

  while (oddLast && evenLast && evenLast.next) {
    // 指向偶数节点的next节点
    oddLast.next = evenLast.next;
    oddLast = oddLast.next;

    // 指向奇数节点的下一个节点
    evenLast.next = oddLast && oddLast.next;
    evenLast = evenLast && evenLast.next;
  }

  oddLast.next = evenStart;

  return oddStart;

};
