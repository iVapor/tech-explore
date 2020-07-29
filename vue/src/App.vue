<template>
<div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <OrderTable />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// import SearchTransfer from "@/components/SearchTransfer";
import OrderTable from "@/components/OrderTable";

export default {
    name: 'App',
    components: {
        HelloWorld,
        OrderTable,
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
