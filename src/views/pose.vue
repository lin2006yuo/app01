<template>
    <div class="pose">
        <button class="btn" @click="active">active</button>
        <Sidebar class="sidebar" :pose="isVisible ? 'visible': 'hidden'">
            <Item class="item" v-for="item in items" v-bind:key="item">hello</Item>
        </Sidebar>
        <Box class="box" v-on:drag-end="log" />



        <button class="btn2" v-on:click="isVisibleModal = true">Open modal</button>
        <button class="btn3" v-on:click="spring">spring</button>
        <PoseTransition>
        <Shade v-on:click.native="isVisibleModal = false" class="shade" v-if="isVisibleModal">
            <Modal class="modal" />
        </Shade>
        </PoseTransition>
        <ZoomImage
            imageWidth="600"
            imageHeight="400"
            src="https://static1.squarespace.com/static/5b475b2c50a54f54f9b4e1dc/t/5b68cfaf88251b17e76d3814/1533595587418/DSCF3568.jpg?format=1000w"
        />
    </div>
</template>

<script>
import posed, { PoseTransition }  from 'vue-pose';
import { spring } from 'popmotion';
import ZoomImage from '../components/ZoomImage';

export default {
  data: () => ({
    isVisible: false,
    isVisibleModal: false,
    items: [0, 1, 2, 3, 4],
  }),
  mounted() {
    // setInterval(() => {
    //   this.isVisible = !this.isVisible;
    // }, 2000);
  },
  computed: {

  },
  methods: {
        active() {
            this.isVisible = !this.isVisible
        },
        log(e) {
            //   console.log( e.target.style.left)
            //   e.target.style.left = e.clientX + 'px'
            //   e.target.style.top = e.clientY + 'px'
        },
        spring() {
            console.log(1)
            spring({ from: 0, to: 100 })
                .start(v => console.log(v))
        }
  },
  components: {
    ZoomImage,
    Sidebar: posed.div({
      visible: {
        x: 0,
        beforeChildren: true,
        staggerChildren: 30,
        delayChildren: 20
      },
      hidden: {
        x: '-100%',
        delay: 300,
        afterChildren: true
      }
    }),
    Item: posed.div({
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 20 }
    }),


    Box: posed.div({
        draggable: true,
        init: { scale: 1 },
        drag: { scale: 1.2 },
        dragEnd: {
            x: 50,
            y: 0,
        }
    }),




    PoseTransition,
    Shade: posed.div({
      enter: {
        opacity: 1,
        beforeChildren: true,
        transition: { duration: 200, ease: "linear" }
      },
      exit: {
        opacity: 0,
        afterChildren: true,
        transition: { duration: 200, ease: "linear" }
      }
    }),
    Modal: posed.div({
      enter: { opacity: 1, z: 1, transition: { duration: 50, type: 'spring', mass: 0.5, damping: 7 } },
      exit: { opacity: 0, z: -150,  transition: { duration: 150} }
    }),
  }
};
</script>

<style scoped>
.pose {
  display: flex;
  height: 100vh;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  align-items: stretch;
}

.sidebar {
  background: #54e365;
  padding: 20px;
}

.item {
  width: 300px;
  height: 50px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 10px;
}
.btn {
    position: absolute;
    right: 20px;
}
.btn2 {
    position: absolute;
    top: 220px;
    right: 20px
}
.btn4 {
    position: absolute;
    top: 220px;
    right: 20px
}
.btn3 {
    position: absolute;
    top: 150px;
    right: 20px
}
button {
  border: none;
  border-radius: 300px;
  color: #000;
  font-size: 18px;
  letter-spacing: -0.2px;
  cursor: pointer;
  padding: 10px 30px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.box {
    position: absolute;   
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    background: #54E365;
}
.shade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  perspective: 500px;
  transform: translateZ(0);
}
.modal {
  width: 400px;
  height: 250px;
  background: white;
  border-radius: 10px;
}
</style>
