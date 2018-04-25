function dateFunction() {
	var dp = new Date();
	var monthp = '' + (dp.getMonth() + 1);
	var dayp = '' + dp.getDate();
	var yearp = dp.getFullYear();

	if (monthp.length < 2) {
		monthp = '0' + monthp;
	}
	if (dayp.length < 2) {
		dayp = '0' + dayp;
	}
	var yyyymmddp = dayp + '.' + monthp + '.' + yearp;
	return yyyymmddp;
}
/**
 * To delete any state on the behalf of state id.
 * @Param {String} state id as an input.
 * @return {output} success or failure.
 */
function deleteState() {

}

/**
 * To Update any state on the behalf of state id.
 * @Param {String} state id as an input.
 * @return {output} success or failure.
 */
function updateState() {
	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var COUNTRY_CODE = $.request.parameters.get('COUNTRY_CODE');
	var STATE_CODE = $.request.parameters.get('STATE_CODE');
	var STATE_NAME = $.request.parameters.get('STATE_NAME');
	var REGION_CODE = $.request.parameters.get('REGION_CODE');
	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::State_CRUD"(?,?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setString(1, STATE_CODE);
		pstmtCallPro.setString(2, STATE_NAME);
		pstmtCallPro.setString(3, COUNTRY_CODE);
		pstmtCallPro.setString(4, REGION_CODE);
		pstmtCallPro.setString(5, '0');
		pstmtCallPro.setString(6, 'ADMIN');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, 'null');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'UPDATE');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn.commit();
		if (rCallPro > 0) {
			record.status = 1;
			record.Message = "Record Successfully Update";

		} else {
			record.status = 0;
			record.Message = "Record Successfully  not Update";
		}

		Output.results.push(record);
		conn.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
	var body = JSON.stringify(Output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

/**
 * To fetch any state on the behalf of state id.
 * @Param {String} state id as an input.
 * @return {output} row of resultset.
 */
function getState() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var SCountry = $.request.parameters.get('SCountry');
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::State_CRUD"(?,?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setString(1, 'null');
		pstmtCallPro.setString(2, 'null');
		pstmtCallPro.setString(3, SCountry);
		pstmtCallPro.setString(4, 'null');
		pstmtCallPro.setString(5, '0');
		pstmtCallPro.setString(6, 'ADMIN');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, 'null');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'SELECT1STATE');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.StateCode = rCallPro.getString(1);
			record.StateName = rCallPro.getString(2);
			record.CountryCode = rCallPro.getString(3);
			record.RegionCode = rCallPro.getString(4);
			output.results.push(record);
		}

		conn1.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

/**
 * To fetch All state on Data.
 * @return {output} row of resultset.
 */
