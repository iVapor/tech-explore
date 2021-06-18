<template>
<div >
    <div class="date-container">
        <div v-for="(item, index) in dateList" :key="item.id"
             class="input-container">
            <i-input  class="button-gap w150"
                      @on-blur="uniqList"
                      :disabled="detailMode"
                      @on-keyup="updateList(index)"
                   v-model="item.value">
                <i-select v-model="item.type"
                          :disabled="detailMode"
                          slot="append" style="width: 70px">
                    <Option :value="1">天</Option>
                    <Option :value="2">月</Option>
                    <Option :value="3">年</Option>
                </i-select>
            </i-input>
            <img v-if="!detailMode"
                 @click="removeItem(index)"  class="remove-icon"
                 :src="iconRemove"
                 alt="">
        </div>

    </div>
    <div v-if="!detailMode"  class="add-validate">
        <i @click="addValidate" class="icon iconfont iconAdd action-text"
           title="添加" ></i>
        <span @click="addValidate" class="action-text">添加有效期</span>
    </div>
</div>
</template>

<script>
// import { log } from '@/utils/tools'
import {  allowInt, removeComma } from "@/utils/tools";
import iconRemove from "@/assets/images/member/icon_remove.png"

export default {
    name: "ChooseValidity",
    components: {
    },
    props: {
        list: Array,
        detailMode: Boolean,
    },
    data() {
        return {
            iconRemove: iconRemove,
            dateList: this.list,
        };
    },
    computed: {

    },
    watch: {
        list(updateValue) {
            this.dateList = updateValue
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        addValidate() {
            let last = this.dateList[this.dateList.length - 1]
            let cell = {
                id: last.id + 1,
                type: 1,
                value: '',
            }

            this.dateList.push(cell)
        },
        removeItem(index) {
            let list = this.$_.cloneDeep(this.dateList)
            if (list.length === 1) {
                this.$Message.error('有效期不能为空')
                return
            }

            list.splice(index, 1)
            this.dateList = list
            this.$emit('updateList', this.dateList)
        },
        updateList(index) {
            let target = this.dateList[index].value
            let format =  allowInt(target)
            this.dateList[index].value = removeComma(format)

            this.$emit('updateList', this.dateList)
        },
        uniqList() {
            this.$emit('uniqList')
        },
    },
}
</script>

<style lang="scss" scoped>
    .date-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-content: space-around;
    }


    .input-container {
        position: relative;
        margin-bottom: 20px;

        &:hover {
            .remove-icon {
                display: inline-block;
            }
        }
    }

    .remove-icon {
        display: none;
        position: absolute;
        top: -12px;
        right: -6px;
        width: 24px;

        z-index: 10;
        height: 24px;

        cursor: pointer;
        line-height: 24px;
        border-radius: 50%;
        background: #E2E2E9;
    }



    .add-validate {
        & > span {
            vertical-align: middle;
            margin-left: 4px;
        }
    }

</style>
