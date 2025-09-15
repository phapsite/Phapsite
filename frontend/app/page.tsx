import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main style={{ paddingTop: "80px" }}>
      <Navbar />

      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #0a0a0b, #0a0a0b",
          color: "white",
          textAlign: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Welcome to Phapsite
        </h1>
        <p>Your all-in-one platform</p>
      </div>
    </main>
  );
}