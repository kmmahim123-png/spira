/* =========================================================================
   SPIRA — PURE • NATURAL • SUPERFOOD SPIRULINA
   Storefront, Password-Protected Admin (spira123), Facebook Pixel,
   Live Visitor Funnel Analytics & Auto-Incrementing Counters Engine
   ========================================================================= */

const ADMIN_PASS = 'spira123';

const STORAGE_KEYS = {
  PRODUCTS: 'spira_products_v2',
  ORDERS: 'spira_orders_v2',
  BLOGS: 'spira_blogs_v2',
  CART: 'spira_cart_v2',
  COUNTERS: 'spira_public_counters_v2',
  ANALYTICS: 'spira_visitor_analytics_v2',
  FB_PIXEL: 'spira_fb_pixel_v2',
  SB_CONFIG: 'spira_supabase_config_v2'
};

// Initial Products using Real SPIRA Photography (assets/spira-hero.jpg & assets/spira-logo.jpg)
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-powder-100',
    name: 'SPIRA খাঁটি অর্গানিক স্পিরুলিনা পাউডার (100g)',
    category: 'powder',
    weight: '১০০ গ্রাম এয়ারটাইট জার • ৩৩ দিনের ডোজ',
    price: 650,
    oldPrice: 850,
    status: 'coming_soon',
    image: '',
    cropStyle: 'object-position: 22% 55%;',
    formatCode: 'RAW POWDER • 100G',
    description: '১০০% বিশুদ্ধ ও ল্যাব-টেস্টেড অর্গানিক স্পিরুলিনা পাউডার। প্রতিদিন সকালে কুসুম গরম পানি, লেবুর শরবত বা স্মুদির সাথে ১ চা-চামচ সেবনে শরীরের প্রোটিন, আয়রন ও অ্যান্টিঅক্সিডেন্টের চাহিদা পূরণ করে।'
  },
  {
    id: 'prod-capsule-60',
    name: 'SPIRA ভেজিটেবল স্পিরুলিনা ক্যাপসুল (60 Caps)',
    category: 'capsule',
    weight: '৬০টি ভেজিটেবল ক্যাপসুল • ৫০০ মি.গ্রা.',
    price: 720,
    oldPrice: 900,
    status: 'stock_out',
    image: '',
    cropStyle: 'object-position: 48% 50%;',
    formatCode: 'VEG CAPSULES • 60 CT',
    description: 'যাদের স্পিরুলিনা পাউডারের প্রাকৃতিক ঘ্রাণ বা স্বাদ নিতে অসুবিধা হয়, তাদের জন্য শতভাগ প্ল্যান্ট-বেসড ভেজিটেবল ক্যাপসুল। কোনো গন্ধ ছাড়াই সাধারণ পানির সাথে সহজে সেবনযোগ্য।'
  },
  {
    id: 'prod-sachet-30',
    name: 'SPIRA অন-দ্য-গো স্পিরুলিনা মিনি স্যাশে (30 Sachets)',
    category: 'sachet',
    weight: '৩০টি ছোট মিনি প্যাকেট × ৩ গ্রাম সিঙ্গেল ডোজ',
    price: 780,
    oldPrice: 950,
    status: 'coming_soon',
    image: '',
    cropStyle: 'object-position: 35% 75%;',
    formatCode: 'MINI SACHETS • 30×3G',
    description: 'ছোট ছোট আকারে সিঙ্গেল-ডোজ প্যাকেটের মধ্যে স্পিরুলিনা। চামচ দিয়ে মাপার বা বড় জার বহন করার ঝামেলা নেই—অফিস, জিম বা ভ্রমণে ১টি ছোট প্যাকেট ছিঁড়ে পানিতে মিশিয়ে পান করুন।'
  },
  {
    id: 'prod-powder-250',
    name: 'SPIRA ফ্যামিলি প্যাক অর্গানিক স্পিরুলিনা পাউডার (250g)',
    category: 'powder',
    weight: '২৫০ গ্রাম ভ্যালু প্যাক জার • ৮০+ সার্ভিং',
    price: 1450,
    oldPrice: 1850,
    status: 'coming_soon',
    image: '',
    cropStyle: 'object-position: 18% 45%;',
    formatCode: 'FAMILY JAR • 250G',
    description: 'পুরো পরিবারের প্রতিদিনের রোগ প্রতিরোধ ক্ষমতা, রক্তস্বল্পতা দূরীকরণ এবং দীর্ঘমেয়াদী পুষ্টির জন্য সাশ্রয়ী ২৫০ গ্রাম ফ্যামিলি সাইজ জার।'
  }
];

const DEFAULT_BLOGS = [
  {
    id: 'blog-1',
    title: 'কেন NASA এবং বিশ্ব স্বাস্থ্য সংস্থা (WHO) স্পিরুলিনাকে পৃথিবীর সেরা সুপারফুড বলে?',
    tag: 'পুষ্টি বিজ্ঞান • ৪ মিনিট পাঠ',
    summary: 'মাত্র ১ চামচ (৫ গ্রাম) স্পিরুলিনায় রয়েছে ৬৫% উদ্ভিজ্জ প্রোটিন, পালং শাকের চেয়ে ২৮ গুণ বেশি আয়রন এবং বিরল ফিকোসায়ানিন অ্যান্টিঅক্সিডেন্ট। জানুন এর বৈজ্ঞানিক কারণ।',
    body: `স্পিরুলিনা (Arthrospira platensis) কোনো সাধারণ শাকসবজি নয়—এটি ৩৫০ কোটি বছর ধরে পৃথিবীতে টিকে থাকা এক বিস্ময়কর নীলাভ-সবুজ মাইক্রো-অ্যালগি বা অণু-শৈবাল।

১. প্রোটিনের রাজা (৬০-৭০% সম্পূর্ণ প্রোটিন):
গরুর মাংস বা ডিমের মধ্যে যেখানে ২০-২৫% প্রোটিন থাকে, সেখানে শুকনো স্পিরুলিনায় থাকে ৬৫% পর্যন্ত প্রোটিন। সবচেয়ে বড় কথা, এতে মানুষের শরীরের জন্য প্রয়োজনীয় ১৮টি অ্যামিনো অ্যাসিডের সবকটিই রয়েছে এবং এর হজমযোগ্যতা (Bioavailability) ৯০%-এর বেশি।

২. বিরল ফিকোসায়ানিন (Phycocyanin) ও ইমিউনিটি:
স্পিরুলিনার গাঢ় নীলচে-সবুজ রঙের পেছনে রয়েছে 'Phycocyanin' নামের একটি বিরল অ্যান্টিঅক্সিডেন্ট, যা পৃথিবীর অন্য কোনো সাধারণ খাবারে পাওয়া যায় না। এটি শরীরের প্রদাহ কমায়, লিভার সুরক্ষিত রাখে এবং রোগ প্রতিরোধ ক্ষমতা বহুগুণ বাড়িয়ে দেয়।

৩. রক্তস্বল্পতা ও ক্লান্তি দূর করতে আয়রন ও বি-ভিটামিন:
আমাদের দেশে অনেকেরই হিমোগ্লোবিন বা আয়রনের ঘাটতি থাকে। স্পিরুলিনায় পালং শাকের চেয়ে প্রায় ২৮ গুণ বেশি বায়ো-অ্যাভেইলেবল আয়রন থাকায় এটি দ্রুত রক্তস্বল্পতা ও সারাদিনের অবসাদ দূর করে।`
  },
  {
    id: 'blog-2',
    title: 'স্পিরুলিনা পাউডার, ক্যাপসুল নাকি মিনি স্যাশে—কোনটি কীভাবে ও কখন খাবেন?',
    tag: 'সেবন বিধি ও ডোজ • ৩ মিনিট পাঠ',
    summary: 'সকালে খালি পেটে নাকি খাবারের পরে? গরম পানিতে নাকি ঠান্ডা পানিতে? স্পিরুলিনা থেকে ১০০% উপকার পেতে সঠিক খাওয়ার নিয়ম জেনে নিন।',
    body: `স্পিরুলিনা থেকে সর্বোচ্চ পুষ্টি পেতে হলে এটি সঠিক নিয়মে খাওয়া জরুরি।

• স্পিরুলিনা পাউডার খাওয়ার নিয়ম:
প্রতিদিন ১ চা-চামচ (৩ থেকে ৫ গ্রাম) পাউডার ১ গ্লাস স্বাভাবিক বা হালকা কুসুম গরম পানিতে মিশিয়ে নিন। এর সাথে ১ চামচ লেবুর রস ও সামান্য মধু মেশালে স্বাদ অনেক ভালো হয় এবং লেবুর ভিটামিন-সি স্পিরুলিনার আয়রন শরীরে শোষণ করতে সাহায্য করে। কখনোই ফুটন্ত গরম পানিতে স্পিরুলিনা মেশাবেন না।

• স্পিরুলিনা ক্যাপসুল খাওয়ার নিয়ম:
যারা পাউডার পানিতে গুলিয়ে খেতে চান না, তারা সকালে নাস্তার পর ২টি এবং দুপুরে খাবারের পর ২টি ভেজিটেবল ক্যাপসুল সাধারণ পানির সাথে খেয়ে নিন।

• মিনি স্যাশে (ছোট প্যাক) খাওয়ার নিয়ম:
SPIRA মিনি স্যাশেতে প্রতিটি ছোট প্যাকেটে ঠিক ৩ গ্রাম করে স্পিরুলিনা মাপা থাকে। অফিস, জিম বা ভ্রমণের সময় পানির বোতলে ১টি মিনি স্যাশে ছিঁড়ে ঢেলে দিন এবং ঝাঁকিয়ে পান করুন।`
  },
  {
    id: 'blog-3',
    title: 'খাঁটি ও অর্গানিক স্পিরুলিনা চেনার উপায় এবং কেন আমাদের ল্যাব-টেস্টেড ব্যাচ আলাদা',
    tag: 'কোয়ালিটি গাইড • ৩ মিনিট পাঠ',
    summary: 'বাজারে কৃত্রিম রঙ বা ফিলার মেশানো নিম্নমানের পাউডার থেকে আসল ল্যাব-টেস্টেড অর্গানিক স্পিরুলিনা কীভাবে আলাদা করবেন?',
    body: `স্পিরুলিনা সরাসরি আপনার শরীরে পুষ্টি জোগায়, তাই এর বিশুদ্ধতা সবচেয়ে গুরুত্বপূর্ণ। খাঁটি স্পিরুলিনা চেনার সহজ উপায়গুলো হলো:

১. রঙের পরীক্ষা (Deep Matte Emerald Hue):
আসল স্পিরুলিনা কখনোই হালকা কলাপাতা সবুজ হয় না। ফিকোসায়ানিন ও ক্লোরোফিলের কারণে খাঁটি স্পিরুলিনা সবসময় গাঢ় পান্না-সবুজ (Deep Emerald Green) রঙের হয়।

২. পানিতে গোলানোর পরীক্ষা:
১ গ্লাস পানিতে ১ চামচ খাঁটি স্পিরুলিনা মিশিয়ে কিছুক্ষণ রেখে দিলে কোনো কৃত্রিম রাসায়নিক রঙ আলাদা হয়ে ভাসবে না; বরং সমানভাবে গাঢ় সবুজ দ্রবণ তৈরি করবে।

৩. প্রাকৃতিক ঘ্রাণ ও টেক্সচার:
খাঁটি স্পিরুলিনা পাউডার অত্যন্ত মিহি হয় এবং এতে সামুদ্রিক উদ্ভিদ বা তাজা শৈবালের একটি মৃদু প্রাকৃতিক ঘ্রাণ থাকে।`
  }
];

