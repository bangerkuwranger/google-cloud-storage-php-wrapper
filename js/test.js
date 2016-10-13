jQuery(function($) {

	$('#action').change( function() {
	
		var action = $(this).val();
		
		var aclEntityField = '<div class="form-group"><label class="col-md-4 control-label" for="aclEntityValue">Acl</label><div class="col-md-4"><input id="aclEntityValue" name="aclEntityValue" type="text" placeholder="entity" class="form-control input-md" ><span class="help-block">Enter the ACL entity</span></div></div></div>';
		var aclRoleField = '<div class="form-group"><label class="col-md-4 control-label" for="aclRoleValue">Acl</label><div class="col-md-4"><input id="aclRoleValue" name="aclRoleValue" type="text" placeholder="Acl::role" class="form-control input-md" ><span class="help-block">Enter the ACL role</span></div></div></div>';
		
		switch (action) {
		
			case '2':
				$('#action-select').after(aclEntityField);
				$('#action-select').after(aclRoleField);
				break;
			case '3':
				$('#action-select').after(aclEntityField);
				break;
		
		}
	
	});

});
