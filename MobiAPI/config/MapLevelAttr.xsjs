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

function checkLevelRecord(rSm, rA, SubRecord, levelId) {
	var conn = $.db.getConnection();
	var query = 'select * from "MOBI"."MAP_LEV_ATTR" where SUB_MENU_ID = ? and ATTRIBUTE_ID = ? and SOFT_DEL = ? and LEVEL_ID=?';
	var pstmtMRL = conn.prepareStatement(query);
	pstmtMRL.setInteger(1, rSm.getInteger(2));
	pstmtMRL.setInteger(2, rA.getInteger(1));
	pstmtMRL.setString(3, '0');
	pstmtMRL.setString(4, levelId);
	var rMRL = pstmtMRL.executeQuery();
	if (rMRL.next() > 0) {
		SubRecord.Check = true;
	} else {
		SubRecord.Check = false;
	}
	if (rA.getString(2) === 'CREATE') {
		SubRecord.INSERTCHECK = SubRecord.Check;
	} else if (rA.getString(2) === 'SEARCH') {
		SubRecord.SEARCHCHECK = SubRecord.Check;
	} else if (rA.getString(2) === 'DELETE') {
		SubRecord.DELETECHECK = SubRecord.Check;
	} else if (rA.getString(2) === 'EDIT') {
		SubRecord.EDITCHECK = SubRecord.Check;
	} else if (rA.getString(2) === 'VIEW') {
		SubRecord.VIEWCHECK = SubRecord.Check;
	} else if (rA.getString(2) === 'PRINT') {
		SubRecord.PRINTCHECK = SubRecord.Check;
	}
}

function getSubMenuLevelAttr() {
	var output = {
		results: []
	};
	var pstmt, pstmtSM, pstmtA;
	var query;
	var r = 0,
		rSm = 0,
		rA = 0;
	var conn = $.db.getConnection();
	var levelId = $.request.parameters.get('levelId');
	try {
		query = 'select Menu_id,menu_name from "MOBI"."MST_MENU" where SOFT_DEL = ?';
		pstmt = conn.prepareStatement(query);
		pstmt.setString(1, '0');
		r = pstmt.executeQuery();
		while (r.next()) {

			var record = {};
			var SubMenu = [];
			query = 'select distinct sub_menu_name,submenu_id,menu_id from "MOBI"."MST_SUB_MENU" where menu_id = ? and SOFT_DEL = ?';
			pstmtSM = conn.prepareStatement(query);
			pstmtSM.setInteger(1, r.getInteger(1));
			pstmtSM.setString(2, '0');
			rSm = pstmtSM.executeQuery();
			conn.commit();
			while (rSm.next()) {
				var SubRecord = {};
				var Attribute = [];
				query = 'select ATTRIBUTE_ID,ATTRIBUTE_NAME from "MOBI"."MST_ATTRIBUTE" where SOFT_DEL = ? and attribute_name != ?';
				pstmtA = conn.prepareStatement(query);
				pstmtA.setString(1, '0');
				pstmtA.setString(2, '');
				rA = pstmtA.executeQuery();
				//var attri = {};
				while (rA.next()) {
					SubRecord.SUBID = rSm.getInteger(2);
					SubRecord.SUBNAME = rSm.getString(1);
					if (rA.getString(2) === 'CREATE') {
						SubRecord.INSERT_ID = rA.getInteger(1);
						SubRecord.INSERT = rA.getString(2);
						checkLevelRecord(rSm, rA, SubRecord, levelId);
					} else if (rA.getString(2) === 'SEARCH') {
						SubRecord.SEARCH_ID = rA.getInteger(1);
						SubRecord.SEARCH = rA.getString(2);
						checkLevelRecord(rSm, rA, SubRecord, levelId);
					} else if (rA.getString(2) === 'DELETE') {
						SubRecord.DELETE_ID = rA.getInteger(1);
						SubRecord.DELETE = rA.getString(2);
						checkLevelRecord(rSm, rA, SubRecord, levelId);
					} else if (rA.getString(2) === 'EDIT') {
						SubRecord.EDIT_ID = rA.getInteger(1);
						SubRecord.EDIT = rA.getString(2);
						checkLevelRecord(rSm, rA, SubRecord, levelId);
					} else if (rA.getString(2) === 'VIEW') {
						SubRecord.VIEW_ID = rA.getInteger(1);
						SubRecord.VIEW = rA.getString(2);
						checkLevelRecord(rSm, rA, SubRecord, levelId);
					} else if (rA.getString(2) === 'PRINT') {
						SubRecord.PRINT_ID = rA.getInteger(1);
						SubRecord.PRINT = rA.getString(2);
						checkLevelRecord(rSm, rA, SubRecord, levelId);
					}
				}
				//Attribute.push(attri);
				//SubRecord.results = Attribute;
				SubMenu.push(SubRecord);
			}

			record.MENU_ID = r.getInteger(1);
			record.MENU_NAME = r.getString(2);
			record.results = SubMenu;
			output.results.push(record);
		}
		conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
}

function getMapLevAttr() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var levelId = $.request.parameters.get('levelId');
	if (levelId === undefined || levelId === null || levelId === '') {
		levelId = 0;
	}

	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MAP_LEV_ATTR"(?,?,?,?,?,?,?,?,?,?)';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setInteger(2, parseInt(levelId, 10));
		pstmtCallPro.setInteger(3, 4);
		/*	pstmtCallPro.setString(4, '');
		pstmtCallPro.setString(5, 'null');
		pstmtCallPro.setString(6, dateFunction());
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'SELECT');*/
		pstmtCallPro.setInteger(4, 2);
		pstmtCallPro.setString(5, '');
		pstmtCallPro.setString(6, '');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, '');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.LEVEL_NAME = rCallPro.getString(1);
			record.LEVEL_ATTR_ID = rCallPro.getString(2);
			record.LEVEL_ID = rCallPro.getString(3);
			record.SUB_MENU_NAME = rCallPro.getString(10);
			record.MENU_NAME = rCallPro.getString(11);
			record.SUB_MENU_ID = rCallPro.getString(4);
			record.SOFT_DEL = rCallPro.getString(5);
			record.CREATE_BY = rCallPro.getString(6);
			record.CREATE_DATE = rCallPro.getString(7);
			record.MODIFIED_BY = rCallPro.getString(8);
			record.MODIFIED_DATE = rCallPro.getString(9);
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

