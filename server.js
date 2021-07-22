const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json())

const users = [];

//Returns list of users
app.get('/users', (req, res) => {
    res.json(users)
});

//Creates new user with encrypted password
app.post('/register', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      //console.log(hashedPassword);

      const user = { 
        name: req.body.name, 
        last_name:req.body.last_name, 
        email:req.body.email, 
        password:hashedPassword 
      };

      users.push(user);
      res.status(201).send()
      
  } catch(err){ res.status(500).send() }
});

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name )
  if( user == null ) {
    return res.status(400).send("User not found, please try again")
  }
  try {
    if(await bcrypt.compare( req.body.password, user.password )){
      res.send('Success')
    } else {
      res.send('Not allowed')
    }
  } catch {
    res.send(500).send()
  }
});

app.listen(3000, () => {
    console.log('Server is running on localhost:3000')
})