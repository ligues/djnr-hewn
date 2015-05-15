var h;
var w;
var image_i = 0;     
var scroll_positions = [];
var store;
var current_product = 0;
var map;
var current_project = 0;

$(document).ready(function() {

	History.Adapter.bind(window,'statechange',function(){ 
        var State = History.getState(); 
    });

	FastClick.attach(document.body);
	
});

function set_buttons(){

	$('.fullscreen').click(function(){

		if (screenfull.enabled) {
			if(screenfull.isFullscreen){
				$(this).find('span').html("+")
				screenfull.exit();
			}
			else{
				$(this).find('span').html("-")
				screenfull.request();	

			}
        	
	    } else {
	        
	    }
	})

	$('#navigation_guide.services_page .arrows .top').click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
  		return false;
	})

	$('.menu_mobile').click(function(){
		$('.menu_links').fadeIn();
		$("body").css("overflow-y", "hidden");

		$('.menu_links').bind('touchmove', function (e) {
          e.preventDefault()
        });

	})

	$('.menu_links_close').click(function(){
		$('.menu_links').fadeOut();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
	})

	$('#btn_home,#btn_home_mobile,.logo_mobile').click(function(e){
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		History.pushState(null, null,WP+"/"); 
		set_page_home();
	})

	$('#btn_services,#btn_services_mobile').click(function(e){
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		History.pushState(null, null,WP+"/services"); 
		set_page_services();
	})

	$('#btn_about,#btn_about_mobile').click(function(e){
		History.pushState(null, null,WP+"/about"); 
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		set_page_about();
	})

	$('#btn_projects,#btn_projects_mobile').click(function(e){
		History.pushState(null, null,WP+"/projects"); 
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		set_page_projects();
	})

	$('#btn_store,#btn_store_mobile').click(function(e){
		History.pushState(null, null,WP+"/store"); 
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		set_page_store();
	})


	$('#link_services').click(function(e){
		History.pushState(null, null,WP+"/services"); 
		e.preventDefault();
		set_page_services();
	})

	$('#link_about').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/about"); 
		set_page_about();
	})

	$('#link_projects').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/projects"); 
		set_page_projects();
	})

	$('#link_store').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/store"); 
		set_page_store();
	})

}

function set_page_home(){
	$('.loader').fadeIn();

	v = Math.floor((Math.random() * 1000) + 1)
	var timer;
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_page_fields"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/home.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('.page').html(template(data)).hide(0).fadeIn('slow');
		  		resize_home();
				front_links();
				set_buttons();

				start_slider();
				
				$('body').scroll(function() {
			        var top = $(window).scrollTop();
			        if (top < 50) {
			            $("#navigation_guide.home").fadeOut();
			        }
			    });

			    $(window).bind("resize", resize_home);
			    $(window).resize();

			    $('.loader').fadeOut(1200);

			})
		}
    });
}

function start_slider(){

  	var image = $('.main_image');
  	image_i=1;
	timer = setInterval(function(){   
		
		if(image_i==1){
			image.removeClass("bg14");
		}

		image.addClass("bg"+image_i)
		image.removeClass("bg"+(image_i-1));
		

		if(image_i == 14){
			image_i = 1;
		}
		else{
			image_i++;
		}


		
	}, 1500);     
}

function stop_slider(){
	clearInterval(timer);
}

