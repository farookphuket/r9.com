<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="{{asset('img/eye_14-apr-2022.ico')}}" rel="icon">
        <link rel="stylesheet" href="/css/custom_theme.css" >
        <link rel="stylesheet" href="{{asset('/css/app.css')}}">

        <title>see southern the great business solution for a real man like you</title>


    </head>
    <body >
        
        <div id="app"></div>
        @yield('content')



        <?php 
        $data = [
            "laravel_version" => Illuminate\Foundation\Application::VERSION,
            "php_version" => PHP_VERSION
            ];
        ?> 
                @if(Session::has('USER_HAS_ACTIVATION_TOKEN'))
        <?php
                $data["activation_token"] = Session::get("USER_HAS_ACTIVATION_TOKEN");
        ?>
                @endif
                @auth
        <?php
            $data["user_id"] = Auth::user()->id;
            $data["USER_IS_LOGIN"] = true;
        ?>
            @if(Session::has('USER_IS_ADMIN'))
                <?php $data["is_root"] = Session::get("USER_IS_ADMIN"); ?>
            @endif
            @if(Session::has('USER_IS_MEMBER'))
                <?php $data["is_member"] = Session::get("USER_IS_MEMBER"); ?>
            @endif
        @endauth

        <script>
            window.lsDefault = @json($data)
        </script>

        <script src="{{asset('/js/app.js')}}"></script>
    </body>
</html>
