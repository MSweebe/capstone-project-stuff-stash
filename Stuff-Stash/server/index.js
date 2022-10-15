const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/user');

const StockroomModel = require('./models/stockroom');


const cors = require('cors');
const PORT = process.env.PORT || 3000

const users = require('./routes/users')

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://estefan:teamwork@cluster0.qf1w4nh.mongodb.net/TechStartUp?retryWrites=true&w=majority"
);

app.get("/api/v1/users/", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }}).limit(1).sort({$natural:-1});
});

app.get("/api/v1/users/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/api/v1/users/createUser", async (req, res) => {
     const user = req.body;
     const newUser = new UserModel(user);
     await newUser.save();

     res.json(user);
});

app.get('/', (req, res) => {
    res.send({msg:'hello world'})
})

//BEGIN STOCKROOM CALLS

//this function finds stockrooms that belong to a given organization
app.get("/api/v1/getStockrooms/:orgID", async (req, res) => {
    //turn the request variable in the URL into a string
    orgID = JSON.stringify(req.params.orgID);
    console.log(orgID);
    //query our DB for stockrooms of that string
    StockroomModel.find({ org: orgID }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
    }})
});

//this create a stockroom with a given orgID and name
app.post("/api/v1/addStockroom", async  (req, res) => {
    const stockroom = req.body;
    const newStockroom = new StockroomModel(stockroom);
    await newStockroom.save();
    res.json(stockroom);
});

//END STOCKROOM CALLS

app.use('/api/v1/users', users)



app.listen(PORT, () => {
    console.log("SERVER LISTENING ON PORT ", PORT);
});

