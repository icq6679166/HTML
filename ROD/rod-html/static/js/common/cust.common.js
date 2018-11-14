$(document).ready(function() {
	var navTop = $("nav.top"), navSub = $("nav.sub") , article = $("article");
	
	navTop.on("click","a",function(ev) {
		var _mu = $(this).attr("href");
		/*$(this).addClass('selected').siblings("a").removeClass('selected');*/
		navSub.empty().load(_mu, function(){
			article.empty();
            $(this).hide().fadeIn("slow");
        });
		return false;
	});
	
	$("#nav_menu a").each(function(k){
		$("#nav_menu a").eq(k).click(function(event){
			$("#nav_menu a").each(function(i){
				if(k == i){
					$("#nav_menu a").eq(i).addClass("selected");
				}else{
					$("#nav_menu a").eq(i).removeClass("selected");
				}
				})
		})
	})
	
	navSub.on("click", "a", function(ev) {
		ev.preventDefault();
		var $this = $(this) , _href = $this.attr("href");
		if (_href=='#' || /#$/.test(_href)) {
            if ($this.siblings("ul").size()) {
            	$this.parent("li").siblings("li").children("a").removeClass('selected').siblings("ul").hide('normal');
            	var sel = $this.siblings("ul");
            	sel.is(":visible") ? sel.hide('normal').parent("li").children("a").removeClass('selected') : sel.show('normal').parent("li").children("a").addClass('selected');
            }
            return false;
        }else if (_href=='file://C:/temp/rcmsClient/rcmsClient.bat'){
        	window.open("file://C:/temp/rcmsClient/rcmsClient.bat");
        }else {
        	article.empty().load(_href, function(){
                $(this).hide().fadeIn("slow");
            });
            $this.closest('#left_menu').find('.selected').removeClass('selected');
            $this.add($this.parents("li").children("a")).addClass('selected');
        }
		return false;
	});
});
jQuery.extend(jQuery.jgrid.defaults, {
    altRows: true, /*是否允許行交替變色*/
    altclass: 'altClass' /*交替色的css*/
    /*recordtext: i18n.def['grid.recordtext'],
    emptyrecords: i18n.def['grid.emptyrecords'],
    pgtext: i18n.def['grid.pgtext'],
    loadtext: i18n.def['grid.loadtext']*/
});
