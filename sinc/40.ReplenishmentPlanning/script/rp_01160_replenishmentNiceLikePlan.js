//############################################################
//## ���α׷�ID 	: rp_01160_replenishmentNiceLikePlan.js
//## ���α׷��� 	: �ڵ����ް�ȹ
//## ������  	: ������
//## �������� 	: 2009-11-19
//##
//## ���� job file 	 : 
//##
//## ���� query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-11-19  ������     rp_01160_replenishmentNiceLikePlan.js ����
//##
//## 2.0		2010-05-12  ������	  ���� ������ �����ϴ� �λ����� ���淮�� ������ �ʵ��� 
//##									���´�. 
//##								  ord_no�� '7'�� �Űܼ� ���� ���ܵǵ��� �ϰ� ���߿� ���ͽ�Ų��.
//##									�λ��ۿܿ� �߰��Ϸ��� if���� �߰���Ű�� �ȴ�.
//## 3.0		2010-08-23  ������	  ������/�λ�� �Ҵ緮 ���� �ش�ǿ� ��������� �ƴѰ��� ord_no�� '7'���� �����ϰ� ���߿� �����Ѵ�.
//##			
//## 3.1		2010-09-07  ������	  ����ϼ� ����ȭ�� ���� DO WHILE������ ����� �ݺ��Ѵ�.
//## 3.2		2012-01-03  ������	  �ǸŰ�ȹ�÷� ����, ��������� �÷� �ǵ� --> �̽¿��û
//## 3.3		2014-09-26  �̰���	  �̺�Ʈ ���� ��� �߰� -->�̽¿� ��û
//## 3.4		2016-09-06  ������    �ŷ�ó�� ����/CDC�հ�/RDC�հ� ����
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;													// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// ���� ��Ű��(class ���� ���)
var job_id = 'rp_01160_replenishmentNiceLikePlan';				// job id(���� ��, WiseGrid Header key)
var GridObj ; 												// WiseGrid ��ü
var GridObj2;

var color_tot = '224|224|224';
var color_edit_col = '255|253|208';

var oldRow = 0;

var rFirst = 0;


/*function check_status(){
	alert("check_select_DW1 = " + check_select_DW1 + "\n" +
	"check_select_DW2 = " + check_select_DW2 + "\n" +
	"check_select_DW3 = " + check_select_DW3 + "\n" +
	"check_save_DW1 = " + check_save_DW1 + "\n" +
	"check_save_DW2 = " + check_save_DW2 + "\n" +
	"check_save_DW3 = " + check_save_DW3 + "\n");
}
*/
/******************************************          Action Function         **********************************************/
/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
function GoSearch(service) {
	

	var versions_seq = document.frm.plan_version.value;
	if( versions_seq == "" || versions_seq == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( document.frm.trans_start.value == "" || document.frm.trans_start.value == null ) {
		alert("�������ڸ� �Է��Ͽ� �ֽʽÿ�.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("��ǰ�ڵ带 �Է��Ͽ� �ֽʽÿ�.");
		return;
	}

	if(check_select_DW1||check_select_DW2||check_select_DW3||check_save_DW1||check_save_DW2||check_save_DW3) {
		alert("��ȸ�۾����Դϴ�(GoSearch)! �Ϸ���� �ٽ��ϼ���!");
		return;
	}
	check_select_DW1 = true;
	check_select_DW2 = true;
	check_select_DW3 = true;
			
	var verArr = versions_seq.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	rFirst = 0;
	// ���� ��ȸ�� version,��������,ǰ�� ����
	document.frm.curr_item_id.value 	= document.frm.item_id.value;
	document.frm.curr_version.value 	= document.frm.version.value;
	document.frm.curr_trans_start.value = document.frm.trans_start.value;
	
	// ȭ�� �ʱ�ȭ
	document.frm.confirm_qty.value = "";
	document.frm.in_sort_key.value = "ROWNUM";
	document.frm.chk_sort_descend.checked = false;
	
	// FERT�� HAWA���ο� ���� �޶��� �� �����Ƿ� �ٽ� BOUND�Ѵ�.
	//GridObj2.ClearGrid();
	//setHeader2();
	
	doQuery();
	//doQuery2();  dwr�� ����ϹǷ� setHeader2 �ȿ��� ȣ���ؾ� �Ѵ�.
	//doQuery3();

//	document.frm.btnReg.disabled = false;
	
};

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function GoSave() {

	if(check_select_DW1||check_select_DW2||check_select_DW3) {
		alert("��ȸ�۾����Դϴ�(GoSave)! �Ϸ���� �ٽ��ϼ���!");
		return;
	}
	
	if(check_save_DW1||check_save_DW2||check_save_DW3) {
		alert("�����۾����Դϴ�(GoSave)! �Ϸ���� �ٽ��ϼ���!");
		return;
	}
	
	var version 	 	 = document.frm.version.value;
	var seq 		 	 = document.frm.seq.value;
	var trans_date   	 = document.frm.trans_start.value;
	var item_id 		 = document.frm.item_id.value;
	var scm_charge		 = document.frm.scm_charge.value;
	var curr_item_id 	 = document.frm.curr_item_id.value;
	var curr_version 	 = document.frm.curr_version.value;
	var curr_trans_start = document.frm.curr_trans_start.value;
	var frc_qty 		 = document.frm.frc_qty.value;		// ����� ������ //
	
	// ����, ������ �������� ���� ���
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	if( trans_date == null || trans_date == ""){
		alert("�������ڸ� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("��ǰ �ڵ带 ���� �Է��ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}

	if( version != curr_version){
		alert("�����Ϸ��� version�� ���� �۾��� version�� �ٸ��ϴ�. ��ȸ�� �ٽ��Ͻʽÿ�.");
		return;
	}	

	if( trans_date != curr_trans_start){
		alert("�����Ϸ��� �������ڰ� ���� �۾��� �������ڿ� �ٸ��ϴ�. ��ȸ�� �ٽ��Ͻʽÿ�.");
		return;
	}	

	if( item_id != curr_item_id){
		alert("�����Ϸ��� ǰ���� ���� �۾��� ǰ��� �ٸ��ϴ�. ��ȸ�� �ٽ��Ͻʽÿ�.");
		return;
	}	

	// �ű� ��ǰ�� �����Ҵ� �۾��� �ؾ��� ��� ������ ����Ѵ�.
	if(GridObj.GetRowCount( ) == 0 && GridObj2.GetRowCount( ) == 0){
		doSave_DW3(document.frm.item_id.value);
		return;
	}
	
	var tot_require_qty=0;
	var ord_no;
	var src_loc;
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);  //
		src_loc 	= GridObj.GetCellValue("SRC_LOC", i);  //
		// ����ڰ� CDC���� ������ ������ �ջ����� �ʰ� ���Ѵ�.
		if((ord_no == "2" || ord_no == "4") && (src_loc != null || src_loc != "")) {
			tot_require_qty = tot_require_qty + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
		}
	}
	if(GridObj2.GetRowCount() > 0) {
		var confirm_trans_qty = strToNum(GridObj2.GetSummaryBarValue('SUMMARY1','TRANS_QTY',0,true));
	}
	else {
		var confirm_trans_qty = 0;
	}
	

// ��ȹ������ �� �� �ֵ��� ���Ҵ�.
//	if(confirm_trans_qty <= 0) {
//		alert("���Ȯ������ �����ϴ�! Ȯ���� �ٽ� �����ϼ���!");
//		return;
//	}

//	if(tot_require_qty <= 0) {
//		alert("����䱸���� �����ϴ�! Ȯ���� �ٽ� �����ϼ���!");
//		return;
//	}

	// 1. DW2���� Ȯ���� �ѷ��� ����䱸���� ���ؼ� �� ū �ڽ��� �����Ϸ��� �Ҷ��� Ȯ�� �޼����� ǥ���Ѵ�.
	if(tot_require_qty > confirm_trans_qty) { 
		alert("���Ȯ����("+numberFormat(confirm_trans_qty)+")���� ����䱸��("+numberFormat(tot_require_qty)+")�� Ů�ϴ�! \n ������ �ٽ� �����ϼ���!");
		return;
	}

//	document.frm.btnReg.disabled = true;

	doSave_DW2(version, seq, trans_date, item_id);
		
};

function doChange2(obj){
	
	var scm_charge  = obj.value;
	var version 	= document.frm.version.value;
	var trans_date  = document.frm.trans_start.value;
	var in_div;
	
	
	commonUtil.getSelQeury("scm_charge!%!version!%!trans_date",scm_charge+"!%!"+version+"!%!"+trans_date,"rp_01160_replenishmentNiceLikePlan_ITEM_LIST", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"item_id\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			//in_div +=	"<option value="+arrList[i][0]+">"+arrList[i][1]+"</option>";
			in_div +=	"<option value="+arrList[i][0];
			if(arrList[i][6] == "1") { // ��ȹ ���� ǰ��
				in_div += " style=\"background-color:#ffffaa; \"";
			}
			
			// ����� combo-list�� refresh�Ǹ鼭 �����ߴ� ǰ���� �ٽ� �����ϵ��� �Ѵ�.
			if(document.frm.item_id.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][1]+"</option>";
			
		}	
		in_div += "</select> \n";
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<input type=\"hidden\" name=\"item_cnt_info\" value="+arrList[i][2]+">";
			in_div +=	"<input type=\"hidden\" name=\"box_per_palet_cnt\" value="+arrList[i][3]+">";
			in_div +=	"<input type=\"hidden\" name=\"itype_cnt\" value="+arrList[i][4]+">";
			in_div +=	"<input type=\"hidden\" name=\"cd_gubn_cnt\" value="+arrList[i][5]+">";
		}	

		divItemCombo.innerHTML = in_div;
		// ǰ��cnt������ �����Ѵ�.
		document.frm.item_info.value 	 = arrList[selected_row][2];
		document.frm.box_per_palet.value = arrList[selected_row][3];
		document.frm.itype.value 		 = arrList[selected_row][4];
		document.frm.cd_gubn.value 	 	 = arrList[selected_row][5];

		document.frm.item_id.focus(); 
		
		doChange4();
	}
	});
}

function doChange3(obj){
	document.frm.item_info.value 		= document.frm.item_cnt_info[obj.options.selectedIndex].value;	
	document.frm.box_per_palet.value 	= document.frm.box_per_palet_cnt[obj.options.selectedIndex].value;	
	document.frm.itype.value 			= document.frm.itype_cnt[obj.options.selectedIndex].value;	
	document.frm.cd_gubn.value 			= document.frm.cd_gubn_cnt[obj.options.selectedIndex].value;
	
	doChange4();
}

function doChange4(){

	var version 	= document.frm.version.value;
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "version!%!item_id", version+"!%!"+item_id, "rp_01160_get_Leading_Indicator_qty",{
		callback:function(result){

	 		document.frm.ld_idc.value = numberFormat(result[0][0]);
	
		}
	});   
}


// ���ڿ� �Է¹���
function checkForNumber(obj) {
	var key = event.keyCode;
	
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.confirm_qty) {
			Do_DC_Allocate(obj);
		}
	}
}

var ctrl_keydown = false;
// ��ǰ���� 'Q'�Է½�  ��ȸ����
function enterShortKey() {
	var key = event.keyCode;
//alert(key);
	if(key == 81) { //'q' or 'Q'
		GoSearch("");
	}

	if(ctrl_keydown && key == 83) { // s�� ��������.
		GoSave();
	}
	
	if(key == 17) {// ctrl key down
		ctrl_keydown = true;
	}
			
}

function onKeyUp() {
	ctrl_keydown = false;
}

function execute_scm_charge_setup(gubn){

	var item_id   = document.frm.item_id.value;
	var item_name = document.frm.item_id.options[document.frm.item_id.selectedIndex].text;
	if(gubn == "SETUP")	{
		var user_id	= document.frm._user_id.value;
		if(confirm(item_name+"�� ���ǰ������ �����Ͻðڽ��ϱ�?") == 1 ){
			commonUtil.executeQuery("item_id!%!user_id", item_id+"!%!"+user_id, "rp_01160_UPDATE_SCM_CHARGE", success);
		}
	}
	else {
		//var user_id;
		if(confirm(item_name+"�� ���ǰ���� �����Ͻðڽ��ϱ�?") == 1 ){
			commonUtil.executeQuery("item_id!%!user_id", item_id+"!%!", "rp_01160_UPDATE_SCM_CHARGE", success);
		}
	}
	
}


result = function(data) {
		alert(data);

}


success = function(data) {
	if (data == "SUCCESS") {
		alert("����Ǿ����ϴ�.");
	}
}

function	ChangeSize_DW1(obj) {
	
	if(obj.value == "���") {
		// HEADER FONT SIZE
		GridObj.nHDFontSize = 8;
		// Cell FONT SIZE
		GridObj.nCellFontSize = 8;

		GridObj.SetColWidth("PRE_MONTH_SELL"		,52);
		GridObj.SetColWidth("SALES_PRE"			    ,46);
		GridObj.SetColWidth("SALES_PRE_CUM"		    ,52);
		GridObj.SetColWidth("SALES_PLAN"			,46);
		GridObj.SetColWidth("ISSUE"				    ,46);
		GridObj.SetColWidth("SALES_MEAN_1WEEK"	    ,46);
		GridObj.SetColWidth("SALES_MEAN_3WEEK"	    ,46);
		GridObj.SetColWidth("BASE_STOCK"			,50);
		GridObj.SetColWidth("RECEIPT"				,46);
		GridObj.SetColWidth("CHGO_QTY"			    ,46);
		GridObj.SetColWidth("STOCK_DAY"			    ,37);
		GridObj.SetColWidth("STOCK_TERM"			,37);
		GridObj.SetColWidth("SAFETY_STOCK"		    ,46);
		GridObj.SetColWidth("SALES_PLAN_D1"		    ,46);
		GridObj.SetColWidth("ISSUE_D1"			    ,46);
		GridObj.SetColWidth("STOCK_EXPT"			,50);
		GridObj.SetColWidth("REP_QTY"				,46);
		GridObj.SetColWidth("SRC_LOC"				,46);
		GridObj.SetColWidth("MIN_PICK_QTY"		    ,37);
		GridObj.SetColWidth("NEXT_STOCK_DAY_1W"		,37);
		GridObj.SetColWidth("NEXT_STOCK_DAY_3W"		,37);
		GridObj.SetColWidth("NEXT_STOCK_EXPT"		,50);
		GridObj.SetColWidth("EDI_00_D1"			    ,46);
		GridObj.SetColWidth("EDI_00_D2"			    ,46);
		
		obj.value = "Ȯ��";
	}
	else {
		// HEADER FONT SIZE
		GridObj.nHDFontSize = 9;
		// Cell FONT SIZE
		GridObj.nCellFontSize = 9;

		GridObj.SetColWidth("PRE_MONTH_SELL"		,55);
		GridObj.SetColWidth("SALES_PRE"			    ,55);
		GridObj.SetColWidth("SALES_PRE_CUM"		    ,55);
		GridObj.SetColWidth("SALES_PLAN"			,55);
		GridObj.SetColWidth("ISSUE"				    ,55);
		GridObj.SetColWidth("SALES_MEAN_1WEEK"	    ,55);
		GridObj.SetColWidth("SALES_MEAN_3WEEK"	    ,55);
		GridObj.SetColWidth("BASE_STOCK"			,55);
		GridObj.SetColWidth("RECEIPT"				,55);
		GridObj.SetColWidth("CHGO_QTY"			    ,55);
		GridObj.SetColWidth("STOCK_DAY"			    ,40);
		GridObj.SetColWidth("STOCK_TERM"			,40);
		GridObj.SetColWidth("SAFETY_STOCK"		    ,55);
		GridObj.SetColWidth("SALES_PLAN_D1"		    ,55);
		GridObj.SetColWidth("ISSUE_D1"			    ,55);
		GridObj.SetColWidth("STOCK_EXPT"			,55);
		GridObj.SetColWidth("REP_QTY"				,55);
		GridObj.SetColWidth("SRC_LOC"				,55);
		GridObj.SetColWidth("MIN_PICK_QTY"		    ,40);
		GridObj.SetColWidth("NEXT_STOCK_DAY_1W"		,55);
		GridObj.SetColWidth("NEXT_STOCK_DAY_3W"		,55);
		GridObj.SetColWidth("NEXT_STOCK_EXPT"		,55);
		GridObj.SetColWidth("EDI_00_D1"			    ,55);
		GridObj.SetColWidth("EDI_00_D2"			    ,55);
		
		obj.value = "���";
	}
}


// ��ǰ �˻� POPUP
// ǰ�� POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//��ȸǰ�� ���� : '01'�Ǹ���	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*������������������������������������������������������������������������
  ��WiseGrid �ʱ�ȭ
  ������������������������������������������������������������������������*/
function init() {
	
	GridObj = document.WiseGrid;

	setProperty(GridObj); 	// �⺻ property ����
	setDefault();  			// �߰� property ����
	setHeader();   			// Header ����
			
}

function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// �⺻ property ����
	setDefault2();  			// �߰� property ����
//	setHeader2();   			// Header ����
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); 		// �⺻ property ����
	setDefault3();  			// �߰� property ����
	setHeader3();   			// Header ����
			
}
/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault(){
	
	GridObj.bUserContextMenu 	= true;					//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bHDMoving 		 	= false;                //����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj.bHDSwapping 	 	= false;                //����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex   = false;				//Row Selector ������ Row Index�� �����ش�. 
	
	GridObj.strRowBorderStyle   = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	//GridObj.strGridBorderStyle = 'smalldots';
	
	GridObj.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;				// Font Size 9
	//GridObj.bCellFontBold = true;
	//Hearder ����
	GridObj.nHDLineSize   = 9;   //12
	
	// Grid �� ����
    GridObj.nRowHeight    = 9;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 
	
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
   
    ///* Context Menu ����� MENU �߰� */
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");   
 
}

/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault2(){
	
	GridObj2.bUserContextMenu 	 	= true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj2.bHDMoving 			 	= true;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj2.bHDSwapping 		 	= false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj2.bRowSelectorVisible 	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex   	= false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj2.strRowBorderStyle   	= "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj2.strHDClickAction 		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj2.strActiveRowBgColor 	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj2.bStatusbarVisible 		= false;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName 			= '���� ���';
	GridObj2.nHDFontSize 			= 8;				  	// Font Size 9
	GridObj2.bHDFontBold 			= true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize 			= 9;					// Font Size 9
	
	//Hearder ����
	GridObj2.nHDLineSize   			= 12;   //12
	
	// Grid �� ����
    GridObj2.nRowHeight    			= 12;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines 				= 1; 
 
}

/*������������������������������������������������������������������������
  ��Property ����
  ������������������������������������������������������������������������*/
function setDefault3(){
	
	GridObj3.bUserContextMenu 		= true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj3.bHDMoving 				= false;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj3.bHDSwapping 			= false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj3.bRowSelectorVisible 	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex 		= false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj3.strRowBorderStyle 		= "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj3.nRowSpacing 			= 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj3.strHDClickAction 		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj3.strActiveRowBgColor 	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj3.bStatusbarVisible 		= false;				// status bar visible
	// Header Font Setting
	GridObj3.strHDFontName 			= '���� ���';
	GridObj3.nHDFontSize 			= 8;				  	// Font Size 9
	GridObj3.bHDFontBold 			= true; 
	
	// Cell Font Setting
	GridObj3.nCellFontSize 			= 8;					// Font Size 9
	GridObj3.strCellFontName 		= '���� ���'; 
	
	//Hearder ����
	GridObj3.nHDLineSize   			= 12;   //12
	
	// Grid �� ����
    GridObj3.nRowHeight    			= 12;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205';  
    
    //����� ���μ��� �����Ѵ�. 
    GridObj3.nHDLines 				= 1; 
    
    
    // Context Menu ����� MENU �߰� 2012-05-30 SCM�� �̽¿� �븮 ��û
    GridObj3.AddUserContextMenuItem("MENU_CELL","MENU00","����"); 		//00//
    GridObj3.AddUserContextMenuItem("MENU_CELL","MENU01","����"); 		//01//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU02","����"); 		//02//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU03","�λ�");		//03//
	
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU04","����");		//04//
    GridObj3.AddUserContextMenuItem("MENU_CELL","MENU05","����");		//05//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU06","CVS");		//06//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU07","����+CVS");	//07//
	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU08","CVS+����");	//08//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU09","����+����");	//09//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU10","Ư��");		//10//		//2012-12-28 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU11","Ư��+����");	//11//		//2012-12-28 SCMħ �̽¿� �븮 ��û//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU11","����");	//11//		//2012-12-28 SCMħ �̽¿� �븮 ��û//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU12","�����");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU13","�����2");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU14","�����3");	//11//		//2015-10-24 SCMħ �̽¿� �븮 ��û//
 	GridObj3.AddUserContextMenuItem("MENU_CELL","MENU15","�����4");	//11//		//2015-10-24 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU14","�����4");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU15","�����5");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU16","�����6");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU17","�����7");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU18","�����8");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU19","�����9");	//11//		//2014-10-24 SCMħ �̽¿� �븮 ��û//
 	
 	
	/* ����->����(01)->����(04)->����(05)->����(02)->�λ�(03) ->		//
	// �߰� CVS(06)-> ����+CVS(07) -> CVS+����(08)-> ����+���� (09) */

}

