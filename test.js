var puzzle = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
var knownPuzzles = [];
var completed = 0;
var valid = 0;
fs = require("fs");

findSolvable(puzzle);

// fs.writeFileSync("puzzles.txt", knownPuzzles);

for(var i = 0; i < knownPuzzles.length; i++){
	fs.appendFile("puzzles.txt", knownPuzzles[i]);
}


function cascade(arr, position){
	var pos = position.split("-");
	for(var i = 0; i < pos.length; i++){
		pos[i] = parseInt(pos[i]);
	}
	arr[pos[0]][pos[1]] = (arr[pos[0]][pos[1]] + 1) % 2;
	if(pos[1] > 0){
		arr[pos[0]][pos[1] - 1] = (arr[pos[0]][pos[1] - 1] + 1) % 2;
	}
	if(pos[1] + 1 < arr[pos[0]].length){
		arr[pos[0]][pos[1] + 1] = (arr[pos[0]][pos[1] + 1] + 1) % 2;
	}
	if(pos[0] > 0){
		arr[pos[0] - 1][pos[1]] = (arr[pos[0] - 1][pos[1]] + 1) % 2;
	}
	if(pos[0] + 1 < arr.length){
		arr[pos[0] + 1][pos[1]] = (arr[pos[0] + 1][pos[1]] + 1) % 2;
	}
	// for(var i = 0; i < puzzle[pos[0]].length; i ++){
	// 	if(puzzle[pos[0]][i]){
	// 		puzzle[pos[0]][i] = 0;
	// 	}
	// 	else{
	// 		puzzle[pos[0]][i] = 1;
	// 	}
	// }
	//
	// for(var i = 0; i < puzzle.length; i++){
	// 	if(i.toString() === pos[0]){
	// 		continue;
	// 	}
	// 	if(puzzle[i][pos[1]]){
	// 		puzzle[i][pos[1]] = 0;
	// 	}
	// 	else{
	// 		puzzle[i][pos[1]] = 1;
	// 	}
	// }
}

function solvePuzzle(arr){
	var rows = arr.length;
	var columns = arr[0].length;
	var cleared = 0;
	while(cleared < 5){
		cleared = 0;
		for(var i = 0; i < rows - 1; i++){
			for(var j = 0; j < columns; j++){
				if(arr[i][j] === 1){
					var cRow = i + 1;
					var cascadePos = cRow + "-" + j;
					cascade(arr, cascadePos);
				}
			}
		}

		for(var i = 0; i < rows; i++){
			if(!arr[i].includes(1)){
				cleared++;
			}
		}

		if(arr[4][0]){
			cascade(arr, "0-3");
			cascade(arr, "0-4");
		}
		else if(arr[4][1]){
			cascade(arr, "0-1");
			cascade(arr, "0-4");
		}
		else if(arr[4][2]){
			cascade(arr, "0-3")
		}
		else if(arr[4][3] || arr[4][4]){
			return false;
		}
	}
	return true;
}

function findSolvable(arr, row = 0, col = 0){
	if(row === arr.length){
		var fArr = []
		for(var i = 0; i < arr.length; i++){
			fArr.push(arr[i].slice());
		}
		if(solvePuzzle(fArr)){
			knownPuzzles.push(arr);
			console.log("Solved puzzles: " + valid++)
		}
		console.log(completed++)
		return;
	}

	var arr1 = [];
	var arr2 = [];
	for(var i = 0; i < arr.length; i++){
		arr1.push(arr[i].slice());
		arr2.push(arr[i].slice());
	}

	arr2[row][col] = 1;

	if(col === arr[row].length - 1){
		row++;
		col = 0;
	}
	else {
		col++
	}

	findSolvable(arr1, row, col);
	findSolvable(arr2, row, col);

}
