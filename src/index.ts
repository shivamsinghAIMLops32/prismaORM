import { User } from './../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {

await client.user.create({
    data: {
        username: 'Alice',
        password: 'password',
        age:20,
        city:"delhi",
        todos: {
            create: [
                { title: 'First post', description: 'This is the first post.',done: true },
                { title: 'Second post', description: 'This is the second post.',done:false }
            ]
        }
    }
})
}

async function deleteUser() {

    // dleted a user
    await client.user.delete({
       where:{
        id:3
       }
    })
}
    

// findig user by id
async function findUser() {
    const user = await client.user.findFirst({
        where:{
            id:3
        },
        select:{
            id:true,
            username:true,
            age:true,
            city:true,
            todos:{
                select:{
                    title:true,
                    description:true,
                    done:true
                }
            }
        }
    })
    console.log(user?.age+"/"+user?.username);
}

// createUser();
// findUser();
deleteUser();