import { Tariff } from '../models/tariff.model';

/**
 * This is a mock data for testing
 * 
 */

export const mockTariffData: Tariff[] = [
  {
    index: 1,
    tariffName: "Basic Plan",
    rating: 3.5,
    benefits: ["Email Support", "Basic Speed"],
    price: 29.99,
    downloadSpeed: 50,
    uploadSpeed: 10,
  },
  {
    index: 2,
    tariffName: "Standard Plan",
    rating: 4.2,
    benefits: ["Email & Chat Support", "Medium Speed"],
    price: 49.99,
    downloadSpeed: 100,
    uploadSpeed: 20,
  },
  {
    index: 3,
    tariffName: "Premium Plan",
    rating: 4.8,
    benefits: ["Priority Support", "High Speed", "No Data Cap"],
    price: 79.99,
    downloadSpeed: 200,
    uploadSpeed: 50,
  },
];
