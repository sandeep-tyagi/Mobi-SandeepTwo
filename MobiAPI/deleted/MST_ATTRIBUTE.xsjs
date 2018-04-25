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


function getMST_ATTRIBUTE() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var attributeName = $.request.parameters.get('attributeName');
	var display = $.request.parameters.get('display');

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_ATTRIBUTE"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, attributeName);
		pstmtCallPro.setString(3, display);
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
			record.ATTRIBUTE_ID = rCallPro.getString(1);
			record.ATTRIBUTE_NAME = rCallPro.getString(2);
			record.DISPLAY = rCallPro.getString(3);
			record.SOFT_DEL = rCallPro.getString(4);
			record.CREATE_BY = rCallPro.getString(5);
			record.CREATE_DATE = rCallPro.getString(6);
			record.MODIFIED_BY = rCallPro.getString(7);
			record.MODIFIED_DATE = rCallPro.getString(8);
// 			record.LOCATION_NAME = rCallPro.getString(1);
// 			record.ROLE_NAME = rCallPro.getString(2);
			
			
			
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

function addMST_ATTRIBUTE() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var attributeName = $.request.parameters.get('attributeName');
	var display = $.request.parameters.get('display');
	
	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MST_ATTRIBUTE"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setString(2, attributeName);
 		pstmtCallPro.setString(3, display);
    	pstmtCallPro.setString(4, ' ');
		pstmtCallPro.setString(5, ' ');
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

function updateMST_ATTRIBUTE() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var attributrID_EditAttribute = $.request.parameters.get('attributrID_EditAttribute');
	var attributeNAME_EditAttribute = $.request.parameters.get('attributeNAME_EditAttribute');
	var attributeDISPLAY_EditAttribute = $.request.parameters.get('attributeDISPLAY_EditAttribute');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_ATTRIBUTE"(?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
	   	pstmtUpdCallPro.setInteger(1, parseInt(attributrID_EditAttribute,10));
		pstmtUpdCallPro.setString(2, attributeNAME_EditAttribute);
		pstmtUpdCallPro.setString(3, attributeDISPLAY_EditAttribute);
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

function deleteMST_ATTRIBUTE() {
    	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var attributeID_Delattribute = $.request.parameters.get('attributeID_Delattribute');

	try {
		var DelCallPro = 'call "MOBI"."MobiProcedure::MST_ATTRIBUTE"(?,?,?,?,?,?,?,?,?);';
		var pstmtDelCallPro = conn.prepareCall(DelCallPro);
		pstmtDelCallPro.setInteger(1, parseInt(attributeID_Delattribute,10));
		pstmtDelCallPro.setString(2, ' ');
		pstmtDelCallPro.setString(3, ' ');
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

	case "getMST_ATTRIBUTE":
		getMST_ATTRIBUTE();
		break;
	case "addMST_ATTRIBUTE":
		addMST_ATTRIBUTE();
		break;
    case "updateMST_ATTRIBUTE":
		updateMST_ATTRIBUTE();
		break;
	case "deleteMST_ATTRIBUTE":
		deleteMST_ATTRIBUTE();
		break;	
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}