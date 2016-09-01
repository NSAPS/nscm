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

//sc_11020_dailyProductionPlan_totalization01

public class sc_01010_capaAssignMaterialCompare_list01_1 extends HttpServlet {

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
		
		conn = databaseUtility.getConnection("t3sinc");
	    stmt = conn.createStatement();

	    GridData gdRes = new GridData();
		int rowCount = 0;
		int loopNum = 0;
		String s_query = "";
		String sub_query = "";

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			//String p_plant_name = gdReq.getParam("plant_name");
			
			String p_version1 = gdReq.getParam("version1");
			String p_version2 = gdReq.getParam("version2");
			String p_res_code = gdReq.getParam("res_code");
			String p_item_list = gdReq.getParam("item_list");
			String p_factory = gdReq.getParam("factory");
			
			System.out.println("!!!!!!!!!!!!!!!  yongsoo  !!!!!!!!!!!!!!!!!!!");
			System.out.println("!!!!!!!!!!!!!!!"+p_version1+"!!!!!!!!!!!!!!!!!");
			System.out.println("!!!!!!!!!!!!!!!"+p_version2+"!!!!!!!!!!!!!!!!!");
			System.out.println("!!!!!!!!!!!!!!!"+p_res_code+"!!!!!!!!!!!!!!!!!");
			System.out.println("!!!!!!!!!!!!!!!"+p_item_list+"!!!!!!!!!!!!!!!!!");
			System.out.println("!!!!!!!!!!!!!!!"+p_factory+"!!!!!!!!!!!!!!!!!");
			System.out.println("!!!!!!!!!!!!!!!  yongsoo  !!!!!!!!!!!!!!!!!!!");

			//String p_startDate= gdReq.getParam("startDate");
			//String p_endDate  = gdReq.getParam("endDate");
			//String p_plant_id = gdReq.getParam("plant_id");
			
			
			
