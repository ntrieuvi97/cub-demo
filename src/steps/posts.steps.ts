import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import assert from 'assert';
import { isHeadless, baseUrl } from '../configs';
import { HomePage } from '../pages/home.page';
import { PostDetailPage } from '../pages/post-detail.page';

let browser: Browser;
let page: Page;
let homePage: HomePage;
let postDetailPage: PostDetailPage;

let postTitle: string;
let postUrl: string;

Given('I navigate to the Belivi Wordpress homepage', async function () {
  browser = await chromium.launch({ headless: isHeadless });
  page = await browser.newPage();
  homePage = new HomePage(page);
  await homePage.open(baseUrl);
});

When('I scroll to the bottom of the page', async function () {
  await homePage.scrollToBottom();
  await page.waitForTimeout(2000); // Wait for posts to load
});

Then('I should see 10 displayed posts', async function () {
  const posts = await homePage.getDisplayedPosts();
  assert.strictEqual(posts.length, 10, `Expected 10 posts, but found ${posts.length}`);
  await browser.close();
});

When('I click on a random post', async function () {
  const posts = await homePage.getDisplayedPosts();
  const randomIndex = Math.floor(Math.random() * posts.length);
  const post = posts[randomIndex];
  postTitle = (await post.textContent())?.trim() || '';
  postUrl = (await post.getAttribute('href')) || '';
  await post.click();
  await page.waitForLoadState('domcontentloaded');
  postDetailPage = new PostDetailPage(page);
});

Then('I should see the post details with correct url and title', async function () {
  const currentUrl = postDetailPage.getUrl();
  const displayedTitle = await postDetailPage.getTitle();
  if (postUrl) {
    assert.ok(currentUrl.includes(postUrl), `Expected URL to include ${postUrl}, but got ${currentUrl}`);
  }
  if (postTitle) {
    assert.ok(displayedTitle && displayedTitle.includes(postTitle), `Expected title to include ${postTitle}, but got ${displayedTitle}`);
  }
  await browser.close();
});
