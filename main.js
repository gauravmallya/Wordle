function addButtons(){
    var topKeys = ["Q","W","E","R","T","Y","U","I","O","P"]
    var middleKeys = ["A","S","D","F","G","H","I","J","K","L"]
    var bottomKeys = ["Z","X","C","V","B","N","M"]
    arrays = [topKeys, middleKeys, bottomKeys]
    types = ["buttons-top", "buttons-middle", "buttons-bottom"]
    for(j = 0; j<3; j++) {
        var currentRow = arrays[j]
        for(i = 0; i < currentRow.length; i++) {
            var button = document.createElement("button");
            button.innerHTML = currentRow[i];
            button.className = "btn btn-outline-success";
            var buttonDiv = document.getElementById(types[j]);
            buttonDiv.appendChild(button);
        }
    }
}

function addGrid(){
    
    types = ["first", "second", "third", "fourth", "fifth", "sixth"]
    for(j = 0; j<6; j++) {
        for(i = 0; i < 6; i++) {
            var row = document.createElement("div");
            row.innerHTML = "a";
            row.className = "col border";
            var rowDiv = document.getElementById(types[j]);
            rowDiv.appendChild(row);
        }
    }
}

addGrid()
addButtons()