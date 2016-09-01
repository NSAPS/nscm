////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01100_transProgress_list.js
// ���α׷��� : ����������Ȳ
// ������  : ���ؼ�
// �������� : 2008-09-08 ������
//
//���� job file : job_sinc_40_replenishmentPlanning_00.xml
//
//���� query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-09-08  ���ؼ�     rp_01100_transProgress_list.js ����
//
//
////////////////////////////////////////////////////////////

// ���� Ŭ�� : ������(�ϴ� iframe)
function onclickfunc(row, col, data) {
	
	if(col > 2) return;

	// WAITING �̹��� �����ֱ�
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

// ��ȸ �� waiting �̹��� �����ֱ�
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