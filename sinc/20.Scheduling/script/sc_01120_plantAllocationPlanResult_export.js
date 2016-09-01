//############################################################
//## ���α׷�ID      : sc_01120_plantAllocationPlanResult_export.vm
//## ���α׷���      : ���� �����ǸŰ�ȹ ���
//## ������          : ������
//## ��������        : 2009-10-15
//##
//## ���� job file   : job_sinc_20_scheduling_04.xml
//## ���� query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-15  ������      create
//##
//############################################################

var job_id  = 'sc_01120_plantAllocationPlanResult_export'; //�޴� �ְ� Ŭ���� JOB_ID
var class_path = "com.wisegrid.admin.";
//�׸��� ��ü �������� ����! �������� GridObj ��ü�� ��� ��.
var GridObj;

	    
/*������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻���. 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������������������������������������������������������������������*/
function init() {
	
	GridObj	 = document.WiseGrid;

	setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  //�ش�����
	setDefault();        
}


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() {

	//����÷��� ����..������ �� ��Ʈ������ ����.
	GridObj.nHDLines = 2; //��� �κ� �� ����� 2�ٱ��� �����.
	GridObj.nHDLineSize = 16; //��� �÷��� ���� ������.
//	GridObj.nHDFontSize = 8; //��� �÷��� ��Ʈ ������.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strActiveRowBgColor = "255|255|0";    //���õ� ���� �������� �����Ѵ�.
 	GridObj.strSelectedCellFgColor = '0|0|0'; 

	//�׸����� ��� Ŭ���� ���ñ�� Ȱ��ȭ. ��, �׷캴�ո�忡���� ����ϸ� �ȵ�.
	GridObj.strHDClickAction    = "select";
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.bCellFontBold = true;
	//Hearder ����
	GridObj.nHDLineSize   = 9;   //12
	// Grid �� ����
    GridObj.nRowHeight    = 9;    //22
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'       
	
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
   
function setHeader(GridObj) {

	GridObj.AddHeader("CRUD"					,"CRUD"       			,"t_text" 	,100 ,30  ,false);
	GridObj.AddHeader("GUBN"					,"GUBN"       			,"t_text" 	,100 ,40  ,false);
	GridObj.AddHeader("DIVISION"				,"DIV"       		,"t_text" 	,100 ,50  ,false);
	GridObj.AddHeader("SALES_CAT03"				,"����\n�׷�3"       		,"t_text" 	,100 ,70  ,false);
	GridObj.AddHeader("ITEM_ID"					,"��ǰ�ڵ�"       		,"t_text" 	,100 ,60  ,false);
	GridObj.AddHeader("ITEM_NAME"				,"��ǰ��"       			,"t_text" 	,500 ,230 ,false);
	GridObj.AddHeader("SPEC"					,"SPEC"       			,"t_text" 	,500 ,90 ,false);

	GridObj.AddHeader("STOCK"				,"�����"       			,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("STOCK_8901"			,"�λ�CY"       			,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("MI_ORDER"			,"�������"      		,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_ORDER"			,"��������"      	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_REQT_QTY"			,"�����Ƿ�"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W0_PROD_PLAN"		,"�����ȹ"       	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("REMN_PROD_PLAN"		,"�ܿ�����"       	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_CLOS_STOCK"		,"�⸻���"  		,"t_number" ,100.6 ,60 ,false);

//	GridObj.AddHeader("SP01",	" ",		"t_text",		1,		1, 		false); 

	GridObj.AddHeader("W1_ORDER"			,"��������"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W1_REQT_QTY"			,"�����Ƿ�"       	,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("W1_PROD_PLAN"		,"�����ȹ"     	,"t_number" ,100.6 ,60,	false );
	GridObj.AddHeader("W1_CLOS_STOCK"		,"�⸻���"       	,"t_number" ,100.6 ,60 ,false);

//	GridObj.AddHeader("SP02",	" ",		"t_text",		1,		1, 		false); 

	GridObj.AddHeader("W2_ORDER"			,"��������"       ,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W2_REQT_QTY"			,"�����Ƿ�"       	,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("W2_PROD_PLAN"		,"�����ȹ"     	,"t_number" ,100.6 ,60,	false );
	GridObj.AddHeader("W2_CLOS_STOCK"		,"�⸻���"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W3_ORDER"			,"��������"       ,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W3_CLOS_STOCK"		,"�⸻���"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("MINSS"				,"�������"      			,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("PROD_PLAN_YN"		,"�����ȹȮ��"      		,"t_text" ,100.6 ,10  ,false);


	GridObj.AddGroup("W0", "����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("W0", "MI_ORDER");
	GridObj.AppendHeader("W0", "W0_ORDER");
	GridObj.AppendHeader("W0", "W0_REQT_QTY");
	GridObj.AppendHeader("W0", "W0_PROD_PLAN");
	GridObj.AppendHeader("W0", "REMN_PROD_PLAN");
	GridObj.AppendHeader("W0", "W0_CLOS_STOCK");

	GridObj.AddGroup("W1", "����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("W1", "W1_ORDER");
	GridObj.AppendHeader("W1", "W1_REQT_QTY");
	GridObj.AppendHeader("W1", "W1_PROD_PLAN");
	GridObj.AppendHeader("W1", "W1_CLOS_STOCK");

	GridObj.AddGroup("W2", "2����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("W2", "W2_ORDER");
	GridObj.AppendHeader("W2", "W2_REQT_QTY");
	GridObj.AppendHeader("W2", "W2_PROD_PLAN");
	GridObj.AppendHeader("W2", "W2_CLOS_STOCK");

	GridObj.AddGroup("W3", "3����");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("W3", "W3_ORDER");
	GridObj.AppendHeader("W3", "W3_CLOS_STOCK");

	GridObj.BoundHeader();	
	
	//�׸��� ���� �ű��
//	GridObj.bRowSelectorVisible = true;
//	GridObj.bRowSelectorIndex = true;
	
	GridObj.SetCRUDMode("CRUD", "����", "����", "����");
	
	//Hidden �÷�
	GridObj.SetColHide("CRUD",true);
	GridObj.SetColHide("GUBN",true);
	GridObj.SetColHide("DIVISION",true);
	GridObj.SetColHide("PROD_PLAN_YN",true);
	
	//Ư���÷� ����!!
	GridObj.SetColFix('SPEC'); 
	
    GridObj.SetColCellAlign('ITEM_ID','center');
    GridObj.SetColCellAlign('ITEM_NAME','left');
    GridObj.SetColCellAlign('SPEC','center');
    
    //number���� ����!
    GridObj.SetNumberFormat('STOCK','###,##0');
    GridObj.SetNumberFormat('STOCK_8901','###,##0');
    GridObj.SetNumberFormat('W0_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W0_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('REMN_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('MI_ORDER','###,##0');
    GridObj.SetNumberFormat('W0_ORDER','###,##0');
    GridObj.SetNumberFormat('W0_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W1_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W1_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('W1_ORDER','###,##0');
    GridObj.SetNumberFormat('W1_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W2_ORDER','###,##0');
    GridObj.SetNumberFormat('W2_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W2_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('W2_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W3_ORDER','###,##0');
    GridObj.SetNumberFormat('W3_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('MINSS','###,##0');

}

/*������������������������������������������������������������������������
  ����ȸ ��ư Ŭ���� ����.
  ������������������������������������������������������������������������*/
GoSearch = function() {

	doQuery();
};


/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
GoSave = function() {
	
	doSave();
};

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() {

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//���� ��ư ���� [����, ����MTS, ����MTO]
	if(document.frm.checked_domain[0].checked == true) {
		checked_domain = "DO";       	
	}
	else if(document.frm.checked_domain[1].checked == true) {
		checked_domain = "EXMTS";
	}
	else if(document.frm.checked_domain[2].checked == true) {
		checked_domain = "EXMTO";
	}
	else {
		checked_domain = "EXHAWA";
	}
	
	var sdate = document.all.sdate.value;
	var plant_alloc_version;
	
	// 1�������Ҵ� ������ �����´�.
	commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
		callback:function(arrList){
			// ��ġ�ϴ� CODE ����
			if( arrList.length == 1 ) {
	   			
	   			plant_alloc_version = arrList[0][0];
	
				if(confirm("�����Ҵ���� :"+ plant_alloc_version + " => "
							+ plant_alloc_version.substring(4,6)+"/"+plant_alloc_version.substring(6,8) + "�Ͽ� ����!"
							+"\n ��ȸ�Ͻðڽ��ϱ�?") == true) {
					//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
					GridObj.SetParam("mode", "search");
					GridObj.SetParam("plant_alloc_version", plant_alloc_version);
					GridObj.SetParam("sdate", sdate);
					GridObj.SetParam("checked_domain", checked_domain);
					GridObj.DoQuery(servlet_url);
				}
			}
			else {
				alert("1�������Ҵ� ���������� �����ϴ�! �ý��۰����ڿ��� �����ϼ���!");
			}
		}
	});

}

/*������������������������������������������������������������������������
  ������
  ������������������������������������������������������������������������*/
function doSave() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//���� ��ư ���� [����, ����MTS]
	if(document.frm.checked_domain[0].checked == true) {
		checked_domain = "DO";       	
	}
	else if(document.frm.checked_domain[1].checked == true) {
		checked_domain = "EXMTS";
	}
	else if(document.frm.checked_domain[2].checked == true) {
		checked_domain = "EXMTO";
	}
	else {
		checked_domain = "EXHAWA";
	}
  
   var sdate = document.all.sdate.value;
   var plant_alloc_version;

	// 1�������Ҵ� ������ �����´�.
	commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
		callback:function(arrList){
			// ��ġ�ϴ� CODE ����
			if( arrList.length == 1 ) {
       			
       			plant_alloc_version = arrList[0][0];
				//user_id
				GridObj.SetParam("user_id", document.frm._user_id.value);
		
		        //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
		   		//WiseGrid�� ������ ������ mode�� �����Ѵ�.
		        GridObj.SetParam("mode", "save");

		        GridObj.SetParam("plant_alloc_version", plant_alloc_version);
		        GridObj.SetParam("sdate", sdate);
		        GridObj.SetParam("checked_domain", checked_domain);
				
				//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
				GridObj.DoQuery(servlet_url, "CRUD");

			}
			else {
				alert("1�������Ҵ� ���������� �����ϴ�! �ý��۰����ڿ��� �����ϼ���!");
			}
 		}
	});
	 
}

/*����������������������������������������������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ����������������������������������������������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    var arrA = '';
    var arrB = '';
    var arrC = '';
    
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {
            //���� ������ ����

			var colBGColor='232|245|213';
			var rowLeng = GridObj.GetRowCount();
			var w1_clos_stock = 0, w2_clos_stock = 0, w3_clos_stock = 0;
			
			for( var row=0 ; row<rowLeng ; row++ ){ //row����ŭ �ݺ�
        		if(strToNum(GridObj.GetCellValue("W1_REQT_QTY", row)) > 0) GridObj.SetCellFontBold("W1_REQT_QTY", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W2_REQT_QTY", row)) > 0) GridObj.SetCellFontBold("W2_REQT_QTY", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W1_PROD_PLAN", row)) > 0) GridObj.SetCellFontBold("W1_PROD_PLAN", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W2_PROD_PLAN", row)) > 0) GridObj.SetCellFontBold("W2_PROD_PLAN", row, 'true');
        		
        		// �����ȹ�� �Ϸ�Ǿ����� ���� �⸻��� = ���� �⸻��� - ���� �������� + �����ȹ
        		// �Ϸ�ƴϸ� ���� �⸻��� = ���� �⸻��� - ���� �������� + �����Ƿ�
        		// ������ �⸻��� = ���� �⸻��� - ������ ��������
        		if(GridObj.GetCellValue("PROD_PLAN_YN", row) == "Y") {
        			w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W1_ORDER", row))
        							+ strToNum(GridObj.GetCellValue("W1_PROD_PLAN", row));
        			
        			GridObj.SetCellValue("W1_CLOS_STOCK",row,Math.round(w1_clos_stock));

	    			w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W2_ORDER", row))
	    							+ strToNum(GridObj.GetCellValue("W2_PROD_PLAN", row));
	    			
	    			GridObj.SetCellValue("W2_CLOS_STOCK",row,Math.round(w2_clos_stock));

        		}
        		else {
        			w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W1_ORDER", row))
        							+ strToNum(GridObj.GetCellValue("W1_REQT_QTY", row));
        			
        			GridObj.SetCellValue("W1_CLOS_STOCK",row,Math.round(w1_clos_stock));

	    			w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W2_ORDER", row))
	    							+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", row));
	    			
	    			GridObj.SetCellValue("W2_CLOS_STOCK",row,Math.round(w2_clos_stock));
        		}
				
				/*�����κ�*/
    			w3_clos_stock = strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W3_ORDER", row));
    			
    			GridObj.SetCellValue("W3_CLOS_STOCK",row,Math.round(w3_clos_stock));
				
				
				
        		// ������� ���� ����+���������� ���� ��� ����ǥ��
        		if(strToNum(GridObj.GetCellValue("STOCK", row)) 
        			< (strToNum(GridObj.GetCellValue("MI_ORDER", row))+strToNum(GridObj.GetCellValue("W0_ORDER", row))) ){
        			GridObj.SetCellBgColor('STOCK', row, '255|173|143');
        		}
        		        		
        		// ���� ��������� ���� ������ ���� ��� ��� ����ǥ��
        		if(strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W1_ORDER", row)) ){
        			GridObj.SetCellBgColor('W0_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// ���� ��������� ������ ������ ���� ��� ����ǥ��
        		if(strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W2_ORDER", row)) ){
        			GridObj.SetCellBgColor('W1_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// ������ ������� 0���� ������� ����ǥ��
        		if(strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W3_ORDER", row)) ){
        			GridObj.SetCellBgColor('W2_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// ������ ������� 0���� ������� ����ǥ��
        		if(strToNum(GridObj.GetCellValue("W3_CLOS_STOCK", row)) < 0 ){
        			GridObj.SetCellBgColor('W3_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		
        	}  
        	
        	
        	GridObj.SetColCellBgColor('W1_REQT_QTY',colBGColor);//���ֻ����Ƿڷ�
        	GridObj.SetColCellBgColor('W2_REQT_QTY',colBGColor);//2���������Ƿڷ�
        	GridObj.SetColCellBgColor('STOCK','232|232|255');//���
        	GridObj.SetColCellBgColor('W0_CLOS_STOCK','232|232|255');//���� �⸻���
        	GridObj.SetColCellBgColor('W1_CLOS_STOCK','232|232|255');//���� �⸻���
        	GridObj.SetColCellBgColor('W2_CLOS_STOCK','232|232|255');//������ �⸻���
        	GridObj.SetColCellBgColor('W3_CLOS_STOCK','232|232|255');//������ �⸻���
        	GridObj.SetColCellBgColor('MINSS','120|255|255');//�������
       
        	DW1_grouping();
        	  
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
	}else if(mode == "save"){
		if(GridObj.GetStatus() == "true") {

			alert("�����Ͽ����ϴ�!");
			DW1_grouping();

		} else {
			var error_msg = GridObj.GetMessage();
			alert(error_msg);			
		}
	}
}

function DW1_grouping() {
	GridObj.SetGroupMerge('GUBN,DIVISION,SALES_CAT03'); 
	
	GridObj.AddSummaryBar('SUMMARY4', '�Ұ�', 'SALES_CAT03', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_REQT_QTY,W2_PROD_PLAN,W2_CLOS_STOCK,W3_ORDER,W3_CLOS_STOCK,MINSS'); 
	//GridObj.AddSummaryBar('SUMMARY3', '�Ұ�', 'DIVISION', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_CLOS_STOCK,W3_ORDER,MINSS'); 
	//GridObj.AddSummaryBar('SUMMARY2', '�Ұ�', 'GUBN', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_CLOS_STOCK,W3_ORDER,MINSS'); 
	GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_REQT_QTY,W2_PROD_PLAN,W2_CLOS_STOCK,W3_ORDER,W3_CLOS_STOCK,MINSS'); 
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|181|106'); 
	//GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '190|125|255'); 
	//GridObj.SetSummaryBarColor('SUMMARY3', '0|0|0', '145|200|200'); 
	GridObj.SetSummaryBarColor('SUMMARY4', '0|0|0', '212|212|212'); 
}
   
/*������������������������������������������������������������������������
  ��EXCEL
  ������������������������������������������������������������������������*/
/* EXCEL ???? */
function excelDown() {
   var GridObj = document.WiseGrid;
   //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
   GridObj.ExcelExport("", "", true, true);
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
    
    // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
    // ==> ȭ���� ���̻� ��ҵ��� ���� 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1; 
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
    document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
    
}  
           


/*������������������������������������������������������������������������
  ��MOUSE OVER ��, ROW ���� ��ȯ
  ������������������������������������������������������������������������*/
function GridMouseOver(strType, strColumnKey, nRow){
	
		// ����� ���۾���
		if( nRow == -1 )
			return;
}

/*������������������������������������������������������������������������
  ��MOUSE OUT ��, ROW ���� ����
  ������������������������������������������������������������������������*/
function GridMouseOut(strType, strColumnKey, nRow){

		// ����� ���۾���
		if( nRow == -1 )
			return;
}

 /*������������������������������������������������������������������������
   ���׸��� �÷� Set �÷� �����ϱ�!!
   ������������������������������������������������������������������������*/
function gridColSet(obj){
 
}


 /*������������������������������������������������������������������������
   ���׸��� �÷� ������ �߻��ϴ� �̺�Ʈ!!
   ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow){

	if(strColumnKey == "W1_REQT_QTY" || strColumnKey == "W2_REQT_QTY") {
		// �����ȹ�� �Ϸ�Ǿ����� ���� �⸻��� = ���� �⸻��� - ���� �������� + �����ȹ
		if(GridObj.GetCellValue("PROD_PLAN_YN", nRow) == "Y") {
			var w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W1_ORDER", nRow))
							+ strToNum(GridObj.GetCellValue("W1_PROD_PLAN", nRow));
		
			GridObj.SetCellValue("W1_CLOS_STOCK",nRow,w1_clos_stock);
		
			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
								+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow));

			// ������ �⸻��� ��� = ���ֱ⸻��� - ������ ��������
			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);

//			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
//								+ strToNum(GridObj.GetCellValue("W2_PROD_PLAN", nRow));
//			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);
		}
		else {
			var w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W1_ORDER", nRow))
							+ strToNum(GridObj.GetCellValue("W1_REQT_QTY", nRow));
		
			GridObj.SetCellValue("W1_CLOS_STOCK",nRow,w1_clos_stock);
		
			// ������ �⸻��� ��� = ���ֱ⸻��� - ������ ��������
			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
								+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow));
			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);
		}	
		
		// ���� ��������� ������ ������ ���� ��� ����ǥ��
		if(strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) < strToNum(GridObj.GetCellValue("W2_ORDER", nRow)) ){
			GridObj.SetCellBgColor('W1_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// ������ �⸻��� 0���� ������ ����ǥ��
		if(w2_clos_stock < 0){
			GridObj.SetCellBgColor('W2_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// �������� �⸻��� ��� = �����ֱ⸻��� - �������� ��������
		var w3_clos_stock = strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W3_ORDER", nRow));
		GridObj.SetCellValue("W3_CLOS_STOCK",nRow,w3_clos_stock);
		// ������ �⸻��� 0���� ������ ����ǥ��
		if(w3_clos_stock < 0){
			GridObj.SetCellBgColor('W3_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// ������ 0�̻��̸� BOLD
		if(strToNum(GridObj.GetCellValue("W1_REQT_QTY", nRow)) > 0) GridObj.SetCellFontBold("W1_REQT_QTY", nRow, 'true');
        if(strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow)) > 0) GridObj.SetCellFontBold("W2_REQT_QTY", nRow, 'true');		
	}
 
}

/*������������������������������������������������������������������������
  ���׸����� �� ��Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){
	//alert(strColumnKey+''+nRow);
}
    
/*������������������������������������������������������������������������
  ���׸����� �� ����Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow){

	var sdate = document.all.sdate.value;

	if(strColumnKey == "MI_ORDER" || strColumnKey == "W0_ORDER") { // ����
		var sel_week = "W0";
	}
	else if(strColumnKey == "W1_ORDER") { // ����
		var sel_week = "W1";
	}
	else if(strColumnKey == "W2_ORDER") { // ������
		var sel_week = "W2";
	}
	else if(strColumnKey == "W3_ORDER") { // ������
		var sel_week = "W3";
	}
	else return;

	var item_id	= GridObj.GetCellValue("ITEM_ID",nRow);
	var service_url = "service.do?_moon_service=sc_01120_Export_Order_List_Popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&item_id=" + item_id + "&sel_week=" + sel_week + "&sdate=" + sdate;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Export_Order_List", pop_win_style);
	newWin.focus();
	
}  
	
	