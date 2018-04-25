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

function getMAP_ROLE_LOCATION() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var roleId = $.request.parameters.get('roleId');
	var locationId = $.request.parameters.get('locationId');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MAP_ROLE_LOCATION"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setInteger(2, parseInt(roleId, 10));
		pstmtCallPro.setInteger(3, parseInt(locationId, 10));
		pstmtCallPro.setInteger(4, 0);
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
			// 			record.ROLE_LOC_ID = rCallPro.getString(1);
			// 			record.ROLE_ID = rCallPro.getString(2);
			// 			record.LOCATION_ID = rCallPro.getString(3);
			// 			record.SOFT_DEL = rCallPro.getString(4);
			// 			record.CREATE_BY = rCallPro.getString(5);
			// 			record.CREATE_DATE = rCallPro.getString(6);
			// 			record.MODIFIED_BY = rCallPro.getString(7);
			// 			record.MODIFIED_DATE = rCallPro.getString(8);
			record.LOCATION_NAME = rCallPro.getString(1);
			record.ROLE_NAME = rCallPro.getString(2);

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

function getMAP_ROLE_LOCATIONS() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	//var roleId = $.request.parameters.get('roleId');
	//var locationId = $.request.parameters.get('locationId');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MAP_ROLE_LOCATION"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setInteger(2, 0);
		pstmtCallPro.setInteger(3, 0);
		pstmtCallPro.setInteger(4, 0);
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
			record.LOCATION_NAME = rCallPro.getString(1);
			record.ROLE_NAME = rCallPro.getString(2);
			record.ROLE_LOC_ID = rCallPro.getString(3);
			record.ROLE_ID = rCallPro.getString(4);
			record.LOCATION_ID = rCallPro.getString(5);
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

function addMapRoleLocation() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var roleId = $.request.parameters.get('roleId');
	var locationId = $.request.parameters.get('locationId');

	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MAP_ROLE_LOCATION"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setInteger(2, parseInt(roleId, 10));
		pstmtCallPro.setInteger(3, parseInt(locationId, 10));
		pstmtCallPro.setString(4, ' ');
		pstmtCallPro.setString(5, ' ');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, '');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'INSERT');
		pstmtCallPro.execute();
		record.message = pstmtCallPro.getResultSet();
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

function updateRoleLocation() {

	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var RoleIDEdit = $.request.parameters.get('RoleIDEdit');
	var RoleNameIDEdit = $.request.parameters.get('RoleNameIDEdit');
	var RoleLocIDEdit = $.request.parameters.get('RoleLocIDEdit');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MAP_ROLE_LOCATION"(?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(RoleIDEdit, 10));
		pstmtUpdCallPro.setInteger(2, parseInt(RoleNameIDEdit, 10));
		pstmtUpdCallPro.setInteger(3, parseInt(RoleLocIDEdit, 10));
		pstmtUpdCallPro.setString(4, '0');
		pstmtUpdCallPro.setString(5, 'ADMIN');
		pstmtUpdCallPro.setString(6, dateFunction());
		pstmtUpdCallPro.setString(7, ' ');
		pstmtUpdCallPro.setString(8, dateFunction());
		pstmtUpdCallPro.setString(9, 'UPDATE');
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

function deleteRoleLocation() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var roleLocId = $.request.parameters.get('roleLocId');

	try {
		var DelCallPro = 'call "MOBI"."MobiProcedure::MAP_ROLE_LOCATION"(?,?,?,?,?,?,?,?,?);';
		var pstmtDelCallPro = conn.prepareCall(DelCallPro);
		pstmtDelCallPro.setInteger(1, parseInt(roleLocId, 10));
		pstmtDelCallPro.setInteger(2, 0);
		pstmtDelCallPro.setInteger(3, 0);
		pstmtDelCallPro.setString(4, '1');
		pstmtDelCallPro.setString(5, 'ADMIN');
		pstmtDelCallPro.setString(6, dateFunction());
		pstmtDelCallPro.setString(7, ' ');
		pstmtDelCallPro.setString(8, dateFunction());
		pstmtDelCallPro.setString(9, 'DELETE');
		pstmtDelCallPro.execute();
		var rsDelCallPro = pstmtDelCallPro.getParameterMetaData();
		conn.commit();

		if (rsDelCallPro.getParameterCount() > 0) {
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

	case "getMAP_ROLE_LOCATION":
		getMAP_ROLE_LOCATION();
		break;
	case "addMapRoleLocation":
		addMapRoleLocation();
		break;
	case "getMAP_ROLE_LOCATIONS":
		getMAP_ROLE_LOCATIONS();
		break;
	case "updateRoleLocation":
		updateRoleLocation();
		break;
	case "deleteRoleLocation":
		deleteRoleLocation();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}