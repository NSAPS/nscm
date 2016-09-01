////////////////////////////////////////////////////////////
// 프로그램ID : rp_01100_transProgressBrandDetail_list.js
// 프로그램명 : 수송진행현황 (brand detail)
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
// 1.0        2008-09-08  허준성     rp_01100_transProgressBrandDetail_list.js 개발
//
//
////////////////////////////////////////////////////////////

// IFRAME Grid 화면 resizing
// grid_h : grid height ( 실제 grid 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 grid 높이가 커짐 ) 
function setGridAutoResizeIframe( grid_h ){
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var gridHeightValue = Number(maxHeightValue) - Number(grid_h) ;
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( gridHeightValue < 1 ) 
		gridHeightValue = 1;
	
	document.grid.height = gridHeightValue + "px"; 
}

// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
	
	if(col != 4) return;
	
	childViewWait();
	
	var plan_type = document.frm.plan_type.value;
	var src_loc = document.frm.src_loc.value;
	
	var urlStr = "service.do?_moon_service=rp_01100_transProgressItemDetail_list";
	
	var order_date = data.split("!%!")[0];	 
	var tgt_loc		= data.split("!%!")[1];
	//var delv_order = data.split("!%!")[2];
	var brand_no   = data.split("!%!")[3];
	
	urlStr += "&order_date=" + order_date;
	urlStr += "&tgt_loc=" + tgt_loc;
	urlStr += "&src_loc=" + src_loc;	
	urlStr += "&brand_no=" + brand_no;
	//urlStr += "&delv_order=" + delv_order;	
	urlStr += "&plan_type=" + plan_type;
	
	gridDetailInfo1.location.href = urlStr;
		
}

// 조회 시 waiting 이미지 보여주기
function childViewWait() { 
	
	if( gridDetailInfo1.document.all.waitArea ) {
		if( gridDetailInfo1.waitArea.style.display.toUpperCase() == "NONE" ) {
			gridDetailInfo1.gridArea.style.display = "none";
			gridDetailInfo1.waitArea.style.display = "block";
		}
		else {
			gridDetailInfo1.gridArea.style.display = "block";
			gridDetailInfo1.waitArea.style.display = "none";
		}
	}
	
}