package com.Nongshim.pis.pu;

public class OS_PRSERVICEProxy implements com.Nongshim.pis.pu.OS_PRSERVICE {
  private String _endpoint = null;
  private com.Nongshim.pis.pu.OS_PRSERVICE oS_PRSERVICE = null;
  
  public OS_PRSERVICEProxy() {
    _initOS_PRSERVICEProxy();
  }
  
  public OS_PRSERVICEProxy(String endpoint) {
    _endpoint = endpoint;
    _initOS_PRSERVICEProxy();
  }
  
  private void _initOS_PRSERVICEProxy() {
    try {
      oS_PRSERVICE = (new com.Nongshim.pis.pu.OS_PRSERVICEServiceLocator()).getOS_PRSERVICEPort();
      if (oS_PRSERVICE != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)oS_PRSERVICE)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)oS_PRSERVICE)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (oS_PRSERVICE != null)
      ((javax.xml.rpc.Stub)oS_PRSERVICE)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public com.Nongshim.pis.pu.OS_PRSERVICE getOS_PRSERVICE() {
    if (oS_PRSERVICE == null)
      _initOS_PRSERVICEProxy();
    return oS_PRSERVICE;
  }
  
  public com.Nongshim.pis.pu.DT_PRSERVICE_response OS_PRSERVICE(com.Nongshim.pis.pu.DT_PRSERVICE MT_PRSERVICE) throws java.rmi.RemoteException{
    if (oS_PRSERVICE == null)
      _initOS_PRSERVICEProxy();
    return oS_PRSERVICE.OS_PRSERVICE(MT_PRSERVICE);
  }
  
  
}