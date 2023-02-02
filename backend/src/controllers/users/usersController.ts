import { Response, Request } from "express";
import  jwt from "jsonwebtoken"
import { selectUsers, insertUser, verifyLogin, selectUsersByEmail, deleteUserService,
    selectUsersByUsername, selectUsersByPhone, selectUsersById,UpdateUserData } from "@services/users/users";


export async function getUsers(_: Request, response: Response): Promise<any> {
    try {
        const result = await selectUsers();
        return response.json(result);
    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
        console.log(error);
    }
}

export async function UserById(req: Request, response: Response): Promise<any> {
    try {
        const id = Number(req.query.id);        
        const result = await selectUsersById(id as number);
        if (result) { response.json(
            {
              error: false,
              data: {
                id: result.id,
                username: result.username,
                email: result.email,
                phone: result.phone
            }
            }) }
        else {
            response.json({ error: true, message: "user does not exist !" })
        }

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
    
        if (oldUserEmail || oldUserUsername || oldUserPhone){
            if (oldUserEmail && oldUserUsername && oldUserPhone) {
                return response.status(200).json({err: true, message: "Username, Email, and Phone already exsits"});
            } else if (oldUserEmail && oldUserUsername) {
                return response.status(200).json({err: true, message: "Username and Email already exsits"});
            } else if ( oldUserEmail && oldUserPhone ) {
                return response.status(200).json({err: true, message: "Email and Phone already exsits"});
            }else if ( oldUserUsername && oldUserPhone ) {
                return response.status(200).json({err: true, message: "Username and Phone already exsits"});
            } else {
                if (oldUserEmail) {return response.status(200).json({ 
                    err: true,
                    message: "Email already exists"
                })}
                
                if (oldUserUsername) {return response.status(200).json({
                    err: true,
                    message: "Username already exists"
                });}
                if (oldUserPhone) {return response.status(200).json({ 
                    err: true,
                    message: "Phone already exists"
                })
                }
            }
        }

        const res = await insertUser(objectUser);
        console.log("res: ", res)
        if (res.id) {
            response.status(200).json({
                err: false,
                message: "User insertion with success"
            });
        } else {
            response.status(200).json({
                err: true
            })
        }
    } catch (error) {
        
        return response.status(500).json({ error: true, message: "Error while inserting user" });
    }

}

export async function login(request: Request, response: Response): Promise<any> {

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
                {  
                    id: oldUser.id,
                    isAdmin: oldUser.isAdmin,
                    permission: oldUser.permission,
                 },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "24h" }
              );
            return response.status(200).json({
                error: false,
                token: token,
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
        //return: 1 user deleted, 0 user not deleted
        if (result != 0) {
            return response.status(200).json({ error: false, message: "User deleted with success" });
        } else {
            return response.status(500).json({ error: true, message: "Error while deleting user" });
        }
    } catch (error) {
        response.json({ error: true, message: "Error while getting users" })
    }
}

export async function updateUser(request: Request, response: Response): Promise<any> {
        
        const UserObject = request.body
        const result = await UpdateUserData(UserObject)
    return response.status(200).json(result)
}