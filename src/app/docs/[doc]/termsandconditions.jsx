import React from 'react';

const termsData = {
  title: "Ridewing Ticketz and Tourz Terms and Conditions",
  intro: "Welcome to Ridewing Ticketz and Tourz! By accessing or using the Ridewing Ticketz and Tourz website or services, you agree to the following Terms and Conditions. Please read them carefully before making a purchase. If you disagree with any part of the Terms, you must stop using our Services.",
  sections: [
    {
      title: "1. About Us",
      content: "Ridewing Ticketz and Tourz Ltd. is a Trading name of Signature Concierge Ltd, which is registered at West Drayton, United Kingdom with registration number: 14026674, VAT registration number: 467311882. Our platform allows users to book tours, activities, and admission tickets from various third-party suppliers."
    },
    {
      title: "2. Acceptance of Terms",
      content: "By using Ridewing, you confirm that you are at least 18 years old or have the consent of a legal guardian to use the Site and Services. Your continued use of the Site signifies your acceptance of these Terms."
    },
    {
      title: "3. Our Role",
      content: "Ridewing is a marketplace for booking travel-related services. We do not operate tours or attractions directly. The third-party service providers are responsible for delivering the services, and your contract for those services is directly with them."
    },
    {
      title: "4. Booking Process",
      content: {
        "Placing a Booking": "Once you choose a service (tour, ticket, etc.), follow the booking process outlined on our Site. Bookings are subject to availability.",
        "Payment": "All payments must be made in full at the time of booking. We accept major credit and debit cards.",
        "Confirmation": "Upon successful payment, you will receive a booking confirmation via email. This confirmation serves as proof of your reservation."
      }
    },
    {
      title: "5. Pricing and Availability",
      content: {
        "Prices": "All prices on our Site are in GBP (British Pounds) unless otherwise stated. Prices are subject to change without notice, but any changes will not affect confirmed bookings.",
        "Availability": "All services are offered subject to availability. We make every effort to ensure accurate availability on our platform, but Ridewing is not responsible for availability changes by third-party suppliers.",
        "Vehicle Variability": "Please note that vehicles may vary depending on the country of service, and their models, features, and availability may differ. In the event of any issues with the booked vehicle, a replacement vehicle of a suitable seating capacity will be arranged to ensure your comfort and convenience, subject to availability.",
        "Baggage Allowance": "In Airport Transfers and Station Transfers, each passenger is allowed only one piece of hand luggage and one check-in baggage. Any additional luggage exceeding this limit must be arranged directly by the guest."
      }
    },
    {
      title: "6. Cancellations and Refunds",
      content: {
        "User Cancellations": "Cancellation policies vary depending on the supplier. Please review the specific terms of each service before booking. Some bookings may be non-refundable or subject to cancellation fees.",
        "Supplier Cancellations": "In the rare event that a supplier cancels your booking, Ridewing will notify you and either arrange an alternative service or provide a full refund.",
        "Refund Policy": "Refunds (if applicable) will be processed within 7-10 business days of receiving a cancellation request or supplier cancellation."
      }
    },
    {
      title: "7. Changes to Bookings",
      content: "If you need to amend your booking, contact Ridewing or the service provider directly. Not all bookings are eligible for changes, and additional fees may apply."
    },
    {
      title: "8. User Responsibilities",
      content: {
        "Accurate Information": "It is your responsibility to provide accurate and complete information when making a booking.",
        "Meeting Requirements": "You must comply with all service requirements, including arrival times, dress codes, age restrictions, and any health or safety regulations set by the supplier.",
        "Travel Documents": "Ensure you have the necessary documentation for your travel or tour, such as identification, tickets, or visas (if applicable)."
      }
    },
    {
      title: "9. Limitations of Liability",
      content: {
        "Third-Party Services": "Ridewing acts solely as an intermediary between you and the service providers. We are not liable for any injuries, losses, or damages caused by the suppliers’ services.",
        "No Guarantee": "Ridewing does not guarantee the accuracy of information provided on the Site, nor are we responsible for any interruptions or errors in service.",
        "Maximum Liability": "Our liability, if any, is limited to the amount you paid for the service in question."
      }
    },
    {
      title: "10. Intellectual Property",
      content: "All content on the Site, including text, images, logos, and software, is the intellectual property of Ridewing or its licensors. You may not use any of our content without our prior written permission."
    },
    {
      title: "11. Privacy",
      content: "We take your privacy seriously. Please review our Privacy Policy to understand how we collect, store, and use your personal data."
    },
    {
      title: "12. Website Use",
      content: {
        "Use Restrictions": "By accessing or using the Ridewing website, you agree to use the Site only for lawful purposes and in a way that does not infringe upon the rights of others or restrict or inhibit their use and enjoyment of the Site.",
        "Prohibited Actions": [
          "Transmit or upload any material that is unlawful, defamatory, offensive, or infringes on the intellectual property or privacy rights of others.",
          "Distribute any content that is harmful, abusive, obscene, discriminatory, or otherwise objectionable.",
          "Upload, post, or share any content containing viruses, malware, or other harmful software that could damage the website or its users.",
          "Attempt to gain unauthorized access to the website, servers, or networks connected to Ridewing."
        ],
        "Compliance": "You agree to comply with all applicable laws and regulations when using our website. Failure to comply with these terms may result in the suspension or termination of your access to the website and any legal action where necessary."
      }
    },
    {
      title: "13. Termination",
      content: "Ridewing reserves the right to terminate or suspend your access to the Site and Services at our discretion, including for any violation of these Terms."
    },
    {
      title: "14. Amendments",
      content: "Ridewing may update these Terms from time to time. Any changes will be posted on this page, and the \"Effective Date\" will be updated. Continued use of the Site after such changes signifies your acceptance of the revised Terms."
    },
    {
      title: "15. Governing Law",
      content: "These Terms and any disputes arising out of your use of the Site are governed by the laws of England and Wales. Any legal proceedings must be brought before the courts of England and Wales."
    },
    {
      title: "16. Contact Us",
      content: {
        "Email": "info@ridewing.uk",
        "Phone": "+44(0)2084324325"
      }
    }
  ]
};

const TermsAndConditions = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{termsData.title}</h1>
      <p className="mb-8">{termsData.intro}</p>
      {termsData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          {typeof section.content === 'object' ? (
            <ul className="list-disc pl-6">
              {Object.entries(section.content).map(([key, value], idx) => (
                <li key={idx} className="mb-2">
                  <strong>{key}: </strong> {typeof value === 'string' ? value : (
                    <ul className="list-disc pl-6">
                      {value.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </li>
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
