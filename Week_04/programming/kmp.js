function kmp(source, pattern){
   
    let table = new Array(pattern.length).fill(0);
    //计算table
    {
        // 从1开始判断重复部分,j 表示已重复的字数
        let i = 1, j = 0;

        while(i <pattern.length) {
            if(pattern[i] === pattern[j]) {
                ++j , ++i;
                table[i] = j;
            } else {
                if(j > 0)
                    j = table[j];
                else
                    ++i;      
            }
        }
    }

    {
        let i = 0, j = 0;
        while(i < source.length) {    
            if(pattern[j] === source[i]) {
                ++i , ++j;
            } else {
                if(j > 0)
                    j = table[j];
                else
                    ++i;     
            }
            if(j === pattern.length)
            return true;

        }
        return false;
    }
}

console.log(kmp("abcdabce","abce"));