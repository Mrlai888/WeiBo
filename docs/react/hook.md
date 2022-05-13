---
Hook
---
## 自定义HOOK

### 初始化不渲染 useEffect

```js
import React,{useEffect,useRef} from 'react';

// 是否第一次执行
export default function useFirstMount():boolean{
    const isFirstMount = useRef<boolean>(true);

    if(isFirstMount.current){
        isFirstMount.current = false
        return true
    }

    return isFirstMount.current;
}


// 首次渲染的时候不执行，当依赖发生变化的时候才执行函数

export const useUpdateEffect: typeof useEffect = (effect, deps) => {

    const isFirstMount = useFirstMount();

    useEffect(() => {

        if (!isFirstMount) {
            return effect()
        }

    }, [...deps])

}

```