jQuery(function($) {

	var action = $('#action').val();
	showTestFields( action );
	
	$('#action').change( function() {
	
		var action = $(this).val();
		showTestFields( action );
	
	});
	
	
	function showTestFields( action ) {

		var aclEntityField = '<div id="aclEntityField-type" class="form-group"><label class="col-md-4 control-label" for="aclEntityType">ACL Entity Type</label><div class="col-md-4"><select id="aclEntityType" name="aclEntityType" class="form-control"><option value="user-">User</option><option value="group-">group</option><option value="domain-">Domain</option><option value="project-">Project</option><option value="allUsers">All Users</option><option value="allAuthenticatedUsers">All Authenticated Users</option></select></div></div><div id="aclEntityField-entity class="form-group"><label class="col-md-4 control-label" for="aclEntityValue">Acl Entity</label><div class="col-md-4"><input id="aclEntityValue" name="aclEntityValue" type="text" placeholder="entity id or email" class="form-control input-md" ></div></div></div>';
		var aclRoleField = '<div id="aclRoleField" class="form-group"><label class="col-md-4 control-label" for="aclRole">ACL Role</label><div class="col-md-4"><select id="aclRole" name="aclRole" class="form-control"><option value="OWNER">Owner</option><option value="READER">Reader</option><option value="WRITER">Writer</option></select></div></div>';
		clearTestFields();
		switch (action) {
		
			case '2':
				$('#action-select').after(aclRoleField);
				$('#action-select').after(aclEntityField);
				break;
			case '3':
				$('#action-select').after(aclEntityField);
				break;
				
		
		}
	
	}
	
	function clearTestFields() {
	
		var allFieldSelectors = '#aclEntityField-entity, #aclEntityField-type, #aclRoleField';
		$(allFieldSelectors).remove();
	
	}

});
