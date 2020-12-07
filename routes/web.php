<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['middleware'=>['auth']] , function (){

    Route::get('/', 'TimeLineController@index');
    Route::get('/users/{user}', 'UserController@index');
    Route::get('/users/{user}/follow', 'UserController@follow')->name('users.follow');
    Route::get('/users/{user}/unfollow', 'UserController@unfollow')->name('users.unfollow');
    Route::get('/posts', 'PostController@index');    
    Route::post('/post', 'PostController@create'); 
    Route::get('/post/{post}/edit','PostController@edit'); 
    Route::post('/postUpdate/{id}' , 'PostController@update');   
    Route::delete('/post/{id}', 'PostController@delete');    
    Route::post('/search', 'PostController@searchPost');    


}) ;
