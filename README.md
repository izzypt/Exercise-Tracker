# Exercise-Tracker
Public repo for freeCodeCamp "Exercise Tracker" exercise.

# Tests

- <ins>Passed</ins>: You can POST to /api/users with form data username to create a new user.
- <ins>Passed</ins>: The returned response from POST /api/users with form data username will be an object with username and _id properties.
- <ins>Passed</ins>: You can make a GET request to /api/users to get a list of all users.
- <ins>Passed</ins>: The GET request to /api/users returns an array.
- <ins>Passed</ins>: Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.
- <ins>Passed</ins>: You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
- <ins>Passed</ins>: The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
- <ins>Passed</ins>: You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
- <ins>Passed</ins>: A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
- <ins>Passed</ins>: A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
- <ins>Passed</ins>: Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
- <ins>Passed</ins>: The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
- <ins>Passed</ins>: The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
- <ins>Passed</ins>: The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
- <ins>Passed</ins>: You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