var preSortKey = "ROWNUM";
// dw1�� sortting���
function changeSortKey(obj){
	var chk_sort_descend;
	if(document.frm.chk_sort_descend.checked) chk_sort_descend = 'descending';
	else chk_sort_descend = 'asceding';

	GridObj.ClearGroupMerge();  // ������ �����Ѵ�.
	GridObj.SetColCellSort(preSortKey,'none');
	GridObj.SetColCellSort(obj.value,chk_sort_descend);

	if(obj.value == "ROWNUM") { // �ʱ�ȭ
		doGrouping();
	}
	preSortKey = obj.value; 
}

function changeSortDesc(){
	changeSortKey(document.frm.in_sort_key);
}

function doGrouping(){

	if(document.frm.chk_do_grouping.checked) {
		GridObj.bHDMoving = false;	// move header diasable!
		set_GroupMerge_dw1();		// ���ս���!
	}
	else {

		GridObj.ClearGroupMerge();  // ������ �����Ѵ�.
		GridObj.bHDMoving = true;	// move header available! 
	}
}


/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader() 
{        

	GridObj.AddHeader("DC_ID"					,"�԰���"		    		,"t_text" 		,100	,50  ,false);	//���� //   
	GridObj.AddHeader("DC_NAME"					,"�԰���"		    		,"t_text" 		,100	,60  ,false);   //���� //

	GridObj.AddHeader("GOAL_00"					,"�ǸŸ�ǥ"      			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_11"					,"�ǸŸ�ǥ"     			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_13"					,"��������"     			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_14"					,"��3���"     			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_17"					,"��3����"     			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_18"					,"���⵿��"     			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_21"					,"��������"     			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("GOAL_23"					,"�����"      			,"t_number" 	,100.3	,60  ,false);   //���� //
 	
 	GridObj.AddHeader("RATE_00"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,42  ,false);   //���� //
 	GridObj.AddHeader("RATE_11"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("RATE_13"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("RATE_14"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("RATE_17"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("RATE_18"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("RATE_21"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("RATE_23"					,"�޼���\n(%)"      		,"t_number" 	,100.3	,45  ,false); 	//���� //

 	GridObj.AddHeader("SUPPLY_RATE"				,"������\n(%)"   			,"t_number" 	,100.3	,45  ,false); 	//���� //
 	GridObj.AddHeader("SUPPLY_RATE_BOX"			,"������"      			,"t_number" 	,100.3	,45  ,false); 	//���� //

 	GridObj.AddHeader("PRE_MONTH_SELL"			,"�����Ǹ�"      			,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("PRE_MONTH_SELL_00"		,"�����Ǹ� "      		,"t_number" 	,100.3	,60  ,false);   //���� //
 	GridObj.AddHeader("PRE_MONTH_SELL_01"		,"�����Ǹ� �Ϲ�"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("PRE_MONTH_SELL_02"		,"�����Ǹ�\n����  �Ϲ�"     ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("PRE_MONTH_SELL_03"		,"�����Ǹ�\n���� �Ϲ�"     	,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("PRE_MONTH_SELL_04"		,"�����Ǹ�\nŸ����"   		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("PRE_MONTH_SELL_05"		,"�����Ǹ�\n���� Ÿ����"   	,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("PRE_MONTH_SELL_06"		,"�����Ǹ�\n���� Ÿ����"   	,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	
 	GridObj.AddHeader("SALES_PLAN"				,"�ǸŰ�ȹ"      			,"t_number" 	,100.3	,0   ,false);  
 	 
 	GridObj.AddHeader("SALES_PRE_CUM"			,"�ǸŴ���"      			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_CUM_00"		,"�ǸŴ��� " 	    		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_CUM_01"		,"�ǸŴ��� �Ϲ�"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_CUM_02"		,"�ǸŴ���\n���� �Ϲ�"      ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("SALES_PRE_CUM_03"		,"�ǸŴ���\n���� �Ϲ�"      ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("SALES_PRE_CUM_04"		,"�ǸŴ���\nŸ����"    	,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_CUM_05"		,"�ǸŴ���\n���� Ÿ����"    ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("SALES_PRE_CUM_06"		,"�ǸŴ���\n���� Ÿ����"    ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	
 	
 	GridObj.AddHeader("SALES_PRE"				,"�����Ǹ�"      			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_00"			,"�����Ǹ� "     			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_01"			,"�����Ǹ� �Ϲ�"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_02"			,"�����Ǹ�\n���� �Ϲ�"      ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("SALES_PRE_03"			,"�����Ǹ�\n���� �Ϲ�"      ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("SALES_PRE_04"			,"�����Ǹ�\nŸ����"    	,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PRE_05"			,"�����Ǹ�\n���� Ÿ����"    ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("SALES_PRE_06"			,"�����Ǹ�\n���� Ÿ����"    ,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	 	
 	 
 	GridObj.AddHeader("ISSUE"					,"�Ǹ��ֹ�"      			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_00"				,"�Ǹ��ֹ�" 				,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_YO"				,"�Ǹ��ֹ�\n�Ϲ�"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_YS"				,"�Ǹ��ֹ�\nȸ��"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_TA"				,"�Ǹ��ֹ�\nŸ����"   		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_WMS"				,"�Ǹ��ֹ�\n�μ�Ÿ"		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_EX"				,"�Ǹ��ֹ�\n����"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	
 	
 	GridObj.AddHeader("ISSUE_CUST_00"			,"����ä��\n����"  		,"t_number" 	,100.3	,60  ,true);  	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_TOT"			,"����ä��\n����"  		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_10"			,"����ä��\nƯ����"   		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_11"			,"����ä��\n���ŷ�"   		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_16"			,"����ä��\n������Ʈ" 		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_14"			,"����ä��\n����ü��" 		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_19"			,"����ä��\n����"   		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_18"			,"����ä��\nCVS"   		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	GridObj.AddHeader("ISSUE_CUST_99"			,"����ä��\n��Ÿ"   		,"t_number" 	,100.3	,0   ,true);   	//�߰� //
 	
 	 	
 	//GridObj.AddHeader("SALES_MEAN_1"			,"1�����"				,"t_number" 	,100.3	,50  ,false);   //2013-05-29 �߰� //
 	GridObj.AddHeader("SALES_MEAN_1WEEK_1"		,"1�����\n(Ÿ����)"		,"t_number" 	,100.3	,50  ,false);   //���� //
 	GridObj.AddHeader("SALES_MEAN_1WEEK_ETC"	,"1�����\n(Ÿ����)"		,"t_number" 	,100.3	,0  ,false);   //���� //
 	GridObj.AddHeader("SALES_MEAN_1WEEK"		,"1�����"				,"t_number" 	,100.3	,0  ,false);   //���� //
 	
 	
 	GridObj.AddHeader("SALES_MEAN_3WEEK_3"		,"3�����\n(Ÿ����)"		,"t_number" 	,100.3	,50  ,false);   //2013-05-29 �߰� //
 	GridObj.AddHeader("SALES_MEAN_3WEEK_ETC"	,"3�����\n(Ÿ����)"		,"t_number" 	,100.3	,0  ,false);   //���� //
 	GridObj.AddHeader("SALES_MEAN_3WEEK"		,"3�����	"				,"t_number" 	,100.3	,0  ,false);   //���� //
 	
		
	GridObj.AddHeader("BASE_STOCK"				,"����\n���"      		,"t_number" 	,100.3	,50  ,false);   //���� //
 	GridObj.AddHeader("RECEIPT"					,"�԰�\n����"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("CHGO_QTY"				,"���\n����"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("CHGO"					,"���\n����"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("DELV"					,"���\n���"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	GridObj.AddHeader("TRAN"					,"����\n���"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	
 	GridObj.AddHeader("STOCK_DAY"				,"����ϼ�\n(1��Ÿ����)"	,"t_number" 	,100.3	,70  ,false);   //���� //
 	GridObj.AddHeader("STOCK_DAY_1W_ETC"		,"����ϼ�\n(1��Ÿ����)" 	,"t_number" 	,100.3	,70  ,false);   //�߰�  2013-06-19//
 	GridObj.AddHeader("STOCK_DAY_1W"			,"����ϼ�\n(1��)"     	,"t_number" 	,100.3	,70  ,false);   //�߰� //
 	GridObj.AddHeader("STOCK_DAY_3W_ETC"		,"����ϼ�\n(3��Ÿ����)" 	,"t_number" 	,100.3	,70  ,false);   //�߰� //
 	GridObj.AddHeader("STOCK_DAY_3W"			,"����ϼ�\n(3��)"     	,"t_number" 	,100.3	,70  ,false);   //�߰� //
 	
 	
 	GridObj.AddHeader("STOCK_TERM"				,"�԰�\n�����"      		,"t_number" 	,100.3	,45  ,false);   //���� //
 	
 	GridObj.AddHeader("SALES_PLAN_D1"			,"�ǸŰ�ȹ\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("SALES_PLAN_00_D1"		,"�ǸŰ�ȹ\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("DC_ALLOC_PLAN_D1"		,"�����Ҵ�\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	
 	GridObj.AddHeader("ISSUE_D1"				,"�Ǹ��ֹ�\nD+1"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_00_D1"				,"�Ǹ��ֹ�\nD+1" 			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_YO_D1"				,"�Ϲ�\nD+1"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_YS_D1"				,"ȸ��\nD+1"     		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_TA_D1"				,"Ÿ����\nD+1"   			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_WMS_D1"			,"�μ�Ÿ\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("ISSUE_EX_D1"				,"����\nD+1"				,"t_number" 	,100.3	,55  ,false);   //���� //

 	GridObj.AddHeader("STOCK_EXPT"				,"����\n���"				,"t_number" 	,100.3	,50  ,false);   //���� //
 	GridObj.AddHeader("REP_QTY"					,"����\n�䱸��"			,"t_number" 	,100.3	,50  ,false);   //���� //
 	GridObj.AddHeader("TRANS_PLAN_PLT"			,"PLT"      			,"t_number" 	,100.3	,40   ,true);    //���� //
 	GridObj.AddHeader("TRANS_PLAN_QTY"			,"BOX"      			,"t_number" 	,100.3	,40   ,true);    //���� //
 	GridObj.AddHeader("SRC_LOC"					,"�����"    				,"t_combo" 		,100	,50   ,true);	//���� //   
 	GridObj.AddHeader("MIN_PICK_QTY"			,"�ּ�\n����"		    	,"t_number" 	,100.3	,40   ,true);    //���� //
 	
 	GridObj.AddHeader("NEXT_STOCK_DAY"			,"�����ϼ�\n(1��)"		,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("NEXT_STOCK_DAY_1W"		,"�����ϼ�\n(1��)"		,"t_number" 	,100.3	,55  ,false);   //2012-03-23 �߰� //
 	GridObj.AddHeader("NEXT_STOCK_DAY_3W"		,"�����ϼ�\n(3��)"		,"t_number" 	,100.3	,55  ,false);   //���� //
 	
 	GridObj.AddHeader("NEXT_STOCK_EXPT"			,"����\n�������"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	
 	GridObj.AddHeader("EDI_00_D"				,"EDI\nD"				,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("EDI_TOT_D"				,"EDI\nD"				,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("EDI_22_D"				,"�̸�Ʈ\nD"				,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("EDI_21_D"				,"HOME+\nD"				,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("EDI_23_D"				,"�Ե���Ʈ\nD"			,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	GridObj.AddHeader("EDI_ETC_D"				,"��Ÿ\nD"				,"t_number" 	,100.3	,55  ,false);   //�߰� //
 	 	
 	GridObj.AddHeader("EDI_00_D1"				,"EDI\nD+1"				,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_TOT_D1"				,"EDI\nD+1"				,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_22_D1"				,"�̸�Ʈ\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_21_D1"				,"HOME+\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_23_D1"				,"�Ե���Ʈ\nD+1"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_ETC_D1"				,"��Ÿ\nD+1"				,"t_number" 	,100.3	,55  ,false);   //���� //

 	GridObj.AddHeader("EDI_00_D2"				,"EDI\nD+2"				,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_TOT_D2"				,"EDI\nD+2"				,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_22_D2"				,"�̸�Ʈ\nD+2"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_21_D2"				,"HOME+\nD+2"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_23_D2"				,"�Ե���Ʈ\nD+2"			,"t_number" 	,100.3	,55  ,false);   //���� //
 	GridObj.AddHeader("EDI_ETC_D2"				,"��Ÿ\nD+2"				,"t_number" 	,100.3	,55  ,false);   //���� //
	
 	GridObj.AddHeader("CDC_CNT"					,"CDC_ROW��ȣ"			,"t_number" 	,100.3	,20  ,false);   //���� //
 	GridObj.AddHeader("ORD_NO"					,"ORD_NO"				,"t_number" 	,100.3	,20  ,false);   //���� //
 	GridObj.AddHeader("ROWNUM"					,"ROWNUM"				,"t_number" 	,100.3	,20  ,false);   //���� //

 	GridObj.AddHeader("OLD_SAFE_QTY"			,"OLD�������"      		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("SAFE_UPDATE_FLAG"		,"�����������FLAG"      	,"t_text" 		,100	,0   ,true);    //���� //
 	GridObj.AddHeader("UNIT_UPDATE_FLAG"		,"�ּҼ��۴�������FLAG"   	,"t_text" 		,100	,0   ,true);    //���� //
 	GridObj.AddHeader("BOX_PER_PLT"				,"BOX_PER_PLT"   		,"t_number" 	,100.3	,0   ,true);    //���� //
 	GridObj.AddHeader("SAFETY_STOCK_FLAG"		,"�������FLAG"   		,"t_text" 		,100	,30  ,true);    //���� //
 	GridObj.AddHeader("CD_SRC_LOC"				,"�������"   			,"t_text" 		,100	,30  ,true);    //���� //

 	GridObj.AddHeader("REMN_CAPA_BOX"			,"�ܿ�CAPA\n(BOX)"   	,"t_number" 	,100.3	,60  ,true);    //���� //
 	GridObj.AddHeader("ZONE"					,"ZONE"   				,"t_text" 		,100	,10  ,true);    //���� //

 	GridObj.AddHeader("CUST_00"					,"�ŷ�ó��\n����"   		,"t_number" 	,100.3	,60  ,true);  	//���� //
 	GridObj.AddHeader("CUST_TOT"				,"�ŷ�ó��\n����"  		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_10"					,"�ŷ�ó��\nƯ����"   		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_11"					,"�ŷ�ó��\n���ŷ�"   		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_16"					,"�ŷ�ó��\n������Ʈ" 		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_14"					,"�ŷ�ó��\n����ü��" 		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_19"					,"�ŷ�ó��\n����"   		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_18"					,"�ŷ�ó��\nCVS"   		,"t_number" 	,100.3	,0   ,true);   	//���� //
 	GridObj.AddHeader("CUST_99"					,"�ŷ�ó��\n��Ÿ"   		,"t_number" 	,100.3	,0   ,true);   	//���� //

 	GridObj.AddHeader("MAP_STOCK_BOX"			,"����\nǰ�����"   		,"t_number" 	,100.3	,60  ,true);   	//���� //
 	GridObj.AddHeader("SAFETY_STOCK"			,"����\n���"      		,"t_number" 	,100.3	,45  ,true);   	//���� //

//	GridObj.AddGroup("TRANS_PLAN", "���۰�ȹ");			//�׸��忡 �׷��� ����Ѵ�. 
//	GridObj.AppendHeader("TRANS_PLAN", "TRANS_PLAN_PLT");
//	GridObj.AppendHeader("TRANS_PLAN", "TRANS_PLAN_QTY");

	GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
	
// rotaiton �÷� ���� ���� 	
	GridObj.SetColHDBgColor('GOAL_00',					'253|228|229');
	GridObj.SetColHDBgColor('RATE_00',					'253|228|229');

	GridObj.SetColHDBgColor('PRE_MONTH_SELL',			'253|228|229');
	GridObj.SetColHDBgColor('SALES_PRE',				'253|228|229');
	GridObj.SetColHDBgColor('SALES_PRE_CUM',			'253|228|229');
	GridObj.SetColHDBgColor('ISSUE',					'253|228|229');
	
	GridObj.SetColHDBgColor('SALES_MEAN_1WEEK_1',		'253|228|229');	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetColHDBgColor('SALES_MEAN_1WEEK',			'253|228|229');	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetColHDBgColor('SALES_MEAN_1WEEK_ETC',		'253|228|229');	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetColHDBgColor('SALES_MEAN_3WEEK_3',		'253|228|229');	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetColHDBgColor('SALES_MEAN_3WEEK',			'253|228|229');	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	
	GridObj.SetColHDBgColor('CHGO_QTY',					'253|228|229');

	GridObj.SetColHDBgColor('STOCK_DAY',				'253|228|229'); //(�߰�)//
	GridObj.SetColHDBgColor('SALES_PLAN_D1',			'253|228|229');
	GridObj.SetColHDBgColor('ISSUE_CUST_00',			'253|228|229'); //(�߰�)//
	GridObj.SetColHDBgColor('ISSUE_D1',					'253|228|229');
	
	GridObj.SetColHDBgColor('NEXT_STOCK_DAY',			'253|228|229'); //(�߰�)//
	GridObj.SetColHDBgColor('EDI_00_D',					'253|228|229'); //(�߰�)//
	GridObj.SetColHDBgColor('EDI_00_D1',				'253|228|229');
	GridObj.SetColHDBgColor('EDI_00_D2',				'253|228|229');

	GridObj.SetColHDBgColor('CUST_00',					'253|228|229');
	
//	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("DC_ID", 				true);

	GridObj.SetColHide("GOAL_11", 				true);
	GridObj.SetColHide("GOAL_13", 				true);
	GridObj.SetColHide("GOAL_14", 				true);
	GridObj.SetColHide("GOAL_17", 				true);
	GridObj.SetColHide("GOAL_18", 				true);
	GridObj.SetColHide("GOAL_21", 				true);
	GridObj.SetColHide("GOAL_23", 				true);
	
	GridObj.SetColHide("RATE_11", 				true);
	GridObj.SetColHide("RATE_13", 				true);
	GridObj.SetColHide("RATE_14", 				true);
	GridObj.SetColHide("RATE_17", 				true);
	GridObj.SetColHide("RATE_18", 				true);
	GridObj.SetColHide("RATE_21", 				true);
	GridObj.SetColHide("RATE_23", 				true);

	GridObj.SetColHide("SUPPLY_RATE", 	  		true);
	GridObj.SetColHide("SUPPLY_RATE_BOX", 		true);

	GridObj.SetColHide("PRE_MONTH_SELL_00", 	true);
	GridObj.SetColHide("PRE_MONTH_SELL_01", 	true);
	GridObj.SetColHide("PRE_MONTH_SELL_02", 	true);
	GridObj.SetColHide("PRE_MONTH_SELL_03", 	true);	//(�߰�)//
	GridObj.SetColHide("PRE_MONTH_SELL_04", 	true);	//(�߰�)//
	GridObj.SetColHide("PRE_MONTH_SELL_05", 	true);	//(�߰�)//
	GridObj.SetColHide("PRE_MONTH_SELL_06", 	true);	//(�߰�)//
	
	GridObj.SetColHide("SALES_PRE_00", 			true);
	GridObj.SetColHide("SALES_PRE_01", 			true);
	GridObj.SetColHide("SALES_PRE_02", 			true);
	GridObj.SetColHide("SALES_PRE_03", 			true);	//(�߰�)//
	GridObj.SetColHide("SALES_PRE_04", 			true);	//(�߰�)//
	GridObj.SetColHide("SALES_PRE_05", 			true);	//(�߰�)//
	GridObj.SetColHide("SALES_PRE_06", 			true);	//(�߰�)//
	
	GridObj.SetColHide("SALES_PRE_CUM_00", 		true);
	GridObj.SetColHide("SALES_PRE_CUM_01", 		true); 
	GridObj.SetColHide("SALES_PRE_CUM_02", 		true);
	GridObj.SetColHide("SALES_PRE_CUM_03", 		true);	//(�߰�)//
	GridObj.SetColHide("SALES_PRE_CUM_04", 		true); 	//(�߰�)//
	GridObj.SetColHide("SALES_PRE_CUM_05", 		true);	//(�߰�)//
	GridObj.SetColHide("SALES_PRE_CUM_06", 		true);	//(�߰�)//
	
	
	GridObj.SetColHide("ISSUE_00", 				true);
	GridObj.SetColHide("ISSUE_YO", 				true);
	GridObj.SetColHide("ISSUE_YS", 				true);
	GridObj.SetColHide("ISSUE_TA", 				true);
	GridObj.SetColHide("ISSUE_WMS", 			true);
	GridObj.SetColHide("ISSUE_EX", 				true);

	
	//GridObj.SetColHide("SALES_MEAN_1WEEK", 		true);	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetColHide("SALES_MEAN_1WEEK_ETC", 	true);	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	
	//GridObj.SetColHide("SALES_MEAN_3WEEK", 		true);	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetColHide("SALES_MEAN_3WEEK_ETC", 	true);	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	
	GridObj.SetColHide("CHGO", 					true);
	GridObj.SetColHide("DELV", 					true);
	GridObj.SetColHide("TRAN", 					true);
	
	GridObj.SetColHide("STOCK_DAY_1W", 			true);	//(�߰�)//
	GridObj.SetColHide("STOCK_DAY_1W_ETC", 		true);	//2013-06-19 (�߰�)//
	GridObj.SetColHide("STOCK_DAY_3W", 			true);	//(�߰�)//
	GridObj.SetColHide("STOCK_DAY_3W_ETC", 		true);	//2013-06-19 (�߰�)//
	
	GridObj.SetColHide("SALES_PLAN_00_D1", 		true);
	GridObj.SetColHide("DC_ALLOC_PLAN_D1", 		true);
	GridObj.SetColHide("ISSUE_00_D1", 			true);
	GridObj.SetColHide("ISSUE_YO_D1", 			true);
	GridObj.SetColHide("ISSUE_YS_D1", 			true);
	GridObj.SetColHide("ISSUE_TA_D1", 			true);
	GridObj.SetColHide("ISSUE_WMS_D1",			true);
	GridObj.SetColHide("ISSUE_EX_D1", 			true);

	GridObj.SetColHide("EDI_TOT_D", 			true);  //(�߰�)//
	GridObj.SetColHide("EDI_22_D",  			true);	//(�߰�)//
	GridObj.SetColHide("EDI_21_D",  			true);	//(�߰�)//
	GridObj.SetColHide("EDI_23_D",  			true);	//(�߰�)//
	GridObj.SetColHide("EDI_ETC_D", 			true);	//(�߰�)//
	
	
	GridObj.SetColHide("EDI_TOT_D1", 			true);
	GridObj.SetColHide("EDI_22_D1",  			true);
	GridObj.SetColHide("EDI_21_D1",  			true);
	GridObj.SetColHide("EDI_23_D1",  			true);
	GridObj.SetColHide("EDI_ETC_D1", 			true);
	
	GridObj.SetColHide("EDI_TOT_D2", 			true);
	GridObj.SetColHide("EDI_22_D2",  			true);
	GridObj.SetColHide("EDI_21_D2",  			true);
	GridObj.SetColHide("EDI_23_D2",  			true);
	GridObj.SetColHide("EDI_ETC_D2", 			true);

	GridObj.SetColHide("CDC_CNT", 				true);
	GridObj.SetColHide("ORD_NO",  				true);
	GridObj.SetColHide("ROWNUM",  				true);

	GridObj.SetColHide("OLD_SAFE_QTY", 			true);
	GridObj.SetColHide("SAFE_UPDATE_FLAG",  	true);
	GridObj.SetColHide("UNIT_UPDATE_FLAG",  	true);
	GridObj.SetColHide("SAFETY_STOCK_FLAG", 	true);
	GridObj.SetColHide("CD_SRC_LOC",  			true);

	GridObj.SetColHide("BOX_PER_PLT", 			true);

	GridObj.SetColHide("ZONE", 					true);

	GridObj.SetColFix('DC_NAME');

	GridObj.SetNumberFormat("GOAL_00"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_11"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_13"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_14"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_17"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_18"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_21"		 		, "###,###,###");
	GridObj.SetNumberFormat("GOAL_23"		 		, "###,###,###");
	GridObj.SetNumberFormat("RATE_00"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_11"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_13"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_14"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_17"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_18"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_21"		 		, "###,###,##0.0");
	GridObj.SetNumberFormat("RATE_23"				, "###,###,##0.0");

	GridObj.SetNumberFormat("REMN_CAPA_BOX"		 	, "###,###,###");
	GridObj.SetNumberFormat("MAP_STOCK_BOX"		 	, "###,###,###");

	GridObj.SetNumberFormat("PRE_MONTH_SELL"		 , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_00"	     , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_01"	     , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_02"	     , "###,###,###");
	GridObj.SetNumberFormat("PRE_MONTH_SELL_03"	     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("PRE_MONTH_SELL_04"	     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("PRE_MONTH_SELL_05"	     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("PRE_MONTH_SELL_06"	     , "###,###,###");	//(�߰�)//
	
	GridObj.SetNumberFormat("SALES_PRE"			     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_00"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_01"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_02"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_03"		     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("SALES_PRE_04"		     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("SALES_PRE_05"		     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("SALES_PRE_06"		     , "###,###,###");	//(�߰�)//
	
	GridObj.SetNumberFormat("SALES_PRE_CUM"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_CUM_00"	     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_CUM_01"	     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PRE_CUM_02"	     , "###,###,###");	
	GridObj.SetNumberFormat("SALES_PRE_CUM_03"	     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("SALES_PRE_CUM_04"	     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("SALES_PRE_CUM_05"	     , "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("SALES_PRE_CUM_06"	     , "###,###,###");	//(�߰�)//
	
	GridObj.SetNumberFormat("SALES_PLAN"		     , "###,###,###");
	
	GridObj.SetNumberFormat("ISSUE"				     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_00"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YO"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YS"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_TA"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_WMS"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_EX"			     , "###,###,###");

	GridObj.SetNumberFormat("SALES_MEAN_1WEEK_1"	, "###,###,###");	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK"		, "###,###,###");	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK_ETC"   , "###,###,###");	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK_3"	 , "###,###,###");	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK"	     , "###,###,###");	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK_ETC"   , "###,###,###");	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û

	GridObj.SetNumberFormat("BASE_STOCK"			 , "###,###,###");
	GridObj.SetNumberFormat("RECEIPT"				 , "###,###,###");
	GridObj.SetNumberFormat("CHGO_QTY"			     , "###,###,###");
	GridObj.SetNumberFormat("CHGO"				     , "###,###,###");
	GridObj.SetNumberFormat("DELV"				     , "###,###,###");
	GridObj.SetNumberFormat("TRAN"				     , "###,###,###");
	
	
	
	
	GridObj.SetNumberFormat("STOCK_DAY"			     , "###,###,##0.0");
	GridObj.SetNumberFormat("STOCK_DAY_1W_ETC"		 , "###,###,##0.0");	//2013-06-19 �߰�
	GridObj.SetNumberFormat("STOCK_DAY_1W"			 , "###,###,##0.0");
	GridObj.SetNumberFormat("STOCK_DAY_3W_ETC"		 , "###,###,##0.0");	//2013-06-19 �߰�
	GridObj.SetNumberFormat("STOCK_DAY_3W"			 , "###,###,##0.0");

	GridObj.SetNumberFormat("STOCK_TERM"			 , "###,###,###");
	GridObj.SetNumberFormat("SAFETY_STOCK"		     , "###,###,###");
	
	GridObj.SetNumberFormat("SALES_PLAN_D1"		     , "###,###,###");
	GridObj.SetNumberFormat("SALES_PLAN_00_D1"		 , "###,###,###");
	GridObj.SetNumberFormat("DC_ALLOC_PLAN_D1"		 , "###,###,###");
	
	GridObj.SetNumberFormat("ISSUE_D1"			     , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_00_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YO_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_YS_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_TA_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_WMS_D1"			 , "###,###,###");
	GridObj.SetNumberFormat("ISSUE_EX_D1"			 , "###,###,###");

	GridObj.SetNumberFormat("NEXT_STOCK_DAY"	     , "###,###,##0.0");
	GridObj.SetNumberFormat("NEXT_STOCK_DAY_1W"	     , "###,###,##0.0"); //2012-03-23 �߰�//
	GridObj.SetNumberFormat("NEXT_STOCK_DAY_3W"	     , "###,###,##0.0");
	GridObj.SetNumberFormat("NEXT_STOCK_EXPT"	     , "###,###,###");
	
	GridObj.SetNumberFormat("EDI_00_D"			 	, "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("EDI_TOT_D"				, "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("EDI_22_D"			 	, "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("EDI_21_D"			 	, "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("EDI_23_D"			 	, "###,###,###");	//(�߰�)//
	GridObj.SetNumberFormat("EDI_ETC_D"				, "###,###,###");	//(�߰�)//
	
	
	GridObj.SetNumberFormat("EDI_00_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_TOT_D1"			, "###,###,###");
	GridObj.SetNumberFormat("EDI_22_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_21_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_23_D1"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_ETC_D1"			, "###,###,###");
	
	GridObj.SetNumberFormat("EDI_00_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_TOT_D2"			, "###,###,###");
	GridObj.SetNumberFormat("EDI_22_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_21_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_23_D2"			 	, "###,###,###");
	GridObj.SetNumberFormat("EDI_ETC_D2"			, "###,###,###");
	
	GridObj.SetNumberFormat("STOCK_EXPT"			 , "###,###,###");
	GridObj.SetNumberFormat("REP_QTY"				 , "###,###,###");
	GridObj.SetNumberFormat("TRANS_PLAN_QTY"		 , "###,###,###");
	GridObj.SetNumberFormat("TRANS_PLAN_PLT"		 , "###,###,##0.00");
	GridObj.SetNumberFormat("MIN_PICK_QTY"		     , "###,###,###");
	
	GridObj.SetNumberFormat("ISSUE_CUST_00"			, "###,###,###"); //(�߰�)//
	GridObj.SetNumberFormat("CUST_00"				, "###,###,###");

	GridObj.SetColCellFontName('DC_NAME','���� ���');
	GridObj.SetColCellFontName('SRC_LOC','���� ���');
	GridObj.SetColCellFontBold('DC_NAME','true');
	GridObj.SetColCellFontBold('SRC_LOC','true');

}

/* rotaion �÷� ������ ���� */
var pre_month_sell_idx 		= 0;
var sales_pre_idx 	   		= 0;
var sales_pre_cum_idx  		= 0;
var issue_idx 		   		= 0;
var chgo_qty_idx 	   		= 0;
var stock_day_idx 	   		= 0;	//(�߰�)//
var sales_plan_d1_idx  		= 0;
var issue_d1_idx 	   		= 0;
var edi_d_idx 		   		= 0;	//(�߰�)//
var edi_d1_idx 		   		= 0;
var edi_d2_idx 		   		= 0;
var goal_idx 		   		= 0;
var rate_idx 		   		= 0;
var issue_cust_idx 	   		= 0;	//(�߰�)//
var cust_idx 		   		= 0;
var next_stock_idx			= 0;
var sales_mean_1week_idx	= 0;	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û	
var sales_mean_3week_idx	= 0;	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û

//alert(sales_mean_1week_idx);

function HeaderClick_DW1(strColumnKey){


	/* �����Ǹ� rotation */
	if(strColumnKey == "PRE_MONTH_SELL"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(pre_month_sell_idx == 0) {
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_01"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_01", i));
			}
			else if(pre_month_sell_idx == 1) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_02"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_02", i));
			}
			else if(pre_month_sell_idx == 2) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_03"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_03", i));
			}
			else if(pre_month_sell_idx == 3) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_04"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_04", i));
			}
			else if(pre_month_sell_idx == 4) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_05"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_05", i));
			}
			else if(pre_month_sell_idx == 5) { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_06"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_06", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_00"));
				GridObj.SetCellValue('PRE_MONTH_SELL',i,GridObj.GetCellValue("PRE_MONTH_SELL_00", i));
			}				
		}
		if(pre_month_sell_idx == 6) pre_month_sell_idx =0; else pre_month_sell_idx ++;
	}

	/* �����Ǹ� rotation */
	if(strColumnKey == "SALES_PRE"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_pre_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_01"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_01", i));
			}
			else if(sales_pre_idx == 1) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_02"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_02", i));
			}
			else if(sales_pre_idx == 2) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_03"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_03", i));
			}
			else if(sales_pre_idx == 3) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_04"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_04", i));
			}
			else if(sales_pre_idx == 4) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_05"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_05", i));
			}
			else if(sales_pre_idx == 5) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_06"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_06", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_00"));
				GridObj.SetCellValue('SALES_PRE',i,GridObj.GetCellValue("SALES_PRE_00", i));
			}				
		}
		if(sales_pre_idx == 6) sales_pre_idx =0; else sales_pre_idx ++;
	}

	/* �ǸŴ��� rotation */
	if(strColumnKey == "SALES_PRE_CUM"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_pre_cum_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_01"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_01", i));
			}
			else if(sales_pre_cum_idx == 1) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_02"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_02", i));
			}
			else if(sales_pre_cum_idx == 2) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_03"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_03", i));
			}
			else if(sales_pre_cum_idx == 3) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_04"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_04", i));
			}
			else if(sales_pre_cum_idx == 4) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_05"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_05", i));
			}
			else if(sales_pre_cum_idx == 5) { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_06"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_06", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_00"));
				GridObj.SetCellValue('SALES_PRE_CUM',i,GridObj.GetCellValue("SALES_PRE_CUM_00", i));
			}				
		}
		if(sales_pre_cum_idx == 6) sales_pre_cum_idx =0; else sales_pre_cum_idx ++;
	}

	/* �Ǹ��ֹ� rotation */
	if(strColumnKey == "ISSUE"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(issue_idx == 0) {
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_YO"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_YO", i));
			}
			else if(issue_idx == 1) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_YS"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_YS", i));
			}
			else if(issue_idx == 2) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_TA"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_TA", i));
			}
			else if(issue_idx == 3) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_WMS"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_WMS", i));
			}
			else if(issue_idx == 4) { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_EX"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_EX", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_00"));
				GridObj.SetCellValue('ISSUE',i,GridObj.GetCellValue("ISSUE_00", i));
			}				
		}
		if(issue_idx == 5) issue_idx =0; else issue_idx ++;
	}

	/* ����� rotation */
	if(strColumnKey == "CHGO_QTY"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(chgo_qty_idx == 0) {
				if(i==0) GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("DELV"));
				GridObj.SetCellValue('CHGO_QTY',i,GridObj.GetCellValue("DELV", i));
			}
			else if(chgo_qty_idx == 1) { 
				if(i==0) GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("TRAN"));
				GridObj.SetCellValue('CHGO_QTY',i,GridObj.GetCellValue("TRAN", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("CHGO"));
				GridObj.SetCellValue('CHGO_QTY',i,GridObj.GetCellValue("CHGO", i));
			}				
		}
		if(chgo_qty_idx == 2) chgo_qty_idx =0; else chgo_qty_idx ++;
	}


	/* ����ϼ�  rotation */ 
		if(strColumnKey == "STOCK_DAY"){
			for(i=0;i<GridObj.GetRowCount( );i++ ) {
				
				if(stock_day_idx == 0) {
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_1W"));
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_1W", i));
				}
				else if(stock_day_idx == 1) { 
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_3W_ETC"));	//2013-06-19 �߰�
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_3W_ETC", i));
				}
				else if(stock_day_idx == 2) { 
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_3W"));
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_3W", i));
				}
				else {
					if(i==0) GridObj.SetColHDText("STOCK_DAY",GridObj.GetColHDText("STOCK_DAY_1W_ETC"));	//2013-06-19 �߰�
					GridObj.SetCellValue('STOCK_DAY',i,GridObj.GetCellValue("STOCK_DAY_1W_ETC", i));
				}
			}
			if(stock_day_idx == 3) stock_day_idx =0; else stock_day_idx ++;
		}


	/* �ǸŰ�ȹD+1 rotation */
	if(strColumnKey == "SALES_PLAN_D1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_plan_d1_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_PLAN_D1",GridObj.GetColHDText("DC_ALLOC_PLAN_D1"));
				GridObj.SetCellValue('SALES_PLAN_D1',i,GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("SALES_PLAN_D1",GridObj.GetColHDText("SALES_PLAN_00_D1"));
				GridObj.SetCellValue('SALES_PLAN_D1',i,GridObj.GetCellValue("SALES_PLAN_00_D1", i));
			}				
		}
		if(sales_plan_d1_idx == 1) sales_plan_d1_idx =0; else sales_plan_d1_idx ++;
	}

	/* �Ǹ��ֹ�D+1 rotation */
	if(strColumnKey == "ISSUE_D1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(issue_d1_idx == 0) {
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_YO_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_YO_D1", i));
			}
			else if(issue_d1_idx == 1) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_YS_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_YS_D1", i));
			}
			else if(issue_d1_idx == 2) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_TA_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_TA_D1", i));
			}
			else if(issue_d1_idx == 3) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_WMS_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_WMS_D1", i));
			}
			else if(issue_d1_idx == 4) { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_EX_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_EX_D1", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_00_D1"));
				GridObj.SetCellValue('ISSUE_D1',i,GridObj.GetCellValue("ISSUE_00_D1", i));
			}				
		}
		if(issue_d1_idx == 5) issue_d1_idx =0; else issue_d1_idx ++;
	}	

	/* EDI_D rotation */ //(�߰�)//
	if(strColumnKey == "EDI_00_D"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_d_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_22_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_22_D", i));
			}
			else if(edi_d_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_21_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_21_D", i));
			}
			else if(edi_d_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_23_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_23_D", i));
			}
			else if(edi_d_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_ETC_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_ETC_D", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00_D",GridObj.GetColHDText("EDI_TOT_D"));
				GridObj.SetCellValue('EDI_00_D',i,GridObj.GetCellValue("EDI_TOT_D", i));
			}				
		}
		if(edi_d_idx == 4) edi_d_idx =0; else edi_d_idx ++;
	}

	/* EDI_D1 rotation */
	if(strColumnKey == "EDI_00_D1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_d1_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_22_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_22_D1", i));
			}
			else if(edi_d1_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_21_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_21_D1", i));
			}
			else if(edi_d1_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_23_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_23_D1", i));
			}
			else if(edi_d1_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_ETC_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_ETC_D1", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_TOT_D1"));
				GridObj.SetCellValue('EDI_00_D1',i,GridObj.GetCellValue("EDI_TOT_D1", i));
			}				
		}
		if(edi_d1_idx == 4) edi_d1_idx =0; else edi_d1_idx ++;
	}

	/* EDI_D2 rotation */
	if(strColumnKey == "EDI_00_D2"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(edi_d2_idx == 0) {
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_22_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_22_D2", i));
			}
			else if(edi_d2_idx == 1) {
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_21_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_21_D2", i));
			}
			else if(edi_d2_idx == 2) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_23_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_23_D2", i));
			}
			else if(edi_d2_idx == 3) { 
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_ETC_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_ETC_D2", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_TOT_D2"));
				GridObj.SetCellValue('EDI_00_D2',i,GridObj.GetCellValue("EDI_TOT_D2", i));
			}				
		}
		if(edi_d2_idx == 4) edi_d2_idx =0; else edi_d2_idx ++;
	}

	/* �ǸŸ�ǥ&�޼��� rotation -> ��������,����ڴ� �켱 ���� */
	if(strColumnKey == "GOAL_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(goal_idx == 0) {
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_13"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_13", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_13", i));
			}
			else if(goal_idx == 1) { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_14"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_14", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_14", i));
			}
			else if(goal_idx == 2) { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_17"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_17", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_17", i));
			}
			else if(goal_idx == 3) { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_18"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_18", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_18", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_11"));
				GridObj.SetCellValue('GOAL_00',i,GridObj.GetCellValue("GOAL_11", i));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_11", i));
			}				
		}
		if(goal_idx == 4) goal_idx =0; else goal_idx ++;
		
		// ������,���޹ڽ� ���ϱ�
		rate_idx --;
