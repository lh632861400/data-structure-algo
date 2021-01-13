/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 *
 * thoughts:
 * 递归
 *
 * O(n)
 * O(height)
 *
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {

  return dfs(head)[0];

};

/**
 *
 * 以node为子级链表的head节点扁平化child链表返回扁平化的head节点
 *
 * */
function dfs(node) {

  let head = node;

  let next = null;

  let last = node;

  while(node) {

    if(node.child) {
      next = node.next;

      const [xjHead, xjTail] = dfs(node.child);

      node.next = xjHead;

      node.child = null;

      xjHead.prev = node;

      last = xjTail;

      // 连接最后一个节点
      last.next = next;

      if(next) {
        next.prev = last;
      }

      // 返回链接之后需要遍历的节点
      node = next;

      if(node) {
        last = node;
      }
    }else {

      if(node.next) {
        last = node.next;
      }

      node = node.next;
    }

  }

  return [head, last]

}
