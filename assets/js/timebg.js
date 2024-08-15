$(document).ready(function() {
var d = new Date();
var t = d.getHours();
if(t<3){
	$('.wrapper').css({backgroundImage: "url(assets/img/bg/bg-1.jpg)" })
}else if(t<7){
	$('.wrapper').css({backgroundImage: "url(assets/img/bg/bg-2.jpg)" })
}else if(t<11){
	$('.wrapper').css({backgroundImage: "url(assets/img/bg/bg-3.jpg)" })
}else if(t<15){
	$('.wrapper').css({backgroundImage: "url(assets/img/bg/bg-4.jpg)" })
}else if(t<19){
	$('.wrapper').css({backgroundImage: "url(assets/img/bg/bg-5.jpg)" })
}else if(t<23){
	$('.wrapper').css({backgroundImage: "url(assets/img/bg/bg-6.jpg)" })
};

});