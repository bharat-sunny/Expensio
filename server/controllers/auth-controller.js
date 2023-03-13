
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userService from "../services/user-service.js";

dotenv.config();

// const accessToken = process.env.ACCESS_TOKEN_SECRET;

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.send(obj);
}

const setErrorResponse = (error,response) => {
    response.status(500);
    response.send(error);
}



export const createNewUser = async(request, response) => {
    try {
        const userInfo = {
            username: request.body.username,
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password.toString(), 10)
        };
        const data = await userService.createNewUser(userInfo);
        setSuccessResponse(data, response);

    } catch (error) {
        console.error("auth-controller : createNewUser :: Failed to create new user ", error);
        setErrorResponse(error, response);
    }
}

export const userLogin = async(request, response) => {
    try{
        const data = await userService.login(request.body.email, request.body.password);
        setSuccessResponse(data, response);
    }catch(error) {
        console.error("auth-controller : loginUser :: Failed to login user ", error);
        setErrorResponse(error, response);
    }
}

