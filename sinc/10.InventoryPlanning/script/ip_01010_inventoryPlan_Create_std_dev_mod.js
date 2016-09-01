function	Create_StdDev(){

	if(confirm("재고정책 기초정보를 새로 생성하시겠습니까?!") == 1 ) {

		// 조회시 WAITING 이미지 보여주기
		
		viewWait();
		document.frm._moon_service.value = "ip_01010_SP_inventoryPlan_Create_std_dev_comp"; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
		
	}
}

