var h;
var w;
var image_i = 0;     
var scroll_positions = [];
var store;
var current_product = 0;
var map;
var current_project = 0;
var wheel_i=0;
var slide_services = 0;
var page = "";
var interval;

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//GA

// Function to load and initiate the Analytics tracker
function gaTracker(id){
  $.getScript('//www.google-analytics.com/analytics.js'); // jQuery shortcut
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', id, 'auto');
  ga('send', 'pageview');
}

// Function to track a virtual page view
function gaTrack(path, title) {
  ga('set', { page: path, title: title });
  ga('send', 'pageview');
}

// Initiate the tracker after app has loaded
gaTracker('UA-48073594-1');

$(document).ready(function() {

	History.Adapter.bind(window,'statechange',function(){ 
        var State = History.getState(); 

        switch(State.title){
		case "home": $("#btn_home").click(); break; 
		case "services": $("#btn_services").click(); break;
		case "about": $("#btn_about").click(); break;
		case "projects": $("#btn_projects").click(); break;
		case "store": $("#btn_store").click(); break; 
	  }

    });

	FastClick.attach(document.body);
	
});

function set_buttons(){

	$('body').unbind('mousewheel',MouseWheelHandler);
	$('body').unbind('DOMMouseScroll',MouseWheelHandler);

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

	if(store!='1'){
		$('#btn_store,#btn_store_mobile').hide();
		$('#link_shop').hide();
		$('#store_legend').html(store_l);
		$('#store_legend').show();
	}

	$('#navigation_guide.services_page .arrows .top').click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
  		return false;
	})

	$('.menu_mobile').click(function(){
		$('.menu_links').fadeIn();
		$("body").css("overflow-y", "hidden");

		$('#navigation_guide.services_page .arrows .top').hide();

		$('.menu_links').bind('touchmove', function (e) {
          e.preventDefault()
        });

	})

	$('.menu_links_close').click(function(){
		$('.menu_links').fadeOut();
		$('#navigation_guide.services_page .arrows .top').show();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
	})

	$('#btn_home,#btn_home_mobile,.logo_mobile').click(function(e){
		window.scrollTo(0, 0);
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		History.pushState(null, "home",WP+"/");
		set_page_home();
	})

	$('#btn_services,#btn_services_mobile').click(function(e){
		window.scrollTo(0, 0);
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		History.pushState(null, "services",WP+"/services"); 
		clearInterval(interval);
		set_page_services();
	})

	$('#btn_about,#btn_about_mobile').click(function(e){
		window.scrollTo(0, 0);
		History.pushState(null, "about",WP+"/about"); 
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		clearInterval(interval);
		set_page_about();
	})

	$('#btn_projects,#btn_projects_mobile').click(function(e){
		History.pushState(null, "projects",WP+"/projects"); 
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		clearInterval(interval);
		set_page_projects(0);
	})

	$('#btn_store,#btn_store_mobile').click(function(e){
		History.pushState(null, "store",WP+"/store"); 
		e.preventDefault();
		$('.menu_links').unbind('touchmove');
		$("body").css("overflow-y", "visible");
		$('.menu_links').fadeOut();
		clearInterval(interval);
		set_page_store();
	})


	$('#link_services').click(function(e){
		History.pushState(null, null,WP+"/services"); 
		e.preventDefault();
		clearInterval(interval);
		set_page_services();
	})

	$('#link_about').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/about"); 
		clearInterval(interval);
		set_page_about();
	})

	$('#link_projects').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/projects"); 
		clearInterval(interval);
		set_page_projects(0);
	})

	$('#link_store').click(function(e){
		e.preventDefault();
		History.pushState(null, null,WP+"/store"); 
		clearInterval(interval);
		set_page_store();
	})

}

