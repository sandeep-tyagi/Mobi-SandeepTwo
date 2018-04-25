/*
 * Purpose:GET ALL DETAILS 
 * Input:
 * Output:
 * Exception:
 * Created By: SHRIYANSI
 * Created Date:
 */
function getDETAILS() {
	var output = {
		results: []
	};
	var conn1 = $.db.getConnection();
	try {
		var CallPro = 'call "MOBI"."MobiProcedure::SaleAndDelivery"();';
		var pstmtCallPro = conn1.prepareCall(CallPro);
		/*pstmtCallPro.setString(1, 'C699 WR');*/
		pstmtCallPro.execute();
		var rCallPro = pstmtCallPro.getResultSet();
		conn1.commit();
		while (rCallPro.next()) {
			var record = {};
			record.PRIMARY_CUSTOMER = rCallPro.getString(1);
			record.INVOICENO = rCallPro.getString(2);
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



var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

	case "getDETAILS":
		getDETAILS();
		break;

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}