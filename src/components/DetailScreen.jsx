import { useState } from 'react'
import './DetailScreen.css'

const DetailScreen = ({ voucher, onBack }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(voucher.barcode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="detail-screen-container">
            {/* Header with image */}
            <div className="detail-header">
                <button className="detail-back-btn" onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="product-image-container">
                    <img src={voucher.image} alt={voucher.title} className="product-image" />
                </div>
            </div>

            {/* Content */}
            <div className="detail-content">
                <p className="brand-name">{voucher.brand}</p>
                <h1 className="detail-title">{voucher.title}</h1>

                {/* Barcode */}
                <div className="barcode-container">
                    <div className="barcode-image">
                        {/* SVG Barcode representation */}
                        <svg viewBox="0 0 200 80" className="barcode-svg">
                            {[...Array(40)].map((_, i) => (
                                <rect
                                    key={i}
                                    x={i * 5}
                                    y="0"
                                    width={Math.random() > 0.5 ? 3 : 1.5}
                                    height="60"
                                    fill="#000"
                                />
                            ))}
                        </svg>
                    </div>
                    <p className="barcode-number">{voucher.barcode}</p>
                </div>

                {/* Copy button */}
                <button className="copy-btn" onClick={handleCopy}>
                    <span>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                </button>

                {/* Details section */}
                <div className="detail-section">
                    <h3 className="section-title">Chi tiết ưu đãi</h3>
                    <p className="detail-text">
                        Mã giảm giá phát hành lúc {voucher.issuedAt} bởi {voucher.brand}
                    </p>
                    <p className="detail-text expiry">
                        Hết hạn vào {voucher.expiresAt}
                    </p>
                </div>

                {/* Terms button */}
                <button className="terms-btn">
                    Điều khoản & Điều kiện
                </button>
            </div>

            {/* Sticky CTA button */}
            <div className="cta-container">
                <button className="cta-btn">
                    Đặt ngay
                </button>
            </div>
        </div>
    )
}

export default DetailScreen
