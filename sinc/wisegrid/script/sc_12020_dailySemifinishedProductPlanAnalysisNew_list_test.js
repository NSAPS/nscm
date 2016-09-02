//############################################################
//## ���α׷�ID : sc_12020_dailySemifinishedProductPlanAnalysisNew_list_test
//## ���α׷��� : 
//## ������  : ���米
//## �������� : 
//##
//##���� job file : 
//##
//##���� query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1		  2010-01-15  ������	batchȯ�꿩�θ� Ȯ���Ͽ� batchȯ��ó��
//##
//##
//############################################################
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/*********************************  WiseGrid Java Script   **************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/

var job_id = "sc_12020_dailySemifinishedProductPlanAnalysisNew_list_test";

var mode;
var color01 = '246|246|246';// ���м�, �Ұ�, �ٹ����� �ȵ� shift ����

// ��ȸ
function GoSearch(service) {
	if( document.frm.semi_version.value == null || document.frm.semi_version.value == "" ){
		alert("���� ���� ��ư�� Ŭ���Ͽ� ����� ������ �����ؾ� �մϴ�.");
		return;
	}
	mode = "search";
	doQuery();
};

// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;
	for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
		if(GridObj.GetCellHiddenValue("C07", i) == "" ){
			alert( i + "���� �۾����� ���õ��� �ʾҽ��ϴ�.!!!");
			return;
		}
		if(GridObj.GetCellValue("C08", i) == "" ){
			alert( i + "���� ��ǰ�� ���õ��� �ʾҽ��ϴ�.!!!");
			return;
		}
	}
	mode = "save";
	doSave();	
};

// ���
// ��ȹ�� �ƹ��͵� ��� ���� ���� ó������ �߰��Ҷ��� ����Ѵ�. 2009.05.23 ������
function GoRegister(service) {			

  var service_url = "service.do?_moon_service=" + service + "&_moon_perpage=200&_moon_pagenumber=1";

	var plant_list = document.frm.plant_list.value;
	var version_list = document.frm.version_list.value;
	var plant_version = document.frm.plant_version.value;
	var semi_version = document.frm.semi_version.value;
	
	service_url += "&plant_list=" +plant_list + "&version_list=" + version_list + "&date_form=YYYY-MM-DD";
	service_url += "&plant_version=" + plant_version + "&semi_version=" + semi_version;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1280, height=300, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_ITEM_REG_POPUP", pop_win_style); 
	newWin.focus();
	
};

// WiseGrid �ʱ�ȭ
function init() {
	var GridObj = document.WiseGrid;
	
	setProperty(GridObj); 
	setDefault(GridObj);
	setHeader();
	
	GridObj.bUserContextMenu = true;
		
}

// Property ����
function setDefault(GridObj){
	GridObj.bUserContextMenu = true;
	GridObj.bHDMoving = false;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj.bRowSelectorVisible = false;        	//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj.strActiveRowBgColor = "180|238|180";    //���õ� ���� �������� �����Ѵ�.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	// Grid �� ����
    GridObj.nRowHeight    = 20;
    
 	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       

    //GridObj.strSelectedCellFgColor = '180|82|205'; //���õ� ���� ���ڻ� �����Ѵ�.
    
    //GridObj.bDoQueryDynamic = true;
    
    // Context Menu ����� MENU �߰�
	//GridObj.AddUserContextMenuItem("MENU_CELL","M01","CAPA �ð� ����");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU02","Row ����");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU03","Enter ������ �̵�");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU04","Enter �Ʒ� �̵�");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU05","�Ұ� ����");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU06","�Ұ� ���� ����");
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU07","���� �߰�");
        
}

/*������������������������������������������������������������������������
  ���ش�����							 ��
  ������������������������������������������������������������������������*/
function setHeader() {		
     commonUtil.getCodeList("", "" , "daily_header",headerResult); //��¥�� �ش��� ����� �ش�.
};

