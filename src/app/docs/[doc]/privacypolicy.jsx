import React from 'react';

const privacyPolicyData = {
  lastUpdated: "15 December 2024",
  introduction: "Welcome to Kingdom Holidays Group Ltd. We value your privacy and are committed to protecting your data. This privacy policy will inform you about how we collect, use, and protect your data when you visit our website or use our services.",
  companyInfo: {
    name: "Kingdom Holidays Group Ltd",
    registration: "11730934",
    address: "491-Sipson Road, West Drayton, London, United Kingdom - UB7 0JB",
    contact: {
      phone: ["+44 (0) 208 897 2173", "+44 (0) 208 432 432 5"],
      email: "operations@kingdomholidaysgroup.com",
    },
    tradingNames: [
      "RIDEWING",
      "Kingdom Experiences & Tours Company",
      "Signature Concierge (DMC)"
    ]
  },
  sections: [
    {
      title: "Information We Collect",
      content: [
        "Personal Identification Information: Name, email address, phone number, etc.",
        "Financial Information: Payment details, billing address, etc.",
        "Technical Data: IP address, browser type, time zone settings, operating system, and platform.",
        "Usage Data: Information about how you use our website and services."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To Provide and Maintain Our Services: Including booking and payment processing, customer support, and communication.",
        "To Improve Our Services: By analyzing usage data and feedback.",
        "To Comply with Legal Obligations: Including regulatory requirements and responding to lawful requests by public authorities."
      ]
    },
    {
      title: "Data Sharing and Disclosure",
      content: [
        "We do not sell, trade, or otherwise transfer to outside parties your personal information except under the following circumstances:",
        "Service Providers: We may share your information with trusted third-party service providers to assist us in operating our business and providing our services.",
        "Legal Requirements: We may disclose your information where required to comply with legal obligations or protect our rights, property, or safety."
      ]
    },
    {
      title: "Data Security",
      content: "We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure."
    },
    {
      title: "Your Rights",
      content: [
        "Access: You have the right to request access to the personal data we hold about you.",
        "Correction: You have the right to request that we correct any inaccuracies in your data.",
        "Deletion: You have the right to request that we delete your data.",
        "Objection: You have the right to object to the processing of your data in certain circumstances."
      ]
    },
    {
      title: "Cookies",
      content: "We use cookies to enhance your experience on our website. Cookies are small data files that are placed on your device. You can manage your cookie preferences through your browser settings."
    },
    {
      title: "Changes to This Privacy Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this policy periodically for any changes."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about this privacy policy or our data practices, please contact us at: Kingdom Holidays Group Ltd 491-Sipson Road, West Drayton, London, United Kingdom - UB7 0JB Email: operations@kingdomholidaysgroup.com Tel: +44 (0) 208 897 2173 | +44 (0) 208 432 432 5"
    }
  ]
};

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-600">Last Updated: {privacyPolicyData.lastUpdated}</p>
      <p className="mb-8">{privacyPolicyData.introduction}</p>

      <div className="mb-8">
        <h2 className="text-lg font-semibold">Company Information</h2>
        <p>{privacyPolicyData.companyInfo.name}</p>
        <p>Registration: {privacyPolicyData.companyInfo.registration}</p>
        <p>Address: {privacyPolicyData.companyInfo.address}</p>
        <p>Contact Information:</p>
        <ul className="list-disc pl-6">
          {privacyPolicyData.companyInfo.contact.phone.map((phone, index) => (
            <li key={index}>Tel: {phone}</li>
          ))}
          <li>Email: {privacyPolicyData.companyInfo.contact.email}</li>
        </ul>
        <p>Trading Names:</p>
        <ul className="list-disc pl-6">
          {privacyPolicyData.companyInfo.tradingNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>

      {privacyPolicyData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          {Array.isArray(section.content) ? (
            <ul className="list-disc pl-6">
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;