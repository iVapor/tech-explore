<template>
    <div class="radio-container">
        <div
            v-for="d in dataList"
            :key="d.value"
            :class="selectClass(d.value)"
            @click="changeRadio(d.value)"
            class="each-select">{{ d.label }}</div>
    </div>
</template>

<script>

/**
 * 圆角的类似 radio 的组件
 * props: {
 *   数据源 dataList: [{
        label: '全部',
        value: '',
    }],
    defaultSelect 默认值
 * }
 * 用法：
 *  <RoundRadio
 :dataList="list"
 @select="selectRadio"
 :defaultSelect="''" />
 * 事件: select，返回值是选中的值
 */
export default {
    name: "RoundRadio",
    components: {},
    props: {
        dataList: Array,
        defaultSelect: [String, Number],
    },
    data() {
        return {
            select: this.defaultSelect,
        };
    },
    computed: {

    },
    watch: {
        defaultSelect(updateValue) {
            this.select = updateValue
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        selectClass(value) {
            return value === this.select ? 'select-item' : ''
        },
        changeRadio(value) {
            this.select = value
            this.$emit('select', this.select)
        },
    },
}
</script>

<style lang="scss" scoped>
.radio-container {
    display: flex;
    justify-content: flex-start;
    height: 32px;
    width: fit-content;

    text-align: center;
    line-height: 32px;
    background: #F1F1F5;
    border-radius: 16px;
}

.each-select {
    padding-left: 26px;
    padding-right: 26px;
    cursor: pointer;
}

.select-item {
    //width: 96px;
    height: 32px;
    background: #756CEA;
    border-radius: 16px;
    color: #FFFFFF;
}

</style>
