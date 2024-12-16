import React from 'react';

const termsData = {
  lastUpdated: "15 December 2024",
  introduction: "Welcome to Kingdom Holidays Group Ltd. These Terms and Conditions (\"Terms\") govern your use of our services and websites operated under the trading names RIDEWING, Kingdom Experiences & Tours Company, and Signature Concierge (DMC). By using our services, you agree to comply with and be bound by these Terms.",
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
      title: "1. Services Provided",
      content: [
        "Airport Transfers",
        "Chauffeured Luxury Car Service",
        "Ground Transport",
        "Coach Booking",
        "Private Tours",
        "Concierge Service",
        "Airport Transfer Group Coordination & Meet & Greet"
      ]
    },
    {
      title: "2. Our Role",
      content: "Kingdom Holidays Group Ltd acts as an intermediary between you and various service providers, including but not limited to hotels, transportation companies, and tour operators. Our role involves arranging and coordinating travel-related services on your behalf. While we strive to work with reputable providers, we are not responsible for the performance or non-performance of these service providers. Any issues arising from the services provided by third parties should be directed to the respective service provider."
    },
    {
      title: "3. Booking and Payment",
      content: {
        Booking: "All bookings are subject to availability and confirmation. A booking is considered confirmed only after full payment or deposit is received, and you receive a confirmation email from us.",
        Payment: "Payments can be made via credit/debit card, bank transfer, or other payment methods as specified at the time of booking. Full payment details will be provided during the booking process.",
        "Cancellation and Refunds": "Please refer to our specific cancellation and refund policies for each service at the time of booking. Note that cancellation and refund policies for admission tickets are determined by the issuing authority."
      }
    },
    {
      title: "4. Changes and Amendments",
      content: {
        "Customer-Initiated Changes": "If you wish to change your booking, please contact us as soon as possible. Changes are subject to availability and may incur additional fees.",
        "Company-Initiated Changes": "We reserve the right to make changes to your itinerary, including accommodation and services, in the event of unforeseen circumstances. We will notify you as soon as possible and provide alternative arrangements of equal or higher value."
      }
    },
    {
      title: "5. Responsibilities and Liabilities",
      content: {
        "Customer Responsibilities": "You are responsible for ensuring that all travel documents (e.g., passport, visa) are valid and up-to-date. You must comply with all health, safety, and customs regulations of the destination countries.",
        "Company Liabilities": "We are not liable for any loss, damage, or injury resulting from factors beyond our control, including but not limited to natural disasters, acts of terrorism, and strikes. Our liability for any service-related issue is limited to the amount paid for that service."
      }
    },
    {
      title: "6. Privacy and Data Protection",
      content: "Your privacy is important to us. Please review our Privacy Policy here for detailed information on how we collect, use, and protect your personal data."
    },
    {
      title: "7. Intellectual Property",
      content: "All content on our websites, including text, graphics, logos, and images, is the property of Kingdom Holidays Group Ltd or our content suppliers and is protected by international copyright laws. You may not use, reproduce, or distribute any content without our explicit permission."
    },
    {
      title: "8. Governing Law",
      content: "These Terms are governed by and construed in accordance with the laws of the United Kingdom. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of the United Kingdom."
    },
    {
      title: "9. Contact Us",
      content: "If you have any questions or concerns about these Terms, please contact us at: Kingdom Holidays Group Ltd 491-Sipson Road, West Drayton, London, United Kingdom - UB7 0JB Email: operations@kingdomholidaysgroup.com Tel: +44 (0) 208 897 2173 | +44 (0) 208 432 432 5"
    }
  ]
};

const TermsAndConditions = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p className="mb-4 text-sm text-gray-600">Last Updated: {termsData.lastUpdated}</p>
      <p className="mb-8">{termsData.introduction}</p>

      <div className="mb-8">
        <h2 className="text-lg font-semibold">Company Information</h2>
        <p>{termsData.companyInfo.name}</p>
        <p>Registration: {termsData.companyInfo.registration}</p>
        <p>Address: {termsData.companyInfo.address}</p>
        <p>Contact Information:</p>
        <ul className="list-disc pl-6">
          {termsData.companyInfo.contact.phone.map((phone, index) => (
            <li key={index}>Tel: {phone}</li>
          ))}
          <li>Email: {termsData.companyInfo.contact.email}</li>
        </ul>
        <p>Trading Names:</p>
        <ul className="list-disc pl-6">
          {termsData.companyInfo.tradingNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>

      {termsData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          {typeof section.content === 'object' && !Array.isArray(section.content) ? (
            <ul className="list-disc pl-6">
              {Object.entries(section.content).map(([key, value], idx) => (
                <li key={idx} className="mb-2">
                  <strong>{key}: </strong> {value}
                </li>
              ))}
            </ul>
          ) : Array.isArray(section.content) ? (
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

export default TermsAndConditions;
