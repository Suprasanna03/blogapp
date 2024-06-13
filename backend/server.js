const exp=require('express')
const app=exp()
require('dotenv').config()//process.env.PORT
const mongoClient=require('mongodb').MongoClient;
const path=require('path')

//npm run build creates build in client folder
//intially babble used to bundle and pack i.e., the build was not available because it was placed in live web server by babel
//now as we created our own server we need to place build in our http server
//import path module(core-module)
//deploy react build in this server

app.use(exp.static(path.join(__dirname,'../client/blogapp/build')))
//connecting frontend and backend is completed
//http://localhost:4000

//to parse the body of req
app.use(exp.json())

//connect to db
mongoClient.connect(process.env.DB_URL)
.then(client => {
    const blogdb = client.db('blogdb');
    const userscollection = blogdb.collection('userscollection');
    app.set('userscollection', userscollection); // Set userscollection on the app object
    const articlescollection=blogdb.collection('articlescollection')
    app.set('articlescollection',articlescollection)
    const authorscollection=blogdb.collection('authorscollection')
    app.set('authorscollection',authorscollection)
    console.log("DB connection success");
    
})
.catch(err => {
    console.log("error in db connection", err);
});









//import API routes
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

//if path starts with user-api send req to userApp
app.use('/user-api',userApp)
//if path starts with author-api send req to authorApp
app.use('/author-api',authorApp)
//if path starts with user-api send req to adminApp
app.use('/admin-api',adminApp)

//to avoid problems with refreshing the page
//keep only top of error handling middleware
//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/blogapp/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>
{
    res.send({message:"error",payload:err.message})
})

const port=process.env.PORT || 5000;
//assign port number
app.listen(port,()=>console.log(`web server on port ${port}`))
