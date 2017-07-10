<?php

isset($_GET["name"]) ? $name = e($_GET["name"]) : $name = 'user';

$array = array(
  "title" => "Vivace Isomorphic Rendering Engine",
  "description" => "Vivace isomorphic rendering engine. Render simple sites from HTML/JSON with PHP on the back-end and JavaScript on the front-end.",
  "text" => "text",
  "name" => $name,
  "url" => "https://andreobriennz.com"
);

$json = json_encode($array);
