/*
 * Created on 2004. 5. 12.
 *
 * Copyright 1999-2004 ZIONEX, Inc. All Rights Reserved.
 * This software is the proprietary information of ZIONEX, Inc.
 * Use is subject to license terms.
 */
package com.zionex.t3sinc.tsf.tool; 

import org.apache.velocity.app.Velocity;

/**
 * 
 * @version 1.0
 * @author janux
 * @since JDK 1.4
 */
public class VTLSupportTool {
	public boolean exists(String template) {
		return Velocity.templateExists(template);
	}
}