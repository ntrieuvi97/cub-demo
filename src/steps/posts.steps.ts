import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import assert from 'assert';
import { isHeadless, baseUrl, timeouts } from '../configs';
import { HomePage } from '../pages/home.page';
import { PostDetailPage } from '../pages/post-detail.page';

let postDetailPage: PostDetailPage;
let postTitle: string;
let postUrl: string;

Given('I navigate to the homepage', { timeout: timeouts.navigation }, async function () {
  this.browser = await chromium.launch({ headless: isHeadless });
  this.page = await this.browser.newPage();
  this.homePage = new HomePage(this.page);
  await this.homePage.open(baseUrl);
});

Then('I should see {int} displayed posts', { timeout: timeouts.elementLoad }, async function (expectedCount: number) {
  const posts = await this.homePage.getDisplayedPosts();
  assert.strictEqual(posts.length, expectedCount, `Expected ${expectedCount} posts, but found ${posts.length}`);
});

When('I click on a random post', { timeout: timeouts.pageInteraction }, async function () {
  const posts = await this.homePage.getDisplayedPosts();
  assert(posts.length > 0, 'No posts found to click');
  const randomIndex = Math.floor(Math.random() * posts.length);
  const post = posts[randomIndex];
  postTitle = (await post.textContent())?.trim() || '';
  postUrl = (await post.getAttribute('href')) || '';
  await post.click();
  await this.page.waitForLoadState('domcontentloaded');
  postDetailPage = new PostDetailPage(this.page);
});

Then('I should see the post details with correct url and title', { timeout: timeouts.verification }, async function () {
  const currentUrl = await postDetailPage.getUrl();
  const displayedTitle = await postDetailPage.getTitle();
  if (postUrl) {
    assert.ok(currentUrl.includes(postUrl), `Expected URL to include ${postUrl}, but got ${currentUrl}`);
  }
  if (postTitle) {
    assert.ok(displayedTitle && displayedTitle.includes(postTitle), `Expected title to include ${postTitle}, but got ${displayedTitle}`);
  }
});