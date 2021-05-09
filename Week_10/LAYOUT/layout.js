function layout(element) {
    /* 第一步 预处理 */
    if (!element.computedStyle) {
      return;
    }
    var elementStyle = getStyle(element);
    if (elementStyle.display !== 'flex') {
      return;
    }
    var items = element.children.filter(e => e.type === 'element');
    items.sort(function(a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    // width和height设置为auto或者空字符，将其默认修改为null
    ['width', 'height'].forEach(size => {
      if (elementStyle[size] === 'auto' || elementStyle[size] === '') {
        elementStyle[size] = null;
      }
    })
    // flex-direction 默认设置为row
    if (!elementStyle.flexDirection || elementStyle.flexDirection === 'auto') {
      elementStyle.flexDirection = 'row';
    }
    // align-items默认设置为stretch
    if (!elementStyle.alignItems || elementStyle.alignItems === 'auto') {
      elementStyle.alignItems = 'stretch';
    }
    // justify-content默认设置为flex-start
    if(!elementStyle.justifyContent || elementStyle.justifyContent === 'auto'){
      elementStyle.justifyContent = 'flex-start';
    }
    // flex-wrap默认设置为nowrap
    if(!elementStyle.flexWrap || elementStyle.flexWrap === 'auto'){
      elementStyle.flexWrap = 'nowrap';
    }

    // align-content默认设置为stretch
    if(!elementStyle.alignContent || elementStyle.alignContent === 'auto'){
      elementStyle.alignContent = 'stretch';
    }
  
    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    
    // 横向排列
    if (elementStyle.flexDirection === 'row') {  
      mainSize = 'width';
      mainStart = 'left';
      mainEnd = 'right';
      mainSign = +1;
      mainBase = 0;
  
      crossSize = 'height';
      crossStart = 'top';
      crossEnd = 'bottom';
    }
  
    // 横向反向排列
    if(elementStyle.flexDirection === 'row-reverse'){ 
      mainSize = 'width';
      mainStart = 'right';
      mainEnd = 'left';
      mainSign = -1;
      mainBase = elementStyle.width;
  
      crossSize = 'height';
      crossStart = 'top';
      crossEnd = 'bottom';
    }
  
    // 纵向排列
    if(elementStyle.flexDirection === 'column'){ 
      mainSize = 'height';
      mainStart = 'top';
      mainEnd = 'bottom';
      mainSign = +1;
      mainBase = 0;
  
      crossSize  = 'width';
      crossStart = 'left';
      crossEnd = 'right';
    }
  
    // 纵向反向排列
    if(elementStyle.flexDirection === 'column-reverse'){
      mainSize = 'height';
      mainStart = 'bottom';
      mainEnd = 'top';
      mainSign = -1;
      mainBase = elementStyle.height;
  
      crossSize = 'width';
      crossStart = 'left';
      crossEnd = 'right';
    }
  
    if(elementStyle.flexWrap === 'wrap-reverse'){
      var tmp = crossStart;
      crossStart = crossEnd;
      crossEnd = tmp;
      crossSign = -1;
    } else {
      crossBase = 0;
      crossSign = 1;
    }

    var isAutoMainSize = false;

    if (!elementStyle[mainSize]) {
      elementStyle[mainSize] = 0;
      for (var i = 0; i < items.length; i++) {
        var itemStyle = getStyle(items[i]);
        if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
          elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
        }
      }
      isAutoMainSize = true;
    }
  
    var flexLine = [];
    var flexLines = [flexLine];
  
    var mainSpace = elementStyle[mainSize];
    var crossSpace = 0;
    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      itemStyle = getStyle(item);
  
      if(itemStyle[mainSize] === void 0) {
        itemStyle[mainSize] = 0;
      }
  
      if (itemStyle.flex) {
        flexLine.push(item);
      } else if (style.flexWrap === 'nowrap') {
        mainSpace -= itemStyle[mainSize];
        if (itemStyle[crossSize] !== void 0) {
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        flexLine.push(item);
      } else {
        if(itemStyle[mainSize] > style[mainSize]){
          itemStyle[mainSize] = style[mainSize];
        }
  
        if (mainSpace < itemStyle[mainSize]) {
          flexLine.mainSpace = mainSpace;
          flexLine.crossSpace = crossSpace;
          flexLine = [item];
          flexLines.push(flexLine);
          mainSpace = elementStyle[mainSize];
          crossSpace = 0;
        } else {
          flexLine.push(item);
        }
  
        if (itemStyle[crossSize] !== (void 0)) {
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        mainSpace -= itemStyle[mainSize];
      }
    }
  
    /*第三步 计算主轴 */
    flexLine.mainSpace = mainSpace;
    if (elementStyle.flexWrap === 'nowrap') {
      flexLine.crossSpace = elementStyle[crossSize] !== undefined ? elementStyle[crossSize] : crossSpace
    } else {
      flexLine.crossSpace = crossSpace; 
    }
  
    if (mainSpace < 0) {

      var scale = elementStyle[mainSize] / (elementStyle[mainSize] - mainSpace);
  
      var currentMain = mainBase; 
  
      for(var i = 0; i < items.length; i++){
  
        var item = items[i];
        var itemStyle = getStyle(item); 
  
        if(itemStyle.flex) { 
          itemStyle[mainSize] = 0; 
        }
  
        itemStyle[mainSize] = itemStyle[mainSize] * scale;
  
        itemStyle[mainStart] = currentMain; 

        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]; 
  
        currentMain = itemStyle[mainEnd];
      }
    } else {
      flexLines.forEach(function(items){
        var mainSpace = items.mainSpace;
        var flexTotal = 0;
        for(var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle(item);
          if (itemStyle && itemStyle.flex !== void 0) {
            flexTotal += itemStyle.flex;
            continue;
          }
        }
  
        if (flexTotal > 0) {
          // 有设置了flex的元素，当前行一定会占满，用不到justify-content属性了
          var currentMain = mainBase;
          for(var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
  
            if (itemStyle.flex) {
              itemStyle[mainSize] = mainSpace * itemStyle.flex / flexTotal;
            }
            itemStyle[mainSize] = currentMain; 
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]; 
            currentMain = itemStyle[mainEnd];
          }
        } else {
          if(elementStyle.justifyContent === 'flex-start'){
            var currentMain = mainBase;
            var step = 0;
          }
  
          if (elementStyle.justifyContent === 'flex-end') {
            var currentMain = mainSpace * mainSign + mainBase;
            var step = 0;
          }
  
          if(elementStyle.justifyContent === 'center'){
            var currentMain = mainSpace / 2 * mainSign + mainBase;
            var step = 0;
          }
  
          if(elementStyle.justifyContent === 'space-between'){
            var step = mainSpace / (items.length - 1) * mainSign;
            var currentMain = mainBase;
          }
  
          if(elementStyle.justifyContent === 'space-around'){
            var step = mainSpace / items.length * mainSign; 
            var currentMain = mainSign * step / 2 + mainBase; 
          }
  
          for(var i = 0;i <items.length; i++){
            var item = items[i];
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd] + mainSign * step; 
          }
        }
      })
    }
    
    /*第四步 交叉轴的计算 */
    var crossSpace;
    if(!elementStyle[crossSize]){ 
      crossSpace = 0;
      elementStyle[crossSize] = 0;
      for(var i = 0; i < flexLines.length; i++){
        elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
      }
    }else{
      crossSpace = elementStyle[crossSize]; 
  
      for(var i = 0; i < flexLines.length;i++){
          crossSpace -= flexLines[i].crossSpace; / /交叉轴的剩余空间减去每一行占用的空间
      }
    }
  
    if(elementStyle.flexWrap === 'wrap-reverse'){
      crossBase = elementStyle[crossSize];
    } else {
      crossBase = 0;
    }
  
    var step;

    if(elementStyle.alignContent === 'flex-start'){
      crossBase += 0;
      step = 0;
    }
    if(elementStyle.alignContent === 'flex-end'){ 
      crossBase += crossSign * crossSpace; 
      step = 0;
    }
    if(elementStyle.alignContent === 'center'){
      crossBase += crossSign * crossSpace / 2; 
      step = 0;
    }
    if(elementStyle.alignContent === 'space-between'){
      crossSpace += 0;
      step = crossSpace / (flexLines.length - 1);
    }
    if(elementStyle.alignContent === 'space-around'){
      step = crossSpace / flexLines.length;
      crossBase += crossSign * step / 2;  
    }
  
    if(elementStyle.alignContent === 'stretch'){
      crossBase += 0;
      step =0;
    }
  
    flexLines.forEach((items) => {
      var lineCrossSize = elementStyle.alignContent === 'stretch' ? 
      items.crossSpace + crossSpace / flexLines.length : 
      items.crossSpace;

      for(var i = 0; i < items.length; i++){
        var item = items[i];
        var itemStyle = getStyle(item);

        var align = itemStyle.alignSelf || elementStyle.alignItems;
        
        if(align === 'flex-start'){
            itemStyle[crossStart] = crossBase;
            itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
        }
  
        if(align === 'flex-end'){
            itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
            itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
        }
  
        if(align === 'center'){
            itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
            itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
        }
  
        if(align === 'stretch'){
            itemStyle[crossStart] = crossBase;
            if(itemStyle[crossSize] === void 0){
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossSize] = lineCrossSize;
            }else{
                itemStyle[crossEnd] = crossBase + crossSign * itemStyle[crossSize];
            }
        }
  
      }
      crossBase += crossSign * (lineCrossSize + step);
    });
  
  }
  
  function getStyle(element) {
    if (!element.style) {
      element.style = {};
    }
  
    for (let prop in element.computedStyle) {
      let propVal = element.style[prop] = element.computedStyle[prop].value;
  
      if(propVal.toString().match(/px$/)) {
        element.style[prop] = parseInt(propVal);
      }
  
      if(propVal.toString().match(/^[0-9\.]+$/)) {
        element.style[prop] = parseInt(propVal);
      }
    }
  
    return element.style;
  }
  
  module.exports = layout;