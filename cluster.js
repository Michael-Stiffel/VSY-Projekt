var cluster = require('cluster');

if(cluster.isMaster){
    //Zählt die verfügbaren Prozessoren
    var cpuCount = require('os').cpus.length;

    //Erstellt einen Prozess pro CPU
    for (var i = 0; i < cpuCount; i+=1){
        cluster.fork();

    }

    //Prüft ob Prozesse sterben/gestorben sind
    cluster.on('exit',function(){
        cluster.fork;
    });
}else{
    require('./server');
}
//mit dem oben stehenden Code verbessern wir die Performance und die Stabilität des Chats 
// es wird erst für jeden CPU ein Prozess erstellt, dann wir die ganze zeit geprüft od Prozesse
// beendet werden(getötet), wenn ja dann wird der Prozess ausgewechselt.
// Bei einer Maschine mit 8 Kernen würde server.js also 8 mal laufen, 1 zum genutzt werden und 7 mal 
// als reserve.