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


/**
 * To fetch all areas of a district.
 * @Param {string} districtCode .
 * @Param [] output .
 * @return {String} array  .
 */ 
function getDistrictAreas(districtCode, output) {
	var connection = $.db.getConnection();
	var qryArea = 'SELECT * from "MOBI"."MST_AREA" WHERE DISTRICT_CODE =?';
	var pstmtArea = connection.prepareStatement(qryArea);
	pstmtArea.setString(1, districtCode);
	var rsAreaDetails = pstmtArea.executeQuery();

	while (rsAreaDetails.next()) {
		var record = {};
		record.AREACODE = rsAreaDetails.getString(1);
		record.AREADISCRIPTTION = rsAreaDetails.getString(2);
		record.DISTRICTCODE = rsAreaDetails.getString(3);
		record.SOFTDEL = rsAreaDetails.getString(4);
		record.CREATEDBY = rsAreaDetails.getString(5);
		record.CREATEDDATE = rsAreaDetails.getString(6);
		record.MODIFYBY = rsAreaDetails.getString(7);
		record.MODIFYDATE = rsAreaDetails.getString(8);
		output.results.push(record);
	}
	connection.commit();
	connection.close();
}

/**
To fetch all areas.
 * @Param {string} areaCode .
 * @Param [] output .
 * @return {String} array  .
 */ 
