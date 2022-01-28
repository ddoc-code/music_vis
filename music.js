//Add script tags in index - DONE
//call function in sketch - DONE

//new constructor function to hold the tracks and details. this.currentlyPlaying.load will be assigned to var sound to play the music. When we call this.changeSong from controls+inputs, this.currentlyPlaying is updated to match the keycode pressed and var sound is updated.
function Music() {
    
    this.currentlyPlaying = null; //var for the song that is playing
    
    this.enablePlayback = true; //used for disabling music/controls when switching to mic input
    
    this.song1 = {
        number: 'Track 01',
        path: 'assets/stomper_reggae_bit.mp3',
        title: 'Stomper Reggae',
        author: 'Unknown',
        webpage: 'N/A',
        key: 'Q',
        keycode: 81,
        load: songA,
        playback: 'Y'
    }
    
    this.song2 = {
        number: 'Track 02',
        path: 'assets/923457_Stay-Focused.mp3',
        title: 'Stay Focused',
        author: 'aalong64',
        webpage: 'https://www.newgrounds.com/audio/listen/923457',
        key: 'W',
        keycode: 87,
        load: songB,
        playback: 'Y'
    }
    
    this.song3 = {
        number: 'Track 03',
        path: 'assets/858168_-Impact-Force-.mp3',
        title: 'Impact Force',
        author: 'PredatorMusic',
        webpage: 'https://www.newgrounds.com/audio/listen/858168',
        key: 'E',
        keycode: 69,
        load: songC,
        playback: 'Y'
    }
    
    this.song4 = {
        number: 'User Input',
        path: 'N/A',
        title: 'Microphone',
        author: 'You!',
        webpage: 'N/A',
        key: 'R',
        keycode: '82',
        load: null,
        playback: 'N'
    }
    
    this.trackList = [ //when adding tracks insert the details above and add them to this array. Remember to preload in sketch and add the key to change in controls
        this.song1,
        this.song2,
        this.song3,
        this.song4
    ];
    
    if (this.currentlyPlaying == null) {
        this.currentlyPlaying = this.song1;
    }
    
    this.changeSong = function(input) {
        for (i = 0; i < this.trackList.length; i++) {
            if (input == this.trackList[i].keycode) {
                this.currentlyPlaying = this.trackList[i]; //song changes here
                
                if (this.currentlyPlaying.playback == 'N') {
                    //disble controls
                    this.enablePlayback = false;
                    controls.playbackButton.playing = false;
                    
                    //assign mic if not yet done
                    if (mic == null) {
                        mic = new p5.AudioIn();
                    }
                    
                    //start mic
                    mic.start();
                    
                    //set vars to take input from mic
                    fourier.setInput(mic);
                    amp.setInput(mic);
                }
                
                else {
                    //re-enable controls
                    this.enablePlayback = true;
                    
                    //stop mic if it has been assigned
                    if (mic != null) {
                        mic.stop();
                    }
                    
                    //reset vars to take input as normal
                    fourier.setInput();
                    amp.setInput();
                }
                
                sound = mus.currentlyPlaying.load; //points to music preload
                
                console.log(this.currentlyPlaying);
            }
        }
    }
}