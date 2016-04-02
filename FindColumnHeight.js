tetrisGame.ColumnHeight = function(){
	var height = 20;
  var i, j;
	tetrisGame.columnHeights = new Array(10);
	for(var filler = 0; filler < tetrisGame.columnHeights.length; filler++){
		tetrisGame.columnHeights[filler] = 0;
	}
	//console.log(tetrisGame.columnHeights);
	for(i = 0; i < 10; i++){
	  j=i;
	  while(j + 10 < 200){
	    if(tetrisGame.currentState[j] != -1){
	    	//console.log("non -1 value at height {"+j+"}" + "j/ = "+Math.floor(j/10));
	    	//console.log("found a non -1 value: " +tetrisGame.currentState[j]);
	      	tetrisGame.columnHeights[i] = height - Math.floor(j / 10);
	      	j += 10;
	      	break;
	    }
	    j += 10;
	  }
	}
};

//Successfully Implemented
//no Params
//finds heighest non -1 value in each collumn and saves heighest row of each col
//  into tetrisGame.columnHeights


//thought: use this to roughly determine best position for current block;
