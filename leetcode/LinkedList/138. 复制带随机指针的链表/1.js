/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 *
 *
 * thoughts:
 * 双指针 + 穿针引线
 *
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {

  const virtualHead = new Node();

  const weakMap = new WeakMap();

  let l1 = head;

  let prevl2 = virtualHead;

  let newNode;
  let newNodeRandom;

  while(l1) {

    newNode = weakMap.get(l1);

    // 不存在新节点
    if(!newNode) {
      newNode = new Node(l1.val)
      weakMap.set(l1, newNode)
    }

    prevl2.next = newNode;


    if(l1.random && !newNode.random) {
      let newNodeRandom = weakMap.get(l1.random);

      if(!newNodeRandom) {
        newNodeRandom = new Node(l1.random.val)
        weakMap.set(l1.random, newNodeRandom)
      }

      newNode.random = newNodeRandom;
    }

    l1 = l1.next;

    prevl2 = prevl2.next;

  }

  return virtualHead.next;

};
