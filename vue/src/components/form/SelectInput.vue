<template>
<div class="mini-block-narrow">
    <div class="level-container">
        <div v-for="(item, index) in relationList" :key="index"


        >
            <div class="speed-container middle-block-narrow">
                <Select v-if="dynamicAdd" v-model="item.relation" placeholder="选择等级"
                        :key="index"
                        @on-change="chooseLevelRange"
                        class="w160 button-gap">
                    <Option v-for="(eachLevel) in displayList"
                            :label="eachLevel.label"
                            :value="eachLevel.value" :key="eachLevel.value">
                        {{ eachLevel.label }}
                    </Option>
                </Select>
                <Input
                    v-model="item.contactName" class="w160 button-gap"
                    @on-change="passInput()"
                    placeholder="请输入联系人姓名"></Input>
                <Input
                    v-model="item.contactPhone" class="w160 button-gap"
                    @on-change="passInput()"
                    @on-blur="validatePhone(item.contactPhone, index)"
                    placeholder="请输入联系人手机号"></Input>

                <span @click="removeLevel(index)" class="remove-level action-text">移除</span>
            </div>
            <div v-if="item.status" class="error-tip">请输入正确的手机号</div>
        </div>
    </div>


    <div class="speed middle-block-narrow">
        <i @click="addLevel" class="icon iconfont iconAdd action-text"  title="添加" ></i>
        <span @click="addLevel" class="action-text">新增</span>
    </div>
</div>

</template>
<script>
    /**
     * 自动排序使用 flex order 方案。
     * 因为 view Select 没有监听值，导致排序后的值没有更新。
     */
    import { log } from "@/utils/tools";
    export default {
        name: 'SelectInput',
        props: {
            popStatus: Boolean,
        },
        data() {
            return {
                orgId: '',
                orgName: '',
                ruleId: '',

                typeList: [],
                typeFilter: [],
                displayList: [],

                relationList: [{
                    id: 0,
                    relation: '',
                    contactName: '',
                    contactPhone: '',
                    status: false,
                }],

                // 解决 Select 组件没有动态刷新值的问题。
                dynamicAdd: true,
            }
        },
        computed: {
            showError(item) {
                return item.status
            },
        },
        watch: {
            popStatus() {
                this.getRuleInfo()
            }
        },
        created() {
            this.initData()
            this.getRuleInfo()
            this.getLiveType()
        },
        methods: {
            chooseLevelRange() {

            },
            createLevelNum(item) {
                let levelId = item.level
                if (levelId === '') {
                    return 100
                }
                return Number(levelId.slice(2))
            },
            // getOrder(level) {
            //     log('level', level)
            //     return this.createLevelNum(level)
            // },
            initData() {
                let orgId = localStorage.orgId || 'AABBCCDDEEFFGGHH66'
                let orgName = localStorage.orgName

                this.orgName = orgName
                this.orgId = orgId
            },
            getRuleInfo() {
                let server = '/points-server'
                let url = server + '/api/points/consume/ruleDetail'

                let data = {
                    id: this.ruleId
                }

                this.$ajaxGet(url, data)
                    .then(res => {
                        if (res && res.code === 10000) {
                            let resData = res.data
                            let list = resData.freeLevelList || [];
                            this.createLevelPower(list)
                        }
                    })
                    .catch(err => {
                        log(err);
                    });
            },
            createLevelPower(list) {
                if (list.length === 0) {
                    return
                }

                let tempList = []
                list.forEach(item => {
                    let pack = {
                        level: item.levelId,
                        acceleration: item.rate,
                    }

                    let notDelete = !item.delete
                    if (notDelete) {
                        tempList.push(pack)
                    }
                })

                this.relationList = tempList
            },
            getLiveType() {
                // let server = '/member-server'
                // let url = server + '/member/info/get/liveStatus'
                // this.$ajaxGet(url)
                //     .then(res => {
                //         if (res && res.code === 10000) {
                //             let resData = res.data
                //             this.typeList = resData || [];
                //             this.createLevelFilter()
                //         }
                //     })
                //     .catch(err => {
                //         log(err);
                //     });

                this.typeList = [
                    {
                        code: 1,
                        value: '独居',
                    },
                    {
                        code: 2,
                        value: '配偶同住',
                    }
                ]
                this.createLevelFilter()
            },
            createLevelFilter() {
                let tempList = []
                this.typeList.forEach((item) => {
                    let { code, value } = item

                    // let formatName = this.createLevelName(code, value)
                    let formatItem = {
                        label: value,
                        value: code,
                        selected: false,
                        isAll: false,
                    }
                    tempList.push(formatItem)
                })

                this.typeFilter = tempList
                this.displayList = this.$_.clone(this.typeFilter)
            },

            createLevelName(levelId, levelName) {
                return `${levelId.slice(0, 2)} ${levelId.slice(2)} - ${levelName}`
            },
            addLevel() {
                // let maxLevel = this.relationList.length
                // let total = this.displayList.length
                // if (maxLevel === total) {
                //     this.$Message.error('您当前已添加了所有等级！')
                //     return
                // }
                let cell = {
                    relation: '',
                    contactName: '',
                    contactPhone: '',
                    status: false,
                }
                this.relationList.push(cell)
            },
            removeLevel(index) {
                // if (this.levelSpeed.length === 1) {
                //     return
                // }
                this.relationList.splice(index, 1)
                this.$emit('updateAcc',  this.relationList)
            },
            // disableOption(level) {
            //     let selectLevelList = []
            //     this.relationList.forEach(item => {
            //         let { relation } = item
            //         if (relation !== '') {
            //             selectLevelList.push(relation)
            //         }
            //
            //     })
            //
            //     return selectLevelList.includes(level)
            // },
            passInput() {
                let notEmpty = this.$_.filter(this.relationList, (o) => {
                    return o.acceleration !== ''
                })
                log('not', notEmpty)
                this.$emit('updateAcc', notEmpty)
            },
            validatePhone(phone, index) {
                let reg = /^1[3|4|5|6|7|8|9|]\d{9}$/;

                let wrong = !reg.test(phone)
                Object.assign(this.relationList[index], {
                    status: wrong,
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .button-gap {
        margin-right: 8px;
    }

    .speed {
        & > span {
            vertical-align: middle;
            margin-left: 4px;
        }

    }

    .speed-container {
        display: flex;
        justify-content: flex-start;
    }

    .level-container {
        display: flex;
        flex-direction: column;
    }

    .remove-level {
        margin-left: 20px;
    }

    .error-tip {
        position: absolute;
        line-height: 1;
        padding-top: 6px;
        color: #ed4014;
    }
</style>