import React from 'react';

const RefundPolicy = () => {
  const refundPolicy = {
    title: "Ridewing Refund Policy",
    introduction: "At Ridewing, we strive to provide the best service and ensure your satisfaction with our tours and ticketing services. However, we understand that plans may change. This Refund Policy outlines the terms under which refunds may be issued for bookings made through our website.",
    sections: [
      {
        title: "1. General Refund Terms",
        content: {
          overview: "Refunds are subject to the cancellation policies of the specific tours, tickets, or activities you book through Ridewing. Each service provider may have its own rules regarding cancellations and refunds, and it is your responsibility to review these terms before making a purchase.",
          nonRefundableItems: "Some bookings, such as last-minute offers or special promotions, may be marked as non-refundable. These will be clearly stated during the booking process.",
          partialRefunds: "In some cases, partial refunds may be offered depending on how far in advance you cancel your booking."
        }
      },
      {
        title: "2. Cancellation Requests",
        content: {
          overview: "If you wish to cancel your booking, you must notify us as soon as possible. Cancellation requests should be submitted through the following methods:",
          methods: {
            email: "info@ridewing.uk",
            phone: "+44(0)2084324325",
            dashboard: "Through your Ridewing account dashboard"
          },
          process: "Once we receive your cancellation request, we will process it in accordance with the service provider's cancellation policy."
        }
      },
      {
        title: "3. Eligibility for Refunds",
        content: {
          cancellationsInAdvance: "For cancellations made within mentioned days or more before the scheduled date of the tour or activity, you may be eligible for a full or partial refund, depending on the provider’s policy.",
          lastMinuteCancellations: "Cancellations made within 24 hours of the scheduled date may not be eligible for a refund. This will vary based on the service provider's policy.",
          noShow: "If you do not show up for your booked tour or activity without prior cancellation, no refund will be issued.",
          tourCancellationUnforeseenEvents: "Tour cancellations due to unforeseen events may have different refund terms."
        }
      },
      {
        title: "4. Processing Refunds",
        content: {
          timeFrame: "Refunds will be processed within 10-15 business days of receiving your cancellation request, assuming you are eligible for a refund.",
          method: "Refunds will be credited back to the original payment method used during the booking. If this is not possible, we may issue the refund through another agreed-upon method.",
          serviceFees: "Certain service fees (such as booking or processing fees) may not be refundable, even if the booking itself is eligible for a refund."
        }
      },
      {
        title: "5. Changes to Bookings",
        content: "If you need to amend your booking (change of date, participants, etc.), this may be treated as a cancellation followed by a new booking, depending on the service provider’s policy. Additional fees may apply for changes to bookings."
      },
      {
        title: "6. Provider Cancellations",
        content: "In rare cases where the service provider cancels your booking (due to weather, safety concerns, or other reasons), you will be notified as soon as possible. In such cases, you may be offered an alternative solution."
      },
      {
        title: "7. Force Majeure",
        content: "If a booking is canceled due to unforeseen circumstances beyond our control (such as natural disasters, government restrictions, or global events), refunds may be subject to the policies of the individual service providers. Ridewing will not be liable for any losses caused by these events."
      }
    ]
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{refundPolicy.title}</h1>
      <p className="mb-6 text-lg">{refundPolicy.introduction}</p>
      {refundPolicy.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
          {typeof section.content === 'object' ? (
            <>
              {section.content.overview && <p className="mb-2">{section.content.overview}</p>}
              {section.content.nonRefundableItems && (
                <p className="mb-2 font-semibold">Non-Refundable Items: {section.content.nonRefundableItems}</p>
              )}
              {section.content.partialRefunds && (
                <p className="mb-2 font-semibold">Partial Refunds: {section.content.partialRefunds}</p>
              )}
              {section.content.methods && (
                <div className="mb-2">
                  <p>Email: <a href={`mailto:${section.content.methods.email}`} className="text-blue-500">{section.content.methods.email}</a></p>
                  <p>Phone: <a href={`tel:${section.content.methods.phone}`} className="text-blue-500">{section.content.methods.phone}</a></p>
                  <p>{section.content.methods.dashboard}</p>
                </div>
              )}
              {section.content.process && <p className="mb-2">{section.content.process}</p>}
              {section.content.cancellationsInAdvance && (
                <p className="mb-2">Cancellations in Advance: {section.content.cancellationsInAdvance}</p>
              )}
              {section.content.lastMinuteCancellations && (
                <p className="mb-2">Last-Minute Cancellations: {section.content.lastMinuteCancellations}</p>
              )}
              {section.content.noShow && <p className="mb-2">No Show: {section.content.noShow}</p>}
              {section.content.tourCancellationUnforeseenEvents && (
                <p className="mb-2">Tour Cancellation Due to Unforeseen Events: {section.content.tourCancellationUnforeseenEvents}</p>
              )}
              {section.content.timeFrame && (
                <p className="mb-2">Time Frame: {section.content.timeFrame}</p>
              )}
              {section.content.method && <p className="mb-2">Method of Refund: {section.content.method}</p>}
              {section.content.serviceFees && (
                <p className="mb-2">Service Fees: {section.content.serviceFees}</p>
              )}
            </>
          ) : (
            <p className="mb-2">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RefundPolicy;