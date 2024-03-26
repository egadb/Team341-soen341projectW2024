import { getUserReservations, updateReservation } from "@/lib/actions/reservationActions";
import { getUserSession } from "@/lib/session";

export default async function ReturnForm () {
  const session: any = await getUserSession();
  if (!session) return <div className="flex h-screen text-red-500 font-bold">Session Expired! Please Log In</div>;
  const userReservations = await getUserReservations(session.user.email);
  if (userReservations.reservations.length == 0) return <div className="flex h-screen text-red-500 font-bold">You do not have any reservations!</div>;
  else {
    const price = userReservations.reservations[0].price; 
    return (
      <div className='bg-sky-100 p-8 justify-center items-center h-screen flex'>
        <form className='flex flex-col gap-4 border-t-4 bg-slate-100 border-sky-900 p-10 rounded-lg'>
          <div>
            <h1 className='font-bold text-4xl'>Car Return Form</h1>
          </div>
          <div className='flex flex-col py-10'>
            <p className='font-bold'>
              To proceed with your vehicle return, please confirm the return below and fill in your payment details.
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='confirmReturn'
              name='Confirm Return'
              className='w-6 h-6 accent-sky-900'
            />
            <label htmlFor='confirmReturn' className='font-bold'>
              I confirm the return of the vehicle, free of damage.
            </label>
          </div>
          
          <div className='py-4'>
            <p>Your calculated price for the return service is: <strong>${price.toFixed(2)}</strong></p>
          </div>

          <input
            className='shadow-inner p-3 rounded-lg'
            type='text'
            id='creditCardNumber'
            name='Credit Card Number'
            placeholder='Enter your Credit Card Number'
          />
          <input
            className='shadow-inner p-3 rounded-lg'
            type='text'
            id='expirationDate'
            name='Expiration Date'
            placeholder='MM/YY'
          />
          <input
            className='shadow-inner p-3 rounded-lg'
            type='text'
            id='cvv'
            name='CVV'
            placeholder='CVV'
          />
          <button
            className='bg-sky-900 hover:bg-sky-950 duration-300 text-white shadow p-2 rounded'
            type='submit'
          >
            Confirm Return and Pay
          </button>
        </form>
      </div>
    );
  }
};

