//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

//variable added for p5.amplitude object
var amp;
//variable added for new music.js container
var mus;

//variable added for the canvas
var cnv;
//variable added for mic input
var mic = null;

//music preload variables
var songA;
var songB;
var songC;

function preload() {
	songA = loadSound('stomper_reggae_bit.mp3');
    songB = loadSound('923457_Stay-Focused.mp3');
    songC = loadSound('858168_-Impact-Force-.mp3');
}

function setup() {
	 cnv = createCanvas(windowWidth, windowHeight);
     cnv.mousePressed(userStartAudio); //this is required for mic input
	 background(0);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();
    
     //add a amplitude object
     amp = new p5.Amplitude();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
     vis.add(new RidgePlots());
    
     vis.add(new Sunshine());
     vis.add(new Quads());
    
     //create the music object
     mus = new Music();
    
     //connect the sound variable to music.js
     sound = mus.currentlyPlaying.load;
    
     console.log(mus.currentlyPlaying);
    
     //create the menu object
     menu = new Menus();
    
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
    fill("white");
    text("DD", width-30, height-20);
}

function mouseClicked() {
	controls.mousePressed();
}

function keyPressed() {
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