function set_page_about(){
	$('.loader').fadeIn();
	v = Math.floor((Math.random() * 1000) + 1)
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_page_about"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/about.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('.page').html(template(data)).hide(0).fadeIn('slow');
				set_buttons();

				h = window.innerHeight;
				w = window.innerWidth;

		        $('header').width(w);


				$(window).bind("resize", function(){
					h = window.innerHeight;
					w = window.innerWidth;
					$('header').width(w);
				});

				$('body').css('overflow-x','visible');

				

				$('#about_slides').carouFredSel({
	        		circular: true,
	        		infinite:true,
	        		auto:false,
	        		responsive:true,
	        		width: w,
	        		prev:'.arrow.left',
	        		next:'.arrow.right',
					height: 500,
					items: {
						visible: 1,
						width: w, 
						height: 500
					},
					scroll: {
						easing: "easeInOutCubic",
						//easing: "easeOutCubic",
						//fx              : "linear",
        				duration        : 500

					},
					swipe: true
	        	});
		        		        

		      	$("#shop_link").click(function(e) {
					e.preventDefault();
					
					//$("#team_link").removeClass("active_link");
					//$("#shop_link").addClass("active_link");

				    $('body').animate({		
				        scrollTop: $('.about_shop_content').offset().top - 300
				    }, 1000);
				});

				$("#team_link").click(function(e) {
					e.preventDefault();
					//$("#shop_link").removeClass("active_link");
					//$("#team_link").addClass("active_link");
					
				    $('body').animate({
				        scrollTop: $('.about_team').offset().top - 250
				    }, 1000);
				});
 
 				$('.about_shop_content').waypoint(function(direction) {					
					
					$("#team_link").removeClass("active_link");
					$("#shop_link").addClass("active_link");
					
				}
				, { offset: 179}
				)

				$('.about_team').waypoint(function(direction) {					
					
					$("#shop_link").removeClass("active_link");
					$("#team_link").addClass("active_link");
					
				}
				, { offset: 250}
				
				)
 
 				$('.loader').fadeOut(1200);
				
			})
		}
    });		


}

function set_page_services(){
	$('.loader').fadeIn();
	v = Math.floor((Math.random() * 1000) + 1)
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_services"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/services.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('.page').html(template(data)).hide(0).fadeIn('slow');
		  		set_buttons();

				w = $(window).width();
				$('.services_list .column_right').width(w-330);

				$('header').width(w-35);
				
				$('body').css('overflow-x','visible');

				$(window).bind("resize", function(){
					$('header').width(w-35);
					$('.services_list .column_right').width(w-330);
				});

				

				jQuery.each($('.letter_point'), function() {
					var waypoint = new Waypoint({
					  element: document.getElementById(this.id),
					  handler: function(direction) {
					    $('.letter_links a').removeClass('active_link');
					    $('#'+$(this)[0].element.attributes["data-letter"].nodeValue).addClass("active_link")
					    letter = $(this)[0].element.attributes["data-letter"].nodeValue.substr($(this)[0].element.attributes["data-letter"].nodeValue.length-1)
						$('#letter_header .letter').html(letter)
					  },
  						offset: 179
					})
				});

				jQuery.each($('.services_list .letter'), function() {
					var obj = new Object();
					if(this.attributes["data-letter"]){
						obj["letter"] = this.attributes["data-letter"].nodeValue;
						obj["position"] = $(eval('scroll_'+this.attributes["data-letter"].nodeValue)).offset().top
						scroll_positions.push(obj)
					}
				});

				$(".letter_links a").click(function(e) {
					e.preventDefault();
					var scroll = 0;
					var link = this;
					jQuery.each( scroll_positions  ,function(key,value){
						if(value.letter==link.id){
							scroll = value.position
						}
					})

					if($('body').scrollTop() > scroll){
						$('body').animate({
					        scrollTop: scroll - 181
					    }, 1000);
					}
					else{
						$('body').animate({
					        scrollTop: scroll - 170
					    }, 1000);	
					}
				});

				$('.loader').fadeOut(1200);

			})
		}
	});	
	
	set_buttons();
}

