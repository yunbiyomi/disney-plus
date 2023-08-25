import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

const DetailPage = () => {
  let {movieId} = useParams();
  const[movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId])

  if(!movie) return null;

  return (
    <section>
      <img
        className='modal__poster-img'
        src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='movie poster'
      />
    </section>
  )
}

export default DetailPage