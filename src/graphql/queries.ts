import { gql } from '@apollo/client';

export const GET_CONTINENTS_DATA = gql`
  query GetContinents {
    continents {
      code
      name
      countries {
        code
        name
        languages {
          name
        }
      }
    }
  }
`;
export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;
 export const GET_COUNTRIES_AND_DETAILS = gql`
  query GetCountriesAndDetails {
    countries {
      code
      name
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRIES_AND_LANGUAGES = gql`
  query GetCountriesAndLanguages {
    countries {
      code
      name
      languages {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRY_DETAILS_WITH_CODE = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      code
      continent {
        name
      }
      languages {
        name
      }
      capital
      currency
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      currency
      languages {
        name
      }
    }
  }
`;