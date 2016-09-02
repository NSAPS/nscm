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
public class md_01020_masterDataCheckItem_list extends HttpServlet {

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
			else if (mode.equals("search2"))
				gdRes = doQuery2(gdReq);

			
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
			
			//System.out.println("getParam...");
						
			String paramKey = "";
			String paramCode = "";
			String query_id = gdReq.getParam("query_id");
			System.out.println("getSelQeury : " + query_id);
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			//쿼리 결과가 없을 때
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
							        
	        //그리드에 data input
			System.out.println("그리드 객체에 Data Input");
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("DATA_TYPE"     	).addValue(qResult.get(i).get(0 ), "");// 
				gdRes.getHeader("ITEM_ID"    		).addValue(qResult.get(i).get(1 ), "");//
				gdRes.getHeader("ITEM_TYPE"     	).addValue(qResult.get(i).get(2 ), "");//
				gdRes.getHeader("ITEM_NAME"			).addValue(qResult.get(i).get(3 ), "");//
				gdRes.getHeader("ITEM_DETAIL_FLAG"  ).addValue(qResult.get(i).get(4 ), "");//
				gdRes.getHeader("LINE_SETTING_FLAG" ).addValue(qResult.get(i).get(5 ), "");//
				gdRes.getHeader("BOM_MASTER_FLAG"	).addValue(qResult.get(i).get(6 ), "");//
							
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
			String p_item_id = gdReq.getParam("item_id");
			
			String paramKey = "item_id";
			String paramCode = p_item_id;
			String query_id = gdReq.getParam("query_id");
			System.out.println("getSelQeury : " + query_id);
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			//쿼리 결과가 없을 때
			if (rowCount == 0) {
				gdRes.addParam("mode", "search2");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
							        
	        //그리드에 data input
			System.out.println("그리드 객체에 Data Input");
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("DATA_TYPE"  ).addValue(qResult.get(i).get(0 ), "");// 
				gdRes.getHeader("DATA_TABLE" ).addValue(qResult.get(i).get(1 ), "");//
				gdRes.getHeader("DATA_EXISTS").addValue(qResult.get(i).get(2 ), "");//
				gdRes.getHeader("NAME_DATA1" ).addValue(qResult.get(i).get(3 ), "");//
				gdRes.getHeader("NAME_DATA2" ).addValue(qResult.get(i).get(4 ), "");//
				gdRes.getHeader("NAME_DATA3" ).addValue(qResult.get(i).get(5 ), "");//
							
			}
		
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			System.out.println("화면에 전달할 파마미터 설정");
			gdRes.addParam("mode", "search2");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		System.out.println("그리드 객체 return");		
		return gdRes;
	}
	
}
