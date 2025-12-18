/**
 * API Request Models
 * 
 * This directory contains request payload models for API calls organized by service.
 * Only request models are maintained here since this is an E2E test repository.
 * 
 * Services:
 * - UMS: User Management Service (login, authentication)
 * - BFF Listing: Backend for Frontend Listing API (create listing)
 * - AME: Listing Orchestrator (publish, suspend, mark review)
 */

export * from './ums.request';
export * from './bff-listing.request';
export * from './ame.request';
export * from './payload.factory';
