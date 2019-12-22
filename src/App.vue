<template>
    <div id="app"> 
        <VueMenu />

        <b-container class="bv-example-row" fluid> 
            <b-row>
                <b-col cols="8">
                    <div id="phaser-example"></div>
                </b-col>
                <b-col cols="4"> 
                    <b-table striped hover
                        id="my-table"
                        :items="records"
                        :per-page="perPage"
                        :current-page="currentPage"
                        small
                        ></b-table>
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                        ></b-pagination>
                    <p class="mt-3">Current Page: {{ currentPage }}</p>
                </b-col>
            </b-row>
        </b-container>


        <div id="Game"></div>
        <img src="./assets/logo.png" />
        <img src="./assets/rain.png" />
        <p> {{ message }} </p>
        <p v-if="seen">이제 나를 볼 수 있어요</p>
        <button v-on:click="reverseMessage">메시지 뒤집기</button>
        <input v-model="message"> 
        <ol>
            <li v-for="todo in todos">
                {{ todo.some }}
            </li>
        </ol>
        <h1>{{ msg }}</h1>

        <footer><address>서울특별시 강서구 내발산동</address></footer> 
        <VueDraggable />

    </div>


</template>

<script>

import VueDraggable from "./components/VueDraggable";

import VueMenu from "./components/VueMenu.vue";
import { GameScene, EmptyScene } from "./Ksoogame.ts";

export default {
    components: {
        VueDraggable,
        VueMenu,
    },
    name: 'app',
    data () {
        return {
            element: [
                {name: "han", id:"sd"},
                {name: "han1", id:"sd2"}
            ],
            msg: 'Welcome to Your Vue.js App',
            message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다' ,
            seen: true,
            todos: [
                {some: "abc"},
                {some: "abc1"},
                {some: "abc2"},
                {some: "abcs3"},
            ],
            records: '',
            ksoo: 'ksoo',
            perPage: 10,
            currentPage: 1,
        }
    },
    created() {
    },
    computed: {
        rows() {
            return this.records.length;
        }
    },
    mounted () {
        new EmptyScene('Game'); 
        this.updateRecords();
        let canvas = document.querySelector("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";﻿
    },
    methods:
    {
        updateRecords: function() {
            var thiz = this;
            var updater = function() {
                var xhr = new XMLHttpRequest();
                if(!xhr) {
                    alert("can not create XHR instance");
                    return false;
                } 
                var base_url = "http://ec2-13-124-178-78.ap-northeast-2.compute.amazonaws.com:8080/jdodge/service?cmd=showAll"; 
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == xhr.DONE) {
                        if(xhr.status == 200 || xhr.status == 201) {
                            console.log(xhr.responseText);
                            var json = JSON.parse(xhr.responseText);
                            // var result = '';
                            // for(var i=0; i<json.length; i++) {
                            //     result += json[i].name + " | " + json[i].score; 
                            //     result += '//';
                            // }
                            
                            thiz.records = json;
                        }
                        else {
                            console.error(xhr.responseText);
                        }
                    }
                }; 
                xhr.open('get', base_url);
                xhr.send(); 
            };
            updater();
        },
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('');
            // var canvas = document.getElementById("phaser-example"); 
            // canvas.style.width = "100%"; 
        }
    }
}
</script>

<style>
</style>
