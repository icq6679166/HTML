//  written by Tan Ling Wee on 2 Dec 2001
//  last updated 20 June 2003
//  email : fuushikaden@yahoo.com
//
// Modified to use the MyFaces lib resources
// Modefied to jc:DatePicker 


var jscalendarWidth = 230     // calendar假設寬度
var jscalendarHeight = 180    // calendar假設高度

var jscalendarFixedX = -1     // x position (-1 if to appear below control)
var jscalendarFixedY = -1     // y position (-1 if to appear below control)
var jscalendarStartAt = 0     // 0 - sunday ; 1 - monday
var jscalendarShowWeekNumber = 0  // 0 - don't show; 1 - show
var jscalendarShowToday = 0   // 0 - don't show; 1 - show
var jscalendarChineseYear = 0  // 0 - 西元年; 1 - 民國年
var jscalendarImgDir = "jscalendar/jscalendar-DB/"      // directory for images ... e.g. var jscalendarImgDir="/img/"
var jscalendarThemePrefix = "jscalendar-DB"
var jscalendarRelatedFieldID = "";  // 連動關聯欄位的ID
var jscalendarRelatedRange = 0;     // 連動關聯的間距
var jscalendarRelatedRangeUnit = "M";  // 連動關聯間距的單位 (Y:年, M:月, D:日)

var jscalendarYearPrefix = "民國"
var jscalendarYearSuffix = "年&#160;"
var jscalendarMonthSuffix = "月"
var jscalendarGotoString = "Go To Current Month"
var jscalendarTodayString = "Today is"
var jscalendarWeekString = "Wk"
var jscalendarScrollLeftMessage = "" //"Click to scroll to previous month. Hold mouse button to scroll automatically."
var jscalendarScrollRightMessage = "" //"Click to scroll to next month. Hold mouse button to scroll automatically."
var jscalendarSelectMonthMessage = "" //"Click to select a month."
var jscalendarSelectYearMessage = "" // "Click to select a year."
var jscalendarSelectDateMessage = "" //"Select [date] as date." // do not replace [date], it will be replaced by date.

var jscalendarCrossobj, jscalendarCrossMonthObj, jscalendarCrossYearObj,
    jscalendarMonthSelected, jscalendarYearSelected, jscalendarDateSelected,
    jscalendarOmonthSelected, jscalendarOyearSelected, jscalendarOdateSelected,
    jscalendarMonthConstructed, jscalendarYearConstructed, jscalendarIntervalID1, jscalendarIntervalID2,
    jscalendarTimeoutID1, jscalendarTimeoutID2, jscalendarCtlToPlaceValue, jscalendarCtlNow, jscalendarDateFormat, jscalendarNStartingYear, jscalendarNStartingMonth

var jscalendarBPageLoaded=false
var jscalendarIe;
var jscalendarDom;

var jscalendarNs4;
var jscalendarToday = new Date()
var jscalendarDateNow  = jscalendarToday.getDate()
var jscalendarMonthNow = jscalendarToday.getMonth()
var jscalendarYearNow  = jscalendarToday.getYear()
var jscalendarImgsrc = new Array("drop1.gif","drop2.gif","left1.gif","left2.gif","right1.gif","right2.gif")
var jscalendarImg = new Array()

var jscalendarBShow = false;

var jscalendarMyFacesCtlType = "x:inputCalendar";
var jscalendarMyFacesInputDateClientId;

/*
 * 設定圖檔路徑  
 */
function jscalendarSetImageDirectory(dir){ // For MyFaces only
  jscalendarImgDir = dir;
  jscalendarSwapImage("changeLeft","left1.gif");
  jscalendarSwapImage("changeRight","right1.gif");
}

/*
 * 設定 "年" 前置描述  eg: 民國
 */
function jscalendarSetYearPrefix(str) {
    jscalendarYearPrefix = str;
}

/*
 * 設定 "年" 的結尾描述 eg: 年
 */
function jscalendarSetYearSuffix(str) {
    jscalendarYearSuffix = str;
}

/*
 * 設定 "月" 的結尾描述 eg: 月
 */
function jscalendarSetMonthSuffix(str) {
    jscalendarMonthSuffix = str;
}

/* hides <select> and <applet> objects (for IE only) */
function jscalendarHideElement( elmID, overDiv ){
  if( jscalendarIe ){
    for( i = 0; i < document.all.tags( elmID ).length; i++ ){
      obj = document.all.tags( elmID )[i];
      if( !obj || !obj.offsetParent )
        continue;
  
      // Find the element's offsetTop and offsetLeft relative to the BODY tag.
      objLeft   = obj.offsetLeft;
      objTop    = obj.offsetTop;
      objParent = obj.offsetParent;
      
      while( objParent.tagName.toUpperCase() != "HTML" && objParent.tagName.toUpperCase()!="BODY"){
        objLeft  += objParent.offsetLeft;
        objTop   += objParent.offsetTop;
        objParent = objParent.offsetParent;
      }
  
      objHeight = obj.offsetHeight;
      objWidth = obj.offsetWidth;
  
      if(( overDiv.offsetLeft + overDiv.offsetWidth ) <= objLeft );
      else if(( overDiv.offsetTop + overDiv.offsetHeight ) <= objTop );
      else if( overDiv.offsetTop >= ( objTop + objHeight ));
      else if( overDiv.offsetLeft >= ( objLeft + objWidth ));
      else
        obj.style.visibility = "hidden";
    }
  }
}

/*
* unhides <select> and <applet> objects (for IE only)
*/
function jscalendarShowElement( elmID ){
  if( jscalendarIe ){
    for( i = 0; i < document.all.tags( elmID ).length; i++ ){
      obj = document.all.tags( elmID )[i];
      
      if( !obj || !obj.offsetParent )
        continue;
    
      obj.style.visibility = "";
    }
  }
}

function jscalendarHolidayRec (d, m, y, desc){
  this.d = d;
  this.m = m;
  this.y = y;
  this.desc = desc;
}

var jscalendarHolidaysCounter = 0;
var jscalendarHolidays = new Array();

function jscalendarAddHoliday (d, m, y, desc){
  jscalendarHolidays[jscalendarHolidaysCounter++] = new jscalendarHolidayRec ( d, m, y, desc );
}

//var jscalendarMonthName = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var jscalendarMonthName = new Array("一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月");
var jscalendarMonthName2 = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
//var jscalendarDayName2 = jscalendarStartAt==0 ? new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat") : new Array("Mon","Tue","Wed","Thu","Fri","Sat","Sun");
var jscalendarDayName = jscalendarStartAt==0 ? new Array("日","一","二","三","四","五","六") : new Array("一","二","三","四","五","六","日");

