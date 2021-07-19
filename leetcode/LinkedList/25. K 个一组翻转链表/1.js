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
 * 穿针引线
 * 参考：
 * 24. 两两交换链表中的节点
 * 92. 反转链表 II
 *
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {

  const virtualHead = new ListNode();

  let prev = virtualHead;

  let cur = head;

  let next;

  while(cur) {

    // 记录下一个k group的节点

    next = validKGroup(cur, k)

    if(next) {
      const [newHead, newTail] = reverseKGroupHelper(cur, next[0]);

      prev.next = newHead;

      prev = newTail;

      cur = next[1];
    }else {
      prev.next = cur;
      cur = null;
    }

  }

  return virtualHead.next;

};

/**
 *
 * @reutrn {Array} [newHead, newTail]
 *
 * */
function reverseKGroupHelper(head, tail) {

  let prev = null;
  let cur = head;
  let next;

  while(cur) {

    // 记录节点关系
    next = cur.next;

    // 修改指针
    cur.next = prev;

    if(cur === tail) {
      break;
    }

    prev = cur;
    cur = next;
  }

  return [tail, head]

}

function validKGroup(start, k) {

  let count = 0;
  let cur = start;

  while(cur) {
    count++;

    if(count === k) {
      return [cur, cur.next]
    }

    cur = cur.next;
  }

  return null;

}
