<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/springrest/movies.html'/>">Spring REST Example 1.0.5-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
	function fncSubmit(method) {
		if(method != 'post') {
			document.movieForm._method.value=method;
			
			if(method == 'delete') {
				if(!confirmDelete('movie')) {
					return;
				}
			}
		}
		<c:if test="${empty movie.movieId}">
		document.movieForm.action = "<c:url value='/springrest/movies.html'/>";
		</c:if>
		document.movieForm.submit();
	}	
</script>    
    <div id="container">
    	<div class="cont_top">
        	<h2>
        		<c:if test="${empty movie.movieId}">
				 	<spring:message code='movie.add'/>
				 	<c:set var="readonly" value="false"/>
				</c:if>
			
				<c:if test="${not empty movie.movieId}">	
					<spring:message code='movie.update'/>
					<c:set var="readonly" value="true"/>				 
				</c:if>
			</h2>
        </div>
        <c:choose>
			<c:when test="${not empty movie.movieId}">
				<c:set var="method" value="put" />
			</c:when>
			<c:otherwise>
				<c:set var="method" value="post" />
			</c:otherwise>
		</c:choose>
        <div class="view">
        <form:form modelAttribute="movie" name="movieForm" method="${method}">
        <c:if test="${not empty movie.movieId}">
			<form:hidden path="movieId" />
		</c:if>
      		<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
            	<caption>Detail information</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                	<tr>
                    	<th><label for="title"><spring:message code="movie.title" />&nbsp;*</label></th>
                        <td><form:input path="title" cssClass="w_normal" /><form:errors path="title" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="director"><spring:message code="movie.director" />&nbsp;*</label></th>
                        <td><form:input path="director" cssClass="w_normal" /><form:errors path="director" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="genre"><spring:message code="movie.genre" />&nbsp;*</label></th>
                        <td>
                        	<form:select id="genre" path="genre.genreId">
            					<form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
				          	</form:select>
          				</td>
                    </tr>
                    <tr>
                    	<th><label for="actors"><spring:message code="movie.actors" />&nbsp;*</label></th>
                        <td><form:input path="actors" cssClass="w_normal" /><form:errors path="actors" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="runtime"><spring:message code="movie.runtime" /></label></th>
                        <td><form:input path="runtime" cssClass="w_time" />min.<form:errors path="runtime" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="releaseDate"><spring:message code="movie.releaseDate" /></label></th>
                        <td>
                        <span class="float_left margin_right5"><form:input path="releaseDate" cssClass="w_date"  maxlength="10" /></span>
                        <label for="calendar" class="float_left">
                        <a href="javascript:popUpCalendar(document.movieForm.releaseDate, 'yyyy-mm-dd');">
                        	<img id="calendar" src="<c:url value='/sample/images/btn_calendar_i.gif'/>" alt="Calendar" />
                        </a>	
                        </label></td>
                    </tr>
                    <tr>
                    	<th><label for="ticketPrice"><spring:message code="movie.ticketPrice" /></label></th>
                        <td><form:input path="ticketPrice" cssClass="w_price" /><form:errors path="ticketPrice" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="nowPlaying"><spring:message code="movie.nowPlaying" /></label></th>
                        <td><span class="float_left"><spring:message code="movie.isNowPlaying" /></span>
                        <span class="float_left margin_left5"><form:checkbox id="nowPlaying" path="nowPlaying" value="Y" /></span></td>
                    </tr>
                </tbody>
            </table>
            </form:form>
        </div><!-- // list E -->
        <div class="btncontainer_center">
        <span class="button default icon">
            <span class="list"></span>
            <a href="<c:url value='/springrest/movies.html'/>"><spring:message code="movie.button.list" /></a>
        </span>
        <c:if test="${empty movie.movieId}">
	        <span class="button default icon">
	            <span class="add"></span>
	            <a href="javascript:fncSubmit('post');"><spring:message code="movie.button.add" /></a>
	        </span>
        </c:if>
        <c:if test="${not empty movie.movieId}">
        	<span class="button default icon">
	            <span class="update"></span>
	            <a href="javascript:fncSubmit('put');"><spring:message code="movie.button.update" /></a>
	        </span>
	         <span class="button default icon">
                <span class="delete">&nbsp;</span>
                <a href="javascript:fncSubmit('delete');">Delete</a>
            </span>
            <spring:url value="/springrest/movies/{id}.xml" var="movieUrl" htmlEscape="true" >
				<spring:param name="id" value="${movie.movieId}" />
			</spring:url>
            <span class="button default icon">
                <span class="view">&nbsp;</span>
                <a href="${movieUrl}">View as XML</a>
            </span>
        </c:if>
    	</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>