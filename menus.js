//Add script tags in index - DONE
//call function in sketch - DONE

//constructor function for menus
function Menus() {
    
    //master variables
    this.x = 20; //default 20
    this.y = 50; //default 50
    
    this.visMenu = function() {
        
        fill("grey"); //draws a grey background for the menu
        stroke("white");
        rect(this.x, this.y, 400, 40 + 40*vis.visuals.length);
        
        fill("white");
        stroke("black");
        text("Select a visualisation:", this.x + 10, this.y + 30);
        
		//draw out menu items for each visualisation
		for (var i = 0; i < vis.visuals.length; i++) {
			var yLoc = this.y + 70 + i * 40;
            
            if (vis.visuals[i].name == vis.selectedVisual.name) {
                fill("yellow"); //colours the currently visual in yellow
            }
            else {
                fill("white");
            }
            
			text((i + 1) + ":  " + vis.visuals[i].name, this.x + 10, yLoc);
		}
	};
    
    this.musicMenu = function() {
        
        fill("grey"); //draws a grey background for the menu
        stroke("white");
        rect(this.x, this.y, 500, 40 + 40*mus.trackList.length);
        
        fill("white");
        stroke("black");
        text("Select a music track:", this.x + 10, this.y + 30);
        
        for (var i = 0; i < mus.trackList.length; i++) {
            var yLoc = this.y + 70 + i * 40;
            
            if (mus.trackList[i].key == mus.currentlyPlaying.key) {
                fill("yellow");
            }
            else {
                fill("white");
            }
            
            text(mus.trackList[i].key + ": " + mus.trackList[i].number + " - " + mus.trackList[i].title, this.x + 10, yLoc);
        }
    };
    
    this.infoMenu = function() {
        
        fill("grey"); //draws a grey background for the menu
        stroke("white");
        rect(this.x, this.y, 800, 40 + 40*5); //currently needs to be 5
        
        fill("white");
        stroke("black");
        text("Track information", this.x + 10, this.y + 30);
        
        fill("yellow");
        text("Track Number: " + mus.currentlyPlaying.number, this.x + 10, this.y + 70 + 40*0);
        text("Title: " + mus.currentlyPlaying.title, this.x + 10, this.y + 70 + 40*1);
        text("Author: " + mus.currentlyPlaying.author, this.x + 10, this.y + 70 + 40*2);
        text("Webpage: ", this.x + 10, this.y + 70 + 40*3);
        text(mus.currentlyPlaying.webpage, this.x + 10, this.y + 70 + 40*4);
    };
    
    this.helpMenu = function() {
        
        fill("grey"); //draws a grey background for the menu
        stroke("white");
        rect(this.x, this.y, 400, 40 + 40*9); //currently needs to be 9
        
        fill("white");
        stroke("black");
        text("Help/Hotkeys:", this.x + 10, this.y + 30);
        
        text("Play/Pause - Space", this.x + 10, this.y + 70 + 40*1);
        text("Stop - S", this.x + 10, this.y + 70 + 40*2);
        text("Track info - I", this.x + 10, this.y + 70 + 40*3);
        text("Help - H", this.x + 10, this.y + 70 + 40*4);
        
        text("Visualisations menu - V", this.x + 10, this.y + 70 + 40*6);
        text("Music menu - M", this.x + 10, this.y + 70 + 40*7);
        text("Fullscreen - Left click", this.x + 10, this.y + 70 + 40*8);
        
    };
    
}