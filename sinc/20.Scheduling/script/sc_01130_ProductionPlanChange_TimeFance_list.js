//############################################################
//## ���α׷�ID      : sc_01130_ProductionPlanChange_TimeFance_list.js
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
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'sc_01130_ProductionPlanChange_TimeFance_list';
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
	setProperty(GridObj2);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader2(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ���� 
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
	
    GridObj.nHDLineSize   = 18; //15
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 
}

function setDefault2() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'    
	
    GridObj.nHDLineSize   = 18; //15
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {
	
	GridObj.AddHeader("PLANT_ID"	,"����"       			,"t_text" 	,100    ,0  ,false);
	GridObj.AddHeader("PLANT_NAME"	,"����"       			,"t_text" 	,100    ,70  ,false);
	GridObj.AddHeader("WW"			,"��"       				,"t_text" 	,100	,70  ,false); //0   
 	GridObj.AddHeader("OD_CNT"		,"�� �����Ǽ�"     	  	,"t_number" ,100.3	,80  ,false); //0   
 	GridObj.AddHeader("CH_CNT"		,"����Ǽ�"       		,"t_number" ,100.3	,80  ,false); //0   
 	GridObj.AddHeader("CH_RATE"		,"������(%)"       		,"t_text" 		,500	,80 ,false); //0   
 	GridObj.AddHeader("TP_CNT"		,"3�� TF�̳� ����Ǽ�"		,"t_number" 	,100.3	,150  ,false); //0   
 	GridObj.AddHeader("CH_RATE_TP"	,"������(����Ǽ�����)"		,"t_text" 	,500	,150  ,false); //0   
 	GridObj.AddHeader("CH_RATE_OD"	,"������(�� ���� ����)" 	,"t_text" 	,200	,150  ,false); //0   

 	GridObj.AddHeader("START_DATE"	,"��������" 	,"t_text" ,200	,0  ,false); //0   
 	GridObj.AddHeader("END_DATE"	,"��������" 	,"t_text" ,200	,0  ,false); //0   



	GridObj.AddGroup("HD1"	,"����Ǽ�");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1", "CH_CNT");
	GridObj.AppendHeader("HD1", "CH_RATE");
	GridObj.AddGroup("HD2"	,"3�� TF �Ǽ�");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD2", "TP_CNT");
	GridObj.AppendHeader("HD2", "CH_RATE_TP");
	GridObj.AppendHeader("HD2", "CH_RATE_OD");


	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_NAME','center'); 
    GridObj.SetColCellAlign('WW','center'); 

    GridObj.SetColCellAlign('CH_RATE','right'); 
    GridObj.SetColCellAlign('CH_RATE_TP','right'); 
    GridObj.SetColCellAlign('CH_RATE_OD','right'); 



    GridObj.SetNumberFormat('OD_CNT','#,##0.#'); 
    GridObj.SetNumberFormat('CH_CNT','#,##0.#'); 
    GridObj.SetNumberFormat('TP_CNT','#,##0.#'); 
       
}

