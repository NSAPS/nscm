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
public class sc_12020_dailySemifinishedProductPlanAnalysisNew_list_test extends HttpServlet {

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
			else if (mode.equals("insert")) // 
				gdRes = doInsert(gdReq);
			else if (mode.equals("update")) // 
				gdRes = doUpdata(gdReq);
			else if (mode.equals("delete")) // 
				gdRes = doDelete(gdReq);
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
			String semi_version = gdReq.getParam("semi_version");
			String semi_plant = gdReq.getParam("semi_plant");
			String paramKey = "checked_weekly!%!line_grp!%!semi_version!%!semi_plant";
			String paramCode = checked_weekly + "!%!" + line_grp + "!%!" + semi_version + "!%!" + semi_plant ;
			String query_id = "sc_12020_dailySemifinishedProductPlanAnalysisNew_list_test";

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
	        
	        
	        for (int i = 0; i < rowCount; i++) {
	        	
	        	procIdList[i] = qResult.get(i).get(4);			//작업장 콤보리스트 생성
	        	procNameList[i] = qResult.get(i).get(5);		//작업장코드 콤보리스트 생성	        	
	        	
	        	itemIdList[i] = qResult.get(i).get(6); 			//제품코드 콤보리스트 생성
	        	itemIdListHidden[i] = qResult.get(i).get(6); 	//제품코드 콤보리스트 Hidden 생성
	        	itemNameList[i] = qResult.get(i).get(7); 		//제품명 콤보리스트 생성
	        	itemSpecList[i] = qResult.get(i).get(8);		//규격 콤보리스트 생성
	        	
	        }

	        gdRes.getHeader("C07").setComboValues(procNameList, procIdList );		//작업장 콤보리스트 작업장 컬럼에 set
	        
	        gdRes.getHeader("C08").setComboValues(itemIdList, itemIdListHidden); 	//제품코드 콤보리스트 제품코드 컬럼에 set
	        gdRes.getHeader("C09").setComboValues(itemNameList, itemIdListHidden);	//제품명 콤보리스트 제품코드 컬럼에 set
	        gdRes.getHeader("C10").setComboValues(itemSpecList, itemIdListHidden);	//제품규격 콤보리스트 제품코드 컬럼에 set
	       
	        
	        //그리드에 data input
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("CRUD").addValue("", "");// CRUD
				gdRes.getHeader("C01").addValue(i + "", "");// 번호
				gdRes.getHeader("C02").addValue(qResult.get(i).get(1), qResult.get(i).get(0));// 공장/공장코드
				//gdRes.getHeader("C07").addValue(qResult.get(i).get(5), qResult.get(i).get(4));// 작업장/작업장코드

				//---------------------------------------------------------------------
				//gdRes.getHeader("C07").addSelectedHiddenValue(qResult.get(i).get(4)); // 작업장
				gdRes.getHeader("C07").addSelectedIndex(i) ;
				gdRes.getHeader("C08").addSelectedHiddenValue(qResult.get(i).get(6)); // 제품코드
				gdRes.getHeader("C09").addSelectedHiddenValue(qResult.get(i).get(6)); // 제품명
				gdRes.getHeader("C10").addSelectedHiddenValue(qResult.get(i).get(6)); // 규격
				//---------------------------------------------------------------------
				gdRes.getHeader("BAT_TO_EA").addValue(qResult.get(i).get(139),""); // BAT->EA환산수량

				gdRes.getHeader("SP01").addValue("", "");
				
				gdRes.getHeader("D01A").addValue(qResult.get(i).get(11), qResult.get(i).get(33));// 조 월/연장정보
				gdRes.getHeader("D01B").addValue(qResult.get(i).get(12), qResult.get(i).get(34));// 주
				gdRes.getHeader("D01C").addValue(qResult.get(i).get(13), qResult.get(i).get(35));// 야
				
				gdRes.getHeader("SP02").addValue("", "");
				
