// import Phaser from 'phaser';
import Vue from 'vue'
import { GameScene, EmptyScene } from "./Ksoogame.ts";

import App from './App.vue'

// import "bootstrap/dist/css/bootstrap.min.css"; 
// import "bootstrap/dist/js/bootstrap.js";
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueDraggable from "vue-draggable";
// Vue.use(Vuetify);


Vue.use(VueDraggable)
Vue.use(BootstrapVue)

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//       el: "#app",
//       components: { App },
//       template: "<App/>"
// }); 
// new EmptyScene('Game'); 
new Vue({
    el: '#app',
    render: function (createElement) {
        var t = createElement(App);
        // var t = createElement(Demo);
        return t;
    }
})


// new Vue({
//   el: '#app',
//     render: function (createElement) {
//         var t = createElement(HelloComponent);
//         new EmptyScene('Game'); 
//         return t;
//     }
// })
// new Vue({
//     vuetify,
//     el: '#app',
//     data: () => ({
//         drawer: null
//     }),
//     // render: h => h(HelloComponent)
//     // render: function (createElement) {
//     //     var t = createElement(HelloComponent);
//     //     new EmptyScene('Game'); 
//     //     return t;
//     // }
// })


//
//



// import HelloComponent from './Hello.vue'
//
// new Vue({
//     el: '#app',
//     template: `
//         <div>
//           Name: <input type="text" v-model="name">
//           <hello-component :name="name" :initialEnthusiasm="5" />
//         </div>
//       `,
//     data: {
//         name: 'World'
//     },
//     components: {
//         HelloComponent
//     }
// })
// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     scene: {
//         preload: preload,
//         create: create
//     }
// };


// var game = new Phaser.Game(config);
//
// // import blueButton1 from './assets/sprites/a.png';
// import blueButton1 from './assets/sprites/a.png';
//
// function preload ()
// {
//     this.load.image('mushroom', blueButton1); // 'assets/pics/akira.jpg');
// }
//
// function create ()
// {
//     var texture = this.textures.createCanvas('aatest', 256, 256);
//
//     var ctx = texture.context;
//
//     // ctx.fillStyle = '#ffffff';
//     // ctx.fillRect(0, 0, 256, 256);
//
//     ctx.strokeStyle = '#ffffff';
//     ctx.lineWidth = 12;
//     ctx.beginPath();
//     ctx.moveTo(20, 20);
//     ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
//     ctx.stroke();
//
//     texture.refresh();
//
//     this.add.image(300, 200, 'aatest');
//
//     this.add.image(600, 200, 'aatest').setAngle(20);
//
//     this.add.image(30, 45, 'mushroom');
//     this.add.image(60, 45, 'mushroom').setAngle(20);
//
// }
//
//
//
