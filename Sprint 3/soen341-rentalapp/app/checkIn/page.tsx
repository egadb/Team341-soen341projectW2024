const Form = () => {
    return (
      <div className='bg-sky-100 p-8 justify-center items-center h-screen flex'>
          <form className='flex flex-col gap-4 border-t-4 bg-slate-100 border-sky-900 p-10 rounded-lg'>
            <div>
              <h1 className='font-bold text-4xl'>Car Pickup Form</h1>
            </div>
            <div className='flex flex-col py-10'>
              <p className='font-bold'>
                Message: In order to pick up your car, please fill out the form
                with the correct information.
              </p>
            </div>
  
            <input
              className='shadow-inner p-3 rounded-lg'
              type='text'
              id='bookingNumber'
              name='Booking Number'
              placeholder='Enter your Booking Number'
            />
            <input
              className='shadow-inner p-3 rounded-lg'
              type='text'
              id='driversLicense'
              name='Driver’s License'
              placeholder='Enter your Driver’s License'
            />
            <input
              className='shadow-inner p-3 rounded-lg'
              type='text'
              id='creditCardNumber'
              name='Credit Card Number'
              placeholder='Enter your Credit Card Number *'
            />
            <p>* Must be same Credit Card number that was used when booking</p>
            <button
              className='bg-sky-900 hover:bg-sky-950 duration-300 text-white shadow p-2 rounded'
              type='submit'
            >
              Submit
            </button>
          </form>
      </div>
    );
  };
  
  export default Form;
  
  