<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TimeLineController extends Controller
{
    public function index()
    {
        $following = auth()->user()->following;
        $followers = auth()->user()->followers;
        $userCanModify = auth()->user()->username;
          
        return view('home',compact('following','followers','userCanModify'));
    }
}
