import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../config/app.conf'

class Hasher {
    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(SALT_ROUND))
    }

    comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash)
    }
}

export default new Hasher()
