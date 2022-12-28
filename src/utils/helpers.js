export const formatPrice = (number) => {
    return new Intl.NumberFormat("en-NG", {
        style: 'currency',
        currency: "NGN"
    }).format(number)
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if(type === 'sizes') {
        unique = unique.flat()
    }
    if(type === 'category') {
        unique = [ ...new Set(unique.map(item => item.name))]
    }
    return ['all', ...new Set(unique)]
}
