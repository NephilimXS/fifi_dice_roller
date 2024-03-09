//globals
const params = new URLSearchParams(window.location.search);
let stickers = {
    "1": "=IMAGE(\"https://cdn.discordapp.com/attachments/1180151305952579704/1215727101156663448/bongo.gif?ex=65fdcd18&is=65eb5818&hm=0b2af487da465880fc3de0b4a22e26413e21e459c587315b717e275c87f585ba&\", 1)",
    "2": "=IMAGE(\"https://cdn.discordapp.com/attachments/1180151305952579704/1215747078916145172/fifi3.png?ex=65fddfb3&is=65eb6ab3&hm=aef8899dfb9d300f0dfc85e34664437112cd2242c40fb40b3deddaf19fefa9da&\", 1)",
    "3": "=IMAGE(\"https://cdn.discordapp.com/attachments/1180151305952579704/1215748312037199952/sticker-sheet.webp?ex=65fde0d9&is=65eb6bd9&hm=bf1b0fb926f292d93aae887dd800d2d692604efb3f5228d6ef47cdb8a1afcf01&\", 1)",
    "4": "=IMAGE(\"https://cdn.discordapp.com/attachments/1180151305952579704/1215746854525075546/scuffed_dragon.jpg?ex=65fddf7d&is=65eb6a7d&hm=ab29eedc31ec8067a0531677b2ec8bce42ae1712a096dcb64b2e9e1319b14807&\", 1)",
    "5": "=IMAGE(\"https://cdn.discordapp.com/attachments/1180151305952579704/1215727056986447912/hyper_fifiGoose.gif?ex=65fdcd0d&is=65eb580d&hm=9a50a12c3ac917f9e047045020a5d79b1884afbe21d6a7a787d8a4841e5cb059&\", 1)",
    "6": "=IMAGE(\"https://cdn.discordapp.com/attachments/1180151305952579704/1215746320497774703/fifi_sit_flower_sticker_2024.png?ex=65fddefe&is=65eb69fe&hm=6e56e487e4f58c8ae8318f67d5e5427a23b36aa3b76c67cf70d6389fcfff4e7b&\", 1)",
}

var user;
params.forEach((value, key)=>{
    user = key = "user" ? value : null;
})

window.onload = function(){
    rollDice();
};

// remove the // at the start of the next line to enable click to roll
document.body.addEventListener('click', rollDice, true); 

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

    dice.style.transform = `rotateX(${xEnd}deg) rotateY(${yEnd}deg)`;

    submitData(user,result,stickers[result],getCurrentTimestamp());
    // addRow(user, result, getCurrentTimestamp());           
    // Saving data to Local Storage
    // saveEntryToLocalStorage(user, result, getCurrentTimestamp());

}

// function addRow(user, result, timestamp) {
//     // Get the table's tbody element by its ID
//     var table = document.getElementById("rollHistory").getElementsByTagName('tbody')[0];
    
//     // Insert a row at the end of the table
//     var newRow = table.insertRow(-1);

//     // Insert a cell in the row at index 0 and 1
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     var cell3 = newRow.insertCell(2);
//     var cell4 = newRow.insertCell(3);

//     // Add some text to the new cells
//     cell1.innerHTML = user;
//     cell2.innerHTML = result;
//     cell3.innerHTML = stickers[result];
//     cell4.innerHTML = timestamp;

// }

function getCurrentTimestamp() {
    const now = new Date();

    // Get date components
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();
    const year = now.getFullYear();

    // Get time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the components to ensure two digits where necessary
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Combine and return the date and time in the desired format
    return `${formattedDate} ${formattedTime}`;
}

function submitData(user,result,sticker,timestamp) {
    var url = 'https://script.google.com/macros/s/AKfycbzFWH-cOFJlw0raubyiy5b5cqRj-uNxbtmv04gvaIi-veZ-BOfKGv4Q20io-tnLyLi1/exec';
    var data = {
        "user": name,
        "result": result,
        "sticker": sticker,
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

document.body.addEventListener('click', rollDice, true); 
