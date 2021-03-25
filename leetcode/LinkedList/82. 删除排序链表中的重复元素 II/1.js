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
 * doublePoint
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {

  if(!head) {
    return head;
  }

  // current元素的前一个元素
  let prev;

  let prevDuplicateNode;
  let duplicateStartItem;
  let current = head;

  while(current) {

    // 如果存在重复元素，则判断当前元素与重复元素，相等则继续下一轮比较，不相等将前一个不重复节点链接到当前节点，重置重复节点
    if(duplicateStartItem) {
        if(duplicateStartItem.val === current.val) {
          prev = current;
          current = current.next;
          continue;
        }else {

          // 如果存在重复节点，但是重复节点之前的节点不存在，那么就是head开始重复
          if(!prevDuplicateNode) {
            prev = null;
            head = current;
          }else {
            prevDuplicateNode.next = current;
          }

          // 重置重复节点
          duplicateStartItem = undefined;

        }
    }

    if(current.next) {
      if(current.val === current.next.val) {
        duplicateStartItem = current;
      }else {

        // 重置不重复节点
        prevDuplicateNode = current;
      }
    }

    prev = current;

    current = current.next;

  }

  // 如果还存在重复元素
  if(duplicateStartItem) {
    if(prevDuplicateNode) {
      prevDuplicateNode.next = null;
    }else {
      head = null;
    }
  }

  return head;

};
