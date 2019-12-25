<template>
    <div>
        <VueMenu />
        <h3>Login</h3>
        <p>만약 계정이 없다면, 회원가입을 먼저 진행해주세요!</p>
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
        <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>


    </div>
</template>

<script>
import VueMenu from "./VueMenu.vue";

import GoogleLogin from 'vue-google-login';
 
    // Button to login


export default {
    metaInfo: {
        title: 'My Example App',
        titleTemplate: '%s - Yay!',
        htmlAttrs: {
            lang: 'en',
            amp: true
        },
        meta: [
            {name: 'keywords', content: 'ksoo, jesik'}
            ],
    },
    components: {
        VueMenu,
        GoogleLogin, 
    },
    created() {
    },
    name: 'login',
    data() {
        return {
            params: {
                client_id: "435678538765-9dp720935bq4r4tbhsfmf9onf6l6s0ao.apps.googleusercontent.com"
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    mounted() {
    },
    methods: {
        onSuccess(googleUser) {
            console.log(googleUser);

            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        },
        onFailure(err) {
            console.log("onf", err);
        },
    }
}

</script>

<style scoped>
.login {
    margin-top: 40px;
}
input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}
button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}
p {
    margin-top: 40px;
    font-size: 15px;
}
p a {
    text-decoration: underline;
    cursor: pointer;
}
</style>

