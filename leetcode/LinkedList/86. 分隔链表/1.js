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
 * 先穿后排在判空 + 虚拟节点
 *
 *
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {

  const virtualHead = new ListNode(-Infinity);

  let lessThanNode = virtualHead;

  virtualHead.next = head;

  let lessThanNodeNext;

  let prev = virtualHead;

  let cur = head;

  let next;

  while(cur) {

    if(cur.val < x) {
      // 记录当前节点的前驱
      next = cur.next;

      // 如果prev小于x
      if(prev.val < x) {
        prev = cur;
        lessThanNode = cur;
        cur = cur.next;
        continue;
      }else {
        // 修改当前节点关系
        prev.next = next;

        // 穿针
        lessThanNodeNext = lessThanNode.next;
        lessThanNode.next = cur;
        cur.next = lessThanNodeNext;

        lessThanNode = cur;

        cur = next;
      }


    }else {
      prev = cur;
      cur = cur.next;
    }

  }

  return virtualHead.next;

};
