import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PLJ48SCO6IrjH7xGlBQ47dX5LPVSCyjnPkZGYVHS9wnhwmJ5LFZMXWiGXYc8ZdVtx5ojqKH2ZxijweXZycwjg3m00WtaSxmxD"
);

const Popup = ({ rides, selectedRide, closePopup }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBookClick = async () => {
    setIsProcessing(true);
    const ride = rides[selectedRide];

    try {
      const stripe = await stripePromise;
      const priceId = "price_1QQ2xISBxqllV3cnK9FG9Mnw";

      const session = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: ride.price,
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (session.error) {
        console.error(session.error.message);
      }
    } catch (error) {
      console.error("Error with Stripe checkout:", error);
    }
    setIsProcessing(false);
  };
  return (
    <div className="fixed z-[9999] top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center px-2">
      <div className="relative flex items-center bg-white p-6 rounded-lg w-fit">
        <img src={rides[selectedRide].img} className="w-[200px] h-auto" />
        <div className="w-[200px]">
          <h2 className="text-2xl font-bold mb-3">
            {rides[selectedRide].name}
          </h2>
          <p className="text-lg font-semibold">
            Price: ₹{rides[selectedRide].price}
          </p>
          <p className="text-sm text-gray-500">
            Actual Price: ₹{rides[selectedRide].actualPrice}
          </p>
          <p className="text-sm text-green-500 mt-1">
            Discount: {rides[selectedRide].discount}
          </p>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded absolute top-3 right-3"
            onClick={closePopup}
          >
            X
          </button>
          <button
            className="w-full bg-black p-2 text-white rounded mt-4"
            onClick={handleBookClick}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
