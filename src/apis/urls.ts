

export const WebUrls = {
    baseUrl: 'https://staging.propertyguru.vn/',
    loginPage: 'https://staging.propertyguru.vn/sellernet/trang-dang-nhap',
    listingCreationPage: 'https://staging.propertyguru.vn/nguoi-ban/dang-tin',
    listingManagementPage: 'https://staging.propertyguru.vn/nguoi-ban/quan-ly-tin-rao-ban-cho-thue',
    bffApiBaseUrl: 'https://api.staging.propertyguru.vn/',
    sellernetApiBaseUrl: 'https://sellernetapi.staging.propertyguru.vn/',
    internalApiBaseUrl: 'https://api-aws.staging.bds.lc/',
};


export const UMSEndpoint = {
    signIn: `user-management-service/api/v1/User/Login`,
    fetchContact: 'api/user/fetchContact',
}

export const BffListingEndpoint = {
    createListing: 'bff-seller/listings',
}

export const CommonEndpoint = {
    fetchCityList: 'api/common/fetchCityList',
    fetchDistrictList: 'api/common/fetchDistrictList',
    fetchWardList: 'api/common/fetchWardList',
}

export const AMEEndpoint = {
    publish: 'listing-v2-orchestrator/api/v2/ame/publish',
    suspend: 'listing-v2-orchestrator/api/v2/ame/suspend',
    markReview: 'listing-v2-orchestrator/api/v2/ame/mark-review',
}
