package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zionex.t3sinc.common.CommonUtil;
import com.zionex.t3sinc.common.ControlBoard.MyLoadTask;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;

import com.zionex.t3sinc.util.db.SincDatabaseUtility;
/** 
 * 
 * @author iCOMPIA CORP.
 */
public class sc_01060_plantAllocationPlanResultAnalysis_grid extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sql 	= null;
	//Map sessionMap 	= new HashMap();
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();	
	
	boolean endChk = true; // 전송 상태 체크 종료 여부 flag
	
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
			
			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);
			else if (mode.equals("save"))
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
	
	/* 조회 */
	public GridData doQuery(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();		
		int rowCount = 0;

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
									
			//String p_plant_id = gdReq.getParam("plant_id");
			String p_plant_alloc_version = gdReq.getParam("plant_alloc_version");
			String p_sdate  = gdReq.getParam("sdate");
			String p_checked_domain  = gdReq.getParam("checked_domain");
			String p_checked_pa_pr  = gdReq.getParam("checked_pa_pr");
			//String p_edate  = gdReq.getParam("edate");
			//String p_checked_po_type = gdReq.getParam("checked_po_type");
			
			System.out.println("p_plant_alloc_version : "+p_plant_alloc_version);
			System.out.println("p_sdate : "+p_sdate);
			System.out.println("p_checked_domain : "+p_checked_domain);
			System.out.println("p_checked_pa_pr : "+p_checked_pa_pr);
			
			//System.out.println("p_edate"+p_edate);
			
			//쿼리단에서 사용되는 키(ID) 값을 설정.
			//String paramKey   ="selected_plant!%!sdate!%!edate";
			String paramKey   ="plant_alloc_version!%!sdate!%!checked_domain!%!checked_pa_pr";
			
			//쿼리단에서 사용되는 키값의 실제 값을 설정.
			//String paramCode  = p_plant_id + "!%!" + p_sdate + "!%!" + p_edate;
			String paramCode  = p_plant_alloc_version + "!%!" + p_sdate + "!%!" + p_checked_domain + "!%!" + p_checked_pa_pr;
			
			//String query_id   = "sc_12030_dailyProductionPlanPoTrans_list" + p_checked_po_type;
			String query_id   = "sc_01060_plantAllocationPlanResultAnalysis_grid";

			//ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			rowCount = qResult.size();
			
			System.out.println("조회완료!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println(qResult);
			
			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");	
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			for (int i = 0; i < rowCount; i++) {
				
				//qResult는 0부터 시작함. , rs 는 1부터 시작함!! 
				//gdRes.getHeader("RES_TP" ).addValue(rs.getString(1), "");
                gdRes.getHeader("RES_TP" ).addValue(qResult.get(i).get(2 ), ""); //설비유형
                gdRes.getHeader("ITEM_ID"  ).addValue(qResult.get(i).get(3 ), ""); //자재코드
                gdRes.getHeader("ITEM_NAME"  ).addValue(qResult.get(i).get(4 ), ""); //자재코드명
                gdRes.getHeader("W3_AVG_RATIO"  ).addValue(qResult.get(i).get(5 ), ""); //3주평균접근율 (당주)
                gdRes.getHeader("W1_AVG_RATIO"  ).addValue(qResult.get(i).get(6 ), ""); //1주평균접근율 (당주)
                gdRes.getHeader("SAFETY_STOCK"  ).addValue(qResult.get(i).get(7 ), ""); //안전재고 (당주)
                gdRes.getHeader("BASE_STOCK"  ).addValue(qResult.get(i).get(8 ), ""); //기초재고 (당주)
                gdRes.getHeader("RECEIPT_EXPT"  ).addValue(qResult.get(i).get(9 ), ""); //금주생산계획 (당주)
                gdRes.getHeader("SALES_PLAN"  ).addValue(qResult.get(i).get(10), ""); //금주판매계획 (당주)
                gdRes.getHeader("SALES_ACT_VS_SALES_PLAN_1"  ).addValue(qResult.get(i).get(38), ""); //금주 판매계획 - 금주 1주 평균 판매실적 (금주 판매계획 대비 실적) (당주)
                gdRes.getHeader("SALES_VS_WEEK1_AVG"  ).addValue(qResult.get(i).get(11), ""); //1주평균판매대비 (당주)
                gdRes.getHeader("EXPERT_STOCK"  ).addValue(qResult.get(i).get(12), ""); //예상재고(차주초)
                gdRes.getHeader("N_PLAN_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(31), ""); //차주계획대비재고일수
                gdRes.getHeader("N_ACT_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(32), ""); //차주실적대비재고일수
                gdRes.getHeader("N_RECEIPT_EXPT"  ).addValue(qResult.get(i).get(13), ""); //차주생산계획
                gdRes.getHeader("RP1_QTY"  ).addValue(qResult.get(i).get(18), "");//보충요구량(차주)
                gdRes.getHeader("PO_QTY1"  ).addValue(qResult.get(i).get(20), ""); //생산필요량(차주)
                gdRes.getHeader("NWK_ADJ_QTY"  ).addValue(qResult.get(i).get(24), ""); //요구/생산 차이 (차주)
                gdRes.getHeader("W1_SALES_PLAN_DIFF"  ).addValue(qResult.get(i).get(41), ""); //1주평균 판매 계획 가감량
                gdRes.getHeader("W3_SALES_PLAN_DIFF"  ).addValue(qResult.get(i).get(42), ""); //3주평균 판매 계획 가감량
                gdRes.getHeader("N_SALES_PLAN"  ).addValue(qResult.get(i).get(25), ""); //차주판매계획
                gdRes.getHeader("SALES_ACT_VS_SALES_PLAN_2"  ).addValue(qResult.get(i).get(39), ""); //차주 판매계획 - 차주 1주 평균 판매실적 (차주 판매계획대비 실적)
                gdRes.getHeader("EXPERT_STOCK2"  ).addValue(qResult.get(i).get(26), ""); //예상재고(차차주)
                gdRes.getHeader("NN_PLAN_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(33), ""); //차차주계획대비재고일수
                gdRes.getHeader("NN_ACT_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(34), ""); //차차주실적대비재고일수
                gdRes.getHeader("RP2_QTY"  ).addValue(qResult.get(i).get(19), ""); //보충요구량(차차주)
                gdRes.getHeader("PO_QTY2"  ).addValue(qResult.get(i).get(21), ""); //차차주 생산필요량.
                gdRes.getHeader("NN_SALES_PLAN"  ).addValue(qResult.get(i).get(22), ""); //차차주판매계획
                gdRes.getHeader("SALES_ACT_VS_SALES_PLAN_3"  ).addValue(qResult.get(i).get(40), ""); //차차주 판매계획 - 차차주 1주 평균 판매실적 (차차주 판매계획대비 실적)
                gdRes.getHeader("EXPERT_STOCK3"  ).addValue(qResult.get(i).get(23), ""); //차차차주 예상재고 (차차주) 기말!! 예상재고.
                gdRes.getHeader("NNN_ACT_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(37), ""); //차차차주실적대비재고일수 (차차주) 기말! 실적대비재고일수.
                gdRes.getHeader("CRUD" ).addValue(qResult.get(i).get(43 ), ""); //와이즈그리드의 crud 상태값을 가져옴 (수정 삭제 삽입)
                gdRes.getHeader("RP0_QTY" ).addValue(qResult.get(i).get(17 ), ""); //당주 생산필요량
                gdRes.getHeader("W1" ).addValue(qResult.get(i).get(44 ), ""); //당주 DUE_DATE (해당 주의 토요일을 가져옴)
                gdRes.getHeader("W2" ).addValue(qResult.get(i).get(45 ), ""); //차주 DUE_DATE (해당 주의 토요일을 가져옴)
                gdRes.getHeader("W3" ).addValue(qResult.get(i).get(46 ), ""); //차차주 DUE_DATE (해당 주의 토요일을 가져옴)
                gdRes.getHeader("NNWK_WORK" ).addValue(qResult.get(i).get(35 ), ""); //차차주 영업일수
                gdRes.getHeader("SALES_MEAN_1WEEK" ).addValue(qResult.get(i).get(36 ), ""); //1주 평균 판매
                gdRes.getHeader("MI_CHGO" ).addValue(qResult.get(i).get(47 ), ""); //수출 미출고
                
 			}

			//gdRes.addParam("mode", gdReq.getParam("mode"));
			gdRes.addParam("mode", "search");
			gdRes.setMessage("조회완료");
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
		int union_check = 0; // UNION ALL 포함여부 CHECK
		

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			String mode = gdReq.getParam("mode");
			
			String p_in_up_chk = gdReq.getParam("p_in_up_chk");
			
			String p_plant_alloc_version = gdReq.getParam("plant_alloc_version");
			String p_sdate  = gdReq.getParam("sdate");
			String P_checked_domain  = gdReq.getParam("checked_domain");
			String p_checked_pa_pr  = gdReq.getParam("checked_pa_pr");
			String made_by = gdReq.getParam("user_id");

			String version = "";
			String item_id = "";
			String due_date1 = ""; //당주 해당 토요일
			String due_date2 = ""; //차주 해당 토요일
			String due_date3 = ""; //차차주 해당 토요일
			String made_type = "C";
			String made_dttm = "SYSDATE";

			
			//당주 생산필요량
			String rp0_qty = "";
			//차주 생산필요량.
			String po_qty1 = "";
			//차차주 생산필요량.
			String po_qty2 = "";
			
			String crud = "";
			
			System.out.println("p_plant_alloc_version : "+p_plant_alloc_version);
			System.out.println("p_sdate : "+p_sdate);
			System.out.println("P_checked_domain : "+P_checked_domain);
			System.out.println("p_checked_pa_pr : "+p_checked_pa_pr);
			System.out.println("p_in_up_chk : "+p_in_up_chk);

			
			
			//보정할 건수가 없을때 오류안나게하기위해.
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql1 = "";
			String sql = "";
			
			//버젼이 없으면 해당 버젼의 PLANT_ALLOC_PLAN 테이블내용을 모두 PLANT_ALLOC_ITEM_ADJ 테이블에 INSERT!!
			//쿼리,에서 분석해서 데이터 insert 기준을 가져온다.
/* 왜 이렇게 해야하는지 모르겠음 _ 2009.06.17 */
/*			
			if(p_in_up_chk.equals("p_insert")){
				
				//sql += "insert into DAILY_SCH_PLAN_MATRIX(PLANT_ID, VERSION, PROC_ID, ITEM_ID, PROD_DATES, SHIFT_TYPE, SHIFT_QTY, ORD_NO, ORD_ITEM_NO, MADE_DTTM, MADE_BY) \n";
				sql1 = "INSERT INTO PLANT_ALLOC_ITEM_ADJ(VERSION, ITEM_ID, DUE_DATE, LST_PRODQTY, MADE_TYPE, MADE_DTTM, MADE_BY) \n";
				sql1 += "SELECT VERSION, ITEM_ID, DUE_DATE, SUM(QTY) AS QTY, '"+made_type+"', SYSDATE, '"+made_by+"' \n";
				sql1 += "  FROM PLANT_ALLOC_PLAN WHERE VERSION = '" + p_plant_alloc_version + "' \n";
				sql1 += " GROUP BY VERSION, ITEM_ID, DUE_DATE  \n";
                
    			System.out.println("-----------------------------------------------QUERY1111-----------------------------------------------");
    			System.out.println(sql1);
    			System.out.println("-----------------------------------------------QUERY1111-----------------------------------------------");
    			
    			System.out.println("executeQuery111 실행!!!");                
                
                rs = databaseUtility.executeQuery(stmt, sql1);
                
                System.out.println("executeQuery111 종료!!!");
			}
*/			
			
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
				sql  = "merge into PLANT_ALLOC_ITEM_ADJ PA \n";
				sql += "using ( \n";
			
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				if(gdReq.getHeader("ITEM_ID").getValue(i).equals("소계") || gdReq.getHeader("ITEM_NAME").getValue(i).equals("총계")){
					 System.out.println("ITEM_ID가 소계이거나 ITEM_NAME이 총계일때는 아무것도 실행안함!!!!");
				 } else {
					 
					if( union_check > 0){
						sql += "union all \n"; 
					}
					crud = gdReq.getHeader("CRUD").getValue(i);
					System.out.println(gdReq.getHeader("ITEM_NAME").getValue(i));	
					System.out.println(crud);					 
					 
					//파라미터를 변수에 적용!!
					 version = p_plant_alloc_version;
					 item_id = gdReq.getHeader("ITEM_ID").getValue(i);
					 due_date1 = gdReq.getHeader("W1").getValue(i);
					 due_date2 = gdReq.getHeader("W2").getValue(i);
					 due_date3 = gdReq.getHeader("W3").getValue(i);
					 made_type = "UD";
					 made_dttm = "SYSDATE";
					
					
					//당주 생산필요량
					rp0_qty = gdReq.getHeader("RP0_QTY").getValue(i);
					//차주 생산필요량.
					po_qty1 = gdReq.getHeader("PO_QTY1").getValue(i);
					//차차주 생산필요량.
					po_qty2 = gdReq.getHeader("PO_QTY2").getValue(i);
					
					
						
						//한개의 로우. 3개의 컬럼.					//replace(필드명, '수정전문자', '수정후문자')
						//-------------------------------------------------------------------------------------------------------------------
						sql += "select '" + version + "' AS VERSION, '" + item_id + "' AS ITEM_ID, '" + due_date1 + "' AS DUE_DATE, TO_NUMBER(REPLACE('" + rp0_qty + "',',','')) AS LST_PRODQTY, '" + made_type + "' AS MADE_TYPE, " + made_dttm + " AS MADE_DTTM, '" + made_by + "' AS MADE_BY from DUAL union all \n";
						sql += "select '" + version + "' AS VERSION, '" + item_id + "' AS ITEM_ID, '" + due_date2 + "' AS DUE_DATE, TO_NUMBER(REPLACE('" + po_qty1 + "',',','')) AS LST_PRODQTY, '" + made_type + "' AS MADE_TYPE, " + made_dttm + " AS MADE_DTTM, '" + made_by + "' AS MADE_BY from DUAL union all \n";
						sql += "select '" + version + "' AS VERSION, '" + item_id + "' AS ITEM_ID, '" + due_date3 + "' AS DUE_DATE, TO_NUMBER(REPLACE('" + po_qty2 + "',',','')) AS LST_PRODQTY, '" + made_type + "' AS MADE_TYPE, " + made_dttm + " AS MADE_DTTM, '" + made_by + "' AS MADE_BY from DUAL \n";
						//-------------------------------------------------------------------------------------------------------------------					 
				 
					union_check++;
				 }
				 
									
			}//for문 끝.
			
			sql += ") PP \n";
			
			
			sql += "on (PA.VERSION = PP.VERSION                                                                                                  \n";
			sql += "AND PA.ITEM_ID = PP.ITEM_ID                                                                                                  \n";
			sql += "AND PA.DUE_DATE = PP.DUE_DATE)                                                                                               \n";
			sql += "when matched then update set                                                                                                 \n";
			sql += "     --PA.VERSION = PP.VERSION,                                                                                                 \n";
			sql += "     --PA.ITEM_ID = PP.ITEM_ID,                                                                                                 \n";
			sql += "     --PA.DUE_DATE = PP.DUE_DATE,                                                                                               \n";
			sql += "     PA.LST_PRODQTY = PP.LST_PRODQTY,                                                                                                 \n";
			sql += "     PA.MADE_TYPE = PP.MADE_TYPE,                                                                                             \n";
			sql += "     PA.MADE_DTTM = PP.MADE_DTTM,                                                                                             \n";
			sql += "     PA.MADE_BY = PP.MADE_BY                                                                                                 \n";
			sql += "when not matched then insert(PA.VERSION, PA.ITEM_ID, PA.DUE_DATE, PA.LST_PRODQTY, PA.MADE_TYPE, PA.MADE_DTTM, PA.MADE_BY)    \n";
			sql += "values(PP.VERSION, PP.ITEM_ID, PP.DUE_DATE, PP.LST_PRODQTY, PP.MADE_TYPE, PP.MADE_DTTM, PP.MADE_BY)                                 \n";

			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
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
	
}
