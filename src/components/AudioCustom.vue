<template>
  <div class="w-80 text-black flex text-sm gap-2 bg-white p-3 rounded-lg shadow-md">
    <div class="w-fit cursor-pointer" @click="tooglePlay()">
        <img v-if="!is_playing" src="../assets/play.svg" />
        <img v-else src="../assets/pause.svg" />
      </div>
    
    <div class="flex flex-col flex-1 justify-center gap-1">
      <div class="bg-slate-300 mt-2 h-1 w-full cursor-pointer py-px rounded-full" ref="time_line" @click="skipToTime($event)">
        <div class="progress bg-black h-full rounded-full w-0" ref="progress_bar"></div>
      </div>
      <div class="flex">
        <p>{{ current }}</p>
        <span class="px-0.5">/</span>
        <p>{{ time_length }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'

const props = defineProps<{
  /** link đoạn ghi âm */
  source: string
}>()
let interval: any

/** tổng thời gian của đoạn ghi âm */
const time_length = ref<string>('0:00')
/** thời gian hiện tại của đoạn ghi âm */
const current = ref<string>('0:00')
/** thanh hiển thị tổng thời gian của đoạn ghi âm */
const time_line = ref()
/** thanh hiển thị thời gian đã chơi của đoạn ghi âm */
const progress_bar = ref()
/** đoạn ghi âm */
const audio = ref()
/** trạng thái đang chơi nhạc */
const is_playing = ref(false)


onMounted(() => {
  audio.value = new Audio(props.source)
  audio.value.addEventListener(
    'loadeddata',
    () => {
      time_length.value = getTimeCodeFromNum(audio.value.duration)
      audio.value.volume = 1
    },
    false
  )
})

/** hiển thị thời gian đang chạy tới  */
function showCurrentTime() {
  // hiển thị độ dài của thanh timeline
  progress_bar.value.style.width =
        (audio.value.currentTime / audio.value.duration) * 100 + '%'
  // hiện thị thời gian
  current.value = getTimeCodeFromNum(audio.value.currentTime)
}

/** chuyển tới thời gian click trong timeline */
function skipToTime(e: any) {
  const timelineWidth = time_line.value.offsetWidth
  
  const timeToSeek =
    (e.offsetX / parseInt(timelineWidth)) * audio.value.duration
  audio.value.currentTime = timeToSeek
  showCurrentTime()
}

/** chuyển đổi trạng thái chơi nhạc và tạm dừng */
function tooglePlay() {
  if (audio.value.paused) {
    //chạy audio
    is_playing.value = true
    audio.value.play()

    // sau nửa giây sẽ cập nhật thời gian hiển thị
    interval = setInterval(() => {
      // dừng khi hoàn tất đoạn nhạc
      if(audio.value.ended) {
        is_playing.value = false
        audio.value.currentTime = 0
        clearInterval(interval)
      }
      showCurrentTime()
    }, 500)
  } else {

    // tạm dừng
    is_playing.value = false
    audio.value.pause()
    clearInterval(interval)
  }
}

/** format thời gian 130 -> 2:10 */
function getTimeCodeFromNum(num: number) {
  let seconds = Math.floor(Number(num))

  let minutes = Math.floor(seconds / 60)

  seconds -= minutes * 60

  const hours = Math.floor(minutes / 60)

  minutes -= hours * 60

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
  return `${String(hours).padStart(2, '0')}:${minutes}:${String(
    seconds % 60
  ).padStart(2, '0')}`
}
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
</style>
