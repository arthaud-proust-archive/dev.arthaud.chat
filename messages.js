const Dispatcher = require('./dispatcher');
const RandExp = require('randexp');

module.exports = class Messages extends Dispatcher {
    constructor() {
        // super();  // super() renvoie à l'abstract
        super();
        this.messages = [{room:'', author:'Bob Sleigh', content:'Bienvenue sur le salon de discussion.', id:0, time: this.actTime}];
        this.rooms = [];
        this.room
    }

    // newRoom() {
    //     let tRoom = new RandExp(/^[0-9a-z]{4}$/).gen();
    //     while (this.rooms.includes(tRoom)) {
    //         tRoom = new RandExp(/^[0-9a-z]{4}$/).gen();
    //     }
    //     this.rooms.push(tRoom);
    //     return tRoom
    // }

    condition(req, res) {
        let messages = this.messages.filter(msg => msg.room == req.body.room)
        if (messages.length == 0) return false
        return (req.body.lastRuntimeId < messages[messages.length-1].id)
    }

    functionPost(req, res) {
        this.messages.push({room: req.body.room, author: req.body.author, content: req.body.content, id: this.runtimeId, time: this.actTime});
    }
    
    callback(client) {
        client.res.send(this.messages.filter(msg => (client.req.body.lastRuntimeId < msg.id) && (client.req.body.room == msg.room)));
    }

    functionFetch(req, res) {
        res.send(this.messages.filter(msg => (req.body.lastRuntimeId <= msg.id) && (req.body.room == msg.room)));
    }
}