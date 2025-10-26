import companyProfile from './company-profile.json';

export interface CompanyProfile {
  company: {
    name: string;
    tagline: string;
    description: string;
    founded: string;
    founder: string;
    location: {
      address: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      latitude: number;
      longitude: number;
    };
    businessHours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
      display: string;
      timezone: string;
    };
    contact: {
      phone: {
        primary: string;
        formatted: string;
        international: string;
      };
      email: {
        primary: string;
        sales: string;
        support: string;
      };
      whatsapp: {
        number: string;
        international: string;
        url: string;
      };
      landline: string;
    };
    socialMedia: {
      facebook: {
        name: string;
        url: string;
        icon: string;
        ariaLabel: string;
      };
      instagram: {
        name: string;
        url: string;
        icon: string;
        ariaLabel: string;
      };
      linkedin: {
        name: string;
        url: string;
        icon: string;
        ariaLabel: string;
      };
      twitter: {
        name: string;
        url: string;
        icon: string;
        ariaLabel: string;
      };
      youtube: {
        name: string;
        url: string;
        icon: string;
        ariaLabel: string;
      };
    };
    certifications: Array<{
      name: string;
      fullName: string;
      license: string;
      validFrom: string;
      validUntil: string;
    }>;
    statistics: {
      yearsOfExperience: number;
      countriesServed: number;
      productsRange: number;
      happyCustomers: number;
      exportsPerMonth: string;
      productionCapacity: string;
    };
    coreValues: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export const getCompanyProfile = (): CompanyProfile => {
  return companyProfile as CompanyProfile;
};

export const getCompanyInfo = () => {
  return companyProfile.company;
};

export const getCompanyContact = () => {
  return companyProfile.company.contact;
};

export const getCompanySocialMedia = () => {
  return companyProfile.company.socialMedia;
};

export const getCompanyBusinessHours = () => {
  return companyProfile.company.businessHours;
};

export const getCompanyLocation = () => {
  return companyProfile.company.location;
};

export const getCompanyCertifications = () => {
  return companyProfile.company.certifications;
};

export const getCompanyStatistics = () => {
  return companyProfile.company.statistics;
};

export const getCompanyCoreValues = () => {
  return companyProfile.company.coreValues;
};

export default companyProfile;