function set_page_home(){

	if(page=="home"){
		return;
	}

	gaTrack('/', 'Home');

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

				h = window.innerHeight;
				w = window.innerWidth;		  				

				$('.home_slides_container, .home_slide').width(w)
				$('.home_slides_container, .home_slide').height(h)

				$('#home_slides').width(w)
				$('#home_slides').height(h)

				$('#home_slides').carouFredSel({
	        		circular: true,
	        		infinite:true,
	        		auto:false,
	        		responsive:true,
	        		width: '100%',
	        		prev:'div.home_slides_container > div.arrow.left',
	        		next:'div.home_slides_container > div.arrow.right',
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
				
	        	hs = $('.front_links.services').height();
	        	ws = $('.front_links.services').width()
	        	$('.services_slide, #services_slider').width(ws)
				$('.services_slide, #services_slider').height(hs)

				
				var slide_services = 0;
				interval= setInterval(increment,1500);  

				$( ".front_links.services" )
				  .mouseover(function() {
				    $('#services_slider').hide();
				  })
				  .mouseout(function() {
				    $('#services_slider').show();
				  });


				  $(document).keydown().off();

	        	$(document).keydown(function(e) {
				    switch(e.which) {
				    	

				        case 37: // left
						$('#home_slides').trigger("prev", 1);
						break;

				        case 39: // right
				        
				        $('#home_slides').trigger("next", 1);
				        break;

				        default: return; // exit this handler for other keys
				    }
				    e.preventDefault(); // prevent the default action (scroll / move caret)
				});

				
	        	$('body').css('overflow-x','visible');

				// Listen for orientation changes
				window.addEventListener("orientationchange", function() {
					
					t = 500;

					if( isMobile.iOS() ) {
						t=0;
					}

					setTimeout(function() {
				     	
						h = window.innerHeight;
						w = window.innerWidth;

						resize_home();

						$('.home_slides_container, .home_slide').width(w)
						$('.home_slides_container, .home_slide').height(h)

						hs = $('.front_links.services').height();
			        	ws = $('.front_links.services').width();

			        	$('.services_slide, #services_slider').width(ws)
						$('.services_slide, #services_slider').height(hs)

						$('#home_slides').trigger('updateSizes');
					}, t);

				}, false);


				if(isTouchDevice()===false){
					
					$(window).bind("resize", function(){
						h = window.innerHeight;
						w = window.innerWidth;


						$('.home_slides_container, .home_slide').width(w)
						$('.home_slides_container, .home_slide').height(h)

						resize_home();

						hs = $('.front_links.services').height();
			        	ws = $('.front_links.services').width();

			        	$('.services_slide, #services_slider').width(ws)
						$('.services_slide, #services_slider').height(hs)


						$('#home_slides').trigger('updateSizes');

			  		});
			  	}

		  		$(window).resize();

			    $('.loader').fadeOut(1200);

			})
		}
    });

	page = "home";

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

	if(page=="about"){
		return;
	}

	gaTrack('/', 'About');

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

				$('.home_slides_container, .home_slide').width(w)
				$('.home_slides_container, .home_slide').height(h)

				
				if(w<900){
						$('.about_page.services_list .column_right .single_dotted').width(w-125);
						$('.services_list.people .column_right .single_dotted').width(w-125);
					}
					else{
						$('.about_page.services_list .column_right .single_dotted').width(w-425);
						$('.services_list.people .column_right .single_dotted').width(w-390);
					}

				$(window).bind("resize", function(){

					if(w<900){
						$('.about_page.services_list .column_right .single_dotted').width(w-125);
						$('.services_list.people .column_right .single_dotted').width(w-125);
					}
					else{
						$('.about_page.services_list .column_right .single_dotted').width(w-425);
						$('.services_list.people .column_right .single_dotted').width(w-390);
					}
				
				});


				$('#home_slides').carouFredSel({
	        		circular: true,
	        		infinite:true,
	        		auto:false,
	        		responsive:true,
	        		width: '100%',
	        		prev:'div.home_slides_container > div.arrow.left',
	        		next:'div.home_slides_container > div.arrow.right',
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

	        	$(document).keydown().off();

	        	$(document).keydown(function(e) {
				    switch(e.which) {
				    	

				        case 37: // left
						$('#home_slides').trigger("prev", 1);
						break;

				        case 39: // right
				        
				        $('#home_slides').trigger("next", 1);
				        break;


				        default: return; // exit this handler for other keys
				    }
				    e.preventDefault(); // prevent the default action (scroll / move caret)
				});

				// Listen for orientation changes
				window.addEventListener("orientationchange", function() {
					
					t = 500;

					if( isMobile.iOS() ) {
						t=0;
					}

					setTimeout(function() {
				     	
						h = window.innerHeight;
						w = window.innerWidth;

						$('.home_slides_container, .home_slide').width(w)
						$('.home_slides_container, .home_slide').height(h)

						$('#home_slides').trigger('updateSizes');
					}, t);

				}, false);


				
	        	if(isTouchDevice()===false){

					$(window).bind("resize", function(){
						h = window.innerHeight;
						w = window.innerWidth;


						$('.home_slides_container, .home_slide').width(w)
						$('.home_slides_container, .home_slide').height(h)

						$('#home_slides').trigger('updateSizes');

			  		});
			  	}

				$('body').css('overflow-x','visible');

		  		$(window).resize();

				

		      	$("#shop_link").click(function(e) {
					e.preventDefault();

				    $('html,body').animate({		
				        scrollTop: $('.about_shop_content').offset().top -50
				    }, 1000);
				});

				$("#team_link").click(function(e) {
					e.preventDefault();
					
				    $('html,body').animate({
				        scrollTop: $('.about_team').offset().top - 50
				    }, 1000);
				});
 
 				$('.loader').fadeOut(1200);
				
			})
		}
    });		


	page = "about";

}

