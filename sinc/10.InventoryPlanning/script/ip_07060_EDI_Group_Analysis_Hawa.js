//############################################################
//## ���α׷�ID      : ip_07060_EDI_Group_Analysis_Hawa.vm
//## ���α׷���      : ���ں� ���뺻�κ� EDI������ȸ
//## ������          : ������
//## ��������        : 2010-08-05
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-08-05  ������      create
//##
//############################################################
// ��ȸ
GoSearch = function() {

	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+"D";

	// ��¥�Ⱓ ���Ἲ check
	commonUtil.getCodeInfo(in_sel_name,in_sel_value,"ip_06010_TERM_CHECK", { 
		callback:function(arrList){
			var check_return = -9;
			if( arrList.length == 1 ) {
				var check_return = arrList[0][0];
			}
			
			if (check_return == -1){
				alert("�������� �����Ϻ��� �����ϴ�!");
				return;
			}
			else if (check_return == -2){
				alert("31�� �̳��θ� ��ȸ�˴ϴ�");
				return;
			}
			else if (check_return == -9){
				alert("��¥ �����Դϴ�");
				return;
			}
		
			// ��ȸ�� WAITING �̹��� �����ֱ�
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // ��ȸ��ư���� ��ȸ�ÿ��� ������ ù�������̴�!
			document.frm._moon_service.value = "ip_07060_EDI_Group_Analysis_Hawa"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};

// ���� Ŭ�� : ����ȸȭ�� popup
function onclickfunc(row, col, data) {
	
	var in_cnfm_date = data.split("!%!")[0];
	in_cnfm_date = in_cnfm_date.replace("-","").replace("-","").substr(0,8);
	
	var service_url = "service.do?_moon_service=ip_07060_EDI_Group_Item_Detail_Popup";
	service_url += "&in_cnfm_date=" + in_cnfm_date + "&in_input_gubn=" + document.frm.in_input_gubn.value;
	service_url += "&in_sell_gubn=" + document.frm.in_sell_gubn.value + "&in_qty_gubn=" + document.frm.in_qty_gubn.value;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1260, height=470, top=0, left=0";
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
}