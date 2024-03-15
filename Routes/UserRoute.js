const router = require('express').Router()



// Sample hardcoded user data
let users = [
     {id: 1, username: 'user1', password: 'password1'},
     {id: 2, username: 'user2', password: 'password2'},
     {id: 3, username: 'user3', password: 'password3'}
];


//CREATE NEW USER
router.post("/",
     async (req, res) => {
          try {
               const {username, password} = req.body;
               if (!username || !password) {
                    return res.status(400).json({"error": 'Username and password are required'});
               }
               const newUser = {id: users.length + 1, username, password};
               users.push(newUser);
               res.status(201).json(newUser); //Return new user
          } catch (error) {
               // console.log(error)
               res.status(500).json(error)
          }
     })


// UPDATE USER
router.put("/:id",
     async (req, res) => {
          try {
               const id = parseInt(req.params.id);
               const {username, password} = req.body;
               console.log(username)
               const userIndex = users.findIndex(user => user.id === id);
               if (userIndex === -1) {
                    return res.status(404).json({"error": 'User not found'});
               }
               users[userIndex] = {...users[userIndex], username, password};
               res.json(users[userIndex]); //Return updated user
          } catch (error) {
               res.status(500).json(error)
          }
     })


// DELETE SINGLE USER
router.delete("/:id",
     async (req, res) => {
          try {
               const id = parseInt(req.params.id);
               const userIndex = users.findIndex(user => user.id === id);
               if (userIndex === -1) {
                    return res.status(404).json({"error": 'User not found'});
               }
               users.splice(userIndex, 1); // Remove user from array
               res.status(204); 

          } catch (error) {
               res.status(500).json(error)
          }
     })


//GET SINGLE USER
router.get("/find/:id", async(req,res)=>{
     try {
          const id = parseInt(req.params.id);
          const user = users.find(user => user.id === id);
          if (!user) {
               return res.status(404).json({"error": 'User not found'});
          }
          res.json(user); //Return single user from the array
     } catch (error) {
          res.status(500).json(error)
     }
});

//GET ALL USERS
router.get("/", async (req, res) => {
     try {
          res.status(200).json(users) //Return all users from the array
     } catch (error) {
          res.status(500).json(error)
     }
})

module.exports = router