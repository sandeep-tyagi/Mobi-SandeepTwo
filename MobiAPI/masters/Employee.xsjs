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

function getStatusDesc(record) {
	var conn = $.db.getConnection();
	if (record.Status !== undefined && record.Status !== '' && record.Status !== null) {
		var query = 'select STATUS_CODE,STATUS_DESC from "MOBI"."MST_STATUS" where STATUS_CODE = ?';
		var pstmt = conn.prepareStatement(query);
		pstmt.setInteger(1, record.Status);
		var r = pstmt.executeQuery();
		conn.commit();
		while (r.next()) {
			record.ID = r.getInteger(1);
			record.StatusDesc = r.getString(2);
		}
		conn.close();
	}
	return record;
}
//getMSTEMPLOYEE
function getEmployees() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	//var levelId = $.request.parameters.get('levelId');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_EMPLOYEE"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, 'null');
		pstmtCallPro.setString(3, 'null');
		pstmtCallPro.setString(4, 'null');
		pstmtCallPro.setString(5, 'null');
		pstmtCallPro.setString(6, 'null');
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setString(8, 'null');
		pstmtCallPro.setString(9, 'null');
		pstmtCallPro.setString(10, 'null');
		pstmtCallPro.setInteger(11, 0);
		pstmtCallPro.setString(12, '0');
		pstmtCallPro.setString(13, '0');
		pstmtCallPro.setString(14, dateFunction());
		pstmtCallPro.setString(15, dateFunction());
		pstmtCallPro.setString(16, '0');
		pstmtCallPro.setString(17, '');
		pstmtCallPro.setString(18, dateFunction());
		pstmtCallPro.setString(19, '');
		pstmtCallPro.setString(20, dateFunction());
		pstmtCallPro.setString(21, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.CODE = rCallPro.getString(1);
			record.NAME = rCallPro.getString(2);
			record.ADDRESS1 = rCallPro.getString(3);
			record.ADDRESS2 = rCallPro.getString(4);
			record.COUNTRY = rCallPro.getString(5);
			record.STATE = rCallPro.getString(6);
			record.DISTRICT = rCallPro.getString(7);
			record.PHONE_NUMBER = rCallPro.getString(8);
			record.EMAIL = rCallPro.getString(9);
			record.ROLE_ID = rCallPro.getString(10);
			record.POSITION_ID = rCallPro.getString(11);
			record.Status = rCallPro.getInteger(12);
			record.UserType = "Employee";
			getStatusDesc(record);
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

function getEmployee() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var EmployeeCode = $.request.parameters.get('EmployeeCode');

	try {
		var queryEmployee = 'select * from "MOBI"."MST_EMPLOYEE" where EMPLOYEE_CODE = ? and SOFT_DEL=?';
		var pstmtEmployee = conn1.prepareStatement(queryEmployee);
		pstmtEmployee.setString(1, EmployeeCode);
		pstmtEmployee.setString(2, '0');
		var rEmployee = pstmtEmployee.executeQuery();
		conn1.commit();
		while (rEmployee.next()) {
			var record = {};
			record.CODE = rEmployee.getString(2);
			record.NAME = rEmployee.getString(3);
			record.ADDRESS1 = rEmployee.getString(4);
			record.ADDRESS2 = rEmployee.getString(5);
			record.COUNTRY = rEmployee.getString(6);
			record.STATE = rEmployee.getString(7);
			record.DISTRICT = rEmployee.getString(8);
			record.PHONE_NUMBER = rEmployee.getString(9);
			record.EMAIL = rEmployee.getString(10);
			record.ROLE_ID = rEmployee.getInteger(11);
			record.POSITION_ID = rEmployee.getString(12);
			//record.POSITION_VALUE = rEmployee.getString(13);
			record.Status = rEmployee.getInteger(13);
			record.UserType = "Employee";
			getStatusDesc(record);
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

function getGenerateEMPCode(record) {
	var today = new Date();
	var yyyy = today.getFullYear();
	record = {};
	var conn = $.db.getConnection();
	var queryRange = 'select ID,name from "MOBI"."EMP_RANGE"';
	var pstmtRange = conn.prepareStatement(queryRange);
	var rrange = pstmtRange.executeQuery();
	conn.commit();
	while (rrange.next()) {
		record.ID = rrange.getInteger(1);
		record.name = rrange.getString(2);
	}
	record.EmpNO = record.name + (record.ID).toString() + yyyy;
	conn.close();
	return record;
}

function updateEmpNo(record) {
	var conn = $.db.getConnection();
	var id = parseInt(record.ID, 10);
	id = id + 1;
	var query2 = 'UPDATE "MOBI"."EMP_RANGE" SET ID = ?,value = ? WHERE name = ?';
	var pstmt2 = conn.prepareStatement(query2);
	pstmt2.setInteger(1, id);
	pstmt2.setString(2, record.EmpNO);
	pstmt2.setString(3, record.name);
	var r2 = pstmt2.executeUpdate();
	conn.commit();
	if (r2 > 0) {
		record.status = 1;
		record.message = 'Data Uploaded Sucessfully';
	}
}

function addMSTEMPLOYEE() {
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
				var empcode = getGenerateEMPCode(record);
				var CallPro = 'call "MOBI"."MobiProcedure::MST_EMPLOYEE"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				var pstmtCallPro = conn.prepareCall(CallPro);
				pstmtCallPro.setInteger(1, 0);
				pstmtCallPro.setString(2, empcode.EmpNO);
				pstmtCallPro.setString(3, dicLine.EMPLOYEE_NAME);
				pstmtCallPro.setString(4, dicLine.ADDRESS1);
				pstmtCallPro.setString(5, dicLine.ADDRESS2);
				pstmtCallPro.setString(6, dicLine.COUNTRY);
				pstmtCallPro.setString(7, dicLine.STATE);
				pstmtCallPro.setString(8, dicLine.DISTRICT);
				pstmtCallPro.setString(9, dicLine.PHONE_NUMBER);
				pstmtCallPro.setString(10, dicLine.EMAIL);
				pstmtCallPro.setInteger(11, parseInt(dicLine.ROLE_ID, 10));
				pstmtCallPro.setString(12, dicLine.POSITION_ID);
				pstmtCallPro.setInteger(13, 0);
				pstmtCallPro.setString(14, dateFunction());
				pstmtCallPro.setString(15, dateFunction());
				pstmtCallPro.setString(16, '0');
				pstmtCallPro.setString(17, '');
				pstmtCallPro.setString(18, dateFunction());
				pstmtCallPro.setString(19, '');
				pstmtCallPro.setString(20, dateFunction());
				pstmtCallPro.setString(21, 'INSERT');
				pstmtCallPro.execute();
				var rsm = pstmtCallPro.getParameterMetaData();
				conn.commit();
				if (rsm.getParameterCount() > 0) {
					record.status = 1;
					record.message = 'Data Uploaded Sucessfully';
					updateEmpNo(empcode);
				} else {
					record.status = 0;
					record.message = 'Some Issues!';
					updateEmpNo(empcode);
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
	case "addMSTEMPLOYEE":
		addMSTEMPLOYEE();
		break;
	case "getEmployees":
		getEmployees();
		break;
	case "getEmployee":
		getEmployee();
		break;

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}