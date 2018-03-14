//Front End Config 
//make conection 
var socket = io.connect('http://192.168.2.113:4000'); //ist der socket fürdas Front end

//Query DOM
var message = document.getElementById('message'); //hier bekommen die DOM-divs Variablen zugeordnet damit man darauf zugreifen kann
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emmit Events

btn.addEventListener('click',function(){ // nun wird beim klicken auf den send-btn die Dateien die sich  
    socket.emit('chat', {                // im HTML-Dom befiden versenedet und müssen im server verarbeitet werden
        message: message.value,
        handle:handle.value
    });
});

//Eventlistener zum anzeigen das emand tippt(braodcasting)

message.addEventListener('keypress',function(){     // hier wird auf das keypress Event gewartet, anders als oben auf das click event
    socket.emit('typing', handle.value);            // dies wird durch jeden Tastendruck ausgelöst 
});

//Listen for events

socket.on('chat', function(data){                                                               // hier wird der Output formatiert
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';

});

/*socket.on('typing', function(data){                                                             // hier wird das 'typing'(schreiben)
                                                                                                //feedback formatiert
    feedback.innerHTML = '<p><em>' + data + ' schreibt...</em><p>';
});*/