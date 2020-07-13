const Messages = require('./messages.js')
const path = require('path')
const messages = new Messages();

module.exports = function(router) {

    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log((new Date()).toLocaleTimeString('fr-FR', {minute: '2-digit', hour: '2-digit', second:'2-digit'})+': '+req.path);
        next();
    });

    // router.get('/', function(res) {
    // });
    router.get('/create', function(req, res) {
        res.redirect('/'+messages.newRoom());
    });

    router.get('/404', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/404.html'));
    });


    router.get('/:room', function(req, res) {
        console.log('Room',req.params.room);
        console.log(messages.rooms.includes(req.params.room));
        
        if(messages.rooms.includes(req.params.room)) {
            res.sendFile(path.join(__dirname+'/views/chat.html'));
        } else {
            // res.redirect('/404');
            res.sendFile(path.join(__dirname+'/views/404.html'));
        }
    });
    
    
    router.post('/messages', (req, res)=>messages.post(req, res));
    router.post('/messages/fetch', (req, res)=>messages.fetch(req, res));
    
};