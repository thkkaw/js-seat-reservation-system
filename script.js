function makeRows(sectionLength, rowLength, placement) {
    const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];

    let html = "";
    let counter = 1;

    rows.forEach((row) => {
        switch (placement) {
            case 'left':
                html += `<div class="label">${row}</div>`;
                break;

            case 'right':
                counter = counter + (rowLength - sectionLength);
                break;

            default:
                counter = counter + ((rowLength - sectionLength) / 2);
        }

        for (let i = 0; i < sectionLength; i++) {

            html += `<div class="a" id="${row + counter}">${counter}</div>`;
            counter++;
        }

        switch (placement) {
            case 'left':
                counter = counter + (rowLength - sectionLength);
                break;

            case 'right':
                html += `<div class="label">${row}</div>`;
                break;

            default:
                counter = counter + ((rowLength - sectionLength) / 2);
        }
    });

    document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, 'left');
makeRows(9, 15, 'middle');
makeRows(3, 15, 'right');

let reservedSeats = {};

for (const key in reservedSeats) {
    if (reservedSeats.hasOwnProperty(key)) {
        const obj = reservedSeats[key];

        document.getElementById(obj.seat).className = 'r';
        document.getElementById(obj.seat).innerHTML = 'R';
    }
}

let selectedSeats = [];
const seats = document.querySelectorAll(".a");

seats.forEach((seat) => {
    seat.addEventListener('click', () => {
        seatSelectionProcess(seat.id);
    });
});

function seatSelectionProcess(thisSeat) {
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

    }
}

const reserve = document.getElementById('reserve');
reserve.addEventListener('click', (e) => {
    document.getElementById('resform').style.display = 'block';
    e.preventDefault();
});

document.getElementById('cancel').addEventListener('click', (e) => {
    document.getElementById('resform').style.display = 'none';
    e.preventDefault();
});

function manageConfirmForm() {
    if (selectedSeats.length > 0) {

        document.getElementById('confirmres').style.display = 'block';

        if (selectedSeats.length === 1) {
            document.getElementById('selectedseats').innerHTML = `You have selected seat ${selectedSeats}`
        } else {
            let seatsString = selectedSeats.toString();
            seatsString = seatsString.replace(/,/g, ", ");
            seatsString = seatsString.replace(/,(?=[^,]*$)/, " and");

            document.getElementById('selectedseats').innerHTML = `You have selected seats ${seatsString}`;
        }

    } else {
        document.getElementById('confirmres').style.display = 'none';

        document.getElementById('selectedseats').innerHTML = 'You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat.';

        document.getElementById('error').addEventListener('click', () => {
            document.getElementById('resform').style.display = 'none';
        })
    }
}

document.getElementById('confirmbtn').addEventListener('click', (e) => {
    processReservation();
    e.preventDefault();
});

function processReservation() {
    const hardCodeRecords = Object.keys(reservedSeats).length;
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    let counter = 1;
    let nextRecord = "";

    selectedSeats.forEach((thisSeat) => {
        document.getElementById(thisSeat).innerHTML = 'R';
        document.getElementById(thisSeat).className = 'r';

        nextRecord = `record${hardCodeRecords + counter}`;
        reservedSeats[nextRecord] = {
            seat: {thisSeat},
            owner: {
                fname: fname,
                lname: lname,
            },
        };
        counter++;
    });

    selectedSeats = [];
    document.getElementById('resform').style.display = 'none';
    manageConfirmForm();
}
