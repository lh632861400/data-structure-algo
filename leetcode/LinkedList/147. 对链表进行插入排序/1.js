/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {

  if(!head) {
    return null;
  }

  let res = [];

  let cur = head;

  while (cur) {
    res.push(cur.val);

    cur = cur.next;
  }

  let position = 0;
  for(let i = 1; i < res.length; i++) {
    // 插入排序
    let target = res[i];
    position = insertionSortListHelper(res, 0, i, target)
    for(let j = i; j > position; j--) {
      res[j] = res[j - 1];
    }

    res[position] = target;
  }

  cur = head;
  let i = 0;
  while(cur) {
    cur.val = res[i];
    cur = cur.next;
    i++
  }

  return head;

};

/**
 *
 * 二分查找插入位置
 * [start, end)
 *
 * */
function insertionSortListHelper(res, start, end, target) {

  let left = start;
  let right = end;
  let mid;

  while(left < right) {
    mid = left + ((right - left) >>> 1);

    if(res[mid] <= target) {
      left = mid + 1;
    }else {
      right = mid;
    }
  }

  return left;

}
