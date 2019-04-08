<template>
    <div class="contents px-3" v-show="checkLock() && loaded">
            <v-dialog v-model="dialog" persistent max-width="290">
            <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template> -->
                <v-card>
                    <v-card-title class="headline pa-3">{{label + '?'}}</v-card-title>
                    <v-card-text>This will override your countdown so the hidden message is public and visible.</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary " flat @click="dialog = false">Cancel</v-btn>
                        <v-btn color="primary " flat @click="doUnlock()">{{prefix}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- <span class="text-uppercase anno mb-2" v-if="checkLock()">unlocked in</span> -->
            <!-- <span style="height:10px;width:100%;" class="mt-2 hidden-sm-and-up"></span> -->
            <div v-if="checkLock()" class="mb-3">
                <v-layout>
                    <v-flex 
                        xs10 offset-xs1
                        sm6 offset-sm3
                        md6 offset-md3>
                        <v-text-field
                            :label="label"
                            append-outer-icon="vpn_key"
                            v-model="answer"
                            @blur="focusOff"
                            @focus="focusOn"
                            hide-details
                            @keyup.enter="submit"
                            click:append-outer="submit"
                            :rules="[rules.required, rules.counter]"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </div>
            <timer ref="timer"/>
        </div>
</template>

<script>
import timer from '../components/timer.vue'
import firebase from 'firebase/app'
import db from '@/firebase/init'

export default {
    name: 'lockbox',
    components: {
        timer,
    },
    data: () => ({
        rules: {
            required: value => !!value || `Required.`,
            counter: value => value ? value.length <= 20 || 'Max 20 characters' : false,
        },
        label: '',
        answer: '',
        prefix: '',
        prefixes: ['Unclock', 'Unblock', 'Unlock'],
        suffixes: ['clock', 'block', 'lock'],
        dialog: false,
    }),
    mounted() {
        // console.log('Hello locked box')
        this.shuffleHint();
        window.addEventListener('resize', this.shuffleHint);
    },
    computed: {
        app() {
            return this.$root.$children[0];
        },
        loaded() {
            return this.$parent.loaded;
        },
    },
    methods: {
        shuffleHint() {
            let preroll = Math.floor((Math.random() * this.prefixes.length));
            let subroll = Math.floor((Math.random() * this.suffixes.length));
            if (preroll == subroll) {
                preroll = Math.floor((Math.random() * this.prefixes.length));
            }
            this.prefix = this.prefixes[preroll];
            this.label = `${this.prefixes[preroll]} this ${this.suffixes[subroll]}`
            // console.log(`Roll is ${preroll} : ${subroll}`)
        },
        focusOn() {
            this.label = 'Enter lockbox creator key';
        },
        focusOff() {
            this.shuffleHint();
        },
        overdue() {
            this.$parent.box.locked = false;
            // console.log('Unlock?');
            this.app.goToBox(this.$route.params.id);
        },
        validateAnswer() {
            db.collection('boxes').where(firebase.firestore.FieldPath.documentId(), '==', this.answer).get()
                .then((snapshot) => {
                    if (snapshot.docs.length) {
                        console.log('Match found')
                        console.log(snapshot.docs[0])
                        this.confirmUnlock();
                    } else {
                        console.log('No match');
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        confirmUnlock() {
            this.dialog = true;
        },
        doUnlock(msg) {
            this.dialog = false;
            // console.log(msg)
            db.collection('boxes').doc(this.answer).update({
                locked: false,
            })
        },
        submit() {
            console.log(`Try submitting ${this.answer}`)
            if (this.answer.length !== 20) {
                this.answer = '';
                this.label = 'Incorrect key';
            } else {
                this.validateAnswer();
            }
        },  
        checkLock() {
            if (this.$parent.loaded) {
                if (this.$parent.box.locked) {
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

.anno {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    letter-spacing: .5ch;
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


@keyframes fadein {
    0%   { opacity: 0; }
    100% { opacity: 1; }
}
</style>
