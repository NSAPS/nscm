/*������������������������������������������������������������������������������������������
  ���� ��ư�� JOB_ID�� ����.
  ������������������������������������������������������������������������������������������*/    
    var job_id  = 'sc_01010_capaAssignMaterialCompare_list01'; //�޴� ���� Ŭ���� JOB_ID
    var job_id1 = 'sc_01010_capaAssignMaterialCompare_list01'; //A��ư Ŭ���� JOB_ID1
    var job_id1_1 = 'sc_01010_capaAssignMaterialCompare_list01_1'; //A��ư Ŭ���� JOB_ID1_1
    var job_id2 = 'sc_01010_capaAssignMaterialCompare_list02'; //B��ư Ŭ���� JOB_ID2
    var job_id2_1 = 'sc_01010_capaAssignMaterialCompare_list02_1'; //B��ư Ŭ���� JOB_ID2_1
    
    //document.cookie = "webfxtab_tabPane1=1";    

/*������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻���. 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������������������������������������������������������������������*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
       setHeader(GridObj);  //�ش�����
       //setDefault();
   }

   function init2() {
   	
       setProperty(GridObj2);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
       setHeader2(GridObj2);  //�ش�����
       //setDefault2();
   }


/*������������������������������������������������������������������������
  ����ư Ŭ���� ���� �Լ� ȣ��
  ������������������������������������������������������������������������*/   
   function btn_div(btn){
   	//alert(btn+"��ưŬ��!");
   	
   	B_Value = btn;
   	
   	if(btn == "A"){
   		setHeader(GridObj);
   		setHeader2(GridObj2);
   	}
   	if(btn == "B"){
   		setHeader(GridObj);
   		setHeader2(GridObj2);
   	}
   }


/*������������������������������������������������������������������������
  ����ư Ȱ��ȭ ��Ȱ��ȭ ����.
  ������������������������������������������������������������������������*/
  
	function display(str){
	    var form = document.all;
	    if(str=="A"){
	        form.btn1.disabled  = true;
	        form.btn2.disabled  = false;
	        form.item_list.disabled = true;
	    }if(str=="B"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = true;
             form.item_list.disabled = false;
	    }
    }
    
    
   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
   function setDefault()
   { 
        //�׸����� ��� Ŭ���� ���ñ�� Ȱ��ȭ. ��, �׷캴�ո�忡���� ����ϸ� �ȵ�.
    	//GridObj.strHDClickAction    = "sortsingle";
   }
       
       
       
/*������������������������������������������������������������������������
  ��version �޺��ڽ� ����,,,ǰ��..
  ������������������������������������������������������������������������*/
  //��ȹ���� �޺��ڽ� ���ÿ� ���� ǰ����� �޺��ڽ� ��ȭ. 1
   function versionCombo()
   { 
   		//alert("versionCombo ��Ǿ�!!");
   		var version1 = document.all.version1.value;
   		var version2 = document.all.version2.value;
   		var res_code = document.all.res_code.value;
   		
   		//alert("version1 : "+version1+"  version2 : "+version2+"   res_code : "+res_code);
   		//alert("version : "+version);
  	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("version1!%!version2!%!res_code", version1+"!%!"+version2+"!%!"+res_code , "sc_01010_capaAssignMaterialCompare_list_combo_item_list",versionComboResult);
   }   

