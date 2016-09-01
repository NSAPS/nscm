/*������������������������������������������������������������������������������������������
  ���� ��ư�� JOB_ID�� ����.
  ������������������������������������������������������������������������������������������*/    
    var job_id  = 'sc_01060_plantAllocationPlanResultAnalysis_grid'; //�޴� �ְ� Ŭ���� JOB_ID
    var class_path = "com.wisegrid.admin.";
    
/*������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻���. 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������������������������������������������������������������������*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
       setHeader(GridObj);  //�ش�����
       setDefault();        
   }


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
   function setDefault()
   {
   		//GridObj.SetCRUDMode("CRUD", "����", "����", "����");
        //�׸����� ��� Ŭ���� ���ñ�� Ȱ��ȭ. ��, �׷캴�ո�忡���� ����ϸ� �ȵ�.
    	GridObj.strHDClickAction    = "sortsingle";
   }
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
   
   function setHeader(GridObj) 
   {
   		//�޴�Ŭ���� �⺻���� Ÿ�� ��.
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   }

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
   function defaultHeader(result)
   {
	   var result_cnt = result.length;
	   //alert("result_cnt : "+result_cnt); //36���� �÷�..
       var test = '';
       var arrHeader = '';
/*       for( var i=0 ;i<result.length ;i++) //��ü �÷� �� ��ŭ �ݺ� �Ѵ�.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])
       }
*/
			GridObj.AddHeader("CRUD"						,"CRUD"       				,"t_text" 	,100 ,50  ,false);
			GridObj.AddHeader("RES_TP"						,"��������"       			,"t_text" 	,100 ,40  ,false);
			GridObj.AddHeader("ITEM_ID"						,"��ǰ�ڵ�"       			,"t_text" 	,100 ,80  ,false);
			GridObj.AddHeader("ITEM_NAME"					,"��ǰ��"       				,"t_text" 	,100 ,150 ,false);
			GridObj.AddHeader("W3_AVG_RATIO"				,"3�����\n������"       		,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("W1_AVG_RATIO"				,"1�����\n������"       		,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("SAFETY_STOCK"				,"�������"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("BASE_STOCK"					,"��ȸ��\n�������"  			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("MI_CHGO"						,"����\n�����"  				,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("RECEIPT_EXPT"				,"����\n�����ȹ"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_PLAN"					,"����\n�ǸŰ�ȹ"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_1"	,"����\n�ǸŰ�ȹ\n������"    ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("SALES_VS_WEEK1_AVG"			,"1�����\n�ǸŴ��"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK"				,"�������\n(������)"       	,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("N_PLAN_VS_STOCK_WORK"		,"��ȹ���\n����ϼ�"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_ACT_VS_STOCK_WORK"			,"�������\n����ϼ�"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_RECEIPT_EXPT"				,"���꿹��\(���ְ�ȹ��)"		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("RP1_QTY"						,"����䱸��"       			,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("PO_QTY1"						,"�����ʿ䷮"       			,"t_text" 	,100 ,70 ,true );
			GridObj.AddHeader("NWK_ADJ_QTY"					,"�䱸/����\n����"       		,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("W1_SALES_PLAN_DIFF"			,"�ǸŰ�ȹ\n������\n(1��AVG)" ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("W3_SALES_PLAN_DIFF"			,"�ǸŰ�ȹ\n������\n(3��AVG)" ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_SALES_PLAN"				,"�ǸŰ�ȹ"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_2"	,"�ǸŰ�ȹ\n������"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK2"				,"�������"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NN_PLAN_VS_STOCK_WORK"		,"��ȹ���\n����ϼ�"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("NN_ACT_VS_STOCK_WORK"		,"�������\n����ϼ�"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("RP2_QTY"						,"����䱸��"       			,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("PO_QTY2"						,"�����ʿ䷮"       			,"t_text" 	,100 ,70 ,true );
			GridObj.AddHeader("NN_SALES_PLAN"				,"�ǸŰ�ȹ"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_3"	,"�ǸŰ�ȹ\n������"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK3"				,"�������"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NNN_ACT_VS_STOCK_WORK"		,"�������\n����ϼ�"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("RP0_QTY"						,"���ֻ����ʿ䷮"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W1"							,"W1_����\n�����"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W2"							,"W2_����\n�����"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W3"							,"W3_������\n�����"       	,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NNWK_WORK"					,"������\n�����ϼ�"       	,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_MEAN_1WEEK"			,"1������Ǹ�"       			,"t_text" 	,100 ,70  ,false);
			
			//����÷��� ����..������ �� ��Ʈ������ ����.
			GridObj.nHDLines = 3; //��� �κ� �� ����� 2�ٱ��� �����.
			GridObj.nHDLineSize = 22; //��� �÷��� ���� ������.
			GridObj.nHDFontSize = 8; //��� �÷��� ��Ʈ ������.
			
			//�׸��� ���� �ű��
			GridObj.bRowSelectorVisible = true;
			GridObj.bRowSelectorIndex = true;
		
			GridObj.AddGroup("WEEK", "����(W)");			//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AppendHeader("WEEK", "W3_AVG_RATIO");	//3�� ��� ������
			GridObj.AppendHeader("WEEK", "W1_AVG_RATIO");	//1�� ���������
			GridObj.AppendHeader("WEEK", "SAFETY_STOCK");	//�������
			GridObj.AppendHeader("WEEK", "BASE_STOCK");		//�������
			GridObj.AppendHeader("WEEK", "MI_CHGO");		//��������
			GridObj.AppendHeader("WEEK", "RECEIPT_EXPT");	//�����ȹ
			GridObj.AppendHeader("WEEK", "SALES_PLAN");		//�ǸŰ�ȹ
			GridObj.AppendHeader("WEEK", "SALES_ACT_VS_SALES_PLAN_1");	//�ǸŰ�ȹ������
			GridObj.AppendHeader("WEEK", "SALES_VS_WEEK1_AVG");			//1�� ��� �Ǹ� ��
			
			GridObj.AddGroup("WEEK1", "����(W+1)");			//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AppendHeader("WEEK1", "EXPERT_STOCK");			//�������(������)
			GridObj.AppendHeader("WEEK1", "N_PLAN_VS_STOCK_WORK");	//��ȹ��������
			GridObj.AppendHeader("WEEK1", "N_ACT_VS_STOCK_WORK");	//�����������ϼ�
			GridObj.AppendHeader("WEEK1", "N_RECEIPT_EXPT");		//�����ȹ
			GridObj.AppendHeader("WEEK1", "RP1_QTY");				//����䱸��
			GridObj.AppendHeader("WEEK1", "PO_QTY1");				//�����ʿ䷮
			GridObj.AppendHeader("WEEK1", "NWK_ADJ_QTY");			//�䱸/��������
			GridObj.AppendHeader("WEEK1", "W1_SALES_PLAN_DIFF");	//�ǸŰ�ȹ������(1�����)
			GridObj.AppendHeader("WEEK1", "W3_SALES_PLAN_DIFF");	//�ǸŰ�ȹ������(3�����)
			GridObj.AppendHeader("WEEK1", "N_SALES_PLAN");			//�ǸŰ�ȹ
			GridObj.AppendHeader("WEEK1", "SALES_ACT_VS_SALES_PLAN_2");	//�ǸŰ�ȹ������
		
			GridObj.AddGroup("WEEK2", "������(W+2)");			//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AppendHeader("WEEK2", "EXPERT_STOCK2");				//�������
			GridObj.AppendHeader("WEEK2", "NN_PLAN_VS_STOCK_WORK");		//��ȹ�������ϼ�
			GridObj.AppendHeader("WEEK2", "NN_ACT_VS_STOCK_WORK");		//�����������ϼ�
			GridObj.AppendHeader("WEEK2", "RP2_QTY");					//����䱸��
			GridObj.AppendHeader("WEEK2", "PO_QTY2");					//�����ʿ䷮
			GridObj.AppendHeader("WEEK2", "NN_SALES_PLAN");				//�ǸŰ�ȹ
			GridObj.AppendHeader("WEEK2", "SALES_ACT_VS_SALES_PLAN_3");	//�ǸŰ�ȹ������
			GridObj.AppendHeader("WEEK2", "EXPERT_STOCK3");				//�������
			GridObj.AppendHeader("WEEK2", "NNN_ACT_VS_STOCK_WORK");		//�����������ϼ�

	   //alert("GRidObj.....�ٿ�� ��!");
	   GridObj.BoundHeader();
	   
	   GridObj.SetCRUDMode("CRUD", "����", "����", "����");

       //Hidden �÷�
       GridObj.SetColHide("CRUD",true);
       GridObj.SetColHide("RP0_QTY",true);
       GridObj.SetColHide("W1",true);
       GridObj.SetColHide("W2",true);
       GridObj.SetColHide("W3",true);
       GridObj.SetColHide("NNWK_WORK",true);
       GridObj.SetColHide("SALES_MEAN_1WEEK",true);
       GridObj.SetColHide("MI_CHGO",true);
       
       //Ư���÷� ����!!
       GridObj.SetColFix('ITEM_NAME'); 
       
   }


/*������������������������������������������������������������������������
  ����ȸ ��ư Ŭ���� ����.
  ������������������������������������������������������������������������*/
GoSearch = function() {

/*	if(document.frm.checked_domain[3].checked == true) {
		// ����,���� ����� ���ÿ� �۾��� ��� ��ü���¿��� �۾��� ���� ������ �۾������͸� ������ų ������ �ִ�.
		if(confirm("��ü��ȸ�ô� ������ �� �����ϴ�! \n ��� ��ȸ�Ͻðڽ��ϱ�?") != 1 ) {
			return;
		}
	}
*/
	doQuery();
};


/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
GoSave = function() {
	
/*	if(document.frm.checked_domain[3].checked == true) {
		// ����,���� ����� ���ÿ� �۾��� ��� ��ü���¿��� �۾��� ���� ������ �۾������͸� ������ų ������ �ִ�.
		alert("��ü��ȸ�ô� ������ �� �����ϴ�! ");
		return;
	}
*/	
	doSave();
};

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
   	   //�޴� Ŭ���� �⺻ ����
       var servlet_url = Project_name+"/servlet/" + class_path + job_id;

       //���� ��ư ���� [����, ����MTS, ����MTO, õü]
/*       if(document.frm.checked_domain[0].checked == true){
       	checked_domain = "DO";       	
       }else if(document.frm.checked_domain[1].checked == true){
       	checked_domain = "EXMTS";
       }else if(document.frm.checked_domain[2].checked == true){
       	checked_domain = "EXMTO";
       }else if(document.frm.checked_domain[3].checked == true){
       	checked_domain = "";
       }
*/
      	checked_domain = "DO";  
      	       
       //���� ��ư ���� [�����ʿ䷮, �����ȹ]
       if(document.frm.checked_pa_pr[0].checked == true){
       	checked_pa_pr = "";
       }else if(document.frm.checked_pa_pr[1].checked == true){
       	checked_pa_pr = "PR";
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
						GridObj.SetParam("checked_pa_pr", checked_pa_pr);
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
		
       //���� ��ư ���� [����, ����MTS, ����MTO, õü]
/*       if(document.frm.checked_domain[0].checked == true){
       	checked_domain = "DO";       	
       }else if(document.frm.checked_domain[1].checked == true){
       	checked_domain = "EXMTS";
       }else if(document.frm.checked_domain[2].checked == true){
       	checked_domain = "EXMTO";
       }else if(document.frm.checked_domain[3].checked == true){
       	checked_domain = "";
       }
*/       
       checked_domain = "DO";
       
       //���� ��ư ���� [�����ʿ䷮, �����ȹ]
       if(document.frm.checked_pa_pr[0].checked == true){
       	checked_pa_pr = "";
       }else if(document.frm.checked_pa_pr[1].checked == true){
       	checked_pa_pr = "PR";
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

			       	GridObj.SetParam("p_in_up_chk", "p_update");
			        GridObj.SetParam("plant_alloc_version", plant_alloc_version);
			        GridObj.SetParam("sdate", sdate);
			        GridObj.SetParam("checked_domain", checked_domain);
			        GridObj.SetParam("checked_pa_pr", checked_pa_pr);
					
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
	                GridObj.SetColCellAlign('RES_TP','left'); //��������
	                GridObj.SetColCellAlign('ITEM_ID','left');
	                GridObj.SetColCellAlign('ITEM_NAME','left');
	                GridObj.SetColCellAlign('W3_AVG_RATIO','right');
	                GridObj.SetColCellAlign('W1_AVG_RATIO','right');
	                GridObj.SetColCellAlign('SAFETY_STOCK','right');
	                GridObj.SetColCellAlign('BASE_STOCK','right');
	                GridObj.SetColCellAlign('MI_CHGO','right');
	                GridObj.SetColCellAlign('RECEIPT_EXPT','right');
	                GridObj.SetColCellAlign('SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_1','right');
	                GridObj.SetColCellAlign('SALES_VS_WEEK1_AVG','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK','right');
	                GridObj.SetColCellAlign('N_PLAN_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('N_ACT_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('N_RECEIPT_EXPT','right');
	                GridObj.SetColCellAlign('RP1_QTY','right');
	                GridObj.SetColCellAlign('PO_QTY1','right');
	                GridObj.SetColCellAlign('NWK_ADJ_QTY','right');
	                GridObj.SetColCellAlign('W1_SALES_PLAN_DIFF','right');
	                GridObj.SetColCellAlign('W3_SALES_PLAN_DIFF','right');
	                GridObj.SetColCellAlign('N_SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_2','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK2','right');
	                GridObj.SetColCellAlign('NN_PLAN_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('NN_ACT_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('RP2_QTY','right');
	                GridObj.SetColCellAlign('PO_QTY2','right');
	                GridObj.SetColCellAlign('NN_SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_3','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK3','right');
	                GridObj.SetColCellAlign('NNN_ACT_VS_STOCK_WORK','right');
	                
	                //number���� ����!
	                GridObj.SetNumberFormat('W3_AVG_RATIO','###,##0.##');
	                GridObj.SetNumberFormat('W1_AVG_RATIO','###,##0.##');
	                GridObj.SetNumberFormat('SALES_VS_WEEK1_AVG','###,##0.##');
	                GridObj.SetNumberFormat('W1_SALES_PLAN_DIFF','###,##0.##');
	                GridObj.SetNumberFormat('W3_SALES_PLAN_DIFF','###,##0.##');
	                
	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_1','###,##0.##');
	                GridObj.SetNumberFormat('N_PLAN_VS_STOCK_WORK','###,##0.##');

	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_2','###,##0.##');
	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_3','###,##0.##');
	                GridObj.SetNumberFormat('NNN_ACT_VS_STOCK_WORK','###,##0.##');
	                GridObj.SetNumberFormat('NN_PLAN_VS_STOCK_WORK','###,##0.##');
	                GridObj.SetNumberFormat('NN_ACT_VS_STOCK_WORK','###,##0.##');

					//�����ʿ䷮ �÷��� �Ұ�κ��� Cell�� �����Ҽ� ������ ���� �κ�!!
	                //���� �׸����� �� �ο� ����.
    				var row_cnt = GridObj.GetRowCount();
    				//alert("row_cnt : "+row_cnt);
			        for( var i=0 ;i<row_cnt ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
			        {
			            if(GridObj.GetCellValue('ITEM_ID',i) == "�Ұ�"){
			             /*Ư�� �÷��� �ش�ο��� �������¸� �����Ѵ�. 
						 edit : ������ �÷��� ���� ���������ϰ� �Ѵ�. 
						 activateonly : �� ���� Ŀ���� ������ �� �ְ� ������ �� ������ ������ ���� ����. 
						 disable : ������ �� ���� ������ �� ����. 
						 activatenoedit : �ܼ��� ���� ������ �� �ְ� �Ѵ�. 
						 GridObj.SetCellActivation('ITEM_NAME', 0, 'disable')
						 */
			           	 GridObj.SetCellActivation('PO_QTY1', i, 'activatenoedit');
			           	 GridObj.SetCellActivation('PO_QTY2', i, 'activatenoedit');
			            }
			            
			             if(GridObj.GetCellValue('ITEM_NAME',i) == "�Ѱ�"){
			             /*Ư�� �÷��� �ش�ο��� �������¸� �����Ѵ�. 
						 edit : ������ �÷��� ���� ���������ϰ� �Ѵ�. 
						 activateonly : �� ���� Ŀ���� ������ �� �ְ� ������ �� ������ ������ ���� ����. 
						 disable : ������ �� ���� ������ �� ����. 
						 activatenoedit : �ܼ��� ���� ������ �� �ְ� �Ѵ�. 
						 GridObj.SetCellActivation('ITEM_NAME', 0, 'disable')
						 */
			           	 GridObj.SetCellActivation('PO_QTY1', i, 'activatenoedit');
			           	 GridObj.SetCellActivation('PO_QTY2', i, 'activatenoedit');
			            }
			        }
		
	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	gridColSet(GridObj);
                	
                	//�׸����� ��ü �ο���� ����.
                	gridRow = GridObj.GetRowCount();
                	
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
    	}else if(mode == "save"){
    		if(GridObj.GetStatus() == "true") {

    			alert("���强��!");

			} else {
				var error_msg = GridObj.GetMessage();
				alert(error_msg);			
			}
    	}
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
        
        /*
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        }
        */ 
        
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
    function gridColSet(obj)
    {
    	//���� �׸����� �� �ο� ����.
        var rowLeng = obj.GetRowCount();
        //alert("rowLeng : "+rowLeng);
            
        var colBGColor='255|255|255';
        
        
        for( var row=0 ; row<rowLeng ; row++ ){ //row����ŭ �ݺ�
        	colBGColor='232|245|213';
        	obj.SetCellBgColor("PO_QTY1", row, colBGColor);
        	obj.SetCellBgColor("PO_QTY2", row, colBGColor);
        	
			//Row �������÷������� �����Ѵ�.
	        if(obj.GetCellValue('ITEM_ID',row) == "�Ұ�")
	        {
	            
	            colBGColor='233|233|233';
	            
	            for( var col=1 ;col<=31 ;col++) 
	            {
	            	  //ROW���� �÷� ������ �����Ѵ�
	                obj.SetCellBgColor("RES_TP", row, colBGColor) ;
	                obj.SetCellBgColor("ITEM_ID", row, colBGColor);
	                obj.SetCellBgColor("ITEM_NAME", row, colBGColor);
	                obj.SetCellBgColor("W3_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("W1_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("SAFETY_STOCK", row, colBGColor);
	                obj.SetCellBgColor("BASE_STOCK", row, colBGColor);
	                obj.SetCellBgColor("MI_CHGO", row, colBGColor);
	                obj.SetCellBgColor("RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_1", row, colBGColor);
	                obj.SetCellBgColor("SALES_VS_WEEK1_AVG", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK", row, colBGColor);
	                obj.SetCellBgColor("N_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("RP1_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY1", row, colBGColor);
	                obj.SetCellBgColor("NWK_ADJ_QTY", row, colBGColor);
	                obj.SetCellBgColor("W1_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("W3_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("N_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_2", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK2", row, colBGColor);
	                obj.SetCellBgColor("NN_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("NN_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("RP2_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY2", row, colBGColor);
	                obj.SetCellBgColor("NN_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_3", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK3", row, colBGColor);
	                obj.SetCellBgColor("NNN_ACT_VS_STOCK_WORK", row, colBGColor);
	            }//�÷� ��ĥ�ϴ� for�� ��.!!
	        }else if(obj.GetCellValue('ITEM_NAME',row) == "�Ѱ�"){
	        	colBGColor='222|222|222';
	            
	            for( var col=1 ;col<=31 ;col++) 
	            {
	            	//ROW���� �÷� ������ �����Ѵ�
	                obj.SetCellBgColor("RES_TP", row, colBGColor) ;
	                obj.SetCellBgColor("ITEM_ID", row, colBGColor);
	                obj.SetCellBgColor("ITEM_NAME", row, colBGColor);
	                obj.SetCellBgColor("W3_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("W1_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("SAFETY_STOCK", row, colBGColor);
	                obj.SetCellBgColor("BASE_STOCK", row, colBGColor);
	                obj.SetCellBgColor("MI_CHGO", row, colBGColor);
	                obj.SetCellBgColor("RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_1", row, colBGColor);
	                obj.SetCellBgColor("SALES_VS_WEEK1_AVG", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK", row, colBGColor);
	                obj.SetCellBgColor("N_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("RP1_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY1", row, colBGColor);
	                obj.SetCellBgColor("NWK_ADJ_QTY", row, colBGColor);
	                obj.SetCellBgColor("W1_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("W3_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("N_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_2", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK2", row, colBGColor);
	                obj.SetCellBgColor("NN_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("NN_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("RP2_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY2", row, colBGColor);
	                obj.SetCellBgColor("NN_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_3", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK3", row, colBGColor);
	                obj.SetCellBgColor("NNN_ACT_VS_STOCK_WORK", row, colBGColor);
	            }//�÷� ��ĥ�ϴ� for�� ��.!!
	        }//if�� ��!
        }//row for�� ��!        
	}


 /*������������������������������������������������������������������������
   ���׸��� �÷� ������ �߻��ϴ� �̺�Ʈ!!
   ������������������������������������������������������������������������*/
	function GridChangeCell(strColumnKey, nRow){

		chCellValue(strColumnKey, nRow);
	}
	
	
 /*������������������������������������������������������������������������
   ���׸��� �÷� ������ ����ȭ.
   ������������������������������������������������������������������������*/	
	function chCellValue(strColumnKey, nRow){
		
		var row_cnt = GridObj.GetRowCount();

		//������ �����ʿ䷮�� �������� ��� ����!!
		if(strColumnKey == "PO_QTY1"){
		
			//**************************************************
			//�����ʿ䷮(����) ������ �䱸/�������� �ڵ���� �κ�.
			//�䱸/�������� = �����ʿ䷮(����) - ����䱸��(����)
			//**************************************************
			var nProdQty = GridObj.GetCellValue("PO_QTY1", nRow);  	// �����ʿ䷮(����).
			var rp1_qty = GridObj.GetCellValue("RP1_QTY", nRow); 	// ����䱸��(����).
			var differ = numberFormat(strToNum(nProdQty) - strToNum(rp1_qty));

			GridObj.SetCellValue('NWK_ADJ_QTY',nRow,differ);
			
			//************************************************************************************
			//�����ʿ䷮ ������ ������ ������� �ڵ���� �κ�.
			//������ �������(������) = �������(������) + �����ʿ䷮(����) - �ǸŰ�ȹ(����)
			//************************************************************************************
			var expert_stock = GridObj.GetCellValue("EXPERT_STOCK", nRow);	// �������(������)
			var n_sales_plan = GridObj.GetCellValue("N_SALES_PLAN", nRow);	// �ǸŰ�ȹ(����)
			var stock = numberFormat(strToNum(expert_stock) + strToNum(nProdQty) - strToNum(n_sales_plan));
	
			GridObj.SetCellValue('EXPERT_STOCK2',nRow,stock);
	
			//************************************************************************************
			//�����ʿ䷮ ������ ������ ��ȹ ��� ����ϼ� �ڵ���� �κ�.
			//������ ��ȹ ��� ����ϼ�(������) = �������(������) * �����ϼ�(������) / �ǸŰ�ȹ(������)
			//************************************************************************************		
			var nnwk_work = GridObj.GetCellValue("NNWK_WORK", nRow); //������ �����ϼ�
			var nnPlanVsStk;
			
			if(strToNum(n_sales_plan) == 0 ){ //�ǸŰ�ȹ�� 0�̸� 999.
				nnPlanVsStk = 999;	
			}
			else if(strToNum(stock) <= 0){ // ������� 0���� �۰ų� ������ 0
				nnPlanVsStk = 0;	
			}
			else {
				nnPlanVsStk = strToNum(stock) * strToNum(nnwk_work) /  strToNum(n_sales_plan);
				nnPlanVsStk = Math.round(nnPlanVsStk*10)/10;
			}
	
			GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',nRow,nnPlanVsStk);
			
			//************************************************************************************
			//�����ʿ䷮ ������ ������ �����������ϼ� �ڵ���� �κ�.
			//������ ���� ��� ��� �ϼ�(������) = ������ �������(new)(������) / 1�� ��� �Ǹ�
			//************************************************************************************		
			var sales_mean_1week = GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow); //1�� ����Ǹ�
			
			var nnActVsStk;
			
			if(strToNum(sales_mean_1week) == 0 ){ //�ǸŰ�ȹ�� 0�̸� 999.
				nnActVsStk = 999;	
			}
			else if(strToNum(stock) <= 0){ // ������� 0���� �۰ų� ������ 0
				nnActVsStk = 0;	
			}
			else {
				nnActVsStk = strToNum(stock) / strToNum(sales_mean_1week);
				nnActVsStk = Math.round(nnActVsStk*10)/10;
			}
			
			GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',nRow,nnActVsStk);
			
			//************************************************************************************
			//�����ʿ䷮ ������ ������ �⸻ �������(������) �ڵ���� �κ�.
			//������ �⸻ �������(������) = [(�������(������) + �����ʿ䷮(����) - �ǸŰ�ȹ(����))] + ������ �����ʿ䷮
			//							= ������ �������(������) + ������ �����ʿ䷮
			//************************************************************************************
			var nProdQty2 = GridObj.GetCellValue("PO_QTY2", nRow); //������ �����ʿ䷮.
			var stock2 = numberFormat(strToNum(stock) + strToNum(nProdQty2));
			
			GridObj.SetCellValue('EXPERT_STOCK3',nRow,stock2);
	
			//************************************************************************************
			//�����ʿ䷮ ������ ������ �⸻ �����������ϼ� �ڵ���� �κ�.
			//������ �⸻!! ���� ��� ��� �ϼ�(������) = [(������ �������(new)(������)+ ������ �����ʿ䷮) / 1�� ��� �Ǹ�].
			//										= ������ �⸻������� / 1�� ����Ǹ�
			//************************************************************************************		
			var nnActVsStk2;
			
			if(strToNum(sales_mean_1week) == 0 ){ //�ǸŰ�ȹ�� 0�̸� 999.
				nnActVsStk2 = 999;	
			}
			else if(strToNum(stock2) <= 0){ // ������� 0���� �۰ų� ������ 0
				nnActVsStk2 = 0;	
			}
			else {
				nnActVsStk2 = strToNum(stock2) / strToNum(sales_mean_1week);
				nnActVsStk2 = Math.round(nnActVsStk2*10)/10;
			}
			
			GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',nRow,nnActVsStk2);		

		}//������ �����ʿ䷮�� �������� ��� if �� ��!!!!!!!!!!!!!!!!!!!!!!!
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//�������� �����ʿ䷮�� ����������� ����!!!
		if(strColumnKey == "PO_QTY2"){

			//************************************************************************************
			//������!! �����ʿ䷮ ������ ������ �⸻ �������(������) �ڵ���� �κ�.
			//������ �⸻ �������(������) = [(�������(������) + �����ʿ䷮(����) - �ǸŰ�ȹ(����))] + ������ �����ʿ䷮(���̰�)
			//************************************************************************************
			var expert_stock = GridObj.GetCellValue("EXPERT_STOCK", nRow);	// �������(������)
			var nProdQty1 = GridObj.GetCellValue("PO_QTY1", nRow); 			// �����ʿ䷮(����)
			var n_sales_plan = GridObj.GetCellValue("N_SALES_PLAN", nRow);	// �ǸŰ�ȹ(����)
			var nProdQty2 = GridObj.GetCellValue("PO_QTY2", nRow); 			// �����ʿ䷮(������)
			
			var stock3 = strToNum(expert_stock) + strToNum(nProdQty1) - strToNum(n_sales_plan) + strToNum(nProdQty2);
			stock3 = numberFormat(stock3);

			GridObj.SetCellValue('EXPERT_STOCK3',nRow,stock3);

			//************************************************************************************
			//������!! �����ʿ䷮ ������ ������ �⸻ �����������ϼ� �ڵ���� �κ�.
			//������ �⸻!! ���� ��� ��� �ϼ�(������) = [(������ �������(new)(������) + ������ �����ʿ䷮(���̰�)) / 1�� ��� �Ǹ�]
			//************************************************************************************
			var sales_mean_1week = GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow); //1�� ����Ǹ�
			var nnActVsStk3;
			
			if(strToNum(sales_mean_1week) == 0 ){ //�ǸŰ�ȹ�� 0�̸� 999.
				nnActVsStk3 = 999;	
			}
			else if(strToNum(stock3) <= 0){ // ������� 0���� �۰ų� ������ 0
				nnActVsStk3 = 0;	
			}
			else {
				nnActVsStk3 = strToNum(stock3) / strToNum(sales_mean_1week);
				nnActVsStk3 = Math.round(nnActVsStk3*10)/10;
			}

			GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',nRow,nnActVsStk3);					

		}//�������� �����ʿ䷮�� ����������� if �� ��!!!!!!!!!!


		////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////
		//**************************************************************************
		//�Ұ� �� �Ѱ�κ� ó��!!!!
		//**************************************************************************
		
		/***********************************/
		/*�Ұ� ���ϱ�..���� ����κ�.
		/**********************************/
		//������ �ο��� ������������ ����!! ������������ �Ұ踦 ���ϱ����� �ʿ��� ����.
		var restpUp = GridObj.GetCellValue("RES_TP", nRow);
		
		var nTotPartProdQty = 0; //������ ���� �����ʿ䷮�� �Ұ踦 �����ϴ� ����.
		var nTotPartProdQty_comma = 0;
		var nTotPartNwkAdjQty = 0; //������ ���� �䱸 / ���� ������ �Ұ踦 �����ϴ� ����.
		var nTotPartNwkAdjQty_comma = 0;
		var nEptStk2 = 0; //������ ������ ������� �Ұ踦 �����ϴ� ����.
		var nEptStk2_comma = 0;
		var nNNPlanVsStk = 0; //������ ������ ��ȹ��� ����ϼ� �Ұ踦 �����ϴ� ����.
		var nNNPlanVsStk_comma = 0;
		var nNNActVsStk = 0; //������ ������ ������� ����ϼ� �Ұ踦 �����ϴ� ����
		var nNNActVsStk_comma = 0;
		
		var nTotPartProdQty2 = 0; //������ ������ �����ʿ䷮�� �Ұ踦 �����ϴ� ����.
		var nTotPartProdQty2_comma = 0;
		var nEptStk3 = 0; //������ ������ �⸻!! ������� �Ұ踦 �����ϴ� ����.
		var nEptStk3_comma = 0;
		var nNNNActVsStk3 = 0; //������ ������ �⸻!! ������� ����ϼ� �Ұ踦 �����ϴ� ����.
		var nNNNActVsStk3_comma = 0;
		
		/***********************************/
		/*�Ѱ� ���ϱ�..���� ����κ�.
		/**********************************/
		var nTotProdQty = 0; //������ ���� �����ʿ䷮�� �Ѱ踦 �����ϴ� ����.
		var nTotProdQty_comma = 0;
		var nTotNwkAdjQty = 0; //������ ���� �䱸 / ���� ������ �Ѱ踦 �����ϴ� ����.
		var nTotNwkAdjQty_comma = 0;
		var nTotEptStk2 = 0; //������ ������ ������� �Ѱ踦 �����ϴ� ����.
		var nTotEptStk2_comma = 0;
		var nTotNNPlanVsStk = 0; //������ ������ ��ȹ��� ����ϼ� �Ѱ踦 �����ϴ� ����.
		var nTotNNPlanVsStk_comma = 0;
		var nTotNNActVsStk = 0; //������ ������ ������� ����ϼ� �Ѱ踦 �����ϴ� ����
		var nTotNNActVsStk_comma = 0;
		
		var nTotProdQty2 = 0; //������ ������ �����ʿ䷮�� �Ѱ踦 �����ϴ� ����.
		var nTotProdQty2_comma = 0;
		var nTotEptStk3 = 0; //������ ������ �⸻!! ������� �Ѱ踦 �����ϴ� ����.
		var nTotEptStk3_comma = 0;
		var nTotNNNActVsStk3 = 0; //������ ������ �⸻!! ������� ����ϼ� �Ѱ踦 �����ϴ� ����.
		var nTotNNNActVsStk3_comma = 0;
	
// �Ѱ��� �����Ͱ� �ٲ��... ������
// 1. �� ���������� ��� ��ǰ�� ������ �����ؼ� ���Ѵ�.
// 2. �Ұ踦 update�Ѵ�.
// 3. �Ұ���� �����ؼ� ��� ���Ѵ�.
// 4. �Ѱ踦 update�Ѵ�.

		//1. �� ���������� ��� ��ǰ�� ������ �����ؼ� ���Ѵ�.
		for(var i = 0 ; i < row_cnt ; i++){

			//������������ �Ұ踦 �ű������ ����!
			if(GridObj.GetCellValue("RES_TP", i) == restpUp && GridObj.GetCellValue("ITEM_ID", i) != "�Ұ�" ){

				nTotPartProdQty = strToNum(nTotPartProdQty) + strToNum(GridObj.GetCellValue("PO_QTY1", i)); //���� �����ʿ䷮ �Ұ�
				nTotPartNwkAdjQty = strToNum(nTotPartNwkAdjQty) + strToNum(GridObj.GetCellValue("NWK_ADJ_QTY", i)); //���� �䱸/�������� �Ұ�
				nEptStk2 = strToNum(nEptStk2) + strToNum(GridObj.GetCellValue("EXPERT_STOCK2", i)); //������ ������� �Ұ�
				//alert("nEptStk2 : "+nEptStk2);
				nNNPlanVsStk = strToNum(nNNPlanVsStk) + strToNum(GridObj.GetCellValue("NN_PLAN_VS_STOCK_WORK", i)); //������ ��ȹ��� ����ϼ� �Ұ�.
				nNNActVsStk = strToNum(nNNActVsStk) + strToNum(GridObj.GetCellValue("NN_ACT_VS_STOCK_WORK", i)); //������ ������� ����ϼ� �Ұ�.
				
				nTotPartProdQty2 = strToNum(nTotPartProdQty2) + strToNum(GridObj.GetCellValue("PO_QTY2", i)); //������ �����ʿ䷮ �Ұ�.
				nEptStk3 = strToNum(nEptStk3) + strToNum(GridObj.GetCellValue("EXPERT_STOCK3", i)); //������ �⸻ ������� �Ұ�.
				nNNNActVsStk3 = strToNum(nNNNActVsStk3) + strToNum(GridObj.GetCellValue("NNN_ACT_VS_STOCK_WORK", i)); //������ �⸻!! ������� ����ϼ� �Ұ�.
			}
		}

		//2. �Ұ踦 update�Ѵ�.
		for(var i = 0 ; i < row_cnt ; i++){

			//������������ �Ұ踦 �ű������ ����!
			if(GridObj.GetCellValue("RES_TP", i) == restpUp && GridObj.GetCellValue("ITEM_ID", i) == "�Ұ�" ){

				//���� �����ʿ䷮ �Ұ� �κ� ���!
				nTotPartProdQty_comma = numberFormat(nTotPartProdQty); //�޸� ����ֱ�.
				GridObj.SetCellValue('PO_QTY1',i,nTotPartProdQty_comma);
				
				//���� �䱸/���� ������ �Ұ� �κ� ���!
				nTotPartNwkAdjQty_comma = numberFormat(nTotPartNwkAdjQty); //�޸� ����ֱ�.
				GridObj.SetCellValue('NWK_ADJ_QTY',i,nTotPartNwkAdjQty_comma);
				
				//������ ������� �Ұ� �κ� ���!
				nEptStk2_comma = numberFormat(nEptStk2); //�޸� ����ֱ�.
				GridObj.SetCellValue('EXPERT_STOCK2',i,nEptStk2_comma);
				
				//������ ��ȹ��� ����ϼ� �Ұ� �κ� ���!
				nNNPlanVsStk_comma = Math.round(nNNPlanVsStk*10)/10; //�޸� ����ֱ�.
				GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',i,nNNPlanVsStk_comma);
				
				//������ ������� ����ϼ� �Ұ� �κ� ���!
				nNNActVsStk_comma = Math.round(nNNActVsStk*10)/10; //�޸� ����ֱ�.
				GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',i,nNNActVsStk_comma);
				
				
				
				//������ �����ʿ䷮ �Ұ� �κ� ���!
				nTotPartProdQty2_comma = numberFormat(nTotPartProdQty2); //�޸� ����ֱ�.
				GridObj.SetCellValue('PO_QTY2',i,nTotPartProdQty2_comma);
				
				//������ �⸻!! ������� �Ұ� �κ� ���!
				nEptStk3_comma = numberFormat(nEptStk3); //�޸� ����ֱ�.
				GridObj.SetCellValue('EXPERT_STOCK3',i,nEptStk3_comma);
				
				//������ �⸻!! ������� ����ϼ� �Ұ� �κ� ���!
				nNNNActVsStk3_comma = Math.round(nNNNActVsStk3*10)/10; //�޸� ����ֱ�.
				GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',i,nNNNActVsStk3_comma);
			}
		}
			
		//3. �Ұ���� �����ؼ� ��� ���Ѵ�.
		for(var i = 0 ; i < row_cnt ; i++){

			if(GridObj.GetCellValue("ITEM_ID", i) == "�Ұ�"){
				nTotProdQty = strToNum(nTotProdQty) + strToNum(GridObj.GetCellValue("PO_QTY1", i)); //���� �����ʿ䷮ �Ѱ�
				nTotNwkAdjQty = strToNum(nTotNwkAdjQty) + strToNum(GridObj.GetCellValue("NWK_ADJ_QTY", i)); //���� �䱸/�������� �Ѱ�
				nTotEptStk2 = strToNum(nTotEptStk2) + strToNum(GridObj.GetCellValue("EXPERT_STOCK2", i)); //������ ������� �Ѱ�
				nTotNNPlanVsStk = strToNum(nTotNNPlanVsStk) + strToNum(GridObj.GetCellValue("NN_PLAN_VS_STOCK_WORK", i)); //������ ��ȹ��� ����ϼ� �Ѱ�.
				nTotNNActVsStk = strToNum(nTotNNActVsStk) + strToNum(GridObj.GetCellValue("NN_ACT_VS_STOCK_WORK", i)); //������ ������� ����ϼ� �Ѱ�.
				
				nTotProdQty2 = strToNum(nTotProdQty2) + strToNum(GridObj.GetCellValue("PO_QTY2", i)); //������ �����ʿ䷮ �Ѱ�.
				nTotEptStk3 = strToNum(nTotEptStk3) + strToNum(GridObj.GetCellValue("EXPERT_STOCK3", i)); //������ �⸻ ������� �Ѱ�.
				nTotNNNActVsStk3 = strToNum(nTotNNNActVsStk3) + strToNum(GridObj.GetCellValue("NNN_ACT_VS_STOCK_WORK", i)); //������ �⸻!! ������� ����ϼ� �Ѱ�.
			}
		}

		// 4. �Ѱ踦 update�Ѵ�.
		for(var i = 0 ; i < row_cnt ; i++){

			//�Ѱ踦 ���ϱ����� ���ǹ���.
			if(GridObj.GetCellValue("ITEM_NAME", i) == "�Ѱ�"){
				//���� �����ʿ䷮ �Ѱ� �κ� ���!
				//alert("nTotProdQty : "+nTotProdQty);
				nTotProdQty_comma = numberFormat(nTotProdQty); //�޸� ����ֱ�.
				GridObj.SetCellValue('PO_QTY1',i,nTotProdQty_comma);
				
				//���� �䱸/���� ������ �Ѱ� �κ� ���!
				nTotNwkAdjQty_comma = numberFormat(nTotNwkAdjQty); //�޸� ����ֱ�.
				GridObj.SetCellValue('NWK_ADJ_QTY',i,nTotNwkAdjQty_comma);
				
				//������ ������� �Ѱ� �κ� ���!
				nTotEptStk2_comma = numberFormat(nTotEptStk2); //�޸� ����ֱ�.
				GridObj.SetCellValue('EXPERT_STOCK2',i,nTotEptStk2_comma);
				
				//������ ��ȹ��� ����ϼ� �Ѱ� �κ� ���!
				nTotNNPlanVsStk_comma = Math.round(nTotNNPlanVsStk*10)/10; //�޸� ����ֱ�.
				GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',i,nTotNNPlanVsStk_comma);
				
				//������ ������� ����ϼ� �Ѱ� �κ� ���!
				nTotNNActVsStk_comma = Math.round(nTotNNActVsStk*10)/10; //�޸� ����ֱ�.
				GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',i,nTotNNActVsStk_comma);
				
				//������ �����ʿ䷮ �Ѱ� �κ� ���!
				nTotProdQty2_comma = numberFormat(nTotProdQty2); //�޸� ����ֱ�.
				GridObj.SetCellValue('PO_QTY2',i,nTotProdQty2_comma);
				
				//������ �⸻!! ������� �Ѱ� �κ� ���!
				nTotEptStk3_comma = numberFormat(nTotEptStk3); //�޸� ����ֱ�.
				GridObj.SetCellValue('EXPERT_STOCK3',i,nTotEptStk3_comma);
				
				//������ �⸻!! ������� ����ϼ� �Ѱ� �κ� ���!
				nTotNNNActVsStk3_comma = Math.round(nTotNNNActVsStk3*10)/10; //�޸� ����ֱ�.
				GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',i,nTotNNNActVsStk3_comma);				
			}
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
    	
    }  
	
	