import { useMemo, useState } from 'react'
import type { CartItem, CartLine, Product } from '../types'

type UseCartResult = {
  cartLines: CartLine[]
  cartCount: number
  cartSubtotal: number
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  changeCartQuantity: (productId: string, quantity: number) => void
}

export function useCart(products: Product[]): UseCartResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const productMap = useMemo(() => {
    const map = new Map<string, Product>()
    products.forEach((product) => {
      map.set(product.id, product)
    })
    return map
  }, [products])

  const cartLines = useMemo<CartLine[]>(() => {
    return cartItems
      .map((item) => {
        const product = productMap.get(item.productId)
        if (!product) return null
        return {
          ...product,
          quantity: item.quantity,
          lineTotal: item.quantity * product.price,
        }
      })
      .filter((line): line is CartLine => line !== null)
  }, [cartItems, productMap])

  const cartCount = useMemo(() => cartLines.reduce((acc, line) => acc + line.quantity, 0), [cartLines])
  const cartSubtotal = useMemo(() => cartLines.reduce((acc, line) => acc + line.lineTotal, 0), [cartLines])

  const addToCart = (productId: string) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId)
      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { productId, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((current) => current.filter((item) => item.productId !== productId))
  }

  const changeCartQuantity = (productId: string, quantity: number) => {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const safeQuantity = Math.min(Math.max(Math.floor(quantity), 1), 99)
    setCartItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity: safeQuantity } : item)),
    )
  }

  return {
    cartLines,
    cartCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    changeCartQuantity,
  }
}
