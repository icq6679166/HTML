/**
 * 
 * @param id : Div's id
 * @returns
 */
var customCombobox = function(id, length){
	var comboInputId="combo_input_"+id;
	var comboBtnId="combo_btn_"+id;
	var comboListId="combo_list_"+id;
	var comboInputHtml = "<input id='"+comboInputId+"' name='"+comboInputId+"' type='text' size='"+length+"' />"
	var comboBtHtml = "<a id='"+comboBtnId+"' name='"+comboBtnId+"' href='#'>ALL</a>"
	$("#"+id).html(comboInputHtml+comboBtHtml);
	
	
	//generate list
	var comboListLeft = $("#"+comboInputId).position().left;
	var comboListTop = ($("#"+comboInputId).position().top+$("#"+comboInputId).height()+5);
	var comboListHtml = "<div id='"+comboListId+"' name='"+comboListId+"' style='position: absolute; left:"+comboListLeft+"px; top:"+comboListTop+"px;z-index:8000;'>" +
						"<ul class='comboList'>"+
						"<li><a href='#'>100%</a></li>"+
						"<li><a href='#'>80%</a></li>"+
						"</ul>"+
						"</div>";
	$("#"+id).append(comboListHtml);
}