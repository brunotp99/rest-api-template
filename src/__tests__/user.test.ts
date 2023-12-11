// first always describe what to test

//user
    //user registration
        //the username and password get validation
        //verifiy that the passwords match
        //verifiy that the handler handles any error
        
    //creating a user session
        //a user can login with a valid email and password

import supertest from "supertest";
import * as UserService from "../service/user.service" 
import * as SessionService from "../service/session.service" 
import { sessionPayload, userInput, userPayload } from "./testData";
import createServer from "../utils/server";
import { createUserSessionHandler } from "../controller/session.controller";

const app = createServer();

describe("user", () => {

    describe("user registation", () => {
        describe("given the user name and password are valid", () => {
            it("should return the user payload", async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                    //@ts-ignore
                    .mockReturnValueOnce(userPayload);
                    
                const {statusCode, body} = await supertest(app)
                    .post("/api/users")
                    .send(userInput)
                    
                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
            })
        });
        
        describe("given the passwordsto not match", () => {
            it("should return a 400", async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                //@ts-ignore
                .mockReturnValueOnce(userPayload);
                
                const { statusCode } = await supertest(app)
                    .post("/api/users")
                    .send({...userInput, passwordConfirmation: "doesnotmatch"})
                    
                expect(statusCode).toBe(400);
               
                expect(createUserServiceMock).not.toHaveBeenCalled();
            })
        });
        
        describe("given the user service throws", () => {
            it("should return a 409 error for conflit", async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                .mockRejectedValue('User with this email already exists'); //mocks a rejection error
                
                const { statusCode } = await supertest(app)
                    .post("/api/users")
                    .send(userInput)
                    
                expect(statusCode).toBe(409);
               
                expect(createUserServiceMock).toHaveBeenCalled();  
            })
        });
    });
    
    describe("create user session", () => {
        describe("given the username and password are valid", () => {
            it("should return a signed accessToken & refreshToken", async () => {
                
                //if we check the route handler for posting /api/session,
                //we see that to get the accessToken and refreshToken, we need first
                //to validatePassword and create a session so we need to mock that!
                
                jest.spyOn(UserService, 'validatePassword')
                //@ts-ignore
                    .mockReturnValue(userPayload)
                    
                jest.spyOn(SessionService, "createSession")
                //@ts-ignore
                    .mockReturnValue(sessionPayload)
                    
                const req = {
                    get: () => {
                        return 'a user agent'
                    },
                    body: {
                        email: "test@gmail.com",
                        password: "Password123"
                    }
                };
                
                const send = jest.fn()
                
                const res = {
                    send
                }
                
                //@ts-ignore
                await createUserSessionHandler(req, res);
                
                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                });
                
            })
        })
    })

})