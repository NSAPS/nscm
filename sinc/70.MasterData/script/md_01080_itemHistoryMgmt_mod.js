
// 이전화면으로 이동
function moveBack() {
	
	var checked_item_group = document.frm.chk_item_group.value;
	var new_item_id=document.frm.new_item_id.value;
	new_item_id = "";
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var	urlStr = "service.do?_moon_service=md_01080_itemHistoryMgmt_list";
			urlStr += "&checked_item_group=" + checked_item_group + "&item_id=" + new_item_id;
			urlStr +=  "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	
	location.href = urlStr;
	
}

function openItemHistCodeSearchPop( id_input, name_input, w_size, h_size, new_gubn ) {

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(id_input).value;
	
	// popup 창의 넓이, 높이를 지정하지 않은 경우, default 사이즈 설정
	if( !(w_size) ) {
		var w_size = 400; 
		var h_size = 300; 
	} 
	
	var service_url = "service.do?_moon_service=md_01080_item_search_popup_for_item_hist&_moon_perpage=100&_moon_pagenumber=1"; 
	service_url += "&code_input=" + code_input + "&id_input=" + id_input + "&name_input=" + name_input + "&new_gubn=" + new_gubn; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width="
						+ w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus();
	
}

function setClearText(objBox)
{
	var tableLen = main_tbody.rows.length;
	var iduFlag = "";
	
	document.frm.item_id.value = "";
	document.frm.item_name.value = "";
	document.frm.new_item_id.value = "";
	document.frm.new_start_date.value = "";
	
	if(tableLen == 0)
	{
		addRows(1);
		tableLen = main_tbody.rows.length;
	}
	
	if(tableLen > 1)
	{
		iduFlag = document.frm.idu_flag[tableLen-1].value;
	}
	else
	{
		iduFlag = document.frm.idu_flag.value;
	}

	if(iduFlag != "I")
	{
		addRows(1);
		tableLen = main_tbody.rows.length;
	}
	
	if(iduFlag == "" || iduFlag == "I")
	{
		if(tableLen > 1)
		{
			document.frm.old_item_id[tableLen-1].value	=	"";
			document.frm.old_item_name[tableLen-1].value	=	"";
			document.frm.start_date[tableLen-1].value	=	"";
			divOldItemID[tableLen-1].innerHTML = "&nbsp;" ;
			divOldItemName[tableLen-1].innerHTML = "&nbsp;";
			divStartDate[tableLen-1].innerHTML =  "&nbsp;";
		}
		else
		{
			document.frm.old_item_id.value	=	"";
			document.frm.old_item_name.value	=	"";
			document.frm.start_date.value	=	"";
			divOldItemID.innerHTML = "&nbsp;" ;
			divOldItemName.innerHTML = "&nbsp;" ;
			divStartDate.innerHTML =  "&nbsp;";
		}
	}
}

// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemName2(objBox)
{
	var tableLen = main_tbody.rows.length;
	var rtnVal;
	
	if(tableLen == 0)		return;
	
	if( objBox.value == "" || objBox.value == null )
	{
		document.frm.item_name.value = "";
		document.frm.new_item_id.value = "";
		document.frm.new_start_date.value = "";
		
		if(tableLen > 1)
		{
			document.frm.old_item_id[tableLen-1].value	=	"";
			document.frm.old_item_name[tableLen-1].value	=	"";
			document.frm.start_date[tableLen-1].value	=	"";
			divOldItemID[tableLen-1].innerHTML = "&nbsp;" ;
			divOldItemName[tableLen-1].innerHTML = "&nbsp;";
			divStartDate[tableLen-1].innerHTML =  "&nbsp;";
		}
		else
		{
			document.frm.old_item_id.value	=	"";
			document.frm.old_item_name.value	=	"";
			document.frm.start_date.value	=	"";
			divOldItemID.innerHTML = "&nbsp;" ;
			divOldItemName.innerHTML = "&nbsp;" ;
			divStartDate.innerHTML =  "&nbsp;";
		}
		return;
	}
	
	if(chkDupCd( objBox.value ) > 0)
	{
		alert("품목코드가 이미 존재합니다!!! : "+objBox.value);
		document.frm.item_id.value = "";
		document.frm.item_id.select();
		document.frm.item_id.focus();
		return;
	}
/*
	commonUtil.checkKeyValue(objBox.value, "md_01080_dup_check_item_hist", 
	{
		callback:function(checkResult)
		{
			if( Number(checkResult) > 0 )
			{
				alert("입력하신 품목으로 이미 등록된 데이터가 있습니다.\n\n\t"+objBox.value);
				document.frm.item_id.value = "";
				document.frm.item_name.value = "";
				document.frm.new_item_id.value = "";
				document.frm.new_start_date.value = "";
				document.frm.item_id.select();
				document.frm.item_id.focus();
				
				if(tableLen > 1)
				{
					document.frm.old_item_id[tableLen-1].value	=	"";
					document.frm.old_item_name[tableLen-1].value	=	"";
					document.frm.start_date[tableLen-1].value	=	"";
					divOldItemID[tableLen-1].innerHTML = "&nbsp;" ;
					divOldItemName[tableLen-1].innerHTML = "&nbsp;";
					divStartDate[tableLen-1].innerHTML =  "&nbsp;";
				}
				else
				{
					document.frm.old_item_id.value	=	"";
					document.frm.old_item_name.value	=	"";
					document.frm.start_date.value	=	"";
					divOldItemID.innerHTML = "&nbsp;" ;
					divOldItemName.innerHTML = "&nbsp;" ;
					divStartDate.innerHTML =  "&nbsp;";
				}
				return;
			}
		}
	});
*/
	commonUtil.getCodeInfo("code_input", objBox.value, "md_01080_item_search_popup_for_item_hist", 
	{ 
		callback:function(arrList)
		{
			if( arrList.length == 1 )
			{
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
				document.frm.new_item_id.value = objBox.value;
				document.frm.new_start_date.value = document.frm.item_hist_start.value;
				
				if(tableLen > 1)
				{
					document.frm.old_item_id[tableLen-1].value	=	objBox.value;
					document.frm.old_item_name[tableLen-1].value	=	arrList[0][1];
					document.frm.start_date[tableLen-1].value	=	document.frm.item_hist_start.value;
					divOldItemID[tableLen-1].innerHTML = "&nbsp;" +objBox.value;
					divOldItemName[tableLen-1].innerHTML = "&nbsp;" +arrList[0][1];
					divStartDate[tableLen-1].innerHTML = "&nbsp;" +document.frm.item_hist_start.value;
				}
				else
				{
					document.frm.old_item_id.value	=	objBox.value;
					document.frm.old_item_name.value	=	arrList[0][1];
					document.frm.start_date.value	=	document.frm.item_hist_start.value;
					divOldItemID.innerHTML = "&nbsp;" +objBox.value;
					divOldItemName.innerHTML = "&nbsp;" +arrList[0][1];
					divStartDate.innerHTML = "&nbsp;" +document.frm.item_hist_start.value;
				}
			}
			else
			{
				alert("입력하신 품목으로 이미 사용 중 이거나,\n 이력 등록을 할 수 없는 품목입니다.\n\n\t==>"+objBox.value);
				document.frm.item_id.value = "";
				document.frm.item_name.value = "";
				document.frm.new_item_id.value = "";
				document.frm.new_start_date.value = "";
				document.frm.item_id.select();
				document.frm.item_id.focus();
				return;
			}
		}
	});
}

 function delCheck(objCheck, idx)
{
	if	( objCheck.checked == true )
	{
		if(document.frm.idu_flag[0])
		{
			document.frm.idu_flag[idx-1].value	=	"D";
		}
		else
		{
			document.frm.idu_flag.value	=	"D";
		}
	}
	else
	{
		if(document.frm.idu_flag[0])
		{
			document.frm.idu_flag[idx-1].value	=	"S";
		}
		else
		{
			document.frm.idu_flag.value	=	"S";
		}
	}
}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).select();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
	
}

// HTML Grid 의 X좌표 정의 
function scrollX() {
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
}