function set_page_services(){

	if(page=="services"){
		return;
	}

	gaTrack('/', 'Services');

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

				if(w<900){
					$('.services_list .column_right').width(w-55);		
					
				}
				else{
					$('.services_list .column_right').width(w-330);	
				}



				$('header').width(w-35);
				
				$('body').css('overflow-x','visible');

				$(window).bind("resize", function(){
					$('header').width(w-35);

					if(w<900){
						$('.services_list .column_right').width(w-55);		
					}
					else{
						$('.services_list .column_right').width(w-330);	
					}


					scroll_positions = [];

					jQuery.each($('.services_list .letter'), function() {
						var obj = new Object();
						if(this.attributes["data-letter"]){
							obj["letter"] = this.attributes["data-letter"].nodeValue;
							obj["position"] = $(eval('scroll_'+this.attributes["data-letter"].nodeValue)).offset().top
							scroll_positions.push(obj)
						}
					});

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

				/*jQuery.each($('.services_list .letter'), function() {
					var obj = new Object();
					if(this.attributes["data-letter"]){
						obj["letter"] = this.attributes["data-letter"].nodeValue;
						obj["position"] = $(eval('scroll_'+this.attributes["data-letter"].nodeValue)).offset().top
						scroll_positions.push(obj)
					}
				});*/

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
						$('html,body').animate({
					        scrollTop: scroll - 181
					    }, 1000);
					}
					else{
						$('html,body').animate({
					        scrollTop: scroll - 170
					    }, 1000);	
					}
				});


				$('.loader').fadeOut(1200);

				setTimeout(function() {
				     $(window).resize();
				 }, 5000);

				

			})
		}
	});	
	
	
	set_buttons();

	page = "services";
}

