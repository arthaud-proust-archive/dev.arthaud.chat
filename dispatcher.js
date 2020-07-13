
// abstract Dispatcher
module.exports = class Dispatcher {
    constructor() {
        if (this.constructor === Dispatcher) {
            throw new TypeError('Abstract class "Dispatcher" cannot be instantiated directly');
        }
        this.clients = [];
        this.runtimeId = 0;
    }

    post(req, res) {
        this.runtimeId++;
        res.send({runtimeId: this.runtimeId});

        this.functionPost(req, res);

        this.clients.forEach( client=>this.callback(client) );
        this.clients = [];
    }

    fetch(req, res) {
        if(this.condition(req, res)) {
            this.functionFetch(req, res);
        } else {
            this.clients.push({req, res})
        }
    }

    get actTime() {
        return (new Date()).toLocaleTimeString('fr-FR', {minute: '2-digit', hour: '2-digit'});
    }
}