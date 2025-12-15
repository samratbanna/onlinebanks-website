export const mongoIdToShortId = (mongoId) => {
    const buffer = Buffer.from(mongoId, 'hex');
    return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const shortIdToMongoId = (shortId) => {
    const base64 = shortId.replace(/-/g, '+').replace(/_/g, '/');
    const buffer = Buffer.from(base64, 'base64');
    return buffer.toString('hex');
};