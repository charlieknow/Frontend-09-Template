## 学习笔记 | 浏览器工作原理（三）
### 排版
#### 根据浏览器属性进行排版
* 第一代排版: 正常流(再加上 position, float, display) 
* 第二代排版: flex 
* 第三代排版: grid 
* 第四代排版：CSS Houdini(提供 CSS layout API, 可以自定义display属性的值)

这里采用flex布局的方式

#### 收集元素进行
分行为后面计算元素位置做准备
* 分行
    * 根据主轴尺寸，把元素分进行
    * 若设置了no-wrap, 则强行分配进第一行

#### 计算主轴
计算主轴方向
* 找出所有flex元素
* 把主轴方向的剩余尺寸按比例分配给这些元素
* 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

#### 计算交叉轴
计算交叉轴方向
* 根据每一行中最大元素尺寸计算行高
* 根据行高flex-align和item-align，确定元素具体位置
------
### 渲染
准备一个图形环境，Node.js是没有图形封装的，用生产图片来代替，把绘制屏幕变成绘制到图片。
#### 绘制单个元素
* 绘制需要依赖一个图形环境
* 我们这里采用了 npm 的 images库，jQuery风格的库
* 绘制在一个viewport上进行
* 与绘制相关的属性：background-color、border、background-image等

#### 绘制DOM树
* 递归的调用子元素的绘制防范（render函数），就可以完成所有DOM树的绘制
* 忽略一些不需要绘制的节点
* 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
* 实际浏览器中，还会对一些图层做compositing,这里也忽略了