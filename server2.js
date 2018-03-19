var express = require('express');
var socket = require('socket.io');
const http = require('http');
const cluster = require('cluster');
var Port = 4001;

/*const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {*/
    //App Setup
var app = express();
var server = app.listen(Port, function(){
    console.log(`listening to ${Port}`);
}); 

//static files 
app.use(express.static('public'));              // der aufruf des public Ordners mit der Html-Datei

//Socket Setup
var io = socket(server);

io.on('connection', function(socket){           //dieser abschnitt wird aufgerufen wenn eine Verbindung etabliert wurde 
    console.log('socket verbunden',socket.id);  //die Funktion wird ausgeführt wenn eine Verbindung da ist 
                                                //und logt dies in die Console mit der Socket Id die Verbunden ist
    
    socket.on('chat', function(data){           // diese wird aufgerufen wenn eine Nachricht mit dem Namen 'chat' ankommt
        io.sockets.emit('chat',data);           // .emit hat die Parameter name(der Nachicht) und ihren wert/Inhalt/payload

    });
    socket.on('error', function(data){ 
        Port =4000;                                         // diese wird aufgerufen wenn eine Nachricht mit dem Namen 'chat' ankommt
        io.sockets.emit('chat',data);           // .emit hat die Parameter name(der Nachicht) und ihren wert/Inhalt/payload

    });

    /*socket.on('typing',function(data){          // hier wird auf die Nachricht mit dem Namen 'typing' gewartet
        socket.broadcast.emit('typing',data)    // sollte diese eintreffen dann wird der Name des 
                                                // tippenden wieder ans Front end geschickt
    });*/
});


  console.log(`Worker ${process.pid} started`);
//}

