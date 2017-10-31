// JavaScript Document

$(function(){function getByClass(oParent,sClass){
	if(oParent.getElementsByCalssName){
		return oParent.getElementsByCalssName(sClass);
	} else {
		var result = [];
		var aEle = oParent.getElementsByTagName("*");
		for(var i = 0; i < aEle.length; i++){

			var _aTmp = aEle[i].className.split(" ");
			
			if(findInArr(_aTmp,sClass)){
				result.push(aEle[i]);
			}
		}
		return result;
	}
}
function findInArr(arr,n){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == n){
			return true;
		}
	}
	return false;
}
function getPos(obj){
	var l=0;
	var t=0;   
	while(obj){
		l+=obj.offsetLeft;	
		t+=obj.offsetTop;
		obj=obj.offsetParent;	
	}
	return {left:l,top:t}
}
window.onload=function(){
	//滚动固定
	window.onscroll=function(){
		var oHead=document.getElementById('header');
		var oHeadHdie=document.getElementById('header_hide');
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop>oHead.offsetHeight){
			oHead.style.zIndex=10000;
			oHead.style.position="fixed";
			oHead.style.top = "0";
			oHeadHdie.style.display="block"
		}else{
			oHead.style.position="";
			oHeadHdie.style.display="none"
		}
	}
//nav
	//alert(oHome)
//大小导航一样的代码   可以封装
	var oUl = document.getElementById("nav");
	var oHome =document.getElementById("home");
	var oWrapBox = document.getElementById("box");
	var clientH=document.documentElement.clientHeight;
	var aLi1 = oUl.children;
	var len = aLi1.length;
	var oBox = aLi1[len - 1];
	var timer1=null;
function moveScroll(iTarget,time){
		var start=document.documentElement.scrollTop||document.body.scrollTop;  //不带px  所以运动框架自己再封装
		var dis=iTarget-start;
		var n=0;
		var count=parseFloat(time/30);
		clearInterval(timer1);
		timer1=setInterval(function(){
			n++;
			var cur=start+dis*n/count;
			document.documentElement.scrollTop=cur;
			document.body.scrollTop=cur;
			//userGun=false;
			if(n==count){
				clearInterval(timer1);
			}	
		},30)
};
	
	for(var i=0;i<aLi1.length;i++){
		aLi1[i].index=i;
		aLi1[i].addEventListener("click",function(){
				cur=this.index;
				moveScroll(cur*clientH,600)
		},false);
	}
	
	//给每个div 加可视区高度
	(function(){
		var oDiv = document.getElementById("box");
		var clientHeight = document.documentElement.clientHeight
		var aEle = getByClass(oDiv,"common")
		for(var i = 0; i < aEle.length; i++){
			aEle[i].style.height =clientHeight+"px";
		}
	})()
	//添加事件
	for(var i = 0; i < len - 1; i++){
		aLi1[i].onmouseover = function(){
			move(oBox,this.offsetLeft);
			for(var i = 0; i < len - 1; i++){
				aLi1[i].style.color="#fff";
			}
			this.style.color="#06F";
		};
	}
	var speed = 0;
	var left  = 0;
	function move(obj,iTarget){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			speed += (iTarget - left)/5;
			speed *= 0.7;
			left += speed;
			obj.style.left = Math.round(left) + "px"; 
			//if(obj.offsetLeft == iTarget){
			if(obj.offsetLeft == iTarget && Math.abs(speed) < 1){
				clearInterval(obj.timer);
			}
		},30);
	}
	oHome.onclick=function(){
	};
	//自动bof选项卡
	var oTab = document.getElementById("tab");
	var oDiv = document.getElementById("radius");
	var aBtn = oDiv.getElementsByTagName("a");
	var aLi = oTab.getElementsByTagName("li");
	var oPrev = document.getElementById("lf");
	var oNext = document.getElementById("rt");
	var iNow = 0;
	//自动播放
	//alert(aLi.length)
	var timer = setInterval(next,4000);
	oTab.onmouseover = function(){
		clearInterval(timer);
		oPrev.style.display="block"	
		oNext.style.display="block"	
	};
	oTab.onmouseout = function(){
		timer = setInterval(next,4000);	
		oPrev.style.display="none"	
		oNext.style.display="none"	
	};
	//上一个
	oPrev.onclick = function(){
		iNow--;
		if(iNow == -1){
			iNow = aBtn.length - 1;
		}
		tab();
	};
	//下一个
	oNext.onclick = next;
	function next(){
		iNow++;
		if(iNow == aBtn.length){
			iNow = 0;
		}
		tab();
	}	
	function tab(){
		for(var i = 0; i < aBtn.length; i++){
			aBtn[i].className = "";
			aLi[i].style.display = "none";
		}
		aBtn[iNow].className = "active";
		aLi[iNow].style.display = "block";	
	}
	for(var i = 0; i < aBtn.length; i++){
		aBtn[i].index = i;
		aBtn[i].onclick = function(){
			iNow = this.index;
			tab();
		};
	}
	//skills
