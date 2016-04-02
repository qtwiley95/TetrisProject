//HAVING ISSUES WITH ROTATION, CHECK AT END OF INCREMENT TIME IF ISFALLING NEEDS TO BE SET TO FALSE. #

tetrisGame = {};
 tetrisGame.currentState = [];
 tetrisGame.initialized = false;
 tetrisGame.falling = false;
 tetrisGame.dotLocation = 0;
 tetrisGame.tester = 1;
 tetrisGame.vicrotyPoints = 0;
tetrisGame.AddShape = function(shapeType, position, id)
{
  if (!this.initialized) {this.Initialize();}
   //will clear rows, add vicrotyPoints and push add 10 elements of -1 to currentState
   this.IsRowFull();
  //this will stop anymore shapes from falling when IsTopReached returns true
  if (this.IsTopReached()) {return;}
//TESTING BLOCK
//================
   //position = 0;
   //shapeType = 5;
//================
  AddToConsole("Shape: {"+shapeType+"}  position: {"+position+"}");

//INITIALIZE VARIABLES
  this.rotatePosition = 0;
  this.position = position;
  this.type = shapeType;
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
 this.currentState[this.dotLocation] = this.type;
 this.currentState[this.block2] = this.type;
 this.currentState[this.block3] = this.type;
 this.currentState[this.block4] = this.type;
};//END AddShape




//Continuously called while this.falling == true
tetrisGame.IncrementTime = function()
{
 if (!this.initialized) {this.Initialize();}
 var doneFalling = 0;
//-----------------------------------------------
//-------------DROP SHAPE DOWN 1 ROW-------------
//-----------------------------------------------
   // Set the current position of the dot to be empty
 this.currentState[this.dotLocation] = -1;
 this.currentState[this.block2] = -1;
 this.currentState[this.block3] = -1;
 this.currentState[this.block4] = -1;

//taking easy route and if block is on either side, it will not rotate to ensure it will not go off sides
  if(this.dotLocation %10 < 9 && this.block2 %10 < 9 && this.block3 %10 < 9 && this.block4 %10 < 9)
  {
    if(this.dotLocation % 10 >0 && this.block2 % 10 > 0 && this.block3 % 10 > 0 && this.block4 % 10 > 0)
    {
      this.Rotate()
    }
  }
   // Move the dotLocation
 if (this.currentState[this.dotLocation + 10] == -1 && this.currentState[this.block3+ 10] == -1 && this.currentState[this.block2+ 10] == -1 && this.currentState[this.block4+ 10] == -1)
 {
   this.dotLocation = this.dotLocation + 10;
   this.block2= this.block2+ 10;
   this.block3= this.block3+ 10;
   this.block4= this.block4+ 10;
 } else {
   doneFalling = 1;
 }
   // Set the new current position of the dot to be filled
   //SHIFTRIGHT AND SHIFTLEFT MUST BE CALLED HERE. before x = this.type
   //^^ for effienciencies sake x= this.type was omitted from shift methods
   //this.ShiftRight();
   //this.ShiftLeft();
   if(Math.floor((Math.random() * 10) + 1) > 5){this.ShiftRight();}
   else{this.ShiftLeft();}

   //ERROR CAUSING SOME SHAPES TO NOT ROTATE OR SOMETHING, PRETTY SURE ITS THIS IF-IF CONDITION.
   if(this.dotLocation %10 < 9 && this.block2 %10 < 9 && this.block3 %10 < 9 && this.block4 %10 < 9)
   {
     if(this.dotLocation % 10 >0 && this.block2 % 10 > 0 && this.block3 % 10 > 0 && this.block4 % 10 > 0)
     {
       this.Rotate()
     }
   }
   this.currentState[this.dotLocation] = this.type;
   this.currentState[this.block2] = this.type;
   this.currentState[this.block3] = this.type;
   this.currentState[this.block4] = this.type;
//---------------------------------------------




  this.currentState[this.dotLocation] = -1;
  this.currentState[this.block2] = -1;
  this.currentState[this.block3] = -1;
  this.currentState[this.block4] = -1;
  if (this.currentState[this.dotLocation + 10] == -1 && this.currentState[this.block3+ 10] == -1 && this.currentState[this.block2+ 10] == -1 && this.currentState[this.block4+ 10] == -1)
  {
  }else {
      this.falling = false;
  }
  this.currentState[this.dotLocation] = this.type;
  this.currentState[this.block2] = this.type;
  this.currentState[this.block3] = this.type;
  this.currentState[this.block4] = this.type;

 };//End IncrementTime



