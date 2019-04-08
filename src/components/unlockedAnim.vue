<template>
    <div class="fakeload">
        <div class="anim-icon" ></div>
    </div>
</template>

<script>
import loading from '../assets/boxunLock.json'
import * as lottie from 'lottie-web'

export default {
    name: 'loadingicon',
    data: () => ({
        speed: 1,
        elt: {},
        autoplay: true,
    }),
    mounted() {
        this.elt = this.$el.children[0];
        this.animData = this.buildAnimation();
        // this.animData.addEventListener('complete', this.isDone);
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
                loop: true,
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

.fakeload {
    display: flex;
    justify-content: center;
    align-items: center;
}

.anim-unlock-main {
    fill: var(--color-invert);
    stroke: var(--color-invert);
}

.anim-unlock-mask {
    fill: var(--color-bg-dark);
    stroke: var(--color-bg-dark);
}

.anim-bg {
    fill: var(--color-bg-dark);
    stroke: var(--color-bg-dark);
}
.anim-icon {
    width: 300px;

    /* border: 2px solid rgba(0,0,0,0.25); */
}


@media screen and (max-width: 960px) { 
    .icon {
        width: 100px;
    }
}

@media screen and (max-width: 567px) { 
    .icon {
        width: 80%;
    }
}
</style>
