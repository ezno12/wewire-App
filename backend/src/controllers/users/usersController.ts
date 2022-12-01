import { Response, Request } from "express";

import { selectUsers, insertUser, verifyLogin, selectUsersByEmail, deleteUserService } from "@services/users/users";

export async function getUsers(_: Request, response: Response): Promise<any> {
    try {
        const result = await selectUsers();
        return response.json(result.rows);
    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
        console.log(error);
    }
}

export async function UserByEmail(req: Request, response: Response): Promise<any> {
    try {
        const email = req.query.email;
        const result = await selectUsersByEmail(email as string);
        if (result.rows.length > 0) { response.json({ error: false, data: result.rows }) }
        else {
            response.json({ error: true, message: "user does not exist !" })
        }

    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
        console.log(error);
    }
}

export async function addUser(request: Request, response: Response): Promise<any> {
    const objectUser = request.body;

    try {
        await insertUser(objectUser);

        response.status(200).json({
            error: false,
            message: "User insertion with success"
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: true, message: "Error while inserting user in db" });
    }

}

export async function login(request: Request, response: Response): Promise<any> {
    console.log(request, response)

    const objectLogin = request.body;
    try {
        const result = await verifyLogin(objectLogin);

        if (result) {
            return response.status(200).json({
                error: false,
                data: result


            })
        } else {
            return response.status(500).json({ error: true, data: "Error while getting users" })
        };
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: true, message: "Error while inserting user in db" });
    }
}

export async function deleteUser(request: Request, response: Response): Promise<any> {
    try {
        const firstname = request.query.firstname;

        const result = await deleteUserService(firstname as string);

        if (result.length > 1) {
            return response.status(200).json({ error: false, message: "User deleted with success" });
        } else {
            return response.status(500).json({ error: true, message: "Error while deleting user" });
        }
    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
    }
}