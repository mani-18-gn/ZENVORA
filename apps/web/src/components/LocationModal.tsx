import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import './LocationModal.css';

interface LocationModalProps {
  isOpen: boolean;
  currentPincode: string;
  currentCity: string;
  onClose: () => void;
  onSelectLocation: (pincode: string, city: string) => void;
}

const POPULAR_CITIES = [
  { city: 'Bengaluru', pincode: '560034', area: 'Koramangala' },
  { city: 'Mumbai', pincode: '400001', area: 'Fort / South Mumbai' },
  { city: 'New Delhi', pincode: '110001', area: 'Connaught Place' },
  { city: 'Hyderabad', pincode: '500081', area: 'HITEC City' },
  { city: 'Chennai', pincode: '600001', area: 'George Town' },
  { city: 'Pune', pincode: '411001', area: 'Camp / Shivaji Nagar' },
  { city: 'Kolkata', pincode: '700001', area: 'BBD Bagh' }
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  currentPincode,
  currentCity,
  onClose,
  onSelectLocation
}) => {
  if (!isOpen) return null;

  const [inputPincode, setInputPincode] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPincode.length !== 6) {
      setErrorText('Please enter a 6-digit valid pincode');
      return;
    }

    // Lookup city or default
    const matched = POPULAR_CITIES.find(c => c.pincode === inputPincode);
    const resolvedCity = matched ? matched.city : 'Location';
    onSelectLocation(inputPincode, resolvedCity);
    onClose();
  };

  const handleSelectQuick = (pin: string, city: string) => {
    onSelectLocation(pin, city);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="location-modal fade-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="location-header-title">
            <MapPin size={20} className="loc-title-icon" />
            <div>
              <h3 className="modal-title">Choose your location</h3>
              <span className="modal-sub">
                Deliver to {currentCity} {currentPincode} • Select a location to see local availability
              </span>
            </div>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="location-modal-body">
          <form className="pincode-apply-box" onSubmit={handleApplyPincode}>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter an Indian pincode (e.g. 560034)"
              value={inputPincode}
              onChange={(e) => {
                setInputPincode(e.target.value.replace(/\D/g, ''));
                setErrorText('');
              }}
              autoFocus
            />
            <button type="submit" className="btn-primary apply-loc-btn">
              Apply
            </button>
          </form>

          {errorText && <div className="location-error-text">{errorText}</div>}

          <div className="popular-cities-section">
            <span className="section-label">Popular Metro Cities:</span>
            <div className="cities-grid">
              {POPULAR_CITIES.map((c) => {
                const isSelected = currentPincode === c.pincode;
                return (
                  <button
                    key={c.pincode}
                    type="button"
                    className={`city-tile-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectQuick(c.pincode, c.city)}
                  >
                    <div className="city-tile-main">
                      <span className="tile-city">{c.city}</span>
                      <span className="tile-area">{c.area}</span>
                    </div>
                    <span className="tile-pincode">{c.pincode}</span>
                    {isSelected && <Check size={14} className="tile-check" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
