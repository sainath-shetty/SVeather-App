import { useEffect, useState } from "react";
import { json } from "stream/consumers";

export function useLocalStorage<T>(key:String,initialValue:T){
const [storedValue,setStoredValue]=useState<T>(()=>{

    try{
       const item=window.localStorage.getItem(key);
       return item? JSON.parse(item):initialValue;
    }
    catch(error){
           console.error(error);
           return initialValue;
    }
});
useEffect(()=>{
try{
window.localStorage.setItem(key,JSON.stringify(storedValue))
}catch(error){
    console.error(error)
}
},[key,storedValue]);
return [storedValue,setStoredValue] as const;
}