import {After, defineStep} from '@cucumber/cucumber';
import {timeouts} from '../configs';

const scrollStep = 'I scroll to the bottom of the page';

async function scrollToBottom(context: any) {
    if (!context.page) throw new Error('page is not initialized on World context');
    await context.page.evaluate(async () => {
        await new Promise<void>(resolve => {
            const scrollStep = 50;
            const scrollInterval = 10;
            const scroll = () => {
                if (window.scrollY + window.innerHeight < document.body.scrollHeight) {
                    window.scrollBy(0, scrollStep);
                    setTimeout(scroll, scrollInterval);
                } else {
                    resolve();
                }
            };
            scroll();
        });
    });
}

defineStep(scrollStep, { timeout: timeouts.pageInteraction }, async function () {
    await scrollToBottom(this);
});


After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});