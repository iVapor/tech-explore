<template>
<div >
    <i-input v-if="client === 2 || client === 4" class="w140"
             v-model="input"
             @on-change="inputPrice"
             :disabled="detailMode"
    >
    </i-input>
    <span v-else>-</span>
</div>
</template>

<script>
// import { log, removeComma } from "@/utils/tools";

export default {
    name: "PriceCell",
    components: {
    },
    props: {
        rowIndex: Number,
        productId: String,
        client: Number,
        detailMode: Boolean,
    },
    data() {
        return {
            input: this.productId,
        };
    },
    computed: {

    },
    watch: {
        productId(updateValue) {
            this.input = updateValue
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        inputPrice() {
            let data = {
                index: this.rowIndex,
                property: 'productId',
                value: this.input,
            }
            this.$emit('updateCell', data)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