/*������������������������������������������������������������������������
  ��version �޺��ڽ� ����,,,�����! ǰ��.
  ������������������������������������������������������������������������*/
  ////��ȹ���� �޺��ڽ� ���ÿ� ���� ǰ����� �޺��ڽ� ��ȭ. 2
   function versionComboResult(result)
   {
       var comboRs = '';
       
       //alert("result : "+ result);
       //alert("result length : " + result.length);
       
       //�޺��ڽ��� �⺻���� ���� �ɼ� ��. All
	   document.all.item_list.options[0] = new Option("All","");
	   
	   //�޺����� �ɼ� ������ �ʱ�ȭ! ��, ALL�� ���̰� �ϱ����� 1.
	   document.all.item_list.options.length = 1;
	   
       for( var i=1 ;i<result.length+1 ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
           //             0         1
           //comboRs [item_id, item_name] ���� �����.
           comboRs = result[i-1].split('!%!');
           //alert("comboRS : "+comboRs);
           
           document.all.item_list.options[i] = null; // option �ʱ�ȭ
           
           //                                                item_name , item_id
           //                                                  text��,     value��
           //document.all.item_list.options[i] = new Option(result[i],result[i-1]);
           document.all.item_list.options[i] = new Option(comboRs[1],comboRs[0]);           
       }       	
   }

  
  
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
   
   function setHeader(GridObj) 
   {
   	
   		//�޴�Ŭ���� �⺻���� Ÿ�� ��.
   		if(B_Value == "Z"){
   		//�޺��ڽ� ��Ȱ��ȭ..
   		document.all.item_list.disabled = true;
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   		}   	
		//��ư�� Ŭ���� ���� ��� ���� ȣ��!   	
   	    if(B_Value == "A"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader);
   	    }
   }


   function setHeader2(GridObj2) 
   {
   	
   		//�޴�Ŭ���� �⺻���� Ÿ�� ��.
   		if(B_Value == "Z"){
   		//�޺��ڽ� ��Ȱ��ȭ..
   		//document.all.item_list.disabled = true;
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id1_1 , "gird_header_list",defaultHeader2);
   		}   	
		//��ư�� Ŭ���� ���� ��� ���� ȣ��!   	
   	    if(B_Value == "A"){
	   	   GridObj2.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1_1 , "gird_header_list",defaultHeader2);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj2.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2_1 , "gird_header_list",defaultHeader2);
   	    }
   }



/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/

   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
		
		if(B_Value == "A"){
			GridObj.AddGroup("CAPA1", "���� CAPA");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//���� CAPA ����
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//���� CAPA ����
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//���� CAPA �ݾ�
			
			GridObj.AddGroup("CAPA2", "CAPA ����");		//�׸��忡 �׷��� ����Ѵ�.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA ���� ����
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA ���� ����
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA ���� �ݾ�
		}
		
		if(B_Value == "B"){
			GridObj.AddGroup("CAPA1", "���� CAPA");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//���� CAPA ����
			GridObj.AppendHeader("CAPA1", "NC_EA");		//���� CAPA �ļ�
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//���� CAPA ����
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//���� CAPA �ݾ�
			
			GridObj.AddGroup("CAPA2", "CAPA ����");		//�׸��忡 �׷��� ����Ѵ�.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA ���� ����
			GridObj.AppendHeader("CAPA2", "CA_EA");		//CAPA ���� �ļ�
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA ���� ����
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA ���� �ݾ�
		}

		//�޴�Ŭ���� ����Ʈ ��� �׷� ����.
		if(B_Value == "Z"){
			GridObj.AddGroup("CAPA1", "���� CAPA");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//���� CAPA ����
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//���� CAPA ����
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//���� CAPA �ݾ�
			
			GridObj.AddGroup("CAPA2", "CAPA ����");		//�׸��忡 �׷��� ����Ѵ�.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA ���� ����
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA ���� ����
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA ���� �ݾ�
		}
		


	   //alert("GRidObj.....�ٿ�� ��!");
	   GridObj.BoundHeader();

         //Hidden �÷�
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }



   function defaultHeader2(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
           arrHeader = result[i].split('!%!');
           GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
		
		if(B_Value == "A"){
			GridObj2.AddGroup("CAPA1", "���� CAPA");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//���� CAPA ����
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//���� CAPA ����
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//���� CAPA �ݾ�
			
			GridObj2.AddGroup("CAPA2", "CAPA ����");		//�׸��忡 �׷��� ����Ѵ�.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA ���� ����
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA ���� ����
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA ���� �ݾ�
		}
		
		if(B_Value == "B"){
			GridObj2.AddGroup("CAPA1", "���� CAPA");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//���� CAPA ����
			GridObj2.AppendHeader("CAPA1", "NC_EA");		//���� CAPA �ļ�
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//���� CAPA ����
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//���� CAPA �ݾ�
			
			GridObj2.AddGroup("CAPA2", "CAPA ����");		//�׸��忡 �׷��� ����Ѵ�.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA ���� ����
			GridObj2.AppendHeader("CAPA2", "CA_EA");		//CAPA ���� �ļ�
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA ���� ����
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA ���� �ݾ�
		}

		//�޴�Ŭ���� ����Ʈ ��� �׷� ����.
		if(B_Value == "Z"){
			GridObj2.AddGroup("CAPA1", "���� CAPA");		//�׸��忡 �׷��� ����Ѵ�. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//���� CAPA ����
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//���� CAPA ����
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//���� CAPA �ݾ�
			
			GridObj2.AddGroup("CAPA2", "CAPA ����");		//�׸��忡 �׷��� ����Ѵ�.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA ���� ����
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA ���� ����
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA ���� �ݾ�
		}
		


	   //alert("GRidObj.....�ٿ�� ��!");
	   GridObj2.BoundHeader();

         //Hidden �÷�
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery2();
   }


             
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
       doQuery();
       doQuery2();
   }
  
  
  
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSave  (service)
   {
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
    	if(B_Value == "A"){
    		
    	}
    	else if(B_Value == "B"){
    		
    	}
    }


