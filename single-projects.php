<?php
/*
Template Name: Projects Template
*/

$id = get_the_ID();

?>

<?php get_header(); ?>

<script type="text/javascript">

var data;

$(document).ready(function() {

	set_page_projects(<?php echo $id; ?>);
})

$(window).resize(function() {
	
	/*
	$( ".project_slider" ).each(function( index ) {
		var parentWidth = $(this).parent().width();
        if (parentWidth) {
        	var options = {};
        	var jssor_slider = new $JssorSlider$(this.id, options);
            jssor_slider.$ScaleWidth(parentWidth);	
        }
        else
            window.setTimeout(ScaleSlider, 30);	
	}); */


	

});

</script>

<?php get_footer(); ?>

