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

function getMenu() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	var menuId = $.request.parameters.get('menuId');
	var menuName = $.request.parameters.get('menuName');
	var orderNo = $.request.parameters.get('orderNo');
	if (orderNo === undefined || orderNo === null || orderNo === '') {
		orderNo = 0;
	}
	var url = $.request.parameters.get('url');
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = connection.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, parseInt(menuId, 10));
		pstmtCallPro.setString(2, menuName);
		pstmtCallPro.setInteger(3, parseInt(orderNo, 10));
		pstmtCallPro.setString(4, url);
		pstmtCallPro.setString(5, '0');
		pstmtCallPro.setString(6, 'ADMIN');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, ' ');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		connection.commit();
		while (rCallPro.next()) {
			var record = {};
			record.MENU_ID = rCallPro.getString(1);
			record.MENU_NAME = rCallPro.getString(2);
			record.ORDER_NO = rCallPro.getString(3);
			record.URL = rCallPro.getString(4);
			record.SOFT_DEL = rCallPro.getString(5);
			record.CREATE_BY = rCallPro.getString(6);
			record.CREATE_DATE = rCallPro.getString(7);
			record.MODIFIED_BY = rCallPro.getString(8);
			record.MODIFIED_DATE = rCallPro.getString(9);
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
 * To fetch all Menus.
 * @Param [] output .
 * @return {String} array of menu .
 */

function getMenus() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, ' ');
		pstmtCallPro.setInteger(3, 0);
		pstmtCallPro.setString(4, ' ');
		pstmtCallPro.setString(5, '0');
		pstmtCallPro.setString(6, 'ADMIN');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, ' ');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'SELECTMENUS');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.MENU_ID = rCallPro.getString(1);
			record.MENU_NAME = rCallPro.getString(2);
			record.ORDER_NO = rCallPro.getString(3);
			record.URL = rCallPro.getString(4);
			record.SOFT_DEL = rCallPro.getString(5);
			record.CREATE_BY = rCallPro.getString(6);
			record.CREATE_DATE = rCallPro.getString(7);
			record.MODIFIED_BY = rCallPro.getString(8);
			record.MODIFIED_DATE = rCallPro.getString(9);
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

function fetchMenu(inputData, connection) {
	var queryselectMenu = 'select * from "MOBI"."MST_MENU" where SOFT_DEL is not null ';
	var whereClause = "";
	if (inputData.menuName !== '') {
		whereClause += " AND MENU_NAME='" + inputData.menuName + "'";
	}
	queryselectMenu += whereClause;
	var pstmtSelectMenu = connection.prepareStatement(queryselectMenu);
	var rsSelectMenu = pstmtSelectMenu.executeQuery();
	return rsSelectMenu;
}

function addMenu(inputData, connection, record) {

	var CallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
	var pstmtCallPro = connection.prepareCall(CallPro);
	pstmtCallPro.setInteger(1, 0);
	pstmtCallPro.setString(2, inputData.menuName);
	pstmtCallPro.setInteger(3, parseInt(inputData.orderMenu, 10));
	pstmtCallPro.setString(4, inputData.urlMenu);
	pstmtCallPro.setString(5, '0');
	pstmtCallPro.setString(6, 'null');
	pstmtCallPro.setString(7, dateFunction());
	pstmtCallPro.setString(8, 'null');
	pstmtCallPro.setString(9, dateFunction());
	pstmtCallPro.setString(10, 'INSERT');
	pstmtCallPro.execute();
	var rCallPro = pstmtCallPro.getResultSet();
	connection.commit();
	if (rCallPro > 0) {
		record.status = 1;
		record.Message = "Record Successfully inserted";
	} else {
		record.status = 0;
		record.Message = "Record Successfully  not inserted!!! Kindly contact Admin.";
	}

}



function updateMenu() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var menuIdEditMenu = $.request.parameters.get('menuIdEditMenu');
	var menuNameEditMenu = $.request.parameters.get('menuNameEditMenu');
	var menuOrderNoEditMenu = $.request.parameters.get('menuOrderNoEditMenu');
	var menuUrlEditMenu = $.request.parameters.get('menuUrlEditMenu');
	var statusEditMenu = $.request.parameters.get('statusEditMenu');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(menuIdEditMenu, 10));
		pstmtUpdCallPro.setString(2, menuNameEditMenu);
		pstmtUpdCallPro.setInteger(3, parseInt(menuOrderNoEditMenu, 10));
		pstmtUpdCallPro.setString(4, menuUrlEditMenu);
		pstmtUpdCallPro.setString(5, statusEditMenu);
		pstmtUpdCallPro.setString(6, 'ADMIN');
		pstmtUpdCallPro.setString(7, dateFunction());
		pstmtUpdCallPro.setString(8, ' ');
		pstmtUpdCallPro.setString(9, dateFunction());
		pstmtUpdCallPro.setString(10, 'UPDATE');
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

function deleteMenu() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var menuId = $.request.parameters.get('menuId');

	try {
		var DelCallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(DelCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(menuId, 10));
		pstmtUpdCallPro.setString(2, ' ');
		pstmtUpdCallPro.setInteger(3, 0);
		pstmtUpdCallPro.setString(4, ' ');
		pstmtUpdCallPro.setString(5, '1');
		pstmtUpdCallPro.setString(6, 'ADMIN');
		pstmtUpdCallPro.setString(7, dateFunction());
		pstmtUpdCallPro.setString(8, ' ');
		pstmtUpdCallPro.setString(9, dateFunction());
		pstmtUpdCallPro.setString(10, 'DELETE');
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

function validateMenu() {

	var Output = {
		results: []
	};
	var connection = $.db.getConnection();
	var inputData = {};
	var menuName = $.request.parameters.get('menuName');
	var orderMenu = $.request.parameters.get('orderMenu');
	var urlMenu = $.request.parameters.get('urlMenu');
	inputData.menuName = menuName;
	inputData.orderMenu = orderMenu;
	inputData.urlMenu = urlMenu;

	try {
		var record = {};
		var rsMenuValidation = fetchMenu(inputData, connection);
		if (rsMenuValidation.next()) {
			var softDel = rsMenuValidation.getString(5);
			if (softDel === "0") {
				record.status = 1;
				record.Message = "Menu name already present in our System!!! Kindly add another menu name";

			} else {
				record.status = 1;
				record.Message = "Menu name is inactive in our System!!! Kindly use edit functionality to activate it.";
			}
		} else {
			addMenu(inputData, connection, record);
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

	case "getMenu":
		getMenu();
		break;
	case "getMenus":
		getMenus();
		break;
	case "addMenu":
		addMenu();
		break;
	case "updateMenu":
		updateMenu();
		break;
	case "deleteMenu":
		deleteMenu();
		break;
	case "validateMenu":
		validateMenu();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}