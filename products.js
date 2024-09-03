import fs from 'node:fs'

const imagesData = JSON.parse(fs.readFileSync('images.json', 'utf-8'))

// Predefined lists
const titles = [
  "Men's Classic Casual Shirt",
  "Men's Slim Fit T-Shirt Collection",
  "Men's Denim Jeans - Classic",
  "Women's Trendy High-Waist Jeans",
  "Women's Elegant Blouse Top",
  "Women's Relaxed Fit Jeans - Dark Wash",
  "Women's Premium Gym Leggings",
  "Kids' Comfortable Full Dress",
  "Men's Stylish Checked Shirt",
  "Women's Chic Workout Tank Top",
]

const descriptions = [
  'A timeless classic, this casual shirt features a comfortable fit with a button-down collar and durable fabric, perfect for everyday wear.',
  'Our slim fit T-shirt collection offers a sleek, modern look with a range of colors and styles, made from soft, breathable cotton for all-day comfort.',
  'These classic blue denim jeans offer a perfect blend of style and comfort, featuring a durable construction and a versatile fit that works for any occasion.',
  'Upgrade your wardrobe with these trendy high-waist jeans that offer a flattering silhouette and a modern look, crafted from high-quality denim for all-day comfort.',
  'This elegant blouse top combines sophistication and style with its flowy fabric and refined design, making it a perfect choice for both work and social events.',
  'Experience ultimate comfort with these relaxed fit jeans in a rich dark wash. Designed for a laid-back look, they offer a relaxed fit and a stylish finish.',
  'Elevate your workout gear with these premium gym leggings. Designed for flexibility and support, they feature moisture-wicking fabric and a high-rise waistband for a secure fit.',
  "This comfortable full dress for kids features a simple, classic design in black, made from soft, breathable fabric that's perfect for any occasion.",
  "Add a touch of sophistication to your wardrobe with this stylish checked shirt. Featuring a modern check pattern and a tailored fit, it's perfect for both casual and formal settings.",
  'Stay stylish and comfortable during your workouts with this chic tank top. Made from lightweight, breathable fabric, it features a trendy design and a flattering fit.',
]

const productImages = {
  "Men's Denim Jeans - Classic": {
    colors: ['blue', 'black', 'white'],
    images: imagesData['Men Blue Jeans'].concat(
      imagesData['Men Black Jeans'],
      imagesData['Men White Jeans']
    ),
  },
  "Women's Trendy High-Waist Jeans": {
    colors: ['blue', 'black'],
    images: imagesData['Women Jeans Blue'].concat(
      imagesData['Women Jeans Black']
    ),
  },
  "Women's Elegant Blouse Top": {
    colors: ['green', 'red'],
    images: imagesData['Women Top Green'].concat(imagesData['Women Top Red']),
  },
  "Women's Relaxed Fit Jeans - Dark Wash": {
    colors: ['black'],
    images: imagesData['Women Jeans Black'],
  },
  "Women's Premium Gym Leggings": {
    colors: ['green', 'pink'],
    images: imagesData['Women Gym Green'].concat(imagesData['Women Gym Pink']),
  },
  "Kids' Comfortable Full Dress": {
    colors: ['black', 'blue'],
    images: imagesData['Kids Full Dress Black'].concat(
      imagesData['Kids Full Dress Blue']
    ),
  },
  "Men's Slim Fit T-Shirt Collection": {
    colors: ['black', 'blue', 'red'],
    images: imagesData['Men T-shirt Black'].concat(
      imagesData['Men T-shirt Blue'],
      imagesData['Men T-shirt Red']
    ),
  },
  "Men's Classic Casual Shirt": {
    colors: ['black', 'blue'],
    images: imagesData['Men Black Shirt'].concat(imagesData['Men Blue Shirt']),
  },
  "Men's Stylish Checked Shirt": {
    colors: ['black', 'blue'],
    images: imagesData['Men Black Shirt'].concat(imagesData['Men Blue Shirt']),
  },
  "Women's Chic Workout Tank Top": {
    colors: ['green', 'pink'],
    images: imagesData['Women Gym Green'].concat(imagesData['Women Gym Pink']),
  },
}

const sizes = ['small', 'medium', 'large', 'X-Large', 'XX-Large']
const categories = ['Men', 'Women', 'Kids']
const brands = ['Versace', 'Calvin Klein', 'Zara', 'Gucci', 'Prada']
const tags = [
  'New Arrivals',
  'Top Selling',
  'On Sale',
  'Casual',
  'Party',
  'Gym',
  'Formal',
]

// Helper functions
function getImageUrlsForProduct(title) {
  const productInfo = productImages[title]
  return productInfo ? productInfo.images : []
}

function getColorsForProduct(title) {
  const productInfo = productImages[title]
  return productInfo ? productInfo.colors : []
}

function getUniqueRandomElements(arr, count) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateVariants(title, availableColors, imageUrls) {
  const variants = []
  const chosenColors = getUniqueRandomElements(availableColors, 2)

  chosenColors.forEach((color) => {
    const colorImages = imageUrls.filter((img) => img.includes(color))
    variants.push({
      color: color,
      images: getUniqueRandomElements(
        colorImages.length ? colorImages : imageUrls,
        4
      ),
      sizes: sizes.slice(0, 3),
    })
  })

  return variants
}

function generateProduct() {
  const title = getRandomElement(titles)
  const category = categories.find((cat) => title.includes(cat))
  const imageUrls = getImageUrlsForProduct(title)
  const availableColors = getColorsForProduct(title)

  // Generate at least one primary tag and one secondary tag
  const primaryTags = ['New Arrivals', 'Top Selling', 'On Sale']
  const tagsForProduct = [
    getRandomElement(primaryTags),
    getRandomElement(tags.filter((tag) => !primaryTags.includes(tag))),
  ]

  return {
    title: title,
    description: getRandomElement(descriptions),
    variants: generateVariants(title, availableColors, imageUrls),
    category: category,
    brand: getRandomElement(brands),
    tags: tagsForProduct,
  }
}

// Generate 200 products
const products = [...Array(200)].map(generateProduct)

// Save to products.json
fs.writeFileSync('products.json', JSON.stringify(products, null, 2))

console.log('200 products generated and saved to products.json')
