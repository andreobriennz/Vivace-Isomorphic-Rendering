<?php

function render($pages) {
  $GLOBALS['html'] = '';
  $GLOBALS['json'] = '';

  foreach ($pages as $page) {

    if (file_exists('assets/models/'.$page.'.js')) {
      $path = 'assets/models/'.$page.'.js';
      $json = file_get_contents($path);
      echo '<script>var app = '.$json.'</script>';
    }

    $GLOBALS['html'] .= file_get_contents('assets/'.$page);
  }

  $variables = json_decode($json, TRUE);

  // if :startic var exist then replace content in {} with variable value
  $response = preg_replace_callback('/{(.+?):static}/ix',function($match)use($variables){
    $string = !empty($variables[$match[1]]) ? $variables[$match[1]] : $variables[$match[1]];
    return $string;
  },$GLOBALS['html']);

  // if other var exist then replace content in {} with variable value
  $response = preg_replace_callback('/{(.+?)}/ix',function($match)use($variables){
    $string = !empty($variables[$match[1]]) ? $variables[$match[1]] : $match[0];
    return '<span v="'.substr($match[0], 1, -1).'">'.$string.'</span>';
  },$response);

  echo $response;
}


function dd($data) {
  var_dump($data);
  die();
}
