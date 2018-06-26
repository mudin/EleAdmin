import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mocker from 'mockjs';
import Qs from 'qs';

window.host = '';
// 服务器入口
window.index = '/index.json';

// This sets the api adapter on the default instance
const mock = new MockAdapter(axios);

/** 通用调试信息 */
const trace = Mocker.mock({
  'rows|10-20': [{
    text: '@csentence',
    'type|1': ['success', 'warning', 'info', 'error'],
  }],
});

/** 通用菜单 */
const menus = [
  {
    index: '1',
    label: '面板展示',
    icon: 'el-icon-document',
    items: [
      {
        index: '11',
        label: '表格信息',
        url: '/table/view.json',
      },
      {
        index: '12',
        label: '数据提交',
        icon: 'el-icon-news',
        url: '/form.json',
      },
      {
        index: '13',
        label: '树状结构',
        icon: 'el-icon-tickets',
        url: '/tree/view.json',
      },
      {
        index: '14',
        label: '图标统计',
        url: 'status.json',
        icon: 'el-icon-location',
      },
    ],
  },
  {
    index: '2',
    label: '用户管理',
    url: 'login.json',
    layer: 'App',
  },
];

/** 通用用户命令 */
const commands = [
  {
    index: 'user-info',
    label: '个人信息',
    url: '/info.json',
  },
  {
    index: 'user-pwd',
    label: '修改密码',
    url: '/password.json',
  },
  {
    index: 'user-logout',
    label: '退出登录',
    url: '/login.json',
    divided: true,
    redirect: 'App',
  },
];

/** 参数说明
 * 1. arguments for reply are (status, data, headers)
 * 2. (config) => {
 *      // config.params
 *      return [status, data];
 *    }
 */
/** 后台入口 */
mock.onGet('/index.json').reply(200, {
  redirect: '/login.json',
  trace,
});

/** 登录页面 */
mock.onGet('/login.json').reply(200, {
  view: {
    name: 'Login',
    title: 'EleAdmin后台',
    form: {
      url: '/login.json',
      fields: [
        {
          index: 'user-name',
          label: '用户名',
          name: 'name',
          colWidth: 200,
          sortable: true,
          rule: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
        }, {
          index: 'user-password',
          label: '密码',
          name: 'password',
          colWidth: 100,
          holder: 'password',
          rule: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }, {
          index: 'user-verify',
          label: '验证码',
          name: 'verify',
          colWidth: 100,
          holder: 'verify',
          url: '/verify.json',
          rule: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: 'validateAsync', trigger: 'blur', url: '/verify/check.json', message: '验证码错误' },
          ],
        },
      ],
    },
  },
  trace,
});

/** 验证码 */
mock.onGet('/verify.json').reply(200,
  Mocker.Random.dataImage('350x80', 'Vemin'),
);

/** 验证码校验 */
mock.onGet('/verify/check.json').reply(config => [
  200,
  (config.params.value.toLowerCase() === 'vemin') ? {
    status: true,
  } : {
    status: false,
    // message: {
    //   text: '验证码错误',
    //   type: 'warning',
    // },
  },
]);

/** 登陆动作 */
mock.onPost('/login.json').reply(config => [
  200,
  (Qs.parse(config.data).verify.toLowerCase() === 'vemin') ? {
    redirect: '/main.json',
  } : {
    // status: false,
    message: {
      text: '到不了的地方',
      type: 'warning',
    },
  },
]);

/** 后台主页 */
mock.onGet('/main.json').reply(200, {
  view: {
    name: 'Admin',
    url: '/admin.json',
    title: '鸿瑞科技',
  },
  trace,
});

/** 管理页面 */
mock.onGet('/admin.json').reply(200, {
  user: {
    name: '超级管理员',
    commands,
  },
  menus,
  view: {
    name: 'Simple',
    message: '仪表盘',
  },
  trace,
  message: {
    text: '登录成功，欢迎回来！',
    type: 'success',
  },
});