function set_page_projects(){
	$('.loader').fadeIn();
	v = Math.floor((Math.random() * 1000) + 1)

	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_projects"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/projects.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('.page').html(template(data)).hide(0).fadeIn('slow');
		  		set_buttons();

		  		//$(window).bind("resize", resize_projects_bg);


		  		$('body').bind('mousewheel',MouseWheelHandler);
		  		$('body').bind('DOMMouseScroll',MouseWheelHandler);
		  		var i=0;
				function MouseWheelHandler(e) {

					var e = window.event || e;
					var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

					e.preventDefault();
				    clearTimeout($.data(this, 'timer'));       

				   
				    if( delta > 0 ) {               
				        i = i+1;       
				        
				        if( i == 2 ) {                  
				            $('#updown').trigger("prev", 1); 
					        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[0].id).data().title)
					        $('#navigation_guide').fadeOut(900);
				        }           

				    } else { 

				        i--;   

				        if(i==-2) {     
				            $('#updown').trigger("next", 1); 
					        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
					        $('#navigation_guide').fadeOut(900);
				        }               

				    } 

				    $.data(this, 'timer', setTimeout(function() {
				        i = 0;
				    }, 50));


				}
   

		  		h = window.innerHeight;
				w = window.innerWidth;

		  		$(window).bind("resize", function(){
					h = window.innerHeight;
					w = window.innerWidth;		  				

					$('#updown').width(w)
					$('#updown').height(h)

		  			jQuery.each($('.project_slider'), function() {

		  				$('#'+this.id).height(h)
		  				$('#'+this.id).width(w)
						
					});

					$('.projects_gradient, .slider_containers, .project_slider,.project_slides').width(w);
					$('.projects_gradient, .slider_containers, .project_slider,.project_slides').height(h);

					$('.project_map,#map').width(w);
					$('.project_map,#map').height(h);

		  		});

				$('.project_slider,.project_slides').width(w);
				$('.project_slider,.project_slides').height(h);

				$('.project_map,#map').width(w);
				$('.project_map,#map').height(h);


				current_project = 0;

				$('.arrow.down').click(function(e){
					e.preventDefault();
					$('#navigation_guide').fadeOut(900);
					if(current_project==$('#updown').children('div').size()-1){
		        		current_project = 0;
		        	}
		        	else{
		        		current_project++; 
		        	}
		        	$('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
					$('#updown').trigger("next", 1);
				})

				$('.arrow.right').click(function(e){
					e.preventDefault();
					$('#navigation_guide').fadeOut(900);
					current_slider = $('#updown').children('div')[0].id;
					$('#project_'+current_slider).trigger("next", 1);
				})

				$('.arrow.left').click(function(e){
					e.preventDefault();
					$('#navigation_guide').fadeOut(900);
					current_slider = $('#updown').children('div')[0].id;
					$('#project_'+current_slider).trigger("prev", 1);
				})


				jQuery.each($('.project_slider'), function() {

		        	$('#'+this.id).carouFredSel({
		        		circular: true,
		        		infinite:true,
		        		auto:false,
		        		responsive:true,
		        		width: '100%',
						items: {
							visible: 1,
							width: '100%', 
							height: 'variable'
						},
						scroll: {
							easing: "easeInOutCubic",
            				duration        : 500

						},
						swipe: true
		        	});

				});

				$('#updown').carouFredSel({
	        		circular: true,
	        		direction: "up",
	        		infinite:true,
	        		auto:false,
	        		mousewheel: true,
	        		responsive:true,
	        		width: '100%',
					items: {
						visible: 1,
						width: '100%',
						height:'variable'
					},
					scroll: {
						easing: "easeInOutCubic",
						//easing: "easeOutCubic",
						//fx              : "linear",
        				duration        : 500,
        				wipe        : true,
        				mousewheel  : true

					}/*,
					swipe       : {
		                onTouch     : true,
		                onMouse     : true
		            }*/
	        	});

	        	$("#updown").swipe({
		            
		            swipeDown: function() {
		                $('#updown').trigger('prev', true);
		                $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[0].id).data().title)
		            },
		            swipeUp: function() {
		                $('#updown').trigger('next', true);
		                $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
		            }
		        });
				

				if((w/h)<1.33){
					$('.project_slides').addClass('portrait');
				}
				else{
					$('.project_slides').removeClass('portrait');
				}


		  		$('#project_services, #project_services_mobile').click(function(e){
		  			e.preventDefault();

		  			$('#navigation_guide').fadeOut(900);
		  			$('#close_nav').fadeOut()

		  			$('.arrow').fadeOut();
		  			e.preventDefault();
		  			project_services['project_services'] = $('#project_'+$('#updown').children('div')[0].id).data().services.split(",")

		  			$('.project_dotted').addClass('title_dotted').removeClass('dotted_top')

		  			$('.project_services_overlay').fadeTo("slow",1)
		  			$('.dotted_project_right_out, .dotted_project_container').fadeOut( function (){
	  					getTemplateAjax( theme + '/templates/project_services.handlebars?v='+v, function(template) {
							data = jQuery.parseJSON(result);
			  				$('#project_services_container').html(template(project_services));
			  				$('#project_services_container ul').slideToggle('slow');
			  				$('#project_services_close').click(function(e){
			  					e.preventDefault();
			  					$('.arrow').fadeIn();
			  					$('.project_dotted').addClass('dotted_top').removeClass('title_dotted')
			  					$('.dotted_project_right_out, .dotted_project_container,#close_nav').fadeIn();
			  					$('.project_services_overlay').fadeOut();
			  					$('#project_services_container').html('');

			  				})
			  			})

	  				});
		  			
		  		})

				
				set_map();

				$('#project_all').click(function(e){
		  			e.preventDefault();
		  			
		  			$('#navigation_guide').fadeOut(900);
		  			$('.project_map').addClass('open');
		  			$('.project_map_back').fadeIn();

		  			$('.project_map_back').click(function(e){
	  					e.preventDefault();

	  					$('.project_map').addClass('close');

	  					setTimeout(function() {
						     $('.project_map').removeClass('close');
						     $('.project_map').removeClass('open');
						 }, 500);
	  					
		  				$('.project_map_back').fadeOut('slow');

	  				}) 
		  			
		  		})

		  		$('.services_close_mobile').click(function(e){
		  			e.preventDefault();
  					$('.arrow').fadeIn();
  					$('.project_dotted').addClass('dotted_top').removeClass('dotted')
  					$('.dotted_project_right_out, .dotted_project_container').fadeIn();
  					$('.project_services_overlay').fadeOut();
  					$('#project_services_container').html('');
		  		})

				$(window).resize();

				$(document).keydown(function(e) {
				    switch(e.which) {
				    	case 27: // esc
				        
		  					$('.project_map').addClass('close');

		  					setTimeout(function() {
							     $('.project_map').removeClass('close');
							     $('.project_map').removeClass('open');
							 }, 500);
		  					
			  				$('.project_map_back').fadeOut('slow');

			  				$('.arrow').fadeIn();
		  					$('.project_dotted').addClass('dotted_top').removeClass('title_dotted')
		  					$('.dotted_project_right_out, .dotted_project_container').fadeIn();
		  					$('.project_services_overlay').fadeOut();
		  					$('#project_services_container').html('');



						break;


				        case 37: // left
				        
				        current_slider = $('#updown').children('div')[0].id;
						$('#project_'+current_slider).trigger("prev", 1);
						$('#navigation_guide').fadeOut(900);
						break;

				        case 39: // right
				        
				        current_slider = $('#updown').children('div')[0].id;
						$('#project_'+current_slider).trigger("next", 1);
						$('#navigation_guide').fadeOut(900);
				        break;

				        case 38: // up
				        
				        $('#updown').trigger("prev", 1); 
				        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[0].id).data().title)
				        $('#navigation_guide').fadeOut(900);
				        break;

				        case 40: // down
				        
				        $('#updown').trigger("next", 1);
				        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
				        $('#navigation_guide').fadeOut(900);
				        break;

				        default: return; // exit this handler for other keys
				    }
				    e.preventDefault(); // prevent the default action (scroll / move caret)
				});


				$('#close_nav').click(function(e){
					if($(this).hasClass('close_nav')){
						$('.content_dotted, .address, .dotted_project_container').hide();
						$('header > div.column.column_center, .dotted_project_right_out').css('height','30px')
						$('body > div.page > header > div.column.column_left > div.dotted').addClass('dotted_w_bottom');	
						$(this).removeClass('close_nav').addClass('open_nav')
					}
					else{
						$('.content_dotted, .address, .dotted_project_container').show();
						$('header > div.column.column_center, .dotted_project_right_out').css('height','140px')
						$('body > div.page > header > div.column.column_left > div.dotted').removeClass('dotted_w_bottom');
						$(this).addClass('close_nav').removeClass('open_nav')
					}
				})

				
				$('.loader').fadeOut(1200);

			})
		}
    });
}

