import './sass/main.scss';
import getRefs from './js/get-refs';
import countryTmp from './templates/countryTmp.hbs';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  refs.countriesContainer.innerHTML = '';
  const inputValue = event.target.value;
  if (!inputValue) {
    return;
  }

  fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`)
    .then(response =>
      response.ok ? response.json() : Promise.reject(`Error status ` + response.status),
    )
    .then(data => {
      if (data.length >= 2 && data.length < 10) {
        displayCountryList(data);
      }
      if (data.length === 1) {
        displayCountry(data[0]);
      }
      if (data.length > 10) {
        error({ delay: 2500, text: 'Please enter more specific data' });
      }
    })
    .catch(() => {
      error({ delay: 2500, text: 'There is no such country in the list. Please try again' });
    });
}

function displayCountry(countryData) {
  refs.countryContainer.innerHTML = countryTmp(countryData);
}

function displayCountryList(countriesData) {
  countriesData.forEach(country =>
    refs.countriesContainer.insertAdjacentHTML(
      'beforeend',
      `<li class="country">${country.name}</li>`,
    ),
  );
  refs.countriesContainer.addEventListener('click', displaySelectedCountry);
  refs.countriesContainer.countriesData = countriesData; // Saving json data on the country list so event handler can access it
}

function displaySelectedCountry(event) {
  refs.countriesContainer.countriesData.forEach(countryData => {
    if (countryData.name === event.target.textContent) {
      displayCountry(countryData);
      refs.countriesContainer.innerHTML = '';
    }
  });
}

refs.clearButton.addEventListener('click', () => {
  refs.countryContainer.innerHTML = '';
  refs.countriesContainer.innerHTML = '';
  refs.searchForm.value = '';
});
