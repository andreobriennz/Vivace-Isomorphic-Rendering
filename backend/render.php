<?php
// include 'backend/pages.php';

function render($pages) {
  foreach ($pages as $page) {
    if (file_exists('assets/models/'.$page.'.js')) {
      $path = 'assets/models/'.$page.'.js';
      $json = file_get_contents($path);
      echo '<script>var app = '.$json.'</script>';
    } else {
      $path = 'assets/models/index.js';
      $json = file_get_contents($path);
    }

    $variables = json_decode($json, TRUE);
    $html = file_get_contents('assets/'.$page);

    // if :startic var exist then replace content in {} with variable value
    $response = preg_replace_callback('/{(.+?):static}/ix',function($match)use($variables){
      $string = !empty($variables[$match[1]]) ? $variables[$match[1]] : $match[0];
      return $string;
    },$html);

    // if other var exist then replace content in {} with variable value
    $response = preg_replace_callback('/{(.+?)}/ix',function($match)use($variables){
      $string = !empty($variables[$match[1]]) ? $variables[$match[1]] : $match[0];
      return '<span v="'.substr($match[0], 1, -1).'">'.$string.'</span>';
    },$response);

    echo $response;
  }
}
