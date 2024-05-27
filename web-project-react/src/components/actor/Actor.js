import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Actor.css';


const Actor = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    imdbId: '',
    title: '',
    releaseDate: '',
    trailerLink: '',
    poster: '',
    backdrops: '',
    genres: '',
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/api/v1/movies');
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex === -1) {
        const response = await api.post('/api/v1/movies', formData);
        setMovies([...movies, response.data]);
      } else {
        await api.put(`/api/v1/movies/${movies[editIndex].imdbId}`, formData);
        const updatedMovies = [...movies];
        updatedMovies[editIndex] = formData;
        setMovies(updatedMovies);
        setEditIndex(-1);
      }
      setFormData({
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        poster: '',
        backdrops: '',
        genres: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    const movieToEdit = movies[index];
    let backdrops = '';
    if (Array.isArray(movieToEdit.backdrops)) {
      backdrops = movieToEdit.backdrops.join(', ');
    } else if (typeof movieToEdit.backdrops === 'string') {
      backdrops = movieToEdit.backdrops;
    }

    let genres = '';
  
    if (Array.isArray(movieToEdit.genres)) {
      genres = movieToEdit.genres.join(', ');
    } else if (typeof movieToEdit.genres === 'string') {
      genres = movieToEdit.genres;
    }
  
    setFormData({
      imdbId: movieToEdit.imdbId,
      title: movieToEdit.title,
      releaseDate: movieToEdit.releaseDate,
      trailerLink: movieToEdit.trailerLink,
      poster: movieToEdit.poster,
      backdrops: backdrops,
      genres: genres,
    });
    setEditIndex(index);
  };
  
  

  const handleDelete = async (imdbId) => {
    try {
      await api.delete(`/api/v1/movies/${imdbId}`);
      setMovies(movies.filter((movie) => movie.imdbId !== imdbId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className='mov'>Movies</h2>
      <table className="tablee">
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Genres</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.imdbId}>
              <td>{movie.title}</td>
              <td>{movie.releaseDate}</td>
              <td>{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button> &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(movie.imdbId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h3 className='amov'>
        {editIndex === -1 ? 'Add New Movie' : 'Edit Movie'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            IMDb ID:
            <input
              type="text"
              className="form-control"
              name="imdbId"
              value={formData.imdbId}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Title:
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Release Date:
            <input
              type="date"
              className="form-control"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Trailer Link:
            <input
              type="text"
              className="form-control"
              name="trailerLink"
              value={formData.trailerLink}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Genres:
            <textarea
              className="form-control"
              name="genres"
              value={formData.genres}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Poster:
            <input
              type="text"
              className="form-control"
              name="poster"
              value={formData.poster}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Backdrops:
            <textarea
              className="form-control"
              name="backdrops"
              value={formData.backdrops}
              onChange={handleInputChange}
              style={{ width: '87.4vw' }}
            />
          </label>
        </div>

        <div className="text-center">
          <button type="submit" className="btnsub">
            {editIndex === -1 ? 'Add Movie' : 'Update Movie'}
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Actor;
