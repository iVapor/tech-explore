<template>
    <div>
        <Button @click="changeFilter">修改filter</Button>
        <Table border :columns="columns6" :data="data5"></Table>
    </div>
</template>

<script>
// import { log } from "@/utils/tools";
import { col } from "./changeFilterCol"

export default {
    name: "ChangeTableFilter",
    components: {},
    props: {},
    data() {
        return {
            ageFilter: [
                {
                    label: 'Greater than 25',
                    value: 1
                },
                {
                    label: 'Less than 25',
                    value: 2
                }
            ],
            // columns6: col.call(this),
            data5: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
        };
    },
    computed: {
        columns6() {
            return [
                {
                    title: 'Date',
                    key: 'date'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age',
                    filters: this.ageFilter,
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                },
                {
                    title: 'Address',
                    key: 'address',
                    filters: [
                        {
                            label: 'New York',
                            value: 'New York'
                        },
                        {
                            label: 'London',
                            value: 'London'
                        },
                        {
                            label: 'Sydney',
                            value: 'Sydney'
                        }
                    ],
                    filterMethod (value, row) {
                        return row.address.indexOf(value) > -1;
                    }
                }
            ]
        }
    },
    watch: {},
    created() {
    },
    mounted() {

    },
    methods: {
        changeFilter() {
            this.ageFilter = [
                {
                    label: '妈妈咪',
                    value: 1
                },
                {
                    label: 'Less than 25',
                    value: 2
                }
            ]
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
