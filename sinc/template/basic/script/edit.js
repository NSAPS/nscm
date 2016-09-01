//made by ys@lastcom.pe.kr

//초기화
function init() {
	TextEditor.document.onmousedown = new Function("TextEditorEvent()");
	iText = TextEditor;
	iText.document.designMode = "On";
	TextEditView.style.display="inline";
	initEditor();
	bLoad = true;

}

//기존글을 불러와서 편집
function Edit(){
	init();
	TextEditView.style.display="inline";
//	TextEditor.document.body.innerHTML =write.tmpContent.value;
	TextEditor.document.body.innerHTML =document.all.temp_content.innerHTML;
}

//초기화면 스타일 설정
function initEditor() {
	var bHeader = 
		"<style>P {white-space:pre;margin-top:3px;margin-bottom:3px;margin-left:3;margin-right:3;}</style>\n";
	iText.document.open();
	iText.document.write(bHeader);
	iText.document.close();
	iText.document.body.style.fontSize = "9pt";
	iText.document.body.style.fontFamily = "굴림";
}

function TextEditorEvent(){
if (TextEditor.event.button==2){

	var oSource = TextEditor.event.srcElement ;
    if (!oSource.isTextEdit) 
        oSource = TextEditor.event.srcElement.parentTextEdit;

		var strValue = TextEditor.event.srcElement.tagName; //선택된 부분의 태그 종류
    if ((strValue == "IMG" || strValue == "HR") && oSource != null) {

        var oTextRange = oSource.createTextRange();
     }

		var selectedRange = TextEditor.document.selection.createRange();
		var edValue = selectedRange.htmlText;

	var strX = TextEditor.event.x;
	var strY = TextEditor.event.y+180;

	if (strValue == "IMG") 
		strH = "180px";
	else if (strValue == "HR" || strValue == "TABLE")
		strH = "135px";
	else
		strH = "340px";

	var strParam = "dialogLeft:" + strX + ";dialogTop:" + strY + ";";
	strParam = strParam + "center:no;dialogWidth:150px; dialogHeight:" + strH + ";status:0;scroll:0; help:0;unadorned:yes;";
	}
}

/*수정 된 부분 */
//action event
//function check(param){
function check(){
	if(document.frm.text_check.checked){
		document.frm.content.value = TextEditor.document.body.innerHTML;
		if( !document.frm.content.value ){
			alert( "내용을 입력해주세요!^^");
			TextEditor.document.body.focus();
			return;
		}
	}else{
		document.frm.content.value = document.frm.html_body.value;
			if( !document.frm.content.value ){
			alert( "내용을 입력해주세요!^^");
			document.frm.html_body.focus();
			return;
		}
	}
	document.frm.submit();
}


//since 2002/03/17
function paste(param){
	TextEditor.focus();
	var sel = TextEditor.document.selection;
	if (sel!=null) {
		var rng = sel.createRange();
	    if (rng!=null)
		    rng.pasteHTML(param);
	}
}

//since 2002.4.20
function layer_change(hidden_key,view_key){
	if(hidden_key == "html_layer"){
		TextEditor.document.body.innerHTML = document.frm.html_body.value;
		document.all.frm.html_check.checked=false;
	}else{
		document.frm.html_body.value = TextEditor.document.body.innerHTML;
		document.all.frm.text_check.checked=false;
	}
	document.all[hidden_key].style.display = "none";
	document.all[view_key].style.display = "block";
	document.all.preview_layer.style.display="none";
	document.all.frm.pre_check.checked=false;
}
/*수정 된 부분 */

function ButtonUp(param) {
	param.style.border="1px outset";
	param.style.background="#D4D4D4";
}

function ButtonOut(param) {
	param.style.border="";
	param.style.background="";

}
/*
function MenuOver(param) {
	param.style.fontColor="white";
	param.style.backgroundColor="navy";
}

function MenuOut(param) {
	param.style.fontcolor="white";
	param.style.backgroundColor="#C0C0C0";
}
*/

function block_style(o, cmd) {
	var ed=TextEditor.document.selection.createRange();
	ed.execCommand(cmd, false, o.value);
}


function SelectionCommand(Btn, cmd) {
	TextEditor.focus();
	var EdRange=TextEditor.document.selection.createRange();
	EdRange.execCommand(cmd);
}
// Redo, Undo from kkaok board 2003-04-01
function SelectionCommand2(sOption, cmd) {
  TextEditor.focus();
  var oSel  = TextEditor.document.selection.createRange();
  var sType = TextEditor.document.selection.type  ;
  var oTarget = (sType == "None" ? TextEditor.document : oSel);
  oTarget.execCommand(cmd, false, sOption);
}
/*
function ChFontColor(param,cmd){
	var ed
	ed = TextEditor.document.selection.createRange();
	ed.execCommand(cmd, false, param);
}*/
/** modified by neoburi-Inkuk*/
function ChFontColor(cmd){
	var ed;
	//var value = showModalDialog( "service.do?_moon_service=board_editor_color",
	var value = showModalDialog( "/basic/component/board/board_editor_color.vm",
                             "",
                             "font-family:Verdana; font-size:12;dialogWidth:31em; dialogHeight:32em;status:no;help:no;self-close:no" );
	if( value != null ){
		ed = TextEditor.document.selection.createRange();
		ed.execCommand(cmd, true, value);
	}
	TextEditor.document.body.focus();
}
/*
*색상 선택 상자
*/
function OpenWin(URL) {
	var str;
	var scrWidth = (screen.availWidth / 2 ) - 200;
	var scrHeight = (screen.availHeight / 2) - 150;
	str="'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,";
	str=str+"width=400";
	str=str+",height=300',top="+scrHeight+",left="+scrWidth;
	wopen = window.open(URL,'remote',str);
}
/*
*답변 글 달 때 원 글보기 처리 
*2003-03-07, neoburi-inkuk, neoburi@neoburi.com
*/
function change_context( obj ){
	if( obj.checked ){
		document.all.temp_layer.style.display="block";
	}else{
		document.all.temp_layer.style.display="none";
	}
}
/*
*새글, 답변글, 수정시 미리보기, 웹편집, 텍스트 편집 상태 전환
*2003-03-07, neoburi-inkuk, neoburi@neoburi.com
*/
function content_preview( obj ){
	var elms=document.all;
	if( obj.checked ){
		elms.html_layer.style.display="none";
		elms.text_layer.style.display="none";
		elms.preview_layer.style.display="block";
		elms.pre_content.innerHTML=TextEditor.document.body.innerHTML;
	}else{
		elms.preview_layer.style.display="none";
		elms.pre_content.innerHTML="";
		elms.text_layer.style.display="block";
		elms.frm.text_check.checked=true;
		elms.frm.html_check.checked=false;
		elms.html_layer.style.display="none";
	}
}
/*
*게시판 모드( 새글, 수정, 답변, 리스트)상태에 따라서 웹 에디터를 초기화 한다.
*<body onLoad="init_editor('<%--=pi.getMode()--%>')">로 사용 한다.
*2003-03-07, neoburi-inkuk, neoburi@neoburi.com
*/
function init_editor( mode ){
	if( mode=="bbs.frm" || mode=="bbs.reply" ){
		init();
	}else if( mode=="bbs.modify" ){
		Edit();
	}
}