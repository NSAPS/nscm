// ���� Ŭ�� : �� �˾� ����ȸ - 3�����,1�����,3+1�����/2
function refresh(week_flag) {
	
	var item_id = document.frm.item_id.value;
	var	item_name = document.frm.item_name.value;
	var simul_data = document.frm.simul_data.value;
	var week_flag	= week_flag;

	//Simulation �� ��� simul_data �ʼ�
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation�� ���� �Է����ֽʽÿ�!"); 
			document.frm.simul_data.select();
			return;
		}
	}



	//alert(document.frm.week_flag.value);
	
	var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data=" + simul_data;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=330, top=200, left=200";
	//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}