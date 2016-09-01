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

public class rp_01160_replenishmentNiceLikePlan extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;

	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sql 	= null;
	String 		sql3 	= null;
	//Map sessionMap 	= new HashMap();

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

System.out.println("mode ="+ mode);

			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);

			else if (mode.equals("search_DW2"))
				gdRes = doQuery2(gdReq);

			else if (mode.equals("search_DW3"))
				gdRes = doQuery3(gdReq);

			else if (mode.equals("save"))
				gdRes = doSave(gdReq);

			else if (mode.equals("save_DW2"))
				gdRes = doSave_DW2(gdReq);

			else if (mode.equals("save_DW3"))
				gdRes = doSave_DW3(gdReq);

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

			System.out.println("getParam...");

			String item_id 		= gdReq.getParam("item_id");
			String trans_start  = gdReq.getParam("trans_start");
			String version 		= gdReq.getParam("version");
			String seq 			= gdReq.getParam("seq");
			String check_day 	= gdReq.getParam("check_day");
			String paramKey 	= "item_id!%!trans_start!%!version!%!seq!%!check_day";
			String paramCode 	= item_id + "!%!" + trans_start + "!%!" + version + "!%!" + seq + "!%!" + check_day;
			String query_id = gdReq.getParam("query_id");

			System.out.println("getSelQeury : " + query_id);

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();
			// 

			if (rowCount == 0) {

				gdRes.addParam("mode", "search");
				gdRes.setMessage("...");
				gdRes.setStatus("true");

				return gdRes;

			}

			/*출고 사업장 리스트를 추출하여 콤보리스트 생성 */

			String query_id2 = "rp_01160_DC_list"; 

			System.out.println("getSelQeury : " + query_id2);

			ArrayList<ArrayList<String>> locList = new CommonUtil().getSelQeury("item_id", item_id, query_id2);

			int arrIdx = locList.size();

			String[] locIdList = new String[arrIdx];
			String[] locNameList = new String[arrIdx];

			System.out.println("출고 사업장 콤보리스트 생성");

			for ( int i = 0 ; i < arrIdx ; i++ ){

				locIdList[i]   = locList.get(i).get(0);   // 출고 사업장 ID 콤보리스트 생성
				locNameList[i] = locList.get(i).get(1); // 출고 사업장 이름 콤보리스트 생성

			}

			System.out.println("출고 사업장 컬럼에 콤보리스트 set");

			gdRes.getHeader("SRC_LOC").setComboValues(locNameList, locIdList );		//출고 사업장 콤보리스트 출고 사업장 컬럼에 set

	        //그리드에 data input

			System.out.println("DW1_그리드 객체에 Data Input");

			for (int i = 0; i < rowCount; i++) {

				//gdRes.getHeader("CRUD"			 	).addValue("","");                    

				gdRes.getHeader("DC_ID"		 			).addValue(qResult.get(i).get(0), ""); // 입고장명/입고장코드
				gdRes.getHeader("DC_NAME"		 		).addValue(qResult.get(i).get(1), ""); // 입고장명/입고장코드

				gdRes.getHeader("PRE_MONTH_SELL"		).addValue(qResult.get(i).get(2), "");	//전월실적
				gdRes.getHeader("PRE_MONTH_SELL_00"		).addValue(qResult.get(i).get(2), "");	//전월실적
				gdRes.getHeader("PRE_MONTH_SELL_01"		).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("PRE_MONTH_SELL_02"		).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("PRE_MONTH_SELL_03"		).addValue(qResult.get(i).get(5), "");	//전월실적
				gdRes.getHeader("PRE_MONTH_SELL_04"		).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("PRE_MONTH_SELL_05"		).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("PRE_MONTH_SELL_06"		).addValue(qResult.get(i).get(8), "");
				
				gdRes.getHeader("SALES_PRE"		 		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("SALES_PRE_00"		 	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("SALES_PRE_01"		 	).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("SALES_PRE_02"		 	).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("SALES_PRE_03"		 	).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("SALES_PRE_04"		 	).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("SALES_PRE_05"		 	).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("SALES_PRE_06"		 	).addValue(qResult.get(i).get(15),"");
				
				gdRes.getHeader("SALES_PRE_CUM"			).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("SALES_PRE_CUM_00"		).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("SALES_PRE_CUM_01"		).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("SALES_PRE_CUM_02"		).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("SALES_PRE_CUM_03"		).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("SALES_PRE_CUM_04"		).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("SALES_PRE_CUM_05"		).addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("SALES_PRE_CUM_06"		).addValue(qResult.get(i).get(22),"");
				
				gdRes.getHeader("SALES_PLAN"		 	).addValue(qResult.get(i).get(23),"");

				gdRes.getHeader("ISSUE"		 			).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("ISSUE_00"		 		).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("ISSUE_YO"		 		).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("ISSUE_YS"		 		).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("ISSUE_TA"		 		).addValue(qResult.get(i).get(27),"");
				gdRes.getHeader("ISSUE_WMS"		 		).addValue(qResult.get(i).get(28),"");
				gdRes.getHeader("ISSUE_EX"		 		).addValue(qResult.get(i).get(29),"");
				
				gdRes.getHeader("ISSUE_CUST_00"			).addValue(qResult.get(i).get(30),"");	
				gdRes.getHeader("ISSUE_CUST_TOT"		).addValue(qResult.get(i).get(30),"");	
				gdRes.getHeader("ISSUE_CUST_10"			).addValue(qResult.get(i).get(31),"");	
				gdRes.getHeader("ISSUE_CUST_11"			).addValue(qResult.get(i).get(32),"");	
				gdRes.getHeader("ISSUE_CUST_16"			).addValue(qResult.get(i).get(33),"");	
				gdRes.getHeader("ISSUE_CUST_14"			).addValue(qResult.get(i).get(34),"");	
				gdRes.getHeader("ISSUE_CUST_19"			).addValue(qResult.get(i).get(35),"");	
				gdRes.getHeader("ISSUE_CUST_18"			).addValue(qResult.get(i).get(36),"");	
				gdRes.getHeader("ISSUE_CUST_99"			).addValue(qResult.get(i).get(37),"");	
				
				//gdRes.getHeader("SALES_MEAN_1WEEK_1"	).addValue("", "");
				gdRes.getHeader("SALES_MEAN_1WEEK_1"	).addValue(qResult.get(i).get(38),"");
				gdRes.getHeader("SALES_MEAN_1WEEK_ETC"	).addValue(qResult.get(i).get(38),"");				
				gdRes.getHeader("SALES_MEAN_1WEEK"		).addValue(qResult.get(i).get(39),"");

				
				//gdRes.getHeader("SALES_MEAN_3WEEK_3"		).addValue("", "");
				gdRes.getHeader("SALES_MEAN_3WEEK_3"	).addValue(qResult.get(i).get(40),"");
				gdRes.getHeader("SALES_MEAN_3WEEK_ETC"	).addValue(qResult.get(i).get(40),"");
				gdRes.getHeader("SALES_MEAN_3WEEK"		).addValue(qResult.get(i).get(41),"");


				gdRes.getHeader("BASE_STOCK"		 	).addValue(qResult.get(i).get(42),"");
				gdRes.getHeader("RECEIPT"		 		).addValue(qResult.get(i).get(43),"");
				gdRes.getHeader("CHGO_QTY"	 			).addValue(qResult.get(i).get(44),"");
				gdRes.getHeader("CHGO"		 			).addValue(qResult.get(i).get(44),"");
				gdRes.getHeader("DELV"		 			).addValue(qResult.get(i).get(45),"");
				gdRes.getHeader("TRAN"		 			).addValue(qResult.get(i).get(46),"");

				gdRes.getHeader("STOCK_DAY"		 		).addValue(qResult.get(i).get(47),"");
				gdRes.getHeader("STOCK_DAY_1W_ETC"		).addValue(qResult.get(i).get(47),"");
				gdRes.getHeader("STOCK_DAY_1W"		 	).addValue(qResult.get(i).get(48),"");
				
				gdRes.getHeader("STOCK_DAY_3W_ETC"		).addValue(qResult.get(i).get(49),"");
				gdRes.getHeader("STOCK_DAY_3W"		 	).addValue(qResult.get(i).get(50),"");
				
				gdRes.getHeader("STOCK_TERM"		 	).addValue(qResult.get(i).get(51),"");
				gdRes.getHeader("SAFETY_STOCK"		 	).addValue(qResult.get(i).get(52),"");

				gdRes.getHeader("SALES_PLAN_D1"		 	).addValue(qResult.get(i).get(53),"");
				gdRes.getHeader("SALES_PLAN_00_D1"		).addValue(qResult.get(i).get(53),"");
				gdRes.getHeader("DC_ALLOC_PLAN_D1"		).addValue(qResult.get(i).get(54),"");

				gdRes.getHeader("ISSUE_D1"		 		).addValue(qResult.get(i).get(55),"");
				gdRes.getHeader("ISSUE_00_D1"		 	).addValue(qResult.get(i).get(55),"");
				gdRes.getHeader("ISSUE_YO_D1"		 	).addValue(qResult.get(i).get(56),"");
				gdRes.getHeader("ISSUE_YS_D1"		 	).addValue(qResult.get(i).get(57),"");
				gdRes.getHeader("ISSUE_TA_D1"		 	).addValue(qResult.get(i).get(58),"");
				gdRes.getHeader("ISSUE_WMS_D1"		 	).addValue(qResult.get(i).get(59),"");
				gdRes.getHeader("ISSUE_EX_D1"		 	).addValue(qResult.get(i).get(60),"");

				gdRes.getHeader("EDI_00_D"			 	).addValue(qResult.get(i).get(61),"");   
				gdRes.getHeader("EDI_TOT_D"				).addValue(qResult.get(i).get(61),"");
				gdRes.getHeader("EDI_22_D"		 		).addValue(qResult.get(i).get(62),"");
				gdRes.getHeader("EDI_21_D"			 	).addValue(qResult.get(i).get(63),"");
				gdRes.getHeader("EDI_23_D"			 	).addValue(qResult.get(i).get(64),"");
				gdRes.getHeader("EDI_ETC_D"			 	).addValue(qResult.get(i).get(65),"");
				
				gdRes.getHeader("EDI_00_D1"			 	).addValue(qResult.get(i).get(66),"");
				gdRes.getHeader("EDI_TOT_D1"			).addValue(qResult.get(i).get(66),"");
				gdRes.getHeader("EDI_22_D1"		 		).addValue(qResult.get(i).get(67),"");
				gdRes.getHeader("EDI_21_D1"			 	).addValue(qResult.get(i).get(68),"");
				gdRes.getHeader("EDI_23_D1"			 	).addValue(qResult.get(i).get(69),"");
				gdRes.getHeader("EDI_ETC_D1"		 	).addValue(qResult.get(i).get(70),"");

				gdRes.getHeader("EDI_00_D2"		 		).addValue(qResult.get(i).get(71),"");
				gdRes.getHeader("EDI_TOT_D2"		 	).addValue(qResult.get(i).get(71),"");
				gdRes.getHeader("EDI_22_D2"		 		).addValue(qResult.get(i).get(72),"");
				gdRes.getHeader("EDI_21_D2"		 		).addValue(qResult.get(i).get(73),"");
				gdRes.getHeader("EDI_23_D2"		 		).addValue(qResult.get(i).get(74),"");
				gdRes.getHeader("EDI_ETC_D2"		 	).addValue(qResult.get(i).get(75),"");

				gdRes.getHeader("STOCK_EXPT"		 	).addValue(qResult.get(i).get(76),"");
				gdRes.getHeader("REP_QTY"		 		).addValue(qResult.get(i).get(77),"");
				gdRes.getHeader("MIN_PICK_QTY"		 	).addValue(qResult.get(i).get(78),"");
				gdRes.getHeader("TRANS_PLAN_QTY"		).addValue(qResult.get(i).get(79),"");
				gdRes.getHeader("TRANS_PLAN_PLT"		).addValue(qResult.get(i).get(80),"");
				gdRes.getHeader("SRC_LOC"		 		).addSelectedHiddenValue(qResult.get(i).get(81));//출고사업장				
				gdRes.getHeader("CDC_CNT"		 		).addValue(qResult.get(i).get(82),"");			
				gdRes.getHeader("ORD_NO"		 		).addValue(qResult.get(i).get(83),"");			
				gdRes.getHeader("ROWNUM"		 		).addValue(qResult.get(i).get(84),"");			
				gdRes.getHeader("BOX_PER_PLT"		 	).addValue(qResult.get(i).get(85),"");			
				gdRes.getHeader("SAFETY_STOCK_FLAG"		).addValue(qResult.get(i).get(86),"");			
				gdRes.getHeader("CD_SRC_LOC"			).addValue(qResult.get(i).get(87),"");			

				gdRes.getHeader("NEXT_STOCK_DAY"		).addValue("", "");
				gdRes.getHeader("NEXT_STOCK_DAY_1W"		).addValue("", ""); // 2012-03-23 추가 //
				gdRes.getHeader("NEXT_STOCK_DAY_3W"		).addValue("", "");                    
				gdRes.getHeader("NEXT_STOCK_EXPT"		).addValue("", "");                    

				gdRes.getHeader("OLD_SAFE_QTY"	  ).addValue(qResult.get(i).get(52), "");//
				//gdRes.getHeader("OLD_SAFE_QTY"	  ).addValue(qResult.get(i).get(49), "");// 
				gdRes.getHeader("SAFE_UPDATE_FLAG").addValue("", "");
				gdRes.getHeader("UNIT_UPDATE_FLAG").addValue("", "");

				gdRes.getHeader("GOAL_00"			).addValue(qResult.get(i).get(88), "");			
				gdRes.getHeader("GOAL_11"			).addValue(qResult.get(i).get(88), "");			
				gdRes.getHeader("GOAL_13"			).addValue(qResult.get(i).get(89), "");			
				gdRes.getHeader("GOAL_14"			).addValue(qResult.get(i).get(90), "");			
				gdRes.getHeader("GOAL_17"			).addValue(qResult.get(i).get(91), "");			
				gdRes.getHeader("GOAL_18"			).addValue(qResult.get(i).get(92), "");			
				gdRes.getHeader("GOAL_21"			).addValue(qResult.get(i).get(93), "");			
				gdRes.getHeader("GOAL_23"			).addValue(qResult.get(i).get(94), "");			

				gdRes.getHeader("RATE_00"			).addValue(qResult.get(i).get(95), "");			
				gdRes.getHeader("RATE_11"			).addValue(qResult.get(i).get(95), "");			
				gdRes.getHeader("RATE_13"			).addValue(qResult.get(i).get(96), "");			
				gdRes.getHeader("RATE_14"			).addValue(qResult.get(i).get(97), "");			
				gdRes.getHeader("RATE_17"			).addValue(qResult.get(i).get(98), "");			
				gdRes.getHeader("RATE_18"			).addValue(qResult.get(i).get(99), "");			
				gdRes.getHeader("RATE_21"			).addValue(qResult.get(i).get(100), "");			
				gdRes.getHeader("RATE_23"			).addValue(qResult.get(i).get(101), "");	

				gdRes.getHeader("REMN_CAPA_BOX"		).addValue(qResult.get(i).get(102),"");	
				gdRes.getHeader("ZONE"				).addValue(qResult.get(i).get(103),"");	

				gdRes.getHeader("CUST_00"			).addValue(qResult.get(i).get(104),"");	
				gdRes.getHeader("CUST_TOT"			).addValue(qResult.get(i).get(104),"");	
				gdRes.getHeader("CUST_10"			).addValue(qResult.get(i).get(105),"");	
				gdRes.getHeader("CUST_11"			).addValue(qResult.get(i).get(106),"");	
				gdRes.getHeader("CUST_16"			).addValue(qResult.get(i).get(107),"");	
				gdRes.getHeader("CUST_14"			).addValue(qResult.get(i).get(108),"");	
				gdRes.getHeader("CUST_19"			).addValue(qResult.get(i).get(109),"");	
				gdRes.getHeader("CUST_18"			).addValue(qResult.get(i).get(110),"");	
				gdRes.getHeader("CUST_99"			).addValue(qResult.get(i).get(111),"");	

				gdRes.getHeader("MAP_STOCK_BOX"		).addValue(qResult.get(i).get(112),"");	

				gdRes.getHeader("SUPPLY_RATE"		).addValue("", "");	
				gdRes.getHeader("SUPPLY_RATE_BOX"	).addValue("", "");	

			}

			/*

			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다

			 */

			System.out.println("화면에 전달할 파마미터 설정");

			gdRes.addParam("mode", "search");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {

			throw e;

		}

		System.out.println("그리드 객체 return");		

		return gdRes;

	}


	public GridData doQuery2(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();		

		int rowCount = 0;

		try {

			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			System.out.println("getParam...");

			String item_id 	   = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_start");
			//String scm_charge  = gdReq.getParam("scm_charge");
			String version 	   = gdReq.getParam("version");
			String seq 		   = gdReq.getParam("seq");
			String itype 	   = gdReq.getParam("itype");
			String check_day   = gdReq.getParam("check_day");
			String paramKey    = "item_id!%!trans_start!%!version!%!seq!%!itype!%!check_day";
			String paramCode   = item_id + "!%!" + trans_start + "!%!" + version + "!%!" + seq + "!%!" + itype + "!%!" + check_day + "!%!";
			String query_id    = gdReq.getParam("query_id");

			System.out.println("getSelQeury : " + query_id);
			
			

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			System.out.println("차지	 : " + paramCode);
			rowCount = qResult.size();

			// 

			if (rowCount == 0) {

				gdRes.addParam("mode", "search_DW2");
				gdRes.setMessage("...");
				gdRes.setStatus("true");

				return gdRes;

			}

	        //그리드에 data input

			System.out.println("DW2_그리드 객체에 Data Input");

			for (int i = 0; i < rowCount; i++) {

				//gdRes.getHeader("CRUD"			).addValue("", "");                    

				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(1), qResult.get(i).get(0)); // 입고장명/입고장코드
				gdRes.getHeader("BASE_STOCK"	).addValue(qResult.get(i).get(2),  "");	//기초재고

				gdRes.getHeader("CHGO_QTY"		).addValue(qResult.get(i).get(3),  "");	//기초재고

				gdRes.getHeader("PROD01_1"		).addValue(qResult.get(i).get(4),  "");	//D일조간생산
				gdRes.getHeader("PROD01_3"	 	).addValue(qResult.get(i).get(5),  "");	//D일주간생산

				gdRes.getHeader("CONF_STOCK"	).addValue(qResult.get(i).get(6),  "");	//출고가능량

				gdRes.getHeader("TRANS_QTY"		).addValue(qResult.get(i).get(7),  "");	//출고확정

				gdRes.getHeader("NEXT_CHGO_QTY" ).addValue(qResult.get(i).get(8),  "");	//익일출고
				gdRes.getHeader("NEXT_TRANS_QTY").addValue(qResult.get(i).get(9),  "");	//익일계획

				gdRes.getHeader("PROD01"		).addValue(qResult.get(i).get(10), "");	//D일	야간생산
				gdRes.getHeader("PROD02"	 	).addValue(qResult.get(i).get(11), "");	//D+1일	조간생산
				gdRes.getHeader("PROD03"	 	).addValue(qResult.get(i).get(12), "");	//D+1일	주간생산
				gdRes.getHeader("PROD04"	 	).addValue(qResult.get(i).get(13), "");	//D+1일	야간생산
				gdRes.getHeader("PROD05"		).addValue(qResult.get(i).get(14), "");	//D+2	조간생산
				gdRes.getHeader("PROD06"	 	).addValue(qResult.get(i).get(15), "");	//D+2	주간생산
				gdRes.getHeader("PROD07"	 	).addValue(qResult.get(i).get(16), "");	//D+2	야간생산
				gdRes.getHeader("PROD08"		).addValue(qResult.get(i).get(17), "");	//D+3	생산
				gdRes.getHeader("PROD09"		).addValue(qResult.get(i).get(18), "");	//D+4	생산
				gdRes.getHeader("PROD10"	 	).addValue(qResult.get(i).get(19), "");	//D+5	생산
				gdRes.getHeader("PROD11"		).addValue(qResult.get(i).get(20), "");	//D+6	생산
				gdRes.getHeader("PROD12"		).addValue(qResult.get(i).get(21), "");	//D+7	생산
				gdRes.getHeader("PROD13"		).addValue(qResult.get(i).get(22), "");	//D+8	생산
				gdRes.getHeader("PROD14"		).addValue(qResult.get(i).get(23), "");	//D+9	생산
				gdRes.getHeader("PROD15"		).addValue(qResult.get(i).get(24), "");	//D+10	생산
				gdRes.getHeader("PROD16"		).addValue(qResult.get(i).get(25), "");	//D+11	생산
				gdRes.getHeader("PROD17"		).addValue(qResult.get(i).get(26), "");	//D+12	생산
				gdRes.getHeader("PROD18"		).addValue(qResult.get(i).get(27), "");	//D+13	생산
				gdRes.getHeader("PROD19"		).addValue(qResult.get(i).get(28), "");	//D+14	생산
				gdRes.getHeader("PROD20"		).addValue(qResult.get(i).get(29), "");	//D+15	생산

				gdRes.getHeader("PROD_AVAILABLE").addValue(qResult.get(i).get(30), "");	//D+9	생산

				gdRes.getHeader("USE_CAPA"		).addValue(qResult.get(i).get(32), "");	//CDC총사용CAPA
				gdRes.getHeader("USE_CAPA_PAL"	).addValue(qResult.get(i).get(31), "");	//CDC총사용CAPA팔렛
				gdRes.getHeader("USE_CAPA_BOX"	).addValue(qResult.get(i).get(32), "");	//CDC총사용CAPA박스

			}

			/*

			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다

			 */

			System.out.println("화면에 전달할 파마미터 설정");

			gdRes.addParam("mode", "search_DW2");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {

			throw e;

		}

		System.out.println("그리드 객체 return");		

		return gdRes;

	}

	public GridData doQuery3(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();		

		int rowCount = 0;

		try {

			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			System.out.println("getParam...");

			String item_id     = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_start");
			String paramKey    = "item_id!%!trans_start";
			String paramCode   = item_id + "!%!" + trans_start + "!%!";
			String query_id    = gdReq.getParam("query_id");

			System.out.println("getSelQeury : " + query_id);

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			if (rowCount == 0) {

				gdRes.addParam("mode", "search");
				gdRes.setMessage("...");
				gdRes.setStatus("true");

				return gdRes;

			}

	        //그리드에 data input

			System.out.println("DW3_그리드 객체에 Data Input");

			for (int i = 0; i < rowCount; i++) {

				gdRes.getHeader("CRUD"			 		).addValue("","");                    
				gdRes.getHeader("CNFM_DATE"	 			).addValue(qResult.get(i).get(1 ), qResult.get(i).get(0 )); 
				gdRes.getHeader("ALLOC_ZONE" 			).addValue(qResult.get(i).get(3 ), qResult.get(i).get(2 ));

			}
		

			/*

			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다

			 */

			System.out.println("화면에 전달할 파마미터 설정");

			gdRes.addParam("mode", "search_DW3");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {

			throw e;

		}

		System.out.println("그리드 객체 return");		

		return gdRes;

	}

	// 저장

	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; 

		try {

			// 화면에서 전달받은 row 수를 가져온다.

			rowCount = gdReq.getHeader("DC_ID").getRowCount();

			System.out.println("Row Count : " + rowCount);

			if(rowCount == 0) {

				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("저장할 데이터가 없습니다.");
				gdRes.setStatus("no_data");

				return gdRes;

			}

			System.out.println("getParam");

			String version     = gdReq.getParam("version");
			String seq         = gdReq.getParam("seq");
			String item_id     = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_date");
			String user_id     = gdReq.getParam("user_id");
			String stock_type  = gdReq.getParam("stock_type");
			String trans_unit  = gdReq.getParam("trans_unit");

			String pre_sql = "DELETE  OUT_ORDER_ADJUST_TEMP 	 \n"
						   + "WHERE   USER_ID ='" + user_id + "' \n"
						   + "AND	  ITEM_ID ='" + item_id + "' \n"; 							   

			System.out.println("pre_sql executeQuery 실행!!!");

			rs = databaseUtility.executeQuery(stmt, pre_sql);

			System.out.println("pre_sql executeQuery 종료!!!");
			
			String sql;

			if(stock_type.equals("base")){

				sql= "INSERT  INTO OUT_ORDER_ADJUST_TEMP (VERSION, SEQ, ITEM_ID, TRANS_START, TGT_LOC, \n" 
				+ "            SAFE_QTY, OLD_SAFE_QTY, PLT_QTY, BOX_QTY, SRC_LOC,      				   \n" 
				+ "            MIN_TRANS_QTY, SAFE_UPDATE_FLAG,       								   \n" 
				+ "            UNIT_UPDATE_FLAG, USER_ID)                                              \n";
			}else{

				sql= "INSERT  INTO OUT_ORDER_ADJUST_TEMP (VERSION, SEQ, ITEM_ID, TRANS_START, TGT_LOC, \n" 
					+ "            SAFE_QTY, OLD_SAFE_QTY, PROD_PLT, PROD_BOX, SRC_LOC,      		   \n" 
					+ "            MIN_TRANS_QTY, SAFE_UPDATE_FLAG,       							   \n" 
					+ "            UNIT_UPDATE_FLAG, USER_ID)                                          \n";

			}

			boolean flag = false;

			// 데이터 셋팅

			System.out.println("sql 쿼리 생성");

			for (int i = 0; i < rowCount; i++) {

				String tgt_loc = gdReq.getHeader("DC_ID").getValue(i);

				if(tgt_loc.equals("") || tgt_loc.equals(null)){

					continue;

				}else{

					if( flag ){

						sql += " union all \n"; 

					} 

					flag = true;

					String safe_qty     = gdReq.getHeader("SAFETY_STOCK"  ).getValue(i);
					String old_safe_qty = gdReq.getHeader("OLD_SAFE_QTY"  ).getValue(i);
					String plt_qty      = gdReq.getHeader("TRANS_PLAN_PLT").getValue(i);
					String box_qty      = gdReq.getHeader("TRANS_PLAN_QTY").getValue(i);
					String src_loc      = "";

					if(gdReq.getHeader("SRC_LOC").getSelectedIndex(i) > -1){							

						src_loc = gdReq.getHeader("SRC_LOC").getComboHiddenValues()[gdReq.getHeader("SRC_LOC").getSelectedIndex(i)];

					}

					String min_trans_qty    = gdReq.getHeader("MIN_PICK_QTY"	).getValue(i);
					String safe_update_flag = gdReq.getHeader("SAFE_UPDATE_FLAG").getValue(i);
					String unit_update_flag = gdReq.getHeader("UNIT_UPDATE_FLAG").getValue(i);
		
					sql += 	"SELECT  	'" + version 		  + "' VERSION," 				    + 
							"			'" + seq 	 		  + "' SEQ, " 					    + 
							"			'" + item_id 		  + "' ITEM_ID," 				    +
							"	TO_DATE('" + trans_start      + "','YYYY-MM-DD') TRANS_START, " +
							"			'" + tgt_loc 	      + "' TGT_LOC, " 					+ 
							"			'" + safe_qty 	      + "' SAFE_QTY, " 					+ 
							"			'" + old_safe_qty     + "' OLD_SAFE_QTY, " 			    + 
							"			'" + plt_qty 	      + "' PLT_QTY, " 					+ 
							"			'" + box_qty 	      + "' BOX_QTY, " 					+ 
							"			'" + src_loc 	      + "' SRC_LOC, " 					+ 
							"			'" + min_trans_qty + "' MIN_TRANS_QTY, " 		   		+ 
							"			'" + safe_update_flag + "' SAFE_UPDATE_FLAG, " 	   		+ 
							"			'" + unit_update_flag + "' UNIT_UPDATE_FLAG, " 	   		+ 
							"			'" + user_id + "' USER_ID  FROM DUAL ";

				}			

			}

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			System.out.println("call sp_01160_replenishmentPlan() 실행!!!");

			String sql2 = 	"call sp_01160_replenishmentPlan(	'" 	+ version + "'," +
							"							TO_DATE('"	+ trans_start 	 + "','YYYY-MM-DD'),"  + 
							"									'"	+ user_id 	  	 + "'," 			   +
							"									'"	+ item_id 	     + "'," 			   +
							"									'"	+ stock_type     + "'," 			   +
							"									'"	+ trans_unit     + "')";

			System.out.println(sql2);
			boolean result = stmt.execute(sql2);
			System.out.println("call sp_01160_replenishmentPlan() 종료!!! - 결과 : " + result);
				
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */

			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		}catch (Exception e) {

			throw e;

		}finally {

            databaseUtility.close(conn, stmt, rs);              

        }
		System.out.println("doSave() end!!!");

		return gdRes;

	}	


	// 공급확정량 저장

	public GridData doSave_DW2(GridData gdReq) throws Exception {

		System.out.println("doSave_DW2() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; 

		try {

			// 화면에서 전달받은 row 수를 가져온다.

			rowCount = gdReq.getHeader("DC_NAME").getRowCount();

			System.out.println("Row Count : " + rowCount);

			if(rowCount == 0) {

				gdRes.addParam("mode", "doSave_DW2");
				gdRes.setMessage("저장할 데이터가 없습니다.");
				gdRes.setStatus("no_data");

				return gdRes;

			}

			System.out.println("getParam");

			String version     = gdReq.getParam("version");
			String item_id     = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_date");
			String user_id     = gdReq.getParam("user_id");
			String frc_qty	   = gdReq.getParam("frc_qty");   // 사용자 예측량 //	
			String event_qty   = gdReq.getParam("event_qty");
			String week_gubn   = gdReq.getParam("week_gubn"); // week_gubn //

			// 공급확정량 테이블 삭제

			String pre_sql = "DELETE  CDC_CONFIRM_QTY 			 \n"
						   + "WHERE   VERSION ='" + version + "' \n"
						   + "AND	  ITEM_ID ='" + item_id + "' \n"; 							   

			System.out.println("pre_sql executeQuery 실행!!!");
			System.out.println(pre_sql);

			rs = databaseUtility.executeQuery(stmt, pre_sql);

			System.out.println("pre_sql executeQuery 종료!!!");

			String sql;

			sql= "INSERT  INTO CDC_CONFIRM_QTY (VERSION, TRANS_DATE, SRC_LOC, ITEM_ID, SUPP_AVAIL_BOX, CONFIRM_BOX, REMN_BOX, MADE_TYPE, MADE_DTTM, MADE_BY) \n"; 

			boolean flag = false;

			// 데이터 셋팅

			System.out.println("sql 쿼리 생성");

			for (int i = 0; i < rowCount; i++) {

				String tgt_loc = gdReq.getHeader("DC_NAME").getHiddenValue(i);

				if(tgt_loc.equals("") || tgt_loc.equals(null)){

					continue;

				}else{

					if( flag ){

						sql += " union all \n"; 

					} 

					flag = true;
					
					String src_loc 		  = gdReq.getHeader("DC_NAME"	).getHiddenValue(i);
					String supp_avail_box = gdReq.getHeader("CONF_STOCK").getValue(i);
					String confirm_box 	  = gdReq.getHeader("TRANS_QTY" ).getValue(i);
					

					sql += 	"SELECT  	'" 	+ version 			+ "' VERSION, " 	+
							"			'"	+ trans_start		+ "' TRANS_DATE, "  +
							"			'"	+ src_loc			+ "' SRC_LOC, " 	+
							"			'"	+ item_id			+ "' ITEM_ID, " 	+
							"			"	+ supp_avail_box	+ " CONFIRM_BOX, "  +
							"			'"	+ confirm_box		+ "' TRANS_DATE, "  +
							"			'"	+ confirm_box		+ "' REMN_BOX, " 	+
							"			'AD' MADE_TYPE, SYSDATE MADE_DTTM, " 		+
							"			'"	+  user_id 								+ "' MADE_BY  FROM DUAL ";

				}			

			}

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");

			System.out.println("executeQuery 실행!!!");

			rs = databaseUtility.executeQuery(stmt, sql);

			System.out.println("executeQuery 종료!!!");

		/*********************사용자 예측량 저장 ***************************************************************************************************/
			
			sql3  = "merge into USER_FORECAST  UF                    											  \n";
			sql3 += "using (                                           											  \n";
			sql3 +=  "		select '"  + item_id 		  								+ "' ITEM_ID,			  \n"		       			
				 +"				   '"  + frc_qty 		  								+ "' FRC_QTY,			  \n" 
				 +"				   '"  + event_qty 		  								+ "' EVENT_QTY,			  \n" 	
				 +"					     TO_CHAR(trunc(sysdate,'DY')+8,'YYYYMMDD') 		  AS CNFM_DATE,           \n"
				 +"				   '"  + week_gubn 										+ "'  AS WEEK_GUBN,    	  \n"
				 +"				   '"  + user_id   										+ "'  AS MADE_BY      	  \n"
				 +"			from   DUAL 																          \n";
			sql3 += ") UF1 											   	   \n";				
			sql3 += "ON (UF.ITEM_ID      = UF1.ITEM_ID    			   	   \n";
			sql3 += "AND UF.CNFM_DATE    = UF1.CNFM_DATE)                  \n";
			sql3 += "when matched then update set        			   	   \n";
			sql3 += " UF.FRC_QTY      	 = UF1.FRC_QTY,                 	\n";  	/* 사용자 예측량  */
			sql3 += " UF.EVENT_QTY       = UF1.EVENT_QTY,                 	\n";  	/* 이벤트 물량  */
			sql3 += " UF.WEEK_GUBN     	 = UF1.WEEK_GUBN,                   \n";		/* 주간 구분        */
			sql3 += " UF.MADE_TYPE  	 = 'UP',		                    \n";		/* 사용자            */
			sql3 += " UF.MADE_BY      	 = UF1.MADE_BY                 	   \n";		/* 사용자            */
			sql3 += "when not matched then insert(ITEM_ID, CNFM_DATE, FRC_QTY,WEEK_GUBN,MADE_TYPE,MADE_DTTM,MADE_BY,EVENT_QTY) 		\n";
			sql3 += "values  (UF1.ITEM_ID,UF1.CNFM_DATE, UF1.FRC_QTY,UF1.WEEK_GUBN, 'AD', SYSDATE ,UF1.MADE_BY, UF1.EVENT_QTY) 		\n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql3);
			
			System.out.println(sql3);
			boolean result = stmt.execute(sql3);
			System.out.println("call sp_01160_replenishmentPlan() 종료!!! - 결과 : " + result);
			
			/****************************************************************************************************************************************/
			
			
			
			
			/*

			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다

			 */

			gdRes.addParam("mode", "doSave_DW2");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		}catch (Exception e) {

			throw e;

		}finally {

            databaseUtility.close(conn, stmt, rs);              

        }

		System.out.println("doSave_DW2() end!!!");

		return gdRes;

	}	

	// 공급할당정보 저장

	public GridData doSave_DW3(GridData gdReq) throws Exception {

		System.out.println("doSave_DW3() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수

		System.out.println("Total Row Count : " + gdReq.getHeader("CNFM_DATE").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.

			rowCount = gdReq.getHeader("CRUD").getRowCount();

			if(rowCount == 0) {

				gdRes.addParam("mode", "doSave_DW3");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");

				return gdRes;

			}
			
			System.out.println("DW3 CRUD Row Count : " + rowCount);

			String item_id    = gdReq.getParam("item_id");
			String user_id    = gdReq.getParam("user_id");
			String cnfm_date  = "";
			String alloc_zone = "";

			// 데이터 셋팅

			for (int i = 0; i < rowCount; i++) {

				sql = "";

				cnfm_date  = gdReq.getHeader("CNFM_DATE").getHiddenValue(i);
				alloc_zone = gdReq.getHeader("ALLOC_ZONE").getHiddenValue(i);

				System.out.println("call SP_IP_SET_ALLOC_GUBN() 실행!!!");

				String sql = "call SP_IP_SET_ALLOC_GUBN('"+ cnfm_date + "','" + item_id + "','" + alloc_zone + "','"+ user_id + "')";

				System.out.println(sql);

				boolean result = stmt.execute(sql);

				//System.out.println("call SP_IP_SET_ALLOC_GUBN() 종료!!! - 결과 : " + result);

				System.out.println("call SP_IP_SET_ALLOC_GUBN() 종료!!! - 결과 : 성공");

			}//for문 끝.
			

			/*

			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다

			 */

			gdRes.addParam("mode", "doSave_DW3");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		}catch (Exception e) {

			throw e;

		}finally {

            databaseUtility.close(conn, stmt, rs);              

        }

		System.out.println("doSave_DW3() end!!!");

		return gdRes;

	}

}