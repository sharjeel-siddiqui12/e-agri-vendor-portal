'use client'

import { useState } from 'react'
import { Search, Download, Plus, Edit3, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import styles from './products.module.css'
import { products as sampleProducts } from '@/lib/productsSampleData'

export default function Products() {
  const [products, setProducts] = useState(sampleProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Toggle Active/Inactive
  const toggleActive = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      )
    )
  }

  const ProductCard = ({ product }) => (
    <Card className={styles.productCard}>
      <div className={styles.productContent}>
        <div className={styles.productImage}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <div className={styles.productTitle}>
              <h3>{product.name}</h3>
              <Badge variant="secondary" className={styles.categoryBadge}>
                {product.category}
              </Badge>
            </div>

            <Switch
              checked={product.isActive}
              onCheckedChange={() => toggleActive(product.id)}
              className={styles.productSwitch}
            />
          </div>

          <p className={styles.productDescription}>
            {product.description}
            <button className={styles.viewMoreBtn}>View</button>
          </p>

          <div className={styles.productMeta}>
            <div className={styles.priceInfo}>
              <span className={styles.price}>{product.price}</span>
              <div className={styles.stockInfo}>
                <span>Available stock:</span>
                <span className={styles.stockPill}>{product.stock}</span>
              </div>
            </div>

            <div className={styles.productActions}>
              <Button variant="outline" size="sm" className={styles.iconBtn}>
                <Edit3 size={16} />
                Edit
              </Button>
              <Button variant="outline" size="sm" className={styles.iconBtnGhost}>
                <Eye size={16} />
              </Button>
              <Button variant="outline" size="sm" className={styles.deleteBtn}>
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  const PageBtn = ({ page }) => (
    <Button
      variant="outline"
      size="sm"
      className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </Button>
  )

  return (
    <div className={styles.productsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your products</h1>

        <div className={styles.headerControls}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <Input placeholder="Search" className={styles.searchInput} />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className={styles.filterSelect}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className={styles.filterSelect}>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">Type</SelectItem>
              <SelectItem value="fungicide">Fungicide</SelectItem>
              <SelectItem value="insecticide">Insecticide</SelectItem>
            </SelectContent>
          </Select>

          <div className={styles.headerBtns}>
            <Button variant="outline" className={styles.importBtn}>
              <Download size={16} />
              Import products
            </Button>

            <Button className={styles.addBtn}>Bulk add products</Button>

            <Button className={styles.addIconBtn} aria-label="Add product">
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {currentProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Button
          variant="outline"
          size="sm"
          className={styles.navBtn}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          &lt;
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <PageBtn key={i + 1} page={i + 1} />
        ))}

        <Button
          variant="outline"
          size="sm"
          className={styles.navBtn}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          &gt;
        </Button>
      </div>
    </div>
  )
}
