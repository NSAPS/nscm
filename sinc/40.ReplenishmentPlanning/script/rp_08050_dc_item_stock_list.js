//## ���α׷�ID      : rp_08050_dc_item_stock_list.vm
//## ���α׷���      : ��� ��ǰ ��� ��ȸ
//## ������          : �̰���
//## ��������        : 2014-04-11
//##
//## ���� job file   : job_sinc_40_replenishmentPlanning_03.xml
//## ���� query file : query_sinc_40_replenishmentPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-04-11  �̰���      �ű�
//##
//############################################################
function setGridAutoResize2( tab_h, table_h ){
	
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
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
} 

function checkItemId() {
	
	var item_id	= document.all.item_id.value;

	if (item_id == "" || item_id == null)
	{
		alert("��ǰ��ȣ�� �Է����ּ���");
				}
	else {
	GoSearch('rp_08050_dc_item_stock_list');
		}
	
}

function getItemName(objBox) {

	

	if( objBox.value == "" || objBox.value == null ) {

		document.frm.item_name.value = "";

		return;

	}

	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 

		callback:function(arrList){

			// ��ġ�ϴ� ��ǰ ����

			if( arrList.length == 1 ) {

				objBox.value = arrList[0][0];

				document.frm.item_name.value = arrList[0][1];

			}

			else if( arrList.length > 1){							

				document.frm.item_name.value = "";

			}

			else {

				return;

			}

		}

	});

	

}
