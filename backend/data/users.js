import bcrypt from 'bcryptjs';


const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin:true,
    },
    {
        name: 'Syam',
        email: 'syam@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin:false,
    },
    {
        name: 'ashok',
        email: 'ashok@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin:false,
    },
];


export default users;