const FIRESTORE_BASE_PATH = 'sites/warfare/';
export const FS_COL_FEATURES = FIRESTORE_BASE_PATH + 'features/';
export const FS_COL_ASPECTS = FIRESTORE_BASE_PATH + 'aspects/';
export const FS_COL_UNITS = FIRESTORE_BASE_PATH + 'units/';

export const convertFeatureDocToAspectChild = (feature) =>
    ({
        ...feature.data(),
        id: feature.id
    });

export const stripIdsFromArray = array => array.map(x => x.id);