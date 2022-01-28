//Add script tags in index.html - DONE
//Call the function in sketch - DONE

//this visualisation will crash the program IF the program has less than 4 other visualisations loaded in before it in sketch.js
function Quads() {
    this.name = "Quads";
    
    //these details will be looped through to draw the quads
    //we can only display four visualisations at once so
    //visNumbers will cycle indepenently over time
    this.details = {
        xTranslate: [0, width, 0, width],
        yTranslate: [0, 0, height, height],
        visNumbers: []
    }
    
    //onResize we must reset the translation vars
    //however, this will not reset the visualisation internal measurement vars
    this.onResize = function() {
        this.details.xTranslate = [0, width, 0, width];
        this.details.yTranslate = [0, 0, height, height];
        
        //so we must also call onResize for each visualisation
        //excluding this one, which would cause an infinite loop
        for (k = 0; k < vis.visuals.length; k++) {
            if (vis.visuals[k].name != "Quads") {
                vis.visuals[k].onResize();
            }
        }
    }
    
    this.onResize();
    
    //fills visNumbers with the number of each visualisation to be drawn
    //must not include this visualisation to prevent recursion later when drawing
    for (var i = 0; i < vis.visuals.length; i++) {
        this.details.visNumbers.push(i)
    }
    
    
//    console.log(this.details.visNumbers); //logs inital visNumber array
    
    //this invokes a function every 10 seconds.
    //i had to use an ES6 arrow function here to preserve this. type var refs
    setInterval(() => {
        
        //this cycles the visNumbers array
        //first I add the number at element 0 to the end of the array
        this.details.visNumbers.push(this.details.visNumbers[0]);
        //then I remove the first element
        this.details.visNumbers.splice(0, 1);
        
//        console.log(this.details.visNumbers); //logs visNumbers as it loops
        
        //the code below is used to prevent the sunshine display bug occuring when it leaves and rejoins the screen
        
        //first i will make a copy of the visNumbers array
        this.notDisplayed = this.details.visNumbers.slice();
        //then i remove the first 4 elements (which are drawn onscreen)
        this.notDisplayed.splice(0, 4);
        //the numbers remaining are not currently drawn onscreen
//        console.log(this.notDisplayed); //logs this.notDisplayed array
        
        //iterating through notDisplayed - works even if more than one vis is offscreen
        for (var m = 0; m < this.notDisplayed.length; m++) {
            
            //now I can check if Sunshine is offscreen and empty the output if so
            //we only want this to happen if Quads is currently selected
            if (vis.visuals[this.notDisplayed[m]].name == "Sunshine" &&
                vis.selectedVisual.name == "Quads"){
                vis.visuals[this.notDisplayed[m]].output = [];
            }
        }
        
    }, 10000); //adjust time interval here
    
    this.draw = function() {
        
        //central lines
        strokeWeight(2);
        stroke("purple");
        line(0, height/2, width, height/2);
        line(width/2, 0, width/2, height);
        noStroke(); //so as to not effect needles.js
        
        //here I draw the vis.visuals from the first four visNumber indexes
        //for each vis I scale it down to 1/4 size and translate it into place
        //needs a unique loop variable as it will contain many other loops!
        for (z = 0; z < 4; z++) {
            push();
            scale(0.50);
            translate(this.details.xTranslate[z], this.details.yTranslate[z]);
            
            vis.visuals[this.details.visNumbers[z]].draw();
                        
            pop();
        }
        
    } //end of draw function
}