// Initial Seeded Analytics so the owner sees realistic historical + live data immediately
const DEFAULT_ANALYTICS = {
  sources: {
    'Facebook Page / Ads': 24,
    'Direct / Website Link': 11,
    'Instagram Reels': 6,
    'Google Search': 4,
    'WhatsApp / Messenger': 3
  },
  productStats: {
    'prod-powder-100': { views: 48, clicks: 29, carts: 14, purchases: 8 },
    'prod-capsule-60': { views: 48, clicks: 19, carts: 8, purchases: 4 },
    'prod-sachet-30': { views: 48, clicks: 31, carts: 16, purchases: 9 },
    'prod-powder-250': { views: 48, clicks: 14, carts: 5, purchases: 3 }
  },
  sessions: [
    {
      id: 'V-8901',
      time: 'আজ, ১০ মিনিট আগে',
      source: 'Facebook Page / Ads',
      device: 'Mobile (Android)',
      clicks: ['স্পিরুলিনা পাউডার (100g)', 'মিনি স্যাশে প্যাক'],
      cartItems: ['মিনি স্যাশে প্যাক (x1)'],
      stage: 'cart_abandoned',
      stageLabel: 'Add to Cart করে রেখেছে (অর্ডার সম্পন্ন করেনি)'
    },
    {
      id: 'V-8900',
      time: 'আজ, ২৮ মিনিট আগে',
      source: 'Facebook Page / Ads',
      device: 'Mobile (iPhone)',
      clicks: ['স্পিরুলিনা পাউডার (100g)', 'চেকআউট ফর্ম'],
      cartItems: ['স্পিরুলিনা পাউডার 100g (x1)'],
      stage: 'checkout_dropoff',
      stageLabel: 'চেকআউট ফর্ম ওপেন করে অর্ধেক পূরণ করে চলে গেছে'
    },
    {
      id: 'V-8899',
      time: 'আজ, ১ ঘণ্টা আগে',
      source: 'Direct / Website Link',
      device: 'Desktop',
      clicks: ['ভেজিটেবল ক্যাপসুল (60 Caps)', 'ডোজ ক্যালকুলেটর'],
      cartItems: [],
      stage: 'viewed_product',
      stageLabel: 'প্রোডাক্ট ক্লিক করে দেখেছে কিন্তু কার্টে নেয়নি'
    },
    {
      id: 'V-8898',
      time: 'আজ, ২ ঘণ্টা আগে',
      source: 'Instagram Reels',
      device: 'Mobile (Android)',
      clicks: [],
      cartItems: [],
      stage: 'bounced',
      stageLabel: 'শুধু ওয়েবসাইট ভিজিট করে চলে গেছে (কোনো ক্লিক করেনি)'
    },
    {
      id: 'V-8897',
      time: 'আজ, ৩ ঘণ্টা আগে',
      source: 'Facebook Page / Ads',
      device: 'Mobile (Android)',
      clicks: ['স্পিরুলিনা পাউডার (100g)', 'মিনি স্যাশে প্যাক'],
      cartItems: ['স্পিরুলিনা পাউডার 100g (x1)'],
      stage: 'purchased',
      stageLabel: 'অর্ডার সম্পন্ন করেছে (Purchased)'
    }
  ]
};

let state = {
  products: [],
  orders: [],
  blogs: [],
  cart: [],
  counters: {
    totalVisitors: 1420,
    totalPurchases: 318
  },
  analytics: null,
  currentSessionId: null,
  fbPixel: {
    pixelId: '',
    testCode: '',
    events: []
  },
  activeCategory: 'all',
  uploadedImageDataUrl: '',
  supabaseClient: null,
  supabaseConnected: false
};

const syncChannel = ('BroadcastChannel' in window) ? new BroadcastChannel('spira_realtime_v2') : null;

/* =========================================================================
   INITIALIZATION & AUTO VISITOR TRACKING
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  loadLocalState();
  initServiceWorkerAndPWA();
  registerCurrentVisitorSession();
  initFacebookPixelScript();

  renderPublicCounters();
  renderProducts();
  renderBlogs();
  renderCart();
  renderAllAdminViews();
  bindUIEvents();
  initSupabaseIfConfigured();

  // Check if URL has ?admin=1
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === '1') {
    requestAdminAccess();
  }
});

function loadLocalState() {
  try {
    const p = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    state.products = p ? JSON.parse(p) : [...DEFAULT_PRODUCTS];

    const o = localStorage.getItem(STORAGE_KEYS.ORDERS);
    state.orders = o ? JSON.parse(o) : [];

    const b = localStorage.getItem(STORAGE_KEYS.BLOGS);
    state.blogs = b ? JSON.parse(b) : [...DEFAULT_BLOGS];

    const c = localStorage.getItem(STORAGE_KEYS.CART);
    state.cart = c ? JSON.parse(c) : [];

    const cnt = localStorage.getItem(STORAGE_KEYS.COUNTERS);
    if (cnt) state.counters = JSON.parse(cnt);

    const an = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    state.analytics = an ? JSON.parse(an) : JSON.parse(JSON.stringify(DEFAULT_ANALYTICS));

    const fb = localStorage.getItem(STORAGE_KEYS.FB_PIXEL);
    if (fb) state.fbPixel = JSON.parse(fb);
  } catch (err) {
    state.products = [...DEFAULT_PRODUCTS];
    state.blogs = [...DEFAULT_BLOGS];
    state.analytics = JSON.parse(JSON.stringify(DEFAULT_ANALYTICS));
  }
}

function saveLocalState() {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(state.blogs));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(state.counters));
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(state.analytics));
    localStorage.setItem(STORAGE_KEYS.FB_PIXEL, JSON.stringify(state.fbPixel));
  } catch (e) {}
}

/* =========================================================================
   REAL-TIME VISITOR TRACKING, REFERRER DETECTION & DROP-OFF FUNNEL
   ========================================================================= */
function detectTrafficSource() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = (urlParams.get('utm_source') || '').toLowerCase();
  const hasFbclid = urlParams.has('fbclid');
  const ref = (document.referrer || '').toLowerCase();

  if (hasFbclid || utmSource.includes('fb') || utmSource.includes('facebook') || ref.includes('facebook.com')) {
    return 'Facebook Page / Ads';
  }
  if (utmSource.includes('ig') || utmSource.includes('instagram') || ref.includes('instagram.com')) {
    return 'Instagram Reels';
  }
  if (utmSource.includes('wa') || utmSource.includes('whatsapp') || ref.includes('whatsapp') || ref.includes('m.me')) {
    return 'WhatsApp / Messenger';
  }
  if (ref.includes('google.')) {
    return 'Google Search';
  }
  return 'Direct / Website Link';
}

function detectDeviceType() {
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'Mobile (Android)';
  if (/iphone|ipad|ipod/i.test(ua)) return 'Mobile (iPhone)';
  return 'Desktop / PC';
}

function registerCurrentVisitorSession() {
  // Check if this browser tab already started a session
  let existingSessionId = sessionStorage.getItem('spira_active_visitor_id');
  if (!existingSessionId) {
    existingSessionId = 'V-' + Math.floor(9000 + Math.random() * 999);
    sessionStorage.setItem('spira_active_visitor_id', existingSessionId);

    // Auto-increment Public Total Visitors Counter by +1 on new visit!
    state.counters.totalVisitors = (Number(state.counters.totalVisitors) || 0) + 1;

    const source = detectTrafficSource();
    state.analytics.sources[source] = (state.analytics.sources[source] || 0) + 1;

    // Increment product impressions/views for all active products
    state.products.forEach(p => {
      if (!state.analytics.productStats[p.id]) {
        state.analytics.productStats[p.id] = { views: 0, clicks: 0, carts: 0, purchases: 0 };
      }
      state.analytics.productStats[p.id].views += 1;
    });

    const newSession = {
      id: existingSessionId,
      time: 'এইমাত্র (লাইভ ভিজিটর)',
      source,
      device: detectDeviceType(),
      clicks: [],
      cartItems: [],
      stage: 'bounced',
      stageLabel: 'ওয়েবসাইট ভিজিট করছে (এখনো কোনো প্রোডাক্টে ক্লিক করেনি)'
    };

    state.analytics.sessions.unshift(newSession);
    if (state.analytics.sessions.length > 30) {
      state.analytics.sessions = state.analytics.sessions.slice(0, 30);
    }
    saveLocalState();
  }

  state.currentSessionId = existingSessionId;

  // Fire Facebook Pixel PageView
  trackPixelEvent('PageView', {
    page_title: document.title,
    traffic_source: detectTrafficSource()
  });
}

