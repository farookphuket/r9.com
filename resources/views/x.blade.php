<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>see-southern - web site project is under development </title>
        <link rel="stylesheet" href="/css/custom_theme.css" >
        <link rel="stylesheet" href="{{asset('/css/app.css')}}">
    </head>
    <body >
        
        <div id="app"></div>
        @yield('content')

        <script src="{{asset('/js/app.js')}}"></script>
    </body>
</html>