(function(){
	var oUlSk = document.getElementById("ul1");
	var aLiSk = oUlSk.children;
	
	for(var i = 0; i < aLiSk.length; i++){
		lagou(aLiSk[i]);
	}
	function getDir(oEvent,obj){
		var x1 = getPos(obj).left + obj.offsetWidth/2;
		var y1 = getPos(obj).top + obj.offsetHeight/2;
		
		var x2 = oEvent.pageX;
		var y2 = oEvent.pageY;
		
		var x = x2 - x1;
		var y = y1 - y2;
		
		// 0 左边 1 下  2 右  3 上 
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;			
	}
	function lagou(oDiv){
		oDiv.onmouseover = function(ev){
			var oEvent = ev || event;
			var n = getDir(oEvent,this);
			var oSpan = this.children[0];
			var oFrom = oEvent.fromElement || oEvent.relatedTarget;
			if(oDiv.contains(oFrom)){
				return;
			}
			switch(n){
				case 0://左边
					oSpan.style.left = "-300px";
					oSpan.style.top = "0";
					break;
				case 1://下边
					oSpan.style.left = "0";
					oSpan.style.top = "300px";
					break;
				case 2://右边
					oSpan.style.left = "300px";
					oSpan.style.top = "0";
					break;
				case 3://上边
					oSpan.style.left = "0";
					oSpan.style.top = "-300px";
					break;
			}
			moveRuning(oSpan,{left:0,top:0});
		};
		oDiv.onmouseout = function(ev){
			var oEvent = ev || event;
			var n = getDir(oEvent,this);
			var oSpan = this.children[0];
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			if(oDiv.contains(oTo)){
				return;
			}
			switch(n){
				case 0://左边 
					moveRuning(oSpan,{left:-300,top:0});
					break;
				case 1://下边 
					moveRuning(oSpan,{left:0,top:300});
					break;
				case 2://右边 
					moveRuning(oSpan,{left:300,top:0});
					break;
				case 3://上边 
					moveRuning(oSpan,{left:0,top:-300});
					break;
			} 
		};
	}
})();	
//点击隐藏再出来；
(function(){
    var oShow = document.getElementById('show');
	var oUl = document.getElementById("eft");
	var aLi = oUl.children;
	var len = aLi.length;
	var aPos = [];
	for(var i = 0; i < len; i++){
		aPos[i] = {left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
		aLi[i].style.left = aPos[i].left +　"px";
		aLi[i].style.top  = aPos[i].top  +　"px";
	}
	for(var i = 0; i < len; i++){
		aLi[i].style.position  =  "absolute";
		aLi[i].style.margin  =  "0";
	}
	//收！
	var timer = null;
	var arr = ['亚麻跌','临幸我']
	oShow.onmouseover=function(){
		moveRuning(oShow,{borderRadius:50})
		oShow.style.borderRadius="0"	
		oShow.innerHTML=arr[0]
	}
	oShow.onmouseout=function(){
		moveRuning(oShow,{borderRadius:0})
		oShow.innerHTML=arr[1]
	}
	oShow.onclick = function(){
		var i = 0;
		clearInterval(timer);
		timer = setInterval(function(){
			(function(index){
				moveRuning(aLi[i],{left:0,top:0,width:0,height:0,opacity:0},{
					complete:function(){
						//alert(index);
						if(index == len - 1){
							//alert("运动完成！");
							//放出来
							var i = index;
							clearInterval(timer);
							timer = setInterval(function(){
								moveRuning(aLi[i],{left:aPos[i].left,top:aPos[i].top,width:204, height:210,opacity:1});
								i--;
								if(i == -1){
									clearInterval(timer);
								}
							},100);
						}
					}
				});
			})(i);
			i++;
			if(i == len){
				clearInterval(timer);
			}
		},100);
	};
})();
	//about
(function(){
	var oAtbMe = document.getElementById("atbMe");
	var aLiAtbMe = oAtbMe.children;
	var oAtbMe = document.getElementById("atbMe2");
	changeXY(aLiAtbMe)
	// 布局转换
function changeXY(obj){
	var len1 = aLiAtbMe.length;
	var aPos = [];
	for(var i = 0; i < len1; i++){
		aPos[i] = {left:aLiAtbMe[i].offsetLeft,top:aLiAtbMe[i].offsetTop};
		aLiAtbMe[i].style.left = aPos[i].left + "px";
		aLiAtbMe[i].style.top  = aPos[i].top + "px";
	}
	for(var i = 0; i < len1; i++){
		aLiAtbMe[i].style.position  =  "absolute";
		aLiAtbMe[i].style.margin  =  "0";	
	}
	var zIndex = 1;
	//添加事件
	for(var i = 0; i < len1; i++){
		
		aLiAtbMe[i].onmouseover = function(){
			this.style.zIndex = zIndex++;
			//alert(this)
			this.style.background="#79e1a3"
			moveRuning(this,{ opacity:1, width:140});	
		};
		aLiAtbMe[i].onmouseout = function(){
			moveRuning(this,{ opacity:.6,width:78});
			this.style.background=null
		};	
	
	}
}
})();
//介绍
(function(){
    var str="性 格 内 敛 - - - - - - - - , 做 事 专 注 认 真 , - - - - - - - - 责 任 心 强 , - - - - - - - - 追 求 极 限 技 术 , - - - - - - - - 突 破 自 我 。 。 。";
    var str1="欢 迎 来 到 我 的 网 站"
   	var oJs=document.getElementById('jieshao')
   	var oWr=document.getElementById('wr')
	for(var i=0;i<str.length;i++){
		var oSpan = document.createElement("span");
		oSpan.innerHTML=str.charAt(i);
		oJs.appendChild(oSpan);
	}
	var aSpan=oJs.getElementsByTagName("span")
	var i=0;
	var timerWrite=setInterval(function(){
		moveRuning(aSpan[i],{opacity:1})		
		i++;
		if(i==str.length){
			clearInterval(timerWrite)
		}
		},120);
	})();
	(function(){
	var oDiv = document.getElementById("fan");
	var oPage  = oDiv.querySelector(".page");
	var oFront = oDiv.querySelector(".front");
	var oBack  = oDiv.querySelector(".back");
	var oPage2 = oDiv.querySelector(".page2");
	var iNow = 0;
setInterval(function(){
		iNow++;
		//点击的时候才有运动
		oPage.style.transition = "1s all ease";
		oPage.style.transform = "perspective(800px) rotateY(-180deg)";	
	},3000)
	
	oPage.addEventListener("transitionend",function(){
		oPage.style.transition = "none";
		oPage.style.transform = "perspective(800px) rotateY(0deg)";
		oDiv.style.backgroundImage = "url(img2/"+iNow%3+".jpg)";
		oFront.style.backgroundImage = "url(img2/"+iNow%3+".jpg)";
		oBack.style.backgroundImage = "url(img2/"+(iNow+1)%3+".jpg)";
		oPage2.style.backgroundImage = "url(img2/"+(iNow+1)%3+".jpg)";	
	},false);
	})();
	var oShock = document.getElementById("shock"); 
	var aShock = oShock.getElementsByTagName("li");
		setInterval(function(){
		},30)
	function Maths(m,n){
		return Math.round(Math.random()*(m-n)+n) 
	}	
		//effect
}
});