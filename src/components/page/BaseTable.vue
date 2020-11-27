<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="is_search" placeholder="查询名称" class="handle-select mr10">
                <el-option key="1" label="用户名称" value="0"></el-option>
                <el-option key="2" label="用户id" value="1"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="用户名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" style="margin-left:550px;"
                       @click="exportUsers">
                导出
            </el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <!--            <el-table-column type="selection" width="55"></el-table-column>-->
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
            is_search: "0",
            select_word: "",
            totalSize: 0,
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
            let self = this;
            self.$axios.post('/user/findPage', {pageNum: self.pageNum, pageSize: self.pageSize}).then((res) => {
                // console.log(res.data)
                // debugger;
                if (Object.keys(res.data.data.content).length != 0) {
                    self.tableData = res.data.data.content;
                    self.totalSize = res.data.data.totalSize;
                } else {
                    self.pageNum = 1;
                    this.getData();
                }

            })
            // fetch('http://172.16.8.18:80/user/findPage', {
            //     method: 'post',
            //     body: JSON.stringify({pageNum: self.pageNum, pageSize: self.pageSize}),
            //     headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            // }).then((res) => {
            //     // debugger
            //     return res.text()
            // }).then((data) => {
            //     // debugger
            //     // console.log(JSON.parse(data).data)
            //     self.tableData = JSON.parse(data).data.content;
            //     // debugger
            //     self.totalSize = JSON.parse(data).data.totalSize;
            // })
        },
        search() {
            let self = this;
            if (self.select_word == "") {
                return this.getData();
            }
            if (this.is_search == "0") {
                //用户查询
                self.$axios.get('/user/findByName?name=' + self.select_word).then((res) => {
                    self.tableData = res.data.data;
                })
                // fetch('http://172.16.8.18:80/user/findByName?name=' + self.select_word, {
                //     method: 'get',
                // }).then((res) => {
                //     return res.text()
                // }).then((data) => {
                //     self.tableData = JSON.parse(data).data;
                // })
            } else {
                //用户id查询
                self.$axios.get('/user/findByid?id=' + self.select_word).then((res) => {
                    self.tableData = res.data.data;
                })
                // fetch('http://172.16.8.18:80/user/findByid?id=' + self.select_word, {
                //     method: 'get',
                // }).then((res) => {
                //     return res.text()
                // }).then((data) => {
                //     self.tableData = JSON.parse(data).data;
                // })
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
            let self = this;
            self.$axios.post('/user/delete', {id: id}).then((res) => {
                if (res.data.code != "200") {
                    this.$message('删除失败');
                } else {
                    this.$message({message: "删除成功", type: "success"});
                }
                this.getData();
            })
            // fetch('http://172.16.8.18:80/user/delete', {
            //     method: 'post',
            //     body: JSON.stringify({id: id}),
            //     headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            // }).then((res) => {
            //     return res.text()
            // }).then((data) => {
            //     console.log(JSON.parse(data).code)
            //     // debugger;
            //     if (JSON.parse(data).code != "200") {
            //         this.$message('删除失败');
            //     } else {
            //         this.$message({message: "删除成功", type: "success"});
            //     }
            //     this.getData();
            // })
        },
        exportUsers() {
            // let myObj = {
            //     url: "/user/exportUsers",  //接口地址
            //     fileName: '值守任务',
            //     data: {pageNum: self.pageNum, pageSize: self.pageSize},
            // }
            // //调用封装方法
            // this.exportUtils.exportMethod(myObj);
            let self = this;
            return self.$axios({ // 用axios发送post请求
                method: 'post',
                url: '/user/exportUsers', // 请求地址
                data: {pageNum: self.pageNum, pageSize: self.pageSize}, // 参数
                responseType: 'blob', // 表明返回服务器返回的数据类型
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => { // 处理返回的文件流
                console.log(res)
                let str = res.headers['content-disposition'];
                // 文件名
                let fileName = "白名单导入模板.xlsx";
                let blob = new Blob([res.data], {
                    type:
                        "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                });
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob);
                } else {
                    let elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                }
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
