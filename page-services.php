<?php
/*
Template Name: Services Template
*/

?>

<?php get_header(); ?>




<script type="text/javascript">
	

$(document).ready(function() {
	set_page_services();
})




$(window).resize(function() {
	w = $(window).width();
	$('.services_list .column_right').width(w-330);
});

</script>

<?php get_footer(); ?>

