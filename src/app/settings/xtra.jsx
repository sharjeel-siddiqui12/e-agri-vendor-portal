'use client';

import React from 'react';
import { useRef, useState, useEffect } from 'react';
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

  const [dragOverLogo, setDragOverLogo] = useState(false);
  const [dragOverCert, setDragOverCert] = useState(false);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    storeName: '',
    logoFile: null,
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

  // Load any locally saved draft
  useEffect(() => {
    const saved = localStorage.getItem('storeSettingsDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((f) => ({ ...f, ...parsed, logoFile: null, certFile: null })); // files cannot be restored
      } catch {}
    }
  }, []);

  // Utility
  const update = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onPickLogo = (file) => {
    if (!file) return;
    const valid = /^image\//.test(file.type);
    if (!valid) {
      setToast('Logo must be an image (PNG/JPG/SVG/WebP).');
      return;
    }
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, logoFile: file, logoPreview: preview }));
  };

  const onPickCert = (file) => {
    if (!file) return;
    setForm((f) => ({ ...f, certFile: file }));
  };

  const validate = () => {
    const next = {};
    if (!form.storeName.trim()) next.storeName = 'Store name is required.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.';
    if (form.phone && !/^[0-9+\-\s()]{6,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onCancel = () => {
    setForm({
      storeName: '',
      logoFile: null,
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
    setErrors({});
    setToast('Changes discarded.');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setToast('Please fix the highlighted fields.');
      return;
    }
    setSaving(true);
    setToast(null);

    try {
      // Build multipart payload (works with the included API route)
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'logoFile' || k === 'certFile') return;
        fd.append(k, v ?? '');
      });
      if (form.logoFile) fd.append('logo', form.logoFile);
      if (form.certFile) fd.append('certificate', form.certFile);

      const res = await fetch('/api/store-settings', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Save failed');

      // Persist a lightweight draft (without files) so the page restores nicely
      const { logoFile, certFile, ...persistable } = form;
      localStorage.setItem('storeSettingsDraft', JSON.stringify(persistable));

      setToast('Saved! Your settings have been updated.');
    } catch (err) {
      setToast('Something went wrong while saving. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const LogoBox = (
    <div
      className={`${styles.dropzone} ${dragOverLogo ? styles.dropzoneActive : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOverLogo(true);
      }}
      onDragLeave={() => setDragOverLogo(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOverLogo(false);
        const file = e.dataTransfer.files?.[0];
        onPickLogo(file);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' ? fileInputRef.current?.click() : null)}
      aria-label="Upload store logo"
    >
      {form.logoPreview ? (
        <div className={styles.logoPreviewWrap}>
          <img src={form.logoPreview} alt="Logo preview" className={styles.logoPreview} />
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => {
              setForm((f) => ({ ...f, logoFile: null, logoPreview: '' }));
              fileInputRef.current.value = '';
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className={styles.dropHint}>
           
            <div>
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
        </>
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
    <div
      className={`${styles.dropzoneSmall} ${dragOverCert ? styles.dropzoneActive : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOverCert(true);
      }}
      onDragLeave={() => setDragOverCert(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOverCert(false);
        const file = e.dataTransfer.files?.[0];
        onPickCert(file);
      }}
    >
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
      <div className={styles.tabs} role="tablist" aria-label="Settings sections">
        <button
          role="tab"
          aria-selected={activeTab === 'profile'}
          className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Store Profile Settings
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'payments'}
          className={`${styles.tab} ${activeTab === 'payments' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          Payment &amp; Bank Settings
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'prefs'}
          className={`${styles.tab} ${activeTab === 'prefs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('prefs')}
        >
          Preferences &amp; Settings
        </button>
      </div>

      {/* Only the first tab has a full form per the screenshots */}
      {activeTab !== 'profile' ? (
        <div className={styles.placeholderCard}>
          <p className={styles.muted}>
            This section is coming soon. Switch back to <strong>Store Profile Settings</strong> to
            edit your store details.
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {/* Store Info */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Store Info</div>

            <label className={styles.inputLabel} htmlFor="storeName">Store Name</label>
            <input
              id="storeName"
              className={`${styles.input} ${errors.storeName ? styles.inputError : ''}`}
              value={form.storeName}
              onChange={update('storeName')}
              placeholder="Title goes here"
              aria-invalid={!!errors.storeName}
            />
            {errors.storeName && <div className={styles.errorText}>{errors.storeName}</div>}

            <div className={styles.inputLabel}>Logo upload</div>
            {LogoBox}

            <div className={styles.inputLabel}>Store Description</div>
            <RichTextEditor value={form.description} onChange={update('description')} />

            <div className={styles.tripleRow}>
              <div>
                <label className={styles.inputLabel} htmlFor="contactName">Contact Person Name</label>
                <input
                  id="contactName"
                  className={styles.input}
                  value={form.contactName}
                  onChange={update('contactName')}
                  placeholder="Title goes here"
                />
              </div>
              <div>
                <label className={styles.inputLabel} htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="Title goes here"
                  inputMode="tel"
                />
                {errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
              </div>
              <div>
                <label className={styles.inputLabel} htmlFor="email">Email</label>
                <input
                  id="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  value={form.email}
                  onChange={update('email')}
                  placeholder="Title goes here"
                  inputMode="email"
                />
                {errors.email && <div className={styles.errorText}>{errors.email}</div>}
              </div>
            </div>
          </section>

          {/* Business Details */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Business Details</div>
            <div className={styles.tripleRow}>
              <div>
                <label className={styles.inputLabel} htmlFor="reg">Business Registration Number</label>
                <input
                  id="reg"
                  className={styles.input}
                  value={form.regNumber}
                  onChange={update('regNumber')}
                  placeholder="Title goes here"
                />
              </div>
              <div>
                <label className={styles.inputLabel} htmlFor="gst">NTN / GST number</label>
                <input
                  id="gst"
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
                placeholder="Line #01"
              />
            </div>
          </section>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={saving}>
              Cancel
            </button>
            <div className={styles.footerRight}>
              {toast && (
                <span className={styles.toast} role="status" aria-live="polite">
                  {toast}
                </span>
              )}
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
