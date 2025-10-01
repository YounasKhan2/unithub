export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-9113733158673282', // Your AdSense publisher ID
  adSlots: {
    // You'll need to create these ad units in your AdSense dashboard
    // For now, using placeholder values - replace with actual slot IDs from AdSense
  header: '9414284841',        // Home_Header_728x90
  sidebar: '7773900113',       // Sidebar_300x250
  homeFeature: '2343455941',   // Rectangle Ads (desktop 3rd card)
  footer: '9414284841',        // Footer banner (728x90)
  inContent: '1234567893',     // In-content ads (responsive)
  mobile: '9414284841',        // Mobile banner (320x50)
  mobileSticky: '9414284841',  // Mobile sticky bottom (320x50)
  converter: '9414284841',     // Converter pages specific
  // Specific units
  multiplex: '8379021884',     // Multiplex (feed/auto-relaxed)
  article: '6885336185',       // In-article (fluid)
  }
};

export const AD_SIZES = {
  leaderboard: '728x90',         // Desktop header/footer
  banner: '320x50',              // Mobile banner
  mediumRectangle: '300x250',    // Sidebar/in-content
  largeRectangle: '336x280',     // Sidebar
  skyscraper: '120x600',         // Sidebar tall
  largeMobile: '320x100',        // Mobile banner large
  responsive: 'auto',            // Responsive ads
};

export const AD_FORMATS = {
  banner: 'banner',
  auto: 'auto',
  rectangle: 'rectangle',
  vertical: 'vertical',
};

// Ad placement configuration for different pages
export const AD_PLACEMENTS = {
  home: {
    headerBanner: { slot: 'header', size: AD_SIZES.leaderboard },
    featureAd: { slot: 'homeFeature', size: AD_SIZES.mediumRectangle },
    footerBanner: { slot: 'footer', size: AD_SIZES.leaderboard },
    mobileSticky: { slot: 'mobileSticky', size: AD_SIZES.banner },
  },
  converter: {
    sidebarTop: { slot: 'sidebar', size: AD_SIZES.mediumRectangle },
    inContent: { slot: 'inContent', size: AD_SIZES.responsive },
    sidebarBottom: { slot: 'converter', size: AD_SIZES.largeRectangle },
    mobileSticky: { slot: 'mobileSticky', size: AD_SIZES.banner },
  },
  other: {
    headerBanner: { slot: 'header', size: AD_SIZES.leaderboard },
    inContent: { slot: 'inContent', size: AD_SIZES.mediumRectangle },
    footerBanner: { slot: 'footer', size: AD_SIZES.leaderboard },
  }
};

// Helper function to get ad configuration
export function getAdConfig(page: keyof typeof AD_PLACEMENTS, position: string) {
  return AD_PLACEMENTS[page]?.[position as keyof typeof AD_PLACEMENTS[typeof page]];
}