function set_page_store(){
	$('.loader').fadeIn();
	v = Math.floor((Math.random() * 1000) + 1)
	var timer;
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_store_data"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/store.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
				store = jQuery.parseJSON(result);

		  		$('.page').html(template(data)).hide(0).fadeIn('slow');

		  		categories_height();
		  		set_buttons(); 
		  		front_links()

		  		$(window).bind("resize", categories_height);
		  		$(window).bind("resize", front_links);

		  		$('.loader').fadeOut(1200);

		  		$('.link_category').click(function(e){
		  			e.preventDefault();
		  			category = this.attributes["data-category"].nodeValue;
		  			jQuery.each(store.store ,function(key,value){

						if(value.id ==category){

							getTemplateAjax( theme + '/templates/subcategories.handlebars?v='+v, function(template) {
								subcategories = [];
								subcategories['subcategories'] = value.subcategories
						  		$('#store_subcategories').html(template(subcategories)).fadeIn('slow');
						  		subcategories_height();
						  		front_links()
						  		$(window).bind("resize", subcategories_height);


						  		$('.link_subcategories').click(function(e){
						  			e.preventDefault();
						  			category = this.attributes["data-category"].nodeValue;
						  			subcategory = this.attributes["data-subcategory"].nodeValue;
						  			jQuery.each(store.store ,function(key,value){

										if(value.id ==category){
											

											jQuery.each(value.subcategories ,function(key2,value2){

												if(value2.id ==subcategory){

													getTemplateAjax( theme + '/templates/product.handlebars?v='+v, function(template) {
														products = [];
														products['products'] = value2.products
												  		$('#store_products').html(template(products)).fadeIn('slow');
												  		
												  		h = window.innerHeight;
														w = window.innerWidth;

														$('.project_slider,.project_slides').width(w);
														$('.project_slider,.project_slides').height((h-170)); 

												  		var options = {};                            
												        var jssor_slider = new $JssorSlider$('products_slider', options);

												        $('#store_title').html(value2.products[0].title);
												        $('#buy_product').html('Buy Now');
												        $('#product_info').html(value2.products[0].width+'"x'+value2.products[0].height+'"x'+value2.products[0].length+'"</br>'+value2.products[0].weight+'lbs');
												        current_product = value2.products[0].id;

												        $('#buy_product').click(function(e){
												        	e.preventDefault();
												        	addProduct();
												        })

											        	function OnSlidePark(slideIndex, fromIndex) {
											        		
											        		$('#store_title').html($('#product_'+slideIndex).data().title);
												        	current_product = $('#product_'+slideIndex).data().product;
												        	$('#product_info').html($('#product_'+slideIndex).data().width+'"x'+$('#product_'+slideIndex).data().height+'"x'+$('#product_'+slideIndex).data().length+'"</br>'+$('#product_'+slideIndex).data().weight+'lbs');

												        }


												        jssor_slider.$On($JssorSlider$.$EVT_PARK, OnSlidePark);


														})

													return false;
												}
											})

											return false;
										}

									})

						  		})



							})
							return false;
						}

					})

		  		})




			})
		}
    });
}

