function insertCountryDetail() {
	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var COUNTRY_CODE = $.request.parameters.get('COUNTRY_CODE');
	var COUNTRY_NAME = $.request.parameters.get('COUNTRY_NAME');
//	var DESCRIPTION = $.request.parameters.get('DESCRIPTION');
	try {
		record = {};
		var queryselect = 'select * from "MOBI"."MST_COUNTRY" where COUNTRY_CODE=? and COUNTRY_NAME=?';
		var paramSelect = conn.prepareStatement(queryselect);
		paramSelect.setString(1, COUNTRY_CODE);
		paramSelect.setString(2, COUNTRY_NAME);

		var rsSelect = paramSelect.executeQuery();
		if (rsSelect.next()) {
			record.status = 0;
			record.Message = "Record  Already  inserted";
		} else {
			var quryInsertData =
				'insert into  "MOBI"."MST_COUNTRY"(COUNTRY_CODE,COUNTRY_NAME) values(?,?)';
			var paramInsert = conn.prepareStatement(quryInsertData);
			paramInsert.setString(1, COUNTRY_CODE);
			paramInsert.setString(2, COUNTRY_NAME);
			var rsInsert = paramInsert.executeUpdate();
			conn.commit();

			if (rsInsert > 0) {
				record.status = 1;
				record.Message = "Record Successfully inserted";

			} else {
				record.status = 0;
				record.Message = "Record Successfully  not inserted";
			}
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


function deleteCountryData() {
    var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
//	var COUNTRY_CODE = $.request.parameters.get('COUNTRY_CODE');
	var datas = $.request.parameters.get('COUNTRY_CODE');
	var pstmt1;
	var query1;
	var rstatus;
	var record = {};

	try {

		var oFinalResult = JSON.parse(datas);
		for (var i = 0; i < oFinalResult.length; i++) {

			var dict = oFinalResult[i];
			query1 =
				'delete  from \"MOBI\".\"COUNTRY_MASTER\" where COUNTRY_CODE=?';

			pstmt1 = conn.prepareStatement(query1);
			pstmt1.setString(1, dict.COUNTRY_CODE);

			rstatus = pstmt1.executeUpdate();
			conn.commit();
			if (rstatus > 0) {

				record.status = '01';
				record.message = 'Success';

			} else {
				record.status = '02';
				record.message = 'failed';

			}

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


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

    case "insertCountryDetail":
        insertCountryDetail();
        break;
    case "deleteCountryData":
        deleteCountryData();
        break;

        
	default:
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody('Invalid Command: ', aCmd);
}
