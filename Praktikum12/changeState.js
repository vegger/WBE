function setInList(list, index, value) {
    let newArray = list.map(element => element);
    newArray[index] = value
    return newArray;
}

function setInObj(object, attribute, value) {
    let newObject = Object.assign({}, object);
    newObject[attribute] = value
    return newObject
}
