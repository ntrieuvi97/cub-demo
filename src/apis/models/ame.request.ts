/**
 * AME (Listing Orchestrator) Service Request Models
 */

import { generateRequestId } from '../common-headers';

/**
 * AME Publish Listing Request payload model
 */
export interface PublishListingRequest {
    productId: number;
    actorId: number;
    ownerId: number;
    correlationId?: string;
    note?: string;
}

/**
 * Default values for publish listing request
 */
export const DEFAULT_PUBLISH_REQUEST: PublishListingRequest = {
    productId: 0,
    actorId: 0,
    ownerId: 0,
    correlationId: generateRequestId(),
    note: '[Automation] Published listing by Automation Tester'
};

/**
 * Explanation for suspension
 */
export interface SuspendExplanation {
    description: string;
    reason: string;
    reasonCode: string;
    title: string;
}

/**
 * AME Suspend Listing Request payload model
 */
export interface SuspendListingRequest {
    productId: number;
    actorId: number;
    ownerId: number;
    correlationId?: string;
    note?: string;
    explanations?: SuspendExplanation[];
}

/**
 * Default values for suspend listing request
 */
export const DEFAULT_SUSPEND_REQUEST: SuspendListingRequest = {
    productId: 0,
    actorId: 0,
    ownerId: 0,
    correlationId: generateRequestId(),
    note: '[Automation] Suspend listing',
    explanations: [
        {
            description: '[Automation] Set up listing state',
            reason: 'Category',
            reasonCode: '0',
            title: '[Automation] Set up listing state'
        }
    ]
};

/**
 * AME Mark Review Listing Request payload model
 */
export interface MarkReviewListingRequest {
    productId: number;
    actorId: number;
    ownerId: number;
    correlationId?: string;
    note?: string;
}

/**
 * Default values for mark review listing request
 */
export const DEFAULT_MARK_REVIEW_REQUEST: MarkReviewListingRequest = {
    productId: 0,
    actorId: 0,
    ownerId: 0,
    correlationId: generateRequestId(),
    note: '[Automation] Mark review listing'
};

