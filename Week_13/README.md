## 学习笔记 | 重学HTML、浏览器API
#### 重学HTML
##### HTML的定义：XML与SGML
### Document Type Definition - DTD
* 元素定义
  * `<li>`
  * ...
* 实体定义
  * `&nbsp` no-break space
  * `&lambda;` - lambda符号
  * `&quot;` - quotation mark 引号 `"`
  * `&amp;` - ampersand 连字号 `&`
  * `&lt;` - less than 小于号 `<` 
  * `&gt;` - greater than 大于号 `>`
  * ...
* 事件
  * `onclick` - 被点击时
  * ...

### Namespace
* XHTML Namespace: https://w3.org/1999/xhtml

### HTML标签语意
**技巧**： 若无合适语意的标签，可以通过`class="语意"`来指定说明。
* `<aside>` 非页面主体部分
* `<a>` 超链接
* `<main>` 页面主体部分，整个页面只允许一个
* `<article>` 文章主体内容
* `<h1>/<h2>...` 页面主标题/二级标题
* `<hgroup>` 标题组
* `<hr>` 分段信号，改变故事走向/切换话题的场景
* `<p>` 文章段落
* `<abbr>` 缩写
* `<em>` 强调重音，词在上下文中体现出有特殊意义
* `<strong>`  强调重要性，词在上下文中更加重要
* `<figure>` 图片组
* `<img>` 图片
* `<figcaption>` 图片说明
* `<li>` 列表元素
* `<ul>/<ol>` ul与ol的区别在于，列表元素是否在语意上存在顺序
* `<nav>` 页面导航
* `<dfn>` 词的定义
* `<samp>` 案列
* `<pre>` 已预处理文本
* `<code>` 代码文本，中间需嵌套`<pre>`
* `<footer>` 文档末尾

### HTML语法
#### 合法元素
* Element： `<tagname>...</tagname>`
* Text: text
* Comment: `<!-- comments -->`
* Document Type: `<!Doctype html>`
* Processing Instruction: `<?a 1?>`
* CDATA: `<![CDATA[]]>`
#### 字符引用
* `&#161;` - 码点161号字符
* `&amp;` - 连字号 `&`
* `&lt;` - 小于号 `<`
* `&quot;` - 引号 `"`

## 浏览器API
### DOM API
DOM节点
![node](./img/Node.png)
#### 导航操作
* Node - 所有节点
  * parentNode
  * childNodes
  * firstChild
  * lastChild
  * nextSibling
  * previousSibling
* Element - 只找元素
  * parentElement
  * children
  * firstElementChild
  * lastElementChild
  * nextElementSibling
  * previousElementSibling
#### 修改操作
* appendChild
* insertBefore
* removeChild
* replaceChild
#### 高级操作
* compareDocumentPosition - 比较两个节点中关系的函数
* contains - 检查一个节点是否包含另一个节点的函数
* isEqualNode - 检查两个节点是否完全相同
* isSameNode - 检查两个节点是否是同一节点，可用JavaScript`===`代替
* cloneNode - 复制一个节点，如果传入一个参数`true`，则会连同子元素做深拷贝

### 事件API
* addEventListener(type, listener [, options])
  * type: event type 事件类型
  * listener: 事件回调函数
  * options:
    * capture: boolean 捕获模式(true) 冒泡模式(false)，默认为冒泡模式
    * once: boolean 事件是否只响应一次
    * passive: boolean 事件是否产生其他副作用，避免后(false)可提升性能

#### 事件冒泡与捕获
规则：先捕获后冒泡
  * 捕获：通过鼠标点选计算出点选的元素
  * 冒泡：找到点选元素后，再层层向外触发 

### Range API
Range存在一个起始与终结点，是一个连续，不可断的范围。
#### 如果创建一个Range
```javascript
// 第一种方法，new一个Range，并指定开始与结束位置
var range = new Range();
range.setStart(element, 9);// (节点对象，偏移量)
range.setEnd(element, 4);
// 第二种方法，通过API来获取Range
var range = document.getSelection().getRangeAt(0);
```
其他API
* range.setStartBefore() - 设置起点在某个节点之前
* range.setEndBefore() - 设置终点在某个节点之前
* range.setStartAfter() - 设置起点在某个节点之后
* range.setEndAfter() - 设置终点在某个节点之后
* range.selectNode() - 选则某个节点
* range.selectNodeContents() - 选则节点的内容
* range.extractContents() - 将range范围内的内容从DOM树中拆下来到fragment对象
* range.insertNode() - 将节点插入到range中

面试题案例
```html
<div id="x">
  <span>1</span>
  <p>2</p>
  <a href="#">3</a>
  <div>4</div>
</div>

<script >
  let element = document.getElementById('x');
  
  function reverseChildren(element){
      let range = new Range();
      range.selectNodeContents(element);
      
      let fragment = range.extractContents();
      let contentLength = fragment.childNodes.length;
      while(contentLength-- > 0){
          fragment.appendChild(fragment.childNodes[contentLength]);
      }
      
      element.appendChild(fragment);
  }
  
  reverseChildren(element);
</script>
```

### CSSOM API
对CSS文档的抽象模型 - CSSOM - `document.styleSheets`
* document.styleSheets[x].cssRules - 获取第x+1份风格文档中的CSS规则
* document.styleSheets[x].insertRule("css rule in string", y) - 向y位置插入CSS规则(字符串类型)
* document.styleSheets[x].removeRule(y) - 移除y位置的CSS规则
* window.getComputedStyle(elt [, pseudoElt]); - 获取某个元素上计算出来的CSS规则 elt: 元素，pseudoElt：伪元素

### CSSOM View API
浏览器完成CSS计算，元素排版之后，与CSS相关的视图API

* window.innerHeight, window.innerWidth - 浏览器窗口内高度/宽度 - 实际渲染区域
* window.outerWidth, window.outerHeight - 浏览器窗口外高度/宽度 - 整个浏览器窗口
* window.devicePixelRatio - 屏幕物理像素与代码逻辑像素的比例
* window.screen - 屏幕信息
  * window.screen.width
  * window.screen.height
  * window.screen.availWidth
  * window.screen.availHeight
* window.open("url","打开方式","CSS宽高左右")
  * moveTo(x,y) - 移动到x，y
  * moveBy(x,y) - 移动x,y
  * resizeTo(x,y) - 改变宽高到x,y
  * resizeBy(x,y) - 改变宽高x,y

* window.scrollX - 当前滚动位置的高度
* window.scrollY - 当前滚动位置的宽度
* window.scroll(x,y) - 滚动到x,y
* window.scrollBy(x,y) - 滚动x,y
* scrollTop - 当前滚动位置的高度
* scrollLeft - 当前滚动位置的宽度
* scrollWidth - 可滚动内容的宽
* scrollHeight - 可滚动内容的高
* scroll(x,y) - 滚动到x,y
* scrollBy(x,y) - 滚动x,y
* scrollIntoView() - 滚动到可见区域

* getClientRects() - 获取元素所有的盒(包括所有伪元素)
* getBoundingClientRect() - 获取元素被包围着的大盒

### 其他API
API来自各类标准化组织，如
* knronos
  * WebGL
* ECMA
  * ECMAScript
* WHATWG
  * HTML
* W3C
  * webaudio
  * CG/WG
* ...
