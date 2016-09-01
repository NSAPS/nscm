
// 이전화면으로 이동
function moveBack()
{
	var checked_item_group = document.frm.chk_item_group.value;
	var new_item_id=document.frm.new_item_id.value;
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

function setClearText(objBox, gubn)
{
	var tableLen = 0;
	
	if( main_tbody.rows.length )
	{
		tableLen = main_tbody.rows.length;
	}
	
	if(gubn == "NEW")
	{
		document.frm.n_item_id.value = "";
		document.frm.n_item_name.value = "";
		document.frm.new_item_id.value = "";
		document.frm.new_start_date.value = "";
	}
	
	if(tableLen == 0)
	{
		addRow();
	}
	else
	{
		for(var i=0; i<tableLen; i++)
		{
			main_tbody.deleteRow( i );
		}
		addRow();
	}
}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd )
{
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).select();
}

// input box 를 View Mode 로 변환
function setViewMode( objBox )
{
	var strVal = objBox.value;
	
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj )
{ 
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
function bgOut( obj )
{	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
}

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
//function addRow( insertRowIndex ) { 
function addRow()
{	
	var oRowMain = main_tbody.insertRow(); 
	
	// 새로 추가하는 row 의 row index 설정
	var rowNo = oRowMain.rowIndex;
	var newItemId, newItemName, oldItemId, oldItemName, startDate, endDate;
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 20; 

	var oCell0 = oRowMain.insertCell(); // 번호
	var oCell1 = oRowMain.insertCell(); // 삭제
	var oCell2 = oRowMain.insertCell(); // 구 품목 코드
	var oCell3 = oRowMain.insertCell(); // 구 품목 명
	
	oCell2.onclick = function() { setEditMode(this); }; // 품목 코드

	oCell0.align = "center"; oCell0.width = "5%";
	oCell1.align = "center"; oCell1.width = "5%";
	oCell2.align = "center"; oCell2.width = "25%";
	oCell3.align = "left"; oCell3.width = "65%";

	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 삭제
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:20px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 구 품목 코드
	oCell2.innerHTML = "<a id=\"divOldItemID\">&nbsp;</a><input type=\"text\" name=\"old_item_id\" class=\"normal\" onChange=\"getItemName2(this,'OLD'); \" "
								+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// 구 품목 명
	oCell3.innerHTML = "<a id=\"divOldItemName\">&nbsp;</a><input type=\"hidden\" name=\"old_item_name\" value=\"\">";

	document.recalc();
	setRowNo();
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

	document.frm.new_start_date.value = obj.value;
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != Number(dateSize) || separator == "invalid" ) 
	{		
		document.frm.new_start_date.value = "";
		obj.value = ""; 
		obj.select(); 
		alertChkDate(input, dateType); 
		
		return 0; 
	} 
	else 
	{
		document.frm.new_start_date.value = obj.value;
		return 1; 
	} 
}

var objTdG;
// 코드 중복 체크
function chkDupCd( rowIdx )
{
	if( document.frm.old_item_id[rowIdx].value == null || document.frm.old_item_id[rowIdx].value == "" )
	{
		return	0;
	}
	
	var tableLen = main_tbody.rows.length;
	
	var itemCodeChk	=	document.frm.old_item_id[rowIdx].value;
	
	var cntEq = 0; // 중복 counting
	for( var i=0 ; i < tableLen ; i++ )
	{
		if( document.frm.old_item_id[i] )
		{
			if( document.frm.old_item_id[i].value ==	itemCodeChk )
			{
				cntEq++;
			}
		}
	}
	return	cntEq;
}

// 신규 제품의 제품 명 표시
function getItemName1(objBox,gubn)
{
	
	if( objBox.value == "" || objBox.value == null )
	{
		document.frm.n_item_name.value = "";
		document.frm.new_item_id.value = "";
		document.frm.new_start_date.value = "";
		
		return;
	}
	
	commonUtil.getCodeInfo("code_input", objBox.value, "md_01080_item_search_popup_for_item_hist", 
	{ 
		callback:function(arrList)
		{
			if( arrList.length == 1 )
			{
				objBox.value = arrList[0][0];
				document.frm.n_item_name.value = arrList[0][1];
				document.frm.new_item_id.value = objBox.value;
				document.frm.new_start_date.value = document.frm.item_hist_start.value;
			}
			else
			{
				alert("입력하신 품목으로 이미 사용 중 이거나,\n 이력 등록을 할 수 없는 품목입니다.\n\n\t==>"+objBox.value);
				document.frm.n_item_id.value = "";
				document.frm.n_item_name.value = "";
				document.frm.new_item_id.value = "";
				document.frm.new_start_date.value = "";
				document.frm.n_item_id.select();
				document.frm.n_item_id.focus();
				return;
			}
		}
	});
}

