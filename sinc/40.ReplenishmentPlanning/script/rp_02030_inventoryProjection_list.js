////////////////////////////////////////////////////////////
// 프로그램ID : rp_02030_inventoryProjection_list.js
// 프로그램명 : 예상재고 현황
// 개발자  : 허준성
// 개발일자 : 2008-08-12 화요일
//
//관련 job file : job_sinc_40_replenishmentPlanning_00.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-12  허준성     rp_02030_inventoryProjection_list.js 개발
//
//
////////////////////////////////////////////////////////////

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}