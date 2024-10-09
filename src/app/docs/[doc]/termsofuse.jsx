import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ridewing Terms of Use</h1>
      <p className="mb-4">
        By completing this booking form, you agree to the following terms and conditions:
      </p>
      
      <h2 className="text-xl font-semibold mb-2">1. Airport Pick-up and Meeting Point</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Upon arrival, please proceed to the Arrivals Hall where the driver will be waiting with a sign displaying your name or the company name.
        </li>
        <li>
          If you cannot locate the driver, please contact our customer care or the driver directly using the contact number provided in the confirmation email.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">2. Vehicle Availability and Substitution</h2>
      <p className="mb-4">
        Please note that vehicles may vary depending on the country of service, and their models, features, and availability may differ. In the event of any issues with the booked vehicle, a replacement vehicle of a suitable seating capacity will be arranged to ensure your comfort and convenience, subject to availability.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Baggage Allowance</h2>
      <p className="mb-4">
        In Airport Transfers and Station Transfers, each passenger is allowed only one piece of hand luggage and one check-in baggage. Any additional luggage exceeding this limit must be arranged directly by the guest.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Free Waiting Period</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          For airport pick-ups, a free waiting period of 60 minutes is provided after your flight has landed.
        </li>
        <li>
          For other pick-ups, 15 minutes of free waiting time is included.
        </li>
        <li>
          After the free waiting period, an additional charge may apply, payable directly to the driver.
        </li>
        <li>
          It is essential to ensure you have a reliable internet connection or phone service to contact your driver upon arrival. If you are unable to reach them, they may depart once the waiting period has concluded.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">5. Extra Charges</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Any additional waiting time, beyond the free period, or other services (such as extra stops or extensions to the tour) will incur additional charges, which will be informed by the driver and must be paid directly to the driver.
        </li>
        <li>
          Please ensure that you have adequate means of payment available for any extras.
        </li>
        <li>
          If you wish to extend the tour duration beyond the agreed time, this can be arranged directly with the driver, and additional charges will apply.
        </li>
        <li>
          Payment for any tour extensions is to be made directly to the driver.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">6. No Food or Drinks in Vehicle</h2>
      <p className="mb-4">
        To ensure the cleanliness and comfort of all passengers, no food or drinks are permitted inside the vehicle.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. No-Show by Driver</h2>
      <p className="mb-4">
        If your driver does not arrive at the scheduled pick-up time, please report the incident to our Customer Care immediately using the contact details provided in your confirmation email. RideWing will take appropriate action to rectify the situation.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. General Terms of Use</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          RideWing reserves the right to amend or update these terms at any time without prior notice.
        </li>
        <li>
          RideWing is not responsible for any delays caused by traffic, road conditions, or other unforeseen circumstances.
        </li>
        <li>
          Passengers are responsible for securing their personal belongings; RideWing accepts no liability for lost or damaged items.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">9. Cancellation Policy</h2>
      <p className="mb-4">
        Up to 10 guests - car or minibus up to 10 seater cancellation charges will apply as follows:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>10% of the total amount if canceled up to 96 hours before the scheduled service.</li>
        <li>25% if canceled between 96 to 72 hours prior.</li>
        <li>50% if canceled between 72 to 48 hours prior.</li>
        <li>75% if canceled between 48 to 24 hours prior.</li>
        <li>100% if canceled within 24 hours of the scheduled service.</li>
      </ul>
      <p className="mb-4">
        Above 10 guests - coaches or similar cancellation charges will apply as follows:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Full refund if canceled more than 21 days before the tour.</li>
        <li>25% of the total amount if canceled between 14 to 21 days before the tour, depending on the provider&apos;s policy.</li>
        <li>40% if canceled between 10 to 14 days before the tour, depending on the provider&apos;s policy.</li>
        <li>60% if canceled between 7 to 10 days before the tour, depending on the provider&apos;s policy.</li>
        <li>75% if canceled between 4 to 7 days before the tour, depending on the provider&apos;s policy.</li>
        <li>No refund if canceled less than 4 days before the tour.</li>
        <li>No refunds for last-minute or same-day cancellations, including &quot;no-show&quot; situations.</li>
      </ul>
      <p className="mb-4">
        Admission Tickets: Please note that the cancellation and refund policies for admission tickets are determined by the issuing authority. We recommend reviewing their specific terms at the time of purchase for further details.
      </p>

      <p className="mt-4 font-bold">
        By completing your booking with RideWing, you acknowledge and agree to the above terms and conditions.
      </p>
    </div>
  );
};

export default TermsOfUse;
