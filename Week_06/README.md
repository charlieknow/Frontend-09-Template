## 学习笔记 | 重学JavaScript
### JS语言通识
1. 泛用语言分类方法
    * 非形式语言：中文,英文等，语法格式没有严格限制
    * 形式语言(乔姆斯基谱系)
        * 0型文法（无限制文法或短语结构文法）包括所有的文法，定义了是什么样的语言
        * 1型文法（上下文相关文法）跟上文，下文，内容相关
        * 2型文法（上下文无关文法）生成上下文无关语言，同样的表达无论在哪都是同一个意思
        * 3型文法（正规文法）生成正则语言，可以被所有的正则表达式直接描述
2. 什么是产生式(`BNF`)
    * 产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
    * [BNF范式(巴科斯范式)](https://www.zhihu.com/question/27051306)
    是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言
    * 终结符： 最终在代码中出现的字符
3. 深入理解产生式
    * 通过产生式理解`乔姆斯基谱系`
        * 0型文法（无限制文法) `?::=?`
        * 1型文法（上下文相关文法）`?<A>?::=?<B>?`
        * 2型文法（上下文无关文法） `<A> ::=?`
        * 3型文法（正规文法） `<A>::=<A>?`
4. 现代语言分类
    * `声明式`：
    lisp，JSON，css，RegExp，SQL等
    * `命令式`：
    c，c++，Java，C#，JavaScript，python，c#等
    * `数据描述语言`：
    SGML，HTML，XML等
    * `编程语言`
5. 编程语言的性质    
    * 图灵完备性
        * 命令式----图灵机
            * goto
            * if和while
        * 声明式----lambda
            * 递归  
    * 动态与静态
        * 动态
            * 在用户的设备/在线服务器上
            * 产品实际运行时
            * Runtime
        * 静态
            * 在程序员的设备上
            * 产品开发时
            * Compiletime
    * 类型系统
        * 动态类型系统与静态类型系统
        * 强类型(无隐式转换):Go,Swift等  弱类型(有隐式转换)：JavaScript，java，Objective-C等
            * String + Number
            * String == Boolean
        * 复合类型
            * 结构体
            * 函数签名
    * 子类型
    * 泛型
        * 逆变：凡是能用Function的地方，都能用Function
        * 协变：凡是能用Array的地方，都能用Array

### JS类型
1. Numble
2. String
3. Boolean
4. Null
5. Undefined
6. Object
7. Symbol

* Object
    * state
    * identifier
    * behavior
    