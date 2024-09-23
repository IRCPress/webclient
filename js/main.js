// globals
var output = document.getElementById("output");
// Client-side code to fetch the token from the server-side API
async function getAuthToken() {
    try {
        const response = await fetch('/wp-json/unrealircd/v1/otp', {
            method: 'GET',
            credentials: 'same-origin'  // Ensures cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();
            if (data.token) {
                console.log('Token:', data.token);
                // You can now send this token to IRC or use it in your app
                doSend("AUTHENTICATE "+data.token);
            } else {
                console.error('Token not found:', data);
            }
        } else {
            console.error('Error fetching token:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getAboutMe() {
    try {
        const response = await fetch('/wp-json/unrealircd/v1/aboutme', {
            method: 'GET',
            credentials: 'same-origin'  // Ensures cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();
            if (data.about.avatar) {
                doSend("METADATA * set avatar :"+data.about.avatar);
                addUserAvatarCss(me.name, data.about.avatar);
            }
            if (data.about.theme) {
                doSend("METADATA * set theme :"+data.about.theme);
                addUserThemeCss(me.name, data.about.theme)
            }
            if (data.about.display_name)
            {
                me.display_name = data.about.display_name;
            }
        } else {
            console.error('Error fetching info:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function doSasl()
{
	
	doSend("AUTHENTICATE OTP");
	getAuthToken();
	
}

var servercmds = [];
var servercaps = [];


// function setConnectButton(i = 0)
// {
// 	let submit = document.getElementById("submit");
	
// 	let value = i ? "Connect" : "Disconnect";
// 	let onclick = function(){
// 		submit.value = i ? "Disconnect" : "Connect";
// 		submit.classList.replace(i ? 'btn-success' : 'btn-danger', i ? 'btn-danger' : 'btn-success');
// 		submit.onclick = i ? quit : connectWebSocket;
// 		quit();
// 	}

// 	submit.value = value;
// 	submit.onclick = onclick;
	
// } 

window.addEventListener('resize', function() { output.scrollTop = output.scrollHeight } );


function addUserAvatarCss(nick, link)
{
    nick = nick.toLowerCase();
    let current = document.getElementById(nick+'-avatar-css');
    if (current)
        document.head.removeChild(current);
    let style = document.createElement('style');
    style.id = nick+"-avatar-css";
    style.innerText = "."+nick+"-avatar { background: url("+link+"); background-size: cover; }";
    document.head.append(style);
}
function addUserThemeCss(nick, link)
{
    nick = nick.toLowerCase();
    let current = document.getElementById(nick+'-theme-css');
    if (current)
        document.head.removeChild(current);
    let style = document.createElement('style');
    style.id = nick+"-theme-css";
    style.innerText = `
    .nicklist-user-`+nick+` {
        background: url(`+link+`);
        background-size: cover; 
    }`;

    document.head.append(style);
}
function addChannelThemeCss(chan, theme)
{
    let name = chan.substring(1);
    console.error(name + "-chan-block");
    let chanBlock = document.getElementById(name + "-chan-block");
    chanBlock.removeAttribute('class');
    chanBlock.classList.add('btn', 'btn-secondary', 'window-window', 'channel-button');
    chanBlock.classList.add('theme', 'theme-'+theme.toLowerCase());

    let output = document.getElementById(name+'-channel-output');
    output.removeAttribute('class');
    output.classList.add('output', 'bg-nihao');
    output.classList.add('theme', 'theme-'+theme.toLowerCase());
}

function focusOnInput()
{
    let input = document.getElementById('input');
    input.focus();
    input.select();
}

function ProfilePreview(e)
{
    let theme = document.getElementById('profile-view-theme');
    let avatar = document.getElementById('profile-avatar-view');
    let nick = e.getAttribute('irc-nick');
    let displayName = document.getElementById('profile-view-nick');
    let chanslist = document.getElementById('profile-view-channels');

    // (re-)initialize the modal
    theme.removeAttribute("class");
    theme.classList.add("nicklist-theme", "profile-view-theme", "nicklist-user-"+nick.toLowerCase());
    
    avatar.removeAttribute("class");
    avatar.classList.add("profile-avatar-view", nick.toLowerCase()+"-avatar")

    displayName.removeAttribute('class');
    displayName.classList.add('profile-view-nick');
    displayName.innerHTML = "<div class='badge text-white bg-secondary'>"+nick+"</div>";

    chanslist.innerHTML = null;
    
    doSend("WHOIS "+nick+" "+nick);
    me.currentWhois = nick;
    console.log(e);
}

function resolveLinkToEmbed(urlInput, msgid)
{
    let content = null;
    fetch(`/wp-json/unrealircd/v1/embed?url=${encodeURIComponent(urlInput)}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error fetching the URL info:', data.error);
        } else {
            let about = data.about;
            let title = about.title;
            let favicon = about.favicon;
            let excerpt = about.excerpt;
            let url = about.url;
            if (title.substring(0,4) == "ÿØÿà" || excerpt.substring(0,4) == "ÿØÿà")
            {
                title = "Link to an image";
                excerpt = url;
            }

            

            // Create the embedded link
            let htmlContent = `
                <div class="embed-content">
                    <a href="${url}" target="_blank" style="text-decoration: none; color: inherit;">
                        <div style="display: fit-content; align-items: center;">
                            <img src="${favicon}" alt="Favicon" style="width: 32px; height: 32px; margin-right: 10px;" onerror="this.style.display='none'">
                            <div>
                                <h5 style="margin: 0;">${title}</h5>
                                <p style="margin: 5px 0;">${excerpt}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            let msg = document.getElementById(msgid);
            let msgContent = msg.querySelector("#message_contents");
            msgContent.innerHTML += htmlContent;
            let o = msg.closest('.output');
            setTimeout(scrolldown(o), 1000);
        }
        
    })
    .catch(error => {
        console.error('Error fetching the URL info ('+urlInput+'):', error);
    });
    return content;
}

function scrolldown(o = output)
{
    o.scrollTop = o.scrollHeight;
}