    
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
import com.zionex.t3sinc.common.ControlBoard.MyLoadTask;

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
public class sc_12030_dailyProductionPlanPoTrans_list extends HttpServlet {

    private static final long serialVersionUID = -419201700278107216L;
    
    Connection     conn     = null;
    Statement     stmt    = null;
    ResultSet    rs        = null;    
    String         sql     = null;
    //Map sessionMap     = new HashMap();
    
    SincDatabaseUtility databaseUtility = new SincDatabaseUtility();    
    
    boolean endChk = true; // 전송 상태 체크 종료 여부 flag
    
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
            else if (mode.equals("trans"))
                gdRes = doTrans(gdReq);
            
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
                                    
            String p_plant_id = gdReq.getParam("plant_id");
            String p_sdate    = gdReq.getParam("sdate");
            String p_edate    = gdReq.getParam("edate");
            String p_checked_po_type = gdReq.getParam("checked_po_type");
            
            System.out.println("p_plant_id="+p_plant_id+"          p_sdate="+p_sdate+"                p_edate="+p_edate+"                  p_checked_po_type="+p_checked_po_type);
            
            
            String paramKey   ="selected_plant!%!sdate!%!edate";
            String paramCode  = p_plant_id + "!%!" + p_sdate + "!%!" + p_edate;
            String query_id   = "sc_12030_dailyProductionPlanPoTrans_list" + p_checked_po_type;

            ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
            
            rowCount = qResult.size();
            
            if (rowCount == 0) {
                gdRes.addParam("mode", "search");    
                gdRes.setMessage("...");
                gdRes.setStatus("true");
                return gdRes;
            }
            
            for (int i = 0; i < rowCount; i++) {
                
                gdRes.getHeader("PLANT_NAME" ).addValue(qResult.get(i).get(1 ), qResult.get(i).get(0)); // 공장/공장코드
                gdRes.getHeader("PROC_NAME"  ).addValue(qResult.get(i).get(3 ), qResult.get(i).get(2)); // 작업장/작업장코드                                gdRes.getHeader("ITEM_ID"  ).addValue(qResult.get(i).get(4 ), ""); // 제품코드
                gdRes.getHeader("ITEM_NAME"  ).addValue(qResult.get(i).get(5 ), qResult.get(i).get(4)); // 제품/제품콛
                gdRes.getHeader("PROD_DATES" ).addValue(qResult.get(i).get(6 ), "");                    // 계획일자
                gdRes.getHeader("SHIFT_TYPE" ).addValue(qResult.get(i).get(7 ), "");                    // SHIFT
                gdRes.getHeader("FROM_QTY"   ).addValue(qResult.get(i).get(8 ), "");                    // 변경 전 수량
                gdRes.getHeader("TO_QTY"     ).addValue(qResult.get(i).get(9 ), "");                    // 변경 후 수량
                gdRes.getHeader("REASON01"   ).addValue(qResult.get(i).get(10), "");                    // 보정 내역
                gdRes.getHeader("REASON02"   ).addValue(qResult.get(i).get(11), "");                    // 보정 상세
                gdRes.getHeader("MADE_TYPE"  ).addValue(qResult.get(i).get(12), "");                    // 보정 구분
                gdRes.getHeader("TRANS_TYPE" ).addValue(qResult.get(i).get(13), "");                    // 전송 구분
                gdRes.getHeader("MADE_DTTM"  ).addValue(qResult.get(i).get(14), "");                    // 수정일자
                gdRes.getHeader("MADE_BY"    ).addValue(qResult.get(i).get(15), "");                    // 수정자
                gdRes.getHeader("ORD_NO"     ).addValue(qResult.get(i).get(16), "");                    // 오더번호
                gdRes.getHeader("ORD_ITEM_NO").addValue(qResult.get(i).get(17), "");                    // 오더항목번호
                gdRes.getHeader("PO_NO"      ).addValue(qResult.get(i).get(18), "");                    // PO번호
                gdRes.getHeader("TRANS_MSG"  ).addValue(qResult.get(i).get(19), "");                    // 전송 MSG
                gdRes.getHeader("REL_STAT"   ).addValue(qResult.get(i).get(20), "");                    // 오더 릴리즈 성공 유/무
                gdRes.getHeader("IF_MSGS"    ).addValue(qResult.get(i).get(21), "");                    // IF전송 메시지
                
             }

