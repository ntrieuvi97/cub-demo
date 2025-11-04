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
 * Factory function to create listing request with default values
 */
export function createListingRequest(
    params: {
        title: string;
        description: string;
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
        viptype?: string;
        streetId?: number;
        projectId?: number;
        bedroomCount?: number;
        toiletCount?: number;
        floorCount?: number;
        facadeWidth?: number;
        houseDirection?: number;
        balconyDirection?: number;
        unitPrice?: number;
    }
): CreateListingRequest {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 10); // Default 10 days listing period

    return {
        // Required fields
        title: params.title,
        descContent: params.description,
        productType: params.productType,
        categoryId: params.categoryId,
        price: params.price,
        cityCode: params.cityCode,
        districtId: params.districtId,
        wardId: params.wardId,
        address: params.address,
        contactMobile: params.contactMobile,
        contactName: params.contactName,
        contactEmail: params.contactEmail,
        acreage: params.acreage,
        fileIds: params.fileIds,
        
        // Optional fields with defaults
        viptype: params.viptype || "3",
        startDate: now.toISOString(),
        endDate: endDate.toISOString(),
        streetId: params.streetId || 0,
        projectId: params.projectId || 0,
        contactAddress: "",
        contactPhone: null,
        draftId: 0,
        productId: 0,
        wayInWidth: "",
        bedroomCount: params.bedroomCount || 0,
        unitPrice: params.unitPrice || 2,
        facadeWidth: params.facadeWidth || 0,
        houseDirection: params.houseDirection || 0,
        isAddOn: false,
        isReceiEmail: false,
        discount: 0,
        addDay: 0,
        furniture: "",
        legality: "",
        toiletCount: params.toiletCount || 0,
        floorCount: params.floorCount || 0,
        balconyDirection: params.balconyDirection || 0,
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
}
