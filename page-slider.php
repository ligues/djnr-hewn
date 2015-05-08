<?php
/*
Template Name: Slider Template
*/

$front = get_field('home_front');
$work = get_field('home_work');
$services = get_field('home_services');
$about = get_field('home_about');
$shop = get_field('home_shop');

?>

<?php get_header(); ?>

<header style=" display:none;">
    <div class="column column_left">
        <?php include('header_template.php') ?>
    </div>
    <div class="column column_center"></div>
    <div class="column column_right">
        
        <div class="dotted">
        	<div class="content_dotted">
				Mastercraft + <br/>
				Joinery + Fabrication
			</div>
			<div class="map"><a target="_blank" href="https://www.google.com/maps?es_sm=119&bav=on.2,or.r_cp.r_qf.&um=1&ie=UTF-8&q=vintage+material+supply&fb=1&gl=us&hq=vintage+material+supply&cid=4133394191606606867&sa=X&ei=Up5aVKmkCMH8yQSPy4GwAg&ved=0CCcQrwswAA">730 Shady Lane Austin TX 78702</a></div>
        </div>

    </div>
</header> 


<section class="front">
	<div class="main_image" style="background-image: url(http://djnr.net/projects/hewn/wp-content/themes/djnr-hewn/img/slider/18.jpg);">


	</div>
</section>


<script type="text/javascript">
            

	 $(window).load(function() {      

	 var images = ["18.jpg","2.jpg","18.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg"];
	var i = 0;     
  
  var image = $('.main_image');
                
  setInterval(function(){   
  	i++;
   image.hide(0, function () {
   image.css('background-image', 'url('+theme+'/img/slider/'+images[i]+')');
   image.show(0);
   });
   if(i == images.length)
    i = 0;
  }, 1500);            
 });

</script>


 



<?php get_footer(); ?>

