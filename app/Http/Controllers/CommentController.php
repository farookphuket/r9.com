<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

use Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get comment
        $comment = $this->getAs();

        return response()->json([
            "comment" => $comment
        ]);
    }

    public function getAs(){
        $comment = '';
        $perpage = request()->perpage;
        if(Auth::user()):
            $comment = Comment::latest()
                        ->where("is_approved","!=",0)
                        ->orWhere("user_id",Auth::user()->id)
                        ->paginate($perpage);
        elseif(Auth::user() && Auth::user()->is_admin):
            $comment = Comment::latest()
                            ->paginate($perpage);
        else:
        $comment = Comment::latest()
                    ->where("is_approved","!=",0)
                    ->paginate($perpage);
        endif;

        return $comment;

    }

    // comment post 
    public function commentPost(){
        $post_slug = request()->post_slug;
        $perpage = request()->perpage;
        $po = Post::where('slug',$post_slug)
                    ->first()
                    ->comment()
                    ->paginate($perpage);

        return response()->json([
            "comment" => $po

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $post_id = request()->post_id;

        $valid = request()->validate([
            "title" => ["required"],
            "body" => ["required"]
        ]);

        $valid["title"] = xx_clean(request()->title);
        $valid["body"] = xx_clean(request()->body);
        $valid["user_id"] = Auth::user()->id;

        Comment::create($valid);

        // get the last row 
        $comt = Comment::latest()->first();

        // get the post 
        $pos = Post::find($post_id); 

        // link the pip table 
        $pos->comment()->attach($comt);

        Comment::backupComment($comt->id,"insert");

        $msg = "<span class=\"has-text-success has-text-weight-bold\">
            Success your comment has been save</span>";

        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