// 품목 명 읽어 옮
function	getItemName2(obj, gubn)
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
			document.frm.old_item_id[rowIdx].value = "";
			setEditMode(document.frm.old_item_id[rowIdx].parentNode);
			return	false;
		}
	}
		
	commonUtil.getCodeInfo("code_input", obj.value, "md_01080_item_search_popup_for_item_hist", 
	{ 
		callback:function(arryList)
		{
			if( arryList.length > 0 )
			{
				itemName	= arryList[0];

				if( document.frm.old_item_id[0] )
				{
					document.frm.old_item_name[rowIdx].value	=	itemName;
					document.frm.old_item_id[rowIdx].value	=	itemCode;
					divOldItemName[rowIdx].innerHTML = "&nbsp;" + itemName; 
					divOldItemID[rowIdx].innerHTML = "&nbsp;" + itemCode;
					setViewMode(document.frm.old_item_id[rowIdx]);
				}
				else
				{
					document.frm.old_item_name.value = itemName;
					document.frm.old_item_id.value = itemCode;
					divOldItemName.innerHTML = "&nbsp;" + itemName;
					divOldItemID.innerHTML = "&nbsp;" + itemCode;
					setViewMode(document.frm.old_item_id);
				}
			}
			else
			{
				alert("품목 코드를 확인하세요!!! "+itemCode+" - "+rowIdx);
				if( document.frm.old_item_id[0] )
				{
					setEditMode(document.frm.old_item_id[rowIdx].parentNode);
					document.frm.old_item_id[rowIdx].value = "";
					divOldItemID[rowIdx].innerHTML = "&nbsp;";
				}
				else
				{
					setEditMode(document.frm.old_item_id.parentNode);
					document.frm.old_item_id.value = "";
					divOldItemID.innerHTML = "&nbsp;";
				}
				return false;
			}
		}
	});
}

// 번호 setting
function setRowNo()
{	
	var tableLen = main_tbody.rows.length;
	
	for( var i = 0 ; i < tableLen ; ++i )
	{
		if( divRowNo[0] )
		{
			divRowNo[i].innerHTML = i+1;
		}
		else
		{
			divRowNo.innerHTML = "1";
		}
	}
}

// num 수만큼 행 추가
function addRows( num )
{
	var tableLen = 0;
	
	if( main_tbody.rows.length )
	{
		tableLen = main_tbody.rows.length;
	}
	
	if( tableLen > 1 )
	{
		if( document.frm.old_item_id[tableLen-1] )
		{
			if( document.frm.old_item_id[tableLen-1].value == "" || document.frm.old_item_id[tableLen-1].value == null ) {
				alert("품목 코드를 입력하세요!!!");
				setEditMode(document.frm.old_item_id[tableLen-1].parentNode);
				return;
			}
		}
	}
	else if( tableLen == 1 )
	{
		if( document.frm.old_item_id.value == ""  || document.frm.old_item_id.value == null ) {
			alert("품목 코드를 입력하세요!!!");
			setEditMode(document.frm.old_item_id.parentNode);
			return;
		}
	}
	
	for( var i=0; i<num ; ++i )
	{
		addRow();
	}
}

