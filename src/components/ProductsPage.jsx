// components/ProductsPage.jsx
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
import styles from './ProductsPage.module.css'

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  
  // Sample product data based on the images
  const products = [
    {
      id: 1,
      name: "Amistar Top",
      category: "Fungicide",
      brand: "Amistar Top",
      price: "7,800 PKR",
      stock: 500,
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 2,
      name: "Amistar Top",
      category: "Fungicide", 
      brand: "Ally Max",
      price: "7,800 PKR",
      stock: 500,
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 3,
      name: "Amistar Top",
      category: "Fungicide",
      brand: "Actara",
      price: "7,800 PKR", 
      stock: 500,
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 4,
      name: "Amistar Top",
      category: "Fungicide",
      brand: "Acephate",
      price: "7,800 PKR",
      stock: 500,
      image: "/medicine.png", 
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 5,
      name: "Amistar Top",
      category: "Fungicide",
      brand: "Chlorpurifos",
      price: "7,800 PKR",
      stock: 500,
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 6,
      name: "Amistar Top", 
      category: "Fungicide",
      brand: "Buprofezin",
      price: "7,800 PKR",
      stock: 500,
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 7,
      name: "Amistar Top",
      category: "Fungicide", 
      brand: "Ampligo",
      price: "7,800 PKR",
      stock: 500,
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    },
    {
      id: 8,
      name: "Amistar Top",
      category: "Fungicide",
      brand: "Dual Gold",
      price: "7,800 PKR",
      stock: 500, 
      image: "/medicine.png",
      isActive: true,
      description: "Amistar Top protects against major fungal diseases in rice, potatoes and mango crops. It helps the crop in..."
    }
  ]

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
              className={styles.productSwitch}
            />
          </div>
          
          <p className={styles.productDescription}>
            {product.description}
            <button className={styles.viewMoreBtn}>View More</button>
          </p>
          
          <div className={styles.productMeta}>
            <div className={styles.priceInfo}>
              <span className={styles.price}>{product.price}</span>
              <div className={styles.stockInfo}>
                <span>Available stock:</span>
                <span className={styles.stockValue}>{product.stock}</span>
              </div>
            </div>
            
            <div className={styles.productActions}>
              <Button variant="outline" size="sm" className={styles.editBtn}>
                <Edit3 size={16} />
                Edit
              </Button>
              <Button variant="outline" size="sm" className={styles.viewBtn}>
                <Eye size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.deleteBtn}
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className={styles.productsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your products</h1>
        
        <div className={styles.headerControls}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <Input 
              placeholder="Search" 
              className={styles.searchInput}
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className={styles.filterSelect}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className={styles.filterSelect}>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Type</SelectItem>
              <SelectItem value="fungicide">Fungicide</SelectItem>
              <SelectItem value="insecticide">Insecticide</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className={styles.importBtn}>
            <Download size={16} />
            Import products
          </Button>
          
          <Button className={styles.addBtn}>
            Bulk add products
          </Button>
          
          <Button className={styles.addIconBtn}>
            <Plus size={16} />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Button 
          variant="outline" 
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </Button>
        
        <Button 
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
        
        <Button 
          variant={currentPage === 2 ? "default" : "outline"}
          size="sm" 
          onClick={() => setCurrentPage(2)}
        >
          2
        </Button>
        
        <span className={styles.paginationDots}>...</span>
        
        <Button variant="outline" size="sm">9</Button>
        <Button variant="outline" size="sm">10</Button>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  )
}

export default ProductsPage