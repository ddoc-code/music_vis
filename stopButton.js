//displays and handles clicks on the new stop button
function StopButton() {
    
    this.x = 50; //10px gap from playbackbutton
    this.y = 20;
    this.width = 20;
    this.height = 20;
    
    this.draw = function() {
        
        if (mus.enablePlayback == false) {
            fill("red");
        }
        
        else {fill("white");}
        
        rect(this.x, this.y, this.width, this.height);
    };
    
    this.hitCheck = function() {
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height) {
            
            if (mus.enablePlayback == true) {
                
                sound.stop();
                console.log("STOP");
                
                controls.playbackButton.playing = false;
            }
            
            return true;
        }
        
        return false;
    }
}