function set_page_projects(_id){

	if(page=="projects"){
		return;
	}

	

	gaTrack('/', 'Projects');

	$('.loader').fadeIn();
	v = Math.floor((Math.random() * 1000) + 1)

	$.ajax({
		url:  WP+"/wp-admin/admin-ajax.php",
		method: 'post',
		data: {action:"get_projects",id:_id},  
		success: function(result) {
			getTemplateAjax( theme + '/templates/projects.handlebars?v='+v, function(template) {
				data = jQuery.parseJSON(result);
		  		$('.page').html(template(data)).hide(0).fadeIn('slow');
		  		set_buttons();

		  		//$(window).bind("resize", resize_projects_bg);

		  		$('#updown').bind('touchmove', function (e) {
		          e.preventDefault()
		        });

		  		$('body').bind('mousewheel',MouseWheelHandler);
		  		$('body').bind('DOMMouseScroll',MouseWheelHandler);

		  		h = window.innerHeight;
				w = window.innerWidth;

				setTimeout(function() {
				     	$('#navigation_guide').fadeOut(900);
						$('.arrow.down').fadeIn(900);
				 }, 10000);

				if(isMobile.any()){
					$('.fullscreen').hide();
				}

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

				$('.arrow.down').click(function(e){
					e.preventDefault();
					$('#navigation_guide').fadeOut(900);
					$('.arrow.down').fadeIn(900);

					if(current_project==$('#updown').children('div').size()-1){
		        		current_project = 0;
		        	}
		        	else{
		        		current_project++; 
		        	}
		        	$('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
					$('#updown').trigger("next", 1);

					gaTrack('/projects/', $('#project_'+$('#updown').children('div')[1].id).data().title);
					History.pushState(null, null,$('#project_'+$('#updown').children('div')[1].id).data().permalink); 

				})

				$('.arrow.right').click(function(e){
					e.preventDefault();
					$('#navigation_guide').fadeOut(900);
					$('.arrow.down').fadeIn(900);
					current_slider = $('#updown').children('div')[0].id;
					$('#project_'+current_slider).trigger("next", 1);
				})

				$('.arrow.left').click(function(e){
					e.preventDefault();
					$('#navigation_guide').fadeOut(900);
					$('.arrow.down').fadeIn(900);
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
		                gaTrack('/projects/', $('#project_'+$('#updown').children('div')[0].id).data().title);
		                History.pushState(null, null,$('#project_'+$('#updown').children('div')[0].id).data().permalink); 
		            },
		            swipeUp: function() {
		                $('#updown').trigger('next', true);
		                $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
		                gaTrack('/projects/', $('#project_'+$('#updown').children('div')[1].id).data().title);
		                History.pushState(null, null,$('#project_'+$('#updown').children('div')[1].id).data().permalink); 
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


		  			$('body').unbind('mousewheel');
		  			$('body').unbind('DOMMouseScroll');

		  			$('header').css('position','relative')


		  			$('.arrow').fadeOut();
		  			e.preventDefault();
		  			project_services['project_services'] = $('#project_'+$('#updown').children('div')[0].id).data().services.split("|")

		  			$('.project_dotted').addClass('title_dotted').removeClass('dotted_top')

		  			$('.project_services_overlay').fadeTo("slow",1)
		  			$('.dotted_project_right_out, .dotted_project_container').fadeOut( function (){
	  					getTemplateAjax( theme + '/templates/project_services.handlebars?v='+v, function(template) {
							data = jQuery.parseJSON(result);
			  				$('#project_services_container').html(template(project_services));
			  				


			  				$('#project_services_container ul').slideToggle(100, function(){

			  					hc = $('#project_services_container ul').height();
			  					
			  					if(hc+180>h){
			  						if(w<900){
										$('body').css('height',hc+150);	
									}
									$('.project_services_overlay').css('height',hc+150);
			  					}
			  				});
 
			  				if(w>900){
			  					$('#project_services_close').fadeIn('slow');
			  				}
			  				$('#project_services_close').click(function(e){
			  					e.preventDefault();
			  					$('.arrow').fadeIn();
			  					$('.project_dotted').addClass('dotted_top').removeClass('title_dotted')
			  					$('.dotted_project_right_out, .dotted_project_container,#close_nav').fadeIn();
			  					$('.project_services_overlay').fadeOut();
			  					$('#project_services_close').fadeOut('slow');
			  					$('#project_services_container').html('');

			  					$('body').bind('mousewheel',MouseWheelHandler);
		  						$('body').bind('DOMMouseScroll',MouseWheelHandler);
		  						$('header').css('position','fixed')
		  						$('.project_services_overlay').css('height','100%');
		  						$('body').css('height','100%');	

			  				})
			  			})

	  				});
		  			
		  		})

				set_map();


				$('#project_all').click(function(e){
		  			e.preventDefault();
		  			
		  			$('#navigation_guide').fadeOut(900);
		  			$('.arrow.down').fadeIn(900);
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
  					$('body').css('height','100%');	
  					$('.project_services_overlay').css('height','100%');
		  		})

				//$(window).resize();
				$(document).keydown().off();

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
		  					$('.dotted_project_right_out, .dotted_project_container,#close_nav').fadeIn();
		  					$('.project_services_overlay').fadeOut();
		  					$('#project_services_close').fadeOut('slow');
		  					$('#project_services_container').html('');

		  					$('body').bind('mousewheel',MouseWheelHandler);
		  						$('body').bind('DOMMouseScroll',MouseWheelHandler);
		  						$('header').css('position','fixed')
		  						$('.project_services_overlay').css('height','100%');
		  						$('body').css('height','100%');	


						break;


				        case 37: // left
				        
				        current_slider = $('#updown').children('div')[0].id;
						$('#project_'+current_slider).trigger("prev", 1);
						$('#navigation_guide').fadeOut(900);
						$('.arrow.down').fadeIn(900);

						break;

				        case 39: // right
				        
				        current_slider = $('#updown').children('div')[0].id;
						$('#project_'+current_slider).trigger("next", 1);
						$('#navigation_guide').fadeOut(900);
						$('.arrow.down').fadeIn(900);
				        break;

				        case 38: // up

				        if($('.project_services_overlay').is(':visible')){
				        	return false;
				        }
				        
				        $('#updown').trigger("prev", 1); 
				        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[0].id).data().title)
				        $('#navigation_guide').fadeOut(900);
				        $('.arrow.down').fadeIn(900);
				        gaTrack('/projects/', $('#project_'+$('#updown').children('div')[0].id).data().title);
				        History.pushState(null, null,$('#project_'+$('#updown').children('div')[0].id).data().permalink); 
				        break;

				        case 40: // down
				        
				        if($('.project_services_overlay').is(':visible')){
				        	return false;
				        }

				        $('#updown').trigger("next", 1);
				        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
				        $('#navigation_guide').fadeOut(900);
				        $('.arrow.down').fadeIn(900);
				        gaTrack('/projects/', $('#project_'+$('#updown').children('div')[1].id).data().title);
				        History.pushState(null, null,$('#project_'+$('#updown').children('div')[1].id).data().permalink); 
				        break;

				        default: return; // exit this handler for other keys
				    }
				    e.preventDefault(); // prevent the default action (scroll / move caret)
				});


				$('#close_nav').click(function(e){
					if($(this).hasClass('close_nav')){
						$('.content_dotted, .address, .dotted_project_container').fadeOut();
						$('header > div.column.column_center, .dotted_project_right_out').css('height','30px')
						$('body > div.page > header > div.column.column_left > div.dotted').addClass('dotted_w_bottom');	
						$(this).removeClass('close_nav').addClass('open_nav')
					}
					else{
						$('.content_dotted, .address, .dotted_project_container').fadeIn();
						$('header > div.column.column_center, .dotted_project_right_out').css('height','130px')
						$('body > div.page > header > div.column.column_left > div.dotted').removeClass('dotted_w_bottom');
						$(this).addClass('close_nav').removeClass('open_nav')
					}
				})

				$(window).bind("resize", resize_projects());
				//resize_projects();

				$(window).resize();


				current_project = 0;
				
				$('.loader').fadeOut(1200);

			})
		}
    });

	page = "projects";

}

