import { json } from "react-router-dom";
import { defaultURL } from "./constants";
import { getToken } from "./auth";

export type Request = {
    request: {
        url: string;
    }
}

type restTypes = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";

export const sendRequest = async (url: string, parameters?: object, method: restTypes = "GET") => {
    const token = getToken();
    const requestConfig: Record<string, string|object|boolean> = {
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
}