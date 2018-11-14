require.config({
	//all js setting
	paths : {
		'json3' : 'lib/js/json3.min',
		'jquery' : 'lib/js/jquery/jquery-1.8.2',
		'jquery-ui' : 'lib/js/jquery/ui/js/jquery-ui-1.8.23.custom.min',
		'jqgrid-i18n' : 'lib/js/jquery/plugin/jquery.jqGrid-4.2.0/js/i18n/grid.locale-zh',
		'jqgrid' : 'lib/js/jquery/plugin/jquery.jqGrid-4.2.0/js/jquery.jqGrid.min',
		'validate-i18n' : 'lib/js/jquery/plugin/formValidator/languages/jquery.validationEngine-zh_TW',
		'validate' : 'lib/js/jquery/plugin/formValidator/jquery.validationEngine',
		'fileupload' : 'lib/js/jquery/plugin/ajaxfileupload/ajaxfileupload',
		'blockui' : 'lib/js/jquery/plugin/blockUI/jquery.blockUI',
		'underscore' : 'lib/js/backbone/underscore',
		'backbone' : 'lib/js/backbone/backbone',
		'combobox' : 'lib/js/jquery/plugin/combobox',
		'jqMS-filter' : 'lib/js/jquery/plugin/jquery.multiselect2.filter.min',
		'jqMS' : 'lib/js/jquery/plugin/jquery.multiselect2.min',
		'dateTimePicker' : 'lib/js/jquery/plugin/dateTimePicker/jquery-ui-timepicker-addon',
	},
	shim : {
		'jquery-ui' : ['jquery'],
		'jqgrid-i18n' : ['jquery'],
		'jqgrid' : ['jquery-ui', 'jqgrid-i18n'],
		'validate-i18n' : ['jquery'],
		'validate' : ['jquery', 'validate-i18n'],
		'fileupload' : ['jquery'],
		'blockui' : ['jquery'],
		'backbone' : ['underscore', 'jquery'],
		'combobox' : ['jquery'],
		'jqMS-filter' : ['jquery'],
		'jqMS' : ['jquery'],
		'dateTimePicker' : ['jquery']
	}
});

define('libjs', ['json3', 'jquery', 'jquery-ui', 'jqgrid', 'validate', 'fileupload', 'blockui', 'backbone','combobox','jqMS-filter','jqMS','dateTimePicker'], function() {
	window.console && window.console.log('lib init');
});