function jscalendarSwapImage(srcImg, destImg){
  if (jscalendarIe)
    document.getElementById(srcImg).setAttribute("src",jscalendarImgDir + destImg);
}

function jscalendarSetMonthName(monthNames) {
    jscalendarMonthName = monthNames;
}

function jscalendarSetDayName(dayNames) {
    jscalendarDayName = dayNames;
}

/*
 * 建構月曆(不含月份內容)
 */
function jscalendarInit(){
	jscalendarIe=document.all
	jscalendarDom=document.getElementById
	jscalendarNs4=document.layers

	if (jscalendarDom){
	  for (i=0;i<jscalendarImgsrc.length;i++){
	    jscalendarImg[i] = new Image;
	    jscalendarImg[i].src = jscalendarImgDir + jscalendarImgsrc[i];
	  }
	
	if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement){
		HTMLElement.prototype.insertAdjacentElement = function (where,parsedNode) {
			switch (where){
				case 'beforeBegin':
					this.parentNode.insertBefore(parsedNode,this)
					break;
				case 'afterBegin':
					this.insertBefore(parsedNode,this.firstChild);
					break;
				case 'beforeEnd':
					this.appendChild(parsedNode);
					break;
				case 'afterEnd':
					if (this.nextSibling)
						this.parentNode.insertBefore(parsedNode,this.nextSibling);
					else this.parentNode.appendChild(parsedNode);
						break;
			}
		}
	
		HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr)	{
			var r = this.ownerDocument.createRange();
			r.setStartBefore(this);
			var parsedHTML = r.createContextualFragment(htmlStr);
			this.insertAdjacentElement(where,parsedHTML)
		}
	
		HTMLElement.prototype.insertAdjacentText = function (where,txtStr) {
			var parsedText = document.createTextNode(txtStr)
			this.insertAdjacentElement(where,parsedText)
		}
	}


	  document.body.insertAdjacentHTML("afterBegin","<div onclick='jscalendarBShow=true' id='calendar'  class='"+jscalendarThemePrefix+"-div-style'><table  width="+((jscalendarShowWeekNumber==1)?250:220)+" class='"+jscalendarThemePrefix+"-table-style'><tr class='"+jscalendarThemePrefix+"-title-background-style'><td><table width='"+((jscalendarShowWeekNumber==1)?248:218)+"'><tr><td class='"+jscalendarThemePrefix+"-title-style'><span id='ibm-caption'></span></td><td align=right><a href='javascript:jscalendarHideCalendar()'><span id='jscalendarCloseButton'></span></a></td></tr></table></td></tr><tr><td class='"+jscalendarThemePrefix+"-body-style'><span id='ibm-content'></span></td></tr>")
	    
	  if (jscalendarShowToday==1)
	    document.body.insertAdjacentHTML("afterBegin","<tr class='"+jscalendarThemePrefix+"-today-style'><td class='"+jscalendarThemePrefix+"-today-lbl-style'><span id='lblToday'></span></td></tr>")
	    
	  document.body.insertAdjacentHTML("afterBegin","</table></div><div id='selectMonth' class='"+jscalendarThemePrefix+"-div-style'></div><div id='selectYear' class='"+jscalendarThemePrefix+"-div-style'></div>");
	}

  if (!jscalendarNs4){
    if (!jscalendarIe)
      jscalendarYearNow += 1900;

    jscalendarCrossobj=(jscalendarDom) ? document.getElementById("calendar").style : jscalendarIe ? document.all.calendar : document.calendar;
    jscalendarHideCalendar();

    jscalendarCrossMonthObj=(jscalendarDom) ? document.getElementById("selectMonth").style : jscalendarIe ? document.all.selectMonth : document.selectMonth;

    jscalendarCrossYearObj=(jscalendarDom) ? document.getElementById("selectYear").style : jscalendarIe ? document.all.jscalendarSelectYear : document.jscalendarSelectYear;

    jscalendarMonthConstructed=false;
    jscalendarYearConstructed=false;

    if (jscalendarShowToday==1)
      document.getElementById("lblToday").innerHTML = jscalendarTodayString + " <a onmousemove='window.status=\""+jscalendarGotoString+"\"' onmouseout='window.status=\"\"' title='"+jscalendarGotoString+"' class='"+jscalendarThemePrefix+"-today-style' href='javascript:jscalendarMonthSelected=jscalendarMonthNow;jscalendarYearSelected=jscalendarYearNow;jscalendarConstructCalendar();'>"+jscalendarDayName[(jscalendarToday.getDay()-jscalendarStartAt==-1)?6:(jscalendarToday.getDay()-jscalendarStartAt)]+", " + jscalendarDateNow + " " + jscalendarMonthName[jscalendarMonthNow].substring(0,3)  + " " + jscalendarYearNow + "</a>";
    
    // construct Header
    var sHTML1 ="<span id='spanLeft'  class='"+jscalendarThemePrefix+"-title-control-normal-style' onmouseover='jscalendarSwapImage(\"changeLeft\",\"left2.gif\");  this.className=\""+jscalendarThemePrefix+"-title-control-select-style\"; window.status=\""+jscalendarScrollLeftMessage+"\"' onclick='javascript:jscalendarDecMonth()' onmouseout='clearInterval(jscalendarIntervalID1);jscalendarSwapImage(\"changeLeft\",\"left1.gif\"); this.className=\""+jscalendarThemePrefix+"-title-control-normal-style\"; window.status=\"\"' onmousedown='clearTimeout(jscalendarTimeoutID1);jscalendarTimeoutID1=setTimeout(\"jscalendarStartDecMonth()\",500)'  onmouseup='clearTimeout(jscalendarTimeoutID1);clearInterval(jscalendarIntervalID1)'>&nbsp<IMG id='changeLeft' SRC='"+jscalendarImgDir+"left1.gif' width=10 height=11 BORDER=0>&nbsp</span>&#160;";
    sHTML1+="<span id='spanRight' class='"+jscalendarThemePrefix+"-title-control-normal-style' onmouseover='jscalendarSwapImage(\"changeRight\",\"right2.gif\");this.className=\""+jscalendarThemePrefix+"-title-control-select-style\"; window.status=\""+jscalendarScrollRightMessage+"\"' onmouseout='clearInterval(jscalendarIntervalID1);jscalendarSwapImage(\"changeRight\",\"right1.gif\"); this.className=\""+jscalendarThemePrefix+"-title-control-normal-style\"; window.status=\"\"' onclick='jscalendarIncMonth()' onmousedown='clearTimeout(jscalendarTimeoutID1);jscalendarTimeoutID1=setTimeout(\"jscalendarStartIncMonth()\",500)'  onmouseup='clearTimeout(jscalendarTimeoutID1);clearInterval(jscalendarIntervalID1)'>&nbsp<IMG id='changeRight' SRC='"+jscalendarImgDir+"right1.gif' width=10 height=11 BORDER=0>&nbsp</span>&nbsp";
    sHTML1+="<span id='spanChineseYearPrefix'></span>";
    sHTML1+="<span id='spanYear'  class='"+jscalendarThemePrefix+"-title-control-normal-style' onmouseover='jscalendarSwapImage(\"changeYear\",\"drop2.gif\");  this.className=\""+jscalendarThemePrefix+"-title-control-select-style\"; window.status=\""+jscalendarSelectYearMessage+"\"' onmouseout='jscalendarSwapImage(\"changeYear\",\"drop1.gif\"); this.className=\""+jscalendarThemePrefix+"-title-control-normal-style\"; window.status=\"\"' onclick='jscalendarPopUpYear()'></span>&#160;";
    sHTML1+="<span id='spanChineseYearSuffix'></span>";
        
    sHTML1+="<span id='spanMonth' class='"+jscalendarThemePrefix+"-title-control-normal-style' onmouseover='jscalendarSwapImage(\"changeMonth\",\"drop2.gif\"); this.className=\""+jscalendarThemePrefix+"-title-control-select-style\"; window.status=\""+jscalendarSelectMonthMessage+"\"' onmouseout='jscalendarSwapImage(\"changeMonth\",\"drop1.gif\"); this.className=\""+jscalendarThemePrefix+"-title-control-normal-style\"; window.status=\"\"' onclick='jscalendarPopUpMonth()'></span>&#160;";
    sHTML1+="<span id='spanChineseMonthSuffix' style='display:none;'></span>";
    //(民國)id='spanChineseMonthSuffix' 會造成多一個 "月", 所以增加display:none;
    document.getElementById("ibm-caption").innerHTML = sHTML1;

    jscalendarBPageLoaded = true;
  }

	/*  
	document.onkeypress = function jscalendarHidecal1 () {
		if (event != null && event.keyCode==27) 
		jscalendarHideCalendar();
	}
	*/
	document.onclick = function jscalendarHidecal2 () {
		if (!jscalendarBShow)
			jscalendarHideCalendar();
		jscalendarBShow = false;
	}
}

