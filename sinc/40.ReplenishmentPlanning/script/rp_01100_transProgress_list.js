////////////////////////////////////////////////////////////
// 프로그램ID : rp_01100_transProgress_list.js
// 프로그램명 : 수송진행현황
// 개발자  : 허준성
// 개발일자 : 2008-09-08 월요일
//
//관련 job file : job_sinc_40_replenishmentPlanning_00.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-09-08  허준성     rp_01100_transProgress_list.js 개발
//
//
////////////////////////////////////////////////////////////

// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
	
	if(col > 2) return;

	// WAITING 이미지 보여주기
	childViewWait();
	
	var plan_type = document.frm.selected_plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	var urlStr = "service.do?_moon_service=rp_01100_transProgressBrandDetail_list";
	
	var src_loc = data.split("!%!")[0];	 
	
	urlStr += "&src_loc=" + src_loc;		
	urlStr += "&plan_type=" + plan_type;
	urlStr += "&trans_start=" + trans_start;
	urlStr += "&trans_end=" + trans_end;
	
	
	
	gridDetailInfo.location.href = urlStr;
		
}

// 조회 시 waiting 이미지 보여주기
function childViewWait() { 
	
	if( gridDetailInfo.document.all.waitArea ) {
		if( gridDetailInfo.waitArea.style.display.toUpperCase() == "NONE" ) {
			gridDetailInfo.gridArea.style.display = "none";
			gridDetailInfo.waitArea.style.display = "block";
		}
		else {
			gridDetailInfo.gridArea.style.display = "block";
			gridDetailInfo.waitArea.style.display = "none";
		}
	}
	
}