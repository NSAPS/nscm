
// ��ȸ
GoSearch = function() {

	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.insel_fr_yyyy.value +document.frm.insel_fr_mm.value + "01" + "!%!"
						+document.frm.insel_to_yyyy.value+document.frm.insel_to_mm.value + "01" +"!%!"
						+"M";

	if(document.frm.insel_sel_gubn.value == "20" ) {
		alert("��۰ŷ��� ��ȸ�� 3~5������ �ҿ�˴ϴ�!")
	}

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
				alert("�Ⱓ�� 12���� ���Ϸθ� �����մϴ�.");
				return;
			}
			else if (check_return == -9){
				alert("��¥ �����Դϴ�");
				return;
			}
			// ��ȸ�� WAITING �̹��� �����ֱ�
			viewWait();
		
			document.frm._moon_service.value = "rp_08010_DC_InOut_Volumn_list"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};


