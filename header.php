<!DOCTYPE html>
<html lang="en">
    <head>
        <base href="<?php echo get_site_url(); ?>/" >
        <meta charset="<?php bloginfo( 'charset' ); ?>" /> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php wp_title(''); ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <?php
            //Grab the page seo settings
            $metadesc = get_post_meta($post->ID, '_yoast_wpseo_metadesc', true);
            $metakeywords = get_post_meta($post->ID, '_yoast_wpseo_metakeywords', true);
        ?>

        <?php if(!empty($metadesc)) : ?><?php endif ?>

        <?php if(!empty($metakeywords)) : ?><meta name="keywords" content="<?php echo $metakeywords ?>" /><?php endif ?>
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1">
        <script type="text/javascript">var store='<?php echo get_store_status(); ?>';var store_l='<?php echo get_store_status_legend(); ?>';var WP = '<?php echo get_site_url(); ?>';var theme = '<?php echo get_stylesheet_directory_uri() ?>';</script>
        <?php  wp_head();  ?> 
        <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAB23etBW4oSvwGuprBnOdezU9n4fMEQzY&sensor=false&libraries=places,geometry">
        </script>
        
    </head>
    <body>
     
    <div class="menu_links">
        <div class="menu_links_close"></div>
        <ul>
            <li id="btn_home_mobile">HOME</li>
            <li id="btn_services_mobile">SERVICES</li>
            <li id="btn_about_mobile">ABOUT</li>
            <li id="btn_projects_mobile">PROJECTS</li>
            <li id="btn_store_mobile">STORE</li>
        </ul>
        <div>
            <a style="text-decoration:none" href="tel:1-512-386-6404"><p>+1 512_386_6404</p></a>
            <p><a href="mailto:info@hewnaustin.com">info@hewnaustin.com</a></p>
            <a href="https://www.google.com/maps/place/HEWN/@30.254549,-97.697018,17z/data=!3m1!4b1!4m2!3m1!1s0x8644b6801475f07f:0x395cc41e1b5fec13"><p>730 Shady Lane Austin TX 78702</p> </a>
        </div>
    </div>

    <div class="page" style="width:100%">

    </div> 

    <div class="loader">
        <div class="loader_image"></div>
    </div>
    
    <nav style="display:none">
        <a href="/">HOME</a>
        <a href="/services">SERVICES</a>
        <a href="/about">ABOUT</a>
        <a href="/projects">PROJECTS</a>
    </nav>


        