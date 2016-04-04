//Author: Quinton Wiley
//Date: 2 April 2016
tetrisGame = {};
 tetrisGame.currentState = [];
 tetrisGame.initialized = false;
 tetrisGame.falling = false;
 tetrisGame.dotLocation = 0;
 tetrisGame.victoryPoints = 0;
 tetrisGame.printOnce = 1;
 tetrisGame.columnHeights = new Array(10);
 AddToConsole("=============BEGIN GAME=============");

tetrisGame.AddShape = function(shapeType, position, id)
{
  if (!this.initialized) {this.Initialize();}
  //will clear rows, add victoryPoints and push add 10 elements of -1 to currentState
  this.IsRowFull();
  //this will stop anymore shapes from falling when IsTopReached returns true
  if (this.IsTopReached())
  {
    if(this.printOnce)
    {
      AddToConsole("=============GAME OVER=============");
      AddToConsole("Congratulations, You Scored "+this.victoryPoints+" Point(s)!");
      AddToConsole("=====================================");
      this.printOnce--;
    }
    return;
  }
  //INITIALIZE VARIABLES
  this.secondLoop = 0;//used to call optimize in the second call of increment time
  this.rotatePosition = 0;//keeps track of the current shapes rotational alignment
  this.position = position;//allows position to be accessed in different methods of tetrisGame
  this.type = shapeType;//allows type to be accessed in different methods of tetrisGame
  this.dotLocation = position;
  this.block2;
  this.block3;
  this.block4;
  //------------------------------------------------------
  //----------SET UP BLOCKS RELATIVE TO POSITION----------
  //------------------------------------------------------
  if(this.type == 0){
    this.block2= position+1;
    this.block3= position+2;
     this.block4= position+3;}
  else if (this.type == 1) {
     this.block2= position + 1;
     this.block3= position + 2;
     this.block4= position + 11;}
     else if (this.type == 2) {
     this.block2= position + 1;
     this.block3= position + 11;
     this.block4= position + 12;
  } else if (this.type == 3) {
     this.dotLocation= position+10;
     this.block2= position + 1;
     this.block3= position + 2;
     this.block4= position + 11;
  } else if (this.type == 4) {
     this.block2= position + 1;
     this.block3= position + 10;
     this.block4= position + 11;
  } else if (this.type == 5) {
     this.block2= position + 10;
     this.block3= position + 11;
     this.block4= position + 12;
  } else if (this.type == 6) {
     this.block2= position + 1;
     this.block3= position + 2;
     this.block4= position + 10;
  }
  //-------------BLOCKS SET-----------------

  this.falling = true;
  this.SetBlocks();//set blocks to their type
};//END AddShape

//Continuously called while this.falling == true
tetrisGame.IncrementTime = function()
{
    if (!this.initialized) {this.Initialize();}
    // Set the current position of the dot to be empty
    if(this.secondLoop == 1)
    {//optimize will align the shape to the best position to falling
      //called in second call of IncrementTime to make sure that shape can rotate freely
      this.Optimize();
    }

    //-------------DROP SHAPE DOWN 1 ROW-------------
    this.UnsetBlocks();//sets currentState[x] = -1 to avoid falsely calculating whether done falling
    if (this.currentState[this.dotLocation + 10] == -1 && this.currentState[this.block3+ 10] == -1 && this.currentState[this.block2+ 10] == -1 && this.currentState[this.block4+ 10] == -1)
    {
      this.dotLocation = this.dotLocation + 10;
      this.block2= this.block2+ 10;
      this.block3= this.block3+ 10;
      this.block4= this.block4+ 10;
    }
    else//if it would fall in another shape or out of the array then it is done falling
    {this.falling = false;}
    this.SetBlocks();//sets currentState[x] = type for the new positions of blocks
    this.secondLoop++;
  //---------------------------------------------
};//End IncrementTime