function jscalendarHideCalendar(){
	if (jscalendarCrossobj == null) 
	jscalendarInit();
	jscalendarCrossobj.visibility="hidden"
	if (jscalendarCrossMonthObj != null){jscalendarCrossMonthObj.visibility="hidden"}
	if (jscalendarCrossYearObj != null){jscalendarCrossYearObj.visibility="hidden"}
	jscalendarShowElement( 'SELECT' );
	jscalendarShowElement( 'APPLET' );
}

/*
 * 若傳入的數小於 10, 則補 '0'
 */
function jscalendarPadZero(num){
	return (num < 10)? '0' + num : num ;
}

/*
 * 若傳入的數小於 100, 則補 '0'
 */
function jscalendarPadYearZero(num){
	return (num < 100)? '0' + num : num ;
}

/*
 * 若傳入的數小於 1000, 則補 '0'
 */
function jscalendarPadYearZero2(num){
	var tmp = (num  < 100)? '0' + num : num ;
	return (num < 1000)? '0' + tmp : tmp ;
}

function jscalendarConstructDate(d,m,y){
  var sTmp = jscalendarDateFormat
  sTmp = sTmp.replace ("dd","<e>")
  sTmp = sTmp.replace ("d","<d>")
  sTmp = sTmp.replace ("<e>",jscalendarPadZero(d))
  sTmp = sTmp.replace ("<d>",d)
  sTmp = sTmp.replace ("mmmm","<p>")
  sTmp = sTmp.replace ("MMMM","<p>")
  sTmp = sTmp.replace ("mmm","<o>")
  sTmp = sTmp.replace ("MMM","<o>")
  sTmp = sTmp.replace ("mm","<n>")
  sTmp = sTmp.replace ("MM","<n>")
  sTmp = sTmp.replace ("m","<m>")
  sTmp = sTmp.replace ("M","<m>")
  sTmp = sTmp.replace ("<m>",m+1)
  sTmp = sTmp.replace ("<n>",jscalendarPadZero(m+1))
  sTmp = sTmp.replace ("<o>",jscalendarMonthName[m])
  sTmp = sTmp.replace ("<p>",jscalendarMonthName2[m])
  
  // 民國年 or 西元年
  if( jscalendarChineseYear == 1 ) {
    var chineseYear = y - 1911;
    //sTmp = sTmp.replace ("yyyy",jscalendarPadYearZero2(chineseYear%10000));
    //sTmp = sTmp.replace ("yyy",jscalendarPadYearZero(chineseYear%1000));
    //return sTmp.replace ("yy",jscalendarPadZero(chineseYear%100));    
    sTmp = sTmp.replace ("yyyy",jscalendarPadYearZero2(chineseYear));
    sTmp = sTmp.replace ("yyy",jscalendarPadYearZero(chineseYear));
    return sTmp.replace ("yy",jscalendarPadZero(chineseYear));
  } 
  else {
    //sTmp = sTmp.replace ("yyyy",jscalendarPadYearZero2(y%10000));
    //sTmp = sTmp.replace ("yyy",jscalendarPadYearZero(y%1000));
    //return sTmp.replace ("yy",jscalendarPadZero(y%100));
    sTmp = sTmp.replace ("yyyy",jscalendarPadYearZero2(y));
    sTmp = sTmp.replace ("yyy",jscalendarPadYearZero(y));
    return sTmp.replace ("yy",jscalendarPadZero(y));
  } 
}

/**
 * 關閉彈出月曆(並將選取的值填入輸入欄位)
 */
