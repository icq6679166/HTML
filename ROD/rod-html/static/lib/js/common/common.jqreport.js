    var configClosed = "ui-icon-circle-triangle-e";
    var configOpened = "ui-icon-circle-triangle-s";
    var columnPlus = "ui-icon-plusthick";
    var columnMinus = "ui-icon-minusthick";
    var moveImageClass = "ui-icon-arrow-4-diag";

    var selected = $([]), offset = {top:0, left:0};

    //// Retrieve the object from storage (HTML 5)
    // var fields;
    // try {
    //     fields = localStorage.getItem('_FormViewer.fields');
    // }
    // catch (err) {
    //  console.log("fail to call localStorage.getItem()");
    // }

    // if(!fields){

    // }

    // 設定頁面邊距
    var marginLeft = 5; // Todo: Lib parament: (5) 預設頁面邊距左距
    var marginTop = 10;  // Todo: Lib parament: (10) 預設頁面邊距頂距

    $('#planiArea').hide();

    $('#formImage').css('margin-left', marginLeft).css('margin-top', marginTop);
    $('#formArea').css('margin-left', marginLeft).css('margin-top', marginTop);
    $('#plainArea').css('margin-left', marginLeft).css('margin-top', marginTop);

    /*
    $('#formArea').draggable({
        containment: "#pageFrame",
        handle:"span"});
    var moveImage = $('<span style="float:left;margin-left:5px;margin-top:5px;" class="ui-icon"></span>');
    moveImage.addClass(moveImageClass);
    $('#formArea').append(moveImage);
    
    $('#fvpmLeft').val(marginLeft).keydown(function(e) {
        // todo: 改回 change()
        if(e.keyCode==13){
            var ml = parseInt($(this).val());
            if(ml >= 0) {
                marginLeft = ml;
                $('#formImage').css('margin-left', marginLeft);
                $('#formArea').css('margin-left', marginLeft);
            }
        }
    });
    */

    $('#fvpmTop').val(marginTop).keydown(function(e) {
        if(e.keyCode==13){
            var mt = parseInt($(this).val());
            if(mt >= 0) {
                marginTop = mt;
                $('#formImage').css('margin-top', marginTop);
                $('#formArea').css('margin-top', marginTop);
            }
        }
    });
    
    //根據比率縮放文字位置
    var createFieldDataByZoomRatio = function(fieldObj, thePage, zoomRatio){
    	var pageTag;
    	if (typeof thePage === "undefined"){
    		pageTag = "";
    	}
    	else{
    		pageTag = "_" + thePage + "_";
    	}

        // 1. 欄位定義初始化    
        //debugger;
        //   初始[id]
        var thisID = 'id' + pageTag + fieldObj.id;

        var divObj = $("<div id='" + thisID + "' class='fvFieldData fv-opacity'></div>");

        //   加入[key]
        divObj.addClass(fieldObj.fkey);

        //設定欄位值[value]
        var nameSpan = $('<span style="float:left;margin-left:10px;display: inline; font-size:'+(zoomRatio*100)+'%;"></span>');
        $(nameSpan).html(fieldObj.value);  
        $(divObj).append(nameSpan);

        
        //   初始[flocation: left,top,subitems,interval]
        //alert(zoomRatio);
        var fLeft = (fieldObj.flocation.split(",")[0]) * zoomRatio;
        var fTop = (fieldObj.flocation.split(",")[1]) * zoomRatio;

        //alert('');
        
        if(!fTop){
            fTop = (parseInt(fieldObj.id) -1) * 35 * zoomRatio;  // Todo: Lib parament: (35) 預設 element 之間的間距
            fLeft = 0;
        }
        else{
            fLeft = parseInt(fLeft);
            fTop = parseInt(fTop);
        }

        divObj.css("left", fLeft);                      
        divObj.css("top", fTop);  

        if(fieldObj.ftype=='多重'){
            var fsubitems = fieldObj.flocation.split(",")[2];
            var ftopinterval = fieldObj.flocation.split(",")[3];                        
            // Todo: Lib parament: (30) 預設 subitem 之間的間距 
            if(!ftopinterval){
                divObj.data("topInterval",30);
            }
            else{
                divObj.data("topInterval",ftopinterval);    
            }
            // Todo: Lib parament: (0) 預設 subitem 的個數
            divObj.data("nextSubItems",0);
        }

        //   初始[ftalign] 
        var ftalign =  fieldObj.ftalign;
        if(!ftalign){
            divObj.data("ftalign", '置左');  // Todo: Lib parament: ('置左') 預設 文字對齊方式 置左/置中/置右
        }
        else{
            divObj.data("ftalign", ftalign);    
        } 

        //   初始[fwidth]
        var fwidth = fieldObj.fwidth * zoomRatio;
        if(!fwidth){
            divObj.css("width", 140 * zoomRatio);  // Todo: Lib parament: (140) 預設 欄位寬度
        }
        else{
            divObj.css("width", parseInt(fwidth) * zoomRatio);  
        }   
        
        $('#form-report-viewer #formArea').append(divObj);
    };

    // 產生欄位
    var createField = function(fieldObj, thePage){
    	// 增加 thePage 欄位
    	var pageTag;
    	if (typeof thePage === "undefined"){
    		pageTag = "";
    	}
    	else{
    		pageTag = "_" + thePage + "_";
    	}

        // 1. 欄位定義初始化    
        //debugger;
        //   初始[id]
        var thisID = 'id' + pageTag + fieldObj.id;

        var divObj = $("<div id='" + thisID + "' class='fvField fv-opacity'></div>");

        //   加入[key]
        divObj.addClass(fieldObj.fkey);

        // 欄位設定功能
        var configSpan = $('<span style="float:left;margin-left:5px;display: inline;" class="fvfConfig ui-icon"></span>');
        configSpan.addClass(configClosed);
        $(divObj).append(configSpan);

        //   初始[fname]
        var nameSpan = $('<span style="float:left;margin-left:10px;display: inline;"></span>');
        $(nameSpan).html(fieldObj.fname);  
        $(divObj).append(nameSpan);

        //   初始[flocation: left,top,subitems,interval]
        var fLeft = fieldObj.flocation.split(",")[0];
        var fTop = fieldObj.flocation.split(",")[1];

        if(!fTop){
            fTop = (parseInt(fieldObj.id) -1) * 35;  // Todo: Lib parament: (35) 預設 element 之間的間距
            fLeft = 0;
        }
        else{
            fLeft = parseInt(fLeft);
            fTop = parseInt(fTop);
        }

        divObj.css("left", fLeft);                      
        divObj.css("top", fTop);  

        if(fieldObj.ftype=='多重'){
            var fsubitems = fieldObj.flocation.split(",")[2];
            var ftopinterval = fieldObj.flocation.split(",")[3];                        
            // Todo: Lib parament: (30) 預設 subitem 之間的間距 
            if(!ftopinterval){
                divObj.data("topInterval",30);
            }
            else{
                divObj.data("topInterval",ftopinterval);    
            }
            // Todo: Lib parament: (0) 預設 subitem 的個數
            divObj.data("nextSubItems",0);
        }

        //   初始[ftalign] 
        var ftalign =  fieldObj.ftalign;
        if(!ftalign){
            divObj.data("ftalign", '置左');  // Todo: Lib parament: ('置左') 預設 文字對齊方式 置左/置中/置右
        }
        else{
            divObj.data("ftalign", ftalign);    
        } 

        //   初始[fwidth]
        var fwidth = fieldObj.fwidth;
        if(!fwidth){
            divObj.css("width", 140);  // Todo: Lib parament: (140) 預設 欄位寬度
        }
        else{
            divObj.css("width", parseInt(fwidth));  
        }   

        $('#form-report-viewer #formArea').append(divObj);

        // 2. 欄位拖曳處理
        $("#" + thisID).draggable({
            containment: '#formArea', 
            scroll: false,

            start: function(ev, ui) {
                ev.stopPropagation();
                $(this).is(".ui-selected") || $(".ui-selected").removeClass("ui-selected");
               
                selected = $(".ui-selected").each(function() {
                    var el = $(this);
                    el.data("offset", el.offset());
                });

                $('div[id*="'+thisID+'_"]').each(function() {                               
                    var el = $(this);
                    el.data("offset", el.offset());                                                             
                }); 
                offset = $(this).offset();
            },
            drag: function(ev, ui) {
                ev.stopPropagation();
                var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;
                selected.not(this).each(function() {
                    var el = $(this), off = el.data("offset");
                    el.css({top: off.top + dt, left: off.left + dl});                               
                });

                $('div[id*="'+thisID+'_"]').each(function() {                               
                    var el = $(this), off = el.data("offset");
                    el.css({top: off.top + dt, left: off.left + dl});                               
                }); 
                // Prevent button inside div to be triggered
                $(this).data('isDragging', true);                                                   
            },
            stop: function(ev, ui){ 
                ev.stopPropagation();               
            }
        }).mousemove(function(e){
            var coord = $(this).position();
            $("div#status").text( "left: " + coord.left + ", top: " + coord.top );
        }).mouseup(function(e){
            var coords=[];
            var coord = $(this).position();
            var item={ coordTop:  coord.left, coordLeft: coord.top  };
            coords.push(item);
        }).resizable({
            handles: 'e',
            maxWidth: 500,    // Todo: Lib parament: (500) 預設 最大欄位寬度
            minWidth: 100,    // Todo: Lib parament: (100) 預設 最小欄位寬度
            resize: function(event, ui) {
                var fWidth = $(this).css('width');
                $('div[id*="'+thisID+'_"]').each(function() {                               
                    var el = $(this);
                    el.css('width', fWidth);                                
                }); 
            }
        });
        
        
        
        
        
        //點兩下定義欄位資料
        $("#"+thisID).dblclick(function() {
        	$("#formDataArea div").remove();
    		var plains = ['簡經理','100學年度 學費    代墊              15000  ','100學年度 住宿費  誠齋(男生宿舍)    8000','台幣  1:33.37  美金  002356473567  23000'];
			for ( var i = 0; i < plains.length; i++) {
				var lineDiv = $("<div id='line"+ i + "' class='pvPlainLine'></div>");
				$(lineDiv).html(plains[i]);
				$('#formDataArea').append(lineDiv);
			}
    	    $('#form-data-editor').dialog("open");
    	    $('#formDataArea').show();
    	    
        });
        
        $('#fieldDataBtn').click(function() {
	    	var theField = $('#fieldDataSel').val();

	        var theSel = findSelect();

	        if(theSel.start==theSel.end){
	            alert("請選擇欲標記範圍");
	            return;
	        }
	        else if(!theSel.lineNum){
	            alert("標記範圍與已設定欄位重疊");
	            return;
	        }
	        else{
	            var isOverlap = false;
	            for(var i = 0; i < formDataArray.length; i++)
	            {
	                if(formDataArray[i].lineNum==theSel.lineNum){
	                    if (theSel.start <= formDataArray[i].start && theSel.end > formDataArray[i].start)
	                    {
	                        isOverlap = true;
	                        break;
	                    }
	                    if (formDataArray[i].start < theSel.start && theSel.start < formDataArray[i].end)
	                    {
	                        isOverlap = true;
	                        break;
	                    }
	                }
	            }
	            if (isOverlap)
	            {
	                alert("標記範圍與已設定欄位重疊");
	                return;
	            }
	            
	            formDataArray[theField] = theSel;            
	        }

	        // 顯示在editor的bar上
	        var realLineNo = parseInt(theSel.lineNum.replace("line","")) + 1;
	        $('#fieldDataPos').val(realLineNo + "," + theSel.start + "," + theSel.end);
	        
	        // 加到grid上
			//'fid', 'fname', 'lineNo', 'dataStart', 'dataEnd'  
	        //indexgrid.jqGrid("clearGridData", true);
	        //indexgrid.jqGrid('addRowData', rowIndex, fields[rowIndex]);
	        var theIndex = 1;
	        
	        grid.jqGrid("setCell", theIndex, 7, realLineNo);
	        grid.jqGrid("setCell", theIndex, 8, theSel.start);
	        grid.jqGrid("setCell", theIndex, 9, theSel.end);
	        
	        markText("pink");
	        removeSelect();        
	    });
        

        // 3. 單擊選擇
        $('#' + thisID).click(function(e){
            // click through the div to span (click the span icon)
            if ($(e.target).is("span")) return;
            if ($(e.target).is("button")) return;
            e.stopPropagation();

            if($(this).is(".ui-selected")){
                $(this).removeClass('ui-selected');
            }
            else{
                $(this).addClass('ui-selected');    
            }
        });
        
        

        // 4. 欄位設定按鈕
        $('#' + thisID + ' span.fvfConfig').click(function (e){
            // Prevent button inside div to be triggered                        
            if($(this).hasClass(configClosed)) {
                $(this).removeClass(configClosed).addClass(configOpened);
                //$(this).addClass('configuring');

                // 展開設定面板
                var configDiv = $('<div class="config"></div>');
                configDiv.addClass('configuring');

                var fSLabel = $('<label>欄位長度</label>');
                var fSInput = $('<input class="fvfcWidth" type="text" size="3" maxlength="3">');
                fSInput.val(parseInt($('#' + thisID).css('width')));
                configDiv.append(fSLabel);
                configDiv.append(fSInput);
                configDiv.append('px<br/>');

                var fWALabel = $('<label>對齊方式</label>');
                configDiv.append(fWALabel);
                var fWASelect = $('<select class="fvfcTAlign"><option value="置左">置左</option><option value="置中">置中</option><option value="置右">置右</option></select><br/>');
                fWASelect.val($(this).parent().data('ftalign'));
                configDiv.append(fWASelect);

                configDiv.append($('<hr>'));

                var fButtonSpan = $('<span align="right"></span>');                         
                var fOKButton = $('<button>確定</button>');
                var fCancelButton = $('<button>離開</button>');
                fCancelButton.bind('click', function() {
                    $(this).closest(".config").siblings(".fvfConfig").click();
                });
                fOKButton.bind('click', function() {
                    // Apply [欄位長度]                         
                    $(this).closest('.fvField').css('width', $(this).closest(".config").children('.fvfcWidth').val());
                    // Apply [文字對齊方式]
                    $(this).closest('.fvField').data('ftalign', $(this).closest(".config").children('.fvfcTAlign').val());
                });
                fButtonSpan.append(fOKButton);
                fButtonSpan.append(fCancelButton);
                configDiv.append(fButtonSpan);

                $(this).closest('.fvField').append(configDiv);

                $('.fvField').not($(this).closest('#' + thisID)).css('z-index', 100);
                $(this).closest('.fvField').css('z-index', 10000);
                $(this).closest('.fvField').removeClass('fv-opacity');
            }
            else{
                $(this).removeClass(configOpened).addClass(configClosed);
                
                // 關閉設定面板
                $('#' + thisID + ' div.config').remove();
                $(this).closest('#' + thisID).css('z-index', 100);
                $(this).closest('#' + thisID).addClass('fv-opacity');
            }   
            
            
        });

        if(fieldObj.ftype=='多重'){
            var plusSpan = $('<span style="float:right;margin-left:8px" class="ui-icon"></span>');
            plusSpan.addClass(columnPlus);
            var minusSpn = $('<span style="float:right;margin-left:5px" class="ui-icon"></span>');
            minusSpn.addClass(columnMinus);
            $(divObj).append(plusSpan);
            $(divObj).append(minusSpn);
            //alert(fieldObj.ftype=='多重'); 
            //alert($(divObj).data('nextSubItems')); 

            // 5. 多重欄位增加按鈕(+)
            $('#' + thisID + ' span.' + columnPlus).click(function (e){ 
                createSubItem(e, fieldObj, pageTag);
                //alert('plus');                        
            });
            // 6. 多重欄位減少按鈕(-)
            $('#' + thisID + ' span.' + columnMinus).click(function (e){                            
                // Prevent button inside div to be triggered (Todo: refactory)
                if($(this).closest('#' + thisID).data("isDragging")){
                    $(this).closest('#' + thisID).removeData("isDragging");
                    return
                }
                e.stopPropagation();

                var nextSubItems = parseInt($('#' + thisID).data("nextSubItems"));
                
                if(!nextSubItems){
                    $('#' + thisID).data("topInterval", 30); // Todo: Lib parament: (30) 預設 subitem 之間的間距
                    return;
                };
                //alert(nextSubItems);
                $('#' + thisID + '_' + nextSubItems).remove();
                $('#' + thisID).data("nextSubItems", nextSubItems -1);

                //alert('minus');                       
            });

            var nextSubItems = parseInt(fieldObj.flocation.split(",")[2]);
            //alert(nextSubItems);
            for(var i=0; i < nextSubItems; i++){
                $('#' + thisID + ' span.' + columnPlus).trigger('click');
            }
        }
        
    };
    
    
    
    /**
     * 報表瀏覽只帶出資料, 不包含其他功能
     * @param fieldObj
     * @param thePage
     * @returns
     */
    var createFieldData = function(fieldObj, thePage){
    	// 增加 thePage 欄位
    	var pageTag;
    	if (typeof thePage === "undefined"){
    		pageTag = "";
    	}
    	else{
    		pageTag = "_" + thePage + "_";
    	}

        // 1. 欄位定義初始化    
        //debugger;
        //   初始[id]
        var thisID = 'id' + pageTag + fieldObj.id;

        var divObj = $("<div id='" + thisID + "' class='fvFieldData fv-opacity'></div>");

        //   加入[key]
        divObj.addClass(fieldObj.fkey);

        //設定欄位值[value]
        var nameSpan = $('<span style="float:left;margin-left:10px;display: inline;"></span>');
        $(nameSpan).html(fieldObj.value);  
        $(divObj).append(nameSpan);

        
        //   初始[flocation: left,top,subitems,interval]
        var fLeft = fieldObj.flocation.split(",")[0];
        var fTop = fieldObj.flocation.split(",")[1];

        if(!fTop){
            fTop = (parseInt(fieldObj.id) -1) * 35;  // Todo: Lib parament: (35) 預設 element 之間的間距
            fLeft = 0;
        }
        else{
            fLeft = parseInt(fLeft);
            fTop = parseInt(fTop);
        }

        divObj.css("left", fLeft);                      
        divObj.css("top", fTop);  

        if(fieldObj.ftype=='多重'){
            var fsubitems = fieldObj.flocation.split(",")[2];
            var ftopinterval = fieldObj.flocation.split(",")[3];                        
            // Todo: Lib parament: (30) 預設 subitem 之間的間距 
            if(!ftopinterval){
                divObj.data("topInterval",30);
            }
            else{
                divObj.data("topInterval",ftopinterval);    
            }
            // Todo: Lib parament: (0) 預設 subitem 的個數
            divObj.data("nextSubItems",0);
        }

        //   初始[ftalign] 
        var ftalign =  fieldObj.ftalign;
        if(!ftalign){
            divObj.data("ftalign", '置左');  // Todo: Lib parament: ('置左') 預設 文字對齊方式 置左/置中/置右
        }
        else{
            divObj.data("ftalign", ftalign);    
        } 

        //   初始[fwidth]
        var fwidth = fieldObj.fwidth;
        if(!fwidth){
            divObj.css("width", 140);  // Todo: Lib parament: (140) 預設 欄位寬度
        }
        else{
            divObj.css("width", parseInt(fwidth));  
        }   

        $('#form-report-viewer #formArea').append(divObj);

        /*
        if(fieldObj.ftype=='多重'){
            var plusSpan = $('<span style="float:right;margin-left:8px" class="ui-icon"></span>');
            plusSpan.addClass(columnPlus);
            var minusSpn = $('<span style="float:right;margin-left:5px" class="ui-icon"></span>');
            minusSpn.addClass(columnMinus);
            $(divObj).append(plusSpan);
            $(divObj).append(minusSpn);
            //alert(fieldObj.ftype=='多重'); 
            //alert($(divObj).data('nextSubItems')); 

            // 5. 多重欄位增加按鈕(+)
            $('#' + thisID + ' span.' + columnPlus).click(function (e){ 
                createSubItem(e, fieldObj, pageTag);
                //alert('plus');                        
            });
            // 6. 多重欄位減少按鈕(-)
            $('#' + thisID + ' span.' + columnMinus).click(function (e){                            
                // Prevent button inside div to be triggered (Todo: refactory)
                if($(this).closest('#' + thisID).data("isDragging")){
                    $(this).closest('#' + thisID).removeData("isDragging");
                    return
                }
                e.stopPropagation();

                var nextSubItems = parseInt($('#' + thisID).data("nextSubItems"));
                
                if(!nextSubItems){
                    $('#' + thisID).data("topInterval", 30); // Todo: Lib parament: (30) 預設 subitem 之間的間距
                    return;
                };
                //alert(nextSubItems);
                $('#' + thisID + '_' + nextSubItems).remove();
                $('#' + thisID).data("nextSubItems", nextSubItems -1);

                //alert('minus');                       
            });

            var nextSubItems = parseInt(fieldObj.flocation.split(",")[2]);
            //alert(nextSubItems);
            for(var i=0; i < nextSubItems; i++){
                $('#' + thisID + ' span.' + columnPlus).trigger('click');
            }
        }
        */
    };
    
    
    /**
     * 大量列印
     * 暫時不用
     * @param fieldObj (Json type)
     * @param thePage
     * @param pageIndex
     * @returns
    var createFieldDataByDocument = function(fieldObj, thePage, pageIndex){
    	// 增加 thePage 欄位
    	var pageTag;
    	if (typeof thePage === "undefined"){
    		pageTag = "";
    	}
    	else{
    		pageTag = "_" + thePage + "_";
    	}

        // 1. 欄位定義初始化    
        //debugger;
        //   初始[id]
        var thisID = 'id' + pageTag + fieldObj.id;

        var divObj = $("<div id='" + thisID + "' class='fvFieldData fv-opacity'></div>");

        //   加入[key]
        //divObj.addClass(fieldObj.fkey);
        divObj.addClass(fieldObj.id);

        //設定欄位值[value]
        var nameSpan = $('<span style="float:left;margin-left:10px;display: inline;"></span>');
        $(nameSpan).html(fieldObj.value);  
        $(divObj).append(nameSpan);

        
        //   初始[flocation: left,top,subitems,interval]
        var fLeft = fieldObj.flocation.split(",")[0];
        var fTop = fieldObj.flocation.split(",")[1];

        if(!fTop){
            fTop = (parseInt(fieldObj.id) -1) * 35;  // Todo: Lib parament: (35) 預設 element 之間的間距
            fLeft = 0;
        }
        else{
            fLeft = parseInt(fLeft);
            fTop = parseInt(fTop);
        }

        divObj.css("left", fLeft);                      
        divObj.css("top", fTop);  

        if(fieldObj.ftype=='多重'){
            var fsubitems = fieldObj.flocation.split(",")[2];
            var ftopinterval = fieldObj.flocation.split(",")[3];                        
            // Todo: Lib parament: (30) 預設 subitem 之間的間距 
            if(!ftopinterval){
                divObj.data("topInterval",30);
            }
            else{
                divObj.data("topInterval",ftopinterval);    
            }
            // Todo: Lib parament: (0) 預設 subitem 的個數
            divObj.data("nextSubItems",0);
        }

        //   初始[ftalign] 
        var ftalign =  fieldObj.ftalign;
        if(!ftalign){
            divObj.data("ftalign", '置左');  // Todo: Lib parament: ('置左') 預設 文字對齊方式 置左/置中/置右
        }
        else{
            divObj.data("ftalign", ftalign);    
        } 

        //   初始[fwidth]
        var fwidth = fieldObj.fwidth;
        if(!fwidth){
            divObj.css("width", 140);  // Todo: Lib parament: (140) 預設 欄位寬度
        }
        else{
            divObj.css("width", parseInt(fwidth));  
        }   

        $('#formArea #dataArea_' + pageIndex).append(divObj);
    };
    */

    /**
     * 大量列印
     * @param fieldObj (String Array type)
     * @param thePage
     * @param pageIndex
     * @returns
     */
    var createFieldDataForPrint = function(fieldObj, thePage, pageIndex){
    	// 增加 thePage 欄位
    	var pageTag;
    	if (typeof thePage === "undefined"){
    		pageTag = "";
    	}
    	else{
    		//pageTag = "_" + thePage + "_";
    		pageTag = "_".concat(thePage).concat("_");
    	}

        // 1. 欄位定義初始化    
        //debugger;
        //   初始[id]
        //var thisID = 'id' + pageTag + fieldObj[0];
        //var divObj = $("<div id='" + thisID + "' class='fvFieldData fv-opacity'></div>");

    	var thisID = 'id'.concat(pageTag).concat(fieldObj[0]);
        var divObj = $("<div id='".concat(thisID) .concat("' class='fvFieldData fv-opacity'></div>"));

        
        //   加入[key]
        //divObj.addClass(fieldObj.fkey);
        divObj.addClass(fieldObj[0]);

        //設定欄位值[value]
        var nameSpan = $('<span style="float:left;margin-left:10px;display: inline;"></span>');
        $(nameSpan).html(fieldObj[1]);  
        $(divObj).append(nameSpan);

        
        //   初始[flocation: left,top,subitems,interval]
        var fLeft = fieldObj[3].split(",")[0];
        var fTop = fieldObj[3].split(",")[1];

        if(!fTop){
            fTop = (parseInt(fieldObj[0]) -1) * 35;  // Todo: Lib parament: (35) 預設 element 之間的間距
            fLeft = 0;
        }
        else{
            fLeft = parseInt(fLeft);
            fTop = parseInt(fTop);
        }

        divObj.css("left", fLeft);                      
        divObj.css("top", fTop);  

        if(fieldObj[2]=='多重'){
            var fsubitems = fieldObj[3].split(",")[2];
            var ftopinterval = fieldObj[3].split(",")[3];                        
            // Todo: Lib parament: (30) 預設 subitem 之間的間距 
            if(!ftopinterval){
                divObj.data("topInterval",30);
            }
            else{
                divObj.data("topInterval",ftopinterval);    
            }
            // Todo: Lib parament: (0) 預設 subitem 的個數
            divObj.data("nextSubItems",0);
        }

        //   初始[ftalign] 
        var ftalign =  fieldObj[5];
        if(!ftalign){
            divObj.data("ftalign", '置左');  // Todo: Lib parament: ('置左') 預設 文字對齊方式 置左/置中/置右
        }
        else{
            divObj.data("ftalign", ftalign);    
        } 

        //   初始[fwidth]
        var fwidth = fieldObj[4];
        if(!fwidth){
            divObj.css("width", 140);  // Todo: Lib parament: (140) 預設 欄位寬度
        }
        else{
            divObj.css("width", parseInt(fwidth));  
        }   

        $('#formArea #dataArea_' + pageIndex).append(divObj);

    };
    
    
    function StringBuffer(){
        this._Strings = new Array();
    }
    StringBuffer.prototype = {
        append : function(str){
            this._Strings.push(str);
        },
        toString : function(){
            return this._Strings.join("");
        }
    }
    
    /**
     * 大量列印 for IE performance
     * @param fieldObj (String Array type)
     * @param thePage
     * @param pageIndex
     * @returns
     */
    var createFieldDataForPrintJS = function(fieldObj, thePage, pageIndex){
    	
    	// 增加 thePage 欄位
    	var pageTag;
    	if (typeof thePage === "undefined"){
    		pageTag = "";
    	}
    	else{
    		//pageTag = "_" + thePage + "_";
    		pageTag = "_".concat(thePage).concat("_");
    	}

        // 1. 欄位定義初始化    
        //debugger;
        //   初始[id]
        //var thisID = 'id' + pageTag + fieldObj[0];
        //var divObj = $("<div id='" + thisID + "' class='fvFieldData fv-opacity'></div>");

    	var thisID = 'id'.concat(pageTag).concat(fieldObj[0]);
    	
        //var divObj = $("<div id='".concat(thisID) .concat("' class='fvFieldData fv-opacity'></div>"));

        
        //   加入[key]
        //divObj.addClass(fieldObj.fkey);
        //divObj.addClass(fieldObj[0]);

        //設定欄位值[value]
        //var nameSpan = $('<span style="float:left;margin-left:10px;display: inline;"></span>');
        //$(nameSpan).html(fieldObj[1]);  
        //$(divObj).append(nameSpan);

    	
    	
        
        //   初始[flocation: left,top,subitems,interval]
        var fLeft = fieldObj[3].split(",")[0];
        var fTop = fieldObj[3].split(",")[1];

        if(!fTop){
            fTop = (parseInt(fieldObj[0]) -1) * 35;  // Todo: Lib parament: (35) 預設 element 之間的間距
            fLeft = 0;
        }
        else{
            fLeft = parseInt(fLeft);
            fTop = parseInt(fTop);
        }

        /* 未修改
        divObj.css("left", fLeft);                      
        divObj.css("top", fTop);  

        if(fieldObj[2]=='多重'){
            var fsubitems = fieldObj[3].split(",")[2];
            var ftopinterval = fieldObj[3].split(",")[3];                        
            // Todo: Lib parament: (30) 預設 subitem 之間的間距 
            if(!ftopinterval){
                divObj.data("topInterval",30);
            }
            else{
                divObj.data("topInterval",ftopinterval);    
            }
            // Todo: Lib parament: (0) 預設 subitem 的個數
            divObj.data("nextSubItems",0);
        }

        //   初始[ftalign] 
        var ftalign =  fieldObj[5];
        if(!ftalign){
            divObj.data("ftalign", '置左');  // Todo: Lib parament: ('置左') 預設 文字對齊方式 置左/置中/置右
        }
        else{
            divObj.data("ftalign", ftalign);    
        } 
        */

        
        
        //   初始[fwidth]
        var fwidth = fieldObj[4];
        /*
        if(!fwidth){
            divObj.css("width", 140);  // Todo: Lib parament: (140) 預設 欄位寬度
        }
        else{
            divObj.css("width", parseInt(fwidth));  
        }   

        $('#formArea #dataArea_' + pageIndex).append(divObj);
        
        $('#dataArea_' + pageIndex).append(divHtml);
        */
        
        var divHtmlBf = new StringBuffer();
        divHtmlBf.append("<div id='");
        divHtmlBf.append(thisID);
        divHtmlBf.append("' class='fvFieldData fv-opacity ");
        divHtmlBf.append(fieldObj[0]);
        divHtmlBf.append("' style='left:");
        divHtmlBf.append(fLeft);
        divHtmlBf.append("px; top:");
        divHtmlBf.append(fTop);
        divHtmlBf.append("px; width:");
        divHtmlBf.append(parseInt(fwidth));
        divHtmlBf.append("px;'>");
        divHtmlBf.append('<span style="float:left;margin-left:10px;display: inline;">');
        divHtmlBf.append(fieldObj[1]);
        divHtmlBf.append('</span>');
        divHtmlBf.append("</div>");

        divHtml = divHtmlBf.toString();
        
        
        //var divHtml = "<div id='" + thisID + "' class='fvFieldData fv-opacity "+fieldObj[0]+"' style='left:"+fLeft+"px; top:"+fTop+"px; width:"+ parseInt(fwidth)+"px;'>"+ '<span style="float:left;margin-left:10px;display: inline;">'+fieldObj[1]+'</span>' +"</div>";
        
        var elem = document.createElement('div');
        elem.innerHTML = divHtml;
        document.getElementById('dataArea_' + pageIndex).appendChild(elem);
    };

    // 產生子欄位 // isAddSubItems
    var createSubItem = function(e, fieldObj, pageTag){
        var thisID = 'id' + pageTag + fieldObj.id;
        var fieldDiv = $('#' + thisID);

        // Prevent button inside div to be triggered (Todo: refactory)
        if(fieldDiv.data("isDragging")){
            fieldDiv.removeData("isDragging");
            return
        }
        e.stopPropagation();
        
        var nextSubItems = parseInt(fieldDiv.data("nextSubItems"));
        
        // if(!nextSubItems){
        //  nextSubItems = 1;
        //  //alert(nextSubItems);
        // }
        // else{
        nextSubItems++; 
        //}                         
   
        var divLeft = parseInt(fieldDiv.css('left'));
        var divTop = parseInt(fieldDiv.css('top'));                         
        var topInterval = parseInt(fieldDiv.data("topInterval"));

        var divObj = $("<div id='" + thisID + '_' + nextSubItems + "' style='left:" + divLeft + "px;top:" + (divTop+nextSubItems*topInterval) + "px;' class='fvSubField'></div>");

        divObj.css('width', fieldDiv.css('width'));

        $('#formArea').append(divObj);
        fieldDiv.data("nextSubItems", nextSubItems);

            if(nextSubItems==1){
                divObj.draggable({
                    axis: "y",
                    drag: function(ev, ui) {
                        ev.stopPropagation();
                        var subTop = parseInt($('#'+thisID+'_1').css('top').replace("px", ""));
                        var topInterval = subTop - divTop;
                        fieldDiv.data("topInterval", topInterval);
                        //alert(invTop);
                        $('div[id*="'+thisID+'_"]').not(this).each(function() {
                            var el = $(this);
                            var theID = parseInt(el.attr('id').split("_")[1]);
                            //alert(theID);
                            el.css({top: divTop + theID * topInterval});                                
                        }); 
                    },
                    stop: function(ev, ui){ 
                        ev.stopPropagation();
                    }
                });
            }                       
    };

    $("#formArea").selectable({
        filter: ':not(".fvSubField")'
    });

    // 欄位方向鍵微調
    $("body").keydown(function(e) {
        if(e.keyCode == 37) { // left
            selected = $(".ui-selected").each(function() {
                var el = $(this);
                el.css({left: parseInt($(this).css('left').replace("px", "")) - 1});                            
            });
        }
        else if(e.keyCode == 39) { // right                     
            selected = $(".ui-selected").each(function() {
                var el = $(this);                           
                el.css({left: parseInt($(this).css('left').replace("px", "")) + 1});    
            });
        }
        else if(e.keyCode == 38) { // up
            selected = $(".ui-selected").each(function() {
                var el= $(this);
                el.css({top: parseInt($(this).css('top').replace("px", "")) - 1});
            });
        }
        else if(e.keyCode == 40) { // down
            selected = $(".ui-selected").each(function() {
                var el= $(this);
                el.css({top: parseInt($(this).css('top').replace("px", "")) + 1});
            });
        }

    }).keyup(function(e) {
        if(e.keyCode == 27) { // ESC
            //alert("esc");
            selected = $(".ui-selected").each(function() {
                var el= $(this);
                el.removeClass("ui-selected");
            }); 
            $.unblockUI(); 
        }   
    });    

    // 產生Toolbar
    var createToolbar = function(viewerObj){

    };

    var makeEditableAndHighlight = function (theColor){
        sel = window.getSelection();
        if (sel.rangeCount && sel.getRangeAt) {
            range = sel.getRangeAt(0);
        }
        
        
        document.designMode = "on";
        if (range) {
            //sel.removeAllRanges();
            sel.addRange(range);
        }
        // Use HiliteColor since some browsers apply BackColor to the whole block
        if (!document.execCommand("HiliteColor", false, theColor)) {
            document.execCommand("BackColor", false, theColor);
        }
        document.designMode = "off";
        
    };

    var markText = function (theColor) {
        var range, sel;
        if (window.getSelection) {
            // IE9 and non-IE
            try {
                if (!document.execCommand("BackColor", false, theColor)) {
                    makeEditableAndHighlight(theColor);
                }
            } catch (ex) {
               makeEditableAndHighlight(theColor)
            }
        } else if (document.selection && document.selection.createRange) {
            // IE <= 8 case
            range = document.selection.createRange();
            range.execCommand("BackColor", false, theColor);
        }
    };

    var findSelect = function () {
        var start = 0, end = 0, lineNum = -1;
        var sel, range, priorRange;
        if (typeof window.getSelection != "undefined") {
            range = window.getSelection().getRangeAt(0);
            priorRange = range.cloneRange();
            priorRange.selectNodeContents(range.startContainer.parentNode);
            priorRange.setEnd(range.startContainer, range.startOffset);
            start = priorRange.toString().length;
            end = start + range.toString().length;
            lineNum = range.startContainer.parentNode.id
            //alert("A");
        } 
        else if (typeof document.selection != "undefined" && (sel = document.selection).type != "Control") {
            range = sel.createRange();
            priorRange = document.body.createTextRange();
            priorRange.moveToElementText(range.parentElement());
            priorRange.setEndPoint("EndToStart", range);
            start = priorRange.text.length;
            end = start + range.text.length;
            lineNum = range.parentElement().id;
            //alert("B");
        }
        //alert(lineNum);
        return {
        'start': start,
        'end': end,
        'lineNum': lineNum};
    };

    var selectText = function (element) {
        var doc = document;
        var theline = doc.getElementById(element.lineNum);
        var text = $(theline).text().substring(element.start,element.end);    
        if (doc.body.createTextRange) {
            //alert("A"); //IE
            var range = document.body.createTextRange();

            range.collapse(true);
            
            range.moveToElementText(theline);
            range.moveStart("character",element.start - 1);
            range.findText(text);  
            
            range.select();
        } else if (window.find) {
            //alert("B"); //firefox
            var selection = window.getSelection();        
            var range = document.createRange();
            // line8 = element.lineNum -1
            var preNum = parseInt(element.lineNum.split("line")[1]);
            //alert(preNum);
            if(preNum > 0){
                range.selectNodeContents(doc.getElementById('line'+(preNum-1)));
                selection.removeAllRanges();
                selection.addRange(range);
            }
            var preText = $(theline).text().substring(0, element.start -1);   
            window.find(preText);
            window.find(text);
        }
    };

    var removeSelect = function () {
        // Remove selection
        // if (window.getSelection) {  // all browsers, except IE before version 9
        //     var selection;
        //     try {
        //         selection = window.getSelection();
        //     } catch (ex) {
        //         selection = document.getSelection();
        //     }
                                                
        //     selection.removeAllRanges();
        // }
        // else {
        //     if (document.selection.createRange) {        // Internet Explorer
        //         var range = document.selection.createRange();
        //         document.selection.empty();
        //     }
        // }

        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.selection) {
            document.selection.empty();
        }


    };

    var plainMarkValue = 0;
//    var plainMarkArray = new Array();
    var plainCommentValue = 0;
    var plainCommentArray = new Array();