//unset condense code for all the times have to set currState[all blocks] = -1
tetrisGame.UnsetBlocks = function()//FULLY FUNCTIONAL
{
  this.currentState[this.dotLocation] = -1;
  this.currentState[this.block2] = -1;
  this.currentState[this.block3] = -1;
  this.currentState[this.block4] = -1;
};
//set condenses code for all times have to set currState[all blocks] = shapeType
tetrisGame.SetBlocks = function()//FULLY FUNCTIONAL
{
  this.currentState[this.dotLocation] = this.type;
  this.currentState[this.block2] = this.type;
  this.currentState[this.block3] = this.type;
  this.currentState[this.block4] = this.type;
};

//will remove any row that is completely full, then push in another row of empty elements
//..to the begining and then add a victory point
tetrisGame.IsRowFull = function()//FULLY FUNCTIONAL
{
  var indexer = 0;
  var counter = 0;
  var rowsFull = [];
  for(var i = 0; i< 20; i++){//increment for each row
    counter = 0;
    //index thru each row, i*10 = current row begining
    for(indexer = i*10; indexer < ((i*10) +10); indexer++)
    {
      if(this.currentState[indexer] == -1){break;}//stop if any value in row is -1
      else {counter++;}

      if(counter == 10){
        this.victoryPoints++;
        this.currentState.splice((i)*10, 10);
        for(var adding = 0; adding<10; adding++){this.currentState.unshift(-1);}
      }
    }
  }
};//FULLY IMPLEMENTED IsRowFull

//returns 1 if any of the top row elements are non -1
tetrisGame.IsTopReached = function()//FULLY FUNCTIONAL
{
  for (i = 0; i < 10; i++) {
    topHit = 0;
    if (this.currentState[i] != -1){
      topHit = 1;
      break;
    }
  }
  return topHit;
};//FULLY IMPLEMENTED IsTopReached

 tetrisGame.GetCurrentState = function()//FULLY FUNCTIONAL
 {
   if (!this.initialized) {
     this.Initialize();
   }
   return this.currentState;
 };//CAME WITH CODE, LEAVE AS IS

 tetrisGame.IsShapeFalling = function()//FULLY FUNCTIONAL
 {
   if (!this.initialized) {
     this.Initialize();
   }
   return tetrisGame.falling;
 };//CAME WITH CODE, LEAVE AS IS

 tetrisGame.Initialize = function()//FULLY FUNCTIONAL
 {
   for (var i = 0; i < 10; i++) {
     for (var j = 0; j < 20; j++) {
       this.currentState.push(-1);
     }
   }
   this.initialized = true;
 };//CAME WITH CODE, LEAVE AS IS


//Translation for tetris
//will not shift if another block is in the way, or if it is to go off the edge of array
tetrisGame.ShiftRight = function()//FULLY FUNCTIONAL
{
  //check if anyblocks are at the edge of board
 if(this.dotLocation % 10 < 9 && this.block2 % 10 < 9 && this.block3%10 < 9 && this.block4%10 < 9){
   //set all blocks to have -1 pos in the array in order to avoid tripping on each others values
    this.UnsetBlocks();
    if(this.currentState[this.dotLocation+1] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block3+1] == -1 && this.currentState[this.block4+1] == -1){
      this.dotLocation ++;
      this.block2++;
      this.block3++;
      this.block4++;
      //**NOTE**block locations are not set within this method must set them following this method
    }
  }
  this.SetBlocks();
};//FULLY IMPLEMENTED SHIFTRIGHT

tetrisGame.ShiftLeft = function()//FULLY FUNCTIONAL
{
  if(this.dotLocation % 10 > 0 && this.block2 % 10 > 0 && this.block3%10 > 0 && this.block4%10 > 0){
     this.UnsetBlocks();
     if(this.currentState[this.dotLocation-1] == -1 && this.currentState[this.block2-1] == -1 && this.currentState[this.block3-1] == -1 && this.currentState[this.block4-1] == -1){
       this.dotLocation --;
       this.block2--;
       this.block3--;
       this.block4--;
     }
   }
};//FULLY IMPLEMENTED SHIFTLEFT

