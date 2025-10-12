# Civora Ops: DNS, TLS, Email Authentication, and Monitoring

This document outlines the external operations and infrastructure configuration required for production deployment of civora.me. These configurations must be completed at your DNS provider, hosting provider, and monitoring services.

## Table of Contents

- [TLS/SSL Configuration](#tlsssl-configuration)
- [DNS Configuration](#dns-configuration)
- [Email Authentication](#email-authentication)
- [Security Headers Implementation](#security-headers-implementation)
- [Monitoring & Alerting](#monitoring--alerting)
- [Performance Monitoring](#performance-monitoring)

---

## TLS/SSL Configuration

### Target: SSL Labs A+ Rating

#### Certificate Requirements

- **Provider**: Use Let's Encrypt (free) or a commercial CA
- **Type**: RSA 2048-bit or ECDSA P-256
- **Validity**: Maximum 90 days (automated renewal recommended)
- **Chain**: Ensure complete certificate chain is served

#### TLS Configuration

**Minimum TLS Version**: TLS 1.2 (disable TLS 1.0 and 1.1)
**Preferred**: TLS 1.3

**Recommended Cipher Suites** (in order of preference):

```
TLS_AES_128_GCM_SHA256 (TLS 1.3)
TLS_AES_256_GCM_SHA384 (TLS 1.3)
TLS_CHACHA20_POLY1305_SHA256 (TLS 1.3)
ECDHE-RSA-AES128-GCM-SHA256 (TLS 1.2)
ECDHE-RSA-AES256-GCM-SHA384 (TLS 1.2)
```

**Disable weak ciphers**:
- All RC4 ciphers
- All DES/3DES ciphers
- All CBC mode ciphers (if possible)
- All MD5-based ciphers

#### Additional TLS Features

- **OCSP Stapling**: Enabled (improves performance and privacy)
- **Session Resumption**: Enabled via session tickets
- **Perfect Forward Secrecy (PFS)**: Required

#### HSTS (HTTP Strict Transport Security)

**Before Preloading**: Start with this header and monitor for 2-4 weeks:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

**Checklist before enabling HSTS preload**:
- [ ] All subdomains support HTTPS
- [ ] No mixed content warnings on any page
- [ ] Certificate auto-renewal is working reliably
- [ ] HTTPS works on all paths and redirects
- [ ] CDN/proxy supports HTTPS properly

**After verification**: Update to include preload directive:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Submit to HSTS Preload List**: https://hstspreload.org/

⚠️ **Warning**: HSTS preload is difficult to undo. Test thoroughly before submitting!

#### Testing TLS Configuration

```bash
# Test SSL/TLS configuration
curl -I https://civora.me

# SSL Labs comprehensive test
https://www.ssllabs.com/ssltest/analyze.html?d=civora.me

# Check certificate
openssl s_client -connect civora.me:443 -servername civora.me < /dev/null

# Verify OCSP stapling
openssl s_client -connect civora.me:443 -status -servername civora.me < /dev/null
```

---

## DNS Configuration

### Required DNS Records

#### A/AAAA Records (Apex Domain)

```
@ (civora.me)          A      [Your-IPv4-Address]
@ (civora.me)          AAAA   [Your-IPv6-Address]  (recommended)
www                    CNAME  civora.me.
```

**Note**: If using Cloudflare or similar CDN, use their provided IPs or enable proxy.

#### CAA Records (Certificate Authority Authorization)

Restrict which CAs can issue certificates for your domain:

```
@ (civora.me)  CAA  0 issue "letsencrypt.org"
@ (civora.me)  CAA  0 issuewild "letsencrypt.org"
@ (civora.me)  CAA  0 iodef "mailto:security@civora.me"
```

Adjust the CA based on your provider (e.g., "digicert.com", "amazon.com" for AWS).

#### DNSSEC (DNS Security Extensions)

**Strongly Recommended** for protection against DNS spoofing:

1. Enable DNSSEC at your DNS provider
2. Add DS records to parent zone (.me registry)
3. Verify DNSSEC is working:

```bash
dig civora.me +dnssec
delv civora.me
```

Test DNSSEC: https://dnssec-debugger.verisignlabs.com/

---

## Email Authentication

Protect your domain from email spoofing with these DNS records:

### SPF (Sender Policy Framework)

Define which mail servers can send email on behalf of your domain:

```
@ (civora.me)  TXT  "v=spf1 -all"
```

**Note**: `-all` indicates no mail servers are authorized (if not sending email from domain).

If using email providers:
```
# For Google Workspace
@ (civora.me)  TXT  "v=spf1 include:_spf.google.com ~all"

# For Microsoft 365
@ (civora.me)  TXT  "v=spf1 include:spf.protection.outlook.com ~all"

# For SendGrid
@ (civora.me)  TXT  "v=spf1 include:sendgrid.net ~all"
```

### DKIM (DomainKeys Identified Mail)

Add DKIM keys provided by your email service provider:

```
# Example structure (actual keys provided by email provider)
[selector]._domainkey.civora.me  TXT  "v=DKIM1; k=rsa; p=[public-key]"
```

### DMARC (Domain-based Message Authentication)

Define policy for handling unauthenticated emails:

```
_dmarc.civora.me  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc-reports@civora.me; ruf=mailto:dmarc-forensics@civora.me; fo=1; adkim=s; aspf=s; pct=100"
```

**Policy Options**:
- `p=none`: Monitor only (start here)
- `p=quarantine`: Send suspicious emails to spam
- `p=reject`: Reject all unauthenticated emails (most secure)

**Recommended Implementation Path**:
1. Start with `p=none` and collect reports for 2-4 weeks
2. Analyze reports and fix any legitimate email issues
3. Progress to `p=quarantine` for 2-4 weeks
4. Finally, set to `p=reject`

### Verify Email Authentication

```bash
# Check SPF
dig civora.me TXT +short | grep spf

# Check DMARC
dig _dmarc.civora.me TXT +short

# Test email authentication
https://www.mail-tester.com/
```

---

## Security Headers Implementation

The repository includes `public/_headers` and `public/_redirects` files for Netlify/Cloudflare.

### For GitHub Pages

GitHub Pages doesn't support custom headers natively. Options:

#### Option 1: Use Cloudflare (Recommended)

1. Add site to Cloudflare
2. Update nameservers to Cloudflare
3. Create "Transform Rules" for headers:
   - Go to Rules → Transform Rules → Modify Response Header
   - Add rules for each required header

#### Option 2: Use Netlify

1. Deploy to Netlify instead of GitHub Pages
2. `_headers` and `_redirects` files will be respected automatically

#### Option 3: Service Worker (Partial Solution)

Note: Headers set via service worker are limited and won't be seen by security scanners.

### Verify Security Headers

```bash
# Check headers
curl -I https://civora.me

# Comprehensive security test
https://securityheaders.com/?q=civora.me

# Mozilla Observatory
https://observatory.mozilla.org/analyze/civora.me
```

**Target Scores**:
- SecurityHeaders.com: A or A+
- Mozilla Observatory: A or A+

---

## Monitoring & Alerting

### Sentry Error Tracking

1. **Create Sentry Account**: https://sentry.io
2. **Create Project** for civora.me (JavaScript/Next.js)
3. **Get DSN**: Copy the DSN from project settings
4. **Set Environment Variable**:
   ```bash
   # For Vercel/Netlify
   NEXT_PUBLIC_SENTRY_DSN=https://[key]@[org].ingest.sentry.io/[project]
   ```
5. **Configure Alerts**:
   - Error rate > 10 errors/hour
   - New error types
   - Performance degradation

### Uptime Monitoring

Set up checks with one of these services:

#### UptimeRobot (Free tier available)
- URL: https://uptimerobot.com
- Setup: Monitor https://civora.me every 5 minutes
- Alerts: Email/SMS on downtime

#### Pingdom
- URL: https://pingdom.com
- Advanced monitoring with RUM (Real User Monitoring)

#### StatusCake
- URL: https://statuscake.com
- Free tier with basic monitoring

**Recommended Monitors**:
```
- HTTPS check: https://civora.me (every 5 min)
- Page load check: Response time < 3s
- SSL certificate expiry: Alert 30 days before expiry
- DNS check: Ensure DNS resolves correctly
```

### SSL Certificate Expiry Monitoring

**Automated Renewal** (Let's Encrypt with Certbot):
```bash
# Test renewal
certbot renew --dry-run

# Set up auto-renewal cron job
0 0,12 * * * certbot renew --quiet
```

**Monitoring Services**:
- SSL Labs Monitor: https://www.ssllabs.com/
- Certificate monitoring in UptimeRobot/Pingdom
- Use a service like https://certificatemonitor.org/

**Alert Threshold**: 30 days before expiry

---

## Performance Monitoring

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID/INP (Interaction to Next Paint)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring Tools

#### Google Search Console
1. Add property: https://search.google.com/search-console
2. Verify ownership (add meta tag or DNS record)
3. Monitor Core Web Vitals in "Experience" section

#### PageSpeed Insights
- URL: https://pagespeed.web.dev/
- Test regularly: https://pagespeed.web.dev/analysis?url=https://civora.me
- Target: Score > 90 for mobile and desktop

#### Real User Monitoring (RUM)

**Option 1: Google Analytics 4 with Web Vitals**
```javascript
// Already included in layout.js
// Set GA_MEASUREMENT_ID environment variable
```

**Option 2: Sentry Performance**
```javascript
// Already configured in lib/monitoring/sentry.js
// Automatically tracks Core Web Vitals
```

#### Synthetic Monitoring

**WebPageTest**:
- URL: https://webpagetest.org
- Run tests from multiple locations
- Compare performance over time

**Lighthouse CI** (for automated checks):
```bash
npm install -g @lhci/cli
lhci autorun --url https://civora.me
```

### Performance Budget

Set alerts if metrics exceed:
- Page load time: > 3s
- Time to Interactive: > 5s
- Total page size: > 2MB
- Number of requests: > 50

---

## Deployment Checklist

Before going live, verify all items:

### DNS & Domain
- [ ] A/AAAA records point to correct IPs
- [ ] www redirects to apex (or vice versa)
- [ ] CAA records configured
- [ ] DNSSEC enabled and working
- [ ] DNS propagation complete (check with https://dnschecker.org)

### TLS/SSL
- [ ] Valid SSL certificate installed
- [ ] TLS 1.2+ only
- [ ] OCSP stapling enabled
- [ ] Certificate auto-renewal configured
- [ ] SSL Labs test: A+ rating
- [ ] HSTS header present (without preload initially)
- [ ] No mixed content warnings

### Email
- [ ] SPF record added
- [ ] DKIM keys configured
- [ ] DMARC policy set (start with p=none)
- [ ] Email authentication verified

### Security
- [ ] Security headers configured
- [ ] SecurityHeaders.com: A rating
- [ ] Mozilla Observatory: A rating
- [ ] CSP in Report-Only mode (monitor for violations)
- [ ] No vulnerabilities in dependencies

### Monitoring
- [ ] Sentry configured with DSN
- [ ] Uptime monitoring active
- [ ] SSL certificate expiry monitoring
- [ ] Google Search Console verified
- [ ] Performance monitoring configured
- [ ] Alert contacts configured

### Performance
- [ ] Core Web Vitals meet targets
- [ ] PageSpeed Insights: > 90 score
- [ ] Images optimized
- [ ] Static assets cached properly
- [ ] CDN configured (if applicable)

---

## Incident Response

### SSL Certificate Expiry

```bash
# Emergency renewal
certbot certonly --force-renewal -d civora.me -d www.civora.me

# Restart web server
systemctl restart nginx  # or your web server
```

### DNS Issues

1. Verify DNS at registrar
2. Check nameserver configuration
3. Clear DNS cache: `sudo systemd-resolve --flush-caches`
4. Test with different DNS: `dig @8.8.8.8 civora.me`

### Security Incident

1. Check Sentry for error patterns
2. Review access logs
3. Check for unauthorized DNS changes
4. Verify SSL certificate validity
5. Rotate credentials if compromised

---

## Useful Commands

```bash
# Test HTTPS redirect
curl -I http://civora.me

# Check all security headers
curl -I https://civora.me | grep -E "(Strict-Transport|Content-Security|X-Frame|X-Content)"

# Test DNS resolution
dig civora.me +short
dig www.civora.me +short

# Check SSL certificate
echo | openssl s_client -servername civora.me -connect civora.me:443 2>/dev/null | openssl x509 -noout -dates

# Monitor real-time logs (if applicable)
tail -f /var/log/nginx/access.log

# Test load time
time curl -o /dev/null -s -w '%{time_total}\n' https://civora.me
```

---

## Support Resources

- **SSL Labs**: https://www.ssllabs.com/
- **Security Headers**: https://securityheaders.com/
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **HSTS Preload**: https://hstspreload.org/
- **DNS Checker**: https://dnschecker.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://webpagetest.org/
- **Sentry Documentation**: https://docs.sentry.io/

---

**Last Updated**: October 12, 2025

For questions or issues, contact: ops@civora.me
