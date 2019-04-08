<template>
    <div class="contents px-3" v-show="loaded" v-if="checkLock()">
        <v-card flat class="darkcard">
            <div class="unlocked">
                <unlockedanim />
            </div>
            <v-card-title primary-title>
                <div class="headline mb-3 text-center">
                    <span>
                        {{title || $route.params.id}}
                    </span>
                    <v-icon color="primary" v-if="link" class="mb-1 ml-2 activeLink" @click="goToLink()">link</v-icon>    
                    <!-- <v-icon color="grey" v-else class="mb-1 ml-2">link_off</v-icon>     -->
                </div>
            </v-card-title>
                    <!-- <div> {{ content }} </div> -->
            <v-card-text>
                <div class="text-center"></div>
                {{content}}
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import unlockedanim from './unlockedAnim.vue'

export default {
    name: 'unlockbox',
    components: {
        unlockedanim,
    },
    data: () => ({

    }),
    computed: {
        app() {
            return this.$root.$children[0];
        },
        loaded() {
            return this.$parent.loaded;
        },
        content() {
            if (this.loaded)
                return this.$parent.box.content;
            else 
                return null;
        },
        title() {
            if (this.loaded)
                return (this.$parent.box.title) ? this.$parent.box.title : null;
            else 
                return null;
        },
        link() {
            if (this.loaded)
                return (this.$parent.box.URL) ? this.$parent.box.URL : null;
            else 
                return null;
        },
    },
    watch: {
        // loaded(state) {
        //     console.log(state);
        //     if (state)
        //         this.content = this.$parent.box.content;
        // }
    },
    methods: {
        init() {
            // this.content = this.$parent.box.content;
            console.log(this.content);
        },
        goToLink() {
            window.open(this.link);
        },
        checkLock() {
            if (this.$parent.loaded) {
                if (!this.$parent.box.locked) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
</script>

<style>
.unlocked {
    width: 100%;
    height: auto;
    /* border: 2px solid red; */
    box-sizing: border-box;
}

.anno {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    letter-spacing: .5ch;
}

.text-center {
    width: 100%;
    display: flex;
    justify-content: center;
}

.theme--dark.v-sheet {
    background-color: var(--color-bg-dark);
}



.contents {
    /* transition: all 3s ease-out; */
    -webkit-animation: fadein 400ms var(--quint);
    -moz-animation: fadein 400ms var(--quint);
    animation: fadein 400ms var(--quint);
    box-sizing: border-box;
    min-width: 300px;
    /* opacity: var(--opacity-anno); */
    /* background-color: rgba(0,0,0,0.125); */
    /* height: 200px; */
    /* border: 2px solid red; */
}

.activeLink {
    cursor: pointer;
}

@keyframes fadein {
    0%   { opacity: 0; }
    100% { opacity: 1; }
}
</style>
