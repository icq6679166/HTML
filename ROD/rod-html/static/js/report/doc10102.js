$(document).ready(function(){
	var querygrid = $("#gridview").jqGrid({
        colModel: [ {name: '申請人員代碼',width: 30,align: "left"},
                    {name: '申請人員姓名',width: 30,align: "center"},
					{name: '報表編號',width: 55,align: "left"},
                    {name: '報表名稱',width: 120,align: "left"},
                    {name: '報表版本',width: 30,align: "center"},                    
                    {name: '申請日期',width: 60,align: "left"}],
        localFirst: true,multiselect: true,height: 450,
        sortname: '上版日期',sortorder: "desc",
        ondblClickRow: function(){
        	$("#add").trigger('click');
        },
        onSelectRow: function(id) {
        	if(querygrid.getCell(id, '是否匯出')=='N'){
        		//可修改版次加一或刪除版次還原
            	$("#delete").css("color","#005BA1"); //enabled
            	$("#delete").attr("disabled",false);
            	$("#modDef").css("color","#005BA1");
            	$("#modDef").attr("disabled",false);
            	
            	
            }else if ((querygrid.getCell(id, '是否匯出')=='Y') && (querygrid.getCell(id, '報表版本')== '2')){
            	/*
            	$("#oprenDef").css("color","#005BA1");
            	$("#openDef").attr("disabled",false);
            	$("#modDef").css("color","#005BA1");
            	$("#modDef").attr("disabled",false);
            	*/
            	//不能刪除，可修改版次加一
            	$("#delete").css("color","#AAAAAA"); //disabled
            	$("#delete").attr("disabled",true);
            	$("#modDef").css("color","#005BA1");
            	$("#modDef").attr("disabled",false);
            } else
            	{
	            	//不是最後一版不能刪除，不能修改
	            	$("#delete").css("color","#AAAAAA"); //disabled
	            	$("#delete").attr("disabled",true);
	            	$("#modDef").css("color","#AAAAAA");
	            	$("#modDef").attr("disabled",true);            	
            	}
        }
    });
	
	//查詢
    var qDialog = $("#qryDailog");
	qDialog.dialog({
    	height: 250,width: 500,modal: true,
    	buttons:API.createJSON([{
    		key:i18n.def.query,value:function(){
			qDialog.dialog('close');
			$("#gridview").clearGridData().addGridData([
				["","TCB11546","王大明","ACD01", "總分類帳","2", "2014-01-10 15:10"]
			]);
			}
    	},{ key:i18n.def.close,value:function(){qDialog.dialog('close');}
    	}])
    });
    $("#query").click(function(){
    	qDialog.dialog('open');
    }).trigger('click');
    
	//新增
    var eDialog = $("#editDialog");
    eDialog.dialog({
    	height:780,width:950,modal:true
    	/*
    	buttons:API.createJSON([{
    		key:i18n.def.sure,value:function(){qDialog.dialog('close');}
    	},{ key:i18n.def.close,value:function(){qDialog.dialog('close');}
    	}])
    	*/
    });
    $("#openDef").click(function(){
    	
		var selRowIds = querygrid.jqGrid ('getGridParam', 'selarrrow');			
		if (selRowIds.length > 1) {
			alert("報表定義放行一次只能選一筆!");
		}
		else 
			if (selRowIds.length == 0) {
					alert("請選一筆資料作報表定義放行!");
				}
			else 
					if (selRowIds.length == 1) {
		
					eDialog.dialog('open');		

			}
    });
    $("#sub1").click(function(){
		alert("簽核完成");
		eDialog.dialog('close');
	});

	$("#sub2").click(function(){
		alert("簽核完成");
		eDialog.dialog('close');
    });
	$("#sub3").click(function(){
		alert("簽核完成");
		eDialog.dialog('close');
	});

	$("#sub3").click(function(){
		alert("簽核完成");
		eDialog.dialog('close');
    });
	
    $("#lef1").click(function(){
    	eDialog.dialog('close');
    });

    $("#lef2").click(function(){
    	eDialog.dialog('close');
    });

    $("#lef3").click(function(){
    	eDialog.dialog('close');
    });
	
	$("#lef4").click(function(){
    	eDialog.dialog('close');
    });
	

	//old 
	var formDataArray = new Array();
	var indexgrid, grid, mform = $("#mform"),pagegrid,fieldgrid,indexgrid;
	grid = $("#list").jqGrid({
		datatype : 'local',
		mtype : 'GET',
		colNames : [ '代號', '名稱', '種類', '位置', '欄寬', '對齊','行數','起始位置','結束位置' ],
		colModel : [ {
			name : 'fid',
			index : 'fid',
			width : 100
		}, {
			name : 'fname',
			index : 'fname',
			width : 120
		}, {
			name : 'ftype',
			index : 'ftype',
			width : 50,
			align : 'center'
		}, {
			name : 'flocation',
			index : 'flocation',
			width : 100,
			align : 'left'
		}, {
			name : 'fwidth',
			index : 'fwidth',
			width : 50,
			align : 'left'
		}, {
			name : 'ftalign',
			index : 'ftalign',
			width : 50,
			align : 'center'
		}, {
			name : 'line1Cnt',
			index : 'ftalign',
			width : 50,
			align : 'center'
		} , {
			name : 'startPos',
			index : 'startPos',
			width : 80,
			align : 'center'
		}, {
			name : 'endPos',
			index : 'endPos',
			width : 80,
			align : 'center'
		}],
		onSelectRow : function(id) {
			selected = $(".ui-selected").each(function() {
				var el = $(this);
				el.removeClass("ui-selected");
			});
			$('#id' + id).click();
		},
		height: 100
	}).addGridData([
	                ["Subject", "科目","多重","25,162,48,22,0","200","置右","5","20","30"],
					["Sum", "金額","單一","45,200","300","置右","10","60","78"]
	]);

	
	pagegrid= $("#inputPageData").jqGrid({
		datatype : 'local',
		mtype : 'GET',
		colNames : [ '項次','頁數' ],
		colModel : [ {
			name : 'items',
			index : 'items',
			width : 100,
			align : 'center'
		},{
			name : 'page',
			index : 'page',
			width : 100,
			align : 'center'
		}],
		onSelectRow : function(id) {
			selected = $(".ui-selected").each(function() {
				var el = $(this);
				el.removeClass("ui-selected");
			});
			$('#id' + id).click();
		},
		height : 80
	}).addGridData([
	                ["1", "1"]
	]);
	
	
	fieldgrid= $("#fieldData").jqGrid({
		datatype : 'local',
		mtype : 'GET',
		colNames : [ '項次','欄位名稱','行數','起始位置','結束位置','固定字串' ],
		colModel : [ 
		    {name : 'items', index : 'items', width : 40, align : 'center'},
		    {name : 'name',index : 'name',width : 80, align : 'center'},
		    {name : 'sline',index : 'sline',width : 80, align : 'center'},
		    {name : 'sstart',index : 'sstart', width : 80, align : 'center'},
		    {name : 'slen',index : 'slen',width : 80, align : 'center'},
		    {name : 'sfixed',index : 'sfixed', width : 150, align : 'center'}
		],
		onSelectRow : function(id) {
			selected = $(".ui-selected").each(function() {
				var el = $(this);
				el.removeClass("ui-selected");
			});
			$('#id' + id).click();
		},
		height : 80
	}).addGridData([
	                ["1", "*報表編號","0","0","0","ACD01"],
					["2", "*報表名稱","0","0","0","總分類帳"],
					["3", "*報表週期","0","0","0","D"],
					["4", "*保存年限","0","0","0","3"],
					["5", "field5","2","6","10",""],
					["6", "field6","2","11","13",""],
					["7", "field7","2","14","16",""],
					["8", "field8","0","0","0","/"],
					["9", "field9","1","1","5",""],
					["10", "field10","","","","N"],
					["11", "field11","","","","sysdate"],
	                
	]);	
		
		
		var indexSelId;
		indexgrid= $("#indexData").jqGrid({
			datatype : 'local',
			mtype : 'GET',
			colNames : [ '項次','索引代號','索引名稱','索引內容' ],
			colModel : [ {
				name : 'items',
				index : 'items',
				width : 40,
				align : 'center'
			},{
				name : 'indexId',
				index : 'indexId',
				width : 150,
				align : 'center'
			},{
				name : 'indexName',
				index : 'indexName',
				width : 150,
				align : 'center'
			},{
				name : 'indexDef',
				index : 'indexDef',
				width : 200,
				align : 'center'
			}],		
		
		onSelectRow : function(id) {
			selected = $(".ui-selected").each(function() {
				var el = $(this);
				el.removeClass("ui-selected");
			});
			$('#id' + id).click();
			indexSelId = id;
			
			//
		},
		ondblClickRow: function(id,rowid){
			//alert(rowid);
			indexgridSelId = id;
			$("#indexId").val(indexgrid.getCell(id, 'indexId'));
			$("#indexName").val(indexgrid.getCell(id, 'indexName'));
			$("#indexDef").val(indexgrid.getCell(id, 'indexDef'));
			if(rowid == 1){
				$("#dateSel").show();
			}else{
				$("#dateSel").hide();
			}
		},
		height : 200
	}).addGridData([
	                ["1", "index1","報表日期", "field5,field8,field6,field8,field7"],
	                ["2", "index2","分行別", "field9"],
	                ["3", "index3","報表編號", "*報表編號"],
	                ["4", "index4","報表名稱", "*報表名稱"],
	                ["5", "index5","報表週期", "*報表週期"],
	                ["6", "index6","必印", "field10"],
	                
	                //["7", "index7","載入日期", ""],  程式自動更新，不顯示在畫面上(20130115)
	                
	                ["7", "index7","保存年限", "*保存年限"]
	]);
	
	$("#tabs").tabs();

	$('#form-report-viewer').dialog({
		autoOpen : false,
		height : 1400,
		width : 980,
		modal : true
	});

	$('#plain-report-viewer').dialog({
		autoOpen : false,
		height : 650,
		width : 1024,
		modal : true
	});

	$('#form-data-editor').dialog({
		autoOpen : false,
		height : 650,
		width : 1024,
		modal : true
	});
	
	$('#form-data-editor').dialog({
		autoOpen : false,
		height : 650,
		width : 1024,
		modal : true
	});	

	$('#field-locator').dialog({
		height : 700,
		width : 980,
		modal : true
	});

	$('#hiddenCode-data-editor').dialog({
		autoOpen : false,
		height : 620,
		width : 1024,
		modal : true
	});	
	
	var configClosed = "ui-icon-circle-triangle-e";
	var configOpened = "ui-icon-circle-triangle-s";
	var columnPlus = "ui-icon-plusthick";
	var columnMinus = "ui-icon-minusthick";
	var moveImageClass = "ui-icon-arrow-4-diag";

	var selected = $([]), offset = {
		top : 0,
		left : 0
	};

	// // Retrieve the object from storage (HTML 5)
	var fields = new Array();
	var indexfields = new Array();
	// 設定頁面邊距
	var marginLeft = 5; // Todo: Lib parament: (5) 預設頁面邊距左距
	var marginTop = 10; // Todo: Lib parament: (10) 預設頁面邊距頂距

	$('#formImage').css('margin-left', marginLeft).css('margin-top', marginTop);
	$('#formArea').css('margin-left', marginLeft).css('margin-top', marginTop);

	$('#formArea').draggable({ containment : "#pageFrame" , handle : "span" });
	var moveImage = $('<span style="float:left;margin-left:5px;margin-top:5px;" class="ui-icon"></span>');
	moveImage.addClass(moveImageClass);
	$('#formArea').append(moveImage);

	$('#fvpmLeft').val(marginLeft).keydown(function(e) {
		// todo: 改回 change()
		if (e.keyCode == 13) {
			var ml = parseInt($(this).val());
			if (ml >= 0) {
				marginLeft = ml;
				$('#formImage').css('margin-left', marginLeft);
				$('#formArea').css('margin-left', marginLeft);
			}
		}
	});

	$('#fvpmTop').val(marginTop).keydown(function(e) {
		if (e.keyCode == 13) {
			var mt = parseInt($(this).val());
			if (mt >= 0) {
				marginTop = mt;
				$('#formImage').css('margin-top', marginTop);
				$('#formArea').css('margin-top', marginTop);
			}
		}
	});

	// 設定頁面大小
	var pageSize = "A4"; // Todo: Lib parament: (A4) 預設頁面大小
	// [A3|A4|A5|B3|B4|B5]
	$("#pageSize").buttonset().find('label').width(50); // Todo:
	// UI
	// parament:
	// (50)
	// 預設頁面大小按鈕大小

	// 設定頁面方向
	var pageOrientation = "P"; // Todo: Lib parament: (P)
	// 預設頁面方向
	// [P(ortrait)|L(andscape)]
	$("#pageOrientation").buttonset().find('label').width(100).height(25); // Todo:
	// 下載PDF
	//$("#dlPdf").buttonset().find('label').width(80).height(25);  // Todo:
	// 下載TXT
	//$("#dlTxt").buttonset().find('label').width(80).height(25); // Todo:
	
	// UI
	// parament:
	// (100)
	// 預設頁面方向按鈕大小

	$('#pageFrame').addClass('pageSize-' + pageOrientation + '-' + pageSize);

	$("#reportType label").click(function(e) {
		var newType = $(this).children('span').html();
		changeReportType(newType);
	});

	$("#pageSize label").click(function(e) {
		var newSize = $(this).children('span').html();
		var newOrientation = pageOrientation;
		updatePageSetting(newSize, newOrientation);
	});
	
	$("#pageOrientation label").click(function(e) {
		var newSize = pageSize;
		var newOrientation = $(this).children('span').html();
		updatePageSetting(newSize, newOrientation);
	});

	var changeReportType = function(theReportType) {
	// alert(theReportType);
		if (theReportType == '白表') {
			$("#tabs").tabs("option", "disabled", [ 1, 2 ]);
		} else if (theReportType == '套表') {
			$("#tabs").tabs("enable", 1);
			$("#tabs").tabs("enable", 2);
		}
	};

	var updatePageSetting = function(theSize, theOrientation) {
		if (theOrientation == '直式' || theOrientation == 'P') {
			theOrientation = "P";
		} else {
			theOrientation = "L";
		}

		$('#pageFrame').removeClass('pageSize-' + pageOrientation + '-' + pageSize)
			.addClass( 'pageSize-' + theOrientation + '-' + theSize);
		pageOrientation = theOrientation;
		pageSize = theSize;
	};

	var createListObj = function() {
		var listObject = {
			fid : "1",
			fgid : "0",
			fx : "100",
			fy : "200",
			fwidth : "160",
			flalign : "right",
			ftext : "XX"
		};
		return listObject;
	};

	$("button").button();

	/*
	// 處理[初始定位]
	var initLocation = function(fields) {
		$("#formArea div").remove();
		for ( var i = 0; i < fields.length; i++) {
			createField(fields[i]);
		}

		$("#list").jqGrid("clearGridData", true);
		for ( var i = 0; i <= fields.length; i++) {
			$('#list').jqGrid('addRowData', i + 1, fields[i]);
		}
		$('#list').trigger("reloadGrid");
	};
	
	$("#initButton").click(function() {
		initLocation(fields);
	});
	*/

	// 處理[載入定位]
	$("#loadButton").click(function() {
		$("#formArea div").remove();
		$.ajax({
			//url : "webroot/txn10102handler/getRptDef",
			data : $.extend(mform.serializeData(), {
				type : "A"
			}),
			success : function(data) {
				fields = data.fields;
				for ( var i = 0; i < fields.length; i++) {
					createField(fields[i]);
				}
				$("#list").jqGrid("clearGridData",true);
				for ( var i = 0; i <= fields.length; i++) {
					$('#list').jqGrid('addRowData',i + 1,fields[i]);
				}

				$('#list').trigger("reloadGrid");
			}
		});
	});

	// 處理[完成定位]
	$("#locate").click( function() {	
		$("#formArea div").remove();
		for ( var i = 0; i < fields.length; i++) {
			createField(fields[i]);
		}
		
    	var nocache = new Date();    	
		$('#formArea').css("background-image", 
				"url(../static/images/form/LLDLN085.png)");
		
		$('#form-report-viewer').dialog("open");
								
		$('#form-report-viewer').dialog({
			close:function(event,ui){
				$("#list").jqGrid("clearGridData", true);
				setLocations(fields);
				$('#list').trigger("reloadGrid");
			}
		});
	});
	
	// 將dialog上的欄位位置寫入grid
	var setLocations = function (fields){
		for ( var i = 0; i < fields.length; i++) {
			
			var theLeft = parseInt($('#id' + (i + 1)).css('left'));
			var theTop = parseInt($('#id' + (i + 1)).css('top'));
			var nextSubItems = $('#id' + (i + 1)).data('nextSubItems');
			var topInterval = $('#id' + (i + 1)).data('topInterval');
			if (fields[i].ftype == '多重') {
				fields[i].flocation = theLeft + ','
				+ theTop + ',' + nextSubItems
				+ ',' + topInterval;
			} else {
				fields[i].flocation = theLeft + ','+ theTop;
			}

			fields[i].fwidth = parseInt($('#id' + (i + 1)).css('width'));
			fields[i].ftalign = $('#id' + (i + 1)).data('ftalign');
			
			$('#list').jqGrid('addRowData', i, fields[i]);
		}
	}
	
	// 處理[定位]
	$("#dataPositionBtn").click(function() {
		$("#formDataArea div").remove();
		var plains;
		$.ajax({
			//url : "webroot/txn10102handler/getFormData",
			data : $.extend(mform.serializeData(), {
				type : "A"
			}),
			success : function(data) {
				plains = data.formData;
				for ( var i = 0; i < plains.length; i++) {
					var lineDiv = $("<div id='line"+ i + "' class='pvPlainLine'></div>");
					$(lineDiv).html(plains[i]);
					$('#formDataArea').append(lineDiv);
				}
			}
		});
		
		// 建立欄位下拉列表
		var fieldNum = indexgrid.getGridParam("reccount");
		
		if(fieldNum > 0){
			// 清掉之前的結果
			///$('.combobox-ui').remove();
			//$('#fields').show();
			//$('#fields').combobox('destroy');
			
			$('#fieldDataSel').find('option').remove().end();
			for(var i = 0; i < fieldNum; i++){				
				//alert(indexgrid.getCell(i, 'fname'));
				$('#fieldDataSel').append('<option value="'+indexgrid.getCell(i, 'fid')+'" >'+indexgrid.getCell(i, 'fname')+'</option>');			
			}			
		}
		
		//alert("b4 combobox");
		//$('#fields').combobox();
	    $('#form-data-editor').dialog("open");
	    $('#formDataArea').show();
	});

	$('#plainpvButton').click(function() {
		$("#plainArea div").remove();
		var plains;
		$.ajax({
			//url : "webroot/txn10102handler/getPlainPage",
			data : $.extend(mform.serializeData(), {
				type : "A"
			}),
			success : function(data) {
				plains = data.plains;
				for ( var i = 0; i < plains.length; i++) {
					var lineDiv = $("<div id='line"+ i + "' class='pvPlainLine'></div>");
					$(lineDiv).html(plains[i]);
					$('#plainArea').append(lineDiv);
				}
			}
		});
	    $('#plain-report-viewer').dialog("open");
	    $('#plainArea').show();
	});
	
	//hide pager
	$("#list-pager").hide();
	$("#indexData-pager").hide();
	$("#fieldData-pager").hide();
	$("#inputPageData-pager").hide();

	var downloadURL = function downloadURL(url) {
		var iframe;
		iframe = document.getElementById("hiddenDownloader");
		if (iframe === null) {
			iframe = document.createElement('iframe');
			iframe.id = "hiddenDownloader";
			iframe.style.visibility = 'hidden';
			document.body.appendChild(iframe);
		}
		iframe.src = url;
	};

	$('#printButton').click(function() {
		// window.location =
		// "webroot/codetypehandler/getPDF";
		downloadURL("webroot/codetypehandler/getPDF");
	});

	$("fieldset legend").click(function() {
		// alert($(this).attr("id"));
		$(this).next().toggle();
	});
	
	$("#sub").click(function() {
		if ($('#mform').validationEngine('validate')) {
		$.ajax({
			//url : "webroot/txn10102handler/parseGrid",
			 data: {
				 "grid": JSON.stringify(grid.serializeGridData()),
				 "mform" : JSON.stringify(mform.serializeData()),
				 "indexgrid" : JSON.stringify(indexgrid.serializeGridData())
		     },
			success : function(data) {
				alert("success!!!");
			}
		});
		}
	});

	$("#add").click(function() {
			var rowIndex = $("#list").jqGrid('getDataIDs').length;
			fields[rowIndex] = {
				id : rowIndex+1,
				fid : $("#fid").val(),
				fname : $("#fname").val(),
				ftype : $("input[name='fClass']:checked").val(),
				flocation : "",
				fwidth : "",
				ftalign : "",
				fstatus : ""
			};

			$('#list').jqGrid('addRowData', rowIndex, fields[rowIndex]);
			$('#list').trigger("reloadGrid");

			//為設定資料格式頁面添加輸入框
			rowIndex = $("#inputDataFormat").jqGrid('getDataIDs').length;
			indexfields[rowIndex] = {
				id : rowIndex+1,
				fid : $("#fid").val(),
				fname : $("#fname").val(),
				lineNo : "",
				dataStart : "",
				dataEnd : ""
			};
			
			$('#inputDataFormat').jqGrid('addRowData', rowIndex, indexfields[rowIndex]);
			$('#inputDataFormat').trigger("reloadGrid");
		
	});

	$("#delete").click(function(){
		var rowIndex = $("#list").jqGrid('getGridParam','selrow');
		$("#list").jqGrid("delRowData", rowIndex);
		$("#inputDataFormat").jqGrid("delRowData", rowIndex);

		removeArr(fields,rowIndex);
		removeArr(indexfields,rowIndex);
	});

	/*
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
        var theIndex = $('#fieldDataSel').get(0).selectedIndex;
        indexgrid.jqGrid("setCell", theIndex, 2, realLineNo);
        indexgrid.jqGrid("setCell", theIndex, 3, theSel.start);
        indexgrid.jqGrid("setCell", theIndex, 4, theSel.end);
        
        markText("pink");
        removeSelect();        
    });
    */
   
    $("#fieldDataSel").change( function() {
    	var selectedIndex = $('#fieldDataSel').get(0).selectedIndex;
    });    
   
	//array的删除操作
	var removeArr = function(arr,n){
		if(isNaN(parseInt(n))) 
			return false;
		if(n>=arr.length || n<0) 
			return false;
		for(var i=n;i<arr.length-1;i++) 
			arr[i]=arr[i+1];
		arr.pop();
		return true;
	}

	$("#rptId").change(function(){
		$.ajax({   
            type:'GET'  
            ,url:'webroot/validatehandler/validateidversion'  
            ,data:{
            	rptId : $("#rptId").val(),
            	rptVersion : $("#rptVersion").val()
            }                             
            ,contentType:'text/html;charset=utf-8'//编码格式   
            ,beforeSend:function(data){   
   
            }//发送请求前   
            ,success:function(data){     
            	jQuery('#rptId').validationEngine('showPrompt', data.success, 'pass') ;
            }//请求成功后   
            ,error:function(data){   
               
            }//请求错误   
        });
	});
	
	$("#upload").click(function(){
    	$.capFileUpload({
	        url: "webroot/fileUploadhandler/formImageUpload",
	        fileElementId: "ufile",
	        fileCheck: ["jpg", "jpeg", "png", "gif"],
	        //limitSize: 5 *1024*1024,
	        data: {
            	rptId : $("#rptId").val(),
            	rptVersion : $("#rptVersion").val()
	        },
	        success: function(data){
	            //showMess(data.mktMatlType, data.mktMatl, $("#showMessage"), data.size);
	            
	        	// 顯示底圖的縮圖
	        	var nocache = new Date();
	        	$('#formImage').attr("src","webroot/fileDownloadhandler/formImageDownload?"+nocache.getTime()+"&rptId="+$("#rptId").val()+"&rptVersion="+$("#rptVersion").val());
	        }
	    });
	});
	
	$(".multiselect").multiselect();
	
	//增加索引field
	$("#fieldAdd").click(function() {
		
		if($('input[name=fieldType]:checked').val()=='rpt'){
			//alert('rpt');
			setFieldByRptdata();
		}else if($('input[name=fieldType]:checked').val()=='tag'){
			if($("#fixedStr").val()==""){
				alert('請輸入固定字串!');
			}else{
				var rowIndex = $("#fieldData").jqGrid('getDataIDs').length;
				indexfields[rowIndex] = {
						items : rowIndex+1,
						name : 'field'+(rowIndex+1),
						sfixed : $("#fixedStr").val()
				};
				$('#fieldData').jqGrid('addRowData', rowIndex, indexfields[rowIndex]);
				$('#fieldData').trigger("reloadGrid");
				
				 //add index option
				 $("#indexSel").append('<option value="'+(rowIndex+1)+'">field'+(rowIndex+1)+'</option>');
			}
			
		}

		//clear input
		$("#lineCnt").val("");
		$("#startCnt").val("");
		$("#lenCnt").val("");
		$("#fixedStr").val("");
		 
	});
	
	$("#indexSel").change(function(){
		if($("#indexDef").val()==""){
			$("#indexDef").val($("#indexDef").val() + $("#indexSel option:selected").text());
		}else{
			$("#indexDef").val($("#indexDef").val()+","+ $("#indexSel option:selected").text());
		}
	});
	
	$("#indexAdd").click(function() {
		var rowIndex = $("#indexData").jqGrid('getDataIDs').length;
		fields[rowIndex] = {
				items : rowIndex+1,
				indexId : $("#indexId").val(),
				indexName : $("#indexName").val(),
				indexDef : $("#indexDef").val()
		};

		$('#indexData').jqGrid('addRowData', rowIndex, fields[rowIndex]);
		$('#indexData').trigger("reloadGrid");

		//clear input
		 $("#indexId").val("");
		 $("#indexName").val("");
		 $("#indexDef").val("");
	});
	
	var indexgridSelId;
	$("#indexUpdate").click(function() {
		if($("#indexId").val()!='' && $("#indexName").val()!=''){
			if($("#indexDef").val()!=''){
				indexgrid.setCell(indexgridSelId, 'indexDef', $("#indexDef").val());
				$("#indexId").val('');
				$("#indexName").val('');
				$("#indexDef").val('');
			}else{
				alert('請輸入所引內容!');
			}
			
		}else{
			alert('請先選取欲修改的index');
		}
		
	});
/*	
	$("#indexDel").click(function(){
        if (indexGrid.getSelRowDatas()) {
        	API.showConfirmMessage(i18n.def.actoin_001,function(data){
        		data &&  $.ajax({
                url: "webroot/services/codetypehandler/delete",
                data: {
                    oid: $("#oid").val()
                },
                success: function(){
                	indexGrid.trigger("reloadGrid");
                }
            });
        });
        }
        else {
            API.showErrorMessage(i18n.def.grid_selector);
        }
        
    });
*/	
	$("#pageAdd").click(function() {
		var rowIndex = $("#inputPageData").jqGrid('getDataIDs').length;
		fields[rowIndex] = {
				items : rowIndex+1,
				page : $("#pageCnt").val()
		};

		$('#inputPageData').jqGrid('addRowData', rowIndex, fields[rowIndex]);
		$('#inputPageData').trigger("reloadGrid");

		//clear input
		 $("#pageCnt").val("");
	});
	
	$("#imgUpload").click(function(){
    	$.capFileUpload({
	        url: "webroot/fileUploadhandler/formImageUpload",
	        fileElementId: "ufile",
	        fileCheck: ["jpg", "jpeg", "png", "gif"],
	        //limitSize: 5 *1024*1024,
	        data: {
            	rptId : $("#rptId").val(),
            	rptVersion : $("#rptVersion").val()
	        },
	        success: function(data){
	            //showMess(data.mktMatlType, data.mktMatl, $("#showMessage"), data.size);
	            
	        	// 顯示底圖的縮圖
	        	var nocache = new Date();
	        	$('#formImage').attr("src","webroot/fileDownloadhandler/formImageDownload?"+nocache.getTime()+"&rptId="+$("#rptId").val()+"&rptVersion="+$("#rptVersion").val());
	        }
	    });
	});
	
	$("#formFieldAdd").click(function() {
		if($("#formFieldId").val()!='' && $("#formFieldName").val()!=''){
			var rowIndex = $("#list").jqGrid('getDataIDs').length;

			fields[rowIndex] = {
					id : rowIndex+1,
					fid : $("#formFieldId").val(),
					fname: $("#formFieldName").val(),
					ftype: $("input[name='formFieldType']:checked").val(),
					flocation: "",
					fwidth: "",
					ftalign: "",
					line1Cnt: "",
					startPos: "",
					endPos: "",
			};

			$('#list').jqGrid('addRowData', rowIndex, fields[rowIndex]);
			$('#list').trigger("reloadGrid");

			//clear input
			 $("#formFieldId").val("");
			 $("#formFieldName").val("");
		}else{
			alert('請輸入欄位代號&名稱');
		}

	});
	
	
	//新增打開rowdata選取視窗
	var setFieldByRptdata=function(){
		//點兩下定義欄位資料
		$("#formDataArea div").remove();
		var plains = ['10710                                                                                   〔全國繳稅費測試資料〕委託授權明細報表測試資料',
					  ' 報表日期：2014/01/22                                                                                                                                           頁次：  1',
					  '0帳務代理行 委託單位 核印行  帳號             帳號ＩＤ   繳費類別 交易類別 資料來源 檔案批號 編碼年度 交易序號 委託單位提出日 ＭＥＭＯ   回覆訊息                       上傳日期         批號',
					  ' ==================================================================================================================================================================================================================',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' ==================================================================================================================================================================================================================',
					  ' 本頁筆數：       18筆',
					  ' 總計筆數：       18筆        待核印筆數：       17筆          失敗筆數：        1筆'];
		for ( var i = 0; i < plains.length; i++) {
			var lineDiv = $("<div id='line"+ i + "' class='pvPlainLine'></div>");
			$(lineDiv).html(plains[i]);
			$('#formDataArea').append(lineDiv);
		}
	    $('#form-data-editor').dialog("open");
	    $('#formDataArea').show();
	    
	};
	
	$('#fieldDataBtn').click(function() {
    	//alert('fieldDataBtn');
    	//var theField = $('#fieldDataSel').val();
        var theSel = findSelect();
        if(theSel.start==theSel.end){
            alert("請選擇欲標記範圍");
            return;
        }
        else if(!theSel.lineNum){
            alert("標記範圍與已設定欄位重疊");
            return;
        }
        /*
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
            
            //formDataArray[theField] = theSel;            
        }
        // 顯示在editor的bar上
        
        markText("pink");
        removeSelect();     
        */
        markText("yellow");
        
      //新增
        var realLineNo = parseInt(theSel.lineNum.replace("line","")) + 1;
        var rowIndex = fieldgrid.jqGrid('getDataIDs').length;
        //alert(realLineNo+','+rowIndex);
        indexfields[rowIndex] = {
				items : rowIndex+1,
				name : 'field'+(rowIndex+1),
				sline : '',
				slen : '',
				sstart : ''
		};
		
        
        $('#fieldData').jqGrid('addRowData', rowIndex, indexfields[rowIndex]);
		$('#fieldData').trigger("reloadGrid");
        
		//alert("realLineNo="+realLineNo+",rowIndex+1="+(rowIndex+1)+",theSel.start="+theSel.start);
		
		$('#fieldData').jqGrid("setCell", rowIndex, 2, realLineNo);
		//alert('');
		$('#fieldData').jqGrid("setCell", rowIndex, 3, theSel.start);
		$('#fieldData').jqGrid("setCell", rowIndex, 4, theSel.end);
        
		 //add index option
		 $("#indexSel").append('<option value="'+(rowIndex+1)+'">field'+(rowIndex+1)+'</option>');
    });
	
	
	$("#indexDel").click(function(){
		$("#indexDef").val("");
    });
	
	//隱碼設定畫面
	hiddenCodegrid= $("#hiddenCodeData").jqGrid({
		datatype : 'local',
		mtype : 'GET',
		colNames : [ '項次','欄位名稱','列數','起始位置','結束位置','欄位行數','欄位空行數' ],
		colModel : [ 
		    {name : 'items', index : 'items', width : 40, align : 'center'},
		    {name : 'name',index : 'name',width : 80, align : 'center'},
		    {name : 'sline',index : 'sline',width : 80, align : 'center'},
		    {name : 'sstart',index : 'sstart', width : 80, align : 'center'},
		    {name : 'slen',index : 'slen',width : 80, align : 'center'},
		    {name : 'nextSubItems',index : 'nextSubItems', width : 80, align : 'center'},
			{name : 'spaceRowCnt',index : 'spaceRowCnt', width : 80, align : 'center'}
		],
		onSelectRow : function(id) {
			selected = $(".ui-selected").each(function() {
				var el = $(this);
				el.removeClass("ui-selected");
			});
			$('#id' + id).click();
		},
		//height : 80
	}).addGridData([
	                ["1", "hiden1","2","11","13",""],
					["2", "hiden2","2","14","16",""],
					["3", "hiden3","5","5","8",""],
				
	                
	]);	

	//增加隱碼定位資料
	$("#hiddenCodeAdd").click(function() {
		

		setHiddenCodeByRptdata();

		
		//clear input
		$("#lineCnt").val("");
		$("#startCnt").val("");
		$("#lenCnt").val("");
		$("#fixedStr").val("");
		 
	});
	
	
	var setHiddenCodeByRptdata=function(){
		//點兩下定義欄位資料
		$("#hiddenCodeDataArea div").remove();
		var plains = ['10710                                                                                   〔全國繳稅費測試資料〕委託授權明細報表測試資料',
					  ' 報表日期：2014/01/22                                                                                                                                           頁次：  1',
					  '0帳務代理行 委託單位 核印行  帳號             帳號ＩＤ   繳費類別 交易類別 資料來源 檔案批號 編碼年度 交易序號 委託單位提出日 ＭＥＭＯ   回覆訊息                       上傳日期         批號',
					  ' ==================================================================================================================================================================================================================',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' ==================================================================================================================================================================================================================',
					  ' 本頁筆數：       18筆',
					  ' 總計筆數：       18筆        待核印筆數：       17筆          失敗筆數：        1筆'];
		for ( var i = 0; i < plains.length; i++) {
			var lineDiv = $("<div id='line"+ i + "' class='pvPlainLine'></div>");
			$(lineDiv).html(plains[i]);
			$('#hiddenCodeDataArea').append(lineDiv);
		}
	    $('#hiddenCode-data-editor').dialog("open");
	    $('#hiddenCodeDataArea').show();
	    
	};
	
		//新增打開rowdata選取視窗
	var setFieldByRptdata=function(){
		//點兩下定義欄位資料
		$("#formDataArea div").remove();
		var plains = ['10710                                                                                   〔全國繳稅費測試資料〕委託授權明細報表測試資料',
					  ' 報表日期：2014/01/22                                                                                                                                           頁次：  1',
					  '0帳務代理行 委託單位 核印行  帳號             帳號ＩＤ   繳費類別 交易類別 資料來源 檔案批號 編碼年度 交易序號 委託單位提出日 ＭＥＭＯ   回覆訊息                       上傳日期         批號',
					  ' ==================================================================================================================================================================================================================',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' 0050594    11112222 001     0000999999999999 A999999999 00011    1-新增   1-整批   10301281 103      2222005  1030125        000098991+ 00 待核印                       20140129     2014012811111111AAAA0006F',
					  ' ==================================================================================================================================================================================================================',
					  ' 本頁筆數：       18筆',
					  ' 總計筆數：       18筆        待核印筆數：       17筆          失敗筆數：        1筆'];
		for ( var i = 0; i < plains.length; i++) {
			var lineDiv = $("<div id='line"+ i + "' class='pvPlainLine'></div>");
			$(lineDiv).html(plains[i]);
			$('#formDataArea').append(lineDiv);
		}
	    $('#form-data-editor').dialog("open");
	    $('#formDataArea').show();
	    
	};
	
	$('#hiddenCodeDataBtn').click(function() {
    	//alert('hiddenCodeDataBtn');
    	//var theField = $('#hiddenCodefieldDataSel').val();
        var theSel = findSelect();
        if(theSel.start==theSel.end){
            alert("請選擇欲標記範圍");
            return;
        }
        else if(!theSel.lineNum){
            alert("標記範圍與已設定欄位重疊");
            return;
        }
        /*
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
            
            //formDataArray[theField] = theSel;            
        }
        // 顯示在editor的bar上
        
        markText("pink");
        removeSelect();     
        */
        markText("yellow");
        
      //新增
        var realLineNo = parseInt(theSel.lineNum.replace("line","")) + 1;
        var rowIndex = hiddenCodegrid.jqGrid('getDataIDs').length;
        //alert(realLineNo+','+rowIndex);
        indexfields[rowIndex] = {
				items : rowIndex+1,
				name : 'field'+(rowIndex+1),
				sline : '',
				slen : '',
				sstart : '',
				nextSubItems : '1',
				spaceRowCnt : '0'
		};
		
        
        $('#hiddenCodeData').jqGrid('addRowData', rowIndex, indexfields[rowIndex]);
		$('#hiddenCodeData').trigger("reloadGrid");
        
		//alert("realLineNo="+realLineNo+",rowIndex+1="+(rowIndex+1)+",theSel.start="+theSel.start);
		
		$('#hiddenCodeData').jqGrid("setCell", rowIndex, 2, realLineNo);
		//alert('');
		$('#hiddenCodeData').jqGrid("setCell", rowIndex, 3, theSel.start);
		$('#hiddenCodeData').jqGrid("setCell", rowIndex, 4, theSel.end);
        
		 //add index option
		 //$("#indexSel").append('<option value="'+(rowIndex+1)+'">field'+(rowIndex+1)+'</option>');
    });
	
});