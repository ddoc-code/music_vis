//displays and handles clicks on the new help button
function HelpButton() {
    
    this.x = 110; // 10px gap from infobutton
    this.y = 20;
    this.width = 20;
    this.height = 20;
    
    this.draw = function() {
//        rect(this.x, this.y, this.width, this.height);
        
        fill("white");
        
        textAlign(CENTER);
        textStyle(BOLD);
        text("?", this.x + (this.width/2), this.y + (this.height));
        textStyle(NORMAL);
        textAlign(LEFT);
    }
    
    this.hitCheck = function() {
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height) {
            
            if (controls.selectedMenu == "H" && controls.menuDisplayed == true) {
                controls.menuDisplayed = false;
            }
            
            else {
                controls.selectedMenu = "H";
                controls.menuDisplayed = true;
            }
            
            return true;
        }
        
        return false;
    }
}