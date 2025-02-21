export default function (_, inject) {
    const styles = {
        default: new Intl.NumberFormat("ms-MY", {
            style: "currency", currency: "MYR", maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format,
        usdCompact: new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD", notation: 'compact'
        }).format
    }

    inject("currency", (value, style = 'default') => styles[style](value))
}