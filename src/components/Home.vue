<template>
    <v-layout :style="getHomeStyle()" class="pt-4">
        <v-flex 
            xs12
            sm10 offset-sm1
            lg6 offset-lg3
            class="mb-3">
            <v-card flat>
                <!-- <div class="createanim">
                    <createanim />
                </div> -->
                <v-card-title primary-title>
                    <div style="width: 100%;">
                        <!-- <h3 class="headline mb-3">{{$route.name}}</h3> -->
                        <!-- <div> -->
                            <v-stepper v-model="e1" vertical>
                            <!-- <v-stepper-header> -->
                            <!-- <v-stepper-step :complete="e1 > 1" step="1">Create lockbox content</v-stepper-step> -->

                            <!-- <v-divider></v-divider> -->

                            <!-- <v-stepper-step :complete="e1 > 2" step="2">Define countdown</v-stepper-step> -->

                            <!-- <v-divider></v-divider> -->

                            <!-- <v-stepper-step step="3">Confirm</v-stepper-step> -->
                            <!-- </v-stepper-header> -->

                            <!-- <v-stepper-items> -->
                            <v-stepper-step :complete="e1 > 1" step="1">Create lockbox content</v-stepper-step>
                            <v-stepper-content step="1">
                                <v-card
                                flat
                                
                                style="background-color: transparent;"
                                ></v-card>

                                <v-card-text id="contents">
                                <!-- <v-container grid-list-md> -->
                                    <v-layout wrap>
                                        <v-flex xs12 class="mb-2">
                                            <v-text-field box 
                                                label="Title" 
                                                hint="Optional"
                                                persistent-hint
                                                v-model="title"></v-text-field>
                                        </v-flex>
                                        
                                        <v-flex xs12>
                                            <v-textarea
                                                box
                                                label="Content"
                                                
                                                hide-details
                                                v-model="content"
                                                required
                                                ></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                <!-- </v-container> -->
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    color="primary"
                                    flat
                                    :disabled="(content) ? false : true"
                                    @click="e1 = 2"
                                    >
                                    Continue
                                    </v-btn>

                                    
                                </v-card-actions>
                            </v-stepper-content>

                            <v-stepper-step :complete="e1 > 2" step="2">Define countdown</v-stepper-step>
                            <v-stepper-content step="2" id="dates">
                                <v-tabs
                                    v-model="tabber"
                                    color="transparent"
                                    dark
                                    @change="assignPicker"
                                    slider-color="primary"
                                    >
                                        <v-tab :class="getTabClass()">
                                            <v-icon>alarm</v-icon>
                                        </v-tab>
                                        <v-tab-item>
                                            <v-card flat style="background-color: transparent;">
                                                <v-card-text></v-card-text>
                                                <div id="stopwatch" class="stopwatch_container">
                                                    <div class="stopwatch_grid">
                                                        <div v-for="counter in enums" :key="counter.name" class="stopwatch__btn">
                                                            <v-btn block flat
                                                                @click="incrementUp(counter)">
                                                                <v-icon>arrow_drop_up</v-icon>
                                                            </v-btn>
                                                            <span class="stopwatch__title">{{counter.value}}</span>
                                                            <span class="stopwatch__type text-uppercase">{{counter.name}}</span>
                                                            <v-btn block flat
                                                                @click="incrementDown(counter)">
                                                                <v-icon>arrow_drop_down</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <!-- <div style="border: 2px solid red;"></div>
                                                        <div style="border: 2px solid red;"></div>
                                                        <div style="border: 2px solid red;"></div> -->
                                                    </div>
                                                </div>
                                            </v-card>
                                        </v-tab-item>
                                        <v-tab :class="getTabClass()">
                                            <v-icon>event</v-icon>
                                        </v-tab>
                                        <v-tab-item style="min-width: 290px;">
                                            <v-date-picker v-model="datepicker" :landscape="landscapePickers" ></v-date-picker>
                                            <v-time-picker v-model="timepicker" :landscape="landscapePickers"></v-time-picker>
                                            <!-- <v-card flat style="background-color: transparent;">
                                                <v-card-text>
                                                </v-card-text>
                                            </v-card> -->
                                        </v-tab-item>
                                    </v-tabs>
                                <v-card
                                flat
                                style="background-color: transparent;"
                                ></v-card>

                                <v-card-text>

                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    flat
                                    @click="e1 = 1"
                                    >
                                    Back
                                    </v-btn>
                                    <v-btn
                                    color="primary"
                                    flat
                                    class="mr-4"
                                    :disabled="checkPickerBtn()"
                                    @click="stepToConfirm()"
                                    >
                                    Continue
                                    </v-btn>

                                    
                                </v-card-actions>
                            </v-stepper-content>

                            <v-stepper-step step="3">Confirm</v-stepper-step>
                            <v-stepper-content step="3">
                                <v-card
                                class=""
                                
                                ></v-card>
                                <v-card-text>
                                    Confirmation animation and message goes here.

                                    Should have a checkbox, agree that content is fictional.

                                    This is not secure, has no authentication, and could be pried open by any hacker.
                                </v-card-text>
                                <v-card-actions>

                                    <v-spacer></v-spacer>
                                    <v-btn
                                    flat
                                    @click="e1 = 2"
                                    >
                                    Back
                                    </v-btn>
                                    <v-btn
                                    color="primary"
                                    flat
                                    :loading="submitting"
                                    @click="submitBox()"
                                    >
                                    Submit
                                    </v-btn>

                                    
                                </v-card-actions>
                            </v-stepper-content>
                            <!-- </v-stepper-items> -->
                        </v-stepper>
                        </div>
                    <!-- </div> -->
                </v-card-title>
                <!-- <v-card-text>

                </v-card-text> -->
                <!-- <v-divider></v-divider>
                <v-card-actions>
                    <v-btn flat>
                        cancel
                    </v-btn>
                    <v-btn flat>
                        submit
                    </v-btn>
                </v-card-actions> -->
            </v-card>
        </v-flex>
    </v-layout>
    
