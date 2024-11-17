const padArrayStart = (array: any[], filler: any, length: number) => {
    if (length <= array.length) {
        return array
    }
    const fillable = new Array(length - array.length).fill(filler)
    return fillable.concat(array)
}

const padArrayEnd = (array: any[], filler: any, length: number) => {
    if (length <= array.length) {
        return array
    }
    const fillable = new Array(length - array.length).fill(filler)
    return array.concat(fillable)
}

export { padArrayStart, padArrayEnd }
