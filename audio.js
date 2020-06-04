let playlist = [
    {
    "name": "White Noise",
    "source": "/audio/white_noise.webm",
    "url": "https://soundcloud.com/canton/white-noise-2",
    "author": "Canton",
    "license": "CC 3.0"
    },
  
    // {
    // "name": "Classical Music",
    // "source": "/audio/classical_music.webm",
    // "url": "https://soundcloud.com/user-243689985/study-music-focus-music-essay-writing-music",
    // "author": "Amy Grunewald",
    // "license": "CC 3.0"
    // },
  
    {
      "name": "Nature Sounds",
      "source": "/audio/nature_sounds.webm",
      "url": "https://soundcloud.com/mg-productions-4-peace/174hz-frequency-w-music-nature-sounds-60-min",
      "author": "MG Productions 4 Peace",
      "license": "CC 3.0"
    }
  ]


class Player{
    constructor(playlist){
      this.playlist = playlist,
      this.index = 0,
      this.current_time = 0;
      this.sound = new Audio()
    }

    info(){
        return (this.playlist[this.index]["name"] + " by " + this.playlist[this.index]["author"] + " | " + this.playlist[this.index]["license"]);
      }

    play(){
        if (this.current_time == 0){
            this.sound.src = this.playlist[this.index]["source"];
            this.sound.play();
        }
        else{
            this.sound.play();
        }   
    }

    pause(){
        this.sound.pause();
        this.current_time = this.sound.currentTime;
    }

    next(){
        this.sound.pause();
        this.index = this.index + 1;
        this.current_time = 0;
        if (this.index == this.playlist.length){
          this.index = 0;
        };
        this.play();
      }

      previous(){
        this.sound.pause();
        this.current_time = 0;
        if (this.index == 0){
          this.index = this.playlist.length;
        };
        this.index = this.index - 1;
        this.play();
    }    
}

let playlist_one = new Player(playlist);

document.querySelector("#play_button").addEventListener("click", () => {
    playlist_one.play();
    document.querySelector("#play_button").style.display = "none";
    document.querySelector("#pause_button").style.display = "block"; 
});

document.querySelector("#pause_button").addEventListener("click", () => {
    playlist_one.pause();
    document.querySelector("#pause_button").style.display = "none"; 
    document.querySelector("#play_button").style.display = "block";
});

document.querySelector("#next_button").addEventListener("click", () => {
    playlist_one.next();
    document.querySelector("#track_name").innerHTML = playlist_one.info();
    document.querySelector("#play_button").style.display = "none";
    document.querySelector("#pause_button").style.display = "block"; 
});


document.querySelector("#prev_button").addEventListener("click", () => {
    playlist_one.previous();
    document.querySelector("#track_name").innerHTML = playlist_one.info();
    document.querySelector("#play_button").style.display = "none";
    document.querySelector("#pause_button").style.display = "block"; 
});
  
document.querySelector("#track_name").innerHTML = playlist_one.info();




