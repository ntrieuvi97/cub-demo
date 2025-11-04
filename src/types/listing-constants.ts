/**
 * Property Type codes
 */
export enum PropertyType {
    SELL = 38,
    RENT = 49
}

/**
 * Sell category codes
 */
export enum SellCategoryCode {
    /** Bán nhà riêng */
    BAN_NHA_RIENG = 41,
    /** Bán căn hộ */
    BAN_CAN_HO = 324,
    /** Bán biệt thự */
    BAN_BIET_THU = 325,
    /** Bán shophouse */
    BAN_SHOP_HOUSE = 575,
    /** Bán đất */
    BAN_DAT = 283,
    /** Bán đất dự án */
    BAN_DAT_DU_AN = 40,
    /** Bán trang trại */
    BAN_TRANG_TRAI = 44,
    /** Bán condotel */
    BAN_CONDOTEL = 562,
    /** Bán warehouse */
    BAN_WAREHOUSE = 45,
    /** Bán loại khác */
    BAN_LOAI_KHAC = 48,
    /** Bán nhà mặt phố */
    BAN_NHA_MAT_PHO = 163
}

/**
 * Rent category codes
 */
export enum RentCategoryCode {
    /** Thuê nhà riêng */
    THUE_NHA_RIENG = 52,
    /** Thuê căn hộ */
    THUE_CAN_HO = 326,
    /** Thuê biệt thự */
    THUE_BIET_THU = 577,
    /** Thuê shophouse */
    THUE_SHOPHOUSE = 576,
    /** Thuê phòng trọ */
    THUE_PHONG_TRO = 57,
    /** Thuê kho */
    THUE_KHO = 53,
    /** Thuê nhà mặt phố */
    THUE_NHA_MAT_PHO = 51,
    /** Thuê văn phòng */
    THUE_VAN_PHONG = 50,
    /** Thuê kios */
    THUE_KIOS = 55,
    /** Thuê loại khác */
    THUE_LOAI_KHAC = 59
}

/**
 * VIP type codes
 */
export enum VipTypeCode {
    /** Tin thường */
    TIN_THUONG = 5,
    /** VIP Bạc */
    VIP_BAC = 3,
    /** VIP Vàng */
    VIP_VANG = 1,
    /** VIP Kim Cương */
    VIP_KIM_CUONG = 0
}

/**
 * Helper type for all category codes (Sell + Rent)
 */
export type CategoryCode = SellCategoryCode | RentCategoryCode;

/**
 * Friendly name mappings for property types
 */
export const PropertyTypeMapping: Record<string, PropertyType> = {
    'sell': PropertyType.SELL,
    'bán': PropertyType.SELL,
    'ban': PropertyType.SELL,
    'rent': PropertyType.RENT,
    'thuê': PropertyType.RENT,
    'thue': PropertyType.RENT
};

/**
 * Friendly name mappings for sell categories
 */
export const SellCategoryMapping: Record<string, SellCategoryCode> = {
    'apartment': SellCategoryCode.BAN_CAN_HO,
    'căn hộ': SellCategoryCode.BAN_CAN_HO,
    'can ho': SellCategoryCode.BAN_CAN_HO,
    
    'house': SellCategoryCode.BAN_NHA_RIENG,
    'nhà riêng': SellCategoryCode.BAN_NHA_RIENG,
    'nha rieng': SellCategoryCode.BAN_NHA_RIENG,
    
    'villa': SellCategoryCode.BAN_BIET_THU,
    'biệt thự': SellCategoryCode.BAN_BIET_THU,
    'biet thu': SellCategoryCode.BAN_BIET_THU,
    
    'shophouse': SellCategoryCode.BAN_SHOP_HOUSE,
    'shop house': SellCategoryCode.BAN_SHOP_HOUSE,
    
    'land': SellCategoryCode.BAN_DAT,
    'đất': SellCategoryCode.BAN_DAT,
    'dat': SellCategoryCode.BAN_DAT,
    
    'project land': SellCategoryCode.BAN_DAT_DU_AN,
    'đất dự án': SellCategoryCode.BAN_DAT_DU_AN,
    'dat du an': SellCategoryCode.BAN_DAT_DU_AN,
    
    'farm': SellCategoryCode.BAN_TRANG_TRAI,
    'trang trại': SellCategoryCode.BAN_TRANG_TRAI,
    'trang trai': SellCategoryCode.BAN_TRANG_TRAI,
    
    'condotel': SellCategoryCode.BAN_CONDOTEL,
    
    'warehouse': SellCategoryCode.BAN_WAREHOUSE,
    'kho': SellCategoryCode.BAN_WAREHOUSE,
    
    'townhouse': SellCategoryCode.BAN_NHA_MAT_PHO,
    'nhà mặt phố': SellCategoryCode.BAN_NHA_MAT_PHO,
    'nha mat pho': SellCategoryCode.BAN_NHA_MAT_PHO,
    
    'other': SellCategoryCode.BAN_LOAI_KHAC,
    'khác': SellCategoryCode.BAN_LOAI_KHAC,
    'khac': SellCategoryCode.BAN_LOAI_KHAC
};

/**
 * Friendly name mappings for rent categories
 */
