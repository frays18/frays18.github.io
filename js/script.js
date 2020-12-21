//default settings
var our_content_position = 1;
var menu_position = 1;
var content_width = $('#content_1').width();
var content_height = $('#content_1').height();
var d_sh = '0px 13px 34px 0px rgba(0, 0, 0, 0.35)'; //default content shadow
var about_timer = NaN;
var about_timer_position = 1;
var resume_info_position = 1;
var resume_status_cheker = false;
var resume_info_pers = 2; //visible resume posts
var gallery_photo_show = false; //modal photo window status
var mobile_format = false;
var nav_position = false;
var w_add = 'translate(0, -50%)'; //setting of content top position for smaller or bigger window height
var dark = false;
var false_area = [false, false]; //for browser

//document on load settings
$(window).on('load', function () {
  reize_content();
  justify_items();
  mobile_mode();
  menu_paint();
  about_timer_changer();
  setTimeout(function () {
    $('.preloader').fadeOut(1000);
  }, 1000);
});

//document ready settings
$(document).ready(function () {
  browser();
  $('.about_info .serv_sections').css('height', $('.about_me_conteiner').height() + 'px');
  justify_items();
  gallery_changer(1);
});

//windows resize settings
$(window).resize(function () {
  reize_content();
  justify_items();
  mobile_mode();
  $('.about_info .serv_sections').css('height', $('.about_me_conteiner').height() + 'px');
});

//window on blue / focus settings
$(window).blur(function () {
  if (our_content_position === 1) {
    about_timer = clearInterval(about_timer);
  }
});
$(window).focus(function () {
  if (our_content_position === 1) {
    about_timer_changer();
  }
});

//some settings for different browsers
function browser() {
	var workSpace = navigator.userAgent;
  if ((workSpace.search(/MSIE/) > 0) || (workSpace.search(/Edge/) > 0)) {
    $('.edu_slides_conteiner').css('width' , $('.edu_slides_conteiner').children().length * ($('#edu_slide_1').width() + 7) - 5 + 'px');
    $('.exp_slides_conteiner').css('width' , $('.exp_slides_conteiner').children().length * ($('#exp_slide_1').width() + 7) - 5 + 'px');
    false_area[0] = true;
  }
  if (workSpace.search(/Firefox/) > 0) false_area[1] = true;
}

//justify main items
function justify_items() {
  //justify main navigation
  var main_menu_width = 0;
  for (var i = 1; i<=4; i++) {
    main_menu_width+=$('#s_' + i).width();
  }
  $('.main_nav').css('width', main_menu_width + parseInt($('#s_2').parent().css('margin-left')) * 3 + 'px');
  //justify additional menu
  if ($(window).width() > 1126) {
    var justify_add_menu = ($(window).width() - $('#content_1').width()) / 4 + $('.add_nav_right').width() / 2;
    $('.add_nav').css('top' , '50%');   
    $('.add_nav_right').css('left' , 'calc(100% - ' + justify_add_menu + 'px)');
    $('.add_nav_left').css('right' , 'calc(100% - ' + justify_add_menu + 'px)');    
  } else {
    var k = 1126 - $(window).width();
    var justify_add_menu_1 = $('#content_1').width() / 4 - $('.add_nav_right').width() / 2;
    var justify_add_menu_2 = ($(window).height() - $('#content_1').height()) / 4;
    $('.add_nav').css('top' ,'calc(100% - ' + justify_add_menu_2 + 'px)');   
    $('.add_nav_right').css('left' , 'calc(50% + ' + justify_add_menu_1 + 'px)');
    $('.add_nav_left').css('right' , 'calc(50% + ' + justify_add_menu_1 + 'px)');    
  }
  //justify additional menu title
  $('.add_menu_content_title').css('height' , (($(window).height() - $('#content_1').height()) / 4) + 5);
}

//main content resize when window resize settings
function reize_content() {
  var size_w = $(window).width();
  var size_h = $(window).height();
  var width = 0;
  var height = 0;
  if (size_w >= 1350) {
    width = 1000;
    height = 600;
  }
  if (size_w <= 1350) {
    width = 800;
    height = 400;
  }
  if (size_w <= 860) {
    width = 600;
    height = 400;
    if (false_area[1]) {
      $('.edu_slider').css('width' , '306px');
      $('.exp_slider').css('width' , '306px');  
    }
  }
  if (size_w <= 660) {
    width = 450;
    height = 350;
  }
  if (size_w <= 510) {
    width = 350;
    height = 350;
    if (false_area[1]) {
      $('.edu_slider').css('width' , '206px');
      $('.exp_slider').css('width' , '206px');  
    }
  }
  if (size_w <= 400) {
    width = 300;
    height = 350;
  }
  for (var i = 1; i <= 3; i++) {
    $('#content_' + i).css('width' , width + 'px');
    $('#content_' + i).css('height' , height +'px');  
  }
  if ((size_h <= 550) || ((size_w >= 1350) & (size_h <= 765))) {
    if (!nav_position) {
      $('#content_' + our_content_position).css('top' , '90px');
      w_add = 'translate(0, 0)';  
    } else {  
      $('#content_' + our_content_position).css('top' , '50%');
      w_add = 'translate(0, -50%)';
    }
  } else {
    $('#content_' + our_content_position).css('top' , '50%');
    w_add = 'translate(0, -50%)';
  }
  if ($(window).width() <= 860) {
    resume_info_pers = 1;
  } else {
    resume_info_pers = 2;
  }
  $('#content_' + our_content_position).css('transform' , w_add);
  content_width = width;
  content_height = height;
}

