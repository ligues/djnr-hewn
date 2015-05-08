<?php
/*
Template Name: Home Template
*/

?>

<?php get_header(); ?>

<script type="text/javascript">

$(document).ready(function() {
	set_page_home();
})

$(window).resize(function() {
	front_links();
});

</script>

<?php get_footer(); ?>

