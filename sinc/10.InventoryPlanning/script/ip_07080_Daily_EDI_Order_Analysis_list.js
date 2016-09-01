//## ���α׷�ID      : ip_07080_Daily_EDI_Order_Analysis_list.js
//## ���α׷���      : �Ⱓ��EDI������ȯ�м���ȸ
//## ��������        : ������
//## ��������        : 2014-04-03
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## VER1.0		2014-10-29			  ��翵����� �� ������� �߰�
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_07080_Daily_EDI_Order_Analysis_list';

var GridObj ; 
var GridObj2;													// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ���� 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';

var flag_cust_code	 = '1';				//Header ���ı��
var flag_cust_name	 = '1';
var flag_cnfm_date	 = '1';
var flag_order_box	 = '1';
var flag_reqt_box	 = '1';
var flag_sell_box	 = '1';
var flag_gap	 	 = '1';
var flag_dc_name	 = '1';
var flag_sales_name	 = '1';

var sum_gubn = '�Ұ�����';  // or '�Ұ����'

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
            tableHeightValue += Number(search_h);   
        } 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1;
          
        //tabPage1.style.height = tabHeightValue + "px"; 

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
    }  

/*����������������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 							��
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.			��
  ����������������������������������������������������������������������������������������������������������������������������������������������*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
//	setHeader(GridObj);  	//�ش����� 
	setDefault();        	//ȭ�� �⺻ ���� 
} 

function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// �⺻ property ����
	setDefault2();  			// �߰� property ����
	setHeader2();   			// Header ����
	
	
			
}  
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nCellFontSize = 9;					// Font Size 9
	GridObj.bHDFontBold = true;
	//GridObj.bHDFontULine=true;				// ��� ����
       
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj2.bHDMoving = false;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
	GridObj2.bHDSwapping = false;                	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
	GridObj2.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�. 
	GridObj2.strRowBorderStyle = "none";         	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing���� ���Ѵ�. 
	GridObj2.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj2.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '���� ���';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder ����
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid �� ����
    GridObj2.nRowHeight    = 12;    //22
    
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
 
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	var start_date	    = document.all.start_date.value;
	var end_date	    = document.all.end_date.value;
	start_date 			= start_date.replace(/-/g,"");
	end_date 			= end_date.replace(/-/g,"");


	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = start_date +"!%!"+end_date+"!%!"	+"D";

	// ��¥�Ⱓ ���Ἲ check
	commonUtil.getCodeInfo(in_sel_name,in_sel_value,"ip_06010_TERM_CHECK", { 
		callback:function(arrList){
			var check_return = -9;
			if( arrList.length == 1 ) {
				var check_return = arrList[0][0];
			}

			if (check_return == -1){
				alert("�������� �����Ϻ��� �����ϴ�!");
				return;
			}
			else if (check_return == -2){
				alert("��ȸ�Ⱓ�� 31�� �Դϴ�.");
				return;
			}
			else if (check_return == -9){
				alert("��¥ �����Դϴ�");
				return;
			}
		
			commonUtil.getSelQeury( "start_date!%!end_date", start_date+"!%!"+end_date, "ip_07080_Daily_EDI_Order_Analysis_list_DW1_HEADER",{
				callback:function(result){
		
					GridObj.AddHeader("PROD_CODE"	    ,"ǰ���ڵ�"	,"t_text"	   ,100	    ,60     ,false); //0
				 	GridObj.AddHeader("ITEM_NAME"	    ,"ǰ���"		,"t_text" 	   ,100	    ,150     ,false); //0   
				 	GridObj.AddHeader("GUBN"	       	,"����"	    ,"t_text" 	   ,100	    ,50    ,false); //0
					if(result.length > 0){		
						for(var i=0 ; i < result.length ; i++){  
							GridObj.AddHeader(result[i][0]	,result[i][1]	,"t_number"	,100.3	,result[i][2]  ,false);    
						}
					
				 	GridObj.AddHeader("TOT"   		,"��"		,"t_number"    ,100.3	,60     ,false); //0
				 	
					GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
					
				    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
				    GridObj.SetColCellAlign('ITEM_NAME',	'left');
				    GridObj.SetColCellAlign('GUBN',			'center'); 
				    GridObj.SetColCellAlign('D00',		'right');
				    GridObj.SetColCellAlign('D01',		'right');
				    GridObj.SetColCellAlign('D02',		'right');
				    GridObj.SetColCellAlign('D03',		'right');
				    GridObj.SetColCellAlign('D04',		'right');
				    GridObj.SetColCellAlign('D05',		'right');
				    GridObj.SetColCellAlign('D06',		'right');
				    GridObj.SetColCellAlign('D07',		'right');
				    GridObj.SetColCellAlign('D08',		'right');
				    GridObj.SetColCellAlign('D09',		'right');
				    GridObj.SetColCellAlign('D10',		'right');
				    GridObj.SetColCellAlign('D11',		'right');
				    GridObj.SetColCellAlign('D12',		'right');
				    GridObj.SetColCellAlign('D13',		'right');
				    GridObj.SetColCellAlign('D14',		'right');
				    GridObj.SetColCellAlign('D15',		'right');
				    GridObj.SetColCellAlign('D16',		'right');
				    GridObj.SetColCellAlign('D17',		'right');
				    GridObj.SetColCellAlign('D18',		'right');
				    GridObj.SetColCellAlign('D19',		'right');
				    GridObj.SetColCellAlign('D20',		'right');
				    GridObj.SetColCellAlign('D21',		'right');
				    GridObj.SetColCellAlign('D22',		'right');
				    GridObj.SetColCellAlign('D23',		'right');
				    GridObj.SetColCellAlign('D24',		'right');
				    GridObj.SetColCellAlign('D25',		'right');
				    GridObj.SetColCellAlign('D26',		'right');
				    GridObj.SetColCellAlign('D27',		'right');
				    GridObj.SetColCellAlign('D28',		'right');
				    GridObj.SetColCellAlign('D29',		'right');
				    GridObj.SetColCellAlign('D30',		'right');
				    GridObj.SetColCellAlign('TOT',		'right');
		
				    GridObj.SetNumberFormat("D00",       "###,###");
				    GridObj.SetNumberFormat("D01",       "###,###");
				    GridObj.SetNumberFormat("D02",       "###,###");
				    GridObj.SetNumberFormat("D03",       "###,###");
				    GridObj.SetNumberFormat("D04",       "###,###");
				    GridObj.SetNumberFormat("D05",       "###,###");
				    GridObj.SetNumberFormat("D06",       "###,###");
				    GridObj.SetNumberFormat("D07",       "###,###");
				    GridObj.SetNumberFormat("D08",       "###,###");
				    GridObj.SetNumberFormat("D09",       "###,###");
				    GridObj.SetNumberFormat("D10",       "###,###");
				    GridObj.SetNumberFormat("D11",       "###,###");
				    GridObj.SetNumberFormat("D12",       "###,###");
				    GridObj.SetNumberFormat("D13",       "###,###");
				    GridObj.SetNumberFormat("D14",       "###,###");
				    GridObj.SetNumberFormat("D15",       "###,###");
				    GridObj.SetNumberFormat("D16",       "###,###");
				    GridObj.SetNumberFormat("D17",       "###,###");
				    GridObj.SetNumberFormat("D18",       "###,###");
				    GridObj.SetNumberFormat("D19",       "###,###");
				    GridObj.SetNumberFormat("D20",       "###,###");
				    GridObj.SetNumberFormat("D21",       "###,###");
				    GridObj.SetNumberFormat("D22",       "###,###");
				    GridObj.SetNumberFormat("D23",       "###,###");
				    GridObj.SetNumberFormat("D24",       "###,###");
				    GridObj.SetNumberFormat("D25",       "###,###");
				    GridObj.SetNumberFormat("D26",       "###,###");
				    GridObj.SetNumberFormat("D27",       "###,###");
				    GridObj.SetNumberFormat("D28",       "###,###");
				    GridObj.SetNumberFormat("D29",       "###,###");
				    GridObj.SetNumberFormat("D30",       "###,###");
				    GridObj.SetNumberFormat("TOT",       "###,###");
					}
		
					doQuery();	
				}
			});   

		}
	});

}

function setHeader2() 
{        
	GridObj2.AddHeader("CUST_NAME"			,"������"		,"t_text" 		,100	,150  ,false);   
	GridObj2.AddHeader("CUST_CODE"			,"�����ڵ�"		,"t_text" 		,100	,5  ,false);   

	GridObj2.AddHeader("ITEM_NAME"			,"ǰ���"		,"t_text" 		,100	,160  ,false);   
	GridObj2.AddHeader("PROD_CODE"			,"ǰ���ڵ�"		,"t_text" 		,100	,5  ,false);   
	GridObj2.AddHeader("CNFM_DATE"			,"����"			,"t_text" 		,100	,70  ,false);   
 	
 	GridObj2.AddHeader("ODER_BOX"			,"���ַ�"      	,"t_number" 	,100	,50  ,false);   
 	GridObj2.AddHeader("REQT_BOX"			,"�ֹ���"      	,"t_number" 	,100	,50  ,false);   
 	GridObj2.AddHeader("SELL_BOX"			,"��ǰ��"     	,"t_number" 	,100	,50  ,false); 
 	GridObj2.AddHeader("GAP"				,"�̳���"     	,"t_number" 		,100	,50  ,false);  
 	GridObj2.AddHeader("DC_NAME"			,"�������"     	,"t_text" 		,100	,65  ,false);  
 	GridObj2.AddHeader("SALES_NAME"			,"�����"     	,"t_text" 	,100	,50  ,false);     
 	
 
	GridObj2.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
	
	
    GridObj2.SetColCellAlign('CUST_CODE',	'center');
    GridObj2.SetColCellAlign('CUST_NAME',	'left'); 
    GridObj2.SetColCellAlign('PROD_CODE',	'center');
    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
    GridObj2.SetColCellAlign('CNFM_DATE',	'center');
    GridObj2.SetColCellAlign('ODER_BOX',	'right');
    GridObj2.SetColCellAlign('REQT_BOX',	'right');
    GridObj2.SetColCellAlign('SELL_BOX',	'right');
    GridObj2.SetColCellAlign('DC_NAME',		'left'); 
    GridObj2.SetColCellAlign('SALES_NAME',	'left'); 
    GridObj2.SetColCellAlign('GAP',			'right');
	
	GridObj2.SetNumberFormat("ODER_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("REQT_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("SELL_BOX"	    , "###,###,###");
	GridObj2.SetNumberFormat("GAP"	     	, "###,###,###");
	
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
         
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {	
        		
            if(GridObj.GetStatus() == "true") 
            {                           
              
            	var rowCnt = GridObj.GetRowCount();
	    		for (var i = 0 ; i < rowCnt ; i++ ){
	    			var gubn = GridObj.GetCellValue("GUBN", i);
	    			if(gubn == "�̳���") {
	    				GridObj.SetRowBgColor(i, '212|212|212');
	    			}
	    		}
              
              GridObj.SetColFix("GUBN");
              GridObj.SetGroupMerge('PROD_CODE,ITEM_NAME');

            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
      
      
		
    }

function GridEndQuery2() {
		
	// wiseGrid���� �̻�޼��� Ȯ�ο�!
	if(GridObj2.GetStatus() != "true") {
		return;
	}

	var end_mode = GridObj2.GetParam("mode");


	if(end_mode == "search_DW2") { //��ȸ
		if(GridObj2.GetStatus() == "true") { // 
			GridObj2.SetGroupMerge('CUST_NAME,CUST_CODE');
			if(sum_gubn == '�Ұ�����') {
				GridObj2.AddSummaryBar('SUMMARY2', '�Ұ�', 'CUST_NAME', 'sum', 'ODER_BOX,REQT_BOX,SELL_BOX,GAP'); 
				GridObj2.SetSummaryBarColor('SUMMARY2', '0|0|0', '212|212|212'); 
			}
			GridObj2.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'ODER_BOX,REQT_BOX,SELL_BOX,GAP'); 
			GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '252|252|192');			
		}
		
	}
}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	��ȸ����
   	
	var grup_code1	    = document.all.grup_code1.value;

	GridObj.ClearGrid();
    setHeader(GridObj);

   }

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       //start_date 			= start_date.replace(/-/g,"");
       //end_date 			= end_date.replace(/-/g,"");
      // alert(end_date);
     //  return;
		
	   var chk_edi_reason	= document.frm.chk_edi_reason.value;
	
       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var search_item	    = document.all.search_item.value;
       var grup_code1	    = document.all.grup_code1.value;
       var in_qty_gubn		= document.all.in_qty_gubn.value;
 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
		if(document.frm.chk_edi_reason.checked) {
		GridObj.SetParam("chk_edi_reason",     "Y");
		}
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("grup_code1", grup_code1);
	   GridObj.SetParam("in_qty_gubn", in_qty_gubn);
	   
	   

	GridObj2.ClearGrid();
	setHeader2();
	sum_gubn = '�Ұ�����';


	   GridObj.DoQuery(servlet_url);       
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery2(grup_code1, search_item, start_date, end_date) 
   {

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       var in_qty_gubn		= document.all.in_qty_gubn.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj2.SetParam("mode",           "search_DW2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",       end_date);
	   GridObj2.SetParam("item_type",     item_type);
	   GridObj2.SetParam("search_type", search_type);
	   GridObj2.SetParam("search_item", search_item);
	   GridObj2.SetParam("grup_code1", grup_code1);
	   GridObj2.SetParam("in_qty_gubn", in_qty_gubn);
	   GridObj2.DoQuery(servlet_url);       
   }
	
// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;	
}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){
	
	var search_item	    = GridObj.GetCellValue('PROD_CODE',nRow);
	var	grup_code1		= document.all.grup_code1.value;

	var start_date	    = document.all.start_date.value;
	var end_date	    = document.all.end_date.value;
	
	start_date 			= start_date.replace(/-/g,"");
	end_date 			= end_date.replace(/-/g,"");

	sum_gubn = '�Ұ����';

	if(strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'TOT') {

		doQuery2(grup_code1, search_item, start_date, end_date);
	}
	else {
		var sel_date_no = strToNum(strColumnKey.substring(1,3));
		var sel_date	= addDate("d", sel_date_no, start_date, "");
	
		doQuery2(grup_code1, search_item, sel_date, sel_date);

	}


}

function HeaderClick_DW1(strColumnKey){

	if(strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'TOT') return;
	
	var search_item	    = document.all.search_item.value;
	var	grup_code1		= document.all.grup_code1.value;

	var start_date	    = document.all.start_date.value;
	var end_date	    = document.all.end_date.value;
	start_date 			= start_date.replace(/-/g,"");
	end_date 			= end_date.replace(/-/g,"");

	var sel_date_no = strToNum(strColumnKey.substring(1,3));
	var sel_date	= addDate("d", sel_date_no, start_date, "");

	sum_gubn = '�Ұ�����';
	doQuery2(grup_code1, search_item, sel_date, sel_date);
	
}

function HeaderClick_DW2(strColumnKey){
	//2014-11-04 ���ı�� �߰�
	GridObj2.SetColCellSortEnable('CUST_NAME'	,true);
	GridObj2.SetColCellSortEnable('CUST_CODE'	,true);
	GridObj2.SetColCellSortEnable('CNFM_DATE'	,true);
	GridObj2.SetColCellSortEnable('ODER_BOX'	,true);
	GridObj2.SetColCellSortEnable('REQT_BOX'	,true);
	GridObj2.SetColCellSortEnable('SELL_BOX'	,true);
	GridObj2.SetColCellSortEnable('GAP'			,true);
	GridObj2.SetColCellSortEnable('DC_NAME'		,true);
	GridObj2.SetColCellSortEnable('SALES_NAME'	,true);
	
	GridObj2.ClearGroupMerge();
	
	if(strColumnKey == 'CUST_NAME') {
		
		if(flag_cust_name =='1'){
			
			GridObj2.SetColCellSort('CUST_NAME','descending');
		
			flag_cust_name++;
		}
		else if(flag_cust_name =='2'){
			
			GridObj2.SetColCellSort('CUST_NAME','asceding');
		
			flag_cust_name--;
		}
	}
	if(strColumnKey == 'CUST_CODE') {
		
		if(flag_cust_code =='1'){
		
			GridObj2.SetColCellSort('CUST_CODE','descending');
			flag_cust_code++;
		}
		else if(flag_cust_code =='2'){
			
			GridObj2.SetColCellSort('CUST_CODE','asceding');
			
			flag_cust_code--;	
			
		}
	}
	if(strColumnKey == 'CNFM_DATE') {
		
		if(flag_cnfm_date =='1'){
		
			GridObj2.SetColCellSort('CNFM_DATE','descending');
			flag_cnfm_date++;
		}
		else if(flag_cnfm_date =='2'){
			
			GridObj2.SetColCellSort('CNFM_DATE','asceding');
			
			flag_cnfm_date--;	
			
		}
	}
	if(strColumnKey == 'ODER_BOX') {
		
		if(flag_order_box =='1'){
		
			GridObj2.SetColCellSort('ODER_BOX','descending');
			flag_order_box++;
		}
		else if(flag_order_box =='2'){
			
			GridObj2.SetColCellSort('ODER_BOX','asceding');
			
			flag_order_box--;	
			
		}
	}
	if(strColumnKey == 'REQT_BOX') {
		
		if(flag_reqt_box =='1'){
		
			GridObj2.SetColCellSort('REQT_BOX','descending');
			flag_reqt_box++;
		}
		else if(flag_reqt_box =='2'){
			
			GridObj2.SetColCellSort('REQT_BOX','asceding');
			
			flag_reqt_box--;	
			
		}
	}
	if(strColumnKey == 'SELL_BOX') {
		
		if(flag_sell_box =='1'){
		
			GridObj2.SetColCellSort('SELL_BOX','descending');
			flag_sell_box++;
		}
		else if(flag_sell_box =='2'){
			
			GridObj2.SetColCellSort('SELL_BOX','asceding');
			
			flag_sell_box--;	
			
		}
	}
	if(strColumnKey == 'GAP') {
		
		if(flag_gap =='1'){
		
			GridObj2.SetColCellSort('GAP','descending');
			flag_gap++;
		}
		else if(flag_gap =='2'){
			
			GridObj2.SetColCellSort('GAP','asceding');
			
			flag_gap--;	
			
		}
	}
	if(strColumnKey == 'DC_NAME') {
		
		if(flag_dc_name =='1'){
		
			GridObj2.SetColCellSort('DC_NAME','descending');
			flag_dc_name++;
		}
		else if(flag_dc_name =='2'){
			
			GridObj2.SetColCellSort('DC_NAME','asceding');
			
			flag_dc_name--;	
			
		}
	}
	if(strColumnKey == 'SALES_NAME') {
		
		if(flag_sales_name =='1'){
		
			GridObj2.SetColCellSort('SALES_NAME','descending');
			flag_sales_name++;
		}
		else if(flag_sales_name =='2'){
			
			GridObj2.SetColCellSort('SALES_NAME','asceding');
			
			flag_sales_name--;	
			
		}
	}
	
		//GridObj2.SetGroupMerge('CUST_NAME,CUST_CODE');
		GridObj2.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'ODER_BOX,REQT_BOX,SELL_BOX,GAP'); 
		GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '252|252|192');
		
}
/* ----------------------------------------------------------------------------
 * Ư�� ��¥�� ���� ������ ����ŭ ����(+-)�� ��¥�� ��ȯ

 * 

 * �Է� �Ķ���� -----
 * pInterval : "yyyy" �� ���� ����, "m" �� �� ����, "d" �� �� ����
 * pAddVal  : ���� �ϰ��� �ϴ� �� (������)
 * pYyyymmdd : ������ ������ �Ǵ� ��¥
 * pDelimiter : pYyyymmdd ���� ���� �����ڸ� ���� (������ "" �Է�)

 * 

 * ��ȯ�� ----

 * yyyymmdd �Ǵ� �Լ� �Է½� ������ �����ڸ� ������ yyyy?mm?dd ��
 *

 * ��뿹 ---

 * 2008-01-01 �� 3 �� ���ϱ� ==> addDate("d", 3, "2008-08-01", "-");

 * 20080301 �� 8 ���� ���ϱ� ==> addDate("m", 8, "20080301", "");
 --------------------------------------------------------------------------- */
