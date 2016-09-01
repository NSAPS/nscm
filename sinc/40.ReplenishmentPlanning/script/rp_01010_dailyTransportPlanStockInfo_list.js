////////////////////////////////////////////////////////////
// 프로그램ID : rp_01010_dailyTransportPlanStockInfo_list.js
// 프로그램명 : 수송계획조회 및 조정 (재고 조회)
// 개발자  : 허준성
// 개발일자 : 2008-11-25 화요일
//
//관련 job file : job_sinc_40_replenishmentPlanning.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-25  허준성     rp_01010_dailyTransportPlanStockInfo_list.js 개발
//
//
////////////////////////////////////////////////////////////

// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
	
	var list = data.split("!%!");
	var item_id = list[0];
	var item_name = list[1];
	
	//alert(item_id +" "+item_name);
	//alert(parent.clickedLineIdx);
	if(parent.clickedLineIdx == null || parent.clickedLineIdx == "") {
		if(parent.clickedLineIdx != 0){
			alert("먼저 원하시는 번호를 클릭하여 주십시요.");
			return;
		}
	}
	
	// 선택된 초록색 Row 밑에 새로운 Row를 추가하는 부분.
	parent.memCheckRow(parent.clickedLineIdx);
	parent.addRowByIndex(parent.clickedLineIdx+1);
	parent.setParentValueRow(parent.clickedLineIdx+1, item_id, item_name);

}
