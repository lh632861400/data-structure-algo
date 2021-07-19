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
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/he-bing-kge-pai-xu-lian-biao-by-leetcode-solutio-2/
 *
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {

  return merge(lists, 0 , lists.length - 1)

};

function merge(lists, l, r) {

  if(l === r) {
    return lists[l];
  }

  if(l > r) {
    return null;
  }

  const mid = (l + r) >>> 1;

  return mergeKListsHelper(merge(lists, l, mid), merge(lists, mid + 1, r))

}

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
