<template>
<div class="name-cell">
    <Input class="w200" placeholder="请输入会员模式名称"
           :maxlength="9"
           @on-keyup="updateName"
           v-model="input"/>
    <span class="input-count">{{ input.length }}/9</span>
</div>
</template>

<script>
// import { log } from "@/utils/tools";

export default {
    name: "MemberNameCell",
    components: {
    },
    props: {
        rowIndex: Number,
        levelName: String,
    },
    data() {
        return {
            input: this.levelName,
        };
    },
    computed: {

    },
    watch: {

    },
    created() {
    },
    mounted() {

    },
    methods: {
        updateName() {
            let data = {
                index: this.rowIndex,
                property: 'levelName',
                value: this.input,
            }
            this.$emit('updateCell', data)
        }
    },
}
</script>

<style lang="scss" scoped>
    .name-cell {
        position: relative;
    }

    .input-count {
        position: absolute;
        font-size: 12px;
        font-weight: 300;
        color: #b5b5be;

        line-height: 34px;
        left: 170px;
        top: 0;
    }
</style>
