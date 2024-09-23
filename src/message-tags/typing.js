

class TypingTags {
    static loc = {};
}

input.addEventListener('keydown', e => {
    if (e.keyCode >= 32 && e.keyCode <= 126)
    {
        var value = document.getElementById("input").value;
        if (value[0] && value[0] == "/")
            return;
        sendTyping(Channel.active);
    }
});


function sendTyping(dest)
{
    var now = Date.now() / 1000;
    if (TypingTags.loc[dest])
    {
        if (now - TypingTags.loc[dest] < 3)
            return;
    }
    var mtags = new MessageTags();
    mtags.add("+typing","active");
    send_to(dest, mtags);
    TypingTags.loc[dest] = now;
}