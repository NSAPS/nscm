//############################################################
//## ���α׷�ID      : rp_01190_EXP_Stock_Info_list.js
//## ���α׷���      : ��������� ���м�
//## ������          : ������
//## ��������        : 2016-08-09
//##
//## ���� job file   : job_sinc_40_replenishmentPlanning_03.xml
//## ���� query file : query_sinc_40_replenishmentPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2016-08-09  ������          create
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_01190_EXP_Stock_Info_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;

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
   
function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// �⺻ property ����
	setDefault2();  			// �߰� property ����
//	setHeader2();   			// Header ����
			
}
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 	
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj2.bHDMoving = true;                  	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
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

	GridObj.AddHeader("ITEM_ID"		,"��ǰ�ڵ�"   	,"t_text" 		,100	,70 ,false); //0
	GridObj.AddHeader("ITEM_NAME"	,"��ǰ��"    		,"t_text" 		,100    ,300 ,false);
 	GridObj.AddHeader("STOCK_7700"		,"�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_7700"		,"�԰�����"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_7700"	,"�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_7700"		,"�۾�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_7700"			,"���̷�"   		,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("STOCK_1842"		,"�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_1842"		,"�԰�����"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_1842"	,"�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_1842"		,"�۾�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_1842"			,"���̷�"   		,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("STOCK_8938"		,"�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_8938"		,"�԰�����"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_8938"	,"�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_8938"		,"�۾�������"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_8938"			,"���̷�"   		,"t_number" 	,100	,70 ,false); //0   


	GridObj.AddGroup("PUSAN", "�λ���ǰ��������");			 
	GridObj.AppendHeader("PUSAN", "STOCK_7700");
	GridObj.AppendHeader("PUSAN", "IPGO_7700");
	GridObj.AppendHeader("PUSAN", "EXPT_STOC_7700");
	GridObj.AppendHeader("PUSAN", "CHGO_7700");
	GridObj.AppendHeader("PUSAN", "GAP_7700");
	GridObj.AddGroup("DONGWOO", "����");			 
	GridObj.AppendHeader("DONGWOO", "STOCK_1842");
	GridObj.AppendHeader("DONGWOO", "IPGO_1842");
	GridObj.AppendHeader("DONGWOO", "EXPT_STOC_1842");
	GridObj.AppendHeader("DONGWOO", "CHGO_1842");
	GridObj.AppendHeader("DONGWOO", "GAP_1842");
	GridObj.AddGroup("DSJ", "DSJ");			 
	GridObj.AppendHeader("DSJ", "STOCK_8938");
	GridObj.AppendHeader("DSJ", "IPGO_8938");
	GridObj.AppendHeader("DSJ", "EXPT_STOC_8938");
	GridObj.AppendHeader("DSJ", "CHGO_8938");
	GridObj.AppendHeader("DSJ", "GAP_8938");

	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('STOCK_7700','right'); 
    GridObj.SetColCellAlign('IPGO_7700','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_7700','right'); 
    GridObj.SetColCellAlign('CHGO_7700','right'); 
    GridObj.SetColCellAlign('GAP_7700','right'); 
    GridObj.SetColCellAlign('STOCK_1842','right'); 
    GridObj.SetColCellAlign('IPGO_1842','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_1842','right'); 
    GridObj.SetColCellAlign('CHGO_1842','right'); 
    GridObj.SetColCellAlign('GAP_1842','right'); 
    GridObj.SetColCellAlign('STOCK_8938','right'); 
    GridObj.SetColCellAlign('IPGO_8938','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_8938','right'); 
    GridObj.SetColCellAlign('CHGO_8938','right'); 
    GridObj.SetColCellAlign('GAP_8938','right'); 
     
    GridObj.SetNumberFormat('STOCK_7700','#,##0');
    GridObj.SetNumberFormat('IPGO_7700','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_7700','#,##0');
    GridObj.SetNumberFormat('CHGO_7700','#,##0');
    GridObj.SetNumberFormat('GAP_7700','#,##0');
    GridObj.SetNumberFormat('STOCK_1842','#,##0');
    GridObj.SetNumberFormat('IPGO_1842','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_1842','#,##0');
    GridObj.SetNumberFormat('CHGO_1842','#,##0');
    GridObj.SetNumberFormat('GAP_1842','#,##0');
    GridObj.SetNumberFormat('STOCK_8938','#,##0');
    GridObj.SetNumberFormat('IPGO_8938','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_8938','#,##0');
    GridObj.SetNumberFormat('CHGO_8938','#,##0');
    GridObj.SetNumberFormat('GAP_8938','#,##0');

	GridObj.SetColHDBgColor('GAP_7700',					'253|228|229');
	GridObj.SetColHDBgColor('GAP_1842',					'253|228|229');
	GridObj.SetColHDBgColor('GAP_8938',					'253|228|229');

}

