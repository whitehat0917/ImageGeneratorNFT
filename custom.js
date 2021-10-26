let genBtn = document.getElementById("gen-btn");
let dlBtn = document.getElementById("dl-btn");
let logBtn = document.getElementById("log-btn");
let genCanvas = document.getElementById("gen-canvas");
// The ctx (context) has drawing functions for the canvas
let genCanvasCtx;
let avatarHash;
let categoryVers = {};
let totalName = '';


String.prototype.hashCode = function() {
    let hash = 0;
    for (i = 0; i < this.length; i++) {
        hash += this.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }
    return (hash % 10000000).toString(16).toUpperCase().padStart(6, "0");
};


function initGenCanvas() {
    // 17 : 20 ratio
    genCanvas.width = 850;
    genCanvas.height = 1000;
    // genCanvas.width = 425;
    // genCanvas.height = 500;

    genCanvasCtx = genCanvas.getContext("2d");
    genCanvasCtx.textAlign = "center";
    genCanvasCtx.fillStyle = "white";
    genCanvasCtx.font = (genCanvas.height/500 * 32) + "px Monospace";
}


genBtn.onclick = function(event) {
    setInterval(autoGenerate, 1500);
}

function autoGenerate(){
    generateAvatar();
    setTimeout(downloadData, 1200);
}

function downloadData(){
    let link = document.createElement("a");
    link.download = avatarHash + ".png";
    totalName += link.download + ",";
    link.href = genCanvas.toDataURL();
    link.click();
    link.delete;
}


function generateAvatar() {
    // Clear canvas every new generate
    genCanvasCtx.clearRect(0, 0, genCanvas.width, genCanvas.height);

    allCategories.forEach((category) => categoryVers[category] = "000");

    // Some img categories don't go together
    // Loop through conflicting categories from lowest to highest spawn chance
    // If a conflicting category was already picked, skip the current one
    let imgPicks = [];
    for (const [key, val] of Object.entries(pickChances)) {
        const exclude = excludeCategories[key].some(e => imgPicks.includes(e));
        if (!exclude && Math.random() <= val)
            imgPicks.push(key);
    }

    let imgPaths = pickImgPaths(imgPicks);

    // Load images asynchronously for speed and to draw them in order
    Promise
        .all(imgPaths.map(i => loadImg(i)))
        .then(imgsLoaded)
        .catch((err) => {
            console.error(err);
        });
}


// Make an array with random versions of all categories that aren't excluded (imgPicks)
function pickImgPaths(imgPicks) {
    // Randomly choose a body and head
    let bodyPath = "Body " + getRandomInt(dirCounts["Body"]) + "/";
    let headPath = "Head " + getRandomInt(dirCounts["Head"]) + "/";

    // The order of pushing is also the order of drawing
    let imgPaths = [];
    imgPaths.push(getRandomPath("", "Backgrounds", "BG-", "jpg"));

    imgPaths.push(getRandomPath(bodyPath, "Body", "Body-"));
    imgPaths.push(getRandomPath(bodyPath, "Bottoms", "Bottom-"));
    if (imgPicks.includes("Tattoos"))
        imgPaths.push(getRandomPath(bodyPath, "Tattoos", ""));
    if (imgPicks.includes("Tops"))
        imgPaths.push(getRandomPath(bodyPath, "Tops", "Top-"));
    if (imgPicks.includes("Chains"))
        imgPaths.push(getRandomPath(bodyPath, "Chains", ""));
    if (imgPicks.includes("Wounds"))
        imgPaths.push(getRandomPath(bodyPath, "Wounds", ""));
        
    imgPaths.push(getRandomPath(headPath, "Head", "Head-"));
    if (imgPicks.includes("Face Tats"))
        imgPaths.push(getRandomPath(headPath, "Face Tats", "FTat-"));
    imgPaths.push(getRandomPath(headPath, "Eyebrows", "EyeBrows-"));
    if (imgPicks.includes("Eyes"))
        imgPaths.push(getRandomPath(headPath, "Eyes", "Eyes-"));
    imgPaths.push(getRandomPath(headPath, "Nose", "Nose-"));
    if (imgPicks.includes("Mouth"))
        imgPaths.push(getRandomPath(headPath, "Mouth", "Mouth-"));
    if (imgPicks.includes("Hair"))
        imgPaths.push(getRandomPath(headPath, "Hair", "Hair-"));
    if (imgPicks.includes("Facial Hair"))
        imgPaths.push(getRandomPath(headPath, "Facial Hair", "FacialHair-"));
    if (imgPicks.includes("Hats"))
        imgPaths.push(getRandomPath(headPath, "Hats", "Hat-"));
    if (imgPicks.includes("Glasses"))
        imgPaths.push(getRandomPath(headPath, "Glasses", "Glasses-"));
    if (imgPicks.includes("Partial Masks"))
        imgPaths.push(getRandomPath(headPath, "Partial Masks", "Mask-"));
    if (imgPicks.includes("Bubblegum"))
        imgPaths.push(getRandomPath(headPath, "Bubblegum", "Bubblegum-"));
    if (imgPicks.includes("Full Masks"))
        imgPaths.push(getRandomPath(headPath, "Full Masks", "Mask-"));
    if (imgPicks.includes("Laser Eyes"))
        imgPaths.push(getRandomPath(headPath, "Laser Eyes", "Eyes-"));
        
    imgPaths.push(getRandomPath("", "Board behind Hands", "Board-"));
    imgPaths.push(getRandomPath("", "Hands", "Hand-"));

    return imgPaths;
}


// Get a random int between 1 and max (inclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}


// Get a random path of the given category
function getRandomPath(path, dir, nameStart, fileType="png") {
    let imgNum = getRandomInt(imgCounts[path + dir]);
    let nameEnd = ("000"+imgNum).substr(-3);
    categoryVers[dir] = nameEnd;
    let imgPath = `imgs/${path}${dir}/${nameStart}${nameEnd}.${fileType}`;
    return imgPath;
}


// Make a HTML img object with imgPath as the src
// Returns a Promise for asynchronous loading of multiple images
function loadImg(imgPath) {
    return new Promise((resolve, reject) => {
        let img = new Image();

        img.onload = function() {
            resolve(img);
        }

        img.addEventListener("error", (err) => {
            reject(err);
        });

        img.src = imgPath;
    });
}


function imgsLoaded(imgs) {
    avatarHash = Object.values(categoryVers).join("").hashCode();
    
    imgs.forEach((img) => {
        genCanvasCtx.drawImage(img, 0, 0, genCanvas.width, genCanvas.height);
        if (img.src.includes("Board-"))
            genCanvasCtx.fillText("#" + avatarHash, genCanvas.width/2, genCanvas.height/10*8);
    });
}


dlBtn.onclick = function(event) {
    // A HTML link needs to be created and clicked
    // This is a browser security limitation
    let link = document.createElement("a");
    link.download = avatarHash + ".png";
    totalName += link.download + ",";
    link.href = genCanvas.toDataURL();
    link.click();
    link.delete;
}

logBtn.onclick = function(event) {
    console.log(totalName)
}



// Page initialization
initGenCanvas();
generateAvatar();