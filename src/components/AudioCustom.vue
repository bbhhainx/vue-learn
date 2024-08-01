<template>
  <div>
    <!-- <audio controls>
      <source
        src="https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
        type="audio/mp3"
      />
    </audio> -->
    <div style="width: 50px; height: 50px"></div>
    <div class="audio-player" ref="audioPlayer">
      <div class="timeline">
        <div class="progress"></div>
      </div>
      <div class="controls">
        <div class="play-container">
          <div class="toggle-play play"></div>
        </div>
        <div class="time">
          <div class="current">0:00</div>
          <div class="divider">/</div>
          <div class="length"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue'



const audioPlayer = ref()

onMounted(() => {
  // console.log(audioPlayer1.value);
  
  // const audioPlayer = document.querySelector('.audio-player')
  if(!audioPlayer) return
  const audio = new Audio(
    'https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3'
  )
  audio.addEventListener(
    'loadeddata',
    () => {
      const time_length = audioPlayer.value.querySelector('.time .length')
      if (!time_length) return
      time_length.textContent = getTimeCodeFromNum(audio.duration)
      audio.volume = 1
    },
    false
  )

  //click on timeline to skip around
  const timeline = audioPlayer.value.querySelector('.timeline')
  if(!timeline) return
  timeline.addEventListener(
    'click',
    (e: any) => {
      const timelineWidth = window.getComputedStyle(timeline).width
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration
      audio.currentTime = timeToSeek
    },
    false
  )

  const playBtn = audioPlayer.value.querySelector('.controls .toggle-play')
  if(!playBtn) return

  //check audio percentage and update time accordingly

  //toggle between playing and pausing on button click
  let interval:any
  playBtn.addEventListener(
    'click',
    () => {
      
      if (audio.paused) {
        playBtn.classList.remove('play')
        playBtn.classList.add('pause')
        audio.play()
        interval = setInterval(() => {
        const progressBar = audioPlayer.value.querySelector('.progress')
        if(!progressBar) return
        progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%'
        const current = audioPlayer.value.querySelector('.time .current')
        if(!current) return
        current.textContent =
          getTimeCodeFromNum(audio.currentTime)
      }, 500)
      } else {
        playBtn.classList.remove('pause')
        playBtn.classList.add('play')
        audio.pause()
        clearInterval(interval)
      }
    },
    false
  )

  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num:number) {
    let seconds = Math.floor(Number(num));
    console.log(seconds);
    
    let minutes = Math.floor(seconds / 60);
    console.log(minutes);
    seconds -= minutes * 60;
    const hours = Math.floor(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(
      seconds % 60
    ).padStart(2, '0')}`
  }
})
</script>

<style lang="css">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom right, #b968c5, skyblue);
}

.audio-player {
  height: 50px;
  width: 350px;
  background: #444;
  box-shadow: 0 0 20px 0 #000a;

  font-family: arial;
  color: white;
  font-size: 0.75em;
  overflow: hidden;

  display: grid;
  grid-template-rows: 6px auto;
  .timeline {
    background: white;
    width: 100%;
    position: relative;
    cursor: pointer;
    box-shadow: 0 2px 10px 0 #0008;
    .progress {
      background: coral;
      width: 0%;
      height: 100%;
      transition: 0.25s;
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 0 20px;

    > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .toggle-play {
      &.play {
        cursor: pointer;
        position: relative;
        left: 0;
        height: 0;
        width: 0;
        border: 7px solid #0000;
        border-left: 13px solid white;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.pause {
        height: 15px;
        width: 20px;
        cursor: pointer;
        position: relative;
        &:before {
          position: absolute;
          top: 0;
          left: 0px;
          background: white;
          content: "";
          height: 15px;
          width: 3px;
        }
        &:after {
          position: absolute;
          top: 0;
          right: 8px;
          background: white;
          content: "";
          height: 15px;
          width: 3px;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .time {
      display: flex;

      > * {
        padding: 2px;
      }
    }
    .volume-container {
      cursor: pointer;
      .volume-button {
        height: 26px;
        display: flex;
        align-items: center;
        .volume {
          transform: scale(0.7);
        }
      }
      
      position: relative;
      z-index: 2;
      .volume-slider {
        position: absolute;
        left: -3px; top: 15px;
        z-index: -1;
        width: 0;
        height: 15px;
        background: white;
        box-shadow: 0 0 20px #000a;
        transition: .25s;
        .volume-percentage {
          background: coral;
          height: 100%;
          width: 75%;
        }
      }
      &:hover {
        .volume-slider {
          left: -123px;
          width: 120px;
        }
      }
    }
  }
}

</style>
