
<template>
    <div id="app"> 
        <VueMenu />

        <b-container class="bv-example-row" fluid> 
            <b-row>
                <b-col cols="8">
                    <div id="phaser-example"></div>
                </b-col>
                <b-col cols="2"> 
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


        <img src="../assets/logo.png" />
        <img src="../assets/rain.png" />
        <p> {{ message }} </p>
        <h1>{{ msg }}</h1>

        <footer><address>서울특별시 강서구 내발산동</address></footer> 

    </div>


</template>

<script>


import VueMenu from "./VueMenu.vue";
import { GameScene, EmptyScene } from "../Ksoogame.ts";
import axios from 'axios';

export default {
    components: {
        VueMenu,
    },
    name: 'game',
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
            records: [{"name":"han", "score":123}],
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
        // let canvas = document.querySelector("canvas");
        // canvas.style.width = "100%";
        // canvas.style.height = "100%";﻿
    },
    methods:
    {
        updateRecords: function() {
            var thiz = this;
            thiz.records = [{"name":"han", "score":124443}];
            var updater = function() {
                var base_url = "https://jdodge-1203598482.ap-northeast-2.elb.amazonaws.com/jdodge/service?cmd=showAll";
                // var base_url = "https://api.ipify.org?format=json";
                axios.get(base_url)
                    .then( response => { 
                        // var json = JSON.parse(response.data);
                        // console.log(json); 

                        thiz.records = response.data;
                    } ) // SUCCESS
                    .catch( response => { console.log(response); } ); // ERROR

            };
            updater();
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}
</style>
