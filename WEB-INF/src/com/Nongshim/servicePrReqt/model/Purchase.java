package com.Nongshim.servicePrReqt.model;

public class Purchase {
	private String acct_fixd; 			//계정지정범주
	private String chng_date; 			//변경일자
	private String curr_key; 			//통화키
	private String delv_date;			//납품일자
	private String delv_reqt_date;		//납품요청일
	private String docu_type;			//문서유형
	private String gl_acct;				//G/L계정
	private String matr_code;			//자재코드
	private String matr_grup;			//자재그룹
	private String plan_amt;			//예상금액
	private String plan_pric;			//예상단가
	private String prch_docu_atcl;		//품목범주
	private String prch_docu_detl;		//품목내역
	private String prch_grup;			//구매그룹
	private String prch_reqt_no;		//구매요청번호
	private String qty_unit;			//수량단위
	private String rele_date;			//릴리즈일자
	private String rele_indi;			//릴리즈지시자
	private String reqt_cost_cntr;		//의뢰코스트센터
	private String reqt_date;			//의뢰일자
	private String reqt_name;			//요청자이름
	private String reqt_no;				//의뢰번호
	private String reqt_qty;			//의뢰수량
	private String reqt_resn;			//청구사유
	private String reqt_seq;			//의뢰항순
	private String reqt_site_code;		//의뢰사업장
	private String subject;				//제목
	private String used_cost_cntr;		//사용코스트센터
	private String used_resn;			//용도
	private String writ_date;			//등록일자
	private String matr_name;			//자재명
	private String qty_size;			//규격
	private String wbs_no;				//wbs번호
	private String reqt_gubn;	
	private String reqt_sabun;
	private String reqt_buseo;
	private String cust_code;
	private String cust_name;
	private String matr_type;
	private String entry_sheet_no;
	private String prch_ordr_no;
	private String prch_ordr_seq;
	private String prch_ordr_detl;
	private String reqt_site_name;
	private String entry_indi;
	private String rele_indi_name;
	private String entry_indi_name;
	private String move_type;
	private String move_indi;
	private String slip_evid_date;
	private String slip_move_date;
	private String matr_docu_no;
	private String matr_slip_year;
	private String retn_matr_docu_no;
	private String retn_matr_slip_year;
	private String message;
	private String msgtyp;
	private String po_qty;
	private String doc_date;
	private String check_trns;
	private String check_use;	
	private String check_img;	
	private String used_cost_cntr_name;	
	private	String post_no;				//우편번호
	private String ref_no;              //세금계산서 번호
	private String real_emp_no ;		//실제요청자사번
	private String real_emp_name ;      //실제요청자명
	private String lgort ;     	 		//창고
	
	
	public String getCheck_img() {
		return check_img;
	}
	public void setCheck_img(String check_img) {
		this.check_img = check_img;
	}
	public String getPo_qty() {
		return po_qty;
	}
	public void setPo_qty(String po_qty) {
		this.po_qty = po_qty;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getMsgtyp() {
		return msgtyp;
	}
	public void setMsgtyp(String msgtyp) {
		this.msgtyp = msgtyp;
	}
	public String getRetn_matr_docu_no() {
		return retn_matr_docu_no;
	}
	public void setRetn_matr_docu_no(String retn_matr_docu_no) {
		this.retn_matr_docu_no = retn_matr_docu_no;
	}
	public String getRetn_matr_slip_year() {
		return retn_matr_slip_year;
	}
	public void setRetn_matr_slip_year(String retn_matr_slip_year) {
		this.retn_matr_slip_year = retn_matr_slip_year;
	}
	public String getMove_type() {
		return move_type;
	}
	public void setMove_type(String move_type) {
		this.move_type = move_type;
	}
	public String getMove_indi() {
		return move_indi;
	}
	public void setMove_indi(String move_indi) {
		this.move_indi = move_indi;
	}
	public String getSlip_evid_date() {
		return slip_evid_date;
	}
	public void setSlip_evid_date(String slip_evid_date) {
		this.slip_evid_date = slip_evid_date;
	}
	public String getSlip_move_date() {
		return slip_move_date;
	}
	public void setSlip_move_date(String slip_move_date) {
		this.slip_move_date = slip_move_date;
	}
	public String getMatr_docu_no() {
		return matr_docu_no;
	}
	public void setMatr_docu_no(String matr_docu_no) {
		this.matr_docu_no = matr_docu_no;
	}
	public String getMatr_slip_year() {
		return matr_slip_year;
	}
	public void setMatr_slip_year(String matr_slip_year) {
		this.matr_slip_year = matr_slip_year;
	}
	public String getRele_indi_name() {
		return rele_indi_name;
	}
	public void setRele_indi_name(String rele_indi_name) {
		this.rele_indi_name = rele_indi_name;
	}
	public String getEntry_indi_name() {
		return entry_indi_name;
	}
	public void setEntry_indi_name(String entry_indi_name) {
		this.entry_indi_name = entry_indi_name;
	}
	public String getEntry_indi() {
		return entry_indi;
	}
	public void setEntry_indi(String entry_indi) {
		this.entry_indi = entry_indi;
	}
	public String getReqt_site_name() {
		return reqt_site_name;
	}
	public void setReqt_site_name(String reqt_site_name) {
		this.reqt_site_name = reqt_site_name;
	}
	public String getPrch_ordr_no() {
		return prch_ordr_no;
	}
	public void setPrch_ordr_no(String prch_ordr_no) {
		this.prch_ordr_no = prch_ordr_no;
	}
	public String getPrch_ordr_seq() {
		return prch_ordr_seq;
	}
	public void setPrch_ordr_seq(String prch_ordr_seq) {
		this.prch_ordr_seq = prch_ordr_seq;
	}
	public String getPrch_ordr_detl() {
		return prch_ordr_detl;
	}
	public void setPrch_ordr_detl(String prch_ordr_detl) {
		this.prch_ordr_detl = prch_ordr_detl;
	}
	public String getEntry_sheet_no() {
		return entry_sheet_no;
	}
	public void setEntry_sheet_no(String entry_sheet_no) {
		this.entry_sheet_no = entry_sheet_no;
	}
	public String getMatr_type() {
		return matr_type;
	}
	public void setMatr_type(String matr_type) {
		this.matr_type = matr_type;
	}
	public String getCust_name() {
		return cust_name;
	}
	public void setCust_name(String cust_name) {
		this.cust_name = cust_name;
	}
	public String getReqt_sabun() {
		return reqt_sabun;
	}
	public void setReqt_sabun(String reqt_sabun) {
		this.reqt_sabun = reqt_sabun;
	}
	public String getReqt_buseo() {
		return reqt_buseo;
	}
	public void setReqt_buseo(String reqt_buseo) {
		this.reqt_buseo = reqt_buseo;
	}
	public String getCust_code() {
		return cust_code;
	}
	public void setCust_code(String cust_code) {
		this.cust_code = cust_code;
	}
	public String getReqt_gubn() {
		return reqt_gubn;
	}
	public void setReqt_gubn(String reqt_gubn) {
		this.reqt_gubn = reqt_gubn;
	}
	public String getWbs_no() {
		return wbs_no;
	}
	public void setWbs_no(String wbs_no) {
		this.wbs_no = wbs_no;
	}
	public String getMatr_name() {
		return matr_name;
	}
	public void setMatr_name(String matr_name) {
		this.matr_name = matr_name;
	}
	public String getQty_size() {
		return qty_size;
	}
	public void setQty_size(String qty_size) {
		this.qty_size = qty_size;
	}
	public String getReqt_site_code() {
		return reqt_site_code;
	}
	public void setReqt_site_code(String reqt_site_code) {
		this.reqt_site_code = reqt_site_code;
	}
	public String getReqt_date() {
		return reqt_date;
	}
	public void setReqt_date(String reqt_date) {
		this.reqt_date = reqt_date;
	}
	public String getReqt_no() {
		return reqt_no;
	}
	public void setReqt_no(String reqt_no) {
		this.reqt_no = reqt_no;
	}
	public String getReqt_seq() {
		return reqt_seq;
	}
	public void setReqt_seq(String reqt_seq) {
		this.reqt_seq = reqt_seq;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDocu_type() {
		return docu_type;
	}
	public void setDocu_type(String docu_type) {
		this.docu_type = docu_type;
	}
	public String getAcct_fixd() {
		return acct_fixd;
	}
	public void setAcct_fixd(String acct_fixd) {
		this.acct_fixd = acct_fixd;
	}
	public String getPrch_docu_atcl() {
		return prch_docu_atcl == null ? "" : prch_docu_atcl;
	}
	public void setPrch_docu_atcl(String prch_docu_atcl) {
		this.prch_docu_atcl = prch_docu_atcl;
	}
	public String getPrch_docu_detl() {
		return prch_docu_detl == null ? "" : prch_docu_detl;
	}
	public void setPrch_docu_detl(String prch_docu_detl) {
		this.prch_docu_detl = prch_docu_detl;
	}
	public String getMatr_code() {
		return matr_code == null ? "" : matr_code;
	}
	public void setMatr_code(String matr_code) {
		this.matr_code = matr_code;
	}
	public String getMatr_grup() {
		return matr_grup;
	}
	public void setMatr_grup(String matr_grup) {
		this.matr_grup = matr_grup;
	}
	public String getPrch_grup() {
		return prch_grup;
	}
	public void setPrch_grup(String prch_grup) {
		this.prch_grup = prch_grup;
	}
	public String getReqt_qty() {
		return reqt_qty;
	}
	public void setReqt_qty(String reqt_qty) {
		this.reqt_qty = reqt_qty;
	}
	public String getQty_unit() {
		return qty_unit;
	}
	public void setQty_unit(String qty_unit) {
		this.qty_unit = qty_unit;
	}
	public String getPlan_pric() {
		return plan_pric;
	}
	public void setPlan_pric(String plan_pric) {
		this.plan_pric = plan_pric;
	}
	public String getPlan_amt() {
		return plan_amt;
	}
	public void setPlan_amt(String plan_amt) {
		this.plan_amt = plan_amt;
	}
	public String getCurr_key() {
		return curr_key;
	}
	public void setCurr_key(String curr_key) {
		this.curr_key = curr_key;
	}
	public String getDelv_date() {
		return delv_date;
	}
	public void setDelv_date(String delv_date) {
		this.delv_date = delv_date;
	}
	public String getDelv_reqt_date() {
		return delv_reqt_date;
	}
	public void setDelv_reqt_date(String delv_reqt_date) {
		this.delv_reqt_date = delv_reqt_date;
	}
	public String getReqt_resn() {
		return reqt_resn;
	}
	public void setReqt_resn(String reqt_resn) {
		this.reqt_resn = reqt_resn;
	}
	public String getUsed_resn() {
		return used_resn;
	}
	public void setUsed_resn(String used_resn) {
		this.used_resn = used_resn;
	}
	public String getGl_acct() {
		return gl_acct;
	}
	public void setGl_acct(String gl_acct) {
		this.gl_acct = gl_acct;
	}
	public String getReqt_cost_cntr() {
		return reqt_cost_cntr;
	}
	public void setReqt_cost_cntr(String reqt_cost_cntr) {
		this.reqt_cost_cntr = reqt_cost_cntr;
	}
	public String getUsed_cost_cntr() {
		return used_cost_cntr;
	}
	public void setUsed_cost_cntr(String used_cost_cntr) {
		this.used_cost_cntr = used_cost_cntr;
	}
	public String getReqt_name() {
		return reqt_name;
	}
	public void setReqt_name(String reqt_name) {
		this.reqt_name = reqt_name;
	}
	public String getRele_indi() {
		return rele_indi;
	}
	public void setRele_indi(String rele_indi) {
		this.rele_indi = rele_indi;
	}
	public String getWrit_date() {
		return writ_date;
	}
	public void setWrit_date(String writ_date) {
		this.writ_date = writ_date;
	}
	public String getChng_date() {
		return chng_date;
	}
	public void setChng_date(String chng_date) {
		this.chng_date = chng_date;
	}
	public String getRele_date() {
		return rele_date;
	}
	public void setRele_date(String rele_date) {
		this.rele_date = rele_date;
	}
	public String getPrch_reqt_no() {
		return prch_reqt_no;
	}
	public void setPrch_reqt_no(String prch_reqt_no) {
		this.prch_reqt_no = prch_reqt_no;
	}
	public String getDoc_date() {
		return doc_date;
	}
	public void setDoc_date(String doc_date) {
		this.doc_date = doc_date;
	}
	public String getCheck_trns() {
		return check_trns;
	}
	public void setCheck_trns(String check_trns) {
		this.check_trns = check_trns;
	}
	public String getCheck_use() {
		return check_use;
	}
	public void setCheck_use(String check_use) {
		this.check_use = check_use;
	}
	public String getUsed_cost_cntr_name() {
		return used_cost_cntr_name;
	}
	public void setUsed_cost_cntr_name(String used_cost_cntr_name) {
		this.used_cost_cntr_name = used_cost_cntr_name;
	}
	public String getPost_no() {
		return post_no;
	}
	public void setPost_no(String post_no) {
		this.post_no = post_no;
	}
	public String getRef_no() {
		return ref_no;
	}
	public void setRef_no(String ref_no) {
		this.ref_no = ref_no;
	}
	public String getReal_emp_no() {
		return real_emp_no;
	}
	public void setReal_emp_no(String real_emp_no) {
		this.real_emp_no = real_emp_no;
	}
	public String getReal_emp_name() {
		return real_emp_name;
	}
	public void setReal_emp_name(String real_emp_name) {
		this.real_emp_name = real_emp_name;
	}
	public String getLgort() {
		return lgort;
	}
	public void setLgort(String lgort) {
		this.lgort = lgort;
	}

}
