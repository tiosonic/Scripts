//Paste this in your console or use an bookmark, type /check @username in the chat to check the relationship

function command(e){if(e.indexOf("/verificar")>=0){check(e)}}function check(e){var t=e.substr(8).trim();var n=API.getUsers();for(var r=0;r<n.length;r++){if(n[r].username==t){var i=r;break}}if(i!=null){var s=n[i].relationship;switch(s){case 0:API.chatLog("Não há nenhuma relação entre você e "+n[i].username);break;case 1:API.chatLog(n[i].username+" É seu fã ");break;case 2:API.chatLog("Você é fã de "+n[i].username+" Mas ele não é seu fã! ");break;case 3:API.chatLog("Você é fã de "+n[i].username+", and he/she is your fan");break;default:break}}else{API.chatLog(":warning: Usuario não encontrado :warning:",false)}}API.on(API.CHAT_COMMAND,command)
