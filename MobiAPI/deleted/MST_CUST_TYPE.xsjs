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

function getCustType() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var CustType = $.request.parameters.get('CustType');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_CUST_TYPE"(?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, CustType);
		pstmtCallPro.setString(3, 'null');
		pstmtCallPro.setString(4, '');
		pstmtCallPro.setString(5, 'null');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.CUSTOMERTYPE_ID = rCallPro.getString(1);
			record.CUST_TYPE = rCallPro.getString(2);
			record.CUST_TYPE_DESC = rCallPro.getString(3);
			record.SOFT_DEL = rCallPro.getString(4);
			record.CREATE_BY = rCallPro.getString(5);
			record.CREATE_DATE = rCallPro.getString(6);
			record.MODIFIED_BY = rCallPro.getString(7);
			record.MODIFIED_DATE = rCallPro.getString(8);
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

function getCustomerTypes() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_CUST_TYPE"(?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, '');
		pstmtCallPro.setString(3, 'null');
		pstmtCallPro.setString(4, '');
		pstmtCallPro.setString(5, 'null');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'SELECTTYPES');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.CUSTOMERTYPE_ID = rCallPro.getString(1);
			record.CUST_TYPE = rCallPro.getString(2);
			record.CUST_TYPE_DESC = rCallPro.getString(3);
			record.SOFT_DEL = rCallPro.getString(4);
			record.CREATE_BY = rCallPro.getString(5);
			record.CREATE_DATE = rCallPro.getString(6);
			record.MODIFIED_BY = rCallPro.getString(7);
			record.MODIFIED_DATE = rCallPro.getString(8);
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

function addCustType() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var CustType = $.request.parameters.get('CustType');
	var CustTypeDesc = $.request.parameters.get('CustTypeDesc');

	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MST_CUST_TYPE"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, CustType);
		pstmtCallPro.setString(3, CustTypeDesc);
		pstmtCallPro.setString(4, '');
		pstmtCallPro.setString(5, '');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, '');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'INSERT');
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

function updateCustType() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var idCustTypeEdit = $.request.parameters.get('idCustTypeEdit');
	var custTypeEditCustType = $.request.parameters.get('CustType_EditCustType');
	var CustTypeDesc_EditCustTypeDesc = $.request.parameters.get('CustTypeDesc_EditCustTypeDesc');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_CUST_TYPE"(?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(idCustTypeEdit, 10));
		pstmtUpdCallPro.setString(2, CustType_EditCustType);
		pstmtUpdCallPro.setString(3, CustTypeDesc_EditCustTypeDesc);
		pstmtUpdCallPro.setInteger(4, 0);
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

function deleteCustType() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var CustTypeID_EditCustType = $.request.parameters.get('CustTypeID_EditCustType');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_CUST_TYPE"(?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(CustTypeID_EditCustType, 10));
		pstmtUpdCallPro.setString(2, '0');
		pstmtUpdCallPro.setString(3, '0');
		pstmtUpdCallPro.setString(4, '1');
		pstmtUpdCallPro.setString(5, 'ADMIN');
		pstmtUpdCallPro.setString(6, dateFunction());
		pstmtUpdCallPro.setString(7, ' ');
		pstmtUpdCallPro.setString(8, dateFunction());
		pstmtUpdCallPro.setString(9, 'DELETE');
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

	case "getCustType":
		getCustType();
		break;
	case "getCustomerTypes":
	    getCustomerTypes();
	    break;
	case "addCustType":
		addCustType();
		break;
	case "updateCustType":
		updateCustType();
		break;
	case "deleteCustType":
		deleteCustType();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}