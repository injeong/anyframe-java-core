﻿//XJS=comForm.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        //-------------------------------------------------------------------------------------------------
        // Form Onload 함수
        //-------------------------------------------------------------------------------------------------

        /**
         * @class Form Load 시 공통 기능 처리
         * @param obj :열린 화면 객체
         * @return None
         */  
        this.gfn_formOnLoad = function (obj)
        {
        	var objBtnFold = obj.components["btn_folding"];
        	if(!Eco.isEmpty(objBtnFold))
        	{
        		
        	}
        	return;

        	//팝업인경우
        	if(!Eco.isEmpty(obj.opener) && !Eco.isEmpty(obj.parent.popupid) )
        	{	
        		var sPopId = obj.parent.popupid;
        		var oChildFrame = application.popupframes[sPopId];

        		if(!Eco.isEmpty(oChildFrame))
        		{
        			oChildFrame.style.set_border("2 solid #3b64ab"); 
        			oChildFrame.style.set_bordertype("round 7 7");
        			oChildFrame.style.set_background("#ffffff");
        			oChildFrame.setFocus(); 
        		}
        	}	
        	try{
        		this.parent.fn_createExpandBtn();
        	}catch(e){}
        // 	this._gfn_formSetInit(obj);
        }

        /**
         * @class Form에 속한 컨트롤들의 초기화 처리
         * @param obj :객체
         * @return None
         */  
        this._gfn_formSetInit = function (obj)
        {
            return;
            //필요시 작성예정
            
            //전체컴포넌트 구하기
            var oComp = Eco.XComp.query(obj, "","");
            
            //컴포넌트별 설정
            for (var i = 0; i < oComp.length; i++){
        		this._gfn_setDefault(oComp[i]);
            }
        }

        /**
         * @class 화면안의 컨트롤의 default 속성을 설정한다.
         * @param obj:컨트롤 객체
         * @return None
         */  
        this._gfn_setDefault = function (obj)
        {
        	var strType = obj.toString().toUpperCase();
        	switch (strType){
        		case "[OBJECT GRID]":
        			break;
        		case "[OBJECT BUTTON]":
         			break;
        		case "[OBJECT COMBO]":
        			break;
        		case "[OBJECT EDIT]":
        			break;
        		case "[OBJECT MASKEDIT]":
        			break;
        		case "[OBJECT TEXTAREA]":
        			break;
        		case "[OBJECT CALENDAR]":
        			break;
        		case "[OBJECT RADIO]":
        			break;
        		case "[OBJECT CHECKBOX]":
        			break;
        		case "[OBJECT LISTBOX]":
        			break;
        		case "[OBJECT SPIN]":
         			break;
        		case "[OBJECT DIV]":
         			break;
        		default:
        			break;
        	}
        }

        //-------------------------------------------------------------------------------------------------
        // 팝업 함수
        //-------------------------------------------------------------------------------------------------

        /**
         * @class Alert
         * @method gfn_alert
         * @param  sMsg     		: 메시지 (문자열 또는 C R U D)
         * @return 
         */ 
        this.gfn_alert = function(code,aStr)
        {
        	return this.alert(this.gfn_msg(code, aStr));
        }

        /**
         * @class Confirm
         * @method gfn_confirm 
         * @param  sMsg     		: 메시지 (문자열 또는 C R U D)
         * @return 
         */ 
        this.gfn_confirm = function(code,aStr)
        {
        	return this.confirm(this.gfn_msg(code, aStr));
        }

        /**
         * @class 메세지 모달 팝업
         * @param  sMsg     : 메시지
         * @return 
         */  
        this.gfn_msg = function(code,aStr)
        {
        	var dsObj = application.gds_message;
        	
        	var sMessage = dsObj.lookup("CODE", code, "NAME");
        	
        	if(Eco.isEmpty(sMessage)) sMessage = code;
        	
        	if(!Eco.isEmpty(aStr)) sMessage = this.convertMessage(sMessage, aStr);
        	
        	return sMessage;
        }

        this.convertMessage = function(msg,values) {
            return msg.replace(/\{(\d+)\}/g, function() {
                return values[arguments[1]];
            });
        };

        /**
         * @class 팝업 오픈 실행 함수
         * @param sPopupId	: Popup Form의 ID
         * @param sUrl 		: Popup Form  URL
         * @param oArg 		: Popup Form으로 전달될 Argument
         * @param sOption 	: Popup Form Left Position
         * @param sPopupCallback : Popup callback함수
         * @return 
         */  
        this.gfn_popup = function (sPopupId,sUrl,oArg,oOption,sPopupCallback)
        {
        	if(Eco.isEmpty(oArg)) oArg = {};
        	if(Eco.isEmpty(oOption)) oOption = {};
        	
        	var nLeft = -1;
        	var nTop = -1;
        	var nWidth = 1;
        	var nHeight = 1;
        	var bShowTitle = true;	
        	var bShowStatus = false;	
        	var bModeless = false;
        	var bLayered = true;
        	var nOpacity = 100;
        	var bAutoSize = false;
        	var bResizable = false;	
        	var sTitleText = "";
        		
        	//option 속성설정 : top, left, width, height, title, titletext, status, modeless, layered, opacity, autosize, resizable
        	if(!Eco.isEmpty(oOption.left)) nLeft = oOption.left;
        	if(!Eco.isEmpty(oOption.top)) nTop = oOption.top;
        	if(!Eco.isEmpty(oOption.width)) nWidth = oOption.width;
        	if(!Eco.isEmpty(oOption.height)) nHeight = oOption.height;
        	if(!Eco.isEmpty(oOption.title)) bShowTitle = oOption.title;	
        	if(!Eco.isEmpty(oOption.status)) bShowStatus = oOption.status;	
        	if(!Eco.isEmpty(oOption.modeless)) bModeless = oOption.modeless;
        	if(!Eco.isEmpty(oOption.layered)) bLayered = oOption.layered;
        	if(!Eco.isEmpty(oOption.opacity)) nOpacity = oOption.opacity;
        	if(!Eco.isEmpty(oOption.autosize)) bAutoSize = oOption.autosize;
        	if(!Eco.isEmpty(oOption.resizable)) bResizable = oOption.resizable;	
        	if(!Eco.isEmpty(oOption.titletext)) sTitleText = oOption.titletext;
        		
        	if (bShowTitle == true || bShowTitle == "true"){
        		nHeight += 29;
        	}	
        	
        	var sOpenalign = "";	
        	if (nLeft == -1 && nTop == -1){
        		sOpenalign = "center middle";
                nLeft   = (application.mainframe.width/2) - Math.round(nWidth/2);
        	    nTop    = (application.mainframe.height/2) - Math.round(nHeight/2);
        	}
        	
        	var objParentFrame = this.getOwnerFrame();
        	
        	//Modal, Modeless 콜백함수 호출을 위한 파라미터 추가	
        	oArg._popupid = sPopupId;
        	oArg._callback = sPopupCallback;
         	oArg._modeless = oOption.modeless;
         	
         	//Modeless Open
            if (bModeless == true || bModeless == "true")
            {		
        		var oChildFrame = application.popupframes[sPopupId];
        		if(Eco.isEmpty(oChildFrame))
        		{
        			var sOpenStyle = "showtitlebar=true showstatusbar=false autosize=false resizable="+bResizable;        
        			oArg.popupid = sPopupId;
        			//application.open(sPopupId,sUrl,objParentFrame,oArg,sOpenStyle,nLeft, nTop, nWidth, nHeight,this);
        			application.open(sPopupId, sUrl, null, oArg, sOpenStyle, nLeft, nTop, nWidth, nHeight, this);
        		}
        		else
        		{
        			oChildFrame.setFocus();
        		}        
            } 
            //Modal Open
            else 
            {    
        		newChild = new nexacro.ChildFrame;
        		newChild.init(sPopupId,"absolute", nLeft, nTop, nWidth, nHeight, null, null, sUrl);
        		
        		newChild.set_dragmovetype("all");
        		newChild.set_showtitlebar(bShowTitle);
        		newChild.set_autosize(bAutoSize);
        		newChild.set_resizable(bResizable);
        		newChild.set_titletext(sTitleText);
        		newChild.set_showstatusbar(bShowStatus);
        		newChild.set_openalign(sOpenalign);
        		newChild.set_layered(bLayered);
        		newChild.set_showcascadetitletext("false");
        		
        // 		newChild.style.set_border("2 solid #3b64ab");
        // 		newChild.style.set_bordertype("round 7 7");
        // 		newChild.style.set_background("#ffffff");
        		
        		newChild.style.set_opacity(nOpacity);
        		newChild.showModal(objParentFrame, oArg, this, null, true);
            }
        }

        //팝업종료
        this.gfn_closePopup = function(objForm,oRtn)
        {
        	var sPopupId = objForm.parent._popupid;
        	var sCallback = objForm.parent._callback;
        	var bModeless = objForm.parent._modeless;
        	
        	objForm.opener[sCallback].call(objForm, sPopupId, oRtn);
        	
        	objForm.close();
        }

        //-------------------------------------------------------------------------------------------------
        // 공통코드 함수
        //-------------------------------------------------------------------------------------------------
        /**
         * @class 공통코드콤보설정(Combo/Grid)
         * @param codeParam  
        		group          : 공통코드 group code
        		dataset        : 데이타셋 명
        		component         : bind 대상 obj ( combo, radio, grid )
        		selecttype    : A("전체"),S("선택"),N("")
        		bindcolumn  : grid column
        		edittype        : grid edittype 
        		direction   : radio 컴포넌트 방향(horizontal or vertical
        		
        		sortcolumn    : 공통코드 sort column
        		sorttype      : asc/desc
        		filterstring  : 데이타셋 필터링		
         * @return N/A
         */ 
        this.gfn_getCommonCode = function(codeParam,dsObj)
        {
        	var param = codeParam;
        	
        	if(Eco.isEmpty(dsObj)) dsObj = application.gds_commcode;
        	
        	dsObj.set_enableevent(false);
        	
        	var group, dsInner, dsInnerNm, datacolumn, selecttype, bindcolumn, edittype, align, sortcolumn, sorttype, filterstring, direction;
        	var oComponent;
        	for(var i = 0; i < param.length; i++)
        	{
        		group 		= param[i].group;
        		oComponent  = param[i].component;
        		dsInnerNm 	= param[i].dataset;
        		
        		codecolumn  = param[i].codecolumn==undefined ? "CODE" : param[i].codecolumn;
        		datacolumn  = param[i].datacolumn==undefined ? "NAME" : param[i].datacolumn;
        		selecttype  = param[i].selecttype==undefined ? "" : param[i].selecttype;

        		bindcolumn  = param[i].bindcolumn;
        		edittype	= param[i].edittype;
        		align 		= param[i].align==undefined?"center":param[i].align;

        		sortcolumn	= param[i].sortcolumn;
        		sorttype	= param[i].sorttype==undefined ? "asc" : param[i].sorttype;
        		filterstring= param[i].filterstring==undefined ? "" : param[i].filterstring;
        		direction   = param[i].r_direction==undefined ? "horizontal" : param[i].direction;		
        		
        		//데이타셋 생성
        		dsInner = this.objects[dsInnerNm];
        		if (Eco.isEmpty(dsInner))
        		{
        			dsInner = new Dataset(dsInnerNm);
        			dsInner.name = dsInnerNm;
        			this.addChild(dsInnerNm, dsInner);
        		}
        		
        		//값복사 시작
        		if (Eco.isEmpty(filterstring))
        		{
        			dsObj.filter("GROUP.toString() == '"+group+"'");
        		}
        		else
        		{
        			dsObj.filter("GROUP.toString() == '"+group+"' && "+filterstring);
        		}
        		var nRowCnt = dsInner.copyData(dsObj,true);
        		
        		//정렬
        		if (!Eco.isEmpty(sortcolumn))
        		{
        			if (!Eco.isEmpty(sorttype))
        			{
        				sorttype = "asc";
        			}
        			objDs.keystring = "S:"+(sorttype=="asc"?"+":"-")+sortcolumn;
        			objDs.updateSortGroup();
        		}
        		
        		//초기값 설정		
        		if (!Eco.isEmpty(selecttype))
        		{
        			var sDummyName = Eco.decode(selecttype, "A", "전체", "S", "선택", "", "");
        			
        			dsInner.insertRow(0);
        			dsInner.setColumn(0, codecolumn, "");
        			dsInner.setColumn(0, datacolumn, sDummyName);
        		}
        		
        		//Combo
        		if (oComponent instanceof Combo)
        		{
        			oComponent.set_innerdataset(dsInner);
        			oComponent.set_codecolumn(codecolumn);
        			oComponent.set_datacolumn(datacolumn);
        			oComponent.set_index(0);
        		}
        		//Radio
        		else if (oComponent instanceof Radio)
        		{
        			oComponent.set_innerdataset(dsInner);
        			oComponent.set_codecolumn(codecolumn);
        			oComponent.set_datacolumn(datacolumn);
        			oComponent.set_index(0);
        			
        			if (direction == "horizontal")   oComponent.set_columncount(dsInner.rowcount);			
        			else if(direction == "vertical") oComponent.set_rowcount(dsInner.rowcount); 
        		}
        		else if (oComponent instanceof Grid)
        		{
        			var nCellIdx = oComponent.getBindCellIndex( "body", bindcolumn);

        			if (Eco.isEmpty(bindcolumn) || nCellIdx == -1)
        			{
        				continue;
        			}
        			//실제로 해당되는 컬럼 display, edit type 변경 및 Dataset 바인딩
        			oComponent.setCellProperty("body", nCellIdx, "displaytype", "combo");
        			
        			//edittype = false인경우에만 edittype = none
        			if (Eco.isEmpty(edittype) || edittype == "true")
        			{					
        				oComponent.setCellProperty("body", nCellIdx, "edittype", "combo");
        			}
        			oComponent.setCellProperty("body", nCellIdx, "combodataset", dsInner.name);
        			oComponent.setCellProperty("body", nCellIdx, "combocodecol", codecolumn);
        			oComponent.setCellProperty("body", nCellIdx, "combodatacol", datacolumn);
        			oComponent.setCellProperty("body", nCellIdx, "align", align);
        		}
        	}
        	
        	dsObj.filter("");
        	dsObj.set_enableevent(true);
        }
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
