import Store from 'store';

export function setMemory (KEY_NAME,user){
    Store.set(KEY_NAME,user)
}
export function getMemory(KEY_NAME){
    return Store.get(KEY_NAME)
}
export function removeMemory(KEY_NAME){
    Store.remove(KEY_NAME)
}
