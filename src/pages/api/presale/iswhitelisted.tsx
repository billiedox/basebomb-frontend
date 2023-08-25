import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { whitelistAddr } from 'config/constants/whitelist'

export default function handler(req, res) {
  const { account } = req.query
  if (!account) {
    res.status(200).json({ isWhiteListed: false })
  }
  const leaves = whitelistAddr.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  const rootHash = merkleTree.getRoot().toString('Hex')

  const hashedAddress = keccak256(account)
  const merkleProof = merkleTree.getHexProof(hashedAddress)
  res.status(200).json({ isWhiteListed: merkleTree.verify(merkleProof, hashedAddress, rootHash) })
}