// HTML Grid 의 Y좌표 정의 
function scrollY() {
	//document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
//function addRow( insertRowIndex ) { 
function addRow() {
	
	var oRowMain = main_tbody.insertRow(); 
	
	// 새로 추가하는 row 의 row index 설정
	var rowNo = oRowMain.rowIndex;
	var oldItemId, oldItemName, startDate, endDate;
	
	iduVal		=	"I";
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 20; 

	var oCell0 = oRowMain.insertCell(); // 번호
	var oCell1 = oRowMain.insertCell(); // 삭제
	var oCell2 = oRowMain.insertCell(); // 구 품목 코드
	var oCell3 = oRowMain.insertCell(); // 구 품목 명
	var oCell4 = oRowMain.insertCell(); // 적용 시작일
	var oCell5 = oRowMain.insertCell(); // idu flag
	
//	oCell5.onclick = function() { setEditMode(this); }; // 품목 코드

	oCell0.align = "center"; oCell0.width = "5%";
	oCell1.align = "center"; oCell1.width = "5%";
	oCell2.align = "center"; oCell2.width = "20%";
	oCell3.align = "left"; oCell3.width = "50%";
	oCell4.align = "center"; oCell4.width = "20%";
	oCell5.align = "left"; oCell5.width = "1%";

	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 삭제
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:20px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 구 품목 코드
	oCell2.innerHTML = "<a id=\"divOldItemID\">&nbsp;</a><input type=\"hidden\" name=\"old_item_id\" value=\"\">";
	// 구 품목 명
	oCell3.innerHTML = "<a id=\"divOldItemName\">&nbsp;</a><input type=\"hidden\" name=\"old_item_name\" value=\"\">";
	// 적용 시작일
	oCell4.innerHTML = "<a id=\"divStartDate\">&nbsp;</a><input type=\"hidden\" name=\"start_date\" value=\"\">";
	// idu flag
	oCell5.innerHTML = "<a id=\"divIduFlag\"></a><input type=\"hidden\" name=\"idu_flag\"value=\"I\">";

	document.recalc();
	setRowNo();

}

function chkDupCd( itemID )
{
	var tableLen = main_tbody.rows.length;
	var cntEq = 0; // 중복 counting
	
	if(tableLen > 1)
	{
		for( var i=0 ; i < tableLen ; i++ )
		{
			if(document.frm.old_item_id[i].value == itemID)
			{
				cntEq++;
			}
		}
	}
	else
	if(tableLen == 1)
	{
		if(document.frm.old_item_id.value == itemID)
		{
			cntEq++;
		}
	}

	return	cntEq;
}

// 신규 품목 중복 체크
function checkDupInDB(new_item_id)
{
	var checkResult;
	if(new_item_id == "" || new_item_id == null)		return -1;

	commonUtil.checkKeyValue(new_item_id, "md_01080_dup_check_item_hist", checkDupDo);
}

// 신규 품목 중복 체크 결과
function checkDupDo(checkResult)
{
	return	checkResult;
}

// row 삭제 
// parameter : button object
function delRow( obj )
{	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	
	document.frm.item_id.value = "";
	document.frm.item_name.value = "";
	document.frm.new_item_id.value = "";
	
	main_tbody.deleteRow(delRowIdx);
	
	setRowNo();
	
}

// 품목 명 읽어 옮
function	getItemName(obj)
{
	var itemCode = obj.value; 
	var itemName; 
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var chkVal = 0;
	
	if(itemCode == "" || itemCode == null)
	{
		return;
	}

	if( rowIdx > 0)
	{
		chkVal	=	chkDupCd(rowIdx);
		
		if(Number(chkVal) > 1)
		{
			alert("품목코드 중복 입니다!!! "+itemCode);
			document.frm.item_code[rowIdx].value = "";
			divItemCode[rowIdx].innerHTML = "&nbsp;";
			setEditMode(document.frm.item_code[rowIdx].parentNode);
			return	false;
		}
	}

	commonUtil.getCodeList("itemID", itemCode, "rp_01110_itemNameGet",
	{ 
		callback:function(arryList)
		{
			if( arryList.length > 0 )
			{
				itemName	= arryList[0];

				if( document.frm.item_code[0] )
				{
					document.frm.item_name[rowIdx].value	=	itemName;
					document.frm.item_code[rowIdx].value	=	itemCode;
					divItemName[rowIdx].innerHTML = "&nbsp;" + itemName; 
					divItemCode[rowIdx].innerHTML = "&nbsp;" + itemCode;
					setViewMode(document.frm.item_code[rowIdx]);
//					document.frm.btnSave.select();
				}
				else
				{
					document.frm.item_name.value = itemName;
					document.frm.item_code.value = itemCode;
					divItemName.innerHTML = "&nbsp;" + itemName;
					divItemCode.innerHTML = "&nbsp;" + itemCode;
					setViewMode(document.frm.item_code);
//					document.frm.btnSave.select();
				}
			}
			else
			{
				alert("품목 코드를 확인하세요!!! "+itemCode+" - "+rowIdx);
				if( document.frm.item_code[0] )
				{
					setEditMode(document.frm.item_code[rowIdx].parentNode);
					document.frm.item_code[rowIdx].value = "";
					divItemCode[rowIdx].innerHTML = "&nbsp;";
				}
				else
				{
					setEditMode(document.frm.item_code.parentNode);
					document.frm.item_code.value = "";
					divItemCode.innerHTML = "&nbsp;";
				}
				return false;
			}
		}
	});
}

// 번호 setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}

// num 수만큼 행 추가
function addRows( num )
{
	var tableLen = main_tbody.rows.length;
	
	var iduFlag = "";
	
	if(tableLen > 1)
	{
		iduFlag = document.frm.idu_flag[tableLen-1].value;
	}
	else
	{
		if(document.frm.idu_flag)
		{
			iduFlag = document.frm.idu_flag.value;
		}
		else
		{
			iduFlag = "S";
		}
	}
	
	if( iduFlag == "I")
	{
		alert("신규 품목은 한 품목만 등록 가능합니다!!!");
		return;
	}
	
	if( tableLen > 1 )
	{
		if( document.frm.old_item_id[tableLen-1] )
		{
			if( document.frm.old_item_id[tableLen-1].value == "" || document.frm.old_item_id[tableLen-1].value == null ) {
				alert("신규 품목을 입력하세요!!!");
//				setEditMode(document.frm.item_code[tableLen-1].parentNode);
				document.frm.item_id.focus();
				return;
			}
		}
	}
	else if( tableLen == 1 )
	{
		if( document.frm.old_item_id.value == ""  || document.frm.old_item_id.value == null ) {
			alert("신규 품목을 입력하세요!!!");
			document.frm.item_id.focus();
			return;
		}
	}
	
	for( var i=0; i<num ; ++i )
	{
		addRow();
	}
}

// TAB || ENTER key 로 행 추가
function enterAddRow(obj )
{
	var itemCode = obj.value;
	var itemName; 
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var chkVal = 0;
	
	if(itemCode == "" || itemCode == null)
	{
		return;
	}

	// TAB || ENTER
	if( event.keyCode == "13" )
	{ 
		rtn	=	addRows(1);
	}
}


// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식 
// parameter : obj = input box object, dateSize = date type size 
// dateSize = 4 : yyyy 
// dateSize = 6 : yyyyMM, dateSize = 7 : yyyy-MM 
// dateSize = 8 : yyyyMMdd, dateSize = 10 : yyyy-MM-dd 
// 공백은 skip
function chkDate(obj, dateSize)
{	
	var separator = "-"; 
	if( Number(dateSize) == 7 || Number(dateSize) == 10 ) 
		createDateDelimiter(obj, separator); 
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // 공백은 skip
	
	if( Number(dateSize) == 4 ) 
	{ 
		var dateType = "yyyy"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = "01"; 
		var inputDate = "01"; 
	} 
	else if( Number(dateSize) == 6 ) 
	{ 
		var dateType = "yyyyMM"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(4,2) - 1; 
		var inputDate = "01"; 
	} 
	else if( Number(dateSize) == 7 ) 
	{ 
		var dateType = "yyyy-MM"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(5,2) - 1; 
		var inputDate = "01"; 
		if( input.substr(4,1) != "-" && input.substr(4,1) != "/" ) 
		{ 
			separator = "invalid"; 
		} 
	} 
	else if( Number(dateSize) == 8 ) 
	{ 
		var dateType = "yyyyMMdd"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(4,2) - 1; 
		var inputDate = input.substr(6,2); 
	} 
	else if( Number(dateSize) == 10 ) 
	{ 
		var dateType = "yyyy-MM-dd"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(5,2) - 1; 
		var inputDate = input.substr(8,2); 
		if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
		{ 
			separator = "invalid"; 
		} 
	} 

	var tableLen = main_tbody.rows.length;
	var iduFlag = "";

	document.frm.new_start_date.value = obj.value;
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != Number(dateSize) || separator == "invalid" ) 
	{		
		if(tableLen > 1)
		{
			document.frm.start_date[tableLen-1].value	=	"";
			divStartDate[tableLen-1].innerHTML = "&nbsp;";
		}
		else
		{
			document.frm.start_date.value	=	"";
			divStartDate.innerHTML = "&nbsp;";
		}
		
		document.frm.new_start_date.value = "";
		obj.value = ""; 
		obj.select(); 
		alertChkDate(input, dateType); 
		
		return 0; 
	} 
	else 
	{

		if(tableLen == 0)
		{
			addRows(1);
			tableLen = main_tbody.rows.length;
		}
		
		if(tableLen > 1)
		{
			iduFlag = document.frm.idu_flag[tableLen-1].value;
		}
		else
		{
			if(document.frm.idu_flag)
			{
				iduFlag = document.frm.idu_flag.value;
			}
		}

		if(iduFlag)
		{
			if(iduFlag != "I")
			{
				addRows(1);
				tableLen = main_tbody.rows.length;
			}
	
			if(tableLen > 1)
			{
				document.frm.start_date[tableLen-1].value	=	obj.value;
				divStartDate[tableLen-1].innerHTML = "&nbsp;" +obj.value;
			}
			else
			{
				document.frm.start_date.value	=	obj.value;
				divStartDate.innerHTML = "&nbsp;" +obj.value;
			}
			return 1; 
		}
	} 
}

