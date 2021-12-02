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
 * https://leetcode-cn.com/problems/linked-list-random-node/solution/xu-shui-chi-chou-yang-suan-fa-by-jackwener/
 *
 *
 * @param head The linked list's head.
 Note that the head is guaranteed to be not null, so it contains at least one node.
 * @param {ListNode} head
 */
var Solution = function(head) {

  this.head = head;

};

/**
 * Returns a random node's value.
 * @return {number}
 */
Solution.prototype.getRandom = function() {

  let cur = this.head;
  let count = 0;

  let res;

  while(cur) {

    count++;

    let random = Math.floor(Math.random() * count + 1);

    if(random === count) {
      res = cur.val
    }

    cur = cur.next

  }

  return res

};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */
