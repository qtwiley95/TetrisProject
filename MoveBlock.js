//Translation for tetris
tetrisGame.ShiftRight = function()
{
 if(this.dotLocation % 10 < 9 && this.block2 % 10 < 9 && this.block3%10 < 9 && this.block4%10 < 9)
  {
    this.currentState[this.dotLocation] = -1;
    this.currentState[this.block2] = -1;
    this.currentState[this.block3] = -1;
    this.currentState[this.block4] = -1;
    //AddToConsole(this.currentState[this.block4+1]);
    if(this.currentState[this.dotLocation+1] == -1 && this.currentState[this.block2+1] == -1 && this.currentState[this.block3+1] == -1 && this.currentState[this.block4+1] == -1)
    {
      this.dotLocation ++;
      this.block2++;
      this.block3++;
      this.block4++;
    }
  }
};

//FULLY IMPLEMENTED

tetrisGame.ShiftLeft = function()
{
  if(this.dotLocation % 10 > 0 && this.block2 % 10 > 0 && this.block3%10 > 0 && this.block4%10 > 0)
   {
     this.currentState[this.dotLocation] = -1;
     this.currentState[this.block2] = -1;
     this.currentState[this.block3] = -1;
     this.currentState[this.block4] = -1;
     //AddToConsole(this.currentState[this.block4+1]);
     if(this.currentState[this.dotLocation-1] == -1 && this.currentState[this.block2-1] == -1 && this.currentState[this.block3-1] == -1 && this.currentState[this.block4-1] == -1)
     {
       this.dotLocation --;
       this.block2--;
       this.block3--;
       this.block4--;
     }
   }
};
