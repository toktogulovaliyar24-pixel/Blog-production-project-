const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = router.db
        .get('users')
        .find({ username, password })
        .value();

    if (user) {
        return res.json(user);
    }

    return res.status(401).json({
        message: 'User not found',
    });
});


server.use(router);


server.listen(8000, '0.0.0.0', () => {
    console.log('Server started on 8000');
});