function set_page_store(){

	if(page=="store"){
		return;
	}

	gaTrack('/', 'Store');

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
		  		front_links();

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

	page = "store";
}

function resize_home(){
		
	h = window.innerHeight;
	w = window.innerWidth;

	if(w<900){
		//$('.main_image, .front_sub').width(w);
	$('.front_sub').height('50%'); 
	$('.front_sub').css('height','auto');

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
    var center = new google.maps.LatLng(39.1661486,-99.2593777);
    map.panTo(center);
}

function set_map(){
	
	var project;
	var latlng = new google.maps.LatLng(39.1661486,-99.2593777);
    var myOptions = {
        zoom: 5,
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

    	project = this.id

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
			boxText.innerHTML = "<div onclick='slide_to("+project+")' style='width:255px;height:128px;background-size:cover;background-image:url("+this.pictures[i].picture.url+")'><div class='gradient' style='height:50px;width:255px;'></div><p>"+this.title+"</p><a href='javascript:slide_to("+project+")' >View Project</a></div>";
			
			var myOptions = {
				 content: boxText
				,disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-260,-175)
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

			/*
			google.maps.event.addListener(marker, "click", function (e) {
				
				$('.project_map').addClass('close');

				setTimeout(function() {
				     $('.project_map').removeClass('close');
				     $('.project_map').removeClass('open');
				 }, 500);
		  								
			  	$('.project_map_back').fadeOut('slow');

				//$('#updown').trigger('slideTo', '#slider_'+project);
				slide_to(project)
				i++;
			});*/

			google.maps.event.addListener(marker, 'mouseout', function() {
			   //ib.close();
			});
		}
    })



	jQuery.each(data.markers, function() {

    	if(this.marker_location!=""){
	    	var marker_latlng = new google.maps.LatLng(this.marker_location.split(",")[0].trim(),this.marker_location.split(",")[1].trim());	

	    	var marker = new google.maps.Marker({
		      position: marker_latlng,
		      map: map,
		      icon: theme + '/img/mapmarker.png',
		      visible: true,
		      title: this.title
		  	});
	 
	    	var boxText = document.createElement("div");

			//boxText.style.cssText = "border: 0px solid black; margin-top: 0px; background: #A0B350; padding: 0px;";
			boxText.innerHTML = "<div style='width:210px;height:auto;overflow:hidden'><p class='marker_title'>"+this.title+"</p><p class='marker_description'>"+this.marker_description+"</p></div>";
			
			var myOptions = {
				 content: boxText
				,disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-215,-175)
				,zIndex: null
				,boxStyle: { 
				  opacity: 1
				  ,width: "230px"
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

function MouseWheelHandler(e) {

	var e = window.event || e;
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	e.preventDefault();
    clearTimeout($.data(this, 'timer'));       

   
    if( delta > 0 ) {               
        wheel_i++;
        
        if( wheel_i == 2 ) {                  
            $('#updown').trigger("prev", 1); 
	        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[0].id).data().title)
	        gaTrack('/projects/', $('#project_'+$('#updown').children('div')[0].id).data().title);
	        History.pushState(null, null,$('#project_'+$('#updown').children('div')[0].id).data().permalink); 
	        $('#navigation_guide').fadeOut(900);
	        $('.arrow.down').fadeIn(900);
        }           

    } else { 

        wheel_i--;   

        if(wheel_i==-2) {     
            $('#updown').trigger("next", 1); 
	        $('#project_title,#project_title_mobile').html($('#project_'+$('#updown').children('div')[1].id).data().title)
	        gaTrack('/projects/', $('#project_'+$('#updown').children('div')[1].id).data().title);
	        History.pushState(null, null,$('#project_'+$('#updown').children('div')[1].id).data().permalink); 
	        $('#navigation_guide').fadeOut(900);
	        $('.arrow.down').fadeIn(900);
        }               

    } 

    $.data(this, 'timer', setTimeout(function() {
        wheel_i = 0;
    }, 50));


}

function increment(){

 	$('.services_slide').css('display','none');
 	var slide = $('.services_slide')[slide_services];
 	slide.style.display = 'block'

   	if(slide_services==$('.services_slide').size()-1){
   		slide_services=0;
   	}
   	else{
   		//slide_prev = $('.services_slide')[slide_services-1];
   		slide_services++;
   	}
   	//slide_prev.style.display = 'none'			
}

function resize_projects(){
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
}

function slide_to(i){
	$('#updown').trigger('slideTo', '#slider_'+i);

	$('#project_title,#project_title_mobile').html($('#slider_'+i+'> div > div').data().title)
	gaTrack('/projects/', $('#slider_'+i+'> div > div').data().title);
	History.pushState(null, null,$('#slider_'+i+'> div > div').data().permalink); 

	$('.project_map').addClass('close');

	setTimeout(function() {
     $('.project_map').removeClass('close');
     $('.project_map').removeClass('open');
 	}, 500);
	
	$('.project_map_back').fadeOut('slow');
}

function isTouchDevice(){
    return typeof window.ontouchstart !== 'undefined';
}
