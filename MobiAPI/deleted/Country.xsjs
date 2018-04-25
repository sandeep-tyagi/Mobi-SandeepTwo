/**
 * To delete any country from country master
 * @Param {String} country id for deletion.
 * @returns {output} Array of resultset..
 */ 
function deleteCountry() {
    
}

/**
 * To fetch a country from country master on the behalf of input id.
 * @Param {String} country id for search.
 * @returns {output} Array of resultset..
 */
function getCountry() {
    
}

/**
 * To fetch all the region from region master
 * @returns {output} Array of resultset..
 */
function addCountry() {
    
}

/**
 * To fetch all the country from country master.
 * @return {Output} resultset.
*/ 
function getCountry1() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::GetCountry"()';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		/*pstmtCallPro.setString(1, 'C699 WR');*/
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.CountryCode = rCallPro.getString(1);
			record.CountryName = rCallPro.getString(2);
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
 * To fetch State Using Country Code.
 * @Param {String} state id as an input.
 * @return {output} row of resultset.
 */
function getStatebyCountry() {
	var output = {
		results: []
	};
	var CountryCode = $.request.parameters.get('CountryCode');
	var conn1 = $.db.getConnection();
	try {
		var Query =
			'select * from "MOBI"."MST_STATE" where COUNTRY_CODE=?';
		var pstmt = conn1.prepareStatement(Query);
		pstmt.setString(1,CountryCode);
		var r = pstmt.executeQuery();
		conn1.commit();
		while (r.next()) {
			var record = {};
			record.StateCode = r.getString(1);
			record.StateName = r.getString(2);
			record.CountryCode = r.getString(3);
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

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

	case "getCountry1":
		getCountry1();
		break;
    case "getStatebyCountry":
        getStatebyCountry();
        break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}