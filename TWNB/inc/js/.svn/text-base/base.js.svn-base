// JavaScript Document
var px = 'px';
var focusObj;		//設定focus
var page_current;	//頁面狀態
//var parentIframe = parent.document.getElementById('mainFrame');
//var parentSideLeft = parent.document.getElementById('sideLeft_wp');

/*		addOnloadEvent 頁面載入完成事件
------------------------------------ */
addOnloadEvent(function(){
	//page_current = document.body.className ? document.body.className:'content';
	gets('.help_btn') ? setHelp(gets('.help_btn')):'';
	gets('#path') ? setPathArrow(gets('#path')):'';
	gets('#step') ? setStep('#step','step'):'';
	
	var d = gets('.tb_multi');
	if(d){zebraTable(d);tbHover(d);}

//	gets('.tb_total') ? zebraTable(gets('.tb_total')):'';

	gets('.tb_lv2') ? zebraTable(gets('.tb_lv2')):'';
	if(document.body.className == ''){
		resizeHeight('page');
	}else{
		if(gets('#menu')){	
			jsMenu.init(gets('#menu'),gets('#subMenu'));
			//jsMenu.toggleMenu([lv1,lv2,lv3,...]) 控制選單階層
		}		
	}
    gets('#HMS') ? gets('#HMS').innerHTML = getHMS(2):'';
    gets('#YMD') ? gets('#YMD').innerHTML = getYMD(0):'';
})
/*		jsMenu
------------------------------------ */
var menuMap,
jsMenu = {
	init:function(menu,subMenu){		
		this.menu = menu ? menu:null;
		this.subMenu = subMenu ? subMenu:null;
		this.addEvt();
	},
	addEvt:function(){
		var lv2,lv3,lv4,
		_this = this,
		_menu = this.menu.getElementsByTagName('DD'),
		_subMenu = this.subMenu.getElementsByTagName('UL');
		if(_menu){
			//lv1
			for(var i=0; i<_menu.length; i++){
				_menu[i].ind = i;
				_menu[i].id = i;
				_menu[i].onclick = function(){
					_this.resetMenu(1);
					_this.resetMenu(2);
					addClass(this,'current');
					addClass(_subMenu[this.ind],'current');	
				}
				//lv2 -> LI
				if(_subMenu){
					lv2 = getChildren(_subMenu[i]);
					each(lv2,function(e,j){
						e.id = i+','+j;
						e.getElementsByTagName('OL').length == 0 ? addClass(e,'single'):'';
						e.onclick = function(){					
							_this.resetMenu(2);
							addClass(this,'current');
							resizeHeight('main');
						}
						//lv3 -> LI
						lv3 = getChildren(e,'LI');
						each(lv3,function(e,k){
							e.id = i+','+j+','+k;
							e.getElementsByTagName('DL').length == 0 ? addClass(e,'single'):'';
							e.onclick = function(){
								_this.resetMenu(3);
								addClass(e,'current');
							}
							//lv4 -> DD
							lv4 = getChildren(e,'DD');
							each(lv4,function(e,m){
								e.id = i+','+j+','+k+','+m;
								e.onclick = function(){
									_this.resetMenu(4);
									addClass(e,'current');
								}		  
							})
						})
					})
				}
			}
		}
	},
	resetMenu:function(key){
		//jsMenu.pickMenu(1~4)
		var lv2,lv3,lv4
		_this = this,
		_menu = this.menu.getElementsByTagName('DD'),
		_subMenu = this.subMenu.getElementsByTagName('UL');		
		each(_menu,function(e,i){
			if(key == 1 || key == 'all'){removeClass(e,'current');removeClass(_subMenu[i],'current');}
			lv2 = getChildren(_subMenu[i]);
			each(lv2,function(e,i){
				if(key == 2 || key == 'all'){removeClass(e,'current');}				
				lv3 = getChildren(e,'LI');
				each(lv3,function(e,i){
					if(key == 3 || key == 'all'){removeClass(e,'current');}					
					lv4 = getChildren(e,'DD');
					each(lv4,function(e,i){	  
						if(key == 4 || key == 'all'){removeClass(e,'current');}
					})
				})	
			})	
		})
	},
	pickMenu:function(ar){
		//jsMenu.pickMenu([0,1,0,1])
		var lv2,lv3,lv4
		_this = this,
		_menu = this.menu.getElementsByTagName('DD'),
		_subMenu = this.subMenu.getElementsByTagName('UL');		
		each(_menu,function(e,i){
			//lv1
			if(ar[0] == i){addClass(e,'current');addClass(_subMenu[i],'current');}	
			//lv2
			lv2 = getChildren(_subMenu[i]);
			each(lv2,function(e,i){
				if(ar[1] == i){addClass(e,'current');}
				//lv3
				lv3 = getChildren(e,'LI');
				each(lv3,function(e,i){
					if(ar[2] == i){addClass(e,'current');}
					//lv4
					lv4 = getChildren(e,'DD');
					each(lv4,function(e,i){
						if(ar[3] == i){addClass(e,'current');}
					})
				})
			})
		})
	},
	toggleMenu:function(ar){
		this.resetMenu('all');
	    this.pickMenu(ar);
	}
};

