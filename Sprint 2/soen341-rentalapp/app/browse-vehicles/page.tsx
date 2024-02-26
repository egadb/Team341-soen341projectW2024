import Footer from "@/components/global/Footer";
import NavBar from "@/components/global/NavBar";

export default function BrowseVehicles() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <div
        style={{
          flex: 1,
          backgroundColor: "darkred",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Browse Vehicles</h2>
      </div>
      <Footer />
    </div>
  );
}
