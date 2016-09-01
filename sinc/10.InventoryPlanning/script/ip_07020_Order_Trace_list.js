//############################################################
//## ���α׷�ID      : ip_07020_Order_Trace_list.vm
//## ���α׷���      : SCM�ֹ�������ȸ
//## ������          : ������
//## ��������        : 2009-10-13
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-13  ������      create
//##
//############################################################
function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ǰ����ȸ

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup ����! 
				openItemPopup();
			}
		}
	});
}

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

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_07020_Order_Trace_list';
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
    GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'    
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	GridObj.AddHeader("CNFM_DATE"		,"����"       		,"t_text" 	,100    ,100  ,false);
	GridObj.AddHeader("DC_NAME"			,"�������"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DOMAIN"			,"����"       		,"t_text" 	,100	,40  ,false); //0   
 	GridObj.AddHeader("SLIP_GUBN"		,"��ǥ����"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DEPT_NAME"		,"��������"       	,"t_text" 	,500	,120 ,false); //0   
 	GridObj.AddHeader("HAN_NAME"		,"�Է���"       		,"t_text" 	,100	,60  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"�ŷ�ó��"       	,"t_text" 	,500	,100  ,false); //0   
 	GridObj.AddHeader("SLIP_NO"			,"��ǥ��ȣ"       	,"t_text" 	,200	,50  ,false); //0   
 	GridObj.AddHeader("SEQ_NO"			,"ǰ��"       		,"t_text" 	,200	,0  ,false); //0   
 	GridObj.AddHeader("REQT_BOX"		,"�Ƿڹڽ�"       	,"t_number" ,20.1	,60  ,false); //0   
 	GridObj.AddHeader("SELL_BOX"		,"�����ڽ�"       	,"t_number" ,20.1	,60  ,false); //0   
 	GridObj.AddHeader("IPUT_DTTM"		,"�Է½ð�"       	,"t_text" 	,200	,140 ,false); //0   
 	GridObj.AddHeader("CHGO_GUBN"		,"��ǥ����"       	,"t_text" 	,100	,60  ,false); //0   
 	GridObj.AddHeader("SHORTAGE_GUBN"	,"��ǰ����"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("CLOS_DTTM"		,"�����ð�"       	,"t_text" 	,200	,140  ,false); //0   

	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "����", "����", "����");

	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);
       
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

       var in_fr_date		= document.all.in_fr_date.value;
       var in_to_date   	= document.all.in_to_date.value;
       var in_item_id   	= document.all.in_item_id.value;
       var in_input_gubn	= document.all.in_input_gubn.value;
       var tgt_loc_sel		= document.all.tgt_loc_sel.value;
       
       var sales_list		= document.all.sales_list.value;	//2013-03-13 ������� �߰�//
       
       var in_slip_gubn		= document.all.in_slip_gubn.value;
       var in_clos_gubn		= document.all.in_clos_gubn.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date",		in_fr_date);
       GridObj.SetParam("in_to_date",		in_to_date);
       GridObj.SetParam("in_item_id",		in_item_id);
       GridObj.SetParam("in_input_gubn",	in_input_gubn);
       GridObj.SetParam("tgt_loc_sel",		tgt_loc_sel);
       
       GridObj.SetParam("sales_list",		sales_list);		//2013-03-13 ������� �߰�//
       
       
       GridObj.SetParam("in_slip_gubn",		in_slip_gubn);
       GridObj.SetParam("in_clos_gubn",		in_clos_gubn);
 
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

			    GridObj.SetColCellAlign('CNFM_DATE','center'); 
			    GridObj.SetColCellAlign('DC_NAME','left'); 
			    GridObj.SetColCellAlign('DOMAIN','center'); 
			    GridObj.SetColCellAlign('SLIP_GUBN','center'); 
			    GridObj.SetColCellAlign('DEPT_NAME','left'); 
			    GridObj.SetColCellAlign('HAN_NAME','center'); 
			    GridObj.SetColCellAlign('CUST_NAME','left'); 
			    GridObj.SetColCellAlign('SLIP_NO','center'); 
			    GridObj.SetColCellAlign('SEQ_NO','center'); 
			    GridObj.SetColCellAlign('REQT_BOX','right'); 
			    GridObj.SetColCellAlign('SELL_BOX','right'); 
			    GridObj.SetColCellAlign('IPUT_DTTM','center'); 
			    GridObj.SetColCellAlign('CHGO_GUBN','center'); 
			    GridObj.SetColCellAlign('SHORTAGE_GUBN','left'); 
			    GridObj.SetColCellAlign('CLOS_DTTM','center'); 

			    GridObj.SetNumberFormat('REQT_BOX','#,##0.#'); 
			    GridObj.SetNumberFormat('SELL_BOX','#,##0.#'); 

				// �հ�
				GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'REQT_BOX,SELL_BOX'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 

				for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell���� ����
					if(GridObj.GetCellValue('SLIP_GUBN',i) == "Ÿ����" ){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '0|255|0');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "�μ�Ÿ����"){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '170|219|110');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "������"){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '200|255|110');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "ȸ��"){ // YELLOW
						GridObj.SetCellBgColor('SLIP_GUBN', i, '255|255|0'); 
					}
					
					// �Ƿڹڽ����� �����ڽ��� ũ�� ����� ǥ���Ѵ�.
					if(strToNum(GridObj.GetCellValue('REQT_BOX',i)) > strToNum(GridObj.GetCellValue('SELL_BOX',i))) {
						GridObj.SetCellBgColor('REQT_BOX', i, '253|228|229');
						GridObj.SetCellBgColor('SELL_BOX', i, '253|228|229');
				    	
				    	GridObj.SetCellFontBold('REQT_BOX', i, 'true'); // font ����  
						GridObj.SetCellFontBold('SELL_BOX', i, 'true'); // font ����  

					}
					
					
				}
                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
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
    