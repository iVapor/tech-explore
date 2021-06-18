<template>
<div >
    <span @click="upRow('up')" class="up button-gap">
        <i :class="upStyle"
           class="icon iconfont iconUpward"  title="上" ></i>
    </span>
    <span @click="upRow('down')" class="down">
        <i :class="downStyle"
           class="icon iconfont iconDownward action-text"  title="下" ></i>
    </span>
</div>
</template>

<script>
// import { log } from "@/utils/tools";

export default {
    name: "OrderCell",
    components: {
    },
    props: {
        row: Object,
        list: Array,
        detailMode: Boolean,
    },
    data() {
        return {
            first: false,
            last: false,
        };
    },
    computed: {
        upStyle() {
            return this.first ? 'disable-text' : 'action-text'
        },
        downStyle() {
            return this.last ? 'disable-text' : 'action-text'
        }
    },
    watch: {
        list() {
            this.setIcon()
        }
    },
    created() {
        this.setIcon()

    },
    mounted() {

    },
    methods: {
        setIcon() {
            this.first = this.row._index === 0
            let allIndex = this.countIndex(this.row)

            let lastIndex = allIndex[allIndex.length - 1]
            let last = this.list.length - 1
            this.last = this.row._index === last || lastIndex === last
        },
        upRow(type) {
            if (this.detailMode) {
                return
            }

            // 第一行不能往上
            if (type === 'up' && this.first) {
                return
            }
            // 最后一行不能往下
            if (type === 'down' && this.last) {
                return
            }
            this.$emit('orderRow', type, this.row)
        },
        countIndex(actionRow) {
            let { validType, validRange } = actionRow
            let pack = []
            let list = this.$_.cloneDeep(this.list)

            for (let i = 0; i < list.length; i++ ) {
                let cell = list[i]
                if (cell.validType === validType &&
                    cell.validRange === validRange) {
                    pack.push(i)
                }
            }

            return pack
        },
    },
}
</script>

<style lang="scss" scoped>
    .disable-text {
        cursor: not-allowed;
        color: #E2E2EA;
    }
</style>