/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
   	   //�޴� Ŭ���� �⺻ ����
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       }
       
       //��ư�� ���� JOB ID ����.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2;
       }
       
       var version1 = document.all.version1.value;
       var version2 = document.all.version2.value;
       var res_code = document.all.res_code.value;
       var item_list = document.all.item_list.value;
       var factory = document.all.factory.value;
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);
       //alert("item_list : "+item_list);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version1", version1);
       GridObj.SetParam("version2", version2);
       GridObj.SetParam("res_code", res_code);
       GridObj.SetParam("item_list", item_list);
       GridObj.SetParam("factory", factory);
       
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj.DoQuery(servlet_url);
   }





   function doQuery2() 
   {
   	   //�޴� Ŭ���� �⺻ ����
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1_1;
       }
       
       //��ư�� ���� JOB ID ����.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1_1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2_1;
       }
       
       var version1 = document.all.version1.value;
       var version2 = document.all.version2.value;
       var res_code = document.all.res_code.value;
       var item_list = document.all.item_list.value;
       var factory = document.all.factory.value;
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);
       //alert("item_list : "+item_list);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj2.SetParam("mode", "search");
       GridObj2.SetParam("version1", version1);
       GridObj2.SetParam("version2", version2);
       GridObj2.SetParam("res_code", res_code);
       GridObj2.SetParam("item_list", item_list);
       GridObj2.SetParam("factory", factory);
       
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj2.DoQuery(servlet_url);
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
            	//A��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "A"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj.strHDClickAction    = "select";
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'CAT06_NAME', 'sum', 'NC_QTY,NC_RATE,NC_AMOUNT,CA_QTY,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '�Ѱ�', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false);  
	                
	                
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('CAT06','center');
	                GridObj.SetColCellAlign('CAT06_NAME','left');
	                GridObj.SetColCellAlign('PLANT_ID','center');
	                GridObj.SetColCellAlign('PLANT_NAME','center');
	                GridObj.SetColCellAlign('NC_QTY','right');
	                GridObj.SetColCellAlign('NC_RATE','right');
	                GridObj.SetColCellAlign('NC_AMOUNT','right');
	                GridObj.SetColCellAlign('CA_QTY','right');
	                GridObj.SetColCellAlign('CA_RATE','right');
	                GridObj.SetColCellAlign('CA_AMOUNT','right');
	                
	                //number���� ����!
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                /*
	                GridObj.SetColCellSortEnable('cat06',true)
	                GridObj.SetColCellSortEnable('cat06_name',true)
	                GridObj.SetColCellSortEnable('item_id',true)
	                GridObj.SetColCellSortEnable('item_name',true)
	                GridObj.SetColCellSortEnable('spec',true)
	                GridObj.SetColCellSortEnable('gubun',true)
	                GridObj.SetColCellSortEnable('anyang',true)
	                GridObj.SetColCellSortEnable('anseong',true)
	                GridObj.SetColCellSortEnable('anseong_u',true)
	                GridObj.SetColCellSortEnable('asan',true)
	                GridObj.SetColCellSortEnable('gumi',true)
	                GridObj.SetColCellSortEnable('busan',true)
	                GridObj.SetColCellSortEnable('noksan',true)
	                GridObj.SetColCellSortEnable('total',true)
	                */
	                
	                

	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	//gridColSet(GridObj);
                	
            	}
            	//B��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "B"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj.strHDClickAction    = "select";
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME,ITEM_ID,ITEM_NAME");
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'ITEM_NAME', 'sum', 'NC_QTY,NC_EA,NC_RATE,NC_AMOUNT,CA_QTY,CA_EA,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'CAT06_NAME', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY3', '�Ѱ�', 'summaryall', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '109|214|109');
					GridObj.SetSummaryBarColor('SUMMARY3', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false);
					GridObj.SetSummaryBarFont('SUMMARY3', '����', '10', true, false, false, false);  	                
	                
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('CAT06','center');
	                GridObj.SetColCellAlign('CAT06_NAME','left');
	                GridObj.SetColCellAlign('ITEM_ID','left');
	                GridObj.SetColCellAlign('ITEM_NAME','left');
	                GridObj.SetColCellAlign('SPEC','left');
	                GridObj.SetColCellAlign('PLANT_ID','center');
	                GridObj.SetColCellAlign('PLANT_NAME','center');
	                GridObj.SetColCellAlign('NC_QTY','right');
	                GridObj.SetColCellAlign('NC_EA','right');
	                GridObj.SetColCellAlign('NC_RATE','right');
	                GridObj.SetColCellAlign('NC_AMOUNT','right');
	                GridObj.SetColCellAlign('CA_QTY','right');
	                GridObj.SetColCellAlign('CA_EA','right');
	                GridObj.SetColCellAlign('CA_RATE','right');
	                GridObj.SetColCellAlign('CA_AMOUNT','right');
	                
	                //number���� ����!
	                
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_EA','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_EA','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	//gridColSet(GridObj);
	                
            	}
            	
            	//�޴� Ŭ���� �⺻ ����.
            	if(B_Value == "Z"){

	           		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj.strHDClickAction    = "select";
	            		
	                //�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'CAT06_NAME', 'sum', 'NC_QTY,NC_RATE,NC_AMOUNT,CA_QTY,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '�Ѱ�', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false);                
                
                
                //���� ������ ����
	                GridObj.SetColCellAlign('CAT06','center');
	                GridObj.SetColCellAlign('CAT06_NAME','left');
	                GridObj.SetColCellAlign('PLANT_ID','center');
	                GridObj.SetColCellAlign('PLANT_NAME','center');
	                GridObj.SetColCellAlign('NC_QTY','right');
	                GridObj.SetColCellAlign('NC_RATE','right');
	                GridObj.SetColCellAlign('NC_AMOUNT','right');
	                GridObj.SetColCellAlign('CA_QTY','right');
	                GridObj.SetColCellAlign('CA_RATE','right');
	                GridObj.SetColCellAlign('CA_AMOUNT','right');
	                
	                //number���� ����!
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
                
                //�׸��� �÷� ���� �Լ� ȣ��.
                //gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
        }
    }





    function GridEndQuery2()
    {
        var mode = GridObj2.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj2.GetStatus() == "true") 
            {
            	//A��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "A"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj2.strHDClickAction    = "select";
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '�Ѱ�', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false);  
	                
	                
	                
	                //���� ������ ����
	                GridObj2.SetColCellAlign('CAT06','center');
	                GridObj2.SetColCellAlign('CAT06_NAME','left');
	                GridObj2.SetColCellAlign('PLANT_ID','center');
	                GridObj2.SetColCellAlign('PLANT_NAME','center');
	                GridObj2.SetColCellAlign('NC_QTY','right');
	                GridObj2.SetColCellAlign('NC_RATE','right');
	                GridObj2.SetColCellAlign('NC_AMOUNT','right');
	                GridObj2.SetColCellAlign('CA_QTY','right');
	                GridObj2.SetColCellAlign('CA_RATE','right');
	                GridObj2.SetColCellAlign('CA_AMOUNT','right');
	                
	                //number���� ����!
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                /*
	                GridObj.SetColCellSortEnable('cat06',true)
	                GridObj.SetColCellSortEnable('cat06_name',true)
	                GridObj.SetColCellSortEnable('item_id',true)
	                GridObj.SetColCellSortEnable('item_name',true)
	                GridObj.SetColCellSortEnable('spec',true)
	                GridObj.SetColCellSortEnable('gubun',true)
	                GridObj.SetColCellSortEnable('anyang',true)
	                GridObj.SetColCellSortEnable('anseong',true)
	                GridObj.SetColCellSortEnable('anseong_u',true)
	                GridObj.SetColCellSortEnable('asan',true)
	                GridObj.SetColCellSortEnable('gumi',true)
	                GridObj.SetColCellSortEnable('busan',true)
	                GridObj.SetColCellSortEnable('noksan',true)
	                GridObj.SetColCellSortEnable('total',true)
	                */
	                
	                

	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	//gridColSet(GridObj);
                	
            	}
            	//B��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "B"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj2.strHDClickAction    = "select";
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME,ITEM_ID,ITEM_NAME");
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '�Ѱ�', 'summaryall', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false);  	                
	                
	                
	                //���� ������ ����
	                GridObj2.SetColCellAlign('CAT06','center');
	                GridObj2.SetColCellAlign('CAT06_NAME','left');
	                GridObj2.SetColCellAlign('ITEM_ID','left');
	                GridObj2.SetColCellAlign('ITEM_NAME','left');
	                GridObj2.SetColCellAlign('SPEC','left');
	                GridObj2.SetColCellAlign('PLANT_ID','center');
	                GridObj2.SetColCellAlign('PLANT_NAME','center');
	                GridObj2.SetColCellAlign('NC_QTY','right');
	                GridObj2.SetColCellAlign('NC_EA','right');
	                GridObj2.SetColCellAlign('NC_RATE','right');
	                GridObj2.SetColCellAlign('NC_AMOUNT','right');
	                GridObj2.SetColCellAlign('CA_QTY','right');
	                GridObj2.SetColCellAlign('CA_EA','right');
	                GridObj2.SetColCellAlign('CA_RATE','right');
	                GridObj2.SetColCellAlign('CA_AMOUNT','right');
	                
	                //number���� ����!
	                
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_EA','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_EA','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	//gridColSet(GridObj);
	                
            	}
            	
            	//�޴� Ŭ���� �⺻ ����.
            	if(B_Value == "Z"){

	           		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj2.strHDClickAction    = "select";
	            		
	                //�����͸� �׷��� �Ѵ�.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '�Ѱ�', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false);               
                
                
                //���� ������ ����
	                GridObj2.SetColCellAlign('CAT06','center');
	                GridObj2.SetColCellAlign('CAT06_NAME','left');
	                GridObj2.SetColCellAlign('PLANT_ID','center');
	                GridObj2.SetColCellAlign('PLANT_NAME','center');
	                GridObj2.SetColCellAlign('NC_QTY','right');
	                GridObj2.SetColCellAlign('NC_RATE','right');
	                GridObj2.SetColCellAlign('NC_AMOUNT','right');
	                GridObj2.SetColCellAlign('CA_QTY','right');
	                GridObj2.SetColCellAlign('CA_RATE','right');
	                GridObj2.SetColCellAlign('CA_AMOUNT','right');
	                
	                //number���� ����!
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
                
                //�׸��� �÷� ���� �Լ� ȣ��.
                //gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj2.GetMessage(); 
                alert(error_msg);            
            }
        }
    }
    
    


    