//新增事件
function addEvent(obj, event, handler) {
	if (obj.addEventListener) {
	obj.addEventListener(event, handler, false);
	} else if (obj.attachEvent) {
	obj.attachEvent('on'+event, handler);
	}
}
//倒數計時
function clock(timem,url){
	var h = parent.document.getElementById('timeH');
	var m = parent.document.getElementById('timeM');

	h.innerHTML = time[1];
	m.innerHTML = time[2];
	var s = time[0] * 3600 + time[1] * 60 + time[2];
	setInt = setInterval(function (){
		if(s<=0){
//			gid('timer').innerHTML = '時間逾時，請重新登入';
			clearInterval(setInt);
			window.location.href = url;
		}
		else{ 
			s--;			
			h.innerHTML = sec2HMS(s)[1];
			m.innerHTML = sec2HMS(s)[2];
		}			
	},1000);
}
//倒數計時
function clock2(time,url){
	var h = document.getElementById('timerM');
	var m = document.getElementById('timerS');
	h.innerHTML = time[1];
	m.innerHTML = time[2];
	var s = time[0] * 3600 + time[1] * 60 + time[2];
	setInt = setInterval(function (){
		if(s<=0){
//			gid('timer').innerHTML = '時間逾時，請重新登入';
			clearInterval(setInt);
			window.location.href = url;
		}
		else{ 
			s--;			
			h.innerHTML = sec2HMS(s)[1];
			m.innerHTML = sec2HMS(s)[2];
		}			
	},1000);
}


/*	sec2HMS
------------------------------------*/
//秒數轉換時分秒
function sec2HMS(t){
	var h,m,s;
	h = Math.floor(t/3600);
	m = Math.floor((t - Math.floor(t/3600) * 3600) /60);
	s = t - (Math.floor(t/3600) * 3600) - Math.floor((t - Math.floor(t/3600) * 3600) /60) * 60;
	return [h,m,s];
} 
/*		自動改變高度
------------------------------------ */
//預設resizeHeight('page') > 改變iframe高度, 內頁使用
//resizeHeight('main') > main.html 使用
function resizeHeight(status){
	//if(!top){parent.window.scrollBy(0,-10000);}
	var ua = navigator.userAgent.toLowerCase();
	var h = 500; //預設高度 for ff3
		ua.match('chrome') ? h = 503:'';
		ua.match('ie') ? h = 469:'';
	var errorVal = 0; //誤差值
	var px = 'px';
	if(status == 'page'){
		parent.window.scrollBy(0,-10000);
		if(!parent.document.getElementById('mainFrame')){return;}
		parentIframe = parent.document.getElementById('mainFrame');
		parentSideLeft = parent.document.getElementById('sideLeft_wp');
		cont = document.body.offsetHeight;	//內容高度
		scrollH = parent.document.getElementById('subMenu').offsetHeight;	//左邊區塊高度
		//alert('cont:'+(cont)+';\n'+'scrollH:'+scrollH);
		if(scrollH > cont){
			h = scrollH > h ? scrollH:h;
		}else{
			h = cont > h ? cont:h;
		}
		parentSideLeft.style.height = h + errorVal + px;
		parentIframe.style.height = h + px;	
	}else if(status == 'main'){
		h = Math.max(gets('#mainFrame').offsetHeight,gets('#subMenu').offsetHeight);				
		gets('#mainFrame').style.height = h + px
		gets('#sideLeft_wp').style.height = h + px
	}
}
/*		datePicker
------------------------------------ */
//小月曆
function datePicker(obj,path){
	if(path){jscalendarSetImageDirectory(path);}
	else{jscalendarSetImageDirectory('../../inc/calendar/img/');}
	//找到上一層的欄位, 傳給datePickerPopUpCalendar
	var txt = obj.previousSibling.previousSibling;
	if(txt.type == 'text'){
		//datePickerPopUpCalendar(物件, input欄位, date format, 西元0/民國1)
		datePickerPopUpCalendar(obj,txt,'yyyy/mm/dd','0')	
	}
	/*resizeHeight(true);*/
}
/*		setHelp()
------------------------------------ */
/*mouseover popup div layer*/
//use setAlpha(), findPosXY(), getsNext();
function setHelp(list){
	var div, posXY, x, y;
	for(var i=0; i<list.length; i++){
		list[i].onmouseover = function (){
			div = getNext(this);
			posXY = findPosXY(this);
			x = posXY.left + 20 + 'px';
			y = posXY.top + 'px';
			div.style.left = x;
			div.style.top = y;
			setAlpha(div, 100);
		}
		list[i].onmouseout = function (){
			setAlpha(getNext(this), 0);
		}
	}
}
/*		setStep
------------------------------------ */
//設定步驟
function setStep(id,name){
	var child = getChildren(gets(id)),hasCurrent=false;
	each(child,function(e,i){
		if(!hasClass(e,'current') && !hasCurrent){
			hasCurrent = true;
		    addClass(e,'old');
	    }
		addClass(e,name+parseInt(i+1));
	})
}

