import React from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, Home, Building } from 'lucide-react';
import type { Address } from '../types';
import './AddressManagementView.css';

interface AddressManagementViewProps {
  addresses: Address[];
  onAddNewAddress: () => void;
  onEditAddress: (addr: Address) => void;
  onDeleteAddress: (addrId: string) => void;
  onSetDefaultAddress: (addrId: string) => void;
  onContinueShopping: () => void;
}

export const AddressManagementView: React.FC<AddressManagementViewProps> = ({
  addresses,
  onAddNewAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  onContinueShopping
}) => {
  return (
    <div className="addresses-page fade-in">
      <div className="container">
        
        <div className="addresses-header-row">
          <div>
            <h1 className="addresses-title">Manage Delivery Addresses</h1>
            <p className="addresses-subtitle">Save multiple delivery locations for quick 1-click checkout</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-outline" onClick={onContinueShopping}>
              Continue Shopping
            </button>
            <button className="btn-primary" onClick={onAddNewAddress}>
              <Plus size={16} />
              <span>Add New Address</span>
            </button>
          </div>
        </div>

        {addresses.length === 0 ? (
          <div className="empty-addresses-card">
            <MapPin size={48} className="empty-pin-icon" />
            <h2 className="empty-title">No Saved Addresses</h2>
            <p className="empty-desc">Add a delivery address to enable express checkout on all your orders.</p>
            <button className="btn-primary" onClick={onAddNewAddress}>
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="addresses-grid">
            {addresses.map(addr => (
              <div key={addr.id} className={`address-card ${addr.isDefault ? 'is-default' : ''}`}>
                <div className="addr-card-top">
                  <div className="addr-type-tag">
                    {addr.type === 'HOME' ? <Home size={13} /> : <Building size={13} />}
                    <span>{addr.type}</span>
                  </div>
                  {addr.isDefault && (
                    <span className="default-pill">
                      <CheckCircle2 size={12} />
                      <span>Default Delivery Address</span>
                    </span>
                  )}
                </div>

                <div className="addr-card-body">
                  <h3 className="addr-name">{addr.name}</h3>
                  <p className="addr-line">{addr.addressLine1}</p>
                  {addr.addressLine2 && <p className="addr-line">{addr.addressLine2}</p>}
                  {addr.landmark && <p className="addr-landmark">Landmark: {addr.landmark}</p>}
                  <p className="addr-location">
                    {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                  </p>
                  <p className="addr-phone">Phone: <strong>{addr.phone}</strong></p>
                </div>

                <div className="addr-card-footer">
                  {!addr.isDefault && (
                    <button 
                      className="make-default-btn"
                      onClick={() => onSetDefaultAddress(addr.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button 
                    className="edit-addr-btn"
                    onClick={() => onEditAddress(addr)}
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button 
                    className="delete-addr-btn"
                    onClick={() => onDeleteAddress(addr.id)}
                    title="Delete Address"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
