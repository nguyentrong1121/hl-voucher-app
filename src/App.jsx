import { useState } from 'react'
import './App.css'
import ListScreen from './components/ListScreen'
import DetailScreen from './components/DetailScreen'

const vouchers = [
  {
    id: 1,
    brand: 'Highlands',
    title: 'Tặng 01 Trà Sữa Hojicha Cỡ M',
    barcode: '4995288887241',
    issuedAt: '16:54 18/01/2026',
    expiresAt: '16:54 17/02/2026',
    image: '/hojicha-drink.png',
    logo: '/highlands-logo.png'
  }
]

function App() {
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleVoucherClick = (voucher) => {
    setSelectedVoucher(voucher)
    setShowDetail(true)
  }

  const handleBack = () => {
    setShowDetail(false)
    setTimeout(() => setSelectedVoucher(null), 300)
  }

  return (
    <div className="app-container">
      <div className="screens-wrapper">
        <div className={`screen list-screen ${showDetail ? 'hidden' : ''}`}>
          <ListScreen 
            vouchers={vouchers} 
            onVoucherClick={handleVoucherClick} 
          />
        </div>
        <div className={`screen detail-screen ${showDetail ? 'active' : ''}`}>
          {selectedVoucher && (
            <DetailScreen 
              voucher={selectedVoucher} 
              onBack={handleBack} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
