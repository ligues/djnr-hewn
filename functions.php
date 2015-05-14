<?php 



add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
    add_theme_support( 'woocommerce' );
}

//add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

/*** HIDE ADMIN BAR ***/
show_admin_bar( false );

/*** ADD FEATURED IMAGE ***/
//add_theme_support( 'post-thumbnails' );

/*** IMAGES SIZES ***/
if ( function_exists( 'add_image_size' ) ) { 
	add_image_size( 'size_1', 620, 300,true); 
	add_image_size( 'size_2', 410, 300,true); 
	add_image_size( 'size_3', 410, 610,true); 
	add_image_size( 'size_4', 200, 300,true); 
	add_image_size( 'size_5', 200, 145,true);
	add_image_size( 'mobile', 280, 280,true); 
} 


/*** JS/CSS FILES ***/  
 
function initial_scripts_styles() {
	wp_deregister_script( 'jquery' );
	
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/js/modernizr-2.6.2.min.js',  array(), null, false );
    wp_enqueue_script( 'jquery',  get_template_directory_uri() . '/js/jquery.min.js', array(), null, false );

    wp_enqueue_script( 'easing', get_template_directory_uri() . '/js/jquery.easing.min.js',  array(), null, false );
    wp_enqueue_script( 'history', get_template_directory_uri() . '/js/jquery.history.js',  array(), null, true );
    wp_enqueue_script( 'imgLiquid', get_template_directory_uri() . '/js/imgLiquid-min.js',  array(), null, true );
    wp_enqueue_script( 'fullscreen', get_template_directory_uri() . '/js/screenfull.min.js',  array(), null, true );
    wp_enqueue_script( 'infobox', get_template_directory_uri() . '/js/infobox.js',  array(), null, true );
    wp_enqueue_script( 'easing', get_template_directory_uri() . '/js/caroufredsel/jquery.easing.1.3.js',  array(), null, true );
    wp_enqueue_script( 'caroufredsel', get_template_directory_uri() . '/js/caroufredsel/jquery.carouFredSel-6.2.1.js',  array(), null, true );
    wp_enqueue_script( 'touchSwipe', get_template_directory_uri() . '/js/caroufredsel/helper-plugins/jquery.touchSwipe.min.js',  array(), null, true );
    wp_enqueue_script( 'fastclick', get_template_directory_uri() . '/js/fastclick.js',  array(), null, true );
    
    wp_enqueue_script( 'handlebars', get_template_directory_uri() . '/js/handlebars-v3.0.0.js',  array(), null, true );
    wp_enqueue_script( 'jssor', get_template_directory_uri() . '/js/jssor.js',  array(), null, true );
    wp_enqueue_script( 'jssor.slider', get_template_directory_uri() . '/js/jssor.slider.js',  array(), null, true );
    wp_enqueue_script( 'waypoints', get_template_directory_uri() . '/js/jquery.waypoints.min.js',  array(), null, false );

   
/*    wp_enqueue_script( 'appjs', get_template_directory_uri() . '/js/app.js',  array(), null, true ); */
    wp_enqueue_script( 'mainjs', get_template_directory_uri() . '/js/main.js',  array(), null, true );
	
	
	wp_enqueue_style( 'normalize', get_template_directory_uri() . '/css/normalize.min.css',  array(), null, false );
	//wp_enqueue_style( 'onepagecss', get_template_directory_uri() . '/css/onepage-scroll.css',  array(), null, false );
	//wp_enqueue_style( 'fullPageCSS', get_template_directory_uri() . '/css/jquery.fullPage.css',  array(), null, false );
	wp_enqueue_style( 'fonts', get_template_directory_uri() . '/css/fonts/fonts.css',  array(), null, false );
	wp_enqueue_style( 'maincss', get_template_directory_uri() . '/css/main.css',  array(), null, false );

}

add_action( 'wp_enqueue_scripts', 'initial_scripts_styles' );

/*** CUSTOM POST TYPES ***/

