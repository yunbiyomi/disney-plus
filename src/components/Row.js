import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';

const Row = ({ title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    console.log(response.data.results);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])

  const handleClick = (movie) => {
    setModalOpen(true);
    setSelectedMovie(movie);
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}>
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>

          {movies.map((movie) => (
            <img 
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}>
            {">"}
          </span>
        </div>
      </div>

      {modalOpen ?
        <MovieModal
          {...selectedMovie}
          setModalOpen={setModalOpen}/>
        : null}
    </div>
  )
}

export default Row;