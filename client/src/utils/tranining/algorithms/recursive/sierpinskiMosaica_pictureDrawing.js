// reference: https://www.khanacademy.org/computer-programming/sierpinski-mosaica/6518642552471552                                      /*-*-*Sierpinski gasket*-*-*/


//First we translate the matrix to make the task easier!
translate(width/2, height/2);

//some configurations(you can copy this 4 lines and paste them just before any call to the mosaic function so that you can personalise it):
var trianglesColor = color(197, 241, 250);//change the triangles color here!
var interspaceColor = color(52, 145, 68);//change the interspace color here!
var depth = 6;//change the depth of the recursion here!
rotate(0);//roate it if you want! (in degrees and clockwise around the center of the canvas)

//defining the square object constructor:
var Square = function (x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
};

//defining the square drawing prototype:
Square.prototype.draw = function() {
     rect(this.x, this.y, this.side, this.side);
};

//defining the recursive dividing algorithm(divide the upper left, upper right and lower right squares):
Square.prototype.divide = function() {
    rectMode(CENTER);
   var frac1 = new Square(this.x-this.side/4, this.y-this.side/4, this.side/2); //UL
   var frac2 = new Square(this.x+this.side/4, this.y-this.side/4, this.side/2); //UR
   var frac3 = new Square(this.x+this.side/4, this.y+this.side/4, this.side/2); //LR
   var frac4 = new Square(this.x-this.side/4, this.y+this.side/4, this.side/2); //LL (define it to fill in it)
   noStroke();
   fill(interspaceColor);
   frac1.draw();
   frac2.draw();
   frac3.draw();
   stroke(trianglesColor);
   fill(trianglesColor); //we fill in the fourth fractional square to produce the nice triangles!
   frac4.draw();
   var x =height/pow(2,depth);
   if (this.side >x) {
       frac1.divide();
       frac2.divide();
       frac3.divide();
   }
};

//and finally the Sierpinski gasket function:
var mosaic = function(x, y, side) {
   var square0 = new Square(x, y, side);
   square0.divide();
};

//test it!
mosaic(0, 0, 400);

                                /*__***-***thanks***-***__*/
                             /*If you like it vote up please!*/









