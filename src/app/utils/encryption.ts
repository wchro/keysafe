export const hexToArray = (hex: string): Uint8Array => {
  const arr = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(arr.map((byte: any) => parseInt(byte, 16)));
};
