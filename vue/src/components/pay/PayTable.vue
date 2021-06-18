<template>
    <div>
        <h2 class="page-title">
            <span @click="backListPage"><i class="icon iconfont iconBack" title="返回"></i></span>
            <span @click="backListPage">{{ createPageTitle() }}</span>
        </h2>
        <Form ref="memberInfo" :label-width="150" :model="payForm"
              :rules="levelValidate">

                <div class="block-title huge-block-narrow">付费规则</div>
                <FormItem label="规则设置："  required
                          class="middle-block-narrow">
                    <div class="item-container">
                        <div class="item-title">有效期</div>
                        <div class="item-content">
                            <ChooseValidity :list="validityList"
                                            :detailMode="detailMode"
                                            @updateList="updateValidate"
                                            @uniqList="uniqValidity" />
                        </div>

                        <div class="item-title">客户端</div>
                        <div class="item-content">
                            <CheckboxGroup v-model="priceSource.client"
                                           @on-change="updateClient"
                            >
                                <Checkbox v-for="item in clientList"
                                          :key="item.value"
                                          :disabled="detailMode"
                                          :label="item.value">{{ item
                                    .label }}</Checkbox>
                            </CheckboxGroup>
                        </div>

                        <div class="item-title">付费模式</div>
                        <div class="item-content">
                            <CheckboxGroup v-model="priceSource.mode"
                                           @on-change="updatePayMode"
                            >
                                <Checkbox v-for="item in payModeList"
                                          :key="item.value"
                                          :disabled="detailMode"
                                          :label="item.value">{{ item.label
                                    }}</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                </FormItem>

                <FormItem label="价格明细："  required
                          class="middle-block-narrow">
                    <div class="item-container">
                        <RadioGroup v-if="levelMode"
                                    @on-change="changePriceTable"
                                    v-model="currentLevel" type="button">
                            <Radio v-for="item in levelData"
                                   :key="item.levelId"
                                   :label="item.levelId">{{ createLevelName(item.levelId) }}</Radio>
                        </RadioGroup>

                        <div v-if="priceSource.mode.includes('one')">
                            <div :class="{ 'middle-block-narrow' : this.payMode === 'level'}"
                                 class="item-title">一次付费定价
                            </div>
                            <Table  :columns="onePayCol"
                                    ref="normalList"
                                    class="level-table middle-block-narrow"
                                    :loading="oneLoading"
                                    :data="onePayData"
                                    :span-method="handleOneSpan"
                            ></Table>
                        </div>

                        <div v-if="priceSource.mode.includes('auto')">
                            <div class="item-title middle-block-narrow">自动续费定价</div>
                            <Table  :columns="autoPayCol"
                                    ref="normalList"
                                    class="level-table middle-block-narrow"
                                    :loading="autoLoading"
                                    :data="autoPayData"
                                    :span-method="handleAutoSpan"
                            ></Table>
                        </div>

                    </div>
                </FormItem>
            </Form>



            <div v-if="!detailMode" class="submit-container huge-block-narrow">
                <Button @click="cancelSubmit"
                        class="button-gap w60" size="large" type="default">取消
                </Button>
                <Button @click="submitMode"
                        class="button-gap" size="large" type="primary">提交并配置权益
                </Button>

            </div>
        </div>
    </div>
</template>

<script>
import ChooseValidity from "./ChooseValidity";
// import 'swiper/css/swiper.css';
import {log } from "@/utils/tools";

import { onePayCol, autoPayCol } from "./priceCol";
import { levelNameCol } from './levelNameCol'
import { clientList, dateList } from "./commonInfo";

import {
    countIndex,
    stringPriceOne,
    stringPriceAuto,
    numberPriceOne,
    numberPriceAuto,
} from "./commonMethod";
// import defaultPhoto from "@/assets/images/member/default_member_photo.png";

