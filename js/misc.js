
// Thanks to Talon
function mircToHtml(text) {
    // === CC var is a direct rip of $rgb($color(N)) converted to base 16. N is 0-99 for all 100 new colors added to mIRC.
    var cc = new Array("#FFFFFF","#000000","#00009D","#009300","#FF0000","#7F0000","#9C009C","#FC7F00","#FFFF00","#00FC00","#009393","#00FFFF","#0000FC","#FF00FF","#7F7F7F","#D2D2D2","#470000","#472100","#474700","#324700","#004700","#00472C","#004747","#002747","#000047","#2E0047","#470047","#47002A","#740000","#743A00","#747400","#517400","#007400","#007449","#007474","#004074","#000074","#4B0074","#740074","#740045","#B50000","#B56300","#B5B500","#7DB500","#00B500","#00B571","#00B5B5","#0063B5","#0000B5","#7500B5","#B500B5","#B5006B","#FF0000","#FF8C00","#FFFF00","#B2FF00","#00FF00","#00FFA0","#00FFFF","#008CFF","#0000FF","#A500FF","#FF00FF","#FF0098","#FF5959","#FFB459","#FFFF71","#CFFF60","#6FFF6F","#65FFC9","#6DFFFF","#59B4FF","#5959FF","#C459FF","#FF66FF","#FF59BC","#FF9C9C","#FFD39C","#FFFF9C","#E2FF9C","#9CFF9C","#9CFFDB","#9CFFFF","#9CD3FF","#9C9CFF","#DC9CFF","#FF9CFF","#FF94D3","#000000","#131313","#282828","#363636","#4D4D4D","#656565","#818181","#9F9F9F","#BCBCBC","#E2E2E2","#FFFFFF","inherit");
    var b = 0, u = 0, r = 0 , i = 0, s = 0, m = 0, bg = cc.length, fg = cc.length;

    // Remove the part that encodes HTML entities
    return text.replace(/(\x03(?:(?:\d\d?),)?(?:\d\d?)|[\x04](?:(?:[0-9A-Fa-f]{6}),)?(?:[0-9A-Fa-f]{6})|[\x02\x03\x04\x11\x16\x1d\x1e\x0f\x1f])([^\x02\x03\x04\x11\x16\x1d\x1e\x0f\x1f]*)/gu,function(match,control,string) {
        if (control == '\x03') { fg = bg = cc.length; } // Blank ctrl+k
        else if (control == '\x02') { b = !b } // ctrl+b (bold)
        else if (control == '\x1f') { u = !u }  // ctrl+u (underline)
        else if (control == '\x16') { var tmp = bg; bg = fg; fg = tmp; }  // ctrl+r (reverse)
        else if (control == '\x1d') { i = !i } // ctrl+i (italic)
        else if (control == '\x1e') { s = !s } // ctrl+e (strikethrough)
        else if (control == '\x11') { m = !m } // ctrl+q (monospace)
        else if (control == '\x0f') { b = u = r = i = s = m = 0; fg = bg = cc.length; } // ctrl+o (stop all control codes)
        else if (/^\x03/.test(control)) { // ctrl+k (color)
            var fgt = /^\x03(\d\d?)$/.exec(control), bt = /^\x03(\d\d?),(\d\d?)$/.exec(control);
            if (Array.isArray(fgt) && fgt.length > 0) { fg = parseInt(fgt[1]) + 0; }
            else if (Array.isArray(bt) && bt.length > 0) { fg = parseInt(bt[1]) + 0; bg = parseInt(bt[2]) + 0; }
        }
        else if (/^(?:\x04)/u.test(control)) { // ctrl+? (color RGB-hex)
            var fgt = /^[\x04]([0-9A-Fa-f]{6})$/.exec(control), bt = /^[\x04]([0-9A-Fa-f]{6}),([0-9A-Fa-f]{6})$/.exec(control);
            if (Array.isArray(fgt) && fgt.length > 0) { fg = fgt[1]; }
            else if (Array.isArray(bt) && bt.length > 0) { fg = bt[1]; bg = bt[2]; }
        }

        var style = (b ? 'font-weight:bold;' : '') + 
                    (u ? 'text-decoration:underline;' : (s ? 'text-decoration:line-through;' : '')) + 
                    (i ? 'font-style:italic;' : '') + 
                    (m ? 'font-family:monospace;' : '') + 
                    (bg < cc.length || (bg && isNaN(bg)) ? 'background-color:' + (isNaN(bg) ? "#" + bg : cc[bg]) + ';' : '') + 
                    (fg < cc.length || fg.length == 6 ? 'color:' + (fg.length == 6 ? "#" + fg : cc[fg]) + ';' : '');
                    
        if (!style) {
            return string;
        } else {
            return "<span style=\"" + style + "\">" + string + "</span>";
        }
    });
}

