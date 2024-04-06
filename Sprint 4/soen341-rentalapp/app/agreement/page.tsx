import { getReservationInfo } from "@/lib/actions/reservationActions";
import Link from "next/link";

export default async function Agreement({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const reservationId = searchParams?.id;

  const info = await getReservationInfo(reservationId);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  var todayString = mm.toString() + "/" + dd.toString() + "/" + yyyy.toString();
  var years = Array(
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022
  );
  var colors = Array("Black", "Red", "White", "Grey", "Purple", "Brown");
  return (
    <div className="flex h-screen items-center justify-center bg-sky-100 p-8">
      <div className="flex max-h-[80vh] flex-col gap-4 rounded-lg border-t-4 border-sky-900 bg-slate-100 p-10">
        <h1 className="text-4xl font-bold">Car Pickup Agreement</h1>
        <div className="overflow-auto">
          <p className="py-2 font-bold">1. Renter's Information:</p>
          <p>
            Name: {info.user.firstName} {info.user.lastName}
          </p>
          <p>Address: 823 Avenue Atwater</p>
          <p>Contact Number: 514 823 923</p>
          <p>Email Address: {info.user.email}</p>
          <p>Driver's License Number: {info.user.lastName[0]}1315-230975-09</p>
          <p className="py-2 font-bold">2. Vehicle Information:</p>
          <p>Make: {info.vehicle.model}</p>
          <p>Model: {info.vehicle.type}</p>
          <p>Year: {years[Math.floor(Math.random() * years.length)]} </p>
          <p>License Plate Number: FGF2109</p>
          <p>Vehicle Identification Number (VIN): JTHGZ1B25R5077146</p>
          <p>Color: {colors[Math.floor(Math.random() * colors.length)]}</p>
          <p className="py-2 font-bold">3. Rental Details:</p>
          <p>Rental Start Date: {info.reservation.pickupDate.toString()}</p>
          <p>Rental End Date: {info.reservation.endDate.toString()}</p>
          <p>Pick-up Location: Montreal</p>
          <p>Drop-off Location: Montreal</p>
          <p>
            Rental Period: {(info.reservation.endDate - info.reservation.pickupDate).toString()}
          </p>
          <p>Mileage Limit (if applicable): 150</p>
          <p>Rental Rate: {info.vehicle.price}</p>
          <p>Additional Services (if any): {info.reservation.extraFeatures}</p>
          <p className="py-2 font-bold">4. Rental Terms and Conditions:</p>
          <p>
            The Renter acknowledges receiving the vehicle described above in good condition and
            agrees to return it to the Rental Company in the same condition, subject to normal wear
            and tear. The Renter agrees to use the vehicle solely for personal or business purposes
            and not for any illegal activities. The Renter agrees to pay the Rental Company the
            agreed-upon rental rate for the specified rental period. Additional charges may apply
            for exceeding the mileage limit, late returns, fuel refueling, or other damages. The
            Renter agrees to bear all costs associated with traffic violations, tolls, and parking
            fines incurred during the rental period. The Renter acknowledges that they are
            responsible for any loss or damage to the vehicle, including theft, vandalism,
            accidents, or negligence, and agrees to reimburse the Rental Company for all repair or
            replacement costs. The Renter agrees to return the vehicle to the designated drop-off
            location at the agreed-upon date and time. Failure to do so may result in additional
            charges. The Rental Company reserves the right to terminate this agreement and repossess
            the vehicle without prior notice if the Renter breaches any terms or conditions of this
            agreement. The Renter acknowledges receiving and reviewing a copy of the vehicle's
            insurance coverage and agrees to comply with all insurance requirements during the
            rental period.
          </p>
          <p className="py-2 font-bold">5. Indemnification:</p>
          <p>
            The Renter agrees to indemnify and hold harmless the Rental Company, its employees,
            agents, and affiliates from any claims, liabilities, damages, or expenses arising out of
            or related to the Renter's use of the vehicle.
          </p>
          <p className="py-2 font-bold">6. Governing Law:</p>
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of
            Montreal, Qc, Canada. Any disputes arising under or related to this Agreement shall be
            resolved exclusively by the courts of Montreal, Qc, Canada.
          </p>
          <p className="py-2 font-bold">7. Entire Agreement:</p>
          <p>
            This Agreement constitutes the entire understanding between the parties concerning the
            subject matter hereof and supersedes all prior agreements and understandings, whether
            written or oral.
          </p>
          <p className="py-2 font-bold">8. Signatures:</p>
          <p>The parties hereto have executed this Agreement as of the date first written above</p>
          <p>Rental Company:</p>
          <p>Signature: ___________________________</p>
          <p> Print Name: Soen341ProjectKoeniesgseggg</p>
          <p>Date: {todayString}</p>
          <p>Renter:</p>
          <p>Rental Company:</p>
          <p>Signature: ___________________________</p>
          <p>
            Print Name: {info.user.firstName} {info.user.lastName}
          </p>
          <p>Date: {todayString}</p>
        </div>
        <Link
          className="rounded bg-sky-900 p-2 text-white shadow duration-300 hover:bg-sky-950"
          href="/"
        >
          I Accept and Digitally Sign The Agreement
        </Link>
      </div>
    </div>
  );
}
