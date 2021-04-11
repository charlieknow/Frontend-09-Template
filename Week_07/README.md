## 学习笔记 | 重学JavaScript(二)
### JS表达式

#### Grammar
* Tree vs Priority
    * `+ -`
    * `* /`
    * `()`
---
#### 表达式（Expression）
##### 运算符和表达式
Member运算符的优先级最高，它的代表是用于访问对象中的某个属性的点运算符(也包括其他同级的运算，比如new Foo())，它比New表达式的优先级更高  

* Member 成员访问
    * a.b
    * a[b]
    * foo \`string\` :调用函数foo并将模板字符串中的string根据${}分割成数组,并当做参数传递(这个和Member运算 优先级是同一级)
    * super.b
    * super['b']
    * new.target :这个和Member运算 优先级是同一级
    * new Foo() :带括号的new优先级高于不带括号的,和Member运算 优先级是同一级
* new (优先级低于Member)Member
    * new Foo
    ```JS
    new a()(); // 由于new a()优先级高于new a，所以第一个括号是new运算的一部分，而不是函数执行
    new new a();//这里的括号跟着第二个new，先执行 new a()
    ```
* Reference 引用
    * Object ：对象
    * Key ：可以是string或者symbol
* Call（优先级低于Member和New） 当member运算出现在Call运算后面时，member运算的优先级被降低了
    * foo()
    * super()
    * foo()['b']
    * foo().b
    * foo()\`abc\`
    ```js
    a()['b'];//Member优先级被降低，a()先执行，Member后执行
    ```
* Left Handside & Right Handside
    * Update Expression
        * a ++
        * a --
        * ++ a
        * --a
    ```js
    ++ a ++
    ++ (a ++)
    ```
以上两个表达式，a会优先和后面的自增结合，但是都是不合法，语法上是不合法的，运行时，不论谁先都是不合法的

* Unary
    * delete a.b
    * void foo() :把后面的值都变为undefined
    * typeof a
    * + a :对于数字不会造成任何影响，但是对于其他类型，会产生类型转换，强制转为数字
    * - a
    * ~ a :位运算，把整数按位取反，不是整数，会强制转为整数
    * ! a :非运算是一个针对布尔型的运算，可以使用两个! (!!)将任意类型转为布尔类型
    * await a
* Exponental (指数运算符)
    *  \*\* JavaScript唯一一个右结合的运算 Example
    ```js
    3 ** 2 ** 3//先运算2**3得到结果a，在运算3 ** a
    //相当于:
    3 ** (2 ** 3) 
    ```
* Multiplicative（乘法）
    * `\*` , `/` , `%`
* Additive（加法）
    * `+` , `-`
* Shift（移位运算）
    * `<<` , `>>` , `>>>` 
* Relationship（关系运算）
    * `<` , `>` , `<=` , `>=` , `instanceof` , `in` :< , > , <= , >= 需要两边是数字
* Equality（等号运算）
    * `==`
    * `!=`
    * `===`
    * `!==`
* Bitwise （位运算）
    * `&` , `^` , `|` 优先级低于等号运算
* Logical（逻辑运算）
    * `&&`
    * `||` ：可以用于替代if else
* Conditional(条件运算)
    * `?:` 可用于代替if else

##### 类型转换（Type Convertion）
* a + b
* "false" == false
* a[o] = 1;

|           | Number              | String                | Boolean  | Undifined | Null | Object | Symbol |
| --------- | ------------------- | --------------------- | -------- | --------- | ---- | ------ | ------ |
| Number    | -                   |                       | 0 false  | x         | x    | Boxing | x      |
| String    |                     | -                     | "" false | x         | x    | Boxing | x      |
| Boolean   | true 1<br />false 0 | 'true'<br />'false'   | -        | x         | x    | Boxing | x      |
| Undifined | NaN                 | 'Undefined'           | false    | -         | x    | x      | x      |
| Null      | 0                   | 'null'                | false    | x         | -    | x      | x      |
| Object    | valueOf             | valueOf<br />toString | true     | x         | x    | -      | x      |
| Symbol    | x                   | x                     | x        | x         | x    | Boxing | -      |

* Unboxing(拆箱转换)
    * ToPremitive
    * toString vs valueOf
    * Symbol.toPrimitive

优先调用Symbol.toPrimitive，toString和valueOf视情况优先调用：
```js
var x = {}
var o = {
    toString(){return "2"},
    valueOf(){return 1},
    //[Symbol.toPrimitive](){return 3}
};
x[o]  = 1;//对象作为属性名时，优先调用toString，结果是x增加属性“2”

