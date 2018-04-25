function getMSTMenu() {
	var conn = $.db.getConnection();
	var data = {
		navigation: []
	};
	var record;
	try {
		var query = 'select "TITLE","ICON","EXPANDED","KEY","ITEMS" from "MOBI"."DEMO"';
		var pstmt = conn.prepareStatement(query);
		var rs = pstmt.executeQuery();
		conn.commit();
		while (rs.next()) {
			record = {};
			record.title = rs.getString(1);
			record.icon = rs.getString(2);
			record.expanded = false;
			record.key = rs.getString(4);
			record.items = rs.getString(5);
			data.navigation.push(record);
		}
		conn.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	var body = JSON.stringify(data);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}
var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
	case "getMSTMenu":
		getMSTMenu();
		break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}