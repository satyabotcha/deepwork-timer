// declare variables
let minutes = 25;
let seconds = minutes * 60;
let timer_is_running = false; //set up flag value to know if the timer is currently running
let timer_interval;

// default function to compute minutes and seconds
default_time = function(){
  // convert timer into MM:SS format
  let minutes_view = Math.floor(seconds / 60);
  let seconds_view = Math.round(seconds % 60);

  if (minutes_view < 10){
    minutes_view = "0" + minutes_view;
  }

  // if seconds goes below 10, add "0" before the digit
  if (seconds_view < 10){
    seconds_view = "0" + seconds_view;
  }

  return (minutes_view + ":" + seconds_view);
}

document.querySelector("#timer").innerHTML = default_time();


// declare buttons
let start_button = document.querySelector("#start");
let pause_button = document.querySelector("#pause");
let reset_button = document.querySelector("#reset");
let break_button = document.querySelector("#break_session");
let focus_button = document.querySelector("#focus_session");


// create howl object for alarm
let alarm_sound = new Howl({
  src: ['/audio/time_up.webm'],
  volume: 0.5,
  preload: true,
  loop: false,
});

// Attach event listeners

start_button.addEventListener("click", function(){
  // only run the countdown if it's not running
  if (timer_is_running == false){
    start_button.style.display = "none";
    pause_button.style.display = "block";
    timer_is_running = true;
    timer_interval = setInterval(function(){

      // check if seconds are not 0 (to avoid negative countdown)

      if (seconds > 0){

        // decrease by 1 second
        seconds = seconds - 1;

        // convert timer into MM:SS format
        let minutes_view = Math.floor(seconds / 60);
        let seconds_view = Math.round(seconds % 60);

        // if minutes goes below 10, add "0" before the digit
        if (minutes_view < 10){
          minutes_view = "0" + minutes_view;
        }

        // if seconds goes below 10, add "0" before the digit
        if (seconds_view < 10){
          seconds_view = "0" + seconds_view;
        }

        // output the result to DOM
        document.querySelector("#timer").innerHTML = minutes_view + ":" + seconds_view;
        // Buzzer if seconds is zero
        if (seconds == 0){
          alarm_sound.play();
          document.title = "Time up!";
        }
        else{
        document.title = minutes_view + ":" + seconds_view;
        }
      }
    }, 1000);
  }
})

pause_button.addEventListener("click", function(){
  timer_is_running = false;
  pause_button.style.display = "none";
  start_button.style.display = "block";
  clearInterval(timer_interval);
  alarm_sound.stop();

})


reset_button.addEventListener("click",function(){
  timer_is_running = false;
  clearInterval(timer_interval);
  pause_button.style.display = "none";
  start_button.style.display = "block";
  // reset the the counter to minutes * 60
  seconds = minutes * 60;

  // output the result to DOM
  document.querySelector("#timer").innerHTML = default_time() ;
  document.title = default_time();

  // reset alarm
  alarm_sound.stop();
})

break_button.addEventListener("click", function(){
  // hide coffee icon and show clock icon
  break_button.style.display = "none";
  focus_button.style.display = "block";
  // change the timer to 5 minutes
  minutes = 5;
  seconds = minutes * 60;
  // output the result to DOM
  document.querySelector("#timer").innerHTML = default_time();
  document.title = default_time();
})

focus_button.addEventListener("click", function(){
  // hide clock icon and show coffee icon
  focus_button.style.display = "none";
  break_button.style.display = "block";
  // change timer to 25 minutes
  minutes = 25;
  seconds = minutes * 60;
  // output the result to DOM
  document.querySelector("#timer").innerHTML = default_time();
  document.title = default_time();
})



