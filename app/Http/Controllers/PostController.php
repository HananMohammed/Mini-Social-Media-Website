<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;


class PostController extends Controller
{
    
    /**
     * function responsible to user and following users Posts
     *
     * @param post $post
     * @param PostRequest $request
     * 
     * @return response json
     */
    public function index(Request $request, Post $post)
    {
        $allPosts = $post->whereIn('user_id',
                                    $request->user()->following()->pluck('users.id')->push($request->user()->id))
                                    ->with('user');

        $posts = $allPosts->orderBy('created_at', 'DESC')->get();

        return response()->json(['posts'=>$posts]);
    }
    /**
     * function responsible to create user Post
     *
     * @param post $post
     * @param PostRequest $request
     * 
     * @return json
     */
    public function create(PostRequest $request, Post $post )
    {
        
        $newPost = $request->user()->posts()->create([
            "body" => $request->body
        ]);

        $postWithUser = $post->with('user')->find($newPost->id);
       
        return response()->json($postWithUser);
    }
    /**
     * edit User 
     *
     * @param integer $id
     * 
     * @return json
     */
    public function edit($id)
    {
        $post = Post::findOrFail($id);

        return response()->json($post->body);
    }
    /**
     * function responsible to Update user Post
     *
     * @param integer $id
     * @param PostRequest $request
     * 
     * @return json
     */
    public function update(PostRequest $request, $id)
    {
        Post::find($id)->update($request->all());

        return response()->json(["success" =>" Post Updated Successfully "]); 
    }
    /**
     * function responsible to search post
     *
     * @param Post $post
     * @param Request $request
     * 
     * @return json
     */
    public function searchPost(Request $request, Post $posts)
    {
        $allPosts = $posts->whereIn('user_id',
                                    $request->user()->following()->pluck('users.id')->push($request->user()->id))
                                    ->with('user');

        $searchResult = $allPosts->where('posts.body', 'LIKE', '%' . $request->querySearch . '%')
                                 ->orderBy('posts.created_at', 'desc')
                                 ->get();
             
         return response()->json($searchResult) ; 
    }
    /**
     * function responsible to delete post 
     *
     * @param Post $post
     * @param Request $request
     * 
     * @return json
     */
    public function delete(Request $request , Post $post)
    {
         $post->find($request->id)->delete();

         return response()->json(["success" =>" Post Deleted Successfully "]);
    }

    

}
