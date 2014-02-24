(function($){
jQuery(function ()
{
	var maindiv = jQuery('#rsss_sidebar');
	if(maindiv.length>0)
	{
	var maindivhid = jQuery('#rsss_sidebar_hid');
	var maindivini=maindiv.offset().top;
	var chkdl=maindiv.offset().left;
	var winwidthini=jQuery(window).width();
	var chktdl=winwidthini-chkdl;
	jQuery(window).load(
		function(){
		rsss_sidebar_change_css();
	});
	jQuery(window).resize(
		function(){
		rsss_sidebar_change_css();
	});
	jQuery(window).scroll(
		function(){
		rsss_sidebar_change_css();
	});
	function rsss_sidebar_change_css()
	{
		var chkd=jQuery(window).scrollTop();
		var winwidth=jQuery(window).width();
		if(chkd+10>maindivini)
		{
		maindiv.css({position:'fixed',top:'10px'});
		}
		else
		{
		maindiv.css({position:'absolute',top:''});
		}
		if(winwidth+80<chktdl||winwidth<1040)
		{
		maindiv.fadeOut(300);
		maindivhid.slideDown(300);
		}
		else
		{
		maindiv.fadeIn(300);
		maindivhid.slideUp(300);
		}
	}
	}
})
})(jQuery);

