<template>
<div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <OrderTable v-if="false" />
    <RoundRadio
        :dataList="list"
        @select="selectRadio"
        :defaultSelect="'pending'" />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// import SearchTransfer from "@/components/SearchTransfer";
import OrderTable from "@/components/OrderTable";
import RoundRadio from "./components/RoundRadio";

export default {
    name: 'App',
    components: {
        HelloWorld,
        OrderTable,
        RoundRadio,
    },
    data() {
        return {
            list: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '待审批',
                    value: 'pending',
                },
            ],
        };
    },
    methods: {
        selectRadio(data) {
            console.log('selectRadio data', data)
        }
    }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        background: white;
        color: #2c3e50;
        margin-top: 20px;
        margin-left: 40px;
    }
</style>
