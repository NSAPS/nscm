////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01010_dailyTransportPlanStockInfo_list.js
// ���α׷��� : ���۰�ȹ��ȸ �� ���� (��� ��ȸ)
// ������  : ���ؼ�
// �������� : 2008-11-25 ȭ����
//
//���� job file : job_sinc_40_replenishmentPlanning.xml
//
//���� query file : query_sinc_40_replenishmentPlanning.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-25  ���ؼ�     rp_01010_dailyTransportPlanStockInfo_list.js ����
//
//
////////////////////////////////////////////////////////////

// ���� Ŭ�� : ������(�ϴ� iframe)
function onclickfunc(row, col, data) {
	
	var list = data.split("!%!");
	var item_id = list[0];
	var item_name = list[1];
	
	//alert(item_id +" "+item_name);
	//alert(parent.clickedLineIdx);
	if(parent.clickedLineIdx == null || parent.clickedLineIdx == "") {
		if(parent.clickedLineIdx != 0){
			alert("���� ���Ͻô� ��ȣ�� Ŭ���Ͽ� �ֽʽÿ�.");
			return;
		}
	}
	
	// ���õ� �ʷϻ� Row �ؿ� ���ο� Row�� �߰��ϴ� �κ�.
	parent.memCheckRow(parent.clickedLineIdx);
	parent.addRowByIndex(parent.clickedLineIdx+1);
	parent.setParentValueRow(parent.clickedLineIdx+1, item_id, item_name);

}
