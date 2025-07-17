package com.example.movionyx.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.movionyx.data.api.RetrofitClient
import com.example.movionyx.model.Movie
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class HomeViewModel : ViewModel() {

    private val _trendingMovies = MutableStateFlow<List<Movie>>(emptyList())
    val trendingMovies: StateFlow<List<Movie>> = _trendingMovies

    private val _popularMovies = MutableStateFlow<List<Movie>>(emptyList())
    val popularMovies: StateFlow<List<Movie>> = _popularMovies

    private val _nowPlayingMovies = MutableStateFlow<List<Movie>>(emptyList())
    val nowPlayingMovies: StateFlow<List<Movie>> = _nowPlayingMovies

    private val _topRatedMovies = MutableStateFlow<List<Movie>>(emptyList())
    val topRatedMovies: StateFlow<List<Movie>> = _topRatedMovies

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> = _isLoading

    init {
        fetchAllMovies()
    }

    private fun fetchAllMovies() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                _trendingMovies.value = RetrofitClient.instance.getTrendingMovies(RetrofitClient.API_KEY).movies
                _popularMovies.value = RetrofitClient.instance.getPopularMovies(RetrofitClient.API_KEY).movies
                _nowPlayingMovies.value = RetrofitClient.instance.getNowPlayingMovies(RetrofitClient.API_KEY).movies
                _topRatedMovies.value = RetrofitClient.instance.getTopRatedMovies(RetrofitClient.API_KEY).movies
            } catch (e: Exception) {
                // Handle error
            } finally {
                _isLoading.value = false
            }
        }
    }
} 