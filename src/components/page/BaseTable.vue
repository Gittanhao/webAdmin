<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="select_cate" placeholder="查询名称" class="handle-select mr10">
                <el-option key="1" label="用户名称" value="湖南省"></el-option>
                <el-option key="2" label="用户id" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="用户名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" style="margin-left:550px;" @click="delAll">
                批量删除
            </el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="id" sortable width="100"></el-table-column>
            <el-table-column prop="name" label="简称" width="120"></el-table-column>
            <el-table-column prop="nickName" label="名称" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
            <el-table-column prop="mobile" label="手机号码" width="150"></el-table-column>
            <el-table-column prop="status" label="状态" width="80"></el-table-column>
            <el-table-column prop="deptId" label="部门id" width="80"></el-table-column>
            <el-table-column prop="createBy" label="创建人" width="100"></el-table-column>
            <el-table-column prop="lastUpdateBy" label="更新人"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index,scope.row.id)">编辑
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=pageNum
                :page-sizes="[5, 10, 20, 30]"
                :page-size=pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total=totalSize>
            </el-pagination>
        </div>
    </div>
    <!--    <div class="pagination">-->
    <!--        <el-pagination-->
    <!--            @current-change ="handleCurrentChange"-->
    <!--            layout="prev, pager, next"-->
    <!--            :total="1000">-->
    <!--        </el-pagination>-->
    <!--    </div>-->
</template>

<script>
export default {
    data() {
        return {
            url: './static/vuetable.json',
            tableData: [],
            pageNum: 1,
            pageSize: 5,
            is_search: 0,
        }
    },
    created() {
        this.getData();
    },
    // computed: {
    //     data() {
    //         const self = this;
    //         // debugger;
    //         return self.tableData.filter(function (d) {
    //             for (let i = 0; i < self.tableData.length; i++) {
    //                 console.log(self.tableData)
    //             }
    //         })
    //     }
    // },
    methods: {
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData();
        },
        getData() {
            // debugger
            let self = this;
            fetch('http://192.168.0.104:80/user/findPage', {
                method: 'post',
                body: JSON.stringify({pageNum: self.pageNum, pageSize: self.pageSize}),
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            }).then((res) => {
                return res.text()
            }).then((data) => {
                // console.log(JSON.parse(data).data)
                self.tableData = JSON.parse(data).data.content;
                self.totalSize = JSON.parse(data).data.totalSize;
            })
        },
        search() {
            // debugger;
            let self = this;
            if(this.is_search == 0){
                //用户查询
                fetch('http://192.168.0.104:80/user/findByName?name='+ 'lvbu', {
                    method: 'get',
                }).then((res) => {
                    return res.text()
                }).then((data) => {
                    self.tableData = JSON.parse(data).data;
                })
            }else{
                //用户id查询
                fetch('http://192.168.0.104:80/user/findById?id='+ '1', {
                    method: 'get',
                }).then((res) => {
                    return res.text()
                }).then((data) => {
                    self.tableData = JSON.parse(data).data;
                })
            }
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
        },
        handleDelete(index, id) {
            fetch('http://192.168.0.104:80/user/delete', {
                method: 'post',
                body: JSON.stringify({id: id}),
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            }).then((res) => {
                return res.text()
            }).then((data) => {
                console.log(JSON.parse(data).code)
                // debugger;
                if (JSON.parse(data).code != "200") {
                    this.$message('删除失败');
                } else {
                    this.$message({message: "删除成功", type: "success"});
                }
                this.getData();
            })
        },
        delAll() {
            const self = this,
                length = self.multipleSelection.length;
            let str = '';
            self.del_list = self.del_list.concat(self.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += self.multipleSelection[i].name + ' ';
            }
            self.$message.error('删除了' + str);
            self.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>

<style>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