export default {
    name: "AddMode",
    components: {
        ChooseValidity,
    },
    data() {
        return {
            editMode: false,
            detailMode: false,

            payForm: {
                id: '',
                name: "",
                description: "",
                logoUrl: '',
                cardModel: '',
            },

            headers: {
                token: localStorage.getItem('token'),
            },
            levelValidate: {
                name: [
                    {
                        required: true,
                        message: "请输入会员模式名称",
                        trigger: 'blur',
                        type: 'string'
                    },
                ],
                ruleSetting: [
                    {
                        required: true,
                        message: "",
                    },
                ],
                receiverPhone: [
                    {
                        required: true,
                        message: "请输入收货人联系方式",
                        trigger: 'blur',
                        type: 'string'
                    },
                    {
                        type: "string",
                        trigger: 'blur',
                        asyncValidator: (rule, value) => {
                            return new Promise((resolve, reject) => {
                                let reg = this.phoneReg;
                                if (!reg.test(value)) {
                                    reject('证件号');
                                } else {
                                    resolve();
                                }
                            });
                        },
                        message: "请输入正确的联系方式",
                    }
                ],
            },

            upload: '/file-server/api/resources/files/upload',
            uploadIcon: '#939295',
            uploadStatus: false,


            payMode: 'level',
            theCouponTypeList: [{
                id: 'normal',
                label: '普通模式',
                desc: '单等级模式'
            }, {
                id: 'level',
                label: '等级模式',
                desc: '多等级模式',
            }, ],

            clientList: clientList,
            dateList: dateList,

            payModeList: [{
                label: '一次付费模式',
                value: 'one',
            }, {
                label: '自动续费模式',
                value: 'auto'
            }, ],

            priceSource: {
                client: [],
                mode: [],
            },
            validityList: [{
                id: 0,
                type: 1,
                value: 1,
            }, ],

            onePayCol: onePayCol.call(this),
            onePayData: [],
            oneLoading: false,

            autoPayCol: autoPayCol.call(this),
            autoPayData: [],
            autoLoading: false,

            levelCol: levelNameCol.call(this),
            levelData: [{
                levelId: 'SVIP1',
                levelName: '',
                levelLogo: '',
            }, {
                levelId: 'SVIP2',
                levelName: '',
                levelLogo: '',
            }, ],
            currentLevel: 'SVIP1',
            oldLevel: 'SVIP1',

            // 排序时操作的列表
            actionList: [],
            assignFunc: () => {},

            allOneData: {},
            allAutoData: {},
        }
    },
    computed: {
        levelMode() {
            return this.payMode === 'level'
        },
        normalMode() {
            return this.payMode === 'normal'
        }
    },
    created() {
        this.initData()
    },
    mounted() {
    },
    methods: {
        backListPage() {
            this.$router.push(`/member/premiumMember/premiumManage`)
        },
        initData() {
            // let { id, pageType } = this.$route.query
            this.payMode = 'level'
            let id = '2323'

            if (id !== undefined) {
                this.payForm.id = id
                this.getPageDetail()
                this.editMode = true

                this.detailMode = false
            }

        },
        createPageTitle() {
            let text = '新增'
            if (this.editMode) {
                text = '编辑'
            }

            let title = `${ text }付费会员`
            if (this.detailMode) {
                title = '付费会员详情'
            }
            return title
        },
        getPageDetail() {
            let url = '/grade-server/api/pay/card/get'
            let data = {
                payCardId:  this.payForm.id,
            }
            this.levelData = []
            this.$ajaxGet(url, data)
                .then(res => {
                    if (res && res.code === 10000) {
                        this.renderPage(res.data)
                    }
                })
                .catch(err => {
                    log(err);
                });
        },
        findAllLevel(list) {
            let tempList = []
            list.forEach(item => {
                tempList.push(item.levelId)
            })

            return this.$_.uniq(tempList)
        },
        filterByLevel(list, level) {
            return this.$_.filter(list, { levelId: level })
        },
        evalLevelData(list) {
            let allLevel = this.findAllLevel(list)
            let base = {}
            allLevel.forEach(level => {
                let currentLevel = this.filterByLevel(list, level)
                base[level] = currentLevel
            })

            return base
        },
        renderPage(data) {
            Object.assign(this.payForm, data)
            let { levelList, onePayList, autoPayList } = data
            this.levelData = levelList
            let ruleInfo = []

            // 等级模式
            if (this.payMode === 'level') {
                if (onePayList.length > 0) {
                    let orderList = this.initOrder(onePayList)
                    let onePayStr = stringPriceOne(orderList)

                    this.allOneData = this.evalLevelData(onePayStr)
                    // 默认填充第一个等级
                    let firstLevelOne = this.allOneData[this.currentLevel]
                    this.onePayData = firstLevelOne
                    ruleInfo = firstLevelOne
                }

                if (autoPayList.length > 0) {
                    let orderList = this.initOrder(autoPayList)
                    let autoPayStr = stringPriceAuto(orderList)
                    this.allAutoData = this.evalLevelData(autoPayStr)
                    let firstLevelAuto = this.allAutoData[this.currentLevel]

                    this.autoPayData = firstLevelAuto
                    ruleInfo = firstLevelAuto
                }
            } else {
                ruleInfo = onePayList.length > 0 ? onePayList : autoPayList

                let oneOrder = this.initOrder(onePayList)
                this.onePayData = stringPriceOne(oneOrder)
                let autoOrder = this.initOrder(autoPayList)
                this.autoPayData = stringPriceAuto(autoOrder)
            }

            this.priceSource.mode = this.getModeList(onePayList, autoPayList)

            this.fillRule(ruleInfo)
        },
        getModeList(one, auto) {
            let list = []
            if (one !== undefined && one.length > 0) {
                list.push('one')
            }
            if (auto !== undefined && auto.length > 0) {
                list.push('auto')
            }

            return list
        },
        fillRule(list) {
            let client = []
            let validity = []
            list.forEach(item => {
                let { clientSource, validRange, validType, id} = item
                client.push(clientSource)

                let pack = {
                    id: id,
                    type: validType,
                    value: validRange,
                }
                validity.push(pack)
            })

            this.priceSource.client = this.$_.uniq(client)
            this.validityList = this.createUniqValidity(validity)
        },
        checkNameUniq() {
            let url = '/grade-server/api/pay/card/duplicateName'
            let { id, name } = this.payForm
            if (name === '') {
                return
            }

            let data = {
                excludePayCardId: id,
                name: name,
            }
            this.$ajaxGet(url, data)
                .then(res => {
                    if (res && res.code === 10000) {
                        if (res.data) {
                            this.payForm.name = ''
                            this.$Message.error('会员名称不能重复')
                        }
                    }
                })
                .catch(err => {
                    log(err);
                });
        },
        handleFormatError() {
            this.$Message.error('仅支持：JPEG/JPG/PNG 格式');
        },
        handleMaxSize(file) {
            let message = `${file.name} 太大, 不能超过 1MB，请重新选择`;
            this.$Message.error(message);
        },
        handleSuccess(res) {
            if (res && res.code === 10000) {
                this.$Message.success(res.message);
                this.uploadStatus = true;
                this.$set(this.payForm, 'logoUrl', res.data);
            }
        },
        handlerError() {
            this.$Message.error('上传失败');
            this.uploadStatus = false;
        },
        handleRemove() {
            this.$set(this.payForm, 'logoUrl', '');
            this.uploadStatus = false;
        },
        catchData(content) {
            this.payForm.description = content;
        },
        initForm() {
            Object.assign(this.payForm, {
                id: '',
                name: "",
                description: "",
                logoUrl: '',
            });

            this.onePayData = []
            this.autoPayData = []
        },
        cancelSubmit() {
            this.initForm();
            this.backListPage();
        },
        /**
         * 当前 radio 的数据没有保存，或者不是最新的。
         */
        saveCurrentPrice() {
            Object.assign(this.allOneData, {
                [this.currentLevel]: this.onePayData,
            })
            Object.assign(this.allAutoData, {
                [this.currentLevel]: this.autoPayData,
            })
        },
        editMember() {
            let server = '/grade-server';
            let url = server + '/api/pay/card/grade/add';
            if (this.editMode) {
                let edit = '/api/pay/card/edit'
                url = server + edit
            }

            let notPass = this.validateLevelForm();
            if (notPass) {
                return;
            }
            let data = this.formatLevelForm();

            this.$ajaxPost(url, data)
                .then(res => {
                    if (res && res.code === 10000) {
                        this.$Message.success(res.message)
                        this.jumpRightConfig(res.data)
                    }
                })
                .catch(err => {
                    log(err);
                });
        },
        submitMode() {
            if(this.normalMode) {
                this.sendNormal()
            } else if (this.levelMode) {
                this.saveCurrentPrice()
                this.sendLevel()
            }

        },
        checkPriceByIndexAuto(indexList, priceList) {
            return indexList.every(item => {
                let priceRow = priceList[item]
                return priceRow.firstSubscribePrice === '' && priceRow.autoPayPrice === ''
            })
        },
        checkPriceByIndexOne(indexList, priceList) {
            return indexList.every(item => {
                let priceRow = priceList[item]
                return priceRow.price === ''
            })
        },
        checkOnePrice(list) {
            for(let i = 0; i < list.length; i++) {
                let clientItem = list[i]
                if (clientItem === undefined) {
                    return true
                }
                let all = countIndex(clientItem, list)

                let noPrice = this.checkPriceByIndexOne(all, list)
                if (noPrice) {
                    return true
                }
                let lastValidity = all[all.length - 1]

                i = lastValidity
            }

            return false
        },
        checkAutoPrice(list) {
            for(let i = 0; i < list.length; i++) {
                let clientItem = list[i]
                let all = countIndex(clientItem, list)
                let noPrice = this.checkPriceByIndexAuto(all, list)
                if (noPrice) {
                    return true
                }
                let lastValidity = all[all.length - 1]
                i = lastValidity
            }

            return false
        },

        /**
         * ios 2, iPad 4
         */
        checkProductId(type, client, list) {
            let notPass = false
            for(let i = 0; i < list.length; i++) {
                let row = list[i]

                if (type === 'one') {
                    let { clientSource, price, productId } = row
                    if (clientSource === client && price !== '') {
                        if (productId === '') {
                            notPass = true
                            break
                        }
                    }
                } else {

                    let { clientSource, firstSubscribePrice, productId } = row
                    let emptyPrice = firstSubscribePrice !== ''
                    if (clientSource === client && emptyPrice) {
                        if (productId === '') {
                            notPass = true
                            break
                        }
                    }
                }

            }

            return notPass
        },
        checkPriceList(type, list) {
            if (list.length === 0) {
                return false
            }

            let price = false
            if (type === 'one') {
                price = this.checkOnePrice(list)
            } else {
                price = this.checkAutoPrice(list)
            }

            if (price) {
                this.$Message.error('每个有效期，至少填写一处定价')
                return true
            }

            let wrongIos = this.checkProductId(type, 2, list)
            if (wrongIos) {
                this.$Message.error('iOS客户端填写价格后，需要填写 ProductId')
                return true
            }

            let wrongIpad = this.checkProductId(type, 4, list)
            if (wrongIpad) {
                this.$Message.error('iPad客户端填写价格后，需要填写 ProductId')
                return true
            }

            return false
        },
        validateNormalForm() {
            let { name, logoUrl, } = this.payForm
            if (!name) {
                this.$Message.error('会员模式名称必填')
                return true
            }

            if (!logoUrl) {
                this.$Message.error('会员徽标必填')
                return true
            }

            let { client, mode } = this.priceSource
            if (client.length === 0) {
                this.$Message.error('客户端必填')
                return true
            }

            if (mode.length === 0) {
                this.$Message.error('请选择一种付费模式')
                return true
            }

            let hasOne = this.priceSource.mode.includes('one')
            if (hasOne) {
                let notOnePrice = this.checkPriceList('one', this.onePayData)
                if (notOnePrice) {
                    return true
                }
            }

            let hasAuto = this.priceSource.mode.includes('auto')
            if (hasAuto) {
                let notAutoPrice = this.checkPriceList('auto', this.autoPayData)
                if (notAutoPrice) {
                    return true
                }
            }

            return false
        },
        initPriceOne(list) {
            let tempList = this.$_.cloneDeep(list)
            tempList.map(item => {
                item.price = ''
                item.productId = ''
                return item
            })

            return tempList
        },
        initPriceAuto(list) {
            let tempList = this.$_.cloneDeep(list)
            tempList.map(item => {
                item.firstSubscribePrice = ''
                item.autoPayPrice = ''
                item.productId = ''
                return item
            })

            return tempList
        },
        formatAutoPayData() {
            let list = []
            let hasAuto = this.priceSource.mode.includes('auto')

            if (hasAuto) {
                list = numberPriceAuto(this.autoPayData)
            }

            return list
        },
        formatOnePayData() {
            let list = []
            let hasAuto = this.priceSource.mode.includes('one')
            if (hasAuto) {
                list = numberPriceOne(this.onePayData)
            }

            return list
        },
        formatNormalForm() {
            let data = {
                ...this.payForm,
                cardModel: 1,
                payCardId:  this.payForm.id,
            }
            data.autoPayList = this.formatAutoPayData()
            data.onePayList = this.formatOnePayData()

            return data
        },
        sendNormal() {
            let server = '/grade-server';
            let url = server + '/api/pay/card/normal/add';
            if (this.editMode) {
                let edit = '/api/pay/card/edit'
                url = server + edit
            }

            let notPass = this.validateNormalForm();
            if (notPass) {
                return;
            }
            let data = this.formatNormalForm();

            this.$ajaxPost(url, data)
                .then(res => {
                    if (res && res.code === 10000) {
                        this.$Message.success('操作成功！')
                        this.submitAction(res.data)
                    }
                })
                .catch(err => {
                    log(err);
                });
        },
        submitAction(data) {
            this.jumpRightConfig(data)
        },
        createLevelPrice(priceList, type, priceFn) {
            let obj = this.$_.cloneDeep(priceList)
            let keys = Object.keys(obj)
            let tempList = []

            let hasMode = this.priceSource.mode.includes(type)
            if (hasMode) {
                for(let i = 0; i < keys.length; i++) {
                    let level = keys[i]
                    let subList = obj[level]
                    let numberList = priceFn(subList)

                    for(let j = 0; j < numberList.length; j++) {
                        let item = this.$_.cloneDeep(numberList[j])
                        item.levelId = level
                        tempList.push(item)
                    }
                }
            }

            return tempList
        },
        formatLevelForm() {
            let { id } = this.payForm
            let data = {
                ...this.payForm,
                payCardId: id,
                cardModel: this.normalMode ? 1 : 2,
            }

            data.levelList = this.levelData
            let autoPayList = this.createLevelPrice(this.allAutoData, 'auto', numberPriceAuto)
            data.autoPayList = autoPayList

            let onePayList = this.createLevelPrice(this.allOneData, 'one', numberPriceOne)
            data.onePayList = onePayList

            return data
        },
        validateLevel(list) {
            let notPass = false
            for (let i = 0; i < list.length; i++ ) {
                let eachLevel = list[i]
                let { levelName, levelLogo } = eachLevel

                if (levelName === '') {
                    this.$Message.error('等级名称不能为空')
                    notPass = true
                    break
                }
                if (levelLogo === '') {
                    this.$Message.error('等级徽标不能为空')
                    notPass = true
                    break
                }
            }

            return notPass
        },
        validateLevelPrice() {
            let notPass = false
            let oneKeys = Object.keys(this.allOneData)

            // 值编辑了第一个等级就提交数据，第三个等级为空
            let notEditOther = oneKeys.length !== this.levelData.length
            if (notEditOther) {
                let msg = `当前存在价格明细漏填，请核对后再提交`
                this.$Message.error(msg)
                return true
            }

            if (oneKeys.length > 0) {
                for (let i = 0; i < oneKeys.length; i++) {
                    let eachLevel = oneKeys[i]
                    let levelData = this.allOneData[eachLevel]

                    if (levelData === undefined) {
                        let name = this.createLevelName(eachLevel)
                        let msg = `${ name } 的价格明细漏填`
                        this.$Message.error(msg)

                        return true
                    }
                    let notOnePrice = this.checkPriceList('one', levelData)
                    if (notOnePrice) {
                        return true
                    }
                }
            }

            let autoKeys = Object.keys(this.allAutoData)
            if (autoKeys.length > 0) {
                for (let i = 0; i < autoKeys.length; i++) {
                    let eachLevel = autoKeys[i]
                    let levelData = this.allAutoData[eachLevel]

                    if (levelData === undefined) {
                        let name = this.createLevelName(eachLevel)
                        let msg = `${ name } 的价格明细漏填`
                        this.$Message.error(msg)

                        return true
                    }
                    let notOnePrice = this.checkPriceList('auto', levelData)
                    if (notOnePrice) {
                        return true
                    }
                }
            }

            return notPass
        },
        validateLevelForm() {
            let { name,  } = this.payForm
            if (!name) {
                this.$Message.error('会员模式名称必填')
                return true
            }

            let level = this.validateLevel(this.levelData)
            if (level) {
                return true
            }

            let { client, mode } = this.priceSource
            if (client.length === 0) {
                this.$Message.error('客户端必填')
                return true
            }

            if (mode.length === 0) {
                this.$Message.error('请选择一种付费模式')
                return true
            }

            let wrongPrice = this.validateLevelPrice()
            if (wrongPrice) {
                return true
            }

            return false
        },
        sendLevel() {
            let server = '/grade-server';
            let url = server + '/api/pay/card/grade/add';
            if (this.editMode) {
                let edit = '/api/pay/card/edit'
                url = server + edit
            }

            let notPass = this.validateLevelForm();
            if (notPass) {
                return;
            }
            let data = this.formatLevelForm();

            this.$ajaxPost(url, data)
                .then(res => {
                    if (res && res.code === 10000) {
                        this.$Message.success('操作成功！')
                        this.submitAction(res.data)
                    }
                })
                .catch(err => {
                    log(err);
                });
        },
        jumpRightConfig(id) {
            this.$router.push({
                path: '/member/premiumMember/settingRight',
                query: {
                    id: id,
                    pageType: this.payMode,
                }
            })
        },
        changePayMode(value) {
            if (this.detailMode) {
                return false
            }

            this.payMode = value;
            this.levelData = [{
                levelId: 'SVIP1',
                levelName: '',
                levelLogo: '',
            }, {
                levelId: 'SVIP2',
                levelName: '',
                levelLogo: '',
            }, ]
        },
        updateValidate(list) {
            this.validityList = list
            this.createTableDate()
        },
        uniqValidity() {
            // let uniq = this.createUniqValidity(this.validityList)
            let format = this.initExistValidity(this.validityList)
            this.updateValidate(format)
        },
        inValidityList(cell, list) {
            return list.some(v => {
                return cell.type === v.type &&
                    cell.value === v.value
            })
        },
        initExistValidity(dupList) {
            let list = this.$_.cloneDeep(dupList)
            let storeList = []
            for(let i = 0; i < list.length; i++ ) {
                let cell = list[i]

                let hasStore = this.inValidityList(cell, storeList)
                if (hasStore) {
                    this.$Message.error('请勿添加重复内容')
                    cell.value = ''
                }
                storeList.push(cell)
            }

            return storeList
        },
        createUniqValidity(dupList) {
            let list = this.$_.cloneDeep(dupList)
            let storeList = []
            for(let i = 0; i < list.length; i++ ) {
                let cell = list[i]

                let hasStore = this.inValidityList(cell, storeList)
                if (!hasStore) {
                    storeList.push(cell)
                }
            }

            return storeList
        },
        getOldRow(member, client, list) {
            let old = ''
            list.forEach(item => {
                if (item.validType === member.type &&
                    item.validRange === member.value &&
                    item.clientSource === client) {
                    old = item
                }
            })
            return old
        },
        syncOldRow(row, list) {
            if (list === undefined) {
                return
            }

            let old = ''
            list.forEach(item => {
                if (item === undefined) {
                    return
                }
                if (item.validType === row.validType &&
                    item.validRange === row.validRange &&
                    item.clientSource === row.clientSource) {
                    old = item
                }
            })
            return old
        },
        copyClient(list) {
            let tempList = []
            for (let i = 0; i < list.length; i++) {
                let each = list[i]
                if (!tempList.includes(each)) {
                    tempList.push(each)
                }
            }

            return tempList
        },
        createOneTemp(sourceList) {
            let { client } = this.priceSource
            let validity = this.validityList
            let tempList = []

            for(let i = 0; i < validity.length; i++ ) {
                let member = validity[i]
                // 不显示空的有效期
                let emptyValidity = member.value === ''
                if (emptyValidity) {
                    continue
                }

                for(let j = 0; j < client.length; j++ ) {
                    let cell = {
                        validType: member.type,
                        validRange: member.value,
                        clientSource: client[j],
                        price: '',

                        productId: '',
                        isFrontDisplay: 0,
                        isEnable: 0,
                        sortNumber: i * 20 + j,
                    }

                    let old = this.getOldRow(member, client[j], sourceList)
                    if (old !== '') {
                        cell = old
                        cell.sortNumber = i * 20 + j
                    }

                    tempList.push(cell)
                }
            }

            return tempList
        },
        createAutoTemp(sourceList) {
            let { client } = this.priceSource
            let validity = this.validityList
            let tempList = []
            for(let i = 0; i < validity.length; i++ ) {
                let member = validity[i]
                // 不显示空的有效期
                let emptyValidity = member.value === ''
                if (emptyValidity) {
                    continue
                }

                for(let j = 0; j < client.length; j++ ) {
                    let cell = {
                        validType: member.type,
                        validRange: member.value,
                        clientSource: client[j],
                        firstSubscribePrice: '',

                        autoPayPrice: '',
                        productId: '',
                        isFrontDisplay: 0,
                        isEnable: 0,
                        sortNumber: i * 20 + j,
                    }

                    let old = this.getOldRow(member, client[j], sourceList)
                    if (old !== '') {
                        cell = old
                        cell.sortNumber = i * 20 + j
                    }
                    tempList.push(cell)
                }
            }

            return tempList
        },
        syncLevelData(source, oldData) {
            if (source === undefined) {
                return
            }

            let updateList = []
            for (let i = 0; i < source.length; i++) {
                let row = source[i]
                let old = this.syncOldRow(row, oldData)

                if (old !== '') {
                    row = old
                }
                updateList.push(row)
            }

            return updateList
        },
        updateOtherLevel(source, modelLevel) {
            let allLevel = this.$_.cloneDeep(source)
            for (let i = 0; i < this.levelData.length; i++) {
                let eachLevel = this.levelData[i]

                let levelId = eachLevel.levelId
                let levelData = allLevel[levelId]
                allLevel[levelId] = this.syncLevelData(modelLevel, levelData)
            }

            return allLevel
        },
        updateClient() {
            this.createTableDate()
        },
        updatePayMode() {
            this.updateClient()
        },
        createTableDate() {
            let hasOne = this.priceSource.mode.includes('one')
            if (hasOne) {
                let oneList = this.createOneTemp(this.onePayData)
                this.onePayData = oneList

                if (this.levelMode) {
                    this.allOneData = this.updateOtherLevel(this.allOneData, this.onePayData)
                }

            }

            let hasAuto = this.priceSource.mode.includes('auto')
            if (hasAuto) {
                let autoList = this.createAutoTemp(this.autoPayData)
                this.autoPayData = autoList
                if (this.levelMode) {
                    this.allAutoData = this.updateOtherLevel(this.allAutoData, this.autoPayData)
                }
            }
        },
        updateTableData(source, data) {
            let { index, property, value } = data
            let tableData = this.$_.cloneDeep(source)
            tableData[index][property] = value

            return tableData
        },
        isBatchUpdate(data, list) {
            let { index, property } = data
            let allStatus = property === 'isFrontDisplay' || property === 'isEnable'
            let getIndex = countIndex(list[index], list)
            let batchData = getIndex.length > 1

            return allStatus && batchData
        },
        batchUpdateTable(data, list) {
            let { index } = data
            let listCopy = this.$_.cloneDeep(list)
            let crossIndex = countIndex(listCopy[index], listCopy)

            crossIndex.forEach(rowIndex => {
                let updatePack = this.$_.cloneDeep(data)
                updatePack.index = rowIndex
                listCopy = this.updateTableData(listCopy, updatePack)
            })

            return listCopy
        },
        updateOnePay(data) {
            let batch = this.isBatchUpdate(data, this.onePayData)
            if (batch) {
                this.onePayData = this.batchUpdateTable(data, this.onePayData)
            } else {
                this.onePayData = this.updateTableData(this.onePayData, data)
            }
        },
        // 如果启用状态关闭，同步关闭前端展示
        syncUpdateFront(listType, statusData) {
            let isOpen = statusData.value === 1
            if (isOpen) {
                return
            }

            let frontCell = this.$_.cloneDeep(statusData)
            frontCell.property = 'isFrontDisplay'
            if (listType === 'one') {
                this.updateOnePay(frontCell)
            } else if (listType === 'auto') {
                this.updateAutoPay(frontCell)
            }
        },
        updateAutoPay(data) {
            let batch = this.isBatchUpdate(data, this.autoPayData)
            if (batch) {
                this.autoPayData = this.batchUpdateTable(data, this.autoPayData)
            } else {
                this.autoPayData = this.updateTableData(this.autoPayData, data)
            }
        },
        handleOneSpan ({ row, rowIndex, columnIndex }) {
            // 第二列是客户端到 productId 不跨行
            if (columnIndex > 0 && columnIndex <= 3) {
                return
            }
            let list = this.onePayData
            let allIndex = countIndex(row, list)
            // 跨行数据
            let crossRow = allIndex.length >= 2

            if (crossRow) {
                let property = {
                    rowspan: 0,
                }
                if (rowIndex === allIndex[0]) {
                    property.rowspan = allIndex.length
                }

                return property
            }
        },
        handleAutoSpan ({ row, rowIndex, columnIndex }) {
            // 第二列是客户端到 productId 不跨行
            if (columnIndex > 0 && columnIndex <= 4) {
                return
            }
            let list = this.autoPayData
            let allIndex = countIndex(row, list)
            // 跨行数据
            let crossRow = allIndex.length >= 2

            if (crossRow) {
                let property = {
                    rowspan: 0,
                }
                if (rowIndex === allIndex[0]) {
                    property.rowspan = allIndex.length
                }

                return property
            }
        },
        countIndex(actionRow, sourceList) {
            let { validType, validRange } = actionRow
            let pack = []
            let list = sourceList

            for (let i = 0; i < list.length; i++ ) {
                let cell = list[i]
                if (cell === undefined) {
                    break
                }
                if (cell.validType === validType &&
                    cell.validRange === validRange) {
                    pack.push(i)
                }
            }

            return pack
        },
        sortOneRow(type, actionRow) {
            this.actionList = this.onePayData
            this.assignFunc = (orderList) => {
                this.onePayData = orderList
            }

            let allIndex = countIndex(actionRow, this.actionList)
            this.moveRow(type, allIndex, actionRow)
        },
        sortAutoRow(type, actionRow) {
            this.actionList = this.autoPayData
            this.assignFunc = (orderList) => {
                this.autoPayData = orderList
            }

            let allIndex = countIndex(actionRow, this.actionList)
            this.moveRow(type, allIndex, actionRow)
        },
        /**
         * 移动表格行
         * @param type
         * @param allIndex
         */
        moveRow(type, allIndex) {
            let actionIndex
            // eslint-disable-next-line
            let targetIndex = 0
            // let actionList = this.onePayData

            // 向上移动，序数根据首位判断
            if ( type === 'up') {
                actionIndex = allIndex[0]
                targetIndex = actionIndex - 1
                let targetRow = this.actionList[targetIndex]
                let allTargetIndex = countIndex(targetRow,
                    this.actionList)

                // 根据首个目标的 sortNumber 进行设置
                let targetIndex = allTargetIndex[0]
                let firstTarget = this.actionList[targetIndex].sortNumber
                this.setOrder(type, allIndex, firstTarget)

            } else if (type === 'down') {
                // 向下移动，序数根据末尾判断
                actionIndex = allIndex[allIndex.length - 1]
                targetIndex = actionIndex + 1
                let targetRow = this.actionList[targetIndex]
                let allTargetIndex = countIndex(targetRow, this.actionList)

                // 根据末尾目标的 sortNumber 进行设置
                let targetIndex = allTargetIndex[allTargetIndex.length - 1]
                let firstTarget = this.actionList[targetIndex].sortNumber
                this.setOrder(type, allIndex, firstTarget)
            }
        },
        /**
         * 设置排序的 order
         * @param type 操作类型：up 向上, down 向下
         * @param source
         * @param target 目标的 order。
         */
        setOrder(type, source, target) {
            let listData = this.$_.cloneDeep(this.actionList)
            let setSort
            if ( type === 'up') {
                setSort = target - 1
                source.forEach(eachIndex => {
                    listData[eachIndex].sortNumber = setSort
                    setSort--
                })
            } else if (type === 'down') {
                setSort = target + 1
                source.forEach(eachIndex => {
                    listData[eachIndex].sortNumber = setSort
                    setSort++
                })
            }

            this.orderByIndex(listData)
        },
        orderByIndex(list) {
            list.sort(function(a, b) {
                if (a.sortNumber < b.sortNumber) {
                    return  -1
                } else if (a.sortNumber < b.sortNumber) {
                    return 1
                } else {
                    return 0
                }
            })

            let initList = this.initOrder(list)
            this.assignFunc(initList)
        },
        initOrder(list) {
            // 有 7 个终端，最多跨七行。即使两个跨行的行交换位置。
            // 也能保证 sortNumber 不会溢出。
            let orderBase = 20
            for(let i = 0; i < list.length; i++) {
                let order = orderBase * i
                list[i].sortNumber = order
            }

            return list
        },
        removeLevel(index) {
            let list = this.$_.cloneDeep(this.levelData)
            if (list.length === 2) {
                this.$Message.error('等级模式，至少有两个等级')
                return
            }

            list.splice(index, 1)
            this.levelData = list
        },
        addLevel() {
            let last = this.levelData[this.levelData.length - 1]
            let levelId = Number(last.levelId.slice(4)) + 1
            if (levelId === 11) {
                this.$Message.error('最多只能添加 10 个等级')
                return
            }

            let cell = {
                levelId: `SVIP${ levelId }`,
                levelName: '',
                levelLogo: '',
            }
            this.levelData.push(cell)
        },
        updateLevel(data) {
            this.levelData = this.updateTableData(this.levelData, data)
        },
        createLevelName(levelId) {
            let level = levelId.slice(4)
            let str = `SVIP ${level}`
            return str
        },
        isEmptyLevel(list) {
            return list.some(item => item === undefined)
        },
        /**
         * 取出存储的价格明细
         * @param type  one auto
         * @param store 所有的等级数据
         * @param key 当前编辑的等级
         * @param copy 之前编辑过的数据
         * @return {*}
         */
        getStoreList(type, store, key, copy) {
            let list = store[key]
            if (list === undefined || this.isEmptyLevel(list)) {
                if (type === 'one') {
                    list = this.initPriceOne(copy)
                } else {
                    list = this.initPriceAuto(copy)
                }
            }

            return list
        },
        changePriceTable() {
            // 保存更改
            Object.assign(this.allOneData, {
                [this.oldLevel]: this.onePayData,
            })

            Object.assign(this.allAutoData, {
                [this.oldLevel]: this.autoPayData,
            })

            this.oldLevel = this.currentLevel

            // 显示已有的编辑。
            this.onePayData = this.getStoreList('one',this.allOneData, this.currentLevel, this.onePayData)

            this.autoPayData = this.getStoreList('auto', this.allAutoData, this.currentLevel, this.autoPayData)
        },
    }
};
</script>

