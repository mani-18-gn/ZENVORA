import React, { useState } from 'react';
import { X, Building, Home, Check } from 'lucide-react';
import type { Address } from '../types';
import './AddressModal.css';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAddress: (address: Address) => void;
  addressToEdit?: Address | null;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSaveAddress,
  addressToEdit
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(addressToEdit?.name || '');
  const [phone, setPhone] = useState(addressToEdit?.phone || '');
  const [pincode, setPincode] = useState(addressToEdit?.pincode || '560034');
  const [addressLine1, setAddressLine1] = useState(addressToEdit?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(addressToEdit?.addressLine2 || '');
  const [landmark, setLandmark] = useState(addressToEdit?.landmark || '');
  const [city, setCity] = useState(addressToEdit?.city || 'Bengaluru');
  const [state, setState] = useState(addressToEdit?.state || 'Karnataka');
  const [type, setType] = useState<'HOME' | 'WORK' | 'OTHER'>(addressToEdit?.type || 'HOME');
  const [isDefault, setIsDefault] = useState(addressToEdit?.isDefault || false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !pincode.trim() || !addressLine1.trim() || !city.trim()) {
      setErrorMsg('Please fill in all required fields marked with *');
      return;
    }
    if (pincode.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit pincode');
      return;
    }

    const savedAddr: Address = {
      id: addressToEdit?.id || 'addr-' + Date.now(),
      name,
      phone,
      pincode,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      type,
      isDefault
    };

    onSaveAddress(savedAddr);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="address-modal fade-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className="modal-title">{addressToEdit ? 'Edit Address' : 'Add New Delivery Address'}</h3>
            <span className="modal-sub">Ensure accurate contact details for smooth doorstep delivery</span>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="address-form-body">
          {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

          <div className="form-row-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Vikramaditya Rao" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>10-digit Mobile Number *</label>
              <input 
                type="tel" 
                placeholder="e.g. 9876543210" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>6-digit Pincode *</label>
              <input 
                type="text" 
                maxLength={6} 
                placeholder="560034" 
                value={pincode} 
                onChange={e => setPincode(e.target.value.replace(/\D/g, ''))} 
                required 
              />
            </div>
            <div className="form-group">
              <label>City / District *</label>
              <input 
                type="text" 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input 
                type="text" 
                value={state} 
                onChange={e => setState(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Flat, House no., Building, Apartment *</label>
            <input 
              type="text" 
              placeholder="e.g. Flat 402, Zenvora Serene Towers" 
              value={addressLine1} 
              onChange={e => setAddressLine1(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Area, Street, Sector, Village</label>
            <input 
              type="text" 
              placeholder="e.g. 80 Feet Road, 4th Block, Koramangala" 
              value={addressLine2} 
              onChange={e => setAddressLine2(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Landmark</label>
            <input 
              type="text" 
              placeholder="e.g. Near Sony World Signal" 
              value={landmark} 
              onChange={e => setLandmark(e.target.value)} 
            />
          </div>

          {/* Address Type */}
          <div className="form-group">
            <label>Address Type</label>
            <div className="type-radios-row">
              <button 
                type="button" 
                className={`type-radio-btn ${type === 'HOME' ? 'selected' : ''}`}
                onClick={() => setType('HOME')}
              >
                <Home size={15} />
                <span>Home (All Day Delivery)</span>
              </button>
              <button 
                type="button" 
                className={`type-radio-btn ${type === 'WORK' ? 'selected' : ''}`}
                onClick={() => setType('WORK')}
              >
                <Building size={15} />
                <span>Work (10 AM - 6 PM)</span>
              </button>
            </div>
          </div>

          <label className="default-checkbox-label">
            <input 
              type="checkbox" 
              checked={isDefault} 
              onChange={e => setIsDefault(e.target.checked)} 
            />
            <span>Make this my default shipping address</span>
          </label>

          <div className="address-modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} />
              <span>Save & Use Address</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