				gdRes.getHeader("D02A").addValue(qResult.get(i).get(14), qResult.get(i).get(36));// 조 화
				gdRes.getHeader("D02B").addValue(qResult.get(i).get(15), qResult.get(i).get(37));// 주
				gdRes.getHeader("D02C").addValue(qResult.get(i).get(16), qResult.get(i).get(38));// 야

				gdRes.getHeader("SP03").addValue("", "");
				
				gdRes.getHeader("D03A").addValue(qResult.get(i).get(17), qResult.get(i).get(39));// 조 수
				gdRes.getHeader("D03B").addValue(qResult.get(i).get(18), qResult.get(i).get(40));// 주
				gdRes.getHeader("D03C").addValue(qResult.get(i).get(19), qResult.get(i).get(41));// 야

				gdRes.getHeader("SP04").addValue("", "");
				
				gdRes.getHeader("D04A").addValue(qResult.get(i).get(20), qResult.get(i).get(42));// 조 목
				gdRes.getHeader("D04B").addValue(qResult.get(i).get(21), qResult.get(i).get(43));// 주
				gdRes.getHeader("D04C").addValue(qResult.get(i).get(22), qResult.get(i).get(44));// 야

				gdRes.getHeader("SP05").addValue("", "");
				
				gdRes.getHeader("D05A").addValue(qResult.get(i).get(23), qResult.get(i).get(45));// 조 금
				gdRes.getHeader("D05B").addValue(qResult.get(i).get(24), qResult.get(i).get(46));// 주
				gdRes.getHeader("D05C").addValue(qResult.get(i).get(25), qResult.get(i).get(47));// 야

				gdRes.getHeader("SP06").addValue("", "");
				
				gdRes.getHeader("D06A").addValue(qResult.get(i).get(26), qResult.get(i).get(48));// 조 토
				gdRes.getHeader("D06B").addValue(qResult.get(i).get(27), qResult.get(i).get(49));// 주
				gdRes.getHeader("D06C").addValue(qResult.get(i).get(28), qResult.get(i).get(50));// 야

				gdRes.getHeader("SP07").addValue("", "");
				
				gdRes.getHeader("D07A").addValue(qResult.get(i).get(29), qResult.get(i).get(51));// 조 일
				gdRes.getHeader("D07B").addValue(qResult.get(i).get(30), qResult.get(i).get(52));// 주
				gdRes.getHeader("D07C").addValue(qResult.get(i).get(31), qResult.get(i).get(53));// 야
				gdRes.getHeader("C36").addValue(qResult.get(i).get(32), "");// 합계

				gdRes.getHeader("C37").addValue(qResult.get(i).get(9), qResult.get(i).get(10));// 버전/SEQ
				
