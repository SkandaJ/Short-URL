const express =  require('express');
const path=require('path');
const app =  express();
const {connectDB} = require('./connect');
const cookieParse = require('cookie-parser')
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth')

const PORT = 8000;
const URL=require('./models/url')
const urlRoute = require("./routes/url");
const staticRoute=require("./routes/static_router");
const userRoute = require('./routes/user');
connectDB('mongodb://localhost:27017/short-url').then(()=>console.log("Database connected"));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParse());


app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);
app.get('/url/:shortId', async(req, res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
    visitHistory: {
        timestamp:Date.now(),
    }
},
},
);
res.redirect(entry.redirectURL)
});
app.listen(PORT, ()=>console.log("Server started at port ", PORT));
 