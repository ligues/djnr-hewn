<?php get_header(); ?>

<?php while ( have_posts() ) : the_post(); ?>



<div style="width:100%;height:100%;">

	<?php the_content(); ?>

</div>


<?php endwhile; // end of the loop. ?>



<?php get_footer(); ?>
