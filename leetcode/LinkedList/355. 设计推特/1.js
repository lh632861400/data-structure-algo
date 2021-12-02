/**
 * Initialize your data structure here.
 */
var Twitter = function() {

  this.map = new Map();

};

/**
 *
 *
 * thoughts:
 * 先穿后排在判空 + 优先级队列
 *
 * Compose a new tweet.
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {

  let value = this.map.get(userId);

  if(!value) {

    let tail = new Node(tweetId);
    tail.next = tail;
    value = {
      tweetId: tail,
      followeeId: null,
    }
    this.map.set(userId, value)
  }else {
    let tail = value.tweetId;
    if(!tail) {
      let tail = new Node(tweetId);
      tail.next = tail;
      value.tweetId = tail;
      return;
    }

    let head = tail.next;

    tail.next = new Node(tweetId);
    tail.next.next = head;
    value.tweetId = tail.next;
  }

};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {

  // 得到所有链表,第一个元素代表队列的元素个数
  const queue = [0];
  let value = this.map.get(userId);

  if(!value) {
    return [];
  }

  const tweetId = value.tweetId;
  const followeeId = value.followeeId;

  if(tweetId) {
    addNode(queue, tweetId.next, tweetId);
  }

  if(followeeId) {

    let cur = followeeId;
    while(cur) {

      const meta = this.map.get(cur.val);

      if(meta) {
        if(meta.tweetId) {
          addNode(queue, tweetId.next, meta.tweetId);
        }
      }

    }

  }

  // heapify
  heapify(queue, (queue, i, j) => {
    return -queue[i].createTime + queue[j].createTime;
  });

  const res = [];

  for(let i = 0; i < 10 && queue[0] > 0; i++) {

    let n = queue[0];

    // pop
    res.push(queue[1].val);

    if(n === 1) {
      return;
    }

    queue[1] = queue[n];

    queue[0]--;

    shiftDown(0, queue[0], (queue, i, j) => {
      return -queue[i].createTime + queue[j].createTime;
    }, queue)

  }

  return res;


};

function addNode(queue, head, tail) {

  if(!head) {
    return;
  }

  let cur = head;

  while(cur && (cur !== head || queue[0] === 0)) {
    queue.push(head);

    queue[0]++;

    cur = cur.next;
  }

  return queue;

}

function heapify(queue, compare) {

  if(!queue[0]) {
    return queue;
  }

  const n = queue[0];

  // 得到第一个非叶子节点
  let root = Math.floor(n / 2);

  while(root > 0) {

    shiftDown(root, n, compare, queue);

    root--;
  }

}

function minChild(queue, parent) {

  let child = parent << 1;

  if(child + 1 > n) {
    return child;
  }

  if(compare(queue, child, child + 1) <= 0) {
    return child;
  }else {
    return child + 1;
  }

}

function swap(queue, i, j) {

  let temp = queue[i];

  queue[i] = queue[j];

  queue[j] = temp;

}

function shiftDown(i, n, compare, queue) {

  while((i << 1) <= n) {
    const child = minChild(queue, i)
    if(compare(queue, child, i) < 0) {
      swap(queue, child, i)

      i = child;
    }
  }

}

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {

  let value = this.map.get(followerId);

  if(!value) {

    let tail = new Node(followeeId);
    tail.next = tail;
    value = {
      tweetId: null,
      followeeId: tail,
    }
    this.map.set(followerId, value)
  }else {
    let tail = value.followeeId;
    if(!tail) {
      let tail = new Node(followeeId);
      tail.next = tail;
      value.followeeId = tail;
      return;
    }

    let head = tail.next;

    tail.next = new Node(followeeId);
    tail.next.next = head;
    value.followeeId = tail.next;
  }

};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {

  let value = this.map.get(followerId);

  if(!value) {
    return;
  }

  if(!value.followeeId) {
    return;
  }

  let tail = value.followeeId;
  let head = value.followeeId.next;

  let prev = tail;
  let cur = head;
  let next;

  while(cur) {
    next = cur.next;

    if(cur.val === followeeId) {
      if(head === tail) {
        value.followeeId = null;
        break;
      }

      prev.next = next;
      if(cur === tail) {
        value.followeeId = prev;
      }
      break;
    }

    if(cur === tail) {
      break;
    }

    prev = cur;
    cur = next;
  }

};

function Node(val, next) {
  this.val = val;
  this.next = next;
  this.createTime = Date.now();
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