//alert("goal_idx = "+goal_idx + " rate_idx = "+ rate_idx);
		HeaderClick_DW1("RATE_00");
	}	

	/* �޼���/������ rotation */
	if(strColumnKey == "RATE_00"){

		// ������ ���ϱ�
		setSupplyRateAndBox("normal");
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(rate_idx == 0) { // ������
				if(i==0) GridObj.SetColHDText("RATE_00",GridObj.GetColHDText("SUPPLY_RATE"));
				GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("SUPPLY_RATE", i));
			}
			else {
				if(i==0) GridObj.SetColHDText("RATE_00",GridObj.GetColHDText("RATE_11"));
				
				if(goal_idx == 0) {
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_11", i));
				}
				else if(goal_idx == 1) { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_13", i));
				}
				else if(goal_idx == 2) { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_14", i));
				}
				else if(goal_idx == 3) { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_17", i));
				}
				else { 
					GridObj.SetCellValue('RATE_00',i,GridObj.GetCellValue("RATE_18", i));
				}				
			}
		}
		if(rate_idx == 1) {  // �޼���
			rate_idx = 0; 
		}
		else { // ������
			rate_idx ++;
		}
	}


/* ����ä�� rotation */ //(�߰�)//
	if(strColumnKey == "ISSUE_CUST_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(issue_cust_idx == 0) {
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_10"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_10", i));
			}
			else if(issue_cust_idx == 1) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_11"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_11", i));
			}
			else if(issue_cust_idx == 2) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_16"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_16", i));
			}
			else if(issue_cust_idx == 3) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_14"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_14", i));
			}
			else if(issue_cust_idx == 4) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_19"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_19", i));
			}
			else if(issue_cust_idx == 5) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_18"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_18", i));
			}
			else if(issue_cust_idx == 6) { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_99"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_99", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("ISSUE_CUST_00",GridObj.GetColHDText("ISSUE_CUST_TOT"));
				GridObj.SetCellValue('ISSUE_CUST_00',i,GridObj.GetCellValue("ISSUE_CUST_TOT", i));
			}				
		}
		if(issue_cust_idx == 7) issue_cust_idx =0; else issue_cust_idx ++;
	}
	

	/* �ŷ�ó�� rotation */
	if(strColumnKey == "CUST_00"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(cust_idx == 0) {
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_10"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_10", i));
			}
			else if(cust_idx == 1) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_11"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_11", i));
			}
			else if(cust_idx == 2) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_16"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_16", i));
			}
			else if(cust_idx == 3) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_14"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_14", i));
			}
			else if(cust_idx == 4) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_19"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_19", i));
			}
			else if(cust_idx == 5) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_18"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_18", i));
			}
			else if(cust_idx == 6) { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_99"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_99", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("CUST_00",GridObj.GetColHDText("CUST_TOT"));
				GridObj.SetCellValue('CUST_00',i,GridObj.GetCellValue("CUST_TOT", i));
			}				
		}
		if(cust_idx == 7) cust_idx =0; else cust_idx ++;
	}


