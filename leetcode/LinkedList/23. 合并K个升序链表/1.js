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
 * 参考：合并两个有序链表
 *
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {

  let prev = null;

  for(let i = 0; i < lists.length; i++) {
    prev = mergeKListsHelper(prev, lists[i])
  }

  return prev;

};

function mergeKListsHelper(l1, l2) {
  if(!l1) {
    return l2;
  }

  if(!l2) {
    return l1;
  }

  const virtualHead = new ListNode();

  let cur = virtualHead;

  while(l1 && l2) {

    if((l1.val < l2.val)) {
      cur.next = l1;
      l1 = l1.next;
    }else {
      cur.next = l2;
      l2 = l2.next;
    }

    cur = cur.next;

  }

  if(l1) {
    cur.next = l1;
  }else {
    cur.next = l2;
  }

  return virtualHead.next;


}
