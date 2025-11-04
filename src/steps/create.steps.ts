



import { When, } from '@cucumber/cucumber';
import { timeouts } from '../configs';
import { CustomWorld } from '../support/world';


When('I create a new listing with the following details:', { timeout: timeouts.pageInteraction }, async function (this: CustomWorld, dataTable) {
    const listingDetails = dataTable.rowsHash();
    console.log('Listing Details:', listingDetails);


});
When(/^I input the listing information with:$/, function () {

});