/* �����ϼ� rotation */
	if(strColumnKey == "NEXT_STOCK_DAY"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(next_stock_idx == 0) {
				if(i==0) GridObj.SetColHDText("NEXT_STOCK_DAY",GridObj.GetColHDText("NEXT_STOCK_DAY_1W"));
				GridObj.SetCellValue('NEXT_STOCK_DAY',i,GridObj.GetCellValue("NEXT_STOCK_DAY_1W", i));
			}
			else { 
				if(i==0) GridObj.SetColHDText("NEXT_STOCK_DAY",GridObj.GetColHDText("NEXT_STOCK_DAY_3W"));
				GridObj.SetCellValue('NEXT_STOCK_DAY',i,GridObj.GetCellValue("NEXT_STOCK_DAY_3W", i));
			}			
		}
		if(next_stock_idx == 1) next_stock_idx =0; else next_stock_idx ++;
	}
	
/* 1�� ��� rotation �߰� */	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	if(strColumnKey == "SALES_MEAN_1WEEK_1"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_mean_1week_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_MEAN_1WEEK_1",GridObj.GetColHDText("SALES_MEAN_1WEEK"));
				GridObj.SetCellValue('SALES_MEAN_1WEEK_1',i,GridObj.GetCellValue("SALES_MEAN_1WEEK", i));
			}
			else  { 
				if(i==0) GridObj.SetColHDText("SALES_MEAN_1WEEK_1",GridObj.GetColHDText("SALES_MEAN_1WEEK_ETC"));
				GridObj.SetCellValue('SALES_MEAN_1WEEK_1',i,GridObj.GetCellValue("SALES_MEAN_1WEEK_ETC", i));
			}
		}
		if(sales_mean_1week_idx == 1) sales_mean_1week_idx = 0; else sales_mean_1week_idx ++;
	}	
	
/* 3�� ��� rotation �߰� */	//2013-05-29 SCM�� �̽¿� �븮 Rotation ��û
	if(strColumnKey == "SALES_MEAN_3WEEK_3"){
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			if(sales_mean_3week_idx == 0) {
				if(i==0) GridObj.SetColHDText("SALES_MEAN_3WEEK_3",GridObj.GetColHDText("SALES_MEAN_3WEEK"));
				GridObj.SetCellValue('SALES_MEAN_3WEEK_3',i,GridObj.GetCellValue("SALES_MEAN_3WEEK", i));
			}
			else  { 
				if(i==0) GridObj.SetColHDText("SALES_MEAN_3WEEK_3",GridObj.GetColHDText("SALES_MEAN_3WEEK_ETC"));
				GridObj.SetCellValue('SALES_MEAN_3WEEK_3',i,GridObj.GetCellValue("SALES_MEAN_3WEEK_ETC", i));
			}		
				
		}
		if(sales_mean_3week_idx == 1) sales_mean_3week_idx =0; else sales_mean_3week_idx ++;
	}	


}

// init_gubn : "init" ���۰�ȹ�� ������, "normal" ���۰�ȹ�� ����
function	setSupplyRateAndBox(init_gubn){
    var rowCnt = GridObj.GetRowCount();
    for ( i = 0 ; i < rowCnt ; i++ ){
    	var dc_name = GridObj.GetCellValue("DC_NAME", i);

	    
	    // ��հ����� ���ϱ� 
	    if(dc_name == "��ü�հ�") {
	    	if(strToNum(GridObj.GetCellValue("GOAL_00", i)) <= 0) break;
	    	var mean_supply_rate = Math.round(( strToNum(GridObj.GetCellValue("BASE_STOCK", i)) 
	    			+ strToNum(GridObj.GetCellValue("SALES_PRE_CUM", i))
	    			+ strToNum(GridObj.GetCellValue("DELV", i))
	    			+ strToNum(GridObj.GetCellValue("RECEIPT", i))
	    			+ strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i)) )
	    			 / strToNum(GridObj.GetCellValue("GOAL_00", i)) * 100 *10)/10;
	    } 
    }
    
    // �ǸŸ�ǥ ���� ������, ������ ���
    // ������ = (������� + �ǸŴ��� + ������ + �԰��� + ��ȹ�� ���۰�ȹ) / �ǸŸ�ǥ * 100
    // ������ = ��հ��������� ���̹ڽ� * ���̺���(%) 
    var supply_rate 	= 0, supply_rate_box = 0;
    var trans_plan_qty  = 0;
    var dc_id, t_dc_id;
    for ( i = 0 ; i < rowCnt ; i++ ){
    	if(strToNum(GridObj.GetCellValue("GOAL_00", i)) <= 0) {
    		GridObj.SetCellValue("SUPPLY_RATE", i, 0);
    		GridObj.SetCellValue("SUPPLY_RATE_BOX", i, 0);
    		continue;
    	}
    	dc_id = GridObj.GetCellValue("DC_ID", i);
    	// ���۰�ȹ�� �ջ�
    	trans_plan_qty = 0;
    	if(init_gubn == "normal") {
	    	for ( j = 0 ; j < rowCnt ; j++ ){
	    		t_dc_id = GridObj.GetCellValue("DC_ID", j);
	    		if(dc_id == t_dc_id) {
	    			trans_plan_qty = trans_plan_qty + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", j));
	    		}
	    	}
    	}
    	supply_rate = Math.round(( strToNum(GridObj.GetCellValue("BASE_STOCK", i)) 
	    			+ strToNum(GridObj.GetCellValue("SALES_PRE_CUM", i))
	    			+ strToNum(GridObj.GetCellValue("DELV", i))
	    			+ strToNum(GridObj.GetCellValue("RECEIPT", i))
	    			+ trans_plan_qty )
	    			 / strToNum(GridObj.GetCellValue("GOAL_00", i)) * 100 *10)/10;
		GridObj.SetCellValue("SUPPLY_RATE", i, supply_rate);
		
		if(mean_supply_rate - supply_rate > 0) {
			supply_rate_box = Math.round(strToNum(GridObj.GetCellValue("GOAL_00", i)) * (mean_supply_rate - supply_rate) / 100 
							* (mean_supply_rate - supply_rate));
		}
		else {
			supply_rate_box = 0;
		}    	
		GridObj.SetCellValue("SUPPLY_RATE_BOX", i, supply_rate_box);
		
    }
	
}

function setHeader2() 
{        

	GridObj2.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA"		,"���(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_BOX"	,"���(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_PAL"	,"���(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("BASE_STOCK"		,"�������"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("CHGO_QTY"		,"���"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_1"		,"����"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_3"		,"�ְ�"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("CONF_STOCK"		,"�����"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("TRANS_QTY"		,"���Ȯ��"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj2.AddHeader("NEXT_CHGO_QTY"	,"�������"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj2.AddHeader("NEXT_TRANS_QTY"	,"���ϰ�ȹ"       	,"t_number" 	,500.3	,50  ,false); //0   

	var trans_start   = document.frm.trans_start.value;
	var item_id 	  = document.frm.item_id.value;
	var itype		  = document.frm.itype.value;
	var header_length = 0, j;
	
	commonUtil.getSelQeury( "trans_start!%!item_id!%!itype", trans_start+"!%!"+item_id+"!%!"+itype, "rp_01160_replenishmentNiceLikePlan_DW2_HEADER",{
		callback:function(result){

			for(var i=0 ; i < 20 ; i++){
				if(i < result.length) {
					GridObj2.AddHeader("PROD"+result[i][1]	,result[i][0]       	,"t_number" 	,500.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 9) {
						GridObj2.AddHeader("PROD0"+j	,"-"     	,"t_number" 	,500.3	,0  ,false);
					}
					else {
						GridObj2.AddHeader("PROD"+j		,"-"       	,"t_number" 	,500.3	,0  ,false);
					}
				}
			}
		 	
		 	GridObj2.AddHeader("PROD_AVAILABLE"	,"���갡��"       	,"t_text" 	,500	,30  ,false); //0   
			
			GridObj2.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
			GridObj2.SetColHide("PROD_AVAILABLE", true);
			
			GridObj2.SetNumberFormat("BASE_STOCK", 		 "###,###,###"); // ���� ����
			GridObj2.SetNumberFormat("CHGO_QTY", 		 "###,###,###"); // ���� ����
			GridObj2.SetNumberFormat("PROD01_1", 		 "###,###,###"); // ���� ����
			GridObj2.SetNumberFormat("PROD01_3", 		 "###,###,###"); // ���� ����
			GridObj2.SetNumberFormat("CONF_STOCK", 		 "###,###,###");
			GridObj2.SetNumberFormat("TRANS_QTY", 		 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_CHGO_QTY", 	 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_TRANS_QTY", "###,###,###.#");
			GridObj2.SetNumberFormat("USE_CAPA", 	 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_BOX", 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_PAL", 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD01", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD02", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD03", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD04", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD05", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD06", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD07", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD08", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD09", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD10", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD11", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD12", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD13", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD14", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD15", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD16", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD17", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD18", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD19", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD20", 		 	 "###,###,###");
			
			GridObj2.SetColCellAlign('DC_NAME','left');
			GridObj2.SetColCellFontName('DC_NAME','���� ���');
			GridObj2.SetColCellFontBold('DC_NAME','true');
			
			GridObj2.SetColHDBgColor('TRANS_QTY','253|228|229');

			if(document.frm.itype.value == "HAWA") {
				GridObj2.SetColHide("PROD01_1", true);
				GridObj2.SetColHide("PROD01_3", true);
			}
			
			GridObj2.SetColHide("USE_CAPA_BOX", true);
			GridObj2.SetColHide("USE_CAPA_PAL", true);
			// CAPA�߰��� �Ѱ��÷� ������.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery2();			
		}
	});   
}

var sum_cd_info_idx = 0;
var next_trans_qty  = new Array();
var use_capa_idx 	= 0;
function HeaderClick_DW2(strColumnKey) {

	// ��� Ŭ���� ����ɷ��� ���Ȯ�������� copy�Ѵ�. 
	if(strColumnKey == "TRANS_QTY"){
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
			GridObj2.SetCellValue('TRANS_QTY',i,GridObj2.GetCellValue("CONF_STOCK", i));
		}
	}

	if(strColumnKey == "NEXT_TRANS_QTY" && document.frm.cd_gubn.value == "CROSS-DOCKING"){
		var cdc_id, cd_src_loc, dc_id;
		var sum_mean3_sell 	   = new Array(), tot_mean3_sell     = 0;
		var sum_pre_month_sell = new Array(), tot_pre_month_sell = 0;
		var in_data = 0;
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
			// ��������� C/D�� ��� 3�����,����, �����Ǹ�,������ ROTATION�ϸ鼭 �����ش�
			cdc_id = GridObj2.GetCellHiddenValue("DC_NAME", i);
			sum_mean3_sell[i] = 0;
			sum_pre_month_sell[i] = 0;
			for(j=0;j<GridObj.GetRowCount( );j++ ) {
				dc_id = GridObj.GetCellValue("DC_ID", j);
				cd_src_loc = GridObj.GetCellValue("CD_SRC_LOC", j);
				cd_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", j);
				// ������ ������ ��� PASS!
				if(GridObj.GetCellValue("CDC_CNT", j) != "1") {
					continue;
				}
				if((cd_flag == "01" && cdc_id == cd_src_loc) || cdc_id == dc_id)	{
					sum_mean3_sell[i] = sum_mean3_sell[i] + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", j));
					sum_pre_month_sell[i] = sum_pre_month_sell[i] + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", j));	
				}
			}
			tot_mean3_sell = tot_mean3_sell	+ sum_mean3_sell[i];
			tot_pre_month_sell = tot_pre_month_sell	+ sum_pre_month_sell[i];

		}
		
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
	
			if(sum_cd_info_idx == 0) { // 3����� ���蹰��
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","3������");
				next_trans_qty[i] = strToNum(GridObj2.GetCellValue("NEXT_TRANS_QTY", i)); // �� ���� ���
				GridObj2.SetCellValue("NEXT_TRANS_QTY", i,sum_mean3_sell[i]);
			}
			else if(sum_cd_info_idx == 1) { // 3����� �������
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","3��(%)");
				if(tot_mean3_sell > 0) {
					in_data = Math.round(strToNum(sum_mean3_sell[i])/strToNum(tot_mean3_sell)*100*10)/10;
					GridObj2.SetCellValue("NEXT_TRANS_QTY", i,in_data);
				}
				else GridObj2.SetCellValue("NEXT_TRANS_QTY", i,0);
			}
			else if(sum_cd_info_idx == 2) { // �����Ǹ� ���蹰��
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","��������");
				GridObj2.SetCellValue("NEXT_TRANS_QTY", i,sum_pre_month_sell[i]);
			}
			else if(sum_cd_info_idx == 3) { // �����Ǹ� �������
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","����(%)");
				if(tot_pre_month_sell > 0) {
					in_data = Math.round(strToNum(sum_pre_month_sell[i])/strToNum(tot_pre_month_sell)*100*10)/10;
					GridObj2.SetCellValue("NEXT_TRANS_QTY", i,in_data);
				}
				else GridObj2.SetCellValue("NEXT_TRANS_QTY", i,0);
			}
			else { // ���ϰ�ȹ
				if(i==0) GridObj2.SetColHDText("NEXT_TRANS_QTY","���ϰ�ȹ");
				GridObj2.SetCellValue("NEXT_TRANS_QTY", i,next_trans_qty[i]);
			}
		}
		
		if(sum_cd_info_idx == 4) sum_cd_info_idx =0; else sum_cd_info_idx ++;
	}
	if(strColumnKey == "USE_CAPA"){
		for(i=0;i<GridObj2.GetRowCount( );i++ ) {
	
			if(use_capa_idx == 0) { // ��ü���(PAL)
				if(i==0) GridObj2.SetColHDText("USE_CAPA",GridObj2.GetColHDText("USE_CAPA_PAL"));
				GridObj2.SetCellValue("USE_CAPA", i,strToNum(GridObj2.GetCellValue("USE_CAPA_PAL", i)));
			}
			else { // ��ü���(BOX)
				if(i==0) GridObj2.SetColHDText("USE_CAPA",GridObj2.GetColHDText("USE_CAPA_BOX"));
				GridObj2.SetCellValue("USE_CAPA", i,strToNum(GridObj2.GetCellValue("USE_CAPA_BOX", i)));
			}
		}
		
		if(use_capa_idx == 1) use_capa_idx =0; else use_capa_idx ++;
	
	}
		
}

function setHeader3() 
{        

	GridObj3.AddHeader("CRUD"			,"CRUD"		       	,"t_text" 	,100	,0   ,false); //0   
	GridObj3.AddHeader("CNFM_DATE"		,"��¥"		       	,"t_text" 	,100	,61  ,false); //0   
 	GridObj3.AddHeader("ALLOC_ZONE"		,"����"      		,"t_text" 	,100	,58  ,false); //0   

	GridObj3.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
	GridObj3.SetColCellAlign('CNFM_DATE', 'center');
	GridObj3.SetColCellAlign('ALLOC_ZONE','center');

	GridObj3.SetColHide("CRUD", true);

	GridObj3.SetCRUDMode("CRUD");   
}


/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ����ȸ
  ������������������������������������������������������������������������*/
var check_select_DW1 = false;

function doQuery() {
//	if(check_select_DW1) {
//		alert("��ȸ�۾����Դϴ�(check_select_DW1)! �Ϸ���� �ٽ��ϼ���!");
//		return;
//	}
//	check_select_DW1 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "search");
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�
	
	var item_id 	= document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("trans_start", trans_start);
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);

	if(version.substring(0,8) == delDateDelimiter(trans_start)) {
		GridObj.SetParam("check_day", "TODAY"); // ���ϰ�ȹ

	}
	else {
		GridObj.SetParam("check_day", "NEXT"); // ���ϰ�ȹ
	}

	// query_id
	GridObj.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW1");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url);
}	 

var check_select_DW2 = false;

function doQuery2() {
		
//	if(check_select_DW2) {
//		alert("��ȸ�۾����Դϴ�(check_select_DW2)! �Ϸ���� �ٽ��ϼ���!");
//		return;
//	}
//	check_select_DW2 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "search_DW2");
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�

	var item_id 	= document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	var itype 		= document.frm.itype.value;
	
	
	GridObj2.SetParam("item_id", 		 item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", 		 version);
	GridObj2.SetParam("seq", 				 seq);
	
	GridObj2.SetParam("itype", 			   itype);
	
	if(version.substring(0,8) == delDateDelimiter(trans_start)) {
		GridObj2.SetParam("check_day", "TODAY"); // ���ϰ�ȹ

	}
	else {
		GridObj2.SetParam("check_day", "NEXT"); // ���ϰ�ȹ
	}
		
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url);
}

var check_select_DW3 = false;

function doQuery3() {
		
//	if(check_select_DW3) {
//		alert("��ȸ�۾����Դϴ�(check_select_DW3)! �Ϸ���� �ٽ��ϼ���!");
//		return;
//	}
//	check_select_DW3 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "search_DW3");
	
	//-- ������ ������ �Ķ���� ���� --//
	var item_id 	= document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	
	GridObj3.SetParam("item_id", 		 item_id);
	GridObj3.SetParam("trans_start", trans_start);
	
	// user_id
	//GridObj3.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW3");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj3.DoQuery(servlet_url);
}

var check_save_DW1 = false;

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSave_DW1() {
 
//	if(check_save_DW1) {
//		alert("�����۾����Դϴ�(check_save_DW1)! �Ϸ���� �ٽ��ϼ���!");
//		return;
//	}
//	check_save_DW1 = true;

	var version       = document.frm.version.value;
	var seq 	      = document.frm.seq.value;
	var trans_date 	  = document.frm.trans_start.value;
	var item_id       = document.frm.item_id.value;
	var in_trans_unit = "";
	if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	else if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";
	else in_trans_unit = "usr";

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "save");
	
	//-- ������ ������ �Ķ���� ���� --//
	GridObj.SetParam("version",			version);
	GridObj.SetParam("seq",					seq);
	GridObj.SetParam("trans_date",	 trans_date);
	GridObj.SetParam("item_id",			item_id);
	GridObj.SetParam("trans_unit",in_trans_unit);
	
	var stock_type = "";
	
	if(document.frm.stock_type[0].checked == true) stock_type = "base";		// �⺻����
	else stock_type = "prod";												// �������
	GridObj.SetParam("stock_type", stock_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}

var check_save_DW2 = false;
/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSave_DW2(version, seq, trans_date, item_id) {
 
	if(check_save_DW2) {
		alert("�����۾����Դϴ�(check_save_DW2)! �Ϸ���� �ٽ��ϼ���!");
		return;
	}
	check_save_DW2 = true;
	check_save_DW1 = true;
	check_save_DW3 = true;
	
	// DW2�� ROW������ 0�̸� DW1�� �ٷ� �����Ϸ� ����.
	if(GridObj2.GetRowCount() == 0) {
		check_save_DW2 = false;
		doSave_DW1();
		return
	}
	
	var servlet_url 	 = Project_name+"/servlet/" + class_path + job_id;
	var frc_qty 		 = document.frm.frc_qty.value;		// ����� ������ //
	var week_gubn 		 = document.frm.week_gubn.value;		// �ְ� ���� //
	var event_qty		 = document.frm.event_qty.value;


	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "save_DW2");
	
	//-- ������ ������ �Ķ���� ���� --//
	GridObj2.SetParam("version",	    version);
	GridObj2.SetParam("trans_date",  trans_date);
	GridObj2.SetParam("item_id",	    item_id);
	// user_id
	GridObj2.SetParam("frc_qty", frc_qty);				// ����� ������ //
	GridObj2.SetParam("event_qty", event_qty);				// �̺�Ʈ ���� //
	GridObj2.SetParam("week_gubn",  document.frm.week_gubn.value);
	GridObj2.SetParam("user_id",     document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	

}

var check_save_DW3 = false;

function doSave_DW3(item_id) {
 
//	if(check_save_DW3) {
//		alert("�����۾����Դϴ�(check_save_DW3)! �Ϸ���� �ٽ��ϼ���!");
//		return;
//	}
//	check_save_DW3 = true;

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj3.SetParam("mode", "save_DW3");
	
	//-- ������ ������ �Ķ���� ���� --//
	GridObj3.SetParam("item_id",item_id);
	// user_id
	GridObj3.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj3.DoQuery(servlet_url, "CRUD");

}

/* INSERT */
function doInsert() {

}

/* UPDATE */
function doUpdata() {

}

/* DELET */
function doDelete() {

}

/* CHECK SELECTED */
function chkSelected() {

}

/* LINE INSERT */
function doLineInsert() {

}

/* EXCEL DWON */
function excelDown() {

}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*��������������������������������������������������������������������������������
  ��	WiseGrid ��� �� Grid ���� �� ���� Fnc
  ��������������������������������������������������������������������������������*/
function GridEndQuery() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj.GetStatus() != "true") {
		var error_msg_extra = GridObj.GetMessage();// ?
		if (check_select_DW1 == true) {
			alert("(DW1_��ȸ����)�ٽ� ��ȸ�� �ֽʽÿ�!\n" + error_msg_extra);
			check_select_DW1	= false;
			check_select_DW2	= false;
			check_select_DW3	= false;
		}
		else if(check_save_DW1 == true) {
			alert("(DW1_���忡��)�ٽ� �������ֽñ� �ٶ��ϴ�!\n" + error_msg_extra);
			check_save_DW1 		= false;
			check_save_DW2 		= false;
			check_save_DW3 		= false;
		}
		return;
	}

	setGrid(GridObj); //WiseGrid ����
			
	//
	var end_mode = GridObj.GetParam("mode");
	
	if(end_mode == "search") { //��ȸ
		check_select_DW1	= false;
//		check_save_DW1 		= false;
		// FERT�� HAWA���ο� ���� �޶��� �� �����Ƿ� �ٽ� BOUND�Ѵ�.
		GridObj2.ClearGrid();
		setHeader2();
		if(GridObj.GetStatus() == "true") { // 
		
			var paramKey  = "item_id!%!version";
			var paramCode = document.frm.item_id.value+'!%!'+document.frm.version.value;
			var queryId   = "rp_01160_get_user_forecast_qty";
			/*************************�迭�� DATA�� �����ͼ� setting�Ѵ� sc_13010 ���� *****************************/
				
			commonUtil.getSelQeury(paramKey, paramCode, queryId,{
				callback:function(arrList){
					// ��ġ�ϴ� ��ǰ ����
					if( arrList.length == 1 ) {
						
						document.frm.frc_qty.value   = arrList[0][0];
						document.frm.week_gubn.value = arrList[0][1];
						document.frm.event_qty.value = arrList[0][2];
					}else {
						document.frm.frc_qty.value = numberFormat(0);
						document.frm.event_qty.value = numberFormat(0);
					}
				}
			});
			/******************************************************/
				

		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	}else if(end_mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
		
			doSave_DW3(document.frm.item_id.value);
/*			// DW3�� �����ؾ��ϸ� �����ϰ� �ƴ� ��ü��ȸ�� �����Ѵ�.
			if(document.frm.chk_alloc_save.checked == true)
				doSave_DW3(document.frm.item_id.value);
			else {
				check_save_DW1 		= false;
				check_save_DW2 		= false;
				check_save_DW3 		= false;
				GoSearch("");
			}
*/
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}
	
	doChange2(document.frm.scm_charge); // ǰ�� �ĺ�����Ʈ ����
	compute_expt_stock_dw1(); // ��������ϼ�, ������� ����
	
}

function GridEndQuery2() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj2.GetStatus() != "true") {
		var error_msg_extra = GridObj2.GetMessage();

		if (check_select_DW2 == true) {
			alert("(DW2_��ȸ����)�ٽ� ��ȸ�� �ֽʽÿ�!\n" + error_msg_extra);
			check_select_DW1	= false;
			check_select_DW2	= false;
			check_select_DW3	= false;
		}
		else if(check_save_DW2 == true) {
			alert("(DW2_���忡��)�ٽ� �������ֽñ� �ٶ��ϴ�!\n" + error_msg_extra);
			check_save_DW1 		= false;
			check_save_DW2 		= false;
			check_save_DW3 		= false;
		}
		return;
	}

	setGrid2(); //WiseGrid ����
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //��ȸ
		check_select_DW2	= false;
		//check_save_DW2 = false;
		doQuery3();
		if(GridObj2.GetStatus() == "true") { // 
			
		}
		
	} else if(end_mode == "doSave_DW2") {
		if(GridObj2.GetStatus() == "true") {// 
			// DW2�� ������ �����ϸ� DW1������ �����Ѵ�.
			doSave_DW1();
		}
	}
}