function setHeader2(item_id) 
{        
	
	GridObj2.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA"		,"���(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_BOX"	,"���(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_PAL"	,"���(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("BASE_STOCK"		,"����\n���"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("CHGO_QTY"		,"���"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_1"		,"����"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_3"		,"�ְ�"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("CONF_STOCK"		,"���\n����"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("TRANS_QTY"		,"���Ȯ��"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj2.AddHeader("NEXT_CHGO_QTY"	,"����\n���"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj2.AddHeader("NEXT_TRANS_QTY"	,"����\n��ȹ"       	,"t_number" 	,500.3	,50  ,false); //0   
	
	var trans_start   = document.frm.cnfm_date.value;
	var today 		= document.frm.cnfm_date.value;
	//var item_id 	  = document.frm.item_id.value;
	var itype		  = 'FERT' //document.frm.itype.value;
	var header_length = 0, j;
	
	commonUtil.getSelQeury( "trans_start!%!item_id!%!itype", today+"!%!"+item_id+"!%!"+itype, "rp_01160_replenishmentNiceLikePlan_DW2_HEADER",{
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

//			if(document.frm.itype.value == "HAWA") {
//				GridObj2.SetColHide("PROD01_1", true);
//				GridObj2.SetColHide("PROD01_3", true);
//			}
			
			GridObj2.SetColHide("USE_CAPA", true);
			GridObj2.SetColHide("USE_CAPA_BOX", true);
			GridObj2.SetColHide("USE_CAPA_PAL", true);
			// CAPA�߰��� �Ѱ��÷� ������.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery2(item_id);			
		}
	});   
}


   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
	   	GridObj2.ClearGrid( ); 
    	doQuery();
   }
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {

}
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cnfm_date   = document.all.cnfm_date.value;
       var sel_gubn   = document.all.sel_gubn.value;

       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("cnfm_date", cnfm_date);
       GridObj.SetParam("sel_gubn", sel_gubn);
       GridObj.DoQuery(servlet_url);
   }


function doQuery2(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + 'ip_02060_SalesAllocationNiceLikePlan';
	
	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj2.SetParam("mode", "search_DW3");
	
	//-- ������ ������ �Ķ���� ���� --//
	//���� �ڵ�

	//var item_id = document.frm.item_id.value;
	var today = document.frm.cnfm_date.value;
	var version =  document.frm.cnfm_date.value.replace("-","").replace("-","");
	var seq = "";
	var itype = 'FERT'; //document.frm.itype.value;
	//rp_01160 ������ ��������� ȭ�鿡�� �޾ƿ��� ���� �����ʹ� 'YYYYMMDD' �����̴�. 'YYYYMMDD.HH.MM' �� �޾ƿ´�.
	commonUtil.getSelQeury( "version", document.frm.cnfm_date.value, "rp_01160_replenishmentNiceLikePlan_DW2_Trans_Version",{
		callback:function(result){

		version = result;
		 			
		}});
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", today);
	GridObj2.SetParam("version",version);
	GridObj2.SetParam("seq", seq);
	GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("check_day", "TODAY"); // ���ϰ�ȹ
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url);
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
            	var rowLeng = GridObj.GetRowCount();
            	
            	for( var row=0 ; row<rowLeng ; row++ ){ //row����ŭ �ݺ�
	        		if(strToNum(GridObj.GetCellValue("GAP_7700", row)) < 0) {GridObj.SetCellFontBold("GAP_7700", row, 'true'); GridObj.SetCellFgColor("GAP_7700", row, '255|0|0');}
	        		if(strToNum(GridObj.GetCellValue("GAP_1842", row)) < 0) {GridObj.SetCellFontBold("GAP_1842", row, 'true'); GridObj.SetCellFgColor("GAP_1842", row, '255|0|0');}
	        		if(strToNum(GridObj.GetCellValue("GAP_8938", row)) < 0) {GridObj.SetCellFontBold("GAP_8938", row, 'true'); GridObj.SetCellFgColor("GAP_8938", row, '255|0|0');}
            	}
            	
            	GridObj.SetColCellBgColor('GAP_7700','232|232|255');
            	GridObj.SetColCellBgColor('GAP_1842','232|232|255');
            	GridObj.SetColCellBgColor('GAP_8938','232|232|255');

            	GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'STOCK_7700,IPGO_7700,EXPT_STOC_7700,CHGO_7700,GAP_7700,STOCK_1842,IPGO_1842,EXPT_STOC_1842,CHGO_1842,GAP_1842,STOCK_8938,IPGO_8938,EXPT_STOC_8938,CHGO_8938,GAP_8938'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
            	
            
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

function GridEndQuery2() {
		
	setGrid2(); //WiseGrid ����
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //��ȸ
		if(GridObj2.GetStatus() == "true") { // 
			
		}
	}

}


   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }


function CellDblClick_DW1 (strColumnKey, nRow){

	if(GridObj.GetRowCount() < 1) return;
	
	var item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	
	GridObj2.ClearGrid( ); 
    setHeader2(item_id);  

}

function GridCellClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
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
    
    
    

