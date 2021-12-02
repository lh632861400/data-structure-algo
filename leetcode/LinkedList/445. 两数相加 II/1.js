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
 * 翻转链表
 * 参考：
 * 2. 两数相加
 *
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

  let [newl1, count1] = addTwoNumbersHelper(l1);

  let [newl2, count2] = addTwoNumbersHelper(l2);

  let moreThan = count1 > count2 ? newl1 : newl2;

  let head = moreThan;

  let cur1 = newl1;

  let prevMoreThan;

  let cur2 = newl2;

  // 进位
  let jw = 0;

  while(cur1 || cur2) {
    let value1 = cur1 ? cur1.val : 0;
    let valu2  = cur2 ? cur2.val : 0;

    let total = value1 + valu2 + jw;

    // 能够这样做的原因是进位最高为1
    jw = total < 10 ? 0 : 1;

    moreThan.val = total - jw * 10;

    cur1 = cur1 ? cur1.next : null;

    cur2 = cur2 ? cur2.next : null;

    prevMoreThan = moreThan;

    moreThan = moreThan.next;

  }

  // 进位具有最高位
  if(jw > 0) {
    prevMoreThan.next = new ListNode(jw);
  }

  const [aa] = addTwoNumbersHelper(head);

  return aa;

};

function addTwoNumbersHelper(head) {

  if(!head) {
    return [head, 0];
  }

  let cur = head;

  let prev = null;

  let next;

  let count = 0;

  while(cur) {

    count++;

    next = cur.next;

    cur.next = prev;

    prev = cur;

    cur = next;

  }

  return [prev, count];

}
