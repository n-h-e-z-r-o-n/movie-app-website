package com.example.movionyx.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.movionyx.ui.viewmodel.DetailsViewModel

@Composable
fun DetailsScreen(
    movieId: Int,
    detailsViewModel: DetailsViewModel = viewModel()
) {
    LaunchedEffect(movieId) {
        detailsViewModel.fetchMovieDetails(movieId)
    }

    val movieDetails by detailsViewModel.movieDetails.collectAsState()
    val isLoading by detailsViewModel.isLoading.collectAsState()

    if (isLoading) {
        // Show loading indicator
    } else {
        movieDetails?.let { movie ->
            Column(modifier = Modifier.padding(16.dp)) {
                // Movie Poster Image
                Spacer(modifier = Modifier.height(16.dp))
                Text(text = movie.title)
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = "Rating: ${movie.rating}")
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = movie.overview)
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { /* Play trailer */ }) {
                    Text("Play Trailer")
                }
            }
        }
    }
} 