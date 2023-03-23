import React, {useState , useEffect} from 'react'
import axios from './axios';
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";
//Whenever the Row loads, useEffect code runs i.e. the information from api is fetched
function Row({title, fetchUrl, isLargeRow}) {
   
  const [movies, setMovies]= useState([]); //creating movies array using useState  
  const [trailerUrl, setTrailerUrl]= useState("");

  //console.log(fetchUrl);

  useEffect(() => {
    async function fetchData() {
      
      const request= await axios.get(fetchUrl); //fetchUrl gets concatenated with baseUrl of axios
      //console.log(request); // request.data.results has required fetched array data inspect live development server to see
      setMovies(request.data.results); //put request data in movies array
      return request;
    }// async and await says to wait to load till the server sends the required information  
    fetchData();

  },[fetchUrl]);//[] contains dependencies i.e. useEffect is run whenever the dependency changes if empty runs only once when site loaded
  
  //console.log(movies);
  
  //Defining options to use to play using Youtube module
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      
      autoplay:1,
    },
  };
  
  //On clicking image set or reset trailer url to play or stop trailer
  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl('');
    }
    else{
      //movieTrailer is a module from movie-trailer package i installed which searches the movie name nd returns a trailer url if it finds it
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url)=>{
        //the youtube command needs only the rear end of the entire url
        const urlParams = new URLSearchParams(new URL(url).search);
        
        setTrailerUrl(urlParams.get('v'));
        
      })
      .catch((error)=> console.log(error));
    }
  }

  return (
    <div className="row">

        <h2>{title}</h2>
        {/* Posters */}
        <div className="row_posters">
          {/* Concatenating baseUrl from tmdb and poster_path for each value of array from api */}
          {movies.map(movie => (
            <img 
            key={movie.id}
            onClick= {() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src= {`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt= {movie.name}
            />

          ))}
          
        </div>
        {/* Youtube is a module from react-youtube which plays the url inside {}*/}
        {trailerUrl && <Youtube videoId= {trailerUrl} opts= {opts} />}
    </div>
  )
}

export default Row