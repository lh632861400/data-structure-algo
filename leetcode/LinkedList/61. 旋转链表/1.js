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
 * 快慢指针
 * 参考：
 * 141. 环形链表
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {

  if(k === 0) {
    return head;
  }

  const [n, tail] = rotateRightHelper(head);

  if(n === 0) {
    return head;
  }

  const remain = n - k % n;

  // 刚好整除
  if(remain === n) {
    return head;
  }

  const prev = getPrecessor(head, remain)

  const newHead = prev.next;

  prev.next = null;

  const virtualHead = new ListNode();

  virtualHead.next = newHead;

  tail.next = head;

  return virtualHead.next

};

/**
 *
 * @return {number} 链表的长度
 *
 * */
function rotateRightHelper(head) {

  if(!head) {
    return [0, head]
  }

  let count = 1;

  let cur = head;

  while (cur && cur.next) {

    cur = cur.next;

    count++;

  }

  return [count, cur]

}

function getPrecessor(head, i) {

  let count = 1;

  let cur = head;

  while(cur) {

    if(count === i) {
      return cur;
    }

    cur = cur.next;

    count++;

  }

  return null;

}
