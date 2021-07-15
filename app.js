var express = require("express");
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});


app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

app.listen(3000, ()=> {
    console.log("app running on 3000")
})

module.exports = app;