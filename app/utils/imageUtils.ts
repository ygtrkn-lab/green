export const generateProductImages = (productId: string, category: string, count: number = 1) => {
  const images = []
  for (let i = 1; i <= count; i++) {
    images.push({
      id: i,
      url: `/images/products/${category}/${productId}-${i}.jpg`,
      alt: `Product Image ${i}`
    })
  }
  return images
}
