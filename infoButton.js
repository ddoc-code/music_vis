//displays and handles clicks on the new info button
function InfoButton() {
    
    this.x = 80; //10px gap from stopbutton
    this.y = 20;
    this.width = 20;
    this.height = 20;
    
    this.draw = function() {
//        rect(this.x, this.y, this.width, this.height);
        
        fill("white");
        
        textAlign(CENTER);
        textStyle(BOLD);
        text("i", this.x + (this.width/2), this.y + (this.height));
        textStyle(NORMAL);
        textAlign(LEFT);
    }
    
    this.hitCheck = function() {
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height) {
            
            if (controls.selectedMenu == "I" && controls.menuDisplayed == true) {
                controls.menuDisplayed = false;
            }
            
            else {
                controls.selectedMenu = "I";
                controls.menuDisplayed = true;
            }
            
            return true;
        }
        
        return false;
    }
}