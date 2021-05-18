export default function getRefs() {
  return {
    countriesContainer: document.querySelector('.js-countries-list'),
    countryContainer: document.querySelector('.js-country-container'),
    searchForm: document.querySelector('.js-search-form'),
    clearButton: document.querySelector('.js-clear-button'),
  };
}
