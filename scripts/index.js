const savedRooms = JSON.parse(localStorage.getItem('rooms'));

$(()=>{
    $('#randomRoom').attr('href', new RandExp(/^[0-9a-z]{8}$/).gen());
    $('#room').keyup(function() {$(this).val(removeDiacritics($(this).val()))});
    $('#saveRoom').click(function() {window.location.replace('/'+$('#room').val())});

    if(Array.isArray(savedRooms) ) {
        $('#savedRooms').append(`<h3 style="margin-bottom:5px">Salons déjà visités</h3>`);
        savedRooms.forEach(room=>{$('#savedRooms').append(`<a href="${room}">${room}</a>`)});
        $('#savedRooms').append(`<span style="margin-top:5px;cursor:pointer" id="clearSavedRooms">Vider la liste</span>`);

        $('#clearSavedRooms').click(function() {localStorage.setItem('rooms', '[]'); window.location.reload()});
    }
});