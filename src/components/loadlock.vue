<template>
    <div class="fakescreen">
        <div class="loading-icon" ></div>
    </div>
</template>

<script>
import loadingLocked from '../assets/boxLock.json'
import loadingUnlocked from '../assets/boxLockRev.json'
import * as lottie from 'lottie-web'

export default {
    name: 'loadingicon',
    data: () => ({
        speed: 1,
        elt: {},
        autoplay: true,
    }),
    computed: {
        app() {
            return this.$root.$children[0]
        }
    }, 
    mounted() {
        this.elt = this.$el.children[0];
        
    },
    methods: {
        init() {
            this.animData = this.buildAnimation();
            this.animData.addEventListener('complete', this.isDone);
            this.animData.play();
        },
        isDone() {
            this.$emit('done');
        },
        play() {
            console.log('Loading should trigger');
            this.animData.play();
        },
        buildAnimation() {
            const self = this;
            const animData = {
                wrapper: self.elt,
                animType: 'svg',
                loop: false,
                prerender: true,
                autoplay: false,
            };
            if (this.app.mirror) {
                console.log('Loading locked')
                animData.animationData = loadingLocked;
            } else {
                console.log('Loading unlocked')
                animData.animationData = loadingUnlocked;
            }
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

.anim-lock-main {
    fill: var(--color-invert);
    stroke: var(--color-invert);
}

.anim-lock-mask {
    fill: var(--color-bg-dark);
    stroke: var(--color-bg-dark);
}

.anim-bg {
    fill: transparent;
    stroke: transparent;
}
.loading-icon {
    
    width: 300px;
}
</style>
