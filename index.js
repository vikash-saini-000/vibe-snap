const express=require("express");
const app=express();
const port=3000;
app.listen(port,()=>{
    console.log("server is working")
});
let path=require("path");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs")
let {v4:uuidv4}=require("uuid");
let methodOverride=require("method-override")
app.use(methodOverride("_method"))

let posts=[
    {
        username:"vikash saini",
        id:uuidv4(),
        date:"28 sep 2025",
        content:"hello everyone ,i am a student"
    },
    {
        username:"pankaj saini",
        id:uuidv4(),
        date:"29 sep 2025",
        content:"hello everyone ,i am a ca"
    }

];
app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{posts})
})
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("singlePost.ejs",{post})
})
app.get("/newpost",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    
    
    let{username,date,imageData,content}=req.body;
    posts.push({username:username,id:id,date:date,content:content,imageData:imageData})
    res.redirect("/posts")
})
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts")


})
app.get("/posts/:id/update",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("update",{post})
})
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("/posts")

})
app.get("/search",(req,res)=>{
    let date=req.query.date;
    const searchpost=posts.find(post=>post.date==date)
    res.render("result", { searchpost, date });
})