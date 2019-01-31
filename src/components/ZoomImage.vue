<template>
  <div v-bind:style="{ width: imageWidth + 'px', height: imageHeight + 'px' }" @click="toggleZoom">
       <Frame :pose="pose" class="frame" />
        <ZoomImage :pose="pose" v-lazy="src" />
  </div>
</template>

<script>
import pose from 'vue-pose'


const transition = {
    translateX: '-100%',
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
};

export default {
  data: () => ({
        isZoomed: false
  }),
  props: ['imageWidth', 'imageHeight', 'src'],
  computed: {
    toggleZoom() {
        return this.isZoomed ? this.zoomOut : this.zoomIn;
    },
    pose() {
        return this.isZoomed ? 'zoomedIn' : 'zoomedOut';
    }
  },
  methods: {
    zoomIn() {
        window.addEventListener('scroll', this.zoomOut);
        this.isZoomed = true;
    },
    zoomOut() {
        window.removeEventListener('scroll', this.zoomOut);
        this.isZoomed = false;
    }
  },
  components: {
    ZoomImage: pose.img({
        zoomedOut: {
            position: 'static',
            width: 'auto',
            height: 'atuo',
            transition,
            flip: true
        },
        zoomedIn: {
            x: '-50%',
            position: 'fixed',
            top: 0,
            // width: '80%',
            // height: '80%',
            left: 0,
            right: 0,
            bottom: 0,
            transition,
            flip: true
        }
    }),
    Frame: pose.div({
      zoomedOut: {
        applyAtEnd: { display: 'none' },
        opacity: 0
      },
      zoomedIn: {
        applyAtStart: { display: 'block' },
        opacity: 1
      }
    }),
  }
}
</script>

<style>
img {
  cursor: zoom-in;
  display: block;
  max-width: 100%;
  margin: auto;
}
.frame {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  background: black;
  transform: translateZ(0);
}
img.zoomed {
  cursor: zoom-out;
}
</style>