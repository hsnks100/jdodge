<template>
  <div id="app">
      <div id="phaser-example">
      </div>
  <span v-bind:title="message">
  내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼 수 있습니다!
  </span>
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
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다' ,
            seen: true,
            todos: [
                {some: "abc"},
                {some: "abc1"},
                {some: "abc2"},
                {some: "abcs3"},
            ]
        }
    },
    methods:
    {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('');
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
