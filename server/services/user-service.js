
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const createNewUser = async(userInfo) => {
    return new Promise(async(resolve, reject) => {
        try {
            await User.find({ email: userInfo.email })
            .then(async(user) => {
                console.log("user data : ", user);
                if(user.length > 0) {
                    // if user already exists
                    resolve({success:false, message: "User already exists"});
                } else {
                    // create new user
                    const user = new User(userInfo);
                    await user.save()
                        .then(saveResponse => {
                            console.log("User created successfuly : ", saveResponse);
                            resolve({success: true, "message": "User created"});
                    })
                    .catch(error => {
                        console.error("user-service: createNewUser :: ", error);
                        resolve({success: false, message : "Failed to create user", data : error});
                    })
                }
            })
            .catch(error => {
                console.error("user-service:: createNewUser :: Failed to find user ", error);
                resolve({success: false, message: "Failed to find user"});
            })

        } catch(error) {
            resolve({success: false, message: "Failed to find user"});
        }
    }) 
}

export const login = async(email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            await User.find({email: email})
            .then(async(user) => {
                if(user.length > 0) {
                    let responseObj = {
                        success : false,
                        message : "Invalid user"
                    };
                    const hashedPwd = user[0].password;
                    const isValid = await bcrypt.compareSync(password.toString(),hashedPwd);
                    if(isValid) {
                        responseObj.accessToken = jwt.sign({
                            userId : user[0]._id,
                            email : user[0].email,
                            password: user[0].password
                        }, accessTokenSecret);
                        responseObj.success = true;
                        responseObj.message = "Valid user";
                    } else {
                        responseObj.message = "Invalid user";
                    }
                    resolve(responseObj);
                } else {
                    resolve({success: false, message: "User not found"});
                }
            })
            .catch(error => {
                console.log("user-service: login :: user find error ", error);
                reject({success: false, message: "User find error"});
            })
        }catch(error) {
            console.log("user-service : login :: error ", error);
            throw new Error("User login failed : ", error);
        }
    })
}