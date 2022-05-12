// Reference to creating JS Data Structures: 
// https://www.educative.io/blog/data-structures-tutorial-advanced
"use strict";
export class TrieNode{
  constructor(character){
    this.children = [];
    for(var i=0; i<26; i++){ // # of English Alphabets
      this.children[i]=null;
    }
    this.lastLetter = false;
    this.character = character;
  }

  // Mark the last letter in the Trie
  setLastLetter(){
    this.lastLetter = true;
  }
}