## 学习笔记 | 重学CSS 2
#### 盒
* 标签（Tag，源代码中的概念）
* 元素（Element，语义领域的概念）
* 盒（Box）

HTML代码中可以书写开始`标签`，结束`标签`，和自封闭`标签`。

一对起止`标签`，表示一个`元素`。

DOM树中存储的是`元素`和其它类型的节点（Node）。

CSS选择器选中的是`元素`。

CSS选择器选中的`元素`，在排版时可能产生多个`盒`。

排版和渲染的基本单位是`盒`。

盒模型：  
排版时用的基本单位，它的组成从内向外分别是：`content`、`padding`、`border`、`margin`。  
`padding` 主要影响盒内的排版，而 `margin` 主要影响盒本身的排版，盒周围至少存在的空白区域的大小。

----
### CSS排版
#### 正常流
CSS 中排版只排两个东西：`盒`、`字` ，给每个字，每个盒安排到正确位置

正常流排版
* 收集盒与文字进行
* 计算盒与文字在行中的排布
* 计算行的排布

排版方式
* IFC（`inline-level-formatting-context`行内级格式化上下文）—— 从左到右
* BFC（`block-level-formatting-context`块级格式化上下文）—— 从上到下

#### 正常流的行级排布
每一行都有 `base-line`（基线）、`text-top`（文字顶部）、`text-bottom`（文字底部）、`line-top`（上源）、`line-bottom`（下缘）几个值，只要文字大小不变，`text-top`和`text-bottom`是不会改变的，如果用了多种不同字号混排，这两个值是由最大一个字号决定的，文字的 `line-height` 值决定`line-top`与`line-bottom`。

如果是包含盒的行模型，行内盒的基线是由盒里面的文字决定的，因此不建议行内盒使用基线对齐，最好使用 `vertical-align` 设置不同的对齐方式。`vertical-align` 表示该行内块与行模型的哪一条线对齐

#### 正常流的块级排布
* `float`：先把这个元素排到正常流里的位置，如果它上面有 float，那么就朝 float 的方向挤过去。然后在根据 float 元素占据的位置调整行盒的位置
* `clear`：找一个干净的空间来执行float，可以做浮动元素的强制换行

 `* PS.` float 不止会影响自己所在的这一行，凡是它的高度所占据的范围内，所有的行盒都会根据float 元素尺寸调整大小；有多个 float 元素，后面的元素会受前面的 float 影响；float 会导致重排，因此不建议使用。

 * 盒模型的边距折叠现象：如果两个上下相邻的盒模型都有 `margin`，那么两个盒子的实际间距为两个 `margin` 的较大值。因为 `margin` 是要求盒模型的周围有固定大的空白，所以周围的留白只要够了，那么它就是一个合理的排版方式。（这种现象只会发生在 BFC 中，IFC、Flex、Grid 中都不会有这个现象，只有正常流中有，而正常流中只有 BFC 有）

#### BFC 合并
Block
* Block Container: 里面有 BFC 的
    * 能容纳正常流的盒，里面就有 BFC
* Block-level Box: 外面有 BFC 的
* Block Box = Block Container + Block-level Box: 里外都有 BFC 的

Block Container

block
* inline-block
* table-cell
* flex item（display: flex 的子元素）
* grid cell（display: grid 的子元素）
* table-caption

Block-level Box
* Block level
    * display: block
    * display: flex
    * display: table
    * display: grid
    * ...
* inline level
    * display: inline-block
    * display: inline-flex
    * display: inline-table
    * display: inline-grid
    * ...

display: run-in 表示跟着自己的上一个元素来

设立 BFC
* floats(浮动的元素里面)
* absolutely positioned elements(绝对定位的元素)
* block containers(such as inline-blocks、table-cells and table-captions) that are not block boxes(Block Container但不是Block-level Box)
    * flex items
    * grid cell
    * ......
* and block boxes with overflow other than visible(overflow 属性值不是 visible)

FC 合并之后会发生什么呢？
* block box && overflow: visible
    * BFC 合并与 float——因为发生了 BFC 合并，所以里面的行盒与 float 就有了一定的影响，如果不发生 BFC 合并，那么就是 block box 本身受 float 影响；如果发生 BFC 合并，那么就是 block box 里面的行盒受 float 影响。
    * BFC 合并与边距折叠——边距折叠只会发生在同一个 BFC 里，如果创建了新的 BFC，那么就不会发生边距折叠；如果没有创建新的 BFC，那么就会发生同向的边距折叠

    默认能容纳正常流的盒，都可以创建 BFC，但有一种情况除外，就是 block box 里外都是 BFC，并且 overflow 属性值是 visible。这时就会发生 BFC 合并

#### Flex 排版
* 收集盒进行
* 计算盒在主轴方向的排布
* 计算盒在交叉轴方向的排布

* 分行
    * 根据主轴尺寸，把元素分进行（放不下就换下一行）
    * 若设置了 no-wrap，则强行分配进第一行

* 计算主轴方向
    * 找出所有 flex 元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余空间为复述，所有 flex 元素为0，等比压缩剩余元素

* 计算交叉轴方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高 flex-align 和 item-align，确定元素具体位置

----

### CSS动画与绘制
#### 动画
* CSS 控制表现
    * 控制元素的位置与尺寸
    * 控制绘制和最后实际渲染的信息
    * 控制交互与动画信息

Animation
* @keyframes 定义
* animation 使用 
``` css
@keyframes mykf
  {
    from {background: red;}
    to {background: yellow;}
  }
div {
  animation: mykf 5s infinite;
}
```  
属性：
* animation-name: 时间曲线，即定义的 keyframes
* animation-duration: 动画的时长
* animation-timing-function: 动画的时间曲线
* animation-delay: 动画开始前的延迟
* animation-iteration-count: 动画的播放次数
* animation-direction: 动画的方向（正向播放和倒向播放）

在动画定义内部可以使用 transition 属性设置不同的时间曲线，如果使用 animation-timing-function，那么整个动画从头到尾的时间曲线都一样，transition 可以分段指定

* transition-property: 要变换的属性
* transition-duration: 变换的时长
* transition-timing-function: 时间曲线（三次贝塞尔曲线）
* transition-delay: 延迟

#### CSS 颜色与绘制
* 光的三原色RGB：红绿蓝；
* 光的补色，CMY：品红、黄、青
    * 在实际的印刷行业，实际上使用的是 CMYK 颜色：黑色是由三种颜色混合合成，而黑色本身是便宜的，但彩色颜料是昂贵的，因此多加了一种黑色。

HSL 与 HSV
* H: Hue 表示色相
* S: 纯度
* L: 亮度(100%表示纯白色，是一个对称的，想要表示纯色的话需要中间的一个值，而不是 100%。WSC 最后选择的是 HSL)
* V: 明度(100%表示纯色)

#### 绘制

* 几何图形
    * border
    * box-shadow
    * border-radius
* 文字
    * font
    * text-decoration
* 位图
    * background-image