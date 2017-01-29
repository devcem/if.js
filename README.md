# if.js
###### (v0.1.0)

if.js is a fast and effective validator library. It helps to validate e-mail, phone number, date and expressions. Please don't hesitate to share your thoughts.

Demo link : https://codepen.io/imagets/pen/XpVbKr

### Before getting started
Here are some points about this validator ;
- It checks if your input has "if" attribute.
- It gives class names to directly to the input or element.
- If input has "require" attribute, it will check on start. That means you'll see "success" or "error" classes on start.
- You can write if attribute on form element as well. It checks all form inputs and gives class to form element if ALL elements are valid. You can check form's validation with this : if="this.valid"

You can input if.js with this code :
```
_if.init();
```
Also if.js has two argument, they are elements and options. You can set them like that :
```
_if.init('input, select', {
    timeout : 50
});
```

### Validate with expression
You can enable if.js with this way ;
```
<input if="this.value">
```
If.js checks all elements if they had "if" attribute on them. You can write expression in this attribute to validate your input or you can check it's type to validate if it's email, phone etc.

Here is another example ;
```
<input if="this.length < 12">
```
In this example, as you can see, it counts it's character length and if this input has not less than 12 character, you'll see that input is not validated. In expression mode, you can use "length", "value" and "checked" attributes.
### Validate with type
If.js checks element's potentiel types when they trigger. With this way, you'll be able to check if it's email, phone or full name.

Here is an example for type validation ;
```
<input if="this.type == 'email'">
```
As you can see, it checks if it's type is email or not.

Another example to check if it's phone ;
```
<input if="this.type == 'phone'">
```

### Style

You can set your input validation styles on if.js init. Here is a code snippet to set classes.

```
_if.init('input, select', {
    class : {
		success : 'successClassName',
		error : 'errorClassName'
	}
});
```

### Options
```
_if.init('input, select', {
    timeout : (integer),
    validateOnSubmit : (boolean)
});
```

License
----

MIT
