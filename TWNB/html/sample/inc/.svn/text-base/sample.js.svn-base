// JavaScript Document
$(function(){
	if($('.tabMod1')){
		tabMod($('.tabMod1'))
	}
})
function tabMod(tab){
	var menu;
	tab.each(function(){
		$(this).find('ul.tabcont').children().addClass('subinner');
		$(this).find('ul.tabmenu li').each(function(i){
			$(this).click(function(){ 
				menus = $(this).parent().find('li').removeClass('current');
				subs = $(this).parent().parent().find('.subinner');
				subs.removeClass('current');
				$(this).addClass('current');
				$(subs[i]).addClass('current')
			});
		});
	})
}
/*
function tabMod(tab){
	var menu;
	tab.each(function(){
		menu = $(this).find('ul.tabmenu li');
		
		menu.each(function(i){
			$(this).click(function(){
				menus = $(this).parent().find('li');
				subs = $(this).parent().parent().find('.tabcont li');
				menus.each(function(i){
					$(this).removeClass('current');
					$(subs[i]).removeClass('current');
				});
				$(this).addClass('current');
				$(subs[i]).addClass('current')
			});
		});
	})
}
*/