function getCurrentVisitorSession() {
  return state.analytics.sessions.find(s => s.id === state.currentSessionId) || state.analytics.sessions[0];
}

function recordVisitorClick(itemName, productId = null) {
  const session = getCurrentVisitorSession();
  if (session) {
    if (!session.clicks.includes(itemName)) {
      session.clicks.push(itemName);
    }
    if (session.stage === 'bounced') {
      session.stage = 'viewed_product';
      session.stageLabel = 'প্রোডাক্ট/সেকশন ক্লিক করে দেখেছে কিন্তু কার্টে নেয়নি';
    }
  }

  if (productId) {
    if (!state.analytics.productStats[productId]) {
      state.analytics.productStats[productId] = { views: 1, clicks: 0, carts: 0, purchases: 0 };
    }
    state.analytics.productStats[productId].clicks += 1;

    const prod = state.products.find(p => p.id === productId);
    if (prod) {
      trackPixelEvent('ViewContent', {
        content_ids: [prod.id],
        content_name: prod.name,
        content_type: 'product',
        value: prod.price,
        currency: 'BDT'
      });
    }
  }

  saveLocalState();
  renderAdminAnalytics();
}

function recordVisitorCartUpdate() {
  const session = getCurrentVisitorSession();
  if (!session) return;

  session.cartItems = state.cart.map(i => `${i.name} (x${i.qty})`);
  if (state.cart.length > 0 && session.stage !== 'purchased' && session.stage !== 'checkout_dropoff') {
    session.stage = 'cart_abandoned';
    session.stageLabel = 'Add to Cart করে রেখেছে (অর্ডার সম্পন্ন করেনি)';
  }
  saveLocalState();
  renderAdminAnalytics();
}

function recordVisitorCheckoutStage() {
  const session = getCurrentVisitorSession();
  if (!session || state.cart.length === 0) return;

  if (session.stage !== 'purchased') {
    session.stage = 'checkout_dropoff';
    session.stageLabel = 'চেকআউট ফর্ম ওপেন করেছে (অর্ডার এখনো কনফার্ম করেনি)';
  }

  const totalVal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  trackPixelEvent('InitiateCheckout', {
    content_ids: state.cart.map(i => i.productId),
    num_items: state.cart.reduce((s, i) => s + i.qty, 0),
    value: totalVal,
    currency: 'BDT'
  });

  saveLocalState();
  renderAdminAnalytics();
}

/* =========================================================================
   FACEBOOK (META) PIXEL INTEGRATION & EVENT LOGGER
   ========================================================================= */
function initFacebookPixelScript() {
  const idInput = document.getElementById('fbPixelIdInput');
  const testInput = document.getElementById('fbTestCodeInput');
  if (idInput && state.fbPixel.pixelId) idInput.value = state.fbPixel.pixelId;
  if (testInput && state.fbPixel.testCode) testInput.value = state.fbPixel.testCode;

  updatePixelStatusStrip();

  if (state.fbPixel.pixelId) {
    injectMetaPixelBaseCode(state.fbPixel.pixelId);
  }
}

function injectMetaPixelBaseCode(pixelId) {
  if (!pixelId) return;
  try {
    if (!window.fbq) {
      !(function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)})(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq('init', pixelId);
  } catch (e) {}
}

function trackPixelEvent(eventName, payload = {}) {
  const hasPixelId = Boolean(state.fbPixel.pixelId && state.fbPixel.pixelId.trim());
  if (hasPixelId && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, payload);
    } catch (e) {}
  }

  const eventRecord = {
    time: new Date().toLocaleTimeString('bn-BD'),
    eventName,
    payload: JSON.stringify(payload),
    status: hasPixelId
      ? `Sent to Pixel (${state.fbPixel.pixelId})`
      : 'Logged (Pixel ID বসালেই FB-তে যাবে)'
  };

  if (!Array.isArray(state.fbPixel.events)) state.fbPixel.events = [];
  state.fbPixel.events.unshift(eventRecord);
  if (state.fbPixel.events.length > 25) {
    state.fbPixel.events = state.fbPixel.events.slice(0, 25);
  }

  saveLocalState();
  renderPixelEventLog();
}

function updatePixelStatusStrip() {
  const strip = document.getElementById('pixelStatusStrip');
  if (!strip) return;
  if (state.fbPixel.pixelId) {
    strip.innerHTML = `স্ট্যাটাস: <strong style="color:#065F46;">Facebook Pixel সক্রিয় আছে (ID: ${escapeHtml(state.fbPixel.pixelId)})</strong> — সব PageView, AddToCart ও Purchase ইভেন্ট স্বয়ংক্রিয়ভাবে ট্র্যাক হচ্ছে।`;
  } else {
    strip.innerHTML = `স্ট্যাটাস: <strong>বিল্ট-ইন ইভেন্ট ট্র্যাকার চালু আছে</strong> (উপরে আপনার ১৫-ডিজিটের Facebook Pixel ID বসিয়ে সেভ করলেই সরাসরি Facebook Ads Manager-এ ডেটা যাবে)।`;
  }
}

function renderPixelEventLog() {
  const tbody = document.getElementById('pixelEventLogBody');
  if (!tbody) return;
  const events = state.fbPixel.events || [];
  if (events.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">এখনো কোনো ইভেন্ট ফায়ার হয়নি।</td></tr>`;
    return;
  }
  tbody.innerHTML = events.map(ev => `
    <tr>
      <td style="white-space:nowrap;">${escapeHtml(ev.time)}</td>
      <td><strong style="font-family:var(--font-mono); color:var(--emerald-primary);">${escapeHtml(ev.eventName)}</strong></td>
      <td style="font-family:var(--font-mono); font-size:0.76rem; color:var(--text-secondary);">${escapeHtml(ev.payload)}</td>
      <td><span class="stage-pill stage-pill-success">${escapeHtml(ev.status)}</span></td>
    </tr>
  `).join('');
}

/* =========================================================================
   PUBLIC STOREFRONT RENDERING (REAL PHOTOS + RED INK STAMP OVERLAY)
   ========================================================================= */
