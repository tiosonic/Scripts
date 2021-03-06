var Funbot = {};
var ruleSkip = {};
Funbot.misc = {};
Funbot.settings = {};
Funbot.moderators = {};
Funbot.filters = {};
botMethods = {};
Funbot.pubVars = {};
 
toSave = {};
toSave.settings = Funbot.settings;
toSave.moderators = Funbot.moderators;
 
Funbot.misc.version = "1.0";
Funbot.misc.ready = true;
var songBoundary = 60 * 10;
var announcementTick = 60 * 10;
var lastAnnouncement = 0;

joined = new Date().getTime();
 
// Filterng Chat
Funbot.filters.beggerWords = new Array();
Funbot.filters.commandWords = new Array();

// Bot's settings
Funbot.settings.songLimit = 10; 
Funbot.settings.cooldown = 10; 
Funbot.settings.staffMeansAccess = true;
Funbot.settings.historyFilter = true;
Funbot.settings.beggerFilter = true;
Funbot.settings.commandFilter = true;
Funbot.settings.interactive = true;
Funbot.settings.ruleSkip = true;
Funbot.settings.removedFilter = true;

// Admins ID
Funbot.admins = ["516ee553c3b97a0e0ff31192"];

// Random announcements.
var announcements = 
[""];

// Keywords of blocked songs
var blockedSongs = [
    "Rick Roll",
    "GANGNAM",
    "The Fox",
    "The Fox [Official music video HD]",
    "10 hour",
    "Trololo",
    "#SELFIE (Official Music Video)",
    "Heyayayay"
];

// Keywords of blocked artist.
var blockedArtists = [
    "MC",
    "Katy Perry",
    "Demi Lovato",
    "Justin Bieber",
    "Miley Cyrus"
];

// Filter Keywords
Funbot.filters.beggerWords = ["Filhos da puta", "Sala Lixa", "BRBRBRBRBRBR", "Sala lixosa"];
Funbot.filters.commandWords = [".say",".testar",".ping",".marco",".songLimit",".add",".addsong",".dinheiro",".catfact",".dogfact",".hug",".aleatorio",".fortune",".songlink",".download",".help",".whywoot",".whymeh",".props",".votes",".woot",".meh",".version",".userstats @",".mystats",".source",".roomstats",".roomstats2",".register",".join",".leave",".roll"];


// Fun misc
Funbot.misc.tacos = ["Queijo","Flango","Carne","Repolho","4Queijos","Barro"];
Funbot.misc.cookie = ["Cookie de chocolate", "Cookie de morango", "Cookie diabetico", "Cookie de Baunilhia ", "Cookie de Brigadeiro", "Cookie de Amora", "um Cookie normal","Uma coxa de frango", "Um Banana Split", "Sorvete de Leite Ninho", "Bala de menta", "Bala de Limão", "Um copo de coca-cola geladinho", "Um suquinho de laranja", "Um copo de leite"];
Funbot.misc.ball = [
"Eu pito, e você?",
"Não sei oque faço aqui me ajude",
"Porque usou o comando :(",
"Seila man mil tretas",
"Eu sei que você ta com janela anonima aberta",
"Curto Madonna, DIVA <3",
"Vai dormi joven",
"Oh meu deus oque você quer",
"Ola, como vai você",
"Bora jogar um Candy Crush??",
"Estou invadindo o seu pc",];


Funbot.misc.ht = ["Quer dinheiro vai trabalha vagabundo"];


Funbot.pubVars.skipOnExceed;
Funbot.pubVars.command = false;
 
