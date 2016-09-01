//Manage Item/Site Tab
function changeRowField(count, obj) {
	var bool = obj.checked;
	var className = null;
	var trColor = null;
	if (bool == true) {
		trColor = "#FFFFFF";
		bool = false;
		document.frm.isChecked.value = Number(document.frm.isChecked.value) + 1;
		
	} else {
		trColor = "#CCCCCC";
		bool = true;		
		document.frm.isChecked.value = Number(document.frm.isChecked.value) - 1;
	}

	if(Number(count) <= 1) {
		document.getElementById("tr1").parentElement.rows[0].style.backgroundColor = trColor;
		document.getElementById("tr2").parentElement.rows[0].style.backgroundColor = trColor;
		document.frm.row_item_cd.disabled = bool;
		document.frm.row_site_cd.disabled = bool;
		document.frm.row_dc_cd.disabled = bool;
		document.frm.row_gen_date.disabled = bool;
		document.frm.day1.disabled = bool;
		document.frm.day2.disabled = bool;
		document.frm.day3.disabled = bool;
		document.frm.day4.disabled = bool;
		document.frm.day5.disabled = bool;
		document.frm.day6.disabled = bool;
		document.frm.day7.disabled = bool;
		document.frm.etc.disabled = bool;

	} else {
		document.getElementById("tr1").parentElement.rows[obj.id].style.backgroundColor = trColor;
		document.getElementById("tr2").parentElement.rows[obj.id].style.backgroundColor = trColor;
		document.frm.row_item_cd[obj.id].disabled = bool;
		document.frm.row_site_cd[obj.id].disabled = bool;
		document.frm.row_dc_cd[obj.id].disabled = bool;
		document.frm.row_gen_date[obj.id].disabled = bool;
		document.frm.day1[obj.id].disabled = bool;
		document.frm.day2[obj.id].disabled = bool;
		document.frm.day3[obj.id].disabled = bool;
		document.frm.day4[obj.id].disabled = bool;
		document.frm.day5[obj.id].disabled = bool;
		document.frm.day6[obj.id].disabled = bool;
		document.frm.day7[obj.id].disabled = bool;
		document.frm.etc[obj.id].disabled = bool;	
	}
}

function setCheckBoxValue(count, obj) {
	var target = document.frm.modifyCheckParam;	
	if(Number(count) <= 1) {
		setCheckValue(obj.checked, target);
	} else {
		setCheckValue(obj.checked, target[obj.id]);
	}
	return;
}

function setCheckValue(bool, obj) {
	if(bool == true) {
		obj.value = '1';
	} else {
		obj.value = '0';
	}
}

<!-- XÁÂÇ¥ Á¤ÀÇ -->
function scrollX() {
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
}

<!-- YÁÂÇ¥ Á¤ÀÇ -->
function scrollY() {
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}