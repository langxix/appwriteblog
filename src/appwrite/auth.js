// Importing configuration and Appwrite components
import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

// Defining the AuthService class
export class AuthService {
    // Initializing Appwrite client and account objects
    client = new Client();
    account;

    // Constructor for initializing Appwrite client and account with configuration values
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Method for creating a new user account
    async createAccount({email, password, name}) {
        try {
            // Creating a new user account using Appwrite's Account API
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // If account creation is successful, call the login method
                return this.login({email, password});
            } else {
                // If account creation fails, return the error
                return userAccount;
            }
        } catch (error) {
            // Throw any errors that occur during the process
            throw error;
        }
    }

    // Method for user login
    async login({email, password}) {
        try {
            // Creating an email session for user authentication using Appwrite's Account API
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            // Throw any errors that occur during the login process
            throw error;
        }
    }

    // Method for retrieving information about the current user
    async getCurrentUser() {
        try {
            // Getting user information using Appwrite's Account API
            return await this.account.get();
        } catch (error) {
            // Log and handle errors that occur during the process
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        // Return null if there's an issue fetching user information
        return null;
    }

    // Method for user logout
    async logout() {
        try {
            // Deleting user sessions to log the user out using Appwrite's Account API
            await this.account.deleteSessions();
        } catch (error) {
            // Log and handle errors that occur during the logout process
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

// Creating an instance of the AuthService class
const authService = new AuthService();

// Exporting the authService instance
export default authService;
