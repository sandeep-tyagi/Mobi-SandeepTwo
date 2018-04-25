
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


function getLOC_HIERARCHY() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var locId = $.request.parameters.get('locId');
	var parentLocId = $.request.parameters.get('parentLocId');
	if(locId === undefined || locId === null || locId === '')
 {
     locId=0;
 }
 	if(parentLocId === undefined || parentLocId === null || parentLocId === '')
 {
     parentLocId=0;
 }
 

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::LOC_HIERARCHY"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setInteger(2, parseInt(locId,10));
		pstmtCallPro.setInteger(3, parseInt(parentLocId,10));
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
			record.LOC_ID = rCallPro.getString(2);
			record.PARENT_LOC_NAME = rCallPro.getString(3);
			record.PARENT_LOC_ID = rCallPro.getString(4);
			record.LOCHIE_ID = rCallPro.getString(5);
			
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

function addLOC_HIERARCHY() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var locId = $.request.parameters.get('locId');
	var parentLocId = $.request.parameters.get('parentLocId');
	
	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::LOC_HIERARCHY"(?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setInteger(2, parseInt(locId,10));
 		pstmtCallPro.setInteger(3, parseInt(parentLocId,10));
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

function updateMST_LOC_HIERARCHY() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var locHierarchyID_EditlocHierarchy = $.request.parameters.get('locHierarchyID_EditlocHierarchy');
	var locHierarchyNAME_EditlocHierarchy = $.request.parameters.get('locHierarchyNAME_EditlocHierarchy');
	var locHierarchyParrentDISPLAY_EditlocHierarchyParrent = $.request.parameters.get('locHierarchyParrentDISPLAY_EditlocHierarchyParrent');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::LOC_HIERARCHY"(?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
	   	pstmtUpdCallPro.setInteger(1, parseInt(locHierarchyID_EditlocHierarchy,10));
		pstmtUpdCallPro.setString(2, locHierarchyNAME_EditlocHierarchy);
		pstmtUpdCallPro.setString(3, locHierarchyParrentDISPLAY_EditlocHierarchyParrent);
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

function deleteMST_LOC_HIERARCHY() {
    	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var locHierarchyID_EditlocHierarchy = $.request.parameters.get('locHierarchyID_EditlocHierarchy');

	try {
		var DelCallPro = 'call "MOBI"."MobiProcedure::LOC_HIERARCHY"(?,?,?,?,?,?,?,?,?);';
		var pstmtDelCallPro = conn.prepareCall(DelCallPro);
		pstmtDelCallPro.setInteger(1, parseInt(locHierarchyID_EditlocHierarchy,10));
		pstmtDelCallPro.setInteger(2, 0);
		pstmtDelCallPro.setInteger(3, 0 );
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

	case "getLOC_HIERARCHY":
		getLOC_HIERARCHY();
		break;
	case "addLOC_HIERARCHY":
		addLOC_HIERARCHY();
		break;
	case "updateMST_LOC_HIERARCHY":
		updateMST_LOC_HIERARCHY();
		break;	
	case "deleteMST_LOC_HIERARCHY":
		deleteMST_LOC_HIERARCHY();
		break;	

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}