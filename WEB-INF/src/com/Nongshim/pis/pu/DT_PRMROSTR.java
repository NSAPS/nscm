/**
 * DT_PRMROSTR.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.Nongshim.pis.pu;

public class DT_PRMROSTR  implements java.io.Serializable {
    private java.lang.String PRCH_REQT_NO;

    private java.lang.String DOCU_TYPE;

    public DT_PRMROSTR() {
    }

    public DT_PRMROSTR(
           java.lang.String PRCH_REQT_NO,
           java.lang.String DOCU_TYPE) {
           this.PRCH_REQT_NO = PRCH_REQT_NO;
           this.DOCU_TYPE = DOCU_TYPE;
    }


    /**
     * Gets the PRCH_REQT_NO value for this DT_PRMROSTR.
     * 
     * @return PRCH_REQT_NO
     */
    public java.lang.String getPRCH_REQT_NO() {
        return PRCH_REQT_NO;
    }


    /**
     * Sets the PRCH_REQT_NO value for this DT_PRMROSTR.
     * 
     * @param PRCH_REQT_NO
     */
    public void setPRCH_REQT_NO(java.lang.String PRCH_REQT_NO) {
        this.PRCH_REQT_NO = PRCH_REQT_NO;
    }


    /**
     * Gets the DOCU_TYPE value for this DT_PRMROSTR.
     * 
     * @return DOCU_TYPE
     */
    public java.lang.String getDOCU_TYPE() {
        return DOCU_TYPE;
    }


    /**
     * Sets the DOCU_TYPE value for this DT_PRMROSTR.
     * 
     * @param DOCU_TYPE
     */
    public void setDOCU_TYPE(java.lang.String DOCU_TYPE) {
        this.DOCU_TYPE = DOCU_TYPE;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DT_PRMROSTR)) return false;
        DT_PRMROSTR other = (DT_PRMROSTR) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.PRCH_REQT_NO==null && other.getPRCH_REQT_NO()==null) || 
             (this.PRCH_REQT_NO!=null &&
              this.PRCH_REQT_NO.equals(other.getPRCH_REQT_NO()))) &&
            ((this.DOCU_TYPE==null && other.getDOCU_TYPE()==null) || 
             (this.DOCU_TYPE!=null &&
              this.DOCU_TYPE.equals(other.getDOCU_TYPE())));
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
        if (getPRCH_REQT_NO() != null) {
            _hashCode += getPRCH_REQT_NO().hashCode();
        }
        if (getDOCU_TYPE() != null) {
            _hashCode += getDOCU_TYPE().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DT_PRMROSTR.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", ">DT_PRMRO>STR"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("PRCH_REQT_NO");
        elemField.setXmlName(new javax.xml.namespace.QName("", "PRCH_REQT_NO"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("DOCU_TYPE");
        elemField.setXmlName(new javax.xml.namespace.QName("", "DOCU_TYPE"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
