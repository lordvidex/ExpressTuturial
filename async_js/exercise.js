
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// function getCustomer(id, callback) {
//   setTimeout(() => {
//     callback({
//       id: 1,
//       name: 'Mosh Hamedani',
//       isGold: true,
//       email: 'email'
//     });
//   }, 4000);
// }

// function getTopMovies(callback) {
//   setTimeout(() => {
//     callback(['movie1', 'movie2']);
//   }, 4000);
// }

// function sendEmail(email, movies, callback) {
//   setTimeout(() => {
//     callback();
//   }, 4000);
// }

//! using async await
function getCustomer(id) {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve({
      id: id,
      name: 'Mosh Hamedani',
      isGold: true,
      email: 'email'
    }), 4000);
  })
}

function getTopMovies() {
  return new Promise((resolve, _) => setTimeout(() => resolve(['movie1', 'movie2']), 4000));
}

function sendEmail(email, movies) {
  return new Promise((_,__)=>
  setTimeout(() => {
    console.log('Email sent to ', email, 'with ', movies);
  }, 4000));
}

(async function sendAll() {
  const customer = await getCustomer(1);
  console.log(customer);
  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log(movies);
    await sendEmail(customer.email, movies);
  }
})();