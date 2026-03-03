<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your application.
| These routes are loaded by the RouteServiceProvider
| and assigned to the "api" middleware group.
|
*/

// Optional: test route
Route::get('/ping', function () {
    return response()->json([
        'message' => 'API is working'
    ]);
});

/*
|--------------------------------------------------------------------------
| Book Routes
|--------------------------------------------------------------------------
*/

Route::prefix('books')->group(function () {

    // List books (default pagination 4 per page)
    Route::get('/', [BookController::class, 'index']);

    // Search books (by book_name and/or description)
    Route::get('/search', [BookController::class, 'search']);

    // Create book
    Route::post('/', [BookController::class, 'store']);

    // Update book (only description)
    Route::put('/{id}', [BookController::class, 'update']);

    // Delete book
    Route::delete('/{id}', [BookController::class, 'destroy']);

});
