export const formatAmount = (total) => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(total);
}