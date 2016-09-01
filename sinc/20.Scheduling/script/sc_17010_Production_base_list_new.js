//############################################################
//## ���α׷�ID      : sc_17010_Production_base_list_new.vm
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
var job_id = 'sc_17010_Production_base_list_new';
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
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	//GridObj.strActiveRowBgColor = "170|170|170";    //���õ� ���� �������� �����Ѵ�.
    
    // ��ũ�� �ӵ� : page ���� scroll ->�⺻�� 'default'
    GridObj.strMouseWheelAction='page';   
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;       
    
    
    
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

	var cnfm_date = document.all.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "sc_17010_W1_DAY",{
		callback:function(result){
		var sc_17010_W1_DAY = result[0][0];
		
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,50  ,false);
	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"       	,"t_text" 	,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ǰ�񳻿�"       	,"t_text" 	,400	,170 ,false); //0   
 	GridObj.AddHeader("W0_BASE_STOCK"	,"�������"       	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W0_PROD_QTY"		,"����\n�����ȹ"     	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W0_DEMEND"		,"���俹��"       	,"t_number" ,20.3	,71  ,false); //0   
//	GridObj.AddHeader("W0_SALES_PLAN"	,"�ǸŰ�ȹ"       	,"t_number" ,20.3	,71 ,false); //0   
 	GridObj.AddHeader("W0_SUPPLY_PLAN"	,"���ް�ȹ"       	,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+1-------------------------   
			
 	
 	GridObj.AddHeader("W1_EXPT_STOCK"	,"W+1��\n�������"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W1_PLAN_PER_ACT"	,"�������\n��ȹ����"	,"t_number" ,20.3	,66  ,false); //0   

 	GridObj.AddHeader("WEEK_GUBN_NAME"	,"����\n����"       	,"t_text" ,20	,50 ,false); //0
 	GridObj.AddHeader("FRC_QTY"	,"�����\n����"       	,"t_number" ,20.3	,71 ,false); //0
 	//  	
 	GridObj.AddHeader("W1_PROD_QTY"		,"�����ȹ"       	,"t_number" ,20.3	,71  ,true); //0  
 	GridObj.AddHeader("W1_DEMEND"		,"���俹��"    		,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("W1_SALES_PLAN"	,"�ǸŰ�ȹ"    		,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("W1_SUPPLY_PLAN"	,"���ް�ȹ"    		,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+2-------------------------   
 	GridObj.AddHeader("W2_EXPT_STOCK"	,"W+2��\n�������"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W2_BASE_STOCK"	,"W+2��\n�������"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("BASE_DAY"		,"�����ϼ�"    		,"t_number" ,20.3	,71  ,true); //0
 	GridObj.AddHeader("SALES_MEAN_3WEEK","3������Ǹ�"    	,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK","1������Ǹ�"    	,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+3-------------------------   
 	GridObj.AddHeader("W3_DEMEND"		,"���俹��"    		,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_SALES_PLAN"	,"W+3��\n�ǸŰ�ȹ"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_SUPPLY_PLAN"	,"���ް�ȹ"    		,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_PLAN_PER_ACT"	,"�������\n��ȹ����"	,"t_number" ,20.3	,66  ,false); //0   
 	GridObj.AddHeader("W3_PROD_QTY"		,"�����ȹ"    		,"t_number" ,20.3	,71  ,true); //0   
 	GridObj.AddHeader("W4_EXPT_STOCK"	,"W+3��\n�������"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W4_BASE_STOCK"	,"W+3��\n�������"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("DATA_FLAG"		,"DATA_FLAG"   		,"t_text"	,20		,0  ,false); //0

	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	
	GridObj.SetColFix('ITEM_NAME');
	
	GridObj.SetNumberFormat("W0_BASE_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W0_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W0_DEMEND"  	,"#,##0.#");
//	GridObj.SetNumberFormat("W0_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W0_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W1_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W1_PLAN_PER_ACT"  , "#,##0.##");
	
	GridObj.SetNumberFormat("FRC_QTY"  	,"#,##0");
	
	GridObj.SetNumberFormat("W1_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W1_DEMEND"  	,"#,##0.#");
	GridObj.SetNumberFormat("W1_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W1_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W2_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W2_BASE_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("BASE_DAY"  	,"#,##0.#");
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK"  ,"#,##0.#");
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK"  ,"#,##0.#");
	GridObj.SetNumberFormat("W3_DEMEND"  	,"#,##0.#");
	GridObj.SetNumberFormat("W3_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W3_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W3_PLAN_PER_ACT"  ,"#,##0.##");
	GridObj.SetNumberFormat("W3_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W4_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W4_BASE_STOCK" ,"#,##0.#");

  
	GridObj.SetColCellAlign('ITEM_ID','center');
	GridObj.SetColCellAlign('WEEK_GUBN_NAME','center');
	//Hidden �÷�  
	GridObj.SetColHide("CRUD",true);		
		
		
		
		
		
		
		}
	});   



       
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
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("user_id", document.frm._user_id.value);
	var cnfm_date = document.frm.cnfm_date.value;
	GridObj.SetParam("cnfm_date", cnfm_date);
	
	var data_flag = GridObj.GetCellValue("DATA_FLAG", 1);
	
	//if(data_flag == 'Y'){
		//alert("������Ʈ �Ҷ�")
		//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
		//GridObj.SetParam("mode", "save");
		//GridObj.DoQuery(servlet_url, "CRUD");		
	//}else{
		//alert("�ʱ� ����")
		
			var in_paramKey = "cnfm_date";
			var in_paramCode = cnfm_date;
			commonUtil.getCodeInfo(in_paramKey,in_paramCode,"sc_17010_GET_PLANT_ALLOC_VERSION", { 
				callback:function(arrList){
					if( arrList.length == 1 ) {
					//if( arrList[0][0] == '') {
					plant_alloc_version = arrList[0][0];
						if(plant_alloc_version == null || plant_alloc_version == '' ){
							"��ȹ �������� �ƴմϴ�. ��ȹ�����Ϸ�  �����ϰ� �ٽ� �۾����ֽñ� �ٶ��ϴ�."
							return;
						}else{
							//alert(plant_alloc_version)
							//return;
							GridObj.SetParam("plant_alloc_version", 		plant_alloc_version);
							GridObj.SetParam("mode", "save");  //cre_data
							//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
							GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
						}		
					}else {
						
					}
				}
			});			
	//}
	

}


      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cnfm_date = document.all.cnfm_date.value;
       //var in_to_date   = document.all.in_to_date.value;
       //var in_mto_mts   = document.all.mto_mts.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("cnfm_date", cnfm_date);
       //GridObj.SetParam("in_to_date", in_to_date);
       //GridObj.SetParam("in_mto_mts", in_mto_mts);
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

			     //
			    //GridObj.SetColCellAlign('PROD_REQ_DATE','center'); 

			    //GridObj.SetNumberFormat('IPGO','#,##0');
			    // 

	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
		        {
		          // GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
			    GridObj.SetCellBgColor('W1_PROD_QTY', i, '255|255|0'); 
			    GridObj.SetCellBgColor('BASE_DAY', i, '255|255|0'); 
			    GridObj.SetCellBgColor('W3_PROD_QTY', i, '255|255|0'); 
		            
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
			
			doQuery()   // ���� �Ϸ��� ���ƿö��� ȭ���� ����ȸ �Ѵ�. 
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
	
    //alert("strColumnKey="+strColumnKey);
	// ũ�� ������� ����� �� �����ʿ䷮ ������ ������ Ʋ������..
	if(strColumnKey == 'BASE_DAY'){
		cal_base_stock(nRow)
	}else if(strColumnKey == 'W1_PROD_QTY'){
		cal_change_prod_qty1(nRow);
	}else if(strColumnKey == 'W3_PROD_QTY'){
		cal_change_prod_qty2(nRow);
	}
}

function cal_base_stock(nRow){
	var base_day		 = Number(GridObj.GetCellValue("BASE_DAY", nRow));
	var sales_mean_1week = Number(GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow));
	var sales_mean_3week = Number(GridObj.GetCellValue("SALES_MEAN_3WEEK", nRow));
	
	var sales_mean_13week = (sales_mean_1week+sales_mean_3week)/2;
	
	sales_mean_13week = Math.round(sales_mean_13week * 1)/1;
	
	var base_stock = sales_mean_13week *base_day;
	
	GridObj.SetCellValue("W2_BASE_STOCK", nRow, base_stock);
	GridObj.SetCellValue("W4_BASE_STOCK", nRow, base_stock);
	
	
	cal_change_base_day(nRow)
}

function cal_change_base_day(nRow){
	//1 ������� ���� -> 2 �����ȹ ����-> 3���������
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //������ ������� W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //���ް�ȹ
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //���ֿ������ W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // ������ ������� W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // ������ ������� W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // ������ ������� W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //���ް�ȹ
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // ������ ������� W+2

	// 1. W+1 ������� ����� - > W+1 ���� �ʿ䷮ ���� 
	// ���� ���� �ʿ� ���� = ���ް�ȹ + ������ ������� - ���ֿ������ 
	w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. �����ȹ ������ ������ ������� ����..
	//--�������ʿ������ + �����ȹ - ���ް�ȹ
	w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. ������ ���� �ʿ䷮ ����.
	//W3_PROD_QTY = ���ް�ȹ + ������ ������� - ���ֿ������(W2_EXPT_STOCK)
	w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. �������� ������� ����.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	
	
}

function cal_change_prod_qty1(nRow){
	//1 ������� ���� -> 2 �����ȹ ����-> 3���������
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //������ ������� W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //���ް�ȹ
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //���ֿ������ W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // ������ ������� W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // ������ ������� W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // ������ ������� W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //���ް�ȹ
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // ������ ������� W+2

	// 1. W+1 ������� ����� - > W+1 ���� �ʿ䷮ ���� 
	// ���� ���� �ʿ� ���� = ���ް�ȹ + ������ ������� - ���ֿ������ 
	//w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	//GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. �����ȹ ������ ������ ������� ����..
	//--�������ʿ������ + �����ȹ - ���ް�ȹ
	w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. ������ ���� �ʿ䷮ ����.
	//W3_PROD_QTY = ���ް�ȹ + ������ ������� - ���ֿ������(W2_EXPT_STOCK)
	w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. �������� ������� ����.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	

	
}

function cal_change_prod_qty2(nRow){
	//1 ������� ���� -> 2 �����ȹ ����-> 3���������
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //������ ������� W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //���ް�ȹ
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //���ֿ������ W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // ������ ������� W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // ������ ������� W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // ������ ������� W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //���ް�ȹ
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // ������ ������� W+2

	// 1. W+1 ������� ����� - > W+1 ���� �ʿ䷮ ���� 
	// ���� ���� �ʿ� ���� = ���ް�ȹ + ������ ������� - ���ֿ������ 
	//w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	//GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. �����ȹ ������ ������ ������� ����..
	//--�������ʿ������ + �����ȹ - ���ް�ȹ
	//w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	//GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. ������ ���� �ʿ䷮ ����.
	//W3_PROD_QTY = ���ް�ȹ + ������ ������� - ���ֿ������(W2_EXPT_STOCK)
	//w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	//GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. �������� ������� ����.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	

	
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
    