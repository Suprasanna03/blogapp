//create author api app
const exp=require('express')
const authorApp=exp.Router()
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken=require('../Middlewares/verifyToken')

let authorcollection;
let articlescollection
// Middleware to get author collection
authorApp.use((req, res, next) => {
    authorcollection = req.app.get('authorscollection');
    articlescollection=req.app.get('articlescollection')
    next();
});


// author registration route
authorApp.post('/user', expressAsyncHandler(async (req, res) => {
    // Get user resource from client
    const newUser = req.body;
    console.log(newUser)
    // Check for duplicate user based on username
    const dbuser = await authorcollection.findOne({ username: newUser.username });
    // If user found
    if (dbuser != null) {
        res.send({ message: "User already exists" });
    } else {
        // Hash password
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        // Replace plain password with hashed password
        newUser.password = hashedPassword;
        // Create user
        await authorcollection.insertOne(newUser);
        // Send response
        res.send({ message: "User created" });
    }
}));


// author login route
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    // Check for username
    const dbUser = await authorcollection.findOne({ username: userCred.username });
    if (dbUser == null) {
        res.send({ message: "Invalid Username" });
    } else {
        // Check for password
        const status = await bcryptjs.compare(userCred.password, dbUser.password);
        if (status === false) {
            res.send({ message: "Invalid password" });
        } else {
            // Create JWT token and encode
            const signedToken = jwt.sign({ username: dbUser.username }, process.env.SECRET_KEY,{expiresIn:'1d'});
            // Send response
            res.send({ message:"login success",token: signedToken ,user:dbUser});
        }
    }
}));


//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>
{
    //get article from user
    const newArticle=req.body;
    //post article to articles collection
    await articlescollection.insertOne(newArticle)
    //send response
    res.send({message:"New article created"})
}))


//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>
{
    const modifiedArticle=req.body;
    //update an article by article id
    let result=await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    res.send({message:"Article updated"})
    
}))


//delete an article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.articleId);
    //get article 
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
       let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
   
   
}))


//read articles of author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const authorName=req.params.username;
    //get atricles whose status is true
    const artclesList=await articlescollection.find({username:authorName}).toArray()
    res.send({message:"List of atricles",payload:artclesList})

}))

















//export
module.exports=authorApp;
