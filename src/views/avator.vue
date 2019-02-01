<template>
    <div class="avator">
        <a class="btn" @click="toggleShow">设置头像</a>
        <my-upload field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="300"
            :height="300"
            url="/upload"
            :noSquare="true"
            :params="params"
            :headers="headers"
            img-format="png"></my-upload>
        <img :src="imgDataUrl">
        <div class="set">
            <div class="step1">
                <RippleButton class="set" @click="handleClick">设置头像</RippleButton>
                <input type="file" v-show="false" ref="fileinput" @change="handleChange">
                <canvas ref="canvas" v-show="false"></canvas>
            </div>
            <div class="step2">
                <img :src="sourceImgUrl" alt="" class="vicp-img" :style="sourceImgStyle"
                    @mousedown="imgStartMove"
                    @mousemove="imgMove"
                    @mouseup="createImg"
                    @mouseout="createImg"
                    @mousewheel="wheelFunc"
                >
                <img :src="createImgUrl" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload';
import RippleButton from '@/components/RippleButton'
import { scale } from 'style-value-types';

export default {
   data() {
       return {
            show: false,
            params: {
                token: '123456798',
                name: 'avatar'
            },
            headers: {
                smail: '*_~'
            },
            imgDataUrl: '',




            sourceImgUrl: '', // 原图base64
            createImgUrl: '', // canvas转换后base64
            souceImg: '',  //img DOM
            sourceImgMouseDown: {},
            scale: { y: 0, x: 0, zoomAddOn: false, range: 0, width: 150, height: 150 }
       }
   },
   computed: {
       sourceImgStyle() {
           let { scale } = this,
           top = scale.y + 'px',
           left = scale.x + 'px'
           return {
               top,
               left,
               width: scale.width + 'px',
               height: scale.height + 'px'
           }
       }
   },
   components: {
       myUpload,RippleButton
   },
    methods: {
		preventDefault(e) {
			e.preventDefault();
			return false;
		},
        handleClick() {
            this.$refs.fileinput.click()
        },
        handleChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.setSourceImg(files[0])
        },
        setSourceImg(file) {
            const fr = new FileReader()
            fr.onload = () =>  {
                this.sourceImgUrl = fr.result
                this.startCrop()
            }
            fr.readAsDataURL(file)
        },
        startCrop() {
            const img = new Image()
            img.src = this.sourceImgUrl;
            img.onload = () => {
                let nWidth = img.naturalWidth,
					nHeight = img.naturalHeight,
					nRatio = nWidth / nHeight,
					// w = sim.width,
					// h = sim.height,
					x = 0,
                    y = 0;
                    this.sourceImg = img
                    this.createImg()
            }
        },
        createImg(e) {
            let { scale: { x, y } } = this
            if(e) {
                this.sourceImgMouseDown.on = false;
            }
            const canvas = this.$refs.canvas,
                  ctx = canvas.getContext("2d");
            canvas.height = 150;
            canvas.width = 150;
            ctx.clearRect(0, 0 ,150, 150)
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, 150, 150);
            ctx.drawImage(this.sourceImg, x, y, 150, 150)
            this.createImgUrl = canvas.toDataURL("image/png")
        },
        imgStartMove(e) {
            e.preventDefault();
            let { sourceImgMouseDown, scale } = this
            sourceImgMouseDown.mx = e.screenX;
            sourceImgMouseDown.my = e.screenY;
            sourceImgMouseDown.x = scale.x;
            sourceImgMouseDown.y = scale.y;
            sourceImgMouseDown.on = true;
        },
        imgMove(e) {
            e.preventDefault();
            let { 
                sourceImgMouseDown: {
                    on, mx, my, x, y
                },
                scale
             } = this,
             nX = e.screenX,
             nY = e.screenY,
             dX = nX - mx,
             dY = nY - my,
             rX = x + dX,
             rY = y + dY;
             if(!on) return;
			// if (rX > 0) {
			// 	rX = 0;
			// }
			// if (rY > 0) {
			// 	rY = 0;
            // }
            scale.x = rX;
			scale.y = rY;
        },
        wheelFunc(e) {
            if(e.wheelDelta > 0) {
                let { scale } = this
                scale.zoomAddOn = true
               
                    let range = ++scale.range
                    this.zoomImg(range)
                
            } else {
                let { scale } = this
                scale.zoomAddOn = true
                
                    let range = --scale.range
                    this.zoomImg(range)
                
            }
        },
        zoomImg(newRange) {
            let { scale, sourceImgMouseDown } = this,
                nWidth = scale.width + 200 * newRange / 100,
                nHeight = scale.height + 200 * newRange / 100,
                nX = sourceImgMouseDown.mx,
                nY = sourceImgMouseDown.my
                scale.x = nX;
                scale.y = nY;
                scale.width = nWidth;
                scale.height = nHeight
                scale.range = newRange
                this.createImg();
        }






        ,
        toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
        },
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    }
}
</script>
<style lang="stylus" scoped>
.set {
    text-align center
    margin-top 50px
    .vicp-img {
        position absolute
        display block
    }
}
</style>