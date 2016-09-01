//############################################################
//## ���α׷�ID      : ip_02050_Inventory_production_analysis_list.js
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
var job_id = 'ip_02050_Inventory_production_analysis_list';
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
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	   GridObj.ClearGrid();

	var header_length = 0, j;

	var term_gubn;

	if(document.frm.term_gubn[0].checked  == true) term_gubn = "Day";
	else term_gubn = "Week";

	commonUtil.getSelQeury( "term_gubn", term_gubn, "ip_02050_Inventory_production_analysis_list_pop_up_header",{
		callback:function(result){

		  	GridObj.AddHeader("CAT06"		,"��������"      	,"t_text" 	,100.3		,0  	,false); //0   
		  	GridObj.AddHeader("ITEM_ID"		,"ǰ���ڵ�"      	,"t_text" 	,100.3		,65  	,false); //0   
		  	GridObj.AddHeader("ITEM_NAME"	,"ǰ���"      	,"t_text" 	,100.3		,170  	,false); //0   
		  	GridObj.AddHeader("TYPE"		,"TYPE"      	,"t_text" 	,100.3		,0  	,false); //0   
		  	   

			for(var i=0 ; i < 21 ; i++){  //11
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_text" 	,100	,63  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 21) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_text" 	,100	,63  ,false);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_text" 	,100	,63  ,false);
					}
				}
			}
			
			GridObj.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
		//setDefault();        	//ȭ�� �⺻ ���� 
	 
		//GoSearch(); //pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%
	// 
    		GridObj.SetColCellAlign('CAT06','center'); 
    		GridObj.SetColCellAlign('ITEM_ID','center'); 

    		GridObj.SetColCellAlign('DAY_00','right'); 
    		GridObj.SetColCellAlign('DAY_01','right'); 
    		GridObj.SetColCellAlign('DAY_02','right'); 
    		GridObj.SetColCellAlign('DAY_03','right'); 
    		GridObj.SetColCellAlign('DAY_04','right'); 
    		GridObj.SetColCellAlign('DAY_05','right'); 
    		GridObj.SetColCellAlign('DAY_06','right'); 
    		GridObj.SetColCellAlign('DAY_07','right'); 
    		GridObj.SetColCellAlign('DAY_08','right'); 
    		GridObj.SetColCellAlign('DAY_09','right'); 
    		GridObj.SetColCellAlign('DAY_10','right'); 
    		GridObj.SetColCellAlign('DAY_11','right'); 
    		GridObj.SetColCellAlign('DAY_12','right'); 
    		GridObj.SetColCellAlign('DAY_13','right'); 
    		GridObj.SetColCellAlign('DAY_14','right'); 
    		GridObj.SetColCellAlign('DAY_15','right'); 
    		GridObj.SetColCellAlign('DAY_16','right'); 
    		GridObj.SetColCellAlign('DAY_17','right'); 
    		GridObj.SetColCellAlign('DAY_18','right'); 
    		GridObj.SetColCellAlign('DAY_19','right'); 
    		GridObj.SetColCellAlign('DAY_20','right');

			/* 
			GridObj.SetNumberFormat("DAY_00"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_01"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_02"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_03"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_04"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_05"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_06"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_07"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_08"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_09"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_10"  , "#,##0.#"); 
			GridObj.SetNumberFormat("DAY_11"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_12"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_13"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_14"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_15"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_16"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_17"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_18"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_19"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_20"  , "#,##0.#"); 
			*/
			GridObj.SetColFix('ITEM_NAME'); 
		}
		
	});   
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	
   	
   		//return;
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

       var search_type	= document.all.search_type.value;

		var term_gubn;
		
		if(document.frm.term_gubn[0].checked  == true) term_gubn = "Day";
		else term_gubn = "Week";

       var week_flag	= document.all.week_flag.value;
       var plant_id		= document.all.plant_id.value;
       var line_id		= document.all.line_id.value;
       var user_id		= document.all._user_id.value;
	
       var stock_day	= document.all.stock_day.value;
       var stock_day_chk   = document.all.stock_day_chk.value;
       var search_period   = document.all.search_period.value;
       var search_item	= document.all.search_item.value;
       var multi_flag	= document.all.multi_flag.value;
       var cat06   		= document.all.cat06.value;
       var prod_chk   	= document.all.prod_chk.value;
       var stock_day_flag   	= document.all.stock_day_flag.value;
       
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("user_id", user_id);
       GridObj.SetParam("mode", 	"search");
       GridObj.SetParam("search_type", search_type);
       GridObj.SetParam("term_gubn", term_gubn);
       GridObj.SetParam("week_flag", week_flag);
       GridObj.SetParam("plant_id", plant_id);
       GridObj.SetParam("line_id", line_id);
       GridObj.SetParam("stock_day", stock_day);
       GridObj.SetParam("stock_day_chk", stock_day_chk);
       GridObj.SetParam("search_period", search_period);
       GridObj.SetParam("search_item", search_item);
       GridObj.SetParam("multi_flag", multi_flag);
       GridObj.SetParam("cat06", cat06);
       GridObj.SetParam("prod_chk", prod_chk);
       GridObj.SetParam("stock_day_flag", stock_day_flag);

       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
       var stock_day	= document.all.stock_day.value;
       var stock_day_flag	= document.all.stock_day_flag.value;
       
       if(stock_day == ""){
       	stock_day = 3;
       }    
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {                           

//			    GridObj.SetColCellAlign('CNFM_DATE','center'); 

//			    GridObj.SetNumberFormat('SELL_BOX','#,##0.#'); 

				// �հ�
				//GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'REQT_BOX,SELL_BOX'); 
				//GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160');
				// stock_day_flag 
				if(stock_day_flag =="Y"){
					for(var i=0;i<GridObj.GetRowCount();i++) {
						// ������ ����ϼ����� ������ �÷����� ������ ǥ��.  �⺻ ����ϼ��� '3'  #.�Ͽ����� �ǽ����� ����.
						if(GridObj.GetColHDText('DAY_00').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_00',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_00', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_01').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_01',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_01', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_02').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_02',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_02', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_03').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_03',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_03', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_04').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_04',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_04', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_05').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_05',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_05', i, '253|228|229'); }}	 	
						if(GridObj.GetColHDText('DAY_06').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_06',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_06', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_07').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_07',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_07', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_08').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_08',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_08', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_09').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_09',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_09', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_10').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_10',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_10', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_11').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_11',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_11', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_12').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_12',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_12', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_13').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_13',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_13', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_14').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_14',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_14', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_15').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_15',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_15', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_16').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_16',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_16', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_17').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_17',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_17', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_18').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_18',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_18', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_19').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_19',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_19', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_20').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_20',i)) >= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_20', i, '253|228|229'); }}
					}
				}else{
					for(var i=0;i<GridObj.GetRowCount();i++) {
						// ������ ����ϼ����� ������ �÷����� ������ ǥ��.  �⺻ ����ϼ��� '3'  #.�Ͽ����� �ǽ����� ����.
						if(GridObj.GetColHDText('DAY_00').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_00',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_00', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_01').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_01',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_01', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_02').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_02',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_02', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_03').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_03',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_03', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_04').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_04',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_04', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_05').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_05',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_05', i, '253|228|229'); }}	 	
						if(GridObj.GetColHDText('DAY_06').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_06',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_06', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_07').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_07',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_07', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_08').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_08',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_08', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_09').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_09',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_09', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_10').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_10',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_10', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_11').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_11',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_11', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_12').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_12',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_12', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_13').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_13',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_13', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_14').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_14',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_14', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_15').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_15',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_15', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_16').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_16',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_16', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_17').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_17',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_17', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_18').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_18',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_18', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_19').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_19',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_19', i, '253|228|229'); }}
						if(GridObj.GetColHDText('DAY_20').substr(6,1) !='��'){ if(strToNum(GridObj.GetCellValue('DAY_20',i)) <= strToNum(stock_day)) { GridObj.SetCellBgColor('DAY_20', i, '253|228|229'); }}
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

