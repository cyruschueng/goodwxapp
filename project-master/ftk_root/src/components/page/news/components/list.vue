<template>
  <div class="list">
    <el-row>
        <el-col :span="24">
            <el-table :data="listData" border style="width: 100%">
                <el-table-column type="index" width="55">
                </el-table-column>
                <el-table-column property="id" label="资讯ID">
                </el-table-column>
                <el-table-column property="title" label="标题">
                </el-table-column>
                <el-table-column property="create_datetime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                    <el-button :plain="true" size="small" type="info" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :plain="true" size="small" type="danger" @click="remove(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default{
        name:'lsit',
        props:['listData'],
        methods:{
            edit(index, row){
                this.$emit('edit', row)
            },
            remove(index, row){
                this.$emit('remove', row)
            }
        }
    }
</script>
