function Spectrum() {
	this.name = "Spectrum";
    
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

	this.draw = function() {
		push();
        
        noFill();
        strokeWeight(1);
        stroke("skyblue");
        rect(this.leftX, this.topY, this.plotWidth, this.plotHeight);
        
		var spectrum = fourier.analyze();
		noStroke();
		//fill(0,255,0)
		// for (var i = 0; i< spectrum.length; i++){
		// 	var x = map(i, 0, spectrum.length, 0, width);
		//     var h = -height + map(spectrum[i], 0, 255, height, 0);
		//     rect(x, height, width / spectrum.length, h );
  // 		}


		for (var i = 0; i < spectrum.length; i++) {

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			//now draws each bin as a rectangle from the left of the plot
			var y = map(i, 0, spectrum.length, 0, this.plotHeight);
			var w = map(spectrum[i], 0, 255, 0, this.plotWidth);
			rect(this.leftX, this.topY + y, w, height / spectrum.length);
            
            //the rect above should have its final paramter changed to "this. plotHeight / spectrum.length" to match the other changes, but for some reason this changes the colours slightly and I like it better as it is here
		}
		pop();
	};
}
