<template>
    <div class="timercontainer" v-if="countdown">
        <div class="enumcontainer" v-for="(item,key) in enums" :key="key">
            <div class="enumGrid">
                <div class="timer-Main">{{item.value}}</div>
                <div class="timer-Anno text-uppercase">{{item.name}}</div>
            </div>
            <div v-if="key < 3" class="mt-3 mx-2 hideXS">
                <div class="timer-Divider">:</div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'timer',
    data: () => ({
        msg: 'Hello world',
        timer: null,
        countdown: null,
    }),
    computed: {
        enums() {
            const self = this;
            return [
                {
                    value: self.localize(self.countdown.days),
                    name: 'days',
                },
                {
                    value: self.localize(self.countdown.hours),
                    name: 'hours',
                },
                {
                    value: self.localize(self.countdown.minutes),
                    name: 'minutes',
                },
                {
                    value: self.localize(self.countdown.seconds),
                    name: 'seconds',
                },
            ]
        },
        box() {
            return this.$parent.$parent.box;
        }
    },
    // props: {
    //     box: Object,
    // },
    mounted() {
        // console.log(this.msg);
        // this.getCountdownTime(Date.now() - 1554438480425);
        // console.log(this.countdown)
        // console.log(Date.now())
        // console.log(this.box.target)
    },
    methods: {
        localize(num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        },
        init() {
            console.log('I am ready');
            console.log(this.box)
            if (this.box.locked)
                this.setTimer();
            
        },
        setTimer() {
            const self = this;
            this.timer = setInterval(() => {
                if (self.box) {
                    let result = (Date.now() - self.box.target)*-1;
                    // console.log(`${Date.now()} - ${self.box.target} = ${result*-1}`)
                    // console.log(result)
                    if (result) {
                        this.countdown = self.getCountdownTime(result);
                        // console.log(this.countdown);
                    } else {
                        this.countdown = {
                            days: '00',
                            hours: '00',
                            minutes: '00',
                            seconds: '00'
                        }
                    }
                } else {
                    return {
                        days: '00',
                        hours: '00',
                        minutes: '00',
                        seconds: '00'
                    };
                }
            }, 1000);
        },
        endTimer() {
            this.timer = clearInterval(this.timer);
        },
        getCountdownTime(milliseconds) {
            let days, hours, minutes, seconds;
            if (milliseconds > 0) {
                seconds = Math.floor(milliseconds / 1000);
                minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
                hours = Math.floor(minutes / 60);
                minutes = minutes % 60;
                days = Math.floor(hours / 24);
                hours = hours % 24;
            } else {
                console.log('Overdue')
                this.$parent.$parent.overdueBox();
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
                this.endTimer();
            }
            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        },
    }
}
</script>

<style>
.enumGrid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.enumcontainer {
    display: flex;
    flex-direction: row;
    letter-spacing: .5ch;
    max-width: 23vw;
}

.timer-Main {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 6rem;
    height: 7rem;
}

.timer-Divider {
    font-size: 4rem;
}

.timercontainer {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}


@media screen and (max-width: 960px) { 

}
@media screen and (max-width: 567px) { 

    .timercontainer {
        flex-direction: column;
    }

    .timer-Divider {
        display: none;
    }

    .enumGrid {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .timer-Anno {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }

    .timer-Main {
        width: auto;
        height: auto;
        font-size: 4rem;
        /* display: flex;
        justify-content: center;
        
        height: 8rem; */
        height: 6rem;
    }
    .hideXS {
        display: none;
    }
    .enumcontainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        letter-spacing: .5ch;
        max-width: 100%;
        /* height: 8rem; */
    }
}
</style>
