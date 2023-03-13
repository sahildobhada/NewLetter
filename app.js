const { json } = require("body-parser");
const bodyParser = require("body-parser");
const express=require("express");
const https=require("https");




const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,rep){
   var firstName=req.body.firstname;
   var lastName=req.body.lastname;
   var email=req.body.email;

   var data={
        members :[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
           

        ]
   }
   var jsondata=JSON.stringify(data);
    var url=" https://us10.api.mailchimp.com/3.0/lists/8f54fa2b5f";
   var option ={
        method:"POST",
        auth:"sahil:fac909806f28c1d6262a25ac6f3e56de-us10"
   }
   var request= https.request(url,option,function(response){

        if(response.statusCode===200){
            rep.sendFile(__dirname+"/successful.html")
        }else{
            rep.sendFile(__dirname+"/Failure.html")
        }
        response.on('data',(data)=>{
            var d=JSON.parse(data);
            console.log(d);
        })
   })

   request.write(jsondata);
   request.end();

});

app.post("/failure",function(req,res){
    res.render("/");
});

// APIKEY
// fac909806f28c1d6262a25ac6f3e56de-us10

// list_id
// 8f54fa2b5f





app.listen(3000);