function jscalendarCloseCalendar() {
  jscalendarHideCalendar();
  
  if( jscalendarMyFacesCtlType!="x:inputDate" ) {
    // 若 input text disabled, 則不將選取到的日期加入
    if( !jscalendarCtlToPlaceValue.disabled ) {
      jscalendarCtlToPlaceValue.value = jscalendarConstructDate(jscalendarDateSelected,jscalendarMonthSelected,jscalendarYearSelected);
      jscalendarCtlToPlaceValue.focus();
      jscalendarCtlToPlaceValue.blur();
      if( !isWhiteSpace(jscalendarRelatedFieldID) ) {
        var relatedField = document.getElementById(jscalendarRelatedFieldID);
        if( relatedField ) {
          relatedField.value = jscalendarGetRelatedValue(jscalendarDateSelected,jscalendarMonthSelected,jscalendarYearSelected);
        }
      }
    } 
  }
  else{
    document.getElementById(jscalendarMyFacesInputDateClientId+".day").value = jscalendarDateSelected;
    document.getElementById(jscalendarMyFacesInputDateClientId+".month").value = jscalendarMonthSelected+1;
    document.getElementById(jscalendarMyFacesInputDateClientId+".year").value = jscalendarYearSelected;
  }
}

/**
 * 將指定的關連值放入連動欄位
 * d: 日, 1 = 1日
 * m: 月, 1 = 1月
 * y: 年, 西元年
 */
function jscalendarInitRelatedField(d, m, y) {

  var relatedField = document.getElementById(jscalendarRelatedFieldID);
  
  var iMonth = m -1;
  
  if( relatedField ) {
    relatedField.value = jscalendarGetRelatedValue(d, iMonth, y);
  }
}

/**
 * 取得連動欄位要給予的值
 * d: 日, 1 = 1日
 * m: 月, 0 = 1月
 * y: 年, 西元年
 */
function jscalendarGetRelatedValue(d, m, y) {
  
  var lOneDayMilliSecond = 24*60*60*1000;
  
  if( "Y" == jscalendarRelatedRangeUnit ) {
    y += jscalendarRelatedRange;
    d--;
  }
  else if( "D" == jscalendarRelatedRangeUnit ) {  
    d += jscalendarRelatedRange;  
    d--;  
    // 若為負值，setDate(0) 是 -1 天，將  +1
    if( d < 0 ) {   
      d++;
    }   
  }
  else {
    var iYearRange = 0;
    // Range 為正值 -> 1, Range 為負值 -> -1
    var iRangeSign = jscalendarRelatedRange >= 0 ? 1 : -1;
    // 扣除年的Range之後的月 Range
    var iMonthRange = jscalendarRelatedRange;
    // RangeUnit 為'月'時，且 Range >= 12 必須額外計算
    if( jscalendarRelatedRange >= 12 ) {    
      iYearRange = Math.floor(Math.abs(jscalendarRelatedRange) / 12);
      iYearRange *= iRangeSign;
      iMonthRange = jscalendarRelatedRange % 12;
    }
    
    if( m + iMonthRange > 11 ) {
      iMonthRange -= 12;
      iYearRange++;
    }
    
    if( m + iMonthRange < 0 ) {
      iMonthRange += 12;
      iYearRange--;
    }
    y += iYearRange;
    m += iMonthRange;
    d--;
  } 
  
  var processDate = new Date(y, m, d);
  return jscalendarConstructDate(processDate.getDate(), processDate.getMonth(), processDate.getFullYear()); 
}

/**
 * 是否為閏年
 */
function jscalendarIsLeapYear(iYear) {
  var theDate = new Date (iYear,2,1);
  theDate = new Date (theDate - (24*60*60*1000));
  return 29 == theDate.getDate();
}

/**
 * Month Pulldown 
 */
function jscalendarStartDecMonth(){
  jscalendarIntervalID1=setInterval("jscalendarDecMonth()",80);
}

function jscalendarStartIncMonth(){
  jscalendarIntervalID1=setInterval("jscalendarIncMonth()",80);
}

/*
 * 增加月(按下 '>' 圖示時)
 */
function jscalendarIncMonth(){
  jscalendarMonthSelected++;
  if (jscalendarMonthSelected>11) {
    jscalendarMonthSelected=0;
    jscalendarYearSelected++;
  }
  jscalendarConstructCalendar();
}

/*
 * 增加月(按下 '+' 時)
 */
function jscalendarIncSelMonth(){
    
  if( jscalendarNStartingMonth == 7 ) {
    return;
  }

  for (i=0; i<5; i++){
    sNewMonth = jscalendarMonthName[(i+jscalendarNStartingMonth)+1];
    
    if( ((i+jscalendarNStartingMonth)+1) == jscalendarMonthSelected ) { 
      txtJsMonth =  "<B>" + sNewMonth + "</B>"; 
    }
    else { 
      txtJsMonth =  "" + sNewMonth + ""; 
    }
    document.getElementById("m"+i).innerHTML = txtJsMonth;
  }
      
  if( jscalendarNStartingMonth < 11 ) {
    jscalendarNStartingMonth++;
  }
  //jscalendarBShow=true;
}

/*
 * 減少月(按下 '<' 圖示時)
 */
function jscalendarDecMonth () {
  jscalendarMonthSelected--
  if (jscalendarMonthSelected<0) {
    jscalendarMonthSelected=11
    jscalendarYearSelected--
  }
  jscalendarConstructCalendar()
}

/*
 * 減少月(按下 '-' 時)
 */
function jscalendarDecSelMonth () {
    
  if( jscalendarNStartingMonth == 0 ) {
    return;
  }
  
  for (i=0; i<5; i++){
    sNewMonth = jscalendarMonthName[(i+jscalendarNStartingMonth)-1];
    
    if( ((i+jscalendarNStartingMonth)-1) == jscalendarMonthSelected ) { 
      txtJsMonth =  "<B>" + sNewMonth + "</B>"; 
    }
    else { 
      txtJsMonth =  "" + sNewMonth + ""; 
    }
    document.getElementById("m"+i).innerHTML = txtJsMonth;
  }
    
  if( jscalendarNStartingMonth > 0 ) {
    jscalendarNStartingMonth--;
  }
  //jscalendarBShow=true;
}

/**
 * 取得起始月份
 */
function jscalendarGetStartingMonth() {
  var iStartingMonth = jscalendarMonthSelected-2;
  
  if( iStartingMonth < 0 ) {
    iStartingMonth = 0;
  }
  else if( iStartingMonth > 7 ) {
    iStartingMonth = 7;
  }
  
  return iStartingMonth;
}

function jscalendarSelectMonth(nMonth) {
  jscalendarMonthConstructed=false;
  jscalendarMonthSelected=parseInt(nMonth+jscalendarNStartingMonth);
  jscalendarConstructCalendar();
  jscalendarPopDownMonth();
}