Array.prototype.remove=function(){var c,f=arguments,d=f.length,e;while(d&&this.length){c=f[--d];while((e=this.indexOf(c))!==-1){this.splice(e,1)}}return this};
if(window.location.hostname === "plug.dj"){window.setInterval(sendAnnouncement, 1000 * announcementTick);
API.on(API.DJ_ADVANCE, djAdvanceEvent);
API.on(API.DJ_ADVANCE, listener);
API.on(API.DJ_ADVANCE, woot);
API.on(API.USER_JOIN, UserJoin);
API.on(API.DJ_ADVANCE, DJ_ADVANCE);
$('#playback').hide();
$('#audience').hide();
API.setVolume(100);

function woot(){
$('#woot').click();
};
 
function UserJoin(user)
{
var JoinMsg = ["@user Entrou na sala!","Bem vindo, @user!","Ola, @user!","Seja Bem Vindo :D, @user"];
r = Math.floor(Math.random() * JoinMsg.length);
API.sendChat(JoinMsg[r].replace("user", user.username));
};

function djAdvanceEvent(data){
    setTimeout(function(){ botMethods.data }, 500);
};

Funbot.skip = function(){
API.moderateForceSkip();
};

Funbot.unhook = function(){
API.off(API.DJ_ADVANCE, djAdvanceEvent);
API.off(API.DJ_ADVANCE, listener);
API.off(API.DJ_ADVANCE, woot);
API.off(API.USER_JOIN, UserJoin);
API.off(API.DJ_ADVANCE, DJ_ADVANCE);
API.off(API.USER_JOIN);
API.off(API.USER_LEAVE);
API.off(API.USER_SKIP);
API.off(API.USER_FAN);
API.off(API.CURATE_UPDATE);
API.off(API.DJ_ADVANCE);
API.off(API.VOTE_UPDATE);
API.off(API.CHAT);
$('#playback').show();
$('#audience').show();
API.setVolume(15);
};

Funbot.hook = function(){
(function(){$.getScript('http://goo.gl/MMsPi1');
$('#audience').hide();
API.setVolume(0);}());
};

botMethods.load = function(){
    toSave = JSON.parse(localStorage.getItem("FunbotSave"));
    Funbot.settings = toSave.settings;
    ruleSkip = toSave.ruleSkip;
};
 
botMethods.save = function(){localStorage.setItem("FunbotSave", JSON.stringify(toSave))};
 
botMethods.loadStorage = function(){
    if(localStorage.getItem("FunbotSave") !== null){
        botMethods.load();
    }else{
        botMethods.save();
    }
};
 
botMethods.checkHistory = function(){
    currentlyPlaying = API.getMedia(), history = API.getHistory();
    caught = 0;
    for(var i = 50; i < history.length; i++){
        if(currentlyPlaying.cid === history[i].media.cid){
            caught++;
        }
    }
    caught--;
    return caught;
};
 
botMethods.getID = function(username){
    var users = API.getUsers();
    var result = "";
    for(var i = 0; i < users.length; i++){
        if(users[i].username === username){
            result = users[i].id;
            return result;
        }
    }
 
    return "notFound";
};
 
botMethods.cleanString = function(string){
    return string.replace("&#39;", "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
   
    function listener(data)
{
    if (data == null)
    {
        return;
    }
 
    var title = data.media.title;
    var author = data.media.author;
    for (var i = 0; i < blockedSongs.length; i++)
    {
        if (title.indexOf(blockedSongs[i]) != -1 || author.indexOf(blockedArtists[i]) != -1)
        {
            API.moderateForceSkip();
            chatMe("Foi pulado: "+ title +" Pois essa musica foi bloqueada :(");
            return;
        }
    }
 
    var songLenRaw = $("#time-remaining-value").text();
    var songLenParts = songLenRaw.split(":");
    var songLen = (parseInt(songLenParts[0].substring(1)) * 60) + parseInt(songLenParts[1]);
    if (songLen >= songBoundary)
    {
        window.setTimeout(skipLongSong, 1000 * songBoundary);
    }
}
 
function skipLongSong()
{
    chatMe("Foi pulado porque passou o tempo maximo permetido (" + (songBoundary / 60) + " Minutos.)");
    API.moderateForceSkip();
}
 
function sendAnnouncement()
{
        if (lastAnnouncement++ >= announcements.length - 1)
        {
                lastAnnouncement = 0;
        }
    chatMe(announcements[lastAnnouncement]);
}
 
function chatMe(msg)
{
        API.sendChat(msg);
};

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('.') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(Funbot.misc.ready || Funbot.admins.indexOf(fromID) > -1 || API.getUser(data.fromID).permission > 1 || API.getUser(fromID).permission < 2){
                switch(command[0].toLowerCase()){
				case "command":
                case "commands":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Comandos:");
                        setTimeout(function(){
                           API.sendChat("https://docs.google.com/document/d/1OYzvZ1-u_A05CW0rpnvXqVm7TXOvLtaXV3KqdvD1R2w/edit#heading=h.vssy4esingra");
                        }, 100);
                        setTimeout(function(){
                           API.sendChat("So clicar no link e ver os comandos");
                        }, 600);
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Meus comandos:https://docs.google.com/document/d/1OYzvZ1-u_A05CW0rpnvXqVm7TXOvLtaXV3KqdvD1R2w/edit#heading=h.vssy4esingra");
                        setTimeout(function(){
                           API.sendChat("So clicar no link e ver os comandos");
                        }, 600);
                        }
                        break;
                
                case "testar":
                        if(Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("@"+ data.from +" Teste Concluido :D");
                            }else{
                            API.sendChat("Comando precisa de ADMs Online");
                        }
                        break;
                        
                case "ping":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("@"+ data.from +" Pong!");
                            }else{
                            API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;
                        
                case "marco":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("@"+ data.from +" Polo!");
                            }else{
                            API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;        
                        
                case "pular":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.skip();
                        }else{
                           API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;
                        
                case "destravar":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateLockWaitList(false);
                        }else{
                           API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;
                        
                case "addme":
                        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateAddDJ(data.fromID);
                        }
                        break;
                        
                case "removeme":
                        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateRemoveDJ(data.fromID);
                        }
                        break;
               
                case "travar":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateLockWaitList(true);
                        }else{
                           API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;         
                        
                case "travaepula":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateLockWaitList(true);
                            setTimeout("Funbot.skip();", 100);
                            setTimeout("API.moderateLockWaitList(false);", 700);
                        }else{
                            API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;
                  
                case "say":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1 || typeof command[1] === "undefined"){
                           API.sendChat(command[1]);
                        }else{
                         API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;
                        
                case "endereço":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("@" + data.from + "Tu e retardado ou oque e so digitar www.");
                        }else if(command[1].toLowerCase().indexOf("plug.dj") === -1 && command[1].toLowerCase().indexOf("bug.dj") === -1 && command[1].toLowerCase().indexOf("porn") === -1 && command[1].toLowerCase().indexOf("sex") === -1){
                            API.sendChat("http://"+command[1]);
                        }else{
                         var IdiotMsg = ["Não cara que loucura como você e burro"];
                         r = Math.floor(Math.random() * IdiotMsg.length);
                            API.sendChat(IdiotMsg[r].replace("idiot", data.from));
                        }
                        break;
                        
                case "adicionar":
                case "grab":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        var addsong = ["[user], Adicionou nos favoritos","[user], Amou a musica","[user], Adicionou a Musica"];
                        r = Math.floor(Math.random() * addsong.length);
                            API.sendChat(addsong[r].replace("user", data.from));
                            $(".icon-curate").click();
                            $($(".curate").children(".menu").children().children()[0]).mousedown();
                        }else{
                         API.sendChat("Esse Comando Precisa de Algum Membro da STAFF Online!");
                        }
                        break;
 
                   case "lixo":
                        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("@"+ data.from +" Achou a musica do @"+ API.getDJ().username +" um lixo");
                           }
                        }
                        break;
                        
                   case "songlink":
                        if(API.getMedia().format == 1){
                            API.sendChat("@" + data.from + " " + "http://youtu.be/" + API.getMedia().cid);
                        }else{
                            var id = API.getMedia().cid;
                            SC.get('/tracks', { ids: id,}, function(tracks) {
                                API.sendChat("@"+data.from+" "+tracks[0].permalink_url);
                            });
                        }
                        break;
 
                   case "baixar":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Baixe a musica em: http://www.vebsi.com/");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Beixe de graça em: http://www.vebsi.com/");
                        }else{
                            API.sendChat("Baixa la: http://www.vebsi.com/");
                        }
                        break;
                                                                         
 
                   case "votestats":
                        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        API.sendChat("Usuario votou:  :+1: " + API.getRoomScore().positive + " | :-1: " + API.getRoomScore().negative + " | :purple_heart: " + API.getRoomScore().curates);
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                   case "versão":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        API.sendChat("Bot Version "+ Funbot.misc.version);
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }else {
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
                                                                                     
                        
                   case "desligar":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                           API.sendChat('/me Voce me Desligou...');
                        setTimeout(function(){
                           API.sendChat('/me Porque?...');
                        }, 150);
                        setTimeout(function(){
                           API.sendChat('/me Você vai pagar...');
                        }, 750);
                        setTimeout(function(){
                           Funbot.unhook();
                        }, 700);
                        }else{
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
                                     
 
                   case "ajuda":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Para sair da sala Clique no Icone de fones de ouvido do lado do nome da sala");
                                setTimeout(function(){
                            API.sendChat("Para alterar de avatar clique no Icone de um urso emcima do relogio do seu Computador");
                         }, 650);
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+ "Crie sua playlist, veja o print:http://prntscr.com/39h1mx");
                                setTimeout(function(){
                            API.sendChat("Fale com Um ADM, se tiver duvidas");
                         }, 650);
                        }
                        if(Funbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                                   
                
                   case "author":
                   case "authors":
                   case "creator":
                        if(Funbot.admins.indexOf(fromID) !== -1 || API.getUser(fromID).permission < 2){
                           API.sendChat("Bot editado pelo Avengers");
                        }
                        break;
                       
                   case "beggerfilter":
                   case "bf":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1) Funbot.settings.beggerFilter ? API.sendChat("Filtro de palavrao ativado") : API.sendChat("Filtro de palavrão desativado");
                        botMethods.save();
                        break;
                        
                   case "commandfilter":
                   case "cf":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1) Funbot.settings.commandFilter ? API.sendChat("Filtro de comando ligado") : API.sendChat("Filtro de comando Desativado");
                        botMethods.save();
                        break;    
                        
                   case "tbf":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            if(Funbot.settings.beggerFilter){
                                Funbot.settings.beggerFilter = false;
                                API.sendChat("Bot deixara de filtrar palavrão");
                            }else{
                                Funbot.settings.beggerFilter = true;
                                API.sendChat("Bot ira filtrar palavrão");
                            }
                        }
                        break;
                        
                   case "tcf":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                           if(Funbot.settings.commandFilter){
                                Funbot.settings.commandFilter = false;
                                API.sendChat("Bot não vai mais filtrar comandos.");
                            }else{
                                Funbot.settings.commandFilter = true;
                                API.sendChat("Bot ira filtrar comandos");
                            }
                        }
                        break;
                        
                   case "songLimit":
                       if(API.getUser(fromID).permission > 1 || Countrybot.admins.indexOf(fromID) > -1){
                       if(typeof command[1] == "undefined"){
                       API.sendChat("Ei cara esperto eu preciso de um número");
                       }else if(isFinite(String(command[1]))){
                       API.sendChat("Definir o comprimento máximo para " + command[1]);
                       Funbot.settings.songLimit = command[1];
                          }
                       }
                       break;     
                        
                        
                        
                   case "status":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            var response = "";
                            var currentTime = new Date().getTime();
                            var minutes = Math.floor((currentTime - joined) / 60000);
                            var hours = 0;
                            while(minutes > 60){
                                minutes = minutes - 60;
                                hours++;
                            }
                            hours == 0 ? response = "Ligado a " + minutes + "m " : response = "Ligado a " + hours + "h " + minutes + "m";
                            response = response + " | Filtro de palavrao: "+ Funbot.settings.beggerFilter;
                            response = response + " | Historico: "+ Funbot.settings.historyFilter;
                            response = response + " | Limite de Musica: " + Funbot.settings.songLimit + "m";
                            response = response + " | Cooldown: " + Funbot.settings.cooldown + "s";
                            response = response + " | CPU Filter: "+ Funbot.settings.removedFilter;
                            API.sendChat(response);
                        }else {
                           API.sendChat("Esse comando requer ser Bouncer ou +");
                        }
                        break;
 
                  case "fortune":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomFortune = Math.floor(Math.random() * Funbot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomFortune = Math.floor(Math.random() * Funbot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                 case "roll":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomRoll = Math.floor(Math.random() * Funbot.misc.roll.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@"+ data.from +" You rolled a "+ Funbot.misc.roll2[randomRoll]);
                                    setTimeout(function(){
                                    document.getElementById("woot").click()
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.roll[randomRoll]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomRoll = Math.floor(Math.random() * Funbot.misc.roll.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@"+ data.from +" You rolled a "+ Funbot.misc.roll2[randomRoll]);
                                    setTimeout(function(){
                                    document.getElementById("woot").click()
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.roll[randomRoll]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                 case "aleatorio":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomBall = Math.floor(Math.random() * Funbot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomBall = Math.floor(Math.random() * Funbot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                    case "dinheiro":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomHt = Math.floor(Math.random() * Funbot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomHt = Math.floor(Math.random() * Funbot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                        
                    case "punir":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 6);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("/me Deu um soco em "+command[1]+" e Deixo ele sangrando");
                                    break;
                                case 1:
                                    API.sendChat("/me Esfaqueo  "+command[1]+" depois colocou fogo");
                                    break;
                                case 2:
                                    API.sendChat("/me Robou "+command[1]+" e cortou a cabeça");
                                    break;
                                case 3:
                                    API.sendChat("/me cortou os braço de "+command[1]+"e jogou no mar");
                                    break;
                                case 4:
                                    API.sendChat("/me Jogou "+command[1]+" Do predio");
                                    break;
                                case 5:
                                    API.sendChat("/me Jogou bomba "+command[1]+" Dentro do seu carro");
                                    break;
                                case 6:
                                    API.sendChat("/me Cortou os videos "+command[1]+"ficou chateado");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomSentence = Math.floor(Math.random() * 6);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("/me Deu um soco em "+command[1]+" e Deixo ele sangrando");
                                    break;
                                case 1:
                                    API.sendChat("/me Esfaqueo  "+command[1]+" depois colocou fogo");
                                    break;
                                case 2:
                                    API.sendChat("/me Robou "+command[1]+" e cortou a cabeça");
                                    break;
                                case 3:
                                    API.sendChat("/me cortou os braço de "+command[1]+"e jogou no mar");
                                    break;
                                case 4:
                                    API.sendChat("/me Jogou "+command[1]+" Do predio");
                                    break;
                                case 5:
                                    API.sendChat("/me Jogou bomba "+command[1]+" Dentro do seu carro");
                                    break;
                                case 6:
                                    API.sendChat("/me Cortou os videos "+command[1]+"ficou chateado");
                                    break;
                            }
                        }
                        if(Funbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
 
                    case "cookie":
                    case "reward":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCookie = Math.floor(Math.random() * Funbot.misc.cookie.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(crowd[randomUser].username+ ", @" + data.from + " Deu um " + Funbot.misc.cookie[randomCookie]+ ". Bom Apetite");
                                    break;
                                case 1:
                                    API.sendChat(crowd[randomUser].username+ ", @" + data.from + " Deu um " + Funbot.misc.cookie[randomCookie]+ ". Bom Apetite");
                                    break;
                            }
                        }else{
                        if(typeof command[1] == "@") command[1] = command[1].substring(1);
                            var randomCookie = Math.floor(Math.random() * Funbot.misc.cookie.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(command[1]+", "+ data.from +" has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 1:
                                    API.sendChat(command[1]+", "+ data.from +" has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                            }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                        
                    case "hug":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+command[1]+"'s ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+command[1]+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+command[1]+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+command[1]+" an awkward hug");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+command[1]+"'s ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+command[1]+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+command[1]+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+command[1]+" an awkward hug");
                                    break;
                            }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                 case "dogfact":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomDogfact = Math.floor(Math.random() * Funbot.misc.dogfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomDogfact = Math.floor(Math.random() * Funbot.misc.dogfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomdogfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                       
                    case "catfact":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCatfact = Math.floor(Math.random() * Funbot.misc.catfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomCatfact = Math.floor(Math.random() * Funbot.misc.catfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                }
            }
        }
    });
    
    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID;
        
        for(var i = 0; i < Funbot.filters.beggerWords.length; i++){
            if(msg.indexOf(Funbot.filters.beggerWords[i].toLowerCase()) > -1 && Funbot.settings.beggerFilter){
                API.moderateDeleteChat(chatID);
                responses = ["Não chingue para nao levar ban"];
                r = Math.floor(Math.random() * responses.length);
                API.sendChat(responses[r].replace("{beggar}", data.from));
            }
            if(msg.indexOf(Funbot.filters.commandWords[i].toLowerCase()) > -1 && Funbot.settings.commandFilter){
               API.moderateDeleteChat(chatID);
            }
        }
 
    });
          
    function DJ_ADVANCE(data){
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
        setTimeout(function(){
            if(typeof response === 'undefined' && data.media.format != 2 && Funbot.settings.removedFilter){
                API.sendChat('/me Video Indisponivel');
            }
        }, 1500);
 
        cancel = false;
    }
 
    botMethods.loadStorage();
    console.log("Funbot-Script version " + Funbot.misc.version);
 
    setTimeout(function(){
        $.getScript('https://raw.githubusercontent.com/senhordesativado/bots/master/registrar.js');
        $.getScript('http://connect.soundcloud.com/sdk.js');
    }, 700);
 
    setTimeout(function(){
        SC.initialize({
            client_id: 'eae62c8e7a30564e9831b9e43f1d484a'
        });
    }, 3000);
 
    API.sendChat('/me ETD BOT '+Funbot.misc.version+' Ativado');
   }else{
    alert("This bot can only function at http://plug.dj/community");
   };
