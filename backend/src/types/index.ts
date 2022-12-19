export type UserType = {
    permission: number | null,
    username: string,
    email: string,
    password: string,
    phone: number,
    isAdmin: boolean | null  
}

export type LoginType = {
    email: string,
    password: string
}

