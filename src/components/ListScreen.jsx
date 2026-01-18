import { useState } from 'react'
import './ListScreen.css'

const ListScreen = ({ vouchers, onVoucherClick }) => {
    const [activeTab, setActiveTab] = useState('unused')

    const tabs = [
        { id: 'unused', label: 'Chưa dùng' },
        { id: 'used', label: 'Đã dùng' },
        { id: 'expired', label: 'Hết hạn' }
    ]

    return (
        <div className="list-screen-container">
            {/* Header */}
            <div className="list-header">
                <button className="back-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="list-title">Kho quà</h1>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Voucher List */}
            <div className="vouchers-list">
                {vouchers.map(voucher => (
                    <div
                        key={voucher.id}
                        className="voucher-item"
                        onClick={() => onVoucherClick(voucher)}
                    >
                        <div className="voucher-logo">
                            <img src={voucher.logo} alt={voucher.brand} />
                        </div>
                        <div className="voucher-info">
                            <h3 className="voucher-title">{voucher.title}</h3>
                            <p className="voucher-expiry">Hết hạn vào {voucher.expiresAt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListScreen
