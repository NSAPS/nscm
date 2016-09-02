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
public class sc_12020_dailySemifinishedProductPlanAnalysis_psi extends HttpServlet {

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

            if (mode.equals("search2")) 
                gdRes = doQuery2(gdReq);
			
			if (mode.equals("cal")) 
				gdRes = doCal(gdReq);
			if (mode.equals("save")) 
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
	
	
	//그리드의 1,2 쿼리가 중복되는 부분을 정의 한다.
	public String selectQuery ()
	{
	    String m_query = "";
	    
        m_query+="\n       select LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SHIFT_TYPE ,LST.SEMI_ITEM_ID ,LST.PROD_DATES , LST.PROC_ID ,LST.CAL_RANK3                                                                                                                                               ";
        m_query+="\n             ,LST.BOX_QTY   --1 BOX당 면 갯수                                                                                                                                                                                                                        ";
        m_query+="\n             ,LST.BATCH_QTY --스프 식수                                                                                                                                                                                                                              ";
        m_query+="\n             ,LST.PROD_QTY  --면생산 수량(BOX단위)                                                                                                                                                                                                                   ";
        m_query+="\n             ,LST.SEMI_QTY  --반제품 생산 수량                                                                                                                                                                                                                       ";
        m_query+="\n             ,LST.STOCK_QTY --반제품 재고 수량                                                                                                                                                                                                                       ";
        m_query+="\n             ,case when LST.BATCH_QTY=0 then 0 else round(LST.SEMI_QTY/LST.BATCH_QTY) end as CAL_BATCH_QTY --식수                                                                                                                                                    ";
        m_query+="\n             ,case when LST.BOX_QTY=0   then 0 else round(sum(  LST.STOCK_QTY+LST.SEMI_QTY/LST.BOX_QTY-LST.PROD_QTY  ) over( partition by LST.PLANT_ID ,LST.SEMI_ITEM_ID order by LST.PROD_DATES ,LST.SHIFT_TYPE ))  end as CAL_QTY                                  ";
        m_query+="\n        from (                                                                                                                                                                                                                                                       ";
        m_query+="\n               select --계산을 위한 수량을 가져온다.                                                                                                                                                                                                                 ";
        m_query+="\n                      LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SHIFT_TYPE ,LST.SEMI_ITEM_ID ,LST.PROD_DATES ,LST.PROC_ID ,LST.CAL_RANK3                                                                                                                                       ";
        m_query+="\n                     ,LST.BOX_QTY   --BOX당면수                                                                                                                                                                                                                      ";
        m_query+="\n                     ,LST.BATCH_QTY --횟수                                                                                                                                                                                                                           ";
        m_query+="\n                     ,nvl(LST.PROD_QTY,0) as PROD_QTY  --면생산 수량                                                                                                                                                                                                                    ";
        m_query+="\n                     ,nvl(LST.SEMI_QTY,0) as SEMI_QTY  --스프 생산 수량                                                                                                                                                                                                                 ";
        m_query+="\n                     ,case when LST.CAL_RANK1=1 then LST.STOCK_QTY else 0 end as STOCK_QTY --스프 재고 수량                                                                                                                                                          ";
        m_query+="\n                 from (                                                                                                                                                                                                                                              ";
        m_query+="\n                       select PLANT_ID ,LINE_ID ,PROD_VER ,SEMI_ITEM_ID ,SHIFT_TYPE ,PROD_DATES , PROC_ID ,SEMI_QTY ,STOCK_QTY ,BOX_QTY ,BATCH_QTY ,CAL_RANK1 ,CAL_RANK2 ,CAL_RANK3                                                                                            ";
        m_query+="\n                             ,sum(PROD_QTY) as PROD_QTY                                                                                                                                                                                                              ";
        m_query+="\n                        from (                                                                                                                                                                                                                                       ";
        m_query+="\n                               select --반제품 기준으로 반제품 수량, 완제품수량, 제고 수량을 가져온다.                                                                                                                                                               ";
        m_query+="\n                                      distinct                                                                                                                                                                                                                       ";
        m_query+="\n                                      LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID ,CAL.SHIFT_TYPE ,LST.PROC_ID                                                                                                                                         ";
        m_query+="\n                                     ,CAL.YYYYMMDD as PROD_DATES                                                                                                                                                                                                     ";
        m_query+="\n                                     ,FN_GET_SEMI_TOTAL_QTY(LST.VERSION ,LST.PLANT_ID ,LST.LINE_ID ,LST.PROC_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID ,CAL.YYYYMMDD ,CAL.SHIFT_TYPE) as SEMI_QTY                                                                           ";
        m_query+="\n                                     ,sum(ceil(XXX.QTY/nvl(BAT.BOX_QTY,10))) over( partition by LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID ,CAL.SHIFT_TYPE ,CAL.YYYYMMDD order by 1) as PROD_QTY --완제품 수량                                              ";
        m_query+="\n                                     ,FN_GET_SEMI_STOCK_QTY(LST.PLANT_ID ,LST.SEMI_ITEM_ID ,'"+sdate+"') as STOCK_QTY  --재고수량                                                                                                                                                 ";
        m_query+="\n                                     ,nvl(BAT.BOX_QTY,10)   as BOX_QTY                                                                                                                                                                                               ";
        m_query+="\n                                     ,nvl(BAT.BATCH_QTY,1000) as BATCH_QTY                                                                                                                                                                                           ";
        m_query+="\n                                     ,dense_rank() over( partition by LST.PLANT_ID ,LST.SEMI_ITEM_ID order by LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID ,CAL.SHIFT_TYPE ,CAL.YYYYMMDD) as CAL_RANK1 --재고를 한번만 반영하기위한 RANK                              ";                                                                                 
        m_query+="\n                                     ,dense_rank() over( partition by LST.PLANT_ID ,CAL.YYYYMMDD ,LST.SEMI_ITEM_ID ,CAL.SHIFT_TYPE order by LST.LINE_ID ,LST.SEMI_ITEM_ID ) as CAL_RANK2 --재고를 한번만 반영하기위한 RANK                                           ";
        m_query+="\n                                     ,dense_rank() over( order by CAL.YYYYMMDD) as CAL_RANK3 --날짜별 우선순위                                                                                                                                                       ";
        m_query+="\n                                 from (                                                                                                                                                                                                                              ";
        m_query+="\n                                       select distinct PSI.VERSION ,PSI.PLANT_ID ,PSI.ITEM_ID as SEMI_ITEM_ID,PSI.LINE_ID ,PSI.PROD_VER ,PSI.PROC_ID                  ";
        m_query+="\n                                             ,BOM.PROD_ITEM_ID                                                                                                        ";
        m_query+="\n                                         from DAILY_SCH_PLAN_SEMI_PSI PSI                                                                                             ";
        m_query+="\n                                              --버젼 리스트를 가져온다.                                                                                               ";
        m_query+="\n                                              inner join                                                                                                              ";
        m_query+="\n                                              (                                                                                                                       ";
        m_query+="\n                                                select --버젼에 대한 구간 정보를 가져온다.                                                                            ";
        m_query+="\n                                                       SDATE ,EDATE ,FN_GET_VERSION_SEMI('SS',FIRST_DAY) as DAY_VERSION                                               ";
        m_query+="\n                                                  from (                                                                                                              ";
        m_query+="\n                                                        select min(PERIOD_DAY) as SDATE ,max(PERIOD_DAY) as EDATE ,max(FIRST_DAY) as FIRST_DAY                        ";
        m_query+="\n                                                          from (                                                                                                      ";
        m_query+="\n                                                                select --주차의 월요일과 ERP로 전송할 수 있는 당일 이후 구간을 가져온다.                              ";
        m_query+="\n                                                                       CAL.YYYYMMDD                                                                                   ";
        m_query+="\n                                                                      ,case when CAL.WEEK_DAY='월' then CAL.YYYYMMDD end as FIRST_DAY --해당 주차의 월요일            ";
        m_query+="\n                                                                      ,CAL.YYYYMMDD as PERIOD_DAY --발행 대상 일자                                                    ";
        m_query+="\n                                                                  from CAL_MST CAL                                                                                    ";
        m_query+="\n                                                                 where exists                                                                                         ";
        m_query+="\n                                                                       (                                                                                              ";
        m_query+="\n                                                                        select XXX.YYYYWW                                                                             ";
        m_query+="\n                                                                          from CAL_MST XXX                                                                            ";
        m_query+="\n                                                                         where XXX.YYYYMMDD = '"+sdate+"'                                                             ";
        m_query+="\n                                                                           and XXX.YYYYWW = CAL.YYYYWW                                                                ";
        m_query+="\n                                                                       )                                                                                              ";
        m_query+="\n                                                               )                                                                                                      ";
        m_query+="\n                                                       )                                                                                                              ";
        m_query+="\n                                              ) VER                                                                                                                   ";
        m_query+="\n                                              on  PSI.CAT_ID  ='SS'                                                                                                   ";
        m_query+="\n                                              and PSI.PLANT_ID like '%'                                                                                               ";
        m_query+="\n                                              and PSI.VERSION =VER.DAY_VERSION                                                                                        ";
        m_query+="\n                                              and PSI.PROD_DATES between VER.SDATE and VER.EDATE                                                                      ";
        m_query+="\n                                              and PSI.PLANT_ID in ('"+p_plant_name+"')                                                                                ";
        m_query+="\n                                              --반제품에 대한 완제품 리스트를 가져온다(BOM)                                                                           ";
        m_query+="\n                                              inner join                                                                                                              ";
        m_query+="\n                                              (                                                                                                                       ";
        m_query+="\n                                               SELECT  distinct A.PLANT_ID ,A.CONS_ITEM_ID ,A.PROD_ITEM_ID ,B.ITEM_NAME                                               ";
        m_query+="\n                                                       FROM MBOM A, ITEM_MST B, ITEM_MST C                                                                            ";
        m_query+="\n                                               WHERE   A.PROD_ITEM_TYPE='FERT'                                                                                        ";
        m_query+="\n                                               and     A.CONS_ITEM_TYPE='HALB'                                                                                        ";
        m_query+="\n                                               and     B.ITEM_ID=A.PROD_ITEM_ID                                                                                       ";
        m_query+="\n                                               and     C.ITEM_ID=A.CONS_ITEM_ID                                                                                       ";
        m_query+="\n                                              ) BOM                                                                                                                   ";
        m_query+="\n                                              on  --부산스프는 부산면생산에, 그 이외 스프는 안성 면생산에 사용된다.                                                   ";
        m_query+="\n                                                  decode(BOM.PLANT_ID,'1170',1,2) =decode(PSI.PLANT_ID,'1170',1,2)                                                    ";
        m_query+="\n                                              and BOM.CONS_ITEM_ID =PSI.ITEM_ID                                                                                       ";
        m_query+="\n                                      ) LST                                                                                                                                                                                                                          ";
        m_query+="\n                                      --날짜 구간만큼 데이터를 생성한다.                                                                                                                                                                                             ";
        m_query+="\n                                    --inner join CAL_MST CAL                                                                                                                                                                                                         ";
        m_query+="\n                                    --on  CAL.YYYYMMDD between '"+sdate+"' and '"+edate+"'                                                                                                                                                                             ";
        m_query+="\n                                      --날짜 구간만큼 데이터를 생성한다.                                  ";
        m_query+="\n                                      inner join                                                          ";
        m_query+="\n                                      (                                                                   ";
        m_query+="\n                                        select CAL.YYYYMMDD ,DMY.SHIFT_TYPE                               ";
        m_query+="\n                                          from CAL_MST CAL                                                ";
        m_query+="\n                                               inner join (                                               ";
        m_query+="\n                                                           select '1' as SHIFT_TYPE from DUAL union all   ";
        m_query+="\n                                                           select '3' as SHIFT_TYPE from DUAL union all   ";
        m_query+="\n                                                           select '5' as SHIFT_TYPE from DUAL             ";
        m_query+="\n                                                          ) DMY                                           ";
        m_query+="\n                                               on CAL.YYYYMMDD between '"+sdate+"' and '"+edate+"'        ";
        m_query+="\n                                      ) CAL                                                               ";
        m_query+="\n                                      on  1=1                                                             ";
        m_query+="\n                                      --                                                                                                                                                                                                                             ";
        m_query+="\n                                      left outer join                                                                                                                                                                                                                ";
        m_query+="\n                                      (                                                                                                                                                                                                                              ";
        m_query+="\n                                       select --완제품 면 생산 계획 리스트를 가져온다.";
        m_query+="\n                                              PLA.PLANT_ID ,PLA.ITEM_ID ,PLA.PROD_DATES ,PLA.SHIFT_TYPE ,nvl(sum(PLA.SHIFT_QTY),0)*nvl(max(ITM.QTY),10) as QTY                                                                                                 ";
        m_query+="\n                                         from DAILY_SCH_PLAN_SHIFT PLA                                                                                                                                                                                               ";
        m_query+="\n                                              inner join                                                                                                                                                                                                             ";
        m_query+="\n                                              (                                                                                                                                                                                                                      ";
        m_query+=versionLst;
        m_query+="\n                                              ) VER                                                                                                                                                                                                                  ";
        m_query+="\n                                              on  PLA.CAT_ID='PS'                                                                                                                                                                                                    ";  
        m_query+="\n                                              and PLA.PLANT_ID=VER.PLANT_ID                                                                                                                                                                                          ";  
        m_query+="\n                                              and PLA.VERSION =VER.VERSION                                                                                                                                                                                           ";  
        m_query+="\n                                              and PLA.WO_END  ='Y'                                                                                                                                                                                                   ";  
        m_query+="\n                                              and PLA.PROD_DATES between '"+sdate+"' and '"+edate+"'                                                                                                                                                                   ";
        m_query+="\n                                              --------------------------------------------------------           ";
        m_query+="\n                                              --면+냉동 제품만 가져온다.                                         ";
        m_query+="\n                                              inner join ITEM_MST ITM                                            ";
        m_query+="\n                                              on  ITM.ITEM_ID =PLA.ITEM_ID                                       ";
        m_query+="\n                                              and ITM.DIVISION in ('10','50')                                    ";
        m_query+="\n                                            group by PLA.PLANT_ID ,PLA.ITEM_ID ,PLA.PROD_DATES ,PLA.SHIFT_TYPE   ";        
        m_query+="\n                                      ) XXX                                                                                                                                                                                                                          ";
        m_query+="\n                                      on  XXX.PLANT_ID   =LST.PLANT_ID                                                                                                                                                                                               ";
        m_query+="\n                                      and XXX.ITEM_ID    =LST.PROD_ITEM_ID                                                                                                                                                                                           ";
        m_query+="\n                                      and XXX.SHIFT_TYPE =CAL.SHIFT_TYPE                                                                                                                                                                                             ";
        m_query+="\n                                      and XXX.PROD_DATES =CAL.YYYYMMDD                                                                                                                                                                                               ";
        m_query+="\n                                      --반제품 수량 계산을 위한 정보를 가져온다.                                                                                                                                                                                     ";
        m_query+="\n                                      left outer join SEMI_ITEM_BATCH BAT                                                                                                                                                                                            ";
        m_query+="\n                                      on  BAT.PLANT_ID=LST.PLANT_ID  ";
        m_query+="\n                                      and BAT.ITEM_ID =LST.SEMI_ITEM_ID                                                                                                                                                                                              ";
        m_query+="\n                                    order by PROD_DATES ,SHIFT_TYPE                                                                                                                                                                                                  ";
        m_query+="\n                             )                                                                                                                                                                                                                                       ";
        m_query+="\n                       group by PLANT_ID ,LINE_ID ,PROD_VER ,SEMI_ITEM_ID ,SHIFT_TYPE ,PROD_DATES ,PROC_ID ,SEMI_QTY ,STOCK_QTY ,BOX_QTY ,BATCH_QTY ,CAL_RANK1 ,CAL_RANK2 ,CAL_RANK3                                                                                          ";
        m_query+="\n                      ) LST                                                                                                                                                                                                                                          ";
        m_query+="\n              ) LST                                                                                                                                                                                                                                                  ";
        m_query+="\n        where LST.PLANT_ID in ('"+p_plant_name+"')";
        m_query+="\n        order by PROD_DATES ,PROD_VER ,SHIFT_TYPE                                                                                                                                                                                                                    ";
        
        return m_query;
	    
	}

