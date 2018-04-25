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
 * To delete any Zone on the behalf of Zone id.
 * @Param {String} Zone id as an input.
 * @return {output} success or failure.
 */
function deleteZone() {

}

/**
 * To Update any Zone on the behalf of Zone id.
 * @Param {String} Zone id as an input.
 * @return {output} success or failure.
 */
function updateZone() {

}

/**
 * To fetch any Zone on the behalf of Zone code.
 * @Param {String} Zone id as an input.
 * @return {output} row of resultset.
 */
function getZone() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	var zone = $.request.parameters.get('zone');
	try {
		var query = 'Select ZONE_CODE ,ZONE_DESC,AREA_CODE from "MOBI"."MST_ZONE" where ZONE_CODE = ?';
		var pstmt = connection.prepareStatement(query);
		pstmt.setString(1, zone);
		var r = pstmt.executeQuery();
		connection.commit();
		while (r.next()) {
			var record = {};
			record.ZoneCode = r.getString(1);
			record.ZoneName = r.getString(2);
			record.AreaCode = r.getString(3);
			output.results.push(record);
		}
		connection.close();
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
 * To fetch All Zone .
 * @Param {String} Zone id as an input.
 * @return {output} row of resultset.
 */
function getZones() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	try {
		var query = 'Select ZONE_CODE ,ZONE_DESC,AREA_CODE from "MOBI"."MST_ZONE" ';
		var pstmt = connection.prepareStatement(query);
		var r = pstmt.executeQuery();
		connection.commit();
		while (r.next()) {
			var record = {};
			record.ZoneCode = r.getString(1);
			record.ZoneName = r.getString(2);
			record.AreaCode = r.getString(3);
			output.results.push(record);
		}
		connection.close();
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
 * To add Zone into Zone master table.
 * @Param {dataLine} string variable.
 * @return {String} integer.
 */
function addZone() {
	var output = {
		results: []
	};
	var records;
	var datasLine = $.request.parameters.get('OrderLine');
	var records = {};
	var dataLine = JSON.parse(datasLine.replace(/\\r/g, ""));

	var conn1 = $.db.getConnection();
	try {
		if (dataLine.length > 0) {
			for (var i = 0; i < dataLine.length; i++) {
				var dicLine = dataLine[i];
				var queryZone = 'select ZONE_CODE  from "MOBI"."MST_ZONE" where ZONE_CODE = ?';
				var pstmtZone = conn1.prepareStatement(queryZone);
				pstmtZone.setString(1, dicLine.ZONECODE);
				var rZone = pstmtZone.executeQuery();
				if (rZone.next()) {
					records.status = 0;
					records.message = 'Record Allready inserted!';
				} else {
					var query =
						'insert into  "MOBI"."MST_ZONE"("ZONE_CODE","ZONE_DESC","AREA_CODE") values(?,?,?)';
					var pstmt = conn1.prepareStatement(query);
					pstmt.setString(1, dicLine.ZONECODE);
					pstmt.setString(2, dicLine.ZONEDESC);
					pstmt.setString(3, dicLine.AREACODE);
					var rs = pstmt.executeUpdate();
					conn1.commit();
					records = {};
					if (rs > 0) {
						records.status = 1;
						records.message = 'Data Uploaded Sucessfully';
					} else {
						records.status = 0;
						records.message = 'Some Issues!';
					}
				}
				output.results.push(records);

			}
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

	case "getZones":
		getZones();
		break;
	case "getZone":
		getZone();
		break;
	case "addZone":
		addZone();
		break;

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}