function GridEndQuery3() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj3.GetStatus() != "true") {
		var error_msg_extra = GridObj3.GetMessage();
		
		if (check_select_DW3 == true) {
			alert("(DW3_��ȸ����)�ٽ� ��ȸ�� �ֽʽÿ�!\n" + error_msg_extra);
			check_select_DW1	= false;
			check_select_DW2	= false;
			check_select_DW3	= false;
		}
		else if(check_save_DW3 == true) {
			alert("(DW3_���忡��)�ٽ� �������ֽñ� �ٶ��ϴ�!\n" + error_msg_extra);
			check_save_DW1 		= false;
			check_save_DW2 		= false;
			check_save_DW3 		= false;
		}	
		return;
	}

	setGrid3(); //WiseGrid ����
			
	var end_mode = GridObj3.GetParam("mode");

	if(end_mode == "search_DW3") { //��ȸ
		check_select_DW3	= false;
		//check_save_DW3 		= false;
		if(GridObj3.GetStatus() == "true") { // 
											
		} else	{ 
			var error_msg = GridObj3.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(end_mode == "doSave_DW3") {
		check_save_DW1 		= false;
		check_save_DW2 		= false;
		check_save_DW3 		= false;
		if(GridObj3.GetStatus() == "true") {// 
			GoSearch("");
		} else {
			var error_msg = GridObj3.GetMessage();// 
			alert(error_msg);			
		}
	}
}
/*������������������������������������������������������������������������
  ��WiseGrid ����
  ������������������������������������������������������������������������*/
function setGrid(){
	
/*	pre_month_sell_idx = 0;
	sales_pre_idx = 0;
	sales_pre_cum_idx = 0;
	issue_idx = 0;
	chgo_qty_idx = 0;
	sales_plan_d1_idx = 0;
	issue_d1_idx = 0;
	edi_d1_idx = 0;
	edi_d2_idx = 0;	
	goal_idx = 0;
	rate_idx = 0;
	
	GridObj.SetColHDText("PRE_MONTH_SELL",GridObj.GetColHDText("PRE_MONTH_SELL_00"));
	GridObj.SetColHDText("SALES_PRE",GridObj.GetColHDText("SALES_PRE_00"));
	GridObj.SetColHDText("SALES_PRE_CUM",GridObj.GetColHDText("SALES_PRE_CUM_00"));
	GridObj.SetColHDText("ISSUE",GridObj.GetColHDText("ISSUE_00"));
	GridObj.SetColHDText("CHGO_QTY",GridObj.GetColHDText("CHGO"));

	GridObj.SetColHDText("SALES_PLAN_D1",GridObj.GetColHDText("SALES_PLAN_00_D1"));
	GridObj.SetColHDText("ISSUE_D1",GridObj.GetColHDText("ISSUE_00_D1"));
	GridObj.SetColHDText("EDI_00_D1",GridObj.GetColHDText("EDI_TOT_D1"));
	GridObj.SetColHDText("EDI_00_D2",GridObj.GetColHDText("EDI_TOT_D2"));

	GridObj.SetColHDText("GOAL_00",GridObj.GetColHDText("GOAL_11"));
	GridObj.SetColHDText("RATE_00",GridObj.GetColHDText("RATE_11"));
*/
	/* rotaion �÷� ���� ���� ���� */
	pre_month_sell_idx --;
	sales_pre_idx --;
	sales_pre_cum_idx --;
	issue_idx --;
	issue_cust_idx --;  //(�߰�)//
	chgo_qty_idx --;
	sales_plan_d1_idx --;
	issue_d1_idx --;
	edi_d_idx --; //(�߰�)//
	edi_d1_idx --;
	edi_d2_idx --;
	goal_idx --;
	stock_day_idx--;
	
	sales_mean_1week_idx--;	//2013-05-29 SCM�� �̽¿� �븮 ��û ROTATION �߰�
	sales_mean_3week_idx--;	//2013-05-29 SCM�� �̽¿� �븮 ��û ROTATION �߰�

	next_stock_idx--;
	
	HeaderClick_DW1("PRE_MONTH_SELL");
	HeaderClick_DW1("SALES_PRE");
	HeaderClick_DW1("SALES_PRE_CUM");
	HeaderClick_DW1("ISSUE");
	HeaderClick_DW1("ISSUE_CUST_00");  //(�߰�)//
	HeaderClick_DW1("CHGO_QTY");
	HeaderClick_DW1("STOCK_DAY");  //(�߰�)//
	HeaderClick_DW1("SALES_PLAN_D1");
	HeaderClick_DW1("ISSUE_D1");
	HeaderClick_DW1("EDI_00_D");  //(�߰�)//
	HeaderClick_DW1("EDI_00_D1");
	HeaderClick_DW1("EDI_00_D2");
	HeaderClick_DW1("GOAL_00");
	
	HeaderClick_DW1("SALES_MEAN_1WEEK_1");	//2013-05-29 SCM�� �̽¿� �븮 ��û ROTATION �߰�
	HeaderClick_DW1("SALES_MEAN_3WEEK_3");	//2013-05-29 SCM�� �̽¿� �븮 ��û ROTATION �߰�

	HeaderClick_DW1("NEXT_STOCK_DAY");	
			
	// �÷� ����
	GridObj.SetColCellBgColor('SAFETY_STOCK','219|219|183');//�������
	GridObj.SetColCellBgColor('TRANS_PLAN_PLT',color_edit_col);//PLT
	GridObj.SetColCellBgColor('TRANS_PLAN_QTY',color_edit_col);//BOX
	GridObj.SetColCellBgColor('MIN_PICK_QTY','219|219|183');//�ּҼ��۴���

	GridObj.SetColCellBgColor('PRE_MONTH_SELL','232|232|255');//�����Ǹ�
	GridObj.SetColCellBgColor('SALES_PRE_CUM','232|232|255');//�ǸŴ���
	GridObj.SetColCellBgColor('STOCK_EXPT','232|232|255');//�������
    
    var safety_stock_flag;
    var rowCnt = GridObj.GetRowCount();
    // VER 3.4 ��������
    var index_tot = 0, index_cdc = 0, index_rdc = 0;
    var cum_cust_tot = 0, cum_cust_cdc = 0, cum_cust_rdc = 0;
    var cum_cust10_tot = 0, cum_cust10_cdc = 0, cum_cust10_rdc = 0;
    var cum_cust11_tot = 0, cum_cust11_cdc = 0, cum_cust11_rdc = 0;
    var cum_cust16_tot = 0, cum_cust16_cdc = 0, cum_cust16_rdc = 0;
    var cum_cust14_tot = 0, cum_cust14_cdc = 0, cum_cust14_rdc = 0;
    var cum_cust19_tot = 0, cum_cust19_cdc = 0, cum_cust19_rdc = 0;
    var cum_cust18_tot = 0, cum_cust18_cdc = 0, cum_cust18_rdc = 0;
    var cum_cust99_tot = 0, cum_cust99_cdc = 0, cum_cust99_rdc = 0;
    for ( i = 0 ; i < rowCnt ; i++ ){

    	var dc_name = GridObj.GetCellValue("DC_NAME", i);
	    if( dc_name == "��ü�հ�" || dc_name == "CDC�հ�" || dc_name == "RDC�հ�" ){
	    	GridObj.SetRowBgColor(i, color_tot); // row ����
	    	GridObj.SetCellFontBold('DC_NAME', i, 'true'); // font ����  
	    	GridObj.SetCellActivation('SAFETY_STOCK', 	i, 'disable'); //������ �� ���� ������ �� ����. 
	    	GridObj.SetCellActivation('TRANS_PLAN_PLT', i, 'disable'); //������ �� ���� ������ �� ����. 
	    	GridObj.SetCellActivation('TRANS_PLAN_QTY', i, 'disable'); //������ �� ���� ������ �� ����. 
	    	GridObj.SetCellActivation('SRC_LOC', 		i, 'disable'); //������ �� ���� ������ �� ����. 
	    	GridObj.SetCellActivation('MIN_PICK_QTY', 	i, 'disable'); //������ �� ���� ������ �� ����. 

	    	if(dc_name == "��ü�հ�") index_tot = i;
	    	if(dc_name == "CDC�հ�")  index_cdc = i;
	    	if(dc_name == "RDC�հ�")  index_rdc = i;
	    	
	    }
	    else {
	    	safety_stock_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", i);
	    	if(safety_stock_flag == "01") {
				GridObj.SetCellBgColor('DC_NAME', i, '255|173|143');
	    	}
	    	
    		cum_cust_tot 	= cum_cust_tot + strToNum(GridObj.GetCellValue('CUST_TOT',i));	
    		cum_cust10_tot = cum_cust10_tot + strToNum(GridObj.GetCellValue('CUST_10',i));	
    		cum_cust11_tot = cum_cust11_tot + strToNum(GridObj.GetCellValue('CUST_11',i));	
    		cum_cust16_tot = cum_cust16_tot + strToNum(GridObj.GetCellValue('CUST_16',i));	
    		cum_cust14_tot = cum_cust14_tot + strToNum(GridObj.GetCellValue('CUST_14',i));	
    		cum_cust19_tot = cum_cust19_tot + strToNum(GridObj.GetCellValue('CUST_19',i));	
    		cum_cust18_tot = cum_cust18_tot + strToNum(GridObj.GetCellValue('CUST_18',i));	
    		cum_cust99_tot = cum_cust99_tot + strToNum(GridObj.GetCellValue('CUST_99',i));	
	    	if(index_cdc == 0) { // From cdc row!
	    		cum_cust_cdc = cum_cust_cdc + strToNum(GridObj.GetCellValue('CUST_TOT',i));	
	    		cum_cust10_cdc = cum_cust10_cdc + strToNum(GridObj.GetCellValue('CUST_10',i));	
	    		cum_cust11_cdc = cum_cust11_cdc + strToNum(GridObj.GetCellValue('CUST_11',i));	
	    		cum_cust16_cdc = cum_cust16_cdc + strToNum(GridObj.GetCellValue('CUST_16',i));	
	    		cum_cust14_cdc = cum_cust14_cdc + strToNum(GridObj.GetCellValue('CUST_14',i));	
	    		cum_cust19_cdc = cum_cust19_cdc + strToNum(GridObj.GetCellValue('CUST_19',i));	
	    		cum_cust18_cdc = cum_cust18_cdc + strToNum(GridObj.GetCellValue('CUST_18',i));	
	    		cum_cust99_cdc = cum_cust99_cdc + strToNum(GridObj.GetCellValue('CUST_99',i));	
	    	}
	    	else {
	    		cum_cust_rdc = cum_cust_rdc + strToNum(GridObj.GetCellValue('CUST_TOT',i));	
	    		cum_cust10_rdc = cum_cust10_rdc + strToNum(GridObj.GetCellValue('CUST_10',i));	
	    		cum_cust11_rdc = cum_cust11_rdc + strToNum(GridObj.GetCellValue('CUST_11',i));	
	    		cum_cust16_rdc = cum_cust16_rdc + strToNum(GridObj.GetCellValue('CUST_16',i));	
	    		cum_cust14_rdc = cum_cust14_rdc + strToNum(GridObj.GetCellValue('CUST_14',i));	
	    		cum_cust19_rdc = cum_cust19_rdc + strToNum(GridObj.GetCellValue('CUST_19',i));	
	    		cum_cust18_rdc = cum_cust18_rdc + strToNum(GridObj.GetCellValue('CUST_18',i));	
	    		cum_cust99_rdc = cum_cust99_rdc + strToNum(GridObj.GetCellValue('CUST_99',i));	
	    	}
	    	
	    }
	    
    }

    // numbers of customer setting to cell
    GridObj.SetCellValue('CUST_TOT', index_tot, cum_cust_tot); GridObj.SetCellValue('CUST_00', index_tot, cum_cust_tot);
    GridObj.SetCellValue('CUST_TOT', index_cdc, cum_cust_cdc); GridObj.SetCellValue('CUST_00', index_cdc, cum_cust_cdc);
    GridObj.SetCellValue('CUST_TOT', index_rdc, cum_cust_rdc); GridObj.SetCellValue('CUST_00', index_rdc, cum_cust_rdc);
    GridObj.SetCellValue('CUST_10', index_tot, cum_cust10_tot);
    GridObj.SetCellValue('CUST_11', index_tot, cum_cust11_tot);
    GridObj.SetCellValue('CUST_16', index_tot, cum_cust16_tot);
    GridObj.SetCellValue('CUST_14', index_tot, cum_cust14_tot);
    GridObj.SetCellValue('CUST_19', index_tot, cum_cust19_tot);
    GridObj.SetCellValue('CUST_18', index_tot, cum_cust18_tot);
    GridObj.SetCellValue('CUST_99', index_tot, cum_cust99_tot);
	
    GridObj.SetCellValue('CUST_10', index_cdc, cum_cust10_cdc);
    GridObj.SetCellValue('CUST_11', index_cdc, cum_cust11_cdc);
    GridObj.SetCellValue('CUST_16', index_cdc, cum_cust16_cdc);
    GridObj.SetCellValue('CUST_14', index_cdc, cum_cust14_cdc);
    GridObj.SetCellValue('CUST_19', index_cdc, cum_cust19_cdc);
    GridObj.SetCellValue('CUST_18', index_cdc, cum_cust18_cdc);
    GridObj.SetCellValue('CUST_99', index_cdc, cum_cust99_cdc);

    GridObj.SetCellValue('CUST_10', index_rdc, cum_cust10_rdc);
    GridObj.SetCellValue('CUST_11', index_rdc, cum_cust11_rdc);
    GridObj.SetCellValue('CUST_16', index_rdc, cum_cust16_rdc);
    GridObj.SetCellValue('CUST_14', index_rdc, cum_cust14_rdc);
    GridObj.SetCellValue('CUST_19', index_rdc, cum_cust19_rdc);
    GridObj.SetCellValue('CUST_18', index_rdc, cum_cust18_rdc);
    GridObj.SetCellValue('CUST_99', index_rdc, cum_cust99_rdc);
    
    // �ʱ� ������, ������ ���ϱ�
    setSupplyRateAndBox("normal");    
	
	doGrouping();
}

function set_GroupMerge_dw1() {

	// �÷� �׷�
	GridObj.SetGroupMerge(	'DC_ID,DC_NAME,' +
							'GOAL_00,GOAL_11,GOAL_13,GOAL_14,GOAL_17,GOAL_18,GOAL_21,GOAL_23,RATE_00,RATE_11,RATE_13,RATE_14,RATE_17,RATE_18,RATE_21,RATE_23,' +
							'SUPPLY_RATE,SUPPLY_RATE_BOX,' +
							'PRE_MONTH_SELL,PRE_MONTH_SELL_00,PRE_MONTH_SELL_01,PRE_MONTH_SELL_02,PRE_MONTH_SELL_03,PRE_MONTH_SELL_04,PRE_MONTH_SELL_05' +
							'SALES_PLAN,' +
							'SALES_PRE_CUM,SALES_PRE_CUM_00,SALES_PRE_CUM_01,SALES_PRE_CUM_02,SALES_PRE_CUM_03,SALES_PRE_CUM_04,SALES_PRE_CUM_05' +
							'SALES_PRE,SALES_PRE_00,SALES_PRE_01,SALES_PRE_02,SALES_PRE_03,SALES_PRE_04,SALES_PRE_05' +
							'ISSUE,ISSUE_00,ISSUE_YO,ISSUE_YS,ISSUE_TA,ISSUE_WMS,ISSUE_EX,' +
							'SALES_MEAN_1WEEK,SALES_MEAN_1WEEK_ETC,SALES_MEAN_3WEEK,SALES_MEAN_3WEEK_ETC,' +
							'BASE_STOCK,RECEIPT,CHGO_QTY,CHGO,DELV,TRAN,STOCK_DAY,STOCK_DAY_1W, STOCK_DAY_3W,STOCK_TERM,' +
							'SALES_PLAN_D1,SALES_PLAN_00_D1,DC_ALLOC_PLAN_D1,' +
							'ISSUE_D1,ISSUE_00_D1,ISSUE_YO_D1,ISSUE_YS_D1,ISSUE_TA_D1,ISSUE_WMS_D1,ISSUE_EX_D1,' +
							'STOCK_EXPT,REP_QTY,'+
							'NEXT_STOCK_DAY,NEXT_STOCK_DAY_1W,NEXT_STOCK_DAY_3W'+
							'NEXT_STOCK_EXPT,' +
							'EDI_00_D,EDI_22_D,EDI_21_D,EDI_ETC_D,' +
							'EDI_00_D1,EDI_22_D1,EDI_21_D1,EDI_ETC_D1,' +
							'EDI_00_D2,EDI_22_D2,EDI_21_D2,EDI_ETC_D2,' +
							'REMN_CAPA_BOX,' +
							'CUST_00,CUST_TOT,CUST_10,CUST_11,CUST_16,CUST_14,CUST_19,CUST_18,CUST_99,' +
							'MAP_STOCK_BOX'); 
	
}


function setGrid2(){
		// �÷� �׷�
	GridObj2.SetColFix('DC_NAME');
			
	// ���� ���� ����
	//GridObj.SetColCellActivation('SP01','disable');
	
	//�÷� ���ڻ�
	//GridObj.SetCellFgColor('C38', i, '255|10|10');
	
	// �� ���
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Get Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	for(i=0;i<GridObj2.GetRowCount( );i++ ) {
		// FERT�̰� ���갡�ɰ����̸� ����ɷ��� ���Ȯ�������� COPY�Ѵ�.
		if(GridObj2.GetCellValue("PROD_AVAILABLE", i) == "Y" && document.frm.itype.value == "FERT") {
//			GridObj2.SetCellValue('TRANS_QTY',i,GridObj2.GetCellValue("CONF_STOCK", i));
			GridObj2.SetCellBgColor('DC_NAME', i, '202|255|255');
		}
		else {
//			GridObj2.SetCellValue('TRANS_QTY',i,0);
		}
	}	

	// �հ�
	GridObj2.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'BASE_STOCK,CHGO_QTY,PROD01_1,PROD01_3,CONF_STOCK,TRANS_QTY,NEXT_CHGO_QTY,NEXT_TRANS_QTY,USE_CAPA,PROD01,PROD02,PROD03,PROD04,PROD05,PROD06,PROD07,PROD08,PROD09,PROD10,PROD11,PROD12,PROD13,PROD14,PROD15,PROD16,PROD17,PROD18,PROD19,PROD20'); 
	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
			
	// �÷� ����
	GridObj2.SetColCellBgColor('TRANS_QTY',color_edit_col);//Ȯ����
	GridObj2.SetColHDBgColor('USE_CAPA','253|228|229'); //��ü���
 
	// cross-dockingǰ���� ���� ���ϰ�ȹ�� rotation column�̴�!
	if(document.frm.cd_gubn.value == "CROSS-DOCKING") {
		GridObj2.SetColHDBgColor('NEXT_TRANS_QTY','253|228|229');
	}	
	
}

