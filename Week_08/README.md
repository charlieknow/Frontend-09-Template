## 学习笔记 | 浏览器工作原理
### 浏览器总论
#### 浏览器工作原理总论
从浏览器中输入一个 url 开始，经过一系列的操作，最后会生成一张图片，被称为 Bitmap，将图片传给显卡驱动程序，这样就得到了最后展示在浏览器上的页面

    1. URL：通过 HTTP 请求，并解析 HTTP 请求的回应，把 URL 中包含的 HTML 取出来
    2. HTML：对 HTML 进行parse(文本分析)，将 HTML 变为 DOM 树
    3. DOM：这时的 DOM 是不包含样式的，接下来通过 CSS computing 得到最终的样式结果，这样就得到了带样式的 DOM 树
    4. DOM with CSS：通过 layout（布局、排版） 操作，将 DOM 树中所有盒子的位置计算出来
    5. DOM with position：接下来就可以渲染了，通过 render 得到一张图，这张图即最终的页面结果，再通过操作系统与硬件程序提供的 API 展示到页面上，
    6. Bitmap
---
### 状态机
#### 有限状态机
* 每一个状态都是一个机器（每个机器是相互解耦的，因此可忽略其它状态机的逻辑）
    * 在每一个机器里，可以做计算、存储、输出...
    * 所有机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果用函数表示，应该是纯函数（无副作用）
* 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore 状态机）
    * 每个机器根据输入决定下一个状态（Mealy 状态机，用途较广）
#### JS中的有限状态机（Mealy）
```js
// 每个函数是一个状态
function state(input) {// 函数参数就是输入
    // 在函数中，可以自由的编写代码，处理每个状态的逻辑
    return next; // 返回值作为下一个状态
}
```
```js
// 调用方式
while(input) {
    // 获取输入
    state = state(input); // 把状态机的返回值作为下一个状态
}

```
---
#### 不使用状态机处理字符串
* 在一个字符串中，找到字符'a'：
```js
function match(string) {
    for(let c of string) {
        if(c === 'a') 
            return true;
    }
    return false;
}

match("I am a groot")
```
* 在一个字符串中，找到字符'ab'：
```js
function match(string) {
    let foundA = false;

    for(let c of string) {
        if(c === 'a')
            foundA = true;
        else if(foundA && c === 'b')
            return true;
        else
            foundA = false;
    }
    return false;
}

console.log(match("I acbm groot"));
```
* 在一个字符串中找到字符 'abcdef'：
```js
function match(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for(let c of string) {
        if(c === 'a') 
            foundA = true;
        else if(foundA && c === 'b') {
            if(!foundB) foundB = true;
            else {
                foundA = false;
                foundB = false;
            }
        }
        else if(foundB && c === 'c') {
            if(!foundC) foundC = true;
            else {
                foundA = false;
                foundB = false;
                foundC = false;
            }
        }
        else if(foundC && c === 'd') {
            if(!foundD) foundD = true;
            else {
                foundA = false;
                foundB = false;
                foundC = false;
                foundD = false;
            }
        }
        else if(foundD && c === 'e') {
            if(!foundE) foundE = true;
            else {
                foundA = false;
                foundB = false;
                foundC = false;
                foundD = false;
                foundE = false;
            }
        }
        else if(foundE && c === 'f')
            return true;
        else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
  return false;
}

console.log('I abcdefgroot');
```
以上都是不使用状态机的方式解决字符串的问题,用常规解法到这里代码已经不太容易阅读

---
#### 使用状态机处理字符串

* 用状态机实现：字符串“abcabx”的解析：

其实每找到一个字符，就可以认为状态发生了一次改变，下次处理的逻辑是独立的。
```js
function match(string) {
    let state = start;
    for(let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if(c === 'a')
        return foundA;
    else
        return start;
}

// trap
function end(c) {
    return end;
}

function foundA(c) {
    if(c === 'b')
        return foundB;
    else
        // reconsume，重新从此位开始判断
        return start(c);
}

function foundB(c) {
    if(c === 'c')
        return foundC;
    else
        return start(c);
}

function foundC(c) {
    if(c === 'd')
        return foundD;
    else
        return start(c);
}

function foundD(c) {
    if(c === 'e')
        return foundE;
    else
        return start(c);
}

function foundE(c) {
    if(c === 'f')
        return end;
    else
        return start(c);
}

console.log(match('I abcdefgroot'));
```
* 在一个字符串中，找到字符'abcdef'
```js
function match(string) {
    let state = start;
    for(let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if(c === 'a')
        return foundA;
    else
        return start;
}

function end(c) {
    return end;
}

function foundA(c) {
    if(c === 'b')
        return foundB;
    else
        return start(c);
}

function foundB(c) {
    if(c === 'c')
        return foundC;
    else
        return start(c);
}

function foundC(c) {
    if(c === 'a')
        return foundABCA;
    else
        return start(c);
}

function foundA2(c) {
    if(c === 'b') 
        return foundABCAB;
    else
        return start(c);
}

function foundB2(c) {
    if(c === 'x') 
        return end;
    else
        return foundB(c);
}


console.log(match('I abcdefgroot'));
```
---
### HTTTP请求
#### HTTTP的协议解析
* TCP 与 IP
    * 流（无明显分割单位，只考虑前后顺序）
    * 端口（应用对应端口）
    * require('net')
    * 包（可大可小）
    * IP 地址
    * libnet/libpcap，node 调用的两个底层库（c++），libnet 负责构造 IP 包并发送，labpcap 负责从网卡抓所有的 IP 包

* Request 的格式
    * Request line —— POST(方法) /(路径) HTTP/1.1(HTTP版本)
    * Headers —— 键值对的组合，长度不固定，结束已一个空行结束
    * body —— 由 Content-Type 决定
* Response 的格式
    * status line —— HTTP/1.1(HTTP版本)200(状态码)OK(状态)
    * Headers —— 键值对的组合，长度不固定，结束已一个空行结束
    * body —— 由 Content-Type 决定(Node 默认返回的格式：trunked body——十六进制数字单独一行+内容+十六进制的0单独一行)
#### HTTTP实现
要想实现一个 HTTP，首先需要实现 Request 功能
* Request：
    * 设计一个 HTTP 请求的类
    * Content-Type 是一个必要的字段，要有默认值
    * body 是 key=value 的格式
    * 不同的 Content-Type 影响 body 的格式
    * 需要正确的 Content-Length
* send()：
    * 设计 send 函数，把请求真实发送到服务器
    * send 函数是异步的，因此返回一个 Promise
    * 设计支持已有的 connection 或者自己新建 connection
    * 收到数据传给 parser
    * 根据 parser 状态 resolve
* ResponseParser
    * Response 必须分段构造，所以我们要用一个 ResponseParser 来“装配”
    * ResponseParser 分段处理 ResponseText，我们用状态机来分析文本的结构
* BodyParser
    * Response 的 body 可能根据 Content-Type 有不同的结构，因此我们会采用子 Parser 的结构专门处理 body
    * 以 TrunkedBodyParser 为例，用状态机处理 body 格式（除了 trunked body 还有很多其它类型）