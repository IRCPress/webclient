document.addEventListener(HOOKTYPE.QUIT, (e) =>
{
    var from = e.detail.from;
    var nicklistitems = document.getElementsByClassName("nicklist-user-"+from.name.toLowerCase());
    Array.from(nicklistitems).forEach((item) => {
        item.parentNode.removeChild(item);
    });
});
