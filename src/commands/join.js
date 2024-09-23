document.addEventListener(HOOKTYPE.JOIN, (e) =>
{   // are we joining or is someone else
    console.log(e.detail);
    var tok = e.detail.param[0].split(" ");
    var from = e.detail.from;
    
    let chan = tok[tok.length - 2].substring(1);
    // it's us
    if (e.detail.from.name == me.name)
    {
        Channel.addNew(chan); // add a channel
        doSend("WHO #"+chan+" %chunfar");
        doSend("METADATA #"+chan+" GET theme");
        doSend("CHATHISTORY LATEST #"+chan+" * 500");
        rememberJoin(tok[tok.length-2]);
    }
    else {
        let client = {
            "chan": tok[2],
            "ident": from.name,
            "host": from.host,
            "name": from.name,
            "status": "H",
            "account": e.detail.mtags.account,
            "realname": e.detail.parvstring
        };
        Channel.addNewUser(client);
        doSend("METADATA "+client.name+" get avatar theme");
    }
});

document.addEventListener(HOOKTYPE.WHOX, (e) =>
{
    console.log(e.detail);
    
    let who = e.detail;
    let realname = who.param[1];
    let parv = who.param[0].split(' ');
    let client = {
        "chan": parv[3],
        "ident": parv[4],
        "host": parv[5],
        "name": parv[6],
        "status": parv[7],
        "account": parv[8],
        "realname": realname,
    };
    doSend("METADATA "+client.name+" get avatar theme");
    // TODO: now add the user to nicklist
    Channel.addNewUser(client);
});


function rememberJoin(chan)
{
    
}