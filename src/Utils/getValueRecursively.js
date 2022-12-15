export const getValueRecursively =(value, key)=>{
    let subKeys = key.split('.')
    let v = value[subKeys[0]]
    subKeys.shift()
    subKeys = subKeys.join('.')
    return subKeys ? getValueRecursively(v, subKeys) : v
}