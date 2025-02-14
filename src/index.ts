import express from 'express';
import { User } from './../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();


app.use(express.json());

// get all users
app.get('api/v1/users', async (req, res) => {
    const users = await client.user.findMany();
    res.json({users});
})
// get all users for specific id
app.get('api/v1/todos/:id', async (req, res) => {
    const id = req.params.id;
    const user = await client.user.findUnique({
        where:{
          id: Number(id)
        },
        select:{
            id: true, 
            username: true,
            age: true,
            city: true,
            todos: true
        }
    });
    res.json({user});
})

// Create user
app.post("api/v1/user/:id",async (req,res)=>{
    const {username,password,age,city,todos}= req.body;
    const newUser = await client.user.create({
        data:{
            username,
            password,
            age,
            city,
            todos: {
                createMany:{
                    data:[
                        {title:"Learn Node.js",description:"Node.js tutorial",done:false},
                        {title:"Learn React",description:"React tutorial",done:false}
                    ]
                }
            }
        }
    })
    res.status(201).send("User created successfully");
})


app.listen(4000);