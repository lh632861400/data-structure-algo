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
 * 翻转链表
 *
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

  const head1 = l1;
  const head2 = l2;

  let remain = 0;
  let cur;
  let head;
  for(let node1 = head1, node2 = head2; (node1 || node2); node1 = node1 ? node1.next : null, node2 = node2 ? node2.next : null) {
    let value1 = node1 ? node1.val : 0;
    let value2 = node2 ? node2.val : 0;
    let mod = (value1 + value2 + remain) % 10;
    remain = Math.ceil((value1 + value2 - mod) / 10)
    if(!cur) {
      cur = new ListNode(mod);
      head = cur;
    }else {
      cur.next = new ListNode(mod);
      cur = cur.next;
    }
  }

  // 存在进位
  if(remain > 0) {
    remain = remain + ""
    remain.split("").forEach((valStr) => {
      cur.next = new ListNode(valStr * 1);
      cur = cur.next;
    })
  }

  return head;

};
