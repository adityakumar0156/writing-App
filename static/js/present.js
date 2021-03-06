let global_result, music_code;
$.get(`https://writenshare.herokuapp.com/get/${obj_recived}`, (result) => { //getting html data from the server
    console.log("from:/get/id:", result);
    global_result = result;
    music_code = result.music;
    callback();
})
let div, mp3;
const callback = () => {
    div = document.createElement('div');
    div.innerHTML = global_result.data;
    // div.style.height = '100vh';
    document.getElementsByTagName('body')[0].innerHTML = `<div style="
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   border:2px solid black;
   font-size:140%;
   padding:10px;
   min-width:300px;
   border-radius:5px;
    "><b>Loading Content...</b></div>`

    if (music_code != 0) {
        mp3 = new Audio(`/static/media/mp3/${music_code}.mp3`);
        mp3.addEventListener('loadeddata', () => {
                console.log('loadeddata fired')
                document.getElementsByTagName('body')[0].innerHTML = `<button class="" onClick="play(this)" value="0" style="position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
               border:2px solid black;
               font-size:140%;
               padding:10px;
               min-width:300px;
               border-radius:5px;">View👀</button>
            <img class="cancelPreviewIcon-pre" value="0" id="tooglePreview" onClick="btn_toogle(this)" src="static/media/button_img/full-screen.png" alt="">`;


            })
            // mp3.play();

    } else {
        document.getElementsByTagName('body')[0].innerHTML = `<img class="cancelPreviewIcon-pre" id="tooglePreview" value="0" onClick="btn_toogle(this)" src="static/media/button_img/full-screen.png" alt="">`;

        document.getElementsByTagName('body')[0].append(div);
        document.getElementById('main_test').style.height = '100vh';
    }

}

const play = (val) => {
    val.remove();
    document.getElementById('tooglePreview').click();
    document.getElementsByTagName('body')[0].append(div);
    document.getElementById('main_test').style.height = '100vh';
    mp3.play();
}


var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}
// openFullscreen();

let flag = 1;

const btn_toogle = (val) => {
    if (flag == 1) {
        flag = 0;
        val.value = "0";
    }
    console.log(val);
    if (val.value == '0') {
        openFullscreen();
        val.value = '1';
        // val.innerHTML = `<img class="cancelPreviewIcon-pre" value="1" onClick="btn_toogle(this)" src="static/media/button_img/exit.png" alt="">`;
        val.src = `static/media/button_img/exit.png`;
    } else {
        closeFullscreen();
        val.value = '0';
        val.src = `static/media/button_img/full-screen.png`
            // val.innerHTML = `<img class="cancelPreviewIcon-pre" value="0" onClick="btn_toogle(this)" src="static/media/button_img/full-screen.png" alt="">`;


    }
}



let info;
$.get("https://ipinfo.io/json", (data, status) => {
    console.log("ip data:", data);
    info = data;
    console.log("get ip:", status);
    if (status === 'success') {
        callBack1();
    }
})

const callBack1 = () => {

    //################## Sending user info to Server ############
    // #########################################################
    $.post('/addme', {
        ip: info["ip"],
        city: info["city"],
        country: info["region"],
        country_code: info["country"],
        time: new Date().toLocaleString()
    }, (result) => {
        console.log("from /addme:", result);

    })

}
