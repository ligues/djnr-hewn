<!DOCTYPE html>
<html lang="en">
    <head>
        <base href="<?php echo get_site_url(); ?>/" >
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>HEWN</title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <meta name="description" content="<?php bloginfo('description'); ?>" />
        <meta property="og:url" content="<?php the_permalink(); ?>" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <script type="text/javascript">var WP = '<?php echo get_site_url(); ?>';var theme = '<?php echo get_stylesheet_directory_uri() ?>';</script>
        <?php  wp_head();  ?> 
        <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAB23etBW4oSvwGuprBnOdezU9n4fMEQzY&sensor=false&libraries=places,geometry">
        </script>
        
    </head>
    <body>

        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->


        