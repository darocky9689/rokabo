import { absoluteUrl } from './metadata';
import { siteConfig } from './site';

export type JsonLd = Record<string, unknown>;

export function validateSchemaObject(schema: unknown): schema is JsonLd {
  if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
    return false;
  }

  const schemaRecord = schema as Record<string, unknown>;
  return typeof schemaRecord['@context'] === 'string' && typeof schemaRecord['@type'] === 'string';
}

export function safeSchema<T extends JsonLd>(schema: T): T | null {
  try {
    if (!validateSchemaObject(schema)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Invalid JSON-LD schema object', schema);
      }
      return null;
    }

    return schema;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to validate schema', error);
    }
    return null;
  }
}

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    ...siteConfig.organization
  };
}

export function localBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    ...siteConfig.localBusiness
  };
}

export function webSiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.baseUrl
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function serviceSchema(
  packages: Array<{ name: string; description: string; price: number }>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website im Abo',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.baseUrl
    },
    areaServed: 'DE',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website-Abo-Pakete',
      itemListElement: packages.map((pkg) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: pkg.name,
          description: pkg.description
        },
        price: pkg.price,
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: pkg.price,
          priceCurrency: 'EUR',
          billingIncrement: 1,
          unitCode: 'MON'
        }
      }))
    }
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.organization.logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/ratgeber/${input.slug}`)
    }
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}