function Escape(string)
{
    string = specialEscape(string);
    string = mircToHtml(string);
    

    return string;
}

function getElementsByIdRegex(startswith, endswith = null)
{
    var arr = [];
    var str = '[id^="'+startswith+'"]';
    str += endswith ? '[id$="'+endswith+'"]' : '';
    
    Array.from(
        document.querySelectorAll('[id^="edit-tid"][id$="-view"]'))
        .forEach(function (x) { 
           arr.push(x); 
        }
    );

    return arr;
}

function string_starts_with(string, string2)
{
    return string.substring(0, string2.length) == string2;
}

function string_ends_with(string, string2)
{
    let len = '-' + string2.length + 1;
    return string.substring(len, string2.length) == string2;
}

function IsCtcp(string)
{
    if (string_starts_with(string,'\u0001') && string_ends_with(string,'\u0001'))
        return true;
    return false;
}

function doMiddleBubbble(msg)
{
    writeToScreen(
        `<div style="color:var(--qtpi-greydient)" class="text-center">
            <div class="btn btn-dark rounded">
                <i>`+msg+`</i>
            </div>
        </div>`
    );
}


function countryCodeToEmoji(countryCode) {
    const codePoints = [...countryCode.toUpperCase()].map(char => 
        char.charCodeAt(0) + 127397
    );
    return String.fromCodePoint(...codePoints);
}

function findAndGenerateImageHTML(inputString) {
    // Get the current domain (hostname)
    const currentDomain = window.location.hostname;

    // Define the regular expression to match URLs
    const urlRegex = /https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/g;

    // Find all URLs in the input string
    const urls = inputString.match(urlRegex);

    // Check if any URLs are found
    if (!urls) {
        return null; // No URLs found
    }

    // Define the allowed still image formats (excluding GIFs)
    const allowedImageExtensions = ['jpeg', 'jpg', 'png', 'webp', 'bmp'];

    // Loop through URLs and find the first valid image on the current domain
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        // Parse the URL to get the domain and path
        const urlObj = new URL(url);

        // Check if the URL is on the current domain and is using HTTPS
        if (urlObj.hostname === currentDomain && urlObj.protocol === 'https:') {
            // Check if the URL ends with one of the allowed image formats
            const extension = urlObj.pathname.split('.').pop().toLowerCase();
            if (allowedImageExtensions.includes(extension)) {
                // Return an HTML string containing an <img> tag
                return `<img src="${url}" alt="Image" onclick="window.open('${url}', '_blank')" class="embedded-chat-image" style="cursor: pointer;">`;
            }
        }
    }

    return null; // No valid image URL found
}

function splitMessageIntoChunks(message, maxLength = 400) {
    const words = message.split(' ');
    let chunks = [];
    let currentChunk = '';

    words.forEach(word => {
        // Check if adding the next word would exceed the max length
        if ((currentChunk + word).length + 1 <= maxLength) {
            // If the current chunk is not empty, add a space before appending the word
            currentChunk += (currentChunk ? ' ' : '') + word;
        } else {
            // If the current chunk exceeds the length, push it to the chunks array
            chunks.push(currentChunk);
            // Start a new chunk with the current word
            currentChunk = word;
        }
    });

    // Push the last chunk if it's not empty
    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}


function copyToClipboard(str)
{
    let clip2check = document.querySelector(`span[class~="clipboard-icon"][data-filename="${str}"]`);
    let original = clip2check.innerHTML;
    clip2check.innerHTML = `<i class="fa-solid fa-check"></i>`;
    setTimeout(() => { clip2check.innerHTML = original; }, 3000);
    return navigator.clipboard.writeText(str);
}