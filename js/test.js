jQuery(function($) {

	$('#action').change( function() {
	
		var action = $(this).val();
		
		var aclField = '<label class="col-md-4 control-label" for="aclValue">Acl</label><div class="col-md-4"><input id="aclValue" name="aclValue" type="text" placeholder="entity, [permissions]" class="form-control input-md" ><span class="help-block">Enter the ACL entity, and, if adding or updating, the acl permissions</span></div></div>';
		
		switch (action) {
		
			case '2':
				$('#action-select').append(aclField);
				break;
			case '3':
				$('#action-select').append(aclField);
				break;
		
		}
	
	});

});
