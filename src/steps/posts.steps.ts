import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import assert from 'assert';
import { baseUrl, timeouts } from '../configs';
import { CustomWorld } from '../support/world';

let postTitle: string;
let postUrl: string;


Given('I navigate to the homepage', { timeout: timeouts.navigation }, async function (this: CustomWorld) {
  const homePage = this.pages.home();
  await homePage.open(baseUrl);
});

Then('I should see {int} displayed posts', { timeout: timeouts.elementLoad }, async function (this: CustomWorld, expectedCount: number) {
  const homePage = this.pages.home();
  const posts = await homePage.getDisplayedPosts();
  assert.strictEqual(posts.length, expectedCount, `Expected ${expectedCount} posts, but found ${posts.length}`);
});

When('I click on a random post', { timeout: timeouts.pageInteraction }, async function (this: CustomWorld) {
  const homePage = this.pages.home();
  const posts = await homePage.getDisplayedPosts();
  assert(posts.length > 0, 'No posts found to click');
  const randomIndex = Math.floor(Math.random() * posts.length);
  const post = posts[randomIndex];
  postTitle = (await post.textContent())?.trim() || '';
  postUrl = (await post.getAttribute('href')) || '';
  await post.click();
  await this.page!.waitForLoadState('domcontentloaded');
});

Then('I should see the post details with correct url and title', { timeout: timeouts.verification }, async function (this: CustomWorld) {
  const postDetailPage = this.pages.postDetail();
  const currentUrl = await postDetailPage.getUrl();
  const displayedTitle = await postDetailPage.getTitle();
  if (postUrl) {
    assert.ok(currentUrl.includes(postUrl), `Expected URL to include ${postUrl}, but got ${currentUrl}`);
  }
  if (postTitle) {
    assert.ok(displayedTitle && displayedTitle.includes(postTitle), `Expected title to include ${postTitle}, but got ${displayedTitle}`);
  }
});