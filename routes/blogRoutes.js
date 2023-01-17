const express= require('express');
const Blog =require('../models/blog');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/blogs',blogController.blog_index)



router.post('/blogs',blogController.blog_create_post)

router.get('/blogs/create',blogController.blog_create_get);




router.get('/blogs/:id',blogController.blog_details)


router.delete('/blogs/:id',blogController.blog_delete);


module.exports = router;