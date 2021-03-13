## 学习笔记
## 使用LL算法构建AST | 四则运算
* AST 抽象语法树
    * 编程语言去分词，分词后构成语法树，再解析执行代码
    * AST '抽象语法树'的过程又被叫做'语法分析'，最著名的语法分析算法核心思想有两种`LL(Left Left从左到右扫描)`，`LR`算法
* [BNF范式(巴科斯范式)](https://www.zhihu.com/question/27051306)

```javascript
    //EOF(End of File)
    <Expression>::=
    <AdditiveExpression><EOF>
 
    <AdditiveExpression>::=
    <Number>

    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>

    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

    <Number> 
```