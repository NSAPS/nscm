//############################################################
//## ���α׷�ID      : ip_02110_hawa_expt_sell_management.js
//## ���α׷���      : �׽��� �Ǹ����� ����
//## ������          : ������
//## ��������        : 2014-01-16
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_ip_02110_hawa_expt_sell_management.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-01-16  ������      create
//##
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_02110_hawa_expt_sell_management';
var GridObj ; 													// WiseGrid ��ü

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/*����������������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 							��
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.			��
  ����������������������������������������������������������������������������������������������������������������������������������������������*/
function init() { 
   
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  	//�ش����� 
	setDefault();        	//ȭ�� �⺻ ���� 

}
   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	//GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'

	GridObj.bHDMoving = false; 
	GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 

	GridObj.strRowBorderStyle = 'none' 

	GridObj.nRowSpacing = 0 

	GridObj.strHDClickAction = 'select' 	// 
	// 
	//     
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	var cnfm_date	= document.all.cnfm_date.value;
	var strColumnKey;
	
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_02110_hawa_expt_sell_management_header",{
		callback:function(result){

			GridObj.AddHeader("CRUD"		,"CRUD"       	,"t_text" 	,100 		,0  	,false);
		  	GridObj.AddHeader("ITEM_ID"		,"ǰ���ڵ�"      	,"t_text" 	,100.3		,65  	,false); //0   
		  	GridObj.AddHeader("ITEM_NAME"	,"ǰ���"      	,"t_text" 	,100.3		,170  	,false); //0   
		  	GridObj.AddHeader("GUBN"		,"�����ڵ�"      	,"t_text" 	,100.3		,0  	,false); //0   
		  	GridObj.AddHeader("GUBN_NAME"	,"����"      	,"t_text" 	,100.3		,100  	,false); //0   
		  	   

			for(var i=0 ; i < result.length ; i++){  
				if(i < 6) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100	,63  ,false);
				}
				else { // editable!
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100	,63  ,true);
				}
				    
			}
			
			GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
    		GridObj.SetColCellAlign('ITEM_ID','center'); 
    		GridObj.SetColCellAlign('ITEM_NAME','left'); 
    		GridObj.SetColCellAlign('GUBN_NAME','center'); 

			// ���� 6����
			for(var i = 1 ; i < 7 ; i++) {
				strColumnKey = 'W_P0'+i;
				GridObj.SetColCellAlign(strColumnKey,'right');
				GridObj.SetNumberFormat(strColumnKey, "#,##0");
			}
			
			GridObj.SetCRUDMode("CRUD", "����", "����", "����");
			
			//Hidden �÷�
			GridObj.SetColHide("CRUD",true);

			
			// �������� 26����
			for(var i=0 ; i < 27 ; i++) {
				if(i<10) {
					strColumnKey = 'W_N0' + i;
				}
				else {
					strColumnKey = 'W_N' + i;
				}
				GridObj.SetColCellAlign(strColumnKey,'right');
				GridObj.SetNumberFormat(strColumnKey, "#,##0");
			}

			GridObj.SetColFix('GUBN_NAME'); 
			
			GridObj.SetColHDBgColor('W_N00', '253|228|229'); 			
		}
		
	});   
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service) {
	doQuery();
}
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.all.cnfm_date.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("cnfm_date", cnfm_date);
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.all.cnfm_date.value;
   
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cnfm_date", cnfm_date);

	GridObj.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';

	var color_02 = 		'242|242|242';		
	var color_03 = 		'232|232|232';		
	var color_04 = 		'217|242|255';		
	var color_06 = 		'221|221|221';	
	
	var strColumnKey;	
          
    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {

	    var rowCnt = GridObj.GetRowCount();
	    for (var i = 0 ; i < rowCnt ; i++ ){

	    	var gubn = GridObj.GetCellValue("GUBN", i);
		    	
	    	// row ��ü ����
	    	if(gubn == "01") {
	    		GridObj.SetRowBgColor(i, colBg02);
	    	}	
	    	else if(gubn == "06") {
	    		GridObj.SetRowBgColor(i, color_06);
	    	}			

			for(var k = 1 ; k < 7 ; k++) {
				strColumnKey = 'W_P0'+k;
				
				if( gubn == "03") { // ���(�հ�)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_03);  
					GridObj.SetCellBgColor(strColumnKey, i, color_03);
				}
				else if( gubn == "02") { //���(�׽���)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_02);
					GridObj.SetCellBgColor(strColumnKey, i, color_02); 	
				}
				else if( gubn == "04") { //�԰�(�׽���)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_04);
					GridObj.SetCellBgColor(strColumnKey, i, color_04); 	
				}
				else if( gubn == "05") { //�Ǹſ���
					GridObj.SetCellBgColor('GUBN_NAME', i, color_edit_col);
					GridObj.SetCellBgColor(strColumnKey, i, color_edit_col); 	
				}
			}
		    // �������� 26����
			for(var j = 0 ; j < 27 ; j++) {
				
				if(j < 10) {
					strColumnKey = 'W_N0' + j;
				}
				else {
					strColumnKey = 'W_N' + j;
				}

				if( gubn == "01") { // ���(���)
					GridObj.SetCellActivation(strColumnKey, i, 'disable'); //������ �� ���� ������ �� ����.
			    }
			    else if( gubn == "02") { //���(�׽���)
			    	GridObj.SetCellBgColor(strColumnKey, i, color_02); 
			    	if(j == 0) { // ����
			    		GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    	}
			    	else GridObj.SetCellActivation(strColumnKey, i, 'disable'); //������ �� ���� ������ �� ����.
			    }
			    else if( gubn == "03") { //���(�հ�) {
			    	GridObj.SetCellBgColor(strColumnKey, i,color_03);
			    	GridObj.SetCellActivation(strColumnKey, i, 'disable'); //������ �� ���� ������ �� ����.
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "04") { //�԰�(�׽���)
			    	GridObj.SetCellBgColor(strColumnKey, i,color_04);  
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "05") { //�Ǹſ���
			    	GridObj.SetCellBgColor(strColumnKey, i, color_edit_col); 
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "06") { //�ǸŽ���
			    	GridObj.SetCellActivation(strColumnKey, i, 'disable'); //������ �� ���� ������ �� ����.
			    }				

			}
		    
		    
	    }        
    	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME');
    	compute_field();
    }                     
    else    
    { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
    }
    
}

