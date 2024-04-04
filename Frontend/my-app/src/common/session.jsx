const storeInsession = (key,value) => {
    return sessionStorage.setItem(key,value);
}

const lookInsession = (key,value) => {
    return sessionStorage.getItem(key,value);
}

const removeInsession = (key,value) => {
    return sessionStorage.removeItem(key,value);
}

const logoutInsession = (key,value) => {
    return sessionStorage.clear(key,value);
}

export { storeInsession, lookInsession, removeInsession, logoutInsession };