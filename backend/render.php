<?php

function render($pages) {
  $GLOBALS['html'] = '';
  $json = '';

  foreach ($pages as $page) {
    if (file_exists('assets/models/'.$page.'.php')) {
      include 'assets/models/'.$page.'.php';
    } elseif (file_exists('assets/model/'.$page.'.js')) {
      $json = file_get_contents('assets/models/'.$page.'.js');
    }
    // echo 'assets/models/'.$page.'.php' . '|';
    $GLOBALS['html'] .= file_get_contents('assets/'.$page);
  }

  if ($json === '') {
    // If no json file created, use default (index)
    if (file_exists('assets/models/'.$page.'.php')) {
      include 'assets/models/index.php';
    } else {
      $json = file_get_contents('assets/models/index.js');
    }
  }

  // Decode JSON to get page variables
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

  echo '<script>var app = '.$json.'</script>';
}


function dd($data) {
  var_dump($data);
  die();
}

function e($data){
    return $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}
