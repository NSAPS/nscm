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
public class sc_11020_dailyProductionPlan_List extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;
	
	Connection 	conn 	= null;
	Statement 	stmt	= null; 
	ResultSet	rs		= null;	
	//String 		sql 	= null;
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
			
			System.out.println("Test :: mode = " + mode);
			System.out.println("Test :: mode = " + mode);
			System.out.println("Test :: mode = " + mode);
			System.out.println("Test :: mode = " + mode);

			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);
			else if (mode.equals("insert")) // 
				gdRes = doInsert(gdReq); 
			else if (mode.equals("update")) // 
				gdRes = doUpdata(gdReq);				
			else if (mode.equals("delete")) // 
				gdRes = doDelete(gdReq);
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

	public GridData doQuery(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();		
		int rowCount = 0;
 
		System.out.println("start doQuery");
		
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성
				
		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			//String p_plant_name = gdReq.getParam("plant_name");

			//String p_weekNo = gdReq.getParam("weekNo");
			String p_selected_date = gdReq.getParam("selected_date");
			String p_plant_id = gdReq.getParam("plant_id");
			String p_checked_multi = gdReq.getParam("checked_multi");
			String sqlStringMulti = "";
			if( p_checked_multi.equals("visual")){
				sqlStringMulti = " and ITM.MULTI_FLAG = 'V' ";
			}else if(p_checked_multi.equals("multi")){
				sqlStringMulti = " and ITM.MULTI_FLAG = 'M' ";
			}else if(p_checked_multi.equals("normal")){
				sqlStringMulti = " and ITM.MULTI_FLAG IS NULL ";
			}
			
			String paramKey   ="selected_plant!%!selected_date";
			String paramCode  = p_plant_id + "!%!" + p_selected_date;
			String query_id   = "work_type_info";

			ArrayList<ArrayList<String>> ivResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			String sql = "";
			
			sql += "    WITH V_LST																																																													\n"		
				+  "      AS (                                                                                                                                                                                                                                                      \n"
				+  "              SELECT PLA.VERSION ,PLA.PLANT_ID ,PLA.PROC_ID ,PLA.ITEM_ID ,PLA.ORD_NO ,PLA.ORD_ITEM_NO                                                                                                                                                           \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=1 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D01A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=1 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D01B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=1 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D01C                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=2 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D02A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=2 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D02B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=2 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D02C                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=3 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D03A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=3 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D03B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=3 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D03C                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=4 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D04A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=4 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D04B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=4 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D04C                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=5 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D05A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=5 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D05B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=5 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D05C                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=6 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D06A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=6 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D06B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=6 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D06C                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=7 AND PLA.SHIFT_TYPE=1 THEN PLA.SHIFT_QTY END) AS D07A                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=7 AND PLA.SHIFT_TYPE=3 THEN PLA.SHIFT_QTY END) AS D07B                                                                                                                                                          \n"
				+  "                    ,SUM(CASE WHEN WEK.DAY_RANK=7 AND PLA.SHIFT_TYPE=5 THEN PLA.SHIFT_QTY END) AS D07C                                                                                                                                                          \n"
				+  "                     ---------------------------------------------------------------------------------                                                                                                                                                          \n"
				+  "                     ,MAX(CASE WHEN WEK.DAY_RANK=1 AND PLA.SHIFT_TYPE=1 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD01A               \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=1 AND PLA.SHIFT_TYPE=3 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD01B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=1 AND PLA.SHIFT_TYPE=5 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD01C                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=2 AND PLA.SHIFT_TYPE=1 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD02A                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=2 AND PLA.SHIFT_TYPE=3 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD02B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=2 AND PLA.SHIFT_TYPE=5 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD02C                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=3 AND PLA.SHIFT_TYPE=1 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD03A                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=3 AND PLA.SHIFT_TYPE=3 AND DH.REASON01||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD03B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=3 AND PLA.SHIFT_TYPE=5 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD03C                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=4 AND PLA.SHIFT_TYPE=1 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD04A                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=4 AND PLA.SHIFT_TYPE=3 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD04B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=4 AND PLA.SHIFT_TYPE=5 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD04C                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=5 AND PLA.SHIFT_TYPE=1 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD05A                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=5 AND PLA.SHIFT_TYPE=3 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD05B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=5 AND PLA.SHIFT_TYPE=5 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD05C                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=6 AND PLA.SHIFT_TYPE=1 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD06A                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=6 AND PLA.SHIFT_TYPE=3 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD06B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=6 AND PLA.SHIFT_TYPE=5 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD06C                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=7 AND PLA.SHIFT_TYPE=1 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD07A                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=7 AND PLA.SHIFT_TYPE=3 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD07B                \n"
				+  "                    ,MAX(CASE WHEN WEK.DAY_RANK=7 AND PLA.SHIFT_TYPE=5 AND DH.REASON02||DH.REASON02||DH.REASON_MSG||DH.PLAN_MSG IS NOT NULL THEN DH.REASON01||'_MSG_'||DH.REASON02||'_MSG_'||DH.REASON_MSG||'_MSG_'||DH.PLAN_MSG END) AS MSGD07C                \n"
				+  "                FROM DAILY_SCH_PLAN_SHIFT PLA                                                                                                                                                                                                                   \n"
				+  "                     INNER JOIN                                                                                                                                                                                                                                 \n"
				+  "                     (                                                                                                                                                                                                                                          \n"
				+  "                        /*                                                                                                                                                                                                                                      \n"
				+  "                      *  일자 정보를 받아                                                                                                                                                                                                                       \n"
				+  "                      *  해당 일자 확정된 완제품 생산계획 버전을 추출                                                                                                                                                                                           \n"
				+  "                      */                                                                                                                                                                                                                                        \n"
				+  "                      -- 완제품                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              \n"
				+  "                     /* 생산버젼(완제품)*/                      								\n"
				+  "						SELECT  K1.CAT_ID, K2.SUB_CAT, K2.PLANT_ID, MAX(K1.VERSION)  MAX_VER  	\n"
				+  "						FROM    PLAN_VERSION_LOG    K1,                                       	\n"
				+  "						        (                                                             	\n"
				+  "						        SELECT  CAT_ID, SUB_CAT, PLANT_ID                             	\n"
				+  "						        FROM    ENGN_BAT_MST                                          	\n"
				+  "						        WHERE   PERIOD_TYPE = 'DAILY' AND CAT_ID = 'PS'               	\n"
				+  "						        )                   K2                                        	\n"
				+  "						WHERE   K1.PERIOD_TYPE = 'DAILY'                                      	\n"
				+  "						AND     K1.CAT_ID = 'PS'                                              	\n"
				+  "						AND     K1.RUN_DATE < TRUNC(TO_DATE('" + p_selected_date + "','YYYY-MM-DD'),'D')   \n"
				+  "						AND     TRIM (VERSION) IS NOT NULL                                    	\n"
				+  "						AND     K1.STATUS >= '23' -- 상태가 계획확정 이상인 것 중에서 찾는다  			\n"
				+  "						AND     K1.CAT_ID = K2.CAT_ID                                         	\n"
				+  "						AND     K1.SUB_CAT = K2.SUB_CAT                                       	\n"
				+  "						GROUP                                                                 	\n"
				+  "						BY		K1.CAT_ID, K2.SUB_CAT, K2.PLANT_ID                            	\n"
				+  "						UNION	ALL                                                           	\n"
				+  "						/* 생산버젼(반제품)*/                      								\n"
				+  "						SELECT  K1.CAT_ID, 'SS' SUB_CAT, K2.PLANT_ID, MAX(K1.VERSION)  MAX_VER	\n"
				+  "						FROM    PLAN_VERSION_LOG    K1,                                       	\n"
				+  "						        V_PLANT             K2                                        	\n"
				+  "						WHERE   K1.PERIOD_TYPE = 'DAILY'                                      	\n"
				+  "						AND     K1.CAT_ID = 'SS'                                              	\n"
				+  "						AND     K1.RUN_DATE < TRUNC(TO_DATE('" + p_selected_date + "','YYYY-MM-DD'),'D')  \n"
				+  "						AND     TRIM (VERSION) IS NOT NULL                                    	\n"
				+  "						AND     K1.STATUS >= '23' -- 상태가 계획확정 이상인 것 중에서 찾는다  			\n"
				+  "						GROUP                                                                 	\n"
				+  "						BY		K1.CAT_ID, K2.PLANT_ID                                        	\n"
				+  "                     ) IDX                                                                                                                                                                                                                                    \n"
				+  "                     ON  IDX.CAT_ID   = PLA.CAT_ID                                                                                                                                                                                                              \n"
				+  "                     AND IDX.PLANT_ID = PLA.PLANT_ID                                                                                                                                                                                                            \n"
				+  "                     AND IDX.MAX_VER  = PLA.VERSION                                                                                                                                                                                                             \n"
				+  "                     ----------------------------------------------------------------------------------------------------------------------------                                                                                                               \n"
				+  "                     /* 생산오더가 릴리즈 된후 MES에 I/F 된 공장 날짜에 대해서만 조회하도록 한다. 단 해당일 월요일부터 */                                                                                                       											\n"
				+  "                     /* 2015-09-02 이강욱 수정 -> PFROMDATE를 PTO_DATE로 변경  토요일 조간 오더가 안 보이는 문제 해결 */                                                                                                       											\n"
				+  "                     INNER JOIN                                                                                                                                                                                                                                 \n"
				+  "                     (                                                                                                                                                                                                                                          \n"
				+  "                        SELECT DISTINCT	PLANT	PLANT_ID, PTO_DATE                                                                                                                                                                                                               \n"
				+  "                          FROM PP20T110                                                                                                                                                                                                                                \n"
				+  "                           WHERE	PTO_DATE	>=	TO_CHAR(TRUNC(TO_DATE('" + p_selected_date + "','YYYY-MM-DD'),'D')+1,'YYYYMMDD')         \n"
//				+  "                           AND		ORDER_TYPE	= 'PP01'  AND LENGTH(MATR_CODE) = 9 -- 제품만                 \n"
				+  "                     ) MES                                                                                                                                                                                                                                      \n"
				+  "                     ON PLA.PROD_DATES = MES.PTO_DATE                                                                                                                                                                                                           \n"
				+  "                     AND PLA.PLANT_ID = MES.PLANT_ID                                                                                                                                                                                                            \n"
				+  "                     ----------------------------------------------------------------------------------------------------------------------------                                                                                                               \n"
				+  "                     INNER JOIN                                                                                                                                                                                                                                 \n"
				+  "                     (                                                                                                                                                                                                                                          \n"
				+  "                        SELECT YYYYMMDD ,DAY_RANK                                                                                                                                                                                                               \n"
				+  "                          FROM (                                                                                                                                                                                                                                \n"
				+  "                                    SELECT --화면조회구간을 가져와 구간 리스트를 생성 한다.                                                                                                                                                                     \n"
				+  "                                           YYYYMMDD                                                                                                                                                                                                             \n"
				+  "                                          ,DENSE_RANK() OVER( ORDER BY CAL_DATE) AS DAY_RANK                                                                                                                                                                    \n"
				+  "                                      FROM CAL_MST CAL                                                                                                                                                                                                          \n"
				+  "                                           INNER JOIN (                                                                                                                                                                                                         \n"
				+  "                                                           SELECT TO_CHAR(NEXT_DAY(TO_DATE('" + p_selected_date + "','YYYY-MM-DD')-7, 2),'YYYYMMDD') AS SDATE                                                                                                                \n"
				+  "                                                             FROM DUAL                                                                                                                                                                                          \n"
				+  "                                           ) IDX              				                                                                                                                                                                                                  \n"
				+  "                                           ON  CAL.YYYYMMDD >=IDX.SDATE                                                                                                                                                                                         \n"
				+  "                               )                                                                                                                                                                                                                                \n"
				+  "                           WHERE  7 >= DAY_RANK                                                                                                                                                                                                                 \n"
				+  "                     ) WEK                                                                                                                                                                                                                                      \n"
				+  "                     ON PLA.PROD_DATES = WEK.YYYYMMDD                                                                                                                                                                                                           \n"
				+  "                     ----------------------------------------------------------------------------------------------------------------------------                                                                                                               \n"
				+  "                     INNER	JOIN V_LAST_PROC_PRODVER  LAS                                                                                                                                                                                                                                      																															                                                                                                               \n"
				+  "                      ON	PLA.PLANT_ID	= LAS.PLANT_ID                                                                                                                                                                                                                                																															                                                                                                               \n"
				+  "                     AND	PLA.ITEM_ID		= LAS.ITEM_ID                                                                                                                                                                                                                                 																															                                                                                                               \n"
				+  "                     AND	PLA.PROC_ID		= LAS.PROC_ID                                                                                                                                                                                                                                 																															                                                                                                               \n"
				+  "                     ----------------------------------------------------------------------------------------------------------------------------                                                                                                               \n"
				+  "                      LEFT OUTER JOIN                                                                                                                                                                                                                           \n"
				+  "                     (                                                                                                                                                                                                                                          \n"
				+  "                        /* 계획 수정 내역 및 알림 사항 */                                                                                                                                                                                                       \n"
				+  "                        SELECT  A.CAT_ID, A.PLANT_ID, A.VERSION, A.SEQ, A.WO_ID, A.ITEM_ID, A.PROC_ID, A.LINE_ID,                                                                                                                                               \n"
				+  "                                TO_CHAR(A.PROD_DATES,'YYYYMMDD') PROD_DATES, A.SHIFT_TYPE,                                                                                                                                                                      \n"
				+  "                                CD.CD01_NAME REASON01, CD.CD02_NAME REASON02, A.REASON_MSG, A.PLAN_MSG                                                                                                                                                          \n"
				+  "                        FROM    DAILY_SCH_PLAN_HISTORY A,                                                                                                                                                                                                       \n"
				+  "                                (                                                                                                                                                                                                                               \n"
				+  "                                SELECT                                                                                                                                                                                                                          \n"
				+  "                                        MAX(HT.HIS_NO) HIS_NO, HT.CAT_ID, HT.PLANT_ID, HT.VERSION,                                                                                                                                                              \n"
				+  "                                        HT.ITEM_ID, HT.LINE_ID, HT.PROC_ID, HT.PROD_DATES, HT.SHIFT_TYPE                                                                                                                                                        \n"
				+  "                                FROM    DAILY_SCH_PLAN_HISTORY HT                                                                                                                                                                                               \n"
				+  "                                GROUP   BY HT.CAT_ID, HT.PLANT_ID, HT.VERSION, HT.ITEM_ID,                                                                                                                                                                      \n"
				+  "                                        HT.LINE_ID, HT.PROC_ID, HT.PROD_DATES, HT.SHIFT_TYPE                                                                                                                                                                    \n"
				+  "                                ) B,                                                                                                                                                                                                                            \n"
				+  "                                (                                                                                                                                                                                                                               \n"
				+  "                                SELECT  A.CD CD01, A.CD_NAME CD01_NAME, B.CD CD02, B.CD_NAME CD02_NAME                                                                                                                                                          \n"
				+  "                                FROM    CODE_MST A,                                                                                                                                                                                                             \n"
				+  "                                        CODE_MST B                                                                                                                                                                                                              \n"
				+  "                                WHERE   A.CD_GRP = 'MSG_GROUP'                                                                                                                                                                                                  \n"
				+  "                                AND     A.CD_NAME = B.CD_GRP                                                                                                                                                                                                    \n"
				+  "                                ) CD,                                                                                                                                                                                                                           \n"
				+  "                                (                                                                                                                                                                                                                            	\n"
				+  "                                SELECT  VERSION, PLANT_ID, MAX(MADE_DTTM) MX_MADE_DTTM                                                                                                                                                                          \n"
				+  "                                FROM    PLAN_MSG_VERSION                                                                                                                                                                                                        \n"
				+  "                                GROUP   BY VERSION, PLANT_ID                                                                                                                                                                                                    \n"
				+  "                                ) MX                                                                                                                                                                                                                            \n"
				+  "                        WHERE   A.HIS_NO     = B.HIS_NO                                                                                                                                                                                                         \n"
				+  "                        AND     A.CAT_ID     = B.CAT_ID                                                                                                                                                                                                         \n"
				+  "                        AND     A.PLANT_ID   = B.PLANT_ID                                                                                                                                                                                                       \n"
				+  "                        AND     A.VERSION    = B.VERSION                                                                                                                                                                                                        \n"
				+  "                        AND     A.ITEM_ID    = B.ITEM_ID                                                                                                                                                                                                        \n"
				+  "                        AND     A.LINE_ID    = B.LINE_ID                                                                                                                                                                                                        \n"
				+  "                        AND     A.PROD_DATES = B.PROD_DATES                                                                                                                                                                                                     \n"
				+  "                        AND     A.SHIFT_TYPE = B.SHIFT_TYPE                                                                                                                                                                                                     \n"
				+  "                        AND     A.REASON01   = CD.CD01(+)                                                                                                                                                                                                       \n"
				+  "                        AND     A.REASON02   = CD.CD02(+)                                                                                                                                                                                                       \n"
				+  "                        AND     A.VERSION    = MX.VERSION(+)                                                                                                                                                                                                    \n"
				+  "                        AND     A.PLANT_ID   = MX.PLANT_ID(+)                                                                                                                                                                                                   \n"
				+  "                        AND     A.MADE_DTTM  >= NVL(MX.MX_MADE_DTTM,TO_DATE('19000101','YYYYMMDD'))                                                                                                                                                             \n"
				+  "                        ORDER   BY A.PLANT_ID, A.VERSION, A.ITEM_ID, A.PROC_ID, A.PROD_DATES, A.SHIFT_TYPE                                                                                                                                                      \n"
				+  "                     ) DH                                                                                                                                                                                                                                       \n"
				+  "                     ON     PLA.CAT_ID     = DH.CAT_ID                                                                                                                                                                                                          \n"
				+  "                     AND    PLA.PLANT_ID   = DH.PLANT_ID                                                                                                                                                                                                        \n"
				+  "                     AND    PLA.VERSION    = DH.VERSION                                                                                                                                                                                                         \n"
				+  "                     AND    PLA.SEQ        = DH.SEQ                                                                                                                                                                                                             \n"
				+  "                     AND    PLA.ITEM_ID       = DH.ITEM_ID                                                                                                                                                                                                      \n"
				+  "                     AND    PLA.LINE_ID    = DH.LINE_ID                                                                                                                                                                                                         \n"
				+  "                     AND    PLA.PROC_ID    = DH.PROC_ID                                                                                                                                                                                                         \n"
				+  "                     AND    PLA.PROD_DATES = DH.PROD_DATES                                                                                                                                                                                                      \n"
				+  "                     AND    PLA.SHIFT_TYPE = DH.SHIFT_TYPE                                                                                                                                                                                                      \n"
				+  "                   WHERE     PLA.PLANT_ID IN ('" + p_plant_id + "')                                                                                                                                                                 \n"
				+  "                   GROUP BY PLA.VERSION ,PLA.PLANT_ID ,PLA.PROC_ID ,PLA.ITEM_ID ,PLA.ORD_NO ,PLA.ORD_ITEM_NO                                                                                                                                                    \n"
				+  "         )                                                                                                                                                                                                                                                      \n"
				+  "         SELECT HRC.PLANT_NAME                                                 --0                                                                                                                                                                              \n"
				+  "               ,HRC.PROC_NAME                                                  --1                                                                                                                                                                              \n"
				+  "               ,ITM.ITEM_NAME                                                  --2                                                                                                                                                                              \n"
				+  "               ,ITM.SPEC                                                       --3                                                                                                                                                                              \n"
				+  "               ,CAP.LABOR_WOMAN                                     		   --4                                                                                                                                                                              \n"
				+  "               ,DECODE(ITM.MTO_MTS_TYPE, '0001','O', '0002', 'S','S') MTO_MTS_TYPE --5                                                                                                                                                                              \n"
				+  "               ,PLA.ORD_NO                                                     --6                                                                                                                                                                              \n"
				+  "               ,PLA.ORD_ITEM_NO                                                --7                                                                                                                                                                              \n"
				+  "               ,TO_NUMBER(PLA.D01A) AS D01A                          --8                                                                                                                                                                              \n"
				+  "               ,TO_NUMBER(PLA.D01B) AS D01B                          --9                                                                                                                                                                              \n"
				+  "               ,TO_NUMBER(PLA.D01C) AS D01C                          --10                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D02A) AS D02A                          --11                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D02B) AS D02B                          --12                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D02C) AS D02C                          --13                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D03A) AS D03A                          --14                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D03B) AS D03B                          --15                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D03C) AS D03C                          --16                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D04A) AS D04A                          --17                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D04B) AS D04B                          --18                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D04C) AS D04C                          --19                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D05A) AS D05A                          --20                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D05B) AS D05B                          --21                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D05C) AS D05C                          --22                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D06A) AS D06A                          --23                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D06B) AS D06B                          --24                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D06C) AS D06C                          --25                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D07A) AS D07A                          --26                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D07B) AS D07B                          --27                                                                                                                                                                             \n"
				+  "               ,TO_NUMBER(PLA.D07C) AS D07C                          --28                                                                                                                                                                             \n"
				+  "               ,PLA.VERSION                                                    --29                                                                                                                                                                             \n"
				+  "               ,PLA.PLANT_ID                                                   --30                                                                                                                                                                             \n"
				+  "               ,PLA.PROC_ID                                                    --31                                                                                                                                                                             \n"
				+  "               ,PLA.ITEM_ID                                                    --32                                                                                                                                                                             \n"
				+  "               ,HRC.LINE_NAME                                                  --33                                                                                                                                                                             \n"
				+  "               ,HRC.TEAM_NAME                                                  --34                                                                                                                                                                             \n"
				+  "               ,NVL(PLA.MSGD01A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD01A AS CD01A                       --35                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD01B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD01B AS CD01B                       --36                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD01C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD01C AS CD01C                       --37                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD02A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD02A AS CD02A                       --38                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD02B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD02B AS CD02B                       --39                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD02C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD02C AS CD02C                       --40                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD03A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD03A AS CD03A                       --41                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD03B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD03B AS CD03B                       --42                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD03C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD03C AS CD03C                       --43                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD04A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD04A AS CD04A                       --44                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD04B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD04B AS CD04B                       --45                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD04C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD04C AS CD04C                       --46                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD05A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD05A AS CD05A                       --47                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD05B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD05B AS CD05B                       --48                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD05C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD05C AS CD05C                       --49                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD06A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD06A AS CD06A                       --50                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD06B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD06B AS CD06B                       --51                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD06C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD06C AS CD06C                       --52                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD07A,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD07A AS CD07A                       --53                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD07B,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD07B AS CD07B                       --54                                                                                                                                                      \n"
				+  "               ,NVL(PLA.MSGD07C,'_MSG__MSG__MSG_')||'_MSG_'||BG.BGD07C AS CD07C                       --55                                                                                                                                                      \n"
				+  "           FROM V_LST PLA                                                                                                                                                                                                                                       \n"
				+  "                -------------------------------------------                                                                                                                                                                                                     \n"
				+  "                --공장명, 팀명, 라인명, 작업장 명을 가져온다.                                                                                                                                                                                                   		\n"
				+  "                LEFT OUTER JOIN  V_HRCHY_PROC HRC                                                                                                                                                                                                              \n"
				+  "                ON  HRC.PLANT_ID =PLA.PLANT_ID                                                                                                                                                                                                                  \n"
				+  "                AND HRC.PROC_ID  =PLA.PROC_ID                                                                                                                                                                                                                   \n"
				+  "                -------------------------------------------                                                                                                                                                                                                     \n"
				+  "                --제품명,규격,구분을 가져온다.                                                                                                                                                                                                                  	\n"
				+  "                INNER JOIN ITEM_MST ITM                                                                                                                                                                                                                         \n"
				+  "                ON  ITM.ITEM_ID    = PLA.ITEM_ID                                                                                                                                                                                                                \n"
				+  "                AND ITM.ITYPE      IN ('FERT','HALB')                                                                                                                                                                                                            							\n"
				+  "			   " + sqlStringMulti + " 																																																							\n"			
				+  "                -------------------------------------------                                                                                                                                                                                     				\n"
				+  "                --TO여 를 가져온다.                                                                                                                                                                                                                             	\n"
				+  "                LEFT OUTER JOIN                                                                                                                                                                                                                                 \n"
				+  "                (                                                                                                                                                                                                                                               \n"
				+  "                    SELECT  DISTINCT                                                                                                                                                                                                                            \n"
				+  "                            PLANT_ID, ITEM_ID, LINE_ID, PROC_ID, LABOR_MAN, LABOR_WOMAN                                                                                                                                                                         \n"
				+  "                    FROM    ITEM_CAPA                                                                                                                                                                                                                           \n"
				+  "                    WHERE   MADE_TYPE != 'DE'                                                                                                                                                                                                                   \n"
				+  "                    ORDER   BY PLANT_ID, ITEM_ID, LINE_ID, PROC_ID, LABOR_MAN, LABOR_WOMAN                                                                                                                                                                      \n"
				+  "                ) CAP                                                                                                                                                                                                                                           \n"
				+  "                ON  CAP.PLANT_ID = PLA.PLANT_ID                                                                                                                                                                                                                 \n"
				+  "                AND CAP.ITEM_ID  = PLA.ITEM_ID                                                                                                                                                                                                                  \n"
				+  "                AND CAP.PROC_ID  = PLA.PROC_ID                                                                                                                                                                                                                  \n"
				+  "                ------------------------------------------------------                                                                                                                                                                                          \n"
				+  "                LEFT OUTER JOIN                                                                                                                                                                                                                                 \n"
				+  "                (                                                                                                                                                                                                                                               \n";
				
			for( int i = 0 ; i < ivResult.size() ; i++ ){
				if( i > 0 ){
					sql += " UNION ALL \n";					
				}
				
				sql += "SELECT	'" + ivResult.get(i).get(0) + "' PLANT_ID,	'" + ivResult.get(i).get(1) + "' PROC_ID,	'" + ivResult.get(i).get(2) + "' BGD01A,	'" + ivResult.get(i).get(3) + "' BGD01B,	'" + ivResult.get(i).get(4) + "' BGD01C,	'" + ivResult.get(i).get(5) + "' BGD02A,	" 
					+  "'" + ivResult.get(i).get(6) + "' BGD02B,	'" + ivResult.get(i).get(7) + "' BGD02C,	'" + ivResult.get(i).get(8) + "' BGD03A,	'" + ivResult.get(i).get(9) + "' BGD03B,	'" + ivResult.get(i).get(10) + "' BGD03C,	'" + ivResult.get(i).get(11) + "' BGD04A,	" 
					+  "'" + ivResult.get(i).get(12) + "' BGD04B,	'" + ivResult.get(i).get(13) + "' BGD04C,	'" + ivResult.get(i).get(14) + "' BGD05A,	'" + ivResult.get(i).get(15) + "' BGD05B,	'" + ivResult.get(i).get(16) + "' BGD05C,	'" + ivResult.get(i).get(17) + "' BGD06A,	" 
					+  "'" + ivResult.get(i).get(18) + "' BGD06B,	'" + ivResult.get(i).get(19) + "' BGD06C,	'" + ivResult.get(i).get(20) + "' BGD07A,	'" + ivResult.get(i).get(21) + "' BGD07B,	'" + ivResult.get(i).get(22) + "' BGD07C  FROM DUAL";
			}
			
			sql += "                ) BG                                                                                                                                                                                                                                            \n"
				+  "                ON  BG.PLANT_ID = PLA.PLANT_ID                                                                                                                                                                                                                  \n"
				+  "                AND BG.PROC_ID  = PLA.PROC_ID                                                                                                                                                                                                                   \n"
				+  "          ORDER BY PLA.PLANT_ID, ITM.ITYPE,                                                                                                                                                                               					                    \n"			
				+  "          		CASE                                                                                                                                                                                                   											\n"			
				+  "          			WHEN PLA.PLANT_ID = '1120' AND ITM.ITYPE = 'HALB' THEN HRC.PROC_NAME                                                                                                                                                                        \n"			
				+  "          			ELSE PLA.PROC_ID                                                                                                                                                                                                    						\n"			
				+  "          		END, PLA.ITEM_ID                                                                                                                                                                                                    							\n";			
			
			rs = databaseUtility.executeQuery(stmt, sql); ;
			
			//rowCount = rs.
			
			System.out.println(sql);
			
			// 
//			if (rowCount == 0) {
//				gdRes.addParam("mode", "search");	
//				gdRes.setMessage("...");
//				gdRes.setStatus("true");
//				return gdRes;
//			}
			//System.out.println(rs.next());
			while (rs.next()) {
				//System.out.println(rs.getString(1));
				gdRes.getHeader("CRUD"   	   ).addValue("", "");
                gdRes.getHeader("PLANT_NAME"   ).addValue(rs.getString(1 ), rs.getString(31));  
                gdRes.getHeader("PROC_NAME"    ).addValue(rs.getString(2 ), rs.getString(32)); 
                gdRes.getHeader("ITEM_ID"      ).addValue(rs.getString(33),"");
                gdRes.getHeader("ITEM_NAME"    ).addValue(rs.getString(3 ),"");  
                gdRes.getHeader("SPEC"         ).addValue(rs.getString(4 ),"");  
                gdRes.getHeader("LABOR_WOMAN"  ).addValue(rs.getString(5 ),"");  
                gdRes.getHeader("MTO_MTS_TYPE" ).addValue(rs.getString(6 ),"");  
                gdRes.getHeader("ORD_NO"       ).addValue(rs.getString(7 )==null?"":rs.getString(7 ),"");  
                gdRes.getHeader("ORD_ITEM_NO"  ).addValue(rs.getString(8 )==null?"":rs.getString(8 ),"");
                gdRes.getHeader("SP00"		   ).addValue("", "");
                gdRes.getHeader("D01A"         ).addValue(rs.getString(9 )==null?"":rs.getString(9 ),"");  
                gdRes.getHeader("D01B"         ).addValue(rs.getString(10)==null?"":rs.getString(10),"");  
                gdRes.getHeader("D01C"         ).addValue(rs.getString(11)==null?"":rs.getString(11),"");  
                gdRes.getHeader("SP01"		   ).addValue("", "");
                gdRes.getHeader("D02A"         ).addValue(rs.getString(12)==null?"":rs.getString(12),"");  
                gdRes.getHeader("D02B"         ).addValue(rs.getString(13)==null?"":rs.getString(13),"");  
                gdRes.getHeader("D02C"         ).addValue(rs.getString(14)==null?"":rs.getString(14),""); 
                gdRes.getHeader("SP02"		   ).addValue("", "");
                gdRes.getHeader("D03A"         ).addValue(rs.getString(15)==null?"":rs.getString(15),"");  
                gdRes.getHeader("D03B"         ).addValue(rs.getString(16)==null?"":rs.getString(16),"");  
                gdRes.getHeader("D03C"         ).addValue(rs.getString(17)==null?"":rs.getString(17),"");
                gdRes.getHeader("SP03"		   ).addValue("", "");
                gdRes.getHeader("D04A"         ).addValue(rs.getString(18)==null?"":rs.getString(18),"");  
                gdRes.getHeader("D04B"         ).addValue(rs.getString(19)==null?"":rs.getString(19),"");  
                gdRes.getHeader("D04C"         ).addValue(rs.getString(20)==null?"":rs.getString(20),"");
                gdRes.getHeader("SP04"		   ).addValue("", "");
                gdRes.getHeader("D05A"         ).addValue(rs.getString(21)==null?"":rs.getString(21),"");  
                gdRes.getHeader("D05B"         ).addValue(rs.getString(22)==null?"":rs.getString(22),"");  
                gdRes.getHeader("D05C"         ).addValue(rs.getString(23)==null?"":rs.getString(23),"");
                gdRes.getHeader("SP05"		   ).addValue("", "");
                gdRes.getHeader("D06A"         ).addValue(rs.getString(24)==null?"":rs.getString(24),"");  
                gdRes.getHeader("D06B"         ).addValue(rs.getString(25)==null?"":rs.getString(25),"");  
                gdRes.getHeader("D06C"         ).addValue(rs.getString(26)==null?"":rs.getString(26),"");
                gdRes.getHeader("SP06"		   ).addValue("", "");
                gdRes.getHeader("D07A"         ).addValue(rs.getString(27)==null?"":rs.getString(27),"");  
                gdRes.getHeader("D07B"         ).addValue(rs.getString(28)==null?"":rs.getString(28),"");  
                gdRes.getHeader("D07C"         ).addValue(rs.getString(29)==null?"":rs.getString(29),"");  
                
                gdRes.getHeader("CD01A"        ).addValue(rs.getString(36),"");  
                gdRes.getHeader("CD01B"        ).addValue(rs.getString(37),"");  
                gdRes.getHeader("CD01C"        ).addValue(rs.getString(38),"");  
                gdRes.getHeader("CD02A"        ).addValue(rs.getString(39),"");  
                gdRes.getHeader("CD02B"        ).addValue(rs.getString(40),"");  
                gdRes.getHeader("CD02C"        ).addValue(rs.getString(41),"");  
                gdRes.getHeader("CD03A"        ).addValue(rs.getString(42),"");  
                gdRes.getHeader("CD03B"        ).addValue(rs.getString(43),"");  
                gdRes.getHeader("CD03C"        ).addValue(rs.getString(44),"");  
                gdRes.getHeader("CD04A"        ).addValue(rs.getString(45),"");  
                gdRes.getHeader("CD04B"        ).addValue(rs.getString(46),"");  
                gdRes.getHeader("CD04C"        ).addValue(rs.getString(47),"");  
                gdRes.getHeader("CD05A"        ).addValue(rs.getString(48),"");  
                gdRes.getHeader("CD05B"        ).addValue(rs.getString(49),"");  
                gdRes.getHeader("CD05C"        ).addValue(rs.getString(50),"");  
                gdRes.getHeader("CD06A"        ).addValue(rs.getString(51),"");  
                gdRes.getHeader("CD06B"        ).addValue(rs.getString(52),"");  
                gdRes.getHeader("CD06C"        ).addValue(rs.getString(53),"");  
                gdRes.getHeader("CD07A"        ).addValue(rs.getString(54),"");  
                gdRes.getHeader("CD07B"        ).addValue(rs.getString(55),"");  
                gdRes.getHeader("CD07C"        ).addValue(rs.getString(56),"");  
                
 			}

			gdRes.addParam("mode", "search");		
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }
				
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
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
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
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
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
					
		for(int i = 0; i < sendData.length; i++) {
			String[] rowData = (String[])sendData[i];
			for(int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("\n");
		}
		
		if(flag.equals("C"))
			sbData.append(sendData.length + "\n");
		else if(flag.equals("U"))
			sbData.append(sendData.length + "\n");
			
		return sbData.toString();
	}
	
	private String getSendData2(String[] sendData) {
		
		StringBuffer sbData = new StringBuffer();
		
		sbData.append(sendData.length + "\n");
			
		return sbData.toString();
	}
	
	
	public GridData doSave(GridData gdReq) throws Exception {
		
		conn = databaseUtility.getConnection("t3sinc");
	    stmt = conn.createStatement();
	    String message = null;
		
		GridData gdRes = new GridData();		
		
		int rowCount = 0;
        String merge = "";
        String sq = "";
        String delete = "";
		
        String plant      = "";   
        String line_id    = "";
        String proc_id    = "";
        String from_group = "";
        String to_group   = "";
        String jc_time    = "";          
        String box_qty    = "";          
        
		String rsget = null;
		String user_id = gdReq.getParam("_user_id");
		
		try {
			
			//화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();

			System.out.println("---------------------------------------------------------");
			System.out.println("rowCount:"+rowCount);
		 		 						
			if( rowCount >= 1)
			{
				
				for (int i=0; i<rowCount ;i++)
				{
					
			        plant      = gdReq.getHeader("PLANT"     ).getValue(i);   
			        line_id    = gdReq.getHeader("LINE_ID"   ).getValue(i);   
			        proc_id    = gdReq.getHeader("PROC_ID"   ).getValue(i);   
			        from_group = gdReq.getHeader("FROM_GROUP").getValue(i);   
			        to_group   = gdReq.getHeader("TO_GROUP"  ).getValue(i);   
			        jc_time    = gdReq.getHeader("JC_TIME"   ).getValue(i);  
			        box_qty    = gdReq.getHeader("BOX_QTY"   ).getValue(i);  
			        
					if(i>0)
						sq += "\n union all ";
					
					sq += "\n select                                   ";
					sq += "\n         '"+plant     +"' as PLANT        ";                                                                                                  
					sq += "\n        ,'"+line_id   +"' as LINE_ID      ";                                                                                                 
					sq += "\n        ,'"+proc_id   +"' as PROC_ID      ";                                                                                                 
					sq += "\n        ,'"+from_group+"' as FROM_GROUP   ";                                                                                                 
					sq += "\n        ,'"+to_group  +"' as TO_GROUP     ";                                                                                                 
					sq += "\n        ,'"+jc_time   +"' as JC_TIME      ";                                                                                                 
					sq += "\n        ,'"+box_qty   +"' as BOX_QTY      ";                                                                                                 
					sq += "\n   from dual 						       "; 
				}
			    
				merge += "\n merge into JC_TIME_TEST JCT                                                                                                                                                          ";
				merge += "\n using (                                                                                                                                                                              ";
				merge += "\n             select LST.PLANT                                                                                                                                                         ";
				merge += "\n                   ,LST.LINE_ID                                                                                                                                                       ";
				merge += "\n                   ,LST.PROC_ID                                                                                                                                                       ";
				merge += "\n                   ,LST.FROM_GROUP                                                                                                                                                    ";
			    merge += "\n                   ,LST.TO_GROUP                                                                                                                                                      ";
			    merge += "\n                   ,LST.JC_TIME                                                                                                                                                       ";
			    merge += "\n                   ,LST.BOX_QTY                                                                                                                                                       ";
			    merge += "\n                    ------------------------                                                                                                                                          ";
			    merge += "\n                   ,MST.PLANT_NM                                                                                                                                                      ";
			    merge += "\n                   ,MST.LINE_NM                                                                                                                                                       ";
			    merge += "\n                   ,MST.PROC_NM                                                                                                                                                       ";
			    merge += "\n                    ------------------------                                                                                                                                          ";
			    merge += "\n                   ,case when LST.FROM_GROUP='ALL' then '전체' else FITM.ITEM_NAME end as FROM_GROUP_NM                                                                               ";
			    merge += "\n                   ,case when LST.TO_GROUP='ALL' then '전체' else TITM.ITEM_NAME end as TO_GROUP_NM                                                                                   ";
			    merge += "\n               from (                                                                                                                                                                 ";
			    merge += sq;
			    merge += "\n                    ) LST                                                                                                                                                             ";
			    merge += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    merge += "\n                    --공장명, 라인명, 라인명을 가져온다.                                                                                                                              ";
			    merge += "\n                    left outer join                                                                                                                                                   ";
			    merge += "\n                    (                                                                                                                                                                 ";
			    merge += "\n                         select distinct PLANT ,PLANT_NM ,LINE_ID ,LINE_NM ,PROC_ID ,PROC_NM                                                                                          ";
			    merge += "\n                           from JC_TIME_TEST_MST                                                                                                                                      ";
			    merge += "\n                    ) MST                                                                                                                                                             ";
			    merge += "\n                    on  MST.PLANT = LST.PLANT                                                                                                                                         ";
			    merge += "\n                    and MST.LINE_ID = LST.LINE_ID                                                                                                                                     ";
			    merge += "\n                    and MST.PROC_ID = LST.PROC_ID                                                                                                                                     ";
			    merge += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    merge += "\n                    --From 아이템명                                                                                                                                                   ";
			    merge += "\n                    left outer join                                                                                                                                                   ";
			    merge += "\n                    (                                                                                                                                                                 ";
			    merge += "\n                        select distinct RECIPE_TYPE ,ITEM_NAME from JC_TIME_TEST_MST                                                                                                  ";
			    merge += "\n                    ) FITM                                                                                                                                                            ";
			    merge += "\n                    on  FITM.RECIPE_TYPE = LST.FROM_GROUP                                                                                                                             ";
			    merge += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    merge += "\n                    --TO 아이템명                                                                                                                                                     ";
			    merge += "\n                    left outer join                                                                                                                                                   ";
			    merge += "\n                    (                                                                                                                                                                 ";
			    merge += "\n                        select distinct RECIPE_TYPE ,ITEM_NAME from JC_TIME_TEST_MST                                                                                                  ";
			    merge += "\n                    ) TITM                                                                                                                                                            ";
			    merge += "\n                    on  TITM.RECIPE_TYPE = LST.TO_GROUP                                                                                                                               ";
			    merge += "\n       ) LST                                                                                                                                                                          ";
			    merge += "\n   on  (                                                                                                                                                                              ";
			    merge += "\n                JCT.PLANT     = LST.PLANT                                                                                                                                             ";
			    merge += "\n           and JCT.LINE_ID    = LST.LINE_ID                                                                                                                                           ";
			    merge += "\n           and JCT.PROC_ID    = LST.PROC_ID                                                                                                                                           ";
			    merge += "\n           and JCT.FROM_GROUP = LST.FROM_GROUP                                                                                                                                        ";
			    merge += "\n           and JCT.TO_GROUP   = LST.TO_GROUP                                                                                                                                          ";
			    merge += "\n       ) when matched then                                                                                                                                                            ";
			    merge += "\n             update                                                                                                                                                                  ";
			    merge += "\n                set JCT.JC_TIME = LST.JC_TIME                                                                                                                                         ";
			    merge += "\n                   ,JCT.BOX_QTY = LST.BOX_QTY                                                                                                                                         ";
			    merge += "\n                   ,JCT.MADE_DTTM = SYSDATE                                                                                                                                           ";
			    merge += "\n                   ,JCT.MADE_BY = '"+user_id+"'                                                                                                                                       ";
			    merge += "\n         when not matched then                                                                                                                                                        ";
			    merge += "\n             insert                                                                                                                                                                   ";
			    merge += "\n             (JCT.PLANT, JCT.PLANT_NM, JCT.LINE_ID, JCT.LINE_NM, JCT.PROC_ID, JCT.PROC_NM, JCT.FROM_GROUP, JCT.FROM_GROUP_NM, JCT.TO_GROUP, JCT.TO_GROUP_NM, JCT.JC_TIME, JCT.BOX_QTY ,JCT.MADE_DTTM ,JCT.MADE_BY) ";
			    merge += "\n             values                                                                                                                                                                   ";
			    merge += "\n             (LST.PLANT, LST.PLANT_NM, LST.LINE_ID, LST.LINE_NM, LST.PROC_ID, LST.PROC_NM, LST.FROM_GROUP, LST.FROM_GROUP_NM, LST.TO_GROUP, LST.TO_GROUP_NM, LST.JC_TIME, LST.BOX_QTY ,SYSDATE ,'"+user_id+"')     ";			    
			    
			    
			    
	            System.out.println(merge);
				
                rs = databaseUtility.executeQuery(stmt, merge); 
                
                delete = "delete from JC_TIME_TEST where nvl(JC_TIME,0)=0 and nvl(BOX_QTY,0)=0";
	            System.out.println(delete);

	            rs = databaseUtility.executeQuery(stmt, delete); 
				
			
			}
						
			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */			
			gdRes.addParam("mode", "save");
			//gdRes.addParam("saveData", returnData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		} finally {
            databaseUtility.close(conn, stmt, rs);              
        }
		
		return gdRes;
	}	
	
}