function jscalendarConstructMonth(){
  jscalendarPopDownYear();
  if (!jscalendarMonthConstructed) {
  
    var sHTML = "<tr><td align='center' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='clearInterval(jscalendarIntervalID1); this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onmousedown='clearInterval(jscalendarIntervalID1);jscalendarIntervalID1=setInterval(\"jscalendarDecSelMonth()\",30)' onmouseup='clearInterval(jscalendarIntervalID1)' onclick='event.cancelBubble=true'>-</td></tr>";
    
    jscalendarNStartingMonth = jscalendarGetStartingMonth();
    for (i=0; i<5; i++) {
      
      var sName = jscalendarMonthName[jscalendarNStartingMonth+i];
      
      if( (jscalendarNStartingMonth+i) == jscalendarMonthSelected ) {
        sName = "<b>"+sName+"</b>";
      }

      sHTML += "<tr><td id='m"+i+"' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onclick='jscalendarSelectMonth("+i+");event.cancelBubble=true'>&#160;"+sName+"&#160;</td></tr>";     
    }
    
    sHTML += "<tr><td align='center' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='clearInterval(jscalendarIntervalID2); this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onmousedown='clearInterval(jscalendarIntervalID2);jscalendarIntervalID2=setInterval(\"jscalendarIncSelMonth()\",30)'  onmouseup='clearInterval(jscalendarIntervalID2)' onclick='event.cancelBubble=true'>+</td></tr>";

    document.getElementById("selectMonth").innerHTML = "<table width='44' class='"+jscalendarThemePrefix+"-dropdown-style'  cellspacing=0 onmouseover='clearTimeout(jscalendarTimeoutID1)'  onmouseout='clearTimeout(jscalendarTimeoutID1);jscalendarTimeoutID1=setTimeout(\"jscalendarPopDownMonth()\",100);event.cancelBubble=true'>" + sHTML + "</table>";

    jscalendarMonthConstructed=true;
  }
}
/*
function jscalendarConstructMonth(){
  jscalendarPopDownYear();
  if (!jscalendarMonthConstructed) {
    var sHTML = "";
    for (i=0; i<12; i++) {
      var sName = jscalendarMonthName[i];
      if (i==jscalendarMonthSelected)
        sName = "<b>" + sName + "</b>";
      sHTML += "<tr><td id='m" + i + "' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onclick='jscalendarMonthConstructed=false;jscalendarMonthSelected=" + i + ";jscalendarConstructCalendar();jscalendarPopDownMonth();event.cancelBubble=true'>&#160;" + sName + "&#160;</td></tr>";
    }

    document.getElementById("selectMonth").innerHTML = "<table width='70' class='"+jscalendarThemePrefix+"-dropdown-style'  cellspacing=0 onmouseover='clearTimeout(jscalendarTimeoutID1)'  onmouseout='clearTimeout(jscalendarTimeoutID1);jscalendarTimeoutID1=setTimeout(\"jscalendarPopDownMonth()\",100);event.cancelBubble=true'>" + sHTML + "</table>";

    jscalendarMonthConstructed=true;
  }
}
*/
function jscalendarPopUpMonth() {

  var leftOffset = parseInt(jscalendarCrossobj.left) + document.getElementById("spanMonth").offsetLeft;
  jscalendarConstructMonth();

  jscalendarCrossMonthObj.visibility = (jscalendarDom||jscalendarIe)? "visible" : "show";
  jscalendarCrossMonthObj.left = leftOffset + 5 + "px";
  jscalendarCrossMonthObj.top = parseInt(jscalendarCrossobj.top) + 26 + "px";
  jscalendarCrossMonthObj.zIndex = 999;
  
  jscalendarHideElement( 'SELECT', document.getElementById("selectMonth") );
  jscalendarHideElement( 'APPLET', document.getElementById("selectMonth") );
}

function jscalendarPopDownMonth() {
  clearInterval(jscalendarIntervalID1);
  clearTimeout(jscalendarTimeoutID1);
  clearInterval(jscalendarIntervalID2);
  clearTimeout(jscalendarTimeoutID2);
  jscalendarCrossMonthObj.visibility= "hidden"
}

/**
 * Year Pulldown 
 */
function jscalendarIncYear() {
  for (i=0; i<5; i++){
    newYear = (i+jscalendarNStartingYear)+1;
    // 轉換成民國年
    var yearToShow;
    if( jscalendarChineseYear == 1 ) {
      yearToShow = newYear - 1911;
    } else {
      yearToShow = newYear;
    }
    if (newYear==jscalendarYearSelected)
    { txtYear = "&#160;<B>" + yearToShow +  "</B>&#160;" }
    else
    { txtYear = "&#160;" + yearToShow + "&#160;" }
    document.getElementById("y"+i).innerHTML = txtYear
  }
  jscalendarNStartingYear++;
  jscalendarBShow=true;
}

function jscalendarDecYear() {
  for (i=0; i<5; i++){
    newYear = (i+jscalendarNStartingYear)-1;
    // 轉換成民國年
    var yearToShow;
    if( jscalendarChineseYear == 1 ) {
      yearToShow = newYear - 1911;
    } else {
      yearToShow = newYear;
    }
    if (newYear==jscalendarYearSelected)
    { txtYear = "&#160;<B>" + yearToShow +  "</B>&#160;" }
    else
    { txtYear = "&#160;" + yearToShow + "&#160;" }
    document.getElementById("y"+i).innerHTML = txtYear
  }
  jscalendarNStartingYear--;
  jscalendarBShow=true;
}

function jscalendarSelectYear(nYear) {
  jscalendarYearSelected=parseInt(nYear+jscalendarNStartingYear);
  jscalendarYearConstructed=false;
  jscalendarConstructCalendar();
  jscalendarPopDownYear();
}

function jscalendarConstructYear() {
  jscalendarPopDownMonth();
  var sHTML = "";
  if (!jscalendarYearConstructed) {

    sHTML = "<tr><td align='center' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='clearInterval(jscalendarIntervalID1); this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onmousedown='clearInterval(jscalendarIntervalID1);jscalendarIntervalID1=setInterval(\"jscalendarDecYear()\",30)' onmouseup='clearInterval(jscalendarIntervalID1)'>-</td></tr>";

    var j = 0;
    jscalendarNStartingYear = jscalendarYearSelected-2;
    for (i=jscalendarYearSelected-2; i<=(jscalendarYearSelected+2); i++) {
      // 轉換成民國年
      var sName;
      if( jscalendarChineseYear == 1 ) {
        sName = i - 1911;
      } else {
        sName = i;
      }
      
      if (i==jscalendarYearSelected)
        sName = "<b>"+sName+"</b>";

      sHTML += "<tr><td id='y"+j+"' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onclick='jscalendarSelectYear("+j+");event.cancelBubble=true'>&#160;"+sName+"&#160;</td></tr>";
      j++;
    }

    sHTML += "<tr><td align='center' onmouseover='this.className=\""+jscalendarThemePrefix+"-dropdown-select-style\"' onmouseout='clearInterval(jscalendarIntervalID2); this.className=\""+jscalendarThemePrefix+"-dropdown-normal-style\"' onmousedown='clearInterval(jscalendarIntervalID2);jscalendarIntervalID2=setInterval(\"jscalendarIncYear()\",30)'  onmouseup='clearInterval(jscalendarIntervalID2)'>+</td></tr>";

    document.getElementById("selectYear").innerHTML = "<table width='44' class='"+jscalendarThemePrefix+"-dropdown-style' onmouseover='clearTimeout(jscalendarTimeoutID2)' onmouseout='clearTimeout(jscalendarTimeoutID2);jscalendarTimeoutID2=setTimeout(\"jscalendarPopDownYear()\",100)' cellspacing='0'>"+sHTML+"</table>";

    jscalendarYearConstructed = true;
  }
}

