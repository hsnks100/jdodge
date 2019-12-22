<template>
    <div id="app"> 
        <div>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">NavBar</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Link</b-nav-item>
                        <b-nav-item href="#" disabled>Disabled</b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                        </b-nav-form>

                        <b-nav-item-dropdown text="Lang" right>
                            <b-dropdown-item href="#">EN</b-dropdown-item>
                            <b-dropdown-item href="#">ES</b-dropdown-item>
                            <b-dropdown-item href="#">RU</b-dropdown-item>
                            <b-dropdown-item href="#">FA</b-dropdown-item>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content>
                                <em>User</em>
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <b-card
                                             title="Card Title"
                                             img-src="https://picsum.photos/600/300/?image=25"
                                             img-alt="Image"
                                             img-top
                                             tag="article"
                                             style="max-width: 20rem;"
                                             class="mb-2"
                                             >
                                             <b-card-text>
                                                 Some quick example text to build on the card title and make up the bulk of the card's content.
                                             </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>



        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">JDODGE {{ ksoo }}</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                        <li><a href="#">Link</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">리더보드 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">One more separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">Link</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div id="phaser-example">
        </div> 
        <div id="Game"></div>
        <h1>
        <table style="border: 2px solid #ff0000">
            <tr v-for="item in records">
                <td style="border: 2px solid #ff0000">
                    {{ item.name }} 
                </td>
                <td style="border: 2px solid #ff0000">
                    {{ item.score }}
                </td>
            </tr> 
        </table>
        </h1>
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

export default {
    components: {
        VueDraggable
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
            ksoo: 'ksoo'
        }
    },
    mounted () {
        this.updateRecords();
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


        }
    }
}
</script>

<style>
</style>
