/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {

  this.root = undefined;

};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {

  if(!this.root) {

    const dummy = new Node();
    this.root = dummy;

  }

  let prev = this.root;
  let node;

  for(let char of word) {

    node = prev.add(char, false);
    prev = node;

  }

  node.color = true;

};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {

  if(!this.root) {
    return false;
  }

  return this.searchNode(this.root, word)
};

WordDictionary.prototype.searchNode = function (prev, word) {

  let node;
  for(let i = 0; i < word.length; i++) {

    const char = word[i];

    if(char === '\.') {

      if(prev.children) {

        const values = prev.children.values();

        for (let child of values) {
          if (this.searchNode(child, word.substring(i + 1))) {
            return true;
          }
        }

        return false;

      }else {
        return false;
      }

    }else {
      node = prev.getChild(char)

      if (!node) {
        return false;
      }

      prev = node;
    }
  }

  if(!node) {
    return prev.color;
  }

  return node.color;

}

class Node {

  char;
  children;
  color;

  constructor(char) {

    this.char = char;

  }

  add(char, color) {

    if(!this.children) {
      this.children = new Map();
    }

    if(!this.children.has(char)) {

      const node = new Node(char);
      node.color = color;
      this.children.set(char, node)

      return node;

    }else {
      return this.children.get(char);
    }

  }

  getChild(char) {

    if(!this.children) {
      return undefined;
    }

    return this.children.get(char);

  }

}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
