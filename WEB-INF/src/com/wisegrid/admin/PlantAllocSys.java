package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zionex.t3sinc.common.CommonUtil;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData; 
 
/** 
 * 
 * @author iCOMPIA CORP.
 */
public class PlantAllocSys extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;

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
			
			//String from_date = gdReq.getParam("from_date");
			//String to_date = gdReq.getParam("to_date");
			
			//sample_data sd = new sample_data();
			//rowCount = sd.getRowcount();
			//String _board_search_condition = gdReq.getParam("_board_search_condition");
			//String _board_search_value = gdReq.getParam("_board_search_value");
			//String paramKey = "_board_search_condition!%!_board_search_value";
			//String paramCode = _board_search_condition + "!%!" + _board_search_value;
			//String query_id = "user_list";
			
			String start_date = gdReq.getParam("start_date");
			String domain = gdReq.getParam("domain");
			String kind = gdReq.getParam("kind");
			String version = gdReq.getParam("version");
			String paramKey = "sdate!%!checked_domain!%!checked_pa_pr!%!plant_alloc_version";
			String paramCode = start_date + "!%!" + domain + "!%!" + kind + "!%!" + version;
			String query_id = "plantAllocationPlanResultAnalysis_list_TEST";
			
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
				//gdRes.getHeader("SELECTED").addValue("0", "");
				//gdRes.getHeader("USER_ID").addValue(qResult.get(i).get(0), "");
				//gdRes.getHeader("USER_NAME").addValue(qResult.get(i).get(1), "");
				//gdRes.getHeader("GROUP_NAME").addValue(qResult.get(i).get(2), "");
				//gdRes.getHeader("EMAIL").addValue(qResult.get(i).get(3), "");
				//gdRes.getHeader("PHON").addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("C01").addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("C02").addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("C03").addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("C04").addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("C05").addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("C06").addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("C07").addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("C08").addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("C09").addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("C10").addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("C11").addValue(qResult.get(i).get(38), "");
				gdRes.getHeader("C12").addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("C13").addValue(qResult.get(i).get(12), "");
				gdRes.getHeader("C14").addValue(qResult.get(i).get(31), "");
				gdRes.getHeader("C15").addValue(qResult.get(i).get(32), "");
				gdRes.getHeader("C16").addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("C17").addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("C18").addValue(qResult.get(i).get(20), "");
				gdRes.getHeader("C19").addValue(qResult.get(i).get(24), "");
				gdRes.getHeader("C20").addValue(qResult.get(i).get(41), "");
				gdRes.getHeader("C21").addValue(qResult.get(i).get(42), "");
				gdRes.getHeader("C22").addValue(qResult.get(i).get(25), "");
				gdRes.getHeader("C23").addValue(qResult.get(i).get(39), "");
				gdRes.getHeader("C24").addValue(qResult.get(i).get(26), "");
				gdRes.getHeader("C25").addValue(qResult.get(i).get(33), "");
				gdRes.getHeader("C26").addValue(qResult.get(i).get(34), "");
				gdRes.getHeader("C27").addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("C28").addValue(qResult.get(i).get(21), "");
				gdRes.getHeader("C29").addValue(qResult.get(i).get(22), "");
				gdRes.getHeader("C30").addValue(qResult.get(i).get(40), "");
				gdRes.getHeader("C31").addValue(qResult.get(i).get(23), "");
				gdRes.getHeader("C32").addValue(qResult.get(i).get(37), "");
			}
			
			/*
			// 
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("SELECTED").addValue("0", "");				
				gdRes.getHeader("ITEM_FLAG").addSelectedHiddenValue(sd.getValue(i, 0));
				gdRes.getHeader("VENDOR_NAME").addValue(sd.getValue(i, 1), "");
				gdRes.getHeader("ITEM_CODE").addValue(sd.getValue(i, 2), "", 0);
				gdRes.getHeader("ITEM_NAME").addValue(sd.getValue(i, 3), "");
				gdRes.getHeader("SPECIFICATION").addValue(sd.getValue(i, 4), "");
				gdRes.getHeader("UNIT").addSelectedHiddenValue(sd.getValue(i, 5));
				gdRes.getHeader("PRICE").addValue(sd.getValue(i, 6), "");
				gdRes.getHeader("STOCK").addValue(sd.getValue(i, 7), "");
				gdRes.getHeader("ADD_DATE").addValue(sd.getValue(i, 8), "");
				gdRes.getHeader("CHANGE_DATE").addValue(sd.getValue(i, 9), "");
			}
			*/
			
			/* 
			 * 
			 * Status
			 */		
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
}