// row 삭제 
// parameter : button object
function delRow( obj )
{
	var arrData = new Array(2);
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
	main_tbody.deleteRow(delRowIdx);
	
	if( tableLen > 2 )
	{		
		arrData[0] = document.frm.old_item_id[tableLen - 2].value;
		arrData[1] = document.frm.old_item_name[tableLen - 2].value;
		
		main_tbody.deleteRow( tableLen - 2 );
		addRow();
		
		document.frm.old_item_id[tableLen - 2].value = arrData[0];
		document.frm.old_item_name[tableLen - 2].value = arrData[1];
		divOldItemID[tableLen - 2].innerHTML = "&nbsp;" + arrData[0];
		divOldItemName[tableLen - 2].innerHTML = "&nbsp;" + arrData[1];
		setViewMode(document.frm.old_item_id[tableLen - 2]);
		
		setRowNo();
	}
	else
	if( tableLen == 2 )
	{
		if( document.frm.old_item_id[tableLen - 2] ) {
			arrData[0] = document.frm.old_item_id[tableLen - 2].value;
		}
		else {
			arrData[0] = document.frm.old_item_id.value;
		}
		if( document.frm.old_item_name[tableLen - 2] ) {
			arrData[1] = document.frm.old_item_name[tableLen - 2].value;
		}
		else {
			arrData[1] = document.frm.old_item_name.value;
		}
		
		main_tbody.deleteRow( tableLen - 2 );
		addRow();
		
		if( document.frm.old_item_id[tableLen - 2] ) {
			document.frm.old_item_id[tableLen - 2].value = arrData[0];
			setViewMode(document.frm.old_item_id[tableLen - 2]);
		}
		else {
			document.frm.old_item_id.value = arrData[0];
			setViewMode(document.frm.old_item_id);
		}
		if( document.frm.old_item_name[tableLen - 2] ) {
			document.frm.old_item_name[tableLen - 2].value = arrData[1];
		}
		else {
			document.frm.old_item_name.value = arrData[1];
		}
		if( divOldItemID[tableLen - 2] ) {
			divOldItemID[tableLen - 2].innerHTML = "&nbsp;" + arrData[0];
		}
		else {
			divOldItemID.innerHTML = "&nbsp;" + arrData[0];
		}
		if( divOldItemName[tableLen - 2] ) {
			divOldItemName[tableLen - 2].innerHTML = "&nbsp;" + arrData[1];
		}
		else {
			divOldItemName.innerHTML = "&nbsp;" + arrData[1];
		}
		
		setRowNo();
	}
}

// 저장
function GoSave( service )
{
	var tableLen = 0;
	
	var cdCnt = 0;
	var i = 0;
	var nullCnt = 0;
	
	if(main_tbody.rows.length)
	{
		tableLen = main_tbody.rows.length;
	}
	else
	{
		alert("저장할 자료가 없습니다!!!");
		return;
	}

	for( i=0; i < tableLen; i++ )
	{
		if( document.frm.old_item_id[i] )
		{
			if( document.frm.old_item_id[i].value == null || document.frm.old_item_id[i].value == "" )
			{
				alert("이력을 연결할 구 품목을 입력하세요!!!");
				setEditMode(document.frm.old_item_id[i].parentNode);
				return;
			}
		}
		else
		{
			if( document.frm.old_item_id.value == null || document.frm.old_item_id.value == "" )
			{
				alert("이력을 연결할 구 품목을 입력하세요!!!");
				setEditMode(document.frm.old_item_id.parentNode);
				return;
			}
		}
	}

	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

/*
// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// 코드 --> 코드 명
		if( objName == "cd" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}
		// 코드 명 --> 설명
		else if( objName == "cd_name" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[0];
			}
			else {
				objTdG = main_tbody.rows.cells[0];
			}
		}
		// 설명 --> CAT01
		else if( objName == "descr" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// CAT01 --> CAT02
		else if( objName == "cat01" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// CAT02 --> CAT03
		else if( objName == "cat02" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}
		// CAT03 --> CAT04
		else if( objName == "cat03" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}
		}
		// CAT04 --> CAT05
		else if( objName == "cat04" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];
			}
			else {
				objTdG = main_tbody.rows.cells[5];
			}
		}
		// CAT05 --> 다음줄 코드
		else if( objName == "cat05" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[2];
				}
				else {
					objTdG = main_tbody.rows.cells[2];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = main_tbody.rows.cells[2];
				}
			}
		}
		// 코드 그룹 설명 --> 첫줄 코드 입력 창
		else if( objName == "cd_grp_desc" ) {
			if( main_tbody.rows[0] ) {
				objTdG = main_tbody.rows[0].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}
*/
