const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const bodyParser = require('body-parser')

let getTime = () => (new Date()).toLocaleTimeString('fr-FR', {minute: '2-digit', hour: '2-digit'});
const messages = [{author:'Bob Sleigh', content:'Bienvenue sur le salon de discussion.', id:0, time: getTime()}];
let clientsWhoFetch = [];

// support request
app.use( bodyParser.json() );                       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.json());                            // to support JSON-encoded bodies
app.use(express.urlencoded());                      // to support URL-encoded bodies

//add the router folders
app.use(express.static(__dirname + '/views'));      //Store all HTML files in view folder.
app.use(express.static(__dirname + '/scripts'));    //Store all JS and CSS in Scripts folder.

app.use('/', router);                               //add the router


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.post('/',function(req,res){
    let id = messages[messages.length-1].id + 1;
    messages.push({author: req.body.author, content: req.body.content, id, time: getTime()});
    console.log(`messageId: ${id} | ${req.body.author}: ${req.body.content}`)
    res.send({lastMsgId:id});

    clientsWhoFetch.forEach(client=>{
        client[0].send(messages.filter(msg => (client[1] < msg.id)));
    });
    clientsWhoFetch = [];
});
router.post('/fetch',function(req,res){
    console.log(`Last message id of client: ${req.body.lastMsgId} / ${messages[messages.length-1].id} here`)

    if(req.body.lastMsgId < messages[messages.length-1].id) {
        res.send(messages.filter(msg => (req.body.lastMsgId <= msg.id)));
    } else {
        clientsWhoFetch.push([res, req.body.lastMsgId])
    }
});

app.listen(process.env.port || 80);