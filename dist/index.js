"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.create({
            data: {
                username: 'Alice',
                password: 'password',
                age: 20,
                city: "delhi",
                todos: {
                    create: [
                        { title: 'First post', description: 'This is the first post.', done: true },
                        { title: 'Second post', description: 'This is the second post.', done: false }
                    ]
                }
            }
        });
    });
}
function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        // dleted a user
        yield client.user.delete({
            where: {
                id: 3
            }
        });
    });
}
// findig user by id
function findUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.findFirst({
            where: {
                id: 3
            }
        });
        console.log((user === null || user === void 0 ? void 0 : user.age) + "/" + (user === null || user === void 0 ? void 0 : user.username));
    });
}
// createUser();
// findUser();
deleteUser();