function setGrid3(){ 			//���� 2012-05-30 �̽¿� �븮 ��û//

	var alloc_zone;
	var rowCnt = GridObj3.GetRowCount();
	for ( i = 0 ; i < rowCnt ; i++ ){
		alloc_zone = GridObj3.GetCellValue("ALLOC_ZONE", i);
		if( alloc_zone != "����" ){
			GridObj3.SetRowBgColor(i, '255|173|143'); // row ����
			//GridObj3.SetCellFontBold('CNFM_DATE', i, 'true'); // font ����  
			GridObj3.SetCellFontBold('ALLOC_ZONE', i, 'true'); // font ����  
   		}
	}
}

/*********************************************   WiseGrid Event   *********************************************************/ 

/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	
	//alert("nOldIndex="+nOldIndex);
	//alert("nNewIndex="+nNewIndex);
	
	if( strColumnKey == "SRC_LOC" ){ // CDC����
	
		var old_box_per_plt = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
		var src_loc 		= Number(GridObj.GetComboHiddenValue('SRC_LOC',nNewIndex));
		var item_id			= document.frm.item_id.value;		
			
		commonUtil.getSelQeury( "src_loc!%!item_id", src_loc+"!%!"+item_id, "rp_01160_Get_BOX_PER_PAL",{
			callback:function(result){
//alert(Number(result[0][1]));
		 		if(old_box_per_plt != Number(result[0][1])) {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, Number(result[0][1]));
				
					if(Number(GridObj.GetCellValue("TRANS_PLAN_QTY", nRow)) > 0)
						// ������ ���� �ȷ��� �ڽ����� ����Ǿ����Ƿ� �ٽ� ���
						if(document.frm.in_trans_unit[0].checked == true) // ���۴��� pal
							GridChangeCell("TRANS_PLAN_PLT",nRow ); // �ȷ��������� ����
						else // ���۴��� box or �ּҼ��۴���
							GridChangeCell("TRANS_PLAN_QTY",nRow ); // ������������ ���� 
				}
		
			}
		});   
	}
	
};

//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow) {
//	setChangeCheckFlag(objBox);
	if( strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY" ){
		// BOX �� ���
		if( strColumnKey == "TRANS_PLAN_QTY" ) {
			// PLT ���� ���
			var boxQty 		= Number(GridObj.GetCellValue("TRANS_PLAN_QTY", nRow));
			var boxPerPalet = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
			var resultQty   = Math.round(boxQty*100 / boxPerPalet)/100;
			GridObj.SetCellValue("TRANS_PLAN_PLT", nRow, resultQty	);

		}
		// PLT �� ���
		if( strColumnKey == "TRANS_PLAN_PLT" ) {
			// Box ���� ���
			var pltQty 		= Number(GridObj.GetCellValue("TRANS_PLAN_PLT", nRow));
			var boxPerPalet = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
			var resultQty   = Math.round(Math.round(pltQty * boxPerPalet*100)/100,0);
			GridObj.SetCellValue("TRANS_PLAN_QTY", nRow, resultQty	);
		}
		
		// ���� �÷���
//		GridObj.SetCellValue("PLAN_UPDATE_FLAG", nRow, "Y");
		compute_expt_stock_dw1(); // �Ұ�, �հ�, ��������ϼ�, ������� ����
		
		oldRow = nRow;
	}
	else if( strColumnKey == "SAFETY_STOCK" ){
		// ���� �÷���
		GridObj.SetCellValue("SAFE_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}
	else if( strColumnKey == "MIN_PICK_QTY" ){
		// ���� �÷���
		GridObj.SetCellValue("UNIT_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}

}

/*����������������������������������������������������������������������������������
  ��WiseGrid User Context Menu Click Event
  ����������������������������������������������������������������������������������*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
		
	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
		
		if( strMenuItemKey == "MENU01" ){		// ROW �߰�
		
			insertRow( nRow );	
			
		}
		else {
			alert("���� ���� ���� �޴��Դϴ�.");
		}		
	}

};


/*������������������������������������������������������������������������
  ��WiseGrid Cell Click Event
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){
/*
	var dc_name = GridObj.GetCellValue("DC_NAME", nRow);
	if( (strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY")
		&& ( dc_name != "��ü �հ�" && dc_name != "CDC �հ�" && dc_name != "RDC �հ�" ) ){

		// ������� �������� �ʰ� ���� �����Ϸ��� �� ���..
		var dc_id = GridObj.GetCellValue("SRC_LOC", nRow);
		if( dc_id == "" || dc_id == null){
			alert("PLT, BOX���� �����ϱ� ���� ������� ���� �����Ͽ� �ֽʽÿ�.");
			GridObj.SetCellFocus('SRC_LOC', nRow, true) 
			return;
		}

		// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
		var item_id = document.frm.item_id.value;
		if( item_id == null || item_id == "" ){
			return
		}		
		
		replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet_new", { 
		//replenishPlan.getBoxPerPalet(DC_SHORT_NAME, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
			callback:function(boxPerPalet){
				if( boxPerPalet == null || boxPerPalet == "" ) {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, '100');
				}
				else {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, boxPerPalet);
				}
			}
		});	
	}
	*/

}

function CellDblClick_DW2(strColumnKey, nRow) {
	
	
	
	

	if(strColumnKey == "DC_NAME") {
		GridObj2.SetCellValue('TRANS_QTY',nRow,GridObj2.GetCellValue("CONF_STOCK", nRow));
	}
}

function CellDblClick_DW3(strColumnKey, nRow) {

	/* ����->����(01)->����(04)->����(05)->����(02)->�λ�(03) ->		//
	// �߰� CVS(06)-> ����+CVS(07) -> CVS+����(08)-> ����+���� (09) */
	
	if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '01');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  
	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '04');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '05');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '02');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�λ�');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '03');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  
	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "�λ�") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '06');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  
	}
	///////////////////////// �����Ҵ� ���� �߰� ////////////////////////////
	// �߰� CVS(06)-> ����+CVS(07) -> CVS+����(08)-> ����+���� (09)
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "CVS") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����+CVS');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '07');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  
	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����+CVS") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS+����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '08');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  
	}	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "CVS+����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����+����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '09');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  
	}	
	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����+����") {		//2012-12-28 SCM�� �̽¿� �븮 ��û//
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'Ư��');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '10');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  
	}
	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "Ư��") {			//2012-12-28 SCM�� �̽¿� �븮 ��û//
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'Ư��+����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '11');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ���� 
	}
	
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "Ư��+����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '00');
    	GridObj3.SetRowBgColor(nRow, '255|255|255'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  
	}	
	///////////////////////// �����Ҵ� ���� �߰� ////////////////////////////


/*	// ����->����(01)->����(02)->�λ�(03)->����(04)->����(05)
	
	if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '00');
    	GridObj3.SetRowBgColor(nRow, '255|255|255'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'false'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '01');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '02');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�λ�');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '03');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else if(GridObj3.GetCellValue("ALLOC_ZONE", nRow) == "�λ�") {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '04');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  

	}
	else {
		GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '05');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_ZONE', nRow, 'true'); // font ����  
	}
*/
	
/*	if(GridObj3.GetCellValue("ALLOC_GUBN", nRow) == "����") {
		GridObj3.SetCellValue("ALLOC_GUBN", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_GUBN", nRow, '1');
    	GridObj3.SetRowBgColor(nRow, '255|255|255'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_GUBN', nRow, 'false'); // font ����  

	}
	else {

		GridObj3.SetCellValue("ALLOC_GUBN", nRow, '����');
		GridObj3.SetCellHiddenValue("ALLOC_GUBN", nRow, '2');
    	GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
    	GridObj3.SetCellFontBold('ALLOC_GUBN', nRow, 'true'); // font ����  
	}
*/	
	
}

// ���۰�ȹ �Ұ�, �հ�, ���� ����ϼ�, ���� ������� ���
function compute_expt_stock_dw1() {

	var tot_box		 = 0, tot_cdc_box		= 0, tot_rdc_box		= 0, tot_temp_box;
	var tot_tran_pl  = 0, tot_cdc_tran_pl	= 0, tot_rdc_tran_pl	= 0;
	var tot_tran_box = 0, tot_cdc_tran_box	= 0, tot_rdc_tran_box	= 0;
	var stock_expt 	 = 0, trans_plan_qty 	= 0, trans_plan_plt 	= 0, expt_stock_day = 0, expt_stock_box = 0;
	var dc_mean_sell = 0,dc_mean_sell_3w = 0, dc_mean_sell_1w = 0, cdc_chgo_box 		= 0;
	var tot_index, tot_cdc_index, tot_rdc_index;
	// ������/������/�����Ҵ� �Ǵ�
//	var in_supply_gubn = document.frm.in_supply_gubn.value;
	var in_supply_gubn = "01";
	// 3�����/1�����/(1+3)��/2 ���� �Ǵ�
//	var in_mean_sell = document.frm.in_mean_sell.value;
	var in_mean_sell = "01";
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);  // 
		cdc_cnt = GridObj.GetCellValue("CDC_CNT", i);
		dc_id 	= GridObj.GetCellValue("DC_ID", i);
		if(ord_no != '1' && ord_no != '3' && ord_no != '5') { // �հ�,�Ұ�
			
			dc_mean_sell    = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);
			dc_mean_sell_3w = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);	
			dc_mean_sell_1w = GridObj.GetCellValue("SALES_MEAN_1WEEK", i);	
			
			stock_expt 		= GridObj.GetCellValue("STOCK_EXPT", i);
			trans_plan_qty  = 0;
			trans_plan_plt  = 0;
			cdc_chgo_box	= 0;
			
			// ���� CDC ��ȹ�� �ִ� ���� ������� �Ѵ�.
			for(j=0;j<GridObj.GetRowCount( );j++ ) {
				// �̰��԰��ȹ
				if(dc_id == GridObj.GetCellValue("DC_ID", j)) {
					trans_plan_qty = trans_plan_qty + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", j));
					trans_plan_plt = trans_plan_plt + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", j));
				}
				// ��������ȹ
				if(dc_id == GridObj.GetCellHiddenValue('SRC_LOC',j)) {
					cdc_chgo_box = cdc_chgo_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", j));
				}
			}
			
			/* ���� 3����� ����ϼ� ��� */
			if(dc_mean_sell <= 0) {
				expt_stock_day = 0.0;
			
				expt_stock_box = strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
			}
			else {
				
				expt_stock_day	= Math.round((strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box))
								/ dc_mean_sell * 10)/10;		//3�� ��� //
				expt_stock_box	= strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
								
			}
			
			/* 3����� ����ϼ� ��� */
			if(dc_mean_sell_3w <= 0) {
				expt_stock_day_3w = 0.0;
			
				expt_stock_box = strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
			}
			else {
				
				expt_stock_day_3w		= Math.round((strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box))
								/ dc_mean_sell_3w * 10)/10;		//3�� ��� //
				expt_stock_box	= strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box);
								
			}
			/* 1����� ����ϼ� ��� */
			if(dc_mean_sell_1w <= 0) {
				expt_stock_day_1w = 0.0; // 1�� ��� �ʱ�ȭ //
			}
			else {
				expt_stock_day_1w	= Math.round((strToNum(stock_expt) + strToNum(trans_plan_qty) - strToNum(cdc_chgo_box))
								/ dc_mean_sell_1w * 10)/10;
			}
			
			if(next_stock_idx == 0) {	
				GridObj.SetCellValue("NEXT_STOCK_DAY",	 i,      expt_stock_day_1w);      
			}
			else {
				GridObj.SetCellValue("NEXT_STOCK_DAY",	 i,      expt_stock_day_3w);      
			}
			GridObj.SetCellValue("NEXT_STOCK_DAY_1W",i,   expt_stock_day_1w);      //1�� ��� �߰� //
			GridObj.SetCellValue("NEXT_STOCK_DAY_3W",i,   expt_stock_day_3w);			//3�� ��� //
			GridObj.SetCellValue("NEXT_STOCK_EXPT",  i,		 expt_stock_box);

			tot_box = tot_box + expt_stock_box;
			if(ord_no == '2' && cdc_cnt == 1 ) { // �ߺ������� ����
				tot_cdc_box = tot_cdc_box + expt_stock_box; // CDC�̴�
			}
			else if(ord_no == '4' && cdc_cnt == 1 ) { // �ߺ������� ����
				tot_rdc_box = tot_rdc_box + expt_stock_box; // RDC�̴�
			}
			
			// ���۷�, �ȷ� �Ұ�, �Ѱ�
			tot_tran_box =	tot_tran_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
			tot_tran_pl  =  tot_tran_pl  + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", i));
			if(ord_no == '2') { 
				tot_cdc_tran_box = tot_cdc_tran_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
				tot_cdc_tran_pl  = tot_cdc_tran_pl  + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", i));
			}
			else if(ord_no == '4') {
				tot_rdc_tran_box = tot_rdc_tran_box + strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));
				tot_rdc_tran_pl  = tot_rdc_tran_pl  + strToNum(GridObj.GetCellValue("TRANS_PLAN_PLT", i));
			}
		}
		else {  // �հ�,�Ұ�κ��� index�� �����Ѵ�.
			if(ord_no == '1') tot_index = i;  //�Ѱ�
			else if(ord_no == '3') tot_cdc_index = i;  //CDC�հ�
			else tot_rdc_index = i; // RDC�հ�
		}
		
		// ������ �ִ� ���� font�� bold�� �Ѵ�.
		if(strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i)) > 0) {
	    	GridObj.SetCellFontBold('TRANS_PLAN_PLT', i, 'true'); // font ����  
	    	GridObj.SetCellFontBold('TRANS_PLAN_QTY', i, 'true'); // font ����  
    	}
    	else {
	    	GridObj.SetCellFontBold('TRANS_PLAN_PLT', i, 'false'); // font ����  
	    	GridObj.SetCellFontBold('TRANS_PLAN_QTY', i, 'false'); // font ����  
    	}
		
	}

	var tot_mean_sell  	  = 0, tot_mean_sell_3w  	= 0, tot_mean_sell_1w  	  = 0;
	var tot_cdc_mean_sell = 0, tot_cdc_mean_sell_3w = 0, tot_cdc_mean_sell_1w = 0;
	var tot_rdc_mean_sell = 0, tot_rdc_mean_sell_1w = 0, tot_rdc_mean_sell_1w = 0;
	
	// (���Ͽ������ + ���۰�ȹ��(���� ���۹���)) / 3�����
		tot_mean_sell_3w 	 = GridObj.GetCellValue("SALES_MEAN_3WEEK", tot_index);
		tot_cdc_mean_sell_3w = GridObj.GetCellValue("SALES_MEAN_3WEEK", tot_cdc_index);
		tot_rdc_mean_sell_3w = GridObj.GetCellValue("SALES_MEAN_3WEEK", tot_rdc_index);	
		tot_mean_sell_1w 	 = GridObj.GetCellValue("SALES_MEAN_1WEEK", tot_index);
		tot_cdc_mean_sell_1w = GridObj.GetCellValue("SALES_MEAN_1WEEK", tot_cdc_index);
		tot_rdc_mean_sell_1w = GridObj.GetCellValue("SALES_MEAN_1WEEK", tot_rdc_index);	

if(next_stock_idx == 0) {	
	// �հ�,�Ұ�κ� �����Ѵ�. //1�� ��� �߰� //
	if (tot_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, Math.round(tot_box/tot_mean_sell_1w*10)/10);
	if (tot_cdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_1w*10)/10);
	if (tot_rdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_1w*10)/10);
}
else {
	// �հ�,�Ұ�κ� �����Ѵ�. //���� 3�� ��� ���//
	if (tot_mean_sell_3w<= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_index, Math.round(tot_box/tot_mean_sell_3w*10)/10);
	if (tot_cdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_3w*10)/10);
	if (tot_rdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_3w*10)/10);
}
	// �հ�,�Ұ�κ� �����Ѵ�. //3�� ��� //
	if (tot_mean_sell_3w<= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_index, Math.round(tot_box/tot_mean_sell_3w*10)/10);
	if (tot_cdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_3w*10)/10);
	if (tot_rdc_mean_sell_3w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_3W", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_3w*10)/10);
	
	// �հ�,�Ұ�κ� �����Ѵ�. //1�� ��� �߰� //
	if (tot_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_index, Math.round(tot_box/tot_mean_sell_1w*10)/10);
	if (tot_cdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_cdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_cdc_index, Math.round(tot_cdc_box/tot_cdc_mean_sell_1w*10)/10);
	if (tot_rdc_mean_sell_1w <= 0) GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_rdc_index, 0.0);
	else GridObj.SetCellValue("NEXT_STOCK_DAY_1W", tot_rdc_index, Math.round(tot_rdc_box/tot_rdc_mean_sell_1w*10)/10);
	
	GridObj.SetCellValue("NEXT_STOCK_EXPT",tot_index,tot_box);
	GridObj.SetCellValue("NEXT_STOCK_EXPT",tot_cdc_index,tot_cdc_box);
	GridObj.SetCellValue("NEXT_STOCK_EXPT",tot_rdc_index,tot_rdc_box);

	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_index,tot_tran_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_cdc_index,tot_cdc_tran_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_rdc_index,tot_rdc_tran_box);

	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_index,tot_tran_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_cdc_index,tot_cdc_tran_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_rdc_index,tot_rdc_tran_pl);
	
	next_stock_idx--;
	HeaderClick_DW1("NEXT_STOCK_DAY");	
	
	// ������, �������� ���
	setSupplyRateAndBox("normal");
}

