////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01100_transProgressBrandDetail_list.js
// ���α׷��� : ����������Ȳ (brand detail)
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
// 1.0        2008-09-08  ���ؼ�     rp_01100_transProgressBrandDetail_list.js ����
//
//
////////////////////////////////////////////////////////////

// IFRAME Grid ȭ�� resizing
// grid_h : grid height ( ���� grid �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� grid ���̰� Ŀ�� ) 
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( gridHeightValue < 1 ) 
		gridHeightValue = 1;
	
	document.grid.height = gridHeightValue + "px"; 
}

// ���� Ŭ�� : ������(�ϴ� iframe)
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

// ��ȸ �� waiting �̹��� �����ֱ�
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