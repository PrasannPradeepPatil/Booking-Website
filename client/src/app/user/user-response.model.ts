export class UserResponse{

    loginStatus: string;
    userId: string;
    error: string;
    token: string;
    
    constructor(loginStatus: string, userId: string, error: string, token: string)
    {
        this.loginStatus = loginStatus;
        this.userId = userId;
        this.error = error;
        this.token = token;
    }
}