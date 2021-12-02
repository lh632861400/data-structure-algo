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
 * 双指针 + 快慢指针
 * 参考：
 * 206. 反转链表
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {

  if(!head || !head.next) {
    return true;
  }

  if(!head.next.next) {
    return head.val === head.next.val
  }

  let slow = head;
  let fast = head;

  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let reversedHead = isPalindromeHelper(slow);

  while(head !== reversedHead) {
    if(head.val !== reversedHead.val) {
      return false;
    }

    if(head.next === reversedHead) {
      break;
    }

    head = head.next;
    reversedHead = reversedHead.next;
  }

  return true;

};

function isPalindromeHelper(head) {
  if(!head) {
    return head;
  }

  let prev = null;

  let cur = head;

  let next;

  while(cur) {

    // 记录关系
    next = cur.next;

    // 穿针
    cur.next = prev;

    // 重置状态
    prev = cur;

    cur = next;
  }

  return prev;
}
