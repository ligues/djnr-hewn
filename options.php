<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 *
 */

function optionsframework_option_name() {

  // This gets the theme name from the stylesheet (lowercase and without spaces)
  $themename = get_option( 'stylesheet' );
  $themename = preg_replace("/\W/", "_", strtolower($themename) );

  $optionsframework_settings = get_option('optionsframework');
  $optionsframework_settings['id'] = $themename;
  update_option('optionsframework', $optionsframework_settings);

  // echo $themename;
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 */

function optionsframework_options() {


  $options = array();

  /* HOME */
  $options[] = array(
    'name' => __('Home Images', 'options_check'),
    'type' => 'heading');

  $options[] = array(
    'name' => __('Front Image', 'options_check'),
    'desc' => __('', 'options_check'),
    'id' => 'home_image_front',
    'type' => 'upload');
  
  $options[] = array(
    'name' => __('Our Work Image', 'options_check'),
    'desc' => __('', 'options_check'),
    'id' => 'home_image_work',
    'type' => 'upload');
  
  $options[] = array(
    'name' => __('Our Services Image', 'options_check'),
    'desc' => __('', 'options_check'),
    'id' => 'home_image_services',
    'type' => 'upload');

  $options[] = array(
    'name' => __('About Us Image', 'options_check'),
    'desc' => __('', 'options_check'),
    'id' => 'home_image_about',
    'type' => 'upload');

  $options[] = array(
    'name' => __('Shop Image', 'options_check'),
    'desc' => __('', 'options_check'),
    'id' => 'home_image_shop',
    'type' => 'upload');


  
  return $options;
}