function jscalendarPopDownYear() {
  clearInterval(jscalendarIntervalID1);
  clearTimeout(jscalendarTimeoutID1);
  clearInterval(jscalendarIntervalID2);
  clearTimeout(jscalendarTimeoutID2);
  jscalendarCrossYearObj.visibility= "hidden";
}

function jscalendarPopUpYear() {
  var leftOffset;

  jscalendarConstructYear();
  jscalendarCrossYearObj.visibility = (jscalendarDom||jscalendarIe) ? "visible" : "show";
  leftOffset = parseInt(jscalendarCrossobj.left) + document.getElementById("spanYear").offsetLeft;
  if (jscalendarIe)
    leftOffset += 6;
  jscalendarCrossYearObj.left = leftOffset + "px";
  jscalendarCrossYearObj.top = parseInt(jscalendarCrossobj.top) + 26 + "px";
  jscalendarCrossYearObj.zIndex = 999;
}

/*** calendar ***/
function jscalendarWeekNbr(n) {
  // Algorithm used:
  // From Klaus Tondering's Calendar document (The Authority/Guru)
  // hhtp://www.tondering.dk/claus/calendar.html
  // a = (14-month) / 12
  // y = year + 4800 - a
  // m = month + 12a - 3
  // J = day + (153m + 2) / 5 + 365y + y / 4 - y / 100 + y / 400 - 32045
  // d4 = (J + 31741 - (J mod 7)) mod 146097 mod 36524 mod 1461
  // L = d4 / 1460
  // d1 = ((d4 - L) mod 365) + L
  // WeekNumber = d1 / 7 + 1
  
  year = n.getFullYear();
  month = n.getMonth() + 1;
  if (jscalendarStartAt == 0)
    day = n.getDate() + 1;
  else
    day = n.getDate();

  a = Math.floor((14-month) / 12);
  y = year + 4800 - a;
  m = month + 12 * a - 3;
  b = Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400);
  J = day + Math.floor((153 * m + 2) / 5) + 365 * y + b - 32045;
  d4 = (((J + 31741 - (J % 7)) % 146097) % 36524) % 1461;
  L = Math.floor(d4 / 1460);
  d1 = ((d4 - L) % 365) + L;
  week = Math.floor(d1/7) + 1;

  return week;
}

/*
 * 建構月份內容
 */
function jscalendarConstructCalendar () {
  var aNumDays = Array (31,0,31,30,31,30,31,31,30,31,30,31);

  var dateMessage;
  var startDate = new Date (jscalendarYearSelected,jscalendarMonthSelected,1);
  var endDate;

    // 取得 2月的總天數(當年3月1日減1天，取"日")
  if (jscalendarMonthSelected==1){
    endDate = new Date (jscalendarYearSelected,jscalendarMonthSelected+1,1);
    endDate = new Date (endDate - (24*60*60*1000));
    numDaysInMonth = endDate.getDate();
  }else
    numDaysInMonth = aNumDays[jscalendarMonthSelected];


  datePointer = 0;
  dayPointer = startDate.getDay() - jscalendarStartAt;
  
  if (dayPointer<0)
    dayPointer = 6;

  var sHTML = "<table border=0 class='"+jscalendarThemePrefix+"-body-style'><tr>"

  if (jscalendarShowWeekNumber==1)
    sHTML += "<td width=27><b>" + jscalendarWeekString + "</b></td><td width=1 rowspan=7 class='"+jscalendarThemePrefix+"-weeknumber-div-style'><img src='"+jscalendarImgDir+"divider.gif' width=1></td>";

  for (i=0; i<7; i++)
    sHTML += "<td width='27' align='right'><B>"+ jscalendarDayName[i]+"</B></td>";

  sHTML +="</tr><tr>";

  if (jscalendarShowWeekNumber==1)
    sHTML += "<td align=right>" + jscalendarWeekNbr(startDate) + "&#160;</td>";

  for ( var i=1; i<=dayPointer;i++ )
    sHTML += "<td>&#160;</td>";

  for ( datePointer=1; datePointer<=numDaysInMonth; datePointer++ ){
    dayPointer++;
    sHTML += "<td align=right>";

    var sStyle=jscalendarThemePrefix+"-normal-day-style"; //regular day

    if ((datePointer==jscalendarDateNow)&&(jscalendarMonthSelected==jscalendarMonthNow)&&(jscalendarYearSelected==jscalendarYearNow)) //today
    { sStyle = jscalendarThemePrefix+"-current-day-style"; }
    else if (dayPointer % 7 == (jscalendarStartAt * -1) +1) //sunday
    { sStyle = jscalendarThemePrefix+"-end-of-weekday-style"; }
    else if (dayPointer % 7 == (jscalendarStartAt * 6)) //saturday
    { sStyle = jscalendarThemePrefix+"-end-of-weekday-style"; }

    //selected day
    if ((datePointer==jscalendarOdateSelected) && (jscalendarMonthSelected==jscalendarOmonthSelected) && (jscalendarYearSelected==jscalendarOyearSelected))
    { sStyle += " "+jscalendarThemePrefix+"-selected-day-style"; }

    sHint = ""
    for (k=0;k<jscalendarHolidaysCounter;k++)
    {
      if ((parseInt(jscalendarHolidays[k].d)==datePointer)&&(parseInt(jscalendarHolidays[k].m)==(jscalendarMonthSelected+1)))
      {
        if ((parseInt(jscalendarHolidays[k].y)==0)||((parseInt(jscalendarHolidays[k].y)==jscalendarYearSelected)&&(parseInt(jscalendarHolidays[k].y)!=0)))
        {
          sStyle += " "+jscalendarThemePrefix+"-holiday-style";
          sHint+=sHint==""?jscalendarHolidays[k].desc:"\n"+jscalendarHolidays[k].desc
        }
      }
    }

    var regexp= /\"/g
    sHint=sHint.replace(regexp,"&quot;");

    sSelectStyle = sStyle+" "+jscalendarThemePrefix+"-would-be-selected-day-style";
    sNormalStyle = sStyle;

    dateMessage = "onmousemove='window.status=\""+jscalendarSelectDateMessage.replace("[date]",jscalendarConstructDate(datePointer,jscalendarMonthSelected,jscalendarYearSelected))+"\"' onmouseout='this.className=\""+sNormalStyle+"\"; window.status=\"\"' "

    sHTML += "<a class='"+sStyle+"' "+dateMessage+" title=\"" + sHint + "\" href='javascript:jscalendarDateSelected="+datePointer+";jscalendarCloseCalendar();' onmouseover='this.className=\""+sSelectStyle+"\";' >&#160;" + datePointer + "&#160;</a>";

    if ((dayPointer+jscalendarStartAt) % 7 == jscalendarStartAt) {
      sHTML += "</tr><tr>";
      if ((jscalendarShowWeekNumber==1)&&(datePointer<numDaysInMonth))
        sHTML += "<td align=right>" + (jscalendarWeekNbr(new Date(jscalendarYearSelected,jscalendarMonthSelected,datePointer+1))) + "&#160;</td>";
    }
  }

  document.getElementById("ibm-content").innerHTML = sHTML;
  // add month to dispaly
  document.getElementById("spanMonth").innerHTML = "&#160;" + jscalendarMonthName[jscalendarMonthSelected] + "&#160;<IMG id='changeMonth' SRC='"+jscalendarImgDir+"drop1.gif' WIDTH='12' HEIGHT='10' BORDER=0>";
  // add year to display
  //document.getElementById("spanYear").innerHTML = "&#160;" + jscalendarYearSelected + "&#160;<IMG id='changeYear' SRC='"+jscalendarImgDir+"drop1.gif' WIDTH='12' HEIGHT='10' BORDER=0>";
  var yearToShow;
  if( jscalendarChineseYear == 1 ) {
    yearToShow = jscalendarYearSelected - 1911;
  } else {
    yearToShow = jscalendarYearSelected;
  }
  document.getElementById("spanYear").innerHTML = "&#160;" + yearToShow + "&#160;<IMG id='changeYear' SRC='"+jscalendarImgDir+"drop1.gif' WIDTH='12' HEIGHT='10' BORDER=0>";
  document.getElementById("jscalendarCloseButton").innerHTML = "<img src='"+jscalendarImgDir+"close.gif' width='15' height='13' border='0' alt='Close the Calendar'>";
}