/*		confirmx
------------------------------------ */
//彈出確認取消頁
function confirmx(txt,href1,href2){
	var tc = confirm(txt);
	if(tc && href1){window.location=href1;}
	else if(href2){window.locationhref2;}
}
/*		tbDropDownAll
------------------------------------ */
function tbDropDownAll(_this,obj){
	var o = gets(obj),n = o.length;
	if(_this.className == 'btn_openAll'){
	    _this.className = 'btn_openAll_hide';
		_this.innerHTML = '全部收合';
		for(var i=0; i<n; i++){
		    tbDropDown(o[0],1)
		}
		if(document.all){
			each(o,function(e,i){
				tbDropDown(e,1)
			})
		}
	}else{
	    _this.className = 'btn_openAll';
		_this.innerHTML = '全部展開';
		o = gets(obj+'_hide');
		n = o.length;
		for(var i=0; i<n; i++){
		    tbDropDown(o[0],1)
		}
		if(document.all){
			each(o,function(e,i){
				tbDropDown(e,1)
			})
		}
	}
}
/*		tbDropDown
------------------------------------ */
//展開節點
function tbDropDown(e,num){
	current_row = getParent(e,'TR');
	//alert(current_row);
	//next_row = getNext(current_row);
	//alert(hasClass(e,'hide'));
	
	if(e.className.match('hide')){
		e.className = e.className.replace('_hide','');
		//把每個row的className, 取代成空白
		tbSwitch(current_row,num,'hide');
	}else{
		e.className +='_hide';
		tbSwitch(current_row,num,'hide');
	}
	//重新設定iframe高度, 不scrolltop
	//resizeHeight(true);
}
/*		tbSwitch
------------------------------------ */
//指定往下改變className
function tbSwitch(obj,num,className){
	var next_rows, n;
	var tb = obj;
	while(tb.tagName != 'TABLE'){tb = tb.parentNode;}
	next_rows = obj.rowIndex+1;
	n = next_rows + num;
	for(i=next_rows; i<n; i++){chgClass(tb.rows[i],className,2);}
}


/*		下拉選單角色移動
------------------------------------ */
//addAll(),check(),downSelect(),upSelect();
//全部移動
function addAll(sela,selb){	
	var sel1 = document.getElementById(sela),
		sel2 = document.getElementById(selb),
		len = sel1.length,
		opt;
	for(var j=0; j < len; j++){	
		opt = document.createElement("option");
		opt.text = sel1.options[0].text;
		opt.value = sel1.options[0].value;
		try{
			sel2.add(opt,null); // standards compliant
		}catch(ex){
			sel2.add(opt);	//for IE
		}		
		sel1.remove(0);
	}
}
//範圍移動
function check(sela,selb){
	var sel1 = document.getElementById(sela),
		sel2 = document.getElementById(selb),
		len = document.getElementById(sela).options.length,
		i=0,opt;
	while(i < sel1.options.length){
		if(sel1.options[i].selected){
			opt = document.createElement("option");
			opt.text=sel1.options[i].text;
			opt.value=sel1.options[i].value;	
			try{
				sel2.add(opt,null);	//FF
			}catch(ex){
				sel2.add(opt);	//for IE
			}
			sel1.remove(i);			
		}else{
			i++;
		}
	}			
}
//選項往下移動
function moveDown(id){
	var ar=[],opt;
		elem = document.getElementById(id);
		len = elem.options.length,
		ind = elem.selectedIndex;
	if(ind>=len){return;}
	for(var i =0; i<len; i++){		
		if(i==ind){ar.push(elem.options[i+1].text)}
		else if(i==ind+1){ar.push(elem.options[i-1].text)}
		else{ar.push(elem.options[i].text)}
	}
	while(elem.options.length > 0){elem.remove(0)}
	for(var j=0; j<len; j++){
		opt = document.createElement('option');
		opt.text = ar[j];
		opt.value = j;	
		document.all ? elem.add(opt):elem.add(opt, null);	
	}
	elem.selectedIndex = ind+1;
}

//選項往上移動
function moveUp(id){
	var ar=[],opt;
		elem = document.getElementById(id);
		len = elem.options.length,
		ind = elem.selectedIndex;
	if(ind<=0){return;}
	for(var i =0; i<len; i++){		
		if(i==ind){ar.push(elem.options[i-1].text)}
		else if(i==ind-1){ar.push(elem.options[i+1].text)}
		else{ar.push(elem.options[i].text)}
	}
	while(elem.options.length > 0){elem.remove(0)}
	for(var j=0; j<len; j++){
		opt = document.createElement('option');
		opt.text = ar[j];
		opt.value = j;	
		document.all ? elem.add(opt):elem.add(opt, null);		
	}
	elem.selectedIndex = ind-1;
}

/*		radioto URL
------------------------------------ */
//點選radio , 連結到頁面
function radioto(_this){
	var arr;
	if(typeof(_this) == 'object'){
		arr = document.getElementsByName(_this.name);
	}else{
		arr = document.getElementsByName(_this);
	}
	for(var i=0; i<arr.length; i++){
		if(arr[i].checked){linkto(arr[i].value); return;}
	}
}

