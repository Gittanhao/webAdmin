<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{
                                subItem.title
                            }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    icon: 'el-icon-setting',
                    index: 'basetable',
                    title: '系统管理',
                    subs: [
                        {
                            index: 'basetable',
                            title: '用户管理'
                        },
                        {
                            index: '1',
                            title: '角色管理'
                        },
                        {
                            index: '2',
                            title: '部门管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-shopping-bag-2',
                    index: '2',
                    title: '商品列表'
                },
                {
                    icon: 'el-icon-s-order',
                    index: '2',
                    title: '订单列表'
                },
                {
                    icon: 'el-icon-tickets',
                    index: '2',
                    title: '退稿列表'
                },
                {
                    icon: 'el-icon-shopping-bag-1',
                    index: '2',
                    title: '促销活动'
                },
                {
                    icon: 'el-icon-money',
                    index: '2',
                    title: '补款列表'
                },
                {
                    icon: 'el-icon-notebook-1',
                    index: '2',
                    title: '成本支出'
                },
                {
                    icon: 'el-icon-coin',
                    index: '2',
                    title: '退费列表'
                },
                {
                    icon: 'el-icon-document-delete',
                    index: '2',
                    title: '退稿列表'
                },
                {
                    icon: 'el-icon-star-on',
                    index: '2',
                    title: '转刊列表'
                },
                {
                    icon: 'el-icon-document',
                    index: '2',
                    title: '合同列表'
                }
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
}

.sidebar > ul {
    height: 100%;
}
</style>
