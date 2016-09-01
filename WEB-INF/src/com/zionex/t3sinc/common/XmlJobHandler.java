/*
 * Created on 2007-06-23 10:30
 * by Kim Tae Jong
 * Altered on 2007-11-28 14:38
 * by Kim Tae Jong
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */

package com.zionex.t3sinc.common;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.*;

public class XmlJobHandler {
	
	/**
	 * 권한관리 화면에서 job_sinc_*.xml 에 있는 설정을 읽어서 보여준다
	 * @return
	 */
	public ArrayList getJobInfoOrg(){
		
		ArrayList arrList = new ArrayList();  
		
		String preNavigation = ""; 
		String prePath = ""; 
		String preTitle = ""; 
						
		ResourceBundle rb = ResourceBundle.getBundle("server_info");
		
		String jobPath = rb.getString("JOB_FILE_PATH");
		File f= new File(jobPath);
		
		File[] fs = f.listFiles();
		
		SAXBuilder builder = new SAXBuilder();
		Document doc;
		Element root;
		String fileName="";
		String fileType = "";
		String arrStr[] = {};
		
		int count =0;
		if(fs == null) return null;
		
		try {
			for(int i =0; i< fs.length; i++){
				
				fileName = fs[i].getName();
				arrStr = fileName.split("[.]");
				fileType = arrStr[arrStr.length - 1];
				
				
				if("xml".equalsIgnoreCase(fileType)){
					doc = builder.build(fs[i]);
					root = doc.getRootElement();
					Element e= null, eChild = null, queryElement=null;
					List queryList = null;
					List arrQuery = null;
					
					for (Iterator iter = root.getChildren().iterator(); iter.hasNext();) {
						e = (Element) iter.next();
						
						if( e.getAttributeValue("check_permission") != null ) {
							if( e.getAttributeValue("check_permission").equals("yes") ) { 
							    
							    ArrayList row = new ArrayList(); 
								row.add(Integer.toString(count+1)); 
								row.add(e.getAttributeValue("id")); 
								
								// navigation 
								if( e.getChildText("navigation") == null ) { 
							        row.add(preNavigation); 
							    } else { 
							        if( e.getChildText("navigation").equals("") ) { 
							            row.add(e.getChildText("description")); 
							        } else { 
							            row.add(e.getChildText("navigation")); 
								        preNavigation = e.getChildText("navigation");
							        } 
							    } 
								
								// request_type 
								if( e.getAttributeValue("job_type") != null ) { 
								    if( e.getAttributeValue("job_type").equals("composite") ) { 
								        row.add("composite insert"); 
								    } else { 
								        if( e.getChildText("request_type") != null ) 
								            row.add(e.getChildText("request_type").replace("_", " ")); 
								        else 
								            row.add(e.getChildText("request_type")); 
								    }
								} else { 
								    if( e.getChildText("request_type") != null ) 
								        row.add(e.getChildText("request_type").replace("_", " ")); 
								    else 
								        row.add(e.getChildText("request_type"));
								}
								
								// path 
								if( e.getChildText("navigation") == null ) { 
							        row.add(prePath); 
							    } else { 
							        row.add(e.getChildText("path")); 
							        prePath = e.getChildText("path"); 
							    } 
								
								// title 
								if( e.getChildText("title") == null ) { 
							        row.add(preTitle); 
							    } else { 
							        row.add(e.getChildText("title")); 
							        preTitle = e.getChildText("title"); 
							    } 
								
								arrList.add(row); 
								count++; 
							} 
						} 
					}
				} 
			}
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 

		System.out.println(arrList); 
		return arrList;
        
    }

	/**
	 * 권한관리 화면에서 job_sinc_*.xml 에 있는 설정을 읽어서 보여준다
	 * @return
	 */
	public ArrayList getJobInfo(){
		
		ArrayList arrList = new ArrayList();  
		
		String preNavigation = ""; 
		String prePath = ""; 
		String preTitle = ""; 
		
		String preMenu = "";
		String preDescription = "";
		String prePermissionDesc = "";
						
		ResourceBundle rb = ResourceBundle.getBundle("server_info"); 
		
		String jobPath = rb.getString("JOB_FILE_PATH");
		File f= new File(jobPath);
		
		File[] fs = f.listFiles();
		
		SAXBuilder builder = new SAXBuilder();
		Document doc;
		Element root;
		String fileName="";
		String fileType = "";
		String arrStr[] = {};
		
		int count =0;
		if(fs == null) return null;
		
		try {
			for(int i =0; i< fs.length; i++){
				
				fileName = fs[i].getName();
				arrStr = fileName.split("[.]");
				fileType = arrStr[arrStr.length - 1];
				
				
				if("xml".equalsIgnoreCase(fileType)){
					doc = builder.build(fs[i]);
					root = doc.getRootElement();
					Element e= null, eChild = null, queryElement=null;
					List queryList = null;
					List arrQuery = null;
					
					for (Iterator iter = root.getChildren().iterator(); iter.hasNext();) {
						e = (Element) iter.next();
						
						// check_permission 속성이 있는 JOB 만 선택
						if( e.getAttributeValue("check_permission") != null ) {
							// check_permission 속성값이 yes 인 JOB 만 선택
							if( e.getAttributeValue("check_permission").equals("yes") ) { 
							    
							    ArrayList row = new ArrayList(); 
								row.add(Integer.toString(count+1)); 
								row.add(e.getAttributeValue("id")); 
								
								// title 
								if( e.getChildText("title") == null ) { 
							        row.add(preTitle); 
							    } else { 
							    	row.add(e.getChildText("title")); 
							        preTitle = e.getChildText("title");
							    }

								// permission_desc
								String permissionDesc = e.getChildText("permission_desc");
								// description
								String description = e.getChildText("description");
								
								// permission_desc
								if( e.getChildText("permission_desc") == null ) {
									// description
									if( e.getChildText("description") == null ) {
										// permission_desc & description 모두 없으면, 이전 description 적용
										row.add(preDescription);
									}
									else {
										// permission_desc 가 없으면 description 적용
								        row.add(e.getChildText("description")); 
								        preDescription = e.getChildText("description");
									}
							    } else { 
							        row.add(e.getChildText("permission_desc")); 
							        prePermissionDesc = e.getChildText("permission_desc");
									
									// description
									if( e.getChildText("description") != null ) {
								        preDescription = e.getChildText("description");
								    }
							    }
								
								// navigation 
								if( e.getChildText("navigation") == null ) { 
							        row.add(preNavigation); 
							    } else { 
							    	row.add(e.getChildText("navigation")); 
							        preNavigation = e.getChildText("navigation");
							    }
								
								arrList.add(row); 
								count++; 
							} // end if : e.getAttributeValue("check_permission").equals("yes")
						} // end if : e.getAttributeValue("check_permission") != null
					} // end for
				} // end if : "xml".equalsIgnoreCase(fileType)
			} // end for
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 

		System.out.println(arrList); 
		return arrList;
        
    } // end method getJobInfo2
    
    /**
     * 
     * @param args
     */
    public static void main(String[] args){ 
        
        XmlJobHandler jHandler = new XmlJobHandler();
		System.out.println("___XmlJobHandler_Class___"); 
        
    }

}
