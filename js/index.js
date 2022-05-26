"use strict";
import {TrieNode} from './Trienode.js';
 
export class Trie{
 constructor(){
   this.root = new TrieNode(''); //Root node
  };
 
  getIndex(t){
   return t.charCodeAt(0) - "a".charCodeAt(0);
  }
  //Function to insert a key in the Trie
  insert(key){
   if (key == null){
     return;
   };
  
   key = key.toLowerCase();
   let currentNode = this.root;
   let index = 0;  
        
   //Store the character index 
   //Iterate the trie with the given character index,
   //If the index points to null
   //simply create a TrieNode and go down a level 
   for (let level=0; level<key.length; level++){
     index = this.getIndex(key[level]);
    
     if (currentNode.children[index] == null){
       currentNode.children[index] = new TrieNode(key[level]);
     }
     currentNode = currentNode.children[index];
   }
    
   //Mark the end character as leaf node
   currentNode.setLastLetter();
  };
  
 //Function to search a given key in Trie
 search(key){
    if (key == null){
      return false; //null key
    }
   
    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;
   
    // Iterate through each level of the Trie
    // until eventually reaching currentNode.lastLetter
    // equal to true
   
    for (var level=0; level<key.length; level++){
      index = this.getIndex(key[level]);
      if (currentNode.children[index] == null){
        return false;
      }
      currentNode = currentNode.children[index];
    }                                            
    if (currentNode != null && currentNode.lastLetter){
      return true;
    }
    return false;
  };
} 

