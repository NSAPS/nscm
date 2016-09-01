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
public class rp_01120_outOrderAdjust_list02 extends HttpServlet {

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
		
		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			System.out.println("getParam...");
			String item_id = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_start");
			String version = gdReq.getParam("version");
			String seq = gdReq.getParam("seq");
			
			String paramKey = "item_id!%!trans_start!%!version!%!seq";
			String paramCode = item_id + "!%!" + trans_start + "!%!"
							 + version + "!%!" +  seq;
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
				        
	        //그리드에 data input
			System.out.println("그리드 객체에 Data Input");
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("PLANT_NAME").addValue(qResult.get(i).get(0 ), qResult.get(i).get(1 ));
				gdRes.getHeader("AVAIL"     ).addValue(qResult.get(i).get(2 ), "");                    
				gdRes.getHeader("TRANS"		).addValue(qResult.get(i).get(3 ), "");                    
				gdRes.getHeader("STOCK"   	).addValue(qResult.get(i).get(4 ), "");                    
				gdRes.getHeader("D01"		).addValue(qResult.get(i).get(5 ), "");                    
				gdRes.getHeader("D02SH1"    ).addValue(qResult.get(i).get(6 ), "");                    
				gdRes.getHeader("D02SH3" 	).addValue(qResult.get(i).get(7 ), "");                    
				gdRes.getHeader("D02SH5" 	).addValue(qResult.get(i).get(8 ), "");                    
				gdRes.getHeader("D03SH1" 	).addValue(qResult.get(i).get(9 ), "");                    
				gdRes.getHeader("D03SH3" 	).addValue(qResult.get(i).get(10), "");                    
				gdRes.getHeader("D03SH5" 	).addValue(qResult.get(i).get(11), "");                    
				gdRes.getHeader("D04SH1" 	).addValue(qResult.get(i).get(12), "");                    
				gdRes.getHeader("D04SH3" 	).addValue(qResult.get(i).get(13), "");                    
				gdRes.getHeader("D04SH5" 	).addValue(qResult.get(i).get(14), "");                    
				gdRes.getHeader("D05SH1" 	).addValue(qResult.get(i).get(15), "");                    
				gdRes.getHeader("D05SH3" 	).addValue(qResult.get(i).get(16), "");                    
				gdRes.getHeader("D05SH5" 	).addValue(qResult.get(i).get(17), "");                    
				gdRes.getHeader("D06SH1" 	).addValue(qResult.get(i).get(18), "");                    
				gdRes.getHeader("D06SH3" 	).addValue(qResult.get(i).get(19), "");                    
				gdRes.getHeader("D06SH5"  	).addValue(qResult.get(i).get(20), "");                    
				gdRes.getHeader("D07SH1" 	).addValue(qResult.get(i).get(21), "");                    
				gdRes.getHeader("D07SH3" 	).addValue(qResult.get(i).get(22), "");                    
				gdRes.getHeader("D07SH5" 	).addValue(qResult.get(i).get(23), "");                    
				gdRes.getHeader("ITEM" 	    ).addValue(qResult.get(i).get(24), qResult.get(i).get(25));
							
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

	
	 
	// 저장
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("PLANT_NAME").getRowCount());

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
			sql += "MERGE   INTO SHIFT_SPECIFY_QUANTITY SS \n"
				+  "USING   ( \n"
				+  "        SELECT  A.CAT_ID, A.PLANT_ID, A.LINE_ID, B.SWEEK + A.WEEK_SEQ WEEK53, A.SHIFT_QTY, A.MADE_DTTM, A.MADE_BY \n"
				+  "        FROM    ( \n";
			
			String made_by = gdReq.getParam("user_id");
			int p_weekCnt = Integer.parseInt(gdReq.getParam("weekCnt"));
			String p_sDate = gdReq.getParam("sdate").replace("-", "");
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				String plant_id = gdReq.getHeader("PLANT_NAME").getHiddenValue(i);//공장코드
				String line_id = gdReq.getHeader("LINE_NAME").getHiddenValue(i);  //라인코드
				//String week53 = gdReq.getHeader("WORK_TYPE").getHiddenValue(i);	  //주차
				
				if( i > 0){
					sql += " UNION ALL \n"; 
				}
				
				for ( int j = 0 ; j < p_weekCnt ; j++ ){
					if( j > 0){
						sql += " UNION ALL \n"; 
					}					
					String shift_qty = gdReq.getHeader("IDX_QTY" + (j+1)).getValue(i);	  //기준 물량
					String week_seq = gdReq.getHeader("IDX_QTY" + (j+1)).getHiddenValue(i); // 주차 시퀀스
									
					sql += "		SELECT  'PS' CAT_ID, '" + plant_id + "' PLANT_ID, '" + line_id + "' LINE_ID, '" + week_seq + "' WEEK_SEQ, '" + shift_qty + "' SHIFT_QTY, SYSDATE MADE_DTTM, '" + made_by + "' MADE_BY FROM DUAL ";
				}
								
			}
			
			sql +=  "                ) A,                            \n" 
				+ "                (                               \n" 
				+ "                SELECT  MIN(YYYYWW) AS SWEEK    \n" 
				+ "                FROM    CAL_MST CAL             \n" 
				+ "                WHERE   YYYYMMDD ='" + p_sDate + "'    \n" 
				+ "                ) B                             \n"
				+ "        ) TMP \n"
				+ "        ON      ( \n"
				+ "                    SS.CAT_ID   = TMP.CAT_ID \n"
				+ "                AND SS.PLANT_ID = TMP.PLANT_ID \n"
				+ "                AND SS.LINE_ID  = TMP.LINE_ID \n"
				+ "                AND SS.WEEK53   = TMP.WEEK53 \n"
				+ "                ) \n"
				+ "                WHEN MATCHED THEN \n"
				+ "                  UPDATE \n"
				+ "                  SET    SS.SHIFT_QTY = TMP.SHIFT_QTY \n"
				+ "                        ,SS.MADE_DTTM = TMP.MADE_DTTM \n"
				+ "                        ,SS.MADE_BY   = TMP.MADE_BY \n"
				+ "                WHEN NOT MATCHED THEN \n"
				+ "                INSERT \n"
				+ "                ( \n"
				+ "                 CAT_ID, PLANT_ID, LINE_ID, WEEK53, SHIFT_QTY, MADE_DTTM, MADE_BY \n"
				+ "                ) VALUES \n"
				+ "                ( \n"
				+ "                 TMP.CAT_ID, TMP.PLANT_ID, TMP.LINE_ID, TMP.WEEK53, TMP.SHIFT_QTY, TMP.MADE_DTTM, TMP.MADE_BY \n"
				+ "                ) ";		
			
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
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}	
	
}
