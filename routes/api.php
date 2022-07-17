<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\RegisterController as Register;
use App\Http\Controllers\LoginController as Login;

use App\Http\Controllers\Member\ProfileController as Profile;
use App\Http\Controllers\WhatupController as Whatup;
use App\Http\Controllers\VisitorController as Visitor;
use App\Http\Controllers\PostController as Post;

use App\Http\Controllers\CommentController as Comment;
use App\Http\Controllers\ReplyController as Reply;

use App\Http\Controllers\StaticPageController as STPage;

use App\Http\Controllers\UserController as User;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// static page 
Route::get('/about-us',[STPage::class,'about'])->name('about');

// comment 
Route::get('/comment',[Comment::class,'index']);

// comment post 
Route::get('/get-post-comment',[Comment::class,"commentPost"])
    ->name("commentPost");

/* ===================== Register Route START ===============================*/
// get your friend
Route::get('/your-friends',[Register::class,'getYourFriends'])
    ->name("getYourFriends");

// new register
Route::post('/register',[Register::class,'store']);

Route::get('/activate-user/{token}',[Register::class,"activateUser"])
    ->name("activateUser");

// login 
Route::post('/login',[Login::class,'store']);



// check user passport
Route::get('/user-has-passport',[Login::class,'checkUserPassport'])
    ->name('checkUserPassport');

/* ===================== Register Route END ================================*/


// whatup 
Route::get('/whatup',[Whatup::class,"index"]);
Route::get('/whatup/{whatup}',[Whatup::class,"show"]);

// visitor route
Route::get('/visitor',[Visitor::class,'index']);

// blog post Route
Route::get('/post',[Post::class,'index']);
Route::get('post/{id:slug}',[Post::class,'show']);


Route::prefix("member")->name("member.")->middleware('auth:sanctum')
                                        ->group(function(){
    Route::resource('/profile',Profile::class);

    Route::post('/user-confirm',[Profile::class,'userConfirm'])
        ->name('userConfirm');

    // whatup
    Route::resource('/whatup',Whatup::class);

    // comment 
    Route::resource('/comment',Comment::class);


    // comment 
    Route::resource('/reply',Reply::class);

    // post 
    Route::resource('/post',Post::class);

    // logout 
    Route::delete('/logout',[Login::class,'destroy']);

});
 


/* ===================== Admin Route ======================================== */
Route::prefix("admin")->name("admin.")->middleware('auth:sanctum')
                                        ->group(function(){
    Route::resource('/whatup',Whatup::class);

    // post 
    Route::resource('/post',Post::class);

    // user 
    Route::resource('/user',User::class);

    // staticPage
    Route::resource('/static-page',STPage::class);

});



