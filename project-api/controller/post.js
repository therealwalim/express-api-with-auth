const router = require('express').Router();

// Middleware
const verify = require('../middleware/verifyToken');

// Validation function
const {postValidation} = require('../validation');

// Models
const Post = require('../model/Post');

// Dependencies
const multer = require('multer');

// Files Upload with Multer
const storage = multer.diskStorage({
     destination: function(req, file, cb) {
       cb(null, './storage/');
     },
     filename: function(req, file, cb) {
       cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname);
     }
   });
   
   const fileFilter = (req, file, cb) => {
     // reject a file
     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
       cb(null, true);
     } else {
       cb(null, false);
     }
   };
   
   const store = multer({
     storage: storage,
     limits: {
       fileSize: 1024 * 1024 * 5
     },
     fileFilter: fileFilter
   });


// API Operations

router.get('/',verify , (req, res) => {
     
     // Getting all the posts
     Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.post('/',verify, store.single('thumbnail') , (req, res) => {

     console.log(req.file);

     // Saving User ID
     const UID = req.user;
     
     // Data Validation
    const { error } = postValidation(req.body);
    
    // If there's an error it will not create a new post
    if(error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message);
    }

    // Creating a new Post
    const post = new Post({
        name: req.body.title,
        description: req.body.description,
        content: req.body.content,
        created_by: UID,
        thumbnail: req.file.path 
    });
    try {
         // Saving the post
        const savedPost = post.save();
        console.log("Successfully created post");
        res.json({ post });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

});

router.delete("/:postId", (req, res, next) => {
     const id = req.params.postId;
     // Deleting the post
     Post.remove({ _id: id })
       .exec()
       .then(result => {
         res.status(200).json({
             message: 'Post deleted',
         });
       })
       .catch(err => {
         console.log(err);
         res.status(500).json({
           error: err
         });
       });
   });

   router.get("/:postId", (req, res, next) => {
     
     // Getting a specific post
     Post.findById(req.params.postId)
       .populate("product")
       .exec()
       .then((post) => {
         if (!post) {
           return res.status(404).json({
             message: "Post not found",
           });
         }
         res.status(200).json({
           post: post,
         });
       })
       .catch((err) => {
         res.status(500).json({
           error: err,
         });
       });
   });

module.exports = router;