///////////////////////////////////////////////////////////
// ��ü���޷��� ����������� �Ҵ��ϴ� �Լ�
// ORD_NO : ���հ� 1, CDC 2, CDC�հ� 3, RDC 4, RDC�հ� 5
// CDC_CNT : ������ CDC���� ����Ǵ� ��� 1,2,3,...  ����ڰ� ROW�� �߰��� ���� CNT�� �÷�����!
///////////////////////////////////////////////////////////
function Do_DC_Allocate(obj) {

	var confirm_qty = obj.value;
	var confirm_trans_qty = GridObj2.GetSummaryBarValue('SUMMARY1','TRANS_QTY',0,true);

	// 1. DW2���� Ȯ���� �ѷ��� CONFIRM�� ������ ���ؼ� �� ū �ڽ��� �����Ϸ��� �Ҷ��� Ȯ�� �޼����� ǥ���Ѵ�.
	if(strToNum(confirm_qty) > strToNum(confirm_trans_qty) 
		&& confirm("���Ȯ����("+numberFormat(confirm_trans_qty)+")���� ��ü���޷�("+numberFormat(confirm_qty)+")�� Ů�ϴ�! ��� �����Ͻðڽ��ϱ�?") != 1 ) {
		return;
	}

//alert(GridObj2.GetSummaryBarValue('SUMMARY1','TRANS_QTY',0,true));

	var dc_id, cdc_id;
	var ord_no, cdc_cnt;
	var tot_box = 0, tot_cdc_box = 0, tot_rdc_box = 0, tot_temp_box, end_tot_box=0;
	var tot_pl  = 0, tot_cdc_pl  = 0, tot_rdc_pl  = 0;
	var tot_index, tot_cdc_index, tot_rdc_index;
	var tot_mean_sell = 0, tot_stock_expt = 0;
	var dc_trans_qty, dc_pl_qty, dc_mean_sell = 0, dc_stock_expt;
	var dc_trans_usr_temp;
	var continue_flag;
	
	// C/D ��޹�� 01 : C/D����, 02 : C/D�߰�, 03 : �Ϲ�
	var chk_involve_CD = document.frm.chk_involve_CD.value; 
	var cd_flag = "00", cd_flag_temp = "00";
	
	// ������/������/�����Ҵ� �Ǵ�
	var in_supply_gubn = document.frm.in_supply_gubn.value;
	// 3�����/1�����/(1+3)��/2 ���� �Ǵ�
	var in_mean_sell   = document.frm.in_mean_sell.value;
	var cdc_check_flag = false;

	var in_zone_gubn   = document.frm.in_zone_gubn.value; // ��ü/������/�λ�� ����
	
	// ������ �ʱ�ȭ
	setSupplyRateAndBox("init");

	// Ȯ���� 0�� ����ȹ ����
	if(strToNum(confirm_qty)<=0) {
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			GridObj.SetCellValue("TRANS_PLAN_PLT",i,0)
			GridObj.SetCellValue("TRANS_PLAN_QTY",i,0)
			GridObj.SetComboSelectedIndex('SRC_LOC',i,-1);
			// ������ ������ ��� �Ѱ��� �����.
			if(GridObj.GetCellValue("CDC_CNT", i) != "1") {
				GridObj.DeleteRow(i);
				i--;
				continue;
			}
		}
		compute_expt_stock_dw1(); // ��������ϼ�, ������� ����
		return;
	}

// VER 3.1 ����ϼ� ����ȭ�� ���� DO WHILE������ ����� �ݺ��Ѵ�.
do {
	
	end_tot_box    = tot_box; 
	tot_mean_sell  =  0;
	tot_stock_expt =  0;
	// ���� �����Ǹſ� ���� ��������� ����CDC�� ������ �����Ѵ�.
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);  // 
		cdc_cnt = GridObj.GetCellValue("CDC_CNT", i);
		dc_id   = GridObj.GetCellValue("DC_ID", i);
		cd_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", i);

		// ������ ������ ��� �Ѱ��� �����.
		if(GridObj.GetCellValue("CDC_CNT", i) != "1") {
			GridObj.DeleteRow(i);
			i--;
			continue;
		}
		// ver 2.0 �λ����� ���� ����ó���ǵ��� ord_no�� '7'�� �����!
		if(dc_id == "7700") {
			GridObj.SetCellHiddenValue("ORD_NO", i, GridObj.GetCellValue("ORD_NO", i));
			GridObj.SetCellValue("ORD_NO", i, "7");
			continue;
		}
		
		// VER 3.0 ������/�λ�� ����
		if(in_zone_gubn == "1"){ // ������
			if(GridObj.GetCellValue("ZONE", i) == "7") {
				GridObj.SetCellHiddenValue("ORD_NO", i, GridObj.GetCellValue("ORD_NO", i));
				GridObj.SetCellValue("ORD_NO", i, "7");
				continue;
			}
		}
		else if(in_zone_gubn == "7") { // �λ��
			if(GridObj.GetCellValue("ZONE", i) == "1") {
				GridObj.SetCellHiddenValue("ORD_NO", i, GridObj.GetCellValue("ORD_NO", i));
				GridObj.SetCellValue("ORD_NO", i, "7");
				continue;
			}
		}
		
		if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7' && cdc_cnt == 1) { // �հ�,�Ұ�, �ߺ������� ����
			for(j=0;j<GridObj2.GetRowCount( );j++ ) {
				cdc_id = GridObj2.GetCellHiddenValue("DC_NAME", j);
				if(dc_id == cdc_id && strToNum(GridObj2.GetCellValue("TRANS_QTY", j)) > 0) {	// ����Ȯ������ �ִ� CDC���� ����Ȯ��

					cdc_check_flag = true;
					break;
				}
			}
			if( chk_involve_CD == "01" ) { // CD���� : C/D���� 
				if(cdc_check_flag == false && cd_flag != "01"){ // ����CDC�� �ƴѰ�츸 ó��

					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3�����
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1�����
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)��/2
						tot_mean_sell = strToNum(tot_mean_sell) + Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // ��������
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", i));	
					}
					else if(in_supply_gubn == "02"){ // �ǸŰ�ȹ(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", i));
					}	
					else if(in_supply_gubn == "03"){ // �����Ҵ�(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
					}
					else if(in_supply_gubn == "04"){ // ������
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", i));
					}
					tot_stock_expt = strToNum(tot_stock_expt) + strToNum(GridObj.GetCellValue("STOCK_EXPT", i));
				}
			}
			else  { // CD���� : C/D�߰�, �Ϲ�

				if(cdc_check_flag == false){ // ����CDC�� �ƴѰ�츸 ó��
					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3�����
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1�����
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i));	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)��/2
						tot_mean_sell = strToNum(tot_mean_sell) + Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // ��������
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", i));	
					}
					else if(in_supply_gubn == "02"){ // �ǸŰ�ȹ(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", i));
					}	
					else if(in_supply_gubn == "03"){ // �����Ҵ�(D+1)
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
					}
					else if(in_supply_gubn == "04"){ // ������
						tot_mean_sell = strToNum(tot_mean_sell) + strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", i));
					}
					tot_stock_expt = strToNum(tot_stock_expt) + strToNum(GridObj.GetCellValue("STOCK_EXPT", i));
				}
			
			}
			
			cdc_check_flag = false;		
		}
	}

//alert("tot_mean_sell = "+tot_mean_sell+"  tot_stock_expt = "+tot_stock_expt);

	// ������ 0�ΰ�츦 üũ�Ѵ�.
	if(tot_mean_sell<= 0) return;

	tot_box = 0;

	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);
		dc_id	= GridObj.GetCellValue("DC_ID", i);

		// PL,BOX,CDC �ʱ�ȭ 
		GridObj.SetCellValue("TRANS_PLAN_PLT",i,0)
		GridObj.SetCellValue("TRANS_PLAN_QTY",i,0)
		GridObj.SetComboSelectedIndex('SRC_LOC',i,-1);
		cd_flag = GridObj.GetCellValue("SAFETY_STOCK_FLAG", i);
		
		continue_flag = true;
		if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����

			// ����CDC���� check�Ѵ�.
			if(ord_no == "2") { // CDC�� ��쿡 ���ؼ��� Ȯ��
				for(j=0;j<GridObj2.GetRowCount( );j++ ) {
		
					if(GridObj2.GetCellValue("TRANS_QTY", j) > 0) {
						if(dc_id == GridObj2.GetCellHiddenValue("DC_NAME", j)) {
//alert("(2)ord_no ="+ord_no+"  dc_id = "+dc_id);	
							GridObj.SetCellValue("TRANS_PLAN_QTY",i,0)
							continue_flag = false;  // ���� ����� �������� �ʴ´�.
							break;
						}
					}		
			
				}
			}
			
			if( chk_involve_CD == "01" ) { // CD���� : C/D���� 
				
				if(continue_flag == true && cd_flag != "01") {	
					
					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3�����
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1�����
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_1WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)��/2
						dc_mean_sell = Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // ��������
						dc_mean_sell = GridObj.GetCellValue("PRE_MONTH_SELL", i);	
					}
					else if(in_supply_gubn == "02"){ // �ǸŰ�ȹ(D+1)
						dc_mean_sell = GridObj.GetCellValue("SALES_PLAN_00_D1", i);
					}	
					else if(in_supply_gubn == "03"){ // �����Ҵ�(D+1)
						dc_mean_sell = GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i);
					}
					else if(in_supply_gubn == "04"){ // ������
						dc_mean_sell = GridObj.GetCellValue("SUPPLY_RATE_BOX", i);
					}
	
					dc_stock_expt = GridObj.GetCellValue("STOCK_EXPT", i);  // DC �������
					// DC���淮 ����
					dc_trans_qty = Math.round((strToNum(dc_mean_sell)/strToNum(tot_mean_sell)*(strToNum(tot_stock_expt) + strToNum(confirm_qty)) - strToNum(dc_stock_expt)));
//if(dc_id == "8510") alert(" 3���Ǹ� = "+dc_mean_sell+" ���Ǹ� = "+tot_mean_sell+" �ѿ������ = "+tot_stock_expt+" Ȯ���� = "+confirm_qty+" ������� = "+dc_stock_expt +" ���淮 = "+dc_trans_qty);
					if(dc_trans_qty <= 0) {
						dc_trans_qty = 0;
						GridObj.SetCellValue("ORD_NO", i, "7");
					}
				
					if(dc_trans_qty > 0) {
						GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty)
					}
					tot_box = tot_box + dc_trans_qty;
				}
			}
			else if(chk_involve_CD == "02" ) { // CD���� : C/D�߰����

				if(continue_flag == true && cd_flag != "01") {	
					dc_mean_sell = 0;
					if(ord_no == "2") { // CDC�̴�!
						for(j=0;j<GridObj.GetRowCount( );j++ ) {
							
							cd_flag_temp = GridObj.GetCellValue("SAFETY_STOCK_FLAG", j);
							if((GridObj.GetCellValue("CD_SRC_LOC",j) == dc_id  && cd_flag_temp == "01")
								|| GridObj.GetCellValue("CD_SRC_LOC",j) == dc_id ) { // ���� ��������̸鼭 C/D�� ��! 
						
								if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3�����
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", j));	
								}
								else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1�����
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", j));	
								}
								else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)��/2
									dc_mean_sell = dc_mean_sell + Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", j)) 
													+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", j)))/2);
								}
								else if(in_supply_gubn == "01" && in_mean_sell == "04") { // ��������
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", j));	
								}
								else if(in_supply_gubn == "02"){ // �ǸŰ�ȹ(D+1)
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", j));
								}	
								else if(in_supply_gubn == "03"){ // �����Ҵ�(D+1)
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", j));
								}
								else if(in_supply_gubn == "04"){ // ������
									dc_mean_sell = dc_mean_sell + strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", j));
								}
							}
							
						}
					}
					else {
						
						if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3�����
							dc_mean_sell = strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i));	
						}
						else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1�����
							dc_mean_sell = strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i));	
						}
						else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)��/2
							dc_mean_sell = Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
											+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
						}
						else if(in_supply_gubn == "01" && in_mean_sell == "04") { // ��������
							dc_mean_sell = strToNum(GridObj.GetCellValue("PRE_MONTH_SELL", i));	
						}
						else if(in_supply_gubn == "02"){ // �ǸŰ�ȹ(D+1)
							dc_mean_sell = strToNum(GridObj.GetCellValue("SALES_PLAN_00_D1", i));
						}	
						else if(in_supply_gubn == "03"){ // �����Ҵ�(D+1)
							dc_mean_sell = strToNum(GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i));
						}
						else if(in_supply_gubn == "04"){ // ������
							dc_mean_sell = strToNum(GridObj.GetCellValue("SUPPLY_RATE_BOX", i));
						}
					}
					
//alert(dc_id+'-'+dc_mean_sell);					
					dc_stock_expt = GridObj.GetCellValue("STOCK_EXPT", i);  // DC �������
					// DC���淮 ����
					dc_trans_qty = Math.round((strToNum(dc_mean_sell)/strToNum(tot_mean_sell)*(strToNum(tot_stock_expt) + strToNum(confirm_qty)) - strToNum(dc_stock_expt)));
					if(dc_trans_qty <= 0) {
						dc_trans_qty = 0;
						GridObj.SetCellValue("ORD_NO", i, "7");
					}						
				
					if(dc_trans_qty > 0) {
						GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty)
					}
					tot_box = tot_box + dc_trans_qty;
				}
				
			}
			else { // CD���� : �Ϲ�

				if(continue_flag == true ) {	
					
					if(in_supply_gubn == "01" && in_mean_sell == "01") { // 3�����
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_3WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "02") { // 1�����
						dc_mean_sell = GridObj.GetCellValue("SALES_MEAN_1WEEK", i);	
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "03") { // (1+3)��/2
						dc_mean_sell = Math.round((strToNum(GridObj.GetCellValue("SALES_MEAN_1WEEK", i)) 
										+ strToNum(GridObj.GetCellValue("SALES_MEAN_3WEEK", i)))/2);
					}
					else if(in_supply_gubn == "01" && in_mean_sell == "04") { // ��������
						dc_mean_sell = GridObj.GetCellValue("PRE_MONTH_SELL", i);	
					}
					else if(in_supply_gubn == "02"){ // �ǸŰ�ȹ(D+1)
						dc_mean_sell = GridObj.GetCellValue("SALES_PLAN_00_D1", i);
					}	
					else if(in_supply_gubn == "03"){ // �����Ҵ�(D+1)
						dc_mean_sell = GridObj.GetCellValue("DC_ALLOC_PLAN_D1", i);
					}
					else if(in_supply_gubn == "04"){ // ������
						dc_mean_sell = GridObj.GetCellValue("SUPPLY_RATE_BOX", i);
					}
	
					dc_stock_expt = GridObj.GetCellValue("STOCK_EXPT", i);  // DC �������
					// DC���淮 ����
					dc_trans_qty = Math.round((strToNum(dc_mean_sell)/strToNum(tot_mean_sell)*(strToNum(tot_stock_expt) + strToNum(confirm_qty)) - strToNum(dc_stock_expt)));
					if(dc_trans_qty <= 0) {
						dc_trans_qty = 0;
						GridObj.SetCellValue("ORD_NO", i, "7");
					}	

					if(dc_trans_qty > 0) {
						GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty)
					}
					tot_box = tot_box + dc_trans_qty;
				}
			}	
		}
		else {  // �հ�,�Ұ�κ��� index�� �����Ѵ�.
			if(ord_no == '1') tot_index = i;  //�Ѱ�
			else if(ord_no == '3') tot_cdc_index = i;  //CDC�հ�
			else if(ord_no == '5') tot_rdc_index = i; // RDC�հ�
		}
				
	}
	if(end_tot_box == tot_box) break; // ���ѷ��� ����

} while(tot_box > strToNum(confirm_qty) )
	

/*
	// ������� �������� �ѷ��������� ����Ȯ������ ��ü���޷��� �����ش�.
	// �̺κ��� �ʿ���� ���� ������ ���߿� CDC�� �����Ҷ� �Ҵ繰���� ���ڸ� �� ������ �� �� �ִ�.
	if(tot_box <= 0) return;
	tot_temp_box = tot_box;

	tot_box= 0; tot_cdc_box= 0;	tot_rdc_box= 0;
//alert( strToNum(confirm_qty)/tot_temp_box);
	// �Ѻ���䱸�� > ��ü���޷��϶�
	if(tot_temp_box > strToNum(confirm_qty) ) {
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����

	
				dc_trans_qty = strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i));

				//���� DC����䱸�� = (CDC����Ȯ����/�Ѻ���䱸��)*DC����䱸��
//				dc_trans_qty = Math.round(strToNum(confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
				GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);

 				tot_box = tot_box + dc_trans_qty;
				if(ord_no == '2') {
					tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC�̴�
				}
				else {
					tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC�̴�
				}
			}
		}	
	}	
*/
	// ��������� �����.
	var in_trans_unit = "";
	if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	else if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";
	else in_trans_unit = "usr";
	var box_per_palet  = document.frm.box_per_palet.value; // �ȷ��� �ڽ���
	var min_pick_qty; // �ּҼ��۴���
	var conv_confirm_qty = 0; //���� ��ü���޷�

	if(strToNum(box_per_palet) <= 0) {  // box_per_palet�� 0���ϸ� 1���Ѵ�.
		box_per_palet = 1;
	}
	
	if(in_trans_unit == "pal") { // ������� pallet
		tot_box = 0;    tot_cdc_box = 0;	tot_rdc_box = 0;
		tot_pl  = 0;	tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
		// 1) ��DC����䱸���� Ȯ�������� ū�� ������� �ȷ�Ʈ ȯ��
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����
				// 1-1) DC����䱸�� �����´�.
				dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
				// 1-2) �ȷ�Ʈ�� ȯ���Ѵ�.
				dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet));
				// 1-3) �ٽ� �ڽ��� ȯ���Ѵ�.
				dc_trans_qty = dc_pl_qty * strToNum(box_per_palet);
				
				GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
				GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
					
				if (dc_trans_qty > 0) {
					tot_pl = tot_pl + dc_pl_qty;
					tot_box = tot_box + dc_trans_qty;
					if(ord_no == '2') {
						tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC�̴�
						tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC�̴�
					}
					else {
						tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC�̴�
						tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC�̴�
					}
				}
			}
		}
		// 2) �Ѻ���䱸�� > ��ü���޷��϶�
		if(tot_box > strToNum(confirm_qty)) {
			if(tot_box <= 0) return;
			tot_temp_box = tot_box;
			for(k=1;k<10;k++){ // (�Ѻ���䱸�� >= ����Ȯ����)�� �� �� �ֵ��� �ݺ��Ѵ�.
				// ����Ȯ������ �ݿø� ������ ���ؼ� �ٽ� (�Ѻ���䱸�� >= ����Ȯ����)�� �� �� �����Ƿ� �ȷ�������ŭ ������Ű�鼭 �����Ѵ�.
				conv_confirm_qty = strToNum(confirm_qty) - strToNum(box_per_palet)*k;//(tot_box - strToNum(confirm_qty))*2;  
				tot_box = 0;    tot_cdc_box= 0;	tot_rdc_box= 0;
				tot_pl  = 0;	tot_cdc_pl= 0;	tot_rdc_pl= 0;
				for(i=0;i<GridObj.GetRowCount( );i++ ) {
					ord_no 	= GridObj.GetCellValue("ORD_NO", i);
					if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����
						dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
						if (dc_trans_qty > 0) {
							// 2-1) ���� DC����䱸�� = (CDC����Ȯ����/�Ѻ���䱸��)*DC����䱸��
							dc_trans_qty = Math.round(strToNum(conv_confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
							// 2-2) �ȷ�Ʈ�� ȯ���Ѵ�.
							dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet));
							// 2-3) �ٽ� �ڽ��� ȯ���Ѵ�.
							dc_trans_qty = dc_pl_qty * strToNum(box_per_palet);
							
							GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
							GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
							
							tot_pl = tot_pl + dc_pl_qty;
							tot_box = tot_box + dc_trans_qty;
							if(ord_no == '2') {
								tot_cdc_pl = tot_cdc_pl   + dc_pl_qty; // CDC�̴�
								tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC�̴�
							}
							else {
								tot_rdc_pl = tot_rdc_pl   + dc_pl_qty; // RDC�̴�
								tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC�̴�
							}
						}
					}
				}
				if(tot_box <= strToNum(confirm_qty)) break;
			}
		}
