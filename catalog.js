/* BLACKED Fusion V1 — source-mapped asset and content registry.
 * Step 3.3 adds Muslim, Christian and Sanskari user-supplied collection artwork locally.
 * Legacy source repository image binaries remain remote because their full ZIP archives
 * were not available in this build session. Bundle/hash/decode them before production.
 */
(function (global) {
  'use strict';
  const repo3 = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-3/main/';
  const repo4 = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-4f/main/';
  const delta = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-full-finally-/main/';
  const asset = (base, path) => `${base}${path}`;

  const products = [
    { id:'move', name:'Move Together', category:'Campaign', tag:'Original reference', type:'campaign-reference', image:asset(repo3,'ref-01-blacked-move-together.png'), description:'Movement-inspired BLACKED campaign reference.', details:'Campaign visual only. Exact physical SKU, fabric, sizes, prices and stock are not confirmed.', overlay:null },
    { id:'yoga', name:'Yoga Together', category:'Campaign', tag:'Original reference', type:'campaign-reference', image:asset(repo3,'ref-02-blacked-yoga-together.png'), description:'Warm-studio BLACKED campaign reference.', details:'Campaign visual only; do not treat it as confirmed inventory.', overlay:null },
    { id:'redlace', name:'Red Lace Bodysuit', category:'Design reference', tag:'Reference only', type:'external-reference', image:asset(repo3,'ref-03-red-lace-bodysuit-reference.png'), description:'Red lace styling reference.', details:'The artwork contains external-brand context. It is a reference, not confirmed BLACKED stock.', overlay:null },
    { id:'stretch', name:'Movement & Stretch', category:'Campaign', tag:'Shoot reference', type:'campaign-reference', image:asset(repo3,'ref-04-movement-stretch-reference.png'), description:'Movement-focused studio reference.', details:'Reference only. Product identity and specifications are not confirmed.', overlay:null },
    { id:'blacklace', name:'Black Lace Cut-Out Set', category:'Design reference', tag:'Concept/reference', type:'external-reference', image:asset(repo3,'ref-05-black-lace-cutout-reference.png'), description:'Black lace and cut-out styling direction.', details:'Reference image; not confirmed BLACKED inventory.', overlay:asset(repo3,'cutout-black-lace-set.webp') },
    { id:'velvet', name:'Velvet Lace Set', category:'Design reference', tag:'Concept/reference', type:'external-reference', image:asset(repo3,'ref-06-velvet-lace-reference.png'), description:'Velvet and lace styling reference.', details:'Reference only. Materials and availability are not verified.', overlay:null },
    { id:'rose', name:'Rose Strap Set', category:'Design reference', tag:'Reference only', type:'external-reference', image:asset(repo3,'ref-07-rose-strap-mannequin-reference.jpg'), description:'Rose-strap mannequin reference.', details:'A reference image, not a confirmed product listing.', overlay:null },
    { id:'butterfly', name:'Pink Butterfly Lace', category:'Design reference', tag:'Reference only', type:'external-reference', image:asset(repo3,'ref-08-pink-butterfly-detail-reference.jpg'), description:'Pink butterfly lace detail reference.', details:'Reference only; not confirmed inventory.', overlay:null },
    { id:'signature', name:'Black Comfort Set', category:'Campaign', tag:'Original reference', type:'campaign-reference', image:asset(repo3,'ref-09-blacked-comfort-set.png'), description:'Original BLACKED comfort-set campaign visual.', details:'Campaign artwork, not a verified SKU. Confirm real construction, sizes and stock before sale.', overlay:null },
    { id:'together', name:'Better Together', category:'Campaign', tag:'Original reference', type:'campaign-reference', image:asset(repo3,'ref-10-blacked-better-together.png'), description:'Original BLACKED “Better Together” campaign.', details:'Campaign visual only; not automatically a separate product SKU.', overlay:null },
    { id:'sculpt', name:'Midnight Sculpt', category:'Concept', tag:'Concept only', type:'concept', image:asset(repo3,'design-11-midnight-sculpt.png'), productImage:asset(repo3,'design-11-midnight-sculpt-product.jpg'), description:'Midnight sculpt concept board.', details:'Concept only. Price, material, dimensions, sizes and stock are not confirmed.', overlay:null },
    { id:'midnight', name:'Midnight Lace', category:'Concept', tag:'Concept only', type:'concept', image:asset(repo3,'design-12-midnight-lace.png'), productImage:asset(repo3,'design-12-midnight-lace-product.jpg'), description:'Midnight lace concept board.', details:'Concept only. Supplier and product specifications remain unverified.', overlay:asset(repo3,'cutout-black-lace-set.webp') },
    { id:'scarlet', name:'Scarlet Satin', category:'Concept', tag:'Concept only', type:'concept', image:asset(repo3,'design-13-scarlet-satin.png'), productImage:asset(repo3,'design-13-scarlet-satin-product.jpg'), description:'Scarlet satin concept board.', details:'Concept only, not confirmed inventory.', overlay:asset(repo3,'cutout-scarlet-satin-set.webp') },
    { id:'ivory', name:'Ivory Bloom', category:'Concept', tag:'Concept only', type:'concept', image:asset(repo3,'design-14-ivory-bloom.png'), productImage:asset(repo3,'design-14-ivory-bloom-product.jpg'), description:'Ivory floral concept board.', details:'Concept only. Stock, materials and sizes are not confirmed.', overlay:asset(repo3,'cutout-ivory-bloom-set.webp') },
    { id:'lace-black', name:'Midnight Lace · Edit', category:'Campaign', tag:'Visual concept', type:'concept', image:asset(repo4,'look-black-lace.webp'), description:'Black lace campaign edit.', details:'Illustrative campaign item. No live SKU, inventory, price or checkout.', overlay:null },
    { id:'entry-shareef', name:'Entry Shareef', category:'Sanskari', tag:'Campaign reference', type:'campaign-reference', image:asset(repo4,'look-entry-shareef.webp'), description:'Sanskari editorial campaign reference.', details:'Campaign visual only; not confirmed stock.', overlay:null },
    { id:'pallu-shareef', name:'Pallu Shareef', category:'Sanskari', tag:'Campaign reference', type:'campaign-reference', image:asset(repo4,'look-pallu-shareef.webp'), description:'Pallu-inspired campaign reference.', details:'Campaign visual only; not confirmed stock.', overlay:null },
    { id:'sanskari-blue', name:'Sanskari Raat', category:'Sanskari', tag:'Campaign reference', type:'campaign-reference', image:asset(repo4,'look-sanskari-blue.webp'), description:'Navy and gold-inspired editorial reference.', details:'Concept campaign reference, not verified inventory.', overlay:null },
    { id:'aankhein', name:'Aankhein Neeche', category:'Sanskari', tag:'Campaign reference', type:'campaign-reference', image:asset(repo4,'look-aankhein.webp'), description:'Double-meaning campaign visual.', details:'Campaign reference only. No live product claims.', overlay:null }
  ];

  const sanskari = [
    {id:'sanskari-pallu', title:'Pallu Shareef Hai, Kahani Nahi', image:asset(repo3,'01-pallu-shareef.webp'), type:'Campaign artwork'},
    {id:'sanskari-raat', title:'Sanskari Raat, Bold Khayal', image:asset(repo3,'02-sanskari-raat.webp'), type:'Campaign artwork'},
    {id:'mirror-knows', title:'Mirror Knows Everything', image:asset(repo3,'03-mirror-knows.webp'), type:'Campaign artwork'},
    {id:'taiyaari', title:'Taiyaari Masoom Hai', image:asset(repo3,'04-taiyaari-masoom.webp'), type:'Campaign artwork'},
    {id:'entry-shareef', title:'Entry Shareef, Impression Khatarnak', image:asset(repo3,'05-entry-shareef.webp'), type:'Campaign artwork'},
    {id:'sweet-dark', title:'Sweet Face, Dark Mood', image:asset(repo3,'06-sweet-face-dark-mood.webp'), type:'Campaign artwork'},
    {id:'shareef-nazar', title:'Shareef Si Nazar', image:asset(repo3,'07-shareef-nazar.webp'), type:'Campaign artwork'},
    {id:'raat-shareef', title:'Raat Shareef Hai, Khayal Nahi', image:asset(repo3,'08-raat-shareef.webp'), type:'Campaign artwork'},
    {id:'sanskari-banner', title:'Sanskari Outside, Bold Inside', image:asset(repo3,'09-sanskari-outside-banner.webp'), type:'Campaign banner'},
    {id:'sanskari-dangerous', title:'Sanskari Outside, Dangerous Inside', image:asset(repo3,'10-sanskari-outside-dangerous.webp'), type:'Campaign artwork'},
    {id:'sanskari-dangerous-new', title:'Sanskari Outside, Dangerous Inside · New Artwork', image:'assets/sanskari-collection/sanskari-outside-dangerous-new.webp', type:'User-supplied campaign reference; not verified stock'},
    {id:'sanskari-bold-within-new', title:'Sanskari Outside, Bold Within', image:'assets/sanskari-collection/sanskari-outside-bold-within.webp', type:'User-supplied campaign reference; not verified stock'}
  ];

  const muslimCollection = [
    {id:'muslim-noor-01', title:'Shaam-e-Noor', image:'assets/muslim-collection/muslim-shaam-e-noor.webp', type:'User-supplied concept crop · Coming Soon'},
    {id:'muslim-noor-02', title:'Shaam Ki Roshni', image:'assets/muslim-collection/muslim-shaam-ki-roshni.webp', type:'User-supplied concept crop · Coming Soon'},
    {id:'muslim-noor-03', title:'Noor Ka Nasha', image:'assets/muslim-collection/muslim-noor-ka-nasha.webp', type:'User-supplied concept crop · Coming Soon'},
    {id:'muslim-noor-04', title:'Shaam Se Raat Tak', image:'assets/muslim-collection/muslim-shaam-se-raat-tak.webp', type:'User-supplied concept crop · Coming Soon'},
    {id:'muslim-noor-05', title:'Tradition Outside, Desire Inside', image:'assets/muslim-collection/muslim-tradition-outside-desire-inside.webp', type:'User-supplied modest-style campaign concept · Coming Soon'},
    {id:'muslim-noor-06', title:'Elegance Begins Within', image:'assets/muslim-collection/muslim-elegance-begins-within.webp', type:'User-supplied modest-style campaign concept · Coming Soon'}
  ];

  const christianCollection = [
    {id:'christian-grace-01', title:'Grace Has Never Looked So Bold', image:'assets/christian-collection/christian-grace-has-never-looked-so-bold.webp', type:'User-supplied Christian-inspired concept artwork · Coming Soon'}
  ];

  const boyfriendGallery = [
    {id:'bf-cafe-1', title:'Coffee & conversation', image:asset(delta,'boyfriend-cafe-01.webp')},
    {id:'bf-cafe-2', title:'A relaxed date idea', image:asset(delta,'boyfriend-cafe-02.webp')},
    {id:'bf-cafe-3', title:'A moment together', image:asset(delta,'boyfriend-cafe-03.webp')},
    {id:'bf-cafe-4', title:'A thoughtful plan', image:asset(delta,'boyfriend-cafe-04.webp')},
    {id:'bf-cafe-5', title:'Easygoing evening', image:asset(delta,'boyfriend-cafe-05.webp')},
    {id:'bf-cafe-6', title:'Share a new experience', image:asset(delta,'boyfriend-cafe-06.webp')},
    {id:'bf-cafe-7', title:'Make time for each other', image:asset(delta,'boyfriend-cafe-07.webp')}
  ];

  const wellnessGallery = [
    {id:'wellness-01',title:'Silver gem detail',image:asset(delta,'silver-gems.webp'),note:'Reference image; supplier and specifications are not verified.'},
    {id:'wellness-02',title:'Silver heart accessory',image:asset(delta,'silver-heart.webp'),note:'Reference image; not a claim of stock.'},
    {id:'wellness-03',title:'Silver-pink gem accessory',image:asset(delta,'silver-pink-gem.webp'),note:'Reference image only.'},
    {id:'wellness-04',title:'Comfort campaign · yellow',image:asset(delta,'plush-campaign-yellow.webp'),note:'Lifestyle campaign, not product specification.'},
    {id:'wellness-05',title:'Comfort campaign · white',image:asset(delta,'plush-campaign-white.webp'),note:'Lifestyle campaign reference.'},
    {id:'wellness-06',title:'Pastel comfort editorial',image:asset(delta,'plush-campaign-pink.webp'),note:'Campaign inspiration.'},
    {id:'wellness-07',title:'18+ product reference',image:asset(delta,'product-warning-reference.webp'),note:'Packaging wording has not been independently verified.'},
    {id:'wellness-08',title:'Purple and pink product reference',image:asset(delta,'purple-pink-product.webp'),note:'Supplier claims and specifications unverified.'},
    {id:'wellness-09',title:'Pink accessories flatlay',image:asset(delta,'pink-accessories-flatlay.webp'),note:'Adult wellness accessory reference.'},
    {id:'wellness-10',title:'Dark product range',image:asset(delta,'dark-product-flatlay.webp'),note:'Reference image; not live stock.'},
    {id:'wellness-11',title:'Red heart close-up',image:asset(delta,'red-heart-closeup.webp'),note:'Reference/detail image.'},
    {id:'wellness-12',title:'Dual massager packaging reference',image:asset(delta,'dual-massager-box.webp'),note:'No supplier or specification verification.'},
    {id:'wellness-13',title:'Pink cuffs editorial',image:asset(delta,'pink-cuffs-editorial.webp'),note:'18+ styling reference.'},
    {id:'wellness-14',title:'Animated product reference',image:asset(delta,'animated-product.gif'),note:'User-supplied reference; specifications unverified.'}
  ];

  const wheelFrames = [
    {name:'Front',image:asset(repo3,'360-demo-01-front.webp')},
    {name:'Front three-quarter',image:asset(repo3,'360-demo-02-front-three-quarter.webp')},
    {name:'Side quarter',image:asset(repo3,'360-demo-03-side-quarter.webp')},
    {name:'Rear three-quarter',image:asset(repo3,'360-demo-04-rear-three-quarter.webp')},
    {name:'Rear',image:asset(repo3,'360-demo-05-rear.webp')},
    {name:'Rear opposite',image:asset(repo3,'360-demo-06-rear-opposite.webp')},
    {name:'Side opposite',image:asset(repo3,'360-demo-07-side-opposite.webp')},
    {name:'Front opposite',image:asset(repo3,'360-demo-08-front-opposite.webp')}
  ];

  const dirtyCategories = {
    flirting: {label:'Flirty & Teasing', prompts:['Give your partner a compliment you usually keep to yourself.','Send a playful “thinking of you” message—only if you both enjoy it.','Describe your ideal low-pressure date night.']},
    double: {label:'Dirty Double Meanings', prompts:['Create a cheeky one-liner that stays playful, not insulting.','Finish this line: “Aankhein sambhalna mushkil hai, kyunki…”','Invent a private nickname you both find funny.']},
    couple: {label:'Bold Couple Challenges', prompts:['Each person chooses one small, kind surprise for the other.','Take turns naming one thing that makes a date feel special.','Set a 10-minute no-phone conversation challenge.']},
    spicy: {label:'Romantic but Spicy', prompts:['Describe a romantic setting using three sensory details.','Plan a slow, screen-free evening together.','Share one kind of flirting you enjoy and one you do not.']},
    fantasy: {label:'Wild Fantasy Prompts', prompts:['Talk about a fictional romantic scenario you both find intriguing.','Choose a movie-style setting for a consensual roleplay conversation.','Name one boundary that helps you feel comfortable exploring a fantasy.']},
    truth: {label:'Truth or Dare for Couples', prompts:['Truth: what makes you feel appreciated?','Dare: plan a tiny surprise within your agreed budget.','Truth: what is a topic you would like to discuss more openly?']},
    crush: {label:'Secret Crush & Confessions', prompts:['Share a memorable first impression—only if both want to.','Say one thing you admire about the other person.','Ask: “What helps you feel confident around me?”']},
    boyfriend: {label:'Boyfriend Challenges', prompts:['Plan the next date together in five minutes.','Write a two-line appreciation note.','Ask your partner to choose the music and you choose the snack.']},
    private: {label:'Private Fantasy Conversations', prompts:['Ask what topics are comfortable, off-limits, or “maybe later”.','Agree on an easy way to pause a conversation.','Ask: “Would you enjoy talking about this, or skip it today?”']},
    dark: {label:'Dark Romance & Mystery', prompts:['Invent a fictional mysterious meeting in a rain-soaked city.','Create a dramatic but respectful secret-admirer plot for two fictional adults.','Pick a mysterious setting and describe the atmosphere—not a real person.']}
  };

  const originalWheelOptions = {
    dildo: [
      {key:'small',label:'Compact preference',desc:'A smaller-format option'},
      {key:'medium',label:'Medium preference',desc:'A medium-format option'},
      {key:'large',label:'Larger preference',desc:'A larger-format option'},
      {key:'surprise',label:'Surprise me',desc:'A random demo category'}
    ],
    plug: [
      {key:'compact',label:'Compact preference',desc:'A smaller-format option'},
      {key:'standard',label:'Standard preference',desc:'A standard-format option'},
      {key:'wide',label:'Wider preference',desc:'A wider-format option'},
      {key:'surprise',label:'Surprise me',desc:'A random demo category'}
    ],
    boyfriend: [
      {key:'gentle',label:'Easygoing',desc:'Low-key, comfortable vibe'},
      {key:'playful',label:'Playful',desc:'Light jokes and flirting'},
      {key:'bold',label:'Bold banter',desc:'Confident but respectful'},
      {key:'surprise',label:'Surprise me',desc:'A random demo offer'}
    ]
  };

  global.BLK = { products, sanskari, muslimCollection, christianCollection, boyfriendGallery, wellnessGallery, wheelFrames, dirtyCategories, originalWheelOptions, remoteRepositories: { repo3, repo4, delta } };
})(window);
