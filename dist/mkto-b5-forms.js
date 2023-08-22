/**
 * Title: Bootstrap 5 For Marketo Forms
 * Author: Josh Arrington
 * Description: De-styles all Marketo forms on a page and then restyles them with Bootstrap 5 classes.
 */

/**
 * Remove styles applied directly to Marketo form elements.
 * @param {Object} mktoForm - Marketo form object.
 */
function destyleMktoForm(mktoForm) {
    const formEl = mktoForm.getFormElem()[0];

    // Remove element styles from <form> and children.
    const styledEls = Array.from(formEl.querySelectorAll("[style]")).concat(formEl);
    styledEls.forEach(el => el.removeAttribute("style"));

    // Disable remote stylesheets and local <style> tags.
    Array.from(document.styleSheets).forEach(ss => {
        if ([mktoForms2BaseStyle, mktoForms2ThemeStyle].includes(ss.ownerNode) || formEl.contains(ss.ownerNode)) {
            ss.disabled = true;
        }
    });

    // Additional Style adjustments.
    document.querySelectorAll('.mktoAsterix').forEach(element => {
        element.classList.add('d-inline', 'pe-1', 'text-danger');
    });

    // Hide duplicate labels for Checkboxes using jQuery.
    jQuery('.mktoLogicalField').siblings('label').hide();
}

/**
 * Add Bootstrap 5 styling to Marketo form elements.
 * @param {Object} mktoForm - Marketo form object.
 */
function bootstrapMktoForm() {
    $ = jQuery;
    $('input:not([type="checkbox"])').addClass('form-control');
    $('div.mktoLogicalField').addClass('form-check my-2');
    $('div.mktoLogicalField input').addClass('form-check-input');
    $('div.mktoLogicalField label').addClass('form-check-label');
    $('select').addClass('form-select');
    $('label').addClass('form-label mb-0 mt-1 small');
    
    // Update Submit Button.
    $('button[type="submit"].mktoButton').addClass('btn btn-primary mt-2');
}
 
/**
 * Main driver function to destyle and then apply Bootstrap 5 styles.
 * This function is called when a Marketo form is rendered.
 */
MktoForms2.whenRendered(function(form) {
    try {
        console.log('Form Rendered', form);
        destyleMktoForm(form);
        bootstrapMktoForm();
    } catch (err) {
        console.error('Error processing Marketo form styling:', err);
    }
});
