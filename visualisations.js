//container function for the visualisations
function Visualisations() {
	//array to store visualisations
	this.visuals = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedVisual = null;

	//add a new visualisation to the array
	//@param vis: a visualisation object
	this.add = function(vis) {
		this.visuals.push(vis);
		//if selectedVisual is null set the new visual as the
		//current visualiation
		if (this.selectedVisual == null) {
			this.selectVisual(vis.name);
		}
	};

	//select a visualisation using it name property
	//@param visName: name property of the visualisation
	this.selectVisual = function(visName) {
		for (var i = 0; i < this.visuals.length; i++) {
			if (visName == this.visuals[i].name) {
                
                //if we are leaving Sunshine or Quads, we empty the output of Sunshine to prevent a display bug
                if (vis.selectedVisual != null) {
                    
                    //code to check leaving Sunshine
                    if (vis.selectedVisual.name == "Sunshine" &&
                        this.visuals[i].name != "Sunshine") {
                        vis.selectedVisual.output = [];
                    }
                    
                    //code to check leaving Quads
                    if (vis.selectedVisual.name == "Quads" &&
                        this.visuals[i].name != "Quads") {
                        for (var l = 0; l < vis.visuals.length; l++) {
                            if (vis.visuals[l].name  == "Sunshine") {
                                vis.visuals[l].output = [];
                            }
                        }
                    }
                }
                
                
				this.selectedVisual = this.visuals[i]; //vis changes here
                
                //fixes non active visualisations not resizing
                if (this.selectedVisual.hasOwnProperty('onResize')) {
                    this.selectedVisual.onResize();
                }
                
			}
		}
	};
}
