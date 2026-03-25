const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/moham/Downloads/hrs store';

const template = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${title} | The HRS Store</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="images/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="style.css">
    <style>
        .policy-page { background: var(--color-light-gray, #f8f9fa); }
        .policy-content { padding: 3rem 2.5rem; max-width: 800px; margin: 4rem auto; background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }
        .policy-content h1 { font-size: 2.5rem; margin-bottom: 0.5rem; text-align: center; color: var(--color-black); font-family: var(--font-heading); }
        .policy-content .last-updated { text-align: center; color: #888; margin-bottom: 2.5rem; font-size: 0.9rem; }
        .policy-content h2 { font-size: 1.4rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; color: var(--color-black); font-family: var(--font-heading);}
        .policy-content p { margin-bottom: 1.2rem; line-height: 1.7; color: var(--color-text); }
        .policy-content ul { padding-left: 1.5rem; margin-bottom: 1.5rem; color: var(--color-text); line-height: 1.7; }
        .policy-content li { margin-bottom: 0.5rem; }
        .policy-content a { color: var(--color-gold); font-weight: 500; text-decoration: underline; }
    </style>
</head>
<body class="policy-page">

    <header class="header">
        <div class="container header-container">
            <a href="index.html" class="logo">
                <img src="images/logo.png" alt="THE HRS STORE" class="brand-logo">
            </a>
            <a href="index.html" class="btn btn-outline btn-small"><i class="ph ph-arrow-left"></i> Back to Home</a>
        </div>
    </header>

    <main class="container">
        <div class="policy-content">
            <h1>\${title}</h1>
            <p class="last-updated">Last Updated: March 2026</p>
            \${content}
        </div>
    </main>

    <footer class="footer bg-dark color-light" style="padding: 3rem 0; text-align: center; margin-top: auto;">
        <div class="container">
            <div style="margin-bottom: 1.5rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
                <a href="contact.html">Contact Us</a>
                <a href="shipping-policy.html">Shipping Policy</a>
                <a href="refund-policy.html">Refund Policy</a>
                <a href="terms.html">Terms of Service</a>
                <a href="privacy-policy.html">Privacy Policy</a>
            </div>
            <p>&copy; 2026 The HRS Store. All Rights Reserved.</p>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>`;

const pages = [
{
    name: 'contact.html',
    title: 'Contact Us',
    content: `<h2>Get In Touch</h2>
<p>If you have any questions, concerns, or need help with your order, please do not hesitate to contact us. We are here to help!</p>
<p><strong>Business Name:</strong> The HRS Store</p>
<p><strong>Physical Address:</strong> Bangalore Street 233/A 2nd Main Road, East Bangalore, ZIP 560075</p>
<p><strong>Email:</strong> <a href="mailto:hrs.store.shop@gmail.com">hrs.store.shop@gmail.com</a></p>
<p><strong>Phone:</strong> +1 (800) 123-4567</p>
<h2>Customer Support Hours</h2>
<p>Our support team is available Monday to Saturday. We typically respond to all inquiries within 24-48 business hours.</p>`
},
{
    name: 'shipping-policy.html',
    title: 'Shipping Policy',
    content: `<h2>Order Processing Time</h2>
<p>All orders are processed and dispatched within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
<h2>Shipping Rates and Estimates</h2>
<p>We offer standard shipping across India. Your final shipping cost will be calculated automatically at checkout.</p>
<ul>
    <li><strong>Standard Delivery:</strong> 3-7 business days</li>
</ul>
<p>Please note that occasional delays may happen due to high volume or courier network issues entirely out of our control.</p>
<h2>Order Tracking</h2>
<p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow up to 48 hours for tracking information to populate in the courier system.</p>`
},
{
    name: 'refund-policy.html',
    title: 'Refund & Return Policy',
    content: `<h2>30-Day Money-Back Guarantee</h2>
<p>We want you to be 100% satisfied with your purchase from The HRS Store. We have a robust 30-day return policy, which means you have 30 full days after receiving your item to request a return or a refund if you are not satisfied with the results.</p>
<h2>Conditions for Returns</h2>
<p>To be eligible for a standard return, your item must be in the same condition that you received it, primarily unused. If you are invoking the guarantee, the product must be returned with its original packaging so we can process it alongside your receipt or proof of purchase.</p>
<p>To start a return, simply contact our support team at <a href="mailto:hrs.store.shop@gmail.com">hrs.store.shop@gmail.com</a>.</p>
<h2>Refunds</h2>
<p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved. If approved, you’ll be automatically refunded on your original payment method within 7-10 business days. Keep in mind it can take some time for your bank or credit card company to process and post the refund entirely.</p>`
},
{
    name: 'privacy-policy.html',
    title: 'Privacy Policy',
    content: `<h2>Information We Collect</h2>
<p>When you visit the site, we collect certain information about your device, your interaction with the site, and information necessary to process your purchases securely. We may also collect additional information if you contact us for customer support.</p>
<p>Specifically, we collect: Order Information (Name, Billing Address, Shipping Address, Payment Information, Email Address, Phone Number) so we can fulfill your orders, provide invoices, and communicate effectively.</p>
<h2>Sharing Personal Information</h2>
<p>We share your Personal Information with authorized service providers specifically to help us provide our services and fulfill our contracts with you. We use fully compliant payment gateways (such as Razorpay/Stripe) to process your payments securely. They handle all payment data via strict encryption industry standards.</p>
<h2>Your Rights</h2>
<p>You have the absolute right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, simply contact us at <a href="mailto:hrs.store.shop@gmail.com">hrs.store.shop@gmail.com</a> at any time.</p>`
},
{
    name: 'terms.html',
    title: 'Terms of Service',
    content: `<h2>Overview</h2>
<p>This website is operated entirely by The HRS Store. Throughout the site, the terms “we”, “us” and “our” refer directly to The HRS Store. We respectfully offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.</p>
<h2>Products or Services</h2>
<p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
<p>We have made every effort to display as accurately as possible the colors and images of our products. We cannot absolutely guarantee that your computer monitor's display of any exact color will be perfectly accurate.</p>
<h2>Payment Terms</h2>
<p>We accept various payment methods securely processed via our integrated payment gateway. By placing an order, you agree to provide current, complete, and perfectly accurate purchase and account information for all purchases made at our store.</p>
<h2>Contact Information</h2>
<p>Questions about the Terms of Service should be sent to us at <a href="mailto:hrs.store.shop@gmail.com">hrs.store.shop@gmail.com</a> or sent by traditional mail to our verified address at Bangalore Street 233/A 2nd Main Road, East Bangalore, ZIP 560075.</p>`
}
];

pages.forEach(p => fs.writeFileSync(path.join(dir, p.name), template(p.title, p.content)));
console.log('Successfully generated all policy pages.');