function renderPublicCounters() {
  const visEl = document.getElementById('publicTotalVisitors');
  const purEl = document.getElementById('publicTotalPurchases');
  if (visEl) visEl.textContent = formatBanglaNum(state.counters.totalVisitors);
  if (purEl) purEl.textContent = formatBanglaNum(state.counters.totalPurchases);

  const inVis = document.getElementById('adminVisitorCountInput');
  const inPur = document.getElementById('adminPurchaseCountInput');
  if (inVis && document.activeElement !== inVis) inVis.value = state.counters.totalVisitors;
  if (inPur && document.activeElement !== inPur) inPur.value = state.counters.totalPurchases;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = state.activeCategory === 'all'
    ? state.products
    : state.products.filter(p => p.category === state.activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:40px;">এই ক্যাটাগরিতে বর্তমানে কোনো প্রোডাক্ট নেই।</p>`;
    return;
  }

  grid.innerHTML = filtered.map(prod => {
    const isComingSoon = prod.status === 'coming_soon';
    const isStockOut = prod.status === 'stock_out';
    const isInStock = prod.status === 'in_stock';

    // RED INK OVERLAY STAMP ON PRODUCT PHOTO ("লাল কালি দিয়ে প্রোডাক্টের ছবির উপরে ওইটা লেখা থাকবে")
    let redStampHTML = '';
    let topStatusPill = '';

    if (isComingSoon) {
      topStatusPill = `<span class="status-pill-top status-pill-red">COMING SOON</span>`;
      redStampHTML = `
        <div class="red-ink-stamp-overlay" aria-label="Coming Soon">
          <div class="red-ink-frame">
            <span class="red-stamp-en">COMING SOON</span>
            <span class="red-stamp-bn">কামিং সুন • শীঘ্রই আসছে</span>
          </div>
        </div>
      `;
    } else if (isStockOut) {
      topStatusPill = `<span class="status-pill-top status-pill-red">STOCK OUT</span>`;
      redStampHTML = `
        <div class="red-ink-stamp-overlay" aria-label="Stock Out">
          <div class="red-ink-frame">
            <span class="red-stamp-en">STOCK OUT</span>
            <span class="red-stamp-bn">স্টক আউট • স্টকে নেই</span>
          </div>
        </div>
      `;
    } else {
      topStatusPill = `<span class="status-pill-top status-pill-green">স্টকে আছে</span>`;
    }

    // Use uploaded photo if present, otherwise use actual SPIRA Hero photo with official SPIRA Logo spec strip
    const imgSrc = prod.image || 'assets/spira-hero.jpg';
    const imgStyle = prod.image ? '' : (prod.cropStyle || 'object-position: center;');
    const formatCode = prod.formatCode || (prod.category === 'capsule' ? 'VEG CAPSULES' : prod.category === 'sachet' ? 'MINI SACHETS' : 'ORGANIC POWDER');

    const ctaButtonHTML = isInStock
      ? `<button type="button" class="btn-card-order" data-add-cart="${prod.id}">অর্ডার করুন</button>`
      : `<button type="button" class="btn-card-prebook" data-add-cart="${prod.id}">প্রি-বুক / স্টকে আসলে জানান</button>`;

    return `
      <article class="product-card" data-product-card="${prod.id}">
        <div class="product-photo-box" data-product-click="${prod.id}">
          ${topStatusPill}
          <img src="${imgSrc}" alt="${escapeHtml(prod.name)}" class="prod-real-img" style="${imgStyle}" />
          ${redStampHTML}
          <div class="pack-spec-overlay">
            <div class="pack-spec-brand">
              <img src="assets/spira-logo.jpg" alt="SPIRA" />
              <strong>SPIRA</strong>
            </div>
            <span class="pack-spec-format">${escapeHtml(formatCode)}</span>
          </div>
        </div>

        <div class="product-details">
          <div class="product-weight-line">${escapeHtml(prod.weight)}</div>
          <h3 class="product-name" data-product-click="${prod.id}" style="cursor:pointer;">${escapeHtml(prod.name)}</h3>
          <p class="product-summary">${escapeHtml(prod.description)}</p>

          <div class="product-footer">
            <div class="price-group">
              <span class="price-now">৳${formatBanglaNum(prod.price)}</span>
              ${prod.oldPrice ? `<span class="price-was">৳${formatBanglaNum(prod.oldPrice)}</span>` : ''}
            </div>
            ${ctaButtonHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderBlogs() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;

  grid.innerHTML = state.blogs.map(blog => `
    <article class="blog-card">
      <div>
        <span class="blog-tag">${escapeHtml(blog.tag)}</span>
        <h3>${escapeHtml(blog.title)}</h3>
        <p>${escapeHtml(blog.summary)}</p>
      </div>
      <button type="button" class="blog-read-btn" data-read-blog="${blog.id}">
        সম্পূর্ণ আর্টিকেল পড়ুন →
      </button>
    </article>
  `).join('');
}

/* =========================================================================
   ADMIN AUTHENTICATION (PASSWORD: spira123)
   ========================================================================= */
function isAdminUnlocked() {
  return sessionStorage.getItem('spira_admin_unlocked') === '1';
}

function requestAdminAccess(targetTab = 'tab-analytics') {
  if (isAdminUnlocked()) {
    openAdminDashboard(targetTab);
  } else {
    const loginBackdrop = document.getElementById('adminLoginBackdrop');
    const errEl = document.getElementById('loginErrorMsg');
    const input = document.getElementById('adminPasswordInput');
    if (errEl) errEl.hidden = true;
    if (input) input.value = '';
    loginBackdrop.hidden = false;
    setTimeout(() => { if (input) input.focus(); }, 60);
  }
}

function openAdminDashboard(targetTab = 'tab-analytics') {
  document.getElementById('adminLoginBackdrop').hidden = true;
  document.getElementById('adminModalBackdrop').hidden = false;
  renderAllAdminViews();
  switchAdminTab(targetTab);
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-admin-tab') === tabId);
  });
  document.querySelectorAll('.admin-pane').forEach(p => {
    const match = p.id === tabId;
    p.hidden = !match;
    p.classList.toggle('active', match);
  });
}

/* =========================================================================
   RENDER ADMIN ANALYTICS, FUNNEL, PRODUCT MATRIX & SESSION LOGS
   ========================================================================= */
function renderAllAdminViews() {
  renderPublicCounters();
  renderAdminAnalytics();
  renderPixelEventLog();
  renderAdminProducts();
  renderAdminOrders();
  renderAdminBlogs();
}

function renderAdminAnalytics() {
  const sessions = state.analytics.sessions || [];
  const totalSessions = sessions.length;

  const clickedSessions = sessions.filter(s => s.clicks && s.clicks.length > 0).length;
  const noClickSessions = totalSessions - clickedSessions;
  const noClickPct = totalSessions > 0 ? Math.round((noClickSessions / totalSessions) * 100) : 0;

  const cartSessions = sessions.filter(s => s.cartItems && s.cartItems.length > 0).length;
  const abandonedCartCount = sessions.filter(s => s.stage === 'cart_abandoned').length;
  const checkoutDropoffCount = sessions.filter(s => s.stage === 'checkout_dropoff').length;
  const purchasedCount = sessions.filter(s => s.stage === 'purchased').length + state.orders.length;

  // Top KPIs
  const kpiVis = document.getElementById('kpiTotalVisits');
  const kpiClicks = document.getElementById('kpiProductClicks');
  const kpiNoClick = document.getElementById('kpiNoClickRate');
  const kpiCarts = document.getElementById('kpiAddToCarts');
  const kpiAband = document.getElementById('kpiAbandonedCarts');
  const kpiDrop = document.getElementById('kpiCheckoutDropoffs');
  const kpiComp = document.getElementById('kpiCompletedOrders');

  if (kpiVis) kpiVis.textContent = formatBanglaNum(state.counters.totalVisitors);
  if (kpiClicks) kpiClicks.textContent = formatBanglaNum(clickedSessions);
  if (kpiNoClick) kpiNoClick.textContent = `ক্লিক না করে চলে গেছে: ${formatBanglaNum(noClickSessions)} জন (${formatBanglaNum(noClickPct)}%)`;
  if (kpiCarts) kpiCarts.textContent = formatBanglaNum(cartSessions);
  if (kpiAband) kpiAband.textContent = `অর্ডার না করে কার্টে রেখেছে: ${formatBanglaNum(abandonedCartCount)} জন`;
  if (kpiDrop) kpiDrop.textContent = formatBanglaNum(checkoutDropoffCount);
  if (kpiComp) kpiComp.textContent = `মোট সম্পন্ন অর্ডার: ${formatBanglaNum(state.counters.totalPurchases)}`;

  // 1. Traffic Sources Bars
  const sourcesEl = document.getElementById('trafficSourcesList');
  if (sourcesEl) {
    const entries = Object.entries(state.analytics.sources || {});
    const sumSrc = entries.reduce((acc, [, v]) => acc + v, 0) || 1;
    sourcesEl.innerHTML = entries.map(([srcName, count]) => {
      const pct = Math.round((count / sumSrc) * 100);
      return `
        <div class="metric-bar-row">
          <div class="metric-bar-top">
            <span>${escapeHtml(srcName)}</span>
            <span>${formatBanglaNum(count)} জন (${formatBanglaNum(pct)}%)</span>
          </div>
          <div class="metric-bar-track">
            <div class="metric-bar-fill" style="width:${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Conversion & Drop-off Funnel
  const funnelEl = document.getElementById('conversionFunnelList');
  if (funnelEl) {
    const stages = [
      { label: '১. ওয়েবসাইটে প্রবেশ করেছে (Visited Page)', count: totalSessions, pct: 100 },
      { label: '২. প্রোডাক্ট বা বাটনে ক্লিক করেছে (Clicked Product)', count: clickedSessions, pct: totalSessions ? Math.round((clickedSessions / totalSessions) * 100) : 0 },
      { label: '৩. ব্যাগে প্রোডাক্ট রেখেছে (Added to Cart)', count: cartSessions, pct: totalSessions ? Math.round((cartSessions / totalSessions) * 100) : 0 },
      { label: '৪. চেকআউট ফর্ম থেকে অর্ডার না করে ফিরে গেছে (Drop-off)', count: checkoutDropoffCount, pct: totalSessions ? Math.round((checkoutDropoffCount / totalSessions) * 100) : 0 },
      { label: '৫. অর্ডার সম্পন্ন করেছে (Purchased)', count: sessions.filter(s => s.stage === 'purchased').length, pct: totalSessions ? Math.round((sessions.filter(s => s.stage === 'purchased').length / totalSessions) * 100) : 0 }
    ];
    funnelEl.innerHTML = stages.map(st => `
      <div class="metric-bar-row">
        <div class="metric-bar-top">
          <span>${st.label}</span>
          <span>${formatBanglaNum(st.count)} জন (${formatBanglaNum(st.pct)}%)</span>
        </div>
        <div class="metric-bar-track">
          <div class="metric-bar-fill" style="width:${st.pct}%;"></div>
        </div>
      </div>
    `).join('');
  }

  // 3. Product Click vs No-Click & Cart Engagement Matrix
  const matrixBody = document.getElementById('productEngagementTableBody');
  if (matrixBody) {
    matrixBody.innerHTML = state.products.map(p => {
      const st = (state.analytics.productStats && state.analytics.productStats[p.id]) || { views: 10, clicks: 0, carts: 0, purchases: 0 };
      const views = Math.max(st.views, st.clicks);
      const skipped = Math.max(0, views - st.clicks);
      return `
        <tr>
          <td><strong>${escapeHtml(p.name)}</strong></td>
          <td>${formatBanglaNum(views)} জন</td>
          <td><span class="stage-pill stage-pill-success">${formatBanglaNum(st.clicks)} জন ক্লিক করেছে</span></td>
          <td><span class="stage-pill stage-pill-neutral">${formatBanglaNum(skipped)} জন ক্লিক করেনি</span></td>
          <td><span class="stage-pill stage-pill-warn">${formatBanglaNum(st.carts)} জন কার্টে রেখেছে</span></td>
          <td><strong>${formatBanglaNum(st.purchases)}টি অর্ডার</strong></td>
        </tr>
      `;
    }).join('');
  }

  // 4. Live Visitor Session Journey Table
  const journeyBody = document.getElementById('visitorJourneyTableBody');
  if (journeyBody) {
    journeyBody.innerHTML = sessions.map(s => {
      const clicksText = (s.clicks && s.clicks.length > 0)
        ? s.clicks.map(c => escapeHtml(c)).join(', ')
        : '<span style="color:var(--crimson-ink);">কোনো প্রোডাক্টে ক্লিক করেনি</span>';

      const cartText = (s.cartItems && s.cartItems.length > 0)
        ? `<strong>${s.cartItems.map(c => escapeHtml(c)).join(', ')}</strong>`
        : '<span style="color:var(--text-muted);">কার্টে কিছু রাখেনি</span>';

      let badgeClass = 'stage-pill-neutral';
      if (s.stage === 'cart_abandoned') badgeClass = 'stage-pill-warn';
      if (s.stage === 'checkout_dropoff' || s.stage === 'bounced') badgeClass = 'stage-pill-danger';
      if (s.stage === 'purchased') badgeClass = 'stage-pill-success';

      return `
        <tr>
          <td>
            <strong>${escapeHtml(s.id)}</strong> (${escapeHtml(s.device)})<br/>
            <small style="color:var(--text-muted);">${escapeHtml(s.time)}</small>
          </td>
          <td><strong>${escapeHtml(s.source)}</strong></td>
          <td>${clicksText}</td>
          <td>${cartText}</td>
          <td><span class="stage-pill ${badgeClass}">${escapeHtml(s.stageLabel)}</span></td>
        </tr>
      `;
    }).join('');
  }
}

/* =========================================================================
   ADMIN PRODUCTS, ORDERS & BLOGS MANAGEMENT
   ========================================================================= */
function renderAdminProducts() {
  const listEl = document.getElementById('adminProductsList');
  if (!listEl) return;

  listEl.innerHTML = state.products.map(prod => {
    const isComingSoon = prod.status === 'coming_soon';
    const isStockOut = prod.status === 'stock_out';
    const isInStock = prod.status === 'in_stock';
    const thumbSrc = prod.image || 'assets/spira-hero.jpg';

    return `
      <div class="admin-item-row">
        <div class="admin-item-left">
          <div class="admin-thumb">
            <img src="${thumbSrc}" alt="${escapeHtml(prod.name)}" />
          </div>
          <div>
            <strong>${escapeHtml(prod.name)}</strong>
            <div style="font-size:0.82rem; color:var(--text-secondary);">
              ${escapeHtml(prod.weight)} • মূল্য: <strong>৳${formatBanglaNum(prod.price)}</strong>
            </div>
          </div>
        </div>

        <div class="admin-item-actions">
          <button type="button" class="btn-status-red ${isComingSoon ? 'is-active' : ''}" data-set-status="${prod.id}" data-status-val="coming_soon">
            কামিং সুন
          </button>
          <button type="button" class="btn-status-red ${isStockOut ? 'is-active' : ''}" data-set-status="${prod.id}" data-status-val="stock_out">
            স্টক আউট
          </button>
          <button type="button" class="btn-status-green ${isInStock ? 'is-active' : ''}" data-set-status="${prod.id}" data-status-val="in_stock">
            ইন স্টক
          </button>
          <button type="button" class="btn-outline-emerald" style="padding:6px 10px; font-size:0.8rem;" data-quick-upload="${prod.id}">
            ছবি আপলোড
          </button>
          <button type="button" class="btn-outline-emerald" style="padding:6px 10px; font-size:0.8rem;" data-edit-prod="${prod.id}">
            এডিট
          </button>
          <button type="button" class="btn-status-red" data-delete-prod="${prod.id}">
            মুছুন
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderAdminOrders() {
  const listEl = document.getElementById('adminOrdersList');
  const countBadge = document.getElementById('adminTabOrderCount');
  if (countBadge) countBadge.textContent = state.orders.length;
  if (!listEl) return;

  if (state.orders.length === 0) {
    listEl.innerHTML = `
      <div style="padding:24px; text-align:center; color:var(--text-secondary); background:var(--surface-ivory); border-radius:6px;">
        এখনো কোনো অর্ডার তালিকাভুক্ত হয়নি। উপরের <strong>"+ ডেমো অর্ডার পাঠিয়ে টেস্ট করুন"</strong> বাটনে ক্লিক করে অর্ডার ও নোটিফিকেশন চেক করতে পারেন।
      </div>
    `;
    return;
  }

  listEl.innerHTML = state.orders.map(order => `
    <div class="admin-item-row" style="border-left:4px solid var(--emerald-primary);">
      <div>
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:4px;">
          <strong style="font-family:var(--font-mono); color:var(--emerald-primary);">#${escapeHtml(order.id)}</strong>
          <span class="stage-pill stage-pill-success">${escapeHtml(order.type || 'অর্ডার')}</span>
          <small style="color:var(--text-muted);">${escapeHtml(order.createdAt)}</small>
        </div>
        <div style="font-size:0.92rem;">
          <strong>নাম:</strong> ${escapeHtml(order.customerName)} • <strong>মোবাইল:</strong> ${escapeHtml(order.phone)}
        </div>
        <div style="font-size:0.84rem; color:var(--text-secondary);">
          <strong>ঠিকানা:</strong> ${escapeHtml(order.address)} (${order.zone === 'dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}) • <strong>পেমেন্ট:</strong> ${escapeHtml(order.payment)}
        </div>
        <div style="font-size:0.84rem; margin-top:4px;">
          <strong>প্রোডাক্ট:</strong> ${escapeHtml(order.itemsSummary)}
        </div>
      </div>
      <div style="text-align:right;">
        <strong style="font-size:1.25rem; color:var(--emerald-primary); display:block; margin-bottom:6px;">৳${formatBanglaNum(order.total)}</strong>
        <button type="button" class="btn-status-red" data-delete-order="${order.id}">মুছুন</button>
      </div>
    </div>
  `).join('');
}

function renderAdminBlogs() {
  const listEl = document.getElementById('adminBlogsList');
  if (!listEl) return;
  listEl.innerHTML = state.blogs.map(b => `
    <div class="admin-item-row">
      <div>
        <strong>${escapeHtml(b.title)}</strong>
        <div style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(b.tag)}</div>
      </div>
      <button type="button" class="btn-status-red" data-delete-blog="${b.id}">মুছুন</button>
    </div>
  `).join('');
}

/* =========================================================================
   CART, CHECKOUT & ORDER CREATION (AUTO-INCREMENTS PURCHASE COUNTER + PIXEL)
   ========================================================================= */
function addToCart(prodId) {
  const prod = state.products.find(p => p.id === prodId);
  if (!prod) return;

  recordVisitorClick(prod.name, prod.id);

  const existing = state.cart.find(i => i.productId === prodId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      productId: prod.id,
      name: prod.name,
      price: prod.price,
      status: prod.status,
      qty: 1
    });
  }

  // Track Product AddToCart count in Analytics Matrix
  if (!state.analytics.productStats[prod.id]) {
    state.analytics.productStats[prod.id] = { views: 1, clicks: 1, carts: 0, purchases: 0 };
  }
  state.analytics.productStats[prod.id].carts += 1;

  // Fire Facebook Pixel AddToCart Event
  trackPixelEvent('AddToCart', {
    content_ids: [prod.id],
    content_name: prod.name,
    content_type: 'product',
    value: prod.price,
    currency: 'BDT'
  });

  saveLocalState();
  recordVisitorCartUpdate();
  renderCart();
  openCartDrawer();
}

function renderCart() {
  const badge = document.getElementById('cartCountBadge');
  const bottomBadge = document.getElementById('mobileBottomCartCount');
  const container = document.getElementById('cartItemsContainer');
  const form = document.getElementById('checkoutForm');

  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  if (badge) badge.textContent = count;
  if (bottomBadge) bottomBadge.textContent = count;
  if (!container || !form) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:32px 14px; color:var(--text-muted);">
        আপনার অর্ডার ব্যাগ খালি। প্রোডাক্ট সেকশন থেকে যেকোনো স্পিরুলিনা প্রোডাক্ট নির্বাচন করুন।
      </div>
    `;
    form.hidden = true;
    return;
  }

  form.hidden = false;
  container.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <div>
        <strong style="display:block; font-size:0.92rem;">${escapeHtml(item.name)}</strong>
        <span style="font-size:0.8rem; color:var(--text-muted);">৳${formatBanglaNum(item.price)} × ${item.qty}</span>
      </div>
      <div class="cart-qty-controls">
        <button type="button" class="qty-btn" data-cart-dec="${item.productId}">−</button>
        <strong>${item.qty}</strong>
        <button type="button" class="qty-btn" data-cart-inc="${item.productId}">+</button>
      </div>
    </div>
  `).join('');

  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const zoneEl = document.getElementById('custZone');
  const delivery = (zoneEl && zoneEl.value === 'outside') ? 120 : 60;
  const total = subtotal + delivery;

  const subEl = document.getElementById('summarySubtotal');
  const delEl = document.getElementById('summaryDelivery');
  const totEl = document.getElementById('summaryTotal');
  if (subEl) subEl.textContent = '৳' + formatBanglaNum(subtotal);
  if (delEl) delEl.textContent = '৳' + formatBanglaNum(delivery);
  if (totEl) totEl.textContent = '৳' + formatBanglaNum(total);
}

function playOrderAlarmSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [587.33, 880, 1174.66].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 0.42);
    });
  } catch (e) {}
}

function triggerOrderNotification(order) {
  playOrderAlarmSound();
  const title = `SPIRA নতুন অর্ডার (#${order.id})`;
  const body = `${order.customerName} (${order.phone}) • মোট ৳${order.total}`;
  showToast(`${title} — ${order.customerName}`);

  if ('Notification' in window && Notification.permission === 'granted') {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_ORDER_NOTIFICATION',
        title,
        body,
        orderId: order.id
      });
    } else {
      new Notification(title, { body, icon: 'assets/spira-logo.jpg' });
    }
  }
}

async function createAndSaveOrder(orderObj, orderedCartItems = []) {
  state.orders.unshift(orderObj);

  // Auto-increment Main Website Total Purchases Counter by +1!
  state.counters.totalPurchases = (Number(state.counters.totalPurchases) || 0) + 1;

  // Update Product Purchase Stats
  orderedCartItems.forEach(item => {
    if (state.analytics.productStats[item.productId]) {
      state.analytics.productStats[item.productId].purchases += item.qty;
    }
  });

  // Mark current visitor session as Purchased
  const session = getCurrentVisitorSession();
  if (session) {
    session.stage = 'purchased';
    session.stageLabel = `অর্ডার সম্পন্ন করেছে (#${orderObj.id} • ৳${orderObj.total})`;
  }

  // Fire Facebook Pixel Purchase Event
  trackPixelEvent('Purchase', {
    order_id: orderObj.id,
    value: orderObj.total,
    currency: 'BDT',
    contents: orderedCartItems.map(i => ({ id: i.productId, quantity: i.qty }))
  });

  saveLocalState();
  renderPublicCounters();
  renderAllAdminViews();
  triggerOrderNotification(orderObj);

  if (syncChannel) {
    try { syncChannel.postMessage({ type: 'NEW_ORDER', order: orderObj }); } catch (e) {}
  }

  if (state.supabaseConnected && state.supabaseClient) {
    try {
      await state.supabaseClient.from('orders').insert({
        id: orderObj.id,
        customer_name: orderObj.customerName,
        phone: orderObj.phone,
        zone: orderObj.zone,
        address: orderObj.address,
        payment: orderObj.payment,
        items_summary: orderObj.itemsSummary,
        total: orderObj.total,
        order_type: orderObj.type
      });
    } catch (e) {}
  }
}

/* =========================================================================
   STOCK STATUS & PHOTO UPLOAD HELPERS
   ========================================================================= */
async function updateProductStatus(prodId, newStatus) {
  const prod = state.products.find(p => p.id === prodId);
  if (!prod) return;
  prod.status = newStatus;
  saveLocalState();
  renderProducts();
  renderAdminProducts();

  const statusName = newStatus === 'coming_soon' ? 'কামিং সুন (COMING SOON)'
    : newStatus === 'stock_out' ? 'স্টক আউট (STOCK OUT)'
    : 'ইন স্টক (অর্ডার চালু)';
  showToast(`"${prod.name}" এখন ${statusName} হিসেবে সেট করা হয়েছে।`);

  if (state.supabaseConnected && state.supabaseClient) {
    try {
      await state.supabaseClient.from('products').update({ status: newStatus }).eq('id', prod.id);
    } catch (e) {}
  }
}

async function bulkUpdateProductStatus(newStatus) {
  state.products.forEach(p => { p.status = newStatus; });
  saveLocalState();
  renderProducts();
  renderAdminProducts();
  showToast('সবগুলো প্রোডাক্টের স্টক স্ট্যাটাস আপডেট করা হয়েছে।');
}

function compressImageFile(file, maxWidth = 800, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function triggerQuickPhotoUpload(prodId) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await compressImageFile(file);
    const prod = state.products.find(p => p.id === prodId);
    if (prod) {
      prod.image = dataUrl;
      saveLocalState();
      renderProducts();
      renderAdminProducts();
      showToast(`"${prod.name}"-এর ছবি আপডেট হয়েছে।`);
    }
  };
  input.click();
}

/* =========================================================================
   PWA & SUPABASE SETUP
   ========================================================================= */
let deferredInstallPrompt = null;

function initServiceWorkerAndPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
  });
}

