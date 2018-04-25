  function checkStatusDescription(record){
    if(record.SOFT_DEL === '0'){
        record.SOFT_DEL_DESC = 'Active';
    }else  if(record.SOFT_DEL === '1'){
        record.SOFT_DEL_DESC = 'Inactive';
    }
    return record;
}

 
 function dateFormat(record) {
    var date = record.CREATE_DATE;
   if (date) {
    record.CREATE_DATE = date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
    return record.CREATE_DATE;
   }
  }


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

 function getLevel() {
 	var output = {
 		results: []
 	};
 	var conn1 = $.db.getConnection();
 	var leveld = $.request.parameters.get('leveld');
 	var queryLevel = '';
 	var pstmtLevel = '';
 	var rsLevel = '';
 	try {
 		queryLevel = ' SELECT * FROM "MOBI"."MST_LEVEL" WHERE LEVEL_ID=? ';
 		pstmtLevel = conn1.prepareStatement(queryLevel);
 		pstmtLevel.setString(1, leveld);
 		rsLevel = pstmtLevel.executeQuery();
 		conn1.commit();
 		while (rsLevel.next()) {
 			var record = {};
 			record.ID = rsLevel.getString(1);
 			record.LEVEL = rsLevel.getString(2);
 			record.SOFT_DEL = rsLevel.getString(3);
 			record.CREATE_BY = rsLevel.getString(4);
 			record.CREATE_DATE = rsLevel.getString(5);
 			record.MODIFIED_BY = rsLevel.getString(6);
 			record.MODIFIED_DATE = rsLevel.getString(7);
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

 function getLevels() {
 	var output = {
 		results: []
 	};
 	var conn1 = $.db.getConnection();

 	try {
 		var CallPro = 'call "MOBI"."MobiProcedure::MST_LEVEL"(?,?,?,?,?,?,?,?)';
 		var pstmtCallPro = conn1.prepareCall(CallPro);
 		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setString(2, ' ');
 		pstmtCallPro.setString(3, '');
 		pstmtCallPro.setString(4, 'null');
 		pstmtCallPro.setString(5, dateFunction());
 		pstmtCallPro.setString(6, 'null');
 		pstmtCallPro.setString(7, dateFunction());
 		pstmtCallPro.setString(8, 'SELECT');
 		pstmtCallPro.execute();
 		var rCallPro = pstmtCallPro.getResultSet();
 		conn1.commit();
 		while (rCallPro.next()) {
 			var record = {};
 			record.ID = rCallPro.getString(1);
 			record.LEVEL = rCallPro.getString(2);
 			record.SOFT_DEL = rCallPro.getString(3);
 			record.CREATE_BY = rCallPro.getString(4);
 			record.CREATE_DATE = rCallPro.getString(5);
 			record.MODIFIED_BY = rCallPro.getString(6);
 			record.MODIFIED_DATE = rCallPro.getString(7);
 			checkStatusDescription(record);
 			dateFormat(record);
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

 function addLevel() {

 	var record;
 	var Output = {
 		results: []
 	};

 	var conn = $.db.getConnection();
 	var level = $.request.parameters.get('level');

 	try {
 		record = {};
 		var CallPro = 'call "MOBI"."MobiProcedure::MST_LEVEL"(?,?,?,?,?,?,?,?);';
 		var pstmtCallPro = conn.prepareCall(CallPro);
 		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setString(2, level);
 		pstmtCallPro.setString(3, '0');
 		pstmtCallPro.setString(4, 'null');
 		pstmtCallPro.setString(5, dateFunction());
 		pstmtCallPro.setString(6, 'null');
 		pstmtCallPro.setString(7, dateFunction());
 		pstmtCallPro.setString(8, 'INSERT');
 		pstmtCallPro.execute();
 		var rsm = pstmtCallPro.getParameterMetaData();
 		conn.commit();
 		if (rsm.getParameterCount() > 0) {
 			record.status = 1;
 			record.message = 'Data Uploaded Sucessfully';
 		} else {
 			record.status = 0;
 			record.message = 'Some Issues!';
 		}

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

 function updateLevel() {
 	var Output = {
 		results: []

 	};
 	var record = {};
 	var conn = $.db.getConnection();
 	var levelID_EditLevel = $.request.parameters.get('levelID_EditLevel');
 	var levelNAME_EditLevel = $.request.parameters.get('levelNAME_EditLevel');
 	var levelNameEditStatus = $.request.parameters.get('levelNameEditStatus');

 	try {
 		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_LEVEL"(?,?,?,?,?,?,?,?);';
 		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
 		pstmtUpdCallPro.setInteger(1, parseInt(levelID_EditLevel, 10));
 		pstmtUpdCallPro.setString(2, levelNAME_EditLevel);
 		pstmtUpdCallPro.setInteger(3, 0);
 		pstmtUpdCallPro.setString(4, levelNameEditStatus);
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

 function deleteLevel() {
 	var Output = {
 		results: []

 	};
 	var record = {};
 	var conn = $.db.getConnection();
 	var levelIdDelLevel = $.request.parameters.get('levelIdDelLevel');

 	try {
 		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_LEVEL"(?,?,?,?,?,?,?,?);';
 		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
 		pstmtUpdCallPro.setInteger(1, parseInt(levelIdDelLevel, 10));
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

 	case "getLevels":
 		getLevels();
 		break;
 	case "getLevel":
 		getLevel();
 		break;
 	case "addLevel":
 		addLevel();
 		break;
 	case "updateLevel":
 		updateLevel();
 		break;
 	case "deleteLevel":
 		deleteLevel();
 		break;
 	default:
 		$.response.status = $.net.http.BAD_REQUEST;
 		$.response.setBody('Invalid Command');

 }