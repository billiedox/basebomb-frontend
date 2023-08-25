
export const fetchMerkleProof = async (account: string) => {
    const response = await fetch(`/api/presale/merkleproof?account=${account}`);
    const result = await response.json();
    if (result.success) {
        return result.data;
    }
    return null;
}


export const isWhiteListed = async (account: string) => {
    const response = await fetch(`/api/presale/iswhitelisted?account=${account}`);
    const result = await response.json();
    return result.isWhiteListed;
}