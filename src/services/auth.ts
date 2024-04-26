import { CLIENT_ID, CLIENT_SECRET } from "../utils/constants"
import { sendRequest } from "../utils/network";

export type TokenType = {
    token_type: string;
    expires_in: number;
    access_token: string;
}

export async function authenticate():Promise<TokenType> {
    const existingToken = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('expiration')
    const expiresIn = localStorage.getItem('expires_in');
    const newDate = new Date();
    if (existingToken && tokenExpiration && new Date(tokenExpiration) > newDate) { 
        return Promise.resolve({
            token_type: 'Bearer',
            expires_in: parseInt(expiresIn!),
            access_token: existingToken
        } as TokenType);
    }

    const parameters = {
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };
    const data = await sendRequest('/oauth2/token', parameters, 'POST');
    return data;
}