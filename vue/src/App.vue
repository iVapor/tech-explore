<template>
<div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <OrderTable v-if="false" />
    <ChangeTableFilter v-if="false" />
    <SelectInput />
</div>
</template>

<script>
import { log } from "./utils/tools";

import HelloWorld from './components/HelloWorld.vue';
// import SearchTransfer from "@/components/SearchTransfer";
import OrderTable from "@/components/OrderTable";
import ChangeTableFilter from "./components/table/ChangeTableFilter";

// import CompanyLayout from "@/components/CompanyLayout";
// import TwoBlock from "@/components/TwoBlock";
import SelectInput from "./components/form/SelectInput";
export default {
    name: 'App',
    components: {
        HelloWorld,
        OrderTable,
        ChangeTableFilter,
        // CompanyLayout,
        // TwoBlock,
        SelectInput,
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
<style lang="scss">
@import url('./assets/scss/common.scss');
</style>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        background: white;
        color: #2c3e50;
        margin-top: 20px;
        margin-left: 40px;
    }
</style>
