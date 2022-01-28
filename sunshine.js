/*

- Add script tags in index.html - DONE
- Call the function somewhere - DONE

- Change colours to something suitable - DONE

- Update filename to something else - DONE
- Change script tags to match - DONE

- Change function name / update function call? - DONE

*/

function Sunshine() {
    this.name = "Sunshine";
    
    this.leftX = width/5;
    this.rightX = width-this.leftX;
    this.topY = height/5;
    this.botY = height - this.topY;
    this.spectrumWidth = (width/5) * 3;
    this.spectrumHeight = (height/5) * 3;
    this.output = [];
    
    this.onResize = function() { //This calculates the new screen variables on resize
        this.leftX = width/5;
        this.rightX = width-this.leftX;
        this.topY = height/5;
        this.botY = height - this.topY;
        this.spectrumWidth = (width/5) * 3;
        this.spectrumHeight = (height/5) * 3;
        
//        this.output = []; //resets the output array to keep it clean - not really needed for this vis
    }
    
    this.onResize();
    
    this.draw = function() {
        
        angleMode(DEGREES) //must revert this at the end of this file to avoid breaking needles.js <--
        
        //plot
        noFill();
        strokeWeight(1);
        stroke("skyblue");
        rect(this.leftX, this.topY, this.spectrumWidth, this.spectrumHeight)
        
        //this gets the volume from the Amplitude object
        var vol = amp.getLevel();
        
        //we then map it a more suitable size
        var volmap = map(vol, 0, 1, this.checkSize()*0.20, this.checkSize())
        
        push(); //push #1 - opens circle
        translate(width/2, height/2); //centres the circle
        noFill();
        stroke("darkred");
        strokeWeight(3);
        beginShape()
        for (let i = 0; i < 361; i++) { //this for loop draws a circle without using ellipse
            var r = this.checkSize()*0.15;
            var x = r * cos(i);
            var y = r * sin(i);
            
            vertex(x, y); //comment this out to remove the circle
        }
        endShape();
        pop(); //pop #1 - closes circle
        
        push(); //push #2 - opens vectors
        translate(width/2, height/2); //centres vectors
        
        //these vectors rotate around opposite sides of a circle. They move further away from the center depending on the music volume
        this.v1 = p5.Vector.fromAngle(millis() / 1000, volmap);
        this.v1x = this.v1.x;
        this.v1y = this.v1.y;
        
        this.v2 = p5.Vector.fromAngle(millis() / 1000, -volmap);
        this.v2x = this.v2.x;
        this.v2y = this.v2.y;
        
        //draw outer circles using the vector coords
        stroke("red");
        strokeWeight(3);
        fill("darkred");
        
        ellipse(this.v1x, this.v1y, 20);
        ellipse(this.v2x, this.v2y, 20);
        
        stroke("red"); //2 middle lines, from center to vectors
        line(0, 0, this.v1x, this.v1y);
        line(0, 0, this.v2x, this.v2y);
        
        if (controls.playbackButton.playing || !mus.enablePlayback) {
            
            //if the music is playing we draw the trail and begin filling the array with vector coordinates
            this.drawTrail();

            this.addPoints();
        }
        
        else {
            
            //if the music is not playing we reduce the array at twice the speed it is filled until it is empty
            if (this.output.length > 0) {
                
                this.drawTrail();
            
                this.addPoints();          

                this.output.splice(0, 2);
            }
            
        }
        
        pop(); //pop #2 - closes vectors
        
        noStroke(); //avoids adding a border when switching to needles
        angleMode(RADIANS) //see above -->
        
    } //end of draw function
    
    this.drawTrail = function() {
        
        //draws the trail left behind by the spinning vectors, which is stored in the this.output array
        stroke("orange")
        noFill(); //this is needed so the shapes drawn below are not filled

        beginShape();
        for (i = 0; i < this.output.length; i++) {
            vertex(this.output[i].x, this.output[i].y);
        }
        endShape();

        beginShape();
        for (i = 0; i < this.output.length; i++) {
            vertex(-this.output[i].x, -this.output[i].y);
        }
        endShape();
    }
    
    this.addPoints = function() { //fills the output array continually
        
        if (this.output.length > 200) {
            this.output.splice(0, 1); //removes the earliest entries to keep the array length constant - 200 default / 220 for no gap
        }
        
//        console.log(this.output.length);
        
        this.output.push({
            x: this.v1x,
            y: this.v1y
        })
    }
    
    this.checkSize = function() { //checks if x or y is the size constraint
        
        if (this.spectrumHeight < this.spectrumWidth) {
            return this.spectrumHeight;
        }
        
        else {
            return this.spectrumWidth;
        }
    }
}