//mobile settings for smaller window width settings
function mobile_mode(){
  if (($(window).width() <= 660) || ($(window).height() <= 530) || (($(window).width() >= 1350) & ($(window).height() <= 450)) ) {
    nav_position = false;
    reize_content();
    $('i.im-gear').fadeOut(1000);
    $('i.im-radio-button-circle-o').fadeIn(1000);
    $('#main_menu').fadeOut();
    $('.add_nav').fadeOut(1000);
    $('.add_menu_content_title').fadeIn(1000);
    mobile_format = true;
  } else {
    $('i.im-gear').fadeIn(1000);
    $('i.im-radio-button-circle-o').fadeOut(1000);
    if (nav_position) {
      $('#main_menu').css("top" , -$('#main_menu').height());
      $('#main_menu').fadeOut(1000);
      $('.add_nav').fadeIn(1000);
    } else {
      $('#main_menu').css("top" , 0);
      $('#main_menu').fadeIn(1000);
      $('.add_menu_content_title').fadeOut(1000);
      $('.add_nav').fadeOut(1000);
    }
    mobile_format = false;
  }
}

//change content settings

function reset_content(incline, new_position){
  $('.hide_conteiner').css('display', 'none');
  if (new_position < our_content_position) {
    
    var l1 = '15%';
    var l2 = '-40%';
    var sh = '-11px 13px 34px 0px rgba(0, 0, 0, 0.35)';
  } else {
    incline=-incline;
    var l1 = '-15%';
    var l2 = '40%';
    var sh = '8px 13px 34px 0px rgba(0, 0, 0, 0.35)';
  }
  $('#content_' + our_content_position).animate({
    left: l1
  }, 200);
  setTimeout(function () {
    $('#content_' + our_content_position).css({'transform':'rotateY(' +(incline)+ 'deg)' + w_add, '-ms-transform':'rotateY(' +(incline)+ 'deg)' + w_add, '-webkit-transform':'rotateY(' +(incline)+ 'deg)' + w_add, 'box-shadow': sh, opacity: '0'});
  }, 100);   
  $('#content_' + new_position).css("left" , l2);
  
  setTimeout(function () {
    $('#content_' + our_content_position).css({'display':'none', 'left':'0'});
    $('#content_' + new_position).css({'transform': 'rotateY(' + -(incline) + 'deg) ' + w_add, '-ms-transform': 'rotateY(' + -(incline) + 'deg) ' + w_add, '-webkit-transform': 'rotateY(' + -(incline) + 'deg) ' + w_add});
    $('#content_' + new_position).css('display', 'block');
    $('#content_' + new_position).css('left', l2);
    setTimeout(function () {
      $('#content_' + new_position).css({'box-shadow': sh, 'opacity': '1', 'box-shadow': d_sh, 'left': '0', 'transform': 'rotateY(0deg) ' + w_add, '-ms-transform': 'rotateY(0deg) ' + w_add, '-webkit-transform': 'rotateY(0deg) ' + w_add, 'box-shadow': d_sh});
    }, 100); 
    //$('#content_' + new_position).css('left' , '0%');
    /*
    $('#content_' + new_position).animate({
      left: '0%'
    }, 200);
    setTimeout(function () {
      $('#content_' + our_content_position).css({'transform':'rotateY(' +(incline)+ 'deg)' + w_add, '-ms-transform':'rotateY(' +(incline)+ 'deg)' + w_add, '-webkit-transform':'rotateY(' +(incline)+ 'deg)' + w_add, 'box-shadow': sh, opacity: '0'});
    }, 100); 
    //$('#content_' + new_position).css({'box-shadow': sh, 'display':'block', 'left':l2, 'opacity': '1', 'left': '0', 'transform': 'rotateY(0deg) ' + w_add, '-ms-transform': 'rotateY(0deg) ' + w_add, '-webkit-transform': 'rotateY(0deg) ' + w_add, 'box-shadow': d_sh});
    */
    $('.hide_conteiner').fadeIn(1000);
    our_content_position = new_position;
    menu_position = new_position;
    menu_paint();
  }, 500);
  
}