				/*-- 계획 변경 그룹 코드 / 계획 변경 그룹 상세 코드 --*/
				gdRes.getHeader("G01A").addValue(qResult.get(i).get(54), qResult.get(i).get(75));
				gdRes.getHeader("G01B").addValue(qResult.get(i).get(55), qResult.get(i).get(76));
				gdRes.getHeader("G01C").addValue(qResult.get(i).get(56), qResult.get(i).get(77));
				gdRes.getHeader("G02A").addValue(qResult.get(i).get(57), qResult.get(i).get(78));
				gdRes.getHeader("G02B").addValue(qResult.get(i).get(58), qResult.get(i).get(79));
				gdRes.getHeader("G02C").addValue(qResult.get(i).get(59), qResult.get(i).get(80));
				gdRes.getHeader("G03A").addValue(qResult.get(i).get(60), qResult.get(i).get(81));
				gdRes.getHeader("G03B").addValue(qResult.get(i).get(61), qResult.get(i).get(82));
				gdRes.getHeader("G03C").addValue(qResult.get(i).get(62), qResult.get(i).get(83));
				gdRes.getHeader("G04A").addValue(qResult.get(i).get(63), qResult.get(i).get(84));
				gdRes.getHeader("G04B").addValue(qResult.get(i).get(64), qResult.get(i).get(85));
				gdRes.getHeader("G04C").addValue(qResult.get(i).get(65), qResult.get(i).get(86));
				gdRes.getHeader("G05A").addValue(qResult.get(i).get(66), qResult.get(i).get(87));
				gdRes.getHeader("G05B").addValue(qResult.get(i).get(67), qResult.get(i).get(88));
				gdRes.getHeader("G05C").addValue(qResult.get(i).get(68), qResult.get(i).get(89));
				gdRes.getHeader("G06A").addValue(qResult.get(i).get(69), qResult.get(i).get(90));
				gdRes.getHeader("G06B").addValue(qResult.get(i).get(70), qResult.get(i).get(91));
				gdRes.getHeader("G06C").addValue(qResult.get(i).get(71), qResult.get(i).get(92));
				gdRes.getHeader("G07A").addValue(qResult.get(i).get(72), qResult.get(i).get(93));
				gdRes.getHeader("G07B").addValue(qResult.get(i).get(73), qResult.get(i).get(94));
				gdRes.getHeader("G07C").addValue(qResult.get(i).get(74), qResult.get(i).get(95));
				/*-- 계획 변경 내용/ 이력 관리 메시지 --*/
				gdRes.getHeader("M01A").addValue(qResult.get(i).get(96 ), qResult.get(i).get(117));
				gdRes.getHeader("M01B").addValue(qResult.get(i).get(97 ), qResult.get(i).get(118));
				gdRes.getHeader("M01C").addValue(qResult.get(i).get(98 ), qResult.get(i).get(119));
				gdRes.getHeader("M02A").addValue(qResult.get(i).get(99 ), qResult.get(i).get(120));
				gdRes.getHeader("M02B").addValue(qResult.get(i).get(100), qResult.get(i).get(121));
				gdRes.getHeader("M02C").addValue(qResult.get(i).get(101), qResult.get(i).get(122));
				gdRes.getHeader("M03A").addValue(qResult.get(i).get(102), qResult.get(i).get(123));
				gdRes.getHeader("M03B").addValue(qResult.get(i).get(103), qResult.get(i).get(124));
				gdRes.getHeader("M03C").addValue(qResult.get(i).get(104), qResult.get(i).get(125));
				gdRes.getHeader("M04A").addValue(qResult.get(i).get(105), qResult.get(i).get(126));
				gdRes.getHeader("M04B").addValue(qResult.get(i).get(106), qResult.get(i).get(127));
				gdRes.getHeader("M04C").addValue(qResult.get(i).get(107), qResult.get(i).get(128));
				gdRes.getHeader("M05A").addValue(qResult.get(i).get(108), qResult.get(i).get(129));
				gdRes.getHeader("M05B").addValue(qResult.get(i).get(109), qResult.get(i).get(130));
				gdRes.getHeader("M05C").addValue(qResult.get(i).get(110), qResult.get(i).get(131));
				gdRes.getHeader("M06A").addValue(qResult.get(i).get(111), qResult.get(i).get(132)); 
				gdRes.getHeader("M06B").addValue(qResult.get(i).get(112), qResult.get(i).get(133));
				gdRes.getHeader("M06C").addValue(qResult.get(i).get(113), qResult.get(i).get(134));
				gdRes.getHeader("M07A").addValue(qResult.get(i).get(114), qResult.get(i).get(135));
				gdRes.getHeader("M07B").addValue(qResult.get(i).get(115), qResult.get(i).get(136));
				gdRes.getHeader("M07C").addValue(qResult.get(i).get(116), qResult.get(i).get(137));							
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
			sql += "insert into DAILY_SCH_PLAN_MATRIX_SEMI(PLANT_ID, VERSION, PROC_ID, ITEM_ID, PROD_DATES, SHIFT_TYPE, SHIFT_QTY, ORD_NO, ORD_ITEM_NO, MADE_DTTM, MADE_BY ,CRUD) \n";