</template>

<script>
import createanim from './createanim.vue'
import db from '@/firebase/init'

export default {
    name: 'Home',
    data: () => ({
        e1: 1,
        title: null,
        content: null,
        tabber: null,
        datepicker: new Date().toISOString().substr(0, 10),
        timepicker: null,
        width: null,
        resized: false,
        package: null,
        submitting: false,
        landscapePickers: null,
        countdown: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }),
    components: {
        createanim,
    },
    computed: {
        app() {
            return this.$root.$children[0];
        },
        countdownExists() {
            let total = this.countdown.days + this.countdown.hours + this.countdown.minutes + this.countdown.seconds;
            if (total > 0)
                return true;
            else
                return false;
        },
        enums() {
            const self = this;
            return [
                {
                    value: self.localize(self.countdown.days),
                    index: 0,
                    max: 30,
                    name: 'days',
                },
                {
                    value: self.localize(self.countdown.hours),
                    index: 1,
                    max: 24,
                    name: 'hours',
                },
                {
                    value: self.localize(self.countdown.minutes),
                    index: 2,
                    max: 60,
                    name: 'minutes',
                },
                {
                    value: self.localize(self.countdown.seconds),
                    index: 3,
                    max: 60,
                    name: 'seconds',
                },
            ]
        },
    },
    mounted() {
        
        // console.log('Hello world')
        window.addEventListener('resize', this.checkWindow);
        if (document.body.clientWidth > 567) {
            this.landscapePickers = true;
        } else {
            this.landscapePickers = false;
        }
    },
    methods: {
        stepToConfirm() {
            this.e1 = 3;
            this.assembleBox();
        },
        toMilliseconds(days, hrs, min, sec) {
            return ((days*24*60*60+hrs*60*60+min*60+sec)*1000);
        },
        getPickerTime() {
            console.log(this.activePicker);
            if (this.activePicker == 'countdown') {
                // miliseconds(hrs,min,sec)
                const days = this.countdown.days;
                const hrs = this.countdown.hours;
                const min = this.countdown.minutes;
                const sec = this.countdown.seconds;
                return this.toMilliseconds(days,hrs,min,sec);
                // {
                // }
            }
        },
        assembleBox() {
            const self = this;
            let clockbox = {
                name: self.app.randomBID(),
                timestamp: Date.now(),
                target: self.getPickerTime() + Date.now(),
                content: self.content,
                title: self.title,
                locked: true,
            }
            this.package = clockbox;
            console.log(this.package);
        },
        checkPickerBtn() {
            if (!this.countdownExists)
                return true;
            else
                return false;
        },
        assignPicker(str) {
            // console.log(str);
            let pickers = ['countdown', 'calender'];
            this.activePicker = pickers[str];
            console.log(this.activePicker);
        },
        incrementUp(timer) {
            if (this.countdown[timer.name] < timer.max - 1) {
                this.countdown[timer.name]++;
                console.log('Can go up')
            } else {
                this.countdown[timer.name] = 0;
                if (timer.index > 0) {
                    let previous = this.enums[timer.index - 1];
                    this.countdown[previous.name]++;
                    // if (this.countdown[timer.index - 1] > 0)
                }
                console.log('Was maxed')
            }
        },
        incrementDown(timer) {
            if (this.countdown[timer.name] > 0) {
                this.countdown[timer.name]--;
                console.log('Can go down')
            } else {
                this.countdown[timer.name] = timer.max - 1;
                if (timer.index > 0) {
                    let previous = this.enums[timer.index - 1];
                    if (this.countdown[previous.name] > 0)
                        this.countdown[previous.name]--;
                    // if (this.countdown[timer.index - 1] > 0)
                }
            }
        },
        submitBox() {
            this.submitting = true;
            const self = this;
            console.log('Submitting box')
            db.collection('boxes').where('name', '==', name).get()
                .then((snapshot) => {
                    if (snapshot.docs.length) {
                        // this.error = true;
                        self.package.name = self.app.randomBID();
                        // this.errorMsg = ''
                    }
                    this.sendPackage();
                }).catch((err) => {
                    console.log(err)
                })
            
        },
        sendPackage() {
            const self = this;
            db.collection('boxes').add(this.package)
            .then((snapshot) => {
                // console.log(snapshot);
                this.app.keyMsg(snapshot.id);
                let name = self.package.name;
                self.clearPackage();
                this.app.goToBox(name);
                // self.$router.push({name: 'box', params: { id: self.package.name }})
            });

        },
        clearPackage() {
            this.countdown.days = 0;
            this.countdown.hours = 0;
            this.countdown.minutes = 0;
            this.countdown.seconds = 0;
            this.title = null;
            this.content = null;
            this.tabber = 0;
        },
        getHomeStyle() {
            return `

            
            
            `
        },
        getTabClass() {

            return `cursor: pointer;`
        },
        checkWindow(evt) {
            // console.log(evt);
            this.resized = true;
            this.width = evt.target.innerWidth;
            if (this.width > 567) {
                this.landscapePickers = true;
            } else {
                this.landscapePickers = false;
            }
        },
        checkIfLandscapePickers() {
            // let width = document.body.clientWidth;
            console.log(this.width);
            
        },
        localize(num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        },
    }
}
</script>


