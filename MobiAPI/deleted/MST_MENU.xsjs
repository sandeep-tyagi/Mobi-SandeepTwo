
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
	var conn1 = $.db.getConnection();
	var menuName = $.request.parameters.get('menuName');
	var orderNo = $.request.parameters.get('orderNo');
	if(orderNo === undefined || orderNo === null || orderNo === '')
	{
	    orderNo=0;
	}
    var url = $.request.parameters.get('url');
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, menuName);
		pstmtCallPro.setInteger(3, parseInt(orderNo,10));
		pstmtCallPro.setString(4, url);
		pstmtCallPro.setString(5, '0');
		pstmtCallPro.setString(6, 'ADMIN');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, ' ');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.MENU_ID = rCallPro.getString(1);
			record.MENU_NAME = rCallPro.getString(2);
			record.ORDER_NO = rCallPro.getString(3);
			record.URL =  rCallPro.getString(4);
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

function addMenu() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var menuName = $.request.parameters.get('menuName');
	var orderNo = $.request.parameters.get('orderNo');
    var url = $.request.parameters.get('url');
	
	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setString(2, menuName);
 		pstmtCallPro.setInteger(3, parseInt(orderNo,10));
 		pstmtCallPro.setString(4, url);
    	pstmtCallPro.setString(5, '0');
		pstmtCallPro.setString(6, 'null');
		pstmtCallPro.setString(7, dateFunction());
		pstmtCallPro.setString(8, 'null');
		pstmtCallPro.setString(9, dateFunction());
		pstmtCallPro.setString(10, 'INSERT');
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

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(menuIdEditMenu,10));
		pstmtUpdCallPro.setString(2, menuNameEditMenu);
    	pstmtUpdCallPro.setInteger(3, parseInt(menuOrderNoEditMenu,10));
		pstmtUpdCallPro.setString(4, menuUrlEditMenu);
		pstmtUpdCallPro.setString(5, '0');
		pstmtUpdCallPro.setString(6, 'ADMIN');
		pstmtUpdCallPro.setString(7, dateFunction());
		pstmtUpdCallPro.setString(8, ' ');
		pstmtUpdCallPro.setString(9, dateFunction());
		pstmtUpdCallPro.setString(10, 'UPDATE');
		pstmtUpdCallPro.execute();
		var rsUpdCallPro = pstmtUpdCallPro.getParameterMetaData();
		addMenu.commit();

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
	var menuId = $.request.parameters.get('menuID_Delmenu');

	try {
		var DelCallPro = 'call "MOBI"."MobiProcedure::MST_MENU"(?,?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(DelCallPro);
		pstmtUpdCallPro.setInteger(1, parseInt(menuId,10));
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

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

	case "getMenu":
		getMenu();
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
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}