	public GridData doQuery(GridData gdReq) throws Exception {
		
		conn = databaseUtility.getConnection("t3sinc");
	    stmt = conn.createStatement();
		String s_query   = "";
	    String m_query="";
	    String getQuery="";
	    versionLst="";
	    
	    
		int loopNum = 0;

	    GridData gdRes = new GridData();		

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			p_plant_name     = gdReq.getParam("plant_name");
			p_checked_weekly = gdReq.getParam("checked_weekly");
			
		    s_query +="\n select --완제품 버젼리스트를 가져온다.            ";
		    s_query +="\n        PNT.PLANT_ID ,max(VER.VERSION) as VERSION  ";
		    s_query +="\n   from V_PLANT PNT                                ";
		    s_query +="\n        inner join PLAN_VERSION_LOG VER            ";
		    s_query +="\n        on  VER.PERIOD_TYPE='DAILY'                ";
		    s_query +="\n        and VER.CAT_ID     ='PS'                   ";
		    s_query +="\n        and VER.SUB_CAT    =PNT.SUB_CAT            ";
		  //s_query +="\n      --and PNT.PLANT_ID   in ('"+p_plant_name+"')";
		    s_query +="\n      group by PNT.PLANT_ID                        ";		
		    System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 
 
            if(rs.next()){
                do{
                	   if(loopNum>0) versionLst += "\n union all";
                       versionLst += "\n select '"+rs.getString("PLANT_ID") +"' as PLANT_ID ,'"+rs.getString("VERSION")+"' as VERSION from DUAL" ;
                	   loopNum++;
                
                }while(rs.next());
            }            
            System.out.println(versionLst);
			
            
            s_query ="\n select min(YYYYMMDD) as SDATE ,max(YYYYMMDD) as EDATE                                ";
            s_query+="\n   from (                                                                             ";
            s_query+="\n         select distinct YYYYMMDD ,YYYYWW                                             ";
            s_query+="\n               ,dense_rank() over( order by YYYYWW) as WEEK_RANK                      ";
            s_query+="\n           from CAL_MST CAL                                                           ";
            s_query+="\n          where exists (                                                              ";
            s_query+="\n                        select 'X'                                                    ";
            s_query+="\n                          from CAL_MST XXX                                            ";
            s_query+="\n                         where XXX.YYYYMMDD =to_char(sysdate,'YYYYMMDD')              ";
            s_query+="\n                           and CAL.YYYYWW >= XXX.YYYYWW                               ";
            s_query+="\n                        )                                                             ";
            s_query+="\n         ) WEK                                                                        ";
            s_query+="\n   where WEEK_RANK = (select decode('"+p_checked_weekly+"','w0',1,'w1',2,'w2',3) as WEEK_IDX from DUAL) ";            
		    System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 

            if(rs.next()){
                do{
                    sdate = rs.getString("SDATE");
                    edate = rs.getString("EDATE");
                }while(rs.next());
            }            
            System.out.println("sdate="+sdate+"       edate="+edate);
            
            

            s_query  = "\n select --반제품 마지막 버젼을 가져온다. ";
            s_query += "\n       max(VERSION) as MAX_VERSION       ";
            s_query += "\n  from PLAN_VERSION_LOG                  ";
            s_query += "\n where PERIOD_TYPE = 'DAILY'             ";
            s_query += "\n   and CAT_ID      = 'SS'                ";
		    System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 

            if(rs.next()){
                do{
                    p_version = rs.getString("MAX_VERSION");
                }while(rs.next());
            }            
            System.out.println(versionLst);
                  
            getQuery = selectQuery();
            
            m_query+="\n with V_LST                                                                                                                    																																																											                 ";
            m_query+="\n   as (                                                                                                                                                                                                                                                              ";
            m_query+=getQuery;
            m_query+="\n      )                                                                                                                                                                                                                                                              ";
            m_query+="\n      select PNT.PLANT_NAME ,LIN.LINE_NAME                                                                                                                                                                                                                           ";
            m_query+="\n            ,LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.PROC_ID ,LST.SEMI_ITEM_ID ,ITM.ITEM_NAME";
            m_query+="\n            ,DMY.SEQ ,DMY.DIV_NAME                                                                                                                                                                                                                                   ";
            m_query+="\n            ,to_number(nvl(decode(DMY.SEQ,2,LST.BOX_QTY ,3,LST.BATCH_QTY ,4,FN_GET_SEMI_STOCK_QTY(LST.PLANT_ID ,LST.SEMI_ITEM_ID ,'"+sdate+"')),0)) as IDX                                                                                                                              ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D01A,2,ROW2_D01A,3,ROW3_D01A,4,ROW4_D01A),0) as D01A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D01B,2,ROW2_D01B,3,ROW3_D01B,4,ROW4_D01B),0) as D01B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D01C,2,ROW2_D01C,3,ROW3_D01C,4,ROW4_D01C),0) as D01C                                                                                                                                                                                 ";
            m_query+="\n             -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D02A,2,ROW2_D02A,3,ROW3_D02A,4,ROW4_D02A),0) as D02A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D02B,2,ROW2_D02B,3,ROW3_D02B,4,ROW4_D02B),0) as D02B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D02C,2,ROW2_D02C,3,ROW3_D02C,4,ROW4_D02C),0) as D02C                                                                                                                                                                                 ";
            m_query+="\n             -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D03A,2,ROW2_D03A,3,ROW3_D03A,4,ROW4_D03A),0) as D03A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D03B,2,ROW2_D03B,3,ROW3_D03B,4,ROW4_D03B),0) as D03B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D03C,2,ROW2_D03C,3,ROW3_D03C,4,ROW4_D03C),0) as D03C                                                                                                                                                                                 ";
            m_query+="\n             -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D04A,2,ROW2_D04A,3,ROW3_D04A,4,ROW4_D04A),0) as D04A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D04B,2,ROW2_D04B,3,ROW3_D04B,4,ROW4_D04B),0) as D04B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D04C,2,ROW2_D04C,3,ROW3_D04C,4,ROW4_D04C),0) as D04C                                                                                                                                                                                 ";
            m_query+="\n             -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D05A,2,ROW2_D05A,3,ROW3_D05A,4,ROW4_D05A),0) as D05A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D05B,2,ROW2_D05B,3,ROW3_D05B,4,ROW4_D05B),0) as D05B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D05C,2,ROW2_D05C,3,ROW3_D05C,4,ROW4_D05C),0) as D05C                                                                                                                                                                                 ";
            m_query+="\n             -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D06A,2,ROW2_D06A,3,ROW3_D06A,4,ROW4_D06A),0) as D06A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D06B,2,ROW2_D06B,3,ROW3_D06B,4,ROW4_D06B),0) as D06B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D06C,2,ROW2_D06C,3,ROW3_D06C,4,ROW4_D06C),0) as D06C                                                                                                                                                                                 ";
            m_query+="\n             -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D07A,2,ROW2_D07A,3,ROW3_D07A,4,ROW4_D07A),0) as D07A                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D07B,2,ROW2_D07B,3,ROW3_D07B,4,ROW4_D07B),0) as D07B                                                                                                                                                                                 ";
            m_query+="\n            ,nvl(decode(DMY.SEQ,1,ROW1_D07C,2,ROW2_D07C,3,ROW3_D07C,4,ROW4_D07C),0) as D07C                                                                                                                                                                          ";
            m_query+="\n            ,MOD.BG01A  ,MOD.BG01B  ,MOD.BG01C";
            m_query+="\n            ,MOD.BG02A  ,MOD.BG02B  ,MOD.BG02C";
            m_query+="\n            ,MOD.BG03A  ,MOD.BG03B  ,MOD.BG03C";
            m_query+="\n            ,MOD.BG04A  ,MOD.BG04B  ,MOD.BG04C";
            m_query+="\n            ,MOD.BG05A  ,MOD.BG05B  ,MOD.BG05C";
            m_query+="\n            ,MOD.BG06A  ,MOD.BG06B  ,MOD.BG06C";
            m_query+="\n            ,MOD.BG07A  ,MOD.BG07B  ,MOD.BG07C";
            m_query+="\n            ,'"+sdate+"' as WEEK_START_DATE";
            m_query+="\n            ,'"+p_version+"' as VERSION";
            m_query+="\n            ,case when RED is not null then RED||'|'||GREEN||'|'||BLUE else '255|255|255' end as BGCOLOR ";
            m_query+="\n            ,nvl(to_char(DEM.W3_DEMAND_QTY,'FM999,999,999'),' ') as W3_DEMAND_QTY                                                                           ";
            m_query+="\n       from (                                                                                                                                                                                                                                                        ";
            m_query+="\n              select LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID ,LST.PROC_ID ,LST.BOX_QTY ,LST.BATCH_QTY                                                                                                                                                           ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D01A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D01A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D01A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D01A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D01B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D01B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D01B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D01B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D01C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D01C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D01C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D01C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D02A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D02A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D02A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D02A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D02B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D02B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D02B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D02B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D02C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D02C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D02C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D02C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D03A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D03A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D03A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D03A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D03B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D03B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D03B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D03B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D03C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D03C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D03C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D03C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D04A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D04A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D04A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D04A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D04B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D04B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D04B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D04B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D04C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D04C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D04C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D04C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D05A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D05A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D05A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D05A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D05B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D05B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D05B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D05B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D05C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D05C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D05C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D05C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D06A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D06A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D06A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D06A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D06B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D06B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D06B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D06B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D06C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D06C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D06C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D06C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                     -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D07A --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D07A --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D07A --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D07A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D07B --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D07B --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D07B --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D07B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D07C --면생산                                                                                                                                            ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D07C --횟수                                                                                                                                              ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D07C --스프식수                                                                                                                                          ";
            m_query+="\n                    ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D07C --재고 누적수량                                                                                                                                     ";
            m_query+="\n               from V_LST LST                                                                                                                                                                                                                                        ";
            m_query+="\n                  group by LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID  ,LST.BOX_QTY ,LST.BATCH_QTY ,LST.PROC_ID                                                                                                                                                    ";
            m_query+="\n            ) LST                                                                                                                                                                                                                                                    ";
            m_query+="\n            inner join                                                                                                                                                                                                                                               ";
            m_query+="\n            (                                                                                                                                                                                                                                                        ";
            m_query+="\n             select 1 as SEQ ,'면생산' as DIV_NAME from DUAL union all                                                                                                                                                                                               ";
            m_query+="\n             select 2 as SEQ ,'횟수' as DIV_NAME from DUAL union all                                                                                                                                                                                                 ";
            m_query+="\n             select 3 as SEQ ,'스프식수' as DIV_NAME from DUAL union all                                                                                                                                                                                             ";
            m_query+="\n             select 4 as SEQ ,'재고' as DIV_NAME from DUAL                                                                                                                                                                                                           ";
            m_query+="\n            ) DMY                                                                                                                                                                                                                                                    ";
            m_query+="\n            on  1=1                                                                                                                                                                                                                                                  ";
            m_query+="\n            left outer join V_PLANT PNT                                                                                                                                                                                                                              ";
            m_query+="\n            on  PNT.PLANT_ID =LST.PLANT_ID                                                                                                                                                                                                                           ";
            m_query+="\n            left outer join V_LINE LIN                                                                                                                                                                                                                               ";
            m_query+="\n            on  LIN.PLANT_ID =LST.PLANT_ID                                                                                                                                                                                                                           ";
            m_query+="\n            and LIN.LINE_ID  =LST.LINE_ID                                                                                                                                                                                                                            ";
            m_query+="\n            left outer join                                                                                                                                                                   ";
            m_query+="\n            (                                                                                                                                                                                 ";
            m_query+="\n             select WDY.PLANT_ID ,WDY.PROC_ID                                                                                                                                                 ";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=1 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG01A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=1 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG01B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=1 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG01C";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=2 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG02A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=2 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG02B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=2 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG02C";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=3 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG03A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=3 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG03B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=3 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG03C";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=4 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG04A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=4 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG04B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=4 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG04C";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=5 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG05A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=5 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG05B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=5 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG05C";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=6 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG06A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=6 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG06B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=6 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG06C";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=7 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='1' then SUBSTR(WORKTY_ID,2,1) end) as BG07A";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=7 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='3' then SUBSTR(WORKTY_ID,2,1) end) as BG07B";
            m_query+="\n                   ,max(case when CAL.DAY_RANK=7 and DECODE(SUBSTR(WDY.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5')='5' then SUBSTR(WORKTY_ID,2,1) end) as BG07C";
            m_query+="\n               from WORK_DIARY WDY                                                                                                                                                            ";
            m_query+="\n                    inner join                                                                                                                                                                ";
            m_query+="\n                    (                                                                                                                                                                         ";
            m_query+="\n                     select YYYYMMDD ,dense_rank() over( order by YYYYMMDD) as DAY_RANK                                                                                                       ";
            m_query+="\n                       from CAL_MST CAL                                                                                                                                                       ";
            m_query+="\n                      where CAL.YYYYMMDD between '"+sdate+"' and '"+edate+"'                                                                                                                    ";
            m_query+="\n                    ) CAL                                                                                                                                                                     ";
            m_query+="\n                    on  WDY.PLANT_ID in ('"+p_plant_name+"')";
            m_query+="\n                    and WDY.DUTY_DATE =CAL.YYYYMMDD                                                                                                                                           ";
            m_query+="\n                  group by WDY.PLANT_ID ,WDY.PROC_ID                                                                                                                                          ";
            m_query+="\n            ) MOD                                                                                                                                                                             ";
            m_query+="\n            on  MOD.PLANT_ID=LST.PLANT_ID                                                                                                                                                     ";
            m_query+="\n            and MOD.PROC_ID =LST.PROC_ID                                                                                                                                                      ";
            m_query+="\n            left outer join ITEM_MST ITM                                                                                                                                                      ";
            m_query+="\n            on  ITM.ITEM_ID =LST.SEMI_ITEM_ID                                                                                                                                                 ";
            m_query+="\n            ----------------------------------------                                                                                                                                          ";
            m_query+="\n            --아이템 별 색을 구분한다.                                                                                                                                                        ";
            m_query+="\n            left outer join SEMI_ITEM_BGCOLOR COL                                                                                                                                             ";
            m_query+="\n            on  COL.ITEM_ID =LST.SEMI_ITEM_ID                                                                                                                                                ";
            m_query+="\n            --3주차 수주 물량을 가져온다.                                                              ";
            m_query+="\n            left outer join                                                                            ";
            m_query+="\n			(                                                                                                                           ";
            m_query+="\n			               select --반제품에 대한 완제품 3주차 수주물량을 가져온다.                                                     ";
            m_query+="\n			                      BOM.PLANT_ID ,BOM.CONS_ITEM_ID ,sum(DEM.W3_DEMAND_QTY)/BOM.BOX_QTY as W3_DEMAND_QTY                   ";
            m_query+="\n			                 from (                                                                                                     ";
            m_query+="\n			                       SELECT --검사제약정보에 표기된 아이템만 3주물량 대상이 된다.                                         ";
            m_query+="\n			                              distinct A.PLANT_ID ,A.CONS_ITEM_ID ,A.PROD_ITEM_ID ,B.ITEM_NAME, NVL(D.BOX_QTY,10)	BOX_QTY ";
            m_query+="\n			                              FROM MBOM A, ITEM_MST B, ITEM_MST C ,INSPECT_CONSTRAINT INS,                                  ";
            m_query+="\n										  		SEMI_ITEM_BATCH D                                                                       ";
            m_query+="\n			                        WHERE A.PROD_ITEM_TYPE='FERT'                                                                       ";
            m_query+="\n			                          and A.CONS_ITEM_TYPE='HALB'                                                                       ";
            m_query+="\n			                          and B.ITEM_ID=A.PROD_ITEM_ID                                                                      ";
            m_query+="\n			                          and C.ITEM_ID=A.CONS_ITEM_ID                                                                      ";
            m_query+="\n			                          and B.DIVISION in ('10','50')                                                                     ";
            m_query+="\n			                          and A.PLANT_ID =INS.PLANT_ID                                                                      ";
            m_query+="\n			                          and A.CONS_ITEM_ID  =INS.ITEM_ID                                                                  ";
            m_query+="\n									  and A.PLANT_ID	= D.PLANT_ID(+)                                                                 ";
            m_query+="\n									  and A.CONS_ITEM_ID		= D.ITEM_ID(+)                                                          ";
            m_query+="\n			                      ) BOM                                                                                                 ";
            m_query+="\n			                      inner join                                                                                            ";
            m_query+="\n			                      (                                                                                                     ";
            m_query+="\n			                       select --차차주는 수출만 있으므로...                                                                 ";
            m_query+="\n			                             --MTO_MTS 타입이 수출것. 이면서 아이템별로 SUM하여 차차주 물량을 가져온다.                     ";
            m_query+="\n			                             DEM.ITEM_ID ,sum(DEM.QTY)*ITM.QTY as W3_DEMAND_QTY                                             ";
            m_query+="\n			                        from NFOS_ORDER DEM                                                                                 ";
            m_query+="\n			                            ,ITEM_MST ITM                                                                                   ";
            m_query+="\n			                       where DEM.IF_DTTM  = TRUNC(sysdate)                                                                  ";
            m_query+="\n			                         and DEM.ORD_TYPE like 'X%'                                                                         ";
            m_query+="\n			                         and DEM.ITEM_ID  =ITM.ITEM_ID                                                                      ";
            m_query+="\n			                         and ITM.MTO_MTS_TYPE ='0001'                                                                       ";
            m_query+="\n			                         and DEM.PROD_REQ_DATE     BETWEEN TRUNC(NEXT_DAY(SYSDATE,2)+7) AND TRUNC(NEXT_DAY(SYSDATE,2)+14)   ";
            m_query+="\n			                         and ITM.DIVISION in ('10','50')                                                                    ";
            m_query+="\n			                       group by DEM.ITEM_ID, ITM.QTY                                                                        ";
            m_query+="\n			                      ) DEM                                                                                                 ";
            m_query+="\n			                      on  DEM.ITEM_ID =BOM.PROD_ITEM_ID                                                                     ";
            m_query+="\n			                   group by BOM.PLANT_ID ,BOM.CONS_ITEM_ID,BOM.BOX_QTY                                                      ";
            m_query+="\n			            ) DEM                                                                                                           ";
            m_query+="\n            on  decode(LST.PLANT_ID,'1170',1,2) =decode(DEM.PLANT_ID,'1170',1,2)                       ";
            m_query+="\n            and LST.SEMI_ITEM_ID =DEM.CONS_ITEM_ID                                                     ";                        
            
