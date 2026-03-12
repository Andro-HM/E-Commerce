import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Apparel', slug: 'apparel' },
  { name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { name: 'Books', slug: 'books' },
]

const productsByCategory: Record<string, any[]> = {
  electronics: [
    { title: 'Wireless Noise-Cancelling Headphones', description: 'Premium over-ear headphones with 30hr battery life and active noise cancellation.', price: 299.99, stock_quantity: 45, image_url: 'https://source.unsplash.com/400x400/?headphones' },
    { title: 'Mechanical Keyboard', description: 'Compact TKL mechanical keyboard with RGB backlight and blue switches.', price: 89.99, stock_quantity: 30, image_url: 'https://source.unsplash.com/400x400/?mechanical-keyboard' },
    { title: '4K USB-C Monitor', description: '27-inch 4K IPS display with USB-C connectivity and HDR support.', price: 549.99, stock_quantity: 15, image_url: 'https://source.unsplash.com/400x400/?computer-monitor' },
    { title: 'Portable Bluetooth Speaker', description: 'Waterproof speaker with 360-degree sound and 12hr playtime.', price: 79.99, stock_quantity: 60, image_url: 'https://source.unsplash.com/400x400/?bluetooth-speaker' },
    { title: 'Smart Watch Series X', description: 'Fitness tracking, heart rate monitor, GPS and 7-day battery.', price: 249.99, stock_quantity: 25, image_url: 'https://source.unsplash.com/400x400/?smartwatch' },
    { title: 'Wireless Charging Pad', description: 'Fast 15W Qi wireless charger compatible with all Qi-enabled devices.', price: 34.99, stock_quantity: 80, image_url: 'https://source.unsplash.com/400x400/?wireless-charger' },
    { title: 'USB-C Hub 7-in-1', description: 'Expand your laptop with HDMI, USB-A, SD card, and more.', price: 49.99, stock_quantity: 55, image_url: 'https://source.unsplash.com/400x400/?usb-hub' },
    { title: 'Webcam 4K Pro', description: 'Ultra HD webcam with autofocus and built-in ring light for streaming.', price: 129.99, stock_quantity: 20, image_url: 'https://source.unsplash.com/400x400/?webcam' },
    { title: 'Noise-Cancelling Earbuds', description: 'True wireless earbuds with ANC, transparency mode and 24hr case.', price: 179.99, stock_quantity: 40, image_url: 'https://source.unsplash.com/400x400/?earbuds' },
    { title: 'Portable SSD 1TB', description: 'USB 3.2 external SSD with 1050MB/s read speed in a pocket-sized form.', price: 109.99, stock_quantity: 35, image_url: 'https://source.unsplash.com/400x400/?hard-drive' },
  ],
  'home-kitchen': [
    { title: 'Air Fryer 5.8QT', description: 'Large capacity air fryer with 8 presets and digital touchscreen.', price: 89.99, stock_quantity: 50, image_url: 'https://source.unsplash.com/400x400/?air-fryer' },
    { title: 'Pour Over Coffee Set', description: 'Handcrafted glass pour-over dripper with gooseneck kettle and filters.', price: 44.99, stock_quantity: 40, image_url: 'https://source.unsplash.com/400x400/?pour-over-coffee' },
    { title: 'Robot Vacuum', description: 'Smart mapping robot vacuum with auto-empty base and app control.', price: 349.99, stock_quantity: 18, image_url: 'https://source.unsplash.com/400x400/?robot-vacuum' },
    { title: 'Bamboo Cutting Board Set', description: 'Set of 3 organic bamboo cutting boards with juice grooves.', price: 29.99, stock_quantity: 70, image_url: 'https://source.unsplash.com/400x400/?cutting-board' },
    { title: 'Instant Pot 6QT', description: '9-in-1 multi-use pressure cooker, slow cooker, rice cooker and more.', price: 99.99, stock_quantity: 30, image_url: 'https://source.unsplash.com/400x400/?instant-pot' },
    { title: 'Ceramic Non-Stick Pan Set', description: '3-piece ceramic coated cookware set, PFOA-free and dishwasher safe.', price: 74.99, stock_quantity: 25, image_url: 'https://source.unsplash.com/400x400/?cooking-pan' },
    { title: 'Smart LED Bulbs 4-Pack', description: 'WiFi-enabled color changing bulbs, works with Alexa and Google Home.', price: 39.99, stock_quantity: 90, image_url: 'https://source.unsplash.com/400x400/?led-bulb' },
    { title: 'French Press Coffee Maker', description: 'Double-wall stainless steel French press, keeps coffee hot for 1hr.', price: 34.99, stock_quantity: 45, image_url: 'https://source.unsplash.com/400x400/?french-press' },
    { title: 'Knife Set 15-Piece', description: 'High-carbon stainless steel knife block set with sharpener.', price: 129.99, stock_quantity: 20, image_url: 'https://source.unsplash.com/400x400/?kitchen-knife' },
    { title: 'Aroma Diffuser & Humidifier', description: 'Ultrasonic diffuser with 7 LED colors and auto shutoff, 500ml tank.', price: 24.99, stock_quantity: 0, image_url: 'https://source.unsplash.com/400x400/?aroma-diffuser' },
  ],
  apparel: [
    { title: 'Classic Slim Fit Chinos', description: 'Stretch cotton chinos in a modern slim fit, available in multiple colors.', price: 59.99, stock_quantity: 100, image_url: 'https://source.unsplash.com/400x400/?chinos-pants' },
    { title: 'Merino Wool Crew Sweater', description: 'Lightweight 100% merino wool sweater, perfect for layering.', price: 89.99, stock_quantity: 40, image_url: 'https://source.unsplash.com/400x400/?wool-sweater' },
    { title: 'Running Shorts 5\"', description: 'Lightweight quick-dry running shorts with liner and zip pocket.', price: 34.99, stock_quantity: 75, image_url: 'https://source.unsplash.com/400x400/?running-shorts' },
    { title: 'Puffer Jacket', description: 'Water-resistant puffer jacket with 600-fill down insulation.', price: 149.99, stock_quantity: 30, image_url: 'https://source.unsplash.com/400x400/?puffer-jacket' },
    { title: 'Graphic Tee Pack (3x)', description: 'Pack of 3 premium cotton graphic tees with minimalist designs.', price: 44.99, stock_quantity: 60, image_url: 'https://source.unsplash.com/400x400/?graphic-tshirt' },
    { title: 'Denim Jacket', description: 'Classic washed denim jacket with button front and chest pockets.', price: 79.99, stock_quantity: 35, image_url: 'https://source.unsplash.com/400x400/?denim-jacket' },
    { title: 'Compression Leggings', description: 'High-waist 4-way stretch leggings with side pocket, squat-proof.', price: 54.99, stock_quantity: 80, image_url: 'https://source.unsplash.com/400x400/?leggings' },
    { title: 'Oxford Button-Down Shirt', description: 'Classic fit Oxford shirt in wrinkle-resistant cotton blend.', price: 49.99, stock_quantity: 55, image_url: 'https://source.unsplash.com/400x400/?dress-shirt' },
    { title: 'Wool Beanie', description: 'Soft ribbed knit beanie in recycled wool blend, one size fits all.', price: 19.99, stock_quantity: 0, image_url: 'https://source.unsplash.com/400x400/?beanie-hat' },
    { title: 'Leather Belt', description: 'Genuine full-grain leather belt with brushed silver buckle.', price: 39.99, stock_quantity: 45, image_url: 'https://source.unsplash.com/400x400/?leather-belt' },
  ],
  'sports-outdoors': [
    { title: 'Adjustable Dumbbell Set', description: 'Space-saving adjustable dumbbells from 5 to 52.5 lbs per hand.', price: 349.99, stock_quantity: 15, image_url: 'https://source.unsplash.com/400x400/?dumbbells' },
    { title: 'Yoga Mat Pro', description: 'Extra thick 6mm non-slip yoga mat with carrying strap and alignment lines.', price: 49.99, stock_quantity: 60, image_url: 'https://source.unsplash.com/400x400/?yoga-mat' },
    { title: 'Hiking Backpack 40L', description: 'Waterproof hiking pack with hip belt, rain cover and hydration sleeve.', price: 119.99, stock_quantity: 25, image_url: 'https://source.unsplash.com/400x400/?hiking-backpack' },
    { title: 'Resistance Bands Set', description: 'Set of 5 latex resistance bands from 10 to 50 lbs with door anchor.', price: 29.99, stock_quantity: 90, image_url: 'https://source.unsplash.com/400x400/?resistance-bands' },
    { title: 'Foam Roller', description: 'High-density EVA foam roller for deep tissue massage and recovery.', price: 24.99, stock_quantity: 70, image_url: 'https://source.unsplash.com/400x400/?foam-roller' },
    { title: 'Insulated Water Bottle 32oz', description: 'Double-wall vacuum insulated stainless steel bottle, keeps cold 24hr.', price: 34.99, stock_quantity: 100, image_url: 'https://source.unsplash.com/400x400/?water-bottle' },
    { title: 'Jump Rope Speed Cable', description: 'Adjustable speed jump rope with ball bearings and memory foam handles.', price: 19.99, stock_quantity: 85, image_url: 'https://source.unsplash.com/400x400/?jump-rope' },
    { title: 'Camping Tent 2-Person', description: 'Lightweight 3-season tent with easy setup, waterproof rainfly.', price: 179.99, stock_quantity: 20, image_url: 'https://source.unsplash.com/400x400/?camping-tent' },
    { title: 'Trekking Poles (Pair)', description: 'Collapsible aluminum trekking poles with cork grips and wrist straps.', price: 59.99, stock_quantity: 30, image_url: 'https://source.unsplash.com/400x400/?trekking-poles' },
    { title: 'Pull-Up Bar Doorframe', description: 'No-screw doorframe pull-up bar, fits 24-35 inch frames, 300lb capacity.', price: 44.99, stock_quantity: 0, image_url: 'https://source.unsplash.com/400x400/?pull-up-bar' },
  ],
  books: [
    { title: 'Atomic Habits', description: 'James Clear\'s #1 NYT bestseller on building good habits and breaking bad ones.', price: 16.99, stock_quantity: 120, image_url: 'https://source.unsplash.com/400x400/?book-reading' },
    { title: 'The Pragmatic Programmer', description: 'Classic software engineering guide from journeyman to master, 20th anniversary edition.', price: 49.99, stock_quantity: 40, image_url: 'https://source.unsplash.com/400x400/?programming-book' },
    { title: 'Sapiens', description: 'Yuval Noah Harari\'s sweeping history of humankind from Stone Age to present.', price: 18.99, stock_quantity: 85, image_url: 'https://source.unsplash.com/400x400/?history-book' },
    { title: 'Deep Work', description: 'Cal Newport\'s rules for focused success in a distracted world.', price: 15.99, stock_quantity: 95, image_url: 'https://source.unsplash.com/400x400/?focus-work' },
    { title: 'The Design of Everyday Things', description: 'Don Norman\'s foundational book on user-centered design and usability.', price: 22.99, stock_quantity: 50, image_url: 'https://source.unsplash.com/400x400/?design-book' },
    { title: 'Clean Code', description: 'Robert C. Martin\'s handbook of agile software craftsmanship.', price: 44.99, stock_quantity: 35, image_url: 'https://source.unsplash.com/400x400/?coding' },
    { title: 'Zero to One', description: 'Peter Thiel\'s notes on startups and how to build the future.', price: 14.99, stock_quantity: 75, image_url: 'https://source.unsplash.com/400x400/?startup-book' },
    { title: 'Thinking, Fast and Slow', description: 'Daniel Kahneman\'s exploration of the two systems that drive the way we think.', price: 17.99, stock_quantity: 60, image_url: 'https://source.unsplash.com/400x400/?psychology-book' },
    { title: 'The Lean Startup', description: 'Eric Ries on how continuous innovation creates radically successful businesses.', price: 16.99, stock_quantity: 0, image_url: 'https://source.unsplash.com/400x400/?entrepreneur-book' },
    { title: 'Designing Data-Intensive Applications', description: 'Martin Kleppmann\'s comprehensive guide to the big ideas behind reliable scalable systems.', price: 59.99, stock_quantity: 28, image_url: 'https://source.unsplash.com/400x400/?data-science-book' },
  ],
}

async function seed() {
  console.log('🌱 Seeding categories...')

  const { data: insertedCategories, error: catError } = await supabase
    .from('categories')
    .insert(categories)
    .select()

  if (catError) {
    console.error('❌ Category seed failed:', catError.message)
    process.exit(1)
  }

  console.log(`✅ Inserted ${insertedCategories.length} categories`)

  const categoryMap: Record<string, string> = {}
  insertedCategories.forEach((cat) => {
    categoryMap[cat.slug] = cat.id
  })

  console.log('🌱 Seeding products...')

  const allProducts = Object.entries(productsByCategory).flatMap(([slug, products]) =>
    products.map((p) => ({
      ...p,
      category_id: categoryMap[slug],
    }))
  )

  const { data: insertedProducts, error: prodError } = await supabase
    .from('products')
    .insert(allProducts)
    .select()

  if (prodError) {
    console.error('❌ Product seed failed:', prodError.message)
    process.exit(1)
  }

  console.log(`✅ Inserted ${insertedProducts.length} products`)
  console.log('🎉 Seeding complete!')
}

seed()
