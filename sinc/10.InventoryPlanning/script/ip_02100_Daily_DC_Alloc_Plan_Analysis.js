function onclickfunc(row, col, data) {

	if(col < 2) return;
	
	if(data == null || data == "") return;
	
	var in_item_id = data.split("!%!")[0];
	
	var in_cnfm_date;
	commonUtil.toDate(document.frm.in_fr_date.value,'YYYY-MM-DD','DAY',col - 3, { 
		callback:function(result){
		in_cnfm_date =  	result;
		
		commonUtil.getSelQeury("in_item_id!%!in_cnfm_date", in_item_id+"!%!"+in_cnfm_date, "ip_02100_Daily_DC_Alloc_Plan_Analysis_detail", { 
			callback:function(arrList){
				// ��ġ�ϴ� CODE ����
				if( arrList.length == 1 ) {
					alert(	"�����Ҵ����   : " + arrList[0][0]+"\n"+
							"�����Ҵ����   : " + arrList[0][1]+"\n"+
							"�����Ҵ�޼��� : " + arrList[0][2]+"\n"+
							"�����Ҵ緮     : " + arrList[0][3]+"\n"+
							"�ֹ�(����)��   : " + arrList[0][4]+"\n"+
							"��ȭ��(%)       : " + arrList[0][5]);
				}
				else {
					alert("�����Ҵ������� ���� �ʽ��ϴ�!");
				}
			}
			});
		
		
		}
		});
			
}

// ��ȸ
GoSearch = function() {

	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = document.frm.in_fr_date.value +"!%!"+document.frm.in_to_date.value+"!%!"
						+'D';

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
				alert("���ں��� 31�Ϸθ� ��ȸ�˴ϴ�");
				return;
			}
			else if (check_return == -9){
				alert("��¥ �����Դϴ�");
				return;
			}
		
			// ��ȸ�� WAITING �̹��� �����ֱ�
			viewWait();
			
			document.frm._moon_pagenumber.value = 1; // ��ȸ��ư���� ��ȸ�ÿ��� ������ ù�������̴�!
			document.frm._moon_service.value = "ip_02100_Daily_DC_Alloc_Plan_Analysis"; 
			document.frm.action = "service.do";
			document.frm.target = "_self";
			document.frm.submit();	

		}
	});
	
};



