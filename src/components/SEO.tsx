import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

export function SEOElements({
  title = "Vetto - Corporate Service Provider Platform | CSP Management Software",
  description = "Complete platform for corporate service providers. Manage clients, partners, compliance, and due diligence workflows. Streamline KYC/KYB verification with audit-ready records. Free trial available.",
  image = "/og-image.png",
  url,
  type = "website",
  keywords = "corporate service provider software, CSP platform, cross-border compliance, partner network, client management, due diligence automation, KYC KYB verification",
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}

export function SEO({
  title = "Vetto - Corporate Service Provider Platform | CSP Management Software",
  description = "Complete platform for corporate service providers. Manage clients, partners, compliance, and due diligence workflows. Streamline KYC/KYB verification with audit-ready records. Free trial available.",
  image = "/og-image.png",
  url = "https://vetto.com",
  type = "website",
  keywords = "corporate service provider software, CSP platform, cross-border compliance, partner network, client management, due diligence automation, KYC KYB verification",
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}