const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('morgan');

app.use(morgan('combined'));

let users = [];


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));


app.post('/register', (req, res) => {

    if ((req.body.name.length > 2) &&
        (req.body.email1.length > 6 &&
         req.body.email1.length < 65 &&
         req.body.email1 === req.body.email2) &&
        (req.body.gender === "male" || 
         req.body.gender === "female") &&
        (req.body.password1.length > 6 &&
         req.body.password1.length < 16 &&
         req.body.password1 === req.body.password2))
        {  

            users.push({
                password: req.body.password1,
                gender: req.body.gender,
                name: req.body.name,
                email: req.body.email1 
            });


            console.log(users);

            res.status(200).send(`you are registered`);
            } else {
            res.status(403).send(`Error!`);  
        }
 });

 app.post('/', (req, res) => {
    if(users.length === 0) {

        res.status(403).send(`not registered user`)

    } else {
        users.forEach(function (user) {

            if(req.body.email === user.email &&  req.body.password === user.password) {
                res.status(200).send(`hello user`);
                
           } else {
               res.status(403).send(`incorrect username or password`);
           } 
        });
    }
});



 app.listen(port, () =>
 console.log(`app listening on port ${port}`));


