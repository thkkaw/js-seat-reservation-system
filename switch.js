let reservedSeats = {
    
};

function makeRows(sectionLength, rowLength, placement) {
    const rows = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
    ];
    let html = "";
    let counter = 1;

    rows.forEach((row) => {
        switch (placement) {
            case "left":
                html += `<div id="${row}">${row}</div>`;
                break;

            case "right":
                counter = counter + (rowLength - sectionLength);
                break;

            default:
                counter = counter + (rowLength - sectionLength) / 2;
        }

        for (let i = 0; i < sectionLength; i++) {
            html += `<div class="a" id="${row + counter}">${counter}</div>`;
            counter++;
        }

        switch (placement) {
            case "left":
                counter = counter + (rowLength - sectionLength);
                break;

            case "right":
                html += `<div id="${row}">${row}</div>`;
                break;

            default:
                counter = counter + (rowLength - sectionLength) / 2;
        }
    });

    document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");

for (const key in reservedSeats) {
    if (reservedSeats.hasOwnProperty(key)) {
        const obj = reservedSeats[key];

        document.getElementById(obj.seat).innerHTML = "R";
        document.getElementById(obj.seat).className = "r";
    }
}

let selectedSeats = [];
let seats = document.querySelectorAll(".a");

seats.forEach((seat) => {
    seat.addEventListener("click", () => {
        seatSelectionProcess(seat.id);
    });
});

function seatSelectionProcess(thisSeat) {
    // console.log(`Selected seat id: ${thisSeat}`);
    if (!document.getElementById(thisSeat).classList.contains('r')) {
        
        let index = selectedSeats.indexOf(thisSeat);
    
        if (index > -1) {
            selectedSeats.splice(index, 1);
            document.getElementById(thisSeat).className = "a";
        } else {
            selectedSeats.push(thisSeat);
            document.getElementById(thisSeat).className = "s";
        }
    
        manageConfirmForm();
        // console.log(`${selectedSeats.length} selected seats`);
    }
}

/* **reservation form** */
const reserveSeats = document.getElementById("reserve");

reserveSeats.addEventListener("click", (event) => {
    document.getElementById("resform").style.display = "block";
    event.preventDefault();
});

const cancelReserve = document.getElementById("cancel");

cancelReserve.addEventListener("click", (event) => {
    document.getElementById("resform").style.display = "none";
    event.preventDefault();
});

function manageConfirmForm() {
    if (selectedSeats.length > 0) {
        document.getElementById("confirmres").style.display = "block";

        if (selectedSeats.length === 1) {
            document.getElementById("selectedseats").innerHTML =
                `You have selected seat ${selectedSeats}`;
        } else {
            let seatsString = selectedSeats.toString();
            seatsString = seatsString.replace(/,/g, ", ");
            seatsString = seatsString.replace(/,(?=[^,]*$)/, " and");

            document.getElementById("selectedseats").innerHTML =
                `You have selected seats ${seatsString}`;
        }
    } else {
        document.getElementById("confirmres").style.display = "none";

        document.getElementById("selectedseats").innerHTML =
            'You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat.';

        document.getElementById("error").addEventListener("click", () => {
            document.getElementById("resform").style.display = "none";
        });
    }
}

document.getElementById("confirmbtn").addEventListener("click", (e) => {
    console.log('here');
    processReservation();
    e.preventDefault();
});

function processReservation() {
    
    const hardCodeRecords = Object.keys(reservedSeats).length;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    let counter = 1;
    let nextRecord = "";

    selectedSeats.forEach((thisSeat) => {
        document.getElementById(thisSeat).className = "r";
        document.getElementById(thisSeat).innerHTML = "R";

        nextRecord = `record${hardCodeRecords + counter}`;
        reservedSeats[nextRecord] = {
            seat: thisSeat,
            owner: {
                fname: fname,
                lname: lname,
            },
        };

        counter++;
    });

    console.log(Object.keys(reservedSeats).length);
    console.log(reservedSeats);

    selectedSeats = [];
    document.getElementById('resform').style.display = 'none';
    manageConfirmForm();
}
