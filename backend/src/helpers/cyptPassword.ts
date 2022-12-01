import bcrypt from 'bcrypt';

export function cryptPassword(password: string) {
    const saltRounds = 10;

    return bcrypt.hashSync(password, saltRounds);
}