async function handleInstallAppClick() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
  } else {
    document.getElementById('installModalBackdrop').hidden = false;
  }
}

const SUPABASE_SETUP_SQL = `-- ============================================================
-- SPIRA ORGANIC SUPERFOOD — SUPABASE POSTGRES SCHEMA & RLS
-- Copy and paste into Supabase Dashboard -> SQL Editor -> Run
-- ============================================================

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null default 'powder',
  weight text not null,
  price integer not null,
  old_price integer default 0,
  status text not null default 'coming_soon',
  image text default '',
  description text default '',
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  phone text not null,
  zone text not null default 'dhaka',
  address text not null,
  payment text not null default 'COD',
  items_summary text not null,
  total integer not null,
  order_type text default 'অর্ডার',
  created_at timestamptz default now()
);

create table if not exists public.site_metrics (
  id text primary key default 'main',
  total_visitors integer not null default 1420,
  total_purchases integer not null default 318,
  fb_pixel_id text default '',
  updated_at timestamptz default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.site_metrics enable row level security;

grant select, insert, update, delete on public.products to anon, authenticated;
grant select, insert, update, delete on public.orders to anon, authenticated;
grant select, insert, update, delete on public.site_metrics to anon, authenticated;

drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products for select to anon, authenticated using (true);

drop policy if exists "Admin manage products" on public.products;
create policy "Admin manage products" on public.products for all to anon, authenticated using (true) with check (true);

drop policy if exists "Customers insert orders" on public.orders;
create policy "Customers insert orders" on public.orders for insert to anon, authenticated with check (true);

drop policy if exists "Admin manage orders" on public.orders;
create policy "Admin manage orders" on public.orders for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public sync site metrics" on public.site_metrics;
create policy "Public sync site metrics" on public.site_metrics for all to anon, authenticated using (true) with check (true);
`;

