const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/", function(req, res) {
    const query = req.body.city;
    console.log(query);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=38e4134b1a79131f71c8d7b655e80467&units=metric";
    
    https.get(url, function(response) {
        // console.log(response.statusCode);
        // console.log(response);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Temp at " + query + " is : " + temp + "</h1>");
            res.write("\n<h2>Weather description is : " + desc + "</h2>");
            res.write("<img src=" + imgurl + " >");

            res.send();
        });
    });
});


app.listen(3000, function() {
    console.log("server started at port 3000");
});