/*
 * 初始化連動關聯的設定值
 */
function jscalendarInitRelated(sFieldID, iRange, sRangeUnit, sPattern) {
  
  // 連動關聯欄位的ID
  jscalendarRelatedFieldID = sFieldID;  
  // 連動關聯的間距
  jscalendarRelatedRange = iRange;    
  // 連動關聯間距的單位(Y:年, M:月, D:日)
  jscalendarRelatedRangeUnit = sRangeUnit;
  // 日期格式
  jscalendarDateFormat = sPattern;  
}

/*
 * 彈出月曆表單(datepicker專用)
 */
function datePickerPopUpCalendar(ctl, ctl2, format, yearType, sFieldID, iRange, sRangeUnit) {
  if (document.getElementById("spanChineseYearPrefix") == null ||  document.getElementById("spanChineseYearPrefix") == "undefined") {
	jscalendarInit();
  }
  

  // 判斷為民國年還是西元年的顯示方式 1: 民國, 0: 西元
  jscalendarChineseYear = eval(yearType);
  
jscalendarInitRelated(sFieldID, iRange, sRangeUnit, format);
	if( jscalendarChineseYear == 1 ) {//民國年
		document.getElementById("spanChineseYearPrefix").innerHTML = jscalendarYearPrefix;
		document.getElementById("spanChineseYearSuffix").innerHTML = jscalendarYearSuffix;
		document.getElementById("spanChineseMonthSuffix").innerHTML = jscalendarMonthSuffix;
	} 
	else {//西元年
		document.getElementById("spanChineseYearPrefix").innerHTML = "";
		document.getElementById("spanChineseYearSuffix").innerHTML = "";
		document.getElementById("spanChineseMonthSuffix").innerHTML = "";   
	}
		jscalendarPopUpCalendar(ctl, ctl2, format);
	}

/*
 * 彈出月曆表單(datepicker 使用 datePickerPopUpCalendar 再 call 此 function )
 */
