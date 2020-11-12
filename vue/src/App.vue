<template>
<div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <OrderTable v-if="false" />
    <ChangeTableFilter />
</div>
</template>

<script>
import { log } from "./utils/tools";

import HelloWorld from './components/HelloWorld.vue';
// import SearchTransfer from "@/components/SearchTransfer";
import OrderTable from "@/components/OrderTable";
import RoundRadio from "./components/RoundRadio";
import DownImg from "./components/DownImg";
import ChangeTableFilter from "./components/table/ChangeTableFilter";

export default {
    name: 'App',
    components: {
        HelloWorld,
        OrderTable,
        RoundRadio,
        DownImg,
        ChangeTableFilter,
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
                {
                    label: '已审批',
                    value: 'approve',
                },
            ],
            defaultValue: 'pending',
        };
    },
    methods: {
        selectRadio(data) {
            console.log('selectRadio data', data)
            this.defaultValue = data
        },
        changeRadio() {
            log('this.defaultValue ', this.defaultValue )
            this.defaultValue = this.defaultValue === '' ? 'pending' : ''
        },
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
