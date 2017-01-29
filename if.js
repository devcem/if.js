/*!
 * if.js 0.1.0
 * Author: Cem Demir
 */

var _if = {
	class : {
		success : 'success',
		error   : 'danger'
	},
	init : function(elements, options){
		options  = options ? options : {};
		elements = elements ? elements : 'input, select'
		elements = document.querySelectorAll(elements);

		options.timeout = typeof options.timeout != 'undefined' ? options.timeout : 200;

		for(_key in options.class){
			_class = options.class[_key];

			eval('_if.class.' + _key + ' = "' + _class + '"');
		}

		Array.prototype.forEach.call(elements, function(item, i){
			if(item.hasAttribute){
				item.onkeydown = item.onchange = function(){
					clearTimeout(item.timeout);
					item.timeout = null;
					item.timeout = setTimeout(function(self){
						_if.check(self);
						_if.checkForm();
					}, options.timeout, this);
				}

				item.attr = function(arg){
					return this.getAttribute(arg);
				}

				if(item.attr('required') !== null){
					item.onchange();
				}

				item.getType = function(){
					types = [];
					for(key in _if.test){
						type = _if.test[key];

						if(type(this.value)){
							types.push(key);
						}
					}

					return types;
				}

				item.getLength = function(){
					return this.value.length;
				}

				item.getCheck = function(){
					return this.checked;
				}

				item.setClass = function(className){
					for(_class in _if.class){
						_class = _if.class[_class]
						this.className = this.className.replace(' ' + _class, '');
					}

					if(className){
						this.className+=' ' + className;
					}
				}
			}
		});
	},
	replaceAll : function(target, search, replacement){
		return target.replace(new RegExp(search, 'gm'), replacement);
	},
	checkForm : function(){
		forms = document.querySelectorAll('form');

		Array.prototype.forEach.call(forms, function(form, i){
			form.valid = true;
			
			for(item in form.childNodes){
				item = form.childNodes[item];

				if(item.valid == false){
					form.valid = false;
				}
			}

			className = form.valid ? _if.class.success : _if.class.error;

			for(_class in _if.class){
				_class = _if.class[_class];
				if(form.className){
					form.className = form.className.replace(' ' + _class, '');
				}
			}

			if(form.hasAttribute('if')){
				form.className+=' ' + className;
			}
		});
	},
	check : function(item){
		_require = item.attr('if');
		_require = _require.replace('this', 'item');
		_require = _require.replace('type', 'getType()');
		_require = _require.replace('length', 'getLength()');
		_require = _require.replace('checked', 'getCheck()');
		_require = _require.replace('valid', 'getValid()');
		_require = _if.replaceAll(_require, '-', '_');

		if(eval(_require)){
			item.setClass(_if.class.success);
			item.valid = true;
		}else{
			item.setClass(_if.class.error);
			item.valid = false;
		}
	},
	test : {
		email : function(value){
			return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
		},
		date : function(value){
			value = _if.replaceAll(value, '_', '-');
			value = _if.replaceAll(value, '/', '-');
			//value = _if.replaceAll(value, '.', '-');
			return (/[0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4}/).test(value);
		},
		full_name : function(value){
			return (/(.*) (.*)/).test(value);
		},
		phone : function(value){
			return (/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/).test(value);
		}
	}
}