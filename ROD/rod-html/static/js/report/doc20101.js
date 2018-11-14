var rowData;
$(document).ready(function(){
    var grid, mform = $("#mform");
    grid = $("#gridview").jqGrid({
    	localFirst: true,multiselect: false,height: 550,
    	sortname: 'rptId',sortorder: "desc",
        colModel: [
        {header: '報表代號',name: 'rptId',width: 40,align: "center"} , 
        {header: '報表名稱',name: 'rptName',width: 100,align: "left"},
        {header: '報表日期', name: 'rptDate',width: 40,align: "center"},
        {header: '序號',name: 'rptSeqno',width: 20,align: "right"}, 
        {header: '業管單位',name: 'rptMaterDept',width: 40,align: "center"}, 
        {header: '必印',name: 'rptMust',width: 30,align: "center"}, 
        {header: '收檔日期',name: 'rptReceiveDate',width: 55,align: "center"},
        {header: '收檔時間',name: 'rptReceiveTime',width: 55,align: "center"},
        {header: '報表類型',name: 'rptMode',width: 55,align: "center", hidden:true}],
        ondblClickRow: function(rowid, iRow, iCol, e){
        	//根據選取的row來查找報表
        	rptData = JSON.stringify(grid.getRowData(rowid));
        	//重新回到第一頁
        	targetPage = 1;
        	openRptInNewTab(rptData);
        	
        }
    }).addGridData([
            [ "AR01N","月計表", "2013-01-09","1", "財務會計部","Y","2013-01-08","01:30","0"],
            [ "AR13","損益月報", "2013-01-09","1", "財務會計部","N","2013-01-08","01:40","1"],
			[ "DR06","主要業務概況月報表", "2013-01-09","1", "財務會計部","N","2013-01-08","01:40","0"]   
   	]);
    
    var qDialog = $("#qryDailog");
	qDialog.dialog({ //查詢畫面
    	height: 320,width: 450,modal: true,
    	buttons:API.createJSON([{
    		key:i18n.def.sure,
    		value:function(){
    			qDialog.dialog('close');
    		}
    	},{
    		key:i18n.def.close,
    		value:function(){
    			qDialog.dialog('close');
    		}
    	}])
    });
	$("#query").click(function(){
		var today = new Date();
		var t_date = today.getDate();
		var t_month = today.getMonth()+1;
		var t_year = today.getFullYear();
		
		var yesterday = new Date();		
		var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
		var y_date = yesterday.getDate();
		var y_month = yesterday.getMonth()+1;
		var y_year = yesterday.getFullYear();

		$("#rptDateBegin").val(y_year + "-" + y_month + "-" + y_date);				
		$("#rptDateEnd").val(t_year + "-" + t_month + "-" + t_date);
		qDialog.dialog('open');
    }).trigger('click');
	
	//Web Base : 開啟報表viewer於新tab
    var popup;
    var openRptInNewTab = function(rptData){
    	rowData = rptData;
    	popup = window.open("doc20102.html","_blank");
    };
    
    
});



