<template>
</template>

<script>
import BaseEntity from './BaseEntity.vue';
import BaseSecurity from './BaseSecurity.vue';

export default {
    name: 'BaseGrid',
    data: () => ({
        tick : true,
        path: 'path',
        repository: null,
        menu: [],
        value: [],
    }),
    mixins:[
        BaseEntity,
        BaseSecurity
    ],
    async mounted() {
    this.value = await this.search();
    }, 
    methods:{
        addNewRow() {
            this.newValue = null
            this.openDialog = true;
        },
        async append() {
            this.tick = false;
            this.openDialog = false

            // 기존 방식으로 값 넣지 말고, 등록(POST) 성공 후에는 서버에서 fetch로 전체 목록을 다시 받아야 한다!
            // this.value.push({ ...this.newValue });

            await this.search(); // 또는 await this.fetch();  (프로젝트에 따라 함수명 다를 수 있음)

            this.$emit('update:modelValue', this.value);
            this.$nextTick(() => {
                this.tick = true;
            });
        },
        remove(value){
            var where = -1;
            for(var i=0; i<this.value.length; i++){
                if(this.value[i]._links.self.href == value._links.self.href){
                    where = i;
                    break;
                }
            }
            if(where > -1){
                this.value.splice(i, 1);
                this.$emit('input', this.value);
            }
        },
        async search(query) {
            var me = this;
            if(me.offline){
                if(!me.value) me.value = [];
                return;
            } 
            var temp = null;

            if(!me.offline){
                temp = await this.repository.find(query)
                this.value = temp
            }

            return this.value;
        },
        findId(val){
            let id = val._links.self.href.split('/');
            return id.pop()
        },
        changeSelectedRow(val){
            this.selectedRow = val
        },
        openEditDialog(){
            this.editDialog = true;
        },
        closeDialog(){
            this.openDialog = false
            this.editDialog = false
        }
    },
}
</script>

<style>
</style>