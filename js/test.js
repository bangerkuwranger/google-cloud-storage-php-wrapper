jQuery(function($) {

	var action = $('#action').val();
	showTestFields( action );
	
	$('#action').change( function() {
	
		var action = $(this).val();
		showTestFields( action );
	
	}
	
	
	function showTestFields( action ) {
		
		var allFieldSelectors = '#aclEntityField, #aclRoleField';
		
		var aclEntityField = '<div id="aclEntityField" class="form-group"><label class="col-md-4 control-label" for="aclEntityType">ACL Entity Type</label><div class="col-md-4"><select id="aclEntityType" name="aclEntityType" class="form-control"><option value="user-">User</option><option value="group-">group</option><option value="domain-">Domain</option><option value="project-">Project</option><option value="allUsers">All Users</option><option value="allAuthenticatedUsers">All Authenticated Users</option></select></div></div><div class="form-group"><label class="col-md-4 control-label" for="aclEntityValue">Acl Entity</label><div class="col-md-4"><input id="aclEntityValue" name="aclEntityValue" type="text" placeholder="Acl::role" class="form-control input-md" ><span class="help-block">Enter the ACL role</span></div></div></div>';
		var aclRoleField = '<div id="aclRoleField" class="form-group"><label class="col-md-4 control-label" for="aclRole">ACL Entity Type</label><div class="col-md-4"><select id="aclRole" name="aclRole" class="form-control"><option value="OWNER">Owner</option><option value="READER">Reader</option><option value="WRITER">Writer</option></select></div></div>';
		
		switch (action) {
		
			case '2':
				if($('#aclEntityField').length < 1 ) {
				
					$('#action-select').after(aclEntityField);
					
				}
				if($('#aclRoleField').length < 1 ) {
				
					$('#action-select').after(aclRoleField);
				
				}
				break;
			case '3':
				if($('#aclEntityField').length < 1 ) {
				
					$('#action-select').after(aclEntityField);
					
				}
				break;
			default:
				$(allFieldSelectors).remove();
		
		}
	
	});

});
