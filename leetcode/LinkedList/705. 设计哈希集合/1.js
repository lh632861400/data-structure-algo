/**
 *
 * thoughts:
 * hashmap
 *
 * Initialize your data structure here.
 */
var MyHashSet = function() {

  this.capacity = 1000001;

  this.arr = new Array(this.capacity).fill(-1)

};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {

  this.arr[key] = key;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
  this.arr[key] = -1;
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
  return this.arr[key] !== -1;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