function headerResult(result) {		
	var GridObj = document.WiseGrid;
	//display
	GridObj.AddHeader("CRUD",	"����",		"t_text", 		8, 		40,		false);		
	GridObj.AddHeader("C01",	"��ȣ",		"t_number",		10,		35,    	false);
	GridObj.AddHeader("C02",	"����",		"t_text",		50,		80,    	false);
	GridObj.AddHeader("C07",	"�۾���",   	"t_combo",		50,		180,    false);
	GridObj.AddHeader("C08",	"��ǰ�ڵ�", 	"t_combo",		50,		80,    	false);
	GridObj.AddHeader("C09",	"��ǰ��",	"t_combo",		50,		260, 	false);
	GridObj.AddHeader("C10",	"�԰�",		"t_combo",		50,		90, 	false);
	GridObj.AddHeader("BAT_TO_EA",	"BAT(EA)",		"t_number",		12,		60, 	false);

	//-----------------------------------------------------------------------------//
	GridObj.AddHeader("SP01",	" ",		"t_text",		1,		1, 		false); 
	                                          	            		                                         	            	
	GridObj.AddHeader("D01A",	"��",		"t_number",		12,		50, 	true);//�� 
	GridObj.AddHeader("D01B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D01C",	"��",		"t_number",		12,		50, 	true); 
	
	GridObj.AddHeader("SP02",	" ",		"t_text",		1,		1, 		false); 
	                                          	            	
	GridObj.AddHeader("D02A",	"��",		"t_number",		12,		50, 	true);//ȭ 
	GridObj.AddHeader("D02B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D02C",	"��",		"t_number",		12,		50, 	true);
	
	GridObj.AddHeader("SP03",	" ",		"t_text",		1,		1, 		false); 
	                                          	            	                                               	            	
	GridObj.AddHeader("D03A",	"��",		"t_number",		12,		50, 	true);//�� 
	GridObj.AddHeader("D03B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D03C",	"��",		"t_number",		12,		50, 	true);  
	
	GridObj.AddHeader("SP04",	" ",		"t_text",		1,		1, 		false); 
	                                          	            	                                           	            	
	GridObj.AddHeader("D04A",	"��",		"t_number",		12,		50, 	true);//��
	GridObj.AddHeader("D04B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D04C",	"��",		"t_number",		12,		50, 	true);   
	
	GridObj.AddHeader("SP05",	" ",		"t_text",		1,		1, 		false); 
	                                          	            	                                             	            	
	GridObj.AddHeader("D05A",	"��",		"t_number",		12,		50, 	true);//��
	GridObj.AddHeader("D05B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D05C",	"��",		"t_number",		12,		50, 	true);  
	
	GridObj.AddHeader("SP06",	" ",		"t_text",		1,		1, 		false); 
	                                          	            	                                           	            	
	GridObj.AddHeader("D06A",	"��",		"t_number",		12,		50, 	true);//�� 
	GridObj.AddHeader("D06B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D06C",	"��",		"t_number",		12,		50, 	true);    
	
	GridObj.AddHeader("SP07",	" ",		"t_text",		1,		1, 		false); 
	                                          	            	                            	            	            	
	GridObj.AddHeader("D07A",	"��",		"t_number",		12,		50, 	true);//��
	GridObj.AddHeader("D07B",	"��",		"t_number",		12,		50, 	true);
	GridObj.AddHeader("D07C",	"��",		"t_number",		12,		50, 	true);
	
	GridObj.AddHeader("C36",	"�հ�",		"t_number",		50,		60, 	false);
	
	// hidden
	GridObj.AddHeader("C37",	"����",		"t_text",		50,		100, 	false);              
	
	// ��ȹ ���� �׷� �ڵ� / ��ȹ ���� �׷� �� �ڵ�                                                      
	GridObj.AddHeader("G01A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G01B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G01C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G02A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G02B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G02C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G03A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G03B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G03C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G04A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G04B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G04C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G05A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G05B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G05C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G06A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G06B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G06C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G07A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G07B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("G07C",	"��",		"t_text",		200,	45, 	true);
	
	// ��ȹ ���� ���� / �̷� ���� Message                                               
	GridObj.AddHeader("M01A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M01B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M01C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M02A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M02B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M02C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M03A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M03B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M03C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M04A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M04B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M04C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M05A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M05B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M05C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M06A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M06B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M06C",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M07A",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M07B",	"��",		"t_text",		200,	45, 	true);
	GridObj.AddHeader("M07C",	"��",		"t_text",		200,	45, 	true);
 
	
	var weekNo    = ''; //ȭ�鿡�� ��ȸ�ϴ� ������ ��� �����δ�. ( ����=1, ����=2, ������=3)
    var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
    var dayCount  = 1;  //��¥ ����
    if(document.frm.checked_weekly[0].checked) weekNo=1;
    if(document.frm.checked_weekly[1].checked) weekNo=2;
    if(document.frm.checked_weekly[2].checked) weekNo=3;
    
    var num = 15;
    
    for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
    {
         if( result[i].substr(0,1)==weekNo) //ȭ�鿡 ���õ� ������ ���� �͸� ������.
         {
             dateArray = '';
             dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
               
             //�ش� �׷����
             GridObj.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //��¥ �׷�
                                
             GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
             GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
             GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 
             dayCount++;
         } 
    }
	
	//Hearder ����
	GridObj.nHDLineSize   = 30;
	// Grid �� ����
    //GridObj.nRowHeight    = 30;
	
	
	//AddHeader? ??? ? ??? ???? ?????
	GridObj.BoundHeader();	

	// �÷����� : true(������)
	GridObj.SetColHide('CRUD', true); 
	GridObj.SetColHide('C37', true);  
	
	GridObj.SetColHide('G01A', true);// ��ȹ���� �׷� �ڵ�
	GridObj.SetColHide('G01B', true);
	GridObj.SetColHide('G01C', true);
	GridObj.SetColHide('G02A', true);
	GridObj.SetColHide('G02B', true);
	GridObj.SetColHide('G02C', true);
	GridObj.SetColHide('G03A', true);
	GridObj.SetColHide('G03B', true);
	GridObj.SetColHide('G03C', true);
	GridObj.SetColHide('G04A', true);
	GridObj.SetColHide('G04B', true);
	GridObj.SetColHide('G04C', true);
	GridObj.SetColHide('G05A', true);
	GridObj.SetColHide('G05B', true);
	GridObj.SetColHide('G05C', true);
	GridObj.SetColHide('G06A', true);
	GridObj.SetColHide('G06B', true);
	GridObj.SetColHide('G06C', true);
	GridObj.SetColHide('G07A', true);
	GridObj.SetColHide('G07B', true);
	GridObj.SetColHide('G07C', true);
	
	GridObj.SetColHide('M01A', true);// �̷°��� Message
	GridObj.SetColHide('M01B', true);
	GridObj.SetColHide('M01C', true);
	GridObj.SetColHide('M02A', true);
	GridObj.SetColHide('M02B', true);
	GridObj.SetColHide('M02C', true);
	GridObj.SetColHide('M03A', true);
	GridObj.SetColHide('M03B', true);
	GridObj.SetColHide('M03C', true);
	GridObj.SetColHide('M04A', true);
	GridObj.SetColHide('M04B', true);
	GridObj.SetColHide('M04C', true);
	GridObj.SetColHide('M05A', true);
	GridObj.SetColHide('M05B', true);
	GridObj.SetColHide('M05C', true);
	GridObj.SetColHide('M06A', true);
	GridObj.SetColHide('M06B', true);
	GridObj.SetColHide('M06C', true);
	GridObj.SetColHide('M07A', true);
	GridObj.SetColHide('M07B', true);
	GridObj.SetColHide('M07C', true);

	
	GridObj.SetCRUDMode("CRUD", "�߰�", "����", "����");
	
	GridObj.SetNumberFormat("BAT_TO_EA", "###,###,###");

	GridObj.SetNumberFormat("D01A", "###,###,###"); // ���� ����
	GridObj.SetNumberFormat("D01B", "###,###,###");
	GridObj.SetNumberFormat("D01C", "###,###,###");
	GridObj.SetNumberFormat("D02A", "###,###,###");
	GridObj.SetNumberFormat("D02B", "###,###,###");
	GridObj.SetNumberFormat("D02C", "###,###,###");
	GridObj.SetNumberFormat("D03A", "###,###,###");
	GridObj.SetNumberFormat("D03B", "###,###,###");
	GridObj.SetNumberFormat("D03C", "###,###,###");
	GridObj.SetNumberFormat("D04A", "###,###,###");
	GridObj.SetNumberFormat("D04B", "###,###,###");
	GridObj.SetNumberFormat("D04C", "###,###,###");
	GridObj.SetNumberFormat("D05A", "###,###,###");
	GridObj.SetNumberFormat("D05B", "###,###,###");
	GridObj.SetNumberFormat("D05C", "###,###,###");
	GridObj.SetNumberFormat("D06A", "###,###,###");
	GridObj.SetNumberFormat("D06B", "###,###,###");
	GridObj.SetNumberFormat("D06C", "###,###,###");
	GridObj.SetNumberFormat("D07A", "###,###,###");
	GridObj.SetNumberFormat("D07A", "###,###,###");
	GridObj.SetNumberFormat("D07A", "###,###,###");
	GridObj.SetNumberFormat("C36", "###,###,###");
	
}

// �������� ������ Row ����
var rowIndex = 0;
// �۾��� ���м� ���� ����
var mergeSum = false;

//���� ���� ��ȸ�� �Ǹ� �������� �����ߴ� ���� ��Ŀ�� ��ġ�ϰ� �Ѵ�.
//var fosPlant_id = '';


// �׸��� ����
function setGrid(GridObj){
	
	// �÷� �׷�
	GridObj.SetGroupMerge('C02,C07,C08,C09'); 
	
	// �÷� ����
	//GridObj.SetColFix('C14');
	
	// ���� ���� Ŀ�� ���� �ʵǰ� ����
	GridObj.SetColCellActivation('SP01','disable');
	GridObj.SetColCellActivation('SP02','disable');
	GridObj.SetColCellActivation('SP03','disable');
	GridObj.SetColCellActivation('SP04','disable');
	GridObj.SetColCellActivation('SP05','disable');
	GridObj.SetColCellActivation('SP06','disable');
	GridObj.SetColCellActivation('SP07','disable');

	
	

	
	// ���� ����
	//D01A - D07C �÷�
	// row �� : WiseGrid.GetRowCount() 
	var rowLeng = GridObj.GetRowCount();
	if( rowLeng > 0 ){
		var proc_id = GridObj.GetCellHiddenValue("C07", 0);
		
		var colBg01 = '255|255|153';
		var colBg02 = '255|255|255';
		var colBg = colBg01; //���� ���� ��
		
		var onBg01 = '255|255|0';
		var onBg02 = '239|239|239';
		var onBg = onBg01; //���� ���� ��
		
		var nonBg01 = '204|222|242';
		var nonBg02 = '239|239|239';
		var nonBg = nonBg01; // �ٹ����� �ȵ� shift
		var colLen = GridObj.GetColCount();
		//alert(GridObj.GetColHDIndex("D07C"));
		for( i = 0 ; i < rowLeng ; i++ ){
			//�۾��庰 ����(row����)
			if( proc_id != GridObj.GetCellHiddenValue("C07", i) ){
				
				proc_id = GridObj.GetCellHiddenValue("C07", i);
				if(colBg == colBg01) {
					colBg = colBg02;
					onBg = onBg02;
					nonBg = nonBg02;
				}
				else {
					colBg = colBg01;
					onBg = onBg01;
					nonBg = nonBg01;
				}
			}
			
			for( j = 0; j < 35; j++){
				// �÷����м�
				if(GridObj.GetColHDKey(j).substr(0,2) == "SP"){
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color01); 
				}
				// ���� ����
				else if(GridObj.GetColHDKey(j).substr(0,2) == "D0" && GridObj.GetCellHiddenValue(GridObj.GetColHDKey(j),i) == "O"){
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, onBg);
					//GridObj.SetColCellFontBold(GridObj.GetColHDKey(j),'true');
				}
				// �ٹ��� ���� �ȵ� shift
				else if(GridObj.GetColHDKey(j).substr(0,2) == "D0" && GridObj.GetCellHiddenValue(GridObj.GetColHDKey(j),i) == ""){
					//GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, nonBg);
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
					if(GridObj.GetCellValue(GridObj.GetColHDKey(j),i) == "")
						GridObj.SetCellActivation(GridObj.GetColHDKey(j), i, 'disable'); //������ �� ���� ������ �� ����. 
				}
				// ���� ���� ����
				else{
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
				}
				
				if(GridObj.GetColHDKey(j).substr(0,1) == "D"){
				// �޽��� ���� set (���ڻ�)
					var str = GridObj.GetColHDKey(j).substr(1,3);
					if( (GridObj.GetCellValue("G" + str,i) != "") || (GridObj.GetCellHiddenValue("G" + str,i) != "")
						|| (GridObj.GetCellValue("M" + str,i) != "") || (GridObj.GetCellHiddenValue("M" + str,i) != "") ){
						GridObj.SetCellFgColor("C09", i, '255|10|10'); //��ǰ��
						GridObj.SetCellFgColor(GridObj.GetColHDKey(j), i, '255|10|10');
					}	
				}
				
			}

		}
	}
	
	check_bat(GridObj);
	
	

	// �� ���
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	// �հ�
	GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D04B,D04C,D05A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36'); 
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
			
	// �÷� ����
	GridObj.SetColCellBgColor('C36','160|160|160');//�հ�
	GridObj.SetColCellBgColor('SP01',color01);//���м�
	GridObj.SetColCellBgColor('SP02',color01);
	GridObj.SetColCellBgColor('SP03',color01);
	GridObj.SetColCellBgColor('SP04',color01);
	GridObj.SetColCellBgColor('SP05',color01);
	GridObj.SetColCellBgColor('SP06',color01);
	GridObj.SetColCellBgColor('SP07',color01);
	
	// ��� �׷�� ����
	var weekNo    = ''; //ȭ�鿡�� ��ȸ�ϴ� ������ ��� �����δ�. ( ����=1, ����=2, ������=3)
    var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
    var dayCount  = 1;  //��¥ ����
	if(document.frm.checked_weekly[0].checked) weekNo=1;
    if(document.frm.checked_weekly[1].checked) weekNo=2;
    if(document.frm.checked_weekly[2].checked) weekNo=3;
    	
	commonUtil.getCodeList("", "" , "daily_header",{
			callback:function(result){
				for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
			    {
			         if( result[i].substr(0,1)==weekNo) //ȭ�鿡 ���õ� ������ ���� �͸� ������.
			         {
			             dateArray = '';
			             dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
			             
			             GridObj.SetGroupHDText("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')'); 
			             
			             dayCount++;
			         } 
			    }
			}
		}
    ); //��¥�� �ش��� ����� �ش�.
    
    // �۾��� ���м��� �����̵� ��� ��ȸ �� ���� ��Ŵ
    if(mergeSum){
    	setMergeSummary();
    }
    
    // ������ ������ Row�� �̵�
	if(rowIndex != 0)
    	GridObj.MoveRow(rowIndex); 
}

