
// ���� Ŭ�� : ����ȭ������ �̵�
function onclickfunc(row, col, data) {
	
	var chk_item_group = document.frm.chk_item_group.value;
//	var pre_item_id = document.frm.chk_item_id.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01080_itemHistoryMgmt_mod&pre_item_id=";

	urlStr += data.split("!%!")[0];
	urlStr += "&chk_item_group=" + chk_item_group + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=100";

	location.href = urlStr;
	
//	GoSearch("sc_01050_productCalendar_mod");
	
}

function setClearText(objBox)
{
	document.frm.chk_item_id.value = "";
	document.frm.item_id.value = "";
	document.frm.item_name.value = "";
}

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName2(objBox)
{
	if( objBox.value == "" || objBox.value == null )
	{
		document.frm.item_name.value = "";
		//document.frm.chk_item_id.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", 
	{ 
		callback:function(arrList)
		{
			if( arrList.length == 1 )
			{
				objBox.value = arrList[0][0];
				//document.frm.chk_item_id.value = objBox.value;
				document.frm.item_name.value = arrList[0][1];
			}
			else
			{
				//document.frm.chk_item_id.value = "";
				return;
			}
		}
	});
}