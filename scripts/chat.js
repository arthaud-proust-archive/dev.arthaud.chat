const formUrlEncoded = x =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

const room = window.location.pathname.replace('/', '');
const messages = [];
let name = localStorage.getItem('name')?localStorage.getItem('name'):undefined;
let lastMsgId = -1;

function pushMessage(msg) {
    lastMsgId = msg.id;
    messages.push(msg)
    $('#container').append(`
        <div class="message${msg.author == name?' me':''}" id="msg${msg.id}">
            <span class="author"></span>
            <span class="content"></span>
            <span class="time"></span>
        </div>
    `)
    $('#msg'+msg.id+' .author').text(msg.author)
    $('#msg'+msg.id+' .content').text(msg.content)
    $('#msg'+msg.id+' .time').text(msg.time)

    $('#messages').scrollTop($('#messages').prop("scrollHeight"));

    $('.message').unbind();
    $('.message').click(function() {
        $(this).attr('showtime', $(this).attr('showtime')=="true"?"false":"true");
    })
}

function fetchMessages() {
    return new Promise(resolve => {
        console.log('Fetching messages...')
        axios({
            method: 'post',
            url: '/messages/fetch',
            timeout: 60 * 60 * 1000, // 1 heure
            data: formUrlEncoded({lastRuntimeId: lastMsgId, room})
        }).then(r=>{  
            console.log('Message received')
            console.log(r.data)
            r.data.forEach(msg=>pushMessage(msg))
            fetchMessages().then(()=>resolve(r));
        }).catch(e=>{
            location.reload();
        });
    });
}

function sendMessage(e) {

    if (!$('#msg').val().match(/\S/gm)) return

    axios({
        method: 'post',
        url: '/messages',
        timeout: 60 * 1 * 1000, // 1 minute
        data: formUrlEncoded({
            room,
            author: name,
            content: $('#msg').val()
        })
    }).then(r=>{
        console.log(r.data);
        lastMsgId = r.data.runtimeId;
        $('#msg').val('')
    });
}

$(()=>{

    if(name===undefined) {
        $('#chooseName').attr('style', 'display: flex')
        $('#saveName').click(function() {
            name = $('#name').val();
            if (!name.match(/\S/gm)) return
            localStorage.setItem('name', name);
            $('#chooseName').fadeOut()
            $('#sessionName').text('Connecté en tant que '+name)
        })
    }

    $('#sessionName').html(`Connecté au chat ${(room?`<b>${room}</b>`:'')} en tant que ${name}`)

    fetchMessages();


    $('#msg').keyup(function(e) {
        if (e.keyCode == 13) {
            sendMessage()
        }
    });
    $('#sendMsg').click(function() {sendMessage()});

    $('#saveRoom').click(function() {window.location.replace('/'+$('#room').val())});
    
});