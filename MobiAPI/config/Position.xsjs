function dateFormat(record) {
    var date = record.CREATE_DATE;
   if (date) {
    record.CREATE_DATE = date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
    return record.CREATE_DATE;
   }
  }


 function checkStatusDescription(record) {
 	if (record.SOFT_DEL === '0') {
 		record.SOFT_DEL_DESC = 'Active';
 	} else if (record.SOFT_DEL === '1') {
 		record.SOFT_DEL_DESC = 'Inactive';
 	}
 	return record;
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
 	var positionId = $.request.parameters.get('positionId');
 	var positionName = $.request.parameters.get('positionName');

 	try {
 		var CallPro = 'call "MOBI"."MobiProcedure::MST_POSITION"(?,?,?,?,?,?,?,?);';
 		var pstmtCallPro = connection.prepareCall(CallPro);
 		pstmtCallPro.setInteger(1, parseInt(positionId, 10));
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
 			record.POSITION_ID = rCallPro.getString(1);
 			record.POSITION_NAME = rCallPro.getString(2);
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

 /**
  * To fetch all positions from position master
  * @returns {output} Array of country record
  */

 function getPositions() {
 	var output = {
 		results: []
 	};
 	var connection = $.db.getConnection();

 	try {
 		var CallPro = 'call "MOBI"."MobiProcedure::MST_POSITION"(?,?,?,?,?,?,?,?);';
 		var pstmtCallPro = connection.prepareCall(CallPro);
 		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setString(2, ' ');
 		pstmtCallPro.setInteger(3, 0);
 		pstmtCallPro.setString(4, 'ADMIN');
 		pstmtCallPro.setString(5, dateFunction());
 		pstmtCallPro.setString(6, ' ');
 		pstmtCallPro.setString(7, dateFunction());
 		pstmtCallPro.setString(8, 'SELECTPOSITIONS');
 		pstmtCallPro.execute();
 		var rCallPro = pstmtCallPro.getResultSet();
 		connection.commit();
 		while (rCallPro.next()) {
 			var record = {};
 			record.POSITION_ID = rCallPro.getString(1);
 			record.POSITION_NAME = rCallPro.getString(2);
 			record.SOFT_DEL = rCallPro.getString(3);
 			record.CREATE_BY = rCallPro.getString(4);
 			record.CREATE_DATE = rCallPro.getString(5);
 			record.MODIFIED_BY = rCallPro.getString(6);
 			record.MODIFIED_DATE = rCallPro.getString(7);
 			checkStatusDescription(record);
 			dateFormat(record);
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

 	var connection = $.db.getConnection();
 	var positionName = $.request.parameters.get('positionName');

 	try {

 		record = {};
 		if (positionName === undefined || positionName === null || positionName === '') {
 			record.status = '1';
 			record.message = "There should be some value for position name.";

 		} else {

 			var qryInsertPosition = 'INSERT INTO  "MOBI"."MST_POSITION"(POSITION_NAME) VALUES(?);';
 			var pstmtInsertPosition = connection.prepareStatement(qryInsertPosition);
 			pstmtInsertPosition.setString(1, positionName);

 			var rsInsertPosition = pstmtInsertPosition.executeUpdate();

 			connection.commit();
 			if (rsInsertPosition > 0) {
 				record.status = '0';
 				record.message = "Data inserted successfully.";
 			} else {
 				record.status = '1';
 				record.message = "There is some maintenance going on.Kindly contact admin";
 			}
 		}
 		Output.results.push(record);
 		connection.close();
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
 	var connection = $.db.getConnection();
 	var positionIdUpdatePosition = $.request.parameters.get('positionIdUpdatePosition');
 	var positionNameEditPosition = $.request.parameters.get('positionNameEditPosition');
 	var positionStatusEditPosition = $.request.parameters.get('positionStatusEditPosition');
 	if (positionIdUpdatePosition === undefined || positionIdUpdatePosition === null || positionIdUpdatePosition === '') {

 		record.status = '1';
 		record.message = "Update PositionId should not be empty.Please provide position id";
 	} else if (positionNameEditPosition === undefined || positionNameEditPosition === null || positionNameEditPosition === '') {
 		record.status = '1';
 		record.message = "Please provide position name.";
 	} else {

 		try {
 			var qryUpdatePosition = 'UPDATE "MOBI"."MST_POSITION" SET POSITION_NAME = ?, MODIFIED_DATE=? , SOFT_DEL=? where POSITION_ID= ?';
 			var pstmtUpdatePosition = connection.prepareStatement(qryUpdatePosition);
 			pstmtUpdatePosition.setString(1, positionNameEditPosition);
 			pstmtUpdatePosition.setString(2, dateFunction());
 			pstmtUpdatePosition.setString(3, positionStatusEditPosition);
 			pstmtUpdatePosition.setInteger(4, parseInt(positionIdUpdatePosition, 10));
 			var rsUpdatePosition = pstmtUpdatePosition.executeUpdate();
 			connection.commit();

 			if (rsUpdatePosition > 0) {
 				record.status = 0;
 				record.message = 'Successfully updated record for position';

 			} else {
 				record.status = 1;
 				record.message = 'failed to update position . Kindly contact admin.';

 			}

 		} catch (e) {

 			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
 			$.response.setBody(e.message);
 			return;
 		}
 	}
 	Output.results.push(record);
 	connection.close();
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
 	var connection = $.db.getConnection();
 	var positionIdDelPosition = $.request.parameters.get('positionIdDelPosition');

 	try {
 		if (positionIdDelPosition === undefined || positionIdDelPosition === null || positionIdDelPosition === '') {
 			record.status = '1';
 			record.message = "Position Id should not be empty!!!";

 		} else {
 			var qryDelPosition = 'UPDATE "MOBI"."MST_POSITION" SET SOFT_DEL=? where POSITION_ID=?';
 			var pstmtDelPosition = connection.prepareStatement(qryDelPosition);
 			pstmtDelPosition.setString(1, '1');
 			pstmtDelPosition.setInteger(2, parseInt(positionIdDelPosition, 10));
 			var rsDelPosition = pstmtDelPosition.executeUpdate();

 			connection.commit();
 			if (rsDelPosition > 0) {
 				record.status = '0';
 				record.message = "Data Deleted successfully.";
 			} else {
 				record.status = '1';
 				record.message = "There is some maintenance going on.Kindly contact admin";
 			}
 		}
 		Output.results.push(record);
 		connection.close();

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

 	case "getPosition":
 		getPosition();
 		break;
 	case "getPositions":
 		getPositions();
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