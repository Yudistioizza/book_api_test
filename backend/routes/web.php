<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\BookManager;

Route::get('/', function () {
    return redirect()->route('login');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::view('/dashboard', 'dashboard')->name('dashboard');
    Route::get('/books', BookManager::class)->name('books');
});

require __DIR__ . '/settings.php';