/*������������������������������������������������������������������������
  ����ȸ ��ư Ŭ���� ����.
  ������������������������������������������������������������������������*/
GoSearch = function() {

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	//alert("hllo");
	doQuery();
	doQuery2();
};



   
/*������������������������������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������������������������������*/
   
//   function GridChangeCell(strColumnKey, nRow) 
//   {
       /*
       if(strColumnKey != "SELECTED") {
           //??? ? SELECTED ?? ??? ??? ?? ???. 
           GridObj.SetCellValue("SELECTED", nRow, "1");
       }
       */
 //  }    
    

   
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
  ��getdatetime
  ������������������������������������������������������������������������*/
   function getdatetime() {
       var today = new Date();
       var year = today.getYear();
       var month = today.getMonth() + 1;
       var day = today.getDate();
       
       if(month < 10)
           month = "0" + month;
           
       if(day < 10)
           day = "0" + day;
   
       document.frm.to_date.value = year + "" + month + "" + day;
   }
   

  
  

           


/*������������������������������������������������������������������������
  ��MOUSE OVER ��, ROW ���� ��ȯ
  ������������������������������������������������������������������������*/
function GridMouseOver(strType, strColumnKey, nRow){
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
}


/*������������������������������������������������������������������������
  ��MOUSE OUT ��, ROW ���� ����
  ������������������������������������������������������������������������*/
function GridMouseOut(strType, strColumnKey, nRow){
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
}




 /*������������������������������������������������������������������������
   ���׸��� �÷� Set �÷� �����ϱ�!!
   ������������������������������������������������������������������������*/
    function gridColSet(obj)
    {
    	//���� �׸����� �� �ο� ����.
        var rowLeng = obj.GetRowCount();
        var colBGColor='255|255|255';
	}






// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}


// enter check �� 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// �ڱ�ȭ�� ����
	//		GoSearch();
		}
	} 
}





/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
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
	document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
	document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
}     


