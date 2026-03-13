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
    { title: 'Wireless Noise-Cancelling Headphones', description: 'Premium over-ear headphones with 30hr battery life and active noise cancellation.', price: 299.99, stock_quantity: 45, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { title: 'Mechanical Keyboard', description: 'Compact TKL mechanical keyboard with RGB backlight and blue switches.', price: 89.99, stock_quantity: 30, image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop' },
    { title: '4K USB-C Monitor', description: '27-inch 4K IPS display with USB-C connectivity and HDR support.', price: 549.99, stock_quantity: 15, image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop' },
    { title: 'Portable Bluetooth Speaker', description: 'Waterproof speaker with 360-degree sound and 12hr playtime.', price: 79.99, stock_quantity: 60, image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { title: 'Smart Watch Series X', description: 'Fitness tracking, heart rate monitor, GPS and 7-day battery.', price: 249.99, stock_quantity: 25, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { title: 'Wireless Charging Pad', description: 'Fast 15W Qi wireless charger compatible with all Qi-enabled devices.', price: 34.99, stock_quantity: 80, image_url: 'https://images.unsplash.com/photo-1618577608401-46f4a95e0e4c?w=400&h=400&fit=crop' },
    { title: 'USB-C Hub 7-in-1', description: 'Expand your laptop with HDMI, USB-A, SD card, and more.', price: 49.99, stock_quantity: 55, image_url: 'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400&h=400&fit=crop' },
    { title: 'Webcam 4K Pro', description: 'Ultra HD webcam with autofocus and built-in ring light for streaming.', price: 129.99, stock_quantity: 20, image_url: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop' },
    { title: 'Noise-Cancelling Earbuds', description: 'True wireless earbuds with ANC, transparency mode and 24hr case.', price: 179.99, stock_quantity: 40, image_url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop' },
    { title: 'Portable SSD 1TB', description: 'USB 3.2 external SSD with 1050MB/s read speed in a pocket-sized form.', price: 109.99, stock_quantity: 35, image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop' },
  ],
  'home-kitchen': [
    { title: 'Air Fryer 5.8QT', description: 'Large capacity air fryer with 8 presets and digital touchscreen.', price: 89.99, stock_quantity: 50, image_url: 'https://images.unsplash.com/photo-1648854851849-34c3e0cbfde6?w=400&h=400&fit=crop' },
    { title: 'Pour Over Coffee Set', description: 'Handcrafted glass pour-over dripper with gooseneck kettle and filters.', price: 44.99, stock_quantity: 40, image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop' },
    { title: 'Robot Vacuum', description: 'Smart mapping robot vacuum with auto-empty base and app control.', price: 349.99, stock_quantity: 18, image_url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=400&fit=crop' },
    { title: 'Bamboo Cutting Board Set', description: 'Set of 3 organic bamboo cutting boards with juice grooves.', price: 29.99, stock_quantity: 70, image_url: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400&h=400&fit=crop' },
    { title: 'Instant Pot 6QT', description: '9-in-1 multi-use pressure cooker, slow cooker, rice cooker and more.', price: 99.99, stock_quantity: 30, image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop' },
    { title: 'Ceramic Non-Stick Pan Set', description: '3-piece ceramic coated cookware set, PFOA-free and dishwasher safe.', price: 74.99, stock_quantity: 25, image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
    { title: 'Smart LED Bulbs 4-Pack', description: 'WiFi-enabled color changing bulbs, works with Alexa and Google Home.', price: 39.99, stock_quantity: 90, image_url: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop' },
    { title: 'French Press Coffee Maker', description: 'Double-wall stainless steel French press, keeps coffee hot for 1hr.', price: 34.99, stock_quantity: 45, image_url: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop' },
    { title: 'Knife Set 15-Piece', description: 'High-carbon stainless steel knife block set with sharpener.', price: 129.99, stock_quantity: 20, image_url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop' },
    { title: 'Aroma Diffuser & Humidifier', description: 'Ultrasonic diffuser with 7 LED colors and auto shutoff, 500ml tank.', price: 24.99, stock_quantity: 0, image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop' },
  ],
  apparel: [
    { title: 'Classic Slim Fit Chinos', description: 'Stretch cotton chinos in a modern slim fit, available in multiple colors.', price: 59.99, stock_quantity: 100, image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop' },
    { title: 'Merino Wool Crew Sweater', description: 'Lightweight 100% merino wool sweater, perfect for layering.', price: 89.99, stock_quantity: 40, image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop' },
    { title: 'Running Shorts 5"', description: 'Lightweight quick-dry running shorts with liner and zip pocket.', price: 34.99, stock_quantity: 75, image_url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&h=400&fit=crop' },
    { title: 'Puffer Jacket', description: 'Water-resistant puffer jacket with 600-fill down insulation.', price: 149.99, stock_quantity: 30, image_url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop' },
    { title: 'Graphic Tee Pack (3x)', description: 'Pack of 3 premium cotton graphic tees with minimalist designs.', price: 44.99, stock_quantity: 60, image_url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop' },
    { title: 'Denim Jacket', description: 'Classic washed denim jacket with button front and chest pockets.', price: 79.99, stock_quantity: 35, image_url: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&h=400&fit=crop' },
    { title: 'Compression Leggings', description: 'High-waist 4-way stretch leggings with side pocket, squat-proof.', price: 54.99, stock_quantity: 80, image_url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
    { title: 'Oxford Button-Down Shirt', description: 'Classic fit Oxford shirt in wrinkle-resistant cotton blend.', price: 49.99, stock_quantity: 55, image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
    { title: 'Wool Beanie', description: 'Soft ribbed knit beanie in recycled wool blend, one size fits all.', price: 19.99, stock_quantity: 0, image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' },
    { title: 'Leather Belt', description: 'Genuine full-grain leather belt with brushed silver buckle.', price: 39.99, stock_quantity: 45, image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  ],
  'sports-outdoors': [
    { title: 'Adjustable Dumbbell Set', description: 'Space-saving adjustable dumbbells from 5 to 52.5 lbs per hand.', price: 349.99, stock_quantity: 15, image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop' },
    { title: 'Yoga Mat Pro', description: 'Extra thick 6mm non-slip yoga mat with carrying strap and alignment lines.', price: 49.99, stock_quantity: 60, image_url: 'https://images.unsplash.com/photo-1601925228008-99e838f88729?w=400&h=400&fit=crop' },
    { title: 'Hiking Backpack 40L', description: 'Waterproof hiking pack with hip belt, rain cover and hydration sleeve.', price: 119.99, stock_quantity: 25, image_url: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&h=400&fit=crop' },
    { title: 'Resistance Bands Set', description: 'Set of 5 latex resistance bands from 10 to 50 lbs with door anchor.', price: 29.99, stock_quantity: 90, image_url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop' },
    { title: 'Foam Roller', description: 'High-density EVA foam roller for deep tissue massage and recovery.', price: 24.99, stock_quantity: 70, image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { title: 'Insulated Water Bottle 32oz', description: 'Double-wall vacuum insulated stainless steel bottle, keeps cold 24hr.', price: 34.99, stock_quantity: 100, image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop' },
    { title: 'Jump Rope Speed Cable', description: 'Adjustable speed jump rope with ball bearings and memory foam handles.', price: 19.99, stock_quantity: 85, image_url: 'https://images.unsplash.com/photo-1608538841802-99e8e0a8e81c?w=400&h=400&fit=crop' },
    { title: 'Camping Tent 2-Person', description: 'Lightweight 3-season tent with easy setup, waterproof rainfly.', price: 179.99, stock_quantity: 20, image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop' },
    { title: 'Trekking Poles (Pair)', description: 'Collapsible aluminum trekking poles with cork grips and wrist straps.', price: 59.99, stock_quantity: 30, image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop' },
    { title: 'Pull-Up Bar Doorframe', description: 'No-screw doorframe pull-up bar, fits 24-35 inch frames, 300lb capacity.', price: 44.99, stock_quantity: 0, image_url: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a34?w=400&h=400&fit=crop' },
  ],
  books: [
    { title: 'Atomic Habits', description: 'James Clear\'s #1 NYT bestseller on building good habits and breaking bad ones.', price: 16.99, stock_quantity: 120, image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop' },
    { title: 'The Pragmatic Programmer', description: 'Classic software engineering guide from journeyman to master, 20th anniversary edition.', price: 49.99, stock_quantity: 40, image_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop' },
    { title: 'Sapiens', description: 'Yuval Noah Harari\'s sweeping history of humankind from Stone Age to present.', price: 18.99, stock_quantity: 85, image_url: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop' },
    { title: 'Deep Work', description: 'Cal Newport\'s rules for focused success in a distracted world.', price: 15.99, stock_quantity: 95, image_url: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=400&h=400&fit=crop' },
    { title: 'The Design of Everyday Things', description: 'Don Norman\'s foundational book on user-centered design and usability.', price: 22.99, stock_quantity: 50, image_url: 'https://images.unsplash.com/photo-1559209272-f79f5d4a2b5e?w=400&h=400&fit=crop' },
    { title: 'Clean Code', description: 'Robert C. Martin\'s handbook of agile software craftsmanship.', price: 44.99, stock_quantity: 35, image_url: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=400&h=400&fit=crop' },
    { title: 'Zero to One', description: 'Peter Thiel\'s notes on startups and how to build the future.', price: 14.99, stock_quantity: 75, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { title: 'Thinking, Fast and Slow', description: 'Daniel Kahneman\'s exploration of the two systems that drive the way we think.', price: 17.99, stock_quantity: 60, image_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop' },
    { title: 'The Lean Startup', description: 'Eric Ries on how continuous innovation creates radically successful businesses.', price: 16.99, stock_quantity: 0, image_url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop' },
    { title: 'Designing Data-Intensive Applications', description: 'Martin Kleppmann\'s comprehensive guide to the big ideas behind reliable scalable systems.', price: 59.99, stock_quantity: 28, image_url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop' },
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
