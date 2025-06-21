This application uses Express.js framework.

What This Does..

The API talks to a test server that provides different types of numbers:
p → Prime numbers
f → Fibonacci numbers
e → Even numbers
r → Random numbers

Each time you hit one of these endpoints, the API:
Pulls fresh numbers from the test server.
Adds new, unique values to an internal list (max 10 items).
Returns the old window, new window, the numbers just fetched, and the current average.

Available Endpoints
GET /numbers/p → Fetch prime numbers
GET /numbers/f → Fetch fibonacci numbers
GET /numbers/e → Fetch even numbers
GET /numbers/r → Fetch random numbers

How It Works
Numbers are fetched from external Test server.
The window only keeps unique values.
If more than 10 numbers exist, the oldest ones get booted.
The average is computed and rounded to two decimal places.

