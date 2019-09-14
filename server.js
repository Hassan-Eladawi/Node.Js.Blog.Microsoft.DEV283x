const routes=require('./routes');
const ip=require('ip');
const bodyParser=require('body-parser');
const errorHandler=require('errorhandler');
const logger = require('morgan');
const express=require('express');
const app =express();
app.use(errorHandler(),logger('dev'),bodyParser.json());
let store = {
    postAutoIncrement:1,
    commentAutoIncrement:1,
    posts: [
      {
        postId:Number,
        name: String,
        url: String,
        text:String,
        dateCreated: Date,
        comments: Array
      }
    ]
  }
  //assigne store to request.store one time in middleware
  app.use((req,res,next)=>
  {
    req.store=store;  
    next();
  })
  app.get('/posts',(req,res)=>
  {
     routes.posts.getPosts(req,res)
  });
  app.post('/posts',(req,res)=>
  {
    routes.posts.addPost(req,res)
  });
  app.put('/posts/:postId',(req,res)=>
  {
    routes.posts.updatePost(req,res)
  });
  app.delete('/posts/:postId',(req,res)=>
  {
    routes.posts.removePost(req,res);
  });
  app.get('/posts/:postId/comments',(req,res)=>
  {
    routes.comments.getComments(req,res);
  });
  app.post('/posts/:postId/comments',(req,res)=>
  {
    routes.comments.addComment(req,res);
  });
  app.put('/posts/:postId/comments/:commentId',(req,res)=>
  {
    routes.comments.updateComment(req,res);
  });
  app.delete('/posts/:postId/comments/:commentId',(req,res)=>
  {
    routes.comments.removeComment(req,res);
  });
 app.all('*',(req,res)=>res.sendStatus(404))
 const port=8080;
 app.listen(port,()=>console.log(`Server started on Host:${ip.address()},Port:${port}`));

//console.log(store);