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

function getPositions() {

	var output = {
		results: []
	};
	var connection = $.db.getConnection();

	try {
		var qryGetPosition = 'SELECT * FROM "MOBI"."MST_POSITION"';
		var pstmtGetPosition = connection.prepareStatement(qryGetPosition);

		var rsGetPosition = pstmtGetPosition.execute();

		connection.commit();
		while (rsGetPosition.next()) {
			var record = {};
			record.POSITIONID = rsGetPosition.getString(1);
			record.POSITIONNAME = rsGetPosition.getString(2);
			record.SOFTDEL = rsGetPosition.getString(3);
			record.CREATEBY = rsGetPosition.getString(4);
			record.CREATEDATE = rsGetPosition.getString(5);
			record.MODIFIEDBY = rsGetPosition.getString(6);
			record.MODIFIEDDATE = rsGetPosition.getString(7);
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
 * To fetch a position from position master on the behalf of input position name.
 * @Param {String} countryCode for search
 * @Param [] output to put the data in it
 * @returns {output} Array of country record
 */
function getPosition() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	var positionName = $.request.parameters.get('positionName');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_POSITION"(?,?,?,?,?,?,?,?);';
		var pstmtCallPro = connection.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, positionName);
		pstmtCallPro.setInteger(3, 0);
		pstmtCallPro.setString(4, 'ADMIN');
		pstmtCallPro.setString(5, dateFunction());
		pstmtCallPro.setString(6, ' ');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		connection.commit();
		while (rCallPro.next()) {
			var record = {};
			record.LOCATION_ID = rCallPro.getString(1);
			record.LOCATION_NAME = rCallPro.getString(2);
			record.SOFT_DEL = rCallPro.getString(3);
			record.CREATE_BY = rCallPro.getString(4);
			record.CREATE_DATE = rCallPro.getString(5);
			record.MODIFIED_BY = rCallPro.getString(6);
			record.MODIFIED_DATE = rCallPro.getString(7);
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

function addPosition() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var positionName = $.request.parameters.get('positionName');

	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MST_POSITION"(?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, positionName);
		//	pstmtCallPro.setInteger(2, parseInt(roleId,10));
		//	pstmtCallPro.setInteger(3, parseInt(locationId,10));
		pstmtCallPro.setString(3, '0');
		pstmtCallPro.setString(4, 'null');
		pstmtCallPro.setString(5, dateFunction());
		pstmtCallPro.setString(6, 'null');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, 'INSERT');
		pstmtCallPro.execute();
		pstmtCallPro.getResultSet();
		conn.commit();

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

function updatePosition() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var positionIdDelPosition = $.request.parameters.get('positionIdDelPosition');
	var locationNameEditLocation = $.request.parameters.get('locationNameEditLocation');
	if (positionIdDelPosition === undefined || positionIdDelPosition === null || positionIdDelPosition === '') {
		positionIdDelPosition = 0;
	}
	if (locationNameEditLocation === undefined || locationNameEditLocation === null || locationNameEditLocation === '') {
		locationNameEditLocation = 0;
	}

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_POSITION"(?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(positionIdDelPosition, 10));
		pstmtUpdCallPro.setString(2, locationNameEditLocation);
		pstmtUpdCallPro.setString(3, '0');
		pstmtUpdCallPro.setString(4, 'ADMIN');
		pstmtUpdCallPro.setString(5, dateFunction());
		pstmtUpdCallPro.setString(6, ' ');
		pstmtUpdCallPro.setString(7, dateFunction());
		pstmtUpdCallPro.setString(8, 'UPDATE');
		pstmtUpdCallPro.execute();
		var rsUpdCallPro = pstmtUpdCallPro.getParameterMetaData();
		conn.commit();

		if (rsUpdCallPro.getParameterCount() > 0) {
			record.status = 0;
			record.message = 'Success';
			Output.results.push(record);

		} else {
			record.status = 1;
			record.message = 'failed';
			Output.results.push(record);

		}

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

function deletePosition() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var positionIdDelPosition = $.request.parameters.get('positionIdDelPosition');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_POSITION"(?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(positionIdDelPosition, 10));
		pstmtUpdCallPro.setString(2, ' ');
		pstmtUpdCallPro.setString(3, '1');
		pstmtUpdCallPro.setString(4, 'ADMIN');
		pstmtUpdCallPro.setString(5, dateFunction());
		pstmtUpdCallPro.setString(6, ' ');
		pstmtUpdCallPro.setString(7, dateFunction());
		pstmtUpdCallPro.setString(8, 'DELETE');
		pstmtUpdCallPro.execute();
		var rsUpdCallPro = pstmtUpdCallPro.getParameterMetaData();
		conn.commit();

		if (rsUpdCallPro.getParameterCount() > 0) {
			record.status = 0;
			record.message = 'Success';
			Output.results.push(record);

		} else {
			record.status = 1;
			record.message = 'failed';
			Output.results.push(record);

		}

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

	case "getPositions":
		getPositions();
		break;
	case "getPosition":
		getPosition();
		break;
	case "addPosition":
		addPosition();
		break;
	case "updatePosition":
		updatePosition();
		break;
	case "deletePosition":
		deletePosition();
		break;

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}