Printer [v0.1.0-alpha]
======
Printer is an AJAX style page loading jQuery plugin that retrieves the URL from each hyperlink in the sidebar on the fly upon being clicked. It can also function as a rudimentry slideshow (but keep in mind this plugin does not cache any resources, i.e. Printer will make a new AJAX request on each new slide).

##So what is this exactly?
Take a look [here](http://amd940.github.io/Printer/).

##What features does it have?
Printer features many things you'd expect from a jQuery plugin:
- A robust API (almost)
- Super simple setup
- Low overhead (getting there..)
- Highly customizable behavior and appearance
- Cross browser compatible (for newer browsers, not yet tested in older browsers)

Printer also features:
- Super smooth CSS animations (Thanks [daneden](https://github.com/daneden)!)
- Slideshow mode
- Adaptive height mode (Not yet implemented)
- Random page printing direction mode
- Intelligent State Handling (via [History.js](https://github.com/browserstate/history.js), Not yet implemented)

##How do I use it?
It couldn't be simpler (well, maybe it could). First, import the dependent files in the page head:
```html
<link type="text/css" rel="stylesheet" href="css/jquery.printer.css">
<link type="text/css" rel="stylesheet" href="css/animate.css">
<script src="scripts/jquery.min.js"></script>
<script src="scripts/jquery.printer.js"></script>
```

Next, add the needed HTML:
```html
<div id="printer">
	<div id="sidebar">
		<a href="page1.html">Page 1</a>
		<a href="page2.html">Page 2</a>
		<a href="page3.html">Page 3</a>
		<a href="page4.html">Page 4</a>
	</div>
	<div id="tray"></div>
</div>
```

And finally, fire it up:
```javascript
$('#printer').printer();
```

**That's it!** Wasn't that easy?

##Why the name "Printer"?
Ah, I'm glad you asked. Mostly because the plugin's visual representation and core concept very loosly resembles a printer. If you look through the HTML in the [example](http://amd940.github.io/Printer/) above, you'll notice names resembling parts of a printer (mostly). There's the "sidebar" where links sit on the left, and a "tray" where the "page" prints into.

##Is there an API reference?
Why, yes, there is.


###Options
Option |Default Setting|Description
-------|:---------:|---------
height | `"200px"` | Specifies the height of the entire printer.
width  | `"auto"`  | Specifies the width of the entire printer.
speed  | `1400`    | The speed at which each new Page is Printed, specified in milliseconds.
shading| `true`    | Enable or disable the CSS box-shadow shading of the printer's UI.
tray   | `"#tray"`   | The id (or class) of the element that will serve as the tray. (**Warning**: The tray must be inside of the printer.)
sidebar| `"#sidebar"`| The id (or class) of the element that will serve as the sidebar. (**Warning**: The sidebar must be inside of the printer.)

###Methods
Method|Arguments|Description
-------|:---------:|---------
reset  |`[options]`| Reset the entire printer to it's original state. Accepts an optional new set of options as an object.
destroy| none      | Remove all traces of the printer in question.

###Events
Event|Description
-------|-----------
onlick | Fires when the user clicks on a hyperlink in the sidebar.
onload | Fires when the plugin has fully finished loading.
onbeforeprint| Fires when the AJAX request is complete but the page has not yet begun to print.
onprint| Fires when the page begins to print.
onprintcomplete| Fires when the page has finished printing.



##Can I use this for my own project/website/etc?
Printer is licensed under the [MIT License](http://opensource.org/licenses/MIT), which means it is free to be used in whatever you wish to use it in. In other words, go nuts!


##Credits
I'd like to thank [Daniel Eden](https://github.com/daneden) for his super awesome animate.css file. See it in action [here](http://daneden.github.io/animate.css/).

I'd also like to thank the [jQuery Team](https://jquery.org/team/) for building such an easy to use and extensible framework.

Also, many thanks to GitHub for providing this awesome hosting platform free of charge.

##Disclaimer
This is my first ever GitHub repo so I apologize in advance if any of it's not up to par.
