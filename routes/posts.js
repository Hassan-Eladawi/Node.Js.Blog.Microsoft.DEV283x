/*
GET and POST /posts
PUT and DELETE /posts/:postId/
*/

module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts);
    },
    addPost(req, res) {
       let post = req.body;
       post.postId =req.store.postAutoIncrement++;
       post.dateCreated=new Date();
       req.store.posts.push(post);
       res.status(201).send(post);
    },
    updatePost(req, res) {
        let post=req.store.posts.find(x=>x.postId==req.params.postId);
        if (post) {
            if (req.body.name) {
                post.name=req.body.name;
            } 
            if (req.body.text) {
                post.text=req.body.text;
            } 
            if (req.body.url) {
                post.url=req.body.url;
            } 
            res.status(200).send(post);
        }else res.sendStatus(404);
        
    },
    removePost(req, res) {
        const index = req.store.posts.findIndex(x=>x.postId==req.params.postId)
        if (index>-1) {
            req.store.posts.splice(index,1);
            res.sendStatus(204);
        }else res.sendStatus(404);
        
    }
  }




