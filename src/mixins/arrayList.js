export function createItem (list, item) {
    list.push(item)
}

export function updateItem (list, index, item) {
    list.splice(index, 1, item)
}

export function removeItem (list, item) {
    list.splice(list.indexOf(item), 1)
}

export function removeItemByIndex (list, index) {
    list.splice(index, 1)
}
