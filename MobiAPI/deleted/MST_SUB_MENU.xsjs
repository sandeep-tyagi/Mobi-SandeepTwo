
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


function getMST_SUB_MENU() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	var subMenuName = $.request.parameters.get('subMenuName');
	var menuId = $.request.parameters.get('menuId');
	var orderNo = $.request.parameters.get('orderNo');
	var url = $.request.parameters.get('url');
	if(orderNo === undefined || orderNo === null || orderNo === '')
	{
	    orderNo=0;
	}

    if(menuId === undefined || menuId === null || menuId === '')
	{
	    menuId=0;
	}
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::MST_SUB_MENU"(?,?,?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
		pstmtCallPro.setString(2, subMenuName);
		pstmtCallPro.setInteger(3, parseInt(menuId,10));
		pstmtCallPro.setInteger(4, parseInt(orderNo,10));
		pstmtCallPro.setString(5, url);
		pstmtCallPro.setInteger(6, 0);
		pstmtCallPro.setString(7, 'ADMIN');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, ' ');
		pstmtCallPro.setString(10, dateFunction());
		pstmtCallPro.setString(11, 'SELECT');
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.MENU_NAME = rCallPro.getString(1);
			record.SUBMENU_ID = rCallPro.getString(2);
			record.SUB_MENU_NAME = rCallPro.getString(3);
			record.MENU_ID = rCallPro.getString(4);
			record.ORDER_NO = rCallPro.getString(5);
			record.URL = rCallPro.getString(6);
			record.SOFT_DEL = rCallPro.getString(7);
			record.CREATE_BY = rCallPro.getString(8);
			record.CREATE_DATE = rCallPro.getString(9);
			record.MODIFIED_BY = rCallPro.getString(10);
			record.MODIFIED_DATE = rCallPro.getString(11);
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

function addMST_SUB_MENU() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var subMenuName = $.request.parameters.get('subMenuName');
	var menuId = $.request.parameters.get('menuId');
	var orderNo = $.request.parameters.get('orderNo');
	var url = $.request.parameters.get('url');
	
		if(orderNo === undefined || orderNo === null || orderNo === '')
	{
	    orderNo=0;
	}

    if(menuId === undefined || menuId === null || menuId === '')
	{
	    menuId=0;
	}
	
	try {
		record = {};
		var CallPro = 'call "MOBI"."MobiProcedure::MST_SUB_MENU"(?,?,?,?,?,?,?,?,?,?,?);';
		var pstmtCallPro = conn.prepareCall(CallPro);
		pstmtCallPro.setInteger(1, 0);
 		pstmtCallPro.setString(2, subMenuName);
 		pstmtCallPro.setInteger(3, parseInt(menuId,10));
 		pstmtCallPro.setInteger(4, parseInt(orderNo,10));
 		pstmtCallPro.setString(5, url);
    	pstmtCallPro.setString(6, '0');
		pstmtCallPro.setString(7, 'null');
		pstmtCallPro.setString(8, dateFunction());
		pstmtCallPro.setString(9, 'null');
		pstmtCallPro.setString(10, dateFunction());
		pstmtCallPro.setString(11, 'INSERT');
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

function updateMST_SUB_MENU() {
	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var submenuID_EditSubMenu = $.request.parameters.get('submenuID_EditSubMenu');
	var submenuNAME_EditSubMenu = $.request.parameters.get('submenuNAME_EditSubMenu');
	var submenuORDERNO_SubEditMenu = $.request.parameters.get('submenuORDERNO_SubEditMenu');
	var submenuURL_EditSubMenu = $.request.parameters.get('submenuURL_EditSubMenu');

	try {
		var UpdCallPro = 'call "MOBI"."MobiProcedure::MST_SUB_MENU"(?,?,?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(UpdCallPro);
	    pstmtUpdCallPro.setInteger(1, parseInt(submenuID_EditSubMenu,10));
		pstmtUpdCallPro.setString(2, submenuNAME_EditSubMenu);
		pstmtUpdCallPro.setInteger(3, 0);
		pstmtUpdCallPro.setInteger(4, parseInt(submenuORDERNO_SubEditMenu,10));
		pstmtUpdCallPro.setString(5, submenuURL_EditSubMenu);
		pstmtUpdCallPro.setInteger(6, 0);
		pstmtUpdCallPro.setString(7, 'ADMIN');
		pstmtUpdCallPro.setString(8, dateFunction());
		pstmtUpdCallPro.setString(9, ' ');
		pstmtUpdCallPro.setString(10, dateFunction());
		pstmtUpdCallPro.setString(11, 'UPDATE');
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

function deleteMST_SUB_MENU() {
    	var Output = {
		results: []

	};
	var record = {};
	var conn = $.db.getConnection();
	var submenuID_Delmenu = $.request.parameters.get('submenuID_Delmenu');

	try {
		var DelCallPro = 'call "MOBI"."MobiProcedure::MST_SUB_MENU"(?,?,?,?,?,?,?,?,?,?,?);';
		var pstmtUpdCallPro = conn.prepareCall(DelCallPro);
	    pstmtUpdCallPro.setInteger(1, parseInt(submenuID_Delmenu,10));
		pstmtUpdCallPro.setString(2, ' ');
		pstmtUpdCallPro.setInteger(3, 0);
		pstmtUpdCallPro.setInteger(4, 0);
		pstmtUpdCallPro.setString(5, ' ');
		pstmtUpdCallPro.setString(6, '1');
		pstmtUpdCallPro.setString(7, 'ADMIN');
		pstmtUpdCallPro.setString(8, dateFunction());
		pstmtUpdCallPro.setString(9, ' ');
		pstmtUpdCallPro.setString(10, dateFunction());
		pstmtUpdCallPro.setString(11, 'DELETE');
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

	case "getMST_SUB_MENU":
		getMST_SUB_MENU();
		break;
	case "addMST_SUB_MENU":
		addMST_SUB_MENU();
		break;
	case "updateMST_SUB_MENU":
		updateMST_SUB_MENU();
		break;
    case "deleteMST_SUB_MENU":
		deleteMST_SUB_MENU();
		break;		
    
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}