let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');
let Mocker = require('mockjs');

// This sets the api adapter on the default instance
let mock = new MockAdapter(axios);

let __trace__ = {
  '流程': [{msg: '北京这个市'}, {msg: '天津市'}, {msg: '河北省'}, {msg: '山西省'}],
  '信息': [{msg: '这是一条调试信息'}, {msg: '这是一条错误信息'}, {msg: '这是一条普通信息'}, {msg: '这是一条异常信息'}]
};

window.mockPath = '/index.json';
window.httpServer = '';

// arguments for reply are (status, data, headers)
mock.onGet('/login.json').reply(200, {
  view: {
    name: 'login',
    config: {
      action: '/login.json',
      title: 'EleAdmin后台',
      verifyImgUrl: '/ver.jpg'
    }
  },
  __trace__
});

mock.onPost('/login.json').reply(200, {
  next: '/index.json'
});

mock.onGet('/verify.js').reply((config) => {
  return [200, (config.params.value === '精准扶贫') ? {
    status: 1
  } : {
    status: -1,
    message: '验证码错误'
  }];
});

mock.onGet('/index.json').reply(200, {
  view: {
    name: 'admin',
    config: {
      url: '/admin.json'
    }
  },
  __trace__
});

mock.onGet('/admin.json').reply(200, {
  user: {
    name: '大众化'
  },
  menus: [
    {
      index: '1',
      label: '三生三世',
      menus: [
        {
          index: '11',
          label: '十里表单',
          reload: '/table.json'
        },
        {
          index: '12',
          label: '树状桃花',
          reload: '/tree.json'
        }
      ]
    },
    {
      index: '2',
      label: '花开表单',
      reload: '/form.json'
    },
    {
      index: '3',
      label: '模块系统',
      url: '/module.json'
    }
  ],
  commands: [
    {
      index: '1',
      label: '刷新',
      reload: true
    },
    {
      index: '2',
      label: '登陆',
      url: '/login.json'
    }
  ],
  __trace__
});

mock.onGet('/module.json').reply(200, {
  view: {
    name: 'Module',
    config: {
      label: '模块',
      item: {
        holder: 'group',
        items: {
          name: {
          },
          password: {
            holder: 'switch'
          },
          address: {
            asArray: true
          },
          pwd: {
            holder: 'switch',
            asArray: true
          },
          from: {
            holder: 'pair'
          },
          to: {
            holder: 'select',
            options: [{label: '太原', value: 31}, {label: '临汾', value: 32}, {label: '吉县', value: 33}],
            asArray: true
          }
        }
      },
      value: {
        address: ['www', 'eee', 'kkk']
      }
    }
  },
  __trace__
});

mock.onGet('/form.json').reply(200, {
  config: {
    view: 'JForm',
    fields: [
      {
        label: '姓名',
        holder: 'text',
        name: 'name'
      },
      {
        label: '性别',
        holder: 'switch',
        name: 'sex'
      },
      {
        label: '出生日期',
        holder: 'date',
        name: 'date'
      },
      {
        label: '兴趣爱好',
        holder: 'checkbox',
        name: 'like',
        options: [
          {
            label: '篮球',
            value: '1'
          },
          {
            label: '足球',
            value: '2'
          },
          {
            label: '乒乓球',
            value: '3'
          }
        ]
      },
      {
        label: '专业',
        holder: 'radio',
        name: 'main',
        options: [
          {
            label: '中文',
            value: 11
          },
          {
            label: '英文',
            value: 12
          },
          {
            label: '日文',
            value: 13
          }
        ]
      },
      {
        label: '籍贯',
        holder: 'select',
        name: 'from',
        options: [
          {
            label: '北京',
            value: 11
          },
          {
            label: '天津',
            value: 12
          },
          {
            label: '上海',
            value: 13
          }
        ]
      }

    ],
    rules: {}
  }
});

mock.onGet('/table.json').reply((config) => {
  let rows = Mocker.mock({
    'rows|15': [
      {
        'id|+1': 1,
        'name': '@name',
        'sex|1': true,
        'date': '@date'
      }
    ]
  });
  console.log(rows);
  return [200, {
    config: {
      view: 'JTable',
      btns: [
        { // 一个普通跳转按钮
          label: '添加',
          url: 'add.js'
        },
        { // 带选中行Ids的跳转按钮
          label: '移动',
          url: 'move.js',
          key: true
        },
        { // 带选中行Ids的在线按钮
          label: '删除',
          url: 'delete.js',
          api: true,
          multiSelect: true
        }
      ],
      columns: [
        {
          label: '姓名',
          holder: 'text',
          name: 'name'
        },
        {
          label: '性别',
          holder: 'switch',
          name: 'sex'
        },
        {
          label: '出生日期',
          holder: 'date',
          name: 'date'
        }
      ],
      actions: [
        {
          label: '修改',
          act: {
            url: 'edit.js',
            api: true
          }
        },
        {
          label: '禁用',
          act: {
            url: 'disable.js',
            api: true
          }
        }
      ],
      rows: rows.rows,
      total: 200,
      dataApi: '/table_next.json',
      selected: [2,8]
    }
  }];
});

mock.onGet('/table_next.json').reply((config) => {
  let first = config.params.page || 1;
  let data = Mocker.mock({
    'rows|15': [
      {
        'id|+1': first*15-14,
        'name': '@name',
        'sex|1': true,
        'date': '@date'
      }
    ],
    // selected: [3,5]
  });
  return [200, data];
});

mock.onGet('/tree.json').reply((config) => {
  function getRows () {
    let row = Mocker.mock({
      'label': '@string(10,20)',
      'name': '@name',
      'date': '@date'
    });
    let rdm = Mocker.mock({
      'number': '@integer(1, 5)'
    });
    row.children = [];
    while (rdm.number++ < 3) {
      row.children.push(getRows());
    }
    return row;
  }
  return [200, {
    config: {
      view: 'JTree',
      btns: [
        { // 一个普通跳转按钮
          label: '添加',
          url: 'add.js'
        },
        { // 带选中行Ids的跳转按钮
          label: '移动',
          url: 'move.js',
          key: true
        },
        { // 带选中行Ids的在线按钮
          label: '删除',
          url: 'delete.js',
          api: true,
          multiSelect: true
        }
      ],
      columns: [
        {
          label: '姓名',
          holder: 'text',
          name: 'name',
          span: 5
        },
        {
          label: '出生日期',
          holder: 'date',
          name: 'date',
          span: 3
        }
      ],
      actions: [
        {
          label: '修改',
          act: {
            url: 'edit.js',
            api: true
          }
        },
        {
          label: '禁用',
          act: {
            url: 'disable.js',
            api: true
          }
        }
      ],
      rows: [
        getRows(),
        getRows(),
        getRows(),
        getRows(),
        getRows()
      ],
      total: 300
    }
  }];
});
