<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    
    /**
     * Handel User if exist 
     *
     * @param User $user
     * 
     * return user if exist 
     */

    public function index(User $user)
    {
        return view('users.index', compact('user'));
    }

    /**
     * Follow User 
     *
     * @param Request $request
     * @param User $user
     * 
     * @return back 
     */
    public function follow(Request $request, User $user)
    {
        if($request->user()->canFollow($user))
        {
            $request->user()->following()->attach($user->id);
        }
        
        return redirect()->back();
    }

    
    /**
     * Unfollow User
     *
     * @param Request $request
     * @param User $user
     * 
     * @return back
     */
    public function unfollow(Request $request, User $user)
    {
        if($request->user()->canUnFollow($user))
        {
            $request->user()->following()->detach($user->id);
        }
        
        return redirect()->back();
    }
}
