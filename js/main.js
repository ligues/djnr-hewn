var h;
var w;
var image_i = 0;     
var scroll_positions = [];
var store;
var current_product = 0;
var map;
var current_project = 0;

$(document).ready(function() {

	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
    });

	/*
	$(window).bind('mousewheel DOMMouseScroll', function(event){
		event.preventDefault();

		$('html,body').animate({scrollTop: $("#product_whatsinside").offset().top -80 },'slow');

		return false;

	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	        console.log('up')
	    }
	    else {
	        console.log('down') 
	    }
	}); */
	
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

	$('#btn_home').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/"); 
		set_page_home();
	})

	$('#btn_services').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/services"); 
		set_page_services();
	})

	$('#btn_about').click(function(e){
		History.pushState(null, null,WP+"/about"); 
		e.preventDefault();
		set_page_about();
	})

	$('#btn_projects').click(function(e){
		History.pushState(null, null,WP+"/projects"); 
		e.preventDefault();
		set_page_projects();
	})

	$('#btn_store').click(function(e){
		History.pushState(null, null,WP+"/store"); 
		e.preventDefault();
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
	v = Math.floor((Math.random() * 1000) + 1)
	var timer;
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_page_fields",page:9},
		success: function(result) {
			getTemplateAjax( theme + '/templates/home.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('body').html(template(data)).hide(0).fadeIn('slow');
		  		resize_home();
				front_links();
				set_buttons();

				$(window).bind("resize", resize_home);

				$('.loader').fadeOut(1200);

				$('body').scroll(function() {
			        var top = $(window).scrollTop();
			        console.log(top);
			        if (top < 50) {
			            $("#navigation_guide").fadeOut();
			        }
			    });

			})
		}
    });
}

function start_slider(){

	var images = ["18.jpg","2.jpg","18.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg"];
  	var image = $('.main_image');
	timer = setInterval(function(){   
		image_i++;
		image.hide(0, function () {
			image.css('background-image', 'url('+theme+'/img/slider/'+images[image_i]+')');
			image.show(0);
		});
		if(image_i == images.length)
		image_i = 0;
	}, 1500);     
}

function stop_slider(){
	clearInterval(timer);
}

function set_page_about(){
	v = Math.floor((Math.random() * 1000) + 1)
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_page_about"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/about.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('body').html(template(data)).hide(0).fadeIn('slow');
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
 
				
			})
		}
    });		


}

function set_page_services(){
	v = Math.floor((Math.random() * 1000) + 1)
	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_services"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/services.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('body').html(template(data)).hide(0).fadeIn('slow');
		  		set_buttons();

				w = $(window).width();
				$('.services_list .column_right').width(w-330);

				$('header').width(w-35);
				$(window).bind("resize", function(){
					$('header').width(w-35);
					$('.services_list .column_right').width(w-330);
				});

				$('body').css('overflow-x','visible');

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

			})
		}
	});	
	
	set_buttons();
}

function set_page_projects(){

	v = Math.floor((Math.random() * 1000) + 1)

	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_projects"},
		success: function(result) {
			getTemplateAjax( theme + '/templates/projects.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('body').html(template(data)).hide(0).fadeIn('slow');
		  		set_buttons();

		  		//$(window).bind("resize", resize_projects_bg);

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
		        	$('#project_title').html($('#project_'+$('#updown').children('div')[1].id).data().title)
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
							//easing: "easeOutCubic",
							//fx              : "linear",
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

					},
					swipe: true
	        	});
				

				if((w/h)<1.33){
					$('.project_slides').addClass('portrait');
				}
				else{
					$('.project_slides').removeClass('portrait');
				}


		  		$('#project_services').click(function(e){
		  			e.preventDefault();

		  			$('.arrow').fadeOut();
		  			e.preventDefault();
		  			project_services['project_services'] = $('#project_'+$('#updown').children('div')[0].id).data().services.split(",")

		  			$('.project_dotted').addClass('dotted').removeClass('dotted_top')
		  			$('.project_services_overlay').fadeTo("slow",1)
		  			$('.dotted_project_right_out, .dotted_project_container').fadeOut( function (){
	  					getTemplateAjax( theme + '/templates/project_services.handlebars?v='+v, function(template) {
							data = jQuery.parseJSON(result);
			  				$('#project_services_container').html(template(project_services));
			  				$('#project_services_container ul').slideToggle('slow');
			  				$('#project_services_close').click(function(e){
			  					e.preventDefault();
			  					$('.arrow').fadeIn();
			  					$('.project_dotted').addClass('dotted_top').removeClass('dotted')
			  					$('.dotted_project_right_out, .dotted_project_container').fadeIn();
			  					$('.project_services_overlay').fadeOut();
			  					$('#project_services_container').html('');

			  				})
			  			})

	  				});
		  			
		  		})

				
				set_map();

				$('#project_all').click(function(e){
		  			e.preventDefault();
		  			
		  			
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

				$(window).resize();

				$(document).keydown(function(e) {
				    switch(e.which) {
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
				        $('#project_title').html($('#project_'+$('#updown').children('div')[0].id).data().title)
				        $('#navigation_guide').fadeOut(900);
				        break;

				        case 40: // down
				        
				        $('#updown').trigger("next", 1);
				        $('#project_title').html($('#project_'+$('#updown').children('div')[1].id).data().title)
				        $('#navigation_guide').fadeOut(900);
				        break;

				        default: return; // exit this handler for other keys
				    }
				    e.preventDefault(); // prevent the default action (scroll / move caret)
				});


			})
		}
    });
}

function set_page_store(){
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

		  		$('body').html(template(data)).hide(0).fadeIn('slow');

		  		categories_height();
		  		set_buttons();
		  		front_links()

		  		$(window).bind("resize", categories_height);
		  		$(window).bind("resize", front_links);

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

	$('.main_image, .front_sub').width(w);
	$('.main_image, .front_sub').height(h); 


	//$(".imgLiquidFill").imgLiquid({responsive:true});


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
        /*zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
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
				  ,width: "255px"
				 }
				,closeBoxMargin: "0px"
				,closeBoxURL: theme + '/img/closemap.png'
				,infoBoxClearance: new google.maps.Size(1, 1)
				,isHidden: false
				,pane: "floatPane"
				,enableEventPropagation: false
			};
			
			var ib = new InfoBox(myOptions);
			google.maps.event.addListener(marker, "mouseover", function (e) {
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
			   ib.close();
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