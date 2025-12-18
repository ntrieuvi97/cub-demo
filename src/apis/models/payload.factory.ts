import { LoginRequest, DEFAULT_LOGIN_REMEMBER_ME } from './ums.request';
import { 
    CreateListingRequest, 
    RequiredListingFields,
    DEFAULT_LISTING_OPTIONAL_FIELDS 
} from './bff-listing.request';
import { 
    PublishListingRequest,
    DEFAULT_PUBLISH_REQUEST,
    SuspendListingRequest,
    DEFAULT_SUSPEND_REQUEST,
    MarkReviewListingRequest,
    DEFAULT_MARK_REVIEW_REQUEST
} from './ame.request';

/**
 * Common factory for creating API request payloads with default values
 */
export class PayloadFactory {
    /**
     * Create a login request payload (UMS)
     */
    static createLogin(
        username: string,
        password: string,
        rememberMe: boolean = false
    ): LoginRequest {
        return {
            input: username,
            password: password,
            isRemember: rememberMe ? 1 : DEFAULT_LOGIN_REMEMBER_ME
        };
    }

    /**
     * Create a listing request payload with default values (BFF Listing)
     */
    static createListing(
        requiredFields: RequiredListingFields,
        optionalFields?: Partial<Omit<CreateListingRequest, keyof RequiredListingFields>>
    ): CreateListingRequest {
        return {
            ...DEFAULT_LISTING_OPTIONAL_FIELDS,
            ...requiredFields,
            ...optionalFields
        };
    }

    /**
     * Create a publish listing request payload (AME)
     */
    static createPublishListing(params: Partial<PublishListingRequest>): PublishListingRequest {
        return {
            ...DEFAULT_PUBLISH_REQUEST,
            ...params
        };
    }

    /**
     * Create a suspend listing request payload (AME)
     */
    static createSuspendListing(params: Partial<SuspendListingRequest>): SuspendListingRequest {
        return {
            ...DEFAULT_SUSPEND_REQUEST,
            ...params
        };
    }

    /**
     * Create a mark review listing request payload (AME)
     */
    static createMarkReviewListing(params: Partial<MarkReviewListingRequest>): MarkReviewListingRequest {
        return {
            ...DEFAULT_MARK_REVIEW_REQUEST,
            ...params
        };
    }
}