<style scoped lang="scss">
.page-title {
    margin-bottom: 28px;
    vertical-align: middle;

    & > span {
        cursor: pointer;
        vertical-align: middle;
        font-weight: 600;
        text-align: left;

        color: rgba(62, 69, 82, 1);
        font-size: 24px;
        line-height: 32px;
        /*vertical-align: middle;*/
    }

    .iconBack {
        display: inline-block;
        position: relative;
        padding-right: 12px;
        font-size: 24px;

        vertical-align: middle;
        transform: translateY(-4px);
    }
}

.edit-level {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    padding: 20px 24px;
    box-sizing: border-box;
}

.block-title {
    background: #FCF9FC;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 12px;

    font-weight: bold;
    color: rgba(68, 68, 79, 1);
    line-height: 22px;
}

.large-input {
    width: 376px!important;
}


.member-must-icon {
    position: relative;
    &:before {
        position: absolute;
        top: 6px;
        left: 56px;
        content: '*';

        color: red;
        font-size: 20px;
    }
}

.add-level {
    text-align: center;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(226,226,233,1);

    span {
        vertical-align: middle;
    }
    .iconfont {
        vertical-align: middle;
    }
}
.conpouTypeBox {
    margin-left: 6%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.conpouTypeBox__card {
    width: 100px;
    height: 62px;
    border-radius: 8px;
    border: 1px solid rgba(226,226,234,1);
    margin-right: 8px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 2;
    }

    p {
        font-size: 14px;
        color: #44444F;
        font-weight: 500;
    }

    span {
        font-size: 12px;
        color: #92929D;
        font-weight: 300;
    }
}