function excelDown() {

	var GridObj = document.WiseGrid;
	GridObj.ExcelExport("", "", true, true);
}

function GridCellClick(strColumnKey, nRow){
	
}

function GridCellDblClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	compute_field();
}

function compute_field() {
	
    var rowCnt = GridObj.GetRowCount();
	var strColumnKey, p_strColumnKey;
	var ns_stock = 0, reqt_ns_stock = 0, nestle_stoc = 0; stoc_tot = 0;
    for (var i = 0 ; i < rowCnt ; i++ )	{
		var gubn = GridObj.GetCellValue("GUBN", i);
		
		// �������� 26����
		for(var j = 0 ; j < 27 ; j++) {
			if(j < 10) {
				strColumnKey = 'W_N0' + j;
				if(j > 0) {p_strColumnKey = 'W_N0' + (j - 1);}
			}
			else {
				strColumnKey = 'W_N' + j;
				if(j == 10) {p_strColumnKey = 'W_N0' + (j - 1);}
				else {p_strColumnKey = 'W_N' + (j - 1);}
			}
			if(gubn == "01") { // ���(���)
				if(j > 0) { // ���� ���� ��� : ���(���) - ���� �Ǹſ���
					ns_stock = strToNum(GridObj.GetCellValue(p_strColumnKey, i)) 
								- strToNum(GridObj.GetCellValue(p_strColumnKey, i + 4)); 
					if(ns_stock < 0) { // ��� �����ϸ�
						ns_stock = 0;
					}
					GridObj.SetCellValue(strColumnKey, i, ns_stock);
				}
			}
			else if(gubn == "02") { // ���(�׽���)
				if(j > 0) { 
					// ��� ��� ������ ��� : ���� ���(���) - ���� �Ǹſ���
					reqt_ns_stock = strToNum(GridObj.GetCellValue(p_strColumnKey, i - 1))
								   - strToNum(GridObj.GetCellValue(p_strColumnKey, i + 3)) 
					if(reqt_ns_stock > 0) { // ��� �������� ������
						reqt_ns_stock = 0;
					}
					// ���(�׽���) = ���� ���(�׽���) - ��� ��� ������  + ���� �԰�(�׽���)
					nestle_stoc = strToNum(GridObj.GetCellValue(p_strColumnKey, i)) 
								  + reqt_ns_stock
								  + strToNum(GridObj.GetCellValue(p_strColumnKey, i + 2)); 
					GridObj.SetCellValue(strColumnKey, i, nestle_stoc);
				}
			}
			else if(gubn == "03") { // ���(�հ�) = ���(���) + ���(�׽���)
				stoc_tot = strToNum(GridObj.GetCellValue(strColumnKey, i - 2)) 
							+ strToNum(GridObj.GetCellValue(strColumnKey, i - 1)); 
				GridObj.SetCellValue(strColumnKey, i, stoc_tot);
 				if(stoc_tot < 0) {
 					GridObj.SetCellFgColor(strColumnKey, i ,'255|10|10');
 				}
 			}
	    }
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
