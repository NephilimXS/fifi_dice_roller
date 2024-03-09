//dice roll sfx
let beat = new Audio('dice-roll-2.mp3')
var user; //placeholder

//define sticker URLs for each #
let stickers = {
    "1": "https://cdn.discordapp.com/attachments/1180151305952579704/1215727101156663448/bongo.gif?ex=65fdcd18&is=65eb5818&hm=0b2af487da465880fc3de0b4a22e26413e21e459c587315b717e275c87f585ba&",
    "2": "https://cdn.discordapp.com/attachments/1180151305952579704/1215747078916145172/fifi3.png?ex=65fddfb3&is=65eb6ab3&hm=aef8899dfb9d300f0dfc85e34664437112cd2242c40fb40b3deddaf19fefa9da&",
    "3": "https://cdn.discordapp.com/attachments/1180151305952579704/1215748312037199952/sticker-sheet.webp?ex=65fde0d9&is=65eb6bd9&hm=bf1b0fb926f292d93aae887dd800d2d692604efb3f5228d6ef47cdb8a1afcf01&",
    "4": "https://cdn.discordapp.com/attachments/1180151305952579704/1215746854525075546/scuffed_dragon.jpg?ex=65fddf7d&is=65eb6a7d&hm=ab29eedc31ec8067a0531677b2ec8bce42ae1712a096dcb64b2e9e1319b14807&",
    "5": "https://cdn.discordapp.com/attachments/1215474093701341314/1215824523434135603/subathon_2024_sticker.png?ex=65fe27d3&is=65ebb2d3&hm=43d04481c7d38913987286ec6fe9fc0cec3d638e7b7aa361f6ae3ca9cb3694b7&",
    "6": "https://cdn.discordapp.com/attachments/1180151305952579704/1215746320497774703/fifi_sit_flower_sticker_2024.png?ex=65fddefe&is=65eb69fe&hm=6e56e487e4f58c8ae8318f67d5e5427a23b36aa3b76c67cf70d6389fcfff4e7b&" 
}

/** Dice Roll Functions *************************************************************/
function rollDice() {
    
    const result = Math.floor(Math.random() * 6) + 1;
    const dice = document.getElementById("dice");

    // Ensure at least one full rotation along both axes
    let xEnd = 720 * (Math.floor(Math.random() * 2) + 1); // 1 or 2 rotations on X
    let yEnd = 720 * (Math.floor(Math.random() * 2) + 1); // 1 or 2 rotations on Y

    // Add additional rotation to align the result face up
    switch (result) {
        case 1:
            // No additional rotation needed for face 1
            break;
        case 2:
            xEnd += 180; // Face 2 opposite to face 1
            break;
        case 3:
            yEnd -= 90; // Face 3 is 90 degrees from face 1
            break;
        case 4:
            yEnd += 90; // Face 4 is -90 degrees from face 1
            break;
        case 5:
            xEnd -= 90; // Face 5 is 90 degrees on X from face 1
            break;
        case 6:
            xEnd += 90; // Face 6 is -90 degrees on X from face 1
            break;
    }
    document.getElementById("dice-roll").play();
    dice.style.transform = `rotateX(${xEnd}deg) rotateY(${yEnd}deg)`;

    submitData(user,result,stickers[result],getCurrentTimestamp());
}

/**  GOOGLE SHEET Functions *************************************************************/
function submitData(user,result,sticker,timestamp) {
    var url = 'https://script.google.com/macros/s/AKfycbzFWH-cOFJlw0raubyiy5b5cqRj-uNxbtmv04gvaIi-veZ-BOfKGv4Q20io-tnLyLi1/exec';
    var data = {
        "user": user,
        "result": result,
        "sticker": "=IMAGE(\""+sticker+"\", 1)", //turn it into a sheet formula
        "timestamp": timestamp
    };

    fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Important to avoid CORS issues
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));
}

/** MODAL / POP UP Functions ************************************************************/
//function to show popup
function showModal() {
    document.getElementById("userNameModal").style.display = "block";
}

function closeModal() {
    document.getElementById("userNameModal").style.display = "none";
}

//handle modal submit

/******************************************************************************************/
/*** HTML Related Functions/scripts /******************************************************/
function getCurrentTimestamp() {
    const now = new Date();

    // Get date / time components
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');

    // Combine and return the date and time in the desired format
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

//set user to global var
function setUserName(userName){
    user = userName;
}
/** EVENT HANDLERS ************************************************************************/
function onClick() { //body click event handler
    showModal();
}

function onSubmit() {
    //Get Entry for user first
    var form = document.getElementById("userNameForm");
    
    //capture the submission, then roll dice
    form.onsubmit = function(e) {
        e.preventDefault(); //prevent default form submission
        setUserName(document.getElementById("userName").value);
        closeModal();
        
        //Roll the die!
        rollDice();
    }
}

window.onload = function(){ //HTML page onload function
    //enable ability to click roll
    document.body.addEventListener('click', onClick(), true); 
    document.getElementById("submit").addEventListener('click',onSubmit(), false);
    
    showModal();
};

