//############################################################
//## ���α׷�ID      : sc_03010_Nfos_Order_Prod_Reqt.vm
//## ���α׷���      : ������� �����û�� ����
//## ������          : ������
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

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_03010_Nfos_Order_Prod_Reqt';
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
    GridObj.strHDClickAction    = "sortsingle";
    
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,50  ,false);
	GridObj.AddHeader("ORD_NO"			,"������ȣ"       	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("ORD_ITEM_NO"		,"ǰ��"       		,"t_text" 	,20		,50  ,false); //0   
 	GridObj.AddHeader("SOLD_PART"		,"�ŷ�ó�ڵ�"       	,"t_text" 	,80		,50  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"�ŷ�ó��"       	,"t_text" 	,200	,140 ,false); //0   
 	GridObj.AddHeader("CAT06"			,"����ǰ��"       	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"       	,"t_text" 	,20		,60  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"       		,"t_text" 	,200	,250  ,false); //0   
 	GridObj.AddHeader("SPEC"			,"SPEC"       		,"t_text" 	,200	,80  ,false); //0   
 	GridObj.AddHeader("MTO_MTS"			,"����"     			,"t_text" 	,40		,40  ,false); //0   
 	GridObj.AddHeader("IPGO"			,"����"       		,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("PROD_REQ_DATE"	,"�����û��"    		,"t_date" 	,20		,80  ,true); //0   

	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD", "����", "����", "����");

	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
       doQuery();
   }
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	// user_id
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

       var in_fr_date = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var in_mto_mts   = document.all.mto_mts.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", in_fr_date);
       GridObj.SetParam("in_to_date", in_to_date);
       GridObj.SetParam("in_mto_mts", in_mto_mts);
       GridObj.DoQuery(servlet_url);
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

			    GridObj.SetColCellAlign('ORD_NO','center'); 
			    GridObj.SetColCellAlign('ORD_ITEM_NO','center'); 
			    GridObj.SetColCellAlign('SOLD_PART','center'); 
			    GridObj.SetColCellAlign('ITEM_ID','center'); 
			    GridObj.SetColCellAlign('MTO_MTS','center'); 
			    GridObj.SetColCellAlign('PROD_REQ_DATE','center'); 

			    GridObj.SetNumberFormat('IPGO','#,##0'); 

	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
		        {
		           GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
		            
		        }
                                             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
}
        }
        else if(endMode == "save") {
			if(GridObj.GetStatus() == "true") {// 
				GridObj.focus();		
			} else {
				var error_msg = GridObj.GetMessage();// 
				alert(error_msg);			
			}
        }
		
    }

// ������ row�� �����û�� �ϰ�����
function applyProdReq(){
	
	var sel_data = GridObj.GetSelectedCells(); // ������ �κ��� key�� row�� �����´�
	var i=0;
	var rowNo;
	
	var in_appl_date = delDateDelimiter(document.all.in_appl_date.value);

	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // ���̻� ������ ����
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//�ش� row�� check�� �Ѵ�
			GridObj.SetCellValue("PROD_REQ_DATE", rowNo, in_appl_date);
		}
		i++;
	}
}


   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
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
    