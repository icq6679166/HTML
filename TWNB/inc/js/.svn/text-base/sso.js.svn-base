addOnloadEvent(function(){
	/*------banner------*/
	imgLst = getChildren(gets('#img_container'),'li');
	banners = 0;
	arr = [];	
	/*------keyBoard------*/
	url = "";
	txt = document.getElementById("upc");
	list2 = document.getElementsByClassName('ltr');
	ran2 = "";
	ifUpper = 0;
	str = [];	
})	
/*      ssoBanner 
------------------------------------ */  
function loop(){
	for(var i=0; i<imgLst.length; i++){
		arr.push('tmp' + i);
		arr[i] = imgLst[i].innerHTML;	
	}
}
function next_lst(){
	loop();	
	for(var i=0; i<imgLst.length; i++){
		imgLst[i].innerHTML = arr[i+1];
		imgLst[imgLst.length-1].innerHTML = arr[0];
	}
}
function prev_lst(){
	loop();	
	for(var i=0; i<imgLst.length; i++){		
		imgLst[0].innerHTML = arr[imgLst.length-1];
		imgLst[i].innerHTML = arr[i-1];
	}
}  
/*      tabs 
------------------------------------ */  
function onTabClick(e){
	var tabs = gets('#sso_tabs');	
	var li = tabs.getElementsByTagName('li');
	for(var i=0; i<li.length; i++){
		li[i].onclick = function(){
			for(var j=0; j<li.length; j++){
				li[j].className = '';
			}	
			this.className = 'current';
		}
	}
} 
/*      keyBoard 
------------------------------------ */
document.getElementsByClassName = function(cl) {//------>for IE6
  var retnode = [];
  var elem = this.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
	if((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') > -1) retnode.push(elem[i]);
  }
  return retnode;
};	
function login(url){
	var k = gets('#keyBoard_pop');
	removeClass(k,'hide');  
	window.location = url;
}
function clearPassword(){//------------清除字
	gets('#password').value = '';
}
function keyBoard(e){//------------按下鍵盤icon
    var k = gets('#keyBoard_pop');
	
    shuffleAll();
    removeClass(k,'hide');  
    css(k,{  
       	top:findPosXY(e).top-k.offsetHeight+e.offsetHeight+156+'px',//------------鍵盤距離(top)
        left:findPosXY(e).left-k.offsetWidth+e.offsetWidth+18+'px'//------------鍵盤距離(left)
    }) 
	ifUpper = 1; 
	toUp(e);                                     
} 
function shuffleAll(e){//------------重設字序
	var list = getChildren(gets('#nums'),'li');
	var ran = '1234567890'.split('').shuffle(); 
	str=[]; 
	ran2 = 'abcdefghijklmnopqrstuvwxyz'.split('').shuffle(); 
    each(list,function(e,i){  
        e.innerHTML　= ran[i];  
        e.onclick = function(){
            gets('#password').value += this.innerHTML;  
        }  
    }) 
	each(list2,function(e,i){  
        e.innerHTML　= ran2[i];  
        e.onclick = function(){
            gets('#password').value += this.innerHTML;  
        }  
    })
	for(var i=0; i<list2.length; i++){
		str.push(ran2[i]);
		list2[i].innerHTML = String(str[i]).toLowerCase();
	}
	for(i=0; i<list2.length; i++){
		list2[i].innerHTML = String(str[i]).toLowerCase();
	}
	ifUpper = 1;
	toUp();
}
function toUp(e){//------------變大寫
	if(ifUpper == 1){
		for(i=0; i<list2.length; i++){
			list2[i].innerHTML = String(str[i]).toLowerCase();
		}
		txt.innerHTML = '大 寫';
		ifUpper = 0;
	} else {
		for(i=0; i<list2.length; i++){
			list2[i].innerHTML = String(str[i]).toUpperCase();
		}
		txt.innerHTML = '小 寫';
		ifUpper = 1;
	}
}