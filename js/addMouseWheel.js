

function addMouseWheel(obj,fn){
		
	//1添加事件
	if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		//ff
		obj.addEventListener("DOMMouseScroll",fnWheel,false);	
	} else {
		//ie chrome
		obj.onmousewheel = fnWheel;
	}	
	
	function fnWheel(ev){
		var oEvent = ev || event;
		var bDown = true;//下 为正
		
		if(oEvent.wheelDelta){
			bDown = oEvent.wheelDelta > 0 ? false : true;
		} else {
			bDown = oEvent.detail > 0 ? true : false;	
		}
		
		typeof fn == "function" && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	} 
}