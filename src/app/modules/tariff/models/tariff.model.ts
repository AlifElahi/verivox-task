export interface Tariff {
  index: number;
  tariffName: string;
  rating: number;
  benefits: string[];
  price: number; // Price in Euros (€)
  downloadSpeed: number; // Download speed in Mbps
  uploadSpeed: number; // Upload speed in Mbps
}



export interface TariffFetchResponse{
  data: Tariff[]
  numberOfTotalPage: number,
  numberOfCurrentPage: number
}