/*
function reset_content(incline, new_position){
  $('.hide_conteiner').fadeOut(100);
  if (new_position < our_content_position) {
    var l1 = '15%';
    var l2 = '-40%';
    var sh = '-11px 13px 34px 0px rgba(0, 0, 0, 0.35)';
  } else {
    incline=-incline;
    var l1 = '-15%';
    var l2 = '40%';
    var sh = '8px 13px 34px 0px rgba(0, 0, 0, 0.35)';
  }
  $('#content_' + our_content_position).css({'transform':'rotateY(' +(incline)+ 'deg)' + w_add, 'width':Math.floor(content_width / 2) + 'px', 'height':Math.floor(content_height / 2) + 'px', 'box-shadow': sh, 'left':l1, 'opacity': '0'});
  setTimeout(function () {
      $('#content_' + our_content_position).css({'display':'none', 'left':'0'});
      $('#content_' + new_position).css('transform' , 'rotateY(' + -(incline) + 'deg) ' + w_add);
      $('#content_' + new_position).css({'width': $('#content_' + new_position).width() / 2 + 'px', 'height': $('#content_' + new_position).height() / 2 + 'px', 'box-shadow': sh, 'display':'block', 'left':l2, 'opacity': '1', 'left': '0', 'width': content_width + 'px', 'height': content_height + 'px', 'transform': 'rotateY(0deg) ' + w_add, 'box-shadow': d_sh});
      $('.hide_conteiner').fadeIn(1000);
      our_content_position = new_position;
      menu_position = new_position;
      menu_paint();
  }, 500);
}
*/
//show contact settings (show contact information / show last content)
function reset_last(show){
  if (show) {
    $('.hide_conteiner').css('display', 'none');
    $('#content_' + our_content_position).css({'transform': 'rotateX(-5deg) ' + w_add, 'box-shadow': '0px -4px 23px 2px rgba(0, 0, 0, 0.49)'});
    $('.blur_shadow').fadeIn(1000);
    $('i.im-arrow-right-circle').css('display' , 'none');
    $('i.im-pin').css('display' , 'block');
    $('.back_color').css('display' , 'block'); 
    $('#contact_content').fadeIn(500);
    $('#contact_content').css({'top': '50%', 'transform': 'rotateX(0deg) translate(-50%, -50%)', 'box-shadow': d_sh});
    menu_position = 4;
  } else {
    $('#contact_content').fadeOut(500);
    $('#contact_content').css('top' , '150%');  
    $('.hide_conteiner').fadeIn(500);
    $('#content_' + our_content_position).css({'transform': 'rotateX(0deg) ' + w_add, 'box-shadow': d_sh});
    $('.blur_shadow').fadeOut(1000);
    $('i.im-pin').css('display' , 'none');
    $('i.im-arrow-right-circle').css('display' , 'block');
    $('.back_color').css('display' , 'none');
    menu_position = our_content_position;
  }
  menu_paint();
} 
//top menu click settings
function top_menu_click(where){
  if ((where != our_content_position) || ((where === our_content_position) && (menu_position === 4))){
    switch (where) {
      case 4:
        $('.main_nav li .sections').css('pointer-events' , 'none');
        about_timer = clearInterval(about_timer); 
        reset_last(true);
        setTimeout(function () {
          $('.main_nav li .sections').css('pointer-events' , 'auto');
        }, 1000);
        break;
    default:
      if (menu_position != 4) {
        $('.main_nav li .sections').css('pointer-events' , 'none');
        reset_content(15, where);  
        setTimeout(function () {
          if (where === 1) {
            about_timer_changer();
          } else {
            about_timer = clearInterval(about_timer);
          }
          if (where === 3) gallery_changer(1);
        }, 500);
        setTimeout(function () {
          $('.main_nav li .sections').css('pointer-events' , 'auto');
        }, 1000);
      } else {
        $('.main_nav li .sections').css('pointer-events' , 'none');
        reset_last(false);
        setTimeout(function () {
          if (where === 1) {
            about_timer_changer();   
          } else {
            about_timer = clearInterval(about_timer); 
          }
          if (where != our_content_position) {
            reset_content(15, where);  
            setTimeout(function () {
              $('.main_nav li .sections').css('pointer-events' , 'auto');
            }, 1000);
          } else {
            $('.main_nav li .sections').css('pointer-events' , 'auto');
          }
        }, 1000);
      }
    }
  }
}
$('#s_1').click(function () {
  top_menu_click(1);
  add_title_update(1);
});
$('#s_2').click(function () {
  top_menu_click(2);
  add_title_update(2);
  var pers = Math.floor((resume_info_pers * 100) / $('.edu_slider .edu_slides_conteiner').children().length);
  $('.education .status_pers').css('width' , pers + '%');
  pers = Math.floor((resume_info_pers * 100) / $('.exp_slider .exp_slides_conteiner').children().length);
  $('.experience .status_pers').css('width' , pers + '%');
});
$('#s_3').click(function () {
  top_menu_click(3);
  add_title_update(3);
});
$('#s_4').click(function () {
  top_menu_click(4);
  add_title_update(4);
});
//click settings for additional menu
$('.add_nav_right').click(function () {
  if (((our_content_position + 1) != 4) & (menu_position != 4)) {
    add_title_update(our_content_position + 1);
    $('.add_nav_right').css('pointer-events' , 'none');
    top_menu_click(our_content_position + 1); 
    setTimeout(function () {
      $('.add_nav_right').css('pointer-events' , 'auto');
    }, 1000);
  } else {
    if (menu_position === 4) {
      add_last_reset();
    } else {
      top_menu_click(our_content_position + 1);
      add_title_update(our_content_position + 1);
    }
  }
});
$('.add_nav_left').click(function () {
  if ((our_content_position - 1) != 0) {
    if (menu_position != 4) {
      add_title_update(our_content_position - 1)
      $('.add_nav_left').css('pointer-events' , 'none');
      top_menu_click(our_content_position - 1); 
      setTimeout(function () {
        $('.add_nav_left').css('pointer-events' , 'auto');
      }, 1000);
    } else {
      add_last_reset();
    }
  }
});
//mobile menu click settings
$('#s_2_1').click(function () {
  mobile_menu_show(false);
  top_menu_click(1);
  add_title_update(1);
});
$('#s_2_2').click(function () {
  mobile_menu_show(false);
  top_menu_click(2);
  add_title_update(2);
  var pers = Math.floor((resume_info_pers * 100) / $('.edu_slider .edu_slides_conteiner').children().length);
  $('.education .status_pers').css('width' , pers + '%');
  pers = Math.floor((resume_info_pers * 100) / $('.exp_slider .exp_slides_conteiner').children().length);
  $('.experience .status_pers').css('width' , pers + '%');
});
$('#s_2_3').click(function () {
  mobile_menu_show(false);
  top_menu_click(3);
  add_title_update(3);
});
$('#s_2_4').click(function () {
  mobile_menu_show(false);
  top_menu_click(4);
  add_title_update(4);
});

