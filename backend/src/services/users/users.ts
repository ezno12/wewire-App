
import { cryptPassword } from "@helpers/cyptPassword";

import pool from "../../database";

import { UserType, LoginType } from "../../types";
import bcrypt from 'bcrypt';

export async function selectUsers() {
    try {
        const sql = `SELECT id, firstname, lastname, email, password FROM public.users `
        const result = await pool.query(sql)
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function selectUsersByEmail(email: string) {
    try {
        const sql = `SELECT id, firstname, lastname, email, password FROM public.users where email ='${email}'`
        const result = await pool.query(sql)
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUserService(firstname: string) {
    try {
        const sql = `DELETE FROM public.users where firstname='${firstname}'`
        const result = await pool.query(sql)

        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function insertUser(objectUser: UserType) {
    try {
        console.log(cryptPassword(objectUser.password));
        const sql = `
            INSERT INTO public.users (firstname, lastname, email, password) 
            VALUES (
                '${objectUser.firstname}',
                '${objectUser.lastname}',
                '${objectUser.email}',
                '${cryptPassword(objectUser.password)}'
            )
        `

        return await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

export async function verifyLogin(objectLogin: LoginType) {
    try {

        const sql = `
            SELECT * from public.users 
            WHERE                
                email='${objectLogin.email}' `
        const result = await pool.query(sql)
        const verify = await bcrypt.compare(objectLogin.password, result.rows[0].password);
        if (verify) {
            return (result.rows[0])
        }
        else {
            return ""
        }


    } catch (error) {
        console.log(error)
    }
}
