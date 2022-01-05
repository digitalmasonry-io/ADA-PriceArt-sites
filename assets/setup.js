var pair = "ADA/USD";
var colorAttribute;
var startColor, endColor;
var dO, dH, dL, dC, dDate, dColor, mod1, mod2, NFTnum, timeType, rank;
var bgDark;
var bgRed;
var bgPurple;
var bgTrees;
var pg;
var wStart = 1;
var emitter;
var img;
var myShader;
var simpleShader;
var up1;
var up2;
var up3;
var down1;
var down2;
var down3;
var kMax = 10;
var scaleMax = 2;
var r1Min;
var logo;
var logoLocale = -0.004;
var logoSpeed = 0.004;
var logoTrademark;
var button;
var buttonZoom;
var buttonRefresh;
var buttonAlpha;
var buttonPause;
var buttonReset;
var buttonQuestion;
var logo3D;
var rotateLogo = 1;
var myFont;
var clickState;
var clicked;
var spinSpeed;
var clickedMap;
var released;
var clickAlpha;
var clickStroke;
var bigLogo = false;
var transCand = false;
var rKey = false;
var paused = false;
var help = false;
var start1 = 0;
var start2 = 0;
var start3 = 0;
var start4 = 0;
var start5 = 0;
var inc;
var textColor;
var textSat;
var textBright;
var dirColor;
var isRecording = false;
var message = false;
var timeToWait;

p5.disableFriendlyErrors = true; // disables p5 FES
function preload() {
    rank = dataFile['%rank'];
    timeType = dataFile.timeType;

    myFont = loadFont("https://arweave.net/-hnQ1l6qi8W82XdVBX0-cWatpQcLbN5TZ6-MRKHilRc");
    logoTrademark = loadImage("assets/trademark.png");
    logo3D = loadModel("assets/ada3d.obj", true);
    myShader = loadShader("assets/percentshader.vert", "assets/percentshader.frag");

    if (timeType === "Year") {
        moon = loadImage("https://ttqgnttfnndtg3j7n7zrmasnylbaqhaaodeilbmrocwh4qthkiga.arweave.net/nOBmzmVrRzNtP2_zFgJNwsIIHABwyIWFkXCsfkJnUgw");
    } else if (timeType === "Month") {
        jupiter = loadImage("https://dhalxzx7mnh5f2dlv5iibm3eeo6nf2lotuecvceil3aisoumj4na.arweave.net/GcC75v9jT9Loa69QgLNkI7zS6W6dCCqIiF7AiTqMTxo");
    } else if (timeType === "Week") {
        planetary = loadImage("https://5tztkp2mjzl5lzw4wl7fxbm6dyprxwv5hqk6mbkky7gnb4jos75a.arweave.net/7PM1P0xOV9Xm3LL-W4WeHh8b2r08FeYFSsfM0PEul_o");
    } else if (timeType === "Day") {
        venus = loadImage("https://wotozhykyzlgeue26aptfp6vqx6hrjgmrhox7d23hag5ntvvfdpa.arweave.net/s6bsnwrGVmJQmvAfMr_Vhfx4pMyJ3X-PWzgN1s61KN4");
    } else {
        neptune = loadImage("https://7zvixs7g3i4dbqdedet526vaheeihwf3v5w7nylt77oi32sbri2a.arweave.net/_mqLy-baODDAZBkn3XqgOQiD2Luvbfbhc__cjepBijQ");
    }
    if (rank === "bottom 20-10%") {
        down1 = loadImage("https://qgqbkujck7ljk5wcdshbrwrn5ddtc5mdjdn2aptqkaerwaxkxw2a.arweave.net/gaAVUSJX1pV2whyOGNot6McxdYNI26A-cFAJGwLqvbQ");
    } else if (rank === "bottom 10-2%") {
        down2 = loadImage("https://a27fi4qrhpuhz4lonzado4ytrhndcwpdwf5iizzueltnwq7ramma.arweave.net/Br5UchE76Hzxbm5AN3MTidoxWeOxeoRnNCLm20PxAxg");
    } else if (rank === "bottom 2%") {
        down3 = loadImage("https://lu3jhlxx4wnjknjoywjxgowwearnkgkk7h5lzxrl25jknijdjrxa.arweave.net/XTaTrvflmpU1LsWTczrWICLVGUr5-rzeK9dSpqEjTG4");
    } else if (rank === "top 20-10%") {
        up1 = loadImage("https://fowyqquowcpmynfhs4uhk45w35rurtnnvhushnwj327tc3rfkqma.arweave.net/K62IQo6wnsw0p5codXO232NIza2p6SO2yd6_MW4lVBg");
    } else if (rank === "top 10-2%") {
        up2 = loadImage("https://axzp6e4deb4qnbygd5cwpo6qgab7nxlbbs7vz4zdm2rxa2o2qhia.arweave.net/BfL_E4MgeQaHBh9FZ7vQMAP23WEMv1zzI2ajcGnagdA");
    } else {
        up3 = loadImage("https://gtiafqa4c6bwq5xr6bnfaxjslp4rltm2evztua64pzkriorjazma.arweave.net/NNACwBwXg2h28fBaUF0yW_kVzZolczoD3H5VFDopBlg");
    }
}
var metaDataNames = ['NFT #', 'Type', 'Date', '% Rank', 'Color', 'Loop Mod', 'Shape Mod'];