//effects settings for top menu titles on mouse over and on mouse out
/*
function over_out_content_effect(where, on){
  if (on) {
    if (menu_position != 4) {
      if ((where != our_content_position) & (where >= 1) & (where<=3)) {
        if (where < our_content_position) {
          $('#content_' + our_content_position).css({'transform': 'rotateY(5deg) ' + w_add, 'box-shadow': '8px 13px 34px 0px rgba(0, 0, 0, 0.35)'});
        } else {
          $('#content_' + our_content_position).css({'transform': 'rotateY(-5deg) ' + w_add, 'box-shadow': '-11px 13px 34px 0px rgba(0, 0, 0, 0.35)'});
        }   
      } else {
        $('#content_' + our_content_position).css('box-shadow' , '0px 13px 34px 0px rgba(0, 0, 0, 0)');
      }
    } else {
      $('#contact_content').css({'transform': 'rotateX(-5deg) translate(-50%, -50%)', 'box-shadow': '0px -4px 23px 2px rgba(0, 0, 0, 0.49)'});
    }  
  } else {
    if (menu_position != 4) {
      $('#content_' + our_content_position).css({'transform': 'rotateY(0deg) ' + w_add, 'box-shadow': d_sh});
      if (menu_position === our_content_position) {
        $('#content_' + our_content_position).css('box-shadow' , d_sh);
      } 
    } else {
      $('#contact_content').css({'transform': 'rotateX(0deg) translate(-50%, -50%)', 'box-shadow': d_sh});
    }
  }
}
*/
function over_out_content_effect(where, on){
  if (on) {
    if (menu_position != 4) {
      if ((where != our_content_position) & (where >= 1) & (where<=3)) {
        if (where < our_content_position) {
          $('#content_' + our_content_position).css({'transform': 'rotateY(1deg) ' + w_add, 'box-shadow': '-11px 13px 34px 0px rgba(0, 0, 0, 0.35)'});
        } else {
          $('#content_' + our_content_position).css({'transform': 'rotateY(-1deg) ' + w_add, 'box-shadow': '8px 13px 34px 0px rgba(0, 0, 0, 0.35)'});
        }   
      } else {
        $('#content_' + our_content_position).css('box-shadow' , '0px 13px 34px 0px rgba(0, 0, 0, 0)');
      }
    } else {
      $('#contact_content').css({'transform': 'rotateX(1deg) translate(-50%, -50%)', 'box-shadow': '0px -4px 23px 2px rgba(0, 0, 0, 0.49)'});
    }  
  } else {
    if (menu_position != 4) {
      $('#content_' + our_content_position).css({'transform': 'rotateY(0deg) ' + w_add, 'box-shadow': d_sh});
      if (menu_position === our_content_position) {
        $('#content_' + our_content_position).css('box-shadow' , d_sh);
      } 
    } else {
      $('#contact_content').css({'transform': 'rotateX(0deg) translate(-50%, -50%)', 'box-shadow': d_sh});
    }
  }
}
$('#s_1').mouseover(function () {
  over_out_content_effect(1, true);
});
$('#s_2').mouseover(function () {
  over_out_content_effect(2, true);
});
$('#s_3').mouseover(function () {
  over_out_content_effect(3, true);
});
$('#s_1').mouseout(function () {
  over_out_content_effect(false, false);
});
$('#s_2').mouseout(function () {
  over_out_content_effect(false, false);
});
$('#s_3').mouseout(function () {
  over_out_content_effect(false, false);
});
//on mouse over and on mouse out effects settings for additional menu 
$('.add_nav_left').mouseover(function () {
  over_out_content_effect(our_content_position - 1, true);
});
$('.add_nav_left').mouseout(function () {
  over_out_content_effect(false, false);
});
//on mouse over and on mouse out effects settings for mobile menu 
$('#s_2_1').mouseover(function () {
  over_out_content_effect(1, true);
})
$('#s_2_2').mouseover(function () {
  over_out_content_effect(2, true);
});
$('#s_2_3').mouseover(function () {
  over_out_content_effect(3, true);
});
$('#s_2_1').mouseout(function () { 
  over_out_content_effect(false, false);
});
$('#s_2_2').mouseout(function () {
  over_out_content_effect(false, false);
});
$('#s_2_3').mouseout(function () {
  over_out_content_effect(false, false);
});
//effects settings on mouse over and on mouse out for top menu(last title)
function over_last(where){
  if (where) {
    if (menu_position != 4) {
      $('#content_' + our_content_position).css('transform' , 'rotateX(-5deg) ' + w_add);
      $('#content_' + our_content_position).css('box-shadow' , '0px -4px 23px 2px rgba(0, 0, 0, 0.49)');
    } else {
      $('#contact_content').css('border' , '5px solid #6eecec');
    }    
  } else {
    if (menu_position != 4) {
      $('#content_' + our_content_position).css('transform' , 'rotateX(0deg) ' + w_add);
      $('#content_' + our_content_position).css('box-shadow' , d_sh);
    } else {
      if (dark) {
        $('#contact_content').css('border' , '5px solid rgba(0, 0, 0, 0.6)');
      } else {
        $('#contact_content').css('border' , '5px solid rgba(0, 0, 0, 0)');  
      }
    }
  }
}
$('#s_4').mouseover(function () {
  over_last(true);
});
$('#s_4').mouseout(function () {
  over_last(false);
});
//on mouse over and on mouse out effects settings for mobile menu(last item) 
$('#s_2_4').mouseover(function () {
  over_last(true);
});
$('#s_2_4').mouseout(function () {
  over_last(false);
});
//on mouse over and on mouse out effects settings for additional menu
$('.add_nav_right').mouseover(function () {
  if (menu_position != 4) {
    if ((our_content_position + 1) < 4) {
      over_out_content_effect(our_content_position + 1, true); 
    } else {
      $('i.im-arrow-right-circle').css('display' , 'none');
      $('i.im-pin').css('display' , 'block');
      $('.back_color').css('display' , 'block');
      over_last(true);
    }    
  }
});
$('.add_nav_right').mouseout(function () {
  if (menu_position != 4) {
    if (!(our_content_position + 1) === 4) {
      over_out_content_effect(false, false);
    } else {
      $('i.im-arrow-right-circle').css('display' , 'block');
      $('i.im-pin').css('display' , 'none');
      $('.back_color').css('display' , 'none');
      over_last(false);
    }
  }
});

