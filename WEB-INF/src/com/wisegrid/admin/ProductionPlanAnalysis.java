package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zionex.t3sinc.common.CommonUtil;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;


/**
 * 
 * @author iCOMPIA CORP.
 */
public class ProductionPlanAnalysis extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;

	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	String sql = null;

	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		
		GridData gdReq = null;
		GridData gdRes = null;

		System.out.println("START...");

		// Encode Type; UTF-8
		req.setCharacterEncoding("UTF-8");
		res.setContentType("text/html;charset=UTF-8");

		PrintWriter out = res.getWriter();
		try {
			// WISEGRID_DATA Param WiseGridG
			String rawData = req.getParameter("WISEGRID_DATA");

			// 
			gdReq = OperateGridData.parse(rawData);

			//
			String mode = gdReq.getParam("mode");

			if (mode.equals("search")) // 조회
				gdRes = doQuery(gdReq);
			else if (mode.equals("save")) // 저장
				gdRes = doSave(gdReq);

		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				//
				OperateGridData.write(gdRes, out);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0; 

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			String checked_weekly = gdReq.getParam("checked_weekly");
			String line_grp = gdReq.getParam("line_grp");
			String plant_version = gdReq.getParam("plant_version");
			String checked_multi = gdReq.getParam("checked_multi");
			String domain = gdReq.getParam("domain");
			String paramKey = "checked_weekly!%!line_grp!%!plant_version!%!checked_multi!%!domain";
			String paramCode = checked_weekly + "!%!" + line_grp + "!%!"
					+ plant_version + "!%!" + checked_multi + "!%!" + domain;
			String query_id = "sc_11020_dailyProductionPlanAnalysisNew_test";

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			String[] procIdList = new String[rowCount];
			String[] procNameList = new String[rowCount];
			
			String[] itemIdList = new String[rowCount];
	        String[] itemIdListHidden = new String[rowCount];
	        String[] itemNameList = new String[rowCount];
	        String[] itemSpecList = new String[rowCount];
	        String[] toWomanList = new String[rowCount];
	        String[] mtoMtsList	= new String[rowCount];
	        
	        for (int i = 0; i < rowCount; i++) {
	        	
	        	procIdList[i] = qResult.get(i).get(3);			//작업장 콤보리스트 생성
	        	procNameList[i] = qResult.get(i).get(4);		//작업장코드 콤보리스트 생성
	        	
	        	itemIdList[i] = qResult.get(i).get(5); 			//제품코드 콤보리스트 생성
	        	itemIdListHidden[i] = qResult.get(i).get(5); 	//제품코드 콤보리스트 Hidden 생성
	        	itemNameList[i] = qResult.get(i).get(6); 		//제품명 콤보리스트 생성
	        	itemSpecList[i] = qResult.get(i).get(7);		//규격 콤보리스트 생성
	        	toWomanList[i] = qResult.get(i).get(60);		//TO여 콤보리스트 생성
	        	mtoMtsList[i] = qResult.get(i).get(10);			//구분 콤보리스트 생성
	        }
	        
	        gdRes.getHeader("C07").setComboValues(procNameList, procIdList );		//작업장 콤보리스트 작업장 컬럼에 set
	        
	        gdRes.getHeader("C08").setComboValues(itemIdList, itemIdListHidden); 	//제품코드 콤보리스트 제품코드 컬럼에 set
	        gdRes.getHeader("C09").setComboValues(itemNameList, itemIdListHidden);	//제품명 콤보리스트 제품코드 컬럼에 set
	        gdRes.getHeader("C10").setComboValues(itemSpecList, itemIdListHidden);	//제품규격 콤보리스트 제품코드 컬럼에 set
	        gdRes.getHeader("C11").setComboValues(toWomanList, itemIdListHidden);	//TO여 콤보리스트 제품코드 컬럼에 set
	        gdRes.getHeader("C12").setComboValues(mtoMtsList, itemIdListHidden);	//구분 콤보리스트 제품코드 컬럼에 set
	        
	        //그리드에 data input
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("CRUD").addValue("", "");// CRUD
				gdRes.getHeader("C01").addValue(i + "", "");// 번호
				gdRes.getHeader("C02").addValue(qResult.get(i).get(1), qResult.get(i).get(0));// 공장/공장코드
				gdRes.getHeader("C03").addValue(qResult.get(i).get(2), "");// 원가부문
				gdRes.getHeader("C04").addValue(qResult.get(i).get(62), "");// 조
				gdRes.getHeader("C05").addValue(qResult.get(i).get(63), "");// 주
				gdRes.getHeader("C06").addValue(qResult.get(i).get(64), "");// 야
//				gdRes.getHeader("C07").addValue(qResult.get(i).get(4), qResult.get(i).get(3));// 작업장/작업장코드
//				gdRes.getHeader("C08").addValue(qResult.get(i).get(8), "");// 제품코드
//				gdRes.getHeader("C09").addValue(qResult.get(i).get(9), "");// 제품명
//				gdRes.getHeader("C10").addValue(qResult.get(i).get(10), "");// 규격
//				gdRes.getHeader("C11").addValue(qResult.get(i).get(62), "");// TO여
//				gdRes.getHeader("C12").addValue(qResult.get(i).get(13), "");// 구분
				//---------------------------------------------------------------------
				//gdRes.getHeader("C07").addSelectedHiddenValue(qResult.get(i).get(3)); 
				gdRes.getHeader("C07").addSelectedIndex(i) ;
				gdRes.getHeader("C08").addSelectedHiddenValue(qResult.get(i).get(5)); 
				gdRes.getHeader("C09").addSelectedHiddenValue(qResult.get(i).get(5));
				gdRes.getHeader("C10").addSelectedHiddenValue(qResult.get(i).get(5));
				gdRes.getHeader("C11").addSelectedHiddenValue(qResult.get(i).get(5));
				gdRes.getHeader("C12").addSelectedHiddenValue(qResult.get(i).get(5));
				//---------------------------------------------------------------------
				
				gdRes.getHeader("C13").addValue(qResult.get(i).get(11), "");// 어더번호
				gdRes.getHeader("C14").addValue(qResult.get(i).get(61), "");// 오더항목번호
				gdRes.getHeader("C15").addValue(qResult.get(i).get(12), "");// 의뢰량

				gdRes.getHeader("SP01").addValue("", "");
				
				gdRes.getHeader("D01A").addValue(qResult.get(i).get(13), qResult.get(i).get(36));// 조 월/연장정보
				gdRes.getHeader("D01B").addValue(qResult.get(i).get(14), qResult.get(i).get(37));// 주
				gdRes.getHeader("D01C").addValue(qResult.get(i).get(15), qResult.get(i).get(38));// 야
				
				gdRes.getHeader("SP02").addValue("", "");
				
				gdRes.getHeader("D02A").addValue(qResult.get(i).get(16), qResult.get(i).get(39));// 조 화
				gdRes.getHeader("D02B").addValue(qResult.get(i).get(17), qResult.get(i).get(40));// 주
				gdRes.getHeader("D02C").addValue(qResult.get(i).get(18), qResult.get(i).get(41));// 야

				gdRes.getHeader("SP03").addValue("", "");
				
				gdRes.getHeader("D03A").addValue(qResult.get(i).get(19), qResult.get(i).get(42));// 조 수
				gdRes.getHeader("D03B").addValue(qResult.get(i).get(20), qResult.get(i).get(43));// 주
				gdRes.getHeader("D03C").addValue(qResult.get(i).get(21), qResult.get(i).get(44));// 야

				gdRes.getHeader("SP04").addValue("", "");
				
				gdRes.getHeader("D04A").addValue(qResult.get(i).get(22), qResult.get(i).get(45));// 조 목
				gdRes.getHeader("D04B").addValue(qResult.get(i).get(23), qResult.get(i).get(46));// 주
				gdRes.getHeader("D04C").addValue(qResult.get(i).get(24), qResult.get(i).get(47));// 야

				gdRes.getHeader("SP05").addValue("", "");
				
				gdRes.getHeader("D05A").addValue(qResult.get(i).get(25), qResult.get(i).get(48));// 조 금
				gdRes.getHeader("D05B").addValue(qResult.get(i).get(26), qResult.get(i).get(49));// 주
				gdRes.getHeader("D05C").addValue(qResult.get(i).get(27), qResult.get(i).get(50));// 야

				gdRes.getHeader("SP06").addValue("", "");
				
				gdRes.getHeader("D06A").addValue(qResult.get(i).get(28), qResult.get(i).get(51));// 조 토
				gdRes.getHeader("D06B").addValue(qResult.get(i).get(29), qResult.get(i).get(52));// 주
				gdRes.getHeader("D06C").addValue(qResult.get(i).get(30), qResult.get(i).get(53));// 야

				gdRes.getHeader("SP07").addValue("", "");
				
				gdRes.getHeader("D07A").addValue(qResult.get(i).get(31), qResult.get(i).get(54));// 조 일
				gdRes.getHeader("D07B").addValue(qResult.get(i).get(32), qResult.get(i).get(55));// 주
				gdRes.getHeader("D07C").addValue(qResult.get(i).get(33), qResult.get(i).get(56));// 야
				gdRes.getHeader("C36").addValue(qResult.get(i).get(34), "");// 합계
				gdRes.getHeader("C38").addValue(qResult.get(i).get(35), "");// 차이
				gdRes.getHeader("C37").addValue(qResult.get(i).get(8), qResult.get(i).get(9));// 버전/SEQ
				/*-- 계획 변경 그룹 코드 / 계획 변경 그룹 상세 코드 --*/
				gdRes.getHeader("G01A").addValue(qResult.get(i).get(65), qResult.get(i).get(86));
				gdRes.getHeader("G01B").addValue(qResult.get(i).get(66), qResult.get(i).get(87));
				gdRes.getHeader("G01C").addValue(qResult.get(i).get(67), qResult.get(i).get(88));
				gdRes.getHeader("G02A").addValue(qResult.get(i).get(68), qResult.get(i).get(89));
				gdRes.getHeader("G02B").addValue(qResult.get(i).get(69), qResult.get(i).get(90));
				gdRes.getHeader("G02C").addValue(qResult.get(i).get(70), qResult.get(i).get(91));
				gdRes.getHeader("G03A").addValue(qResult.get(i).get(71), qResult.get(i).get(92));
				gdRes.getHeader("G03B").addValue(qResult.get(i).get(72), qResult.get(i).get(93));
				gdRes.getHeader("G03C").addValue(qResult.get(i).get(73), qResult.get(i).get(94));
				gdRes.getHeader("G04A").addValue(qResult.get(i).get(74), qResult.get(i).get(95));
				gdRes.getHeader("G04B").addValue(qResult.get(i).get(75), qResult.get(i).get(96));
				gdRes.getHeader("G04C").addValue(qResult.get(i).get(76), qResult.get(i).get(97));
				gdRes.getHeader("G05A").addValue(qResult.get(i).get(77), qResult.get(i).get(98));
				gdRes.getHeader("G05B").addValue(qResult.get(i).get(78), qResult.get(i).get(99));
				gdRes.getHeader("G05C").addValue(qResult.get(i).get(79), qResult.get(i).get(100));
				gdRes.getHeader("G06A").addValue(qResult.get(i).get(80), qResult.get(i).get(101));
				gdRes.getHeader("G06B").addValue(qResult.get(i).get(81), qResult.get(i).get(102));
				gdRes.getHeader("G06C").addValue(qResult.get(i).get(82), qResult.get(i).get(103));
				gdRes.getHeader("G07A").addValue(qResult.get(i).get(83), qResult.get(i).get(104));
				gdRes.getHeader("G07B").addValue(qResult.get(i).get(84), qResult.get(i).get(105));
				gdRes.getHeader("G07C").addValue(qResult.get(i).get(85), qResult.get(i).get(106));
				/*-- 계획 변경 내용/ 이력 관리 메시지 --*/
				gdRes.getHeader("M01A").addValue(qResult.get(i).get(107), qResult.get(i).get(128));
				gdRes.getHeader("M01B").addValue(qResult.get(i).get(108), qResult.get(i).get(129));
				gdRes.getHeader("M01C").addValue(qResult.get(i).get(109), qResult.get(i).get(130));
				gdRes.getHeader("M02A").addValue(qResult.get(i).get(110), qResult.get(i).get(131));
				gdRes.getHeader("M02B").addValue(qResult.get(i).get(111), qResult.get(i).get(132));
				gdRes.getHeader("M02C").addValue(qResult.get(i).get(112), qResult.get(i).get(133));
				gdRes.getHeader("M03A").addValue(qResult.get(i).get(113), qResult.get(i).get(134));
				gdRes.getHeader("M03B").addValue(qResult.get(i).get(114), qResult.get(i).get(135));
				gdRes.getHeader("M03C").addValue(qResult.get(i).get(115), qResult.get(i).get(136));
				gdRes.getHeader("M04A").addValue(qResult.get(i).get(116), qResult.get(i).get(137));
				gdRes.getHeader("M04B").addValue(qResult.get(i).get(117), qResult.get(i).get(138));
				gdRes.getHeader("M04C").addValue(qResult.get(i).get(118), qResult.get(i).get(139));
				gdRes.getHeader("M05A").addValue(qResult.get(i).get(119), qResult.get(i).get(140));
				gdRes.getHeader("M05B").addValue(qResult.get(i).get(120), qResult.get(i).get(141));
				gdRes.getHeader("M05C").addValue(qResult.get(i).get(121), qResult.get(i).get(142));
				gdRes.getHeader("M06A").addValue(qResult.get(i).get(122), qResult.get(i).get(143)); 
				gdRes.getHeader("M06B").addValue(qResult.get(i).get(123), qResult.get(i).get(144));
				gdRes.getHeader("M06C").addValue(qResult.get(i).get(124), qResult.get(i).get(145));
				gdRes.getHeader("M07A").addValue(qResult.get(i).get(125), qResult.get(i).get(146));
				gdRes.getHeader("M07B").addValue(qResult.get(i).get(126), qResult.get(i).get(147));
				gdRes.getHeader("M07C").addValue(qResult.get(i).get(127), qResult.get(i).get(148));							
			}
		
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "search");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	/*
	 * insert, update, delete
	 */
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("C01").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql = "";
			sql += "insert into DAILY_SCH_PLAN_MATRIX(PLANT_ID, VERSION, PROC_ID, ITEM_ID, PROD_DATES, SHIFT_TYPE, SHIFT_QTY, ORD_NO, ORD_ITEM_NO, MADE_DTTM, MADE_BY ,CRUD) \n";

			String prod_dates = gdReq.getParam("prod_dates");
			String made_by = gdReq.getParam("user_id");
			
			String plantList = gdReq.getParam("plantList");
			String versionList = gdReq.getParam("versionList");
			String msgVersion = gdReq.getParam("msgVersion");
			
			
			setMsgVersion(plantList, versionList, msgVersion);
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
                String curdValue = gdReq.getHeader("CRUD").getHiddenValue(i);;
				
				if( i > 0){
					sql += "union all \n"; 
				}
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println(crud);
				String plant_id = gdReq.getHeader("C02").getHiddenValue(i);//공장코드
				String version = gdReq.getHeader("C37").getValue(i);//버전
				//String proc_id = gdReq.getHeader("C07").getHiddenValue(i);//작업장 코드
				
				String proc_id = "";
				if(crud.equals("C") && gdReq.getHeader("C07").hasComboList("PROCLIST" + plant_id)){
					proc_id = gdReq.getHeader("C07").getComboHiddenValues("PROCLIST" + plant_id)[gdReq.getHeader("C07").getSelectedIndex(i)];//
				}else{
					proc_id = gdReq.getHeader("C07").getComboHiddenValues()[gdReq.getHeader("C07").getSelectedIndex(i)];//
				}
				
				String item_id = "";
				// 추가된 Row이면 새로 생성된 콤보리스트 이용하여 item_id를 구한다.
				if(crud.equals("C") && gdReq.getHeader("C08").hasComboList("ITEMID" + plant_id + proc_id)){
					item_id = gdReq.getHeader("C08").getComboHiddenValues("ITEMID" + plant_id + proc_id)[gdReq.getHeader("C08").getSelectedIndex(i)];//제품코드
				}
				else{
					item_id = gdReq.getHeader("C08").getComboHiddenValues()[gdReq.getHeader("C08").getSelectedIndex(i)];//제품코드
				}
				
				String ord_no = gdReq.getHeader("C13").getValue(i);//오더 번호
				String ord_item_no = gdReq.getHeader("C14").getValue(i);//오더 항목 번호
				
				if(crud.equals("삭제")){
					//--월(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--화(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--수(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--목(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--금(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--토(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--일(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL ";
				}
				else{
					//--월(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D01A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D01B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D01C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--화(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D02A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D02B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D02C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--수(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D03A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D03B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D03C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--목(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D04A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D04B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D04C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--금(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D05A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D05B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D05C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--토(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D06A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D06B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D06C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--일(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D07A").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D07B").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D07C").getValue(i) + "','" + ord_no + "' ,'" + ord_item_no + "' ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL ";
				}
				
			}
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			System.out.println("call SP_11020_DailyProductionPlan() 실행!!!");
			
			String sql2 = "call SP_11020_DailyProductionPlan('" + made_by + "')";
			
			stmt.execute(sql2);
			
			System.out.println("call SP_11020_DailyProductionPlan() 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		} finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}

	private void setMsgVersion(String plantList, String versionList, String msgVersion) throws Exception {
		
		Connection con = databaseUtility.getConnection("t3sinc"); // DB Connection
		Statement stm = conn.createStatement(); // statement 객체 생성
		ResultSet re = null;
		
		String[] pList = plantList.split(",");
		String[] vList = versionList.split(",");
		
		String sql1 = "INSERT  INTO PLAN_MSG_VERSION(VERSION, PLANT_ID, MSG_VERSION, MADE_DTTM) \n";
		String sql2 = "INSERT  INTO PLAN_MSG_VERSION(VERSION, PLANT_ID, MSG_VERSION, MADE_DTTM) \n";
		
		for( int i = 0 ; i < pList.length ; i++ ){
			if( i > 0 ) {
				sql1 += "UNION ALL \n";
				sql2 += "UNION ALL \n";
			}
			/*
			 * 	PLAN_MSG_VERSION 테이블에 해당 계획버전이 없으면 
			 *	DEFAULT로 
			 *	MSG_VERSION '1'
			 *	MADE_DTTM '1900-01-01' 로 세팅
			 */
			sql1 += "SELECT  '" + vList[i] + "' VERSION, " + pList[i] + " PLANT_ID, '1' MSG_VERSION, TO_DATE('19000101','YYYYMMDD') MADE_DTTM \n"
			     +  "FROM    DUAL 														\n"
			     +  "WHERE   NOT EXISTS  (												\n"
			     +  "                        SELECT  VERSION							\n"
			     +  "                        FROM    PLAN_MSG_VERSION DS				\n"
			     +  "                        WHERE   DS.PLANT_ID = " + pList[i] + "		\n"
			     +  "                        AND     DS.VERSION  = '" + vList[i] + "'	\n"
			     +  "                    )												\n";
			
			/*
			 * 	MSG_VERSION이 없을경우 INSERT
			 */
			sql2 += "SELECT  '" + vList[i] + "' VERSION, " + pList[i] + " PLANT_ID, '" + msgVersion + "' MSG_VERSION, SYSDATE MADE_DTTM \n"
		     +  "FROM    DUAL 														\n"
		     +  "WHERE   NOT EXISTS  (												\n"
		     +  "                        SELECT  VERSION							\n"
		     +  "                        FROM    PLAN_MSG_VERSION DS				\n"
		     +  "                        WHERE   DS.PLANT_ID = " + pList[i] + "		\n"
		     +  "                        AND     DS.VERSION  = '" + vList[i] + "'	\n"
		     +  "                        AND     MSG_VERSION = '" + msgVersion + "' \n"
		     +  "                    )												\n";
		}
		
		System.out.println("----- PLAN_MSG_VERSION 테이블 INSERT ----------");
		System.out.println(sql1);
		System.out.println(sql2);
		try{
			re = databaseUtility.executeQuery(stm, sql1);
			re = databaseUtility.executeQuery(stm, sql2);
			
		}catch (Exception e) {
			throw e;
		} finally {
            databaseUtility.close(con, stm, re);              
        }
	}
}