/*		setPathArrow
------------------------------------ */
//設定路徑
function setPathArrow(e){
	var chid = getChildren(e);	
	each(chid,function(obj,i){
	    if(i != chid.length-1){
		    obj.innerHTML += '&nbsp;&gt;&nbsp;';
		}
	})
}
/*	chgClass
------------------------------------*/
//mode = 1 , 直接覆蓋所有class
//mode = 2 , 已經有相同class, 則移除, 否則加上class
//mode = add, 新增class, 有相同則不新增
//mode = remove, 移除class, 有相同才做移除
function chgClass(obj,className,mode){	
	switch(mode){
		case 2:
			obj.className.match(className) ? 
			obj.className = obj.className.replace(className, ""):obj.className +=' '+className;
			break;
		case 'add':
			obj.className.match(className) ? 
			'':obj.className +=' '+className;
			break;
		case 'remove':
			obj.className.match(className) ? 
			obj.className = obj.className.replace(className, ""):'';
			break;
		default:
			obj.className.match(className) ? 
			obj.className = '':obj.className +=' '+className;
			break;
	}
}
function tbHover(ele){
	each(ele,function(e,i){
		if(!hasClass(e,'nohover')){
			var tr = e.getElementsByTagName('tr');
			each(tr,function(f,i){
				if(i != 0){
					f.onmouseover = function (){addClass(this,'hover')}
					f.onmouseout = function (){removeClass(this,'hover')}	
				}
			});	
		}		
	})
}
/*	zebraTable 表格奇偶列顏色
------------------------------------*/
//zebraTable(element,不要highLight的列數:ar)
//zebraTable(element) 預設第一個不highLight
//zebraTable(element,['first','last']) 第一個和最後一個不highLight
//zebraTable(element,[2,4]) 第2第4列不highLight
function zebraTable(tblist,except){
	var child,except_txt;
    each(tblist,function(e,i){
		if(hasClass(e,'noeffect')){return;}
		child = getChildren(e,'tr');
		if(except){
		    each(except,function(e,i){
			    switch(except[i]){
					case 'first':
						except_txt += '&& j !=0';
					break;
					case 'last':		
						except_txt += '&& j != tr.length-1';						
					break;
					default:
						except_txt += '&& j != ' + except[k];	
				}
			})
			each(child,function(e,i){
				if(eval(except_txt)){
					if(i%2==0){addClass(e,'odd')}
					else{addClass(e,'even');}
				}
			})
		}else{
			each(child,function(e,i){
				if(i!=0){
					if(i%2==0){addClass(e,'odd')}
					else{addClass(e,'even');}
				}
			})
		}
	})
}

