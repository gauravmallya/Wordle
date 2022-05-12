import {Trie} from './index.js';

var initialCount = 0
var initialLimit = 5
var currWord = ""
var words = []
var trieData = new Trie();

function loadValidWords(){
    fetch('wordleWords.txt')
    .then(response => response.text())
    .then(text => createListWords(text));
}

function createListWords(text) {
    words = text.split(/\r?\n/)
    for(var i = 0; i < words.length; i++){
        trieData.insert(words[i])
    }
    console.log("done")
}

function addButtons(){
    var topKeys = ["Q","W","E","R","T","Y","U","I","O","P",]
    var middleKeys = ["A","S","D","F","G","H","I","J","K","L"]
    var bottomKeys = ["ENTER","Z","X","C","V","B","N","M","DEL"]
    var arrays = [topKeys, middleKeys, bottomKeys]
    var types = ["buttons-top", "buttons-middle", "buttons-bottom"]
    for(var j = 0; j<3; j++) {
        var currentRow = arrays[j]
        for(var i = 0; i < currentRow.length; i++) {
            var button = document.createElement("button");
            button.innerHTML = currentRow[i];
            button.className = "btn btn-outline-success";
            var buttonDiv = document.getElementById(types[j]);
            buttonDiv.appendChild(button);
        }
    }
}

function addGrid(){
    var types = ["first", "second", "third", "fourth", "fifth", "sixth"];
    var count = 0;
    for(var j = 0; j<6; j++) {
        for(var i = 0; i < 5; i++) {
            var item = document.createElement("div");
            item.className = "col border";
            var box = document.createElement('div');
                box.id = "box " + count.toString();
                count = count + 1;
            item.appendChild(box)
            var rowDiv = document.getElementById(types[j]);
            rowDiv.appendChild(item);
        }
    }
}



function listenToUser(){ 
    const buttons = document.querySelectorAll('.btn');
    for(var index = 0; index < buttons.length; index++){
        const btn = buttons[index]
        btn.addEventListener('click', function(event){
            console.log(btn.innerHTML);
            console.log(initialCount);
            const val = btn.innerHTML
            if (initialCount < initialLimit && val != "DEL" && val != "ENTER") {
                enterIntoGrid(initialCount, val)
            } else if (val == "DEL") {
                if (initialCount != initialLimit && initialCount % 5 == 0){
                    return
                }else{
                    deleteIndex(initialCount)
                }
            } else if (val == "ENTER") {
                console.log(currWord)
                if (trieData.search(currWord)){
                    console.log("success :)") 
                }
            }
        });
    }
}

function enterIntoGrid(index, value) {
    console.log(index.toString());
    var gridPosition = document.getElementById("box " + index.toString())
    console.log(gridPosition);
    gridPosition.innerHTML = value;
    currWord = currWord + value
    initialCount = initialCount + 1;
}

function deleteIndex(index) {
    initialCount = index - 1 
    var gridPosition = document.getElementById("box " + initialCount)
    console.log(gridPosition);
    gridPosition.innerHTML = "";
    currWord = currWord.slice(0, -1)
}

addGrid()
addButtons()
loadValidWords()
listenToUser()