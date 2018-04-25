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
//getMSTCUSTOMER
function getCustomers() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	//var levelId = $.request.parameters.get('levelId');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_CUSTOMER"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setString(1, 'null');
		pstmtCallPro.setString(2, 'null');
		pstmtCallPro.setString(3, 'null');
		pstmtCallPro.setString(4, 'null');
		pstmtCallPro.setString(5, 'null');
		pstmtCallPro.setString(6, 'null');
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setString(8, 'null');
		pstmtCallPro.setString(9, 'null');
		pstmtCallPro.setString(10, 'null');
		pstmtCallPro.setString(11, 'null');
		pstmtCallPro.setString(12, 'null');
		pstmtCallPro.setString(13, 'null');
		pstmtCallPro.setString(14, 'null');
		pstmtCallPro.setString(15, 'null');
		pstmtCallPro.setString(16, 'null');
		pstmtCallPro.setString(17, 'null');
		pstmtCallPro.setString(18, 'null');
		pstmtCallPro.setString(19, 'n');
		pstmtCallPro.setInteger(20, 0);
		pstmtCallPro.setString(21, dateFunction());
		pstmtCallPro.setString(22, '00:00:00');
		pstmtCallPro.setString(23, dateFunction());
		pstmtCallPro.setString(24, dateFunction());
		pstmtCallPro.setString(25, dateFunction());
		pstmtCallPro.setString(26, 'null');
		pstmtCallPro.setString(27, 'null');
		pstmtCallPro.setString(28, '0');
		pstmtCallPro.setString(29, 'null');
		pstmtCallPro.setString(30, dateFunction());
		pstmtCallPro.setString(31, 'null');
		pstmtCallPro.setString(32, dateFunction());
		pstmtCallPro.setString(33, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.TYPE = rCallPro.getString(1);
			record.CODE = rCallPro.getString(2);
			record.NAME = rCallPro.getString(3);
			record.PARENT_CUST_CODE = rCallPro.getString(4);
			record.PARENT_CUST_NAME = rCallPro.getString(5);
			record.ADDRESS1 = rCallPro.getString(6);
			record.ADDRESS2 = rCallPro.getString(7);
			record.ADDRESS3 = rCallPro.getString(8);
			record.DISTRICT = rCallPro.getString(9);
			record.STATE = rCallPro.getString(10);
			record.REGION = rCallPro.getString(11);
			record.COUNTRY = rCallPro.getString(12);
			record.EMAIL = rCallPro.getString(13);
			record.PHONE_NUMBER = rCallPro.getString(14);
			record.PINCODE = rCallPro.getString(15);
			record.TINNO = rCallPro.getString(16);
			record.PLANT_CODE = rCallPro.getString(17);
			record.Status = rCallPro.getInteger(18);
			record.LEVEL = rCallPro.getString(19);
			record.LevelValue = rCallPro.getString(20);
			record.CustTypeDesc = rCallPro.getString(21);
			record.UserType = "Customer";
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

function getCustomer() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	var CustCode = $.request.parameters.get('CustCode');

	try {
		var queryGetCustomer = 'select * from "MOBI"."MST_CUSTOMER" where CUST_CODE = ? and SOFT_DEL = ?';
		var pstmtGetCustomer = connection.prepareStatement(queryGetCustomer);
		pstmtGetCustomer.setString(1, CustCode);
		pstmtGetCustomer.setString(2, '0');
		var rGetCustomer = pstmtGetCustomer.executeQuery();
		connection.commit();
		while (rGetCustomer.next()) {
			var record = {};
			record.TYPE = rGetCustomer.getString(1);
			record.CODE = rGetCustomer.getString(2);
			record.NAME = rGetCustomer.getString(3);
			record.PARENT_CUST_CODE = rGetCustomer.getString(4);
			record.PARENT_CUST_NAME = rGetCustomer.getString(5);
			record.ADDRESS1 = rGetCustomer.getString(6);
			record.ADDRESS2 = rGetCustomer.getString(7);
			record.ADDRESS3 = rGetCustomer.getString(8);
			record.DISTRICT = rGetCustomer.getString(9);
			record.STATE = rGetCustomer.getString(10);
			record.REGION = rGetCustomer.getString(11);
			record.COUNTRY = rGetCustomer.getString(12);
			record.EMAIL = rGetCustomer.getString(13);
			record.PHONE_NUMBER = rGetCustomer.getString(14);
			record.PINCODE = rGetCustomer.getString(15);
			record.TINNO = rGetCustomer.getString(16);
			record.PLANT_CODE = rGetCustomer.getString(19);
			record.Status = rGetCustomer.getInteger(20);
			record.LEVEL = rGetCustomer.getString(26);
			record.UserType = "Customer";
			getStatusDesc(record);
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

function getGenerateCUSTCode(record) {
	var today = new Date();
	var yyyy = today.getFullYear();
	record = {};
	var conn = $.db.getConnection();
	var queryRange = 'select ID,name from "MOBI"."CUST_RANGE"';
	var pstmtRange = conn.prepareStatement(queryRange);
	var rrange = pstmtRange.executeQuery();
	conn.commit();
	while (rrange.next()) {
		record.ID = rrange.getInteger(1);
		record.name = rrange.getString(2);
	}
	record.CustNO = record.name + (record.ID).toString() + yyyy;
	conn.close();
	return record;
}

function updateCUSTNo(record) {
	var conn = $.db.getConnection();
	var id = parseInt(record.ID, 10);
	id = id + 1;
	var query2 = 'UPDATE "MOBI"."CUST_RANGE" SET ID = ?,value = ? WHERE name = ?';
	var pstmt2 = conn.prepareStatement(query2);
	pstmt2.setInteger(1, id);
	pstmt2.setString(2, record.CustNO);
	pstmt2.setString(3, record.name);
	var r2 = pstmt2.executeUpdate();
	conn.commit();
	if (r2 > 0) {
		record.status = 1;
		record.message = 'Data Uploaded Sucessfully';
	}
}

function addMSTCUSTOMER() {
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
				record = getGenerateCUSTCode(record);

				var CallPro = 'call "MOBI"."MobiProcedure::MST_CUSTOMER"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				var pstmtCallPro = conn.prepareCall(CallPro);
				pstmtCallPro.setString(1, dicLine.CUST_TYPE);
				pstmtCallPro.setString(2, record.CustNO);
				pstmtCallPro.setString(3, dicLine.CUST_NAME);
				pstmtCallPro.setString(4, dicLine.ParentCode);
				pstmtCallPro.setString(5, dicLine.ParentName);
				pstmtCallPro.setString(6, dicLine.Add1);
				pstmtCallPro.setString(7, dicLine.Add2);
				pstmtCallPro.setString(8, dicLine.Add3);
				pstmtCallPro.setString(9, dicLine.DISTRICT);
				pstmtCallPro.setString(10, dicLine.STATE);
				pstmtCallPro.setString(11, dicLine.REGION);
				pstmtCallPro.setString(12, dicLine.COUNTRY);
				pstmtCallPro.setString(13, dicLine.EMAIL);
				pstmtCallPro.setString(14, dicLine.PHONE1);
				pstmtCallPro.setString(15, dicLine.PINCODE);
				pstmtCallPro.setString(16, dicLine.TINNO);
				pstmtCallPro.setString(17, 'null');
				pstmtCallPro.setString(18, 'null');
				pstmtCallPro.setString(19, dicLine.PLANT_CODE);
				pstmtCallPro.setInteger(20, 0);
				pstmtCallPro.setString(21, dateFunction());
				pstmtCallPro.setString(22, '00:00:00');
				pstmtCallPro.setString(23, dateFunction());
				pstmtCallPro.setString(24, dateFunction());
				pstmtCallPro.setString(25, dateFunction());
				pstmtCallPro.setString(26, dicLine.LEVEL);
				pstmtCallPro.setString(27, 'null');
				pstmtCallPro.setString(28, '0');
				pstmtCallPro.setString(29, 'null');
				pstmtCallPro.setString(30, dateFunction());
				pstmtCallPro.setString(31, 'null');
				pstmtCallPro.setString(32, dateFunction());
				pstmtCallPro.setString(33, 'INSERT');
				pstmtCallPro.execute();
				var rsm = pstmtCallPro.getResultSet();
				conn.commit();
				if (rsm > 0) {
					updateCUSTNo(record);
					record.status = 1;
					record.message = 'Data Uploaded Sucessfully';
				} else {
					updateCUSTNo(record);
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
	case "addMSTCUSTOMER":
		addMSTCUSTOMER();
		break;
	case "getCustomers":
		getCustomers();
		break;
	case "getCustomer":
		getCustomer();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}