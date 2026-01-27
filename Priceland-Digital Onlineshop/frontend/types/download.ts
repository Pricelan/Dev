// Definition des Download-Typs im Onlineshop
export type Download = {
  id: number;
  software: {
    id: number;
    name: string;
    version: string;
  };
  lizenzKey: string;
  downloadLink: string;
  gekauftAm: string;
};