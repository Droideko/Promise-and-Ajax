'use strict';

window.addEventListener('load', function () {

   var searchMovie = document.getElementById('searchMovie');
   var btn = document.getElementById('btn');
   btn.addEventListener('click', function () {
      var List = document.getElementById('movies');

      List.innerHTML = '';

      function addMovie(movie) {
         var img = document.createElement('img');
         img.src = movie.Poster;
         List.appendChild(img);
      }

      function getData(url) {
         return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
               if (xhr.status === 200) {
                  var json = JSON.parse(xhr.response);
                  resolve(json.Search);
               } else {
                  reject(xhr.statusText);
               }
            };
            xhr.onerror = function (error) {
               reject(error);
            };
            xhr.send();
         });
      }

      getData('http://www.omdbapi.com/?i=tt3896198&apikey=ebd44eee&s=' + searchMovie.value).then(function (movies) {
         return movies.forEach(function (movie) {
            return addMovie(movie);
         });
      }).catch(function (error) {
         return console.error(error);
      });
   });
});