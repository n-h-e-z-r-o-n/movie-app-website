package com.example.movionyx.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.tv.material3.Text
import com.example.movionyx.model.Movie
import com.example.movionyx.ui.viewmodel.HomeViewModel

@Composable
fun HomeScreen(
    onMovieClick: (Movie) -> Unit,
    homeViewModel: HomeViewModel = viewModel()
) {
    val trendingMovies by homeViewModel.trendingMovies.collectAsState()
    val popularMovies by homeViewModel.popularMovies.collectAsState()
    val nowPlayingMovies by homeViewModel.nowPlayingMovies.collectAsState()
    val topRatedMovies by homeViewModel.topRatedMovies.collectAsState()
    val isLoading by homeViewModel.isLoading.collectAsState()

    if (isLoading) {
        // Show loading indicator
    } else {
        Column(modifier = Modifier.padding(16.dp)) {
            MovieSection("Trending", trendingMovies, onMovieClick)
            Spacer(modifier = Modifier.height(16.dp))
            MovieSection("Popular", popularMovies, onMovieClick)
            Spacer(modifier = Modifier.height(16.dp))
            MovieSection("Now Playing", nowPlayingMovies, onMovieClick)
            Spacer(modifier = Modifier.height(16.dp))
            MovieSection("Top Rated", topRatedMovies, onMovieClick)
        }
    }
}

@Composable
fun MovieSection(title: String, movies: List<Movie>, onMovieClick: (Movie) -> Unit) {
    Column {
        Text(text = title, modifier = Modifier.padding(bottom = 8.dp))
        LazyRow {
            items(movies) { movie ->
                MoviePoster(movie, onMovieClick)
            }
        }
    }
}

@Composable
fun MoviePoster(movie: Movie, onMovieClick: (Movie) -> Unit) {
    // Implement Movie Poster UI here
} 