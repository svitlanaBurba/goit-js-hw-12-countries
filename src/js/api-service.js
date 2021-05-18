// const JSON_BASE_URL = 'https://restcountries.eu/rest/v2/name/${name}';

// const fetchData = (request = '/') =>
//   fetch(JSON_BASE_URL + request)
//     .then(response => response.json())
//     .then(data => console.log(data));

// console.log(fetchData);

// const fetchById = id =>
//   fetch(`${JSON_BASE_URL}/users/${id}`).then(response => {
//     // if (response.ok) {
//     //   return response.json();
//     // }
//     // return Promise.reject(`Ошибка! Пользователя с id "${id}" не существует`);

//     if (response.status === 404) {
//       throw new Error(`Ошибка! Пользователя с id "${id}" не существует`);
//     }
//     return response.json();
//   });

// export { fetchData, fetchById };