//top (menu text / titles) paint settings
function menu_paint(){
  if (menu_position != 4) {
    if (dark) {
      $('#main_menu .main_nav').find('a').css('color' , 'white'); 
    } else {
      $('#main_menu .main_nav').find('a').css('color' , '#666768'); 
    }
    $('#s_' + our_content_position).css('color','#FF7777');
    $('.mobile_menu .mm_menu').find('a').css('color' , '#6eecec');
    $('#s_2_' + our_content_position+" a").css('color' , '#FFE6B4');
  } else {
    if (dark) {
      $('#main_menu .main_nav').find('a').css('color' , 'white'); 
    } else {
      $('#main_menu .main_nav').find('a').css('color' , '#666768'); 
    }
    $('#s_4').css('color' , '#FF7777');
    $('.mobile_menu .mm_menu').find('a').css('color' , '#6eecec');
    $('#s_2_4 a').css('color' , '#FFE6B4');
  }
}
//portfolio menu (text / title) paint settings
function portfolio_menu_paint(point){
  if (dark) {
    $('.servs_menu_point a').css('color' , 'white');
    $('#' + point + ' a').css('color' , '#FF7777');
  } else {
    $('.servs_menu_point a').css('color' , 'black');
    $('#' + point + ' a').css('color' , '#FF7777');  
  }
}
$('.servs_menu_point').click(function () {
  portfolio_menu_paint($(this).attr('id'));
})

//about content my services settings changes
$('.serv_left').click(function () {
  $('.serv_left').css('pointer-events' , 'none');
  $('#serv_' + about_timer_position).fadeOut(500);
  if (about_timer) {
    about_timer = clearInterval(about_timer);    
  }
  setTimeout(function () {
    if (about_timer_position != 1){
      about_timer_position-=1;    
    } else {
      about_timer_position = 4;
    }
    $('#serv_' + about_timer_position).fadeIn(1000);    
  }, 500);
  setTimeout(function () {
    $('.serv_left').css('pointer-events' , 'auto');
  }, 500);
});
$('.serv_right').click(function () {
  $('.serv_right').css('pointer-events' , 'none');
  $('#serv_' + about_timer_position).fadeOut(500);
  if (about_timer) {
    about_timer = clearInterval(about_timer);    
  }
  setTimeout(function () {
    if (about_timer_position != 4) {
      about_timer_position+=1;    
    } else {
      about_timer_position = 1;
    }
    $('#serv_' + about_timer_position).fadeIn(1000);    
  }, 500);
  setTimeout(function () {
    $('.serv_right').css('pointer-events' , 'auto');
  }, 500);
})
function about_timer_changer () {
  about_timer = setInterval(function () {
    $('#serv_' + about_timer_position).fadeOut(500);
    if (about_timer_position != $('.serv_sections').children('li').length) {
      about_timer_position+=1;    
    } else {
      about_timer_position = 1;
    }
    setTimeout(function () {
      $('#serv_' + about_timer_position).fadeIn(1000);  
    }, 500)
  }, 3000);
}

