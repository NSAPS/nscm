	//var mode;													// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
	var class_path = "com.wisegrid.admin.";						// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
	var job_id = 'rp_01160_replenishmentNiceLikePlan';				// job id(憮綰葩 貲, WiseGrid Header key)
	var GridObj ; 												// WiseGrid 偌羹
	var GridObj2;
	
	var job_id = 'sc_12020_dailySemifinishedProductPlanAnalysis_psi';
	var headerCount=0;
    
  	var GridHeaderString = "";

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function init() {
   		GridObj = document.WiseGrid;
   		
       setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
       setDefault();        //�飛� 晦獄 撲薑 
       setHeader(GridObj);  //п渦儅撩 
   }
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function init2() {
       GridObj2 = document.WiseGrid2;
       setProperty(GridObj2); //WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
   }       
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function setDefault()
   {

		GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'       
   
   }

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  弛-.fnc:п渦蒂 陛螳螃朝 唸婁高檜 return腎賊 ��轎腎朝 Fnc貲
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function setHeader(GridObj) 
   {        
       commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
           GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
       }
       
       commonUtil.getCodeList("", "" , "daily_header",headerResult); //陳瞼⑽ п渦蒂 虜菟橫 遽棻.
   }     
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陳瞼 ⑽鷓曖 п渦縑 貲擊 儅撩и棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function headerResult(result)
   {
       var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
       var dayCount  = 1;  //陳瞼 牖嬪
       if(document.all.checked_weekly[0].checked) weekNo=1;
       if(document.all.checked_weekly[1].checked) weekNo=2;
       if(document.all.checked_weekly[2].checked) weekNo=3;
       
       headerCount=result.length;       
       
       for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
            if( result[i].substr(0,1)==weekNo) //�飛橦� 摹鷗脹 輿離縑 渠и 匙虜 瑣替棻.
            {
                dateArray = '';
                dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
                
                //п渦 斜瑜儅撩
                GridObj.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //陳瞼 斜瑜
                GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
                GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
                GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 

                GridObj2.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //陳瞼 斜瑜
                GridObj2.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
                GridObj2.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
                GridObj2.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 

                dayCount++;
            } 
       }
       GridObj.BoundHeader()    
       GridObj2.BoundHeader()    

       GridObj.SetColHide("CRUD", true);
       GridObj.SetColHide("PLANT_ID", true);
       GridObj.SetColHide("LINE_ID", true);
       GridObj.SetColHide("PROD_VER", true);
       GridObj.SetColHide("SEQ", true);
       GridObj.SetColHide("WEEK_START_DATE", true);
       GridObj.SetColHide("VERSION", true);
       GridObj.SetColHide("PROC_ID", true);
       GridObj.SetColHide("BG01A", true);  GridObj.SetColHide("BG02A", true);  GridObj.SetColHide("BG03A", true);  GridObj.SetColHide("BG04A", true);  GridObj.SetColHide("BG05A", true);  GridObj.SetColHide("BG06A", true);  GridObj.SetColHide("BG07A", true);
       GridObj.SetColHide("BG01B", true);  GridObj.SetColHide("BG02B", true);  GridObj.SetColHide("BG03B", true);  GridObj.SetColHide("BG04B", true);  GridObj.SetColHide("BG05B", true);  GridObj.SetColHide("BG06B", true);  GridObj.SetColHide("BG07B", true);
       GridObj.SetColHide("BG01C", true);  GridObj.SetColHide("BG02C", true);  GridObj.SetColHide("BG03C", true);  GridObj.SetColHide("BG04C", true);  GridObj.SetColHide("BG05C", true);  GridObj.SetColHide("BG06C", true);  GridObj.SetColHide("BG07C", true);
       GridObj.SetColHide("BGCOLOR", true);
       GridObj.SetColFix('DIV_NAME');
       GridObj.SetColCellAlign('W3_DEMAND_QTY','right') ;
       
       GridObj2.SetColHide("CRUD", true);
       GridObj2.SetColHide("PLANT_ID", true);
       GridObj2.SetColHide("LINE_ID", true);
       GridObj2.SetColHide("LINE_NAME", true);
       GridObj2.SetColHide("PROD_VER", true);
       GridObj2.SetColHide("SEQ", true);
       GridObj2.SetColHide("WEEK_START_DATE", true);
       GridObj2.SetColHide("VERSION", true);
       GridObj2.SetColHide("PROC_ID", true);
       GridObj2.SetColHide("IDX", true);
       GridObj2.SetColHide("SEMI_ITEM_ID", true);
       GridObj2.SetColHide("ITEM_NAME", true);
       GridObj2.SetColHide("BG01A", true);  GridObj2.SetColHide("BG02A", true);  GridObj2.SetColHide("BG03A", true);  GridObj2.SetColHide("BG04A", true);  GridObj2.SetColHide("BG05A", true);  GridObj2.SetColHide("BG06A", true);  GridObj2.SetColHide("BG07A", true);
       GridObj2.SetColHide("BG01B", true);  GridObj2.SetColHide("BG02B", true);  GridObj2.SetColHide("BG03B", true);  GridObj2.SetColHide("BG04B", true);  GridObj2.SetColHide("BG05B", true);  GridObj2.SetColHide("BG06B", true);  GridObj2.SetColHide("BG07B", true);
       GridObj2.SetColHide("BG01C", true);  GridObj2.SetColHide("BG02C", true);  GridObj2.SetColHide("BG03C", true);  GridObj2.SetColHide("BG04C", true);  GridObj2.SetColHide("BG05C", true);  GridObj2.SetColHide("BG06C", true);  GridObj2.SetColHide("BG07C", true);
       GridObj2.SetColHide("BGCOLOR", true);
       GridObj2.SetColFix('IDX');

   }
  
  
  
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {                   
       doQuery();
   }
  
  
  
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSave  (service)
   {
       var len = document.frm.selected_plant.length;
       var str = "";
       var cnt = 0;
       for( i = 0 ; i < len ; i++)
       {
           if( document.frm.selected_plant[i].checked == true )
           {
               if( cnt > 0 ) str += "','";
               str += document.frm.selected_plant[i].value;		
               cnt++;	
           }
       }		
       if( cnt == 0 )
       {
           alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
           return;
       }

       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       if(document.all.checked_weekly[0].checked) weekNo='w0';
       if(document.all.checked_weekly[1].checked) weekNo='w1';
       if(document.all.checked_weekly[2].checked) weekNo='w2';
    
        //WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
        GridObj.SetParam("mode", "save");
        GridObj.Setparam("plant_name",str);
        GridObj.SetParam("checked_weekly",weekNo);
        GridObj.SetParam("_user_id",document.all._user_id.value);
    
        //WiseGrid陛 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖и
        GridObj.DoQuery(servlet_url, "CRUD");
   }
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '啗骯'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doCal()
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
        //WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
        GridObj.SetParam("mode", "cal");
        GridObj.SetParam("_user_id",document.all._user_id.value);
    
        //WiseGrid陛 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖и
        GridObj.DoQuery(servlet_url, "CRUD");
   }   
   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var len = document.frm.selected_plant.length;
       var str = "";
       var cnt = 0;
       for( i = 0 ; i < len ; i++)
       {
           if( document.frm.selected_plant[i].checked == true )
           {
               if( cnt > 0 ) str += "','";
               str += document.frm.selected_plant[i].value;		
               cnt++;	
           }
       }		
       if( cnt == 0 )
       {
           alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
           return;
       }
       
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       if(document.all.checked_weekly[0].checked) weekNo='w0';
       if(document.all.checked_weekly[1].checked) weekNo='w1';
       if(document.all.checked_weekly[2].checked) weekNo='w2';
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.Setparam("plant_name",str);
       GridObj.SetParam("checked_weekly",weekNo);
       GridObj.SetParam("mode", "search");
       GridObj.DoQuery(servlet_url);
       
       commonUtil.getCodeList("", "" , "daily_header",changeHeader); //陳瞼⑽ п渦蒂 虜菟橫 遽棻.
       
       //GridObj.ClearGrid();
       //GridObj2.ClearGrid();
       
       //setHeader(GridObj);  //п渦儅撩         
   }
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦蒂 滲唳ж朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function changeHeader(result)
   {
       var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
       var dayCount  = 1;  //陳瞼 牖嬪
       if(document.all.checked_weekly[0].checked) weekNo=1;
       if(document.all.checked_weekly[1].checked) weekNo=2;
       if(document.all.checked_weekly[2].checked) weekNo=3;
       
       headerCount=result.length;       
       
       for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
            if( result[i].substr(0,1)==weekNo) //�飛橦� 摹鷗脹 輿離縑 渠и 匙虜 瑣替棻.
            {
                dateArray = '';
                dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
                
                GridObj.SetGroupHDText("GRP_DATE"+dayCount ,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')') 
                GridObj2.SetGroupHDText("GRP_DATE"+dayCount ,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')') 
                dayCount++;
            } 
       }       
       
       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery2() 
   {
       var len = document.frm.selected_plant.length;
       var str = "";
       var cnt = 0;
       for( i = 0 ; i < len ; i++)
       {
           if( document.frm.selected_plant[i].checked == true )
           {
               if( cnt > 0 ) str += "','";
               str += document.frm.selected_plant[i].value;		
               cnt++;	
           }
       }		
       if( cnt == 0 )
       {
           alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
           return;
       }   

       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       if(document.all.checked_weekly[0].checked) weekNo='w0';
       if(document.all.checked_weekly[1].checked) weekNo='w1';
       if(document.all.checked_weekly[2].checked) weekNo='w2';
       

       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       GridObj2.Setparam("plant_name",str);
       GridObj2.SetParam("checked_weekly",weekNo);
       GridObj2.SetParam("mode", "search2");
       GridObj2.DoQuery(servlet_url);
   }

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 等檜攪陛 滲唳 腎歷擊 唳辦 籀葬腎朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GridChangeCell(strColumnKey, nRow) 
   {
   }    
    
    
 
 
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() 
    { 
        
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
        var rowLeng = GridObj.GetRowCount();
        
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {                           
                GridObj.SetGroupMerge("PLANT_NAME,LINE_NAME,SEMI_ITEM_ID,ITEM_NAME,W3_DEMAND_QTY");                                                    
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
            
            GridValueSetting(GridObj);
            
            if(document.all.colColor.checked) //斜葬萄 儀掘碟檜 ル晦脹 唳辦縑虜 轎溘и棻.
                gridColSet(GridObj);
            
           doQuery2();

        }                                 

        if(mode == "save") //盪濰檜 諫猿腎賊
        {
            doQuery() ;
        }
    }
 
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄 等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery2() 
    { 
        
        var mode = GridObj2.GetParam("mode");
        var error_msg = '';
        var rowLeng = GridObj2.GetRowCount();
        
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search2") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj2.GetStatus() == "true") 
            {                           
                GridObj2.SetGroupMerge("PLANT_NAME,LINE_NAME,SEMI_ITEM_ID");                                                    
            }

            GridValueSetting(GridObj2);
            if(document.all.colColor.checked) //斜葬萄 儀掘碟檜 ル晦脹 唳辦縑虜 轎溘и棻.
            gridColSet(GridObj2);            
        }

    }
    
    
 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 Set
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function gridColSet(obj)
    {
        var rowLeng = obj.GetRowCount();
        if( document.all.colColor.checked && rowLeng!=0)
        {
            var plant_id='';
            var line_id = '';
            var item_id ='';
            var colBGColor='255|255|255';
            var colItemBGColor = '255|255|255';
            var work_allocation= new Array();
            var shift_qty      = new Array();
            
            plant_id= obj.GetCellValue('PLANT_ID',0);
            line_id = obj.GetCellValue('LINE_ID',0);
            item_id = obj.GetCellValue('SEMI_ITEM_ID',0);
    
            for( var row=0 ; row<rowLeng ; row++ ) //row熱虜躑 奩犒
            {
                
                //嬴檜蠱 滌煎 鏽歲 寡唳儀擊 掘碟и棻.
                colItemBGColor = obj.GetCellValue('BGCOLOR',row);
                obj.SetCellBgColor('ITEM_NAME', row, colItemBGColor) ;
                
                if(obj.GetCellValue('SEQ',row) != '2' ) //熱薑腎朝 Row陛 嬴棋夠擎 綠�側瘓� и棻.
                {
                    for( var col=1 ;col<=7 ;col++) //爾薑 碳陛и 鏽歲擊 掘碟и棻.
                    {                                                                                        
                        obj.SetCellActivation("D0"+col+"A", row, 'activatenoedit');                             
                        obj.SetCellActivation("D0"+col+"B", row, 'activatenoedit'); 
                        obj.SetCellActivation("D0"+col+"C", row, 'activatenoedit'); 
                    }
                    //seq陛 2嬴棍 唳辦 橾陽 BOX_QTY 爾薑 碳陛
                    obj.SetCellActivation("IDX", row, 'activatenoedit');  
					if(obj.GetCellValue('SEQ',row) == '1') {
						for( var col=1 ;col<=7 ;col++) //爾薑陛棟 鏽歲擎 旋噢蒂 掉啪и棻.
                        {
                            obj.SetCellFontBold("D0"+col+"A", row, 'true');  
                            obj.SetCellFontBold("D0"+col+"B", row, 'true'); 
                            obj.SetCellFontBold("D0"+col+"C", row, 'true'); 
                        }
					}
					
                } else {
                    for( var col=1 ;col<=7 ;col++) //爾薑陛棟 鏽歲擎 旋噢蒂 掉啪и棻.
                    {
                        obj.SetCellFontBold("D0"+col+"A", row, 'true');  
                        obj.SetCellFontBold("D0"+col+"B", row, 'true'); 
                        obj.SetCellFontBold("D0"+col+"C", row, 'true'); 
                    }
                    //seq陛 2橾 唳辦 BOX_QTY 爾薑 晦棟 ル晦(掉擎儀 旋噢)
                    obj.SetCellFontBold(  "IDX", row, 'true');    
                }
                
                //Row 欽嬪煎鏽歲寡唳儀擊 掘碟и棻.
                if(plant_id != obj.GetCellValue('PLANT_ID',row) || line_id != obj.GetCellValue('LINE_ID',row) || item_id != obj.GetCellValue('SEMI_ITEM_ID',row))
                {
                    plant_id= obj.GetCellValue('PLANT_ID',row);
                    line_id = obj.GetCellValue('LINE_ID' ,row);
                    item_id = obj.GetCellValue('SEMI_ITEM_ID' ,row);
                    
                    if(colBGColor=='255|255|255') colBGColor='233|233|233';
                    else                          colBGColor='255|255|255';
                }
                
                obj.SetCellBgColor('DIV_NAME', row, colBGColor) ;
                obj.SetCellBgColor('IDX', row, colBGColor) ;
                obj.SetCellBgColor('W3_DEMAND_QTY', row, colBGColor) ;
                
                for( var col=1 ;col<=7 ;col++) 
                {
                	  //ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
                    
                    if(obj.GetCellValue('SEQ',row) == '2')
                    {
                        obj.SetCellBgColor('D0'+col+'A', row, '255|250|205') ;
                        obj.SetCellBgColor('D0'+col+'B', row, '255|250|205') ;
                        obj.SetCellBgColor('D0'+col+'C', row, '255|250|205') ;
                        
                    } else 
                    {
                        obj.SetCellBgColor('D0'+col+'A', row, colBGColor) ;
                        obj.SetCellBgColor('D0'+col+'B', row, colBGColor) ;
                        obj.SetCellBgColor('D0'+col+'C', row, colBGColor) ;
                    }

                    //援啗陛 曄熱檜賊 だ塢儀, 擠熱檜賊 碩擎儀戲煎 ル晦и棻.
                    if(obj.GetCellValue('SEQ',row)=='4') {
    					if(obj.GetCellValue('D0'+col+'A',row) <'0') {
							obj.SetCellFgColor('D0'+col+'A', row, '255|10|10');
						}
						else {
							obj.SetCellFgColor('D0'+col+'A', row, '10|10|255');
						}
    					if(obj.GetCellValue('D0'+col+'B',row) <'0') {
							obj.SetCellFgColor('D0'+col+'B', row, '255|10|10');
						}
						else {
							obj.SetCellFgColor('D0'+col+'B', row, '10|10|255');
						}
						if(obj.GetCellValue('D0'+col+'C',row) <'0') {
							obj.SetCellFgColor('D0'+col+'C', row, '255|10|10');
						}
						else {
							obj.SetCellFgColor('D0'+col+'C', row, '10|10|255');
						}
					}					
					if(obj.GetCellValue('SEQ',row)=='1')	// 賊儅骯 儀梃
                    {
						obj.SetCellFgColor('D0'+col+'A', row, '0|222|0');                         
                        obj.SetCellFgColor('D0'+col+'B', row, '0|222|0');                         
                        obj.SetCellFgColor('D0'+col+'C', row, '0|222|0'); 
                    } 
                    else if(obj.GetCellValue('SEQ',row)=='3')	// 蝶Щ衝熱 儀梃
                    {
                        obj.SetCellFgColor('D0'+col+'A', row, '174|174|174');                         
                        obj.SetCellFgColor('D0'+col+'B', row, '174|174|174');                         
                        obj.SetCellFgColor('D0'+col+'C', row, '174|174|174');                         
                    } 
					
                    //爾薑row檜雖虜 斬鼠褻陛 橈朝唳辦朝 爾薑 碳陛棟
                    //欽, 斬鼠褻陛橈雖虜 熱榆檜 氈朝 唳辦朝 爾薑 陛棟ж棻.
                    work_allocation[0]=obj.GetCellValue('BG0'+col+'A' ,row);  //斬鼠褻薑爾蒂 陛螳螞棻.
                    work_allocation[1]=obj.GetCellValue('BG0'+col+'B' ,row);
                    work_allocation[2]=obj.GetCellValue('BG0'+col+'C' ,row);
                    
                    shift_qty[0]=obj.GetCellValue('D0'+col+'A' ,row);  //斬鼠褻縑 渠и 啗�� 熱榆擊 陛螳螞棻.
                    shift_qty[1]=obj.GetCellValue('D0'+col+'B' ,row);
                    shift_qty[2]=obj.GetCellValue('D0'+col+'C' ,row);

                    if(obj.GetCellValue('SEQ',row) == '2' && work_allocation[0]=='null' && shift_qty[0]=='0') 
                    { 
                        obj.SetCellActivation("D0"+col+"A", row, 'activatenoedit');    
                        obj.SetCellFontBold(  "D0"+col+"A", row, 'false');   
                        obj.SetCellFgColor(   'D0'+col+'A', row, '174|174|174'); 
                    }
                    if(obj.GetCellValue('SEQ',row) == '2' && work_allocation[1]=='null' && shift_qty[1]=='0') 
                    { 
                        obj.SetCellActivation("D0"+col+"B", row, 'activatenoedit');    
                        obj.SetCellFontBold(  "D0"+col+"B", row, 'false');    
                        obj.SetCellFgColor(   'D0'+col+'B', row, '174|174|174'); 
                    }
                    if(obj.GetCellValue('SEQ',row) == '2' && work_allocation[2]=='null' && shift_qty[2]=='0') 
                    { 
                        obj.SetCellActivation("D0"+col+"C", row, 'activatenoedit');    
                        obj.SetCellFontBold(  "D0"+col+"C", row, 'false');    
                        obj.SetCellFgColor(   'D0'+col+'C', row, '174|174|174'); 
                    }

                    //嬴楚 斜葬萄 蝶Щ衝熱 霞ж啪 ル晦.
                    if(obj==GridObj2 && GridObj2.GetCellValue('SEQ',row) == '3')
                    {
                        GridObj2.SetCellFontBold(  "D0"+col+"A", row, 'true');
                        GridObj2.SetCellFontBold(  "D0"+col+"B", row, 'true');
                        GridObj2.SetCellFontBold(  "D0"+col+"C", row, 'true');
                        
                        GridObj2.SetCellFgColor(   'D0'+col+'A', row, '0|0|0'); 
                        GridObj2.SetCellFgColor(   'D0'+col+'B', row, '0|0|0'); 
                        GridObj2.SetCellFgColor(   'D0'+col+'C', row, '0|0|0'); 
                    }

                    
                    //熱榆檜 0檣 Row朝 寡唳儀婁 偽擎 アお儀戲煎 и棻.
                    if(shift_qty[0]=='0' && obj.GetCellValue('SEQ',row) == '2')
                        obj.SetCellFgColor(   'D0'+col+'A', row, '255|250|205'); 
                    else if(shift_qty[0]=='0')
                        obj.SetCellFgColor(   'D0'+col+'A', row, colBGColor); 
                    
                    if(shift_qty[1]=='0' && obj.GetCellValue('SEQ',row) == '2')
                        obj.SetCellFgColor(   'D0'+col+'B', row, '255|250|205'); 
                    else if(shift_qty[1]=='0')
                        obj.SetCellFgColor(   'D0'+col+'B', row, colBGColor); 

                    if(shift_qty[2]=='0' && obj.GetCellValue('SEQ',row) == '2')
                        obj.SetCellFgColor(   'D0'+col+'C', row, '255|250|205'); 
                    else if(shift_qty[2]=='0')
                        obj.SetCellFgColor(   'D0'+col+'C', row, colBGColor); 
                    
                }
            }        
        }
    }
 
   
   function doInsert() {
       var GridObj = document.WiseGrid;
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";
   
       if(!chkSelected()) {
           alert("??? ?? ????.");
           return;    
       }
   
       //WiseGrid? ??? ??? mode? ????.
       GridObj.SetParam("mode", "insert");
   
       //WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
       GridObj.DoQuery(servlet_url, "SELECTED");
   }
   
   function doUpdata() {
       var GridObj = document.WiseGrid;
       var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";
   
       if(!chkSelected()) {
           alert("??? ?? ????.");
           return;    
       }
   
       //WiseGrid? ??? ??? mode? ????.
       GridObj.SetParam("mode", "update");
   
       //WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
       GridObj.DoQuery(servlet_url, "SELECTED");
   }
   
   function doDelete() {
       var GridObj = document.WiseGrid;
       var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";
   
       if(!chkSelected()) {
           alert("??? ?? ????.");
           return;    
       }
   
       //WiseGrid? ??? ??? mode? ????.
       GridObj.SetParam("mode", "delete");
   
       //WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
       GridObj.DoQuery(servlet_url, "SELECTED");
   }
   

   function chkSelected() {
       var GridObj = document.WiseGrid;
       chkCount = 0;
   
       for(i = 0; i < GridObj.GetRowCount(); i++) { //??? ???? ???? ????. 
   
           if(GridObj.GetCellValue("SELECTED", i) == "1") //??? ?? ?? ????. 
               chkCount = chkCount + 1;
       }
       
       if(chkCount == 0) {
           return false;    
       }
       return true;
   }
   

   function doLineInsert() {
       var GridObj = document.WiseGrid;
       
       //???? ??? ?? ? ??? ????. 
       GridObj.AddRow();
       
       //??? ? SELECTED? Active? ??? ???? ?? ???.
       GridObj.SetCellValue("SELECTED",GridObj.GetActiveRowIndex(), "1");
   
       //ITEM_CODE ?? ??? ????? Active? ??? ???? ???? ????. 
       GridObj.SetCellImage('ITEM_CODE', GridObj.GetActiveRowIndex(), 0);
   
       //??? ?? ? ITEM_CODE? Active? ??? ???? ??? ???? ??.
       GridObj.SetCellActivation("ITEM_CODE", GridObj.GetActiveRowIndex(), "edit");
   }
   
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

   

   
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
   
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GridCellClick(strColumnKey, nRow){     
      if(strColumnKey=='R02_COUNT')
      {
          //GridObj.GetCellValue('CD0'+strColumnKey.substr(2,2),nRow).split('_MSG_');
          doQuery2(GridObj.GetCellValue("REASON02" ,nRow));
          
      }
   }        
           


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        } 
        
        // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
        // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
        document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
            
    }     

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Check Box 奢濰 : 瞪羹 Click  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function checkSelectedPlantAll(obj){
    
        var len = document.frm.selected_plant.length;
        if( obj.checked == true ){
            //alert(document.frm.selected_plant.length);		
            for( i = 0 ; i < len ; i++ ){
            document.frm.selected_plant[i].checked = true;
            }
        }
        else{
        for( i = 0 ; i < len ; i++ ){
        document.frm.selected_plant[i].checked = false;
        }
        }
    
    };


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛啗�� 儅撩 で機
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function semi_plan_Create()
    {
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//   document.frm.weekCnt.value = weekCnt;
 
      var paramString = "";
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "sc_12020_dailySemifinishedProductPlanAnalysis_psi_pop";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=400, top=0, left=0";
	var newWin = window.open(service_url, fileName, pop_win_style); 
	newWin.focus();
    
         
         
    }




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪曖 Format擊 薑曖 и棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/    
    function GridValueSetting(obj)
    {
         obj.SetCRUDMode("CRUD", "蹺陛", "熱薑", "餉薯");
         
         obj.SetNumberFormat("IDX", "###,###,###"); // 璋濠 ⑽衝

         obj.SetNumberFormat("D01A", "###,###,###"); // 璋濠 ⑽衝
         obj.SetNumberFormat("D01B", "###,###,###");
         obj.SetNumberFormat("D01C", "###,###,###");
         obj.SetNumberFormat("D02A", "###,###,###");
         obj.SetNumberFormat("D02B", "###,###,###");
         obj.SetNumberFormat("D02C", "###,###,###");
         obj.SetNumberFormat("D03A", "###,###,###");
         obj.SetNumberFormat("D03B", "###,###,###");
         obj.SetNumberFormat("D03C", "###,###,###");
         obj.SetNumberFormat("D04A", "###,###,###");
         obj.SetNumberFormat("D04B", "###,###,###");
         obj.SetNumberFormat("D04C", "###,###,###");
         obj.SetNumberFormat("D05A", "###,###,###");
         obj.SetNumberFormat("D05B", "###,###,###");
         obj.SetNumberFormat("D05C", "###,###,###");
         obj.SetNumberFormat("D06A", "###,###,###");
         obj.SetNumberFormat("D06B", "###,###,###");
         obj.SetNumberFormat("D06C", "###,###,###");
         obj.SetNumberFormat("D07A", "###,###,###");
         obj.SetNumberFormat("D07B", "###,###,###");
         obj.SetNumberFormat("D07C", "###,###,###");            
    }
    

