<template>
<div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <SearchTransfer />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import SearchTransfer from "@/components/SearchTransfer";

export default {
    name: 'App',
    components: {
        HelloWorld,
        SearchTransfer,
    }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;

        color: #2c3e50;
        margin-top: 20px;
        margin-left: 40px;
    }
</style>
