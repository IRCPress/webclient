document.addEventListener(HOOKTYPE.WELCOME, (e) =>
{
    var welcome = e.detail;
    doSend("METADATA * SUB theme");
    me.connected = 1;
     
});