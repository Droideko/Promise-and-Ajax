window.addEventListener('load', () => {

   let searchMovie = document.getElementById('searchMovie');
   let btn = document.getElementById('btn');
   btn.addEventListener('click', () => {   
      let List = document.getElementById('movies');

      List.innerHTML = '';

      function addMovie(movie){
         let img = document.createElement('img');
         img.src = movie.Poster;
         List.appendChild(img);
      } 

      function getData(url) {
         return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function(){
               if (xhr.status === 200) {
                  let json = JSON.parse(xhr.response);
                  resolve(json.Search);
               } else {
                  reject(xhr.statusText);
               }
            };
            xhr.onerror = function(error){
               reject(error);
            };
            xhr.send();
         });      
      }

      getData(`http://www.omdbapi.com/?i=tt3896198&apikey=ebd44eee&s=${searchMovie.value}`)
      .then(movies => movies.forEach(movie =>
         addMovie(movie)))
      .catch(error => console.error(error));   
   });
})