// 저장
function GoSave( service ) {

	var tableLen = main_tbody.rows.length;
	
	var cdCnt = 0;
	var i = 0;
	var nullCnt = 0;
	var delCnt = 0;
	var insCnt = 0;
	
	for( i=0; i < tableLen; i++ )
	{
		if(tableLen > 1)
		{
			for( i=0; i < tableLen; i++ )
			{
				if(document.frm.idu_flag[i].value == "D")	++delCnt;
				if(document.frm.idu_flag[i].value == "I")	++insCnt;
			}
		}
	}
	
	if(delCnt+insCnt < 1)
	{
		alert("저장할 자료가 없습니다!!!");
		return;
	}

/*
	if(delCnt < 1)
	{
		if( tableLen > 1 )
		{
			if(  document.frm.idu_flag[tableLen - 1].value != "I" )
			{
				alert("신규 품목을 입력하세요!!!");
				document.frm.item_id.focus();
				return;
			}
		}
		else
		{
			if(  document.frm.idu_flag.value != "I" )
			{
				alert("신규 품목을 입력하세요!!!");
				document.frm.item_id.focus();
				return;
			}
		}
	}
*/

	for( i=0; i < tableLen; i++ )
	{
		if( tableLen > 1 )
		{
			if( document.frm.old_item_id[i].value == null || document.frm.old_item_id[i].value == "" )
			{
				alert("신규 품목을 입력하세요!!!");
				document.frm.item_id.focus();
				return;
			}
			if( document.frm.start_date[i].value == null || document.frm.start_date[i].value == "" )
			{
				alert("적용 시작일을 입력하세요!!!");
				document.frm.item_id.focus();
				return;
			}
		}
		else
		{
			if( document.frm.old_item_id.value == null || document.frm.old_item_id.value == "" )
			{
				alert("신규 품목을 입력하세요!!!");
				document.frm.item_id.focus();
				return;
			}
			if( document.frm.start_date.value == null || document.frm.start_date.value == "" )
			{
				alert("적용 시작일을 입력하세요!!!");
				document.frm.item_id.focus();
				return;
			}
		}
	}
	
	if(document.frm.new_start_date.value == null || document.frm.new_start_date.value == "" )
	{
		document.frm.new_start_date.value = document.frm.item_hist_start.value;
	}
	
	if(document.frm.new_item_id.value == null || document.frm.new_item_id.value == "" )
	{
		document.frm.new_item_id.value = document.frm.pre_item_id.value;
	}

	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
