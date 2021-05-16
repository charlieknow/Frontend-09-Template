## 学习笔记 | 重学CSS
### CSS总论
#### CSS语法的研究
CSS总体结构（2.1）
* @charset
* @import
* rules
    * @media
    * @page
    * rule

#### CSS @规则的研究
At-rules
* `@charset` 申明字符集
* `@import` 极联规则引入
* `@media` 媒体查询
* `@page` 分页媒体 - 打印时风格
* `@counter-style` 列表风格
* `@keyframes` 定义动画帧
* `@fontface` web font与icon font
* `@supports` 检查功能是否存在 - 不推荐使用
* `@namespace` 根据命名空间区分

#### CSS规则的结构
* 选择器(Selector)
    * selector 3
    * selector 4
* 声明
    * key
        * Properties
        * Variables
    * value

    -----
### CSS选择器
选择器语法

简单选择器

* 通用选择器：*
* 类型选择器：div，span
* class 选择器：.cls
* id 选择器：#id
* 属性选择器：[attr=value]
* 伪类选择器：:hover
* 伪元素选择器：::before

复合选择器（选中的元素必须同时 match 几个简单选择器）

* <简单选择器> <简单选择器> <简单选择器>
* *或者 div 必须写在最前面

复杂选择器（针对一个元素的结构进行选择）

* <复合选择器> <复合选择器>：子孙选择器
* <复合选择器> > <复合选择器>：父子选择器
* <复合选择器> ~ <复合选择器>：邻接选择器
* <复合选择器> + <复合选择器>：邻接选择器
* <复合选择器> || <复合选择器>：table 时，表示选中某一列

### 伪类
* 链接/行为
    * :any-link 匹配任何超链接
    * :link 未被访问的链接
    * :visited 已访问的链接
    * :hover 鼠标指针浮动在其上
    * :active 激活状态
    * :focus 焦点在的状态
    * :target 表示链接到当前的目标（锚点）
* 数结构
    * :empty 匹配没有子元素（包括文本节点）的每个元素
    * :nth-child() 父元素的第几个 child
    * :nth-last-child()
    * :first-child，:last-child，:only-child
* 逻辑型
    * :not

### 伪元素
* ::before 在元素的前面插入一个伪元素
* ::after 在元素的后面插入一个伪元素
* ::first-line 第一行
* ::first-letter 第一个字母

思考题

为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢?

`first-line`匹配的元素是在 layout 过程中才确定。
`first-letter`是在 layout 之前是可以确定的。