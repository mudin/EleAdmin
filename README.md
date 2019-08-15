# ele-admin 3.1

> New version, compatible with the old version, a lot of transformation, more clear

1. Adopted the latest version of Vue, ElementUI
2. The code is more concise and more powerful
3. New CMS utility function: module generation system (2.0 function is not updated temporarily)

> Concise design ideas

1. Element page (chart, form, table, tree) and container page (management interface, login interface) design ideas
2. ele-admin language: automatically generate interface through json data
3. Configuration data (json) is simple and unified, easy to understand

> screenshot

Login page

![登陆页面](https://gitee.com/uploads/images/2017/1229/070645_96c724ae_45533.jpeg "火狐截图_2017-12-28T22-51-29.jpg")

管理页面，这是一个容器页面

![管理页面](https://gitee.com/uploads/images/2017/1229/065454_52ea97c1_45533.jpeg "火狐截图_管理.jpg")

表单页面及后台发来的json，按照json自动生成的元素页面

![表单](https://gitee.com/uploads/images/2017/1229/070040_ed617ee4_45533.jpeg "表单.jpg")

模块页可添加、删除项，简单的项联动也实现了

![模块](https://gitee.com/uploads/images/2017/1229/070441_729ba921_45533.jpeg "mokuai.jpg")


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run server

# build for prod
npm run build


