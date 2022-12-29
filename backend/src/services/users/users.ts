
import { cryptPassword } from "@helpers/cyptPassword";
import { UserType, LoginType } from "../../types";
import bcrypt from 'bcrypt';
import { User } from '../../../models'

// Get All Users
export async function selectUsers() {
    try {
        
        let result = await User.findAll()
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Get ONE USER by Email or Username or Phone
export async function selectUsersByEmail(email: string) {
    try {
        const result = await User.findOne({ where: { email: email }})
        return result;
    } catch (error) {
        console.log(error);
    }
}
// Get ONE USER by Username
export async function selectUsersByUsername(username: string) {
    try {
        const result = await User.findOne({ where: { username: username }})
        return result;
    } catch (error) {
        console.log(error);
    }
}
// Get ONE USER by Phone
export async function selectUsersByPhone(phone: string) {
    try {
        const result = await User.findOne({ where: { phone: phone }})
        return result;
    } catch (error) {
        console.log(error);
    }
}
// Delete User
export async function deleteUserService(username: string) {
    try {
        
        const result = await User.destroy({
            where: {
                username: username
            }
        })

        return result;
    } catch (error) {
        console.log(error);
    }
}
// Insert new user to DB
export async function insertUser(objectUser: UserType) {
    try {
        
        objectUser.password = cryptPassword(objectUser.password + 'gs3dFz4hczcywezvY7C9');
        return await User.create(objectUser)
    } catch (error) {
        console.log(error)
    }
}
// Check for user login
export async function verifyLogin(objectLogin: LoginType) {
    try {
        
        const result = await User.findOne({
            where: {email: objectLogin.email}
        })
        
        const verify = await bcrypt.compare(objectLogin.password + 'gs3dFz4hczcywezvY7C9', result.password);
        if (verify) {
            return (result)
        }
        else {
            return ""
        }


    } catch (error) {
        console.log(error)
    }
}
export async function UpdateUserData(UserObject) {
    console.log("user obj in service: ", UserObject)
    try {
        let userToUpdate = await User.findOne({
            where: {
                id: UserObject.id
            }})
            console.log("usr to update: ", userToUpdate)
        const uptedUser = await userToUpdate.set({
                username: UserObject.username,
                email: UserObject.email,
                phone: UserObject.phone
        })
        console.log("usr to uptedUser: ", uptedUser)
        const res = await uptedUser.save()
        
        if(res) {
            console.log("user obj in service after update: ", res)
            return res
        } else {
            return "Fail to update User"
        }
    } catch(err) {
        console.log(err)
    }
    
}
