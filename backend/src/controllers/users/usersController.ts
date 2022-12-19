import { Response, Request } from "express";
import  jwt from "jsonwebtoken"
import { selectUsers, insertUser, verifyLogin, selectUsersByEmail, deleteUserService, selectUsersByUsername, selectUsersByPhone } from "@services/users/users";

export async function getUsers(_: Request, response: Response): Promise<any> {
    try {
        const result = await selectUsers();
        return response.json(result);
    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
        console.log(error);
    }
}

export async function UserByEmail(req: Request, response: Response): Promise<any> {
    try {
        const email = req.query.email;
        
        const result = await selectUsersByEmail(email as string);
        if (result) { response.json({ error: false, data: result }) }
        else {
            response.json({ error: true, message: "user does not exist !" })
        }

    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
        console.log(error);
    }
}

export async function UserByUsername(req: Request, response: Response): Promise<any> {
    try {
        const username = req.query.username;

        const result = await selectUsersByUsername(username as string);
        if (result) { response.json({ error: false, data: result }) }
        else {
            response.json({ error: true, message: "user does not exist !" })
        }
    }
    catch (error) {
        response.json({ error: true, message: "Error while getting users" })
        console.log(error);
    }
    
}

export async function addUser(request: Request, response: Response): Promise<any> {
    const objectUser = request.body;

    try {

        const oldUserEmail = await selectUsersByEmail(objectUser.email);
        const oldUserUsername = await selectUsersByUsername(objectUser.username);
        const oldUserPhone = await selectUsersByPhone(objectUser.phone)
    
        if (oldUserEmail)
        return response.status(400).json({ 
            error: true,
            message: "User email already exists"
        });
        if (oldUserUsername)
        return response.status(400).json({ 
            error: true,
            message: "Username already exists"
        });
        if (oldUserPhone)
        return response.status(400).json({ 
            error: true,
            message: "User phone already exists"
        });


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

        const oldUser = await selectUsersByEmail(objectLogin.email)
        if (!oldUser)
      return response.status(404).json({
        error: true,
        message: "User doesn't exist"
     });

        const result = await verifyLogin(objectLogin);
        if (result) {
            const token = jwt.sign(
                { id: oldUser._id, isAdmin: oldUser.isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "24h" }
              );
            return response.status(200).json({
                error: false,
                data: [result.isAdmin, result.permission],
                token: token

            })
        } else {
            return response.status(500).json({ error: true, data: "Error while getting users" })
        };
    } catch (error) {
        console.log(error);
        return response.status(400).json({ error: true, message: "Invalid credentials" });
    }
}

export async function deleteUser(request: Request, response: Response): Promise<any> {
    try {
        const username = request.query.username;

        const result = await deleteUserService(username as string);
            console.log(result)
        if (result != 0) {
            return response.status(200).json({ error: false, message: "User deleted with success" });
        } else {
            return response.status(500).json({ error: true, message: "Error while deleting user" });
        }
    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
    }
}