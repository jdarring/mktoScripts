/**
 * Title: Bootstrap 5 For Marketo Forms
 * Author: Josh Arrington
 * Description: Attempts to destyle all Marketo forms on a page and then restyle them with Bootrap 5 Classes
 */

function destyleMktoForm(mktoForm){
	var formEl = mktoForm.getFormElem()[0],
		arrayify = getSelection.call.bind([].slice);

	// remove element styles from <form> and children
	var styledEls = arrayify(formEl.querySelectorAll("[style]")).concat(formEl);	
	styledEls.forEach(function(el) {
		el.removeAttribute("style");
	});

	// disable remote stylesheets and local <style>s
	var styleSheets = arrayify(document.styleSheets);	
	styleSheets.forEach(function(ss) {
		if ( [mktoForms2BaseStyle,mktoForms2ThemeStyle].indexOf(ss.ownerNode) != -1 || formEl.contains(ss.ownerNode) ) {
			ss.disabled = true;
		} 
	});

   /* Additional Style */
   const asteriskElements = document.querySelectorAll('.mktoAsterix');
	for (let i = 0; i < asteriskElements.length; i++) {
		const element = asteriskElements[i];
		element.classList.add('d-inline','pe-1', 'text-danger');
	}
  // Hide duplicate labels for Checkboxes
  jQuery('.mktoLogicalField').siblings('label').hide();

}; 

/* Add Bootstrap Classes */
function  bootstrapMktoForm(mktoForm){

    jQuery('input').addClass('form-control');
    jQuery('select').addClass('form-control');
    jQuery('textarea').addClass('form-control');
    jQuery('label').addClass('form-label mb-0 mt-1 small');

    // Update Submit Button
    var button = jQuery('button[type="submit"].mktoButton');
    button.addClass('btn btn-primary mt-2');

}

MktoForms2.whenRendered(function(form) {
    window.form_obj = form;
    console.log('Form Rendered', form);

    destyleMktoForm(form);
    bootstrapMktoForm(form);
  
});
