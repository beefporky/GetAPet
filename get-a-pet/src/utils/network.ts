import { json, redirect } from "react-router-dom";
import { defaultURL } from "./constants";

export const getToken = () => {
    return localStorage.getItem('token');
}

export const revokeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('expires_in');

}

type restTypes = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";

export const sendRequest = async (url: string, parameters?: object, method: restTypes = "GET") => {
    try {
        const token = getToken();
        const requestConfig = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if (parameters) {
            requestConfig.body = JSON.stringify(parameters);
        }
        const response = await fetch(`${defaultURL}${url}`, requestConfig);
    
        if (!response.ok) {
            throw json({
                message: "Something went wrong with the request."
            }, {
                status: response.status
            });
        }
    
        const data = await response.json();
    
        return data;
    } catch (error) {
        revokeToken();
        redirect('/');
        throw json({
            message: "Something went wrong with the request."
        },{
            status: error!.status
        })
    }

}