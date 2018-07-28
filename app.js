const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')

app.use(cors({origin : true}))

app.get('/:email',(req, res, next) => {
var options = {
url : `https://apilayer.net/api/check?access_key={Your api key }&email=${req.params.email}`,
headers : {
'User-Agent' : 'My Web Server',
'content-type' : 'application/json'
}
};
function callback(error, response, body) {
if(!error && response.statuscode === 200) {
res.send(JSON.parse(body));
return;
}
else if(response.statuscode === 404) {
res.send({
message : "Email is not valid"
});
return;
}
//request failed
res.status(response.statuscode).send("something is wrong");
}

request(options, callback);

});
        
app.listen(300)        
 
