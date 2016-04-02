//Rotation
//NOT FUNCTIONAL

tetrisGame.Rotate = function()
{
  if(this.dotLocation > 10)
  {
    //set all active blocks to empty elements to avoid tripping over themselves
    this.currentState[this.dotLocation] = -1;
    this.currentState[this.block2] = -1;
    this.currentState[this.block3] = -1;
    this.currentState[this.block4] = -1;
    var didRotate = 0;
    if(this.type == 0)
    {
      if(this.rotatePosition == 0)
      {
        if(this.dotLocation - 10 > 0)//check to see if new rotate will be inbounds
        {
          AddToConsole(this.dotLocation-10);
          if(this.currentState[this.block2-10] == -1 && this.currentState[this.block2+10] == -1 && this.currentState[this.block2+20] == -1)//see if new rotate hits other shapes
          {
            this.dotLocation = this.dotLocation+21;
            this.block2 = this.block2+10;
            this.block3 = this.block3-1;
            this.block4 = this.block4-12;
            didRotate = 1;
          }
        }
      }
      else if (this.rotatePosition == 1)
      {

      }
      else if (this.rotatePosition == 2)
      {

      }
      else if (this.rotatePosition == 3)
      {

      }
    }
    elseif(this.type == 1)
    {
      if(this.rotatePosition == 0)
      {

      }
      else if (this.rotatePosition == 1)
      {

      }
      else if (this.rotatePosition == 2)
      {

      }
      else if (this.rotatePosition == 3)
      {

      }

    }
    elseif(this.type == 2)
    {
      if(this.rotatePosition == 0)
      {

      }
      else if (this.rotatePosition == 1)
      {

      }
      else if (this.rotatePosition == 2)
      {

      }
      else if (this.rotatePosition == 3)
      {

      }

    }
    elseif(this.type == 3)
    {
      if(this.rotatePosition == 0)
      {

      }
      else if (this.rotatePosition == 1)
      {

      }
      else if (this.rotatePosition == 2)
      {

      }
      else if (this.rotatePosition == 3)
      {

      }

    }
    elseif(this.type == 4)
    {}//rotate does not affect shapeType: 4
    elseif(this.type == 5)
    {
      if(this.rotatePosition == 0)
      {

      }
      else if (this.rotatePosition == 1)
      {

      }
      else if (this.rotatePosition == 2)
      {

      }
      else if (this.rotatePosition == 3)
      {

      }

    }
    elseif(this.type == 6)
    {
      if(this.rotatePosition == 0)
      {

      }
      else if (this.rotatePosition == 1)
      {

      }
      else if (this.rotatePosition == 2)
      {

      }
      else if (this.rotatePosition == 3)
      {

      }

    }

    AddToConsole("almost end");

    if(didRotate == 1)
    {
      this.rotatePosition++;
      if(this.rotatePosition == 4){this.rotatePosition = 0;}
    }

    AddToConsole("ENENENEND");
  }
};
