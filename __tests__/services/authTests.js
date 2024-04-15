require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authService = require('../../src/services/authService');
const { deleteUser } = require('../../src/services/userService');

jest.mock('../../src/utils/logger', () => ({
    error: jest.fn(),
    info: jest.fn()
}));

describe("Test auth service", () => {
    let mongoServer;

    beforeAll(async () => {
      jest.clearAllMocks();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri, {});
    });
    
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
    });

    describe("Register", () => {
        it("Should be able to create a user.", async () => {
            const user = await authService.register(
              "Henri Dupont",
              "henri.dupont@outlook.fr",
              "helloworld",
              true
            );
        
            expect(user).toHaveProperty("accessToken");
            expect(user).toHaveProperty("refreshToken");
            expect(user).toHaveProperty("userProfile");
        
            await deleteUser(user.userProfile.id.toString());
        });
        
        it("Should not be able to create a user with an existing email.", async () => {
            const user = await authService.register(
                "Henri Dupont",
                "henri.dupont@outlook.fr",
                "helloworld",
                false
            );
            try {
              await authService.register(
                "Henri Dupont",
                "henri.dupont@outlook.fr",
                "helloworld",
                false
              );
            } catch (error) {
              await deleteUser(user.userProfile.id);
              expect(error.message).toBe("User already exists !");
            }
        });

        it("Should not be able to register a user with an incorrect email format.", async () => {
            try {
              await authService.register(
                "Henri Dupont",
                "email",
                "helloworld",
                true
              );
            } catch (error) {
              expect(error.message).toBe("Email is not valid ! Please respect this format : example@example.example")
            }
        });
    });

    describe("Login", () => {
        it("Should be able to login a user.", async () => {
            const user = await authService.register(
              "Henri Dupont",
              "henri.dupont@outlook.fr",
              "helloworld",
              false
            );
        
            const login = await authService.login("henri.dupont@outlook.fr", "helloworld");
        
            expect(login).toHaveProperty("accessToken");
            expect(login).toHaveProperty("refreshToken");
            expect(login).toHaveProperty("userProfile");
        
            await deleteUser(user.userProfile.id.toString());
        });
        
        it("Should not be able to login a user with an unregistered email.", async () => {
            try {
              await authService.login("henri.dupont@outlook.fr", "helloworld");
            } catch (error) {
              expect(error.message).toBe("User not found !");
            }
        });

        it("Should not be able to login a user with the wrong password.", async () => {
            const user = await authService.register(
                "Henri Dupont",
                "henri.dupont@outlook.fr",
                "helloworld",
                true
            );
            try {
              await authService.login("henri.dupont@outlook.fr", "BonjourMonde");
            } catch (error) {
              await deleteUser(user.userProfile.id);
              expect(error.message).toBe("Incorrect password !");
            }
          });
    });

});