			String prod_dates = gdReq.getParam("prod_dates");
			String made_by = gdReq.getParam("user_id");
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				if( i > 0){
					sql += "union all \n"; 
				}
				String crud = gdReq.getHeader("CRUD").getValue(i);
				
				String curdValue = gdReq.getHeader("CRUD").getHiddenValue(i);;
				
				
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
					item_id= gdReq.getHeader("C08").getComboHiddenValues("ITEMID" + plant_id + proc_id)[gdReq.getHeader("C08").getSelectedIndex(i)];//제품코드
				}
				else{
					item_id= gdReq.getHeader("C08").getComboHiddenValues()[gdReq.getHeader("C08").getSelectedIndex(i)];//제품코드
				}
				
				if(crud.equals("삭제")){
					//--월(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--화(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--수(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--목(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--금(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--토(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--일(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 3 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 5 + "' , '" + 0 + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL ";
				}
				else{
					//--월(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D01A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D01B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)'),'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D01C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--화(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D02A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D02B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D02C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--수(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D03A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D03B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D03C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--목(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D04A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D04B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D04C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--금(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D05A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D05B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D05C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--토(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D06A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D06B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D06C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					//--일(조/주/야)------------------------------------------------------------------------------------------------------------------
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 1 + "' , '" + gdReq.getHeader("D07A").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 3 + "' , '" + gdReq.getHeader("D07B").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL union all \n";
					sql += "select '" + plant_id + "' ,'" + version + "' ,'" + proc_id + "' ,'" + item_id + "' ,to_char(to_date('" + prod_dates + "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 5 + "' , '" + gdReq.getHeader("D07C").getValue(i) + "','" + "" + "' ,'" + "" + "' ,SYSDATE ,'" + made_by + "' ,'"+curdValue+"' from DUAL ";
				}
				
			}
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			System.out.println("call SP_12020_dailySemifinished() 실행!!!");
			
			String sql2 = "call SP_12020_dailySemifinished('" + made_by + "')";
			
			stmt.execute(sql2);
			
			System.out.println("call SP_12020_dailySemifinished() 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}

	/* */
	private GridData doInsert(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		// append StringBuffer insert_data
		String insertData = "";

		try {
			//
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

			//
			String inData[][] = new String[rowCount][];

			//
			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq
								.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq
								.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}

			/*
			 * 
			 */

			//
			//
			insertData = getSendData(inData, "C");

			/*
			 * 
			 * 
			 */
			gdRes.addParam("mode", "insert");
			gdRes.addParam("insert_data", insertData);
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	/**/
	private GridData doUpdata(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		//
		String updatedata = "";

		try {
			//
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

			//
			String inData[][] = new String[rowCount][];

			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq
								.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq
								.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}

			/*
			 * 
			 */

			//
			//
			updatedata = getSendData(inData, "U");

			/*
			 * 
			 * 
			 */
			gdRes.addParam("mode", "update");
			gdRes.addParam("update_data", updatedata);
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	/* */
	private GridData doDelete(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		// 
		String deleteData = "";

		try {
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			String inData[] = new String[rowCount];

			/*
			 * 
			 */

			// 
			// 
			deleteData = getSendData2(inData);

			/*
			 * 
			 * 
			 */
			gdRes.addParam("mode", "delete");
			gdRes.addParam("delete_data", deleteData);
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	private String getSendData(String[][] sendData, String flag) {

		StringBuffer sbData = new StringBuffer();

		for (int i = 0; i < sendData.length; i++) {
			String[] rowData = (String[]) sendData[i];
			for (int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("\n");
		}

		if (flag.equals("C"))
			sbData.append(sendData.length + "\n");
		else if (flag.equals("U"))
			sbData.append(sendData.length + "\n");

		return sbData.toString();
	}

	private String getSendData2(String[] sendData) {

		StringBuffer sbData = new StringBuffer();

		sbData.append(sendData.length + "\n");

		return sbData.toString();
	}
}