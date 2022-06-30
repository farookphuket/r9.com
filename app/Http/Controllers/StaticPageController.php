<?php

namespace App\Http\Controllers;

use App\Models\StaticPage;
use Illuminate\Http\Request;

use Auth;

class StaticPageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function about(){
        $about = StaticPage::where('slug','=','about')
                            ->latest()
                            ->first();
        return response()->json([
            "about" => $about
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
        $valid = request()->validate([
            "title" => ["required","min:4"]
        ]);

        $valid["title"] = xx_clean(request()->title);
        $valid["body"] = xx_clean(request()->body);
        $valid["is_public"] = !request()->is_public?0:1;
        $valid["user_id"] = Auth::user()->id;
        $valid["slug"] = rtrim(request()->slug,'-');

        StaticPage::create($valid);

        $msg = "<span class=\"has-text-success has-text-weight-bold \">
            Success </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StaticPage  $staticPage
     * @return \Illuminate\Http\Response
     */
    public function show(StaticPage $staticPage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StaticPage  $staticPage
     * @return \Illuminate\Http\Response
     */
    public function edit(StaticPage $staticPage)
    {
        $page = StaticPage::find($staticPage->id);

        return response()->json([
            "page" => $page
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StaticPage  $staticPage
     * @return \Illuminate\Http\Response
     */
    public function update(StaticPage $staticPage)
    {
        //
        $valid = request()->validate([
            "title" => ["required","min:4"]
        ]);

        $valid["title"] = xx_clean(request()->title);
        $valid["body"] = xx_clean(request()->body);
        $valid["is_public"] = !request()->is_public?0:1;
        $valid["slug"] = rtrim(request()->slug,'-');
        $valid["updated_at"] = now();

        StaticPage::where("id",$staticPage->id)
            ->update($valid);

        $msg = "<span class=\"has-text-success has-text-weight-bold \">
            Success! data id {$staticPage->id} has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StaticPage  $staticPage
     * @return \Illuminate\Http\Response
     */
    public function destroy(StaticPage $staticPage)
    {
        //
    }
}
