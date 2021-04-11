//StringToNumber 和 NumberToString 两个函数

function StringToNumber(str){
    let val;
    //负数
    let hasMinus = str.startsWith('-');
    if(hasMinus){
        str = str.slice(1);
    }
    if(str.indexOf('0b') === 0){//二进制
        console.log('二进制转为十进制');
        val =  parseInt(str.slice(2),2)
    }else if(str.indexOf('0o')=== 0){//八进制
        console.log('八进制转为十进制');
        val =  parseInt(str.slice(2),8)
    }else if(str.indexOf('0x') === 0){//十六进制
         console.log('十六进制转为十进制');
        val =  parseInt(str.slice(2),16)
    }else{//十进制
        val =  Number(str)
    }
    return hasMinus ? -val : val;
}

function NumberToString(num,radix){
    let prefix = {
        2:'0b',
        8:'0o',
        16:'0x'
    };
    let val = prefix[radix] + Math.abs(num).toString(base)
    return num>0? val : '-' + val ;
}