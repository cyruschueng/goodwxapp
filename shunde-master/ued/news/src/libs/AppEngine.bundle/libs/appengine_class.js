/*
 * Simple JavaScript Inheritance By John Resig http://ejohn.org/ MIT Licensed.
 * URL:http://ejohn.org/blog/simple-javascript-inheritance/
 */
// Inspired by base2 and Prototype
module("/libs/appengine_template.js",function() {

    var initializing = false;

    // The base Class implementation (does nothing)
    this.Class = function() {
    };

    var preparePackage = function(className) {
        var eles = className.split('.');
        var currentPkg = "";
        for(var i = 0 ; i < eles.length - 1;i++) {
            if(i == 0) {
                currentPkg = eles[0];
            } else {
                currentPkg += "." + eles[i];
            }
            if("undefined" == eval("typeof "+currentPkg)) {
                eval(currentPkg+"={}");
            }
        }
    }

    // Create a new Class that inherits from this class
    Class.extend = function(className,prop) {
        if(prop == null) {
            prop = className;
            className = null;
        }

        if(className != null) {
            preparePackage(className);
        }

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for ( var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] =  prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        Class.className = className;

        if(className != null) {
            window.__temp__obj__ = Class;
            eval(className + "=window.__temp__obj__;");
            delete window.__temp__obj__;
        }

        return Class;
    };
});