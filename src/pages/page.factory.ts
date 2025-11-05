import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { PropertyPostingPage } from './property-posting.page';
import { PostDetailPage } from './post-detail.page';
import { ListingManagementPage } from './listing-management.page';
import {LoginPage} from "./login_pages/login.page";

/**
 * Page Object Factory - centralized management of page objects
 * Usage: const pages = new PageFactory(page);
 *        const homePage = pages.home();
 */
export class PageFactory {
    private page: Page;
    private pageCache: Map<string, any> = new Map();

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Get or create HomePage instance
     */
    home(): HomePage {
        if (!this.pageCache.has('home')) {
            this.pageCache.set('home', new HomePage(this.page));
        }
        return this.pageCache.get('home');
    }

    /**
     * Get or create PropertyPostingPage instance
     */
    propertyPosting(): PropertyPostingPage {
        if (!this.pageCache.has('propertyPosting')) {
            this.pageCache.set('propertyPosting', new PropertyPostingPage(this.page));
        }
        return this.pageCache.get('propertyPosting');
    }

    /**
     * Get or create PostDetailPage instance
     */
    postDetail(): PostDetailPage {
        if (!this.pageCache.has('postDetail')) {
            this.pageCache.set('postDetail', new PostDetailPage(this.page));
        }
        return this.pageCache.get('postDetail');
    }

    /**
     * Get or create ListingManagementPage instance
     */
    listingManagement(): ListingManagementPage {
        if (!this.pageCache.has('listingManagement')) {
            this.pageCache.set('listingManagement', new ListingManagementPage(this.page));
        }
        return this.pageCache.get('listingManagement');
    }

    loginPage(): LoginPage{
        if (!this.pageCache.has('loginPage')) {
            this.pageCache.set('loginPage', new LoginPage(this.page));
        }
        return this.pageCache.get('loginPage');
    }

    /**
     * Clear all cached page objects (useful when page context changes)
     */
    clearCache(): void {
        this.pageCache.clear();
    }

    /**
     * Update the page reference for all cached page objects
     */
    updatePage(newPage: Page): void {
        this.page = newPage;
        this.clearCache();
    }

}
