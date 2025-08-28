'use client';

import React, { useRef, useState } from 'react';
import styles from './settings.module.css';

function RichTextEditor({ value, onChange }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write a short summary about your store…"
      rows={8}
    />
  );
}

export default function StoreSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  const certInputRef = useRef(null);

  const [form, setForm] = useState({
    storeName: '',
    logoPreview: '',
    description: '',
    contactName: '',
    phone: '',
    email: '',
    regNumber: '',
    gstNumber: '',
    certFile: null,
    addr1: '',
    addr2: '',
  });

  const update = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onPickLogo = (file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, logoPreview: preview }));
  };

  const onPickCert = (file) => {
    if (!file) return;
    setForm((f) => ({ ...f, certFile: file }));
  };

  const LogoBox = (
    <div className={styles.dropzone}>
      {form.logoPreview ? (
        <div className={styles.logoPreviewWrap}>
          <img src={form.logoPreview} alt="Logo preview" className={styles.logoPreview} />
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setForm((f) => ({ ...f, logoPreview: '' }))}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className={styles.dropHint}>
          <div className={styles.uploadRow}>
            <button
              type="button"
              className={styles.primaryGhostBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload new
            </button>
            <span className={styles.selectExisting} onClick={() => fileInputRef.current?.click()}>
              Select existing
            </span>
          </div>
          <p className={styles.muted}>PNG, JPG, SVG or WebP. Max 5MB.</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenFile}
        onChange={(e) => onPickLogo(e.target.files?.[0])}
      />
    </div>
  );

  const CertBox = (
    <div className={styles.dropzoneSmall}>
      <button
        type="button"
        className={styles.primaryGhostBtn}
        onClick={() => certInputRef.current?.click()}
      >
        Upload Document
      </button>
      <input
        ref={certInputRef}
        type="file"
        className={styles.hiddenFile}
        onChange={(e) => onPickCert(e.target.files?.[0])}
      />
      {form.certFile ? (
        <span className={styles.fileName} title={form.certFile.name}>
          {form.certFile.name}
        </span>
      ) : (
        <span className={styles.muted}>PDF, Image, DOC. Max 10MB.</span>
      )}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Store Settings</h2>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Store Profile Settings
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'payments' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          Payment &amp; Bank Settings
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'prefs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('prefs')}
        >
          Preferences &amp; Settings
        </button>
      </div>

      {/* Tab content */}
      {activeTab !== 'profile' ? (
        <div className={styles.placeholderCard}>
          <p className={styles.muted}>
            This section is coming soon. Switch back to <strong>Store Profile Settings</strong> to
            edit your store details.
          </p>
        </div>
      ) : (
        <form className={styles.form}>
          {/* Store Info */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Store Info</div>

            <label className={styles.inputLabel}>Store Name</label>
            <input
              className={styles.input}
              value={form.storeName}
              onChange={update('storeName')}
              placeholder="Title goes here"
            />

            <div className={styles.inputLabel}>Logo upload</div>
            {LogoBox}

            <div className={styles.inputLabel}>Store Description</div>
            <RichTextEditor value={form.description} onChange={update('description')} />

            <div className={styles.tripleRow}>
              <div>
                <label className={styles.inputLabel}>Contact Person Name</label>
                <input
                  className={styles.input}
                  value={form.contactName}
                  onChange={update('contactName')}
                  placeholder="Title goes here"
                />
              </div>
              <div>
                <label className={styles.inputLabel}>Phone number</label>
                <input
                  className={styles.input}
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="Title goes here"
                />
              </div>
              <div>
                <label className={styles.inputLabel}>Email</label>
                <input
                  className={styles.input}
                  value={form.email}
                  onChange={update('email')}
                  placeholder="Title goes here"
                />
              </div>
            </div>
          </section>

          {/* Business Details */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Business Details</div>
            <div className={styles.tripleRow}>
              <div>
                <label className={styles.inputLabel}>Business Registration Number</label>
                <input
                  className={styles.input}
                  value={form.regNumber}
                  onChange={update('regNumber')}
                  placeholder="Title goes here"
                />
              </div>
              <div>
                <label className={styles.inputLabel}>NTN / GST number</label>
                <input
                  className={styles.input}
                  value={form.gstNumber}
                  onChange={update('gstNumber')}
                  placeholder="Title goes here"
                />
              </div>
            </div>

            <div className={styles.inputLabel}>Business certificate</div>
            {CertBox}

            <div className={styles.inputLabel}>Address</div>
            <div className={styles.doubleRow}>
              <input
                className={styles.input}
                value={form.addr1}
                onChange={update('addr1')}
                placeholder="Line #01"
              />
              <input
                className={styles.input}
                value={form.addr2}
                onChange={update('addr2')}
                placeholder="Line #02"
              />
            </div>
          </section>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="button" className={styles.saveBtn}>
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