add_action( 'init', 'create_post_type_services' );
function create_post_type_services() {
	register_post_type( 'services',
		array(
			'labels' => array(
				'name' => __( 'Services' ),
				'add_new_item' => __( 'Add New Services' ),
				'new_item' => __( 'New Services' ),
				'edit_item' => __( 'Edit Services' ),
				'view_item' => __( 'View Services' ),
				'singular_name' => __( 'Service' )
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug' => 'services_list'),
			'supports' => array( 'revisions','title')
		)
	);
}

add_action( 'init', 'create_post_type_projects' );
function create_post_type_projects() {
	register_post_type( 'projects',
		array(
			'labels' => array(
				'name' => __( 'Project' ),
				'add_new_item' => __( 'Add New Project' ),
				'new_item' => __( 'New Project' ),
				'edit_item' => __( 'Edit Project' ),
				'view_item' => __( 'View Projects' ),
				'singular_name' => __( 'project' )
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug' => 'projects_list'),
			'supports' => array( 'revisions','title', 'editor')
		)
	);
}

//Handler POST
add_action('wp_ajax_nopriv_get_page_fields', 'get_page_fields');
add_action('wp_ajax_get_page_fields', 'get_page_fields');

function get_page_fields(){

	//$frontpage_id = get_option('page_on_front');
	$page = get_option('page_on_front');//$_POST["page"];
	
	$front = get_field('home_front',$page);
	$work = get_field('home_work',$page);
	$services = get_field('home_services',$page);
	$about = get_field('home_about',$page);
	$shop = get_field('home_shop',$page);

	$fields = array(
		'front'=>$front,
		'work'=>$work,
		'services'=>$services,
		'about'=>$about,
		'shop'=>$shop
		);

	echo json_encode($fields);
	die();

	//$out =json_encode($design_sets) ;

	//echo $out;
	//die(); 
}

add_action('wp_ajax_nopriv_get_services', 'get_services');
add_action('wp_ajax_get_services', 'get_services');

function get_services(){
	$args = array(
  	'post_type'		=> 'services',
	'posts_per_page'	=> -1,
	//'meta_key'		=> 'service_letter',
	//'orderby'		=> 'meta_value_num',
	'orderby' => 'title',
	'order'			=> 'ASC');

 
  $data = get_posts($args);

  $items = NULL;
  $letter = "none";
  for($i=0;$i<count($data);$i++){
  	$id = $data[$i]->ID;
  	$items[$i]['id'] = $id;
    $items[$i]['title'] = $data[$i]->post_title;
    $items[$i]['service'] = get_field('service',$id);
    $items[$i]['service_letter'] = get_field('service_letter',$id);
    $items[$i]['letter_hide'] = $letter;
    if($letter=="none"){
    	$letter = "block";
    }
  }   
  	echo json_encode(array('services'=>$items));
	die();
}


add_action('wp_ajax_nopriv_get_page_about', 'get_page_about');
add_action('wp_ajax_get_page_about', 'get_page_about');

function get_page_about(){


	$post = get_posts(array('name' => 'about','post_type' => 'page'));	
	$page = $post[0]->ID;
	
	$content = wpautop($post[0]->post_content);
	$slider_pictures = get_field('slider_pictures',$page);
	$team_members = get_field('team_members',$page);
	

	$fields = array(
		'content'=>$content,
		'slider_pictures'=>$slider_pictures,
		'team_members'=>$team_members
		);

	echo json_encode($fields);
	die();

}

add_action('wp_ajax_nopriv_get_projects', 'get_projects');
add_action('wp_ajax_get_projects', 'get_projects');

function get_projects(){

	$args = array(
		'post_type'		=> 'projects',
		'posts_per_page'=> -1,
		'orderby'           => 'menu_order',
		'order'           => 'ASC',
		);

	$data = get_posts($args);
	$items = NULL;
	for($i=0;$i<count($data);$i++){
		$id = $data[$i]->ID;
		$items[$i]['id'] = $id;
		$items[$i]['title'] = $data[$i]->post_title;
		$items[$i]['content'] = $data[$i]->post_title;//$data[$i]->post_content;
		$items[$i]['pictures'] = get_field('pictures',$id);
		$items[$i]['services'] = get_field('services',$id);
		$items[$i]['location'] = get_field('location',$id);
		
	}   
	
	echo json_encode(array('projects'=>$items,'title'=>$items[0]['content']));
	die();

	
}

add_action('wp_ajax_nopriv_get_store_data', 'get_store_data');
add_action('wp_ajax_get_store_data', 'get_store_data');

function get_store_data(){

	$product_categories = get_product_categories(0);
	$items = NULL;
	$i=0;
	foreach ($product_categories as $category) {
		if($category->parent==0){
			$thumbnail_id = get_woocommerce_term_meta( $category->term_id, 'thumbnail_id', true );

			$items[$i]['id'] = $category->cat_ID;
			$items[$i]['category'] = $category->name;
		    //$items[$i]['image'] = wp_get_attachment_image( $thumbnail_id,'full');
		    $items[$i]['image'] = wp_get_attachment_url( $thumbnail_id);
		    $items[$i]['subcategories'] = get_subcategories($category->cat_ID);
		    $i++;

		}
	}

	echo json_encode(array('store'=>$items));
	die();

}

function get_subcategories($parent){

	$product_categories = get_product_categories($parent);
	$items = NULL;
	$i=0;
	foreach ($product_categories as $category) {
		$thumbnail_id = get_woocommerce_term_meta( $category->term_id, 'thumbnail_id', true );

		$items[$i]['id'] = $category->cat_ID;
		$items[$i]['parent'] = $parent;
		$items[$i]['category'] = $category->name;
	    $items[$i]['image'] = wp_get_attachment_url( $thumbnail_id);
	    $items[$i]['products'] = get_products($category->name);

	    $i++;
	}

	return $items;

}

function get_product_categories($parent){

	$args = array(
	    'type'                     => 'product',
	    'child_of'                 => $parent,
	    //'parent'                   => $parent,
	    'orderby'                  => 'term_group',
	    'hide_empty'               => false,
	    'hierarchical'             => 1,
	    'exclude'                  => '',
	    'include'                  => '',
	    'number'                   => '',
	    'taxonomy'                 => 'product_cat',
	    'pad_counts'               => false
	);
	 
	$product_categories = get_categories($args);

	return $product_categories;
}

function get_products($category){

	$args = array( 'post_type' => 'product', 'posts_per_page' => -1, 'product_cat' => $category, 'orderby' => 'id' );
	$products = new WP_Query( $args );

	$items = NULL;
	$i=0;

	foreach ($products->posts as $item) {
		$post_thumbnail_id = get_post_thumbnail_id( $item->ID );
		$_product = get_product( $item->ID );

		$items[$i]['id'] = $item->ID;
		$items[$i]['count'] = $i;
		$items[$i]['title'] = $item->post_title;
		$items[$i]['subcategory'] = $category;
		$items[$i]['image'] =  wp_get_attachment_url( $post_thumbnail_id);
		$items[$i]['length'] =  $_product->length;
		$items[$i]['width'] =  $_product->width;
		$items[$i]['height'] =  $_product->height;
		$items[$i]['price'] =  $_product->price;
		$items[$i]['weight'] =  $_product->weight;

		$i++;

	}

	return $items;

}


