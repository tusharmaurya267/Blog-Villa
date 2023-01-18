const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes')


const app=express();

// PORT setup for online as well as PORT:3000
let port= process.env.PORT;
if(port == null || port ==""{
    port =3000;
})

// connect to mongo db
const dbURI = 'mongodb+srv://Tushar:tushar1234@blogs.ewfpwys.mongodb.net/blogs?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log("connected to db"))
    .then((result) =>app.listen(port))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');




// middlewares

// to access static files
app.use(express.static('public'));

// to encode the json into understandable form
app.use(express.urlencoded({extended:true}));

// to get the GET request
app.use(morgan('dev'));

// DATA getting
// app.get('/add-blog' , (req,res)=> {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) =>{
//             res.send(result)
//         })
//         .catch((err) =>{
//             console.log(err);
//         })
// })
// app.get('/all-blog',(req,res)=> {
//     Blog.find()
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// })
// app.get('/single-blog',(req,res) =>{
//     Blog.findById('63c591fe77c49ed406a45937')
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// })


app.get('/',(req,res)=>{
    // // res.send('<p>home page</p>');
    // // res.sendFile(__dirname + '/views/index.html');
    // const blogs = [
    //     {title: 'Yoshi finds eggs' , snippet: 'Lorem ipsum dolor.drhjhfvvjvjjfbffd fvhv,tt,hthcmd,t,tt,c.vttc,sdttdvvtdhtchrhctgchtvvtcbhcrhcr vy  v vy bv y vb hbh hb bh hbjbuhyt v vh hvybhh yv bhbvh b bh bj bhgvhbhv'},
    //     {title: 'Mario finds stars' , snippet: 'Lorem ipsum dolor.drhjhfvvjvjjfbffd fvhv,tt,hthcmd,t,tt,c.vttc,sdttdvvtdhtchrhctgchtvvtcbhcrhcr vy  v vy bv y vb hbh hb bh hbjbuhyt v vh hvybhh yv bhbvh b bh bj bhgvhbhv'},
    //     {title: 'Yoshi finds eggs' , snippet: 'Lorem ipsum dolor.drhjhfvvjvjjfbffd fvhv,tt,hthcmd,t,tt,c.vttc,sdttdvvtdhtchrhctgchtvvtcbhcrhcr vy  v vy bv y vb hbh hb bh hbjbuhyt v vh hvybhh yv bhbvh b bh bj bhgvhbhv'},
    // ];
    // res.render('index' , {title: 'Home' , blogs });
    res.redirect('/blogs');
});



app.get('/about',(req,res)=>{
    // res.sendFile(__dirname + '/views/about.html');
    res.render('about' , {title: 'About'});
});

// blog Routes
app.use(blogRoutes);

app.use((req,res)=>{
    res.status(404).render('404' , {title: 'Error Page'});
});

