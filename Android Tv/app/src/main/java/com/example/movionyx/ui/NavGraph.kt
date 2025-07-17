package com.example.movionyx.ui

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.movionyx.ui.screens.DetailsScreen
import com.example.movionyx.ui.screens.HomeScreen
import com.example.movionyx.ui.screens.SearchScreen

@Composable
fun NavGraph(navController: NavHostController) {
    NavHost(navController = navController, startDestination = Screen.Home.route) {
        composable(Screen.Home.route) {
            HomeScreen(onMovieClick = { movie ->
                navController.navigate(Screen.Details.createRoute(movie.id))
            })
        }
        composable(
            route = Screen.Details.route,
            arguments = listOf(navArgument("movieId") { type = NavType.IntType })
        ) { backStackEntry ->
            val movieId = backStackEntry.arguments?.getInt("movieId")
            requireNotNull(movieId) { "Movie ID not found" }
            DetailsScreen(movieId = movieId)
        }
        composable(Screen.Search.route) {
            SearchScreen(onMovieClick = { movie ->
                navController.navigate(Screen.Details.createRoute(movie.id))
            })
        }
    }
} 