			s_query += "\n    /* Capa 조건에 따른 할당물량 비교 : 공장별 집계 (설비유형, 공장별 화면용) */                                                      ";
			s_query += "\n    select NVL(null,' ') AS cat06, NVL(null,' ') AS cat06_name, NVL(ls.plant_id,' ') AS PLANT_ID, NVL(ls.plant_name,' ') AS PLANT_NAME,                                                                   ";
			s_query += "\n           ROUND(TO_NUMBER(NVL(nc.nc_qty,0)),0) AS NC_QTY, TO_NUMBER(NVL(nc.nc_rate,0)) AS NC_RATE, ROUND(TO_NUMBER(NVL(nc.nc_amount,0)),0) AS NC_AMOUNT,                                                                                       ";
			s_query += "\n           ROUND(TO_NUMBER(NVL(ca.ca_qty,0)),0) AS CA_QTY, TO_NUMBER(NVL(ca.ca_rate,0)) AS CA_RATE, ROUND(TO_NUMBER(NVL(ca.ca_amount,0)),0) AS CA_AMOUNT                                                                                        ";
			s_query += "\n      from (/* Capa 제약없음 */                                                                                                       ";
			s_query += "\n            select null cat06, null cat06_name, ct.dcpath2_cd plant_id, ct.dcpath2 plant_name                                         ";
			s_query += "\n              from fa_cost_trace ct,                                                                                                  ";
			s_query += "\n                   item_mst im,                                                                                                       ";
			s_query += "\n                   (select cd cat06, cd_name cat06_name                                                                               ";
			s_query += "\n                      from code_mst                                                                                                   ";
			s_query += "\n                     where cd_grp = 'CAT06'                                                                                           ";
			s_query += "\n                   ) cd                                                                                                               ";
			s_query += "\n             where ct.version = '"+p_version1+"' --'20090420.14.58'                                                                                      ";
			s_query += "\n               and ct.item_id = im.item_id                                                                                            ";
			s_query += "\n               and im.cat06   = cd.cat06                                                                                              ";
			s_query += "\n            union                                                                                                                     ";
			s_query += "\n            /* Capa 제약 */                                                                                                           ";
			s_query += "\n            select null cat06, null cat06_name, ct.dcpath2_cd plant_id, ct.dcpath2 plant_name                                         ";
			s_query += "\n              from fa_cost_trace ct,                                                                                                  ";
			s_query += "\n                   item_mst im,                                                                                                       ";
			s_query += "\n                   (select cd cat06, cd_name cat06_name                                                                               ";
			s_query += "\n                      from code_mst                                                                                                   ";
			s_query += "\n                     where cd_grp = 'CAT06'                                                                                           ";
			s_query += "\n                   ) cd                                                                                                               ";
			s_query += "\n             where ct.version = '"+p_version2+"' --'20090421.11.04'                                                                                      ";
			s_query += "\n               and ct.item_id = im.item_id                                                                                            ";
			s_query += "\n               and im.cat06   = cd.cat06                                                                                              ";
			s_query += "\n           ) ls,                                                                                                                      ";
			s_query += "\n           (/* Capa 제약없음 */                                                                                                       ";
			s_query += "\n            select distinct null cat06, null cat06_name, ct.dcpath2_cd plant_id, ct.dcpath2 plant_name,                               ";
			s_query += "\n                   sum(ct.qty) over(partition by ct.dcpath2_cd) nc_qty,                                                               ";
			s_query += "\n                   round(sum(ct.qty) over(partition by ct.dcpath2_cd)/sum(ct.qty) over (partition by ct.dcpath2_cd), 2) nc_rate,      ";
			s_query += "\n                   sum(ct.total_amt) over(partition by ct.dcpath2_cd) nc_amount                                                       ";
			s_query += "\n              from fa_cost_trace ct,                                                                                                  ";
			s_query += "\n                   item_mst im,                                                                                                       ";
			s_query += "\n                   (select cd cat06, cd_name cat06_name                                                                               ";
			s_query += "\n                      from code_mst                                                                                                   ";
			s_query += "\n                     where cd_grp = 'CAT06'                                                                                           ";
			s_query += "\n                   ) cd                                                                                                               ";
			s_query += "\n             where ct.version = '"+p_version1+"' --'20090420.14.58'                                                                                      ";
			s_query += "\n               and ct.item_id = im.item_id                                                                                            ";
			s_query += "\n               and im.cat06   = cd.cat06                                                                                              ";
			s_query += "\n           ) nc,                                                                                                                      ";
			s_query += "\n           (/* Capa 제약 */                                                                                                           ";
			s_query += "\n            select distinct null cat06, null cat06_name, ct.dcpath2_cd plant_id, ct.dcpath2 plant_name,                               ";
			s_query += "\n                   sum(ct.qty) over(partition by ct.dcpath2_cd) ca_qty,                                                               ";
			s_query += "\n                   round(sum(ct.qty) over(partition by ct.dcpath2_cd)/sum(ct.qty) over (partition by ct.dcpath2_cd), 2) ca_rate,      ";
			s_query += "\n                   sum(ct.total_amt) over(partition by ct.dcpath2_cd) ca_amount                                                       ";
			s_query += "\n              from fa_cost_trace ct,                                                                                                  ";
			s_query += "\n                   item_mst im,                                                                                                       ";
			s_query += "\n                   (select cd cat06, cd_name cat06_name                                                                               ";
			s_query += "\n                      from code_mst                                                                                                   ";
			s_query += "\n                     where cd_grp = 'CAT06'                                                                                           ";
			s_query += "\n                   ) cd                                                                                                               ";
			s_query += "\n             where ct.version = '"+p_version2+"' --'20090421.11.04'                                                                                      ";
			s_query += "\n               and ct.item_id = im.item_id                                                                                            ";
			s_query += "\n               and im.cat06   = cd.cat06                                                                                              ";
			s_query += "\n           ) ca                                                                                                                       ";
			s_query += "\n     where ls.plant_id = nc.plant_id(+)                                                                                               ";
			s_query += "\n       and ls.plant_id = ca.plant_id(+)                                                                                               ";
			s_query += "\n     order by ls.plant_id, ls.plant_name                                                                                              ";

			
			

		    
			System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query);
            
            /*
			for( int i = 0 ; rs.next() ; i++ ) {
                gdRes.getHeader("cat06" ).addValue(rs.getString(0), "");
                gdRes.getHeader("cat06_name"  ).addValue(rs.getString(1),"");
                gdRes.getHeader("item_id"  ).addValue(rs.getString(2), "");
                gdRes.getHeader("item_name"  ).addValue(rs.getString(3), "");
                gdRes.getHeader("spec"  ).addValue(rs.getString(4), "");
                gdRes.getHeader("gubun"  ).addValue(rs.getString(5), "");
                gdRes.getHeader("anyang"  ).addValue(rs.getString(6), "");
                gdRes.getHeader("anseong"  ).addValue(rs.getString(7), "");
                gdRes.getHeader("anseong_u"  ).addValue(rs.getString(8), "");
                gdRes.getHeader("asan"  ).addValue(rs.getString(9), "");
                gdRes.getHeader("gumi"  ).addValue(rs.getString(10), "");
                gdRes.getHeader("busan"  ).addValue(rs.getString(11), "");
                gdRes.getHeader("noksan"  ).addValue(rs.getString(12), "");
                gdRes.getHeader("total"  ).addValue(rs.getString(13), "");
 			}*/
			
            
            //rs는 1부터 시작!!
			for( int i = 0 ; rs.next() ; i++ ) {
                gdRes.getHeader("CAT06" ).addValue(rs.getString(1), "");
                gdRes.getHeader("CAT06_NAME"  ).addValue(rs.getString(2),"");
                gdRes.getHeader("PLANT_ID"  ).addValue(rs.getString(3), "");
                gdRes.getHeader("PLANT_NAME"  ).addValue(rs.getString(4), "");
                gdRes.getHeader("NC_QTY"  ).addValue(rs.getString(5), "");
                gdRes.getHeader("NC_RATE"  ).addValue(rs.getString(6), "");
                gdRes.getHeader("NC_AMOUNT"  ).addValue(rs.getString(7), "");
                gdRes.getHeader("CA_QTY"  ).addValue(rs.getString(8), "");
                gdRes.getHeader("CA_RATE"  ).addValue(rs.getString(9), "");
                gdRes.getHeader("CA_AMOUNT"  ).addValue(rs.getString(10), "");
 			}
      
			
			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally{
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
			
			/*
			
			//데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
			 
				//화면에서 전달받은 "CRUD"의 HiddenValue를 가져온다.
				String crud = gdReq.getHeader("CRUD").getHiddenValue(i);
				
				if (crud.equals("C")) {
					System.out.println("인설트!!! 행을 생성하여 저장!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_insert";
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID!%!GROUP_NAME";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
							paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
							

							//다중 추가시 문제 해결 부분 쿼리에서 에러 안나오게 하기위해 추가함.
							String sql= "";     
							       sql = "select GROUP_ID from REG_GROUP where GROUP_ID = '";
							       sql = sql + gdReq.getHeader("GROUP_ID").getValue(i)+ "'";       
							       rs = databaseUtility.executeQuery(stmt, sql);       
							        
							       if( rs.next() == false ){
							       	  new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							       }else{
							       	  System.out.println("값있음,,,;;");
							       }
							//다중추가 문제  끝.
							
							        
						  //new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
					}
					
					
				} else if (crud.equals("U")) {
					System.out.println("업데이트!! 수정한값을 저장!!!!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_update";
					
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID!%!GROUP_NAME";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
							paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
							new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
					}
					
					
					
				} else if (crud.equals("D")) {
					System.out.println("삭제!! 선택한값을 삭제함!!!!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_delete";
					
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i);
							new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
						}
					
					
				}
			}
			*/
					
			/*
			 * 생성된 3개의 자료구조를 DataBase에 넘겨 처리한다.
			 */
			
			// 이 예제는 통합통신의 동작을 확인하기 위한 샘플이므로
			// 만들어진 데이터를 화면의 fieldset으로  보내 정상적으로 통신이 이루어졌는지 확인한다.
			//String returnData = getSendData(createDataList, "C");
			//returnData += getSendData(updateDataList, "U");
			//returnData += getSendData(deleteDataList, "D");

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
		}
		
		return gdRes;
	}	
	
}