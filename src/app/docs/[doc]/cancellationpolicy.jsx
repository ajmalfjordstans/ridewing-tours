import React from 'react';

const CancellationPolicy = () => {
  const cancellationPolicy = {
    title: "Ridewing Cancellation Policy",
    introduction: "At Ridewing, we understand that travel plans can change, and we aim to provide flexibility where possible. This Cancellation Policy outlines the terms under which you may cancel your bookings and receive a refund or credit, as well as the applicable fees and timelines.",
    sections: [
      {
        title: "1. Cancellation by Customers",
        content: "You may cancel your booking at any time before the scheduled tour or activity. The cancellation terms and applicable refund will depend on the type of booking and the notice period provided.",
        subsections: [
          {
            title: "1.1 Cancellation Policy",
            content: {
              forSmallGroups: "Up to 10 guests (car or minibus up to 10 seater) - cancellation charges will apply as follows:",
              smallGroupCharges: [
                "10% of the total amount if canceled up to 96 hours before the scheduled service.",
                "25% if canceled between 96 to 72 hours prior.",
                "50% if canceled between 72 to 48 hours prior.",
                "75% if canceled between 48 to 24 hours prior.",
                "100% if canceled within 24 hours of the scheduled service."
              ],
              forLargeGroups: "Above 10 guests (coaches or similar) - cancellation charges will apply as follows:",
              largeGroupCharges: [
                "Full refund if canceled more than 21 days before the tour.",
                "25% of the total amount if canceled between 14 to 21 days before the tour.",
                "40% if canceled between 10 to 14 days before the tour.",
                "60% if canceled between 7 to 10 days before the tour.",
                "75% if canceled between 4 to 7 days before the tour.",
                "No refund if canceled less than 4 days before the tour.",
                "No refunds for last-minute or same-day cancellations, including 'no-show' situations."
              ],
              admissionTickets: "ADMISSION TICKETS: Please note that the cancellation and refund policies for admission tickets are determined by the issuing Authority. Review their specific terms at the time of purchase."
            }
          },
          {
            title: "1.2 Non-Refundable Services",
            content: "Certain bookings, such as special promotions, discounted tickets, or non-refundable offers, are not eligible for cancellation or refund. These terms will be clearly communicated at the time of booking."
          }
        ]
      },
      {
        title: "2. Cancellation by Ridewing or Service Providers",
        content: "In rare cases, Ridewing or our service providers may need to cancel a tour or activity due to unforeseen circumstances (e.g., weather conditions, safety concerns, or operational issues). If your booking is canceled by us: You will receive a full refund for the canceled service, or we may offer you the option to reschedule or select a similar experience."
      },
      {
        title: "3. Force Majeure",
        content: "If a tour or activity is canceled due to events beyond our control (e.g., natural disasters, political unrest, pandemics), Ridewing will follow the service provider's cancellation policies. Refunds may be provided, or you may be given the option to reschedule or receive a credit for future bookings."
      },
      {
        title: "4. How to Cancel a Booking",
        content: "To cancel your booking, please contact us as soon as possible via email (info@ridewing.uk), phone (+44(0)2084324325), or through your Ridewing account dashboard (if applicable). Please include your booking reference number and reason for cancellation."
      },
      {
        title: "5. Refunds for Cancellations",
        content: "Refunds (if applicable) will be issued to the original payment method within 10-15 business days of receiving your cancellation request. Please note that some service fees (e.g., booking fees) may be non-refundable."
      },
      {
        title: "6. Changes to Bookings",
        content: "If you wish to amend your booking (e.g., changing the date or number of participants), please contact us. Any amendments will be subject to availability and may incur additional charges. In some cases, changing your booking may be treated as a cancellation and rebooking, and the applicable cancellation policy may apply."
      },
      {
        title: "7. Contact Us",
        content: "If you have any questions regarding this Cancellation Policy or need assistance with canceling or amending your booking, please reach out to our support team."
      }
    ]
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{cancellationPolicy.title}</h1>
      <p className="mb-6 text-lg">{cancellationPolicy.introduction}</p>
      {cancellationPolicy.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
          <p className="mb-4">{section.content}</p>
          {section.subsections && section.subsections.map((subsection, subIndex) => (
            <div key={subIndex} className="mb-4 pl-4">
              <h3 className="text-xl font-semibold">{subsection.title}</h3>
              {typeof subsection.content === 'object' ? (
                <>
                  <p className="font-semibold">{subsection.content.forSmallGroups}</p>
                  <ul className="list-disc list-inside mb-4">
                    {subsection.content.smallGroupCharges.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p className="font-semibold">{subsection.content.forLargeGroups}</p>
                  <ul className="list-disc list-inside mb-4">
                    {subsection.content.largeGroupCharges.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p>{subsection.content.admissionTickets}</p>
                </>
              ) : (
                <p>{subsection.content}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CancellationPolicy;