function resize_home(){
		
	h = window.innerHeight;
	w = window.innerWidth;

	if(w<900){
		$('.main_image, .front_sub').width(w);
		$('.main_image, .front_sub').height(h); 
	}
	else{
		$('.main_image, .front_sub').width(w);
		$('.main_image, .front_sub').height(h); 

			$('.front_links').hover(
			function() {
				$(this).find('.green').stop();
				$(this).find('.front_link').addClass('front_link_grey');
				$(this).find('a').addClass('grey_link');
				$(this).find('.green').show(0);
			}, function() {
				$(this).find('.green').stop();
				$(this).find('.front_link').removeClass('front_link_grey');
				$(this).find('a').removeClass('grey_link');
				$(this).find('.green').hide(0);
			}
		);
	}

}

function center_map(){
    var center = new google.maps.LatLng(30.3077609,-97.7534014);
    map.panTo(center);
}

function set_map(){
	
	var latlng = new google.maps.LatLng(30.3077609,-97.7534014);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        overviewMapControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        /*zoomControl: true,
        
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        scaleControl: true,
        scrollwheel: true,
        panControl: true,
        streetViewControl: false,
        draggable : true,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: true,
        },*/
    }


    map = new google.maps.Map(document.getElementById('map'), myOptions);
    
    var i = 0;

    jQuery.each(data.projects, function() {

    	if(this.location!=""){
	    	var marker_latlng = new google.maps.LatLng(this.location.split(",")[0].trim(),this.location.split(",")[1].trim());	

	    	var marker = new google.maps.Marker({
		      position: marker_latlng,
		      map: map,
		      icon: theme + '/img/mapmarker.png',
		      visible: true,
		      title: this.title
		  	});
	 
	    	var boxText = document.createElement("div");

			//boxText.style.cssText = "border: 0px solid black; margin-top: 0px; background: #A0B350; padding: 0px;";
			boxText.innerHTML = "<div style='width:255px;height:128px;background-size:cover;background-image:url("+this.pictures[0].picture.url+")'><p>"+this.title+"</p></div>";
			
			var myOptions = {
				 content: boxText
				,disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-215,-175)
				,zIndex: null
				,boxStyle: { 
				  opacity: 1
				  ,width: "270px"
				 }
				,closeBoxMargin: "3px 3px 0px 0px"
				,closeBoxURL: theme + '/img/closemap.png'
				,infoBoxClearance: new google.maps.Size(1, 1)
				,isHidden: false
				,pane: "floatPane"
				,enableEventPropagation: false
			};
			
			var ib = new InfoBox(myOptions);
			google.maps.event.addListener(marker, "mouseover", function (e) {
				$('.infoBox').hide(0);
				ib.open(map, this);
			});

			google.maps.event.addListener(marker, "click", function (e) {
				$('.project_map').addClass('close');

				setTimeout(function() {
				     $('.project_map').removeClass('close');
				     $('.project_map').removeClass('open');
				 }, 500);
		  								
			  	$('.project_map_back').fadeOut('slow');

				$('#updown').trigger('slideTo', i);
				i++;
			});

			google.maps.event.addListener(marker, 'mouseout', function() {
			   //ib.close();
			});
		}
    })

}

