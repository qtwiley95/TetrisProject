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