function check_bat(GridObj){
	
	var rowLeng = GridObj.GetRowCount();
	/* ���� BAT�� �ƴѺκ� üũ*/


	/*****************************************************/
	for( i = 0 ; i < rowLeng ; i++ ){
		var  C02	=	GridObj.GetCellValue("C02",i);

		if(C02=="�λ����"){
	
			var BAT_TO_EA	= 0;
			var D01A,	D02A,	D03A,	D04A,	D05A,	D06A,	D07A	= 0;
			var check1,	check2,	check3,	check4,	check5,	check6,	check7	= 0;
			
			BAT_TO_EA	= strToNum(GridObj.GetCellValue("BAT_TO_EA", i));
			
			D01A		= strToNum(GridObj.GetCellValue("D01A", i));
			D02A		= strToNum(GridObj.GetCellValue("D02A", i));
			D03A		= strToNum(GridObj.GetCellValue("D03A", i));
			D04A		= strToNum(GridObj.GetCellValue("D04A", i));
			D05A		= strToNum(GridObj.GetCellValue("D05A", i));
			D06A		= strToNum(GridObj.GetCellValue("D06A", i));
			D07A		= strToNum(GridObj.GetCellValue("D07A", i));
			
			check1		= strToNum(D01A%BAT_TO_EA);
			check2 		= strToNum(D02A%BAT_TO_EA);
			check3 		= strToNum(D03A%BAT_TO_EA);
			check4 		= strToNum(D04A%BAT_TO_EA);
			check5 		= strToNum(D05A%BAT_TO_EA);
			check6 		= strToNum(D06A%BAT_TO_EA);
			check7 		= strToNum(D07A%BAT_TO_EA);
			
			if(D01A != 0){
				if(check1 != "0"){
					GridObj.SetCellBgColor('D01A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D01A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}
			}
			/********************************************/
			if(D02A != 0){
				if(check2 != "0"){
					GridObj.SetCellBgColor('D02A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D02A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}
			}
			/********************************************/
			if(D03A != 0){
				if(check3 != "0"){
					GridObj.SetCellBgColor('D03A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D03A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}
			}
			/********************************************/
			if(D04A != 0){
				if(check4 != "0"){
					GridObj.SetCellBgColor('D04A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D04A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}
			}
			/********************************************/
			if(D05A != 0){
				if(check5 != "0"){
					GridObj.SetCellBgColor('D05A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D05A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}
			}
			/********************************************/
			if(D06A != 0){
				if(check6 != "0"){
					GridObj.SetCellBgColor('D06A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D06A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}	
			}
			/********************************************/
			if(D07A != 0){
				if(check7 != "0"){
					GridObj.SetCellBgColor('D07A',	i, '255|0|0');
					GridObj.SetCellBgColor('C07',	i, '255|0|0');
					GridObj.SetCellBgColor('C08',	i, '255|0|0');
					GridObj.SetCellBgColor('C09',	i, '255|0|0');
				}else{
					GridObj.SetCellBgColor('D07A',	i, '255|255|0');
					GridObj.SetCellBgColor('C07',	i, '255|255|153');
					GridObj.SetCellBgColor('C08',	i, '255|255|153');
					GridObj.SetCellBgColor('C09',	i, '255|255|153');
				}
			}
			/********************************************/			
			
		}else{
			
		}



		
	}
	/*****************************************************/
	

	
	
}

   
// ��ȸ
function doQuery() {
	var GridObj = document.WiseGrid;
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin." + job_id;
	
	//WiseGrid? ??? ??? Param? ????.
	GridObj.SetParam("mode", mode);
	
	//���α׷�
	GridObj.SetParam("line_grp", document.frm.line_grp.value );
	
	//����
	if(document.frm.checked_weekly[0].checked == true){
		GridObj.SetParam("checked_weekly", document.frm.checked_weekly[0].value);
		GridObj.SetParam("prod_dates", document.frm.w0.value);
	}
	else if(document.frm.checked_weekly[1].checked == true){
		GridObj.SetParam("checked_weekly", document.frm.checked_weekly[1].value);
		GridObj.SetParam("prod_dates", document.frm.w1.value);
	}
	else if(document.frm.checked_weekly[2].checked == true){
		GridObj.SetParam("checked_weekly", document.frm.checked_weekly[2].value);
		GridObj.SetParam("prod_dates", document.frm.w2.value);
	}
		
	// ����
	GridObj.SetParam("semi_version", document.frm.semi_version.value);	
	
	// ����
	GridObj.SetParam("semi_plant", document.frm.semi_plant.value);	
		
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
			
	//WiseGrid? ??? ???? ???? ????.
	GridObj.DoQuery(servlet_url);
}

function GridEndQuery() {
	var GridObj = document.WiseGrid;
	
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj.GetStatus() != "true") {
		var error_msg_extra = GridObj.GetMessage();// ?
		//alert("�� �޼����� ���� Ȯ�θ޼��� ���� ���ð�!!! ������ �Ǵ� �ǿ������� ��ȭ�� �ּ���!\n" + error_msg_extra);	
		return;
	}
			
	var mode = GridObj.GetParam("mode");

	if(mode == "search") {
		if(GridObj.GetStatus() == "true") { // 
			setGrid(GridObj);
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		if(GridObj.GetStatus() == "true") {// 
			
		} else	{
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "update") {
		if(GridObj.GetStatus() == "true") {// 
			
		} else	{
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	} else if(mode == "delete") {
		if(GridObj.GetStatus() == "true") {// 
			
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			GoSearch("");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}
}
// ����
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin." + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", mode);

	//����
	if(document.frm.checked_weekly[0].checked == true){
		GridObj.SetParam("prod_dates", document.frm.w0.value);
	}
	else if(document.frm.checked_weekly[1].checked == true){
		GridObj.SetParam("prod_dates", document.frm.w1.value);
	}
	else if(document.frm.checked_weekly[2].checked == true){
		GridObj.SetParam("prod_dates", document.frm.w2.value);
	}
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� ������
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/* ?? */
function doInsert() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "insert");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doUpdata() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "update");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doDelete() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "delete");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ??? ?????? ????. */
function chkSelected() {
	var GridObj = document.WiseGrid;
	chkCount = 0;

	for(i = 0; i < GridObj.GetRowCount(); i++) { //??? ???? ???? ????. 

		if(GridObj.GetCellValue("SELECTED", i) == "1") //??? ?? ?? ????. 
			chkCount = chkCount + 1;
	}
	
	if(chkCount == 0) {
		return false;	
	}
	return true;
}

/* ? ?? */
function doLineInsert() {
	var GridObj = document.WiseGrid;
	
	//???? ??? ?? ? ??? ????. 
	GridObj.AddRow();
	
	//??? ? SELECTED? Active? ??? ???? ?? ???.
	GridObj.SetCellValue("SELECTED",GridObj.GetActiveRowIndex(), "1");

	//ITEM_CODE ?? ??? ????? Active? ??? ???? ???? ????. 
	GridObj.SetCellImage('ITEM_CODE', GridObj.GetActiveRowIndex(), 0);

	//??? ?? ? ITEM_CODE? Active? ??? ???? ??? ???? ??.
	GridObj.SetCellActivation("ITEM_CODE", GridObj.GetActiveRowIndex(), "edit");
}

/* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
	//???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
	GridObj.ExcelExport("", "", true, true);
}

/* WiseGrid ���� ���� ����� ���. */
function GridChangeCell(strColumnKey, nRow) {
	
	rowIndex = nRow;
	
	var GridObj = document.WiseGrid;

	// item_id�� �����´�.
	var item_id = GridObj.GetCellValue('C08',nRow).substring(0,2);
	var in_item_id = GridObj.GetCellValue('C08',nRow);
// 2009.10.14 71000620 �ȼ�����и����� �޽Ŀ뿡 ���ؼ��� EA �ڵ�ȯ�� ���� --> ����ȣ���� ��û
//	if(item_id == "71" && in_item_id != "71000620") {  // ������ ��츸 batch->EAȯ���� �����Ѵ�.	
// ver 1.1 batch�Է¿��θ� üũ�Ͽ� batchȯ���� �����Ѵ�.
	if(document.frm.chk_input_to_batch.checked == true) {

		// batchȯ����� �����´�.
		var bat_to_ea = GridObj.GetCellValue('BAT_TO_EA',nRow);
		if (bat_to_ea == null || bat_to_ea == "" || bat_to_ea == 0)
			bat_to_ea = 1;
		// ȯ������� ���� �°� �Է°��� �����Ѵ�.
		var input_data = GridObj.GetCellValue(strColumnKey,nRow);
		
		GridObj.SetCellValue(strColumnKey,nRow,input_data * bat_to_ea);
	}
		
	// ��ǰ�� �հ�(����)
	var totSum = 0;
	for( i = 1 ; i < 8 ; i++ ){
		for( m = 0 ; m < 3; m++ ){
				var shift;
				if(m == 0) shift = "A";
				if(m == 1) shift = "B";
				if(m == 2) shift = "C"; 
				totSum += Number(GridObj.GetCellValue("D0" + i + shift,nRow));
			}
	}
	
	GridObj.SetCellValue('C36',nRow,totSum);
	
	
	/***********/
	check_bat(GridObj);
	
	
		
}

// Message DB�� �����ϱ� ���� �ʿ��� ��
var cat_id;
var plant_id;
var version;
var seq;
var item_id;
var proc_id;
var start_dates;
var prod_dates_seq;
var shift_type;
var user_id;

// �� Ŭ�� �̺�Ʈ
function GridCellClick(strColumnKey, nRow){
	if(strColumnKey < "C15" || strColumnKey == "C36") return
	
	// �հ�
	totalSum(strColumnKey, nRow);
	
	var GridObj = document.WiseGrid;
	
	// ���� ���� ���� Ŭ���� ���� �� �ʱ�ȭ
	if(GridObj.GetCellValue(strColumnKey, nRow) == ""){
		document.frm.msg_grp_code[0].selected = true;
		document.frm.msg_grp.value = "";
		document.frm.msg.value = "";
		document.frm.colKey.value = "";
		document.frm.nRow.value = "";
		cat_id = "";
		plant_id = "";
		version = "";
		seq = "";
		item_id = "";
		proc_id = "";
		start_dates = "";
		prod_dates_seq = "";
		shift_type = "";
		user_id = "";
		return;
	}
	//alert(GridObj.GetCellValue(strColumnKey, nRow));
	
	//D01A ==> 01A
	var colKey = strColumnKey.substr(1,3);
	
	// �÷�key ���� ex) 01A
	document.frm.colKey.value = colKey;
	//alert(document.frm.colKey.value);
	// nRow ����
	document.frm.nRow.value = nRow;
	
	//��ȹ ���� �׷�(�޺��ڽ�) set
	var temp =  document.frm.msg_grp_code;
	var grp_code = GridObj.GetCellValue("G" + colKey, nRow);
	//alert(grp_code);
	for(i = 0 ; i < temp.length ; i++ ){
		if( temp[i].value == grp_code)
			temp[i].selected = true;
	}
	
	//��ȹ ���� �׷� ��(�޺��ڽ�) set
	doChangeMsgGroup(document.frm.msg_grp_code);
	temp =  document.frm.msg_grp_detail;
	var grp_detail = GridObj.GetCellHiddenValue("G" + colKey, nRow);
	//alert(grp_code);
	for(i = 0 ; i < temp.length ; i++ ){
		if( temp[i].value == grp_detail)
			temp[i].selected = true;
	}
	
	// ��ȹ ���� ����  set
	document.frm.msg_grp.value = GridObj.GetCellValue("M" + colKey, nRow);
	
	// �޽��� set
	document.frm.msg.value = GridObj.GetCellHiddenValue("M" + colKey, nRow);
	
	// DB�� Message�� �����ϱ� ���� �ʿ��� ����
	cat_id = "SS";
	plant_id = GridObj.GetCellHiddenValue("C02", nRow);// �����ڵ�
	version = GridObj.GetCellValue("C37", nRow);//����
	seq = GridObj.GetCellHiddenValue("C37", nRow);// seq
	item_id = GridObj.GetCellValue("C08", nRow);//��ǰ�ڵ�
	proc_id = GridObj.GetCellHiddenValue("C07", nRow);//�۾��� �ڵ�
	
	if(document.frm.checked_weekly[0].checked == true){
		start_dates = document.frm.w0.value; // ���� ������
	}
	else if(document.frm.checked_weekly[1].checked == true){
		start_dates = document.frm.w1.value; // ���� ������
	}
	else if(document.frm.checked_weekly[2].checked == true){
		start_dates = document.frm.w2.value; // ���� ������
	}
	//alert(start_dates);
	prod_dates_seq = Number(colKey.substr(1,1))-1; // �ش� ���� seq
	
	if(strColumnKey.substr(3,1) == "A") // shift_type
		shift_type = 1;
	else if(strColumnKey.substr(3,1) == "B")
		shift_type = 3;
	else if(strColumnKey.substr(3,1) == "C")
		shift_type = 5;
	//alert(shift_type);	

	user_id  = document.frm._user_id.value;
}

// �޽��� ����
function saveMsg(){
	
	if(document.frm.colKey.value == "") {
		alert("������ ���� ���� Ŭ���Ͽ����ϴ�.");
		return;
	}
		
	var GridObj = document.WiseGrid;
	
	var reason01 = document.frm.msg_grp_code.value;
	var reason02 = document.frm.msg_grp_detail.value;
	var reason_msg = document.frm.msg_grp.value;
	var plan_msg = document.frm.msg.value;
	var colKey = document.frm.colKey.value;
	var nRow = document.frm.nRow.value;
	
	// WiseGrid �÷��� ����
	GridObj.setCellValue("G" + colKey, nRow, reason01);
	GridObj.SetCellHiddenValue("G" + colKey, nRow, reason02);
	GridObj.SetCellValue("M" + colKey, nRow, reason_msg);
	GridObj.setCellHiddenValue("M" + colKey, nRow, plan_msg);
	
	// ���ڻ� ����
	GridObj.SetCellFgColor("D" + colKey, nRow, '255|10|10'); 
	GridObj.SetCellFgColor("C09", nRow, '255|10|10');
	//alert(colKey + ", " + nRow);
	
	// DB�� ����
	//cat_id!%!plant_id!%!version!%!seq!%!item_id!%!proc_id!%!start_dates!%!prod_dates_seq!%!shift_type!%!
	//ord_no!%!ord_item_no!%!reason01!%!reason02!%!reano_msg!%!plan_msg!%!user_id
	var param = "cat_id!%!plant_id!%!version!%!seq!%!item_id!%!proc_id!%!start_dates!%!prod_dates_seq!%!shift_type!%!";
	param += "ord_no!%!ord_item_no!%!reason01!%!reason02!%!reason_msg!%!plan_msg!%!user_id";
	var value = cat_id + "!%!" + plant_id + "!%!"
				+ version + "!%!" + seq + "!%!"
				+ item_id + "!%!" + proc_id + "!%!" 
				+ start_dates + "!%!" + prod_dates_seq + "!%!"
				+ shift_type + "!%!" + "" + "!%!"
				+ "" + "!%!" + reason01 + "!%!"
				+ reason02 + "!%!" + reason_msg + "!%!"
				+ plan_msg + "!%!" + user_id;
	//alert(value);
				
	commonUtil.executeQuery(param, value, "save_msg",{
		callback:function(result){
			if(result == "SUCCESS"){
				alert(" ���� ����");
			}
			else{
				alert(" ���� ����");
			}
		}
	});
	
	//alert(GridObj.GetCellValue("G" + colKey, nRow) + ", " + GridObj.GetCellHiddenValue("G" + colKey, nRow) + ", " + GridObj.GetCellValue("M" + colKey, nRow) );
}

// �հ�����
function setSummary()
{
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetRowCount() == 0)
	{
		alert("���� ��ȸ�Ͻʽÿ�.");
		return;
	}
	
	GridObj.ClearSummaryBar();
	GridObj.ClearGroupMerge();
	GridObj.AddSummaryBar('SUMMARY3', '�հ�', 'summaryall', 'sum', 'PRICE,STOCK'); 
	GridObj.SetSummaryBarColor('SUMMARY3', '100|100|100', '250|222|222'); 
	GridObj.SetSummaryBarFont('SUMMARY3', '����', '10', true, false, false, false);

	GridObj.MoveRow(GridObj.GetRowCount() - 1);
}

// ���� & �Ұ� ����
function setMergeSummary()
{
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetRowCount() == 0)
	{
		alert("���� ��ȸ�Ͻʽÿ�.");
		return;
	}
		 
	GridObj.ClearSummaryBar();
	GridObj.ClearGroupMerge();
	
	GridObj.SetGroupMerge('C02,C07,C08,C09');
	
	GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'C07', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36'); 
	GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36'); 
		
//	GridObj.SetSummaryBarColor('SUMMARY1', '230|240|240', '230|240|240');
//	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', color01);
//		
//	GridObj.SetSummaryBarFont('SUMMARY1', '����', '9', false, false, false, false);

	GridObj.SetSummaryBarColor('SUMMARY1', '200|200|200', color01);
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '160|160|160');
		
	GridObj.SetSummaryBarFont('SUMMARY1', '����', '9', false, false, false, false);
	//GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false);
		
	//GridObj.MoveRow(0);
	
	mergeSum = true; // �۾��� ���м� ���� ���� üũ
}


// ��������
function clearSummary()
{
	var GridObj = document.WiseGrid;

	if(GridObj.GetRowCount() == 0)
	{
		alert("���� ��ȸ�Ͻʽÿ�.");
		return;
	}

	GridObj.ClearSummaryBar();
	GridObj.ClearGroupMerge();
	
	GridObj.SetGroupMerge('C02,C07,C08,C09');
	GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36');
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '160|160|160');
	//GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false);
	
	//GridObj.MoveRow(0);
	
	mergeSum = false; // �۾��� ���м� ���� ���� ����
}

var totCnt = 0;
// �հ�
function totalSum(strColumnKey, nRow){
	var maxCnt = document.frm.totCount.value;
	
	if(totCnt == maxCnt){// �հ踦 10�� �̻��ϸ�, �ʱ�ȭ
		document.frm.totalSum.value = "0";
		totCnt = 0;
		return;
	}
	
	var GridObj = document.WiseGrid;
	
	var sum = Number(document.frm.totalSum.value);
	
	var value = Number(GridObj.GetCellValue(strColumnKey, nRow));
	
	document.frm.totalSum.value = sum + value;
	
	totCnt++;
};

// �÷� ��� & Ȯ��
function colExtension(obj){
	var GridObj = document.WiseGrid;

	if(GridObj.GetColWidth('C02')== 8){// true => ���� ����
		obj.value = "���";
		// ���� ��� ����
		GridObj.SetColWidth("C02", 80);
		GridObj.SetColWidth("C07", 180);
		GridObj.SetColWidth("C10", 90);
	
	}
	else{
		obj.value = "Ȯ��";
		//������
		GridObj.SetColWidth("C02", 8);
		GridObj.SetColWidth("C07", 8);
		GridObj.SetColWidth("C10", 8);
	}
}

function getdatetime() {
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	
	if(month < 10)
		month = "0" + month;
		
	if(day < 10)
		day = "0" + day;

	document.frm.to_date.value = year + "" + month + "" + day;
}

function insertRow(nRow){
	var GridObj = document.WiseGrid;
	var rowCnt = GridObj.GetRowCount();
		
	var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // ���� �ڵ�
	var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // �۾��� �ڵ�
	
	
	if(!GridObj.HasComboList("C08",'ITEMID' + plant_id + proc_id)){
		
		GridObj.AddComboList("C08",'ITEMID' + plant_id + proc_id);		//��ǰ�ڵ� �޺�����ƮKEY ����
		GridObj.AddComboList("C09",'ITEMNAME' + plant_id + proc_id);	//��ǰ�� �޺�����ƮKEY ����
		GridObj.AddComboList("C10",'ITEMSPEC' + plant_id + proc_id);	//��ǰ�԰� �޺�����ƮKEY ����
		
		var param = "plant_id!%!proc_id!%!item_type";
		var value = plant_id + "!%!" + proc_id + "!%!HALB" ;
		commonUtil.getSelQeury(param, value, "plant_proc_prod_item_list",{
				callback:function(arrList){
					for( i = 0 ;  i < arrList.length ; i++){
						// �ش� ����, �۾��忡�� ���� ������ ��ǰ ����Ʈ�� �޺� ����Ʈ�� �߰�
						GridObj.AddComboListValue("C08", arrList[i][0],arrList[i][0], "ITEMID" + plant_id + proc_id);	//��ǰ�ڵ� �޺�����Ʈ ����
						GridObj.AddComboListValue("C09", arrList[i][1],arrList[i][0], "ITEMNAME" + plant_id + proc_id);	//��ǰ�� �޺�����Ʈ ����
						GridObj.AddComboListValue("C10", arrList[i][2],arrList[i][0], "ITEMSPEC" + plant_id + proc_id);	//��ǰ�԰� �޺�����Ʈ ����
					}
				}
			}
		);
	} 
					
	GridObj.SetComboSelectedHiddenValue("C08", nRow, 0, 'ITEMID' + plant_id + proc_id); 
	GridObj.SetComboSelectedHiddenValue("C09", nRow, 0, 'ITEMNAME' + plant_id + proc_id);
	GridObj.SetComboSelectedHiddenValue("C10", nRow, 0, 'ITEMSPEC' + plant_id + proc_id);
	
}
// Event
// Mouse Over 
function handler1(strType, strColumnKey, nRow){ 

};


// Context Menu ����� ���� Menu ���ý�
function handler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	var GridObj = document.WiseGrid;
	var rowCnt = GridObj.GetRowCount();
		
	if( strMenuKey == "MENU_CELL" ){// CELL Ŭ���� �޴�
		
		if( strMenuItemKey == "MENU01" ){		// ROW �߰�
			
				if( rowCnt-1 == nRow ){ // ���ڸ� ������ ��� 
					GridObj.InsertRow(-1);
				}else{
					GridObj.InsertRow(nRow+1);
				}	
				
				var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // ���� �ڵ�
				
				GridObj.SetCellValue("CRUD", nRow+1, "C");				
				GridObj.SetCellValue("C02", nRow+1, GridObj.GetCellValue("C02", nRow)); //����
				GridObj.SetCellHiddenValue("C02", nRow+1, GridObj.GetCellHiddenValue("C02", nRow)); //�����ڵ�
//				GridObj.SetCellValue("C07", nRow+1, GridObj.GetCellValue("C07", nRow)); //�۾���
//				GridObj.SetCellHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow)); //�۾��� �ڵ�

				if( GridObj.HasComboList('C07','PROCLIST' + plant_id) ){ // default �ܿ� �޺�����Ʈ�� ���� �� ���
					GridObj.SetComboSelectedHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow), 'PROCLIST' + plant_id); //�۾���
				}else{													// default �޺�����Ʈ�� ������ ���
					GridObj.SetComboSelectedHiddenValue("C07", nRow+1, GridObj.GetCellHiddenValue("C07", nRow)); //�۾���
				}
				
				GridObj.SetCellValue("C37", nRow+1, GridObj.GetCellValue("C37", nRow)); //����
				GridObj.SetCellHiddenValue("C37", nRow+1, GridObj.GetCellHiddenValue("C37", nRow)); //SEQ
				//GridObj.SetCellImage('ITEM_CODE', nRow+1, 0);
				//GridObj.SetCellActivation("ITEM_CODE", nRow+1, "edit");
				
				//GridObj.ClearComboList("C08");
				//plant_proc_prod_item_list
				
				
				
				var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // �۾��� �ڵ�
				
				
				if(!GridObj.HasComboList("C08",'ITEMID' + plant_id + proc_id)){
					
					GridObj.AddComboList("C08",'ITEMID' + plant_id + proc_id);		//��ǰ�ڵ� �޺�����ƮKEY ����
					GridObj.AddComboList("C09",'ITEMNAME' + plant_id + proc_id);	//��ǰ�� �޺�����ƮKEY ����
					GridObj.AddComboList("C10",'ITEMSPEC' + plant_id + proc_id);	//��ǰ�԰� �޺�����ƮKEY ����
										
					var param = "plant_id!%!proc_id!%!item_type";
					var value = plant_id + "!%!" + proc_id + "!%!HALB" ;
					commonUtil.getSelQeury(param, value, "plant_proc_prod_item_list",{
							callback:function(arrList){
								for( i = 0 ;  i < arrList.length ; i++){
									// �ش� ����, �۾��忡�� ���� ������ ��ǰ ����Ʈ�� �޺� ����Ʈ�� �߰�
									GridObj.AddComboListValue("C08", arrList[i][0],arrList[i][0], "ITEMID" + plant_id + proc_id);	//��ǰ�ڵ� �޺�����Ʈ ����
									GridObj.AddComboListValue("C09", arrList[i][1],arrList[i][0], "ITEMNAME" + plant_id + proc_id);	//��ǰ�� �޺�����Ʈ ����
									GridObj.AddComboListValue("C10", arrList[i][2],arrList[i][0], "ITEMSPEC" + plant_id + proc_id);	//��ǰ�԰� �޺�����Ʈ ����
								}
							}
						}
					);
				} 
								
				GridObj.SetComboSelectedHiddenValue("C08", nRow+1, 0, 'ITEMID' + plant_id + proc_id); 
				GridObj.SetComboSelectedHiddenValue("C09", nRow+1, 0, 'ITEMNAME' + plant_id + proc_id);
				GridObj.SetComboSelectedHiddenValue("C10", nRow+1, 0, 'ITEMSPEC' + plant_id + proc_id);
				
		}
		else if( strMenuItemKey == "MENU02" ){	// ROW ����
			//alert("Row ����");
			if(confirm("���� �Ͻðڽ��ϱ�?") == true){
				if(GridObj.GetCellValue("C01", nRow) != ""){
					GridObj.DeleteRow(nRow);
					GridObj.SetRowHide(nRow, true); 
					//GridObj.DeleteRow(nRow, false); 		
				}else{
					GridObj.DeleteRow(nRow);
				}				
			} 
		}
		else if( strMenuItemKey == "MENU03" ){ // Enter ������ �̵�
			GridObj.strEnterNavigate = "nextcell";
		}
		else if( strMenuItemKey == "MENU04" ){ // Enter �Ʒ� �̵�
			GridObj.strEnterNavigate = "belowcell";
		}
		else if( strMenuItemKey == "MENU05" ){ // ���� & �Ұ� ����
			setMergeSummary();
		}
		else if( strMenuItemKey == "MENU06" ){ // ���� & �Ұ� ���� ����
			clearSummary();
		}
		else if( strMenuItemKey == "MENU07" ){ // ���� �߰�
			if( rowCnt-1 == nRow ){ // ���ڸ� ������ ��� 
				GridObj.InsertRow(-1);
			}else{
				GridObj.InsertRow(nRow+1);
			}
			
			GridObj.SetCellValue("CRUD", nRow+1, "C");				
			GridObj.SetCellValue("C02", nRow+1, GridObj.GetCellValue("C02", nRow)); //����
			GridObj.SetCellHiddenValue("C02", nRow+1, GridObj.GetCellHiddenValue("C02", nRow)); //�����ڵ�
			GridObj.SetCellValue("C37", nRow+1, GridObj.GetCellValue("C37", nRow)); //����
			GridObj.SetCellHiddenValue("C37", nRow+1, GridObj.GetCellHiddenValue("C37", nRow)); //SEQ
			
			var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // ���� �ڵ�
			
			if(!GridObj.HasComboList("C07",'PROCLIST' + plant_id)){
				
				GridObj.AddComboList("C07",'PROCLIST' + plant_id);
				
				var param = "plant_id!%!item_type";
				var value = plant_id + "!%!HALB" ;
				commonUtil.getSelQeury(param, value, "semi_plant_prod_proc_list",{
						callback:function(arrList){
							for( i = 0 ;  i < arrList.length ; i++){
								// �ش� ����, �۾��忡�� ���� ������ ��ǰ ����Ʈ�� �޺� ����Ʈ�� �߰�
								GridObj.AddComboListValue("C07", arrList[i][1],arrList[i][0], 'PROCLIST' + plant_id);	//�۾��� �޺�����Ʈ ����
								
							}
						}
					}
				);
			} 
							
			GridObj.SetComboSelectedHiddenValue("C07", nRow+1, 0, 'PROCLIST' + plant_id); 
			
			GridObj.SetComboSelectedHiddenValue("C08", nRow+1, 0 ); 
			GridObj.SetComboSelectedHiddenValue("C09", nRow+1, 0);
			GridObj.SetComboSelectedHiddenValue("C10", nRow+1, 0);			

		}
		else {
			alert("���� ���� ���� �޴��Դϴ�.");
		}
		
	}
	
	// CAPA �ð� ����
//	if( strMenuKey == "MENU_CELL" && strMenuItemKey == "M01" && strColumnKey > "C14" && strColumnKey < "C36"){
//		
//		var param = "shift_qty!%!plant_id!%!proc_id!%!item_id";
//		var shift_qty = GridObj.GetCellValue(strColumnKey,nRow);
//		if( shift_qty == "" || shift_qty == null){
//			return;
//		}
//		var plant_id = GridObj.GetCellHiddenValue("C02",nRow);
//		var proc_id = GridObj.GetCellHiddenValue("C07",nRow);
//		var item_id = GridObj.GetCellValue("C08",nRow);
//		var value = shift_qty + "!%!" + plant_id + "!%!" + proc_id + "!%!" + item_id;
//		
//		// ������ �ð� ����(capa)
//		commonUtil.getCodeList(param, value , "capa_info_qty_per_hour", { 
//			callback:function(arrList){
//				if( arrList.length > 0 && arrList[0] != null){	
//					alert(arrList[0]);
//					//obj.title = arrList[0];
//				}
//				else{
//					return;
//				}			
//			}
//		});
//	}
	
};

// change combo event
function changCombohandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	var GridObj = document.WiseGrid;
	//alert(nNewIndex);
	if( strColumnKey != "C07" ){	
		var plant_id = GridObj.GetCellHiddenValue("C02", nRow); // ���� �ڵ�
		var proc_id = GridObj.GetCellHiddenValue("C07", nRow);  // �۾��� �ڵ�
		
		var item_id = GridObj.GetComboText("C08", nNewIndex,'ITEMID' + plant_id + proc_id) 
		//alert(item_id);
		
		GridObj.SetComboSelectedIndex("C08", nRow, nNewIndex, 'ITEMID' + plant_id + proc_id); 
		GridObj.SetComboSelectedIndex("C09", nRow, nNewIndex, 'ITEMNAME' + plant_id + proc_id); 
		GridObj.SetComboSelectedIndex("C10", nRow, nNewIndex, 'ITEMSPEC' + plant_id + proc_id); 
		
		GridObj.SetComboSelectedHiddenValue("C08", nRow, item_id, 'ITEMID' + plant_id + proc_id); 
		GridObj.SetComboSelectedHiddenValue("C09", nRow, item_id, 'ITEMNAME' + plant_id + proc_id);
		GridObj.SetComboSelectedHiddenValue("C10", nRow, item_id, 'ITEMSPEC' + plant_id + proc_id);
	}
	else if(strColumnKey == "C07"){
		insertRow(nRow);
	}	

};
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/*********************************   ���� Java Script   ******************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/

//// ���� Ŭ�� : POPUP
//function onclickfunc( row, col, data ) {
//	//alert(col);
//	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysis_popup&_moon_perpage=200&_moon_pagenumber=1";
//	
//	if( col > 6 && col < 9){
//		//alert(document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text);
//		
//		var plant_id = document.frm.selected_plant.value;
//		//var line_id = data.split("!%!")[9];
//		var proc_id = data.split("!%!")[4];
//		var item_id = data.split("!%!")[6];
//		var version = data.split("!%!")[11];
//		var seq = data.split("!%!")[12];
//		var sdate = document.frm.sdate.value;	
//	}
//	else if( col > 14 ){
//		var plant_id = document.frm.selected_plant.value;
//		//var line_id = data.split("!%!")[7];
//		var proc_id = data.split("!%!")[4];
//		var item_id = data.split("!%!")[6];
//		var version = data.split("!%!")[11];
//		var seq = data.split("!%!")[12];
//		var sdate = document.frm.sdate.value;	
//		
//		var prodDates = sumDate2(document.frm.sdate.value, (col -15)/3);	 
//	
//		service_url += "&prod_dates=" + prodDates;
//	
//		var shiftType
//		if( (col - 14) > 0){
//			var temp = (col - 14) % 3;		
//			if( temp == 1) shiftType = 1; //��
//			else if( temp == 2) shiftType = 3; //��
//			else shiftType = 5; //��
//			
//			service_url += "&shift_type=" + shiftType;
//		}
//	}
//	else{
//		return;
//	} 
//	 
////	var service_url_info = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisInfo_popup&_moon_perpage=200&_moon_pagenumber=1";
////	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=940, height=500, top=0, left=700";
////	var newWin = window.open(service_url_info, "SC_DAILY_PROD_ANALYSIS_INFO_POPUP", pop_win_style); 
//	
//	//service_url += "&plant_id=" + plant_id + "&line_id=" + line_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
//	service_url += "&plant_id=" + plant_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
//		
//	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=800, top=0, left=0";
//	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_POPUP", pop_win_style); 
//	newWin.focus(); 
//	 
//}
//
//// �Ⱓ : ������ ���� --> ������ �������� ����
//function sumDate( strDate ){
//	
//	if(chkDate(strDate,"10") == 0) return;
//	var sdate = strDate.value.split("-");
//	var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
//	temp.setDate(temp.getDate() + 20);
//	var year = temp.getYear();
//	var month = temp.getMonth() + 1;
//	if(month < 10 ) month = "0" + month;
//	var date = temp.getDate();
//	if(date < 10) date = "0" + date;
//	var edate = year+ "-" + month+ "-" + date;
//	//alert(edate);											
//	document.frm.edate.value = edate;
//}
//
//// ���� Ŭ���� ���� �´� prod_date ���
//function sumDate2( strDate, date ){
//	
//	var sdate = strDate.split("-");
//	var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
//	temp.setDate(temp.getDate() + Number(date));
//	//alert(temp);
//	var year = temp.getYear();
//	var month = temp.getMonth() + 1;
//	if(month < 10 ) month = "0" + month;
//	else month = month + "";
//	var date = temp.getDate();
//	if(date < 10) date = "0" + date;
//	else date = date + "";
//	//alert(year + ", " + month+", " + date);
//	var edate = year + month + date + "";
//	//alert(edate);											
//	return edate;
//}

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// ���� & ���� ���� 
function selectPlantAndVersionPopUp() {
			
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNewSelectPlantAndVersion_popup_test&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=410, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_SELECT_PLANT_AND_VERSION_POPUP", pop_win_style); 
	newWin.focus();
};

// ������ ��
var oldQty;

// ������ �� ����
function saveValues(obj){
	
	if(event.altKey) {//alt+click �̺�Ʈ �� ��� popup â ����
		altAndMouseLeftButtonClickfunc(obj);
	}
			
	oldQty = strToNum(obj.value); // ����

}

// ���� ����� �հ� ���� �� ���� �÷��� ����
function changeShiftSelect(obj){
	
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	var qty = obj.value; //����� ��
	var itemTot = strToNum(obj.parentNode.parentNode.lastChild.childNodes(1).value); //��ǰ�� �հ�
	
	var shiftName = obj.name; // input box name 
	var shiftTot = strToNum(document.getElementById(shiftName + "_tot").innerHTML.replace("&nbsp;",""));// shift�� �հ�
	var totTotal = strToNum(document.getElementById("divTotal_tot").innerHTML.replace("&nbsp;",""));// �հ��� �� �հ�
	
	var diff = qty - oldQty; // ����
	
	itemTot = itemTot + diff; // ��ǰ�� �հ� ����
	shiftTot = shiftTot + diff; // shift�� �հ� ����
	totTotal = totTotal + diff; // �� �հ� ���� 
	
	// õ���� ������
	obj.value = numberFormat(qty);
	
	// ����� �հ� �Է�
	// ��ǰ�� �հ�
	obj.parentNode.parentNode.lastChild.childNodes(1).value = numberFormat(itemTot);
	obj.parentNode.parentNode.lastChild.childNodes(0).innerHTML = numberFormat(itemTot) + "&nbsp;";
	// shift�� �հ�
	document.getElementById(shiftName + "_tot").innerHTML = numberFormat(shiftTot) + "&nbsp;";
	// �հ��� �� �հ�
	document.getElementById("divTotal_tot").innerHTML = numberFormat(totTotal) + "&nbsp;";
	
	//���� �÷��� üũ
	obj.nextSibling.value = "Y";
	//alert(obj.nextSibling.value);
	
}

// ���� POPUP(����Ŭ��)
function doubleClickfunc( obj ) {
	//alert(col);
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNew_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var idx = obj.parentNode.parentNode.rowIndex;
	//alert(idx);
	var version = document.frm.version[idx].value;
	var plant_id = document.frm.plant_id[idx].value;
	var proc_id = document.frm.proc_id[idx].value;
	var item_id = document.frm.item_id[idx].value;
	var prodDates = obj.parentNode.childNodes(2).value;
	var shiftType = obj.parentNode.childNodes(3).value;	
	var plant_version = document.frm.plant_version.value;
	var cat_id = document.frm.cat_id[idx].value;
	var semi_version = document.frm.semi_version.value;
			
	service_url += "&plant_id=" + plant_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&prod_dates=" + prodDates + "&shift_type=" + shiftType;
	service_url += "&plant_version=" + plant_version + "&cat_id=" + cat_id + "&semi_version=" + semi_version;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1080, height=550, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_POPUP", pop_win_style); 
	newWin.focus();
}

// ��� POPUP(alt+���콺 ���� ��ư Ŭ��)
function altAndMouseLeftButtonClickfunc( obj ) {
	
	var flag = "";
	
	if( obj.value != "" ) flag = "M";
	
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNew_reg&_moon_perpage=200&_moon_pagenumber=1";
	
	var idx = obj.parentNode.parentNode.rowIndex;
	//alert(idx);
	var plant_id = document.frm.plant_id[idx].value;
	var version = document.frm.version[idx].value;
	var seq = document.frm.seq[idx].value;
	var prod_dates = obj.parentNode.childNodes(2).value;
	var shift_type = obj.parentNode.childNodes(3).value;
	var item_id = document.frm.item_id[idx].value;
	var proc_id = document.frm.proc_id[idx].value;
	
	if(plant_id == "1120" && proc_id == "11091") return;// �跮���̸� ���� ����.
	
	var plant_version = document.frm.plant_version.value;
	var cat_id = document.frm.cat_id[idx].value;
	var semi_version = document.frm.semi_version.value;
			
	service_url += "&plant_id=" + plant_id + "&version=" + version + "&seq=" + seq + "&prod_dates=" + prod_dates;
	service_url += "&shift_type=" + shift_type + "&item_id=" + item_id + "&proc_id=" + proc_id; 
    service_url += "&plant_version=" + plant_version + "&date_form=YYYY MM/DD(DY)" + "&cat_id=" + cat_id + "&semi_version=" + semi_version;
    service_url += "&flag=" + flag; 
     
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=300, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_REG", pop_win_style); 
	newWin.focus();
}

function faVsPsPopUp(){
	
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewFaVsPs_popup&_moon_perpage=200&_moon_pagenumber=1";

	var plant_list = document.frm.plant_list.value;
	var plant_version = document.frm.plant_version.value;
	var checked_weekly;
	if(document.frm.checked_weekly[0].checked){
		checked_weekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checked_weekly = document.frm.checked_weekly[1].value;
	}
	else{
		checked_weekly = document.frm.checked_weekly[2].value;
	}
	
	service_url += "&plant_list=" +plant_list + "&plant_version=" + plant_version + "&checked_weekly=" + checked_weekly;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=520, height=800, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_FA_VS_PS_POPUP", pop_win_style); 
	newWin.focus();

}

function excelDownloadPopUp(){
	
//	if( document.frm.plant_list.value == "" ){
//		alert("����� ������ ���� ���� �ؾ� �մϴ�.");
//		return;
//	}
	
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNewExcelDown_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var checkedWeekly;
	if(document.frm.checked_weekly[0].checked){
		checkedWeekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checkedWeekly = document.frm.checked_weekly[1].value;
	}
	else{
		checkedWeekly = document.frm.checked_weekly[2].value;
	}
	var lineGgrp = document.frm.line_grp.value;
	var plantVersion = document.frm.plant_version.value;
	var semiVersion = document.frm.semi_version.value;
	
	service_url += "&checked_weekly=" + checkedWeekly + "&line_grp=" + lineGgrp + "&plant_version=" + plantVersion;
	service_url += "&semi_version=" + semiVersion;
		  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1015, height=250, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_EXCEL_DOWN_POPUP", pop_win_style); 
	newWin.focus();
}

// ��ȸ
//GoSearch = function(service) {
//	if( document.frm.semi_version.value == null || document.frm.semi_version.value == "" ){
//		alert("���� ���� ��ư�� Ŭ���Ͽ� ����� ������ �����ؾ� �մϴ�.");
//		return;
//	}
//	
//	// ��ȸ�� WAITING �̹��� �����ֱ�
//	viewWait();
//	document.frm._moon_service.value = service; 
//	//document.form1._moon_perpage.value = perpage; 
//	document.frm._moon_pagenumber.value = "1"; 
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//};

// ����
function stockCheck(){
	
//	if( document.frm.plant_list.value == "" ){
//		alert("����� ������ ���� ���� �ؾ� �մϴ�.");
//		return;
//	}
	
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNewStockChk_popup&_moon_perpage=200&_moon_pagenumber=1";

	var semi_version = document.frm.semi_version.value;
	var checked_weekly;
	if(document.frm.checked_weekly[0].checked){
		checked_weekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checked_weekly = document.frm.checked_weekly[1].value;
	}
	else{
		checked_weekly = document.frm.checked_weekly[2].value;
	}
	
	service_url += "&semi_version=" + semi_version + "&checked_weekly=" + checked_weekly; 
	  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=950, height=800, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_STOCK_CHECK_POPUP", pop_win_style); 
	newWin.focus();

}

// �÷� ���� ���
// ���� : 75(tdPlant)
// �����ι� : 140(tdTeam)
// �۾��� : 160(tdProc)
// ��ǰ �ڵ� : 60(tdItemId)
// ��ǰ �� : 260(tdItemName)
// �԰� : 85(tdSpec)
// TO�� : 30(tdToMan)
// TO�� : 30(tdToWoman)
// ���� : 20(tdOS)
function changeDisplay(obj){
	
	var tabLen = left_tbody.rows.length;	
	
	if( obj.width == 5 ){// ��ħ
		alert
		var leftDisplayWidth = Number(leftDisplay.clientWidth);
		var topLeftWidth = Number(topLeft.clientWidth);
		
		var tdWidth;
		
		if( obj.id == "tdPlant") tdWidth = 75;
		else if( obj.id == "tdTeam" ) tdWidth = 140;
		else if( obj.id == "tdProc" ) tdWidth = 160;
		else if( obj.id == "tdItemId" ) tdWidth = 60;
		else if( obj.id == "tdItemName" ) tdWidth = 260;
		else if( obj.id == "tdSpec" ) tdWidth = 85;
		else if( obj.id == "tdToMan" ) tdWidth = 30;
		else if( obj.id == "tdToWoman" ) tdWidth = 30;
		else if( obj.id == "tdOS" ) tdWidth = 20;
		
		leftDisplay.style.width = leftDisplayWidth + tdWidth - 5;
		topLeft.style.width = topLeftWidth + tdWidth - 5;
		
		var id = obj.id
		var td = document.getElementsByName(id);
		for( i = 0; i < (tabLen + 1); i++ ){
			//tdPlant[i].style.display = "none";
			td[i].width = tdWidth;
		}
		
		if( obj.id == "tdPlant") document.frm.f01.value = "N";
		else if( obj.id == "tdProc" ) document.frm.f02.value = "N";
		else if( obj.id == "tdItemId" ) document.frm.f03.value = "N";
		else if( obj.id == "tdItemName" ) document.frm.f04.value = "N";
		else if( obj.id == "tdSpec" ) document.frm.f05.value = "N";		
	}
	else{ // ����
		var tdWidth = Number(obj.width);
		
		var leftDisplayWidth = Number(leftDisplay.style.width.replace("px",""));
		var topLeftWidth = Number(topLeft.style.width.replace("px",""));
		
		leftDisplay.style.width = leftDisplayWidth - tdWidth + 5;
		topLeft.style.width = topLeftWidth - tdWidth + 5;
		
		var id = obj.id
		var td = document.getElementsByName(id);
		for( i = 0; i < (tabLen + 1); i++ ){
			td[i].width = 5;
		}
		
		if( obj.id == "tdPlant") document.frm.f01.value = "Y";
		else if( obj.id == "tdProc" ) document.frm.f02.value = "Y";
		else if( obj.id == "tdItemId" ) document.frm.f03.value = "Y";
		else if( obj.id == "tdItemName" ) document.frm.f04.value = "Y";
		else if( obj.id == "tdSpec" ) document.frm.f05.value = "Y";
		
	}
	
	setHtmlGridAutoResize('112', '167');
}

function setFeildWidth(){
	
	if( document.frm.f01.value == "Y" ){
		var obj = document.getElementById("tdPlant");
		changeDisplay(obj);
	}
	
	if( document.frm.f02.value == "Y" ){
		var obj = document.getElementById("tdProc");
		changeDisplay(obj);
	}
	
	if( document.frm.f03.value == "Y" ){
		var obj = document.getElementById("tdItemId");
		changeDisplay(obj);
	}
	
	if( document.frm.f04.value == "Y" ){
		var obj = document.getElementById("tdItemName");
		changeDisplay(obj);
	}
	
	if( document.frm.f05.value == "Y" ){
		var obj = document.getElementById("tdSpec");
		changeDisplay(obj);
	}
		
}

// ����Ű �̵�
function moveFocus(obj){
	
	if(event.keyCode == 37){//left
		if(obj.parentNode.previousSibling){
			obj.parentNode.previousSibling.childNodes(0).focus();
		}
		else{
			return;
		}		
	}
	else if(event.keyCode == 38){// up
		var cellIdx = Number(obj.parentNode.cellIndex);
		var rowIdx = Number(obj.parentNode.parentNode.rowIndex);
		
		if(rowIdx == 0){
			return
		}
		else{
			main_tr[rowIdx-1].childNodes(cellIdx).childNodes(0).focus();
		}
	}
	else if(event.keyCode == 39){// right
		if(obj.parentNode.nextSibling){
			obj.parentNode.nextSibling.childNodes(0).focus();
		}
		else{
			return;
		}
	}
	else if(event.keyCode == 40){// down
		var cellIdx = Number(obj.parentNode.cellIndex);
		var rowIdx = Number(obj.parentNode.parentNode.rowIndex);
		
		if(main_tr[rowIdx+1].childNodes(cellIdx).childNodes(0)){
			main_tr[rowIdx+1].childNodes(cellIdx).childNodes(0).focus();
		}
		else{
			return;
		}
//		if(obj.parentNode.previousSibling.childNodes(0)){
//			obj.parentNode.previousSibling.childNodes(0).focus();
//		}
//		else{
//			return;
//		}
	}
		
}

// �̺�,���� ����  POPUP(���� ��ư Ŭ��)
function updateOthersItemClickfunc() {
	
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNew_upd&_moon_perpage=200&_moon_pagenumber=1";
	
	var idx = obj.parentNode.parentNode.rowIndex;
	//alert(idx);
	var plant_version = document.frm.plant_version.value;
	var semi_version = document.frm.semi_version.value;
			
	service_url += "&plant_version=" + plant_version + "&semi_version=" + semi_version;
     
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1300, height=500, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_NEW_REG", pop_win_style); 
	newWin.focus();
}

// ������ ���� �ð� ����(capa)
function capaInfoQtyPerHour(obj){
	
	if(obj.value == "") return;// ������ ������ ���� ����.
	if(obj.title != "") return; // title ���� ������ ���� ����.
	
	var idx = obj.parentNode.parentNode.rowIndex;
	var param = "plant_id!%!proc_id!%!item_id";
	var value = document.frm.plant_id[idx].value + "!%!"
				+ document.frm.proc_id[idx].value + "!%!" + document.frm.item_id[idx].value;
	
	// ������ �ð� ����(capa)
	commonUtil.getCodeList(param, value , "semi_capa_info_qty_per_hour", { 
		callback:function(arrList){
			if( arrList.length > 0 && arrList[0] != null){	
				//alert(arrList[0]);
				obj.title = arrList[0];
			}
			else{
				return;
			}			
		}
	});
}

//function capaInfoProcByHour(obj){
//	
//	var tabLen = left_tbody.rows.length;
//	var idx = obj.parentNode.parentNode.rowIndex;
//	var col = obj.parentNode.cellIndex;
//	
//	if( tabLen < 2 ) return;
//	
//	var itemList = "";
//	var itemQtyList = "";
//	var plant_id = document.frm.plant_id[idx].value;
//	var proc_id = document.frm.proc_id[idx].value;
//	
//	for( i = 0 ; i < tabLen-1 ; i++ ){
//		if( document.frm.plant_id[i].value == plant_id && document.frm.proc_id[i].value == proc_id ){
//			var qty = main_tbody.childNodes(i).childNodes(col).childNodes(0).value.replace(",","");
//			
//			if(itemList.length < 1){
//				itemList += document.frm.item_id[i].value;				
//				itemQtyList += document.frm.item_id[i].value + "','" + qty;
//			}
//			else{
//				itemList += "','" + document.frm.item_id[i].value;		
//				itemQtyList += "','" + document.frm.item_id[i].value + "','" + qty;	
//			}			
//		}
//	}	
//	
//	var param = "plant_id!%!proc_id!%!item_list!%!item_qty_list";
//	var value = plant_id + "!%!" + proc_id + "!%!" + itemList + "!%!" + itemQtyList;
//	// �۾��庰, shift�� ������ �ð� ����(capa)
//	commonUtil.getCodeList(param, value , "capa_info_proc_by_hour", { 
//		callback:function(arrList){
//			if( arrList.length > 0 && arrList[0] != null){	
//				alert("    " + arrList[0]);
//			}
//			else{
//				return;
//			}			
//		}
//	});
//	//alert(itemList);
//	//alert(itemQtyList);
//}

function excelDownload(){
	
	var service = "sc_12020_dailySemifinishedProductPlanAnalysisNew_list_excelDown";
	var checked_weekly = document.frm.checked_weekly.value;
	var plant_version = document.frm.plant_version.value;
	var semi_version = document.frm.semi_version.value;
	
	//if( document.frm.plant_list.value == "" ){
	//	alert("����� ������ ���� ���� �ؾ� �մϴ�.");
	//	return;
	//}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&checked_weekly="+checked_weekly
								+"&plant_version="+plant_version
								+"&semi_version=" + semi_version;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

function excelUpload(){
	
	var service = "sc_12020_dailySemifinishedProductPlanAnalysisNew_list_excelUp";
	var checked_weekly = document.frm.checked_weekly.value;
	var plant_version = document.frm.plant_version.value;
	var semi_version = document.frm.semi_version.value;
	
	//if( document.frm.plant_list.value == "" ){
	//	alert("����� ������ ���� ���� �ؾ� �մϴ�.");
	//	return;
	//}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&checked_weekly="+checked_weekly
								+"&plant_version="+plant_version
								+"&semi_version=" + semi_version;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	if( left_tbody.rows[obj.rowIndex] ) 
	{ 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#d0b8f1"; 
		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#d0b8f1"; 
		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	} 
	else 
	{ 
		left_tbody.rows.style.backgroundColor = "#d0b8f1"; 
		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows.style.backgroundColor = "#d0b8f1"; 
		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
function bgOut( obj ) {
	
	if( left_tbody.rows[obj.rowIndex] ) 
	{ 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	} 
	else 
	{ 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows.style.backgroundColor = "#ffffff";
		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setGridAutoResize( tab_h, table_h ){
	
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


function MrpCheck(){
	
		var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysisNew_list_test_pop";
		service_url += "" ;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=835, height=740, top=50, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	
}	
	
	