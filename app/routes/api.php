<?php

use App\Http\Controllers\Api\UserSettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User Settings
Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UserSettingController::class)->group(function () {
        Route::get('/user_settings', 'show')->name('user_settings.show');
        Route::post('/user_settings', 'store')->name('user_settings.store');
    });
});
