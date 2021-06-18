<template>
<div >
    <i-switch v-if="rightCount !== 0" v-model="open" @on-change="changeStatus"
              :disabled="switchStatus"
    >
        <Icon type="md-checkmark" slot="open"></Icon>
        <Icon type="md-close" slot="close"></Icon>
    </i-switch>
    <div v-else>-</div>
</div>
</template>

<script>
import { log } from "@/utils/tools";

export default {
    name: "StatusCell",
    components: {
    },
    props: {
        frontStatus: Number,
        status: Number,
        id: Number,
        rightCount: Number,

        rowIndex: Number,
        detailMode: Boolean,
    },
    data() {
        return {
            open: this.frontStatus === 1,
        };
    },
    computed: {
        switchStatus() {
            // 设置过权益后才能开启
            let canChange =
                this.status !== 0
            return this.detailMode || !canChange
        }
    },
    watch: {
        frontStatus(updateStatus) {
            log('updateStatus', updateStatus)
            this.open = updateStatus === 1
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        changeStatus() {
            let data = {
                index: this.rowIndex,
                property: 'isFrontDisplay',
                value: this.open ? 1 : 0,
            }
            this.$emit('updateCell', data)
        },
        cancel() {
            // this.showTip = false
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
