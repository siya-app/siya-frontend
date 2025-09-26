import { useEffect, useState } from "react";

type UserType = {
  id: string;
  email: string;
  name: string;
  birth_date: string;
  role: string;
  id_terrace: string;
};

type BookingType = {
  id: string;
  booking_date: string;
  booking_time: string;
  is_paid: boolean;
  party_length: string;
  booking_price: string;
  user_id: string;
  terrace_id: string;
};

type TerraceType = {
  id: string;
  business_name: string;
  profile_pic: string
};

function OwnRestaurant() {
  const [user, setUser] = useState<UserType | null>(null);
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [terraceName, setTerraceName] = useState<string>("");
  const [terracePic, setTerracePic] = useState<string>("");
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:8080";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      setError("No hi ha usuari o token");
      return;
    }

    const { id: userId } = JSON.parse(storedUser);

    const fetchData = async () => {
      try {
        const resUser = await fetch(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!resUser.ok) throw new Error(`Error usuari: ${resUser.statusText}`);

        const userData: UserType = await resUser.json();
        setUser(userData);

        if (userData.id_terrace) {
          const resTerrace = await fetch(
            `${API_BASE_URL}/terraces/${userData.id_terrace}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (!resTerrace.ok)
            throw new Error(`Error terrassa: ${resTerrace.statusText}`);

          const terraceData: TerraceType = await resTerrace.json();
          setTerraceName(terraceData.business_name);
          setTerracePic(terraceData.profile_pic)

          const resBookings = await fetch(
            `${API_BASE_URL}/booking/terrace/${userData.id_terrace}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (!resBookings.ok)
            throw new Error(`Error reserves: ${resBookings.statusText}`);

          const bookingData: BookingType[] = await resBookings.json();
          setBookings(bookingData);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconegut");
        }
      }
    };

    fetchData();
  }, []);

  const handleDeleteBooking = async (bookingId: string) => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError("No hi ha token");
      return;
    }

    if (!confirm("Segur que vols eliminar aquesta reserva?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!res.ok) throw new Error(`Error eliminant: ${res.statusText}`);

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconegut");
      }
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Carregant usuari...</p>;


  const bookingsPerDate: Record<string, BookingType[]> = {};
  bookings.forEach((b) => {
    if (!bookingsPerDate[b.booking_date]) {
      bookingsPerDate[b.booking_date] = [];
    }
    bookingsPerDate[b.booking_date].push(b);
  });

  // Ordenar las fechas
  const sortedDates = Object.keys(bookingsPerDate).sort((a, b) => a.localeCompare(b));



  return (
    <div style={{ margin: "20px" }}>
      <h1 style={{ marginBottom: "15px", color: "#333" }}><strong> El meu Restaurant </strong></h1>
      <div className="border-l- border-r-4 border-t- border-b-4  siyaDark-text m-2 mt-3 bg-gray-50"
        style={{
          maxWidth: "400px",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >

        {terracePic && (
          <img
            src={terracePic}
            alt="terrace-pic"
            style={{
              width: "200px",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto 15px auto",
            }}
          />
        )}
        <p><strong>Nom de la terrassa:</strong> {terraceName}</p>
        <p><strong>ID terrassa:</strong> {user.id_terrace}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>



      <h2 style={{ color: "#ff1818" }}> <strong>Reserves de la terrassa</strong></h2>
      {bookings.length === 0 ? (
        <p>No hi ha reserves</p>
      ) : (
        sortedDates.map((date) => (
          <div key={date} style={{ marginBottom: "20px", marginTop: "20px" }}>
            <h4> <strong>{new Date(date).toLocaleDateString("ca-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} </strong> </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {bookingsPerDate[date]
                .sort((a: any, b: any) => a.booking_time.localeCompare(b.booking_time))
                .map((b: any) => (
                  <div className="shadow-md border-l- border-r-4 border-t- border-b-4 border-siya-dark-green siyaDark-text m-2 mt-3 bg-gray-50"
                    key={b.id}
                    style={{
                      // border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      // background: "#f9f9f9",
                      // boxShadow:  "0 4px 12px #385852, 0 2px 4px #385852", // Sombra verde
                      // transition: "box-shadow 0.3s ease", // Opcional: para efecto hover
                    }}
                  >
                    <div >
                      <p><strong>Hora:</strong> {b.booking_time}</p>
                      <p><strong>Persones:</strong> {b.party_length}</p>
                    </div>
                    <button
                      style={{
                        background: "#ff1818",
                        color: "white",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer", // Mejora la usabilidad
                      }}
                      onClick={() => handleDeleteBooking(b.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OwnRestaurant;
