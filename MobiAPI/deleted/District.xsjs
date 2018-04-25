/**
 * To fetch All district.
 * @Param {String} state id as an input.
 * @return {output} row of resultset.
 */
function getDistricts() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	try {
		var Query =
			'select md.DISTRICT_CODE,md.DISTRICT_NAME,ms.STATE_CODE,ms.REGION_CODE,ms.COUNTRY_CODE  from "MOBI"."MST_DISTRICT" as md inner join "MOBI"."MST_STATE" as ms on md.STATE_CODE = ms.STATE_CODE inner join "MOBI"."MST_COUNTRY" as cm on ms.COUNTRY_CODE = cm.COUNTRY_CODE ';
		var pstmt = conn1.prepareStatement(Query);
		var r = pstmt.executeQuery();
		conn1.commit();
		while (r.next()) {
			var record = {};
			record.DistrictCode = r.getString(1);
			record.DistrictName = r.getString(2);
			record.StateCode = r.getString(3);
			record.RegionCode = r.getString(4);
			record.CountryCode = r.getString(5);
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
 * To fetch any District on the behalf of District.
 * @Param {String} state id as an input.
 * @return {output} row of resultset.
 */
function getDistrict() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var District = $.request.parameters.get('District');
	try {
		var Query =
			'select md.DISTRICT_CODE,md.DISTRICT_NAME,ms.STATE_CODE,ms.REGION_CODE,ms.COUNTRY_CODE  from "MOBI"."MST_DISTRICT" as md inner join "MOBI"."MST_STATE" as ms on md.STATE_CODE = ms.STATE_CODE inner join "MOBI"."MST_COUNTRY" as cm on ms.COUNTRY_CODE = cm.COUNTRY_CODE where DISTRICT_CODE = ?';
		var pstmt = conn1.prepareStatement(Query);
		pstmt.setString(1, District);
		var r = pstmt.executeQuery();
		conn1.commit();
		while (r.next()) {
			var record = {};
			record.DistrictCode = r.getString(1);
			record.DistrictName = r.getString(2);
			record.StateCode = r.getString(3);
			record.RegionCode = r.getString(4);
			record.CountryCode = r.getString(5);
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
 * To add District into District master table.
 * @Param {districtCode, districtName, stateCode} string variable.
 * @return {String} integer.
 */
function addDistrict() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var districtCode = $.request.parameters.get('districtCode');
	var districtName = $.request.parameters.get('districtName');
	var stateCode = $.request.parameters.get('stateCode');

	try {
		record = {};
		var queryselect = 'select * from "MOBI"."MST_DISTRICT" where STATE_CODE=? and DISTRICT_CODE=?';
		var paramSelect = conn.prepareStatement(queryselect);
		paramSelect.setString(1, stateCode);
		paramSelect.setString(2, districtCode);
		var rsSelect = paramSelect.executeQuery();
		if (rsSelect.next()) {
			record.status = 0;
			record.Message = "Record  Already  inserted";
		} else {
			var CallPro = 'call "MOBI"."MobiProcedure::District_CRUD"(?,?,?,?);';
			var pstmtCallPro = conn.prepareCall(CallPro);
			pstmtCallPro.setString(1, districtCode);
			pstmtCallPro.setString(2, districtName);
			pstmtCallPro.setString(3, stateCode);
			pstmtCallPro.setString(4, 'INSERT');
			pstmtCallPro.execute();
			var rCallPro = pstmtCallPro.getResultSet();
			conn.commit();
			if (rCallPro > 0) {
				record.status = 1;
				record.Message = "Record Successfully inserted";

			} else {
				record.status = 0;
				record.Message = "Record Successfully  inserted";
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
 * To Update any District on the behalf of districtCode.
 * @Param {String} state id as an input.
 * @return {output} success or failure.
 */
function updateDistrict() {
	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var districtCode = $.request.parameters.get('districtCode');
	var districtName = $.request.parameters.get('districtName');
	var stateCode = $.request.parameters.get('stateCode');

	try {
		record = {};
			var CallPro = 'call "MOBI"."MobiProcedure::District_CRUD"(?,?,?,?);';
			var pstmtCallPro = conn.prepareCall(CallPro);
			pstmtCallPro.setString(1, districtCode);
			pstmtCallPro.setString(2, districtName);
			pstmtCallPro.setString(3, stateCode);
			pstmtCallPro.setString(4, 'UPDATE');
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
var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

	case "getDistricts":
		getDistricts();
		break;
	case "getDistrict":
		getDistrict();
		break;
	case "addDistrict":
		addDistrict();
		break;
	case "updateDistrict":
	    updateDistrict();
	    break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}