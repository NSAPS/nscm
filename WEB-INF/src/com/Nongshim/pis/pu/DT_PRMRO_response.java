/**
 * DT_PRMRO_response.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.Nongshim.pis.pu;

public class DT_PRMRO_response  implements java.io.Serializable {
    private com.Nongshim.pis.pu.DT_PRMRO_responseSTR STR;

    public DT_PRMRO_response() {
    }

    public DT_PRMRO_response(
           com.Nongshim.pis.pu.DT_PRMRO_responseSTR STR) {
           this.STR = STR;
    }


    /**
     * Gets the STR value for this DT_PRMRO_response.
     * 
     * @return STR
     */
    public com.Nongshim.pis.pu.DT_PRMRO_responseSTR getSTR() {
        return STR;
    }


    /**
     * Sets the STR value for this DT_PRMRO_response.
     * 
     * @param STR
     */
    public void setSTR(com.Nongshim.pis.pu.DT_PRMRO_responseSTR STR) {
        this.STR = STR;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DT_PRMRO_response)) return false;
        DT_PRMRO_response other = (DT_PRMRO_response) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.STR==null && other.getSTR()==null) || 
             (this.STR!=null &&
              this.STR.equals(other.getSTR())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getSTR() != null) {
            _hashCode += getSTR().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DT_PRMRO_response.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", "DT_PRMRO_response"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("STR");
        elemField.setXmlName(new javax.xml.namespace.QName("", "STR"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", ">DT_PRMRO_response>STR"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