console.log("x"+o);//加法运算，优先调用valueOf,结果是x1
```
* boxing(装箱转换)

类型|对象|值
--|:--:|---:
Number|new Number(1)|1
String|new String('a')|'a'
Boolean|new Boolean(true)|true
Symbol|new Object(Symbol('a'))|Symbol('a')

Symbol不能使用new，只能通过Object对Symbol值进行包装

---
#### JS语句（Expression）
##### 运行时相关概念
* Statement（语言）
    * 语句（Grammar）
        * 简单语句
        * 复合语句
        * 声明
* Runtime（运行时）
    + Completion Record 完成记录
    1. `[[type]]` : normal,break,continue,return,throw
    2. `[[value]]` : 基本类型
    3. `[[target]]` : label
    + Lexical Environment 词汇环境
##### 简单语句和复合语句
* 简单语句
    * ExpressionStatement 表达式加上一个分号（核心）
    * EmptyStatement 只有一个分号
    * DebuggerStatement 调试语句
    * ThrowStatement 抛出异常
    * ContinueStatement 结束当次循环
    * BreakStatement 结束整个循环
    * ReturnStatement 结束函数，并返回值
* 复合语句
    * BlockStatement最重要的语句
    ```js
    {
        //...
        //...
    }
    ```
    返回值：
* [[type]]:normal
* [[value]]:--
* [[target]]:--
    * IfStatment 条件语句
    * SwitchStatement 多分支语句
    * IterationStatement 循环语句（一类）
        * while(条件)语句
        * do语句while(条件)
        * for(表达式;表达式;条件表达式;) 语句
        * for(表达式 in 表达式) 语句
        * for(表达式 of 表达式) 语句
        * for await (of)
    * WithStatement
        * with打开一个对象，把所有对象的属性放到一个作用域中，这些属性在作用域中可以直接使用
    * LabelledStatement
        * 给语句起名字（比如给IterationStatement命名，可以使用break通过名字来终止语句）
    * TryStatement
        * (try...catch...finally)

可以结合labelledStatement，结束/跳过命名的循环，节省不必要的循环
```js
try{

}catch(err){

}finally{

}
```
返回值：
* [[type]]:return
* [[value]]:--
* [[target]]:label
##### 声明
* FunctionDeclaration 普通函数声明
* GeneratorDeclaration 产生器声明（function*）
* AsyncFunctionDeclaration 异步函数声明（async function）
* AsyncGeneratorDeclaration 异步产生器声明
* VariableStatement var声明（JS标准将其划分为语句）
* ClassDeclaration 类声明（新）
* LexicalDeclaration 作用域声明（新），let const

* 作用范围为function或者body（历史包袱）
    * function
    * function*
    * async function
    * async function*
    * var 声明和赋值不是一起的
* 声明前使用就会报错
    * class
    * const
    * let
* 预处理机制 var的预处理机制： 将变量声明到作用域（函数/body）的顶部
```js
var a = 2;
    void function(){
        a =1;
        return;
        var a;

    }();
console.log(a)

var a = 2;
    void function(){
        a =1;
        return;
        const a;
    }();
console.log(a)
```
* 作用域 var的作用域是函数或者body(全局上下文）
```javascript
var a = 2;
void function () {
    a = 1;
    {
        var a;
    }
}();

console.log(a);
var a = 2;
void function () {
    a = 1;
    {
        const a;
    }
}();
console.log(a);
```

---
#### JS结构化
* 宏任务
* 微任务（Promise）
* 函数调用（Execution Context）
* 语句/声明（Completion Record）
* 直接量/变量/this ...

##### 宏任务和微任务
* 微任务：js引擎遇到一个Promise，会将整个代码分成两个任务执行，同步任务先执行，then中的回调函数，会在下个任务执行(这个任务需要等待Promise resolve)

* 宏任务：将拆分后的任务依次执行的过程

* 事件循环
    * wait
    * execute
    * getcode
##### JS函数调用
