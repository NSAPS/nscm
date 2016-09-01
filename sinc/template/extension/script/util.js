function addQuote(data_str, data_type){	
	var newData = "";
    	if(data_str != null && data_type != null){
    		var check_string = data_type.substring(0, 3).toLowerCase();
    		if(check_string == 'var' || check_string == 'dat' || check_string == 'cha'){
    			newData = "'"+data_str+"'";
    		}else{
    			newData = data_str;
    		}
    	}	
    	return newData;
}

function addQuotePercent(data_str, data_type){	
	var newData = "";
    	if(data_str != null && data_type != null){    		
    		var check_string = data_type.substring(0, 3).toLowerCase();
    		if(check_string == 'var' || check_string == 'dat' || check_string == 'cha'){
    			newData = "'%"+data_str+"%'";
    		}else{
    			newData = "%"+data_str+"%";
    		}
    	}
    	return newData;	
}

function OpenClose(id_num)
{		
	if(id_num.style.display == 'none'){
		id_num.style.display = 'block';
	}else{
		id_num.style.display = 'none';
	}
}

function GoPaging(service, perpage, pagenumber){
	//alert(service);
	//alert(perpage);
	//alert(pagenumber);
	document.frm._moon_service.value = service; 
	document.frm._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = pagenumber; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

function GoPagingOption(service, perpage, pagenumber) {
	//alert(service);
	//alert(perpage);
	//alert(pagenumber);
	document.frm._moon_service.value = service; 
	document.frm._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = pagenumber; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

//새창열기(스크롤바 필요시 scrollbar : yes <--> no)
function OpenWin(url,winName,top,left,width,height,scrollbar)
{
	var newWin = window.open(url,winName,"toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=" + scrollbar + ",resizable=yes,copyhistory=no,top=" + top + ",left=" + left + ",width=" + width + ",height=" + height);
	newWin.focus();
}

//새창열기(스크롤바 필요시 scrollbar : yes <--> no)
function OpenWin2(service,width,height)
{
	var newWin = window.open('about:blank',service,"toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,,width=" + width + ",height=" + height);
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = service;
	document.frm.submit();
}