//resume change info settings
function resume_info_changer(){
  $('.experience .im-arrow-left').css('display' , 'none');
  $('.education .im-arrow-right').css('display' , 'none');
  setTimeout(function () {
    switch (resume_info_position) {
      case 1:
        if (false_area[0]) {
          $('.hide_conteiner').fadeOut(200);
          $('#content_2 .content_preloader').css('display' , 'block');
          setTimeout(function () {
            $('.education').css('width' , 'calc(20% - 1px)');
            $('.experience').css('width' , '80%');
            $('#content_2 .content_preloader').fadeOut(200);
            setTimeout(function () {
              $('.hide_conteiner').fadeIn(200);  
            }, 400);
          }, 400);
        } else {
          $('.education').css('width' , 'calc(20% - 1px)');
          $('.experience').css('width' , '80%');   
        } 
        $('.edu_slider').fadeOut(200);
        $('.experience .exp_shadow').fadeOut(200);
        $('.experience .im-magnifier-plus').fadeOut(200);
        $('.experience .im-arrow-left').css('display' , 'none');
        $('.edu_slide').fadeOut(200);
        $('.education .slider_status_pers').fadeOut(200);
        setTimeout(function () {
            $('.education .edu_shadow').fadeIn(200);
            $('.education .im-magnifier-plus').fadeIn(200);
            $('.exp_slider').fadeIn(200);
            $('.exp_slide').fadeIn(200);
            $('.experience .slider_status_pers').fadeIn(200);
        }, 200);
        resume_info_position = 2;
        resume_status_cheker = true;
        break;
      case 2:
        if (false_area[0]) {
          $('.hide_conteiner').fadeOut(200);
          $('#content_2 .content_preloader').css('display' , 'block');
          setTimeout(function () {
            $('.education').css('width' , 'calc(80% - 1px)');
            $('.experience').css('width' , '20%');
            $('#content_2 .content_preloader').fadeOut(200);
            setTimeout(function () {
              $('.hide_conteiner').fadeIn(200); 
            }, 400);
          }, 400);
        } else {
          $('.education').css('width' , 'calc(80% - 1px)');
          $('.experience').css('width' , '20%');
        } 
        $('.exp_slider').fadeOut(200);
        $('.education .edu_shadow').fadeOut(200);
        $('.education .im-magnifier-plus').fadeOut(200);
        $('.education .im-arrow-right').css('display' , 'none');
        $('.exp_slide').fadeOut(200);
        $('.experience .slider_status_pers').fadeOut(200);
        setTimeout(function () {
            $('.experience .exp_shadow').fadeIn(200);
            $('.experience .im-magnifier-plus').fadeIn(200);
            $('.edu_slider').fadeIn(200);
            $('.edu_slide').fadeIn(200);
            $('.education .slider_status_pers').fadeIn(200);
        }, 200);
        resume_info_position = 1;
        resume_status_cheker = true;
        break;
    }
  }, 100)
}
$('.exp_shadow').click(function () {  
  resume_info_changer();
});
$('.edu_shadow').click(function () {
  resume_info_changer();
});
//on mouse over settings for resume
function resume_info_hover_changer(on, type, type2){
  if (on) {
    if (false_area[0]) {
      $(type+' .im-magnifier-plus').css('display' , 'none');
      $(type+' .im-arrow-left').css('display' , 'block');
      $(type+' .im-arrow-right').css('display' , 'block'); 
    } else {
      $(type).css('width' , 'calc(30% - 1px)');
      $(type2).css('width' , '70%');
      setTimeout(function () {
        if (Math.floor($(type).width() / $(type).parent().width() * 100) >= 22) {
          $(type+' .im-magnifier-plus').fadeOut(200);
          $(type+' .im-arrow-left').fadeIn(300);
          $(type+' .im-arrow-right').fadeIn(300);   
        }
      }, 100);  
    }
  } else {
    if (!resume_status_cheker) {
      if (false_area[0]) {
        $(type+' .im-arrow-left').css('display' , 'none');
        $(type+' .im-arrow-right').css('display' , 'none');
        $(type+' .im-magnifier-plus').css('display' , 'block');
      } else{
        $(type+' .im-arrow-left').fadeOut(300);
        $(type+' .im-arrow-right').fadeOut(300);
        $(type+' .im-magnifier-plus').fadeIn(400);
        $(type).css('width' , 'calc(20% - 1px)');
        $(type2).css('width' , '80%');    
      }
    } else {
      resume_status_cheker = false;
    }
  }   
}
$('.exp_shadow').mouseover(function () {
  resume_info_hover_changer(true, '.experience' , '.education');
});
$('.exp_shadow').mouseout(function () {
  resume_info_hover_changer(false, '.experience' , '.education');
});
$('.edu_shadow').mouseover(function () {
  resume_info_hover_changer(true, '.education' , '.experience');
});
$('.edu_shadow').mouseout(function () {
  resume_info_hover_changer(false, '.education' , '.experience');
});
//resume info slider settings
function resume_slide(where, type){
  $('.' + type + '_slide').css('pointer-events' , 'none');

  var slide_value = 0;
  if (false_area[1]) {
    slide_value = $('#' + type + '_slide_1').width() + 6.333;
  } else {
    slide_value = $('#' + type + '_slide_1').width() + 7;
  }
  
  var parent= '.' + $('.' + type + '_slides_conteiner').parent().parent().attr('class');
  var move = '.' + type + '_slides_conteiner';
  
  var counted_blocks = $(move).children().length;
  var max_value = -slide_value * (counted_blocks - resume_info_pers);
  var pers = Math.floor(100 / counted_blocks);
  
  if (where) {
    if (-Math.floor($(move).position().left) < (-max_value)) {
      $(move).css('left' , (($(move).position().left) - slide_value));
      $(parent + ' .status_pers').css('width' , Math.floor($(parent + ' .status_pers').width() / $(parent + ' .status_pers').parent().width() * 100) + pers + '%');
    } else {
      $(move).css('left' , 0);  
      $(parent + ' .status_pers').css('width' , (Math.floor(resume_info_pers * 100) / counted_blocks) + '%');
    }
  } else {
    if ($(move).position().left != 0) {
      $(move).css('left' , (($(move).position().left) + slide_value));
      $(parent + ' .status_pers').css('width' , Math.floor($(parent + ' .status_pers').width() / $(parent + ' .status_pers').parent().width() * 100) - pers + '%');
    } else {
      $(move).css('left' , max_value);  
      $(parent + ' .status_pers').css('width' , '100%');
    }
  }
  setTimeout(function () {
    $('.' + type + '_slide').css('pointer-events' , 'auto');
  }, 500);
}
$('.education .slide_right').click(function () {
  resume_slide(true , 'edu');
})
$('.education .slide_left').click(function () {
  resume_slide(false , 'edu');
})
$('.experience .slide_right').click(function () {
  resume_slide(true , 'exp');
})
$('.experience .slide_left').click(function () {
  resume_slide(false , 'exp');
})

