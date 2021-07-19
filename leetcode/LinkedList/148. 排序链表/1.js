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
 * 穿针引线
 * 参考：
 * 147. 对链表进行插入排序
 * 21. 合并两个有序链表
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {

  if(!head) {
    return head;
  }

  const vitualHead = new ListNode(-Infinity);
  vitualHead.next = head;
  let prev = head;
  let tail = head;
  let cur = head.next;
  let next;

  while(cur) {

    next = cur.next;

    if(cur.val >= tail.val) {
      tail.next = cur;
      tail = cur;
      cur = next;
    }else {
      // 找到插入的节点的prev
      let targetPrev = vitualHead;
      let i = vitualHead.next;
      while(i) {
        if(cur.val < i.val) {
          targetPrev.next = cur;
          cur.next = i;
          tail.next = next;
          break;
        }else {
          targetPrev = i;
          i = i.next;
        }
      }

      cur = next;
    }

  }

  return vitualHead.next;

};
