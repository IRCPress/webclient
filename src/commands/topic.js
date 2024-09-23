
document.addEventListener(HOOKTYPE.TOPIC, (e) =>
{   // are we joining or is someone else
    console.log(e.detail);
    var tok = e.detail.param[0].split(" ");
    var topic = e.detail.parvstring;
    var chan = tok[tok.length - 1].substring(1);
    Channel.newTopic(chan,topic);

});