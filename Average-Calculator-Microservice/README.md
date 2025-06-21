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

An Instance of the output (Even Numbers)
![image](https://github.com/user-attachments/assets/52c7174e-bb2e-4d89-b079-6173030218f0)

An Instance of the output (Prime Numbers)
![image](https://github.com/user-attachments/assets/2787fcf0-e7b8-4352-b871-3f2531c7b813)

An Instance of the output (Fibonacci Numbers)
![image](https://github.com/user-attachments/assets/b757bab1-2a2b-4194-b606-d8aa6dee083d)

An Instance of the output (Random Numbers)
![image](https://github.com/user-attachments/assets/dc5f11a1-a572-4063-a6fc-bd3da4d3909f)