export const RentCategoryMapping: Record<string, RentCategoryCode> = {
    'apartment': RentCategoryCode.THUE_CAN_HO,
    'căn hộ': RentCategoryCode.THUE_CAN_HO,
    'can ho': RentCategoryCode.THUE_CAN_HO,
    
    'house': RentCategoryCode.THUE_NHA_RIENG,
    'nhà riêng': RentCategoryCode.THUE_NHA_RIENG,
    'nha rieng': RentCategoryCode.THUE_NHA_RIENG,
    
    'villa': RentCategoryCode.THUE_BIET_THU,
    'biệt thự': RentCategoryCode.THUE_BIET_THU,
    'biet thu': RentCategoryCode.THUE_BIET_THU,
    
    'shophouse': RentCategoryCode.THUE_SHOPHOUSE,
    'shop house': RentCategoryCode.THUE_SHOPHOUSE,
    
    'room': RentCategoryCode.THUE_PHONG_TRO,
    'phòng trọ': RentCategoryCode.THUE_PHONG_TRO,
    'phong tro': RentCategoryCode.THUE_PHONG_TRO,
    
    'warehouse': RentCategoryCode.THUE_KHO,
    'kho': RentCategoryCode.THUE_KHO,
    
    'townhouse': RentCategoryCode.THUE_NHA_MAT_PHO,
    'nhà mặt phố': RentCategoryCode.THUE_NHA_MAT_PHO,
    'nha mat pho': RentCategoryCode.THUE_NHA_MAT_PHO,
    
    'office': RentCategoryCode.THUE_VAN_PHONG,
    'văn phòng': RentCategoryCode.THUE_VAN_PHONG,
    'van phong': RentCategoryCode.THUE_VAN_PHONG,
    
    'kiosk': RentCategoryCode.THUE_KIOS,
    'kios': RentCategoryCode.THUE_KIOS,
    
    'other': RentCategoryCode.THUE_LOAI_KHAC,
    'khác': RentCategoryCode.THUE_LOAI_KHAC,
    'khac': RentCategoryCode.THUE_LOAI_KHAC
};

/**
 * Friendly name mappings for VIP types
 */
export const VipTypeMapping: Record<string, VipTypeCode> = {
    'normal': VipTypeCode.TIN_THUONG,
    'tin thường': VipTypeCode.TIN_THUONG,
    'tin thuong': VipTypeCode.TIN_THUONG,
    'regular': VipTypeCode.TIN_THUONG,
    
    'vip silver': VipTypeCode.VIP_BAC,
    'vip bạc': VipTypeCode.VIP_BAC,
    'vip bac': VipTypeCode.VIP_BAC,
    'silver': VipTypeCode.VIP_BAC,
    'bạc': VipTypeCode.VIP_BAC,
    'bac': VipTypeCode.VIP_BAC,
    
    'vip gold': VipTypeCode.VIP_VANG,
    'vip vàng': VipTypeCode.VIP_VANG,
    'vip vang': VipTypeCode.VIP_VANG,
    'gold': VipTypeCode.VIP_VANG,
    'vàng': VipTypeCode.VIP_VANG,
    'vang': VipTypeCode.VIP_VANG,
    
    'vip diamond': VipTypeCode.VIP_KIM_CUONG,
    'vip kim cương': VipTypeCode.VIP_KIM_CUONG,
    'vip kim cuong': VipTypeCode.VIP_KIM_CUONG,
    'diamond': VipTypeCode.VIP_KIM_CUONG,
    'kim cương': VipTypeCode.VIP_KIM_CUONG,
    'kim cuong': VipTypeCode.VIP_KIM_CUONG
};

/**
 * Helper function to get PropertyType from friendly name
 */
export function getPropertyType(name: string): PropertyType {
    const normalizedName = name.toLowerCase().trim();
    const propertyType = PropertyTypeMapping[normalizedName];
    
    if (propertyType === undefined) {
        throw new Error(`Unknown property type: "${name}". Valid values: ${Object.keys(PropertyTypeMapping).join(', ')}`);
    }
    
    return propertyType;
}

/**
 * Helper function to get CategoryCode from friendly name based on property type
 */
export function getCategoryCode(propertyTypeName: string, categoryName: string): CategoryCode {
    const normalizedCategoryName = categoryName.toLowerCase().trim();
    const propertyType = getPropertyType(propertyTypeName);
    
    if (propertyType === PropertyType.SELL) {
        const category = SellCategoryMapping[normalizedCategoryName];
        if (category === undefined) {
            throw new Error(`Unknown sell category: "${categoryName}". Valid values: ${Object.keys(SellCategoryMapping).join(', ')}`);
        }
        return category;
    } else {
        const category = RentCategoryMapping[normalizedCategoryName];
        if (category === undefined) {
            throw new Error(`Unknown rent category: "${categoryName}". Valid values: ${Object.keys(RentCategoryMapping).join(', ')}`);
        }
        return category;
    }
}

/**
 * Helper function to get VipTypeCode from friendly name
 */
export function getVipType(name: string): VipTypeCode {
    const normalizedName = name.toLowerCase().trim();
    const vipType = VipTypeMapping[normalizedName];
    
    if (vipType === undefined) {
        throw new Error(`Unknown VIP type: "${name}". Valid values: ${Object.keys(VipTypeMapping).join(', ')}`);
    }
    
    return vipType;
}
