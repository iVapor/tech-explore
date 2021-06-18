<template>
<div >
    <i-input v-model="input" placeholder="0.00"
             class="w100"
             :disabled="detailMode"
             @on-keyup="limitInput"
             @on-blur="limitTwo"
    >
        <span slot="prepend">￥</span>
    </i-input>
</div>
</template>

<script>
// import { log } from "@/utils/tools";
import { allowFloat } from "@/utils/tools";
import {keepTwo} from "@/utils/tools";

export default {
    name: "PriceCell",
    components: {
    },
    props: {
        price: String,
        dataKey: String,
        rowIndex: Number,
        detailMode: Boolean,
    },
    data() {
        return {
            input: this.price,
        };
    },
    computed: {

    },
    watch: {
        price(updateValue) {
            this.input = updateValue
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        limitInput() {
            let float = allowFloat(this.input)
            this.input = float
            this.updateCell()
        },
        limitTwo() {
            let two = keepTwo(String(this.input))
            this.input = two
            this.updateCell()
        },
        updateCell() {
            let data = {
                index: this.rowIndex,
                property: this.dataKey,
                value: this.input,
            }
            this.$emit('updateCell', data)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
