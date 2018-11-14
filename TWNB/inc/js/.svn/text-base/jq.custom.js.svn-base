// 信用卡申請表格下載 radio checked Change

$(function () {  
	
	// 修復IE會等到核取方塊失去焦點之後才會觸發change事件
    if ($.browser.msie) {   
        $('input:checkbox').click(function () {   
            this.blur();   
            this.focus();   
        });   
    }   

	$("#bussi_tb").hide();

	$("input[name=rad1]:radio").change(function() {
		if ($("input:radio[id=bussicard]").is(":checked")) {
			$("#bussi_tb").show();
			$("#default_tb").hide();
			return false;
		}
		else {
			$("#bussi_tb").hide();
			$("#default_tb").show();
			return false;
		}
	});
});