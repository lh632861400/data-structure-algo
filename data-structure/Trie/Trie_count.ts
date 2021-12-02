import {ITrie} from "./ITrie";

export default class Trie {

  root: TrieNode;

  constructor() {

    this.root = new TrieNode();

  }


  insert(word: string):void {

    let parent = this.root;

    for(let i = 0; i < word.length; i++) {

      let node = parent.children.get(word[i]);

      if(!node) {
        node = new TrieNode(word[i]);
        parent.children.set(word[i], node)
      }

      parent = node;

      parent.preCount++;

    }

    parent.count++;

  }

  search(word: string):boolean {

    let parent = this.root;

    for(let i = 0; i < word.length; i++) {

      let node = parent.children.get(word[i]);

      if(!node) {
        return false;
      }

      parent = node;

    }

    return parent.count > 0;

  }

  startsWith(prefix: string): boolean {

    let parent = this.root;

    for(let i = 0; i < prefix.length; i++) {

      let node = parent.children.get(prefix[i]);

      if(!node) {
        return false;
      }

      parent = node;

    }

    return parent.preCount > 0

  }

}

class TrieNode {

  value: string

  // 以当前转字符结尾的单词个数
  count = 0;

  // 以当前字符前面的字符个数
  preCount = 0;
  children = new Map<string, TrieNode>();

  constructor(value?: string) {
    this.value = value;
  }


}

