import { api } from '../config';

export interface Country {
  id?: string;
  name: string;
  code: string;
  flag?: string;
  phoneCode?: string;
  currency?: string;
  timezone?: string;
}

export interface CountriesListResponse {
  success: boolean;
  data?: Country[];
  message?: string;
  error?: string;
}

class CountryService {
  private baseUrl = '/public/constants/countries';

  // Get all countries
  async getCountries(): Promise<CountriesListResponse> {
    try {
      const response = await api.get(this.baseUrl);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch countries'
      );
    }
  }

  // Get a specific country by code
  async getCountryByCode(code: string): Promise<CountriesListResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/${code}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch country'
      );
    }
  }
}

export const countryService = new CountryService();
