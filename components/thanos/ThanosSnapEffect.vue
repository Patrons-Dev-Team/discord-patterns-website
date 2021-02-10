<template>
  <div style="position: relative">
    <transition :name="mainTransition" @leave="leave">
      <div v-show="showMain" ref="main">
        <slot></slot>
      </div>
    </transition>
    <div
      v-show="showDust"
      class="dust-container"
      style="position: absolute; top: 0; left: -6px; transform: scale(0.5)"
    >
      <transition-group :name="dustTransition">
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <canvas
          v-for="frame in framesLength"
          v-if="hiddenFrames < frame"
          :ref="'container' + frame"
          :key="frame"
          style="position: absolute"
        ></canvas>
      </transition-group>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { createBlankImageData, weightedRandomDistrib } from './utils'
export default {
  name: 'ThanosSnapEffect',
  props: {
    startAnimation: {
      type: Boolean,
      default: false,
    },
    mainTransition: {
      type: String,
      default: 'fade',
    },
    dustTransition: {
      type: String,
      default: 'dust',
    },
    pageReady: {
      type: Boolean,
      default: false,
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMain: true,
      hiddenFrames: 0,
      framesLength: 32,
      showDust: false,
    }
  },
  watch: {
    startAnimation(newValue) {
      if (newValue) {
        this.showDust = true
        // hiding to trigger transition
        this.showMain = false
        const interval = setInterval(() => {
          this.hiddenFrames++
          if (this.hiddenFrames >= this.framesLength) {
            clearInterval(interval)
          }
        }, 100)
      }
    },
    pageReady(newValue) {
      if (newValue) {
        const doc = this.$refs.main
        this.drawCanvas(doc)
      }
    },
  },
  mounted() {
    if (this.pageReady) {
      const doc = this.$refs.main
      this.drawCanvas(doc)
    }
  },
  methods: {
    leave(el, done) {},
    generateFrames(canvas) {
      const { width, height } = canvas
      const ctx = canvas.getContext('2d')
      const originalData = ctx.getImageData(0, 0, width, height)
      const imageDatas = createBlankImageData(originalData, this.framesLength)
      const pixelArr = originalData.data
      for (let i = 0; i <= pixelArr.length; i += 4) {
        // Find the highest probability canvas the pixel should be in
        const p = Math.floor((i / pixelArr.length) * this.framesLength)
        const a = imageDatas[weightedRandomDistrib(p, this.framesLength)]
        a[i] = pixelArr[i]
        a[i + 1] = pixelArr[i + 1]
        a[i + 2] = pixelArr[i + 2]
        a[i + 3] = pixelArr[i + 3]
      }
      imageDatas.map((data, index) => {
        const c = this.$refs['container' + (index + 1)][0]
        c.width = width
        c.height = height
        c.getContext('2d').putImageData(
          new ImageData(data, width, height),
          0,
          0
        )
      })
    },
    async drawCanvas(elm) {
      try {
        const canvas = await html2canvas(elm, {
          allowTaint: true,
          //  scale: 1,
          scale: 2,
          useCORS: true,
          backgroundColor: null,
        })
        if (this.debug) {
          window.location.href = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream')
        } else {
          this.generateFrames(canvas)
        }
        this.$emit('ready')
      } catch (error) {
        this.$emit('error', error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: 3.2s;
}
.dust-leave-to {
  animation: blur-dots 0.2s;
}
@keyframes blur-dots {
  @for $i from 0 through 100 {
    #{$i * 1%} {
      filter: blur(#{$i + 'px'});
      transform: translate(#{$i + 'px'}, -#{$i + 'px'});
      transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }
  }
}
.dust-leave-active {
  transition: 0.2s;
}
</style>
