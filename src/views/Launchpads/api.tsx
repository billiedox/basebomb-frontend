
export const fetchMerkleProof = async (account: string) => {
    const result = await fetch(`/api/presale/merkleproof?account=${account}`);
    if (result.success) {
        return result.data;
    } else {    
        return null;
    }
}


export const isWhiteListed = async (account: string) => {
    const result = await fetch(`/api/presale/iswhitelisted?account=${account}`);
    return result.isWhiteListed;
}