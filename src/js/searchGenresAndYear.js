export function onSearchGenresList(data) {
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
        
        if (genresArr =="") {

            genresArr = genresArr + "No genre"
        }
        
        item.genre_ids = genresArr

    });  

  return data;
}


export function onSearchYear(data) {
  data.results.map(elem => {
    if (elem.release_date) {
      elem.release_date = elem.release_date.split('-')[0];
    } else {
        elem.release_date = 'No date'
    }
  })

  return data;
}
