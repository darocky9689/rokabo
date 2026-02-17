import { safeSchema, type JsonLd } from '@/lib/seo/schema';

type JsonLdProps = {
  schema: JsonLd;
  id?: string;
};

export function JsonLdScript({ schema, id }: JsonLdProps) {
  const validatedSchema = safeSchema(schema);

  if (!validatedSchema) {
    return null;
  }

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(validatedSchema) }}
    />
  );
}
