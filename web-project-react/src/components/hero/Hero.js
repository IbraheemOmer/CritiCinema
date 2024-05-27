import React from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

const Hero = ({ movies }) => {
  const navigate = useNavigate();

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className='movie-card-container'>
                <div className='movie-card' style={{ '--img': `url(${movie.backdrops[0]})` }}>
                  <div className='movie-detail'>
                    <div className='movie-poster'>
                      <img src={movie.poster} alt='' />
                    </div>
                    <div className='movie-title'>
                      <h1>{movie.title}</h1>
                    </div>
                    <div className='movie-buttons-container'>
                      <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                        <div className='play-button-icon-container'>
                          <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                        </div>
                      </Link>
                        <button variant='info' onClick={() => reviews(movie.imdbId)}>
                          Reviews
                        </button>

                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>

      <div className='movie-grid-container'>
        {movies?.map((movie) => {
          return (
            <div key={movie.imdbId} className='movie-grid-item'>
              <img src={movie.poster} alt='' className='grid-movie-poster' />
              <h6>{movie.title}</h6>
              <div className='grid-movie-buttons'>
                <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                  <FontAwesomeIcon className='grid-play-button-icon' icon={faCirclePlay} />
                </Link>
                <button variant='info' onClick={() => reviews(movie.imdbId)}>
                  Reviews
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;