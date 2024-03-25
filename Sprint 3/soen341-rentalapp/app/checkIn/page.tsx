const Form = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-sky-100 p-8">
      <form className="flex flex-col gap-4 rounded-lg border-t-4 border-sky-900 bg-slate-100 p-10">
        <div>
          <h1 className="text-4xl font-bold">Car Pickup Form</h1>
        </div>
        <div className="flex flex-col py-10">
          <p className="font-bold">
            Message: In order to pick up your car, please fill out the form with the correct
            information.
          </p>
        </div>

        <input
          className="rounded-lg p-3 shadow-inner"
          type="text"
          id="bookingNumber"
          name="Booking Number"
          placeholder="Enter your Booking Number"
        />
        <input
          className="rounded-lg p-3 shadow-inner"
          type="text"
          id="driversLicense"
          name="Driver’s License"
          placeholder="Enter your Driver’s License"
        />
        <input
          className="rounded-lg p-3 shadow-inner"
          type="text"
          id="creditCardNumber"
          name="Credit Card Number"
          placeholder="Enter your Credit Card Number *"
        />

        <div className="flex flex-wrap">
          <label className="flex w-full items-center sm:w-1/2 md:w-1/3 lg:w-1/4">
            <input type="checkbox" name="carInspection" value="Car Inspection" className="mr-2" />
            <span> Car Inspection - Click if inspection okay.</span>
          </label>
        </div>

        <button
          className="rounded bg-sky-900 p-2 text-white shadow duration-300 hover:bg-sky-950"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
