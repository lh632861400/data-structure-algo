/**
 * Initialize your data structure here.
 */
var Trie = function() {

  this.root = new Node();

};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {

  if(!word) {
    return;
  }

  let parentNode = this.root;
  for(let i = 0; i < word.length; i++) {

    if(!parentNode.has(word[i])) {
      parentNode = parentNode.add(word[i]);
    }else {
      parentNode = parentNode.get(word[i]);
    }
  }

  parentNode.word = true;

};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {

  if(!word) {
    return true;
  }

  let parentNode = this.root;
  for(let i = 0; i < word.length; i++) {
    parentNode = parentNode.get(word[i])

    if(!parentNode) {
      return false;
    }
  }

  return !!parentNode.word;

};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {

  if(!prefix) {
    return false;
  }

  let parentNode = this.root;
  for(let i = 0; i < prefix.length; i++) {
    parentNode = parentNode.get(prefix[i])

    if(!parentNode) {
      return false;
    }
  }

  return true;

};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

class Node {
  constructor(char, parentNode, word) {

    this.char = char;
    this.parentNode = parentNode;
    this.children = null;
    this.word = word;

  }

  add(char) {

    this.children = this.children || new Map();

    if(this.children.has(char)) {
      return this.children.get(char);
    }

    const node = new Node(char, this)

    this.children.set(char, node);

    return node;

  }

  has(char) {

    if(!this.children || !this.children.has(char)) {
      return false;
    }

    return true;

  }

  get(char) {

    if(!this.children) {
      return undefined;
    }

    return this.children.get(char)

  }

}
