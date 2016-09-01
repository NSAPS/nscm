/*
 * Created on 2005. 7. 14.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.tsf.tool;
 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.zionex.t3sinc.T3SincRequest;
import com.zionex.t3sinc.T3SincSession;
import com.zionex.t3sinc.tsf.broker.http.T3SincHttpRequest;
import com.zionex.t3sinc.tsf.broker.http.T3SincHttpSession;
import com.zionex.t3sinc.tsf.ctrler.SincPermissionChecker;

/**
 * @author Administrator
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PermissionChecker {
	public boolean checkPermission(String userID, String jobName, 
				HttpServletRequest request, HttpSession session) {
		
		Map parameterMap = request.getParameterMap();
		
		return SincPermissionChecker.checkPermission(userID, jobName,
						parameterMap,
						(T3SincRequest)( new T3SincHttpRequest(request)), 
						(T3SincSession)( new T3SincHttpSession(session)) );
	}

}