            gdRes.addParam("mode", gdReq.getParam("mode"));        
            gdRes.setMessage("");
            gdRes.setStatus("true");

        } catch (Exception e) {
            throw e;
        }
                
        return gdRes;
    }
    
    /* 전송 */
    public GridData doTrans(GridData gdReq) throws Exception {
        
        String s_update = "";

        System.out.println("doTrans() start!!!");
        
        conn = databaseUtility.getConnection("t3sinc"); // DB Connection
        stmt = conn.createStatement(); // statement 객체 생성

        //GridData gdRes = new GridData(); // WiseGrid 객체생성
        
        try {
            String p_plant_id = gdReq.getParam("plant_id");
            String p_sdate = gdReq.getParam("sdate");
            String p_edate = gdReq.getParam("edate");
            //String p_checked_po_type = gdReq.getParam("checked_po_type");
            String made_by = gdReq.getParam("user_id");
            
            //------------------------------update 실행----------------------------------//
            s_update  ="\n UPDATE  PROC_STATUS PS                                                                             ";
            s_update +="\n SET     (PS.VERSION, PS.USE_FLAG, PS.D_START_DTTM, PS.D_END_DTTM, PS.START_DATE, PS.END_DATE) =    ";
            s_update +="\n         (                                                                                          ";
            s_update +="\n             SELECT  NULL			                   VERSION                                        ";
            s_update +="\n                     ,'Y'                            USE_FLAG                                       ";
            s_update +="\n                     ,SYSDATE                        D_START_DTTM                                   ";
            s_update +="\n                     ,NULL                           D_END_DTTM                                     ";
            s_update +="\n                     ,REPLACE('"+p_sdate+"','-','')  START_DATE                                     ";
            s_update +="\n                     ,REPLACE('"+p_edate+"','-','')  END_DATE                                       ";
            s_update +="\n             FROM    V_IF_DAILY_SCH_PLAN_PO TMP                                                     ";
            s_update +="\n             WHERE   TMP.PLANT_ID IN ('"+p_plant_id+"')                                             ";
            s_update +="\n             AND     TMP.PLANT_ID = PS.PLANT_ID                                                     ";
            s_update +="\n             AND     SUBSTR(TMP.WO_ID,12,8) BETWEEN REPLACE('"+p_sdate+"','-','') AND REPLACE('"+p_edate+"','-','') ";
            s_update +="\n             GROUP   BY TMP.PLANT_ID                                                                ";
            s_update +="\n         )                                                                                          ";
            s_update +="\n WHERE   PS.PLANT_ID IN ('"+p_plant_id+"')                                                          ";
            s_update +="\n AND	   PS.JOB_CODE ='TRANS'             				                                          ";
            s_update +="\n AND	   PS.CAT_ID   ='PS'				                                                          ";
            System.out.println(s_update);
            
            rs = databaseUtility.executeQuery(stmt, s_update); 
            
            
            //---------------------SP_PS_PO_POSTING_CREATE() 실행-------------------------//
            
            System.out.println("call SP_PS_PO_POSTING_CREATE() 실행!!!");
            
            String sql = "call SP_PS_PO_POSTING_CREATE('" + made_by + "')" ;
            
            boolean resultSp = stmt.execute(sql);
            
            System.out.println("call SP_PS_PO_POSTING_CREATE() 실행 결과 : " + resultSp);
            
            //------------------------------전송 상태 체크----------------------------------//
            //boolean endChk = false; // 타이머가 정상 종료 했는지 체크
            /*
            System.out.println(" --------------------------전송 상태 체크 시작------------------------------");
            
            String paramKey2   ="selected_plant";
            String paramCode2  = p_plant_id;
            String query_id2   = "trans_status_check";
                        
            System.out.println("TransStatusCheck 실행 : 전송 상태 값 체크 시작!!!");
            System.out.println(endChk);
            while(endChk){
                
                Thread.sleep(3000);
                
                ArrayList<ArrayList<String>> transResult = new CommonUtil().getSelQeury(paramKey2, paramCode2, query_id2);
                
                for( int i = 0 ; i < transResult.size() ; i++ ){
                    
                    System.out.println("test 1 = " + transResult.get(i).get(0));
                    System.out.println("test 2 = " + transResult.get(i).get(0).equals("P"));
                    System.out.println("test 3 = " + transResult.get(i).get(1).equals("T"));
                    
                    if(transResult.get(i).get(0) != null && transResult.get(i).get(0).equals("P") && transResult.get(i).get(1).equals("T")){
                        System.out.println("break");
                        break;
                    }else{
                        System.out.println("TransStatusCheck 실행 : 전송 상태 값 체크 종료!!!");
                        endChk = false;
                    }                    
                }
            }
            endChk = true;
            
            System.out.println(" --------------------------전송 상태 체크 종료------------------------------");
			*/
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        } finally {
            databaseUtility.close(conn, stmt, rs);              
        }
        
        System.out.println("doTrans() end!!!");
        
        //return doQuery(gdReq);
        return gdReq;
    }

}
