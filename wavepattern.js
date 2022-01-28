//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "Wavepattern";
    
    this.leftX = width/5;
    this.rightX = width-this.leftX;
    this.topY = height/5;
    this.botY = height - this.topY;
    this.plotWidth = (width/5) * 3;
    this.plotHeight = (height/5) * 3;
    
    this.onResize = function() { //This calculates the new screen variables on resize
        this.leftX = width/5;
        this.rightX = width-this.leftX;
        this.topY = height/5;
        this.botY = height - this.topY;
        this.plotWidth = (width/5) * 3;
        this.plotHeight = (height/5) * 3;
    }
    
    this.onResize();

	//draw the wave form to the screen
	this.draw = function() {
		push();
		noFill();
        
        stroke(255, 0, 0);
		strokeWeight(2);
        //side lines - i have to add 1px to every y to make it line up precisely with the center line for some reason
        line(0, (height/2)+1, this.leftX, (height/2)+1);
        line(width, (height/2)+1, this.rightX, (height/2)+1);
        
        strokeWeight(1);
        stroke("skyblue");
        rect(this.leftX, this.topY, this.plotWidth, this.plotHeight);
        
		stroke(255, 0, 0);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, this.leftX, this.rightX);
			var y = map(wave[i], -1, 1, this.topY, this.botY);

			vertex(x, y);
		}

		endShape();
		pop();
	};
}