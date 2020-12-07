<?php
use \Illuminate\Support\Str;
use WebPConvert\WebPConvert;

if (! function_exists('asset_public')) {
    /**
    * Full asset public path
    */
    function asset_public($path = null)
    {
        return env('FRONT_PUBLIC', 'http://localhost/React_Js/Mini-Social-Media-Website/public/') . $path;
    }
}
