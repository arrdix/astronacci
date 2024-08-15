import { z } from 'zod'

interface ValidateReturn {
    validateError: boolean
    dto: any
}

export function validateDto(callback: () => void): ValidateReturn {
    try {
        const parsedData = callback()

        return {
            validateError: false,
            dto: parsedData,
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {
                validateError: true,
                dto: null,
            }
        }

        return {
            validateError: true,
            dto: null,
        }
    }
}
