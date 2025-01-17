var WEG = WEG || {}; // make sure WEG is available

WEG.dataTable = {
	init: function(){
		$('.xtt-datatable').each(function(){
			var $table = $(this);
			var options = {"paginate": false, "order": [], "info": false, "lengthChange":false};
			var aoColumnDefs = [];
			var sortTargets = [];
			if(typeof dataTableLang !== typeof undefined){
				options['language'] = dataTableLang;
			}
			$table.find('thead').first().find('th').each(function(i){
				if(!$(this).hasClass('xtt-sortable')){
					sortTargets.push(i);
				}
			});
			if(sortTargets.length>0){
				aoColumnDefs.push({ "bSortable": false, "aTargets": sortTargets});
			}
			if(aoColumnDefs.length>0){
				options['aoColumnDefs'] = aoColumnDefs;
			}
			
			if($table.hasClass('xtt-datatable-reorder')){
				options['dom'] = 'Rlfrtip';
			}
			if($table.hasClass('xtt-datatable-paginate') && $table.find('tbody tr').length>10){
				options['paginate'] = true;
			}
			if($table.hasClass('xtt-datatable-responsive')){
				options['responsive'] = true;
				$table.css('width','100%');
			}
			if($table.hasClass('xtt-datatable-affix') && $table.closest('.container').width() >= $table.width()){
				var table = $table.dataTable(options);
				new $.fn.dataTable.FixedHeader(table);
			}else{
				$table.dataTable(options);
			}
		});
		$('.xtt-update-table-size').on('change',function(){
			var value = parseInt(this.value,10);
			$($(this).attr('data-target')).dataTable().api().page.len(value).draw();
		});
	}
};

$(document).ready(function() {
	WEG.dataTable.init();
});