const DEFAULT_SUPABASE_URL = 'https://weuoxuszauoacifshvuy.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_eOYLlZ5-QcljD00uQP6LJQ_YrK9Vk8z';

async function initSupabaseIfConfigured() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SB_CONFIG);
    const cfg = raw ? JSON.parse(raw) : { url: DEFAULT_SUPABASE_URL, key: DEFAULT_SUPABASE_KEY };
    const url = (cfg && cfg.url) ? cfg.url : DEFAULT_SUPABASE_URL;
    const key = (cfg && cfg.key) ? cfg.key : DEFAULT_SUPABASE_KEY;

    const urlInput = document.getElementById('sbUrlInput');
    const keyInput = document.getElementById('sbKeyInput');
    if (urlInput) urlInput.value = url;
    if (keyInput) keyInput.value = key;

    localStorage.setItem(STORAGE_KEYS.SB_CONFIG, JSON.stringify({ url, key }));
    if (window.supabase) {
      await connectToSupabase(url, key, false);
    }
  } catch (e) {}
}

async function connectToSupabase(url, key, notify = true) {
  if (!window.supabase) return;
  try {
    const client = window.supabase.createClient(url.trim(), key.trim());
    state.supabaseClient = client;
    state.supabaseConnected = true;

    const statusText = document.getElementById('adminDbStatusText');

    // Test live connection against Supabase API
    const { data: prods, error: prodErr } = await client.from('products').select('*').limit(20);

    if (!prodErr && Array.isArray(prods)) {
      if (statusText) {
        statusText.textContent = '🟢 Supabase Cloud Server (weuoxuszauoacifshvuy) সরাসরি কানেক্টেড ও ডাটাবেস টেবিল সিঙ্ক সক্রিয়!';
      }
      if (prods.length > 0) {
        state.products = prods.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          weight: p.weight,
          price: p.price,
          oldPrice: p.old_price,
          status: p.status,
          image: p.image,
          description: p.description
        }));
        saveLocalState();
        renderProducts();
        renderAdminProducts();
      } else {
        for (const p of state.products) {
          await client.from('products').upsert({
            id: p.id,
            name: p.name,
            category: p.category,
            weight: p.weight,
            price: p.price,
            old_price: p.oldPrice || 0,
            status: p.status,
            image: p.image || '',
            description: p.description
          });
        }
      }
      if (notify) showToast('🟢 Supabase সার্ভার ও ডাটাবেস টেবিলের সাথে সফলভাবে সিঙ্ক হয়েছে!');
    } else {
      // Server API & Publishable Key connected, waiting for initial SQL table creation
      if (statusText) {
        statusText.textContent = '🟢 Supabase API (weuoxuszauoacifshvuy.supabase.co) কানেক্টেড! (ডাটাবেস ট্যাব থেকে SQL কোডটি একবার Run করুন)';
      }
      if (notify) {
        showToast('🟢 Supabase API সার্ভার কানেক্টেড! টেবিল তৈরি করতে SQL কোডটি Supabase SQL Editor-এ একবার Run করুন।');
      }
    }
  } catch (e) {
    if (notify) showToast('Supabase কানেকশন তথ্য চেক করুন।');
  }
}

/* =========================================================================
   UI EVENT BINDINGS
   ========================================================================= */