function resize_projects_bg(){
	h = window.innerHeight;
	w = window.innerWidth;

/*
	$('.caroufredsel_wrapper, .slider_containers, .project_slider,.project_slides').width(w);
	$('.caroufredsel_wrapper, .slider_containers, .project_slider,.project_slides').height(h);

	$('.project_map,#map').width(w);
	$('.project_map,#map').height(h);
*/

	if((w/h)<1.33){
		$('.project_slides').addClass('portrait');
	}
	else{
		$('.project_slides').removeClass('portrait');
	}
}

function front_links(){
	$('.front_link').each(function(index, value){
	      $parent = $(this).parent();
	      $(this).width($parent.width()-40);
	});
}

function categories_height(){
	h = window.innerHeight;
	w = window.innerWidth;

	$('.category').height((h-170)/2);

}

function subcategories_height(){
	h = window.innerHeight;
	w = window.innerWidth;

	$('.subcategory').height((h-170)/2);

}

function addProduct(){
 	$.get(WP + '/?post_type=product&add-to-cart=' + current_product + '&quantity=1', function() {
 		location.href=WP+'/cart/';
 	});
}

function getTemplateAjax(path,callback) {
    var source;
    var template;

    $.ajax({
      url: path,
        success: function(result) {
          source    = result;
          template  = Handlebars.compile(source,{noEscape:true});

          if (callback) callback(template);
        }
    });
}

/*
(function( $ ){

	var self = this;

    var methods = {
        init : function(options) {
        	self.current = 0;
        	self.slides = this.children('div')
        	jQuery.each(this.children('div'),function(i){
        		if(i==0){
        			$(this).css('z-index',401)
        		}
        	})
        }, 
        next : function( ) {    

        	$(self.slides[self.current]).css('z-index',400);
        	if(self.current==self.slides.length-1){
        		self.current = 0;
        	}
        	else{
        		self.current++; 
        	}
        	
        	$(self.slides[self.current]).css('z-index',401);
			$(self.slides[self.current]).css('top',h);
			$(self.slides[self.current]).animate({"top":"0"}, 700,'easeOutCubic');

        },

        get_current : function( ) {  
        	return self.slides[self.current].id
        }
        
    };

    $.fn.updown = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }    
    };


})( jQuery ); */