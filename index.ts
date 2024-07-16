import express from "express";
import { getUser } from "./service";
import { generateToken } from "./generateToken";
import { authMiddleware, permissionMiddleware } from "./middlewares";

export enum httpStatusCode {
    OK = 200,
    badRequest = 400,
    unauthorized = 401,
}

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/auth', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    const user = getUser(username, password);
    console.log(user);

    if(!user) {
       return res.status(httpStatusCode.unauthorized).json({message: "Usuário ou senha inválidos!"})
    }
    else {
        const permissions = user.permissions.map((permission) => permission.path)
        const token = generateToken({userId: user.id, name: user.name, permissions})
        return res.status(httpStatusCode.OK).json({message: "Usuário logado!", token })
    }

});

app.get('/contracts', authMiddleware, permissionMiddleware, (req, res) => res.send('Lista de Contratos'));
app.get('/invoices', authMiddleware, permissionMiddleware, (req, res) => res.send('Lista de faturas'));
app.get('/customers', authMiddleware, permissionMiddleware, (req, res) => res.send('Lista de clientes'));

app.listen(3000, ()=> {
    console.log('Server running on http://localhost:3000')
})