function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter)
{
	 var yyyy;
	 var mm;
	 var dd;
	 var cDate;
	 var oDate;
	 var cYear, cMonth, cDay;
	 
	 if (pDelimiter != "") {
	  pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	 }
	 
	
	 yyyy = pYyyymmdd.substr(0, 4);
	 mm  = pYyyymmdd.substr(4, 2);
	 dd  = pYyyymmdd.substr(6, 2);
	 
	 if (pInterval == "yyyy") {
	  yyyy = (yyyy * 1) + (pAddVal * 1); 
	 } else if (pInterval == "m") {
	  mm  = (mm * 1) + (pAddVal * 1);
	 } else if (pInterval == "d") {
	  dd  = (dd * 1) + (pAddVal * 1);
	 }
	 
	
	 cDate = new Date(yyyy, mm - 1, dd) // 12��, 31���� �ʰ��ϴ� �Է°��� ���� �ڵ����� ���� ��¥�� �������.
	 cYear = cDate.getFullYear();
	 cMonth = cDate.getMonth() + 1;
	 cDay = cDate.getDate();
	 
	 cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	 cDay = cDay < 10 ? "0" + cDay : cDay;
	
	 
	
	 if (pDelimiter != "") {
	  return cYear + pDelimiter + cMonth + pDelimiter + cDay;
	 } else {
	  return cYear + cMonth + cDay;
	 }
 
}

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
	document.WiseGrid2.height = tableHeightValue + "px"; 
 
}	