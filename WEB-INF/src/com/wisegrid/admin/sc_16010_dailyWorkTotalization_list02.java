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
public class sc_16010_dailyWorkTotalization_list02 extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sql 	= null;
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
		int colID = 0;
		String colIDs = "";
		
		try {
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			int p_weekCnt = Integer.parseInt(gdReq.getParam("weekCnt"));
			
			String s_query = "";
			
			
		      s_query  = "\n select LST.DIVISION ,decode(LST.DIVISION,'10','면류','20','스낵류','10_20','면류,스낵류','40','미반류','30','음료') AS DIVISION_NAME ";
			  for( int i = 1 ; i <= p_weekCnt ; i++ )
			  {
					s_query +="\n        --"+i+"주차-----------------------------------------------------------------------------------------------                                            ";
					for( int j=1 ;j<=7 ;j++) //월~일요일을 반복한다.
					{
						colID = ((i-1)*7)+j;
						if( colID < 10) colIDs="0"+colID ; else colIDs="" +colID;
						s_query += "\n       ,to_char( max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE=1 then LST.SHIFT_QTY else 0 end) ,'FM999,999,999') as D"+colIDs+"A                  ";
						s_query += "\n       ,to_char( max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE=3 then LST.SHIFT_QTY else 0 end) ,'FM999,999,999') as D"+colIDs+"B                  ";
						s_query += "\n       ,to_char( max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE=5 then LST.SHIFT_QTY else 0 end) ,'FM999,999,999') as D"+colIDs+"C                  ";
					}

			  }			
		      s_query += "\n   from v_dailyWorkTotalization02 LST                                                                                                 ";
		      s_query += "\n  group by LST.DIVISION                                                                                                               ";
			
			
			
			
			System.out.println(s_query);
			
			rs = databaseUtility.executeQuery(stmt, s_query);

			
			for ( int i = 0 ; rs.next() ; i++ ) {
				
				gdRes.getHeader("DIVISION"   ).addValue(rs.getString(2), rs.getString(1)); //DIVISION_NAME/DIVISION
                
				//------------------------------------------------------------------------------------//
                int dayCnt = 1;
                int colIdx = 3;
                for( int j = 0 ; j < p_weekCnt ; j++ ){
                	
                	for( int k = 1 ; k <= 7 ; k++ ){
                		String strDay = "";
                		
                		if( dayCnt < 10 ) strDay += "0" + dayCnt;
                		else strDay += dayCnt;      		 
                		//System.out.println(strDay);
                		//System.out.println(colIdx);
                		gdRes.getHeader("D" + strDay + "A").addValue(rs.getString(colIdx), ""); colIdx++;
                		gdRes.getHeader("D" + strDay + "B").addValue(rs.getString(colIdx), ""); colIdx++;
                		gdRes.getHeader("D" + strDay + "C").addValue(rs.getString(colIdx), ""); colIdx++;
                		
                		dayCnt++;
                	}                            
	            }
            }

			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}  finally {
            databaseUtility.close(conn, stmt, rs);              
        }
				
		return gdRes;
	}
	
	
	
	public GridData doQueryX(GridData gdReq) throws Exception { //사용하지 않음
		
		GridData gdRes = new GridData();		
		int rowCount = 0;

		try {
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			String p_plant_id = gdReq.getParam("plant_id");
			String p_sDate = gdReq.getParam("sdate");
			String p_eDate = gdReq.getParam("edate");
			int p_weekCnt = Integer.parseInt(gdReq.getParam("weekCnt"));
			
			String in_sql = "";
			in_sql 
			+= "                    SELECT  --10 면류(+냉동)                                                                                                                                                       	 \n"           
			+ "			                --20 스낵류                                                                                                                                                                  \n"
			+ "			                --10+20 면류+스낵류                                                                                                                                                          \n"
			+ "			                --40 미반류                                                                                                                                                                  \n"
			+ "			                --30 음료 로 집계 한다.                                                                                                                                                      \n"
			+ "			                LST.SEQ                                                                                                                                                                      \n"
			+ "			                ,NVL(DMY.DIVISION, DECODE(LST.SEQ,1,'10' ,2,'20' ,4,'40' ,5,'30') ) AS DIVISION                                                                                              \n"
			+ "			                ,LST.PROD_DATES                                                                                                                                                              \n"
			+ "			                ,LST.SHIFT_TYPE                                                                                                                                                              \n"
			+ "			                ,CASE WHEN  DMY.DIVISION='10_20' THEN SUM(CASE WHEN LST.SEQ IN (1,2) AND NVL(DMY.IDX,1)=1 THEN LST.SHIFT_QTY ELSE 0 END) OVER( PARTITION BY LST.PROD_DATES ORDER BY 1 )      \n"
			+ "			                      ELSE  LST.SHIFT_QTY                                                                                                                                                    \n"
			+ "			                 END  AS    SHIFT_QTY                                                                                                                                                        \n"
			+ "			         FROM   (                                                                                                                                                                            \n"
			+ "			                   SELECT --SEQ로 집계한다.                                                                                                                                                  \n"
			+ "			                          IDX.SEQ ,LST.PROD_DATES, LST.SHIFT_TYPE ,SUM(LST.SHIFT_QTY) AS SHIFT_QTY                                                                                           \n"
			+ "			                    FROM (                                                                                                                                                                   \n"
			+ "                                   SELECT ITM.DIVISION ,PLA.PROD_DATES, PLA.SHIFT_TYPE ,SUM(PLA.SHIFT_QTY) AS SHIFT_QTY                      \n"
			+ "                                     FROM (                                                                                                  \n"
			+ "                                            select CAL.YYYYMMDD ,PNT.PLANT_ID ,FN_GET_VERSION('PS',PNT.PLANT_ID,CAL.YYYYMMDD) as VERSION     \n"
			+ "                                              from CAL_MST CAL                                                                               \n"
			+ "                                                   inner join                                                                                \n"
			+ "                                                   (                                                                                         \n"
			+ "                                                    SELECT  TO_CHAR(WK.SDATE,'yyyymmdd') AS SDATE ,TO_CHAR(WK.EDATE,'yyyymmdd') AS EDATE     \n"
			+ "                                                    FROM    DUAL,                                                                            \n"
			+ "                                                            (                                                                                \n"
			+ "                                                            -- DEFAULT : 차주, 차주 월요일                                                   \n"
			+ "                                                            SELECT  NEXT_DAY(to_date('" + p_sDate + "','YYYY-MM-DD')-7,2) SDATE,                  \n"
			+ "                                                                    NEXT_DAY(TO_DATE('" + p_eDate + "','YYYY-MM-DD'),1) EDATE                     \n"
			+ "                                                            FROM   DUAL                                                                      \n"
			+ "                                                            ) WK                                                                             \n"
			+ "                                                   ) IDX                                                                                     \n"
			+ "                                                   on  CAL.YYYYMMDD between IDX.SDATE and IDX.EDATE                                          \n"
			+ "                                                   inner join V_PLANT PNT                                                                    \n"
			+ "                                                   on  1=1                                                                                   \n"
			+ "                                          ) VER                                                                                              \n"
			+ "                                          INNER JOIN DAILY_SCH_PLAN_SHIFT PLA                                                                \n"
			+ "                                          ON  PLA.CAT_ID   = 'PS'                                                                            \n"
			+ "                                          AND PLA.PLANT_ID LIKE '" + p_plant_id + "%'                                                                          \n"
			+ "                                          AND PLA.PLANT_ID = VER.PLANT_ID                                                                    \n"
			+ "                                          AND PLA.VERSION  = VER.VERSION                                                                     \n"
			+ "                                          AND PLA.WO_END   = 'Y'                                                                             \n"
			+ "                                          and PLA.PROD_DATES = VER.YYYYMMDD                                                                  \n"
			+ "                                          ------------------------------------------------------------------                                 \n"
			+ "                                          --아이템 마스터를 이용하여 제품류를 구분한다.                                                      \n"
			+ "                                          LEFT OUTER JOIN ITEM_MST ITM                                                                       \n"
			+ "                                          ON  ITM.ITEM_ID = PLA.ITEM_ID                                                                      \n"
			+ "                                    GROUP BY ITM.DIVISION ,PLA.PROD_DATES, PLA.SHIFT_TYPE                                                    \n"
			+ "			                         ) LST                                                                                                                                                               \n"
			+ "			                         LEFT OUTER JOIN                                                                                                                                                     \n"
			+ "			                         (                                                                                                                                                                   \n"
			+ "			                             --화면에 집계할 구분별로 SEQ를 정의 한다.                                                                                                                       \n"
			+ "			                             SELECT 1 AS SEQ ,'10' AS DIVISION FROM DUAL UNION ALL --면류                                                                                                    \n"
			+ "			                             SELECT 1 AS SEQ ,'50' AS DIVISION FROM DUAL UNION ALL --냉동면                                                                                                  \n"
			+ "			                             SELECT 2 AS SEQ ,'20' AS DIVISION FROM DUAL UNION ALL --스낵류                                                                                                  \n"
			+ "			                             SELECT 4 AS SEQ ,'40' AS DIVISION FROM DUAL UNION ALL --미반류                                                                                                  \n"
			+ "			                             SELECT 5 AS SEQ ,'30' AS DIVISION FROM DUAL           --음료                                                                                                    \n"
			+ "			                         ) IDX                                                                                                                                                               \n"
			+ "			                         ON IDX.DIVISION=LST.DIVISION                                                                                                                                        \n"
			+ "			                   GROUP BY IDX.SEQ ,LST.PROD_DATES, LST.SHIFT_TYPE                                                                                                                          \n"
			+ "			                ) LST                                                                                                                                                                        \n"
			+ "			                ------------------------------------------------------------------                                                                                                           \n"
			+ "			                --면+스낵을 만들어 준다.                                                                                                                                                     \n"
			+ "			                LEFT OUTER JOIN                                                                                                                                                              \n"
			+ "			                (                                                                                                                                                                            \n"
			+ "			                  SELECT 1 AS SEQ ,1 AS IDX ,'10'    AS DIVISION FROM DUAL UNION ALL                                                                                                         \n"
			+ "			                  SELECT 1 AS SEQ ,2 AS IDX ,'10_20' AS DIVISION FROM DUAL                                                                                                                   \n"
			+ "			                ) DMY                                                                                                                                                                        \n"
			+ "			                ON  DMY.SEQ = LST.SEQ                                                                                                                                                        \n"
			+ "			                ------------------------------------------------------------------                                                                                                           \n"
			+ "			                --DIVISION에 대한 NAME을 가져온다.                                                                                                                                           \n"
			+ "			                LEFT OUTER JOIN CODE_MST MST                                                                                                                                                 \n"
			+ "			                ON  MST.CD_GRP = 'DIVISION'                                                                                                                                                  \n"
			+ "			                AND MST.CD     =  DECODE(LST.SEQ,1,'10' ,2,'20' ,4,'40' ,5,'30' )                                                                                                            \n"
			+ "			        ORDER   BY DECODE(DIVISION,'10',1,'20',2,'10_20',3,'40',4,'30',5) ,PROD_DATES, SHIFT_TYPE                                                                                            \n";
				
			String out_sql = "";
			out_sql += "			SELECT  A.DIVISION																										--0       \n" 
			+ "			        ,DECODE(A.DIVISION,'10','면류','20','스낵류','10_20','면류,스낵류','40','미반류','30','음료') AS DIVISION_NAME                   \n";
			
			
			for( int i = 0 ; i < p_weekCnt ; i++ ){
				out_sql 
					+= "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (0 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D01A    --2          \n"                                            
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (0 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D01B    --3          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (0 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D01C    --4          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (1 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D02A    --5          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (1 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D02B    --6          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (1 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D02C    --7          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (2 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D03A    --8          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (2 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D03B    --9          \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (2 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D03C    --10         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (3 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D04A    --11         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (3 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D04B    --12         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (3 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D04C    --13         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (4 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D05A    --14         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (4 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D05B    --15         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (4 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D05C    --16         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (5 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D06A    --17         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (5 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D06B    --18         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (5 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D06C    --19         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (6 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '1' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D07A    --20         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (6 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '3' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D07B    --21         \n"
					+ "			        ,MAX(TO_CHAR(CASE WHEN A.PROD_DATES = TO_CHAR(WK.MON+" + (6 + i*7) + ",'YYYYMMDD') AND A.SHIFT_TYPE = '5' THEN A.SHIFT_QTY ELSE 0 END ,'999,999' )) D07C    --22         \n";
			}
			
			out_sql += "			FROM    (\n";
			out_sql += in_sql;
			out_sql 
			+= "                    ) A,																\n" 
			+ "			        (                                                                   \n" 
			+ "                    SELECT  NEXT_DAY(to_date('" + p_sDate + "','YYYY-MM-DD')-7,2) MON     \n" 
			+ "                    FROM   DUAL                                                      \n" 
			+ "                    ) WK                                                             \n" 
			+ "			GROUP   BY A.DIVISION                                                       \n";
			
			System.out.println(out_sql);
			
			rs = databaseUtility.executeQuery(stmt, out_sql);

			
			for ( int i = 0 ; rs.next() ; i++ ) {
				
				gdRes.getHeader("DIVISION"   ).addValue(rs.getString(2), rs.getString(1)); //DIVISION_NAME/DIVISION
                
				//------------------------------------------------------------------------------------//
                int dayCnt = 1;
                int colIdx = 3;
                for( int j = 0 ; j < p_weekCnt ; j++ ){
                	
                	for( int k = 1 ; k <= 7 ; k++ ){
                		String strDay = "";
                		
                		if( dayCnt < 10 ) strDay += "0" + dayCnt;
                		else strDay += dayCnt;      		 
                		//System.out.println(strDay);
                		//System.out.println(colIdx);
                		gdRes.getHeader("D" + strDay + "A").addValue(rs.getString(colIdx), ""); colIdx++;
                		gdRes.getHeader("D" + strDay + "B").addValue(rs.getString(colIdx), ""); colIdx++;
                		gdRes.getHeader("D" + strDay + "C").addValue(rs.getString(colIdx), ""); colIdx++;
                		
                		dayCnt++;
                	}                            
	            }
            }

			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		} finally {
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