tetrisGame.IsRowFull = function() {
var indexer = 0;
var counter = 0;
var rowsFull = [];
  for(var i = 0; i< 20; i++){
    counter = 0;
    for(indexer = i*10; indexer < ((i*10) +10); indexer++){
      if(this.currentState[indexer] == -1){break;}
      else {counter++;}

      if(counter == 10){
        this.currentState.splice((i)*10, 10);
        for(var adding = 0; adding<10; adding++){this.currentState.unshift(-1);}
        this.vicrotyPoints++;
      }
    }
  }
};//FULLY IMPLEMENTED IsRowFull




 tetrisGame.IsTopReached = function() {
   for (i = 0; i < 10; i++) {
     check = 0;
     if (this.currentState[i] != -1) {
       check = 1;
       break;
     }
   }
   return check;
 };//FULLY IMPLEMENTED IsTopReached


 tetrisGame.GetCurrentState = function() {
   if (!this.initialized) {
     this.Initialize();
   }
   return this.currentState;
 };//CAME WITH CODE, LEAVE AS IS

 tetrisGame.IsShapeFalling = function() {
   if (!this.initialized) {
     this.Initialize();
   }
   return tetrisGame.falling;
 };//CAME WITH CODE, LEAVE AS IS

 tetrisGame.Initialize = function() {
   for (var i = 0; i < 10; i++) {
     for (var j = 0; j < 20; j++) {
       this.currentState.push(-1);
     }
   }
   this.initialized = true;
 };//CAME WITH CODE, LEAVE AS IS


//Translation for tetris
tetrisGame.ShiftRight = function(){
  //check if anyblocks are at the edge of board
 if(this.dotLocation % 10 < 9 && this.block2 % 10 < 9 && this.block3%10 < 9 && this.block4%10 < 9){
   //set all blocks to have -1 pos in the array in order to avoid tripping on each others values
    this.currentState[this.dotLocation] = -1;
    this.currentState[this.block2] = -1;
    this.currentState[this.block3] = -1;
    this.currentState[this.block4] = -1;
    if(this.currentState[this.dotLocation+1] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block3+1] == -1 && this.currentState[this.block4+1] == -1){
      this.dotLocation ++;
      this.block2++;
      this.block3++;
      this.block4++;
      //**NOTE**block locations are not set within this method must set them following this method
    }
  }
};//FULLY IMPLEMENTED SHIFTRIGHT

tetrisGame.ShiftLeft = function(){
  if(this.dotLocation % 10 > 0 && this.block2 % 10 > 0 && this.block3%10 > 0 && this.block4%10 > 0){
     this.currentState[this.dotLocation] = -1;
     this.currentState[this.block2] = -1;
     this.currentState[this.block3] = -1;
     this.currentState[this.block4] = -1;
     if(this.currentState[this.dotLocation-1] == -1 && this.currentState[this.block2-1] == -1 && this.currentState[this.block3-1] == -1 && this.currentState[this.block4-1] == -1){
       this.dotLocation --;
       this.block2--;
       this.block3--;
       this.block4--;
     }
   }
};//FULLY IMPLEMENTED SHIFTLEFT



//Rotation
//SEMI FUNCTIONAL
//before calling rotate incluce the following line:
/*
if(this.dotLocation %10 < 9 && this.block2 %10 < 9 && this.block3 %10 < 9 && this.block4 %10 < 9)
{
  if(this.dotLocation % 10 >0 && this.block2 % 10 > 0 && this.block3 % 10 > 0 && this.block4 % 10 > 0)
  {this.Rotate()}
}
*/
tetrisGame.Rotate = function()
{
  if(this.dotLocation > 10)//will gaurantee shapes dont rotate and go above array
  {
    //set all active blocks to empty elements to avoid tripping over themselves
    this.currentState[this.dotLocation] = -1;
    this.currentState[this.block2] = -1;
    this.currentState[this.block3] = -1;
    this.currentState[this.block4] = -1;
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
    else
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
            this.block3 = this.block2-11;
            this.block4 = this.block2+10;
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







// console.log(tetrisGame.currentState);
