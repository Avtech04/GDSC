require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const problemdb = require("./model/problemSchema")
const locationdb = require("./model/locationSchema")
const donerdb = require("./model/donerSchema")
const orderdb = require("./model/orderSchema")

const clientid = process.env.ClientId
const clientsecret = process.env.ClientSecret


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());


app.use(session({
    secret:"ayushvarshney",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    
    
}

    )
)




app.post("/createProblem",async(req,res)=>{
    // const{headline,description}=req.body

    // const data={
    //     headline:headline,
    //     description:description
    // }

    try {
        let user = await problemdb.findOne({headline:req.body.headline});

        if(!user){
            user = new problemdb({
                headline:req.body.headline,
                description:req.body.description
               
            });

            await user.save();
        }

        
    } catch (error) {
        console.log(error)
    }


})

app.post("/AddLocation",async(req,res)=>{
    // const{headline,description}=req.body

    // const data={
    //     headline:headline,
    //     description:description
    // }

    try {
        let user = await locationdb.findOne({locality:req.body.locality});

        if(!user){
            user = new locationdb({
                locality:req.body.locality,
                description:req.body.description,
                peoples:req.body.peoples,
                city:req.body.city,
                longitude:req.body.longitude,
                latitude:req.body.latitude
            });

            await user.save();
        }

        
    } catch (error) {
        console.log(error)
    }


})


app.post("/admin",async(req,res)=>{
    const{username,password}=req.body
    console.log(username);
    try{
        let check=0;
        if(username==="user" && password==="user")check=1;
        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        console.log(e);        
        res.json("fail")
    }

})
passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})
app.post("/login",async(req,res)=>{
    const{email,password}=req.body
    console.log(req.body.email);
    try{
        const check=await donerdb.findOne({email:email})

        if(check){
            res.status(200).json({message:"exist",user:check})
        }
        else{
            res.status(400).json({message:"notexist"})
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})
app.post("/signup",async(req,res)=>{
    try {
        let user = await donerdb.findOne({headline:req.body.email});

        if(!user){
            user = new donerdb({
                email:req.body.email,
                password:req.body.password
               
            });

            await user.save();
        }

        
    } catch (error) {
        console.log(error)
    }

})
app.post("/maps",async(req,res)=>{
   
        let
            user = new orderdb({
                
                food_type:req.body.food_type,
                freshness:req.body.freshness,
                quantity:req.body.quantity,

                longitude:req.body.longitude,
                latitude:req.body.latitude,
                order_email:req.body.userEmail
               
            });

            await user.save();
        }

        
    

)

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})