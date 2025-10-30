import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Shahzaib',
        email: 'shahzaib@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ali',
        email: 'ali@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users