function getAreaDetails(areaCode, output) {
	var record;
	var recordZone;
	var zoneArray = [];
	var recordBranch;
	var branchArray = [];
	try {
		var connection = $.db.getConnection();
		var CallArea = 'call "MOBI"."MobiProcedure::Area_CRUD"(?,?,?,?);';
		var pstmtCallArea = connection.prepareCall(CallArea);
		pstmtCallArea.setString(1, areaCode);
		pstmtCallArea.setString(2, ' ');
		pstmtCallArea.setString(3, ' ');
		pstmtCallArea.setString(4, 'SELECT');
		pstmtCallArea.execute();
		var rsCallArea = pstmtCallArea.getResultSet();
		connection.commit();
		while (rsCallArea.next()) {
			record = {};
			record.COUNTRY = rsCallArea.getString(10);
			record.COUNTRYCODE = rsCallArea.getString(9);
			record.REGION = rsCallArea.getString(8);
			record.REGIONCODE = rsCallArea.getString(7);
			record.STATE = rsCallArea.getString(6);
			record.STATECODE = rsCallArea.getString(5);
			record.DISTRICT = rsCallArea.getString(4);
			record.DISTRICCODE = rsCallArea.getString(3);
			record.AREACODE = rsCallArea.getString(1);
			record.AREADESC = rsCallArea.getString(2);
		}

		var CallProZONE = 'call "MOBI"."MobiProcedure::Area_CRUD"(?,?,?,?)';
		var pstmtCallProZONE = connection.prepareCall(CallProZONE);
		pstmtCallProZONE.setString(1, record.AREACODE);
		pstmtCallProZONE.setString(2, 'null');
		pstmtCallProZONE.setString(3, 'null');
		pstmtCallProZONE.setString(4, 'AREAZONE');
		pstmtCallProZONE.execute();
		var rsCallProZONE = pstmtCallProZONE.getResultSet();
		connection.commit();
		while (rsCallProZONE.next()) {
			recordZone = {};
			recordZone.ZONECODE = rsCallProZONE.getString(1);
			recordZone.ZONENAME = rsCallProZONE.getString(2);

			var CallProBRANCH = 'call "MOBI"."MobiProcedure::Area_CRUD"(?,?,?,?)';
			var pstmtCallProBRANCH = connection.prepareCall(CallProBRANCH);
			pstmtCallProBRANCH.setString(1, recordZone.ZONECODE);
			pstmtCallProBRANCH.setString(2, 'null');
			pstmtCallProBRANCH.setString(3, 'null');
			pstmtCallProBRANCH.setString(4, 'AREABRANCH');
			pstmtCallProBRANCH.execute();
			var rsCallProBRANCH = pstmtCallProBRANCH.getResultSet();
			connection.commit();
			while (rsCallProBRANCH.next()) {
				recordBranch = {};
				recordBranch.BRANCHCODE = rsCallProBRANCH.getString(1);
				recordBranch.BRANCHNAME = rsCallProBRANCH.getString(2);
				branchArray.push(recordBranch);
				recordZone.BRANCH = branchArray;
			}

			zoneArray.push(recordZone);
			record.ZONE = zoneArray;
		}
		output.results.push(record);
		connection.close();
	} catch (e) {

		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
}

/**
 * To get area on the basis of district, state or country.
 * @Param {String} District Code .
 * @Param {String} State Code .
 * @Param {String} Country Code.
 * @return {String} .
 */
function getArea() {
	var output = {
		results: []
	};

	var areaDistrict = $.request.parameters.get('areaDistrict');
	var areaCode = $.request.parameters.get('areaCode');
	try {

		if (areaDistrict !== null && areaDistrict !== "") {
			getDistrictAreas(areaDistrict, output);
		}else if (areaCode !== null && areaCode !== "") {
			getAreaDetails(areaCode, output);
		}
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
 * To get all areas.
  * @return {object} array of a resultset.
 */
function getAreas() {
	var output = {
		results: []
	};
    var areaStatus = $.request.parameters.get('areaStatus');
	try {
        var qryAreas = null;
        var connection = $.db.getConnection();
        if(areaStatus === "Deleted") {
            qryAreas = 'SELECT * from "MOBI"."MST_AREA" where SOFT_DEL =\'1\'';
        } else if(areaStatus === "Active") {
            qryAreas = 'SELECT * from "MOBI"."MST_AREA" where SOFT_DEL=\'0\'';
        } else {
            qryAreas = 'SELECT * from "MOBI"."MST_AREA"';
        }
    	
    	var pstmtAreas = connection.prepareStatement(qryAreas);
    	var rsAreas = pstmtAreas.executeQuery();
    
    	while (rsAreas.next()) {
    		var record = {};
    		record.AREACODE = rsAreas.getString(1);
    		record.AREADISCRIPTTION = rsAreas.getString(2);
    		record.DISTRICTCODE = rsAreas.getString(3);
    		record.SOFT_DEL = rsAreas.getString(4);
    		record.CREATEDBY = rsAreas.getString(5);
    		record.CREATE_DATE = rsAreas.getString(6);
    		record.MODIFYBY = rsAreas.getString(7);
    		record.MODIFYDATE = rsAreas.getString(8);
    		checkStatusDescription(record);
            dateFormat(record);
    		output.results.push(record);
    	}
		
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
 * To add area into area master table.
 * @Param {areaDistt, areaCode, areaDesc} string variable.
 * @return {String} integer.
 */
function addArea() {

	var record;
	var Output = {
		results: []
	};

	var conn = $.db.getConnection();
	var areaDistrict = $.request.parameters.get('areaDistrict');
	var areaCode = $.request.parameters.get('areaCode');
	var areaDesc = $.request.parameters.get('areaDesc');

	try {
		record = {};
		var queryselect = 'select * from "MOBI"."MST_AREA" where area_code=?';
		var paramSelect = conn.prepareStatement(queryselect);
		paramSelect.setString(1, areaCode);
		var rsSelect = paramSelect.executeQuery();
		if (rsSelect.next()) {
			record.status = 0;
			record.Message = "Area  Already  Exist into database";
		} else {
			var CallPro = 'call "MOBI"."MobiProcedure::Area_CRUD"(?,?,?,?);';
			var pstmtCallPro = conn.prepareCall(CallPro);
			pstmtCallPro.setString(1, areaCode);
			pstmtCallPro.setString(2, areaDesc);
			pstmtCallPro.setString(3, areaDistrict);
			pstmtCallPro.setString(4, 'INSERT');
			pstmtCallPro.execute();
			var rCallPro = pstmtCallPro.getResultSet();
			conn.commit();
			if (rCallPro > 0) {
				record.status = 1;
				record.Message = "Record Successfully inserted";
			} else {
				record.status = 0;
				record.Message = "Record Successfully  inserted";
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

function deleteArea(){
	
	var Output = {
		results: []
	};
	 var record = {};
	var con = $.db.getConnection();
	var areaCode = $.request.parameters.get('areaCode');
	try {
			var qryDeleteArea = 'update "MOBI"."MST_AREA" set soft_Del=? where AREA_CODE=?';
			var pstmtDeleteArea = con.prepareStatement(qryDeleteArea);
			pstmtDeleteArea.setString(1, '1');
			pstmtDeleteArea.setString(2, areaCode);
			var rsDeleteArea = pstmtDeleteArea.executeUpdate();
			con.commit();
			if (rsDeleteArea > 0) {
				record.status = '0';
				record.message = 'Successfully deleted Area';
			} else {
				record.status = '1';
				record.message = 'failed to delete Area.Kindly contact to Admin!!! ';
			}
		Output.results.push(record);
		con.close();
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

function updateArea(){

	var Output = {
		results: []
	};
	
   var record = {};
	var con = $.db.getConnection();
	var areaCode = $.request.parameters.get('areaCode');
	var areaDesc = $.request.parameters.get('areaDesc');
	var areaDistrict = $.request.parameters.get('areaDistrict');
	var softDel =  $.request.parameters.get('softDel');
    
	try {
			var qryDeleteArea = 'update  "MOBI"."MST_AREA" set 	AREA_DESC=? ,SOFT_DEL=?  where AREA_CODE=? and DISTRICT_CODE=?';
			var pstmtDeleteArea = con.prepareStatement(qryDeleteArea);
			pstmtDeleteArea.setString(1, areaDesc);
			pstmtDeleteArea.setString(2, softDel);
			pstmtDeleteArea.setString(3, areaCode);
			pstmtDeleteArea.setString(4, areaDistrict);
			
			
			var rsDeleteArea = pstmtDeleteArea.executeUpdate();
			con.commit();
			
			if (rsDeleteArea > 0) {
				record.status = '0';
				record.message = 'Successfully update  Area';
			} else {
				record.status = '1';
				record.message = 'failed to update  Area.Kindly contact to Admin!!! ';
			}
		Output.results.push(record);
		con.close();
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

	case "getArea":
		getArea();
		break;
	case "addArea":
		addArea();
		break;
    case "getAreas":
		getAreas();
		break;
	case "updateArea":
	    updateArea();
	    break;
	case "deleteArea":
	    deleteArea();
	    break;
	default:
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Invalid Command');

}