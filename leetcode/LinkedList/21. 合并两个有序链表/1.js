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
 * 双指针
 * 参考归并排序
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {

  let virtualHead = new ListNode();
  let cur = virtualHead;
  while(l1 && l2) {
    if(l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    }else {
      cur.next = l2
      l2 = l2.next;
    }

    cur = cur.next;
  }

  if(!l1) {
    cur.next = l2;
  }else {
    cur.next = l1;
  }

  return virtualHead.next;

};
