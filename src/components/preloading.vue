<template>
    <div class="preloading">
        <div class="preloading-icon" ></div>
    </div>
</template>

<script>
import loading from '../assets/preBox.json'
import * as lottie from 'lottie-web'

export default {
    name: 'loadingicon',
    data: () => ({
        speed: 1,
        elt: {},
        autoplay: true,
        animData: null,
    }),
    mounted() {
        this.elt = this.$el.children[0];
        this.animData = this.buildAnimation();
        this.animData.addEventListener('complete', this.isDone);
    },
    methods: {
        play() {
            this.animData.play();
        },
        isDone() {
            this.$emit('done');
        },
        buildAnimation() {
            const self = this;
            const animData = {
                wrapper: self.elt,
                animType: 'svg',
                loop: false,
                prerender: true,
                autoplay: true,
            };
            animData.animationData = loading;
            return lottie.loadAnimation(animData);
        },
    }
}
</script>

<style>
svg {
    width: 100%;
}

.preloading {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
}

.anim-preload-main {
    fill: var(--color-invert);
    stroke: var(--color-invert);
}

.anim-preload-mask {
    fill: var(--color-bg-dark);
    stroke: var(--color-bg-dark);
}

.anim-bg {
    fill: transparent;
    stroke: transparent;
}
.preloading-icon {
    
    width: 300px;
}
</style>
