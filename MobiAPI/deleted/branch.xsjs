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
 * To delete any Branch on the behalf of Branch id.
 * @Param {String} Branch id as an input.
 * @return {output} success or failure.
 */
function deleteBranch() {

}

/**
 * To Update any Branch on the behalf of Branch id.
 * @Param {String} Branch id as an input.
 * @return {output} success or failure.
 */
function updateBranch() {

}

/**
 * To fetch any Branch on the behalf of Branch code.
 * @Param {String} Branch id as an input.
 * @return {output} row of resultset.
 */
function getBranch() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	var BranchCode = $.request.parameters.get('BranchCode');
	try {
		var query = 'Select BRANCH_CODE ,BRANCH_DESC,ZONE_CODE from "MOBI"."MST_BRANCH" where BRANCH_CODE = ?';
		var pstmt = connection.prepareStatement(query);
		pstmt.setString(1, BranchCode);
		var r = pstmt.executeQuery();
		connection.commit();
		while (r.next()) {
			var record = {};
			record.BranchCode = r.getString(1);
			record.BranchName = r.getString(2);
			record.AreaCode = r.getString(3);
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
 * To fetch All Branch .
 * @Param {String} Branch id as an input.
 * @return {output} row of resultset.
 */
function getBranchs() {
	var output = {
		results: []
	};
	var connection = $.db.getConnection();
	try {
		var query = 'Select BRANCH_CODE ,BRANCH_DESC,ZONE_CODE from "MOBI"."MST_BRANCH" ';
		var pstmt = connection.prepareStatement(query);
		var r = pstmt.executeQuery();
		connection.commit();
		while (r.next()) {
			var record = {};
			record.BranchCode = r.getString(1);
			record.BranchName = r.getString(2);
			record.AreaCode = r.getString(3);
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
 * To add Branch into Branch master table.
 * @Param {dataLine} string variable.
 * @return {String} integer.
 */
function addBranch() {
	var output = {
		results: []
	};
	var records;
	var datasLine = $.request.parameters.get('OrderLine');
	var records = {};
	var dataLine = JSON.parse(datasLine.replace(/\\r/g, ""));

	var conn1 = $.db.getConnection();
	try {
		if (dataLine.length > 0) {
			for (var i = 0; i < dataLine.length; i++) {
				var dicLine = dataLine[i];
				var queryBranch = 'select BRANCH_CODE  from "MOBI"."MST_BRANCH" where BRANCH_CODE = ?';
				var pstmtBranch = conn1.prepareStatement(queryBranch);
				pstmtBranch.setString(1, dicLine.BRANCH_CODE);
				var rBranch = pstmtBranch.executeQuery();
				if (rBranch.next()) {
					records.status = 0;
					records.message = 'Record Allready inserted!';
				} else {
					var query =
						'insert into  "MOBI"."MST_BRANCH"("BRANCH_CODE","BRANCH_DESC","ZONE_CODE") values(?,?,?)';
					var pstmt = conn1.prepareStatement(query);
					pstmt.setString(1, dicLine.BRANCHCODE);
					pstmt.setString(2, dicLine.BRANCHDESC);
					pstmt.setString(3, dicLine.ZONECODE);
					var rs = pstmt.executeUpdate();
					conn1.commit();
					records = {};
					if (rs > 0) {
						records.status = 1;
						records.message = 'Data Uploaded Sucessfully';
					} else {
						records.status = 0;
						records.message = 'Some Issues!';
					}
				}
				output.results.push(records);

			}
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

	case "getBranchs":
		getBranchs();
		break;
	case "getBranch":
		getBranch();
		break;
	case "addBranch":
		addBranch();
		break;

	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}