function getStates() {
	var output = {
		results: []
	};
	var con = $.db.getConnection();
	var pstmtState = '';
	var queryState = '';
		try {

        	queryState = 'SELECT * FROM "MOBI"."MST_STATE" ';
	       	pstmtState = con.prepareStatement(queryState);
	    
	    
	   	var rsState = pstmtState.executeQuery();
    
    	while (rsState.next()) {
			var record = {};
			record.StateCode = rsState.getString(1);
			record.StateName = rsState.getString(2);
			record.CountryCode = rsState.getString(3);
			record.RegionCode = rsState.getString(4);
			output.results.push(record);
		}

		con.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

/**
 * To fetch All state for a region.
 * @return {output} row of resultset.
 */
function getRegionStates() {
	var output = {
		results: []
	};
	var con = $.db.getConnection();
	var regionCode = $.request.parameters.get('regionCode');
	var pstmtState = '';
	var queryState = '';
		try {

			queryState = 'SELECT * FROM  "MOBI"."MST_STATE" WHERE REGION_CODE=?';
			pstmtState = con.prepareStatement(queryState);
			pstmtState.setString(1, regionCode);
	
	   	var rsState = pstmtState.executeQuery();
    
    	while (rsState.next()) {
			var record = {};
			record.StateCode = rsState.getString(1);
			record.StateName = rsState.getString(2);
			record.CountryCode = rsState.getString(3);
			record.RegionCode = rsState.getString(4);
			output.results.push(record);
		}

		con.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

/**
 * To fetch All state for a country.
 * @return {output} row of resultset.
 */
function getCountryStates() {
	var output = {
		results: []
	};
	var con = $.db.getConnection();
	var countryCode = $.request.parameters.get('countryCode');
	var pstmtState = '';
	var queryState = '';
		try {

			queryState = 'SELECT * FROM  "MOBI"."MST_STATE" WHERE COUNTRY_CODE=?';
			pstmtState = con.prepareStatement(queryState);
			pstmtState.setString(1, countryCode);
	
	   	var rsState = pstmtState.executeQuery();
    
    	while (rsState.next()) {
			var record = {};
			record.StateCode = rsState.getString(1);
			record.StateName = rsState.getString(2);
			record.CountryCode = rsState.getString(3);
			record.RegionCode = rsState.getString(4);
			output.results.push(record);
		}

		con.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

/**
 * To add State into State master table.
 * @Param {COUNTRY_CODE, STATE_CODE, STATE_NAME,REGION_CODE} string variable.
 * @return {String} integer.
 */
function addState() {

	var record;
	var Output = {
		results: []
	};
	var conn = $.db.getConnection();
	var COUNTRY_CODE = $.request.parameters.get('COUNTRY_CODE');
	var STATE_CODE = $.request.parameters.get('STATE_CODE');
	var STATE_NAME = $.request.parameters.get('STATE_NAME');
	var REGION_CODE = $.request.parameters.get('REGION_CODE');
	try {
		record = {};
		var queryselect = 'select * from "MOBI"."MST_STATE" where COUNTRY_CODE=? and STATE_CODE=?';
		var paramSelect = conn.prepareStatement(queryselect);
		paramSelect.setString(1, COUNTRY_CODE);
		paramSelect.setString(2, STATE_CODE);
		var rsSelect = paramSelect.executeQuery();
		if (rsSelect.next()) {
			record.status = 0;
			record.Message = "Record  Already  inserted";
		} else {
			var CallPro = 'call "MOBI"."MobiProcedure::State_CRUD"(?,?,?,?,?,?,?,?,?,?)';
			var pstmtCallPro = conn.prepareCall(CallPro);
			pstmtCallPro.setString(1, STATE_CODE);
			pstmtCallPro.setString(2, STATE_NAME);
			pstmtCallPro.setString(3, COUNTRY_CODE);
			pstmtCallPro.setString(4, REGION_CODE);
			pstmtCallPro.setString(5, '0');
			pstmtCallPro.setString(6, 'ADMIN');
			pstmtCallPro.setString(7, dateFunction());
			pstmtCallPro.setString(8, 'null');
			pstmtCallPro.setString(9, dateFunction());
			pstmtCallPro.setString(10, 'INSERT');
			pstmtCallPro.execute();
			var rCallPro = pstmtCallPro.getResultSet();
			conn.commit();

			if (rCallPro > 0) {
				record.status = 1;
				record.Message = "Record Successfully inserted";

			} else {
				record.status = 0;
				record.Message = "Record Successfully  not inserted";
			}
		}

		Output.results.push(record);
		conn.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
	var body = JSON.stringify(Output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

/**
 * To fetch any District, Country and state on the behalf of StateCode.
 * @Param {String} state id as an input.
 * @return {output} row of resultset.
 */
function getDistrictByStateCountry() {
	var output = {
		results: []
	};
	var conn = $.db.getConnection();
	var record;
	var StateCode = $.request.parameters.get('StateCode');
	try {
		var query =
			'select md.DISTRICT_CODE,md.DISTRICT_NAME,ms.STATE_CODE,ms.REGION_CODE,ms.COUNTRY_CODE  from "MOBI"."MST_DISTRICT" as md inner join "MOBI"."MST_STATE" as ms on md.STATE_CODE = ms.STATE_CODE inner join "MOBI"."MST_COUNTRY" as cm on ms.COUNTRY_CODE = cm.COUNTRY_CODE where md.STATE_CODE = ? ';
		var pstmt = conn.prepareStatement(query);
		pstmt.setString(1, StateCode);
		var rs = pstmt.executeQuery();
		conn.commit();
		while (rs.next()) {
			record = {};
			record.DistrictCode = rs.getString(1);
			record.DistrictName = rs.getString(2);
			record.StateCode = rs.getString(3);
			record.ZoneCode = rs.getString(5);
			record.CountryCode = rs.getString(4);
			output.results.push(record);
		}
		conn.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}
var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

	case "getStates":
		getStates();
		break;
	case "getState":
		getState();
		break;
	case "getRegionStates":
	    getRegionStates();
	    break;
	case "getCountryStates":
	    getCountryStates();
	    break;
	case "addState":
		addState();
		break;
	case "updateState":
		updateState();
		break;
	case "getDistrictByStateCountry":
		getDistrictByStateCountry();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}