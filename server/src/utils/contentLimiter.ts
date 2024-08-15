export function contentLimiter(type: 'BASIC' | 'SILVER' | 'GOLD') {
    switch (type) {
        case 'BASIC':
            return 3
        case 'SILVER':
            return 10
        case 'GOLD':
            return null
    }
}
