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

function getMST_ROLE() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var roleName = $.request.parameters.get('roleName');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_ROLE"(?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, roleName);
		pstmtCallPro.setInteger(3, 0);
		pstmtCallPro.setString(4, 'ADMIN');
		pstmtCallPro.setString(5, dateFunction());
		pstmtCallPro.setString(6, ' ');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.ROLE_ID = rCallPro.getString(1);
			record.ROLE_NAME = rCallPro.getString(2);
			record.SOFT_DEL = rCallPro.getString(3);
			record.CREATE_BY = rCallPro.getString(4);
			record.CREATE_DATE = rCallPro.getString(5);
			record.MODIFIED_BY = rCallPro.getString(6);
			record.MODIFIED_DATE = rCallPro.getString(7);
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

function addMST_ROLE() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var roleName = $.request.parameters.get('roleName');

	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MST_ROLE"(?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, roleName);
		//	pstmtCallPro.setInteger(2, parseInt(roleId,10));
		//	pstmtCallPro.setInteger(3, parseInt(locationId,10));
		pstmtCallPro.setString(3, ' ');
		pstmtCallPro.setString(4, ' ');
		pstmtCallPro.setString(5, dateFunction());
		pstmtCallPro.setString(6, '');
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

function updateMST_ROLE() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var roleIdEditRole = $.request.parameters.get('roleIdEditRole');
	var roleNameEditRole = $.request.parameters.get('roleNameEditRole');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_ROLE"(?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(roleIdEditRole,10));
		pstmtUpdCallPro.setString(2, roleNameEditRole);
		pstmtUpdCallPro.setInteger(3, 0);
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


function deleteMST_ROLE() {
    	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var roleIdDelRole = $.request.parameters.get('roleIdDelRole');
/*	var roleNAME_EditRole = $.request.parameters.get('roleNAME_EditRole');*/

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_ROLE"(?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(roleIdDelRole,10));
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

	case "getMST_ROLE":
		getMST_ROLE();
		break;
	case "addMST_ROLE":
		addMST_ROLE();
		break;
	case "updateMST_ROLE":
		updateMST_ROLE();
		break;
	case "deleteMST_ROLE":
		deleteMST_ROLE();
		break;	

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}