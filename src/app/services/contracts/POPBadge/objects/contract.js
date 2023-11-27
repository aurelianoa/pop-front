import abi from "./abi.json";

export const contractAddress = process.env.NEXT_PUBLIC_BADGE_CONTRACT !== undefined ? process.env.NEXT_PUBLIC_BADGE_CONTRACT : "";
export const contractABI = abi;