/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader2(GridObj2) {
	
	GridObj2.AddHeader("PLANT_ID"	,"�����"    	,"t_text" 	,100    ,0  ,false);
	GridObj2.AddHeader("PLANT_NAME"	,"�����"    	,"t_text" 	,100    ,80  ,false);
	GridObj2.AddHeader("WW"			,"����"      ,"t_text" 	,100    ,85  ,false);
	GridObj2.AddHeader("PROD_DATE"	,"��������"   ,"t_text" 	,100	,85  ,false); //0   
 	GridObj2.AddHeader("CH_DATE"	,"��������"   ,"t_text" 	,100	,85  ,false); //0   
 	GridObj2.AddHeader("TERM"		,"����"      ,"t_text" 	,100	,60  ,false); //0   
 	GridObj2.AddHeader("ITEM_ID"	,"ǰ���ȣ"   ,"t_text" 	,500	,80 ,false); //0   
 	GridObj2.AddHeader("ITEM_NAME"	,"ǰ���"		,"t_text" 	,100	,170  ,false); //0   
 	GridObj2.AddHeader("BF_QTY"		,"������"		,"t_number" ,500.3	,70  ,false); //0   
 	GridObj2.AddHeader("AF_QTY"		,"������" 	,"t_number" ,200.3	,70  ,false); //0   
 	GridObj2.AddHeader("GUBN"		,"����" 		,"t_text" 	,200	,70  ,false); //0   


	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('PLANT_NAME','center'); 
    GridObj2.SetColCellAlign('WW','center'); 
    GridObj2.SetColCellAlign('PROD_DATE','center'); 
    GridObj2.SetColCellAlign('CH_DATE','center'); 
    
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    GridObj2.SetColCellAlign('TERM','center'); 
    GridObj2.SetColCellAlign('GUBN','center'); 

    GridObj2.SetNumberFormat('BF_QTY','#,##0.#'); 
    GridObj2.SetNumberFormat('AF_QTY','#,##0.#'); 
       
}

   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
       doQuery();
   }
     
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var start_date	= document.all.start_date.value;
       var end_date		= document.all.end_date.value;
       var search_gubn	= document.all.search_gubn.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("start_date", start_date);
       GridObj.SetParam("end_date", end_date);
       GridObj.SetParam("search_gubn", search_gubn);
       
 
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
				// �հ�
				GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'OD_CNT,CH_CNT,TP_CNT,CH_RATE,CH_RATE_TP,CH_RATE_OD'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160');
				
				var tot_od_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','OD_CNT',0,false));
				var tot_ch_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','CH_CNT',0,false));
				var tot_tp_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','TP_CNT',0,false));
				
				
				// �����ȹ ������ CH_RATE
				if(tot_od_cnt != 0) {
					GridObj.SetSummaryBarValue('SUMMARY1','CH_RATE',0,Math.round(tot_ch_cnt/tot_od_cnt*100*10)/10);
				}
				// CH_RATE_TP
				if(tot_ch_cnt != 0) {
					GridObj.SetSummaryBarValue('SUMMARY1','CH_RATE_TP',0,Math.round(tot_tp_cnt/tot_ch_cnt*100*10)/10);
				}
				// CH_RATE_OD
				if(tot_od_cnt != 0) {
					GridObj.SetSummaryBarValue('SUMMARY1','CH_RATE_OD',0,Math.round(tot_tp_cnt/tot_od_cnt*100*10)/10);
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

    function GridEndQuery2() 
    {
        var endMode = GridObj2.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search2") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj2.GetStatus() == "true") 
            {
				for(var i=0;i<GridObj2.GetRowCount();i++) {
					// �Ƿڹڽ����� �����ڽ��� ũ�� ����� ǥ���Ѵ�.
					if(strToNum(GridObj2.GetCellValue('TERM',i)) < strToNum(3)) {
						GridObj2.SetCellBgColor('TERM', i, '253|228|229');
				    	GridObj2.SetCellFontBold('TERM', i, 'true'); // font ����  
					}					
				}
                     
            } else    
            { 
                error_msg = GridObj2.GetMessage(); 
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
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){     

    //var sel_plant_id = GridObj.GetCellValue("PLANT_ID", nRow);
	doQuery2(nRow);	
	
}  

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2(nRow) { //�ֹ�����

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_plant_id 	= GridObj.GetCellValue("PLANT_ID", nRow);
	
	var sel_start_date 	= GridObj.GetCellValue("START_DATE", nRow);
	var sel_end_date 	= GridObj.GetCellValue("END_DATE", nRow);

    var start_date		= sel_start_date;
    var end_date		= sel_end_date;
    var search_gubn		= document.all.search_gubn.value;


	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("sel_plant_id", sel_plant_id);
	GridObj2.SetParam("start_date", start_date);
	GridObj2.SetParam("end_date", end_date);
	GridObj2.SetParam("search_gubn", search_gubn);
	

	GridObj2.DoQuery(servlet_url);
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
    