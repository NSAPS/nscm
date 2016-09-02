/**
 @path    /sinc/50.Forecast/script/fc_customer_mCodePopup_header.js
 @Creator    김규철 
 @version    1.0
 @date        2008-11-26 
 @description : 거래처별(멀티) 팝업 조회
*/  
 
 function addItem(optionvalue, optiontext) {	
 
     var selected = document.all.selectedList;
     
	 for (i = 0; i < selected.options.length; i++)
	 {
	  if(selected.options[i].value == optionvalue)
	  { 
	         selected.options[i] = null;
	            return;
	  } 
	 } 
   
	 var newOption = new Option(optiontext, optionvalue, "false");
 	 selected.options[selected.options.length] = newOption;
 	
}  
 
function returnSelectedItems(){
 
 var selectedList = document.all.selectedList;
 var count = selectedList.length; 
 
 if(count == 0)
 {
  alert("품목을 하나라도 선택하세요.!");
  return;
 }
 
 var textlist = "";
 var valuelist = "";
 
 for (var i = 0; i < count; i ++)
 {
  if(i > 0)
  {
   textlist += ",";
   valuelist +=",";
  }
 
  valuelist += selectedList.options[i].value;

  var text = selectedList.options[i].text;
  var indexText = text.indexOf("-");
  if(indexText > 0)
  {
   indexText = text.indexOf("-", indexText+1);
   text = text.substring(indexText+1);
  }
  textlist += text;
 }  
      
 var oCallBackFun = opener.return_martValue(valuelist, textlist);
 
 window.close();
}  