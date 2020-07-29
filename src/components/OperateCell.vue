<template>
<div >
    <span @click="upRow" class="action-direct">向上</span>
    <span class="action-direct">向下</span>
    <Input type="text"  search  placeholder="请输入商品名称 / ID" class="w180"
           v-model="inputAdd" @on-change="changeSearch" />
</div>
</template>

<script>
import { log } from "@/utils/tools";

export default {
    name: "OperateCell",
    components: {
    },
    props: {
        rowIndex: Number,
        address: String,
    },
    data() {
        return {
            inputAdd: this.address,
        };
    },
    computed: {

    },
    watch: {
        address(updateValue) {
            this.inputAdd = updateValue
        }
    },
    created() {

    },
    mounted() {
        log('this.address', this.address)
    },
    methods: {
        upRow() {
            this.$emit('upRow', this.rowIndex)
        },
        changeSearch() {
            log('inputAdd', this.inputAdd)
            this.$emit('updateCell', this.rowIndex, 'address', this.inputAdd)
        }
    },
}
</script>

<style lang="scss" scoped>
    .action-direct {
        color: #cf06f3;
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
    }

    .w180 {
        width: 180px!important;
    }
</style>
