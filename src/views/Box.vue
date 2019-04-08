<template>
    <div class="fullscreen">
        <lockbox v-show="swap" ref="lock" />
        <unlockbox v-show="!swap" ref="unlock" />
    </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/firebase/init'
import lockbox from '../components/lockbox.vue'
import unlockbox from '../components/unlockbox.vue'

export default {
    name: 'Box',
    components: {
        lockbox,
        unlockbox
    },
    data: () => ({
        
        snapshot: null,
        box: null,
        swap: null,
        noMatch: true,
        hasTimer: true,
    }),
    computed: {
        app() {
            return this.$root.$children[0];
        },
        loaded() {
            return this.app.loaded;
        }
    },
    created() {
        this.getBox();
        // console.log('Hello box')
    },
    methods: {
        overdueBox() {
            this.swap = !this.swap;
            this.box.locked = false;
            console.log('Overdue at box.vue')
        },
        getBox() {
            // let ref = db.collection('boxes').orderBy('time');
            // ref.onSnapshot(snapshot => {
            //     snapshot.docChanges().forEach(change => {
            //     if (change.type == 'added') {
            //         let doc = change.doc
            //         this.box = {
            //             masterkeys: doc.data().masterkeys,
                        
            //         }
            //     }
            //     });
            // })

            let ref = db.collection('boxes').where('name', '==', this.$route.params.id)
            // console.log(ref);
             ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    // console.log(change.type)
                    if (change.type == 'added'||'modified') {
                        let doc = change.doc
                        this.snapshot = doc;
                        this.box = {
                            content: doc.data().content,
                            locked: doc.data().locked,
                            name: doc.data().name,
                            target: doc.data().target,
                            timestamp: doc.data().timestamp,
                            title: doc.data().title,
                        }
                        // this.app.mirror = this.box;
                        this.swap = doc.data().locked;
                        // this.loaded = true;
                        if (this.box.locked)
                            this.$refs.lock.$refs.timer.init();
                        else
                            this.$refs.unlock.init();
                        // console.log(this.box);
                        console.log('Received');
                        this.app.mirror = this.box.locked;
                    }
                    // console.log(this.swap)
                });
            })
            
            // ref.get()
            // .then((snapshot) => {
            //     if (snapshot.docs.length) {
            //         this.noMatch = false;
            //         this.box = snapshot.docs[0].data();
            //         this.snapshot = snapshot.docs[0];
            //         this.loaded = true;
            //                             console.log(this.box);
            //         console.log(this.snapshot)
            //         // Determine locked state, if locked then have timer
            //         if (this.box.locked)
            //             this.$refs.lock.$refs.timer.init();
            //     } else {
            //         console.log('No match found')
            //         this.noMatch = true;
            //     }
            // }).catch((err) => {
            //     console.log(err)
            // })
        },
        // checkLock() {
        //     if (this.loaded) {
        //         if (this.box.locked) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     } else {
        //         return false;
        //     }
        // }
    }

}
</script>

<style>
.fullscreen {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    /* height: calc(100vh - 48px); */
    width: 100vw;
    height: 90%;
    
}

@media screen and (max-width: 960px) { 
    .fullscreen {
        height: auto;
    }
}

@media screen and (max-width: 567px) { 
    .fullscreen {
        height: auto;
    }
}
</style>
