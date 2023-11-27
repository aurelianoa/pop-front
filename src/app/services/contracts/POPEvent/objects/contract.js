import abi from "./abi.json";

export const contractAddress = process.env.NEXT_PUBLIC_EVENT_CONTRACT !== undefined ? process.env.NEXT_PUBLIC_EVENT_CONTRACT : "";
export const contractABI = abi;