//change gallery settings
function gallery_changer(gallery_point){
  var path = '';
  switch (gallery_point) {
    case 1:
      path = 'img/gallery/res_des/';
      break;
    case 2:
      path = 'img/gallery/app_des/';
      break;
    case 3:
      path = 'img/gallery/log_des/';
      break;
    case 4:
      path = 'img/gallery/psd_des/';
      break;
  }
  if (!(($("#gallery_img_1").css('background-image')).search(path + 1 + ".jpg") != -1)) {
    if (false_area[0]) $('.img_conteiner').css('display' , 'none');
    else $('.img_conteiner').fadeOut(500);
    $('.gallery .content_preloader').fadeIn();
    setTimeout(function () {
      $('.gallery .content_preloader').fadeIn();
      for (var i = 1; i <= 6; i++) {
        $("#gallery_img_" + i).css('background-image' , 'url("' + path + i + ".jpg" + '")');
      }    
      var img = new Image();
      img.src = path + 1 + ".jpg";
      img.onload = function () {
        setTimeout(function () {
          $('.gallery .content_preloader').css('display' , 'none');
          $('.img_conteiner').fadeIn(500); 
        }, 1000);
      } 
    }, 500);
  }
}
$('#servs_menu_point_1').click(function () {
  gallery_changer(1);
});
$('#servs_menu_point_2').click(function () {
  gallery_changer(2);
});
$('#servs_menu_point_3').click(function () {
  gallery_changer(3);
});
$('#servs_menu_point_4').click(function () {
  gallery_changer(4);
});
//(show / close) modal photo window settings
function show_gallery_photo(get_gallery_img){
  if (gallery_photo_show) {
    $('#show_gallery_image').fadeOut(400) ;
    gallery_photo_show = false;
  } else {
    $('#show_gallery_image').fadeIn(400);
    gallery_photo_show = true;
    $('#image_modal').css('background-image' , get_gallery_img);
  }
}
//close modal gallery window settings
$('#gallery_image_shadow').click(function () {
  show_gallery_photo(false);
});
$('#image_modal').click(function () {
  show_gallery_photo(false);
});
$('#show_gallery_image .im-x-mark-circle-o').click(function () {
  show_gallery_photo(false);
});
//show modal gallery window settings
$('.gallery_img').click(function () {
  show_gallery_photo($(this).css('background-image'));
});

//change navigation title for additional menu settings
function add_title_update(position){
  switch (position) {
    case 1:
      title = 'about';
      break;
    case 2:
      title = 'resume';
     break;
    case 3:
      title = 'portfolio';
     break;
    case 4:
      title = 'contact';
     break;
    default:
      title = 'about';
  }
  $('.add_menu_content_title p').fadeOut(300);
  setTimeout(function () {
    $('.add_menu_content_title p').text(title);
    $('.add_menu_content_title p').fadeIn(500);
  }, 600);
}
function add_last_reset(){
  add_title_update(our_content_position);
  reset_last(false);
  menu_paint();
  $('.add_nav_right').css('pointer-events' , 'none');
  setTimeout(function () {
    $('.add_nav_right').css('pointer-events' , 'auto');
  }, 1000);
}
function menu_mode() {
  if (!mobile_format) {
    $('.nav_set_conteiner').css('pointer-events' , 'none');
    if (!nav_position) {
      $('#main_menu').animate({
        top: -$('#main_menu').height()
      }, 300, 'linear');
      setTimeout(function () {
        $('#main_menu').fadeOut();
      }, 200);
      $('.add_nav').fadeIn(1000);
      $('.add_menu_content_title').fadeIn(1000);
      nav_position = true;
      reize_content();
    } else {
      $('#main_menu').fadeIn(100);
      $('#main_menu').animate({
        top: 0
      }, 300, 'linear');
      $('.add_nav').fadeOut(500);
      $('.add_menu_content_title').fadeOut(500);
      nav_position = false;
      reize_content();
    }
    setTimeout(function () {
      $('.nav_set_conteiner').css('pointer-events' , 'auto');
    }, 1000);
  } else {
    mobile_menu_show(true);
  }
}
$('.nav_set_conteiner').click(function () {
  if (!mobile_format) {
    $('.nav_set_conteiner').css('pointer-events' , 'none');
    if (!nav_position) {
      $('#main_menu').animate({
        top: -$('#main_menu').height()
      }, 300, 'linear');
      setTimeout(function () {
        $('#main_menu').fadeOut();
      }, 200);
      $('.add_nav').fadeIn(1000);
      $('.add_menu_content_title').fadeIn(1000);
      nav_position = true;
      reize_content();
    } else {
      $('#main_menu').fadeIn(100);
      $('#main_menu').animate({
        top: 0
      }, 300, 'linear');
      $('.add_nav').fadeOut(500);
      $('.add_menu_content_title').fadeOut(500);
      nav_position = false;
      reize_content();
    }
    setTimeout(function () {
      $('.nav_set_conteiner').css('pointer-events' , 'auto');
    }, 1000);
  } else {
    mobile_menu_show(true);
  }
});