/** 模型 */
const Demo = {
  columns: [
    {
      index: 'user-name',
      label: '用户名',
      name: 'name',
      colWidth: 200,
      sortable: true,
      editable: true,
      editUrl: '/table/edit/name.json',
    }, {
      index: 'user-sex',
      label: '性别',
      name: 'sex',
      colWidth: 100,
      holder: 'switch',
      activeText: '男',
      inactiveText: '女',
      activeIconClass: 'el-icon-location',
      inactiveIconClass: 'el-icon-location-outline',
    }, {
      index: 'user-year',
      label: '年龄',
      name: 'year',
      colWidth: 100,
    }, {
      index: 'user-depart',
      label: '部门',
      name: 'depart',
      colWidth: 200,
      holder: 'select',
      items: [
        {
          value: 1,
          label: '第一中学',
        },
        {
          value: 2,
          label: '第二中学',
        },
        {
          value: 3,
          label: '第三中学',
        },
        {
          value: 4,
          label: '第四中学',

        },
      ],
    }, {
      index: 'user-address',
      label: '地址',
      name: 'address',
      align: 'left',
    },
  ],
  btns: [
    {
      icon: 'el-icon-edit',
      type: 'success',
      label: '新建',
      next: '/form.json',
    },
    {
      icon: 'el-icon-delete',
      url: '/delete.json',
      multiSelect: true,
      type: 'danger',
      label: '删除',
    },
  ],
  department: [
    {
      label: '名称',
      name: 'name',
      index: 'department-name',
    },
    {
      label: '状态',
      name: 'sex',
      index: 'department-sex',
    },
    {
      label: '简介',
      name: 'display',
      index: 'department-display',
      width: '200px',
    },
  ],
  actions: {
    items: [
      {
        icon: 'el-icon-edit',
        next: '/form.json',
        type: 'primary',
        label: '修改',
      },
      {
        icon: ['el-icon-location-outline', 'el-icon-location'],
        switch: 'sex',
        switchUrl: ['/sex.json?sex=1', '/sex.json?sex=0'],
        label: ['女', '男'],
        type: ['primary', 'denger'],
      },
      {
        icon: 'el-icon-edit',
        url: '/status.json',
        type: 'success',
        label: '状态',
        disable: 'sex',
      },
    ],
  },
};

/** 表格界面 */
mock.onGet('/table/view.json').reply(200, {
  title: '用户信息',
  view: {
    name: 'TableView',
    columns: Demo.columns,
    search: {
      size: 'mini',
      inline: true,
      fields: [
        {
          index: 'user-name',
          label: '用户名',
          name: 'name',
        },
      ],
    },
    btns: Demo.btns,
    actions: Demo.actions,
    url: '/table/data.json',
  },
  trace,
});

/** 单元格修改 */
mock.onGet('/table/edit/name.json').reply(config => [200, { value: config.params.value }]);

/** 表格数据 */
mock.onGet('/table/data.json').reply(() => [200, Mocker.mock({
  'rows|10': [
    {
      'id|+1': 1,
      index: '@name',
      name: '@name',
      sex: '@boolean',
      'year|20-30': 20,
      address: '@name',
      'depart|1-4': 3,
    },
  ],
  'selected|1-5': ['@integer(1,10)'],
  total: 200,
  trace,
})]);

/** 表单界面 */
mock.onGet('/form.json').reply(200, {
  title: '新增用户',
  view: {
    name: 'VeForm',
    style: {
      width: '460px',
      padding: '40px',
    },
    fields: Demo.columns,
    url: '/form.json',
  },
  trace,
});

mock.onPost('/form.json').reply(200, {
  next: '/table/view.json',
  trace,
});

/** 图表界面 */
mock.onGet('/status.json').reply(200, {
  title: '用户分析',
  view: {
    name: 'ElChart',
    option: {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }],
    },
  },
  trace,
});

/** 树状表格 */
mock.onGet('/tree/view.json').reply(200, {
  title: '组织结构',
  view: {
    name: 'TreeView',
    columns: Demo.department,
    btns: Demo.btns,
    url: '/tree/data.json',
    actions: Demo.actions,
  },
});

/** 结构数据 */
mock.onGet('/tree/data.json').reply(() => [200, Mocker.mock({
  'rows|3-5': [
    {
      'id|+1': 1,
      index: '@name',
      name: '@name',
      sex: '@boolean',
      display: '@name',
      'children|0-3': [
        {
          'id|+1': 1,
          index: '@name',
          name: '@name',
          sex: '@boolean',
          display: '@name',
        },
      ],
    },
  ],
  trace,
})]);

mock.onGet('/user.json').reply(200, {
  view: {
    name: 'Simple',
  },
  trace,
});
