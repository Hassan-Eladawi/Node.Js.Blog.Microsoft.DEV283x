/*
GET and POST /posts/:postId/comments
PUT and DELETE /posts/:postId/comments/commentId
*/

module.exports = {
    getComments(req, res) {
        let post= req.store.posts.find(x=>x.postId==req.params.postId);
        if (post)res.status(200).send(post);
        else res.sendStatus(404);
    },
    addComment(req, res) {
       let index= req.store.posts.findIndex(x=>x.postId==req.params.postId);
       if (index>-1) {
            let comment = req.body;
            comment.commentId =req.store.commentAutoIncrement++;
            comment.dateCreated=new Date();
            if (!req.store.posts[index].comments)req.store.posts[index].comments=[];
                 req.store.posts[index].comments.push(comment);           
                 res.status(201).send(comment);
       }else res.sendStatus(404);
    },
    updateComment(req, res) {
        let post=req.store.posts.find(x=>x.postId==req.params.postId);
        if (post) {
            let comment = post.comments.find(x=>x.commentId==req.params.commentId);
            comment.text = req.body.text;
            res.status(200).send(comment);
        }else res.sendStatus(404);
        
    },
    removeComment(req, res) {
        let post = req.store.posts.find(x=>x.postId==req.params.postId);
        if (post) {
            const index= post.comments.findIndex(x=>x.commentId==req.params.commentId);
            if (index>-1) {
                post.comments.splice(index,1);
                res.sendStatus(204);
            }else res.status(404).sendStatus('comment not found');
           
        }else res.status(404).sendStatus('post not found');
        
    }
  }