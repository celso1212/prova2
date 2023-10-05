let container = document.querySelector('.container');
let formulario = document.querySelector('.formulario');
let filmeInput = document.querySelector('.form-control');

async function searchMoviesAPI(tituloFilme) {
    let apiKey = "e6c43dc6"; 
    let apiUrl = `https://www.omdbapi.com/?s=${tituloFilme}&apikey=${apiKey}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.Response === "True" && data.Search && data.Search.length > 0) {
            container.innerHTML = ""; 

            data.Search.forEach(movie => {
                container.innerHTML += `
                    <div class="card">
                        <h2>${movie.Title}</h2>
                        <img src="${movie.Poster}"
                    </div>
                `;
            });
        } else {
            container.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
        }
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    searchMoviesAPI(filmeInput.value);
    filmeInput.value = '';
});
