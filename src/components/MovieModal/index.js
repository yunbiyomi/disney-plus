import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios'
import './MovieModal.css'
import styled from 'styled-components'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const MovieModal = ({
  id,
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) => {
  const [isVideo, setIsVideo] = useState({});
  const [playVideo, setPlayVideo] = useState(false);
  const ref = useRef();

  console.log('ref', ref.current);

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  })

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: movieDetail } = await axios.get(`movie/${id}`, {
        params: { append_to_response: "videos" }
      });
      setIsVideo(movieDetail);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };


  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className='modal-close'>
            ✕
          </span>
          {isVideo.videos && isVideo.videos.results.length > 0 ? (
            playVideo ? (
              <>
                <span
                  onClick={() => setPlayVideo(false)}
                  className='modal-back'>
                  ←
                </span>
                <Iframe
                  src={`https://www.youtube.com/embed/${isVideo.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${isVideo.videos.results[0].key}`}
                  allow="autoplay; fullscreen"
                />
              </>
            ) : (
              <>
                <img
                  className='modal__play-button'
                  src='https://github.com/yunbiyomi/disney-plus/assets/83996384/7abb723e-74b5-4878-9971-f05f1e9cc06b'
                  alt='play-button'
                  onClick={() => setPlayVideo(true)}
                />
                <img
                  className='modal__poster-img'
                  src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                  alt='modal-img'
                />
              </>
            )
          ) : null}
          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__user_perc'>100% 일치</span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__overview'>평점: {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;

const Iframe = styled.iframe`
  width: 100%;
  height: 460px;
  z-index: -1;
  opacity: .65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;