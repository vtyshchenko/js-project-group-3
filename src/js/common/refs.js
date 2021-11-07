const themoviedb = {
  user: 'mamay.ukr',
  password: 'mamay.ukr',
  email: 'mamay.ukr.1977@gmail.com',
  keyV3Auth: '7cb7f2a84f35ebc2678afebafcd2cb5f',
  keyV4Auth:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2I3ZjJhODRmMzVlYmMyNjc4YWZlYmFmY2QyY2I1ZiIsInN1YiI6IjYxODZlMGM1YzVjMWVmMDAyYzI3NWE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pgpe2ZFsuuwD752NaRWkXNGvN6Y_7zSj-ucISFoCXyM',
};

// https://api.themoviedb.org/3/movie/550?api_key=7cb7f2a84f35ebc2678afebafcd2cb5f
// keyV4Auth - token

const refs = {
  headerRefs: document.querySelector('header'),
  navHomeRefs: document.querySelector('.js-home'),
  navLibrRefs: document.querySelector('.js-lib'),
  btnHomeRefs: document.querySelector('#btn-home'),
  btnLibrRefs: document.querySelector('#btn-library'),
  formSearchRefs: document.querySelector('.header-form'),
  inputSearchRefs: document.querySelector('.header-form__input'),
  librListRefs: document.querySelector('.library__list'),
  btnSearchRefs: document.querySelectorAll('.header-form__button'),
};

export default { themoviedb, refs };