            m_query+="\n         order by PLANT_ID ,LINE_ID , PROD_VER ,SEMI_ITEM_ID,SEQ                                                                                                                                                                                                     ";
            System.out.println(m_query);
            rs = databaseUtility.executeQuery(stmt, m_query); 
			
            if(rs.next()){
                do{
                    gdRes.getHeader("CRUD").addValue("", "");  //추가,삭제,보정 을 구분하기 위한 부분.C(추가) ,U(보정) ,D(삭제)
                	gdRes.getHeader("PLANT_NAME"   ).addValue(rs.getString("PLANT_NAME"   ),""); 
                	gdRes.getHeader("LINE_NAME"    ).addValue(rs.getString("LINE_NAME"    ),""); 
                	gdRes.getHeader("PLANT_ID"     ).addValue(rs.getString("PLANT_ID"     ),"");
                	gdRes.getHeader("LINE_ID"      ).addValue(rs.getString("LINE_ID"      ),"");
                	gdRes.getHeader("PROD_VER"     ).addValue(rs.getString("PROD_VER"     ),"");
                	gdRes.getHeader("PROC_ID"      ).addValue(rs.getString("PROC_ID"      ),"");
                    gdRes.getHeader("SEMI_ITEM_ID" ).addValue(rs.getString("SEMI_ITEM_ID" ),"");
                    gdRes.getHeader("ITEM_NAME"    ).addValue(rs.getString("ITEM_NAME"    ),"");
                	gdRes.getHeader("SEQ"          ).addValue(rs.getString("SEQ"          ),"");
                	gdRes.getHeader("DIV_NAME"     ).addValue(rs.getString("DIV_NAME"     ),""); 
                	gdRes.getHeader("IDX"          ).addValue(rs.getString("IDX"          ),""); 
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
                    gdRes.getHeader("BG01A"        ).addValue(rs.getString("BG01A"        ),"");                     
                    gdRes.getHeader("BG01B"        ).addValue(rs.getString("BG01B"        ),"");                     
                    gdRes.getHeader("BG01C"        ).addValue(rs.getString("BG01C"        ),"");                     
                    gdRes.getHeader("BG02A"        ).addValue(rs.getString("BG02A"        ),"");                     
                    gdRes.getHeader("BG02B"        ).addValue(rs.getString("BG02B"        ),"");                     
                    gdRes.getHeader("BG02C"        ).addValue(rs.getString("BG02C"        ),"");                     
                    gdRes.getHeader("BG03A"        ).addValue(rs.getString("BG03A"        ),"");                     
                    gdRes.getHeader("BG03B"        ).addValue(rs.getString("BG03B"        ),"");                     
                    gdRes.getHeader("BG03C"        ).addValue(rs.getString("BG03C"        ),"");                     
                    gdRes.getHeader("BG04A"        ).addValue(rs.getString("BG04A"        ),"");                     
                    gdRes.getHeader("BG04B"        ).addValue(rs.getString("BG04B"        ),"");                     
                    gdRes.getHeader("BG04C"        ).addValue(rs.getString("BG04C"        ),"");                     
                    gdRes.getHeader("BG05A"        ).addValue(rs.getString("BG05A"        ),"");                     
                    gdRes.getHeader("BG05B"        ).addValue(rs.getString("BG05B"        ),"");                     
                    gdRes.getHeader("BG05C"        ).addValue(rs.getString("BG05C"        ),"");                     
                    gdRes.getHeader("BG06A"        ).addValue(rs.getString("BG06A"        ),"");                     
                    gdRes.getHeader("BG06B"        ).addValue(rs.getString("BG06B"        ),"");                     
                    gdRes.getHeader("BG06C"        ).addValue(rs.getString("BG06C"        ),"");                     
                    gdRes.getHeader("BG07A"        ).addValue(rs.getString("BG07A"        ),"");                     
                    gdRes.getHeader("BG07B"        ).addValue(rs.getString("BG07B"        ),"");                     
                    gdRes.getHeader("BG07C"        ).addValue(rs.getString("BG07C"        ),"");                     
                	gdRes.getHeader("WEEK_START_DATE" ).addValue(rs.getString("WEEK_START_DATE"         ),"");                     
                    gdRes.getHeader("VERSION"         ).addValue(rs.getString("VERSION"         ),"");                     
                    gdRes.getHeader("BGCOLOR"         ).addValue(rs.getString("BGCOLOR"         ),"");                     
                    gdRes.getHeader("W3_DEMAND_QTY"   ).addValue(rs.getString("W3_DEMAND_QTY"        ),"");                     
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
	
	
    public GridData doQuery2(GridData gdReq) throws Exception {
        
        conn = databaseUtility.getConnection("t3sinc");
        stmt = conn.createStatement();
        String s_query   = "";
        String m_query="";
        String getQuery="";
        versionLst="";
        
        int loopNum = 0;

        GridData gdRes = new GridData();        

        try {
            gdRes = OperateGridData.cloneResponseGridData(gdReq);
            
            p_plant_name     = gdReq.getParam("plant_name");
            p_checked_weekly = gdReq.getParam("checked_weekly");
            
            s_query +="\n select PNT.PLANT_ID ,max(VER.VERSION) as VERSION  ";
            s_query +="\n   from V_PLANT PNT                                ";
            s_query +="\n        inner join PLAN_VERSION_LOG VER            ";
            s_query +="\n        on  VER.PERIOD_TYPE='DAILY'                ";
            s_query +="\n        and VER.CAT_ID     ='PS'                   ";
            s_query +="\n        and VER.SUB_CAT    =PNT.SUB_CAT            ";
          //s_query +="\n        and PNT.PLANT_ID   in ('"+p_plant_name+"')";
            s_query +="\n      group by PNT.PLANT_ID                        ";      
            System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 
 
            if(rs.next()){
                do{
                       if(loopNum>0) versionLst += "\n union all";
                       versionLst += "\n select '"+rs.getString("PLANT_ID") +"' as PLANT_ID ,'"+rs.getString("VERSION")+"' as VERSION from DUAL" ;
                       loopNum++;
                
                }while(rs.next());
            }            
            System.out.println(versionLst);
            
            
            s_query ="\n select min(YYYYMMDD) as SDATE ,max(YYYYMMDD) as EDATE                                ";
            s_query+="\n   from (                                                                             ";
            s_query+="\n         select distinct YYYYMMDD ,YYYYWW                                             ";
            s_query+="\n               ,dense_rank() over( order by YYYYWW) as WEEK_RANK                      ";
            s_query+="\n           from CAL_MST CAL                                                           ";
            s_query+="\n          where exists (                                                              ";
            s_query+="\n                        select 'X'                                                    ";
            s_query+="\n                          from CAL_MST XXX                                            ";
            s_query+="\n                         where XXX.YYYYMMDD =to_char(sysdate,'YYYYMMDD')              ";
            s_query+="\n                           and CAL.YYYYWW >= XXX.YYYYWW                               ";
            s_query+="\n                        )                                                             ";
            s_query+="\n         ) WEK                                                                        ";
            s_query+="\n   where WEEK_RANK = (select decode('"+p_checked_weekly+"','w0',1,'w1',2,'w2',3) as WEEK_IDX from DUAL) ";            
            System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 

            if(rs.next()){
                do{
                    sdate = rs.getString("SDATE");
                    edate = rs.getString("EDATE");
                }while(rs.next());
            }            
            System.out.println("sdate="+sdate+"       edate="+edate);
            
            

            s_query  = "\n select --반제품 마지막 버젼을 가져온다. ";
            s_query += "\n       max(VERSION) as MAX_VERSION       ";
            s_query += "\n  from PLAN_VERSION_LOG                  ";
            s_query += "\n where PERIOD_TYPE = 'DAILY'             ";
            s_query += "\n   and CAT_ID      = 'SS'                ";
            System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 

            if(rs.next()){
                do{
                    p_version = rs.getString("MAX_VERSION");
                }while(rs.next());
            }            
            System.out.println(versionLst);
                  
            getQuery = selectQuery();
            
            m_query+="\n with V_LST                                                                                                                                                                                                                                                                                                                                                                              ";
            m_query+="\n   as (                                                                                                                                                                                                                                                              ";
            m_query+=getQuery;
            m_query+="\n      )                                                                                                                                                                                                                                                              ";

            m_query+="\n select PLANT_NAME                 ";                            
            m_query+="\n       ,null as LINE_NAME                  ";             
            m_query+="\n       ,PLANT_ID                   ";             
            m_query+="\n       ,null as LINE_ID                    ";             
            m_query+="\n       ,null as PROD_VER                   ";             
            m_query+="\n       ,null as PROC_ID                    ";             
            m_query+="\n       ,null as SEMI_ITEM_ID       ";                     
            m_query+="\n       ,SEQ                        ";             
            m_query+="\n       ,DIV_NAME                   ";             
            m_query+="\n       ,0 as IDX                   ";                     
            m_query+="\n       ,sum(D01A) as D01A          ";                         
            m_query+="\n       ,sum(D01B) as D01B          ";                         
            m_query+="\n       ,sum(D01C) as D01C          ";                         
            m_query+="\n       ,sum(D02A) as D02A          ";                         
            m_query+="\n       ,sum(D02B) as D02B          ";                         
            m_query+="\n       ,sum(D02C) as D02C          ";                         
            m_query+="\n       ,sum(D03A) as D03A          ";                         
            m_query+="\n       ,sum(D03B) as D03B          ";                         
            m_query+="\n       ,sum(D03C) as D03C          ";                         
            m_query+="\n       ,sum(D04A) as D04A          ";                         
            m_query+="\n       ,sum(D04B) as D04B          ";                         
            m_query+="\n       ,sum(D04C) as D04C          ";                         
            m_query+="\n       ,sum(D05A) as D05A          ";                         
            m_query+="\n       ,sum(D05B) as D05B          ";                         
            m_query+="\n       ,sum(D05C) as D05C          ";                         
            m_query+="\n       ,sum(D06A) as D06A          ";                         
            m_query+="\n       ,sum(D06B) as D06B          ";                         
            m_query+="\n       ,sum(D06C) as D06C          ";                         
            m_query+="\n       ,sum(D07A) as D07A          ";                         
            m_query+="\n       ,sum(D07B) as D07B          ";                         
            m_query+="\n       ,sum(D07C) as D07C          ";                         
            m_query+="\n       ,null as WEEK_START_DATE    ";                     
            m_query+="\n       ,null as VERSION            ";                     
            m_query+="\n   from (                          ";
            m_query+="\n          select PNT.PLANT_NAME ,LIN.LINE_NAME                                                                                                                                                                                                                           ";
            m_query+="\n                ,LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.PROC_ID ,LST.SEMI_ITEM_ID ";
            m_query+="\n                ,DMY.SEQ ,DMY.DIV_NAME                                                                                                                                                                                                                                   ";
            m_query+="\n                ,to_number(nvl(decode(DMY.SEQ,2,LST.BOX_QTY ,3,LST.BATCH_QTY ,4,FN_GET_SEMI_STOCK_QTY(LST.PLANT_ID ,LST.SEMI_ITEM_ID,'"+sdate+"')),0)) as IDX                                                                                                                              ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D01A,2,ROW2_D01A,3,ROW3_D01A,4,ROW4_D01A),0) as D01A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D01B,2,ROW2_D01B,3,ROW3_D01B,4,ROW4_D01B),0) as D01B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D01C,2,ROW2_D01C,3,ROW3_D01C,4,ROW4_D01C),0) as D01C                                                                                                                                                                                 ";
            m_query+="\n                 -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D02A,2,ROW2_D02A,3,ROW3_D02A,4,ROW4_D02A),0) as D02A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D02B,2,ROW2_D02B,3,ROW3_D02B,4,ROW4_D02B),0) as D02B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D02C,2,ROW2_D02C,3,ROW3_D02C,4,ROW4_D02C),0) as D02C                                                                                                                                                                                 ";
            m_query+="\n                 -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D03A,2,ROW2_D03A,3,ROW3_D03A,4,ROW4_D03A),0) as D03A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D03B,2,ROW2_D03B,3,ROW3_D03B,4,ROW4_D03B),0) as D03B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D03C,2,ROW2_D03C,3,ROW3_D03C,4,ROW4_D03C),0) as D03C                                                                                                                                                                                 ";
            m_query+="\n                 -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D04A,2,ROW2_D04A,3,ROW3_D04A,4,ROW4_D04A),0) as D04A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D04B,2,ROW2_D04B,3,ROW3_D04B,4,ROW4_D04B),0) as D04B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D04C,2,ROW2_D04C,3,ROW3_D04C,4,ROW4_D04C),0) as D04C                                                                                                                                                                                 ";
            m_query+="\n                 -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D05A,2,ROW2_D05A,3,ROW3_D05A,4,ROW4_D05A),0) as D05A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D05B,2,ROW2_D05B,3,ROW3_D05B,4,ROW4_D05B),0) as D05B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D05C,2,ROW2_D05C,3,ROW3_D05C,4,ROW4_D05C),0) as D05C                                                                                                                                                                                 ";
            m_query+="\n                 -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D06A,2,ROW2_D06A,3,ROW3_D06A,4,ROW4_D06A),0) as D06A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D06B,2,ROW2_D06B,3,ROW3_D06B,4,ROW4_D06B),0) as D06B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D06C,2,ROW2_D06C,3,ROW3_D06C,4,ROW4_D06C),0) as D06C                                                                                                                                                                                 ";
            m_query+="\n                 -----------------------------------------------------------------------                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D07A,2,ROW2_D07A,3,ROW3_D07A,4,ROW4_D07A),0) as D07A                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D07B,2,ROW2_D07B,3,ROW3_D07B,4,ROW4_D07B),0) as D07B                                                                                                                                                                                 ";
            m_query+="\n                ,nvl(decode(DMY.SEQ,1,ROW1_D07C,2,ROW2_D07C,3,ROW3_D07C,4,ROW4_D07C),0) as D07C                                                                                                                                                                          ";
            m_query+="\n                ,'"+sdate+"' as WEEK_START_DATE";
            m_query+="\n                ,'"+p_version+"' as VERSION";
            m_query+="\n           from (                                                                                                                                                                                                                                                        ";
            m_query+="\n                  select LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID ,LST.PROC_ID ,LST.BOX_QTY ,LST.BATCH_QTY                                                                                                                                                           ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D01A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D01A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D01A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D01A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D01B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D01B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D01B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D01B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D01C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D01C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D01C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=1 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D01C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D02A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D02A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D02A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D02A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D02B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D02B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D02B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D02B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D02C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D02C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D02C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=2 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D02C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D03A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D03A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D03A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D03A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D03B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D03B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D03B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D03B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D03C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D03C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D03C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=3 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D03C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D04A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D04A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D04A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D04A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D04B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D04B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D04B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D04B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D04C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D04C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D04C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=4 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D04C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D05A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D05A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D05A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D05A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D05B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D05B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D05B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D05B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D05C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D05C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D05C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=5 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D05C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D06A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D06A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D06A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D06A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D06B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D06B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D06B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D06B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D06C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D06C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D06C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=6 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D06C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                         -----------------------------------------------------------------------------------------                                                                                                                                                       ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.PROD_QTY      end) as ROW1_D07A --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.CAL_BATCH_QTY end) as ROW2_D07A --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.SEMI_QTY      end) as ROW3_D07A --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=1 then LST.CAL_QTY       end) as ROW4_D07A --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.PROD_QTY      end) as ROW1_D07B --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.CAL_BATCH_QTY end) as ROW2_D07B --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.SEMI_QTY      end) as ROW3_D07B --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=3 then LST.CAL_QTY       end) as ROW4_D07B --재고 누적수량                                                                                                                                     ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.PROD_QTY      end) as ROW1_D07C --면생산                                                                                                                                            ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.CAL_BATCH_QTY end) as ROW2_D07C --횟수                                                                                                                                              ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.SEMI_QTY      end) as ROW3_D07C --스프식수                                                                                                                                          ";
            m_query+="\n                        ,sum(case when LST.CAL_RANK3=7 and LST.SHIFT_TYPE=5 then LST.CAL_QTY       end) as ROW4_D07C --재고 누적수량                                                                                                                                     ";
            m_query+="\n                   from V_LST LST                                                                                                                                                                                                                                        ";
            m_query+="\n                      group by LST.PLANT_ID ,LST.LINE_ID ,LST.PROD_VER ,LST.SEMI_ITEM_ID  ,LST.BOX_QTY ,LST.BATCH_QTY ,LST.PROC_ID                                                                                                                                                    ";
            m_query+="\n                ) LST                                                                                                                                                                                                                                                    ";
            m_query+="\n                inner join                                                                                                                                                                                                                                               ";
            m_query+="\n                (                                                                                                                                                                                                                                                        ";
            m_query+="\n                 select 1 as SEQ ,'면생산' as DIV_NAME from DUAL union all                                                                                                                                                                                               ";
            m_query+="\n                 select 2 as SEQ ,'횟수' as DIV_NAME from DUAL union all                                                                                                                                                                                                 ";
            m_query+="\n                 select 3 as SEQ ,'스프식수' as DIV_NAME from DUAL union all                                                                                                                                                                                             ";
            m_query+="\n                 select 4 as SEQ ,'재고' as DIV_NAME from DUAL                                                                                                                                                                                                           ";
            m_query+="\n                ) DMY                                                                                                                                                                                                                                                    ";
            m_query+="\n                on  1=1                                                                                                                                                                                                                                                  ";
            m_query+="\n                left outer join V_PLANT PNT                                                                                                                                                                                                                              ";
            m_query+="\n                on  PNT.PLANT_ID =LST.PLANT_ID                                                                                                                                                                                                                           ";
            m_query+="\n                left outer join V_LINE LIN                                                                                                                                                                                                                               ";
            m_query+="\n                on  LIN.PLANT_ID =LST.PLANT_ID                                                                                                                                                                                                                           ";
            m_query+="\n                and LIN.LINE_ID  =LST.LINE_ID                                                                                                                                                                                                                            ";
            m_query+="\n             order by PLANT_ID ,LINE_ID , PROD_VER ,SEMI_ITEM_ID,SEQ                                                                                                                                                                                                     ";
            m_query+="\n         ) LST                                                                                ";
            m_query+="\n   where SEQ in (1,3)                                                                   ";
            m_query+="\n   group by PLANT_NAME ,PLANT_ID ,DIV_NAME ,SEQ --,LINE_NAME ,LINE_ID ,PROD_VER ,PROC_ID ,SEQ ,DIV_NAME  ";
            m_query+="\n   order by PLANT_ID ,LINE_ID , PROD_VER ,SEMI_ITEM_ID,SEQ                              ";
            System.out.println(m_query);
            rs = databaseUtility.executeQuery(stmt, m_query); 
            
            if(rs.next()){
                do{
                    gdRes.getHeader("CRUD").addValue("", "");  //추가,삭제,보정 을 구분하기 위한 부분.C(추가) ,U(보정) ,D(삭제)
                    gdRes.getHeader("PLANT_NAME"   ).addValue(rs.getString("PLANT_NAME"   ),""); 
                    gdRes.getHeader("LINE_NAME"    ).addValue(rs.getString("LINE_NAME"    ),""); 
                    gdRes.getHeader("PLANT_ID"     ).addValue(rs.getString("PLANT_ID"     ),"");
                    gdRes.getHeader("LINE_ID"      ).addValue(rs.getString("LINE_ID"      ),"");
                    gdRes.getHeader("PROD_VER"     ).addValue(rs.getString("PROD_VER"     ),"");
                    gdRes.getHeader("PROC_ID"      ).addValue(rs.getString("PROC_ID"      ),"");
                    gdRes.getHeader("SEMI_ITEM_ID" ).addValue(rs.getString("SEMI_ITEM_ID" ),"");
                    gdRes.getHeader("ITEM_NAME"    ).addValue("","");
                    gdRes.getHeader("SEQ"          ).addValue(rs.getString("SEQ"          ),"");
                    gdRes.getHeader("DIV_NAME"     ).addValue(rs.getString("DIV_NAME"     ),""); 
                    gdRes.getHeader("IDX"          ).addValue(rs.getString("IDX"          ),""); 
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
                    gdRes.getHeader("BG01A"        ).addValue("","");                     
                    gdRes.getHeader("BG01B"        ).addValue("","");                     
                    gdRes.getHeader("BG01C"        ).addValue("","");                     
                    gdRes.getHeader("BG02A"        ).addValue("","");                     
                    gdRes.getHeader("BG02B"        ).addValue("","");                     
                    gdRes.getHeader("BG02C"        ).addValue("","");                     
                    gdRes.getHeader("BG03A"        ).addValue("","");                     
                    gdRes.getHeader("BG03B"        ).addValue("","");                     
                    gdRes.getHeader("BG03C"        ).addValue("","");                     
                    gdRes.getHeader("BG04A"        ).addValue("","");                     
                    gdRes.getHeader("BG04B"        ).addValue("","");                     
                    gdRes.getHeader("BG04C"        ).addValue("","");                     
                    gdRes.getHeader("BG05A"        ).addValue("","");                     
                    gdRes.getHeader("BG05B"        ).addValue("","");                     
                    gdRes.getHeader("BG05C"        ).addValue("","");                     
                    gdRes.getHeader("BG06A"        ).addValue("","");                     
                    gdRes.getHeader("BG06B"        ).addValue("","");                     
                    gdRes.getHeader("BG06C"        ).addValue("","");                     
                    gdRes.getHeader("BG07A"        ).addValue("","");                     
                    gdRes.getHeader("BG07B"        ).addValue("","");                     
                    gdRes.getHeader("BG07C"        ).addValue("","");                     
                    gdRes.getHeader("WEEK_START_DATE" ).addValue(rs.getString("WEEK_START_DATE"         ),"");                     
                    gdRes.getHeader("VERSION"         ).addValue(rs.getString("VERSION"         ),"");                     
                    gdRes.getHeader("BGCOLOR"         ).addValue("255|255|255","");                     
                    gdRes.getHeader("W3_DEMAND_QTY"   ).addValue(" ","");                     
                }while(rs.next());
            }       
            gdRes.addParam("mode", "search2");       
            gdRes.setMessage("");
            gdRes.setStatus("true");

        } catch (Exception e) {
            throw e;
        } finally {
            databaseUtility.close(conn, stmt, rs);              
        }
                
        return gdRes;
    }	

	public GridData doSave(GridData gdReq) throws Exception {
		
		conn = databaseUtility.getConnection("t3sinc");
	    stmt = conn.createStatement();
	    String message = null;
	    String p_version = "";
		
		GridData gdRes = new GridData();		
		
		int rowCount = 0;
        String update = "";
		
		String user_id = gdReq.getParam("_user_id");
        p_plant_name     = gdReq.getParam("plant_name");
        p_checked_weekly = gdReq.getParam("checked_weekly");
        
        String paramArr[] = p_plant_name.split("','");
        
        System.out.println("p_plant_name="+p_plant_name+"         p_checked_weekly="+p_checked_weekly);
        System.out.println("p_plant_name="+p_plant_name+"         p_checked_weekly="+p_checked_weekly);

		try {

			//화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();

            p_plant_name = gdReq.getParam("plant_name");
		    
			System.out.println("---------------------------------------------------------");
			System.out.println("rowCount:"+rowCount);
		 		 						
            for( int i=0 ;i<paramArr.length ;i++)
            {
                System.out.println();
                update ="\n CALL SP_12020_SEMI_PLAN_UPDATE('"+paramArr[i]+"','"+p_checked_weekly+"','"+user_id+"' )";      
                System.out.println("SP_CALL = " + update);
                    rs = databaseUtility.executeQuery(stmt, update); 
            }

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
	
	
	
	public GridData doCal(GridData gdReq) throws Exception {
		
		conn = databaseUtility.getConnection("t3sinc");
	    stmt = conn.createStatement();
	    String message = null;
		
		GridData gdRes = new GridData();		
		
		int rowCount = 0;
        String update = "";
        String s_query ="";
        String sq = "";
        String sp = "";
		
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
					System.out.println(i+"    " +gdReq.getHeader("PLANT_ID").getValue(i));
					System.out.println(i+"    " +gdReq.getHeader("LINE_ID").getValue(i));
					System.out.println(i+"    " +gdReq.getHeader("PROD_VER").getValue(i));
					System.out.println(i+"    " +gdReq.getHeader("WEEK_START_DATE").getValue(i));

					if(i>0) s_query += "\n union all";
					
					for(int col=1 ; col<=7 ;col++)
					{
						if(col>1) s_query += "\n union all";
						s_query+="\n select 'SS' as CAT_ID ";
                        s_query+="\n       ,'"+gdReq.getHeader("PLANT_ID").getValue(i)+"'     as PLANT_ID ";
						s_query+="\n       ,fn_get_version_semi('SS','"+gdReq.getHeader("WEEK_START_DATE").getValue(i)+"') as VERSION ";
						s_query+="\n       ,'"+gdReq.getHeader("SEMI_ITEM_ID").getValue(i)+"' as ITEM_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("LINE_ID").getValue(i)+"'      as LINE_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("PROC_ID").getValue(i)+"'      as PROC_ID ";
						s_query+="\n       ,to_char(to_date('"+gdReq.getHeader("WEEK_START_DATE").getValue(i)+"','YYYYMMDD')+("+col+")-1,'YYYYMMDD') as PROD_DATES ";
						s_query+="\n       ,'1' as SHIFT_TYPE";
						s_query+="\n       ,'"+gdReq.getHeader("PROD_VER").getValue(i)+"'     as PROD_VER ";
                        s_query+="\n       ,'"+gdReq.getHeader("D0"+col+"A").getValue(i)+"'   as SHIFT_QTY ";
                        s_query+="\n       ,'"+gdReq.getHeader("IDX").getValue(i)+"'          as BOX_QTY";
						s_query+="\n       ,'"+user_id+"'  as MADE_BY ";
	                    s_query+="\n  from dual ";
	                    s_query+="\n union all ";
						s_query+="\n select 'SS' as CAT_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("PLANT_ID").getValue(i)+"'     as PLANT_ID ";
                        s_query+="\n       ,fn_get_version_semi('SS','"+gdReq.getHeader("WEEK_START_DATE").getValue(i)+"') as VERSION ";
						s_query+="\n       ,'"+gdReq.getHeader("SEMI_ITEM_ID").getValue(i)+"' as ITEM_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("LINE_ID").getValue(i)+"'      as LINE_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("PROC_ID").getValue(i)+"'      as PROC_ID ";
						s_query+="\n       ,to_char(to_date('"+gdReq.getHeader("WEEK_START_DATE").getValue(i)+"','YYYYMMDD')+("+col+")-1,'YYYYMMDD') as PROD_DATES ";
						s_query+="\n       ,'3' as SHIFT_TYPE";
						s_query+="\n       ,'"+gdReq.getHeader("PROD_VER").getValue(i)+"'     as PROD_VER ";
						s_query+="\n       ,'"+gdReq.getHeader("D0"+col+"B").getValue(i)+"'   as SHIFT_QTY ";
                        s_query+="\n       ,'"+gdReq.getHeader("IDX").getValue(i)+"'          as BOX_QTY";
						s_query+="\n       ,'"+user_id+"'  as MADE_BY ";
	                    s_query+="\n  from dual ";
	                    s_query+="\n union all ";
						s_query+="\n select 'SS' as CAT_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("PLANT_ID").getValue(i)+"'     as PLANT_ID ";
                        s_query+="\n       ,fn_get_version_semi('SS','"+gdReq.getHeader("WEEK_START_DATE").getValue(i)+"') as VERSION ";
						s_query+="\n       ,'"+gdReq.getHeader("SEMI_ITEM_ID").getValue(i)+"' as ITEM_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("LINE_ID").getValue(i)+"'      as LINE_ID ";
						s_query+="\n       ,'"+gdReq.getHeader("PROC_ID").getValue(i)+"'      as PROC_ID ";
						s_query+="\n       ,to_char(to_date('"+gdReq.getHeader("WEEK_START_DATE").getValue(i)+"','YYYYMMDD')+("+col+")-1,'YYYYMMDD') as PROD_DATES ";
						s_query+="\n       ,'5' as SHIFT_TYPE";
						s_query+="\n       ,'"+gdReq.getHeader("PROD_VER").getValue(i)+"'     as PROD_VER ";
						s_query+="\n       ,'"+gdReq.getHeader("D0"+col+"C").getValue(i)+"'   as SHIFT_QTY ";
                        s_query+="\n       ,'"+gdReq.getHeader("IDX").getValue(i)+"'          as BOX_QTY";
						s_query+="\n       ,'"+user_id+"'  as MADE_BY ";
	                    s_query+="\n  from dual ";
					}
				}

			    update ="\n insert into DAILY_SCH_PLAN_SEMI_PSI_MATRIX (CAT_ID ,PLANT_ID ,VERSION ,ITEM_ID ,LINE_ID ,PROC_ID ,PROD_DATES ,SHIFT_TYPE ,PROD_VER ,SHIFT_QTY , BOX_QTY ,MADE_BY)";
			    update+=s_query;
			    System.out.println(update);
				
                rs = databaseUtility.executeQuery(stmt, update); 

                
			    update ="call SP_12020_SEMI_PLAN_CAL('"+user_id+"')";
                rs = databaseUtility.executeQuery(stmt, update); 
                
			
			}
			

			
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