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
    url: siteConfig.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.baseUrl}/sitemap?query={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
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

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  image: string;
  authorName: string;
  publishedTime: string;
  modifiedTime: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    image: absoluteUrl(input.image),
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime,
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      '@type': 'Person',
      name: input.authorName
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/ROKABO.png')
      }
    }
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  image: string;
  sku: string;
  price: string;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  aggregateRating?: { ratingValue: number; reviewCount: number };
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    sku: input.sku,
    offers: {
      '@type': 'Offer',
      price: input.price,
      priceCurrency: input.priceCurrency ?? 'EUR',
      availability: `https://schema.org/${input.availability ?? 'InStock'}`
    },
    ...(input.aggregateRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: input.aggregateRating.ratingValue,
            reviewCount: input.aggregateRating.reviewCount
          }
        }
      : {})
  };
}

export function reviewSchema(input: {
  itemName: string;
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Thing',
      name: input.itemName
    },
    author: {
      '@type': 'Person',
      name: input.authorName
    },
    reviewBody: input.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: input.ratingValue,
      bestRating: input.bestRating ?? 5
    }
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  totalTime: string;
  steps: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    totalTime: input.totalTime,
    step: input.steps.map((step) => ({
      '@type': 'HowToStep',
      text: step
    }))
  };
}
