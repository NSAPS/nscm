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
public class sc_12020_dailySemifinishedProductPlanAnalysis_psi_pop extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sql 	= null;
    String job_id = "sc_12020_dailySemifinishedProductPlanAnalysis_psi";
	
    String versionLst = "";
    String sdate = "";
    String edate = "";
    String p_version ="";	
    String p_plant_name     = "";
    String p_checked_weekly = "";
    
	
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
			gdReq = OperateGridData.parse(rawData);
			String mode = gdReq.getParam("mode");
			
			if (mode.equals("search")) 
				gdRes = doQuery(gdReq);

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
		String s_query   = "";
	    versionLst="";
	    
	    
		int loopNum = 0;

	    GridData gdRes = new GridData();		

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
            String p_plant_id          = gdReq.getParam("plant_id");
            String p_week_start_date   = gdReq.getParam("week_start_date");
			
            s_query  ="\n with V_LST                                                                                                                    ";
            s_query +="\n      as (                                                                                                                     ";
            s_query +="\n           select  --공장-라인별로 생산가능한 아이템리스트를 출력한다.                                                         ";
            s_query +="\n                   CAP.PLANT_ID                                                                                                ";
            s_query +="\n                  ,CAP.LINE_ID                                                                                                 ";
            s_query +="\n                  ,CAP.ITEM_ID as SEMI_ITEM_ID  ,ITM.ITEM_NAME                                                                                  ";
            s_query +="\n                  ,CAP.PROD_VER                                                                                                ";
            s_query +="\n                  ,CAP.PROC_ID                                                                                                 ";
            s_query +="\n                  ,'' as PROD_DATES                                                                                            ";
            s_query +="\n                  ,'' as SHIFT_TYPE                                                                                            ";
            s_query +="\n                  ,VER.MAX_VERSION as VERSION                                                                                  ";
            s_query +="\n             from (                                                                                                            ";
            s_query +="\n                   select distinct PLANT_ID ,PROD_VER ,PROC_ID ,ITEM_ID ,LINE_ID                                               ";
            s_query +="\n                     from (                                                                                                    ";
            s_query +="\n                           select --CAPA정보에서 공장별 제품 리스트를 가져온다.                                                ";
            s_query +="\n                                  CAP.PLANT_ID , CAP.PROD_VER ,CAP.PROC_ID ,CAP.ITEM_ID ,CAP.LINE_ID ,CAP.OPER_ID              ";
            s_query +="\n                                 ,max(CAP.OPER_ID) over( partition by PLANT_ID ,PROD_VER ,ITEM_ID order by 1) as MAX_OPER_RANK "; 
            s_query +="\n                             from ITEM_CAPA CAP                                                                                ";
            s_query +="\n                            where MADE_TYPE !='DE'                                                                             ";
            s_query +="\n                              and ITEM_TYPE  ='HALB'                                                                           ";
            s_query +="\n                              and PLANT_ID in ('"+p_plant_id+"')";
            s_query +="\n                              and ITEM_ID like '71%'                                                                           ";
            s_query +="\n                          )                                                                                                    ";
            s_query +="\n                     where OPER_ID=MAX_OPER_RANK                                                                               ";
            s_query +="\n                  ) CAP                                                                                                        ";
            s_query +="\n                  inner join                                                                                                   ";
            s_query +="\n                  (                                                                                                            ";
            s_query +="\n                   select --반제품 마지막 버젼을 가져온다.                                                                     ";
            s_query +="\n                          max(VERSION) as MAX_VERSION                                                                          ";
            s_query +="\n                     from PLAN_VERSION_LOG                                                                                     ";
            s_query +="\n                     where PERIOD_TYPE = 'DAILY'                                                                               ";
            s_query +="\n                       and CAT_ID      = 'SS'                                                                                  ";
            s_query +="\n                  ) VER                                                                                                        ";
            s_query +="\n                  on 1=1                                                                                                       ";
            s_query +="\n                  -----------------------------------------                                                                    ";
            s_query +="\n                  --스프만.                                                                                                    ";
            s_query +="\n                  inner join ITEM_MST ITM                                                                                      ";
            s_query +="\n                  on  ITM.ITEM_ID =CAP.ITEM_ID                                                                                 ";
            s_query +="\n                  and ITM.ITYPE   ='HALB'                                                                                      ";
            s_query +="\n                  and ITM.ITEM_ID like '71%'                                                                                   ";
            s_query +="\n            order by PLANT_ID ,ITEM_ID ,LINE_ID ,PROC_ID                                                                       ";
            s_query +="\n         )                                                                                                                     ";
            s_query +="\n         select PNT.PLANT_NAME ,LIN.LINE_NAME ,PRC.PROC_NAME ,LST.ITEM_NAME                                                    ";
            s_query +="\n               ,LST.PLANT_ID ,LST.LINE_ID ,LST.SEMI_ITEM_ID ";
            s_query +="\n               ,nvl(BAT.BOX_QTY,10) as IDX                          ";
            s_query +="\n               ,LST.PROD_VER ,LST.PROC_ID ,LST.VERSION ,'"+p_week_start_date+"' as WEEK_START_DATE                                ";
            s_query +="\n               ,0 as D01A ,0 as D01B ,0 as D01C                                                                                ";
            s_query +="\n               ,0 as D02A ,0 as D02B ,0 as D02C                                                                                ";
            s_query +="\n               ,0 as D03A ,0 as D03B ,0 as D03C                                                                                ";
            s_query +="\n               ,0 as D04A ,0 as D04B ,0 as D04C                                                                                ";
            s_query +="\n               ,0 as D05A ,0 as D05B ,0 as D05C                                                                                ";
            s_query +="\n               ,0 as D06A ,0 as D06B ,0 as D06C                                                                                ";
            s_query +="\n               ,0 as D07A ,0 as D07B ,0 as D07C                                                                                ";
            s_query +="\n               ,BG01A ,BG01B ,BG01C  ";
            s_query +="\n               ,BG02A ,BG02B ,BG02C  ";
            s_query +="\n               ,BG03A ,BG03B ,BG03C  ";
            s_query +="\n               ,BG04A ,BG04B ,BG04C  ";
            s_query +="\n               ,BG05A ,BG05B ,BG05C  ";
            s_query +="\n               ,BG06A ,BG06B ,BG06C  ";
            s_query +="\n               ,BG07A ,BG07B ,BG07C  ";
            s_query +="\n           from V_LST LST                                                                                                      ";
            s_query +="\n                left join V_PLANT PNT                                                                                          ";
            s_query +="\n                on  PNT.PLANT_ID =LST.PLANT_ID                                                                                 ";
            s_query +="\n                left outer join V_LINE LIN                                                                                     ";
            s_query +="\n                on  LIN.PLANT_ID=LST.PLANT_ID                                                                                  ";
            s_query +="\n                and LIN.LINE_ID =LST.LINE_ID                                                                                   ";
            s_query +="\n                left outer join V_PROC PRC                                                                                     ";
            s_query +="\n                on  PRC.PLANT_ID =LST.PLANT_ID                                                                                 ";
            s_query +="\n                and PRC.PROC_ID =LST.PROC_ID                                                                                   ";
            s_query +="\n                left outer join                                                                                                                                                                    ";
            s_query +="\n                (                                                                                                                                                                                  ";
            s_query +="\n                 select WDY.PLANT_ID ,WDY.PROC_ID                                                                                                                                                  ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=1 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG01A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=1 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG01B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=1 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG01C ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=2 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG02A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=2 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG02B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=2 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG02C ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=3 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG03A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=3 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG03B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=3 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG03C ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=4 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG04A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=4 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG04B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=4 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG04C ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=5 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG05A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=5 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG05B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=5 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG05C ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=6 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG06A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=6 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG06B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=6 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG06C ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=7 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG07A ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=7 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG07B ";
            s_query +="\n                       ,max(case when CAL.DAY_RANK=7 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG07C ";
            s_query +="\n                   from WORK_DIARY WDY                                                                                                                                                             ";
            s_query +="\n                        inner join                                                                                                                                                                 ";
            s_query +="\n                        (                                                                                                                                                                          ";
            s_query +="\n                         select YYYYMMDD ,dense_rank() over( order by YYYYMMDD) as DAY_RANK                                                                                                        ";
            s_query +="\n                           from CAL_MST CAL                                                                                                                                                        ";
            s_query +="\n                          where CAL.YYYYMMDD between '"+p_week_start_date+"' and to_char(to_date('"+p_week_start_date+"','YYYYMMDD')+7,'YYYYMMDD')                                                                                                                     ";
            s_query +="\n                        ) CAL                                                                                                                                                                      ";
            s_query +="\n                        on  WDY.PLANT_ID in ('"+p_plant_id+"')                                                                                                                                               ";
            s_query +="\n                        and WDY.DUTY_DATE =CAL.YYYYMMDD                                                                                                                                            ";
            s_query +="\n                      group by WDY.PLANT_ID ,WDY.PROC_ID                                                                                                                                           ";
            s_query +="\n                ) MOD                                                                                                                                                                              ";
            s_query +="\n                on  MOD.PLANT_ID=LST.PLANT_ID                                                                                                                                                      ";
            s_query +="\n                and MOD.PROC_ID =LST.PROC_ID                                                                                                                                                       ";            
            s_query +="\n                left outer join SEMI_ITEM_BATCH BAT                                                                            ";
            s_query +="\n                on  LST.SEMI_ITEM_ID =BAT.ITEM_ID                                                                              ";
            s_query +="\n          where not exists                                                                                                     ";
            s_query +="\n                (                                                                                                              ";
            s_query +="\n                 select 'X'                                                                                                    ";
            s_query +="\n                   from DAILY_SCH_PLAN_SEMI_PSI PLA                                                                               ";
            s_query +="\n                  where PLA.CAT_ID='SS'                                                                                        ";
            s_query +="\n                    and PLA.PLANT_ID=LST.PLANT_ID                                                                              ";
            s_query +="\n                    and PLA.VERSION =LST.VERSION                                                                               ";
            s_query +="\n                    and PLA.LINE_ID =LST.LINE_ID                                                                               ";
            s_query +="\n                    and PLA.ITEM_ID =LST.SEMI_ITEM_ID                                                                               ";
            s_query +="\n                    and PLA.PROC_ID =LST.PROC_ID                                                                               ";
            s_query +="\n                    and PLA.PROD_VER=LST.PROD_VER                                                                              ";
            s_query +="\n                )                                                                                                              ";
            s_query +="\n          order by PLANT_NAME ,LINE_NAME ,PROC_NAME ,ITEM_NAME                                                                 ";		    
		    
		    System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 
 
			
            if(rs.next()){
                do{
                    gdRes.getHeader("CRUD").addValue("", "");  //추가,삭제,보정 을 구분하기 위한 부분.C(추가) ,U(보정) ,D(삭제)
                	gdRes.getHeader("PLANT_NAME"   ).addValue(rs.getString("PLANT_NAME"   ),""); 
                	gdRes.getHeader("LINE_NAME"    ).addValue(rs.getString("LINE_NAME"    ),""); 
                	gdRes.getHeader("PROC_NAME"    ).addValue(rs.getString("PROC_NAME"    ),""); 
                	gdRes.getHeader("ITEM_NAME"    ).addValue(rs.getString("ITEM_NAME"    ),""); 
                    gdRes.getHeader("PLANT_ID"     ).addValue(rs.getString("PLANT_ID"     ),"");
                    gdRes.getHeader("IDX"          ).addValue(rs.getString("IDX"          ),"");
                	gdRes.getHeader("LINE_ID"      ).addValue(rs.getString("LINE_ID"      ),"");
                	gdRes.getHeader("PROC_ID"      ).addValue(rs.getString("PROC_ID"      ),"");
                    gdRes.getHeader("SEMI_ITEM_ID"      ).addValue(rs.getString("SEMI_ITEM_ID"      ),"");
                    gdRes.getHeader("PROD_VER"     ).addValue(rs.getString("PROD_VER"     ),"");
                    gdRes.getHeader("VERSION"      ).addValue(rs.getString("VERSION"   ),"");            
                    gdRes.getHeader("WEEK_START_DATE"      ).addValue(rs.getString("WEEK_START_DATE"   ),"");            
                	gdRes.getHeader("D01A"         ).addValue(rs.getString("D01A"         ),""); 
                	gdRes.getHeader("D01B"         ).addValue(rs.getString("D01B"         ),""); 
                	gdRes.getHeader("D01C"         ).addValue(rs.getString("D01C"         ),""); 
                	gdRes.getHeader("D02A"         ).addValue(rs.getString("D02A"         ),""); 
                	gdRes.getHeader("D02B"         ).addValue(rs.getString("D02B"         ),""); 
                	gdRes.getHeader("D02C"         ).addValue(rs.getString("D02C"         ),""); 
                	gdRes.getHeader("D03A"         ).addValue(rs.getString("D03A"         ),""); 
                	gdRes.getHeader("D03B"         ).addValue(rs.getString("D03B"         ),""); 
                	gdRes.getHeader("D03C"         ).addValue(rs.getString("D03C"         ),""); 
                	gdRes.getHeader("D04A"         ).addValue(rs.getString("D04A"         ),""); 
                	gdRes.getHeader("D04B"         ).addValue(rs.getString("D04B"         ),""); 
                	gdRes.getHeader("D04C"         ).addValue(rs.getString("D04C"         ),""); 
                	gdRes.getHeader("D05A"         ).addValue(rs.getString("D05A"         ),""); 
                	gdRes.getHeader("D05B"         ).addValue(rs.getString("D05B"         ),""); 
                	gdRes.getHeader("D05C"         ).addValue(rs.getString("D05C"         ),""); 
                	gdRes.getHeader("D06A"         ).addValue(rs.getString("D06A"         ),""); 
                	gdRes.getHeader("D06B"         ).addValue(rs.getString("D06B"         ),""); 
                	gdRes.getHeader("D06C"         ).addValue(rs.getString("D06C"         ),""); 
                	gdRes.getHeader("D07A"         ).addValue(rs.getString("D07A"         ),""); 
                	gdRes.getHeader("D07B"         ).addValue(rs.getString("D07B"         ),""); 
                    gdRes.getHeader("D07C"         ).addValue(rs.getString("D07C"         ),"");                     
                    gdRes.getHeader("BG01A"         ).addValue(rs.getString("BG01A"         ),""); 
                    gdRes.getHeader("BG01B"         ).addValue(rs.getString("BG01B"         ),""); 
                    gdRes.getHeader("BG01C"         ).addValue(rs.getString("BG01C"         ),""); 
                    gdRes.getHeader("BG02A"         ).addValue(rs.getString("BG02A"         ),""); 
                    gdRes.getHeader("BG02B"         ).addValue(rs.getString("BG02B"         ),""); 
                    gdRes.getHeader("BG02C"         ).addValue(rs.getString("BG02C"         ),""); 
                    gdRes.getHeader("BG03A"         ).addValue(rs.getString("BG03A"         ),""); 
                    gdRes.getHeader("BG03B"         ).addValue(rs.getString("BG03B"         ),""); 
                    gdRes.getHeader("BG03C"         ).addValue(rs.getString("BG03C"         ),""); 
                    gdRes.getHeader("BG04A"         ).addValue(rs.getString("BG04A"         ),""); 
                    gdRes.getHeader("BG04B"         ).addValue(rs.getString("BG04B"         ),""); 
                    gdRes.getHeader("BG04C"         ).addValue(rs.getString("BG04C"         ),""); 
                    gdRes.getHeader("BG05A"         ).addValue(rs.getString("BG05A"         ),""); 
                    gdRes.getHeader("BG05B"         ).addValue(rs.getString("BG05B"         ),""); 
                    gdRes.getHeader("BG05C"         ).addValue(rs.getString("BG05C"         ),""); 
                    gdRes.getHeader("BG06A"         ).addValue(rs.getString("BG06A"         ),""); 
                    gdRes.getHeader("BG06B"         ).addValue(rs.getString("BG06B"         ),""); 
                    gdRes.getHeader("BG06C"         ).addValue(rs.getString("BG06C"         ),""); 
                    gdRes.getHeader("BG07A"         ).addValue(rs.getString("BG07A"         ),""); 
                    gdRes.getHeader("BG07B"         ).addValue(rs.getString("BG07B"         ),""); 
                    gdRes.getHeader("BG07C"         ).addValue(rs.getString("BG07C"         ),"");                     
                    
                }while(rs.next());
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
	
	
}