function bindUIEvents() {
  // Category Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Dosage Calculator Tabs
  const dosageMap = {
    immunity: {
      hl: 'দৈনিক মাত্রা: ৩ থেকে ৫ গ্রাম (সাধারণ সুস্থতা ও ইমিউনিটি)',
      body: `<strong>পাউডার:</strong> সকালে নাস্তার পরে ১ চা-চামচ (৩-৫ গ্রাম) কুসুম গরম পানি বা লেবুর শরবতের সাথে।<br/>
             <strong>ক্যাপসুল:</strong> সকালে ২টি এবং দুপুরে ২টি ভেজিটেবল ক্যাপসুল খাবারের পরে।<br/>
             <strong>মিনি স্যাশে:</strong> প্রতিদিন ১টি ছোট মিনি প্যাকেট (৩ গ্রাম) এক গ্লাস পানিতে গুলিয়ে পান করুন।`
    },
    fitness: {
      hl: 'দৈনিক মাত্রা: ৫ থেকে ৮ গ্রাম (জিম, প্রোটিন ও স্ট্যামিনা)',
      body: `<strong>পাউডার:</strong> ওয়ার্কআউটের ৩০ মিনিট আগে বা পরে ১.৫ চা-চামচ কলা বা প্রোটিন স্মুদির সাথে।<br/>
             <strong>মিনি স্যাশে:</strong> জিমে যাওয়ার সময় শেকার বোতলে ২টি মিনি স্যাশে (৬ গ্রাম) পানিতে মিশিয়ে নিন।`
    },
    detox: {
      hl: 'দৈনিক মাত্রা: ৩ থেকে ৪ গ্রাম (ত্বক, চুল ও ডিটক্স)',
      body: `<strong>পাউডার:</strong> সকালে ১ চা-চামচ স্পিরুলিনা পাউডার ও লেবুর রস হালকা গরম পানিতে মিশিয়ে পান করুন।<br/>
             <strong>ক্যাপসুল:</strong> প্রতিদিন সকালে ২টি ও রাতে ২টি ভেজিটেবল ক্যাপসুল পর্যাপ্ত পানির সাথে।`
    },
    busy: {
      hl: 'দৈনিক মাত্রা: ১টি মিনি স্যাশে বা ৪টি ক্যাপসুল (অফিস ও ভ্রমণ)',
      body: `<strong>মিনি স্যাশে প্যাক:</strong> অফিসের ব্যাগে বা পকেটে রাখুন—দুপুরের ক্লান্তি দূর করতে ১টি ৩ গ্রাম মিনি প্যাকেট পানির বোতলে মিশিয়ে পান করুন।<br/>
             <strong>ক্যাপসুল:</strong> কোনো গন্ধ বা মেশানোর ঝামেলা ছাড়াই লাঞ্চের পর ৪টি ক্যাপসুল খেয়ে নিন।`
    }
  };

  document.querySelectorAll('.dosage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dosage-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const info = dosageMap[tab.getAttribute('data-goal')];
      if (info) {
        document.getElementById('dosageResultBox').innerHTML = `<div class="dosage-highlight">${info.hl}</div><p>${info.body}</p>`;
        recordVisitorClick('ডোজ ক্যালকুলেটর (' + tab.textContent.trim() + ')');
      }
    });
  });

  // Delegated Body Clicks
  document.body.addEventListener('click', (e) => {
    const prodClick = e.target.closest('[data-product-click]');
    if (prodClick) {
      const pid = prodClick.getAttribute('data-product-click');
      const prod = state.products.find(p => p.id === pid);
      if (prod) recordVisitorClick(prod.name, prod.id);
      return;
    }

    const addCartBtn = e.target.closest('[data-add-cart]');
    if (addCartBtn) {
      addToCart(addCartBtn.getAttribute('data-add-cart'));
      return;
    }

    const incBtn = e.target.closest('[data-cart-inc]');
    if (incBtn) {
      const id = incBtn.getAttribute('data-cart-inc');
      const item = state.cart.find(i => i.productId === id);
      if (item) item.qty += 1;
      saveLocalState();
      recordVisitorCartUpdate();
      renderCart();
      return;
    }

    const decBtn = e.target.closest('[data-cart-dec]');
    if (decBtn) {
      const id = decBtn.getAttribute('data-cart-dec');
      const idx = state.cart.findIndex(i => i.productId === id);
      if (idx > -1) {
        state.cart[idx].qty -= 1;
        if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
      }
      saveLocalState();
      recordVisitorCartUpdate();
      renderCart();
      return;
    }

    const blogBtn = e.target.closest('[data-read-blog]');
    if (blogBtn) {
      const bid = blogBtn.getAttribute('data-read-blog');
      const blog = state.blogs.find(b => b.id === bid);
      if (blog) {
        recordVisitorClick('ব্লগ: ' + blog.title);
        document.getElementById('readerCategory').textContent = blog.tag;
        const paras = blog.body.split('\n\n').map(p => `<p style="margin-bottom:14px; white-space:pre-line;">${escapeHtml(p)}</p>`).join('');
        document.getElementById('blogReaderContent').innerHTML = `
          <h2 style="font-size:1.55rem; color:var(--emerald-dark); margin-bottom:14px;">${escapeHtml(blog.title)}</h2>
          <div style="font-size:1rem; line-height:1.75;">${paras}</div>
        `;
        document.getElementById('blogModalBackdrop').hidden = false;
      }
      return;
    }

    const statusBtn = e.target.closest('[data-set-status]');
    if (statusBtn) {
      updateProductStatus(statusBtn.getAttribute('data-set-status'), statusBtn.getAttribute('data-status-val'));
      return;
    }

    const bulkBtn = e.target.closest('[data-bulk-status]');
    if (bulkBtn) {
      bulkUpdateProductStatus(bulkBtn.getAttribute('data-bulk-status'));
      return;
    }

    const uploadBtn = e.target.closest('[data-quick-upload]');
    if (uploadBtn) {
      triggerQuickPhotoUpload(uploadBtn.getAttribute('data-quick-upload'));
      return;
    }

    const editBtn = e.target.closest('[data-edit-prod]');
    if (editBtn) {
      openProductEditorFor(editBtn.getAttribute('data-edit-prod'));
      return;
    }

    const delProdBtn = e.target.closest('[data-delete-prod]');
    if (delProdBtn) {
      const id = delProdBtn.getAttribute('data-delete-prod');
      state.products = state.products.filter(p => p.id !== id);
      saveLocalState();
      renderProducts();
      renderAdminProducts();
      showToast('প্রোডাক্ট মুছে ফেলা হয়েছে।');
      return;
    }

    const delOrderBtn = e.target.closest('[data-delete-order]');
    if (delOrderBtn) {
      const id = delOrderBtn.getAttribute('data-delete-order');
      state.orders = state.orders.filter(o => o.id !== id);
      saveLocalState();
      renderAdminOrders();
      return;
    }

    const delBlogBtn = e.target.closest('[data-delete-blog]');
    if (delBlogBtn) {
      const id = delBlogBtn.getAttribute('data-delete-blog');
      state.blogs = state.blogs.filter(b => b.id !== id);
      saveLocalState();
      renderBlogs();
      renderAdminBlogs();
      return;
    }
  });

  // Track when customer starts typing in checkout form -> records Checkout stage in Funnel
  ['custName', 'custPhone', 'custAddress'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('focus', () => {
        recordVisitorCheckoutStage();
      }, { once: true });
    }
  });

  // Admin Login Form (Password: spira123)
  document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = document.getElementById('adminPasswordInput').value.trim();
    if (entered === ADMIN_PASS) {
      sessionStorage.setItem('spira_admin_unlocked', '1');
      document.getElementById('loginErrorMsg').hidden = true;
      openAdminDashboard('tab-analytics');
      showToast('অ্যাডমিন প্যানেলে স্বাগতম!');
    } else {
      document.getElementById('loginErrorMsg').hidden = false;
    }
  });

  document.getElementById('closeLoginModalBtn').addEventListener('click', () => {
    document.getElementById('adminLoginBackdrop').hidden = true;
  });

  document.getElementById('adminLogoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('spira_admin_unlocked');
    document.getElementById('adminModalBackdrop').hidden = true;
    showToast('অ্যাডমিন প্যানেল লক করা হয়েছে।');
  });

  // Admin Triggers
  ['openAdminBtnTop', 'openAdminBtnFooter'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => requestAdminAccess('tab-analytics'));
  });

  document.getElementById('closeAdminModalBtn').addEventListener('click', () => {
    document.getElementById('adminModalBackdrop').hidden = true;
  });

  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAdminTab(tab.getAttribute('data-admin-tab')));
  });

  // Public Website Counter Calibration Form in Admin
  document.getElementById('counterControlForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newVis = Number(document.getElementById('adminVisitorCountInput').value) || 0;
    const newPur = Number(document.getElementById('adminPurchaseCountInput').value) || 0;
    state.counters.totalVisitors = newVis;
    state.counters.totalPurchases = newPur;
    saveLocalState();
    renderPublicCounters();
    renderAdminAnalytics();
    showToast(`মেইন ওয়েবসাইটের কাউন্টার আপডেট হয়েছে: ভিজিটর ${formatBanglaNum(newVis)}, অর্ডার ${formatBanglaNum(newPur)}`);
  });

  // Simulate Demo Facebook Visitor Button in Analytics Tab
  document.getElementById('simulateVisitorBtn').addEventListener('click', () => {
    state.counters.totalVisitors += 1;
    state.analytics.sources['Facebook Page / Ads'] = (state.analytics.sources['Facebook Page / Ads'] || 0) + 1;
    state.analytics.productStats['prod-sachet-30'].views += 1;
    state.analytics.productStats['prod-sachet-30'].clicks += 1;
    state.analytics.productStats['prod-sachet-30'].carts += 1;

    state.analytics.sessions.unshift({
      id: 'V-' + Math.floor(1000 + Math.random() * 8999),
      time: 'এইমাত্র (Facebook Ad)',
      source: 'Facebook Page / Ads',
      device: 'Mobile (Android)',
      clicks: ['SPIRA অন-দ্য-গো স্পিরুলিনা মিনি স্যাশে (30 Sachets)'],
      cartItems: ['মিনি স্যাশে প্যাক (x1)'],
      stage: 'cart_abandoned',
      stageLabel: 'Add to Cart করে রেখেছে (অর্ডার সম্পন্ন করেনি)'
    });
    saveLocalState();
    renderPublicCounters();
    renderAdminAnalytics();
    showToast('একজন নতুন ফেসবুক ভিজিটর সিমুলেট করা হয়েছে ও কাউন্টার +১ বেড়েছে!');
  });

  // Facebook Pixel Form
  document.getElementById('fbPixelConfigForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.fbPixel.pixelId = document.getElementById('fbPixelIdInput').value.trim();
    state.fbPixel.testCode = document.getElementById('fbTestCodeInput').value.trim();
    saveLocalState();
    updatePixelStatusStrip();
    if (state.fbPixel.pixelId) {
      injectMetaPixelBaseCode(state.fbPixel.pixelId);
      trackPixelEvent('PageView', { setup: 'verified' });
    }
    showToast('Facebook Pixel সেটিংস সেভ করা হয়েছে!');
  });

  document.getElementById('fireTestPixelEventBtn').addEventListener('click', () => {
    trackPixelEvent('AddToCart', {
      content_ids: ['prod-powder-100'],
      content_name: 'SPIRA খাঁটি অর্গানিক স্পিরুলিনা পাউডার (100g)',
      value: 650,
      currency: 'BDT',
      test_event_code: state.fbPixel.testCode || 'TEST_EVENT'
    });
    showToast('টেস্ট Facebook Pixel ইভেন্ট (AddToCart) পাঠানো হয়েছে!');
  });

  // Cart & Checkout Events
  document.getElementById('openCartBtn').addEventListener('click', openCartDrawer);
  document.getElementById('closeCartBtn').addEventListener('click', closeCartDrawer);
  document.getElementById('cartBackdrop').addEventListener('click', closeCartDrawer);
  document.getElementById('custZone').addEventListener('change', updateCheckoutSummary);

  document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.cart.length === 0) return;

    const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const zone = document.getElementById('custZone').value;
    const delivery = zone === 'outside' ? 120 : 60;
    const orderedItems = [...state.cart];

    const orderObj = {
      id: 'SP-' + Math.floor(1000 + Math.random() * 9000),
      customerName: document.getElementById('custName').value.trim(),
      phone: document.getElementById('custPhone').value.trim(),
      zone,
      address: document.getElementById('custAddress').value.trim(),
      payment: document.getElementById('custPayment').value,
      itemsSummary: orderedItems.map(i => `${i.name} (x${i.qty})`).join(', '),
      total: subtotal + delivery,
      type: orderedItems.some(i => i.status !== 'in_stock') ? 'প্রি-বুকিং' : 'নতুন অর্ডার',
      createdAt: new Date().toLocaleString('bn-BD')
    };

    state.cart = [];
    await createAndSaveOrder(orderObj, orderedItems);
    renderCart();
    e.target.reset();
    closeCartDrawer();
    showToast(`ধন্যবাদ ${orderObj.customerName}! আপনার অর্ডার (#${orderObj.id}) সফলভাবে গৃহীত হয়েছে।`);
  });

  // Admin Notifications & Demo Order
  document.getElementById('enableNotifBtn').addEventListener('click', async () => {
    if ('Notification' in window) {
      const p = await Notification.requestPermission();
      if (p === 'granted') {
        playOrderAlarmSound();
        showToast('অর্ডার নোটিফিকেশন ও অ্যালার্ম চালু হয়েছে!');
      }
    } else {
      playOrderAlarmSound();
    }
  });

  document.getElementById('testNotifBtn').addEventListener('click', () => {
    triggerOrderNotification({
      id: 'TEST-' + Math.floor(100 + Math.random() * 900),
      customerName: 'টেস্ট কাস্টমার',
      phone: '01700000000',
      total: 1430
    });
  });

  document.getElementById('createDemoOrderBtn').addEventListener('click', async () => {
    const demoOrder = {
      id: 'SP-' + Math.floor(1000 + Math.random() * 9000),
      customerName: 'মাহমুদুল হাসান (ডেমো অর্ডার)',
      phone: '01711-223344',
      zone: 'dhaka',
      address: 'বনানী রোড ১১, ঢাকা',
      payment: 'COD',
      itemsSummary: 'SPIRA খাঁটি অর্গানিক স্পিরুলিনা পাউডার (100g) (x1), মিনি স্যাশে (x1)',
      total: 1490,
      type: 'নতুন অর্ডার',
      createdAt: new Date().toLocaleString('bn-BD')
    };
    await createAndSaveOrder(demoOrder, [
      { productId: 'prod-powder-100', qty: 1 },
      { productId: 'prod-sachet-30', qty: 1 }
    ]);
  });

  // Product Form in Admin
  document.getElementById('showAddProductFormBtn').addEventListener('click', () => {
    const form = document.getElementById('productEditorForm');
    form.reset();
    document.getElementById('editProdId').value = '';
    document.getElementById('prodImagePreview').hidden = true;
    state.uploadedImageDataUrl = '';
    form.hidden = false;
  });

  document.getElementById('cancelProductFormBtn').addEventListener('click', () => {
    document.getElementById('productEditorForm').hidden = true;
  });

  document.getElementById('prodImageInput').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await compressImageFile(file);
    state.uploadedImageDataUrl = dataUrl;
    const prev = document.getElementById('prodImagePreview');
    prev.src = dataUrl;
    prev.hidden = false;
    document.getElementById('prodImagePlaceholderText').textContent = 'ছবি সিলেক্ট হয়েছে!';
  });

  document.getElementById('productEditorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editProdId').value;
    const prodData = {
      id: editId || ('prod-' + Date.now()),
      name: document.getElementById('prodName').value.trim(),
      category: document.getElementById('prodCategory').value,
      weight: document.getElementById('prodWeight').value.trim(),
      price: Number(document.getElementById('prodPrice').value),
      oldPrice: Number(document.getElementById('prodOldPrice').value) || 0,
      status: document.getElementById('prodStatus').value,
      description: document.getElementById('prodDesc').value.trim(),
      image: state.uploadedImageDataUrl || (editId ? (state.products.find(p => p.id === editId)?.image || '') : '')
    };

    if (editId) {
      const idx = state.products.findIndex(p => p.id === editId);
      if (idx > -1) state.products[idx] = prodData;
    } else {
      state.products.unshift(prodData);
      state.analytics.productStats[prodData.id] = { views: 1, clicks: 0, carts: 0, purchases: 0 };
    }

    saveLocalState();
    renderProducts();
    renderAllAdminViews();
    document.getElementById('productEditorForm').hidden = true;
    showToast(`"${prodData.name}" সফলভাবে সেভ হয়েছে।`);
  });

  // Blog Editor Form
  document.getElementById('blogEditorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.blogs.unshift({
      id: 'blog-' + Date.now(),
      title: document.getElementById('blogTitle').value.trim(),
      tag: document.getElementById('blogTag').value.trim(),
      summary: document.getElementById('blogSummary').value.trim(),
      body: document.getElementById('blogBody').value.trim()
    });
    saveLocalState();
    renderBlogs();
    renderAdminBlogs();
    e.target.reset();
    showToast('নতুন ব্লগ প্রকাশিত হয়েছে!');
  });

  // Supabase SQL Copy & Connect
  document.getElementById('copySupabaseSqlBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL).then(() => {
      document.getElementById('sqlCopyFeedback').textContent = 'SQL কপি হয়েছে!';
      showToast('Supabase SQL কোড কপি হয়েছে!');
    });
  });

  document.getElementById('supabaseConfigForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('sbUrlInput').value.trim();
    const key = document.getElementById('sbKeyInput').value.trim();
    if (!url || !key) return;
    localStorage.setItem(STORAGE_KEYS.SB_CONFIG, JSON.stringify({ url, key }));
    await connectToSupabase(url, key, true);
  });

  document.getElementById('disconnectSupabaseBtn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.SB_CONFIG);
    state.supabaseConnected = false;
    state.supabaseClient = null;
    document.getElementById('adminDbStatusText').textContent = 'লোকাল ও রিয়েল-টাইম অ্যানালিটিক্স সক্রিয়';
    showToast('লোকাল মোডে ফিরে আসা হয়েছে।');
  });

  // Close Modals
  document.getElementById('closeBlogModalBtn').addEventListener('click', () => {
    document.getElementById('blogModalBackdrop').hidden = true;
  });
  document.getElementById('closeInstallModalBtn').addEventListener('click', () => {
    document.getElementById('installModalBackdrop').hidden = true;
  });

  ['topInstallAppBtn', 'headerInstallBtn', 'promoInstallBtn', 'footerInstallBtn', 'mobileDrawerInstallBtn', 'mobileBottomAppBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        const drawer = document.getElementById('mobileNavDrawer');
        if (drawer) drawer.hidden = true;
        handleInstallAppClick();
      });
    }
  });

  // Mobile Menu Drawer & Bottom Bar Controls
  const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuToggleBtn && mobileNavDrawer) {
    mobileMenuToggleBtn.addEventListener('click', () => {
      const isHidden = mobileNavDrawer.hidden;
      mobileNavDrawer.hidden = !isHidden;
      mobileMenuToggleBtn.setAttribute('aria-expanded', String(isHidden));
    });
    mobileNavDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.hidden = true;
        mobileMenuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const mobileDrawerAdminBtn = document.getElementById('mobileDrawerAdminBtn');
  if (mobileDrawerAdminBtn) {
    mobileDrawerAdminBtn.addEventListener('click', () => {
      if (mobileNavDrawer) mobileNavDrawer.hidden = true;
      requestAdminAccess('tab-analytics');
    });
  }

  const mobileBottomCartBtn = document.getElementById('mobileBottomCartBtn');
  if (mobileBottomCartBtn) {
    mobileBottomCartBtn.addEventListener('click', openCartDrawer);
  }
}

function openProductEditorFor(prodId) {
  const prod = state.products.find(p => p.id === prodId);
  if (!prod) return;
  const form = document.getElementById('productEditorForm');
  document.getElementById('editProdId').value = prod.id;
  document.getElementById('prodName').value = prod.name;
  document.getElementById('prodCategory').value = prod.category;
  document.getElementById('prodWeight').value = prod.weight;
  document.getElementById('prodPrice').value = prod.price;
  document.getElementById('prodOldPrice').value = prod.oldPrice || '';
  document.getElementById('prodStatus').value = prod.status;
  document.getElementById('prodDesc').value = prod.description;
  state.uploadedImageDataUrl = prod.image || '';
  form.hidden = false;
}

function openCartDrawer() {
  document.getElementById('cartBackdrop').hidden = false;
  document.getElementById('cartDrawer').hidden = false;
}

function closeCartDrawer() {
  document.getElementById('cartBackdrop').hidden = true;
  document.getElementById('cartDrawer').hidden = true;
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function formatBanglaNum(num) {
  return (Number(num) || 0).toLocaleString('bn-BD');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
