// XHR - XmlHttpRequest 
let rides = [];
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};


const domStringBuilder = (arrayToPrint) => {
    let domString = "";
    arrayToPrint.forEach((ride) => {
        domString += `<div class="col-4 product">`;
        domString += `<div class="card"><h2>${ride.name}</h2>`;
        domString += `<h3>Ride type: ${ride.type}</h3>`;
        domString += `<h3>Ride type: ${ride.intensity}</h3>`;
        domString += `<img src=${ride.imageUrl} class='img-fluid'></img>`;
        
        domString += `</div>`;
        domString += `</div>`;
        
    });
    printToDom('ride-div', domString);
    // console.log(arrayToPrint);
};

function executeThisCodeAfterFileLoads(){
    const data = JSON.parse(this.responseText);
    rides = data.rides;
    domStringBuilder(data.rides);
};

function executeThisCodeIfXHRFails(){
    console.error('oh shit');
};

const getRidesData = () => {
    const myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeThisCodeAfterFileLoads);
    myRequest.addEventListener('error', executeThisCodeIfXHRFails);
    myRequest.open('GET', './db/rides.json');
    myRequest.send();
};

const sortAction = (e) => {
    const buttonId = e.target.id;

    let selectedRides = [];
    rides.forEach((ride) => {
        if(buttonId === ride.intensity){
            console.log('buttons work');
            selectedRides.push(ride);
        }

        
        
    });

    if(buttonId === 'all'){
        domStringBuilder(rides);
    }
    else{
    domStringBuilder(selectedRides);
    }
}

const sortButtonEvents = () => {
    const sortButtons = document.getElementsByClassName('sort-buttons');
    for(let i = 0; i < sortButtons.length; i++){
        sortButtons[i].addEventListener('click', sortAction);
    }
}


const init = () => {
    getRidesData();
    sortButtonEvents();
};

init();