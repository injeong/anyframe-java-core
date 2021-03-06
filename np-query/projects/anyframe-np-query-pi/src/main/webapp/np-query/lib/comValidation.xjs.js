﻿//XJS=comValidation.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        /**
         * @class 유효성체크(Validation)
         * @param oValid{Array} : validation Object 배열
         * component
         * title
         * column
         * @return N/A
         */
        this.gfn_validation = function(oValidObjList)
        {
        	if(Eco.isEmpty(oValidObjList)) return false;
        	
        	var oValidObj;
        	
        	//컴포넌트 Object 목록체크
        	if(Eco.isArray(oValidObjList))
        	{		
        		for(var i = 0; i < oValidObjList.length; i++)
        		{			
        			oValidObj = oValidObjList[i];
        			if(!this._gfn_checkValid(oValidObj))
        			{
        				return false;
        			}
        		}
        	}

        	return true;
        }

        //유효성체크(Validation)
        this._gfn_checkValid = function(oValidObj)
        {
        	var oComp = oValidObj.component;
        	var sComp = oComp.toString();
        	var sValue, sTitle, sRtn;
        	
        	if(oComp instanceof Div || oComp instanceof Tab || oComp instanceof Tabpage)
        	{	
        		trace(sComp + " 은 체크가 불가능한 컴포넌트입니다.");
        		return false;
        	}

        	if(oComp instanceof Grid)
        	{
        		var objBindDs = this.objects[oComp.binddataset];
        		var nCellIdx = -1;
        		var sColumn = oValidObj.bindcolumn;
        		
        		if(Eco.isEmpty(sColumn))
        		{
        			trace("체크할 컬럼정보가 없습니다.");
        			return false;
        		}
        		
        		for(var i = 0; i < objBindDs.rowcount; i++)
        		{
        			nCellIdx = oComp.getBindCellIndex("body", sColumn);
        			
        			//해당컬럼을 에디트 가능한 경우에만 체크
        // 			if(oComp.getCellProperty("body", nCellIdx, "edittype") == "none")
        // 			{
        // 				trace(sColumn + " 의 edittype = none 상태");
        // 				continue;
        // 			}			
        			
        			sValue = objBindDs.getColumn(i, sColumn);
        			
        			sTitle = oValidObj.title;
        			if(Eco.isEmpty(oValidObj.title))
        			{
        				sTitle = oComp.getCellProperty("head", nCellIdx, "text");
        			}			
        			
        			if(Eco.isEmpty(sValue))
        			{				
        				//해당 셀로 커서이동
        				oComp.setFocus();
        				oComp.setCellPos(nCellIdx);
        				objBindDs.set_rowposition(i);
        				this.gfn_alert("validate", [sTitle]);
        				return false;
        			}
        		}	
        	}
        	else
        	{
        		//에디트가 불가능한 상태인 경우 체크하지않음
        		if(oComp.readonly == true || oComp.enable == false)
        		{
        			trace(sComp+"은 readonly = true or enable = false 상태");
        			return true;
        		}
        		
        		if(oValidObj.title instanceof Static) sTitle = oValidObj.title.text;
        		else sTitle = oValidObj.title;
        		
        		sValue = oComp.value;
        		
        		if(Eco.isEmpty(sValue))
        		{
        			oComp.setFocus();
        			this.gfn_alert("validate", [sTitle]);
        			return false;
        		}
        	}			
        	
        	return true;
        }

        
        /**
         * @class 주민등록번호 확인
         * @param rsrno - 주민등록번호 13자리
         * @return N/A
         */
        this.gfn_isResidentNo = function(rsrno)
        {
        	var juminNo = rsrno.replace("-", "");
        	juminNo = juminNo.trim();
        	
        	if (!nexacro.isNumeric(juminNo) || juminNo.length != 13){
        		return false;
        	}
        	
        	var juminChkDgt = [2,3,4,5,6,7,8,9,2,3,4,5];
        	var fNum = new Number();
        	var lNum = new Number();
        	var iSum = new Number();
        	var yy, lnumf;
        	
        	fNum = juminNo.substr(0, 6).toString();
        	lNum = juminNo.substr(6).toString();
        	lnumf = lNum.substr(0,1);
        	
        	if (lnumf == '1' ||  lnumf == '2' ||  lnumf == '5' ||  lnumf == '6'){
        		yy  = '19';
        	} else if (lnumf == '3' ||  lnumf == '4' ||  lnumf == '7' ||  lnumf == '8'){
        		yy  = '20';
        	} else if (lnumf == '9' ||  lnumf == '0') {
        		yy  = '18';
        	} else {
        		return false;
        	}
        	
        	if (!Eco.isStringDate(yy + fNum)){
        		return false;
        	}
        	
        	var bForeignerYN = "N";
        	if (lNum.substr(0,1) == '5' || lNum.substr(0,1) == '6' || lNum.substr(0,1) == '7' ||  lNum.substr(0,1) == '8'){
        		bForeignerYN = "Y";
        	}
        	
        	for (var ix=0; ix<12; ix++){
        		iSum += (parseInt(juminNo.substr(ix, 1)) * juminChkDgt[ix]);
        	}
        	
        	iSum = 11 - (iSum%11);
        	iSum = iSum % 10;
        	
        	if (bForeignerYN == "Y"){
        		iSum += 2;
        	}
        	
        	if (iSum != (parseInt(juminNo.substr(12, 1)))){
        		return false;
        	}
        	
        	return true;
        }

        /**
         * @class 사업자등록번호 확인
         * @param compRegNo - 사업자등록번호
         * @return N/A
         */
        this.gfn_isBusinessNo = function(compRegNo)
        {
        	var compNo = compRegNo.replace("-", "");
        	compNo = compNo.trim();
        	
        	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
        	var i, Sum=0, c2, remander;
        	
        	if (compNo.length != 10){
        		return false;
        	}
        	
        	for (i=0; i<=7; i++){
        		Sum += checkID[i] * compNo.charAt(i);
        	}
        	
        	c2 = "0" + (checkID[8] * compNo.charAt(8));
        	c2 = c2.substring(c2.length - 2, c2.length);
        	
        	Sum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
        	remander = (10 - (Sum % 10)) % 10;
        	
        	if (Math.floor(compNo.charAt(9)) != remander){
        		return false;
        	}
        	
        	return true;
        }

        /**
         * @class 법인등록번호 확인
         * @param corpRegNo - 법인등록번호
         * @return N/A
         */
        this.gfn_isCorporateNo = function(corpRegNo)
        {
        	var corpNo = corpRegNo.replace("-", "");
        	corpNo = corpNo.trim();
        	if (corpNo.length != 13){
        		return false;
        	}
        	
        	var i = 0;
            // Check Sum 코드의 유효성 검사
            var buf = new Array(13);
            for (i = 0; i < 13; i++) buf[i] = parseInt(corpNo.charAt(i));
         
            var multipliers = [1,2,1,2,1,2,1,2,1,2,1,2];
            for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

            if(10 - sum.toString().substring(sum.toString().length*1 - 1,sum.toString().length*1)*1 != buf[12]) return false;
         
            return true;
        }

        /**
         * @class 이메일 주소 체크
         * @param email - 이메일 value
         * @return Boolean
         */
        this.gfn_isEmail = function(email)
        {
        	if (Eco.isEmpty(email)){
        		return false;
        	}
        	
        	var match = email.match(/^(\".*\"|[A-Za-z0-9_-]([A-Za-z0-9_-]|[\+\.])*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z0-9][A-Za-z0-9_-]*(\.[A-Za-z0-9][A-Za-z0-9_-]*)+)$/);
        	if (match == null){
        		return false;
        	} else {
        		return true;
        	}
        }

        /**
         * @class 특수문자가 있는지 체크(영자,한글,숫자,간격 문자 이외의 문자로 임의 지정)
         * @param value 체크 value
         * @return Boolean
         */
        this.gfn_isSpecialChar = function(value)
        {
        	if (Eco.isEmpty(value)){
        		return false;
        	}
        	
        	//var pattern = new RegExp('[^-가-힣a-zA-Z0-9./ ,.:;!&()]');
        	var pattern = new RegExp('[^-가-힣a-zA-Z0-9 ]');
            if (pattern.exec(value) != null){
                return false;
        	}
        	
        	return true;
        }

        /**
         * @class 핸드폰 체크
         * @param phone 핸드폰 value
         * @return Boolean
         */
        this.gfn_isCellPhoneNo = function(phone)
        {
        	if (Eco.isEmpty(phone)){
        		return false;
        	}
        	
        	var match = phone.match(/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/);
        	if (match == null){
        		return false;
        	} else {
        		return true;
        	}
        }

        /**
         * @class 일반전화번호 체크
         * @param phone 일반전화번호 value
         * @return Boolean
         */
        this.gfn_isPhoneNo = function(phone)
        {
        	if (Eco.isEmpty(phone)){
        		return false;
        	}
        	var match = phone.match(/^\d{2,3}-?\d{3,4}-?\d{4}$/);
        	if (match == null){
        		return false;
        	} else {
        		return true;
        	}
        }

        /**
         * @class 국제전화번호 체크
         * @param phone 국제전화번호 value
         * @return Boolean
         */
        this.gfn_isInterPhoneNo = function(phone)
        {
        	if (Eco.isEmpty(phone)){
        		return false;
        	}
        	
        	var match = phone.match(/^\+82\d{1,2}-?\d{3,4}-?\d{4}$/);
        	if (match == null){
        		return false;
        	} else {
        		return true;
        	}
        }

        /**
         * @class 시분 체크
        	
         * @return Boolean
         */
        this.gfn_isTimeHHmm = function(value)
        {
        	if (Eco.isEmpty(value)){
        		return false;
        	}
        	
            if (value.trim().toString().length != 4){
                return false;
            }
            
            var nHH = nexacro.toNumber(value.toString().substr(0,2));
            var nMM = nexacro.toNumber(value.toString().substr(2,2));
               
            if (Eco.isEmpty(nHH)||Eco.isEmpty(nMM)){
        		return false;
            }
            
            if (nHH>23||nHH<0){
        		return false;
            }
            
            if (nMM>59||nMM<0){
        		return false;
            }
            
            return true;
        }

        /**
         * @class 시분초 체크
         * @param value 시분초 value
         * @return Boolean
         */
        this.gfn_isTimeHHmmss = function(value)
        {
        	if (Eco.isEmpty(value)){
        		return false;
        	}
        	
            if (value.trim().toString().length != 6){
                return false;
            }
            
            var nHH = nexacro.toNumber(value.toString().substr(0,2));
            var nMM = nexacro.toNumber(value.toString().substr(2,2));
            var nSS = nexacro.toNumber(value.toString().substr(4,2));

            if (Eco.isEmpty(nHH)||Eco.isEmpty(nMM)||Eco.isEmpty(nSS)){
        		return false;
            }
            
            if (nHH>23||nHH<0){
        		return false;
            }
            
            if (nMM>59||nMM<0){
        		return false;
            }
            
            if (nSS>59||nSS<0){
        		return false;
            }
            
            return true;
        }

        		
        /**
         * @class 주민등록번호로 성별을 Return 한다.
         * @param rsrno - 주민등록번호 13자리
         * @return string M(남자)/W(여자)/X
         */
        this.gfn_getSex = function(rsrno)
        {
        	if (!this.gfn_isRsrNo(rsrno)){
        		return false;
        	}
        	
        	var vSexGb = rsrno.substr(6,1);

        	if (vSexGb == '1' || vSexGb == '3' || vSexGb == '5' || vSexGb == '7'){
        		return "M";	// 남자
        	} else if (vSexGb == '2' || vSexGb == '4' || vSexGb == '6' || vSexGb == '8'){
        		return "W";	// 여자
        	} else {
        		return "X";
        	}
        }

        /**
         * @class 주민등록번호 뒷 첫번째 자리로 년대를 return 한다
         * @param rsrno - 주민등록번호 13자리
         * @return string 년도 2자리
         */
        this.gfn_getBirthYear = function(rsrno)
        {
        	if (!this.gfn_isRsrNo(rsrno)){
        		return false;
        	}
        	
        	// ## 주민등록은 100년 단위로 갱신
        	// 식별번호 9 : 1800년도부터 1899년에 태어난 남성
        	// 식별번호 0 : 1800년도부터 1899년에 태어난 여성	
        	// 식별번호 1 : 1900년도부터 1999년에 태어난 남성
        	// 식별번호 2 : 1900년도부터 1999년에 태어난 여성	
        	// 식별번호 3 : 2000년도부터 2099년에 태어난 남성
        	// 식별번호 4 : 2000년도부터 2099년에 태어난 여성	
        	// 식별번호 5 : 1900년도부터 1999년에 외국에서 태어난 남성 (귀화/체류/이중국적 남성)
        	// 식별번호 6 : 1900년도부터 1999년에 외국에서 태어난 여성 (귀화/체류/이중국적 여성)	
        	// 식별번호 7 : 2000년도부터 2099년에 외국에서 태어난 남성 (귀화/체류/이중국적 남성)
        	// 식별번호 8 : 2000년도부터 2099년에 외국에서 태어난 여성 (귀화/체류/이중국적 여성)
        	
        	var lNum = rsrno.substr(6,1);
        	if (lNum == '1' ||  lNum == '2' ||  lNum == '5' ||  lNum == '6'){
        		yy  = '19';
        	} else if (lNum == '3' ||  lNum == '4' ||  lNum == '7' ||  lNum == '8'){
        		yy  = '20';
        	} else if (lNum == '9' ||  lNum == '0'){
        		yy  = '18';
        	}
        	
        	return yy;
        }

        /**
         * @class 생년월일 또는 주민등록번호로 법적연령-만나이를 구한다.
         * @param birth - 주민등록번호 13자리
         * @param date - 생년월일
         * @return string 법적연령-만나이
         */
        this.gfn_getAge = function(birth,date)
        {
        	var year;
            var month;
            var day;

            if (birth.length == 13){
            	if (!this.gfn_isRsrNo(birth)){
        			return false;
        		}
            	
                var vBefor = this.gfn_getBirthYear(birth);
                if (vBefor == false){
        			return false;
        		}
        		
                birth = vBefor + birth;
                year = parseInt(birth.substr(0,4),10);
                month = parseInt(birth.substr(4,2),10);
                day = parseInt(birth.substr(6,2),10);
            } else if (birth.length == 8){
                year = parseInt(birth.substr(0,4),10);
                month = parseInt(birth.substr(4,2),10);
                day = parseInt(birth.substr(6,2),10);
        		
        		if (!Eco.isStringDate(birth)){
                    return false;
                }
            } else {
                return false;
            }
        	
            if (!Eco.isStringDate(date)){
                return false;
            }
        	
            var dateYear = parseInt(date.substr(0,4),10);
            var dateMonth = parseInt(date.substr(4,2),10);
            var dateDay = parseInt(date.substr(6,2),10);
            var age = dateYear - year;
        	
            if (month > dateMonth){
                age = age - 1;
            } else if (month == dateMonth){
                if (day > dateDay){
                    age = age - 1;
                }
            }
        	
            if (age < 0){
                age = 0;
            }
        	
            return age;
        }

        /**
         * @class 문자열이 알파벳(a~z, A~Z)만으로 구성되어 있는지 체크
         * @param sVal: 체크할 문자열 (예 : "aAzZ")
         * @return - 알파벳만 있는경우 = true
         *		   - 알파벳이 아닌 글자가 하나라도 있는 경우 = false
         */  
        this.gfn_isAlpha = function (sVal)
        {
        	if (Eco.isEmpty(sVal)){
        		return false;
        	}
        	
        	if (sVal.search("[^A-Za-z]") >= 0){
        		return false;
        	} else {
        		return true;
        	}
        }

        /**
         * @class 문자열이 알파벳(a~z, A~Z), 숫자만으로 구성되어 있는지 체크
         * @param sVal: 체크할 문자열 (예 : "aAzZ09")
         * @return - 알파벳, 숫자만 있는경우 = true
         *		   - 알파벳, 숫자가 아닌 글자가 하나라도 있는 경우 = false
         */  
        this.gfn_isAlNum = function (sVal)
        {
        	if (Eco.isEmpty(sVal)){
        		return false;
        	}
        	
        	if (sVal.search("[^A-Za-z0-9]") >= 0){
        		return false;
        	} else {
        		return true;
        	}
        }

        /**
         * @class 문자열이 한글로만 구성되어 있는지 체크
         * @param sVal: 체크할 문자열 (예 : "가나다")
         * @return - 한글만 있는경우 = true
         *		   - 한글이 아닌 글자가 하나라도 있는 경우 = false
         */  
        this.gfn_isKor = function (sVal)
        {
        	if (Eco.isEmpty(sVal)){
        		return false;
        	}
        	for (var i=0; i<sVal.length; i++){
        		if (!((sVal.charCodeAt(i) > 0x3130 && sVal.charCodeAt(i) < 0x318F) 
        		   || (sVal.charCodeAt(i) >= 0xAC00 && sVal.charCodeAt(i) <= 0xD7A3))){
        			return false;
        		}
        	}
        	return true;
        }
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
