/**
 * To get the current date in db format.
 * @Param {String} output.
 * @return {String} yyyymmddp  .
 */ 
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
 * To delete any region from region master
 * @Param {String} region id for deletion.
 * @returns {output} Array of resultset..
 */
function deleteRegion() {

}

/**
 * To fetch all the region from region master
 * @returns {output} Array of resultset..
 */
function getRegions() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::GetRegion"(?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setString(1, 'null');
		pstmtCallPro.setString(2, 'null');
		pstmtCallPro.setString(3, 'null');
		pstmtCallPro.setString(4, '0');
		pstmtCallPro.setString(5, 'ADMIN');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, ' ');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'ALLREGION');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.RegionCode = rCallPro.getString(1);
			record.RegionName = rCallPro.getString(2);
			record.CountryCode = rCallPro.getString(3);
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
 * To fetch all the region from region master
 * @returns {output} Array of resultset..
 */
function getRegion() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var RCode = $.request.parameters.get('RCode');
	var RCountry = $.request.parameters.get('RCountry');
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::GetRegion"(?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setString(1, RCode);
		pstmtCallPro.setString(2, 'null');
		pstmtCallPro.setString(3, RCountry);
		pstmtCallPro.setString(4, '0');
		pstmtCallPro.setString(5, 'ADMIN');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, ' ');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.RegionCode = rCallPro.getString(1);
			record.RegionName = rCallPro.getString(2);
			record.CountryCode = rCallPro.getString(3);
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
 * To insert region into region master
 * @returns {output} Array of resultset..
 */
function addRegion() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var regionCode = $.request.parameters.get('REGION_CODE');
	var regionName = $.request.parameters.get('REGION_NAME');
	var countryCode = $.request.parameters.get('COUNTRY_CODE');

	try {
		record = {};
		var queryselect = 'select * from "MOBI"."MST_REGION" where REGION_CODE=?';
		var paramSelect = conn.prepareStatement(queryselect);
		paramSelect.setString(1, regionCode);

		var rsSelect = paramSelect.executeQuery();
		if (rsSelect.next()) {
			record.status = 0;
			record.Message = "Record  Already  inserted";
		} else {
			var CallPro = 'call "MOBI"."MobiProcedure::GetRegion"(?,?,?,?,?,?,?,?,?)';
			var pstmtCallPro = conn.prepareCall(CallPro);
			pstmtCallPro.setString(1, regionCode);
			pstmtCallPro.setString(2, regionName);
			pstmtCallPro.setString(3, countryCode);
			pstmtCallPro.setString(4, '0');
			pstmtCallPro.setString(5, 'ADMIN');
			pstmtCallPro.setString(6, dateFunction());
			pstmtCallPro.setString(7, ' ');
			pstmtCallPro.setString(8, dateFunction());
			pstmtCallPro.setString(9, 'INSERT');
			pstmtCallPro.execute();
			var rsInsert = pstmtCallPro.getResultSet();
			conn.commit();
			if (rsInsert > 0) {
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
var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

	case "getRegion":
		getRegion();
		break;
	case "addRegion":
		addRegion();
		break;
	case "getRegions":
		getRegions();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}