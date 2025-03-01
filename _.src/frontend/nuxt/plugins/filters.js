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

    // DATE
    const SIZES = {
        default: { day: "2-digit", month: "2-digit", year: "2-digit" },
        date_month_short: { day: "2-digit", month: "short", year: "numeric" },
        date_month_full: { day: "2-digit", month: "long", year: "numeric" },
        sm: { day: "2-digit", month: "2-digit" },
        full: { dateStyle: "medium", timeStyle: "short" },
        date_hr: { weekday: "short", month: "long", day: "2-digit", year: "numeric" },
        day_number_only: { day: "2-digit" },
        date_hr_short: { weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit" }
    };

    inject("date", function (date, size = "default") {
        return date ? new Date(date).toLocaleString('en-EN', SIZES[size]) : "";
    })
}
