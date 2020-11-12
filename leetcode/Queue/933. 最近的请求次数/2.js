/**
 *
 * thought:
 * 方法一：队列
 * 我们只会考虑最近 3000 毫秒到现在的 ping 数，因此我们可以使用队列存储这些 ping 的记录。当收到一个时间 t 的 ping 时，我们将它加入队列，并且将所有在时间 t - 3000 之前的 ping 移出队列。
 *
 * @param {number} t
 * @return {number}
 */

function Deuqe() {
  this.arr = [];
}

Deuqe.prototype.add = function(element) {

  this.arr.push(element)
}

Deuqe.prototype.poll = function () {
  this.arr.shift()
};

Deuqe.prototype.peek = function() {
  return this.arr[0]
}


Deuqe.prototype.size = function () {
  return this.arr.length
}

var RecentCounter = function() {
   this.queue = new Deuqe();
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.queue.add(t)

  while(this.queue.peek() < t - 3000) {
    this.queue.poll();
  }

  return this.queue.size();
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