//alert("tot_box(3) = " + tot_box + " k= "+k);							
	}
	else if(in_trans_unit == "box") {  // ������� BOX
		if(tot_box <= 0) return;
		tot_temp_box = tot_box;
		// ����Ȯ������ �ݿø� ������ ���ؼ� �ٽ� (�Ѻ���䱸�� >= ����Ȯ����)�� �� �� �����Ƿ� ����Ȯ����*2�� ������ŭ �����Ѵ�.
		conv_confirm_qty = strToNum(confirm_qty) - (tot_box - strToNum(confirm_qty))*2;  //- box_per_palet;//  
		tot_box = 0; tot_cdc_box = 0;	tot_rdc_box = 0;
		tot_pl  = 0; tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����
				dc_trans_qty = strToNum(GridObj.GetCellValue("TRANS_PLAN_QTY", i)); 
				if (dc_trans_qty > 0) {
					
					// �Ѻ���䱸�� > ��ü���޷��϶�
					if(tot_temp_box > strToNum(confirm_qty) ) {
						//���� DC����䱸�� = (CDC����Ȯ����/�Ѻ���䱸��)*DC����䱸��
						dc_trans_qty = Math.round(strToNum(conv_confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
					}
					dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet)*100)/100;
					
					GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
					GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
					
					tot_pl  = tot_pl + dc_pl_qty;
					tot_box = tot_box + dc_trans_qty;
					if(ord_no == '2') {
						tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC�̴�
						tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC�̴�
					}
					else {
						tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC�̴�
						tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC�̴�
					}
				}
			}
		}
	}
	else { // ������� �ּҼ��۴���

		tot_box = 0; tot_cdc_box = 0;	tot_rdc_box = 0;
		tot_pl  = 0; tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
		// 1) ��DC����䱸���� Ȯ�������� ū�� ������� �ȷ�Ʈ ȯ��
		for(i=0;i<GridObj.GetRowCount( );i++ ) {
			ord_no 	= GridObj.GetCellValue("ORD_NO", i);
			if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����
				min_pick_qty = GridObj.GetCellValue("MIN_PICK_QTY", i); // �ּҼ��۴���
				if(strToNum(min_pick_qty) <= 0) min_pick_qty = 1;
				// 1-1) DC����䱸�� �����´�.
				dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
				// 1-2) �ּҼ��۴����� ȯ���Ѵ�.
				dc_trans_usr_temp = Math.round(strToNum(dc_trans_qty)/strToNum(min_pick_qty));
				// 1-3) �ٽ� �ڽ��� ȯ���Ѵ�.
				dc_trans_qty = dc_trans_usr_temp * strToNum(min_pick_qty);
				// 1-4) �ȷ����� ���Ѵ�.
				dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet)*100)/100;
				
				GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
				GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
					
				if (dc_trans_qty > 0) {
					tot_pl  = tot_pl  + dc_pl_qty;
					tot_box = tot_box + dc_trans_qty;
					if(ord_no == '2') {
						tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC�̴�
						tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC�̴�
					}
					else {
						tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC�̴�
						tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC�̴�
					}
				}
			}
		}
		// 2) �Ѻ���䱸�� > ��ü���޷��϶�
		if(tot_box > strToNum(confirm_qty)) {
			if(tot_box <= 0) return;
			tot_temp_box = tot_box;
			for(k=1;k<10;k++){ // (�Ѻ���䱸�� >= ����Ȯ����)�� �� �� �ֵ��� �ݺ��Ѵ�.
				// ����Ȯ������ �ݿø� ������ ���ؼ� �ٽ� (�Ѻ���䱸�� >= ����Ȯ����)�� �� �� �����Ƿ� �ȷ�������ŭ ������Ű�鼭 �����Ѵ�.
				conv_confirm_qty = strToNum(confirm_qty) - strToNum(box_per_palet)*k;//(tot_box - strToNum(confirm_qty))*2;  
				tot_box = 0;    tot_cdc_box = 0;	tot_rdc_box = 0;
				tot_pl  = 0;	tot_cdc_pl  = 0;	tot_rdc_pl  = 0;
				for(i=0;i<GridObj.GetRowCount( );i++ ) {
					ord_no 	= GridObj.GetCellValue("ORD_NO", i);
					if(ord_no != '1' && ord_no != '3' && ord_no != '5' && ord_no != '7') { // �հ�,�Ұ�κ��� ����
						min_pick_qty = GridObj.GetCellValue("MIN_PICK_QTY", i); // �ּҼ��۴���
						if(strToNum(min_pick_qty) <= 0) min_pick_qty = 1;
						dc_trans_qty = GridObj.GetCellValue("TRANS_PLAN_QTY", i); 
						if (dc_trans_qty > 0) {
							// 2-1) ���� DC����䱸�� = (CDC����Ȯ����/�Ѻ���䱸��)*DC����䱸��
							dc_trans_qty = Math.round(strToNum(conv_confirm_qty)/tot_temp_box*strToNum(dc_trans_qty));
							// 2-2) �ּҼ��۴����� ȯ���Ѵ�.
							dc_trans_usr_temp = Math.round(strToNum(dc_trans_qty)/strToNum(min_pick_qty));
							// 2-3) �ٽ� �ڽ��� ȯ���Ѵ�.
							dc_trans_qty = dc_trans_usr_temp * strToNum(min_pick_qty);
							// 2-4) �ȷ����� ���Ѵ�.
							dc_pl_qty = Math.round(strToNum(dc_trans_qty)/strToNum(box_per_palet)*100)/100;
							
							GridObj.SetCellValue("TRANS_PLAN_PLT",i,dc_pl_qty);
							GridObj.SetCellValue("TRANS_PLAN_QTY",i,dc_trans_qty);
							
							tot_pl  = tot_pl  + dc_pl_qty;
							tot_box = tot_box + dc_trans_qty;
							if(ord_no == '2') {
								tot_cdc_pl  = tot_cdc_pl  + dc_pl_qty; // CDC�̴�
								tot_cdc_box = tot_cdc_box + dc_trans_qty; // CDC�̴�
							}
							else {
								tot_rdc_pl  = tot_rdc_pl  + dc_pl_qty; // RDC�̴�
								tot_rdc_box = tot_rdc_box + dc_trans_qty; // RDC�̴�
							}
						}
					}
				}
				if(tot_box <= strToNum(confirm_qty)) break;
			}
		}	
		
	}
	
	// ��а�꿡�� �����ߴ� ��������� ���� �������� ���ͽ�Ų��.
	for(i=0;i<GridObj.GetRowCount( );i++ ) {
		ord_no 	= GridObj.GetCellValue("ORD_NO", i);
		if(ord_no 	== '7') {
			GridObj.SetCellValue("ORD_NO", i, GridObj.GetCellHiddenValue("ORD_NO", i));
		}
	}
	
	// �հ�,�Ұ�κ� �����Ѵ�.
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_index,tot_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_cdc_index,tot_cdc_pl);
	GridObj.SetCellValue("TRANS_PLAN_PLT",tot_rdc_index,tot_rdc_pl);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_index,tot_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_cdc_index,tot_cdc_box);
	GridObj.SetCellValue("TRANS_PLAN_QTY",tot_rdc_index,tot_rdc_box);

	compute_expt_stock_dw1(); // ��������ϼ�, ������� ����

}

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
}

/*������������������������������������������������������������������������
  ��WiseGrid Insert Row Fnc
  ������������������������������������������������������������������������*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if( rowCnt-1 == nRow ){ // ���ڸ� ������ ��� 
		GridObj.InsertRow(-1);
	}else{
		GridObj.InsertRow(nRow+1);
	}
	
	GridObj.SetCellValue("DC_ID"               			, nRow+1, GridObj.GetCellValue("DC_ID"                         , nRow));
	GridObj.SetCellValue("DC_NAME"             			, nRow+1, GridObj.GetCellValue("DC_NAME"                       , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL"      			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL"                , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL_00"   			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL_00"             , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL_01"   			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL_01"             , nRow));
	GridObj.SetCellValue("PRE_MONTH_SELL_02"   			, nRow+1, GridObj.GetCellValue("PRE_MONTH_SELL_02"             , nRow));
	GridObj.SetCellValue("SALES_PRE"           			, nRow+1, GridObj.GetCellValue("SALES_PRE"                     , nRow));
	GridObj.SetCellValue("SALES_PRE_00"        			, nRow+1, GridObj.GetCellValue("SALES_PRE_00"                  , nRow));
	GridObj.SetCellValue("SALES_PRE_01"        			, nRow+1, GridObj.GetCellValue("SALES_PRE_01"                  , nRow));
	GridObj.SetCellValue("SALES_PRE_02"        			, nRow+1, GridObj.GetCellValue("SALES_PRE_02"                  , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM"       			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM"                 , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM_00"    			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM_00"              , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM_01"    			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM_01"              , nRow));
	GridObj.SetCellValue("SALES_PRE_CUM_02"    			, nRow+1, GridObj.GetCellValue("SALES_PRE_CUM_02"              , nRow));
	GridObj.SetCellValue("SALES_PLAN"          			, nRow+1, GridObj.GetCellValue("SALES_PLAN"                    , nRow));
	GridObj.SetCellValue("ISSUE"               			, nRow+1, GridObj.GetCellValue("ISSUE"                         , nRow));
	GridObj.SetCellValue("ISSUE_00"            			, nRow+1, GridObj.GetCellValue("ISSUE_00"                      , nRow));
	GridObj.SetCellValue("ISSUE_YO"            			, nRow+1, GridObj.GetCellValue("ISSUE_YO"                      , nRow));
	GridObj.SetCellValue("ISSUE_YS"            			, nRow+1, GridObj.GetCellValue("ISSUE_YS"                      , nRow));
	GridObj.SetCellValue("ISSUE_TA"            			, nRow+1, GridObj.GetCellValue("ISSUE_TA"                      , nRow));
	GridObj.SetCellValue("ISSUE_WMS"           			, nRow+1, GridObj.GetCellValue("ISSUE_WMS"                     , nRow));
	GridObj.SetCellValue("ISSUE_EX"            			, nRow+1, GridObj.GetCellValue("ISSUE_EX"                      , nRow));
	GridObj.SetCellValue("SALES_MEAN_1WEEK"    			, nRow+1, GridObj.GetCellValue("SALES_MEAN_1WEEK"              , nRow));
	GridObj.SetCellValue("SALES_MEAN_1WEEK_ETC"			, nRow+1, GridObj.GetCellValue("SALES_MEAN_1WEEK_ETC"          , nRow));
	GridObj.SetCellValue("SALES_MEAN_3WEEK"    			, nRow+1, GridObj.GetCellValue("SALES_MEAN_3WEEK"              , nRow));
	GridObj.SetCellValue("SALES_MEAN_3WEEK_ETC"			, nRow+1, GridObj.GetCellValue("SALES_MEAN_3WEEK_ETC"          , nRow));
	GridObj.SetCellValue("BASE_STOCK"          			, nRow+1, GridObj.GetCellValue("BASE_STOCK"                    , nRow));
	GridObj.SetCellValue("RECEIPT"             			, nRow+1, GridObj.GetCellValue("RECEIPT"                       , nRow));
	GridObj.SetCellValue("CHGO_QTY"            			, nRow+1, GridObj.GetCellValue("CHGO_QTY"                      , nRow));
	GridObj.SetCellValue("CHGO"                			, nRow+1, GridObj.GetCellValue("CHGO"                          , nRow));
	GridObj.SetCellValue("DELV"                			, nRow+1, GridObj.GetCellValue("DELV"                          , nRow));
	GridObj.SetCellValue("TRAN"                			, nRow+1, GridObj.GetCellValue("TRAN"                          , nRow));
	GridObj.SetCellValue("STOCK_DAY"           			, nRow+1, GridObj.GetCellValue("STOCK_DAY"                     , nRow));
	GridObj.SetCellValue("STOCK_TERM"          			, nRow+1, GridObj.GetCellValue("STOCK_TERM"                    , nRow));
	GridObj.SetCellValue("SAFETY_STOCK"        			, nRow+1, GridObj.GetCellValue("SAFETY_STOCK"                  , nRow));
	GridObj.SetCellValue("SALES_PLAN_D1"       			, nRow+1, GridObj.GetCellValue("SALES_PLAN_D1"                 , nRow));
	GridObj.SetCellValue("SALES_PLAN_00_D1"    			, nRow+1, GridObj.GetCellValue("SALES_PLAN_00_D1"              , nRow));
	GridObj.SetCellValue("DC_ALLOC_PLAN_D1"    			, nRow+1, GridObj.GetCellValue("DC_ALLOC_PLAN_D1"              , nRow));
	GridObj.SetCellValue("ISSUE_D1"            			, nRow+1, GridObj.GetCellValue("ISSUE_D1"                      , nRow));
	GridObj.SetCellValue("ISSUE_00_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_00_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_YO_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_YO_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_YS_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_YS_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_TA_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_TA_D1"                   , nRow));
	GridObj.SetCellValue("ISSUE_WMS_D1"        			, nRow+1, GridObj.GetCellValue("ISSUE_WMS_D1"                  , nRow));
	GridObj.SetCellValue("ISSUE_EX_D1"         			, nRow+1, GridObj.GetCellValue("ISSUE_EX_D1"                   , nRow));
	GridObj.SetCellValue("STOCK_EXPT"          			, nRow+1, GridObj.GetCellValue("STOCK_EXPT"                    , nRow));
	GridObj.SetCellValue("REP_QTY"             			, nRow+1, GridObj.GetCellValue("REP_QTY"                       , nRow));

	GridObj.SetCellValue("TRANS_PLAN_PLT"      			, nRow+1, 0);
	GridObj.SetCellValue("TRANS_PLAN_QTY"      			, nRow+1, 0);

	GridObj.SetComboSelectedIndex('SRC_LOC',nRow+1,-1);

	GridObj.SetCellValue("MIN_PICK_QTY"        			, nRow+1, GridObj.GetCellValue("MIN_PICK_QTY"                  , nRow));
	GridObj.SetCellValue("NEXT_STOCK_DAY"      			, nRow+1, GridObj.GetCellValue("NEXT_STOCK_DAY"                , nRow));
	GridObj.SetCellValue("NEXT_STOCK_EXPT"     			, nRow+1, GridObj.GetCellValue("NEXT_STOCK_EXPT"               , nRow));
	GridObj.SetCellValue("EDI_00_D1"           			, nRow+1, GridObj.GetCellValue("EDI_00_D1"                     , nRow));
	GridObj.SetCellValue("EDI_TOT_D1"          			, nRow+1, GridObj.GetCellValue("EDI_TOT_D1"                    , nRow));
	GridObj.SetCellValue("EDI_22_D1"           			, nRow+1, GridObj.GetCellValue("EDI_22_D1"                     , nRow));
	GridObj.SetCellValue("EDI_21_D1"           			, nRow+1, GridObj.GetCellValue("EDI_21_D1"                     , nRow));
	GridObj.SetCellValue("EDI_ETC_D1"          			, nRow+1, GridObj.GetCellValue("EDI_ETC_D1"                    , nRow));
	GridObj.SetCellValue("EDI_00_D2"           			, nRow+1, GridObj.GetCellValue("EDI_00_D2"                     , nRow));
	GridObj.SetCellValue("EDI_TOT_D2"          			, nRow+1, GridObj.GetCellValue("EDI_TOT_D2"                    , nRow));
	GridObj.SetCellValue("EDI_22_D2"           			, nRow+1, GridObj.GetCellValue("EDI_22_D2"                     , nRow));
	GridObj.SetCellValue("EDI_21_D2"           			, nRow+1, GridObj.GetCellValue("EDI_21_D2"                     , nRow));
	GridObj.SetCellValue("EDI_ETC_D2"          			, nRow+1, GridObj.GetCellValue("EDI_ETC_D2"                    , nRow));

	GridObj.SetCellValue("CDC_CNT"             			, nRow+1, strToNum(GridObj.GetCellValue("CDC_CNT", nRow))+1);

	GridObj.SetCellValue("ORD_NO"              			, nRow+1, GridObj.GetCellValue("ORD_NO"                        , nRow));
	GridObj.SetCellValue("ROWNUM"              			, nRow+1, GridObj.GetCellValue("ROWNUM"                        , nRow));
	GridObj.SetCellValue("OLD_SAFE_QTY"        			, nRow+1, GridObj.GetCellValue("OLD_SAFE_QTY"                  , nRow));
	GridObj.SetCellValue("SAFE_UPDATE_FLAG"    			, nRow+1, GridObj.GetCellValue("SAFE_UPDATE_FLAG"              , nRow));
	GridObj.SetCellValue("UNIT_UPDATE_FLAG"    			, nRow+1, GridObj.GetCellValue("UNIT_UPDATE_FLAG"              , nRow));
	GridObj.SetCellValue("BOX_PER_PLT"         			, nRow+1, GridObj.GetCellValue("BOX_PER_PLT"                   , nRow));

}

function changeChecked(obj){ // ����� ��� ���� �Լ�//
	
	var sel_data = GridObj.GetSelectedCells(); // ������ �κ��� key�� row�� �����´�
	var i=0;
	var rowNo=0;

	/*  
	 * ù��° ���ȣ ã��
	 * ù��° ���� ������� ���簪 ã��
	 * 
	 * ���õǾ��� ����� ������� ù��° ����� ���簪���� �����ϱ�
	 * */
 
	var first_rowNo   = sel_data.split(",")[i*2+1];
	var first_src_loc = GridObj.GetCellHiddenValue("SRC_LOC", first_rowNo);
	
	var first_src_new_index = GridObj.GetComboSelectedIndex("SRC_LOC", first_rowNo); 
	if(first_src_loc == "" ){
		alert("ù ��° ������� �Է� ��, �ϰ������� �����Ͽ� �ֽʽÿ�.");
		return;
	} 


	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // ���̻� ������ ����
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//�ش� row�� check�� �Ѵ�
			var nOldIndex = GridObj.GetComboSelectedIndex("SRC_LOC", rowNo);
			var nNewIndex = first_src_new_index;
			
			GridObj.SetComboSelectedHiddenValue("SRC_LOC", rowNo,  first_src_loc);
			
				//GridObj.SetComboSelectedIndex("SRC_LOC", rowNo,  first_src_loc);
				//GridObj.SetComboSelectedIndex("SRC_LOC", rowNo,  nOldIndex);
			
			GridChangeComboHandler("SRC_LOC", rowNo, nOldIndex, nNewIndex)
		}
		i++;
	}	
	

}


// Context Menu ����� ���� Menu ���ý�
function handler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	var GridObj3 = document.WiseGrid3;
	var rowCnt = GridObj3.GetRowCount();
	var alloc_zone;
		//alert("strMenuKey="+strMenuKey);
	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
		
		if(strMenuItemKey == "MENU00" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');	
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '00');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}else if(strMenuItemKey == "MENU01" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '01');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
		}else if(strMenuItemKey == "MENU02" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '02');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
		}else if(strMenuItemKey == "MENU03" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�λ�');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '03');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
		}else if(strMenuItemKey == "MENU04" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '04');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
		}else if(strMenuItemKey == "MENU05" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '05');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
		}else if(strMenuItemKey == "MENU06" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS');		
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '06');
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����
		}else if(strMenuItemKey == "MENU07" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����+CVS');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '07');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}else if(strMenuItemKey == "MENU08" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'CVS+����');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '08');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}else if(strMenuItemKey == "MENU09" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����+����');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '09');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}else if(strMenuItemKey == "MENU10" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, 'Ư��');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '10');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}else if(strMenuItemKey == "MENU11" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '����');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '11');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}
		else if(strMenuItemKey == "MENU12" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '12');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}
		else if(strMenuItemKey == "MENU13" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����2');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '13');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}
		else if(strMenuItemKey == "MENU14" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����3');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '14');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}
		else if(strMenuItemKey == "MENU15" ){	
			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����4');
			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '15');	
			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
		}
//		else if(strMenuItemKey == "MENU14" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����4');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '14');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
//		}
//		else if(strMenuItemKey == "MENU15" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����5');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '15');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
//		}
//		else if(strMenuItemKey == "MENU16" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����6');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '16');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
//		}
//		else if(strMenuItemKey == "MENU17" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����7');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '17');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
//		}
//		else if(strMenuItemKey == "MENU18" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����8');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '18');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
//		}
//		else if(strMenuItemKey == "MENU19" ){	
//			GridObj3.SetCellValue("ALLOC_ZONE", nRow, '�����9');
//			GridObj3.SetCellHiddenValue("ALLOC_ZONE", nRow, '19');	
//			GridObj3.SetRowBgColor(nRow, '255|173|143'); // row ����	
//		} 
		
	}	else {
			alert("���� ���� ���� �޴��Դϴ�.");
		}
		
		   
}



    //GridObj3.AddUserContextMenuItem("MENU_CELL","MENU00","����"); //00//
    //GridObj3.AddUserContextMenuItem("MENU_CELL","MENU01","����"); //01//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU02","����"); //02//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU03","�λ�");//03//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU04","����");//04//
    //GridObj3.AddUserContextMenuItem("MENU_CELL","MENU05","����");//05//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU06","CVS");//06//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU07","����+CVS");//07//
	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU08","CVS+����");//08//
 	//GridObj3.AddUserContextMenuItem("MENU_CELL","MENU09","����+����");//09//













/*********************************************   ��Ÿ Function   **********************************************************/
/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setWiseGridAutoResize( tab_h, table_h ){
	
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
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	
}


