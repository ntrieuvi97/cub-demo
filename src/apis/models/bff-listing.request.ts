/**
 * BFF Listing Service Request Models
 */

/**
 * Required fields for creating a listing
 */
export interface RequiredListingFields {
    title: string;
    descContent: string;
    productType: number;
    categoryId: number;
    price: number;
    cityCode: string;
    districtId: number;
    wardId: number;
    address: string;
    contactMobile: string;
    contactName: string;
    contactEmail: string;
    acreage: number;
    fileIds: string;
}

/**
 * BFF Listing creation request payload model
 */
export interface CreateListingRequest {
    // Basic Information
    title: string;
    descContent: string;
    productType: number;
    categoryId: number;

    // Dates
    startDate: string;
    endDate: string;

    // Pricing
    viptype: string;
    price: number;
    unitPrice?: number;
    discount?: number;
    addDay?: number;

    // Location
    cityCode: string;
    districtId: number;
    wardId: number;
    streetId?: number;
    projectId?: number;
    address: string;
    contactAddress?: string;
    latitude?: number;
    longtitude?: number;

    // Contact Information
    contactMobile: string;
    contactName: string;
    contactPhone?: string | null;
    contactEmail: string;

    // Property Details
    acreage: number;
    wayInWidth?: string;
    bedroomCount?: number;
    toiletCount?: number;
    floorCount?: number;
    facadeWidth?: number;
    houseDirection?: number;
    balconyDirection?: number;
    furniture?: string;
    legality?: string;

    // IDs
    draftId?: number;
    productId?: number;

    // Media
    fileIds: string;
    videoUrl?: string;

    // Flags
    isAddOn?: boolean;
    isReceiEmail?: boolean;
    isVerified?: boolean;
    bundleBoostConfig?: boolean;
    isPPP?: boolean;

    // Promotions
    promotionId?: number;
    promotionType?: number;
    transAccountId?: number;
    promotionChecksum?: string;

    // Other
    period?: number;
    autoRenewConfigUpdateModel?: {
        totalCount: number;
        actionType: number;
    };
    listingModel?: any | null;
}

/**
 * Default values for optional listing fields
 */
export const DEFAULT_LISTING_OPTIONAL_FIELDS: Omit<CreateListingRequest, keyof RequiredListingFields> = {
    viptype: "3",
    startDate: new Date().toISOString(),
    endDate: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 10); // Default 10 days listing period
        return date.toISOString();
    })(),
    streetId: 0,
    projectId: 0,
    contactAddress: "",
    contactPhone: null,
    draftId: 0,
    productId: 0,
    wayInWidth: "",
    bedroomCount: 0,
    unitPrice: 2,
    facadeWidth: 0,
    houseDirection: 0,
    isAddOn: false,
    isReceiEmail: false,
    discount: 0,
    addDay: 0,
    furniture: "",
    legality: "",
    toiletCount: 0,
    floorCount: 0,
    balconyDirection: 0,
    promotionId: 0,
    promotionType: 0,
    transAccountId: 0,
    promotionChecksum: "",
    latitude: 0,
    longtitude: 0,
    videoUrl: "",
    period: -1,
    autoRenewConfigUpdateModel: {
        totalCount: 0,
        actionType: 1
    },
    isVerified: false,
    bundleBoostConfig: false,
    isPPP: false,
    listingModel: null
};
