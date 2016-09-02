function setProperty(GridObj)
{
    GridObj.strHDFontName = "굴림";
    GridObj.strCellFontName = "굴림";
    // Cell Font Setting
    GridObj.nCellFontSize = 9;

    // Header Font Setting
    GridObj.nHDFontSize = 9;
    //GridObj.bHDFontBold = false;

    GridObj.bMultiRowMenuVisible = false;

    // Header Color
    GridObj.strHDBgColor="242|242|242";
    GridObj.strHDFgColor="0|0|0";//"114|86|177";

    // Cell Color
    GridObj.strGridBgColor="255|255|255";
    GridObj.strCellBgColor="255|255|255";
    GridObj.strCellFgColor="0|0|0";//"51|51|51";

    // Border Style
    GridObj.strGridBorderColor = "204|204|204";
    GridObj.strGridBorderStyle = "solidline";
    GridObj.strHDBorderStyle   = "raisedsoft"//"solidline";
    GridObj.strCellBorderStyle = "raisedsoft"//"solidline";

    // ETC Color
//    GridObj.strActiveRowBgColor="214|228|236";
    //GridObj.strSelectedCellBgColor = "241|231|221";
    //GridObj.strSelectedCellFgColor = "51|51|51";
    //GridObj.strStatusbarBgColor = "243|243|243";
    //GridObj.strStatusbarFgColor = "101|101|101";
    //GridObj.strProgressbarColor = "0|126|174"; 


    // ETC
    GridObj.bRowSelectorVisible = false;
    GridObj.nAlphaLevel         = 0;
    GridObj.nHDLineSize         = 28; //Header Size
    GridObj.nRowHeight          = 18;
    GridObj.SetHelpInfo();
    GridObj.bAbortQueryVisible = true;

    GridObj.bUserContextMenu    = false;
    GridObj.bHDMoving           = false;        //사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
    GridObj.bHDSwapping         = false;        //헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
    GridObj.bRowSelectorVisible = false;        //로우 셀렉터를 WiseGrid에서 숨긴다,. 
    GridObj.strRowBorderStyle   = "none";       //로우의 테두리에 아무것도 나타나지 않는다.  
    GridObj.nRowSpacing         = 0;            //RowSpacing값을 정한다. 
    GridObj.strHDClickAction    = "select";     //클릭한 컬럼의 셀을 선택가능하게 한다.
    GridObj.strActiveRowBgColor = "default";    //선택된 행의 배경색상을 설정한다.    
  
    GridObj.bHDMoving=false;
    GridObj.bHDSwapping = false;
    
    
}

function btn(a,b){
    document.write ("<table cellpadding=0 cellspacing=0 border=0 height=23 onClick="+a+" style=cursor:hand><tr><td width=15 class=btn_left>");
    document.write ("<img src=/scm/WiseGrid/images/images/blank.gif width=15 height=1></td>");
    document.write ("<td class=btn_txt valign=middle>"+b+"</td><td width=4 class=btn_right><img src=/scm/WiseGrid/images/blank.gif width=4></td></tr></table>");
}

//var Project_name="/WiseGrid_Java_Sample";
var Project_name="/";

var Mcolor = "222|227|242"; //Mandatory
var Ocolor = "223|241|230"; //Optionally
var Rcolor = "255|255|255"; //ReadOnly
var Scolor = "249|247|183"; //Summary Background Color
var Lcolor = "0|0|255"; //Link Color

var nfCaseAmt = "#,##0";
var nfCaseAmtFor = "#,##0.00";
var nfCaseQty = "#,##0.000";
var nfCasePrice = "#,##0.00000";