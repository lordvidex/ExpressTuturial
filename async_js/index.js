// using callbacks for asynchronous operations
console.log('Before');
//getFromArkham(getAll);
console.log('After');


function getAll() {
    getUsersFromArkham(getUser);
}
function getUser(result) {
    console.log(`The bastards are ${result}`);
}
function getFromArkham(callback) {
    setTimeout(() => {
        console.log('Getting your ass from Arkham!');
        callback();
    }, 2000);
}
function getUsersFromArkham(callback) {
    setTimeout(() => {
        console.log('Fetched guys from Arkham!');
        callback(['Joker', 'Two-Face', 'Harley-Queen']);
    }, 2000);
}

//! Using promises
const promise = new Promise((_, reject) => {
    setTimeout(() => {
        reject('I failed');
    }, 2000)
});

// What i learnt:
// when onRejected callback is provided
//      catch is skipped
// and when not:
//      catch is reached
promise.then((onSuccess) => console.log("Success", onSuccess), (onRejected) => console.log('On Rejected', onRejected))
    .catch((onRejected) => console.log("Error:", onRejected));