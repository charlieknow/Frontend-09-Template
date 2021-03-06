##学习笔记
##MAP1 实现一个地图编辑器
```javascript
  let map = localStorage["map"] ? JSON.parse(localStorage["map"]) : Array(10000).fill(0);
```
* 一万格地图： `Array(10000).fill(0)`初始化一个长度一万的数组
##MAP2 广度优先搜索
* 用shift和push作为队列的入队和出队两个方法
##MAP3 通过异步编程可视化寻路
* async/await 来异步处理
##MAP4 处理路径问题
* table复制地图，把走过的点的坐标在table中保存下来
* 逆向寻找一条最短路径
##MAP5 启发式搜索寻路
* 广度优先搜索并不是最优解,用一个函数去判断
* 用Sorted的数据结构解决
##MAP6 启发式搜索寻路
* 优化 用Sorted数据结构实现寻路
* 控制台输入findPath(map, [0,0], [50,50]); 查看结果