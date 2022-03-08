const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
// const port = process.env.PORT;
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))


app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});




app.listen(process.env.PORT || 3000, ()=>{
  console.log("listenening on port 3000")
})


app.post("/", (req, res)=> {
  const name1 = req.body.fname;
  const name2 =req.body.lname;
  const mail1 = req.body.email;

  const data = {
    members:[
      {
        email_address: mail1,
        status: "subscribed",
        merge_fields:{
          FNAME: name1,
          LNAME: name2
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/e3814fcec9";
  const options = {
    method: "POST",
    auth: "ad3rinto:38a3dd4c08998c382710ea6395872101-us14"
  }


  const request = https.request(url, options, (response)=>{

    if (response.statusCode === 200){
      res.sendFile(__dirname +"/success.html");
    } else {
      res.sendFile(__dirname +"/failure.html");
    }


    response.on("data", (data)=>{
    console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end()

});


app.post("/failure", (req, res)=>{
  res.redirect("/");
});



// const apiKey="38a3dd4c08998c382710ea6395872101-us14"
// const audienceId = "e3814fcec9"
