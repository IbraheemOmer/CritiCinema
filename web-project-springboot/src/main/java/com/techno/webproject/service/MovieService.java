package com.techno.webproject.service;

import com.techno.webproject.entity.Movie;
import com.techno.webproject.repository.MovieRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public List<Movie> findAllMovies() {
        return repository.findAll();
    }

    public Optional<Movie> findMovieByImdbId(String imdbId) {
        return repository.findMovieByImdbId(imdbId);
    }

    public Movie createMovie(String imdbId, String title, String releaseDate, String trailerLink, String poster, List<String> backdrops, List<String> genres) {
        Movie movie = new Movie(imdbId, title, releaseDate, trailerLink, poster, backdrops, genres);
        return repository.insert(movie);
    }

    public Movie updateMovie(String imdbId, String title, String releaseDate, String trailerLink, String poster, List<String> backdrops, List<String> genres) {
        Optional<Movie> optionalMovie = repository.findMovieByImdbId(imdbId);
        if (optionalMovie.isPresent()) {
            Movie movie = optionalMovie.get();
            movie.setTitle(title);
            movie.setReleaseDate(releaseDate);
            movie.setTrailerLink(trailerLink);
            movie.setPoster(poster);
            movie.setBackdrops(backdrops);
            movie.setGenres(genres);
            return repository.save(movie);
        }
        return null;
    }

    public void deleteMovie(String imdbId) {
        Optional<Movie> optionalMovie = repository.findMovieByImdbId(imdbId);
        optionalMovie.ifPresent(repository::delete);
    }
}
