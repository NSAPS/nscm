//## ���α׷�ID		: op_02060_com_roh_cnfm_list.js
//## ���α׷���		: �迭�� ���ֿ��� ��ȸ 
//## ������			: ������
//## ��������			: 2013-07-08s
//##
//## ���� job file	: job_sinc_30_orderPlanning_03.xml
//## ���� query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-07-08  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'op_02060_com_roh_cnfm_list';
var GridObj ; 													// WiseGrid ��ü

var GridObj3;
var GridObj4;
var GridObj7;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����

var rFirst = 0;							// ����, ���� ���� �۾��� ȭ�� ��ġ�� �����ϱ� ���� Row Index ���� ����
var rEnd = 0;

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
        
    }  


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

function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader3(GridObj3);  	//�ش����� 
	setDefault3();        	//ȭ�� �⺻ ���� 
}

function init4() {
	GridObj4 = document.WiseGrid4;
	setProperty(GridObj4);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader4(GridObj4);  	//�ش����� 
	setDefault4();        	//ȭ�� �⺻ ���� 
}   

function init7() {
	GridObj7 = document.WiseGrid7;
	setProperty(GridObj7);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader7(GridObj7);  	//�ش����� 
	setDefault7();        	//ȭ�� �⺻ ���� 
}


   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	GridObj.bRowSelectorVisible		= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex		= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize				= 10;					//Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines				= 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor		= "170|170|170";		//���õ� ���� �������� �����Ѵ�.

     GridObj.strHDClickAction		= "sortsingle";   
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 8.5;					// Font Size 9
    
}


function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex		= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj3.nHDLineSize			= 13;					//Header Size
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.	
	GridObj3.nCellFontSize			= 8.5;					// Font Size 9
    GridObj3.bStatusbarVisible		= false;				// status bar visible ���¹� ���� 
    GridObj3.nHDLines				= 2;

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj4.bRowSelectorIndex		= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj4.nHDLineSize			= 12;					//Header Size
        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        		//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	
	GridObj4.nCellFontSize			= 8.5;					// Font Size 9
}

function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        			//�ο� �����͸� WiseGrid���� �����,. 
	GridObj7.bRowSelectorIndex		= true;						//Row Selector ������ Row Index�� �����ش�.
    GridObj7.nHDLineSize			= 12;						//Header Size
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        			//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj7.strActiveRowBgColor	= "170|170|170";    		//���õ� ���� �������� �����Ѵ�.
	GridObj7.nCellFontSize			= 8.5;							// Font Size 9
	GridObj7.bStatusbarVisible		= true;						// status bar visible ���¹� ����
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {
	
	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60		,false);		 
	GridObj.AddHeader("ITEM_ID"				,"��� ǰ���ȣ"      	,"t_text" 		,20		,90		,false); //0   
	GridObj.AddHeader("COM_MATR_CODE"		,"��� ǰ���ȣ"      	,"t_text" 		,20		,90		,false); //0
 	GridObj.AddHeader("ITEM_NAME"			,"ǰ���"      		,"t_text" 		,100	,240	,false); //0    
 	GridObj.AddHeader("BASE_UOM"			,"�⺻\n����"     	,"t_text" 		,100	,40		,false); //0  	
 	GridObj.AddHeader("STOCK"				,"���"      		,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("COM_STOCK"			,"��ü"   			,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("CNFM_STOCK"			,"����"     			,"t_number" 	,100.3	,80		,false); //0 ���� �������
 	GridObj.AddHeader("SUB_TOT"				,"�Ұ�"     			,"t_number" 	,100.3	,80		,false); //0 	
	GridObj.AddHeader("ODER_QTY"			,"���� �ҿ䷮"     	,"t_number" 	,100.3	,80		,false); //0
	GridObj.AddHeader("W1_STOCK"			,"������ ���"     	,"t_number" 	,100.3	,80		,false); //0  	
 	GridObj.AddHeader("FC_QTY"				,"���� ����"     	,"t_number"		,100.3	,80		,false); //0 	
 	GridObj.AddHeader("MSG"					,"���"				,"t_text" 		,100	,120	,false); //0   ������ ����


	/* ���� �ش� �߰� */
	GridObj.AddGroup("HD1",				   "�����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1", 			"STOCK");
	GridObj.AppendHeader("HD1", 		"COM_STOCK");
	GridObj.AppendHeader("HD1", 	   "CNFM_STOCK");
	GridObj.AppendHeader("HD1",			  "SUB_TOT");

	GridObj.BoundHeader();
     
    GridObj.SetColCellAlign('ITEM_ID',			'center'); 
    GridObj.SetColCellAlign('COM_MATR_CODE',	'center');
    GridObj.SetColCellAlign('ITEM_NAME',	  	  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',			'center');
    
    GridObj.SetColCellAlign('STOCK',		 'right');
    GridObj.SetColCellAlign('COM_STOCK',	 'right');
    GridObj.SetColCellAlign('CNFM_STOCK',	 'right');	//���� �������
	GridObj.SetColCellAlign('SUB_TOT',		 'right');     
     
	GridObj.SetColCellAlign('ODER_QTY',		 'right');
	GridObj.SetColCellAlign('W1_STOCK',		 'right');     
    
	GridObj.SetColCellAlign('FC_QTY',		 'right');	//���ֿ���
	GridObj.SetColCellAlign('MSG',		 	  'left');	//2013-09-09 �߰�
    
	GridObj.SetColFix('ITEM_NAME');

    GridObj.SetNumberFormat("STOCK", 				"###,###,##0");
    GridObj.SetNumberFormat("COM_STOCK", 			"###,###,##0");
    GridObj.SetNumberFormat("CNFM_STOCK", 			"###,###,##0");	//���� �������
    GridObj.SetNumberFormat("SUB_TOT", 				"###,###,##0");
    GridObj.SetNumberFormat("W1_STOCK", 			"###,###,##0");

    GridObj.SetNumberFormat("ODER_QTY", 			"###,###,##0");
    GridObj.SetNumberFormat("FC_QTY", 				"###,###,##0");
	
	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);	

}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

}

