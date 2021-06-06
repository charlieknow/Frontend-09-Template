## 学习笔记 | 组件化
#### 组件的基本知识
### 组件的基本概念和基本组成部分
* 对象
    * Properties 属性
    * Methods 方法
    * Inherit 继承关系
* 组件
    * Properties 属性（property强调从属关系）
    * Methods 方法
    * Inherit 继承关系
    * Attribute 标签（强调描述性）
    * Config & State 配置与状态
    * Event 事件（由组件从内向外传递）
    * Lifecycle 生命周期
    * Children 子组件

### 如何设计组件状态

| |通过Markup配置|通过代码配置|通过代码操作|通过用户交互|
|---|:---:|:---:|:---:|:---:|
|property|X|O|O|?|
|attribute|O|O|O|?|
|state|X|X|X|O|
|config|X|O|X|X|

PS. O - 最佳实践，? - 允许但不推荐，X - 极力避免

### 组件生命周期  

通用的周期状态有create和destroyed
* 组件挂载周期
  create->mount->unmount(->create)->destroyed

* 组件使用周期/用户交互周期  
  create->render/update(->create)->destroyed

### Children
* Content 内容型子组件 (Vue)
    * 固定数量子组件
* Template 模版型子组件 (React)
    * 非固定数量子组件，通过数据决定
