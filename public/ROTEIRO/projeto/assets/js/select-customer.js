$(".xtt-table-header-customers").each(function(){
	var $div=$('.xtt-popover-header-customers').closest('.xtt-popover-click').addClass('active');
	var $clientTable = $div.find("#table-header-customers").DataTable({
		"paging": false,
		"paginate": false,
		"info": false,
		"order": []
	});
	$div.removeClass('active').find(".xtt-search-customer").on( 'keyup', function () {
		$clientTable.search( this.value ).draw();
	});
});

$(".xtt-table-customer").each(function(){
	var $div = $(this).closest('.xtt-popover-click').addClass('active');
	var $customerTable = $(this).DataTable({
		paging: false,
		"info": false,
		"ordering": false,
		"scrollY": "200px"
	});
	$div.removeClass('active').find('.xtt-search-customer').on('keyup',function(){
		$customerTable.search( this.value ).draw();
	});
});

var $showCustomer = $('.xtt-show-customer');

var $selectCustomer = $('.xtt-select-customer').on('change',function(ev){
	var i = $(this).find('option:selected').length;
	if(i>0){
		$showCustomer.find('span').first().html(i+' customer(s) selected');
	}else{
		$showCustomer.find('span').first().html($showCustomer.attr('data-select-customer'));
	}
});

$('.xtt-check-customer').on('change', function(ev){
	var $check = $(this);
	var val = $check.val();
	if($check.prop('checked')){
		$selectCustomer.find('option[value='+val+']').attr('selected', true).end().trigger('change');
		$check.closest('tr').addClass('active');
	}else{
		$selectCustomer.find('option[value='+val+']').attr('selected', false).end().trigger('change');
		$check.closest('tr').removeClass('active');
	}
});
