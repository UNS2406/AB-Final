class Bird extends BaseClass {
  constructor(x, y) {
    super(x, y, 50, 50);
    this.image = loadImage("sprites/bird.png");

    this.trajectory = []; //empty array 
    this.smokeImage = loadImage("sprites/smoke.png");

    /* //sample array
     var sample = [65, 324436, "AVANI", [555, 777], 34, 980, "uttara"];

     //push(): Add items to the end of an array
     sample.push(999);
     
     //pop(): Remove an item from the end of an array
     sample.pop();

     //unshift(): Add items to the beginning of an array
     sample.unshift(999);

     //shift(): Remove an item from the beginning of an array
     sample.shift();

     console.log(sample);*/

  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;
    super.display();
  }
}