.conpouTypeBox__card--checked {
    border: 1px solid #FF8C08;

    p {
        color: #FF8D0A;
    }
}
.card__checkedIcon {
    width: 30px;
    height: 20px;
    background-color: #FF8C08;
    transform-origin: top center;
    transform: rotate(45deg);
    text-align: center;
    position: absolute;
    top: -4px;
    right: -20px;
}
.mode-desc {
    font-size:12px;
    font-family:SFUIDisplay-Light,SFUIDisplay;
    font-weight:300;
    color:rgba(146,146,157,1);
    line-height:22px;
    text-align: center;
}

.avatar-item {
    width: 80px;
    height: 80px;
    margin: unset;

    border-radius: unset;
    overflow: hidden;

    .before-upload {
        border: 1px dashed #E5E2E5;

        &:hover {
            background-clip: content-box;
            padding: 2px;
            border: 1px dashed rgba(255, 140, 8, 1);
        }
    }


    .image-position {
        position: relative;
        width: 72px;
        height: 72px;
        text-align: center;

        border: 1px solid rgba(226, 226, 234, 1);
        cursor: pointer;
        background: rgba(0, 0, 0, .2);
        line-height: 72px;

        background-clip: content-box;
        padding: 2px;
        border-radius: 4px;

        img {
            height: 66px;
            width: 66px;
        }

        &:hover .demo-upload-list-cover {
            position: absolute;
            background: rgba(23, 23, 37, 0.6);
            color: #fff;
            left: 0;

            top: 0;
            width: 72px;
            height: 72px;
            background-clip: content-box;
            border: 1px solid rgba(255, 141, 10, 1);

            padding: 2px;
            border-radius: 4px;
        }

        .had-upload {

            &:hover {

            }
        }
    }
}


.upload-class {
    background: #FCF9FC;
    background-clip: content-box;
    padding: 2px;
    line-height: 68px;
    border-radius: 4px;

    &:hover {
        background: rgba(255, 246, 236, 1);

        .pointer {
            color: rgba(255, 140, 8, 1);
        }
    }
}

.form-remind {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 300;
    color: rgba(146, 146, 157, 1);
    line-height: 22px;
}

.item-container {
    background:rgba(255,255,255,1);
    border-radius:8px;
    border:1px solid rgba(226,226,233,1);
    padding: 20px;
}

.item-title {
    height:56px;
    padding: 20px 16px;
    font-size:12px;
    font-weight:500;

    color:rgba(68,68,78,1);
    line-height:22px;
    background:rgba(250,250,251,1);
    border-bottom: 1px solid rgba(226,226,233,1);
}

.item-content {
    padding: 26px 20px;
    border-bottom: 1px solid rgba(226,226,233,1);
}

.submit-container {
    border-top: 1px solid rgba(226, 226, 234, 1);
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 40px;
}
</style>
