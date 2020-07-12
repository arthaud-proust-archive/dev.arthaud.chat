const formUrlEncoded = x =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

const messages = [];
let name = localStorage.getItem('name')?localStorage.getItem('name'):undefined;
let lastMsgId = -1;

function pushMessage(msg) {
    lastMsgId = msg.id;
    messages.push(msg)
    $('#container').append(`
        <div class="message ${msg.author == name?'me':''}" id="msg${msg.id}">
            <span class="author"></span>
            <span class="content"></span>
            <span class="time"></span>
        </div>
    `)
    $('#msg'+msg.id+' .author').text(msg.author)
    $('#msg'+msg.id+' .content').text(msg.content)
    $('#msg'+msg.id+' .time').text(msg.time)

    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
}

function fetchMessages() {
    return new Promise(resolve => {
        console.log('Fetching messages...')
        axios({
            method: 'post',
            url: '/fetch',
            data: formUrlEncoded({lastMsgId})
        }).then(r=>{  
            console.log('Message received')
            console.log(r.data)
            r.data.forEach(msg=>pushMessage(msg))
            fetchMessages().then(()=>resolve(r));
        });
    });
}

function sendMessage(e) {

    if (!$('#msg').val().match(/\S/gm)) return

    axios({
        method: 'post',
        url: '/',
        data: formUrlEncoded({
            author: name,
            content: $('#msg').val()
        })
    }).then(r=>{
        console.log(r.data);
        lastMsgId = r.data.lastMsgId;
        $('#msg').val('')
    });
}

$(()=>{

    if(name===undefined) {
        $('#chooseName').attr('style', 'display: flex')
        $('#saveName').click(function() {
            localStorage.setItem('name', $('#name').val());
            name = $('#name').val();
            $('#chooseName').fadeOut()
            $('#sessionName').text('Connecté en tant que '+name)
        })
    }

    $('#sessionName').text('Connecté en tant que '+name)

    fetchMessages();
    $('#msg').keyup(function(e) {
        if (e.keyCode == 13) {
            sendMessage()
        }
    });
    $('#sendMsg').click(function() {sendMessage()});

});