<template>
    <div class="fakescreen">
        <div class="intro-animation" ></div>
    </div>
</template>

<script>
import loading from '../assets/intro.json'
import * as lottie from 'lottie-web'

export default {
    name: 'intro',
    data: () => ({
        speed: .75,
        elt: {},
        autoplay: true,
    }),
    mounted() {
        this.elt = this.$el.children[0];
        this.animData = this.buildAnimation();
        this.animData.addEventListener('complete', this.isDone);
    },
    methods: {
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

.fakescreen {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
}

.anim-intro-main {
    fill: var(--color-invert);
    stroke: var(--color-invert);
}

.anim-intro-mask {
    fill: var(--color-bg-dark);
    stroke: var(--color-bg-dark);
}

.anim-bg {
    fill: transparent;
    stroke: transparent;
}
.intro-animation {
    
    width: 300px;
}
</style>