function deleteMapLevelAttr(dataLine, status) {
	var conn = $.db.getConnection();
	if (dataLine.length > 0) {
		//for (var i = 0; i < dataLine.length; i++) {
		var dicLine = dataLine[0];
		var qryDeleteLevelAtt =
			'Delete from "MOBI"."MAP_LEV_ATTR" where LEVEL_ID = ? and SUB_MENU_ID in (select SUBMENU_ID from "MOBI"."MST_SUB_MENU" where MENU_ID = ?)';
		var pstmtDeleteLevelAtt = conn.prepareStatement(qryDeleteLevelAtt);
		pstmtDeleteLevelAtt.setInteger(1, parseInt(dicLine.LEVEL_ID, 10));
		pstmtDeleteLevelAtt.setInteger(2, parseInt(dicLine.MENU_ID, 10));
		var rsDeleteLevelAtt = pstmtDeleteLevelAtt.executeQuery();
		conn.commit();
		if (rsDeleteLevelAtt.next()) {
			status = 1;
		} else {
			status = 0;
		}
		//}
		conn.close();
	}
}

function addMapLevAttr() {

	var record, status;
	var Output = {
		results: []
	};
	var conn = $.db.getConnection();
	var datasLine = $.request.parameters.get('LineData');
	//.replace(/\\r/g, "")
	var record;
	var dataLine = JSON.parse(datasLine.replace(/\\r/g, ""));
	try {
		if (dataLine.length > 0) {
			deleteMapLevelAttr(dataLine, status);
			for (var i = 0; i < dataLine.length; i++) {
				var dicLine = dataLine[i];
				record = {};
				/*var query = 'select * from "MOBI"."MAP_LEV_ATTR" where LEVEL_ID = ? and ATTRIBUTE_ID = ? and SUB_MENU_ID = ? and SOFT_DEL = ?';
				var pstmt = conn.prepareStatement(query);
				pstmt.setInteger(1, parseInt(dicLine.LEVEL_ID, 10));
				pstmt.setInteger(2, parseInt(dicLine.ID, 10));
				pstmt.setInteger(3, parseInt(dicLine.SUBID, 10));
				pstmt.setString(4, '0');
				var rs = pstmt.executeQuery();*/

				if (status === 1) {
					record.status = 0;
					record.message = 'Record Allready inserted!';
				} else {
					var CallPro = 'call "MOBI"."MobiProcedure::MAP_LEV_ATTR"(?,?,?,?,?,?,?,?,?,?);';
					var pstmtCallPro = conn.prepareCall(CallPro);
					pstmtCallPro.setInteger(1, 0);
					pstmtCallPro.setInteger(2, parseInt(dicLine.LEVEL_ID, 10));
					pstmtCallPro.setInteger(3, parseInt(dicLine.ID, 10));
					pstmtCallPro.setInteger(4, parseInt(dicLine.SUBID, 10));
					pstmtCallPro.setString(5, '0');
					pstmtCallPro.setString(6, '');
					pstmtCallPro.setString(7, dateFunction());
					pstmtCallPro.setString(8, '');
					pstmtCallPro.setString(9, dateFunction());
					pstmtCallPro.setString(10, 'INSERT');
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

	case "getMapLevAttr":
		getMapLevAttr();
		break;
	case "addMapLevAttr":
		addMapLevAttr();
		break;
	case "getSubMenuLevelAttr":
		getSubMenuLevelAttr();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}