function jscalendarPopUpCalendar(ctl, ctl2, format){
  if (jscalendarBPageLoaded){
    if ( jscalendarCrossobj.visibility == "hidden" ) {
      jscalendarCtlToPlaceValue = ctl2;
      jscalendarDateFormat=format;

      var formatChar = " "; 
      aFormat = jscalendarDateFormat.split(formatChar); 
      if(aFormat.length<3){ 
        formatChar = "/"; 
        aFormat =jscalendarDateFormat.split(formatChar); 
        if (aFormat.length<3){ 
          formatChar= "."; 
          aFormat = jscalendarDateFormat.split(formatChar); 
          if (aFormat.length<3){ 
            formatChar = "-";
            aFormat = jscalendarDateFormat.split(formatChar); 
            if (aFormat.length<3){ // invalid date format 
              formatChar = ""; 
            } 
          } 
        } 
      } 
      var tokensChanged = 0; 
      if( formatChar == "" ){ // add by Kevin Lee //不包含間隔字元 
        if((format.length==7 || format.length==8) && format.length == ctl2.value.length){
          var year=""; 
          var month="";
          var day=""; 
          for(i=0;i<format.length;i++){ 
            var aformatChar=format.substring(i,i+1);
            if(aformatChar == "Y" || aformatChar == "y"){ 
              year=year+ctl2.value.substring(i,i+1); 
            }else if(aformatChar == "M" || aformatChar == "m"){ 
              month=month+ctl2.value.substring(i,i+1); 
            }else if(aformatChar == "D" || aformatChar == "d"){ 
              day=day+ctl2.value.substring(i,i+1); 
            }
          }
          jscalendarDateSelected = parseInt(day);
          jscalendarMonthSelected = parseInt(month) - 1;
          if( jscalendarChineseYear = 1 ) {
            jscalendarYearSelected = parseInt(year) + 1911; 
          }else { 
            jscalendarYearSelected = parseInt(year); 
          }
          tokensChanged=3;
        }
      }else if ( formatChar != "" ){        // use user's date 
        aData =  ctl2.value.split(formatChar);
        for (i=0;i<3;i++){
          if( isNaN(aData[i]) ) {
            break;
          }
          aData[i] = eval(aData[i]);
          if ((aFormat[i]=="d") || (aFormat[i]=="dd")){
            jscalendarDateSelected = parseInt(aData[i]);
            tokensChanged++;
          }
          else if ((aFormat[i]=="m") || (aFormat[i]=="mm") || (aFormat[i]=="M") || (aFormat[i]=="MM")){
            jscalendarMonthSelected = parseInt(aData[i]) - 1;
            tokensChanged++;
          }
          else if (aFormat[i]=="yyyy"){
          
            if( jscalendarChineseYear == 1 ) {
              jscalendarYearSelected = parseInt(aData[i]) + 1911;
            } 
            else {
              jscalendarYearSelected = parseInt(aData[i]);
            }
            tokensChanged++;
            
          }
          else if (aFormat[i]=="yyy"){
          
            if( jscalendarChineseYear == 1 ) {
              jscalendarYearSelected = parseInt(aData[i]) + 1911;
            } 
            else {
              jscalendarYearSelected = parseInt(aData[i]);
            }
            tokensChanged++;
                        
          }
          else if (aFormat[i]=="yy"){
          
            if( jscalendarChineseYear == 1 ) {            
              jscalendarYearSelected = parseInt(aData[i]) + 1911;             
            } 
            else {  
              //newYear = parseInt(aData[i]);
              //if(newYear>50) {
              //  jscalendarYearSelected = 1900+newYear;
              //}
              //else {
              //  jscalendarYearSelected = 2000+newYear;
              //}
              jscalendarYearSelected = parseInt(aData[i]);
            }
            tokensChanged++;              
          }
          else if (aFormat[i]=="mmm" || aFormat[i]=="MMM"){
            for (j=0; j<12; j++){
              if (aData[i]==jscalendarMonthName[j]){
                jscalendarMonthSelected=j;
                tokensChanged++;
              }
            }
          }else if (aFormat[i]=="mmmm" || aFormat[i]=="MMMM"){
            for (j=0; j<12; j++){
              if (aData[i]==jscalendarMonthName2[j]){
                jscalendarMonthSelected=j;
                tokensChanged++;
              }
            }
          }
        }
      }
      
      if ((tokensChanged!=3) || isNaN(jscalendarDateSelected) || !isMonthValid(jscalendarMonthSelected) || isNaN(jscalendarYearSelected)){
        jscalendarDateSelected = jscalendarDateNow;
        jscalendarMonthSelected = jscalendarMonthNow;
        jscalendarYearSelected = jscalendarYearNow;
      }
      
      jscalendarPopUpCalendar_Show(ctl);
    }else{
      jscalendarHideCalendar();
      if (jscalendarCtlNow!=ctl)
        jscalendarPopUpCalendar(ctl, ctl2, format);
    }
    jscalendarCtlNow = ctl;
  }
}

function isMonthValid(sMonth) {
  
  if( isNaN(sMonth) ) {
    return false;
  } else {
    if( parseInt(sMonth) >= 0 && parseInt(sMonth) < 12 ) {
      return true;
    } else {
      return false;
    }
  }
}

function jscalendarPopUpCalendarForInputDate(clientId, format){
  if (jscalendarBPageLoaded){
    jscalendarMyFacesCtlType = "x:inputDate";
    jscalendarMyFacesInputDateClientId = clientId;
    jscalendarDateFormat=format;
    
    jscalendarDateSelected = parseInt( document.getElementById(clientId+".day").value );
    jscalendarMonthSelected = parseInt( document.getElementById(clientId+".month").value )-1;
    jscalendarYearSelected = parseInt( document.getElementById(clientId+".year").value );
    jscalendarCtlNow = document.getElementById(clientId+".day");
    jscalendarPopUpCalendar_Show(document.getElementById(clientId+".day"));
  }
}

function jscalendarPopUpCalendar_Show(ctl){
  jscalendarOdateSelected = jscalendarDateSelected;
  jscalendarOmonthSelected = jscalendarMonthSelected;
  jscalendarOyearSelected = jscalendarYearSelected;

  var leftpos = 0;
  var toppos = 0;
  
  var aTag = ctl;
  do {
    aTag = aTag.offsetParent;
    leftpos += aTag.offsetLeft;
    toppos += aTag.offsetTop;
  } while(aTag.tagName.toUpperCase()!="HTML" && aTag.tagName.toUpperCase()!="BODY");
  //Kevin - change show position 
  var show_x1 = jscalendarFixedX==-1 ? ctl.offsetLeft + leftpos : jscalendarFixedX;
  var show_x2 = jscalendarFixedX==-1 ? show_x1 + ctl.offsetWidth - jscalendarWidth : jscalendarFixedX;
  var pageWidth =(document.documentElement.scrollWidth ?  document.documentElement.scrollWidth : document.body.scrollWidth);
  //jscalendarCrossobj.left = jscalendarFixedX==-1 ? ctl.offsetLeft + leftpos + "px": jscalendarFixedX;
  jscalendarCrossobj.left = ((show_x1 + jscalendarWidth)>pageWidth ? show_x2 : show_x1)+  "px";
  
  var show_y1 = jscalendarFixedY==-1 ? ctl.offsetTop + toppos + ctl.offsetHeight + 2 : jscalendarFixedY;
  var show_y2 = jscalendarFixedY==-1 ? show_y1 - ctl.offsetHeight - 5 - jscalendarHeight : jscalendarFixedY;
  var pageHeight =(document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight);
  //jscalendarCrossobj.top = jscalendarFixedY==-1 ? ctl.offsetTop + toppos + ctl.offsetHeight + 2 + "px": jscalendarFixedY;
  jscalendarCrossobj.top = ((show_y1 + jscalendarHeight)>pageHeight ? show_y2 : show_y1)+  "px";
  
  jscalendarConstructCalendar (1, jscalendarMonthSelected, jscalendarYearSelected);
  jscalendarCrossobj.visibility=(jscalendarDom||jscalendarIe)? "visible" : "show";

  jscalendarHideElement( 'SELECT', document.getElementById("calendar") );
  jscalendarHideElement( 'APPLET', document.getElementById("calendar") );

  jscalendarBShow = true;
}

function isWhiteSpace(sValue) {
  return sValue == null ? true : sValue.replace(/\s/g, '') == '';
}
