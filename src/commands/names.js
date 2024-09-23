document.addEventListener(HOOKTYPE.NAMES, (e) =>
{
    console.log(e.detail);
    var tok = e.detail.param[0].split(" ");
    
    // // it's us
    // if (e.detail.from.name == me.name)
    //     me.name = e.detail.parvstring; // add a channel
    
     
});