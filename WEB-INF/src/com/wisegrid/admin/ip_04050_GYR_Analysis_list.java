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
public class ip_04050_GYR_Analysis_list extends HttpServlet {

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

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			String in_work_date = gdReq.getParam("in_work_date");
			String in_item_id   = gdReq.getParam("in_item_id");
			String in_item_name	= gdReq.getParam("in_item_name");
			String in_dc_id 	= gdReq.getParam("in_dc_id");
			String in_sel_gubn 	= gdReq.getParam("in_sel_gubn");
			String in_sel_type  = gdReq.getParam("in_sel_type");

			
			String paramKey   ="in_work_date!%!in_item_id!%!in_item_name!%!in_dc_id!%!in_sel_gubn!%!in_sel_type";
			String paramCode  = in_work_date+"!%!"+in_item_id+"!%!"+in_item_name+"!%!"+in_dc_id+"!%!"+in_sel_gubn+"!%!"+in_sel_type;
			String query_id   = "ip_04050_GYR_Analysis_list";

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			rowCount = qResult.size();

			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");		
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			for (int i = 0; i < rowCount; i++) {
				//gdRes.getHeader("CRUD").addValue("", "");  //추가,삭제,보정 을 구분하기 위한 부분.C(추가) ,U(보정) ,D(삭제)

				if (in_sel_type.equals("00")) { // 품목
					gdRes.getHeader("ITEM_ID"        ).addValue(qResult.get(i).get(0 ),""); 
	                gdRes.getHeader("ITEM_NAME"     ).addValue(qResult.get(i).get(1 ),""); 
	                gdRes.getHeader("TERM_VAL"      ).addValue(qResult.get(i).get(2 ),"");
	                gdRes.getHeader("GYR_RATE"      ).addValue(qResult.get(i).get(3 ),"");
	                gdRes.getHeader("Y"      ).addValue(qResult.get(i).get(4 ),"");
	                gdRes.getHeader("R"   ).addValue(qResult.get(i).get(5 ),"");
	                gdRes.getHeader("Y_REMN"   ).addValue(qResult.get(i).get(6 ),"");
	                gdRes.getHeader("R_REMN"   ).addValue(qResult.get(i).get(7 ),"");
	                gdRes.getHeader("USE_QTY"     ).addValue(qResult.get(i).get(8 ),"");
	                gdRes.getHeader("USE_RATE").addValue(qResult.get(i).get(9 ),"");
				}
				else {
					if (in_sel_type.equals("01")) { // 배송지점-품목
		                gdRes.getHeader("DC_ID"      ).addValue(qResult.get(i).get(0 ),"");
		                gdRes.getHeader("DC_NAME"      ).addValue(qResult.get(i).get(1 ),"");
						gdRes.getHeader("ITEM_ID"        ).addValue(qResult.get(i).get(2 ),""); 
		                gdRes.getHeader("ITEM_NAME"     ).addValue(qResult.get(i).get(3 ),""); 
					}
					else { //품목-배송지점
						gdRes.getHeader("ITEM_ID"        ).addValue(qResult.get(i).get(0 ),""); 
		                gdRes.getHeader("ITEM_NAME"     ).addValue(qResult.get(i).get(1 ),""); 
						gdRes.getHeader("DC_ID"      ).addValue(qResult.get(i).get(2 ),"");
		                gdRes.getHeader("DC_NAME"      ).addValue(qResult.get(i).get(3 ),"");
					}
	                gdRes.getHeader("TERM_VAL"      ).addValue(qResult.get(i).get(4 ),"");
	                gdRes.getHeader("GYR_RATE"      ).addValue(qResult.get(i).get(5 ),"");
	                gdRes.getHeader("Y"      ).addValue(qResult.get(i).get(6 ),"");
	                gdRes.getHeader("R"   ).addValue(qResult.get(i).get(7 ),"");
	                gdRes.getHeader("Y_REMN"   ).addValue(qResult.get(i).get(8 ),"");
	                gdRes.getHeader("R_REMN"   ).addValue(qResult.get(i).get(9 ),"");
	                gdRes.getHeader("USE_QTY"     ).addValue(qResult.get(i).get(10 ),"");
	                gdRes.getHeader("USE_RATE").addValue(qResult.get(i).get(11 ),"");
				}
			}

			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
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
		
		
		
		try {
			
			
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}	
	
}