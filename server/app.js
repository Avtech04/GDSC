require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const port = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const problemdb = require("./model/problemSchema")
const locationdb = require("./model/locationSchema")
const donerdb = require("./model/donerSchema")
const orderdb = require("./model/orderSchema")
const http = require("http").Server(app);



const clientid = process.env.ClientId
const clientsecret = process.env.ClientSecret


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());


app.use(session({
    secret: "ayushvarshney",
    resave: false,
    saveUninitialized: true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {

            try {
                let user = await userdb.findOne({ googleId: profile.id });

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value,
                    status:"Not- Verified"
                });

                    await user.save();
                }

                return done(null, user)
            } catch (error) {
                return done(error, null)
            }


        }

    )
)




app.post("/createProblem", async (req, res) => {
    // const{headline,description}=req.body

    // const data={
    //     headline:headline,
    //     description:description
    // }

    try {
        let user = await problemdb.findOne({ headline: req.body.headline });

        if (!user) {
            user = new problemdb({
                headline: req.body.headline,
                description: req.body.description

            });

            await user.save();
        }


    } catch (error) {
        console.log(error)
    }


})
// Define a route to handle PUT requests to update the status of an NGO
app.put('/api/NGO/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find the NGO by ID and update its status
        const updatedNGO = await userdb.findByIdAndUpdate(id, { status }, { new: true });

        // Check if NGO with given ID exists
        if (!updatedNGO) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        // Return the updated NGO
        res.json(updatedNGO);
    } catch (error) {
        console.error('Error updating NGO status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post("/AddLocation", async (req, res) => {

    try {

          const location= new locationdb({
                ngoName: req.body.ngoName,
                NgoId:req.body.NgoId,
                description: req.body.description,
                peoples: req.body.peoples,
                address: req.body.address,
                coordinates:[ req.body.lng,req.body.lat]
            });

            await location.save();
            res.status(200).json("Success");

        
    } catch (error) {
        console.log(error)
    }


})

app.get('/getLocation', async (req, res) => {
    const id=req.query.id;
    let data;
    if(id){
       data = await locationdb.find({_id:id});
    }else{
        data = await locationdb.find({});
    }
    res.status(200).send(data);
})


app.post("/admin", async (req, res) => {
    const { username, password } = req.body
    console.log(username);
    try {
        let check = 0;
        if (username == "user" && password == "user") check = 1;
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        console.log(e);
        res.json("fail")
    }

})
passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login"
}))

app.get("/login/sucess", async (req, res) => {

    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user })
    } else {
        res.status(400).json({ message: "Not Authorized" })
    }
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body.email);
    try {
        const check = await donerdb.findOne({ email: email })

        if (check) {
            res.status(200).json({ message: "exist", user: check })
        }
        else {
            res.status(400).json({ message: "notexist" })
        }

    }
    catch (e) {
        res.json("fail")
    }

})
app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect("http://localhost:3000");
    })
})
app.post("/signup", async (req, res) => {
    try {
        let user = await donerdb.findOne({ headline: req.body.email });

        if (!user) {
            user = new donerdb({
                email: req.body.email,
                password: req.body.password

            });

            await user.save();
        }


    } catch (error) {
        console.log(error)
    }

})
app.get('/api/problems', async (req, res) => {
    try {
      const problems = await problemdb.find().sort({ createdAt: -1 }).limit(3);
      res.json(problems);
    } catch (err) {
      console.error('Error fetching problems:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/api/NGO', async (req, res) => {
    try {
      const NGOs = await userdb.find().sort({ createdAt: -1 });
      res.json(NGOs);
    } catch (err) {
      console.error('Error fetching NGOs:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.post("/maps", async (req, res) => {

    let user = new orderdb({

            food_type: req.body.type,
            freshness: req.body.freshness,
            quantity: req.body.quantity,
            userCoordinate: req.body.userCoordinate,
            order_email: req.body.userEmail,
            LocationId:req.body.LocationId,
            NgoId: req.body.NgoId

        });

    await user.save();
    res.status(200).json("Success");
}

)

app.get('/getOrders',async(req,res)=>{
    console.log("yes");
    const par1=req.query.NgoId;
    const par2=req.query.emailId;
    let data;
    console.log(req.query);
    if(par1){
        data=await orderdb.find({"NgoId":par1});
    }else{
        data=await orderdb.find({"order_email":par2});
    }
    res.send(data);

})

const io = require("socket.io")(http, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    }});
io.on("connection", (socket) => {
    socket.on("startTracking", (data) => {
        // socket.roomId = data.id;
        // socket.join(data.id);
        console.log("YES");
        
    });
    socket.on("sendLocation", (data) => {
        socket.to(socket.roomId).emit("recieveLocation", data);
    })

});


app.listen(port,()=>{
    console.log(`Server listening on port 6005`);
})

//starting server
http.listen(6005, () => {
    console.log(`Server listening on port 3001`);
});