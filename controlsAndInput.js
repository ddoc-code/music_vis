//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;

	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();
    
    //newly added stop button added to top left
    this.stopButton = new StopButton();
    
    //new info button added
    this.infoButton = new InfoButton();
    
    //new help button added
    this.helpButton = new HelpButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function() {
		if (!this.playbackButton.hitCheck() && !this.stopButton.hitCheck() &&
            !this.infoButton.hitCheck() && !this.helpButton.hitCheck()) {
			var fs = fullscreen();
			fullscreen(!fs);
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode) {
		console.log("keypressed: " + keycode);
        
        //changed vis menu key to V
		if (keycode == 86) {
            if (this.selectedMenu == "V" && this.menuDisplayed == true) {
                this.menuDisplayed = false;
            }
            
            else {
                this.selectedMenu = "V";
                this.menuDisplayed = true;
            }
		}
        
        //music menu opens with M
        if (keycode == 77) {
            if (this.selectedMenu == "M" && this.menuDisplayed == true) {
                this.menuDisplayed = false;
            }
            
            else {
                this.selectedMenu = "M";
                this.menuDisplayed = true;
            }
        }
        
        //info menu opens with I
        if (keycode == 73) {
            if (this.selectedMenu == "I" && this.menuDisplayed == true) {
                this.menuDisplayed = false;
            }
            
            else {
                this.selectedMenu = "I";
                this.menuDisplayed = true;
            }
        }
        
        //help menu opens with H
        if (keycode == 72) {
            if (this.selectedMenu == "H" && this.menuDisplayed == true) {
                this.menuDisplayed = false;
            }
            
            else {
                this.selectedMenu = "H";
                this.menuDisplayed = true;
            }
        }

        //visualisation selection (numkeys)
		if (keycode > 48 && keycode < 58) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
        
        //spacebar now plays/pauses the music
        if (keycode == 32 && mus.enablePlayback == true) {
            if (sound.isPlaying()) {
    			sound.pause();
                console.log("PAUSE");
  			} else {
    			sound.loop();
                console.log("PLAY");
  			}
  			controls.playbackButton.playing = !controls.playbackButton.playing;
        }
        
        //S key to stop the music
        if (keycode == 83 && mus.enablePlayback == true) {
            sound.stop();
            console.log("STOP");
            controls.playbackButton.playing = false;
        }
        
        //track selection (QWERTY). Now uses music.js to change songs
        if (keycode == 81 || keycode == 87 || keycode == 69 || keycode == 82) {
            if (keycode != mus.currentlyPlaying.keycode) {
                
                if (mus.enablePlayback == true) {
                    sound.pause();
                }
                mus.changeSong(keycode);
                if (mus.enablePlayback == true) {
                    sound.loop();
                    controls.playbackButton.playing = true;
                }
            }
        }
	};

	//draws the buttons and potentially the menu
	this.draw = function() {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button
		this.playbackButton.draw();
        
        //stop button
        this.stopButton.draw();
        
        //info button
        this.infoButton.draw();
        
        //help button
        this.helpButton.draw();
        
		//only draw the menu if menu displayed is set to true.
		if (this.menuDisplayed) {
            
            if (this.selectedMenu == "V") {
                menu.visMenu();
            }
            
            if (this.selectedMenu == "M") {
                menu.musicMenu();
            }
            
            if (this.selectedMenu == "I") {
                menu.infoMenu();
            }
            
            if (this.selectedMenu == "H") {
                menu.helpMenu();
            }
            
		}
		pop();

	};
}
