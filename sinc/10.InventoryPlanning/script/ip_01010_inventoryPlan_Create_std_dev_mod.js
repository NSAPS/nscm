function	Create_StdDev(){

	if(confirm("�����å ���������� ���� �����Ͻðڽ��ϱ�?!") == 1 ) {

		// ��ȸ�� WAITING �̹��� �����ֱ�
		
		viewWait();
		document.frm._moon_service.value = "ip_01010_SP_inventoryPlan_Create_std_dev_comp"; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
		
	}
}

