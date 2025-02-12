//TODO: Convertir en servicio??

export const generateHex = (arr: Uint8Array) => {
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const hexToArray = (hex: string): Uint8Array => {
  const arr = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(arr.map((byte: any) => parseInt(byte, 16)));
};

export const generateCryptoKey = async (
  key: Uint8Array
): Promise<CryptoKey> => {
  return await crypto.subtle.importKey(
    'raw',
    key,
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['encrypt', 'decrypt']
  );
};

export const encryptData = async (masterKey: Uint8Array, data: string) => {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await generateCryptoKey(masterKey);
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(data)
  );
  return `${generateHex(iv)}$${generateHex(new Uint8Array(encryptedData))}`;
};

export const decryptData = async (
  masterKey: Uint8Array,
  encryptedData: string
) => {
  const iv = hexToArray(encryptedData.split('$')[0]);
  const data = hexToArray(encryptedData.split('$')[1]);

  const key = await generateCryptoKey(masterKey);
  const decoder = new TextDecoder();

  const desencryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  return decoder.decode(desencryptedData);
};
