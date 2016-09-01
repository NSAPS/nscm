package com.zionex.t3sinc.common;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Hashtable;
import java.util.Vector;

import org.apache.xmlrpc.XmlRpcClient;
import org.apache.xmlrpc.XmlRpcException;

public class ClientXMLRPC {

	private XmlRpcClient xmlrpc;

	public ClientXMLRPC(String url){
		try {
			xmlrpc = new XmlRpcClient(url);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void execute(Hashtable parameters){
		Vector v = new Vector();
		v.add(parameters);
		try {
			System.out.println(xmlrpc.execute("XMLRPC.execute", v));
		} catch (XmlRpcException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		ClientXMLRPC client = new ClientXMLRPC("http://localhost:8080/XMLRPC");
		Hashtable parameters = new Hashtable();
		parameters.put("action", "forecast");
		// must be 2 sqls in order (20080715)
		Vector sqls = new Vector();
		sqls.add("select to_char(forecastSeq.nextVal), forecastName, forecastClass " +
				"         , operationType, forecastBucket, itemLevel" +
				"         , siteLevel, dcLevel, custLevel, forecastMethod" +
				"         , historyStartdate, historyEnddate, disaggregationRule" +
				"         , forecastBucketnum, forecastRange" +
				"         , parameter01 as MovingPeriod" +
				"         , parameter02 as WeightedMovingPeriod" +
				"         , parameter03 as LevelFactor" +
				"         , parameter04 as TrendFactor" +
				"         , parameter05 as SeasonlFactor" +
				"         , parameter06 as ProcessingLevel" +
				"         , parameter07 as dampingFactor" +
				"         , parameter08 as smoothingFactor" +
				"       from batchParameters"); 

		sqls.add("select y.fcst_unit_id, y.item_code, y.site_code, y.dc_code "
			    	+ " , y.cust_code, y.sales_month, y.sales_qty"
			    	+ " from ( select x.* "
                    + " , count(x.item_code) over ( partition by x.fcst_unit_id ) month_cnt "
                    + " from ( select a.fcst_unit_id, t.item_code, t.site_code"
                    + ", t.dc_code, t.cust_code, t.sales_month"
                    + ", sum(t.sales_qty) as sales_qty"
                    + " from sales_hist t "
                    + " , fcst_unit  a"
                    + " where t.item_code = a.item_code "
                    //  See
                    + "  and a.item_code = 1168056 and a.site_code=3362 "
				    + "  and a.dc_code=11107 "
				    //
                    + "  and t.site_code = a.site_code "
                    + "  and t.dc_code   = a.dc_code "
                    + "  and t.cust_code = a.cust_code "
                    + "  and t.sales_month between '20050101' and '20071201' "
                    + "  and a.item_class1 = 'AA1' "
                    + " group by a.fcst_unit_id, t.item_code, t.site_code "
                    + "      , t.dc_code, t.cust_code, t.sales_month "
                    + "                 ) x "
                    + "              ) y "
                    + " where y.month_cnt = 36 ");
		parameters.put("selects", sqls);
		
		
		Vector methods = new Vector();
		methods.add("WMA");
		methods.add("SEALOG");
		methods.add("OPT");
		parameters.put("operations", methods);
		
		String commonWhere = " where item_code = 1168056 and site_code=3362 and dc_code = 11107 and cust_code = 03";
		Vector dels = new Vector();
		dels.add("delete from fcst_rslt_summary" + commonWhere);
		dels.add("delete from fcst_output" + commonWhere);
		parameters.put("deletes", dels);
		System.out.println(parameters);
		client.execute(parameters);
	}
}