var isIPadPro = /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
window.mobileCheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
var cnv;

function setup() {

    cnv = createCanvas(1000, 1000, WEBGL);

    // Scale canvas
    if (window.innerWidth > 1000) {
        document.querySelector('canvas').style.height = `${innerHeight - 150}px`;
        document.querySelector('canvas').style.width = `${innerHeight - 150}px`;

    } else if (window.mobileCheck()) {
        pixelDensity(1);
        // alert('Use desktop for best experience.')
        document.querySelector('canvas').style.height = `${innerWidth - 70}px`;
        document.querySelector('canvas').style.width = `${innerWidth - 70}px`;
    } else {
        document.querySelector('canvas').style.height = `${innerWidth  - 210}px`;
        document.querySelector('canvas').style.width = `${innerWidth  - 210}px`;
    }
    cnv.parent(document.querySelector('#canvas-and-metadata'));
    colorMode(HSB, 359, 100, 100, 1);
    textFont(myFont);
    setTimeout(timeOutPause, 300000);

    dO = dataFile.open;
    dC = dataFile.close;
    dL = dataFile.low;
    dH = dataFile.high;
    dDate = dataFile.date;
    dColor = dataFile.color;
    mod1 = dataFile.mod1;
    mod2 = dataFile.mod2;
    rank = dataFile['%rank'];
    NFTnum = dataFile["NFT#"];
    timeType = dataFile.timeType;


    var parentElement = document.querySelector('#settings');



    buttonReset = createButton("<span class='material-icons'>loop</span>");
    buttonReset.mousePressed(pageRefresh);
    buttonReset.style("font-size", "15px");
    buttonReset.style("background-color", 100);

    buttonReset.parent(parentElement);
    if (window.innerWidth > 1000 && !isIPadPro) {
        button = createButton("<span class='material-icons'>file_download</span>");
        button.mousePressed(saveImage);
        button.style("font-size", "15px");
        button.style("background-color", 100);
        button.parent(parentElement);
    }
    buttonPause = createButton("<span class='material-icons'>pause</span>");
    buttonPause.mousePressed(pause);
    buttonPause.addClass('button-pause');
    buttonPause.style("font-size", "15px");
    buttonPause.style("background-color", 100);
    buttonPause.parent(parentElement);

    buttonZoom = createButton("<span class='material-icons'>zoom_in</span>");
    buttonZoom.mousePressed(logoZoom);
    buttonZoom.style("font-size", "15px");
    buttonZoom.style("background-color", 100);
    buttonZoom.parent(parentElement);

    buttonAlpha = createButton("<span class='material-icons'>view_in_ar</span>");
    buttonAlpha.mousePressed(transparentCandle);
    buttonAlpha.style("font-size", "15px");
    buttonAlpha.style("background-color", 100);
    buttonAlpha.parent(parentElement);

    buttonRefresh = createButton("<span class='material-icons'>wallpaper</span>");
    buttonRefresh.mousePressed(rButton);
    buttonRefresh.style("font-size", "15px");
    buttonRefresh.style("background-color", 100);
    buttonRefresh.parent(parentElement);

    function timeOutPause() {
        if (!isRecording) {
            paused = true;
            document.querySelector('.button-pause').innerHTML = '<span class="material-icons">play_arrow</span>';
        }
    }
    document.getElementById("help-button").style.display = "flex";


}

function saveImage() {
    save(`${dDate} ADAUSD.png`);
}

function logoZoom() {
    if (!bigLogo) {
        bigLogo = true;
    } else {
        bigLogo = false;
    }
}

function pageRefresh() {
    window.location.reload();
}

function transparentCandle() {
    if (!transCand) {
        transCand = true;
    } else {
        transCand = false;
    }
}

function keyPressed() {
    if (key === 'r' && !rKey) {
        rKey = true;
    } else {
        rKey = false;
    }
}

function rButton() {
    if (!rKey) {
        rKey = true;
    } else {
        rKey = false;
    }
}

function checkLoop() {
    if (this.checked()) {
        loop();
    } else {
        noLoop();
    }
}



function pause() {
    if (!paused) {
        paused = true;
        document.querySelector('.button-pause').innerHTML = '<span class="material-icons">play_arrow</span>';
        noLoop();

    } else {
        paused = false;
        document.querySelector('.button-pause').innerHTML = '<span class="material-icons">pause</span>';
        loop();
    }
}

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}