/*	addTableHoverEvt 
------------------------------------*/
//為表格加上mouseover event
function addTableHoverEvt(elem,start){
	var tb, tr;
	if(elem.id){
		//for id
    	if(hasClass(elem,'noeffect')){return;}
		tr = elem.getElementsByTagName('tr');
		for(var i=start;i<tr.length;i++){	
			tr[i].onmouseover = function (){addClass(this,'hover');}
			tr[i].onmouseout = function (){removeClass(this,'hover');}
		}
	}else{
		//for class
		for(var j=0;j<elem.length;j++){
            if(hasClass(elem,'noeffect')){return;}
			tb = elem[j];
			tr = elem[j].getElementsByTagName('tr');
			for(var i=start;i<tr.length;i++){	
				tr[i].onmouseover = function (){addClass(this,'hover');}
			    tr[i].onmouseout = function (){removeClass(this,'hover');}
			}
		}		
	}
}
/*		checkAllBox 
------------------------------------ */
//全選checkbox
function checkAllBox(_this,chk){
	var ar = document.getElementsByName(chk);
	if(_this){
		for(var i=0; i<ar.length; i++){
			if(_this.checked){
				checkBox(_this.name,true)
				checkHighLight(ar[i],true);
			}else{
				checkHighLight(ar[i],false);
			}
			ar[i].checked = _this.checked;
		}
	}
}
/*		checkBox 
------------------------------------ */
//全選/取消checkbox
function checkBox(chk,check){
	var ar = document.getElementsByName(chk);
	for(var i=0;i<ar.length;i++){
		ar[i].checked = check;
	}
}
/*		checkHighLight 
------------------------------------ */
//highLight className = checkHighLight;
//單選用 checkHighLight(e)
function checkHighLight(e,check){
	if(check == undefined){
		//單選
		if(e.checked == false){
			chgClass(getParent(e,'TR'),'checkHighLight','remove');
		}else{
			chgClass(getParent(e,'TR'),'checkHighLight','add');
		}	
	}else if(check){
		//全選
		chgClass(getParent(e,'TR'),'checkHighLight','add');
	}else{
		chgClass(getParent(e,'TR'),'checkHighLight','remove');
	}
}
/*		jmask2
------------------------------------ */
//遮罩
function jmask2(id,w,h,_x,_y){
	var left = '50%';
	var top = '50%';
	var parentBody = document.body;
	var overlay = document.getElementById('js_overLayer');
	var box = document.getElementById('js_container');
	var scrollH = document.body.scrollHeight; 
	var selElement = document.getElementsByTagName('SELECT');
//	var parentSelect = document.getElementsByTagName('SELECT');
	var data = gets(id);
	if(!h){h = data.offsetHeight;}
	if(!w){w = data.offsetWidth;}
	if(_x != '' && _x != undefined){x = _x;}else{x = -(parseInt(w/2))+px;}
	if(_y != '' && _y != undefined){y = _y;top='400px';}else{y = -(parseInt(h/2))+'px';}
	//遮罩
	overlay.style.height = scrollH+px;
	/*setAlpha(overlay,70);*/
	//內容區塊
	box.style.width = w + px;
	box.style.height = h + px;	
	box.style.marginLeft = x;
	box.style.marginTop = y;
	box.style.left = left;
	box.style.top = top;	
	box.style.padding = 10 + px;
	box.style.overflow = 'visible';
	box.innerHTML = data.innerHTML;
	
	data.innerHTML = '';
	
	var d = document;
	//IE6 setting
	if (typeof document.body.style.maxHeight === "undefined") {
		
		document.body.style.overflow = 'hidden';
		//隱藏select element
		for(var i=0; i<selElement.length; i++){selElement[i].style.display = 'none';}
		boxSel = box.getElementsByTagName('SELECT');
		for(var j=0; j<boxSel.length; j++){boxSel[j].style.display = 'block';}
	}
	overlay.style.display = 'block';
	box.style.display = 'block';
}
function linkMask2(e,w,h){
	//var doc = document.getElementsByTagName('iframe')[0].contentWindow.document;
	var obj = gets(e);
	var box = gets('#js_container');
	
	var select1 = obj.getElementsByTagName('SELECT');
	for(var i=0; i<select1.length; i++){select1[i].style.display = 'block';}
	if(!h){h = obj.offsetHeight;}
	if(!w){w = obj.offsetWidth;}
	box.innerHTML = obj.innerHTML;
	box.style.width = w + px;
	box.style.height = h + px;	
	box.style.marginLeft = -(parseInt(w/2))+px;
	box.style.marginTop = -(parseInt(h/2))+px;	
	box.style.padding = 10 + px;
	box.style.overflow = 'visible';
}
//移除遮罩
function removeMask2(ele){
	//var selElement = document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('SELECT');
	var parentSelect = document.getElementsByTagName('SELECT');
	gets('#js_overLayer').style.display = 'none';
	gets('#js_container').style.display = 'none';
	/*gets('#jmask_tit').style.display = 'none';*/
	if (typeof document.body.style.maxHeight === "undefined") {
		for(i=0; i<parentSelect.length; i++){parentSelect[i].style.display = '';}
		document.body.style.overflow = '';
	}
	//把內容再傳回, 資料來源
	gets(ele).innerHTML = gets('#js_container').innerHTML;
}
/*		jmask
------------------------------------ */
//遮罩
function jmask(id,w,h,_x,_y){
	var left = '50%';
	var top = '50%';
	var parentBody = parent.document.body;
	var overlay = parent.document.getElementById('js_overLayer');
	var box = parent.document.getElementById('js_container');
	var scrollH = parent.document.body.scrollHeight; 
	var selElement = document.getElementsByTagName('SELECT');
	var parentSelect = parent.document.getElementsByTagName('SELECT');
	var data = gets(id);
	if(!h){h = data.offsetHeight;}
	if(!w){w = data.offsetWidth;}
	if(_x != '' && _x != undefined){x = _x;}else{x = -(parseInt(w/2))+px;}
	if(_y != '' && _y != undefined){y = _y;top='400px';}else{y = -(parseInt(h/2))+'px';}
	//遮罩
	overlay.style.height = scrollH+px;
	/*setAlpha(overlay,70);*/
	//內容區塊
	box.style.width = w + px;
	box.style.height = h + px;	
	box.style.marginLeft = x;
	box.style.marginTop = y;
	box.style.left = left;
	box.style.top = top;	
	box.style.padding = 10 + px;
	box.style.overflow = 'visible';
	box.innerHTML = data.innerHTML;
	
	var d = document;
	//IE6 setting
	if (typeof document.body.style.maxHeight === "undefined") {
		/*parent.document.getElementById('jmask_tit').style.position = 'absolute';*/
		
		parent.document.body.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		//隱藏select element
		for(var i=0; i<selElement.length; i++){selElement[i].style.display = 'none';}
		for(var i=0; i<parentSelect.length; i++){parentSelect[i].style.display = 'none';}
		boxSel = box.getElementsByTagName('SELECT');
		for(var j=0; j<boxSel.length; j++){boxSel[j].style.display = 'block';}
	}
	overlay.style.display = 'block';
	box.style.display = 'block';
}
//關掉遮罩並換頁
function linkFrame(url,mask){
	if(mask){removeMask();}
	MM_goToURL('parent',url)
}
/*	MM_goToURL
------------------------------------*/
//MM_goToURL('parent',url)
function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}
//連結到另依個Mask內容
function linkMask(e,w,h){
	var doc = document.getElementsByTagName('iframe')[0].contentWindow.document;
	var obj = doc.getElementById(e);
	var box = document.getElementById('js_container');
	
	var select1 = obj.getElementsByTagName('SELECT');
	for(var i=0; i<select1.length; i++){select1[i].style.display = 'block';}
	if(!h){h = obj.offsetHeight;}
	if(!w){w = obj.offsetWidth;}
	box.innerHTML = obj.innerHTML;
	box.style.width = w + px;
	box.style.height = h + px;	
	box.style.marginLeft = -(parseInt(w/2))+px;
	box.style.marginTop = -(parseInt(h/2))+px;	
	box.style.padding = 10 + px;
	box.style.overflow = 'visible';
}
//移除遮罩
function removeMask(msg){
	var selElement = document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('SELECT');
	var parentSelect = document.getElementsByTagName('SELECT');
	gets('#js_overLayer').style.display = 'none';
	gets('#js_container').style.display = 'none';	
	/*gets('#jmask_tit').style.display = 'none';*/
	if (typeof document.body.style.maxHeight === "undefined") {
		for(i=0; i<selElement.length; i++){selElement[i].style.display = '';}
		for(i=0; i<parentSelect.length; i++){parentSelect[i].style.display = '';}
	}
	msg ? alert(msg):'';
}



