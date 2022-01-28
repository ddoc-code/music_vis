/*
Make ridgeplots

1. draw lines without data
    a. define plot position on screen - DONE
    b. draw lines that move up screen - DONE
        i. Enter lines in 2D array - outer array is each line, inner array is points, add a line to the array every x frames
        ii. each frame clear the screen and decrease the y coords of each line
        iii. remove line from array when it reaches the top of the screen (y smaller than whatever)
2. Add output data to lines - DONE

REMEMBER:

- Add script tags in index.html - DONE
- Add push/pop? - DONE, but didn't seem to change anything
- Call the function somewhere - DONE

*/

function RidgePlots() {
    this.name = "Ridgeplots";
    this.output = [];
    this.startX = width/5; 
    this.endY = height/5;
    this.startY = height - this.endY;
    this.spectrumWidth = (width/5) * 3;
    this.speed = 0.7;
    
    this.onResize = function() { //This calculates the new screen variables on resize
        this.startX = width/5; 
        this.endY = height/5;
        this.startY = height - this.endY;
        this.spectrumWidth = (width/5) * 3;
        
        this.output = []; //resets the output array to keep it clean
    }
    
    this.onResize();
    
    this.draw = function() {
        
        push();
        
//        fill("red"); //red rectangle for testing the plot area
//        rect(this.startX, this.endY, this.spectrumWidth, height - (this.endY*2));
        
        stroke(255);
        noFill(); //looks better without the fill?
        strokeWeight(2);
        if (frameCount % 10 == 0) {
            this.addWave();
        }
        
        for (let i = 0; i < this.output.length; i++) {
            var o = this.output[i];
            
            beginShape();
            for (let j = 0; j < o.length; j++ ) {
                o[j].y -= this.speed;
                vertex(o[j].x, o[j].y);
            }
            endShape(0);
            
            if (o[0].y < this.endY) {
                this.output.splice(i, 1);
            }
        }
        
        pop();
    }
    
    this.addWave = function() {
//        this.output.push([{x: this.startX, y: this.startY},
//                        {x: this.startX + this.spectrumWidth, y: this.startY}]); //old - draws straight lines only
        
        var w = fourier.waveform();
        var output_wave = [];
        var smallScale = 3;
        var bigscale = 60; //default value is 40
        
        for (let i = 0; i < w.length; i++) {
            if (i % 20 === 0) {
                var x = map(i, 0, 1024, this.startX, this.startX + this.spectrumWidth);
                
                if (i < 1024 * 0.25 || i > 1025 * 0.75) {
                    var y = map(w[i], -1, 1, -smallScale, smallScale);
                    output_wave.push({
                        x: x,
                        y: this.startY + y
                    })
                }
                
                else {
                    var y = map(w[i], -1, 1, -bigscale, bigscale);
                    output_wave.push({
                        x: x,
                        y: this.startY + y
                    })
                }
            }
        }
        
        this.output.push(output_wave)
        
    }
}