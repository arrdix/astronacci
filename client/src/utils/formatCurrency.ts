const formatCurrency = (price: number) => {
    return price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
}

export default formatCurrency
