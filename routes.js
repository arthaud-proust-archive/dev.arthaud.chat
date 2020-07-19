const Messages = require('./messages.js')
const path = require('path')
const messages = new Messages();

module.exports = function(router) {

    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        // console.log((new Date()).toLocaleTimeString('fr-FR', {minute: '2-digit', hour: '2-digit', second:'2-digit'})+': '+req.path);
        console.log(req.path);
        next();
    });

    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/index.html'));
    });
    router.get('/download', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/download.html'));
    });
    router.get('/download-android', function(req, res) {
        res.download(path.join(__dirname+'/public/files/chat.apk'));
    });
    router.get('/download-ios', function(req, res) {
        res.download(path.join(__dirname+'/public/files/chat.apk'));
    });

    router.get('/:room', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/chat.html'));
        // if(messages.rooms.includes(req.params.room)) {
        // } else {
            // res.redirect('/404');
            // res.sendFile(path.join(__dirname+'/views/404.html'));
        // }
    });
    
    
    router.post('/messages', (req, res)=>messages.post(req, res));
    router.post('/messages/fetch', (req, res)=>messages.fetch(req, res));
    
};