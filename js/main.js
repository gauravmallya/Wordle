import {Trie} from './index.js';

var initialCount = 0
var initialLimit = 5
var currWord = ""
var targetWord = ""
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
    targetWord = words[Math.floor(Math.random() * words.length)]
    console.log("Words loaded in!")
}

function addButtons(){
    var topKeys = ["Q","W","E","R","T","Y","U","I","O","P",]
    var middleKeys = ["A","S","D","F","G","H","J","K","L"]
    var bottomKeys = ["ENTER","Z","X","C","V","B","N","M","DEL"]
    var arrays = [topKeys, middleKeys, bottomKeys]
    var types = ["buttons-top", "buttons-middle", "buttons-bottom"]
    for(var j = 0; j<3; j++) {
        var currentRow = arrays[j]
        for(var i = 0; i < currentRow.length; i++) {
            var button = document.createElement("button");
            button.innerHTML = currentRow[i];
            button.className = "btn btn-outline-secondary " + currentRow[i];
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
                box.className = "box " + count.toString();
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
                if (currWord.length == 5 && trieData.search(currWord)){
                    processRow(currWord)
                    if (currWord.toLowerCase() == targetWord){
                        console.log("Word found!")
                    }else{
                        if (initialLimit == 30){
                            console.log("Game Over! The word was " + targetWord)
                        }
                        initialLimit = initialLimit + 5;
                        currWord = ""
                    }
                }else{
                    console.log("Not a valid word!")
                }
            }
        });
    }
}

function processRow(word) {
    // 0 - Not found (Grey)
    // 1 - Found but wrong location (Orange)
    // 2 - Found and correct location (Green)
    var colors = [];
    for(var i = 0; i < word.length; i ++){
        colors.push(checkLetter(i, word[i].toLowerCase()));
    }
    changeColors(colors)
    updateKeyboard(word, colors)
    return colors
}

function checkLetter(index, inputChar){
    if (targetWord[index] == inputChar){
        return "green";
    }
    var ret = "grey";
    for(var i = 0; i < targetWord.length; i ++){
        if (inputChar == targetWord[i]){
            ret = "orange"
        }
    }
    return ret;
}

function changeColors(colors){
    var colorIndex = 0;
    for (var start = initialCount - 5; start < initialCount; start++){
        var gridPosition = document.getElementsByClassName("box " + start.toString())[0]
        gridPosition.id = colors[colorIndex]
        colorIndex++;
    }
}

function updateKeyboard(word, colors){
    for (var i = 0; i < word.length; i++){
        var kbPosition = document.getElementsByClassName(word[i].toUpperCase())[0]
        if (kbPosition.id == "green"){
            continue;
        }
        kbPosition.id = colors[i]
    }
}

function enterIntoGrid(index, value) {
    var gridPosition = document.getElementsByClassName("box " + index.toString())[0]
    gridPosition.innerHTML = value;
    currWord = currWord + value
    initialCount = initialCount + 1;
}

function deleteIndex(index) {
    initialCount = index - 1 
    var gridPosition = document.getElementsByClassName("box " + initialCount)[0]
    gridPosition.innerHTML = "";
    currWord = currWord.slice(0, -1)
}

addGrid()
addButtons()
loadValidWords()
listenToUser()