//dark mode settings
$('.dark_mode').click(function () {
  if (dark) {
    dark = false;
    //main dark activate
    $('#main_conteiner .content_darkness').css('transform' , 'translate(-50%, -50%) scale(0)');
    $('.innder_darkness').css('display' , 'none');
    setTimeout(function () {
      $('.dark_mode .nav_settings i').css('color' , '#FF7777'); 
    }, 500);
    //first content dark activate
    $('.about_me_conteiner .name').css('color' , 'black');
    $('.about_me_conteiner .photo').css('border' , '3px solid #6eecec');
    $('.about_me_conteiner .mytext').css('color' , 'black');
    $('.serv_sections li .im').css('color' , '#6eecec');
    $('.about_info .title').css({'border-top': '2px solid #FFE6B4', 'border-bottom': '2px solid #FFE6B4'});
    $('.serv_sections .serv_title').css('color' , 'black');
    $('.serv_sections .serv_text').css('color' , 'black');
    $('.serv_sections .title').css('color' , 'black');
    //second content dark activate
    $('.slides').css({'background': '#FFE6B4', 'border': '1px solid #6eecec'});
    $('.slides_title').css('color' , 'black');
    $('.slides_title i').css('color' , '#666768');  
    $('.slides_title').css('border-bottom' , '1px solid #666768');
    $('.slides_text').css('color' , 'black');
    $('.experience .exp_shadow').css('background' , 'rgba(255, 230, 180, 0.5)');
    $('.education .edu_shadow').css('background' , 'rgba(255, 230, 180, 0.5)');
    //third content dark activate
    $('.portfolio_menu').css('background' , 'rgba(255, 230, 180, 0.5)');
    portfolio_menu_paint('servs_menu_point_1');
    gallery_changer(1); 
    //contact content dark activate
    $('#contact_content').css('border' , '5px solid rgba(0, 0, 0, 0)');
    $('.my_email').css('color' , '#666768');
    //main menu dark activate
    $('#main_menu .main_nav').find('a').css('color' , '#666768'); 
    $('#s_' + menu_position).css('color','#FF7777');
  } else {
    dark = true;
    //main dark activate
    $('#main_conteiner .content_darkness').css('transform' , 'translate(-50%, -50%) scale(1)');
    $('.innder_darkness').css('display' , 'block');
    //first content dark activate
    $('.dark_mode .nav_settings i').css('color' , 'black');
    $('.about_me_conteiner .name').css('color' , 'white');
    $('.about_me_conteiner .photo').css('border' , '3px solid #FFE6B4');
    $('.about_me_conteiner .mytext').css('color' , 'white');
    $('.serv_sections li .im').css('color' , '#FFE6B4');
    $('.about_info .title').css({'border-top': '2px solid #6eecec', 'border-bottom': '2px solid #6eecec'});
    $('.serv_sections .serv_title').css('color' , 'white');
    $('.serv_sections .serv_text').css('color' , 'white');
    $('.serv_sections .title').css('color' , 'white');
    //second content dark activate
    $('.slides').css({'background': 'rgba(0, 0, 0, 0.4)', 'border': '1px solid #FFE6B4'});
    $('.slides_title').css('color' , 'white');
    $('.slides_title i').css('color' , '#FF7777');  
    $('.slides_title').css('border-bottom' , '1px solid #FF7777');
    $('.slides_text').css('color' , 'white');
    $('.experience .exp_shadow').css('background' , 'rgba(0, 0, 0, 0.4)');
    $('.education .edu_shadow').css('background' , 'rgba(0, 0, 0, 0.4)');
    //third content dark activate
    $('.portfolio_menu').css('background' , 'rgba(0, 0, 0, 0.4)');
    portfolio_menu_paint('servs_menu_point_1');
    gallery_changer(1);
    //contact content dark activate
    $('#contact_content').css('border' , '5px solid rgba(0, 0, 0, 0.6)');
    $('.my_email').css('color' , 'white');
    //main menu dark activate
    $('#main_menu .main_nav').find('a').css('color' , 'white'); 
    $('#s_' + menu_position).css('color','#FF7777');  
  }
});

//mobile settings
function mobile_menu_show(on){
  if (!on) {
    $('.mobile_menu').fadeOut(300);
  } else {
    $('.mobile_menu').fadeIn(300);
  }
}
$('.mm_shadow').click(function () {
  mobile_menu_show(false);
});
$('.mm_close').click(function () {
  mobile_menu_show(false);
});