//Rotation
//depending on the shape it will rotate through its 4 positions
//this method will not rotate if another shape is in the way
//but will not check if it is rotating off the edge
tetrisGame.Rotate = function()//FULLY FUNCTIONAL
{
  if(this.dotLocation > 10)//will gaurantee shapes dont rotate and go above array
  {
    //set all active blocks to empty elements to avoid tripping over themselves
    this.UnsetBlocks();
    var didRotate = 0;
    if(this.type == 0)//
    {
      if(this.rotatePosition == 0)
      {
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1 && this.currentState[this.block2+20] == -1)//see if new rotate hits other shapes
        {
          this.dotLocation = this.dotLocation+21;
          this.block2 = this.block2+10;
          this.block3 = this.block3-1;
          this.block4 = this.block4-12;
          this.rotatePosition = 1;
        }

      }
      else if(this.rotatePosition == 1)
      {
        if(this.currentState[this.block2-1] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block2+2] == -1)//see if new rotate hits other shapes
        {
          this.dotLocation = this.dotLocation-8;
          this.block2 = this.block2+1;
          this.block3 = this.block3+10;
          this.block4 = this.block4+19;
          this.rotatePosition = 2;
        }

      }
      else if(this.rotatePosition == 2)
      {
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2-20] == -1 && this.currentState[this.block2+10] == -1)//see if new rotate hits other shapes
        {
          this.dotLocation = this.dotLocation-21;
          this.block2 = this.block2-10;
          this.block3 = this.block3+1;
          this.block4 = this.block4+12;
          this.rotatePosition = 3;
        }
      }
      else if(this.rotatePosition == 3)
      {
        if(this.currentState[this.block2-2] == -1 && this.currentState[this.block2-1] == -1 && this.currentState[this.block2+1] == -1)//see if new rotate hits other shapes
        {
          this.dotLocation = this.dotLocation+8;
          this.block2 = this.block2-1;
          this.block3 = this.block3-10;
          this.block4 = this.block4-19;
          this.rotatePosition = 0;
        }
      }
    }//END TYPE == 0 NEED TO TEST FUNCTIONALITY
    else if(this.type == 1)
    {
      if(this.rotatePosition == 0)
      {//if i check all adjacent elements to block2 i will cover all rotation possibilities
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block2-1] == -1)//see if new rotate hits other shapes
        {//Block2 does not change location. base other blocks off of Block2
          this.dotLocation = this.block2+10;
          this.block3 = this.block2-10;
          this.block4 = this.block2+1;
          this.rotatePosition = 1;
        }
      }
      else if(this.rotatePosition == 1)
      {
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block2-1] == -1)//see if new rotate hits other shapes
        {//Block2 does not change location. base other blocks off of Block2
          this.dotLocation = this.block2+1;
          this.block3 = this.block2-1;
          this.block4 = this.block2-10;
          this.rotatePosition = 2;
        }
      }
      else if(this.rotatePosition == 2)
      {
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block2-1] == -1)//see if new rotate hits other shapes
        {//Block2 does not change location. base other blocks off of Block2
          this.dotLocation = this.block2-10;
          this.block3 = this.block2+10;
          this.block4 = this.block2-1;
          this.rotatePosition = 3;
        }
      }
      else if(this.rotatePosition == 3)
      {
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block2-1] == -1)//see if new rotate hits other shapes
          {//Block2 does not change location. base other blocks off of Block2
            this.dotLocation = this.block2-1;
            this.block3 = this.block2+1;
            this.block4 = this.block2+10;
            this.rotatePosition = 0;
          }
      }
    }//END TYPE == 1 NEED TO TEST FUNCTIONALITY
    else if(this.type == 2)
    {
      if(this.rotatePosition == 0)
      {
        if(this.currentState[this.block3+10] == -1 && this.currentState[this.block3-9] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block3
              this.dotLocation = this.block3-9;
              this.block2 = this.block3+1;
              this.block4 = this.block3+10;
              this.rotatePosition = 1;
          }
      }
      else if(this.rotatePosition == 1)
      {
        if(this.currentState[this.block3-1] == -1 && this.currentState[this.block3+11] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block3
              this.dotLocation = this.block3+11;
              this.block2 = this.block3+10;
              this.block4 = this.block3-1;
              this.rotatePosition = 2;
          }
      }
      else if(this.rotatePosition == 2)
      {
        if(this.currentState[this.block3+1] == -1 && this.currentState[this.block3-9] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block3
              this.dotLocation = this.block3+9;
              this.block2 = this.block3-1;
              this.block4 = this.block3-10;
              this.rotatePosition = 3;
          }
      }
      else if(this.rotatePosition == 3)
      {
        if(this.currentState[this.block3-11] == -1 && this.currentState[this.block3+1] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block3
              this.dotLocation = this.block3-11;
              this.block2 = this.block3-10;
              this.block4 = this.block3+1;
              this.rotatePosition = 0;
          }
      }
    }
    else if(this.type == 3)
    {
      if(this.rotatePosition == 0)
      {
        if(this.currentState[this.block4+11] == -1 && this.currentState[this.block4+1] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block4
              this.dotLocation = this.block4-10;
              this.block2 = this.block4+1;
              this.block3 = this.block4+11;
              this.rotatePosition = 1;
          }
      }
      else if(this.rotatePosition == 1)
      {
        if(this.currentState[this.block4+9] == -1 && this.currentState[this.block4+10] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block4
              this.dotLocation = this.block4+1;
              this.block2 = this.block4+10;
              this.block3 = this.block4+9;
              this.rotatePosition = 2;
          }

      }
      else if(this.rotatePosition == 2)
      {
        if(this.currentState[this.block4-9] == -1 && this.currentState[this.block4+10] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block4
              this.dotLocation = this.block4+10;
              this.block2 = this.block4-1;
              this.block3 = this.block4-11;
              this.rotatePosition = 3;
          }

      }
      else if(this.rotatePosition == 3)
      {
        if(this.currentState[this.block4-9] == -1 && this.currentState[this.block4-10] == -1)//see if new rotate hits other shapes
          {//make all new pos relative to block4
              this.dotLocation = this.block4-1;
              this.block2 = this.block4-10;
              this.block3 = this.block4-9;
              this.rotatePosition = 0;
          }

      }
    }
    else if(this.type == 4)
    {}//NEEDS No rotation effect
    else if(this.type == 5)
    {
      if(this.rotatePosition == 0)
      {
        if(this.currentState[this.block3-10] == -1 && this.currentState[this.block3-9] == -1 && this.currentState[this.block3+10] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block3
            this.dotLocation = this.block3-9;
            this.block2 = this.block3-10;
            this.block4 = this.block3+10;
            this.rotatePosition = 1;
        }
      }
      else if(this.rotatePosition == 1)
      {
        if(this.currentState[this.block3-1] == -1 && this.currentState[this.block3+1] == -1 && this.currentState[this.block3+11] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block3
            this.dotLocation = this.block3+11;
            this.block2 = this.block3+1;
            this.block4 = this.block3-1;
            this.rotatePosition = 2;
        }
      }
      else if(this.rotatePosition == 2)
      {
        if(this.currentState[this.block3-10] == -1 && this.currentState[this.block3+10] == -1 && this.currentState[this.block3+9] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block3
            this.dotLocation = this.block3+9;
            this.block2 = this.block3+10;
            this.block4 = this.block3-10;
            this.rotatePosition = 3;
        }
      }
      else if(this.rotatePosition == 3)
      {
        if(this.currentState[this.block3-1] == -1 && this.currentState[this.block3-11] == -1 && this.currentState[this.block3+1] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block3
            this.dotLocation = this.block3-11;
            this.block2 = this.block3-1;
            this.block4 = this.block3+1;
            this.rotatePosition = 0;
        }
      }
    }
    else//type == 6
    {
      if(this.rotatePosition == 0)
      {
        if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+11] == -1 && this.currentState[this.block2+10] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block2
            this.dotLocation = this.block2+10;
            this.block3 = this.block2-10;
            this.block4 = this.block2+11;
            this.rotatePosition = 1;
        }
      }
      else if(this.rotatePosition == 1)
      {
        if(this.currentState[this.block2-1] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block2-9] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block2
            this.dotLocation = this.block2+1;
            this.block3 = this.block2-1;
            this.block4 = this.block2-9;
            this.rotatePosition = 2;
        }
      }
      else if(this.rotatePosition == 2)
      {
        if(this.currentState[this.block2-11] == -1 && this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block2
            this.dotLocation = this.block2-10;
            this.block3 = this.block2+10;
            this.block4 = this.block2-11;
            this.rotatePosition = 3;
        }
      }
      else if(this.rotatePosition == 3)
      {
        if(this.currentState[this.block2-1] == -1 && this.currentState[this.block2+9] == -1 && this.currentState[this.block2+1] == -1)//see if new rotate hits other shapes
        {//make all new pos relative to block2
            this.dotLocation = this.block2-1;
            this.block3 = this.block2+1;
            this.block4 = this.block2+9;
            this.rotatePosition = 0;
        }
      }
    }
  }
};

