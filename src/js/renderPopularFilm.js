import API from './apiService';
import videoCardTpl from '../partials/hbs/video-card.hbs'
import refs from './common/refs';

const {galleryListRefs, btnHomeRefs} = refs.refs


btnHomeRefs.addEventListener('click', onSearchPopularFilms)

export default function onSearchPopularFilms(e, page) {
    if (!page) {
        page = 1;
    }

    API.fetchGenres().then(data => {
        // console.log(data.genres);
        return data.genres
    }).then(onSaveGenres)

    
    API.fetchPopularFilms(page)
        .then(onSearchYear)
        .then(onSearchGenresList)
        .then(data => {
        localStorage.setItem("totalPages", data.total_pages);
        localStorage.setItem("pageType", 'popular');
        
        return data.results
    })
    .then(renderPopFilms)
    .catch(error => {
      console.log(error)
    })
}
         
function renderPopFilms(results) {
   const markup = videoCardTpl(results)
    galleryListRefs.innerHTML = markup
}
    
onSearchPopularFilms()

function onSaveGenres(genres) {
  localStorage.setItem('genres', JSON.stringify(genres));
}


function onSearchGenresList(data) {
    const genres = JSON.parse(localStorage.getItem('genres'));
    data.results.map(item => {
        let genresArr = [];
        genres.find(genr => {
      if (item.genre_ids.includes(genr.id)) {
        genresArr.push(genr.name)
      }
        });
        
        if (genresArr.length <= 3) {
            genresArr = genresArr.join(', ').split(',')
        }
        if (genresArr.length >= 3) {
            genresArr = genresArr.slice(0, 2)
            genresArr.push(' Other')
        }
        
        
        item.genre_ids = genresArr

    });
    // console.log(genresArr);
    

  return data;
}







//----------------
function onSearchYear(data) {
  data.results.map(elem => {
    if (elem.release_date) {
      elem.release_date = elem.release_date.split('-')[0];
        // console.log(elem.release_date);
    } else {
        elem.release_date = 'No date'
    }
  })

  return data;
}
//------------------------


