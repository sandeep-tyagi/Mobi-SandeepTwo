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

function getUSER_REGISTRATION() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	/*	var attributeName = $.request.parameters.get('attributeName');
	var display = $.request.parameters.get('display');*/

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::USER_REGISTRATION"(?,?,?,?,?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);

		pstmtCallPro.setString(1, 'null');
		pstmtCallPro.setString(2, 'null');
		pstmtCallPro.setString(3, 'null');
		pstmtCallPro.setString(4, 'null');
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setInteger(5, 0);
		pstmtCallPro.setInteger(6, 0);
		pstmtCallPro.setString(8, '0');
		pstmtCallPro.setString(9, 'ADMIN');
		pstmtCallPro.setString(10, dateFunction());
		pstmtCallPro.setString(11, ' ');
		pstmtCallPro.setString(12, dateFunction());
		pstmtCallPro.setString(13, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.USER_CODE = rCallPro.getString(1);
			record.PASSWORD = rCallPro.getString(2);
			record.LOGIN_NAME = rCallPro.getString(3);
			record.USER_TYPE = rCallPro.getString(4);
			record.LEVEL_ID = rCallPro.getInteger(5);
			record.POSITION_ID = rCallPro.getInteger(6);
			record.STATUS = rCallPro.getString(7);
			record.SOFT_DEL = rCallPro.getString(8);
			record.CREATE_BY = rCallPro.getString(9);
			record.CREATE_DATE = rCallPro.getString(10);
			record.MODIFIED_BY = rCallPro.getString(11);
			record.MODIFIED_DATE = rCallPro.getString(12);
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

function getUserAndPassword() {
	var output = {
		results: []
	};
	var conn = $.db.getConnection();
	var UserId = $.request.parameters.get('UserId');
	var Pass = $.request.parameters.get('Pass');

	try {
		var query = 'select * from "MOBI"."USER_REGISTRATION" where USER_CODE=? and PASSWORD=?';
		var pstmt = conn.prepareStatement(query);
		pstmt.setString(1, UserId);
		pstmt.setString(2, Pass);
		var rs = pstmt.executeQuery();
		conn.commit();
		if (rs.next() > 0) {
			var record = {};
			record.USER_CODE = rs.getString(1);
			record.PASSWORD = rs.getString(2);
			record.LOGIN_NAME = rs.getString(3);
			record.USER_TYPE = rs.getString(4);
			record.LEVEL_ID = rs.getInteger(5);
			record.POSITION_ID = rs.getInteger(6);
			record.STATUS = rs.getString(7);
			record.SOFT_DEL = rs.getString(8);
			record.CREATE_BY = rs.getString(9);
			record.CREATE_DATE = rs.getString(10);
			record.MODIFIED_BY = rs.getString(11);
			record.MODIFIED_DATE = rs.getString(12);
			record.status = '1';
		} else {
		    record = {};
		    record.message = "Please enter correct User Id and Password.";
			record.status = '0';
		}
		output.results.push(record);
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

function addUSER_REGISTRATION() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var datasLine = $.request.parameters.get('LineData');
	var record;
	var dataLine = JSON.parse(datasLine.replace(/\\r/g, ""));
	try {
		if (dataLine.length > 0) {
			for (var i = 0; i < dataLine.length; i++) {
				var dicLine = dataLine[i];
				record = {};
				var CallPro = 'call "MOBI"."MobiProcedure::USER_REGISTRATION"(?,?,?,?,?,?,?,?,?,?,?,?,?)';
				var pstmtCallPro = conn.prepareCall(CallPro);
				pstmtCallPro.setString(1, dicLine.UserId);
				pstmtCallPro.setString(2, dicLine.Password);
				pstmtCallPro.setString(3, dicLine.UserName);
				pstmtCallPro.setString(4, dicLine.UserType);
				pstmtCallPro.setInteger(5, parseInt(dicLine.level, 10));
				pstmtCallPro.setInteger(6, parseInt(dicLine.Position, 10));
				pstmtCallPro.setString(7, dicLine.Status);
				pstmtCallPro.setString(8, '0');
				pstmtCallPro.setString(9, 'ADMIN');
				pstmtCallPro.setString(10, dateFunction());
				pstmtCallPro.setString(11, 'null');
				pstmtCallPro.setString(12, dateFunction());
				pstmtCallPro.setString(13, 'INSERT');
				pstmtCallPro.execute();
				var rsm = pstmtCallPro.getResultSet();
				conn.commit();
				if (rsm > 0) {
					record.status = 1;
					record.message = 'Data Uploaded Sucessfully';
				} else {
					record.status = 0;
					record.message = 'Some Issues!';
				}
			}
			Output.results.push(record);
			conn.close();
		}
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

	case "getUSER_REGISTRATION":
		getUSER_REGISTRATION();
		break;
	case "addUSER_REGISTRATION":
		addUSER_REGISTRATION();
		break;
	case "getUserAndPassword":
		getUserAndPassword();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}