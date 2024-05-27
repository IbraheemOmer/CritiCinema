package com.techno.webproject.controller;

import com.techno.webproject.entity.Movie;
import com.techno.webproject.entity.Review;
import com.techno.webproject.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> movies = service.findAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Map<String, String> payload) {
        String imdbId = payload.get("imdbId");
        String title = payload.get("title");
        String releaseDate = payload.get("releaseDate");
        String trailerLink = payload.get("trailerLink");
        String poster = payload.get("poster");
        List<String> backdrops = Arrays.asList(payload.get("backdrops").split(","));
        List<String> genres = Arrays.asList(payload.get("genres").split(","));

        // Perform any necessary validation or processing of the input data

        Movie newMovie = service.createMovie(imdbId, title, releaseDate, trailerLink, poster, backdrops, genres);
        return new ResponseEntity<>(newMovie, HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Movie> getSingleMovie(@PathVariable String imdbId) {
        Optional<Movie> movie = service.findMovieByImdbId(imdbId);
        if (movie.isPresent()) {
            return new ResponseEntity<>(movie.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{imdbId}")
    public ResponseEntity<Movie> updateMovie(@PathVariable String imdbId, @RequestBody Map<String, String> payload) {
        String title = payload.get("title");
        String releaseDate = payload.get("releaseDate");
        String trailerLink = payload.get("trailerLink");
        String poster = payload.get("poster");
        List<String> backdrops = Arrays.asList(payload.get("backdrops").split(","));
        List<String> genres = Arrays.asList(payload.get("genres").split(","));

        // Perform any necessary validation or processing of the input data

        Movie updatedMovie = service.updateMovie(imdbId, title, releaseDate, trailerLink, poster, backdrops, genres);
        if (updatedMovie != null) {
            return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{imdbId}")
    public ResponseEntity<String> deleteMovie(@PathVariable String imdbId) {
        service.deleteMovie(imdbId);
        return new ResponseEntity<>("Movie deleted successfully", HttpStatus.OK);
    }
}