/*************************************
*		lib
**************************************/
//gets('.class'), gets('#id'), gets('tag')
function gets(el){
    switch(el.charAt(0)){
		case ("#"):
			return (document.getElementById(el.replace(/^#/, "")));
		case ("."):
			if(document.all){
				var elems = document.getElementsByTagName('*'),obj=[];
				for(i=0; i<elems.length; i++){
					if(elems[i].className == el.replace(/^\./, "")){obj.push(elems[i]);}
				}
				return obj;
			}else{
				return (document.getElementsByClassName(el.replace(/^\./, "")));	
			}
		default:
			return (document.getElementsByTagName(el));
    }
}
/*	evt
------------------------------------*/
function evt(el,type,callback,t){el.addEventListener(type,callback,t)}
/* 複製Object
------------------------------------*/
function clone(obj){ 
	if(obj == null || typeof(obj) != 'object') 
	return obj; 
	var temp = new obj.constructor(); // changed (twice) 
	for(var key in obj) 
	temp[key] = clone(obj[key]); 
	return temp; 
} 
/* create html dom
------------------------------------*/
function create(type){return document.createElement(type)}
/*	在元素之前插入
------------------------------------*/
function inserAfter(e,target){
	var parent=target.parentNode;
	if(parent.lastChild==target){//檢查目標元素是否是最後一個元素，若是則新元素直接添加到其後即可
		parent.appendChild(e);
	}else{//若不是就把新元素插入到目標元素和其對應的下一個元素的前面（插入結果還是在targetElement後面）
		parent.insertBefore(e,target.nextSibling);
	}
}
/*	移除 html dom
------------------------------------*/
function remove(el){el.parentNode.removeChild(el)}
/*	getClass
------------------------------------*/
//取得className  return array ex: getClass('span.myClass')
function getClass(str){
	var collection =[];
	var p1 = str.indexOf('.',0);
	var p2  = p1+1;
	var tag = str.substr(0,p1);
	var class_name = str.substring(p2,str.length);
	
	var tags = document.getElementsByTagName(tag);
	if(tags){
		for(var i=0; i<tags.length; i++){		
			tags[i].className.match(class_name) ? collection.push(tags[i]):'';
		}
	}
	return collection;
}
/*	加上class addClass(elementm,className);	指定元素新增樣式
------------------------------------*/
function addClass(ele,cls) {if (!this.hasClass(ele,cls)) ele.className += " "+cls;}  
/*	移除class
------------------------------------*/
function removeClass(ele,cls) {
	if (!hasClass(ele,cls)) {return;}
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	ele.className=ele.className.replace(reg,' ');
} 
/*	是否有class
------------------------------------*/
function hasClass(ele,cls) {return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));}
/*
//必須 hasClass(), removeClass(), addClass()
假設有相同class, 則移除, 未找到相同class, 則加上class
toggleClass(element,className);
------------------------------------*/
function toggleClass(ele,className){
	this.hasClass(ele,className) ? this.removeClass(ele,className) : this.addClass(ele,className);
}
/*	取代className
------------------------------------*/
function replaceClass(e,k1,k2){
	e.className = e.className.replace(k1,k2);
}
/*	設定css 樣式
------------------------------------*/
function css(el,vals){var style=el.style;for (var i in vals){style[i]=vals[i];}}
/*	動態迴圈
------------------------------------*/
function each(arr,callback){for (var i=0,length=arr.length;i<length;i++){var e=arr[i];callback.call(arr,e,i)}}
/*	取得下一層元素
------------------------------------*/
function getChildren(e,tag){
	var i,ar = [];
	if(!tag){
		for(i =0; i<e.childNodes.length; i++){
			e.childNodes[i].nodeType == 1 ? ar.push(e.childNodes[i]):'';
		}	
	}else{
		ar = e.getElementsByTagName(tag);	
	}	
	if(ar.length > 0){return ar}else{return false}
}
/*	取得上一階層元素
------------------------------------*/
function getParent(obj,tag){
	if(tag){
		var elem = obj;
		while(elem.tagName != tag){elem = elem.parentNode;}	
		return elem;	
	}else{
		var elem = obj.parentNode;
		while(elem.tagName == undefined){elem = elem.parentNode;}	
		return elem;	
	}
}
/*	getNext
------------------------------------*/
//取得下一個元素, 如果沒有則回傳 false
function getNext(elem){
	do {
		elem = elem.nextSibling;
		if(elem == null){return false;}
	} while (elem.nodeType != 1);
	return elem;			
}

/*	getPrevious
------------------------------------*/
//取得前一個元素, 如果沒有則回傳 false
function getPrevious(obj){
	var elem = obj.previousSibling;			
	while(elem.tagName == undefined){elem = elem.previousSibling;}	
	return elem;				
}
/*		addOnloadEvent
------------------------------------ */
function addOnloadEvent(fnc){
	// Firefox: functions attached seem to be called in attaching order
	if ( typeof window.addEventListener != "undefined" ) {
		window.addEventListener( "load", fnc, false );
	}
	// IE: functions attached are called in a random order
	else if ( typeof window.attachEvent != "undefined" ) {
		window.attachEvent( "onload", fnc );
	}else {
	 	if ( window.onload != null ) {
			var oldOnload = window.onload;
			window.onload = function ( e ) {
				oldOnload( e );
				window[fnc]();
			};
		}else{
			window.onload = fnc;
		}
	}
}
/*		findPosXY
------------------------------------ */
function findPosXY(e){
	var obj = {left:0,top:0};
	while(e != null){
		e.of
		obj.top+=e.offsetTop; 
		obj.left+=e.offsetLeft; 
		e=e.offsetParent;
	}
	return obj;
}
/*		setAlpha
------------------------------------ */
function setAlpha(o,v){
	o.style.cssText += 'filter:alpha(opacity='+v+');';
	o.style.cssText += '-moz-opacity:'+(v/100)+';';
	o.style.cssText += 'opacity:'+(v/100)+';';
	o.style.filter='alpha(opacity='+v+')';
}
/*		判斷瀏覽器
------------------------------------ */
browser = {
	ie:!!window.ActiveXObject,
	ie6:!!window.ActiveXObject && !window.XMLHttpRequest,
	ie8:!!window.ActiveXObject && !!document.documentMode,
	ie7:!!window.ActiveXObject && !window.XMLHttpRequest && !!document.documentMode,
	ff:navigator.userAgent.indexOf("Firefox") > -1,
	gc:navigator.userAgent.indexOf("Chrome") > -1,
	sf:navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1,
	op:navigator.userAgent.indexOf("Opera") > -1
}
/*		winopen視窗
------------------------------------ */
function winopen(theURL, w, h, menu) {
	menu ? menu = ',location=1,menubar=1,status=1,titlebar=1,toolbar=1':'';
	var str = 'width=' + w 
			+',height=' + h 
			+ menu
			+ ',scrollbars=1,resizable=1';	
	window.open(theURL, '',str);
}
//winopenHref 在新視窗中關掉時, 改變原本視窗路徑
function winopenHref(to,mother){
	if(opener.closed){
		var win = window.open("","MWindow");
		win.location.href = to;
	}else{
		opener.location.href = to;		
	}
}
/*		popup 視窗控制母視窗換頁
------------------------------------ */
function winOpenTo(src){opener.closed ?  window.open("","MWindow").location.href = src:opener.location.href = src;}
/*		設定連結
------------------------------------ */
function linkto(href){window.location.href=href;}
/*		echo 測試訊息
------------------------------------ */
function echo(str){	
	var div;
	if(div=document.getElementById('jsStatus')){
		div.innerHTML +=str+'';		
	}else{
		div = document.createElement('div');
		div.id = 'jsStatus';
		div.style.background = '#fff';
		div.style.border = '2px #ddd solid';
		div.style.padding = '10px';
		div.innerHTML +=str+'';
		document.body.appendChild(div);	
	}
}
/*		取得瀏覽器訊息
------------------------------------ */
function getBrowser(){ 
	var sAgent = navigator.userAgent.toLowerCase();
	this.isIE = sAgent.indexOf("msie")!=-1;
	this.isFF = sAgent.indexOf("firefox")!=-1;
	this.isSa = sAgent.indexOf("safari")!=-1;
	this.isOp = sAgent.indexOf("opera")!=-1;
	this.isNN = sAgent.indexOf("netscape")!=-1;
	this.isMa = this.isIE;//marthon
	this.isOther = (!this.isIE && !this.isFF && !this.isSa && !this.isOp && !this.isNN && !this.isSa);//unknown Browser
}
function getHMS(t,separate){
	var separate = [':',':',''];
	separate == 'tw' ? separate = ['時','分','秒']:'';
    var d = new Date(),HMS;
	var Min = d.getMinutes() < 10 ? '0' +String(d.getMinutes()):d.getMinutes();
	var Hou = d.getHours() < 10 ? '0' +String(d.getHours()):d.getHours();
	var Sec = d.getSeconds() < 10 ? '0' +String(d.getSeconds()):d.getSeconds();
	t == 0 ? HMS = Hou +separate[0]:'';
	t == 1 ? HMS = Hou +separate[0]+ Min:'';
	t == 2 ? HMS = Hou +separate[0]+ Min +separate[1]+ Sec:'';
	return HMS;
}
function getYMD(key){//0 西元 , 1 民國
	var d = new Date();
	key ? ch = d.getFullYear()-1911:ch = d.getFullYear();
	var years = ch;
	var months = (d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1):d.getMonth()+1;
	var days = d.getDate() < 10 ? '0'+d.getDate():d.getDate();
	return (years+"/"+months+"/"+days);
}

function tbView(name,ar){			
	if(document.getElementById(name)){
		tb = document.getElementById(name);
	}else{
		tb = name;
		while(tb.tagName != 'TABLE'){tb = tb.parentNode;}
	}
	if(ar == '#'){return;}
	if(typeof(ar) == 'string'){ar = ar.split(',')}
	if(ar == 'all'){
		for(i=0; i<tb.rows.length; i++){
			if(document.all){tb.rows[i].style.display = 'block';}
			else{tb.rows[i].style.display = 'table-row';}
		}
	}else{
		for(j=0; j<tb.rows.length; j++){tb.rows[j].style.display = 'none';}
		for(k=0; k<ar.length; k++){
			if(document.all){tb.rows[ar[k]].style.display = 'block';}
			else{tb.rows[ar[k]].style.display = 'table-row';}
		}				
	}
}
function setDisabled(value,ar){
	each(ar,function(e,i){
	    var e = gets(ar[i]),
		    input = e.getElementsByTagName('INPUT'),
		    txtarea = e.getElementsByTagName('TEXTAREA');
		if(value){
			addClass(e,'disabled');
		}else{
			removeClass(e,'disabled');				
		}
		each(input,function(e,i){e.disabled = value;})
		each(txtarea,function(e,i){e.disabled = value;})
	})
}
function addRow(id){
	var tb,tr,td,ntr;
	var className = [];
	tb = gets('#'+id);
	tr = tb.getElementsByTagName('TR');
	ntr = tb.insertRow(-1);
	for(var j=0; j<tb.rows[0].cells.length; j++){
		ntd = ntr.insertCell(-1);
		ntd.innerHTML = tb.rows[1].cells[j].innerHTML;
		ntd.className = tb.rows[1].cells[j].className;
		
		if(j == 0){
			ntd.innerHTML = parseInt(tb.rows[tr.length-2].cells[j].innerHTML)+1;
		}
		if(j == tb.rows[0].cells.length-1){
			ntd.innerHTML = '<a href="javascript:void(0);" class="btn_delList" onClick="tbdelRow(this);">刪除</a>';	
		}
	}
	resizeHeight('page');
}
function tbdelRow(_this){
	var tb,tr,trs;
	tb = getParent(_this,'TABLE');
	tr = getParent(_this,'TR');
	trs = tb.getElementsByTagName('TR');
	//最少留三筆資料
	if(trs.length > 4){
		delRow(tb,tr.rowIndex);	
	}
}
function delRow(idx,num,n){
	//num = -1 刪除最後一個
	//num = all 刪除全部
	//num = 3 刪除rowIndex = 3;
	var tb = document.getElementById(idx) ? document.getElementById(idx):idx;
	if(num == '-1'){
		tb.deleteRow(-1);	
	}else if(num == 'content'){
		n = tb.rows.length-n;
		for(i=0; i<tb.rows.length; i++){
			tb.deleteRow(-1);
		}
	}else{
		tb.deleteRow(num)	
	}	
}
/*		FAA01001> addTableRow() 新增人員
------------------------------------ */
function addRole(_this){
	var tb,tr,td,ntr,ntd;
	var data = [];
	var className = [];
	
	tb = getParent(_this,'TABLE');
	tr = getParent(_this,'TR');
	td = getParent(_this,'TD');
	for(var i=0; i<4; i++){
		data.push('<input type="text" class="txt1" size="18">');
		className.push('ct');
	}
	
	//jq.table.addRow(tb,data,className);
	//td.rowSpan-1
	ntr = tb.insertRow(td.rowSpan+tr.rowIndex);
	for(var i=0; i<tb.rows[tr.rowIndex + td.rowSpan -1].cells.length; i++){
		ntd = ntr.insertCell(-1);
		ntd.innerHTML = data[i];
		ntd.className = className[i];
	}
	td.rowSpan += 1;
	getPrevious(td).rowSpan +=1;
	//resizeHeight(true);
}

/*		下拉選單功能, 選到才show		
------------------------------------ */
function seletShow(hideBox,selectValue){
	//全部隱藏
	each(getChildren(gets(hideBox)),function(e,i){
		addClass(e,'hide');
	});
	if(selectValue == 'hideAll') {
		return;	
	}else{
		removeClass(gets(selectValue),'hide');	
	}
}
 /* selectTo
------------------------------------ */
function selectTo(e){
	obj = document.getElementById(e) ? document.getElementById(e):e;
	if(obj.options[obj.selectedIndex].value != '#'){
		//alert(obj.options[obj.selectedIndex].value)
		//linkto('http://www.yahoo.com.tw')
		window.location.href = obj.options[obj.selectedIndex].value;
	}
}
Array.prototype.shuffle = function() {  
    var ar = [];  
    while (this.length) ar.push(this.splice(Math.random() * this.length, 1));  
    while (ar.length) this.push(ar.pop());  
    return this;  
}
/*******************************************
	共用 隱藏欄位
	setDisabled2 
********************************************/

function check_enable(obj,name){
	comp1 = document.getElementsByName(name);
	for(i=0; i<comp1.length; i++){
		obj.checked ? comp1[i].disabled = false:comp1[i].disabled = true;
	}	
}
function checkSwitch(name,value){
	var c = document.getElementsByName(name);
	for(i=0; i<c.length; i++){c[i].disabled = value;}	
}

function setDisabled2(value,ar){
	for(var j=0; j<ar.length; j++){
		if(value){
			gid(ar[j]).className = 'disabled';
			input = gid(ar[j]).getElementsByTagName('INPUT');
			for(var i=0; i<input.length; i++){input[i].disabled = value;}			
		}else{
			gid(ar[j]).className = '';
			input = gid(ar[j]).getElementsByTagName('INPUT');
			for(var i=0; i<input.length; i++){input[i].disabled = value;}
		}
		
		if(gid(ar[j]).getElementsByTagName('textarea')[0]){gid(ar[j]).getElementsByTagName('textarea')[0].disabled = value;}
		
	}	
}
function disableTag(tagName,value,ar){
	for(var i=0; i<ar.length; i++){
		obj = document.getElementById(ar[i]);
		input = obj.getElementsByTagName(tagName);
		for(var j=0; j<input.length; j++){input[j].disabled = value;}
		if(value){obj.className = 'disabled';}else{obj.className = '';}
	}
}
