<template>
    <div>
        <button @click="download">下载</button>
    </div>
</template>

<script>
// import { log } from "@/utils/tools";
/**
 * 下载图片示例
 */
export default {
    name: "DownImg",
    components: {},
    props: {},
    data() {
        return {
            downloadedImg: '',
            url: '',
        };
    },
    computed: {},
    watch: {},
    created() {
        this.url =  "http://obs-yw.obs.cidc-rp-2000.joint.cmecloud.cn/a69e61fc-6105-493f-9365-4df026d9db7c.jpg"
        this.url = 'http://obs-yw.obs.cidc-rp-2000.joint.cmecloud.cn/7c95d9cc-5132-44f2-9282-e45d0f49f711.jpg'
        this.url = 'http://eos-wuxi-1.cmecloud.cn/crmoss/1510310a-936f-4fad-8e3d-af78675a065c.jpg'
        // this.url = 'http://obs-yw.obs.cidc-rp-2000.joint.cmecloud.cn/a69e61fc-6105-493f-9365-4df026d9db7c.jpg'
    },
    mounted() {

    },
    methods: {
        download() {
            var a = document.createElement('a');
            a.href = this.url
            a.download = "output.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
    }

}
</script>

<style lang="scss" scoped>

</style>
