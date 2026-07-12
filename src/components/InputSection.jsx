import { useState } from 'react'
import styles from './InputSection.module.css'

const QR_TYPES = [
  { id: 'url', label: 'URL', icon: '🔗' },
  { id: 'text', label: 'Text', icon: '📝' },
  { id: 'email', label: 'Email', icon: '✉️' },
  { id: 'phone', label: 'Phone', icon: '📞' },
  { id: 'sms', label: 'SMS', icon: '💬' },
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'contact', label: 'Contact', icon: '👤' },
]

const WIFI_SECURITY = ['WPA', 'WEP', 'None']

const defaultFields = {
  url: { url: '' },
  text: { text: '' },
  email: { email: '' },
  phone: { phone: '' },
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
  contact: { firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '' },
}

const InputSection = ({ onChange, onGenerate }) => {
  const [type, setType] = useState('url')
  const [fields, setFields] = useState(defaultFields)

  const updateField = (field, value) => {
    const updated = { ...fields, [type]: { ...fields[type], [field]: value } }
    setFields(updated)
    if (onChange) onChange(buildQRValue(type, updated[type]))
  }

  const buildQRValue = (t, f) => {
    switch (t) {
      case 'url': return f.url || ''
      case 'text': return f.text || ''
      case 'email': return f.email ? `mailto:${f.email}` : ''
      case 'phone': return f.phone ? `tel:${f.phone}` : ''
      case 'sms': return f.phone ? `sms:${f.phone}${f.message ? `?body=${encodeURIComponent(f.message)}` : ''}` : ''
      case 'wifi': {
        const sec = f.security === 'None' ? 'nopass' : f.security
        return `WIFI:T:${sec};S:${f.ssid};P:${f.password};${f.hidden ? 'H:true;' : ''}`;
      }
      case 'contact': {
        const lines = [
          'BEGIN:VCARD', 'VERSION:3.0',
          `FN:${f.firstName} ${f.lastName}`.trim(),
          f.lastName ? `N:${f.lastName};${f.firstName};;;` : '',
          f.phone ? `TEL:${f.phone}` : '',
          f.email ? `EMAIL:${f.email}` : '',
          f.company ? `ORG:${f.company}` : '',
          f.title ? `TITLE:${f.title}` : '',
          f.website ? `URL:${f.website}` : '',
          'END:VCARD',
        ].filter(Boolean)
        return lines.join('\n')
      }
      default: return ''
    }
  }

  const handleGenerate = () => {
    const val = buildQRValue(type, fields[type])
    onGenerate(val)
  }

  const handleTypeChange = (t) => {
    setType(t)
    if (onChange) onChange(buildQRValue(t, fields[t]))
  }

  const f = fields[type]

  return (
    <div className={styles.container}>
      {/* Type Tabs */}
      <div className={styles.tabsWrapper}>
        <div className={styles.typeTabs}>
          {QR_TYPES.map(qt => (
            <button
              key={qt.id}
              className={`${styles.typeTab} ${type === qt.id ? styles.activeTab : ''}`}
              onClick={() => handleTypeChange(qt.id)}
            >
              <span className={styles.tabIcon}>{qt.icon}</span>
              <span>{qt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className={styles.fields}>

        {type === 'url' && (
          <Field label="URL" hint="e.g. https://google.com">
            <input
              type="url"
              className={styles.input}
              placeholder="https://example.com"
              value={f.url}
              onChange={e => updateField('url', e.target.value)}
            />
          </Field>
        )}

        {type === 'text' && (
          <Field label="Text">
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Type anything…"
              value={f.text}
              onChange={e => updateField('text', e.target.value)}
              rows={4}
            />
          </Field>
        )}

        {type === 'email' && (
          <Field label="Email Address">
            <input
              type="email"
              className={styles.input}
              placeholder="name@example.com"
              value={f.email}
              onChange={e => updateField('email', e.target.value)}
            />
          </Field>
        )}

        {type === 'phone' && (
          <Field label="Phone Number" hint="Generates tel: link">
            <input
              type="tel"
              className={styles.input}
              placeholder="+63 912 345 6789"
              value={f.phone}
              onChange={e => updateField('phone', e.target.value)}
            />
          </Field>
        )}

        {type === 'sms' && (
          <>
            <Field label="Phone Number" hint="Generates sms: link">
              <input
                type="tel"
                className={styles.input}
                placeholder="+63 912 345 6789"
                value={f.phone}
                onChange={e => updateField('phone', e.target.value)}
              />
            </Field>
            <Field label="Message (optional)">
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Pre-filled message…"
                value={f.message}
                onChange={e => updateField('message', e.target.value)}
                rows={3}
              />
            </Field>
          </>
        )}

        {type === 'wifi' && (
          <>
            <Field label="Network Name (SSID)">
              <input
                className={styles.input}
                placeholder="MyHomeWiFi"
                value={f.ssid}
                onChange={e => updateField('ssid', e.target.value)}
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={f.password}
                onChange={e => updateField('password', e.target.value)}
              />
            </Field>
            <Field label="Security">
              <div className={styles.segmented}>
                {WIFI_SECURITY.map(s => (
                  <button
                    key={s}
                    className={`${styles.segment} ${f.security === s ? styles.segmentActive : ''}`}
                    onClick={() => updateField('security', s)}
                  >{s}</button>
                ))}
              </div>
            </Field>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={f.hidden}
                onChange={e => updateField('hidden', e.target.checked)}
              />
              <span>Hidden network</span>
            </label>
          </>
        )}

        {type === 'contact' && (
          <div className={styles.grid2}>
            <Field label="First Name">
              <input className={styles.input} placeholder="John" value={f.firstName} onChange={e => updateField('firstName', e.target.value)} />
            </Field>
            <Field label="Last Name">
              <input className={styles.input} placeholder="Doe" value={f.lastName} onChange={e => updateField('lastName', e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={styles.input} type="tel" placeholder="+63 912 345 6789" value={f.phone} onChange={e => updateField('phone', e.target.value)} />
            </Field>
            <Field label="Email">
              <input className={styles.input} type="email" placeholder="john@example.com" value={f.email} onChange={e => updateField('email', e.target.value)} />
            </Field>
            <Field label="Company">
              <input className={styles.input} placeholder="Acme Corp" value={f.company} onChange={e => updateField('company', e.target.value)} />
            </Field>
            <Field label="Job Title">
              <input className={styles.input} placeholder="Developer" value={f.title} onChange={e => updateField('title', e.target.value)} />
            </Field>
            <Field label="Website" className={styles.fullWidth}>
              <input className={styles.input} type="url" placeholder="https://portfolio.com" value={f.website} onChange={e => updateField('website', e.target.value)} />
            </Field>
          </div>
        )}
      </div>



      <button className={styles.generateBtn} onClick={handleGenerate}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 13 9 20 9" /><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        </svg>
        Generate QR Code
      </button>
    </div>
  )
}

const Field = ({ label, hint, children, className }) => (
  <div className={`${styles.field} ${className || ''}`}>
    <label className={styles.label}>
      {label}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
    {children}
  </div>
)

export default InputSection
