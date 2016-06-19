// JavaScript Document
function $(fn){
	
	if(document.addEventListener){//高级
		document.addEventListener("DOMContentLoaded",fn,false);
	} else {
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == "complete"){
				fn &&fn();
			}	
			
		});
	}
};
//与window.onload 的区别  window.onload是等所有资源都加载完成  包括图片的地址  flash的具体内容
//ready是等DOM树加载完成  html  css js 各种标签  比如img标签加载进来就可以了   src图片地址并没有进来  这样就会快很多  并且可以多次绑定   但是记住JS是阻塞加载  前面的没有加载完成后面的不可能加载进来  所以要注意顺序  DOM树并不等于全部资源   DOM树加载了就可以执行JS代码了   把主要的JS放在最后