function setHeader3(GridObj3) {        

  	GridObj3.AddHeader("COM_MATR_CODE"	,"�����ڵ�"      	,"t_text" 		,40			,80		,false); //0
  	GridObj3.AddHeader("COM_MATR_NAME"	,"�����"      	,"t_text" 		,40			,140	,false); //0
  	   
  	GridObj3.AddHeader("UNIT"			,"����"       	,"t_text" 		,100		,60  	,false); //0   
  	GridObj3.AddHeader("PRE_STOCK"		,"�������"      	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_FC_QTY"		,"���ֿ���"       ,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_IPGO"		,"�԰�"      	,"t_number" 	,100.3		,80  	,false); //0    
  	GridObj3.AddHeader("NOW_EXPT"		,"���ֿ���"		,"t_number" 	,100.3		,80  	,false); //0   ȭ�� ����
  	GridObj3.AddHeader("SIL_STOCK"		,"�����"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("DIFF_QTY"		,"������"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("CNFM_STOCK"		,"Ȯ�����" 		,"t_number" 	,100.3		,80  	,false); //0   
	 	    
	
	/* ���� �ش� �߰� */
	GridObj3.AddGroup("HD1"	,"����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj3.AppendHeader("HD1",   "PRE_STOCK");
	GridObj3.AppendHeader("HD1",  "PRE_FC_QTY");
	GridObj3.AppendHeader("HD1", 	"PRE_IPGO");
	
	GridObj3.BoundHeader();	
    
    GridObj3.SetColCellAlign('COM_MATR_CODE',	'center'); 
    GridObj3.SetColCellAlign('COM_MATR_NAME',	  'left'); 
	GridObj3.SetColCellAlign('UNIT',			'center');
    GridObj3.SetColCellAlign('PRE_STOCK',		 'right'); 
    GridObj3.SetColCellAlign('PRE_FC_QTY',		 'right'); 
    GridObj3.SetColCellAlign('PRE_IPGO',		 'right'); 
    GridObj3.SetColCellAlign('NOW_EXPT',		 'right'); 
    GridObj3.SetColCellAlign('SIL_STOCK',		 'right');
    GridObj3.SetColCellAlign('DIFF_QTY',		 'right'); 
    GridObj3.SetColCellAlign('CNFM_STOCK',		 'right');    
    
    GridObj3.SetNumberFormat("PRE_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_FC_QTY", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_IPGO",	"#,##0");
    GridObj3.SetNumberFormat("NOW_EXPT",	"#,##0");
    
	GridObj3.SetNumberFormat("SIL_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("DIFF_QTY",	"#,##0");
    GridObj3.SetNumberFormat("CNFM_STOCK",	"#,##0");    

}   

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	
	if(week_flag =="M"){ //����
	  	GridObj4.AddHeader("GUBN"		,"���� ����"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"ǰ���ȣ"      		,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"�����"   			,"t_text" 	,100	,60 	,false); //0	
	}else {//W �ְ� 
  		GridObj4.AddHeader("GUBN"		,"�ְ� ����"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"ǰ���ȣ"      		,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"�����"   			,"t_text" 	,100	,60 	,false); //0	
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //����
	
		var header_id = "op_02060_com_roh_cnfm_list_dw4_monthly_header";	
		
	}else {//W �ְ� 
			
			var header_id = "op_02060_com_roh_cnfm_list_dw4_weekly_header";	
			
		}	
	
	commonUtil.getSelQeury( "", "", header_id,{
		callback:function(result){
			
			for(var i=0 ; i < 9 ; i++){
				if(i < result.length) {
					GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 19) {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
					else {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
				}
			}
		 	
			GridObj4.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
		    
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		
			if(week_flag =="M"){ //����
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}else {//W �ְ� 
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}	

			
			
			GridObj4.SetNumberFormat("MM_0_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_1_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_2_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_3_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_4_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_5_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_6_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_7_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_8_QTY"  , "#,##0");
			
			doQuery4();  
				
		}
			
	});
			 
}


function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("EVEN_DATE"	,"�������"  	,"t_text" 		,20		,70   ,false); //0
  	GridObj7.AddHeader("PROD_CODE"	,"ǰ���ڵ�"  	,"t_text" 		,10		,30    ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"	,"ǰ���"  	,"t_text" 		,100	,90   ,false); //0   
  	GridObj7.AddHeader("E_QTY"		,"�̸�Ʈ"  	,"t_number" 	,100.3	,60   ,false); //0   
  	GridObj7.AddHeader("H_QTY"		,"Ȩ�÷���"  	,"t_number" 	,100.3	,60   ,false); //0   
 	GridObj7.AddHeader("L_QTY"		,"�Ե���Ʈ"	,"t_number" 	,100.3	,60   ,false); //0    	   

	GridObj7.BoundHeader();	
    
    GridObj7.SetColCellAlign('EVEN_DATE',	'center');
    GridObj7.SetColCellAlign('PROD_CODE',	  'left');
    GridObj7.SetColCellAlign('ITEM_NAME',	  'right');

	GridObj7.SetColCellAlign('E_QTY',		 'right');
    GridObj7.SetColCellAlign('H_QTY',		 'right');
    GridObj7.SetColCellAlign('L_QTY',		 'right');

    GridObj7.SetNumberFormat("E_QTY",	"#,##0");
    GridObj7.SetNumberFormat("H_QTY", 	"#,##0");
	GridObj7.SetNumberFormat("L_QTY",	"#,##0");

}

	// �÷� ����

function setGrid(){	
	GridObj.SetColFix('ITEM_NAME');
}

  
/*������������������������������������������������������������������������
  ��WiseGrid Row Scroll Event
  ������������������������������������������������������������������������*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}  
  
function GridEndQuery(){
	
    var mode		= GridObj.GetParam("mode");
    var error_msg	= '';    
      
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {   		
        
        }
         else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}

    } 
}



function GridEndQuery3() {
	
	var mode		= GridObj3.GetParam("mode");
	var error_msg	= '';

	
		          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") {						        	               

		}
		
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}else{
		
		doQuery();
	}
	
	
} 

function GridEndQuery4() {
	
	var mode		= GridObj4.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search4") {
		if(GridObj4.GetStatus() == "true") {                           
		}
		else { 
			error_msg = GridObj4.GetMessage(); 
			alert(error_msg);            
		}
	}
	
	}


function GridEndQuery7() {
	
	var mode		= GridObj7.GetParam("mode");
	var error_msg	= '';
		          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
		  //GridObj7.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum','E_QTY,H_QTY,L_QTY');
		  //GridObj7.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj7.GetMessage(); 
			alert(error_msg);            
		}
	}
}


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}	


               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {

    var cnfm_date		= document.frm.cnfm_date.value;
    
    doQuery();
	
	GridObj3.ClearGrid(); 
	setHeader3(GridObj3);	
	
	GridObj4.ClearGrid(); 
	setHeader4(GridObj4);	

	GridObj7.ClearGrid(); 
	setHeader7(GridObj7);	

	
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     
	
	if( strColumnKey == "SELECTED"){
		return;
	}else if(strColumnKey == "BASE_STOCK" || strColumnKey == "PROG_STOCK" ||strColumnKey == "TOT_STOCK" ){
		
		var item_id			= GridObj.GetCellValue("ITEM_ID", 			nRow);		
		var	item_name		= GridObj.GetCellValue("ITEM_NAME", 		nRow);
		var com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE", 	nRow);		
		
		var service_url = "service.do?_moon_service=op_02050_even_item_list_dw7";
		
		service_url += "&item_id=" + item_id +"&com_matr_code=" + com_matr_code + "&item_name=" + item_name;
		
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=320, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
		
		return;		
	}

	
	document.all.week_flag.value	= 'M'
	
    
    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", 				nRow);
    var sel_com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE", 		nRow);        
    var sel_item_name		= GridObj.GetCellValue("ITEM_NAME", 			nRow);	

	// doQuery3 �� ���̳��� �ش� ������ DW5 �� ������ ����
	
	doQuery3(nRow);	//���� ����
	
	doQuery4(nRow);		
	
	doQuery7(nRow);	//���� ���� 
	
}        
   
/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;       
       
       var cnfm_date	= document.frm.cnfm_date.value;
       var mfs_flag		= document.frm.mfs_flag.value;       
       //var com_code		= document.frm.com_code.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",						"search");       
       GridObj.SetParam("cnfm_date",				cnfm_date);
       GridObj.SetParam("mfs_flag",					mfs_flag);
       //GridObj.SetParam("com_code",					com_code);
       
       GridObj.SetParam("user_id", document.frm._user_id.value);       
       GridObj.DoQuery(servlet_url);
   }



function doQuery3(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	var com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE",	nRow);	
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	GridObj3.SetParam("mode", 	"search3");	
	GridObj3.SetParam("cnfm_date",  		cnfm_date);
	GridObj3.SetParam("com_matr_code",  com_matr_code);
	GridObj3.DoQuery(servlet_url);
}



/*������������������������������������������������������������������������
  ��DW 4 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var nRow		= GridObj.GetActiveRowIndex( );
	if (nRow < 0) return; 
	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;	
	var week_flag	= document.all.week_flag.value;
	
	
	
	if(week_flag =="M"){ //����
		GridObj4.SetParam("query_id", "op_02060_com_roh_cnfm_list_dw4_monthly");	
		
	}else{//W �ְ� 
		GridObj4.SetParam("query_id", "op_02060_com_roh_cnfm_list_dw4_weekly");	
	}	
	
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj4.SetParam("itype", 	   		itype);
	GridObj4.SetParam("mode",  		"search4");
	GridObj4.SetParam("item_id", 	  item_id);
	GridObj4.SetParam("week_flag", 	week_flag);
	GridObj4.DoQuery(servlet_url);
}





/*������������������������������������������������������������������������
  ��DW 5 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
/*function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj5.SetParam("itype", 		itype);
	GridObj5.SetParam("mode",	"search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.DoQuery(servlet_url);
}



/*������������������������������������������������������������������������
  ��DW 7 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery7(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cons_item_id	= GridObj.GetCellValue("ITEM_ID", 		nRow);
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	GridObj7.SetParam("mode", 		 		"search7");
	GridObj7.SetParam("cons_item_id",	 cons_item_id);
	GridObj7.SetParam("cnfm_date",	 		cnfm_date);
	
	GridObj7.DoQuery(servlet_url);
}

// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	//setEditMode( objTdG );
	
}


// popup ��ȸ �̹��� mouseOver
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup ��ȸ �̹��� mouseOut
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}




function DW4_DblClick(strColumnKey, nRow){
	
	yyyy_mm 		= GridObj4.getColHDText(strColumnKey);	

	var week_flag	= document.all.week_flag.value;


	if(yyyy_mm == "���� ����" ||yyyy_mm == "�ְ� ����"){  // DW 4�� ùĭ�� ��ǰ�ڵ� ���ý� week_flag ���� �������� �ְ�/���� ����  ��ȸ
		if(week_flag == 'M'){
			document.all.week_flag.value = 'W';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
			
		}else{			
			document.all.week_flag.value = 'M';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
		}
		
	} else{
		if(week_flag == 'M'){
		}else{
			alert("���� ��볻���� �ְ����� �����ϰ� ��ȸ���ֽʽÿ�.");
			return;
		}
	}
	
}



function DW5_DblClick(strColumnKey, nRow){
	
	var yyyy_mm = GridObj5.GetCellValue("YYYY_MM", nRow);

	if(yyyy_mm == null || yyyy_mm == ""){
		return;
		
	} else{
		document.all.from_mm.value	= yyyy_mm;
		document.all.to_mm.value	= yyyy_mm;
		doQuery7();
	}
	
}

function doChange_mm(obj){
	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // ������
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2)	- Number(1);
		
			// �ذ� �Ѿ�ٸ�...
			if(from_mm_2 == 0){
				from_mm_1 = Number(from_mm_1) - Number(1);
				from_mm_2 = 12;
			}else{
				
			}
			if(to_mm_2 == 0){
				to_mm_1 = Number(to_mm_1) - Number(1);
				to_mm_2 = 12;
			}else{
				
			}
		
		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}else{ //������
		from_mm_2	= Number(from_mm_2) + Number(1);
		to_mm_2		= Number(to_mm_2) + Number(1);

			// �ذ� �Ѿ�ٸ�...
			if(from_mm_2 == 13){
				from_mm_1 = Number(from_mm_1) + Number(1);
				from_mm_2 = 1;
			}else{
				
			}
			if(to_mm_2 == 13){
				to_mm_1 = Number(to_mm_1) + Number(1);
				to_mm_2 = 1;
			}else{
				
			}


		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}
	
	document.all.from_mm.value = from_mm; 
	document.all.to_mm.value = to_mm; 
	
	
}

//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/
function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {	

	var cnfm_stock		= GridObj3.GetCellValue("CNFM_STOCK", 		nRow)
	
	if(strColumnKey == "CNFM_STOCK"){
		doSave2();
		
	}
		else{
			}

}




// �ش� �÷��׿����� ���ð� �Ҵ�
/*function doCheckFlag(obj){
	// sale_plan_flag - �ǸŰ�ȹ 0 �̾ ��ȸ
	if(obj.name == "serch_flag_chk" ){ 
		if(obj.checked){
				document.frm.serch_flag.value = "Y";
		}
		else{
				document.frm.serch_flag.value = "N";
		}
	}
	var serch_flag = document.frm.serch_flag.value;
	
	doQuery7(nRow);
}*/


function doChange3(obj){

	
}


var flag = "N";

var timer;



function test(){  
  if(flag == "Y"){
   try{     
     test2();      

     clearInterval(timer);
   }
   catch(e){

     timer();

   }
  }
 }

function HeaderClick_DW2(strColumnKey){ /* HeaderClick_DW2 */


	var item_id		= document.all.sel_item_id.value;
	var	item_name	= document.all.sel_item_name.value;
	
	if(item_id == null||item_id == ''){
		alert("ǰ���� ������ �ٽ� ��ȸ �Ͻñ� �ٶ��ϴ�");
		return;
	}			
	
	var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
	var newWin = window.open(service_url, "", pop_win_style);  
	newWin.focus();


}
 

