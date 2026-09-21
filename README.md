# Seat Reservation System

A simple, browser-based seat reservation interface built with HTML, CSS, and vanilla JavaScript. Users can select seats from a theater-style seating plan, enter their name, and confirm a reservation.

## Features

- Dynamically generates a 20-row seating plan with 15 seats per row
- Organizes seats into left, middle, and right sections
- Supports selecting and deselecting multiple seats
- Shows the selected seat numbers before confirmation
- Collects the guest's first and last name
- Marks confirmed seats as reserved and prevents them from being selected again
- Requires no frameworks, packages, build tools, or backend

## Seat Status Colors

| Color | Status |
| --- | --- |
| White | Available |
| Yellow | Available seat being hovered over |
| Pink | Selected |
| Red with `R` | Reserved |

## Getting Started

### Run directly

Clone or download the repository, then open `index.html` in a web browser.

### Run with a local server

Using a local server is recommended during development. For example, with VS Code you can use the **Live Server** extension and select **Open with Live Server** from `index.html`.

You can also use any static file server you already have installed.

## How to Use

1. Click one or more available seats.
2. Click **Reserve Seats**.
3. Review the selected seat list.
4. Enter a first and last name.
5. Click **Confirm Reservation**.

Confirmed seats turn red and display `R`. To change the selection before confirming, choose **cancel** and select different seats.

## Project Structure

```text
seat-reservation-system/
|-- index.html   # Page markup and reservation form
|-- style.css    # Seating layout, seat states, and form styles
|-- switch.js    # Active seating and reservation logic
|-- script.js    # Earlier seating-layout implementation (not loaded by index.html)
`-- README.md
```

## How It Works

`switch.js` generates three seating sections for rows A through T. Each row contains 15 seats: three on the left, nine in the middle, and three on the right. Clicking an available seat toggles it in the current selection. Confirming the form updates the selected seats to the reserved state and records the guest's name in memory.

## Limitations

- Reservation data is stored only in JavaScript memory and is lost when the page is refreshed.
- There is no backend, database, authentication, or payment processing.
- The current layout is optimized for desktop-sized screens.

## Possible Improvements

- Save reservations with local storage or a backend database
- Add a seat legend and reservation summary
- Improve mobile responsiveness and accessibility
- Add form validation and user-facing success messages
- Add automated tests

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

## License

No license has been specified for this project.
