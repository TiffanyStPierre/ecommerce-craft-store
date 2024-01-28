# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Seed Categories
categories = [
  { name: 'Knitting & Crochet' },
  { name: 'Sewing' },
  { name: 'DIY Kits' },
  { name: 'Painting' },
  { name: 'Kids' },
  { name: 'Cross Stitch' },
]
Category.create(categories)

# Seed Customers
customers = [
  { first_name: 'Alice', last_name: 'White', email: 'alice.white@example.com', street_address: '123 Oak St', city: 'Toronto', province: 'ON', postal_code: 'M5V 1J9' },
  { first_name: 'David', last_name: 'Hill', email: 'david.hill@example.com', street_address: '456 Maple St', city: 'Vancouver', province: 'BC', postal_code: 'V6B 2P4' },
  { first_name: 'Sophia', last_name: 'Mitchell', email: 'sophia.mitchell@example.com', street_address: '789 Pine St', city: 'Montreal', province: 'QC', postal_code: 'H2X 1L4' },
  { first_name: 'Liam', last_name: 'Wilson', email: 'liam.wilson@example.com', street_address: '101 Elm St', city: 'Calgary', province: 'AB', postal_code: 'T2P 3Y6' },
  { first_name: 'Ella', last_name: 'Anderson', email: 'ella.anderson@example.com', street_address: '202 Cedar St', city: 'Ottawa', province: 'ON', postal_code: 'K1N 9B4' },
  { first_name: 'Mason', last_name: 'Cooper', email: 'mason.cooper@example.com', street_address: '303 Maple St', city: 'Edmonton', province: 'AB', postal_code: 'T5J 0J8' },
  { first_name: 'Ava', last_name: 'Bailey', email: 'ava.bailey@example.com', street_address: '404 Birch St', city: 'Quebec City', province: 'QC', postal_code: 'G1S 4S3' },
  { first_name: 'Logan', last_name: 'Smith', email: 'logan.smith@example.com', street_address: '505 Pine St', city: 'Winnipeg', province: 'MB', postal_code: 'R3C 0V8' },
]
Customer.create(customers)

# Seed Products
products = [
  { name: 'Acrylic Yarn 3 Pack', image_url: 'https://res.cloudinary.com/ddqsowzpj/image/upload/v1706397543/knitting-starter-pack-product_hpsdzs.webp', thumbnail_url: 'https://res.cloudinary.com/ddqsowzpj/image/upload/v1706397562/knitting-starter-pack-thumbnail_ez1lol.webp', description: 'Craft with sophistication using our 3-pack of acrylic yarn in charcoal, ivory, and dove grey. Ideal for knitting or crocheting, this premium yarn blend ensures your projects are not only visually stunning but also luxuriously soft. Elevate your creations with ease, adding a touch of modern elegance to scarves, blankets, and more. Enjoy the perfect blend of style and comfort with our exquisite acrylic yarn set.', price: 16.99, inventory: 12 },
  { name: 'Retro Styled Sewing Machine', image_url: 'https://res.cloudinary.com/ddqsowzpj/image/upload/v1706397558/sewing-retro-machine-product_qowvw1.webp', thumbnail_url: 'https://res.cloudinary.com/ddqsowzpj/image/upload/v1706397554/sewing-retro-machine-thumbnail_umvdhk.webp', description: 'Introducing our Retro-Inspired Sewing Machine, a perfect blend of vintage charm and modern functionality. Embrace the nostalgia of yesteryear with its retro design, while enjoying the convenience of state-of-the-art sewing technology. This stylish machine effortlessly combines timeless aesthetics with cutting-edge features, making it a must-have for both vintage enthusiasts and contemporary crafters alike. Sew with flair, embracing the best of both worlds with our Retro-Inspired Sewing Machine.', price: 249.99, inventory: 32 },
]
Product.create(products)

# Seed Orders
# Note: It's a good idea to seed orders with existing customers and products
orders = [
  { customer: Customer.first, order_date: Date.today, shipped_date: Date.today + 2.days, subtotal_amount: 39.98, tax_amount: 4.00, total_amount: 43.98 },
]
Order.create(orders)

# Seed Promotions
promotions = [
  { name: '30% Off Knitting', percent_discount: 30.0, start_date: nil, end_date: nil },
  # Add more promotions as needed
]
Promotion.create(promotions)

# Seed Products_Categories
# Note: Ensure you have categories and products before seeding this table

products_categories = [
  { product_id: 1, category_id: 1 },
  { product_id: 2, category_id: 2 },
  
]
ProductCategory.create(products_categories)

# Seed Promotions_Products
# Note: Ensure you have promotions and products before seeding this table
promotions_products = [
  { promotion_id: 1, product_id: 1 },
  # Add more associations as needed
]
PromotionsProduct.create(promotions_products)