<style>
.createanim {
    width: 100%;
    height: auto;
    /* border: 2px solid red; */
    box-sizing: border-box;
}

.theme--dark.v-sheet {
    background-color: rgba(0,0,0,0.5);
}

.v-stepper__content {
    padding: 0px 0px 0px 0px;
}
#contents {
    padding: 0px;
}

.stopwatch__btn {
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    width: 100%;
}

.stopwatch__title {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.stopwatch__type {
    display: flex;
    justify-content: center;
    font-size: .8rem;
}

#dates {
    padding: 0px 0px 0px 0px;
    width: 90%;
}
.v-card__title {
    padding: 0px;
}

.v-stepper__header {
    box-shadow: 0px 0px 0px 0px;
}

.v-stepper--vertical .v-stepper__step {
    padding: 24px 24px 16px 10px;
}

#stopwatch .v-btn {
    margin: 0px 0px 0px 0px;
    padding: 0px 0px;
    min-width: 0px;
    height: auto;
}

#stopwatch .v-btn--block {
    margin: 0px 0px 0px 0px;
    padding: 0px 0px;
    width: auto;
}

.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: rgba(255,255,255,0.3);
}

.stopwatch_container {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 2px solid blue; */
}

.theme--dark.v-card, .theme--dark.v-picker__body {
    background-color: transparent;
}



.stopwatch_grid {
    display: grid;
    width: 300px;
    grid-template-columns: repeat(4, 1fr);
}

.v-card {
    box-shadow: 0px 0px 0px 0px;
}

.theme--dark.v-stepper {
    background-color: transparent;
    box-shadow: 0px 0px 0px 0x rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
}

.v-stepper {
    box-shadow: 0px 0px 0px 0px;
}

</style>
