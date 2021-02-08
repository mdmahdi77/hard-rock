const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError("Somethong went wrong! Please try again later."))
} 

//************async er pattern */

// const searchSongs = async() => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     const res = await fetch(url); //parameter er age async dite hobe......ekhane res opekka korbe fetch er jonno...jotokkon na data load hobe
//     const data = await res.json(); //ekhane data wait korbe res er jonno.....etai muloto callback
//     displaySongs(data.data);
// }

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {

        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML =`
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>

                    <source src="${song.preview}" type="audio/ogg">

                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

// const getLyric = (artist, title) => {
//    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//    fetch(url)
//    .then(res => res.json())
//    .then(data => displayLyrics(data.lyrics))
// }
const getLyric = async(artist, title) => {
   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
   try{
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
   }
   catch (error){
    displayError("sorry! I failed to load lyrics. Please try again later.")
   }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics
}


const displayError = error => {
    const errorTag = document.getElementById("error-message");
    errorTag.innerHTML = error;
}