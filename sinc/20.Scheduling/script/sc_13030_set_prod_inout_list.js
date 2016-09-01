//############################################################
//## ���α׷�ID      : sc_13030_set_prod_inout_list.vm
//## ���α׷���      : ���밡�� ������� ����
//## ������          : �ǿ���
//## ��������        : 2009-07-20
//##
//## ���� job file   : job_sinc_20_scheduling_04.xml
//## ���� query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-20  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/


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


//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_13030_set_prod_inout_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;

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
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;       
    
    /* SetGroupMerge */
	//GridObj.bHDMoving = false 
	//GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 
	GridObj.strRowBorderStyle = 'none' 
	GridObj.nRowSpacing = 0 
	GridObj.strHDClickAction = 'select' 
	
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'    
    
}


       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	var start_date 	= document.frm.start_date.value;
	var end_date 	= document.frm.end_date.value;


 	GridObj.AddHeader("SALES_CAT02"		,"����׷�2"   	,"t_text" 		,200	,70  ,false); //0   
 	GridObj.AddHeader("SALES_CAT03"		,"����׷�3"   	,"t_text" 		,200	,70  ,false); //0   

 	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"   	,"t_text" 		,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"   		,"t_text" 		,200	,180 ,false); //0   
 	GridObj.AddHeader("SPEC"			,"�԰�"   		,"t_text" 		,20		,90  ,false); //0   
 	GridObj.AddHeader("BASE_STOCK"		,"�������"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("PROD_PLAN"		,"�۾���ȹ"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("SALES_PRE"		,"�����Ǹ�"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("CHGO"			,"�������"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("STOCK_EXPT"		,"�������"   	,"t_number" 	,20.3	,60  ,false); //0
 	GridObj.AddHeader("PROD_TERM"		,"����\n�����"   ,"t_number" 	,20.3	,60  ,false); //0
 	//    
 	GridObj.AddHeader("OPER_QTY"		,"�����\n��û��"	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("COMPL_QTY"		,"�۾�\n������"   ,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("REMAIN_QTY"		,"�۾��ܷ�"   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("COMPL_RATE"		,"������(%)"   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PRE_YEAR_SELL"	,start_date+" ~ "+end_date   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PRE_MONTH_SELL"	,"�����Ǹ�"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("SALES_PRE_CUM"	,"����Ǹ�"   	,"t_number" 	,20.3	,60  ,false); //0   

	
	GridObj.BoundHeader();	

	
	GridObj.SetColFix('SPEC');
	

	GridObj.SetNumberFormat("BASE_STOCK", "###,###,##0");
	GridObj.SetNumberFormat("PROD_PLAN", "###,###,##0");
	GridObj.SetNumberFormat("SALES_PRE", "###,###,##0");
	GridObj.SetNumberFormat("CHGO", "###,###,##0");
	GridObj.SetNumberFormat("STOCK_EXPT", "###,###,##0");
	GridObj.SetNumberFormat("OPER_QTY", "###,###,##0");
	GridObj.SetNumberFormat("COMPL_QTY", "###,###,##0");
	GridObj.SetNumberFormat("REMAIN_QTY", "###,###,##0");
	GridObj.SetNumberFormat("COMPL_RATE", "###,###,##0");
	GridObj.SetNumberFormat("PRE_YEAR_SELL", "###,###,##0");
	GridObj.SetNumberFormat("PRE_MONTH_SELL", "###,###,##0");
	GridObj.SetNumberFormat("SALES_PRE_CUM", "###,###,##0");
	
	GridObj.SetColCellAlign('ITEM_ID','center');
	
	
	

	//Hidden �÷�  
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(){
	GridObj = document.WiseGrid;
	GridObj.ClearGrid();
	setHeader(GridObj);
	  
	doQuery();
}
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");

}



      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       
       var scm_charge	= document.all.scm_charge.value;
       var start_date	= document.all.start_date.value;
       var end_date		= document.all.end_date.value;
       var cm_gubn		= document.all.cm_gubn.value;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("scm_charge", scm_charge);
       GridObj.SetParam("start_date", start_date);
       GridObj.SetParam("end_date", end_date);
       GridObj.SetParam("cm_gubn", cm_gubn);
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {                           
	        	//GridObj.ClearGroupMerge();
	        	
				// Merge �� SummaryBar �߰� 
				GridObj.SetGroupMerge("SALES_CAT02,SALES_CAT03");
				GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'SALES_CAT02', 'sum', 'BASE_STOCK,PROD_PLAN,SALES_PRE,CHGO,STOCK_EXPT,OPER_QTY,COMPL_QTY,REMAIN_QTY,COMPL_RATE,PRE_YEAR_SELL,PRE_MONTH_SELL,SALES_PRE_CUM'); 
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 

                GridObj.AddSummaryBar('SUMMARY2', '��ü�հ�', 'summaryall', 'sum', 'BASE_STOCK,PROD_PLAN,SALES_PRE,CHGO,STOCK_EXPT,OPER_QTY,COMPL_QTY,REMAIN_QTY,COMPL_RATE,PRE_YEAR_SELL,PRE_MONTH_SELL,SALES_PRE_CUM');
         	    GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
	        	
				//GridObj.SetColFix('ITEM_NAME');
                                             
            } else { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
    }


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

//alert("strColumnKey+"+strColumnKey);
	var oper_type	= GridObj.GetCellValue("OPER_TYPE", nRow);

	if(strColumnKey == "START_DATE" || strColumnKey == "END_DATE" ){
		// OPER_TYPE ��� �ϰ��� ��¥�� �����Ҽ� ����.
		if( oper_type == "001" ) { //���
		}else{
			alert("��� � ǰ���� ����ڸ� �����Ҽ������ϴ�!!!");
			GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
			return;
		}		
	}else{
		
	}


}



/*������������������������������������������������������������������������
  ���׸����� ����Ŭ��  �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {

	if(strColumnKey =='ITEM_ID'||strColumnKey =='ITEM_NAME'){
		
		 //GoMod(nRow);
		
	}

}	


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {


}	
    