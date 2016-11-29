jQuery(function($) {

	var action = $('#action').val();
	showTestFields( action );
	
	$('#action').change( function() {
	
		var action = $(this).val();
		showTestFields( action );
	
	});
	
	
	function showTestFields( action ) {

		var aclEntityField = '<div id="aclEntityField-type" class="form-group"><label class="col-md-4 control-label" for="aclEntityType">ACL Entity Type</label><div class="col-md-4"><select id="aclEntityType" name="aclEntityType" class="form-control"><option value="user-">User</option><option value="group-">group</option><option value="domain-">Domain</option><option value="project-">Project</option><option value="allUsers">All Users</option><option value="allAuthenticatedUsers">All Authenticated Users</option></select></div></div><div id="aclEntityField-entity" class="form-group"><label class="col-md-4 control-label" for="aclEntityValue">Acl Entity</label><div class="col-md-4"><input id="aclEntityValue" name="aclEntityValue" type="text" placeholder="entity id or email" class="form-control input-md" ></div></div></div>';
		var aclRoleField = '<div id="aclRoleField" class="form-group"><label class="col-md-4 control-label" for="aclRole">ACL Role</label><div class="col-md-4"><select id="aclRole" name="aclRole" class="form-control"><option value="OWNER">Owner</option><option value="READER">Reader</option><option value="WRITER">Writer</option></select></div></div>';
		var fileUploadField = '<div id="fileUploadField" class="form-group"><label class="col-md-4 control-label" for="fileUpload">File to Upload</label><div class="col-md-4"><input id="fileUpload" name="fileUpload" class="input-file" type="file"></div></div>';
		var predefinedAclField = '<div id="predefinedAclField" class="form-group"><label class="col-md-4 control-label" for="predefinedAcl">ACL Role</label><div class="col-md-4"><select id="predefinedAcl" name="predefinedAcl" class="form-control"><option value="private">Private</option><option value="projectPrivate">Private, Use Project Roles</option><option value="bucketOwnerRead">Private, Project Members can Read</option><option value="bucketOwnerFullControl">Private, Project Members are Owners</option><option value="authenticatedRead">Public, All Authenticated Users can Read</option><option value="publicRead">Public, All Users can Read</option></select></div></div>';
		var twoObjects = '<div id="twoObjects-one" class="form-group"><label class="col-md-4 control-label" for="objectOne">Acl Entity</label><div class="col-md-4"><input id="objectOne" name="objectOne" type="text" placeholder="object_name.ftype" class="form-control input-md" ></div></div><div id="twoObjects-two" class="form-group"><label class="col-md-4 control-label" for="objectTwo">Acl Entity</label><div class="col-md-4"><input id="objectTwo" name="objectTwo" type="text" placeholder="object_name.ftype" class="form-control input-md" ></div></div>';
		clearTestFields();
		switch (action) {
		
			case '2':
				$('#action-select').after(aclRoleField);
				$('#action-select').after(aclEntityField);
				break;
			case '3':
				$('#action-select').after(aclEntityField);
				break;
			case '4':
				$('#action-select').after(aclEntityField);
				break;
			case '5':
				$('#action-select').after(aclRoleField);
				$('#action-select').after(aclEntityField);
				break;
			case '6':
				$('#action-select').after(predefinedAclField);
				$('#action-select').after(fileUploadField);
				break;
			case '7':
				$('#action-select').after(predefinedAclField);
				$('#action-select').after(fileUploadField);
				break;
			case '8':
				$('#action-select').after(twoObjects);
				break;
			case '12':
				$('#action-select').after(aclRoleField);
				$('#action-select').after(aclEntityField);
				break;
			case '13':
				$('#action-select').after(aclEntityField);
				break;
			case '14':
				$('#action-select').after(aclRoleField);
				$('#action-select').after(aclEntityField);
				break;
			case '15':
				$('#action-select').after(twoObjects);
				break;
			case '16':
				$('#action-select').after(twoObjects);
				break;
			case '17':
				$('#action-select').after(twoObjects);
				break;
		
		}
	
	}
	
	function clearTestFields() {
	
		var allFieldSelectors = '#aclEntityField-entity, #aclEntityField-type, #aclRoleField, #fileUploadField, #predefinedAclField, #twoObjects-one, #twoObjects-two';
		$(allFieldSelectors).remove();
	
	}

});
