<template>
  <v-app dark>
    <v-dialog v-model="hasMessage" max-width="400" >
      <v-card >
        <v-card-title>
          <span class="headline pt-3 px-3">Save this key to override</span>
        </v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs2>
              <v-icon>vpn_key</v-icon>
            </v-flex>
            <v-flex xs10>
              <span class="title">{{message}}</span>
            </v-flex>
          </v-layout>
        </v-card-text>
        
      </v-card>
    </v-dialog>
    <intro @done="isIntrod()" v-if="$route.name == 'home'"/>
    <loadingicon ref="loader" @done="isLoaded()" v-if="$route.name == 'box'"/>
    <preloading @done="isPreLoaded()" v-if="$route.name == 'box'" v-show="!boxChecked"/>
    <v-content >
      <router-view v-show="dependent"/>
    </v-content>
    <div class="tail mb-1">
      <div @click="goToGitHub()" class="bttn">
        <!-- <div> -->
          <span class="fab fa-github fa-lg"></span>
        <!-- </div> -->
      </div>
    </div>
    <!-- <v-footer
      height="auto"
    >
      <div class="footer">
        <v-btn style="font-size: 2rem;" flat @click="goToGitHub()">
          <span class="fab fa-github"></span>
        </v-btn>
      </div>
    </v-footer> -->
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/firebase/init'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { format, differenceInMinutes } from 'date-fns'

import Home from './components/Home'
import loadingicon from './components/loadlock'
import preloading from './components/preloading'
import intro from './components/intro'


export default {
  name: 'App',
  components: {
    Home,
    preloading,
    loadingicon,
    intro,
    FontAwesomeIcon
  },
  data () {
    return {
      nameList: [],
      loaded: false,
      mirror: null,
      introd: false,
      hasMessage: false,
      message: null,
      primed: false,
      boxChecked: false,
    }
  },
  watch: {
    hasMessage(state) {
      if (this.primed) {
        console.log(state);
        if (!state) {
          this.primed = false;
          // this.rout
        }
      }
    }
  },
  created() {
    // 
    console.log(this.$route.name);
  },
  computed: {
    dependent() {
      if (this.$route.name == 'home') {
        if (this.introd)
          return true;
        else
          return false;
      } else if (this.$route.name == 'box') {
        if (this.loaded)
          return true;
        else
          return false;
      }
    }
  },
  mounted() {
    // console.log(this.getCountdownTime(Date.now() - 1554438480425));
    // this.writeTestBox();
    // console.log(this.getBID())

  },
  methods: {
    goToBox(name) {
      this.$router.push({name: 'box', params: { id: name }})
    },
    keyMsg(str) {
      this.message = str;
      this.hasMessage = true;
      this.primed = true;
    },
    isPreLoaded() {
      this.introd = false;
      this.boxChecked = true;
      console.log(this.$refs.loader)
      console.log('Preloaded')
      // console.log(this.mirror)
      this.$refs.loader.init();
      // this.setCSS('opacity-anno', 1);
      // console.log('Now?')
    },
    isLoaded() {
      this.introd = false;
      this.loaded = true;
      console.log('Is loaded')
      this.setCSS('opacity-anno', 1);
      // console.log('Now?')
    },
    isIntrod() {
      this.loaded = false;
      this.introd = true;
      this.setCSS('opacity-anno', 1);
      // console.log('Now?')
    },
    goToGitHub() {
      window.open("https://github.com/Inventsable");
    },
    getCountdownTime(milliseconds) {
      let day, hour, minute, seconds;
      seconds = Math.floor(milliseconds / 1000);
      minute = Math.floor(seconds / 60);
      seconds = seconds % 60;
      hour = Math.floor(minute / 60);
      minute = minute % 60;
      day = Math.floor(hour / 24);
      hour = hour % 24;
      return {
          day: day,
          hour: hour,
          minute: minute,
          seconds: seconds
      };
    },
    writeTestBox() {
      
    },
    checkBID(name) {
      // firebase.firestore.FieldPath.documentId()
      db.collection('boxes').where('name', '==', name).get()
      .then((snapshot) => {
        if (snapshot.docs.length) {
          return this.getBID();
        } else {
          return name;
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getBID() {
      var Sentencer = require('sentencer');
      var crayola = require('crayola');
      let bid = null;
      const bestiary = require('./bestiary.json');
      Sentencer.configure({
        nounList: bestiary,    
      });
      let seed = Math.floor(Math.random() * Math.floor(2));
      if (seed == 1)
        bid = `${crayola().name.split(' ').join('').split('\'').join('').split('\{').join('').split('\}').join('')}${Sentencer.make("{{ noun }}")}`
      // else if (seed == 1)
      //   bid = `${AltSentencer.make("{{ noun }}")}${Sentencer.make("{{ noun }}")}`
      else
        bid = `${Sentencer.make("{{ adjective }}")}${Sentencer.make("{{ noun }}")}`
      bid = bid.charAt(0).toUpperCase() + bid.slice(1);
      console.log(bid)
      return this.checkBID(bid)
    },
    randomBID() {
      var Sentencer = require('sentencer');
      var crayola = require('crayola');
      let bid = null;
      const bestiary = require('./bestiary.json');
      Sentencer.configure({
        nounList: bestiary,    
      });
      let seed = Math.floor(Math.random() * Math.floor(2));
      if (seed == 1)
        bid = `${crayola().name.split(' ').join('').split('\'').join('').split('\{').join('').split('\}').join('')}${Sentencer.make("{{ noun }}")}`
      else
        bid = `${Sentencer.make("{{ adjective }}")}${Sentencer.make("{{ noun }}")}`
      bid = bid.charAt(0).toUpperCase() + bid.slice(1);
      return bid;
    },
    getCSS(prop) { return window.getComputedStyle(document.documentElement).getPropertyValue('--' + prop); },
    setCSS(prop, data) { document.documentElement.style.setProperty('--' + prop, data); },
  }
}
</script>


<style>
:root {
  --color-bg-dark: #212121;
  --color-invert: #fff;

  --color-selection: #46a0f5;
  --color-class: #ffca23;
  --color-id: #50db29;

  --quad: cubic-bezier(0.48, 0.04, 0.52, 0.96);
  --quart: cubic-bezier(0.76, 0.00, 0.24, 1.00);
  --quint: cubic-bezier(0.84, 0.00, 0.16, 1.00);

  --opacity-anno: 0;

  background-color: var(--color-bg-dark);
}

body::-webkit-scrollbar {
    display: none;
}

.tail {
  display: flex;
  width: 100vw;
  position: absolute;
  bottom: 0px;
  /* margin-right: .325rem; */

  justify-content: flex-end;
  align-items: center;
}

.bttn {
  margin-right: 1rem;
  color: var(--color-invert) !important;
  /* border: 2 px solid red; */
  background-color: transparent;
  cursor: pointer;
  /* padding: 5px 5px; */
  /* width: 30px; */
  padding: .25rem 1.5rem;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bttn:hover {
  background-color: rgba(255,255,255,0.12);
}

.footer {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: #101010;
}

.theme--dark.application {
  background-color: #212121;
}
</style>