//Optimization
//runs ColumnHeight() then uses that data to determine best position for the current
//..shape that is falling and rotates/shifts the shape to the desired location
//..then let it fall freely

//call this method once per shape, and only in the second call of IncrementTime()
tetrisGame.Optimize = function()//FULLY FUNCTIONAL
{
  this.UnsetBlocks();
  this.ColumnHeight();
  //find minimum value
  var minimum = this.columnHeights[0];//lowest value of all columns
  var prev_position = 0;//previous target position
  var position = 0;//this will be the target position of the blocks
  var min_row = 1;//how many minimum heights in a row
  var stop = 0;//flag variable
  var loops = 0;//increment variable
  var pinPoint = this.block2;//will be set to specific blocks in paticular shape to determine best position.
  for(var i = 0; i < 10; i++)//finds the minimum column height
  {
    if(this.columnHeights[i] < minimum)
    {
      minimum = this.columnHeights[i];
      prev_position = position;
      position = i;
    }
  }
  var indexing = position;
  //
  while(indexing < 10 && stop == 0)//gets the amount of minimums in a row
  {
    if(this.columnHeights[indexing] == this.columnHeights[indexing+1])
    {min_row++;}
    else
    {stop = 1;}
    indexing++;
  }

  //move shape towards middle so that it will be able to rotate if it was positioned on edge
  if(this.dotLocation%10 < 5)
  {
    this.ShiftRight();
    this.ShiftRight();
  }
  else
  {
    this.ShiftLeft();
    this.ShiftLeft();
  }

  //==============NOTE===============
  //Valuable lesson, pinPoint will not auto update to the desired blocks new position after rotation,
  //..must reset it after rotation and continually update pinpoint in while loop to keep up with the
  //..desired blocks new position after moving

  //in the following if-else block: depending on the shape and the position the blocks will be
  //..rotated and shifted to fit the circumstances of the desired position
  if(this.type == 0)
  {
    if(min_row < 4)
    {
      this.Rotate();
    }
    while(loops < 9 && this.dotLocation%10 != position)
    {//will keep moving block till the actual position and the desired position are aligned
      if(this.dotLocation%10 < position)
      {this.ShiftRight();}
      else if(this.dotLocation%10 > position)
      {this.ShiftLeft();}
      else{loops = 99}
      loops++;
    }
  }
  else if(this.type == 1)
  {
  pinPoint = this.block2;
    if(min_row > 2)
    {
      this.Rotate();
      this.Rotate();
      pinPoint = this.block3;
    }
    else
    {
      if(position == 0)
      {
        this.Rotate();
      }
      else if(position == 9)
      {
        this.Rotate();
        this.Rotate();
        this.Rotate();
      }
    }

    while(loops < 9 && pinPoint%10 != position)
    {
      if(pinPoint%10 < position)
      {this.ShiftRight();}
      else if(pinPoint%10 > position)
      {this.ShiftLeft();}
      else{loops = 99}
      if(min_row > 2)
      {pinPoint = this.block3;}
      else
      {pinPoint = this.block2;}
      loops++;
    }
  }
  else if(this.type == 2)
  {
    //if the col height before minimum is +1 from minimum then put on 2 side
    if(position != 9)
    {
      if(min_row > 1)
      {
        pinPoint = this.block2;
      }
      else
      {
        this.Rotate();
        pinPoint = this.block4;
      }
    }
    else
    {
      position = prev_position;
      this.Rotate();
      pinPoint = this.block4;
    }

    while(loops < 9 && pinPoint%10 != position)
    {
      if(pinPoint%10 < position)
      {this.ShiftRight();}
      else if(pinPoint%10 > position)
      {this.ShiftLeft();}
      else{loops = 99}
      if(min_row > 1 && position != 9)
      {pinPoint = this.block2;}
      else{pinPoint = this.block4;}
      loops++;
    }
  }
  else if(this.type == 3)
  {
    //if the col height before minimum is +1 from minimum then put on 2 side
    if(position != 0)
    {
      if(min_row > 1)
      {
        pinPoint = this.dotLocation;
      }
      else
      {
        this.Rotate();
        pinPoint = this.block3;
      }
    }
    else //position == 0
    {
      position = prev_position;
      pinPoint = this.block3;
    }

    while(loops < 9 && pinPoint%10 != position)
    {
      if(pinPoint%10 < position)
      {this.ShiftRight();}
      else if(pinPoint%10 > position)
      {this.ShiftLeft();}
      else{loops = 99}
      if(min_row > 1 && position != 0)
      {pinPoint = this.dotLocation;}
      else{pinPoint = this.block3;}
      loops++;
    }
  }
  else if(this.type == 4)
  {
    if(min_row == 1)
    {
      //position = prev_position;
      //position = Math.floor((Math.random() * 10));
    }

    while(loops < 9 && this.dotLocation%10 != position)
    {
      if(this.dotLocation%10 < position)
      {this.ShiftRight();}
      else
      {this.ShiftLeft();}
      loops++;
    }
  }
  else if(this.type == 5)
  {
    if(position != 9)
    {
      if(min_row > 2)
      {}
      else if(min_row > 1)
      {
        this.Rotate();
        this.Rotate();
        this.Rotate();
        pinPoint = this.dotLocation;
      }
      else
      {this.Rotate();
        pinPoint = this.block2;
      }
    }
    else//position == 9
    {
      this.Rotate();
      this.Rotate();
      pinPoint = this.dotLocation;
    }

    while(loops < 9 && pinPoint%10 != position)
    {
      if(pinPoint%10 < position)
      {this.ShiftRight();}
      else if(pinPoint%10 > position)
      {this.ShiftLeft();}
      else{loops = 99}
      if(min_row == 2 || position == 9)
      {pinPoint = this.dotLocation}
      else{pinPoint = this.block2;}
      loops++;
    }
  }
  else//type == 6
  {
    var dummy = 0;
    if(min_row > 2)
    {
      this.Rotate();
      this.Rotate();
      pinPoint = this.block3;
    }
    else if(min_row == 2)
    {
      this.Rotate();
      pinPoint = this.dotLocation;
    }
    else if(position != 0) //min_row == 1
    {
      this.Rotate();
      this.Rotate();
      this.Rotate();
      pinPoint = this.block3;
    }
    else {
      //use position 0
      pinPoint = this.dotLocation;
      dummy = 1;stop
    }

    while(loops < 9 && pinPoint%10 != position)
    {
      if(pinPoint%10 < position)
      {this.ShiftRight();}
      else if(pinPoint%10 > position)
      {this.ShiftLeft();}
      else{loops = 99}
      if(min_row == 2 || dummy == 1)
      {pinPoint = this.dotLocation;}
      else{pinPoint = this.block3;}
      loops++;
    }
  }

  this.SetBlocks();
};

//finds heighest non -1 value in each collumn and saves heighest row of each col
//  into tetrisGame.columnHeights
//thought: use this to roughly determine best position for current block;
tetrisGame.ColumnHeight = function()//FULLY FUNCTIONAL
{
	var height = 20;// height of each column
  var i, j;
	for(var filler = 0; filler < this.columnHeights.length; filler++){
		this.columnHeights[filler] = 0;//initialize all entries to 0
	}
	for(i = 0; i < 10; i++){//i = # of columns
	  j=i;
	  while(j< 200){
	    if(this.currentState[j] != -1){
        //overwrite the values of columnHeights to the new heights
	      this.columnHeights[i] = height - Math.floor(j / 10);
	      j += 10;
	      break;
	    }
	    j += 10;
	  }
	}
};//END COLUMNHEIGHT()
