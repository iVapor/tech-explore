<template>
<div >
    <Table :columns="columns1" :data="data"></Table>
</div>
</template>

<script>
import { log } from "@/utils/tools";
import { orderTableCol } from './orderTableCol';
import _ from 'lodash';
export default {
    name: "OrderTable",
    components: {
    },
    props: {
    },
    data() {
        return {
            columns1: orderTableCol.call(this),
            data: [
                {
                    name: 'John Brown🐼',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                // {
                //     name: 'Joe Black',
                //     age: 30,
                //     address: 'Sydney No. 1 Lake Park',
                //     date: '2016-10-02'
                // },
                // {
                //     name: 'Jon Snow',
                //     age: 26,
                //     address: 'Ottawa No. 2 Lake Park',
                //     date: '2016-10-04'
                // }
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        changeRowOrder(index) {
            if (index === 0) {
                return
            }

            let former = index - 1
            let tableData = _.cloneDeep(this.data)
            let old = tableData[former]
            tableData[former] = tableData[index]

            tableData[index] = old
            this.data = tableData
        },
        updateTableData(index, property, value) {
            let tableData = _.cloneDeep(this.data)
            tableData[index][property] = value
            this.data = tableData
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