function GridCellDblClick(strColumnKey, nRow){
	
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var week_flag	= document.frm.week_flag.value;
	
	var term_gubn;
	
	if(document.frm.term_gubn[0].checked  == true) term_gubn = "Day";
	else  term_gubn = "Week";

		
	if(term_gubn == "Day"){
		
		var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
		//	var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		
	}else {
		
		var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
	//	var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
		
	}
		
	
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
    


//  �÷��׿����� ���ð� �Ҵ�
function doCheckFlag(obj){
	
	// ����ϼ� stock_day �̻���ǰ�� ��ȸ
	if(obj.name == "stock_day_chk" ){ // sale_plan_flag - �ǸŰ�ȹ 0 �̾ ��ȸ
		if(obj.checked){
				document.frm.stock_day_flag.value = "Y";
				document.frm.prod_flag.value = "Y";
				document.frm.prod_chk.checked=true;
		}
		else{
				document.frm.stock_day_flag.value = "N";
				document.frm.prod_flag.value = "N";
				document.frm.prod_chk.checked=false;
		}
	} else{ // üũ�� ������Ʈ�� prod_flag �̸�..
		if(obj.checked){
				document.frm.prod_flag.value = "Y";
		}
		else{
				document.frm.prod_flag.value = "N";
		}
	}
}

function chang_term_gubn() {
	
}

